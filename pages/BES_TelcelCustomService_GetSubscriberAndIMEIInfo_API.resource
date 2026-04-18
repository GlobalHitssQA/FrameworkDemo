*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

*** Variables ***
# URLs y Endpoints - BES TelcelCustomService
${API_BES_TELCEL_CUSTOM_SERVICE_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_SUBSCRIBER_AND_IMEI_INFO}     /GetSubscriberAndIMEIInfo

*** Keywords ***
Ejecutar API TelcelCustomService GetSubscriberAndIMEIInfo
    [Arguments]    ${numero_telefonico}
    Create Session    bes_telcel_custom_service    ${API_BES_TELCEL_CUSTOM_SERVICE_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_telcel_custom_service    ${API_ENDPOINT_GET_SUBSCRIBER_AND_IMEI_INFO}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición GetSubscriberAndIMEIInfo Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición GetSubscriberAndIMEIInfo. Status code: ${response.status_code}

Verificar Que Response Contiene Campo IMEI
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    imei    msg=Response no contiene campo IMEI

Verificar Que IMEI Tiene Formato Correcto De 15 Dígitos
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${imei}=    Get From Dictionary    ${response_json}    imei

    # Verificar que el IMEI no está vacío
    Should Not Be Empty    ${imei}    msg=Campo IMEI está vacío

    # Verificar que el IMEI tiene exactamente 15 caracteres
    ${longitud_imei}=    Get Length    ${imei}
    Should Be Equal As Numbers    ${longitud_imei}    15    msg=IMEI no tiene 15 dígitos. Longitud actual: ${longitud_imei}

    # Verificar que el IMEI contiene solo dígitos numéricos
    Should Match Regexp    ${imei}    ^[0-9]{15}$    msg=IMEI contiene caracteres no numéricos o formato inválido: ${imei}

Verificar Que IMEI Corresponde Al Equipo Asociado Al Número Telefónico
    [Arguments]    ${response}    ${numero_telefonico}    ${imei_esperado}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta contiene el número telefónico consultado
    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene campo serviceNumber
    ${service_number}=    Get From Dictionary    ${response_json}    serviceNumber
    Should Be Equal As Strings    ${service_number}    ${numero_telefonico}    msg=serviceNumber no coincide con el número consultado

    # Verificar que el IMEI devuelto corresponde al esperado
    ${imei}=    Get From Dictionary    ${response_json}    imei
    Should Be Equal As Strings    ${imei}    ${imei_esperado}    msg=IMEI devuelto no corresponde al equipo esperado. Esperado: ${imei_esperado}, Actual: ${imei}
