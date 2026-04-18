*** Settings ***
Documentation    Page Resource para el servicio PACPagosService del ESB
Library          RequestsLibrary
Library          Collections

*** Variables ***
# URLs del servicio
${URL_ESB_PACPAGOS}    https://esb-telcel-dev.com/api/v1/PACPagosService

# Encabezados HTTP requeridos
${HEADER_SENDBY}       sendBy
${HEADER_USER}         user
${HEADER_TOKEN}        Token
${HEADER_CLIENTID}     ClientId

# Valores para encabezados HTTP válidos (ambiente QA)
${VALOR_SENDBY_QA}     ESB_QA_Client
${VALOR_USER_QA}       qa_automation_user
${VALOR_TOKEN_QA}      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlFBIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
${VALOR_CLIENTID_QA}   CLIENT_QA_001

# Payload de prueba
${TELEFONO_VALIDO}     5512345678

# Códigos de respuesta esperados
${CODIGO_ERROR_ESB17}     ESB17
${CODIGO_ERROR_ESB6}      ESB6
${CODIGO_EXITO_ESB0}      ESB0

*** Keywords ***
Crear Sesión ESB PACPagosService
    [Documentation]    Crea la sesión HTTP para el servicio PACPagosService
    Create Session    esb_session    ${URL_ESB_PACPAGOS}    verify=False

Enviar Petición Con Encabezados Inválidos
    [Documentation]    Envía una petición al servicio con encabezados HTTP inválidos para provocar error ESB17
    [Arguments]    ${telefono}
    ${payload}=    Create Dictionary    phoneNumber=${telefono}
    ${headers}=    Create Dictionary    Content-Type=application/json
    # Intencionalmente NO incluimos los encabezados requeridos
    ${response}=    POST On Session    esb_session    /consulta    json=${payload}    headers=${headers}    expected_status=400
    [Return]    ${response}

Verificar Error ESB17 En Respuesta
    [Documentation]    Valida que la respuesta contenga el código de error ESB17
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    errorCode
    Should Be Equal As Strings    ${response_json}[errorCode]    ${CODIGO_ERROR_ESB17}
    Should Contain    ${response_json}[errorMessage]    encabezado HTTP del mensaje de entrada no es válido

Obtener Encabezados HTTP Requeridos Desde Especificación
    [Documentation]    Retorna un diccionario con los encabezados HTTP requeridos según la especificación
    ${headers_requeridos}=    Create List    ${HEADER_SENDBY}    ${HEADER_USER}    ${HEADER_TOKEN}    ${HEADER_CLIENTID}
    [Return]    ${headers_requeridos}

Crear Encabezados HTTP Válidos
    [Documentation]    Crea un diccionario con todos los encabezados HTTP válidos para el ambiente QA
    ${headers_validos}=    Create Dictionary
    ...    ${HEADER_SENDBY}=${VALOR_SENDBY_QA}
    ...    ${HEADER_USER}=${VALOR_USER_QA}
    ...    ${HEADER_TOKEN}=${VALOR_TOKEN_QA}
    ...    ${HEADER_CLIENTID}=${VALOR_CLIENTID_QA}
    ...    Content-Type=application/json
    [Return]    ${headers_validos}

Enviar Petición Con Encabezados Válidos
    [Documentation]    Envía una petición al servicio con todos los encabezados HTTP requeridos
    [Arguments]    ${telefono}    ${headers_validos}
    ${payload}=    Create Dictionary    phoneNumber=${telefono}
    ${response}=    POST On Session    esb_session    /consulta    json=${payload}    headers=${headers_validos}    expected_status=200
    [Return]    ${response}

Verificar Validación Exitosa De Encabezados
    [Documentation]    Verifica que el ESB haya validado correctamente los encabezados
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    resultCode
    Should Be Equal As Strings    ${response_json}[resultCode]    ${CODIGO_EXITO_ESB0}

Verificar Respuesta Exitosa Con Información Del Cliente
    [Documentation]    Valida que la respuesta contenga toda la información del cliente Amigo Paguitos
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de éxito
    Should Be Equal As Strings    ${response_json}[resultCode]    ${CODIGO_EXITO_ESB0}

    # Verificar campos obligatorios del cliente
    Dictionary Should Contain Key    ${response_json}    serviceNumber
    Dictionary Should Contain Key    ${response_json}    subscriberId
    Dictionary Should Contain Key    ${response_json}    accountId
    Dictionary Should Contain Key    ${response_json}    CustID
    Dictionary Should Contain Key    ${response_json}    billcycletype
    Dictionary Should Contain Key    ${response_json}    IMEI
    Dictionary Should Contain Key    ${response_json}    balancetype
    Dictionary Should Contain Key    ${response_json}    ARBalance
    Dictionary Should Contain Key    ${response_json}    customer

    # Verificar que los valores no estén vacíos
    Should Not Be Empty    ${response_json}[serviceNumber]
    Should Not Be Empty    ${response_json}[subscriberId]
    Should Not Be Empty    ${response_json}[accountId]
    Should Not Be Empty    ${response_json}[CustID]

Cerrar Sesión ESB
    [Documentation]    Cierra la sesión HTTP del servicio
    Delete All Sessions

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Caso 40 - Consulta de cliente con financiamiento
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Consultar Cliente Mediante PACPagosService
    [Documentation]    Consulta información completa del cliente mediante PACPagosService
    [Arguments]    ${numero_telefonico}
    Crear Sesión ESB PACPagosService
    ${headers_validos}=    Crear Encabezados HTTP Válidos
    ${payload}=    Create Dictionary    phoneNumber=${numero_telefonico}
    ${response}=    POST On Session    esb_session    /consulta    json=${payload}    headers=${headers_validos}    expected_status=200
    Set Test Variable    ${RESPONSE_CONSULTA_CLIENTE}    ${response}
    [Return]    ${response}

Verificar Información Completa Del Cliente Y Equipo
    [Arguments]    ${response}    ${numero_esperado}    ${imei_esperado}    ${total_amount}    ${total_cycle}
    [Documentation]    Verifica que la respuesta contenga serviceNumber, IMEI, primaryOfferingId y financiamiento
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar serviceNumber
    Dictionary Should Contain Key    ${response_json}    serviceNumber
    Should Be Equal As Strings    ${response_json}[serviceNumber]    ${numero_esperado}

    # Verificar IMEI
    Dictionary Should Contain Key    ${response_json}    IMEI
    Should Be Equal As Strings    ${response_json}[IMEI]    ${imei_esperado}

    # Verificar primaryOfferingId
    Dictionary Should Contain Key    ${response_json}    primaryOfferingId
    Should Not Be Empty    ${response_json}[primaryOfferingId]

    # Verificar información del financiamiento
    Dictionary Should Contain Key    ${response_json}    financiamiento
    ${financiamiento}=    Get From Dictionary    ${response_json}    financiamiento
    Dictionary Should Contain Key    ${financiamiento}    totalAmount
    Dictionary Should Contain Key    ${financiamiento}    totalCycle
    Should Be Equal As Strings    ${financiamiento}[totalAmount]    ${total_amount}
    Should Be Equal As Strings    ${financiamiento}[totalCycle]    ${total_cycle}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Pruebas de Rendimiento y Carga (Caso TC020)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ejecutar Petición Única Con Medición De Tiempo
    [Documentation]    Ejecuta una petición al servicio y retorna el tiempo de respuesta en segundos
    [Arguments]    ${telefono}    ${headers_validos}
    ${payload}=    Create Dictionary    phoneNumber=${telefono}
    ${start_time}=    Get Time    epoch
    ${response}=    POST On Session    esb_session    /consulta    json=${payload}    headers=${headers_validos}    expected_status=any
    ${end_time}=    Get Time    epoch
    ${elapsed_time}=    Evaluate    ${end_time} - ${start_time}
    ${result}=    Create Dictionary    response=${response}    elapsed_time=${elapsed_time}
    [Return]    ${result}

Verificar Tiempo De Respuesta Dentro De Límite
    [Documentation]    Valida que el tiempo de respuesta esté dentro del timeout configurado de 120 segundos
    [Arguments]    ${elapsed_time}    ${timeout_maximo}=120
    Should Be True    ${elapsed_time} < ${timeout_maximo}    msg=El tiempo de respuesta ${elapsed_time}s excede el timeout de ${timeout_maximo}s

Verificar Respuesta Exitosa Con Código ESB0
    [Documentation]    Valida que la respuesta contenga el código de éxito ESB0
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    resultCode
    Should Be Equal As Strings    ${response_json}[resultCode]    ${CODIGO_EXITO_ESB0}

Verificar Ausencia De Errores ESB En Respuesta
    [Documentation]    Valida que la respuesta no contenga códigos de error ESB2, ESB3, ESB4, ESB6
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Should Not Be Equal As Strings    ${response_json}[resultCode]    ESB2    msg=Error ESB2: Servicio no disponible
    Should Not Be Equal As Strings    ${response_json}[resultCode]    ESB3    msg=Error ESB3: Timeout
    Should Not Be Equal As Strings    ${response_json}[resultCode]    ESB4    msg=Error ESB4: Error de conexión
    Should Not Be Equal As Strings    ${response_json}[resultCode]    ESB6    msg=Error ESB6: Timeout del servicio

Calcular Porcentaje De Éxito
    [Documentation]    Calcula el porcentaje de transacciones exitosas sobre el total
    [Arguments]    ${transacciones_exitosas}    ${total_transacciones}
    ${porcentaje}=    Evaluate    (${transacciones_exitosas} / ${total_transacciones}) * 100
    [Return]    ${porcentaje}

Verificar Porcentaje De Éxito Mínimo
    [Documentation]    Valida que el porcentaje de éxito sea superior al 99%
    [Arguments]    ${porcentaje_exito}    ${porcentaje_minimo}=99.0
    Should Be True    ${porcentaje_exito} >= ${porcentaje_minimo}    msg=El porcentaje de éxito ${porcentaje_exito}% es inferior al mínimo requerido ${porcentaje_minimo}%

Seleccionar Teléfono Del Pool
    [Documentation]    Selecciona un número telefónico del pool usando rotación round-robin
    [Arguments]    ${indice_transaccion}
    ${pool_size}=    Get Length    ${TELEFONOS_PRUEBA}
    ${indice_rotado}=    Evaluate    ${indice_transaccion} % ${pool_size}
    ${telefono_seleccionado}=    Get From List    ${TELEFONOS_PRUEBA}    ${indice_rotado}
    [Return]    ${telefono_seleccionado}

Registrar Error De Transacción
    [Documentation]    Registra información de errores cuando una transacción falla
    [Arguments]    ${numero_transaccion}    ${response}    ${lista_errores}
    ${codigo_error}=    Set Variable If    ${response.status_code} != 200    HTTP_${response.status_code}    DESCONOCIDO
    ${error_info}=    Create Dictionary    transaccion=${numero_transaccion}    codigo=${codigo_error}
    Append To List    ${lista_errores}    ${error_info}
    Log    Error en transacción ${numero_transaccion}: ${codigo_error}    level=WARN

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Timeout del BUS - Código de Error ESB6 (Caso TC022)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Configurar BUS Para Simular Procesamiento Que Exceda Timeout
    [Documentation]    Configura el BUS para simular un procesamiento que supere los 120 segundos de timeout
    [Arguments]    ${duracion_segundos}=125
    Create Session    esb_session    ${URL_ESB_PACPAGOS}    verify=False
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${config}=    Create Dictionary
    ...    simularDelay=true
    ...    duracionDelaySegundos=${duracion_segundos}
    ...    operacion=PACPagosService
    ${response}=    PUT On Session    esb_session    /config/timeout-simulation    json=${config}    headers=${headers}    expected_status=200
    Should Be Equal As Numbers    ${response.status_code}    200
    Log    BUS configurado para simular procesamiento de ${duracion_segundos} segundos

Enviar Petición Desde Consumidor Amigo Paguitos
    [Documentation]    Envía una petición desde el consumidor Amigo Paguitos hacia el servicio PACPagosService
    [Arguments]    ${telefono}
    ${payload}=    Create Dictionary    phoneNumber=${telefono}
    ${headers}=    Crear Encabezados HTTP Válidos
    ${response}=    POST On Session    esb_session    /consulta    json=${payload}    headers=${headers}    expected_status=any
    [Return]    ${response}

Monitorear Tiempo De Ejecución Del Flujo De Mensaje
    [Documentation]    Monitorea el tiempo de procesamiento del flujo de mensaje en el BUS
    [Arguments]    ${telefono}
    ${start_time}=    Get Time    epoch
    ${response}=    Enviar Petición Desde Consumidor Amigo Paguitos    ${telefono}
    ${end_time}=    Get Time    epoch
    ${elapsed_time}=    Evaluate    ${end_time} - ${start_time}
    Set Test Variable    ${TIEMPO_PROCESAMIENTO}    ${elapsed_time}
    Set Test Variable    ${RESPONSE_TIMEOUT}    ${response}
    Log    Tiempo de procesamiento del flujo de mensaje: ${elapsed_time} segundos

Verificar Que Sistema Genera Código Error ESB6 Por Timeout
    [Documentation]    Verifica que el sistema retorna el código de error ESB6 indicando timeout del flujo de mensaje
    [Arguments]    ${response}
    Should Be True    ${response.status_code} == 504 or ${response.status_code} == 408    msg=Status code no indica timeout
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    errorCode    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    errorCode
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB6}    msg=Código de error incorrecto. Esperado: ESB6, Actual: ${codigo_error}
    Dictionary Should Contain Key    ${response_json}    errorMessage    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    errorMessage
    Should Contain    ${mensaje_error}    Timeout del flujo de mensaje    msg=Mensaje de error no indica timeout del flujo de mensaje
    Log    Sistema generó correctamente código de error ESB6 por timeout del flujo de mensaje

Verificar Que Sistema Permite Reintento De Operación
    [Documentation]    Verifica que el sistema habilita la opción de reintento para recuperar la transacción
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    S    msg=Flag de reintento debe estar habilitado (S)
    Log    Sistema permite reintento de la operación según la configuración establecida

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Caso TC060 - Levantamiento de incidente a TI ante falla persistente
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Invocar Servicio PACPagosService ConsultarPaguitos Con Datos Válidos
    [Documentation]    Invoca el servicio PACPagosService.ConsultarPaguitos con datos válidos para procesamiento
    [Arguments]    ${numero_telefonico}
    Crear Sesión ESB PACPagosService
    ${headers_validos}=    Crear Encabezados HTTP Válidos
    ${payload}=    Create Dictionary    phoneNumber=${numero_telefonico}    operacion=ConsultarPaguitos
    ${response}=    POST On Session    esb_session    /ConsultarPaguitos    json=${payload}    headers=${headers_validos}    expected_status=any
    Set Test Variable    ${RESPONSE_CONSULTA}    ${response}
    [Return]    ${response}

Verificar Que ESB Procesa Petición Y Envía A BES
    [Arguments]    ${response}
    [Documentation]    Verifica que el ESB procesa la petición y la envía a BES
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    peticionEnviadaABES    msg=Response no indica que se envió petición a BES
    ${peticion_enviada}=    Get From Dictionary    ${response_json}    peticionEnviadaABES
    Should Be Equal As Strings    ${peticion_enviada}    S    msg=ESB debió enviar petición a BES
    Log    ESB procesó la petición y la envió a BES correctamente

Simular Falla Persistente De Tipo ESB4 Desde BES
    [Documentation]    Simula una falla persistente de tipo ESB4 (Falla de conexión) desde BES
    [Arguments]    ${numero_telefonico}
    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Simulate-Error=ESB4
    ...    X-Simulate-Persistent-Failure=true
    ${payload}=    Create Dictionary    phoneNumber=${numero_telefonico}    operacion=ConsultarPaguitos
    ${response}=    POST On Session    esb_session    /ConsultarPaguitos    json=${payload}    headers=${headers}    expected_status=any
    Set Test Variable    ${RESPONSE_FALLA_PERSISTENTE}    ${response}
    [Return]    ${response}

Verificar Que BES Devuelve Error ESB4 Indicando Falla De Conexión
    [Arguments]    ${response}
    [Documentation]    Verifica que BES devuelve error ESB4 indicando falla de conexión
    Should Be True    ${response.status_code} == 504 or ${response.status_code} == 500    msg=Status code no indica falla de conexión
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB4}    msg=Código de error incorrecto. Esperado: ESB4
    Log    BES devolvió error ESB4 indicando falla de conexión

Configurar Reintentos Para Error ESB4
    [Documentation]    Configura los parámetros de reintento automático en el ESB para error ESB4
    [Arguments]    ${max_reintentos}    ${tiempo_entre_reintentos}
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${config}=    Create Dictionary
    ...    codigoError=ESB4
    ...    maxReintentos=${max_reintentos}
    ...    tiempoEntreReintentosSegundos=${tiempo_entre_reintentos}
    ...    habilitarReintento=S
    ${response}=    PUT On Session    esb_session    /config/reintento-esb4    json=${config}    headers=${headers}    expected_status=200
    Should Be Equal As Numbers    ${response.status_code}    200
    Log    Configurados ${max_reintentos} reintentos con ${tiempo_entre_reintentos}s entre cada uno para error ESB4

Verificar Que ESB Ejecuta Todos Los Reintentos Configurados
    [Arguments]    ${response}    ${numero_reintentos_esperado}
    [Documentation]    Verifica que el ESB ejecutó todos los reintentos permitidos sin éxito
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    reintentoEjecutado    msg=Response no indica que se ejecutó reintento
    ${reintento_ejecutado}=    Get From Dictionary    ${response_json}    reintentoEjecutado
    Should Be Equal As Strings    ${reintento_ejecutado}    S    msg=ESB no ejecutó reintentos
    Dictionary Should Contain Key    ${response_json}    numeroReintentos    msg=Response no contiene número de reintentos
    ${numero_reintentos}=    Get From Dictionary    ${response_json}    numeroReintentos
    Should Be Equal As Numbers    ${numero_reintentos}    ${numero_reintentos_esperado}    msg=Número de reintentos no coincide
    Log    ESB ejecutó todos los ${numero_reintentos_esperado} reintentos configurados

Verificar Que Todos Los Intentos Fallan Con Mismo Error ESB4
    [Arguments]    ${log_response}    ${numero_intentos_esperado}
    [Documentation]    Verifica que todos los intentos fallaron con el mismo error ESB4
    ${log_json}=    Set Variable    ${log_response.json()}
    Dictionary Should Contain Key    ${log_json}    intentos    msg=Log no contiene lista de intentos
    ${intentos}=    Get From Dictionary    ${log_json}    intentos
    ${numero_intentos}=    Get Length    ${intentos}
    Should Be Equal As Numbers    ${numero_intentos}    ${numero_intentos_esperado}    msg=Número de intentos no coincide
    FOR    ${intento}    IN    @{intentos}
        ${resultado}=    Get From Dictionary    ${intento}    resultado
        Should Contain    ${resultado}    ESB4    msg=Intento no falló con error ESB4
    END
    Log    Todos los ${numero_intentos_esperado} intentos fallaron con error ESB4

Verificar Que ESB Genera Mensaje Levantar Incidente A TI
    [Arguments]    ${response}
    [Documentation]    Verifica que el ESB genera mensaje indicando que se debe levantar incidente a TI
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    accionRecomendada    msg=Response no contiene acción recomendada
    ${accion_recomendada}=    Get From Dictionary    ${response_json}    accionRecomendada
    Should Contain Any    ${accion_recomendada}    Levantar incidente a TI    análisis    identificar origen    msg=Acción recomendada no indica levantar incidente a TI
    Log    Sistema generó correctamente el mensaje: Levantar incidente a TI para realizar análisis e identificar origen de la falla

Verificar Que Error Final Se Devuelve A Consumidor Con Instrucciones
    [Arguments]    ${response}
    [Documentation]    Verifica que el error final se devuelve al consumidor con instrucciones de escalamiento
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB4}    msg=Error final no es ESB4
    Dictionary Should Contain Key    ${response_json}    instruccionesEscalamiento    msg=Response no contiene instrucciones de escalamiento
    ${instrucciones}=    Get From Dictionary    ${response_json}    instruccionesEscalamiento
    Should Contain Any    ${instrucciones}    contactar soporte DAI    escalamiento    soporte técnico    msg=Instrucciones no indican contactar soporte DAI
    Log    Consumidor recibió error ESB4 con indicación de contactar soporte DAI
