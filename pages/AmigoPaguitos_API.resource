*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
${API_BASE_URL}           https://amigopaguitos-telcel-dev.com/api/v1
${API_ENDPOINT_PRESTAMO}  /prestamos

*** Keywords ***
Enviar Información De Usuario A BES
    [Arguments]    ${nombre}    ${curp}    ${rfc}    ${region}
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${body}=       Create Dictionary
    ...    nombre=${nombre}
    ...    curp=${curp}
    ...    rfc=${rfc}
    ...    region=${region}
    Set To Dictionary    ${body}    usuario    ${body}
    [Return]    ${body}

Enviar Información De Crédito A BES
    [Arguments]    ${monto}    ${ciclo}    ${plazo}    ${tipo_financiamiento}
    ${credito}=    Create Dictionary
    ...    monto_total=${monto}
    ...    ciclo=${ciclo}
    ...    plazo=${plazo}
    ...    tipo_financiamiento=${tipo_financiamiento}
    [Return]    ${credito}

Enviar Información De Equipo A BES
    [Arguments]    ${imei}    ${producto}
    ${equipo}=     Create Dictionary
    ...    imei=${imei}
    ...    producto=${producto}
    [Return]    ${equipo}

Crear Préstamo Completo En BES Via API
    [Arguments]    ${telefono}    ${nombre}    ${curp}    ${rfc}    ${region}    ${monto}    ${ciclo}    ${plazo}    ${tipo}    ${imei}    ${producto}
    Create Session    amigopaguitos    ${API_BASE_URL}    verify=False

    ${usuario}=     Enviar Información De Usuario A BES    ${nombre}    ${curp}    ${rfc}    ${region}
    ${credito}=     Enviar Información De Crédito A BES    ${monto}    ${ciclo}    ${plazo}    ${tipo}
    ${equipo}=      Enviar Información De Equipo A BES     ${imei}    ${producto}

    ${payload}=     Create Dictionary
    ...    telefono=${telefono}
    ...    usuario=${usuario}
    ...    credito=${credito}
    ...    equipo=${equipo}

    ${response}=    POST On Session    amigopaguitos    ${API_ENDPOINT_PRESTAMO}    json=${payload}    expected_status=201

    Should Be Equal As Numbers    ${response.status_code}    201

    ${prestamo_id}=    Get From Dictionary    ${response.json()}    id
    [Return]    ${prestamo_id}

# ============================================
# Keywords para Caso 41 - Venta con servicios diferidos
# ============================================

Crear Venta Con Servicios Suplementarios
    [Arguments]    ${imei}    ${marca}    ${modelo}    ${servicios_list}    ${modalidades_list}
    [Documentation]    Crea una venta de equipo con servicios suplementarios y modalidades de pago
    Create Session    amigopaguitos    ${API_BASE_URL}    verify=False

    ${servicios_payload}=    Create List
    ${index}=    Set Variable    0
    FOR    ${servicio}    IN    @{servicios_list}
        ${modalidad}=    Get From List    ${modalidades_list}    ${index}
        ${servicio_dict}=    Create Dictionary
        ...    nombre=${servicio}
        ...    modalidad_pago=${modalidad}
        Append To List    ${servicios_payload}    ${servicio_dict}
        ${index}=    Evaluate    ${index} + 1
    END

    ${payload}=    Create Dictionary
    ...    imei=${imei}
    ...    marca=${marca}
    ...    modelo=${modelo}
    ...    servicios_suplementarios=${servicios_payload}

    ${response}=    POST On Session    amigopaguitos    /ventas    json=${payload}    expected_status=201
    [Return]    ${response}

Verificar Servicios Con Modalidad De Pago En BES
    [Arguments]    ${response}
    [Documentation]    Verifica que BES haya recibido los servicios con sus modalidades correctas
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    servicios_suplementarios
    ${servicios}=    Get From Dictionary    ${response_json}    servicios_suplementarios
    Length Should Be Greater Than    ${servicios}    0
    [Return]    ${servicios}
