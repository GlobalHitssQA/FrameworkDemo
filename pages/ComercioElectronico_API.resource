*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints
${API_COMERCIO_ELECTRONICO_BASE_URL}           https://comercio-electronico-telcel-dev.com/api/v1
${API_ENDPOINT_PAC_PAGOS_CONSULTA_CE}          /PACPagosService/Consulta

# URLs BES - APIs consumidas por Capa de Integración
${API_BES_CUSTOMER_MANAGEMENT_SERVICE}         https://bes-telcel-dev.com/api/CustomerManagementService
${API_BES_TELCEL_CUSTOM_SERVICE_CE}            https://bes-telcel-dev.com/api/TelcelCustomService
${API_BES_BC_SERVICE_CE}                       https://bes-telcel-dev.com/api/BCService
${API_BES_AR_SERVICE_CE}                       https://bes-telcel-dev.com/api/ArService

# Campos esperados en la respuesta completa de Comercio Electrónico
@{CAMPOS_ESPERADOS_CE}    primaryOfferingId    primaryOfferingName    billcycletype    acctCode    collectionProcessFlag    installmentStatus    subsidyStatus    cycleSequence    amount    cycleClass    cycleDueDate    shortName

*** Keywords ***
Invocar Servicio PACPagosService Consulta Desde Comercio Electrónico Con Número Telefónico
    [Arguments]    ${numero_telefonico}
    Create Session    comercio_electronico    ${API_COMERCIO_ELECTRONICO_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    comercio_electronico    ${API_ENDPOINT_PAC_PAGOS_CONSULTA_CE}    json=${payload}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    [Return]    ${response}

Verificar Que Response Contiene Información Completa Del Cliente Desde CE
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que todos los campos esperados están presentes
    FOR    ${campo}    IN    @{CAMPOS_ESPERADOS_CE}
        Dictionary Should Contain Key    ${response_json}    ${campo}    msg=Campo ${campo} no encontrado en la respuesta
    END

Verificar Campo En Response CE
    [Arguments]    ${response}    ${nombre_campo}    ${valor_esperado}
    ${response_json}=    Set Variable    ${response.json()}
    ${valor_actual}=    Get From Dictionary    ${response_json}    ${nombre_campo}
    Should Be Equal As Strings    ${valor_actual}    ${valor_esperado}    msg=Campo ${nombre_campo} no coincide. Esperado: ${valor_esperado}, Actual: ${valor_actual}

Obtener Valor De Campo En Response CE
    [Arguments]    ${response}    ${nombre_campo}
    ${response_json}=    Set Variable    ${response.json()}
    ${valor}=    Get From Dictionary    ${response_json}    ${nombre_campo}
    [Return]    ${valor}

Verificar Que Response Contiene Primary Offering ID
    [Arguments]    ${response}    ${primary_offering_id_esperado}
    Verificar Campo En Response CE    ${response}    primaryOfferingId    ${primary_offering_id_esperado}

Verificar Que Response Contiene Primary Offering Name
    [Arguments]    ${response}    ${primary_offering_name_esperado}
    Verificar Campo En Response CE    ${response}    primaryOfferingName    ${primary_offering_name_esperado}

Verificar Que Response Contiene Bill Cycle Type
    [Arguments]    ${response}    ${billcycletype_esperado}
    Verificar Campo En Response CE    ${response}    billcycletype    ${billcycletype_esperado}

Verificar Que Response Contiene Acct Code
    [Arguments]    ${response}    ${acct_code_esperado}
    Verificar Campo En Response CE    ${response}    acctCode    ${acct_code_esperado}

Verificar Que Response Contiene Collection Process Flag
    [Arguments]    ${response}    ${collection_process_flag_esperado}
    Verificar Campo En Response CE    ${response}    collectionProcessFlag    ${collection_process_flag_esperado}

Verificar Que Response Contiene Installment Status
    [Arguments]    ${response}    ${installment_status_esperado}
    Verificar Campo En Response CE    ${response}    installmentStatus    ${installment_status_esperado}

Verificar Que Response Contiene Subsidy Status
    [Arguments]    ${response}    ${subsidy_status_esperado}
    Verificar Campo En Response CE    ${response}    subsidyStatus    ${subsidy_status_esperado}

Verificar Que Response Contiene Cycle Sequence
    [Arguments]    ${response}    ${cycle_sequence_esperado}
    Verificar Campo En Response CE    ${response}    cycleSequence    ${cycle_sequence_esperado}

Verificar Que Response Contiene Amount
    [Arguments]    ${response}    ${amount_esperado}
    Verificar Campo En Response CE    ${response}    amount    ${amount_esperado}

Verificar Que Response Contiene Cycle Class
    [Arguments]    ${response}    ${cycle_class_esperado}
    Verificar Campo En Response CE    ${response}    cycleClass    ${cycle_class_esperado}

Verificar Que Response Contiene Cycle Due Date
    [Arguments]    ${response}    ${cycle_due_date_esperado}
    Verificar Campo En Response CE    ${response}    cycleDueDate    ${cycle_due_date_esperado}

Verificar Que Response Contiene Short Name
    [Arguments]    ${response}    ${short_name_esperado}
    Verificar Campo En Response CE    ${response}    shortName    ${short_name_esperado}

Verificar Que Capa De Integración Ejecuta Consultas A BES
    [Arguments]    ${response}
    # Verificar que la respuesta viene de BES a través de Capa de Integración
    Should Be Equal As Numbers    ${response.status_code}    200
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    primaryOfferingId
    Dictionary Should Contain Key    ${response_json}    installmentStatus
    Dictionary Should Contain Key    ${response_json}    subsidyStatus

Verificar Que BES Retorna Información Completa Sin Errores
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar campos críticos del financiamiento
    Dictionary Should Contain Key    ${response_json}    primaryOfferingId
    Dictionary Should Contain Key    ${response_json}    primaryOfferingName
    Dictionary Should Contain Key    ${response_json}    billcycletype
    Dictionary Should Contain Key    ${response_json}    acctCode
    Dictionary Should Contain Key    ${response_json}    collectionProcessFlag
    Dictionary Should Contain Key    ${response_json}    installmentStatus
    Dictionary Should Contain Key    ${response_json}    subsidyStatus
    Dictionary Should Contain Key    ${response_json}    cycleSequence
    Dictionary Should Contain Key    ${response_json}    amount
    Dictionary Should Contain Key    ${response_json}    cycleClass
    Dictionary Should Contain Key    ${response_json}    cycleDueDate
    Dictionary Should Contain Key    ${response_json}    shortName

Verificar Que Comercio Electrónico Recibe Respuesta Consolidada
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200
    ${response_json}=    Set Variable    ${response.json()}
    Should Not Be Empty    ${response_json}

Verificar Que Información Del Financiamiento Se Muestra Correctamente
    [Arguments]    ${response}
    Verificar Que Response Contiene Información Completa Del Cliente Desde CE    ${response}
    Verificar Que BES Retorna Información Completa Sin Errores    ${response}
