*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - Servicio AmigoPaguitosPagosService
${API_AMIGO_PAGUITOS_PAGOS_SERVICE_BASE_URL}      https://capa-integracion-telcel-dev.com/api/v1
${API_ENDPOINT_CONSULTAR_PAGUITOS}                /AmigoPaguitosPagosService/ConsultarPaguitos

# Campos de respuesta esperados - Suscriptor
${CAMPO_SERVICE_NUMBER}                            serviceNumber
${CAMPO_SUBSCRIBER_ID}                             subscriberId
${CAMPO_ACTIVE_DATE}                               activeDate
${CAMPO_STATUS_TIME}                               statusTime
${CAMPO_PAYMENT_TYPE}                              paymentType
${CAMPO_STATUS}                                    status
${CAMPO_PRIMARY_OFFERING_ID}                       primaryOfferingId
${CAMPO_PRIMARY_OFFERING_NAME}                     primaryOfferingName

# Campos de respuesta esperados - Cuenta
${CAMPO_ACCOUNT_ID}                                accountId
${CAMPO_CUST_ID}                                   CustID
${CAMPO_BILLCYCLE_TYPE}                            billcycletype
${CAMPO_ACCT_CODE}                                 acctCode
${CAMPO_COLLECTION_PROCESS_FLAG}                   collectionProcessFlag
${CAMPO_IMEI}                                      IMEI
${CAMPO_INSTALLMENT_PLAN_INST_ID}                  installmentPlanInstId

# Campos de respuesta esperados - Cliente
${CAMPO_FIRSTNAME}                                 Firstname
${CAMPO_MIDDLE_NAME}                               middleName
${CAMPO_LAST_NAME}                                 lastName
${CAMPO_CURP}                                      CURP
${CAMPO_RFC}                                       RFC
${CAMPO_REGION_ID}                                 RegionID
${CAMPO_REGION_NAME}                               regionName

# Campos de respuesta esperados - Plan de Cuotas
${CAMPO_TYPE}                                      type
${CAMPO_INSTALLMENT_STATUS}                        installmentStatus
${CAMPO_SUBSIDY_STATUS}                            subsidyStatus
${CAMPO_TOTAL_CYCLE}                               totalCycle
${CAMPO_TOTAL_AMOUNT}                              totalAmount
${CAMPO_CYCLE_SEQUENCE}                            cycleSequence
${CAMPO_INITIAL_AMOUNT}                            initialAmount
${CAMPO_AMOUNT}                                    amount
${CAMPO_CYCLE_CLASS}                               cycleClass
${CAMPO_CYCLE_DUE_DATE}                            cycleDueDate
${CAMPO_SHORT_NAME}                                shortName

# Campos de respuesta esperados - Balance
${CAMPO_BALANCE_TYPE}                              balancetype
${CAMPO_AR_BALANCE}                                ARBalance

*** Keywords ***
Invocar Servicio ConsultarPaguitos Con Número Telefónico
    [Arguments]    ${numero_telefonico}
    Create Session    amigo_paguitos_pagos    ${API_AMIGO_PAGUITOS_PAGOS_SERVICE_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    amigo_paguitos_pagos    ${API_ENDPOINT_CONSULTAR_PAGUITOS}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que Servicio ConsultarPaguitos Retorna Código ESB0
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    codigoRespuesta    msg=Response no contiene código de respuesta
    ${codigo_respuesta}=    Get From Dictionary    ${response_json}    codigoRespuesta
    Should Be Equal As Strings    ${codigo_respuesta}    ESB0    msg=Código de respuesta incorrecto. Esperado: ESB0, Actual: ${codigo_respuesta}

Verificar Que Response Contiene Todos Los Campos De Suscriptor
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_SERVICE_NUMBER}    msg=Response no contiene ${CAMPO_SERVICE_NUMBER}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_SUBSCRIBER_ID}    msg=Response no contiene ${CAMPO_SUBSCRIBER_ID}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_ACTIVE_DATE}    msg=Response no contiene ${CAMPO_ACTIVE_DATE}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_STATUS_TIME}    msg=Response no contiene ${CAMPO_STATUS_TIME}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_PAYMENT_TYPE}    msg=Response no contiene ${CAMPO_PAYMENT_TYPE}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_STATUS}    msg=Response no contiene ${CAMPO_STATUS}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_PRIMARY_OFFERING_ID}    msg=Response no contiene ${CAMPO_PRIMARY_OFFERING_ID}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_PRIMARY_OFFERING_NAME}    msg=Response no contiene ${CAMPO_PRIMARY_OFFERING_NAME}

    # Verificar que los campos tienen valores poblados
    ${service_number}=    Get From Dictionary    ${response_json}    ${CAMPO_SERVICE_NUMBER}
    ${subscriber_id}=    Get From Dictionary    ${response_json}    ${CAMPO_SUBSCRIBER_ID}
    Should Not Be Empty    ${service_number}    msg=Campo ${CAMPO_SERVICE_NUMBER} está vacío
    Should Not Be Empty    ${subscriber_id}    msg=Campo ${CAMPO_SUBSCRIBER_ID} está vacío

Verificar Que Response Contiene Todos Los Campos De Cuenta
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_ACCOUNT_ID}    msg=Response no contiene ${CAMPO_ACCOUNT_ID}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_CUST_ID}    msg=Response no contiene ${CAMPO_CUST_ID}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_BILLCYCLE_TYPE}    msg=Response no contiene ${CAMPO_BILLCYCLE_TYPE}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_ACCT_CODE}    msg=Response no contiene ${CAMPO_ACCT_CODE}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_COLLECTION_PROCESS_FLAG}    msg=Response no contiene ${CAMPO_COLLECTION_PROCESS_FLAG}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_IMEI}    msg=Response no contiene ${CAMPO_IMEI}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_INSTALLMENT_PLAN_INST_ID}    msg=Response no contiene ${CAMPO_INSTALLMENT_PLAN_INST_ID}

    # Verificar que los campos tienen valores poblados
    ${account_id}=    Get From Dictionary    ${response_json}    ${CAMPO_ACCOUNT_ID}
    ${cust_id}=    Get From Dictionary    ${response_json}    ${CAMPO_CUST_ID}
    Should Not Be Empty    ${account_id}    msg=Campo ${CAMPO_ACCOUNT_ID} está vacío
    Should Not Be Empty    ${cust_id}    msg=Campo ${CAMPO_CUST_ID} está vacío

Verificar Que Response Contiene Todos Los Campos De Cliente
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_FIRSTNAME}    msg=Response no contiene ${CAMPO_FIRSTNAME}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_MIDDLE_NAME}    msg=Response no contiene ${CAMPO_MIDDLE_NAME}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_LAST_NAME}    msg=Response no contiene ${CAMPO_LAST_NAME}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_CURP}    msg=Response no contiene ${CAMPO_CURP}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_RFC}    msg=Response no contiene ${CAMPO_RFC}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_REGION_ID}    msg=Response no contiene ${CAMPO_REGION_ID}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_REGION_NAME}    msg=Response no contiene ${CAMPO_REGION_NAME}

    # Verificar que los campos tienen valores poblados
    ${firstname}=    Get From Dictionary    ${response_json}    ${CAMPO_FIRSTNAME}
    ${lastname}=    Get From Dictionary    ${response_json}    ${CAMPO_LAST_NAME}
    Should Not Be Empty    ${firstname}    msg=Campo ${CAMPO_FIRSTNAME} está vacío
    Should Not Be Empty    ${lastname}    msg=Campo ${CAMPO_LAST_NAME} está vacío

Verificar Que Response Contiene Todos Los Campos De Plan De Cuotas
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que existe el objeto de plan de cuotas
    Dictionary Should Contain Key    ${response_json}    installmentPlan    msg=Response no contiene objeto installmentPlan

    ${installment_plan}=    Get From Dictionary    ${response_json}    installmentPlan

    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_TYPE}    msg=installmentPlan no contiene ${CAMPO_TYPE}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_INSTALLMENT_STATUS}    msg=installmentPlan no contiene ${CAMPO_INSTALLMENT_STATUS}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_SUBSIDY_STATUS}    msg=installmentPlan no contiene ${CAMPO_SUBSIDY_STATUS}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_TOTAL_CYCLE}    msg=installmentPlan no contiene ${CAMPO_TOTAL_CYCLE}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_TOTAL_AMOUNT}    msg=installmentPlan no contiene ${CAMPO_TOTAL_AMOUNT}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_CYCLE_SEQUENCE}    msg=installmentPlan no contiene ${CAMPO_CYCLE_SEQUENCE}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_INITIAL_AMOUNT}    msg=installmentPlan no contiene ${CAMPO_INITIAL_AMOUNT}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_AMOUNT}    msg=installmentPlan no contiene ${CAMPO_AMOUNT}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_CYCLE_CLASS}    msg=installmentPlan no contiene ${CAMPO_CYCLE_CLASS}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_STATUS}    msg=installmentPlan no contiene ${CAMPO_STATUS}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_CYCLE_DUE_DATE}    msg=installmentPlan no contiene ${CAMPO_CYCLE_DUE_DATE}
    Dictionary Should Contain Key    ${installment_plan}    ${CAMPO_SHORT_NAME}    msg=installmentPlan no contiene ${CAMPO_SHORT_NAME}

    # Verificar que los campos tienen valores poblados
    ${total_cycle}=    Get From Dictionary    ${installment_plan}    ${CAMPO_TOTAL_CYCLE}
    ${total_amount}=    Get From Dictionary    ${installment_plan}    ${CAMPO_TOTAL_AMOUNT}
    Should Not Be Empty    ${total_cycle}    msg=Campo ${CAMPO_TOTAL_CYCLE} está vacío
    Should Not Be Empty    ${total_amount}    msg=Campo ${CAMPO_TOTAL_AMOUNT} está vacío

Verificar Que Response Contiene Todos Los Campos De Balance
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_BALANCE_TYPE}    msg=Response no contiene ${CAMPO_BALANCE_TYPE}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_AR_BALANCE}    msg=Response no contiene ${CAMPO_AR_BALANCE}

    # Verificar que los campos tienen valores poblados
    ${balance_type}=    Get From Dictionary    ${response_json}    ${CAMPO_BALANCE_TYPE}
    ${ar_balance}=    Get From Dictionary    ${response_json}    ${CAMPO_AR_BALANCE}
    Should Not Be Empty    ${balance_type}    msg=Campo ${CAMPO_BALANCE_TYPE} está vacío
    Should Not Be Empty    ${ar_balance}    msg=Campo ${CAMPO_AR_BALANCE} está vacío

Verificar Que Capa De Integración Orquestó Llamadas A Servicios BES
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que metadata contiene información de servicios consultados
    Dictionary Should Contain Key    ${response_json}    metadata    msg=Response no contiene metadata de orquestación

    ${metadata}=    Get From Dictionary    ${response_json}    metadata
    Dictionary Should Contain Key    ${metadata}    serviciosConsultados    msg=Metadata no contiene lista de servicios consultados

    ${servicios_consultados}=    Get From Dictionary    ${metadata}    serviciosConsultados

    # Verificar que se consultaron todos los servicios de BES requeridos según el documento
    @{servicios_esperados}=    Create List
    ...    CustomerManagementService.GetSubscriberinfo
    ...    CustomerManagementService.GetAccountInfo
    ...    CustomerManagementService.GetCustomerbasicinfo
    ...    TelcelCustomService.GetSubscriberAndIMEIInfo
    ...    BCService.QueryInstallment
    ...    ArService.QueryInvoice
    ...    ArService.QueryBalance
    ...    TelcelInterfaceService.QueryCustOfferingInst

    FOR    ${servicio_esperado}    IN    @{servicios_esperados}
        List Should Contain Value    ${servicios_consultados}    ${servicio_esperado}    msg=Servicio ${servicio_esperado} no fue consultado por Capa de Integración
    END

Verificar Que TotalCycle Corresponde Al Plan De Financiamiento
    [Arguments]    ${response}    ${total_cycle_esperado}
    ${response_json}=    Set Variable    ${response.json()}
    ${installment_plan}=    Get From Dictionary    ${response_json}    installmentPlan
    ${total_cycle}=    Get From Dictionary    ${installment_plan}    ${CAMPO_TOTAL_CYCLE}

    Should Be Equal As Numbers    ${total_cycle}    ${total_cycle_esperado}    msg=TotalCycle no coincide. Esperado: ${total_cycle_esperado}, Actual: ${total_cycle}

Verificar Que TotalAmount Refleja Monto Total Del Financiamiento
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${installment_plan}=    Get From Dictionary    ${response_json}    installmentPlan
    ${total_amount}=    Get From Dictionary    ${installment_plan}    ${CAMPO_TOTAL_AMOUNT}

    # Verificar que totalAmount es un valor monetario válido mayor a cero
    Should Match Regexp    ${total_amount}    ^[0-9]+\\.?[0-9]*$    msg=TotalAmount no es un valor monetario válido: ${total_amount}
    ${total_amount_float}=    Convert To Number    ${total_amount}
    Should Be True    ${total_amount_float} > 0    msg=TotalAmount debe ser mayor a cero. Valor actual: ${total_amount}

Verificar Que ARBalance Refleja Saldo Pendiente Actualizado
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${ar_balance}=    Get From Dictionary    ${response_json}    ${CAMPO_AR_BALANCE}

    # Verificar que ARBalance es un valor monetario válido
    Should Match Regexp    ${ar_balance}    ^-?[0-9]+\\.?[0-9]*$    msg=ARBalance no es un valor monetario válido: ${ar_balance}

Invocar Servicio ConsultarPaguitos Con Account Code
    [Arguments]    ${account_code}
    Create Session    amigo_paguitos_pagos    ${API_AMIGO_PAGUITOS_PAGOS_SERVICE_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    accountCode=${account_code}

    ${response}=    POST On Session    amigo_paguitos_pagos    ${API_ENDPOINT_CONSULTAR_PAGUITOS}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Utiliza Account Code En Búsqueda
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que el response contiene metadata indicando que se usó account code
    Dictionary Should Contain Key    ${response_json}    metadata    msg=Response no contiene metadata de búsqueda
    ${metadata}=    Get From Dictionary    ${response_json}    metadata
    Dictionary Should Contain Key    ${metadata}    parametroBusqueda    msg=Metadata no contiene parámetro de búsqueda utilizado
    ${parametro_busqueda}=    Get From Dictionary    ${metadata}    parametroBusqueda
    Should Be Equal As Strings    ${parametro_busqueda}    accountCode    msg=BES no utilizó account code como parámetro. Parámetro usado: ${parametro_busqueda}

Verificar Que Response Incluye Status Desactivado
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_STATUS}    msg=Response no contiene campo status
    ${status}=    Get From Dictionary    ${response_json}    ${CAMPO_STATUS}

    Should Not Be Empty    ${status}    msg=Campo status está vacío
    Should Be Equal As Strings    ${status}    Desactivado    msg=Status esperado: Desactivado, Status actual: ${status}

Verificar Que Response Contiene Campos Requeridos Para Suscriptor Desactivado
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar campos obligatorios
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_SERVICE_NUMBER}    msg=Response no contiene ${CAMPO_SERVICE_NUMBER}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_SUBSCRIBER_ID}    msg=Response no contiene ${CAMPO_SUBSCRIBER_ID}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_STATUS}    msg=Response no contiene ${CAMPO_STATUS}

    # Verificar que los campos tienen valores poblados
    ${service_number}=    Get From Dictionary    ${response_json}    ${CAMPO_SERVICE_NUMBER}
    ${subscriber_id}=    Get From Dictionary    ${response_json}    ${CAMPO_SUBSCRIBER_ID}
    ${status}=    Get From Dictionary    ${response_json}    ${CAMPO_STATUS}

    Should Not Be Empty    ${service_number}    msg=Campo ${CAMPO_SERVICE_NUMBER} está vacío
    Should Not Be Empty    ${subscriber_id}    msg=Campo ${CAMPO_SUBSCRIBER_ID} está vacío
    Should Not Be Empty    ${status}    msg=Campo ${CAMPO_STATUS} está vacío
