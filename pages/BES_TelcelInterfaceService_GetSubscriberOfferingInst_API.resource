*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

*** Variables ***
# URLs y Endpoints - BES TelcelInterfaceService GetSubscriberOfferingInst
${API_BES_TELCEL_INTERFACE_SERVICE_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_SUBSCRIBER_OFFERING_INST}        /GetSubscriberOfferingInst

*** Keywords ***
Ejecutar API TelcelInterfaceService GetSubscriberOfferingInst
    [Arguments]    ${numero_telefonico}
    Create Session    bes_telcel_interface_service_get_subscriber_offering    ${API_BES_TELCEL_INTERFACE_SERVICE_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_telcel_interface_service_get_subscriber_offering    ${API_ENDPOINT_GET_SUBSCRIBER_OFFERING_INST}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición GetSubscriberOfferingInst Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición GetSubscriberOfferingInst. Status code: ${response.status_code}

Verificar Que Response Contiene Campo installmentPlanInstId
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    installmentPlanInstId    msg=Response no contiene campo installmentPlanInstId

Verificar Que installmentPlanInstId Tiene Valor Válido
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${installment_plan_inst_id}=    Get From Dictionary    ${response_json}    installmentPlanInstId

    # Verificar que el campo no está vacío
    Should Not Be Empty    ${installment_plan_inst_id}    msg=Campo installmentPlanInstId está vacío

    # Verificar que el valor es numérico
    Should Match Regexp    ${installment_plan_inst_id}    ^[0-9]+$    msg=installmentPlanInstId no es un valor numérico válido: ${installment_plan_inst_id}

Verificar Que installmentPlanInstId Corresponde Al Cliente Consultado
    [Arguments]    ${response}    ${numero_telefonico}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta contiene el número telefónico consultado
    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene campo serviceNumber
    ${service_number}=    Get From Dictionary    ${response_json}    serviceNumber
    Should Be Equal As Strings    ${service_number}    ${numero_telefonico}    msg=serviceNumber no coincide con el número consultado

    # Verificar que el installmentPlanInstId existe y no está vacío
    ${installment_plan_inst_id}=    Get From Dictionary    ${response_json}    installmentPlanInstId
    Should Not Be Empty    ${installment_plan_inst_id}    msg=installmentPlanInstId está vacío para el cliente consultado
