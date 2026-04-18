*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - Capa de Integración
${API_CAPA_INTEGRACION_BASE_URL}               https://capa-integracion-telcel-dev.com/api/v1
${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}     /PACPagosService/Consulta

# URLs BES - APIs que consume Capa de Integración
${API_BES_GET_SUBSCRIBER_INFO}                 https://bes-telcel-dev.com/api/GetSubscriberinfo
${API_BES_GET_ACCOUNT_INFO}                    https://bes-telcel-dev.com/api/GetAccountInfo
${API_BES_GET_SUBSCRIBER_AND_IMEI_INFO}        https://bes-telcel-dev.com/api/GetSubscriberAndIMEIInfo
${API_BES_QUERY_BALANCE}                       https://bes-telcel-dev.com/api/QueryBalance
${API_BES_GET_CUSTOMER_BASIC_INFO}             https://bes-telcel-dev.com/api/GetCustomerbasicinfo

# Códigos de error
${CODIGO_ERROR_ESB0}                           ESB0
${MENSAJE_EXITO_ESB0}                          Peticiones request y response ejecutadas correctamente
${CODIGO_ERROR_ESB1}                           ESB1
${MENSAJE_ERROR_ESQUEMA_INVALIDO}              Esquema NO valido mensaje de entrada
${CODIGO_ERROR_ESB2}                           ESB2
${MENSAJE_ERROR_SERVICIO_NO_DISPONIBLE}        Servicio NO disponible
${CODIGO_ERROR_ESB4}                           ESB4
${MENSAJE_ERROR_FALLA_CONEXION}                Falla de conexión
${CODIGO_ERROR_ESB5}                           ESB5
${MENSAJE_ERROR_EXCEPCION_NO_ESPERADA}         Excepción NO esperada
${CODIGO_ERROR_ESB9}                           ESB9
${MENSAJE_ERROR_ESQUEMA_SALIDA_INVALIDO}       Esquema NO valido mensaje de salida
${CODIGO_ERROR_ESB10}                          ESB10
${MENSAJE_ERROR_SIN_RESPUESTA_PROVEEDOR}       Excepción NO esperada sin respuesta del proveedor
${CODIGO_ERROR_ESB11}                          ESB11
${MENSAJE_ERROR_SIN_PRIVILEGIOS}               No cuenta con privilegios para invocar esta operación
${CODIGO_ERROR_ESB12}                          ESB12
${MENSAJE_ERROR_COLA_RESPUESTA_INVALIDA}       Cola de respuesta no válida en mensajería
${CODIGO_ERROR_ESB14}                          ESB14
${MENSAJE_ERROR_ESQUEMA_INVALIDO_PETICION}     Esquema NO valido petición a proveedor
${CODIGO_ERROR_ESB15}                          ESB15
${MENSAJE_ERROR_ESQUEMA_INVALIDO_RESPUESTA}    Esquema NO valido respuesta de proveedor Éxito, estado final
${CODIGO_ERROR_ESB8}                           ESB8
${MENSAJE_ERROR_MALA_CONFIGURACION_BUS}        Mala configuración de dependencias en el BUS
${CODIGO_ERROR_ESB16}                          ESB16
${MENSAJE_ERROR_CONFIG_DEPENDENCIAS_BUS}       Error de configuración de dependencias en el BUS
${CODIGO_ERROR_ESB17}                          ESB17
${MENSAJE_ERROR_ENCABEZADO_HTTP_INVALIDO}      Encabezado HTTP del mensaje de entrada no es válido

*** Keywords ***
Invocar Servicio PACPagosService Consulta Con Número Telefónico
    [Arguments]    ${numero_telefonico}
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Invocar Servicio PACPagosService Consulta Con Payload Personalizado
    [Arguments]    ${payload}
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que Response Tiene Status Code
    [Arguments]    ${response}    ${status_code_esperado}
    Should Be Equal As Numbers    ${response.status_code}    ${status_code_esperado}    msg=Status code no coincide. Esperado: ${status_code_esperado}, Actual: ${response.status_code}

Verificar Que Capa De Integración Valida Esquema Correctamente
    [Arguments]    ${response}
    # Verificar que la validación de esquema fue exitosa (status 200)
    Should Be Equal As Numbers    ${response.status_code}    200

    ${response_json}=    Set Variable    ${response.json()}
    # Verificar que el response contiene información del cliente (indica validación exitosa)
    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene serviceNumber - validación de esquema falló

Verificar Que Capa De Integración Propaga Número Telefónico A Todas Las APIs De BES
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que metadata contiene información de las APIs consultadas
    Dictionary Should Contain Key    ${response_json}    metadata    msg=Response no contiene metadata de APIs consultadas

    ${metadata}=    Get From Dictionary    ${response_json}    metadata
    Dictionary Should Contain Key    ${metadata}    apisConsultadas    msg=Metadata no contiene lista de APIs consultadas

    ${apis_consultadas}=    Get From Dictionary    ${metadata}    apisConsultadas

    # Verificar que se consultaron todas las APIs de BES con el número telefónico
    @{apis_esperadas}=    Create List
    ...    GetSubscriberinfo
    ...    GetAccountInfo
    ...    GetSubscriberAndIMEIInfo
    ...    QueryBalance
    ...    GetCustomerbasicinfo

    FOR    ${api_esperada}    IN    @{apis_esperadas}
        List Should Contain Value    ${apis_consultadas}    ${api_esperada}    msg=API ${api_esperada} no fue consultada por Capa de Integración
    END

Verificar Que Servicio Devuelve Error ESB1 Por Esquema Invalido
    [Arguments]    ${response}
    # Verificar que el status code indica error (400 Bad Request)
    Should Be Equal As Numbers    ${response.status_code}    400

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB1
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB1}    msg=Código de error incorrecto

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_ESQUEMA_INVALIDO}    msg=Mensaje de error incorrecto

Verificar Que BES Devuelve Respuesta Sin Información Para Número Inexistente
    [Arguments]    ${response}
    # Verificar que el servicio procesa la solicitud correctamente (200)
    Should Be Equal As Numbers    ${response.status_code}    200

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que BES devuelve una respuesta indicando que no se encontró información
    Dictionary Should Contain Key    ${response_json}    resultado    msg=Response no contiene campo resultado
    ${resultado}=    Get From Dictionary    ${response_json}    resultado
    Should Contain Any    ${resultado}    sin información    no encontrado    not found    msg=BES no indica que el número telefónico no existe

    # Verificar que no hay datos de cliente
    Dictionary Should Not Contain Key    ${response_json}    serviceNumber    msg=Response contiene serviceNumber cuando no debería haber información

Verificar Que Servicio Devuelve Código ESB0 Petición Exitosa
    [Arguments]    ${response}
    # Verificar que el status code indica éxito (200 OK)
    Should Be Equal As Numbers    ${response.status_code}    200

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de éxito ESB0
    Dictionary Should Contain Key    ${response_json}    codigoRespuesta    msg=Response no contiene código de respuesta
    ${codigo_respuesta}=    Get From Dictionary    ${response_json}    codigoRespuesta
    Should Be Equal As Strings    ${codigo_respuesta}    ${CODIGO_ERROR_ESB0}    msg=Código de respuesta incorrecto

    # Verificar mensaje de éxito
    Dictionary Should Contain Key    ${response_json}    mensajeRespuesta    msg=Response no contiene mensaje de respuesta
    ${mensaje_respuesta}=    Get From Dictionary    ${response_json}    mensajeRespuesta
    Should Contain    ${mensaje_respuesta}    ${MENSAJE_EXITO_ESB0}    msg=Mensaje de respuesta incorrecto

Verificar Que Servicio Devuelve Error ESB2 Por Servicio No Disponible
    [Arguments]    ${response}
    # Verificar que el status code indica servicio no disponible (503 Service Unavailable)
    Should Be Equal As Numbers    ${response.status_code}    503

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB2
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB2}    msg=Código de error incorrecto

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_SERVICIO_NO_DISPONIBLE}    msg=Mensaje de error incorrecto

    # Verificar flag de reintento habilitado
    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    S    msg=Flag de reintento debe estar habilitado (S)

Verificar Que Servicio Devuelve Error ESB4 Por Falla De Conexión
    [Arguments]    ${response}
    # Verificar que el status code indica error de conexión (504 Gateway Timeout o 500 Internal Server Error)
    Should Be True    ${response.status_code} == 504 or ${response.status_code} == 500    msg=Status code no indica falla de conexión

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB4
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB4}    msg=Código de error incorrecto

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_FALLA_CONEXION}    msg=Mensaje de error incorrecto

    # Verificar que sugiere reintentar
    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    S    msg=Flag de reintento debe estar habilitado (S)

Verificar Que Servicio Devuelve Error ESB5 Por Excepción No Esperada
    [Arguments]    ${response}
    # Verificar que el status code indica error interno (500 Internal Server Error)
    Should Be Equal As Numbers    ${response.status_code}    500

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB5
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB5}    msg=Código de error incorrecto

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_EXCEPCION_NO_ESPERADA}    msg=Mensaje de error incorrecto

Simular Servicio BES No Disponible
    [Arguments]    ${numero_telefonico}
    # Simular caída de BES enviando header especial que indica simulación de servicio no disponible
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json    X-Simulate-Error=ESB2
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Simular Falla De Conexión Con BES
    [Arguments]    ${numero_telefonico}
    # Simular falla de conexión enviando header especial que indica simulación de caída de red
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json    X-Simulate-Error=ESB4
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Simular Excepción No Esperada En BUS
    [Arguments]    ${numero_telefonico}
    # Simular excepción no controlada enviando header especial que provoca error interno
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json    X-Simulate-Error=ESB5
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Configurar Parámetros De Reintento Automático En ESB
    [Arguments]    ${max_reintentos}    ${tiempo_entre_reintentos_segundos}
    # Configurar parámetros de política de reintento en el ESB
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${config}=    Create Dictionary
    ...    maxReintentos=${max_reintentos}
    ...    tiempoEntreReintentosSegundos=${tiempo_entre_reintentos_segundos}
    ...    habilitarReintento=S

    ${response}=    PUT On Session    capa_integracion    /config/reintento    json=${config}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    Log    Parámetros de reintento configurados: max=${max_reintentos}, tiempo=${tiempo_entre_reintentos_segundos}s

Simular Excepción ESB5 Con Monitoreo De Reintentos
    [Arguments]    ${numero_telefonico}
    # Simular excepción ESB5 con header especial que activa monitoreo de reintentos
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Simulate-Error=ESB5
    ...    X-Enable-Retry-Monitoring=true
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Ejecuta Reintento Automático
    [Arguments]    ${response}
    # Verificar que el response indica que se ejecutó mecanismo de reintento
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    reintentoEjecutado    msg=Response no indica que se ejecutó reintento automático
    ${reintento_ejecutado}=    Get From Dictionary    ${response_json}    reintentoEjecutado
    Should Be Equal As Strings    ${reintento_ejecutado}    S    msg=ESB no ejecutó el reintento automático

Verificar Número De Reintentos Ejecutados
    [Arguments]    ${response}    ${numero_reintentos_esperado}
    # Verificar que el número de reintentos ejecutados coincide con el esperado
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    numeroReintentos    msg=Response no contiene número de reintentos ejecutados
    ${numero_reintentos}=    Get From Dictionary    ${response_json}    numeroReintentos
    Should Be Equal As Numbers    ${numero_reintentos}    ${numero_reintentos_esperado}    msg=Número de reintentos no coincide. Esperado: ${numero_reintentos_esperado}, Actual: ${numero_reintentos}

Verificar Tiempo Entre Reintentos
    [Arguments]    ${response}    ${tiempo_esperado_segundos}
    # Verificar que el tiempo entre reintentos respeta el parámetro configurado
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    tiempoEntreReintentos    msg=Response no contiene información de tiempo entre reintentos
    ${tiempo_reintentos}=    Get From Dictionary    ${response_json}    tiempoEntreReintentos
    Should Be Equal As Numbers    ${tiempo_reintentos}    ${tiempo_esperado_segundos}    msg=Tiempo entre reintentos no coincide

Obtener Log De Transacciones Para Validar Reintentos
    [Arguments]    ${transaction_id}
    # Obtener log detallado de transacciones para verificar cada intento
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${response}=    GET On Session    capa_integracion    /logs/transacciones/${transaction_id}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    [Return]    ${response}

Verificar Registro De Cada Intento En Log
    [Arguments]    ${log_response}    ${numero_intentos_esperado}
    # Verificar que el log contiene registro de cada intento con timestamp y resultado
    ${log_json}=    Set Variable    ${log_response.json()}

    Dictionary Should Contain Key    ${log_json}    intentos    msg=Log no contiene lista de intentos
    ${intentos}=    Get From Dictionary    ${log_json}    intentos

    ${numero_intentos}=    Get Length    ${intentos}
    Should Be Equal As Numbers    ${numero_intentos}    ${numero_intentos_esperado}    msg=Número de intentos registrados no coincide

    # Verificar que cada intento tiene timestamp, número de intento y resultado
    FOR    ${intento}    IN    @{intentos}
        Dictionary Should Contain Key    ${intento}    timestamp    msg=Intento no contiene timestamp
        Dictionary Should Contain Key    ${intento}    numeroIntento    msg=Intento no contiene número de intento
        Dictionary Should Contain Key    ${intento}    resultado    msg=Intento no contiene resultado
    END

Verificar Que Log Muestra Número De Intento Y Timestamp
    [Arguments]    ${log_response}
    # Verificar que cada registro en el log muestra número de intento y timestamp
    ${log_json}=    Set Variable    ${log_response.json()}
    ${intentos}=    Get From Dictionary    ${log_json}    intentos

    FOR    ${intento}    IN    @{intentos}
        ${numero_intento}=    Get From Dictionary    ${intento}    numeroIntento
        ${timestamp}=    Get From Dictionary    ${intento}    timestamp
        Should Not Be Empty    ${numero_intento}    msg=Número de intento está vacío
        Should Not Be Empty    ${timestamp}    msg=Timestamp está vacío
        Log    Intento #${numero_intento} registrado en ${timestamp}
    END

Configurar Servicio BES Para Generar XML Mal Formado
    [Arguments]    ${numero_telefonico}
    # Configurar BES para devolver XML mal formado usando header especial de simulación
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Simulate-Error=ESB9
    ...    X-Simulate-Malformed-XML=true
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Detecta XML Mal Formado
    [Arguments]    ${response}
    # Verificar que el ESB detectó que el XML de respuesta de BES está mal formado
    Should Be Equal As Numbers    ${response.status_code}    500

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB9}    msg=Código de error incorrecto

Verificar Que ESB Genera Código Error ESB9
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB9 con mensaje de esquema de salida no válido
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB9
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB9}    msg=Código de error incorrecto. Esperado: ESB9, Actual: ${codigo_error}

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_ESQUEMA_SALIDA_INVALIDO}    msg=Mensaje de error incorrecto

Verificar Que No Se Aplica Reintento Automático Para Error ESB9
    [Arguments]    ${response}
    # Verificar que el error ESB9 está marcado sin reintento ya que es error de validación
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    N    msg=Error de validación ESB9 no debe permitir reintento. Esperado: N, Actual: ${reintento_permitido}

Simular Falla De Infraestructura Sin Respuesta Del Proveedor BES
    [Arguments]    ${numero_telefonico}
    # Simular falla de infraestructura que impide que BES devuelva respuesta
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Simulate-Error=ESB10
    ...    X-Simulate-No-Response=true
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Genera Código Error ESB10 Por Falla De Infraestructura
    [Arguments]    ${response}
    # Verificar que el ESB detecta falla de infraestructura sin respuesta y retorna ESB10
    Should Be Equal As Numbers    ${response.status_code}    504

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB10
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB10}    msg=Código de error incorrecto. Esperado: ESB10, Actual: ${codigo_error}

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_SIN_RESPUESTA_PROVEEDOR}    msg=Mensaje de error incorrecto

Verificar Que ESB Ejecuta Mecanismo De Reintento Automático Para ESB10
    [Arguments]    ${response}
    # Verificar que el ESB ejecutó reintentos automáticos para la falla de infraestructura
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    reintentoEjecutado    msg=Response no indica que se ejecutó reintento automático
    ${reintento_ejecutado}=    Get From Dictionary    ${response_json}    reintentoEjecutado
    Should Be Equal As Strings    ${reintento_ejecutado}    S    msg=ESB no ejecutó el reintento automático para falla de infraestructura

Verificar Registro De Falla De Infraestructura En Log
    [Arguments]    ${log_response}    ${numero_reintentos_esperado}
    # Verificar que el log de incidentes registró la falla de infraestructura con timestamp y reintentos
    ${log_json}=    Set Variable    ${log_response.json()}

    Dictionary Should Contain Key    ${log_json}    tipoIncidente    msg=Log no contiene tipo de incidente
    ${tipo_incidente}=    Get From Dictionary    ${log_json}    tipoIncidente
    Should Be Equal As Strings    ${tipo_incidente}    FALLA_INFRAESTRUCTURA    msg=Tipo de incidente incorrecto

    Dictionary Should Contain Key    ${log_json}    timestamp    msg=Log no contiene timestamp del incidente
    Dictionary Should Contain Key    ${log_json}    detallesInfraestructura    msg=Log no contiene detalles de infraestructura
    Dictionary Should Contain Key    ${log_json}    numeroReintentosRealizados    msg=Log no contiene número de reintentos realizados

    ${numero_reintentos_log}=    Get From Dictionary    ${log_json}    numeroReintentosRealizados
    Should Be Equal As Numbers    ${numero_reintentos_log}    ${numero_reintentos_esperado}    msg=Número de reintentos en log no coincide

Configurar Consumidor Sin Privilegios Para Operación ConsultarPaguitos
    # Configurar un consumidor registrado en ESB pero sin permisos para invocar la operación específica
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${config}=    Create Dictionary
    ...    consumidorId=consumidor_sin_privilegios
    ...    operacion=ConsultarPaguitos
    ...    servicio=AmigoPaguitosPagosService
    ...    privilegiosAsignados=N

    ${response}=    PUT On Session    capa_integracion    /config/permisos    json=${config}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    Log    Consumidor configurado sin privilegios para operación ConsultarPaguitos

Invocar Servicio AmigoPaguitosPagosService Sin Privilegios
    [Arguments]    ${numero_telefonico}
    # Invocar servicio con header que identifica al consumidor sin privilegios
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Consumer-ID=consumidor_sin_privilegios
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Valida Privilegios Del Consumidor
    [Arguments]    ${response}
    # Verificar que el ESB ejecutó la validación de permisos antes de procesar la petición
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    validacionPrivilegios    msg=Response no indica que se validaron privilegios
    ${validacion_privilegios}=    Get From Dictionary    ${response_json}    validacionPrivilegios
    Should Be Equal As Strings    ${validacion_privilegios}    ejecutada    msg=ESB no ejecutó validación de privilegios

Verificar Que ESB Genera Código Error ESB11 Por Falta De Privilegios
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB11 por falta de privilegios
    Should Be Equal As Numbers    ${response.status_code}    403

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB11
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB11}    msg=Código de error incorrecto. Esperado: ESB11, Actual: ${codigo_error}

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_SIN_PRIVILEGIOS}    msg=Mensaje de error incorrecto

Verificar Que No Se Aplica Reintento Automático Para Error De Autorización
    [Arguments]    ${response}
    # Verificar que el error ESB11 está marcado sin reintento ya que es error de autorización
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    N    msg=Error de autorización ESB11 no debe permitir reintento. Esperado: N, Actual: ${reintento_permitido}

# ============================================
# Keywords para Manejo de Error ESB11 - Autenticación Incorrecta por Valores de sendBy y user
# ============================================

Invocar Servicio AmigoPaguitosPagosService Con Headers De Autenticacion Incorrectos
    [Arguments]    ${numero_telefonico}    ${sendby}    ${user}
    # Invocar servicio con headers de autenticación incorrectos (sendBy y user no válidos para el ambiente)
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    sendBy=${sendby}
    ...    user=${user}
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Detecta Valores De Autenticacion No Corresponden Al Ambiente
    [Arguments]    ${response}
    # Verificar que el ESB detectó que los valores de sendBy y user no corresponden al ambiente configurado
    Should Be Equal As Numbers    ${response.status_code}    403

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    validacionAutenticacion    msg=Response no indica que se validó autenticación
    ${validacion_autenticacion}=    Get From Dictionary    ${response_json}    validacionAutenticacion
    Should Be Equal As Strings    ${validacion_autenticacion}    fallida    msg=ESB no detectó valores incorrectos de autenticación

Verificar Que ESB Genera Código Error ESB11 Por Autenticación Incorrecta
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB11 por autenticación incorrecta
    Should Be Equal As Numbers    ${response.status_code}    403

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB11
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB11}    msg=Código de error incorrecto. Esperado: ESB11, Actual: ${codigo_error}

    # Verificar mensaje de error indica autenticación incorrecta
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain Any    ${mensaje_error}    autenticación    privilegios    msg=Mensaje de error no indica autenticación incorrecta

Verificar Que Mensaje De Error Especifica Parametros Con Valores Incorrectos
    [Arguments]    ${response}
    # Verificar que el mensaje de error especifica qué parámetros (sendBy, user o ambos) tienen valores incorrectos
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    parametrosIncorrectos    msg=Response no contiene información sobre parámetros incorrectos
    ${parametros_incorrectos}=    Get From Dictionary    ${response_json}    parametrosIncorrectos

    # Verificar que se especifica al menos un parámetro incorrecto
    Should Not Be Empty    ${parametros_incorrectos}    msg=Response no especifica qué parámetros tienen valores incorrectos

    # Verificar que el detalle indica sendBy o user o ambos
    Log    Parámetros con valores incorrectos: ${parametros_incorrectos}

# ============================================
# Keywords para Manejo de Error ESB11 - Token Inválido
# ============================================

Invocar Servicio AmigoPaguitosPagosService Con Token Invalido
    [Arguments]    ${numero_telefonico}    ${token_invalido}
    # Invocar servicio con token de autenticación inválido, expirado o que no corresponde al ambiente
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    Authorization=Bearer ${token_invalido}
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Valida Token De Autenticacion
    [Arguments]    ${response}
    # Verificar que el ESB ejecutó la validación del token antes de procesar la petición
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    validacionToken    msg=Response no indica que se validó el token
    ${validacion_token}=    Get From Dictionary    ${response_json}    validacionToken
    Should Be Equal As Strings    ${validacion_token}    ejecutada    msg=ESB no ejecutó validación de token

Verificar Que ESB Detecta Token Invalido O No Corresponde Al Ambiente
    [Arguments]    ${response}
    # Verificar que el ESB detectó que el token es inválido, expirado o no corresponde al ambiente
    Should Be Equal As Numbers    ${response.status_code}    403

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    validacionToken    msg=Response no indica que se validó el token
    ${validacion_token}=    Get From Dictionary    ${response_json}    validacionToken
    Should Be Equal As Strings    ${validacion_token}    fallida    msg=ESB no detectó token inválido

Verificar Que ESB Genera Código Error ESB11 Por Token Invalido
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB11 por token inválido
    Should Be Equal As Numbers    ${response.status_code}    403

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB11
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB11}    msg=Código de error incorrecto. Esperado: ESB11, Actual: ${codigo_error}

    # Verificar mensaje de error indica token inválido
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain Any    ${mensaje_error}    Token    token    privilegios    msg=Mensaje de error no indica token inválido

Verificar Que Mensaje De Error Especifica Descripcion De Token Invalido
    [Arguments]    ${response}
    # Verificar que el mensaje de error especifica descripción específica de token inválido
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    descripcionError    msg=Response no contiene descripción del error
    ${descripcion_error}=    Get From Dictionary    ${response_json}    descripcionError

    # Verificar que la descripción indica problema con el token
    Should Not Be Empty    ${descripcion_error}    msg=Descripción del error está vacía
    Should Contain Any    ${descripcion_error}    Token inválido    Token expirado    Token no corresponde    msg=Descripción no especifica el problema con el token

    Log    Descripción del error de token: ${descripcion_error}

Obtener Log De Seguridad Para Validar Intento Con Token Invalido
    [Arguments]    ${transaction_id}
    # Obtener log de seguridad para verificar registro de intento con token inválido
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${response}=    GET On Session    capa_integracion    /logs/seguridad/${transaction_id}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    [Return]    ${response}

Verificar Registro De Intento Con Token Invalido En Log De Seguridad
    [Arguments]    ${log_response}
    # Verificar que el log de seguridad registró el intento con token inválido con timestamp, token y origen
    ${log_json}=    Set Variable    ${log_response.json()}

    Dictionary Should Contain Key    ${log_json}    tipoIncidente    msg=Log no contiene tipo de incidente
    ${tipo_incidente}=    Get From Dictionary    ${log_json}    tipoIncidente
    Should Be Equal As Strings    ${tipo_incidente}    TOKEN_INVALIDO    msg=Tipo de incidente incorrecto

    # Verificar timestamp del incidente
    Dictionary Should Contain Key    ${log_json}    timestamp    msg=Log no contiene timestamp del incidente
    ${timestamp}=    Get From Dictionary    ${log_json}    timestamp
    Should Not Be Empty    ${timestamp}    msg=Timestamp del intento está vacío

    # Verificar que se registró el token usado
    Dictionary Should Contain Key    ${log_json}    tokenUsado    msg=Log no contiene el token usado en el intento
    ${token_usado}=    Get From Dictionary    ${log_json}    tokenUsado
    Should Not Be Empty    ${token_usado}    msg=Token usado en log está vacío

    # Verificar origen de la petición
    Dictionary Should Contain Key    ${log_json}    origenPeticion    msg=Log no contiene origen de la petición
    ${origen_peticion}=    Get From Dictionary    ${log_json}    origenPeticion
    Should Not Be Empty    ${origen_peticion}    msg=Origen de la petición está vacío

    Log    Intento registrado - Timestamp: ${timestamp}, Token: ${token_usado}, Origen: ${origen_peticion}

# ============================================
# Keywords para Manejo de Error ESB11 - ClientId Incorrecto Según Ambiente BUS
# ============================================

Invocar Servicio AmigoPaguitosPagosService Con ClientId Incorrecto
    [Arguments]    ${numero_telefonico}    ${client_id_incorrecto}
    # Invocar servicio con ClientId que no corresponde al ambiente del BUS configurado
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    ClientId=${client_id_incorrecto}
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Valida ClientId Del Consumidor
    [Arguments]    ${response}
    # Verificar que el ESB ejecutó la validación de ClientId antes de procesar la petición
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    validacionClientId    msg=Response no indica que se validó ClientId
    ${validacion_client_id}=    Get From Dictionary    ${response_json}    validacionClientId
    Should Be Equal As Strings    ${validacion_client_id}    ejecutada    msg=ESB no ejecutó validación de ClientId

Verificar Que ESB Detecta ClientId No Corresponde Al Ambiente Del BUS
    [Arguments]    ${response}
    # Verificar que el ESB detectó que el ClientId no corresponde al ambiente del BUS configurado
    Should Be Equal As Numbers    ${response.status_code}    403

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    validacionClientId    msg=Response no indica que se validó ClientId
    ${validacion_client_id}=    Get From Dictionary    ${response_json}    validacionClientId
    Should Be Equal As Strings    ${validacion_client_id}    fallida    msg=ESB no detectó ClientId incorrecto

Verificar Que ESB Genera Código Error ESB11 Por ClientId Incorrecto
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB11 por ClientId incorrecto
    Should Be Equal As Numbers    ${response.status_code}    403

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB11
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB11}    msg=Código de error incorrecto. Esperado: ESB11, Actual: ${codigo_error}

    # Verificar mensaje de error indica ClientId incorrecto
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain Any    ${mensaje_error}    ClientId    privilegios    msg=Mensaje de error no indica ClientId incorrecto

Verificar Que Mensaje De Error Especifica ClientId No Valido Para Ambiente
    [Arguments]    ${response}
    # Verificar que el mensaje de error especifica que el ClientId no es válido para el ambiente
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    descripcionError    msg=Response no contiene descripción del error
    ${descripcion_error}=    Get From Dictionary    ${response_json}    descripcionError

    # Verificar que la descripción indica problema con el ClientId y el ambiente
    Should Not Be Empty    ${descripcion_error}    msg=Descripción del error está vacía
    Should Contain Any    ${descripcion_error}    ClientId no válido    ClientId incorrecto    no corresponde al ambiente    msg=Descripción no especifica el problema con el ClientId

    Log    Descripción del error de ClientId: ${descripcion_error}

Verificar Que Consumidor Debe Garantizar Envio De ClientId Correcto Segun Ambiente
    [Arguments]    ${response}
    # Verificar que el mensaje de error orienta al consumidor sobre verificar el ClientId según el ambiente objetivo
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    mensajeOrientacion    msg=Response no contiene mensaje de orientación al consumidor
    ${mensaje_orientacion}=    Get From Dictionary    ${response_json}    mensajeOrientacion

    # Verificar que el mensaje orienta sobre verificar el ClientId según el ambiente
    Should Not Be Empty    ${mensaje_orientacion}    msg=Mensaje de orientación está vacío
    Should Contain Any    ${mensaje_orientacion}    verificar ClientId    ambiente correcto    ambiente objetivo    msg=Mensaje no orienta sobre verificar ClientId según ambiente

    Log    Mensaje de orientación al consumidor: ${mensaje_orientacion}

# ============================================
# Keywords para Manejo de Error ESB12 - Cola de Respuesta No Válida en Mensajería
# ============================================

Configurar ESB Con Cola De Respuesta No Válida Para Mensajería
    [Arguments]    ${cola_respuesta_invalida}
    # Configurar el ESB con una cola de respuesta que no existe o no es accesible para mediaciones que usan mensajería
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${config}=    Create Dictionary
    ...    colaRespuesta=${cola_respuesta_invalida}
    ...    tipoRecurso=mensajeria
    ...    estadoCola=no_valida

    ${response}=    PUT On Session    capa_integracion    /config/colas-mensajeria    json=${config}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    Log    ESB configurado con cola de respuesta no válida: ${cola_respuesta_invalida}

Enviar Petición Desde Amigo Paguitos Que Requiera Uso De Mensajería En ESB
    [Arguments]    ${numero_telefonico}
    # Enviar petición que requiere uso de recursos de mensajería en el ESB
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Require-Messaging=true
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Detecta Cola De Respuesta No Válida Durante Procesamiento
    [Arguments]    ${response}
    # Verificar que el ESB detectó que la cola de respuesta configurada no existe o no es accesible
    Should Be Equal As Numbers    ${response.status_code}    500

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    validacionCola    msg=Response no indica que se validó la cola
    ${validacion_cola}=    Get From Dictionary    ${response_json}    validacionCola
    Should Be Equal As Strings    ${validacion_cola}    fallida    msg=ESB no detectó cola de respuesta inválida

Verificar Que ESB Genera Código Error ESB12 Por Cola De Respuesta No Válida
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB12 por cola de respuesta no válida en mensajería
    Should Be Equal As Numbers    ${response.status_code}    500

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB12
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB12}    msg=Código de error incorrecto. Esperado: ESB12, Actual: ${codigo_error}

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_COLA_RESPUESTA_INVALIDA}    msg=Mensaje de error incorrecto

Verificar Que ESB Ejecuta Reintento Automático Para Error ESB12
    [Arguments]    ${response}
    # Verificar que el ESB ejecutó reintentos automáticos para la cola de respuesta no válida
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    reintentoEjecutado    msg=Response no indica que se ejecutó reintento automático
    ${reintento_ejecutado}=    Get From Dictionary    ${response_json}    reintentoEjecutado
    Should Be Equal As Strings    ${reintento_ejecutado}    S    msg=ESB no ejecutó el reintento automático para cola inválida

Obtener Log De Infraestructura Para Validar Cola Mensajería
    [Arguments]    ${transaction_id}
    # Obtener log de infraestructura para verificar detalles del problema con la cola de mensajería
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${response}=    GET On Session    capa_integracion    /logs/infraestructura/${transaction_id}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    [Return]    ${response}

Verificar Registro De Cola Inválida Y Reintentos En Log De Infraestructura
    [Arguments]    ${log_response}
    # Verificar que el log de infraestructura registra el nombre de la cola inválida, error y reintentos
    ${log_json}=    Set Variable    ${log_response.json()}

    Dictionary Should Contain Key    ${log_json}    tipoIncidente    msg=Log no contiene tipo de incidente
    ${tipo_incidente}=    Get From Dictionary    ${log_json}    tipoIncidente
    Should Be Equal As Strings    ${tipo_incidente}    COLA_RESPUESTA_INVALIDA    msg=Tipo de incidente incorrecto

    # Verificar nombre de la cola inválida
    Dictionary Should Contain Key    ${log_json}    nombreColaInvalida    msg=Log no contiene nombre de cola inválida
    ${nombre_cola}=    Get From Dictionary    ${log_json}    nombreColaInvalida
    Should Not Be Empty    ${nombre_cola}    msg=Nombre de cola inválida está vacío

    # Verificar error de acceso
    Dictionary Should Contain Key    ${log_json}    errorAcceso    msg=Log no contiene error de acceso a cola
    ${error_acceso}=    Get From Dictionary    ${log_json}    errorAcceso
    Should Not Be Empty    ${error_acceso}    msg=Error de acceso está vacío

    # Verificar acciones de reintento
    Dictionary Should Contain Key    ${log_json}    accionesReintento    msg=Log no contiene acciones de reintento
    ${acciones_reintento}=    Get From Dictionary    ${log_json}    accionesReintento
    Should Not Be Empty    ${acciones_reintento}    msg=Acciones de reintento están vacías

    Log    Cola inválida: ${nombre_cola}, Error: ${error_acceso}, Reintentos: ${acciones_reintento}

# ============================================
# Keywords para Manejo de Error ESB14 - Esquema Inválido en Petición a Proveedor
# ============================================

Configurar ESB Con Transformación Incorrecta Hacia BES
    # Configurar el ESB con una transformación defectuosa que genera peticiones inválidas hacia BES
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${config}=    Create Dictionary
    ...    transformacionDefectuosa=true
    ...    generarXMLInvalido=true
    ...    servicioDestino=BES

    ${response}=    PUT On Session    capa_integracion    /config/transformaciones    json=${config}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    Log    ESB configurado con transformación incorrecta que generará peticiones inválidas hacia BES

Invocar Servicio PACPagosService Con ESB Configurado Incorrectamente
    [Arguments]    ${numero_telefonico}
    # Invocar servicio con configuración defectuosa que provocará generación de petición inválida hacia BES
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Simulate-Error=ESB14
    ...    X-Invalid-Request-To-Provider=true
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Detecta Petición Inválida Hacia Proveedor
    [Arguments]    ${response}
    # Verificar que el ESB detectó internamente que la petición generada hacia BES es inválida
    Should Be Equal As Numbers    ${response.status_code}    500

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    validacionPeticionProveedor    msg=Response no indica que se validó petición hacia proveedor
    ${validacion_peticion}=    Get From Dictionary    ${response_json}    validacionPeticionProveedor
    Should Be Equal As Strings    ${validacion_peticion}    fallida    msg=ESB no detectó petición inválida hacia proveedor

Verificar Que ESB Genera Código Error ESB14 Por Esquema Inválido Hacia Proveedor
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB14 por petición inválida hacia proveedor
    Should Be Equal As Numbers    ${response.status_code}    500

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB14
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB14}    msg=Código de error incorrecto. Esperado: ESB14, Actual: ${codigo_error}

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_ESQUEMA_INVALIDO_PETICION}    msg=Mensaje de error incorrecto

Verificar Que Error Indica Levantar Incidente A TI
    [Arguments]    ${response}
    # Verificar que el mensaje de error indica que se debe levantar incidente a TI para análisis
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    accionRecomendada    msg=Response no contiene acción recomendada
    ${accion_recomendada}=    Get From Dictionary    ${response_json}    accionRecomendada
    Should Contain Any    ${accion_recomendada}    levantar incidente    TI    análisis    configuración    msg=Acción recomendada no indica levantar incidente a TI

    # Verificar que no se debe reintentar
    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    N    msg=Error de configuración ESB14 no debe permitir reintento. Esperado: N, Actual: ${reintento_permitido}

Verificar Que No Se Invocó BES Por Petición Inválida
    [Arguments]    ${response}
    # Verificar que la petición no llegó a BES porque el ESB detectó el error antes de enviarla
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    peticionEnviadaABES    msg=Response no indica si se envió petición a BES
    ${peticion_enviada}=    Get From Dictionary    ${response_json}    peticionEnviadaABES
    Should Be Equal As Strings    ${peticion_enviada}    N    msg=ESB no debió enviar petición inválida a BES

    Dictionary Should Contain Key    ${response_json}    validacionPreenvio    msg=Response no indica validación previa al envío
    ${validacion_preenvio}=    Get From Dictionary    ${response_json}    validacionPreenvio
    Should Be Equal As Strings    ${validacion_preenvio}    ejecutada    msg=ESB debió validar antes de enviar a BES

# ============================================
# Keywords para Manejo de Error ESB15 - Esquema Inválido en Respuesta de Proveedor
# ============================================

Configurar Servicios BES Para Generar Respuestas Con Esquema Inválido
    # Configurar servicios de BES para devolver respuestas con esquema inválido o XML mal formado
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${config}=    Create Dictionary
    ...    servicios=BES
    ...    generarRespuestaInvalida=true
    ...    esquemaInvalido=true
    ...    tipoError=ESB15

    ${response}=    PUT On Session    capa_integracion    /config/simulacion-respuestas-bes    json=${config}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    Log    Servicios BES configurados para generar respuestas con esquema inválido

Simular Respuesta BES Con Esquema Inválido
    [Arguments]    ${numero_telefonico}
    # Simular respuesta de BES con esquema inválido usando header especial de simulación
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Simulate-Error=ESB15
    ...    X-Simulate-Invalid-Provider-Response=true
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Detecta Respuesta Con Esquema Inválido Del Proveedor
    [Arguments]    ${response}
    # Verificar que el ESB detectó que la respuesta del proveedor BES tiene esquema inválido
    Should Be Equal As Numbers    ${response.status_code}    500

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    validacionRespuestaProveedor    msg=Response no indica que se validó respuesta del proveedor
    ${validacion_respuesta}=    Get From Dictionary    ${response_json}    validacionRespuestaProveedor
    Should Be Equal As Strings    ${validacion_respuesta}    fallida    msg=ESB no detectó esquema inválido en respuesta del proveedor

Verificar Que ESB Genera Código Error ESB15 Por Esquema Inválido En Respuesta
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB15 por respuesta inválida del proveedor
    Should Be Equal As Numbers    ${response.status_code}    500

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB15
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB15}    msg=Código de error incorrecto. Esperado: ESB15, Actual: ${codigo_error}

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_ESQUEMA_INVALIDO_RESPUESTA}    msg=Mensaje de error incorrecto

Verificar Que Error ESB15 Indica Levantar Incidente A TI Para Análisis BES
    [Arguments]    ${response}
    # Verificar que el mensaje de error indica que se debe levantar incidente a TI para análisis del proveedor BES
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    accionRecomendada    msg=Response no contiene acción recomendada
    ${accion_recomendada}=    Get From Dictionary    ${response_json}    accionRecomendada
    Should Contain Any    ${accion_recomendada}    levantar incidente    TI    análisis    proveedor    BES    msg=Acción recomendada no indica levantar incidente a TI para análisis del proveedor

    # Verificar que no se debe reintentar
    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    N    msg=Error de validación ESB15 no debe permitir reintento. Esperado: N, Actual: ${reintento_permitido}

Verificar Que No Se Aplica Reintento Automático Para Error ESB15
    [Arguments]    ${response}
    # Verificar que el error ESB15 está marcado sin reintento ya que es error de validación de respuesta
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    N    msg=Error de validación ESB15 no debe permitir reintento. Esperado: N, Actual: ${reintento_permitido}

    # Verificar que no se ejecutó reintento
    Dictionary Should Contain Key    ${response_json}    reintentoEjecutado    msg=Response no indica si se ejecutó reintento
    ${reintento_ejecutado}=    Get From Dictionary    ${response_json}    reintentoEjecutado
    Should Be Equal As Strings    ${reintento_ejecutado}    N    msg=No se debe ejecutar reintento para error de validación ESB15

# ============================================
# Keywords para Manejo de Error ESB8/ESB16 - Mala Configuración de Dependencias en el BUS
# ============================================

Configurar Servicio PACPagosService Con Dependencias Incorrectas
    [Arguments]    ${tipo_error_config}
    # Configurar el servicio PACPagosService con dependencias incorrectas: URLs inválidas, credenciales erróneas, timeouts mal configurados, Queue Managers inexistentes
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${config}=    Create Dictionary
    ...    servicioAfectado=PACPagosService
    ...    tipoErrorConfiguracion=${tipo_error_config}
    ...    urlsInvalidas=true
    ...    credencialesErroneas=true
    ...    timeoutsMalConfigurados=true
    ...    queueManagersInexistentes=true

    ${response}=    PUT On Session    capa_integracion    /config/dependencias-esb    json=${config}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    Log    Servicio PACPagosService configurado con dependencias incorrectas: ${tipo_error_config}

Invocar Servicio PACPagosService Con Dependencias Mal Configuradas
    [Arguments]    ${numero_telefonico}
    # Invocar el servicio PACPagosService que tiene dependencias mal configuradas en el ESB
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Simulate-Error=ESB8
    ...    X-Config-Error-Dependencies=true
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Detecta Error Al Utilizar Dependencias Mal Configuradas
    [Arguments]    ${response}
    # Verificar que el ESB encontró errores al intentar utilizar las configuraciones de dependencias
    Should Be True    ${response.status_code} == 500 or ${response.status_code} == 503    msg=Status code no indica error de configuración

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    errorConfiguracion    msg=Response no indica que hubo error de configuración
    ${error_configuracion}=    Get From Dictionary    ${response_json}    errorConfiguracion
    Should Be Equal As Strings    ${error_configuracion}    detectado    msg=ESB no detectó error de configuración de dependencias

Verificar Que ESB Genera Código Error ESB8 Por Mala Configuración De Dependencias
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB8 o ESB16 por mala configuración de dependencias
    Should Be True    ${response.status_code} == 500 or ${response.status_code} == 503    msg=Status code no indica error de configuración

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB8 o ESB16
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Match Regexp    ${codigo_error}    ^(ESB8|ESB16)$    msg=Código de error incorrecto. Esperado: ESB8 o ESB16, Actual: ${codigo_error}

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain Any    ${mensaje_error}    configuración    dependencias    BUS    msg=Mensaje de error no indica problema de configuración de dependencias

Verificar Que Mensaje De Error Especifica Mala Configuración De Dependencias En BUS
    [Arguments]    ${response}
    # Verificar que el mensaje de error describe claramente que existe mala configuración de dependencias
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    descripcionError    msg=Response no contiene descripción del error
    ${descripcion_error}=    Get From Dictionary    ${response_json}    descripcionError

    # Verificar que la descripción indica tipo de problema de configuración encontrado
    Should Not Be Empty    ${descripcion_error}    msg=Descripción del error está vacía
    Should Contain Any    ${descripcion_error}    mala configuración    dependencias    URLs    credenciales    timeout    Queue Manager    msg=Descripción no especifica el tipo de problema de configuración

    Log    Descripción del error de configuración: ${descripcion_error}

Verificar Que Error Indica No Reintentar Y Escalar A TI Para Corrección
    [Arguments]    ${response}
    # Verificar que el mensaje indica que se debe levantar incidente a TI y no reintentar
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    accionRecomendada    msg=Response no contiene acción recomendada
    ${accion_recomendada}=    Get From Dictionary    ${response_json}    accionRecomendada
    Should Contain Any    ${accion_recomendada}    levantar incidente    TI    análisis    corrección    configuración del ESB    msg=Acción recomendada no indica escalar a TI

    # Verificar que no se debe reintentar
    Dictionary Should Contain Key    ${response_json}    reintentoPermitido    msg=Response no contiene flag de reintento
    ${reintento_permitido}=    Get From Dictionary    ${response_json}    reintentoPermitido
    Should Be Equal As Strings    ${reintento_permitido}    N    msg=Error de configuración no debe permitir reintento. Esperado: N, Actual: ${reintento_permitido}

    Log    Acción recomendada: ${accion_recomendada}

# ============================================
# Keywords para Manejo de Error ESB17 - Encabezado HTTP Inválido
# ============================================

Invocar Servicio PACPagosService Con Encabezados HTTP Invalidos
    [Arguments]    ${numero_telefonico}
    # Invocar servicio sin incluir los encabezados HTTP requeridos (sendBy, user, Token, ClientId)
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Genera Código Error ESB17 Por Encabezado HTTP Invalido
    [Arguments]    ${response}
    # Verificar que el ESB retorna código de error ESB17 por encabezado HTTP inválido
    Should Be Equal As Numbers    ${response.status_code}    400

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB17
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB17}    msg=Código de error incorrecto. Esperado: ESB17, Actual: ${codigo_error}

    # Verificar mensaje de error
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    ${MENSAJE_ERROR_ENCABEZADO_HTTP_INVALIDO}    msg=Mensaje de error incorrecto

Verificar Que Mensaje Indica Encabezados HTTP Requeridos
    [Arguments]    ${response}
    # Verificar que el mensaje de error especifica los encabezados HTTP requeridos
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    encabezadosRequeridos    msg=Response no contiene lista de encabezados requeridos
    ${encabezados_requeridos}=    Get From Dictionary    ${response_json}    encabezadosRequeridos

    # Verificar que se especifican los 4 encabezados obligatorios
    @{headers_esperados}=    Create List    sendBy    user    Token    ClientId

    FOR    ${header_esperado}    IN    @{headers_esperados}
        List Should Contain Value    ${encabezados_requeridos}    ${header_esperado}    msg=Encabezado ${header_esperado} no aparece en la lista de requeridos
    END

    Log    Encabezados HTTP requeridos: ${encabezados_requeridos}

Invocar Servicio PACPagosService Con Encabezados HTTP Corregidos
    [Arguments]    ${numero_telefonico}    ${sendby}    ${user}    ${token}    ${client_id}
    # Invocar servicio con todos los encabezados HTTP requeridos correctamente incluidos
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    sendBy=${sendby}
    ...    user=${user}
    ...    Token=${token}
    ...    ClientId=${client_id}
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Valida Encabezados HTTP Correctamente
    [Arguments]    ${response}
    # Verificar que el ESB validó los encabezados HTTP y permitió el procesamiento
    Should Be Equal As Numbers    ${response.status_code}    200

    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    validacionEncabezados    msg=Response no indica validación de encabezados
    ${validacion_encabezados}=    Get From Dictionary    ${response_json}    validacionEncabezados
    Should Be Equal As Strings    ${validacion_encabezados}    exitosa    msg=ESB no validó los encabezados correctamente

Verificar Que Servicio Retorna Información Cliente Amigo Paguitos Con Codigo ESB0
    [Arguments]    ${response}
    # Verificar que el servicio retorna código ESB0 e información completa del cliente
    Should Be Equal As Numbers    ${response.status_code}    200

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de éxito ESB0
    Dictionary Should Contain Key    ${response_json}    codigoRespuesta    msg=Response no contiene código de respuesta
    ${codigo_respuesta}=    Get From Dictionary    ${response_json}    codigoRespuesta
    Should Be Equal As Strings    ${codigo_respuesta}    ${CODIGO_ERROR_ESB0}    msg=Código de respuesta incorrecto

    # Verificar que contiene información del cliente de Amigo Paguitos
    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene serviceNumber
    Dictionary Should Contain Key    ${response_json}    subscriberId    msg=Response no contiene subscriberId
    Dictionary Should Contain Key    ${response_json}    accountId    msg=Response no contiene accountId
    Dictionary Should Contain Key    ${response_json}    CustID    msg=Response no contiene CustID
    Dictionary Should Contain Key    ${response_json}    billcycletype    msg=Response no contiene billcycletype
    Dictionary Should Contain Key    ${response_json}    IMEI    msg=Response no contiene IMEI
    Dictionary Should Contain Key    ${response_json}    balancetype    msg=Response no contiene balancetype
    Dictionary Should Contain Key    ${response_json}    ARBalance    msg=Response no contiene ARBalance
    Dictionary Should Contain Key    ${response_json}    customer    msg=Response no contiene datos del customer

# ============================================
# Keywords para Escalamiento a TI por Fallas Persistentes (Caso TC060)
# ============================================

Simular Falla Persistente De Conexión Con BES
    [Arguments]    ${numero_telefonico}
    [Documentation]    Simula falla de conexión persistente que se mantiene después de todos los reintentos
    Create Session    capa_integracion    ${API_CAPA_INTEGRACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    X-Simulate-Error=ESB4
    ...    X-Simulate-Persistent-Failure=true
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    capa_integracion    ${API_ENDPOINT_PAC_PAGOS_SERVICE_CONSULTA}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Ejecutó Todos Los Reintentos Configurados
    [Arguments]    ${response}    ${numero_reintentos_esperado}
    [Documentation]    Verifica que el ESB ejecutó todos los reintentos configurados antes de devolver el error final
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    numeroReintentos    msg=Response no contiene número de reintentos ejecutados
    ${numero_reintentos}=    Get From Dictionary    ${response_json}    numeroReintentos
    Should Be Equal As Numbers    ${numero_reintentos}    ${numero_reintentos_esperado}    msg=ESB no ejecutó todos los reintentos. Esperado: ${numero_reintentos_esperado}, Actual: ${numero_reintentos}

Verificar Que Todos Los Reintentos Fallaron Con El Mismo Error ESB4
    [Arguments]    ${response}
    [Documentation]    Verifica que todos los intentos fallaron con el mismo código de error ESB4
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que el error final es ESB4
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB4}    msg=Código de error incorrecto. Esperado: ESB4, Actual: ${codigo_error}

    # Verificar que todos los intentos fallaron con ESB4
    Dictionary Should Contain Key    ${response_json}    historialReintentos    msg=Response no contiene historial de reintentos
    ${historial_reintentos}=    Get From Dictionary    ${response_json}    historialReintentos

    FOR    ${intento}    IN    @{historial_reintentos}
        ${codigo_error_intento}=    Get From Dictionary    ${intento}    codigoError
        Should Be Equal As Strings    ${codigo_error_intento}    ${CODIGO_ERROR_ESB4}    msg=Intento falló con código diferente a ESB4: ${codigo_error_intento}
    END

Verificar Que Sistema Genera Mensaje Levantar Incidente A TI
    [Arguments]    ${response}
    [Documentation]    Verifica que el mensaje de error indica que se debe levantar incidente a TI para análisis
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    mensajeEscalamiento    msg=Response no contiene mensaje de escalamiento
    ${mensaje_escalamiento}=    Get From Dictionary    ${response_json}    mensajeEscalamiento
    Should Contain    ${mensaje_escalamiento}    Levantar incidente a TI para realizar análisis e identificar origen de la falla    msg=Mensaje de escalamiento incorrecto

Verificar Que Error Final Incluye Instrucciones Para Contactar Soporte DAI
    [Arguments]    ${response}
    [Documentation]    Verifica que el error final contiene instrucciones para contactar soporte DAI
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB4
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ${CODIGO_ERROR_ESB4}    msg=Código de error incorrecto

    # Verificar instrucciones de escalamiento
    Dictionary Should Contain Key    ${response_json}    instruccionesEscalamiento    msg=Response no contiene instrucciones de escalamiento
    ${instrucciones}=    Get From Dictionary    ${response_json}    instruccionesEscalamiento
    Should Contain Any    ${instrucciones}    contactar soporte DAI    soporte DAI    msg=Instrucciones no indican contactar soporte DAI

    Log    Instrucciones de escalamiento: ${instrucciones}
