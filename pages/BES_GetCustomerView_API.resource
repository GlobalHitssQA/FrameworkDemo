*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES GetCustomerView Service
${API_BES_GET_CUSTOMER_VIEW_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_CUSTOMER_VIEW}            /GetCustomerView

*** Keywords ***
Ejecutar API BES GetCustomerView
    [Arguments]    ${numero_telefonico}
    Create Session    bes_get_customer_view    ${API_BES_GET_CUSTOMER_VIEW_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_get_customer_view    ${API_ENDPOINT_GET_CUSTOMER_VIEW}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición GetCustomerView Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición GetCustomerView. Status code: ${response.status_code}

Verificar Que BES Orquesta Consultas A Múltiples Servicios
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta contiene datos de múltiples servicios orquestados
    Dictionary Should Contain Key    ${response_json}    customerData    msg=Response no contiene datos del cliente
    Dictionary Should Contain Key    ${response_json}    accountData    msg=Response no contiene datos de cuenta
    Dictionary Should Contain Key    ${response_json}    financingData    msg=Response no contiene datos de financiamiento
    Dictionary Should Contain Key    ${response_json}    billingData    msg=Response no contiene datos de facturación
    Dictionary Should Contain Key    ${response_json}    balanceData    msg=Response no contiene datos de balance

    Log    BES orquestó correctamente consultas a CustomerManagementService, TelcelCustomService, BCService y ArService

Verificar Que Vista Consolidada Incluye Datos De Suscriptor
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${customer_data}=    Get From Dictionary    ${response_json}    customerData

    Dictionary Should Contain Key    ${customer_data}    serviceNumber    msg=Datos de suscriptor no contienen serviceNumber
    Dictionary Should Contain Key    ${customer_data}    subscriberId    msg=Datos de suscriptor no contienen subscriberId
    Dictionary Should Contain Key    ${customer_data}    status    msg=Datos de suscriptor no contienen status

    ${service_number}=    Get From Dictionary    ${customer_data}    serviceNumber
    ${subscriber_id}=    Get From Dictionary    ${customer_data}    subscriberId

    Should Not Be Empty    ${service_number}    msg=serviceNumber está vacío
    Should Not Be Empty    ${subscriber_id}    msg=subscriberId está vacío

Verificar Que Vista Consolidada Incluye Datos De Cuenta
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${account_data}=    Get From Dictionary    ${response_json}    accountData

    Dictionary Should Contain Key    ${account_data}    accountId    msg=Datos de cuenta no contienen accountId
    Dictionary Should Contain Key    ${account_data}    billcycleTypeId    msg=Datos de cuenta no contienen billcycleTypeId

    ${account_id}=    Get From Dictionary    ${account_data}    accountId
    Should Not Be Empty    ${account_id}    msg=accountId está vacío

Verificar Que Vista Consolidada Incluye Datos De Financiamiento
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${financing_data}=    Get From Dictionary    ${response_json}    financingData

    Dictionary Should Contain Key    ${financing_data}    installmentPlanInstId    msg=Datos de financiamiento no contienen installmentPlanInstId
    Dictionary Should Contain Key    ${financing_data}    totalCycle    msg=Datos de financiamiento no contienen totalCycle
    Dictionary Should Contain Key    ${financing_data}    totalAmount    msg=Datos de financiamiento no contienen totalAmount
    Dictionary Should Contain Key    ${financing_data}    unpaidAmount    msg=Datos de financiamiento no contienen unpaidAmount

    ${installment_plan_inst_id}=    Get From Dictionary    ${financing_data}    installmentPlanInstId
    ${total_cycle}=    Get From Dictionary    ${financing_data}    totalCycle
    ${total_amount}=    Get From Dictionary    ${financing_data}    totalAmount

    Should Not Be Empty    ${installment_plan_inst_id}    msg=installmentPlanInstId está vacío
    Should Not Be Empty    ${total_cycle}    msg=totalCycle está vacío
    Should Not Be Empty    ${total_amount}    msg=totalAmount está vacío

Verificar Que Vista Consolidada Incluye Datos De Facturación
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${billing_data}=    Get From Dictionary    ${response_json}    billingData

    Dictionary Should Contain Key    ${billing_data}    invoices    msg=Datos de facturación no contienen invoices

    ${invoices}=    Get From Dictionary    ${billing_data}    invoices
    Should Not Be Empty    ${invoices}    msg=Array de facturas está vacío

Verificar Que Vista Consolidada Incluye Saldos Y Balance
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${balance_data}=    Get From Dictionary    ${response_json}    balanceData

    Dictionary Should Contain Key    ${balance_data}    ARBalance    msg=Datos de balance no contienen ARBalance
    Dictionary Should Contain Key    ${balance_data}    balancetype    msg=Datos de balance no contienen balancetype

    ${ar_balance}=    Get From Dictionary    ${balance_data}    ARBalance
    Should Not Be Empty    ${ar_balance}    msg=ARBalance está vacío

Verificar Que Vista 360 Incluye Crédito Vigente Y Parcialidades Pendientes
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${financing_data}=    Get From Dictionary    ${response_json}    financingData

    # Verificar crédito vigente
    Dictionary Should Contain Key    ${financing_data}    installmentStatus    msg=Datos de financiamiento no contienen installmentStatus
    ${installment_status}=    Get From Dictionary    ${financing_data}    installmentStatus
    Should Contain Any    ${installment_status}    Activo    En Proceso    msg=El crédito no está vigente

    # Verificar parcialidades pendientes
    Dictionary Should Contain Key    ${financing_data}    installments    msg=Datos de financiamiento no contienen parcialidades
    ${installments}=    Get From Dictionary    ${financing_data}    installments
    Should Not Be Empty    ${installments}    msg=No hay parcialidades en la vista

    # Contar parcialidades pendientes
    ${parcialidades_pendientes}=    Set Variable    ${0}
    FOR    ${installment}    IN    @{installments}
        ${status}=    Get From Dictionary    ${installment}    status
        ${es_pendiente}=    Run Keyword And Return Status    Should Contain Any    ${status}    Pendiente    Vencida
        IF    ${es_pendiente}
            ${parcialidades_pendientes}=    Evaluate    ${parcialidades_pendientes} + 1
        END
    END

    Log    Parcialidades pendientes encontradas: ${parcialidades_pendientes}

Verificar Que Capa De Integración Recibe Vista 360 Completa Y Estructurada
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar estructura completa de la vista 360
    Dictionary Should Contain Key    ${response_json}    customerData    msg=Vista 360 no contiene customerData
    Dictionary Should Contain Key    ${response_json}    accountData    msg=Vista 360 no contiene accountData
    Dictionary Should Contain Key    ${response_json}    financingData    msg=Vista 360 no contiene financingData
    Dictionary Should Contain Key    ${response_json}    billingData    msg=Vista 360 no contiene billingData
    Dictionary Should Contain Key    ${response_json}    balanceData    msg=Vista 360 no contiene balanceData

    Log    Capa de integración recibió vista 360 completa con información estructurada del cliente Amigo Paguitos

# Keywords adicionales para keywords.resource
Verificar Que BES Recibe Petición Y Procesa Consulta Vista 360
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición GetCustomerView. Status code: ${response.status_code}
    Log    BES recibió y procesó la petición de consulta de vista 360 del cliente

Verificar Que BES Ejecuta Consultas A Múltiples Servicios Y Consolida Información
    [Arguments]    ${response}
    Verificar Que BES Orquesta Consultas A Múltiples Servicios    ${response}

Verificar Que BES Devuelve Vista 360 Con Información Completa Y Estructurada
    [Arguments]    ${response}
    Verificar Que Capa De Integración Recibe Vista 360 Completa Y Estructurada    ${response}

Verificar Que Vista 360 Incluye Información De Crédito Vigente
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${financing_data}=    Get From Dictionary    ${response_json}    financingData

    Dictionary Should Contain Key    ${financing_data}    installmentStatus    msg=Datos de financiamiento no contienen installmentStatus
    ${installment_status}=    Get From Dictionary    ${financing_data}    installmentStatus
    Should Contain Any    ${installment_status}    Activo    En Proceso    msg=El crédito no está vigente

Verificar Que Vista 360 Incluye Parcialidades Pendientes
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${financing_data}=    Get From Dictionary    ${response_json}    financingData

    Dictionary Should Contain Key    ${financing_data}    installments    msg=Datos de financiamiento no contienen parcialidades
    ${installments}=    Get From Dictionary    ${financing_data}    installments
    Should Not Be Empty    ${installments}    msg=No hay parcialidades en la vista

Verificar Que Vista 360 Incluye Saldo De Cuenta
    [Arguments]    ${response}
    Verificar Que Vista Consolidada Incluye Saldos Y Balance    ${response}

Verificar Que Vista 360 Incluye Datos De Facturación
    [Arguments]    ${response}
    Verificar Que Vista Consolidada Incluye Datos De Facturación    ${response}
