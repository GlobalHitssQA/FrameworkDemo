*** Variables ***
# Pagos Page Locators
${MENU_PAGOS}                      id:menuPagos
${SUBMENU_PAGO_ADELANTADO}         id:submenuPagoAdelantado
${INPUT_NUMERO_CUENTA_PAGO}        id:numeroCuentaPago
${BTN_BUSCAR_CUENTA_PAGO}          id:btnBuscarCuentaPago
${LBL_INFO_CUENTA_PAGO}            id:infoCuentaPago
${LBL_SALDO_ADEUDADO}              id:saldoAdeudado
${LBL_PARCIALIDADES_PENDIENTES}    id:parcialidadesPendientes
${BTN_PAGO_ADELANTADO_CRM}         id:btnPagoAdelantadoCRM
${MSG_ERROR_PAGO_ADELANTADO}       css:.alert-danger
${MSG_OPERACION_NO_PERMITIDA_PAGO} xpath://div[contains(text(),'pago por adelantado CRM no disponible')]
${INPUT_MONTO_PAGO}                id:montoPago
${BTN_PROCESAR_PAGO}               id:btnProcesarPago
${LBL_SALDO_FAVOR}                 id:saldoFavor
${MSG_PAGO_EXITOSO}                css:.alert-success
${LBL_TIPO_CUENTA_PAGO}            id:tipoCuentaPago
${LBL_ESTADO_PARCIALIDADES}        id:estadoParcialidades

*** Keywords ***
Navegar a módulo de pagos
    Wait Until Element Is Visible    ${MENU_PAGOS}    timeout=10s
    Click Element    ${MENU_PAGOS}

Acceder a pago por adelantado
    Wait Until Element Is Visible    ${SUBMENU_PAGO_ADELANTADO}    timeout=5s
    Click Element    ${SUBMENU_PAGO_ADELANTADO}

Buscar cuenta para pago
    [Arguments]    ${numero_cuenta}
    Wait Until Element Is Visible    ${INPUT_NUMERO_CUENTA_PAGO}    timeout=5s
    Input Text    ${INPUT_NUMERO_CUENTA_PAGO}    ${numero_cuenta}
    Click Button    ${BTN_BUSCAR_CUENTA_PAGO}
    Wait Until Element Is Visible    ${LBL_INFO_CUENTA_PAGO}    timeout=10s

Verificar cuenta Amigo Paguitos con parcialidades pendientes
    Wait Until Element Is Visible    ${LBL_TIPO_CUENTA_PAGO}    timeout=5s
    ${tipo}=    Get Text    ${LBL_TIPO_CUENTA_PAGO}
    Should Contain    ${tipo}    Amigo Paguitos    msg=Debe ser cuenta de Amigo Paguitos
    Wait Until Element Is Visible    ${LBL_PARCIALIDADES_PENDIENTES}    timeout=5s
    Element Should Be Visible    ${LBL_PARCIALIDADES_PENDIENTES}

Verificar saldo adeudado visible
    Wait Until Element Is Visible    ${LBL_SALDO_ADEUDADO}    timeout=5s
    ${saldo}=    Get Text    ${LBL_SALDO_ADEUDADO}
    Should Not Be Equal As Strings    ${saldo}    0    msg=Debe existir saldo adeudado

Intentar pago por adelantado CRM desde GUI
    Wait Until Element Is Visible    ${BTN_PAGO_ADELANTADO_CRM}    timeout=5s
    Click Button    ${BTN_PAGO_ADELANTADO_CRM}

Verificar pago adelantado CRM no disponible
    Wait Until Element Is Visible    ${MSG_ERROR_PAGO_ADELANTADO}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_PAGO_ADELANTADO}
    Should Contain Any    ${mensaje}    no disponible    no permitido    Amigo Paguitos    adelantado CRM
    ...    msg=Debe aparecer mensaje indicando que pago por adelantado CRM no está disponible

Realizar sobrepago mayor a parcialidad vencida
    [Arguments]    ${monto_sobrepago}
    Wait Until Element Is Visible    ${INPUT_MONTO_PAGO}    timeout=5s
    Input Text    ${INPUT_MONTO_PAGO}    ${monto_sobrepago}
    Click Button    ${BTN_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${MSG_PAGO_EXITOSO}    timeout=10s

Verificar saldo a favor registrado correctamente
    Wait Until Element Is Visible    ${LBL_SALDO_FAVOR}    timeout=5s
    ${saldo_favor}=    Get Text    ${LBL_SALDO_FAVOR}
    Should Not Be Equal As Strings    ${saldo_favor}    0    msg=Debe existir saldo a favor registrado

Consultar estado de cuenta después del sobrepago
    Wait Until Element Is Visible    ${LBL_INFO_CUENTA_PAGO}    timeout=5s
    Wait Until Element Is Visible    ${LBL_SALDO_FAVOR}    timeout=5s
    Wait Until Element Is Visible    ${LBL_ESTADO_PARCIALIDADES}    timeout=5s
