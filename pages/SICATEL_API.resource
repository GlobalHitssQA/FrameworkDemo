*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - SICATEL
${API_SICATEL_BASE_URL}                  https://sicatel-telcel-dev.com/api/v1
${API_ENDPOINT_SICATEL_PAC_PAGOS}        /PACPagosService/Consulta

# URLs Capa de Integración
${API_CAPA_INTEGRACION_BASE_URL}         https://capa-integracion-telcel-dev.com/api/v1

# URLs BES - APIs orquestadas por Capa de Integración
${API_BES_CUSTOMER_MANAGEMENT_SERVICE}   https://bes-telcel-dev.com/api/CustomerManagementService
${API_BES_TELCEL_CUSTOM_SERVICE}         https://bes-telcel-dev.com/api/TelcelCustomService
${API_BES_BC_SERVICE}                    https://bes-telcel-dev.com/api/BCService
${API_BES_AR_SERVICE}                    https://bes-telcel-dev.com/api/ArService
${API_BES_TELCEL_INTERFACE_SERVICE}      https://bes-telcel-dev.com/api/TelcelInterfaceService

# Credenciales SICATEL
${SICATEL_API_USER}                      sicatel_user
${SICATEL_API_PASSWORD}                  Sicatel123!
${SICATEL_API_TOKEN}                     ${EMPTY}

# Campos esperados en la respuesta desde SICATEL
@{CAMPOS_ESPERADOS_SICATEL}    serviceNumber    subscriberId    accountId    CustID    IMEI    installmentPlanInstId    totalCycle    ARBalance    Firstname    lastName    CURP    RFC    regionName    cuotas    pagos    fechasVencimiento    statusPrestamo

*** Keywords ***
Autenticar SICATEL Con Permisos De Consulta
    Create Session    sicatel_auth    ${API_SICATEL_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    username=${SICATEL_API_USER}    password=${SICATEL_API_PASSWORD}

    ${response}=    POST On Session    sicatel_auth    /auth/login    json=${payload}    headers=${headers}    expected_status=200

    ${token}=    Get From Dictionary    ${response.json()}    token
    Set Suite Variable    ${SICATEL_API_TOKEN}    ${token}

    Should Not Be Empty    ${SICATEL_API_TOKEN}    msg=Token de autenticación SICATEL no obtenido
    [Return]    ${SICATEL_API_TOKEN}

Invocar Servicio PACPagosService Desde SICATEL Con Número Telefónico
    [Arguments]    ${numero_telefonico}
    Create Session    sicatel    ${API_SICATEL_BASE_URL}    verify=False

    ${headers}=    Create Dictionary
    ...    Content-Type=application/json
    ...    Authorization=Bearer ${SICATEL_API_TOKEN}

    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    sicatel    ${API_ENDPOINT_SICATEL_PAC_PAGOS}    json=${payload}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    [Return]    ${response}

Verificar Que Solicitud Llega A Capa De Integración Desde SICATEL
    [Arguments]    ${response}
    # Verificar que la respuesta tiene código 200, lo que implica que Capa de Integración procesó la solicitud
    Should Be Equal As Numbers    ${response.status_code}    200

    # Verificar que la respuesta contiene metadata de Capa de Integración
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    metadata    msg=Respuesta no contiene metadata de Capa de Integración

    ${metadata}=    Get From Dictionary    ${response_json}    metadata
    Dictionary Should Contain Key    ${metadata}    source    msg=Metadata no contiene source

    ${source}=    Get From Dictionary    ${metadata}    source
    Should Contain    ${source}    SICATEL    msg=Source no indica origen SICATEL

Verificar Que Capa De Integración Orquesta Consultas Hacia APIs De BES
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que metadata contiene información de las APIs consultadas
    ${metadata}=    Get From Dictionary    ${response_json}    metadata
    Dictionary Should Contain Key    ${metadata}    apisConsultadas    msg=Metadata no contiene información de APIs consultadas

    ${apis_consultadas}=    Get From Dictionary    ${metadata}    apisConsultadas

    # Verificar que se consultaron todas las APIs necesarias
    @{apis_esperadas}=    Create List
    ...    CustomerManagementService
    ...    TelcelCustomService
    ...    BCService
    ...    ArService
    ...    TelcelInterfaceService

    FOR    ${api_esperada}    IN    @{apis_esperadas}
        List Should Contain Value    ${apis_consultadas}    ${api_esperada}    msg=API ${api_esperada} no fue consultada por Capa de Integración
    END

Verificar Que BES Devuelve Respuestas Exitosas Para Todas Las Consultas
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que todas las secciones de datos están presentes
    Dictionary Should Contain Key    ${response_json}    datosSubscriptor    msg=Respuesta no contiene datos del suscriptor
    Dictionary Should Contain Key    ${response_json}    datosCuenta    msg=Respuesta no contiene datos de cuenta
    Dictionary Should Contain Key    ${response_json}    datosIMEI    msg=Respuesta no contiene datos de IMEI
    Dictionary Should Contain Key    ${response_json}    informacionParcialidades    msg=Respuesta no contiene información de parcialidades
    Dictionary Should Contain Key    ${response_json}    saldos    msg=Respuesta no contiene saldos
    Dictionary Should Contain Key    ${response_json}    datosPersonales    msg=Respuesta no contiene datos personales del cliente

Verificar Que SICATEL Recibe Información Consolidada Del Cliente
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar campos principales
    FOR    ${campo}    IN    @{CAMPOS_ESPERADOS_SICATEL}
        Dictionary Should Contain Key    ${response_json}    ${campo}    msg=Campo ${campo} no encontrado en respuesta a SICATEL
    END

Verificar Que Response Contiene Desglose De Cuotas
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    cuotas    msg=Respuesta no contiene desglose de cuotas

    ${cuotas}=    Get From Dictionary    ${response_json}    cuotas
    Should Not Be Empty    ${cuotas}    msg=Desglose de cuotas está vacío

Verificar Que Response Contiene Desglose De Pagos
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    pagos    msg=Respuesta no contiene desglose de pagos

    ${pagos}=    Get From Dictionary    ${response_json}    pagos
    Should Not Be Empty    ${pagos}    msg=Desglose de pagos está vacío

Verificar Que Response Contiene Fechas De Vencimiento
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    fechasVencimiento    msg=Respuesta no contiene fechas de vencimiento

    ${fechas}=    Get From Dictionary    ${response_json}    fechasVencimiento
    Should Not Be Empty    ${fechas}    msg=Fechas de vencimiento están vacías

Verificar Que Response Contiene Estatus Del Préstamo
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    statusPrestamo    msg=Respuesta no contiene estatus del préstamo

    ${status}=    Get From Dictionary    ${response_json}    statusPrestamo
    Should Not Be Empty    ${status}    msg=Estatus del préstamo está vacío

Verificar Campo En Response SICATEL
    [Arguments]    ${response}    ${nombre_campo}    ${valor_esperado}
    ${response_json}=    Set Variable    ${response.json()}
    ${valor_actual}=    Get From Dictionary    ${response_json}    ${nombre_campo}
    Should Be Equal As Strings    ${valor_actual}    ${valor_esperado}    msg=Campo ${nombre_campo} no coincide. Esperado: ${valor_esperado}, Actual: ${valor_actual}

Verificar Visualización En Pantalla 360 De SICATEL
    [Arguments]    ${response}
    # Verificar que la respuesta contiene todos los elementos necesarios para pantalla 360
    ${response_json}=    Set Variable    ${response.json()}

    # Campos críticos para pantalla 360
    @{campos_pantalla_360}=    Create List
    ...    serviceNumber
    ...    CustID
    ...    IMEI
    ...    totalCycle
    ...    ARBalance
    ...    cuotas
    ...    pagos
    ...    fechasVencimiento
    ...    statusPrestamo

    FOR    ${campo}    IN    @{campos_pantalla_360}
        Dictionary Should Contain Key    ${response_json}    ${campo}    msg=Campo ${campo} requerido para pantalla 360 no encontrado
    END
