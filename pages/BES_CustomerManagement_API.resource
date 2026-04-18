*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES CustomerManagement Service
${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_SUBSCRIBER_INFO}            /GetSubscriberinfo
${API_ENDPOINT_GET_ACCOUNT_INFO}               /GetAccountInfo

*** Keywords ***
Ejecutar API CustomerManagement Service GetSubscriberinfo
    [Arguments]    ${numero_telefonico}
    Create Session    bes_customer_management    ${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_customer_management    ${API_ENDPOINT_GET_SUBSCRIBER_INFO}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición. Status code: ${response.status_code}

Verificar Que Response Contiene Campo ServiceNumber
    [Arguments]    ${response}    ${numero_esperado}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene campo serviceNumber
    ${service_number}=    Get From Dictionary    ${response_json}    serviceNumber
    Should Be Equal As Strings    ${service_number}    ${numero_esperado}    msg=serviceNumber no coincide. Esperado: ${numero_esperado}, Actual: ${service_number}

Verificar Que Response Contiene Campos SubscriberId ActiveDate StatusTime
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    subscriberId    msg=Response no contiene campo subscriberId
    Dictionary Should Contain Key    ${response_json}    activeDate    msg=Response no contiene campo activeDate
    Dictionary Should Contain Key    ${response_json}    statusTime    msg=Response no contiene campo statusTime

    ${subscriber_id}=    Get From Dictionary    ${response_json}    subscriberId
    ${active_date}=    Get From Dictionary    ${response_json}    activeDate
    ${status_time}=    Get From Dictionary    ${response_json}    statusTime

    Should Not Be Empty    ${subscriber_id}    msg=Campo subscriberId está vacío
    Should Not Be Empty    ${active_date}    msg=Campo activeDate está vacío
    Should Not Be Empty    ${status_time}    msg=Campo statusTime está vacío

Verificar Que Response Contiene Campos PaymentType Status PrimaryOfferingId PrimaryOfferingName
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    paymentType    msg=Response no contiene campo paymentType
    Dictionary Should Contain Key    ${response_json}    status    msg=Response no contiene campo status
    Dictionary Should Contain Key    ${response_json}    primaryOfferingId    msg=Response no contiene campo primaryOfferingId
    Dictionary Should Contain Key    ${response_json}    primaryOfferingName    msg=Response no contiene campo primaryOfferingName

    ${payment_type}=    Get From Dictionary    ${response_json}    paymentType
    ${status}=    Get From Dictionary    ${response_json}    status
    ${primary_offering_id}=    Get From Dictionary    ${response_json}    primaryOfferingId
    ${primary_offering_name}=    Get From Dictionary    ${response_json}    primaryOfferingName

    Should Not Be Empty    ${payment_type}    msg=Campo paymentType está vacío
    Should Not Be Empty    ${status}    msg=Campo status está vacío
    Should Not Be Empty    ${primary_offering_id}    msg=Campo primaryOfferingId está vacío
    Should Not Be Empty    ${primary_offering_name}    msg=Campo primaryOfferingName está vacío

Verificar Que Response Contiene Campos AccountId Y CustID
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    accountId    msg=Response no contiene campo accountId
    Dictionary Should Contain Key    ${response_json}    CustID    msg=Response no contiene campo CustID

    ${account_id}=    Get From Dictionary    ${response_json}    accountId
    ${cust_id}=    Get From Dictionary    ${response_json}    CustID

    Should Not Be Empty    ${account_id}    msg=Campo accountId está vacío
    Should Not Be Empty    ${cust_id}    msg=Campo CustID está vacío

Ejecutar API CustomerManagement Service GetAccountInfo
    [Arguments]    ${account_id}
    Create Session    bes_customer_management    ${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    accountId=${account_id}

    ${response}=    POST On Session    bes_customer_management    ${API_ENDPOINT_GET_ACCOUNT_INFO}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que Response Contiene Campo BillcycleTypeId
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    billcycleTypeId    msg=Response no contiene campo billcycleTypeId
    ${billcycle_type_id}=    Get From Dictionary    ${response_json}    billcycleTypeId
    Should Not Be Empty    ${billcycle_type_id}    msg=Campo billcycleTypeId está vacío

Verificar Que Response Contiene Campo AcctCode
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    acctCode    msg=Response no contiene campo acctCode
    ${acct_code}=    Get From Dictionary    ${response_json}    acctCode
    Should Not Be Empty    ${acct_code}    msg=Campo acctCode está vacío

Verificar Que Response Contiene Campo CollectionProcessFlag
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    collectionProcessFlag    msg=Response no contiene campo collectionProcessFlag
    ${collection_process_flag}=    Get From Dictionary    ${response_json}    collectionProcessFlag
    Should Not Be Empty    ${collection_process_flag}    msg=Campo collectionProcessFlag está vacío
