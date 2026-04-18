*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints
${API_PAC_MICROSITIO_BASE_URL}           https://pac-micrositio-telcel-dev.com/api/v1
${API_ENDPOINT_PAC_PAGOS_CONSULTA}       /PACPagosService/Consulta

# URLs BES - APIs consumidas
${API_BES_CUSTOMER_MANAGEMENT}           https://bes-telcel-dev.com/api/CustomerManagement
${API_BES_TELCEL_CUSTOM_SERVICE}         https://bes-telcel-dev.com/api/TelcelCustomService
${API_BES_BC_SERVICE}                    https://bes-telcel-dev.com/api/BCService
${API_BES_AR_SERVICE}                    https://bes-telcel-dev.com/api/ARService

# Campos esperados en la respuesta
@{CAMPOS_ESPERADOS_CLIENTE}    serviceNumber    subscriberId    activeDate    status    accountId    CustID    IMEI    installmentPlanInstId    totalCycle    balancetype    ARBalance    Firstname    lastName    CURP    RFC    regionName

*** Keywords ***
Invocar Servicio PACPagosService Consulta Con Número Telefónico
    [Arguments]    ${numero_telefonico}
    Create Session    pac_micrositio    ${API_PAC_MICROSITIO_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    numeroTelefonico=${numero_telefonico}

    ${response}=    POST On Session    pac_micrositio    ${API_ENDPOINT_PAC_PAGOS_CONSULTA}    json=${payload}    headers=${headers}    expected_status=200

    Should Be Equal As Numbers    ${response.status_code}    200
    [Return]    ${response}

Verificar Que Response Contiene Toda La Información Del Cliente
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que todos los campos esperados están presentes
    FOR    ${campo}    IN    @{CAMPOS_ESPERADOS_CLIENTE}
        Dictionary Should Contain Key    ${response_json}    ${campo}    msg=Campo ${campo} no encontrado en la respuesta
    END

Verificar Campo En Response
    [Arguments]    ${response}    ${nombre_campo}    ${valor_esperado}
    ${response_json}=    Set Variable    ${response.json()}
    ${valor_actual}=    Get From Dictionary    ${response_json}    ${nombre_campo}
    Should Be Equal As Strings    ${valor_actual}    ${valor_esperado}    msg=Campo ${nombre_campo} no coincide. Esperado: ${valor_esperado}, Actual: ${valor_actual}

Obtener Valor De Campo En Response
    [Arguments]    ${response}    ${nombre_campo}
    ${response_json}=    Set Variable    ${response.json()}
    ${valor}=    Get From Dictionary    ${response_json}    ${nombre_campo}
    [Return]    ${valor}

Verificar Que Response Contiene Service Number
    [Arguments]    ${response}    ${service_number_esperado}
    Verificar Campo En Response    ${response}    serviceNumber    ${service_number_esperado}

Verificar Que Response Contiene Subscriber ID
    [Arguments]    ${response}    ${subscriber_id_esperado}
    Verificar Campo En Response    ${response}    subscriberId    ${subscriber_id_esperado}

Verificar Que Response Contiene Account ID
    [Arguments]    ${response}    ${account_id_esperado}
    Verificar Campo En Response    ${response}    accountId    ${account_id_esperado}

Verificar Que Response Contiene Customer ID
    [Arguments]    ${response}    ${customer_id_esperado}
    Verificar Campo En Response    ${response}    CustID    ${customer_id_esperado}

Verificar Que Response Contiene IMEI
    [Arguments]    ${response}    ${imei_esperado}
    Verificar Campo En Response    ${response}    IMEI    ${imei_esperado}

Verificar Que Response Contiene Installment Plan ID
    [Arguments]    ${response}    ${installment_plan_id_esperado}
    Verificar Campo En Response    ${response}    installmentPlanInstId    ${installment_plan_id_esperado}

Verificar Que Response Contiene Total Cycle
    [Arguments]    ${response}    ${total_cycle_esperado}
    Verificar Campo En Response    ${response}    totalCycle    ${total_cycle_esperado}

Verificar Que Response Contiene Balance Type
    [Arguments]    ${response}    ${balance_type_esperado}
    Verificar Campo En Response    ${response}    balancetype    ${balance_type_esperado}

Verificar Que Response Contiene AR Balance
    [Arguments]    ${response}    ${ar_balance_esperado}
    Verificar Campo En Response    ${response}    ARBalance    ${ar_balance_esperado}

Verificar Que Response Contiene Firstname
    [Arguments]    ${response}    ${firstname_esperado}
    Verificar Campo En Response    ${response}    Firstname    ${firstname_esperado}

Verificar Que Response Contiene LastName
    [Arguments]    ${response}    ${lastname_esperado}
    Verificar Campo En Response    ${response}    lastName    ${lastname_esperado}

Verificar Que Response Contiene CURP
    [Arguments]    ${response}    ${curp_esperado}
    Verificar Campo En Response    ${response}    CURP    ${curp_esperado}

Verificar Que Response Contiene RFC
    [Arguments]    ${response}    ${rfc_esperado}
    Verificar Campo En Response    ${response}    RFC    ${rfc_esperado}

Verificar Que Response Contiene Region Name
    [Arguments]    ${response}    ${region_name_esperado}
    Verificar Campo En Response    ${response}    regionName    ${region_name_esperado}

Verificar Que Response Contiene Status Activo
    [Arguments]    ${response}
    ${status}=    Obtener Valor De Campo En Response    ${response}    status
    Should Contain Any    ${status}    Activo    Active    ACTIVE    msg=El status del cliente no está activo

Verificar Que Response Contiene Active Date
    [Arguments]    ${response}
    ${active_date}=    Obtener Valor De Campo En Response    ${response}    activeDate
    Should Not Be Empty    ${active_date}    msg=activeDate no debe estar vacío
