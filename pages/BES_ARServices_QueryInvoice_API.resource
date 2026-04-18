*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES ARServices
${API_BES_AR_SERVICES_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_QUERY_INVOICE}          /QueryInvoice

*** Keywords ***
Ejecutar API ARServices QueryInvoice
    [Arguments]    ${account_id}
    Create Session    bes_ar_services    ${API_BES_AR_SERVICES_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    accountId=${account_id}

    ${response}=    POST On Session    bes_ar_services    ${API_ENDPOINT_QUERY_INVOICE}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición QueryInvoice Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición QueryInvoice. Status code: ${response.status_code}

Verificar Que Response Contiene Campos De Identificación acctKey transType billCycleID
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    acctKey    msg=Response no contiene campo acctKey
    Dictionary Should Contain Key    ${response_json}    transType    msg=Response no contiene campo transType
    Dictionary Should Contain Key    ${response_json}    billCycleID    msg=Response no contiene campo billCycleID

    ${acct_key}=    Get From Dictionary    ${response_json}    acctKey
    ${trans_type}=    Get From Dictionary    ${response_json}    transType
    ${bill_cycle_id}=    Get From Dictionary    ${response_json}    billCycleID

    Should Not Be Empty    ${acct_key}    msg=Campo acctKey está vacío
    Should Not Be Empty    ${trans_type}    msg=Campo transType está vacío
    Should Not Be Empty    ${bill_cycle_id}    msg=Campo billCycleID está vacío

Verificar Que Response Contiene Campos De Ciclo De Facturación billCycleBeginTime billCycleEndTime
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    billCycleBeginTime    msg=Response no contiene campo billCycleBeginTime
    Dictionary Should Contain Key    ${response_json}    billCycleEndTime    msg=Response no contiene campo billCycleEndTime

    ${bill_cycle_begin_time}=    Get From Dictionary    ${response_json}    billCycleBeginTime
    ${bill_cycle_end_time}=    Get From Dictionary    ${response_json}    billCycleEndTime

    Should Not Be Empty    ${bill_cycle_begin_time}    msg=Campo billCycleBeginTime está vacío
    Should Not Be Empty    ${bill_cycle_end_time}    msg=Campo billCycleEndTime está vacío

    # Verificar que son fechas válidas (formato básico)
    Should Match Regexp    ${bill_cycle_begin_time}    ^[0-9]{4}-[0-9]{2}-[0-9]{2}    msg=billCycleBeginTime no tiene formato de fecha válido
    Should Match Regexp    ${bill_cycle_end_time}    ^[0-9]{4}-[0-9]{2}-[0-9]{2}    msg=billCycleEndTime no tiene formato de fecha válido

Verificar Que Response Contiene Campos De Montos Con Valores Numéricos Válidos
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que todos los campos de montos existen
    Dictionary Should Contain Key    ${response_json}    invoiceAmount    msg=Response no contiene campo invoiceAmount
    Dictionary Should Contain Key    ${response_json}    openAmount    msg=Response no contiene campo openAmount
    Dictionary Should Contain Key    ${response_json}    taxAmount    msg=Response no contiene campo taxAmount
    Dictionary Should Contain Key    ${response_json}    openTaxAmount    msg=Response no contiene campo openTaxAmount
    Dictionary Should Contain Key    ${response_json}    disputeAmount    msg=Response no contiene campo disputeAmount
    Dictionary Should Contain Key    ${response_json}    iVATaxAmount    msg=Response no contiene campo iVATaxAmount
    Dictionary Should Contain Key    ${response_json}    openIVATaxAmount    msg=Response no contiene campo openIVATaxAmount

    # Obtener valores de los campos de montos
    ${invoice_amount}=    Get From Dictionary    ${response_json}    invoiceAmount
    ${open_amount}=    Get From Dictionary    ${response_json}    openAmount
    ${tax_amount}=    Get From Dictionary    ${response_json}    taxAmount
    ${open_tax_amount}=    Get From Dictionary    ${response_json}    openTaxAmount
    ${dispute_amount}=    Get From Dictionary    ${response_json}    disputeAmount
    ${iva_tax_amount}=    Get From Dictionary    ${response_json}    iVATaxAmount
    ${open_iva_tax_amount}=    Get From Dictionary    ${response_json}    openIVATaxAmount

    # Verificar que son valores numéricos
    Should Match Regexp    ${invoice_amount}    ^[0-9]+\\.?[0-9]*$    msg=invoiceAmount no es un valor numérico válido
    Should Match Regexp    ${open_amount}    ^[0-9]+\\.?[0-9]*$    msg=openAmount no es un valor numérico válido
    Should Match Regexp    ${tax_amount}    ^[0-9]+\\.?[0-9]*$    msg=taxAmount no es un valor numérico válido
    Should Match Regexp    ${open_tax_amount}    ^[0-9]+\\.?[0-9]*$    msg=openTaxAmount no es un valor numérico válido
    Should Match Regexp    ${dispute_amount}    ^[0-9]+\\.?[0-9]*$    msg=disputeAmount no es un valor numérico válido
    Should Match Regexp    ${iva_tax_amount}    ^[0-9]+\\.?[0-9]*$    msg=iVATaxAmount no es un valor numérico válido
    Should Match Regexp    ${open_iva_tax_amount}    ^[0-9]+\\.?[0-9]*$    msg=openIVATaxAmount no es un valor numérico válido

Verificar Que Response Contiene Campos Complementarios De Facturación Con Valores Correctos
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que todos los campos complementarios existen
    Dictionary Should Contain Key    ${response_json}    dueDate    msg=Response no contiene campo dueDate
    Dictionary Should Contain Key    ${response_json}    status    msg=Response no contiene campo status
    Dictionary Should Contain Key    ${response_json}    invoiceID    msg=Response no contiene campo invoiceID
    Dictionary Should Contain Key    ${response_json}    serviceCategory    msg=Response no contiene campo serviceCategory
    Dictionary Should Contain Key    ${response_json}    chargeCodeGroup    msg=Response no contiene campo chargeCodeGroup
    Dictionary Should Contain Key    ${response_json}    chargeCode    msg=Response no contiene campo chargeCode
    Dictionary Should Contain Key    ${response_json}    chargeAmount    msg=Response no contiene campo chargeAmount
    Dictionary Should Contain Key    ${response_json}    discountAmt    msg=Response no contiene campo discountAmt

    # Obtener valores
    ${due_date}=    Get From Dictionary    ${response_json}    dueDate
    ${status}=    Get From Dictionary    ${response_json}    status
    ${invoice_id}=    Get From Dictionary    ${response_json}    invoiceID
    ${service_category}=    Get From Dictionary    ${response_json}    serviceCategory
    ${charge_code_group}=    Get From Dictionary    ${response_json}    chargeCodeGroup
    ${charge_code}=    Get From Dictionary    ${response_json}    chargeCode
    ${charge_amount}=    Get From Dictionary    ${response_json}    chargeAmount
    ${discount_amt}=    Get From Dictionary    ${response_json}    discountAmt

    # Verificar que no están vacíos
    Should Not Be Empty    ${due_date}    msg=Campo dueDate está vacío
    Should Not Be Empty    ${status}    msg=Campo status está vacío
    Should Not Be Empty    ${invoice_id}    msg=Campo invoiceID está vacío
    Should Not Be Empty    ${service_category}    msg=Campo serviceCategory está vacío
    Should Not Be Empty    ${charge_code_group}    msg=Campo chargeCodeGroup está vacío
    Should Not Be Empty    ${charge_code}    msg=Campo chargeCode está vacío
    Should Not Be Empty    ${charge_amount}    msg=Campo chargeAmount está vacío
    Should Not Be Empty    ${discount_amt}    msg=Campo discountAmt está vacío
