*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES TelcelCustomService
${API_BES_TELCEL_CUSTOM_SERVICE_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_QUERY_INSTALLMENT_BY_IMEI}        /queryInstallmentByIMEI

*** Keywords ***
Ejecutar API TelcelCustomService queryInstallmentByIMEI
    [Arguments]    ${imei}
    Create Session    bes_telcel_custom_service    ${API_BES_TELCEL_CUSTOM_SERVICE_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    imei=${imei}

    ${response}=    POST On Session    bes_telcel_custom_service    ${API_ENDPOINT_QUERY_INSTALLMENT_BY_IMEI}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición queryInstallmentByIMEI Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición queryInstallmentByIMEI. Status code: ${response.status_code}

Verificar Que Response Contiene Campos type installmentStatus subsidyStatus
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    type    msg=Response no contiene campo type
    Dictionary Should Contain Key    ${response_json}    installmentStatus    msg=Response no contiene campo installmentStatus
    Dictionary Should Contain Key    ${response_json}    subsidyStatus    msg=Response no contiene campo subsidyStatus

Verificar Que installmentStatus Contiene Valor Válido Del Catálogo De Estatus
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${installment_status}=    Get From Dictionary    ${response_json}    installmentStatus

    Should Not Be Empty    ${installment_status}    msg=Campo installmentStatus está vacío

    # Verificar que el estatus es uno de los valores válidos del catálogo
    Should Match Regexp    ${installment_status}    (Activo|Vencido|Liquidado|Vigente|Cancelado)    msg=installmentStatus no contiene un valor válido del catálogo. Valor actual: ${installment_status}

Verificar Que subsidyStatus Indica Estado Del Subsidio Asociado Al Plan
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${subsidy_status}=    Get From Dictionary    ${response_json}    subsidyStatus

    Should Not Be Empty    ${subsidy_status}    msg=Campo subsidyStatus está vacío

    # Verificar que el subsidyStatus tiene un valor válido
    Should Match Regexp    ${subsidy_status}    (Activo|Inactivo|Aplicado|Pendiente|Cancelado)    msg=subsidyStatus no contiene un valor válido. Valor actual: ${subsidy_status}

Verificar Que Respuesta Cumple Con Esquema Definido Sin Errores De Estructura
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta es un diccionario válido
    Should Be True    isinstance($response_json, dict)    msg=Response no es un diccionario JSON válido

    # Verificar que contiene al menos los campos mínimos requeridos
    Dictionary Should Contain Key    ${response_json}    type    msg=Esquema inválido: falta campo type
    Dictionary Should Contain Key    ${response_json}    installmentStatus    msg=Esquema inválido: falta campo installmentStatus
    Dictionary Should Contain Key    ${response_json}    subsidyStatus    msg=Esquema inválido: falta campo subsidyStatus
