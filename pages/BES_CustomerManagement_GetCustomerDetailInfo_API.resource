*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES CustomerManagement Service GetCustomerDetailInfo
${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_CUSTOMER_DETAIL_INFO}       /GetCustomerDetailInfo

*** Keywords ***
Ejecutar API CustomerManagement Service GetCustomerDetailInfo
    [Arguments]    ${numero_telefonico}
    Create Session    bes_customer_management    ${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_customer_management    ${API_ENDPOINT_GET_CUSTOMER_DETAIL_INFO}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Consulta GetCustomerDetailInfo Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la consulta GetCustomerDetailInfo. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}
    Should Not Be Empty    ${response_json}    msg=Response JSON está vacío

Verificar Que Response Contiene Campos ServiceNumber SubscriberId ActiveDate
    [Arguments]    ${response}    ${numero_esperado}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene campo serviceNumber
    Dictionary Should Contain Key    ${response_json}    subscriberId    msg=Response no contiene campo subscriberId
    Dictionary Should Contain Key    ${response_json}    activeDate    msg=Response no contiene campo activeDate

    ${service_number}=    Get From Dictionary    ${response_json}    serviceNumber
    ${subscriber_id}=    Get From Dictionary    ${response_json}    subscriberId
    ${active_date}=    Get From Dictionary    ${response_json}    activeDate

    Should Be Equal As Strings    ${service_number}    ${numero_esperado}    msg=serviceNumber no coincide. Esperado: ${numero_esperado}, Actual: ${service_number}
    Should Not Be Empty    ${subscriber_id}    msg=Campo subscriberId está vacío
    Should Not Be Empty    ${active_date}    msg=Campo activeDate está vacío

Verificar Que Response Contiene Campos AccountId CustID Billcycletype
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    accountId    msg=Response no contiene campo accountId
    Dictionary Should Contain Key    ${response_json}    CustID    msg=Response no contiene campo CustID
    Dictionary Should Contain Key    ${response_json}    billcycletype    msg=Response no contiene campo billcycletype

    ${account_id}=    Get From Dictionary    ${response_json}    accountId
    ${cust_id}=    Get From Dictionary    ${response_json}    CustID
    ${billcycle_type}=    Get From Dictionary    ${response_json}    billcycletype

    Should Not Be Empty    ${account_id}    msg=Campo accountId está vacío
    Should Not Be Empty    ${cust_id}    msg=Campo CustID está vacío
    Should Not Be Empty    ${billcycle_type}    msg=Campo billcycletype está vacío

Verificar Que Response Contiene Campos IMEI Y Balance
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    IMEI    msg=Response no contiene campo IMEI
    Dictionary Should Contain Key    ${response_json}    balance    msg=Response no contiene campo balance

    ${imei}=    Get From Dictionary    ${response_json}    IMEI
    ${balance}=    Get From Dictionary    ${response_json}    balance

    Should Not Be Empty    ${imei}    msg=Campo IMEI está vacío
    Should Not Be Empty    ${balance}    msg=Campo balance está vacío

    # Validar que IMEI tiene 15 dígitos
    ${imei_length}=    Get Length    ${imei}
    Should Be Equal As Numbers    ${imei_length}    15    msg=IMEI debe tener 15 dígitos. Longitud actual: ${imei_length}

    # Validar que balance es un valor numérico
    ${balance_str}=    Convert To String    ${balance}
    Should Not Be Equal As Strings    ${balance_str}    null    msg=Campo balance tiene valor null

Verificar Que Response Contiene Nombre Completo Del Cliente
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    Firstname    msg=Response no contiene campo Firstname
    Dictionary Should Contain Key    ${response_json}    middleName    msg=Response no contiene campo middleName
    Dictionary Should Contain Key    ${response_json}    lastName    msg=Response no contiene campo lastName

    ${firstname}=    Get From Dictionary    ${response_json}    Firstname
    ${middlename}=    Get From Dictionary    ${response_json}    middleName
    ${lastname}=    Get From Dictionary    ${response_json}    lastName

    Should Not Be Empty    ${firstname}    msg=Campo Firstname está vacío
    Should Not Be Empty    ${lastname}    msg=Campo lastName está vacío

    # Validar que los nombres contienen valores alfanuméricos válidos
    Should Match Regexp    ${firstname}    ^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$    msg=Firstname no contiene valores alfanuméricos válidos: ${firstname}
    Should Match Regexp    ${lastname}    ^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$    msg=lastName no contiene valores alfanuméricos válidos: ${lastname}

Verificar Que Response Contiene Campos CURP Y RFC
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    CURP    msg=Response no contiene campo CURP
    Dictionary Should Contain Key    ${response_json}    RFC    msg=Response no contiene campo RFC

    ${curp}=    Get From Dictionary    ${response_json}    CURP
    ${rfc}=    Get From Dictionary    ${response_json}    RFC

    Should Not Be Empty    ${curp}    msg=Campo CURP está vacío
    Should Not Be Empty    ${rfc}    msg=Campo RFC está vacío

    # Verificar que CURP tiene exactamente 18 caracteres alfanuméricos
    ${curp_length}=    Get Length    ${curp}
    Should Be Equal As Numbers    ${curp_length}    18    msg=CURP debe tener 18 caracteres. Longitud actual: ${curp_length}

    # Verificar que RFC tiene 12 o 13 caracteres alfanuméricos
    ${rfc_length}=    Get Length    ${rfc}
    Should Be True    ${rfc_length} == 12 or ${rfc_length} == 13    msg=RFC debe tener 12 o 13 caracteres. Longitud actual: ${rfc_length}

Verificar Que Todos Los Campos De Detalle Completo Están Presentes Y Son Válidos
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Lista de campos obligatorios para detalle completo de cliente
    @{campos_obligatorios}=    Create List
    ...    serviceNumber
    ...    subscriberId
    ...    activeDate
    ...    accountId
    ...    CustID
    ...    billcycletype
    ...    IMEI
    ...    balance
    ...    Firstname
    ...    middleName
    ...    lastName
    ...    CURP
    ...    RFC

    # Verificar que todos los campos obligatorios existen
    FOR    ${campo}    IN    @{campos_obligatorios}
        Dictionary Should Contain Key    ${response_json}    ${campo}    msg=Campo obligatorio ${campo} no encontrado en la respuesta de detalle completo
    END

    # Verificar que la respuesta es estructuralmente válida
    Should Not Contain    ${response.text}    errorCode    msg=Respuesta contiene errorCode indicando error
    Should Not Contain    ${response.text}    malformed    msg=Respuesta contiene estructura malformada

    # Validar que campos críticos no están vacíos
    ${service_number}=    Get From Dictionary    ${response_json}    serviceNumber
    ${subscriber_id}=    Get From Dictionary    ${response_json}    subscriberId
    ${account_id}=    Get From Dictionary    ${response_json}    accountId
    ${cust_id}=    Get From Dictionary    ${response_json}    CustID

    Should Not Be Empty    ${service_number}    msg=Campo serviceNumber está vacío
    Should Not Be Empty    ${subscriber_id}    msg=Campo subscriberId está vacío
    Should Not Be Empty    ${account_id}    msg=Campo accountId está vacío
    Should Not Be Empty    ${cust_id}    msg=Campo CustID está vacío
