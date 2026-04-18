*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES BCService
${API_BES_BC_SERVICE_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_QUERY_INSTALLMENT}     /QueryInstallment

*** Keywords ***
Ejecutar API BCService QueryInstallment
    [Arguments]    ${cust_id}    ${installment_plan_inst_id}
    Create Session    bes_bc_service    ${API_BES_BC_SERVICE_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    CustID=${cust_id}    installmentPlanInstId=${installment_plan_inst_id}

    ${response}=    POST On Session    bes_bc_service    ${API_ENDPOINT_QUERY_INSTALLMENT}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición QueryInstallment Y Genera Respuesta
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición QueryInstallment. Status code: ${response.status_code}

Verificar Que Response Incluye Campo totalCycle Con Número Total De Parcialidades
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    totalCycle    msg=Response no contiene campo totalCycle

    ${total_cycle}=    Get From Dictionary    ${response_json}    totalCycle

    Should Not Be Empty    ${total_cycle}    msg=Campo totalCycle está vacío

    # Verificar que totalCycle es un número mayor a cero
    Should Match Regexp    ${total_cycle}    ^[0-9]+$    msg=totalCycle no es un valor numérico válido: ${total_cycle}
    ${total_cycle_int}=    Convert To Integer    ${total_cycle}
    Should Be True    ${total_cycle_int} > 0    msg=totalCycle debe ser mayor a cero. Valor actual: ${total_cycle}

Verificar Que Response Incluye Campo totalAmount Con Monto Total Del Financiamiento
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    totalAmount    msg=Response no contiene campo totalAmount

    ${total_amount}=    Get From Dictionary    ${response_json}    totalAmount

    Should Not Be Empty    ${total_amount}    msg=Campo totalAmount está vacío

    # Verificar que totalAmount es un valor monetario válido
    Should Match Regexp    ${total_amount}    ^[0-9]+\\.?[0-9]*$    msg=totalAmount no es un valor monetario válido: ${total_amount}

Verificar Que Response Incluye Campos cycleSequence amount status cycleDueDate Para Cada Parcialidad
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que existe un array de parcialidades
    Dictionary Should Contain Key    ${response_json}    installments    msg=Response no contiene array de parcialidades (installments)

    ${installments}=    Get From Dictionary    ${response_json}    installments

    Should Not Be Empty    ${installments}    msg=Array de parcialidades está vacío

    # Verificar que cada parcialidad contiene los campos requeridos
    FOR    ${installment}    IN    @{installments}
        Dictionary Should Contain Key    ${installment}    cycleSequence    msg=Parcialidad no contiene campo cycleSequence
        Dictionary Should Contain Key    ${installment}    amount    msg=Parcialidad no contiene campo amount
        Dictionary Should Contain Key    ${installment}    status    msg=Parcialidad no contiene campo status
        Dictionary Should Contain Key    ${installment}    cycleDueDate    msg=Parcialidad no contiene campo cycleDueDate

        ${cycle_sequence}=    Get From Dictionary    ${installment}    cycleSequence
        ${amount}=    Get From Dictionary    ${installment}    amount
        ${status}=    Get From Dictionary    ${installment}    status
        ${cycle_due_date}=    Get From Dictionary    ${installment}    cycleDueDate

        Should Not Be Empty    ${cycle_sequence}    msg=Campo cycleSequence está vacío
        Should Not Be Empty    ${amount}    msg=Campo amount está vacío
        Should Not Be Empty    ${status}    msg=Campo status está vacío
        Should Not Be Empty    ${cycle_due_date}    msg=Campo cycleDueDate está vacío
    END

Verificar Que Campo unpaidAmount Refleja Saldo Pendiente Por Pagar
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    unpaidAmount    msg=Response no contiene campo unpaidAmount

    ${unpaid_amount}=    Get From Dictionary    ${response_json}    unpaidAmount

    Should Not Be Empty    ${unpaid_amount}    msg=Campo unpaidAmount está vacío

    # Verificar que unpaidAmount es un valor monetario válido
    Should Match Regexp    ${unpaid_amount}    ^[0-9]+\\.?[0-9]*$    msg=unpaidAmount no es un valor monetario válido: ${unpaid_amount}

Verificar Que Campo shortName Contiene Descripción Breve Del Plan
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    shortName    msg=Response no contiene campo shortName

    ${short_name}=    Get From Dictionary    ${response_json}    shortName

    Should Not Be Empty    ${short_name}    msg=Campo shortName está vacío
