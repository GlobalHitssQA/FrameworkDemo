*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

*** Variables ***
# URLs y Endpoints - BES CustomerManagement Service GetCustomerView
${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_CUSTOMER_VIEW}              /GetCustomerView

*** Keywords ***
Ejecutar API CustomerManagement Service GetCustomerView
    [Arguments]    ${numero_telefonico}
    Create Session    bes_customer_management_get_customer_view    ${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_customer_management_get_customer_view    ${API_ENDPOINT_GET_CUSTOMER_VIEW}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Recibe Petición Y Procesa Consulta Vista 360
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la consulta GetCustomerView. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}
    Should Not Be Empty    ${response_json}    msg=Response JSON está vacío

Verificar Que BES Ejecuta Consultas A Múltiples Servicios Y Consolida Información
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta consolidada incluye datos de todos los servicios orquestados
    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene serviceNumber (CustomerManagementService)
    Dictionary Should Contain Key    ${response_json}    subscriberId    msg=Response no contiene subscriberId (TelcelCustomService)
    Dictionary Should Contain Key    ${response_json}    accountId    msg=Response no contiene accountId (BCService)
    Dictionary Should Contain Key    ${response_json}    balance    msg=Response no contiene balance (ArService)

    Log    BES ejecutó consultas a múltiples servicios: CustomerManagementService, TelcelCustomService, BCService, ArService

Verificar Que BES Devuelve Vista 360 Con Información Completa Y Estructurada
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar estructura consolidada completa
    @{campos_requeridos_vista_360}=    Create List
    ...    serviceNumber
    ...    subscriberId
    ...    accountId
    ...    CustID
    ...    installmentPlanInstId
    ...    totalCycle
    ...    totalAmount
    ...    balance
    ...    Firstname
    ...    lastName
    ...    CURP
    ...    RFC

    FOR    ${campo}    IN    @{campos_requeridos_vista_360}
        Dictionary Should Contain Key    ${response_json}    ${campo}    msg=Campo requerido ${campo} no encontrado en vista 360 consolidada
    END

    Log    Vista 360 devuelta con información completa y estructurada del cliente Amigo Paguitos

Verificar Que Vista 360 Incluye Información De Crédito Vigente
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar información del crédito vigente
    Dictionary Should Contain Key    ${response_json}    installmentPlanInstId    msg=Response no contiene installmentPlanInstId del crédito
    Dictionary Should Contain Key    ${response_json}    installmentStatus    msg=Response no contiene installmentStatus del crédito

    ${installment_plan_inst_id}=    Get From Dictionary    ${response_json}    installmentPlanInstId
    ${installment_status}=    Get From Dictionary    ${response_json}    installmentStatus

    Should Not Be Empty    ${installment_plan_inst_id}    msg=installmentPlanInstId del crédito está vacío
    Should Not Be Empty    ${installment_status}    msg=installmentStatus del crédito está vacío

    Log    Vista 360 incluye información de crédito vigente: installmentPlanInstId=${installment_plan_inst_id}, status=${installment_status}

Verificar Que Vista 360 Incluye Parcialidades Pendientes
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar información de parcialidades
    Dictionary Should Contain Key    ${response_json}    totalCycle    msg=Response no contiene totalCycle
    Dictionary Should Contain Key    ${response_json}    cycleSequence    msg=Response no contiene cycleSequence de parcialidades

    ${total_cycle}=    Get From Dictionary    ${response_json}    totalCycle
    ${cycle_sequence}=    Get From Dictionary    ${response_json}    cycleSequence

    Should Not Be Empty    ${total_cycle}    msg=totalCycle está vacío
    Should Not Be Empty    ${cycle_sequence}    msg=cycleSequence está vacío

    # Validar que totalCycle es numérico
    Should Match Regexp    ${total_cycle}    ^\\d+$    msg=totalCycle no es numérico: ${total_cycle}

    Log    Vista 360 incluye información de parcialidades: totalCycle=${total_cycle}, cycleSequence=${cycle_sequence}

Verificar Que Vista 360 Incluye Saldo De Cuenta
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar información de saldo
    Dictionary Should Contain Key    ${response_json}    balance    msg=Response no contiene balance de cuenta
    Dictionary Should Contain Key    ${response_json}    openAmount    msg=Response no contiene openAmount

    ${balance}=    Get From Dictionary    ${response_json}    balance
    ${open_amount}=    Get From Dictionary    ${response_json}    openAmount

    Should Not Be Empty    ${balance}    msg=balance de cuenta está vacío
    Should Not Be Empty    ${open_amount}    msg=openAmount está vacío

    # Validar que los montos son numéricos con formato válido
    ${balance_str}=    Convert To String    ${balance}
    Should Match Regexp    ${balance_str}    ^\\d+(\\.\\d{2})?$    msg=balance no tiene formato de monto válido: ${balance_str}

    Log    Vista 360 incluye saldo de cuenta: balance=${balance}, openAmount=${open_amount}

Verificar Que Vista 360 Incluye Datos De Facturación
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar información de facturación
    Dictionary Should Contain Key    ${response_json}    billCycleID    msg=Response no contiene billCycleID
    Dictionary Should Contain Key    ${response_json}    dueDate    msg=Response no contiene dueDate de facturación
    Dictionary Should Contain Key    ${response_json}    invoiceAmount    msg=Response no contiene invoiceAmount

    ${bill_cycle_id}=    Get From Dictionary    ${response_json}    billCycleID
    ${due_date}=    Get From Dictionary    ${response_json}    dueDate
    ${invoice_amount}=    Get From Dictionary    ${response_json}    invoiceAmount

    Should Not Be Empty    ${bill_cycle_id}    msg=billCycleID está vacío
    Should Not Be Empty    ${due_date}    msg=dueDate está vacío
    Should Not Be Empty    ${invoice_amount}    msg=invoiceAmount está vacío

    Log    Vista 360 incluye datos de facturación: billCycleID=${bill_cycle_id}, dueDate=${due_date}, invoiceAmount=${invoice_amount}
