*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES TelcelInterfaceService
${API_BES_TELCEL_INTERFACE_SERVICE_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_QUERY_CUST_OFFERING_INST}            /QueryCustOfferingInst

*** Keywords ***
Ejecutar API TelcelInterfaceService QueryCustOfferingInst
    [Arguments]    ${cust_id}
    Create Session    bes_telcel_interface_service    ${API_BES_TELCEL_INTERFACE_SERVICE_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    CustID=${cust_id}

    ${response}=    POST On Session    bes_telcel_interface_service    ${API_ENDPOINT_QUERY_CUST_OFFERING_INST}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición QueryCustOfferingInst Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición QueryCustOfferingInst. Status code: ${response.status_code}

Verificar Que Response Contiene Campo installmentPlanInstId
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    installmentPlanInstId    msg=Response no contiene campo installmentPlanInstId

Verificar Que installmentPlanInstId Tiene Valor Numérico Válido
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${installment_plan_inst_id}=    Get From Dictionary    ${response_json}    installmentPlanInstId

    # Verificar que el campo no está vacío
    Should Not Be Empty    ${installment_plan_inst_id}    msg=Campo installmentPlanInstId está vacío

    # Verificar que el valor es numérico
    Should Match Regexp    ${installment_plan_inst_id}    ^[0-9]+$    msg=installmentPlanInstId no es un valor numérico válido: ${installment_plan_inst_id}

Verificar Que installmentPlanInstId Corresponde Al Plan De Financiamiento Activo Del Cliente
    [Arguments]    ${response}    ${cust_id}    ${installment_plan_inst_id_esperado}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta contiene el CustID consultado
    Dictionary Should Contain Key    ${response_json}    CustID    msg=Response no contiene campo CustID
    ${cust_id_response}=    Get From Dictionary    ${response_json}    CustID
    Should Be Equal As Strings    ${cust_id_response}    ${cust_id}    msg=CustID no coincide con el consultado

    # Verificar que el installmentPlanInstId devuelto corresponde al esperado
    ${installment_plan_inst_id}=    Get From Dictionary    ${response_json}    installmentPlanInstId
    Should Be Equal As Strings    ${installment_plan_inst_id}    ${installment_plan_inst_id_esperado}    msg=installmentPlanInstId devuelto no corresponde al plan esperado. Esperado: ${installment_plan_inst_id_esperado}, Actual: ${installment_plan_inst_id}
