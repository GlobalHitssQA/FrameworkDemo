*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES CustomerManagement Service GetAccountInfo
${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_ACCOUNT_INFO}               /GetAccountInfo

*** Keywords ***
Ejecutar API CustomerManagement Service GetAccountInfo
    [Arguments]    ${account_id}
    Create Session    bes_customer_management    ${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    accountId=${account_id}

    ${response}=    POST On Session    bes_customer_management    ${API_ENDPOINT_GET_ACCOUNT_INFO}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición GetAccountInfo Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición GetAccountInfo. Status code: ${response.status_code}

Verificar Que Response Contiene Campo BillcycleTypeId
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    billcycleTypeId    msg=Response no contiene campo billcycleTypeId

    ${billcycle_type_id}=    Get From Dictionary    ${response_json}    billcycleTypeId
    Should Not Be Empty    ${billcycle_type_id}    msg=Campo billcycleTypeId está vacío

    # Validar que el valor es numérico o string válido
    ${billcycle_str}=    Convert To String    ${billcycle_type_id}
    Should Not Be Equal As Strings    ${billcycle_str}    null    msg=Campo billcycleTypeId tiene valor null

Verificar Que Response Contiene Campo AcctCode
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    acctCode    msg=Response no contiene campo acctCode

    ${acct_code}=    Get From Dictionary    ${response_json}    acctCode
    Should Not Be Empty    ${acct_code}    msg=Campo acctCode está vacío

    # Validar que el código de cuenta es un string válido
    ${acct_code_str}=    Convert To String    ${acct_code}
    Should Not Be Equal As Strings    ${acct_code_str}    null    msg=Campo acctCode tiene valor null

Verificar Que Response Contiene Campo CollectionProcessFlag
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    collectionProcessFlag    msg=Response no contiene campo collectionProcessFlag

    ${collection_process_flag}=    Get From Dictionary    ${response_json}    collectionProcessFlag
    Should Not Be Empty    ${collection_process_flag}    msg=Campo collectionProcessFlag está vacío

    # Validar que el flag es un valor válido (true, false, 0, 1, etc.)
    ${flag_str}=    Convert To String    ${collection_process_flag}
    Should Not Be Equal As Strings    ${flag_str}    null    msg=Campo collectionProcessFlag tiene valor null
