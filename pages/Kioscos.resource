*** Variables ***
${KIOSCO_URL}                             https://kioscos.telcel.com
${KIOSCO_MENU_PAGOS}                      id:menu_pagos
${KIOSCO_INPUT_REFERENCIA_PRESTAMO}       id:input_referencia_prestamo
${KIOSCO_INPUT_NUMERO_PARCIALIDAD}        id:input_numero_parcialidad
${KIOSCO_INPUT_MONTO_PARCIALIDAD}         id:input_monto_parcialidad
${KIOSCO_INPUT_IDENTIFICACION_CLIENTE}    id:input_identificacion_cliente
${KIOSCO_SELECT_MEDIO_PAGO}               id:select_medio_pago
${KIOSCO_INPUT_NUMERO_TARJETA}            id:input_numero_tarjeta
${KIOSCO_INPUT_CVV}                       id:input_cvv
${KIOSCO_INPUT_FECHA_EXPIRACION}          id:input_fecha_expiracion
${KIOSCO_BOTON_PROCESAR_PAGO}             id:btn_procesar_pago
${KIOSCO_MENSAJE_PAGO_EXITOSO}            xpath://div[contains(text(),'Pago procesado exitosamente')]
${KIOSCO_CAMPO_CONFIRMACION_PAGO}         css:.confirmacion-pago
${KIOSCO_CAMPO_REFERENCIA_TRANSACCION}    css:.referencia-transaccion
${KIOSCO_CAMPO_FECHA_PAGO}                css:.fecha-pago
${KIOSCO_CAMPO_MONTO_PROCESADO}           css:.monto-procesado
${KIOSCO_CAMPO_PUNTO_COBRO}               css:.punto-cobro
${KIOSCO_CAMPO_MEDIO_PAGO}                css:.medio-pago

*** Keywords ***
Abrir sistema Kioscos
    Go To    ${KIOSCO_URL}
    Wait Until Page Contains Element    ${KIOSCO_MENU_PAGOS}    timeout=10s

Acceder a módulo de pagos en Kioscos
    Click Element    ${KIOSCO_MENU_PAGOS}
    Wait Until Element Is Visible    ${KIOSCO_INPUT_REFERENCIA_PRESTAMO}    timeout=10s

Ingresar datos del pago de parcialidad en Kioscos
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}
    Input Text    ${KIOSCO_INPUT_REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Input Text    ${KIOSCO_INPUT_NUMERO_PARCIALIDAD}    ${numero_parcialidad}
    Input Text    ${KIOSCO_INPUT_MONTO_PARCIALIDAD}    ${monto}
    Input Text    ${KIOSCO_INPUT_IDENTIFICACION_CLIENTE}    ${identificacion}

Seleccionar medio de pago con tarjeta de crédito
    Select From List By Label    ${KIOSCO_SELECT_MEDIO_PAGO}    Tarjeta de Crédito
    Wait Until Element Is Visible    ${KIOSCO_INPUT_NUMERO_TARJETA}    timeout=10s

Ingresar datos de tarjeta de crédito
    [Arguments]    ${numero_tarjeta}=4111111111111111    ${cvv}=123    ${fecha_expiracion}=12/28
    Input Text    ${KIOSCO_INPUT_NUMERO_TARJETA}    ${numero_tarjeta}
    Input Text    ${KIOSCO_INPUT_CVV}    ${cvv}
    Input Text    ${KIOSCO_INPUT_FECHA_EXPIRACION}    ${fecha_expiracion}

Procesar pago de parcialidad en Kioscos
    Click Button    ${KIOSCO_BOTON_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${KIOSCO_MENSAJE_PAGO_EXITOSO}    timeout=15s

Verificar pago procesado exitosamente en Kioscos
    Page Should Contain Element    ${KIOSCO_MENSAJE_PAGO_EXITOSO}
    ${punto_cobro}=    Get Text    ${KIOSCO_CAMPO_PUNTO_COBRO}
    Should Contain    ${punto_cobro}    Kioscos
    ${medio_pago}=    Get Text    ${KIOSCO_CAMPO_MEDIO_PAGO}
    Should Contain    ${medio_pago}    Tarjeta de Crédito

Obtener datos del pago de parcialidad procesado en Kioscos
    ${referencia_transaccion}=    Get Text    ${KIOSCO_CAMPO_REFERENCIA_TRANSACCION}
    ${fecha}=    Get Text    ${KIOSCO_CAMPO_FECHA_PAGO}
    ${monto}=    Get Text    ${KIOSCO_CAMPO_MONTO_PROCESADO}
    Should Not Be Empty    ${referencia_transaccion}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${monto}
    Log    Referencia: ${referencia_transaccion}, Fecha: ${fecha}, Monto: ${monto}
    [Return]    ${referencia_transaccion}    ${fecha}    ${monto}

# ========================================
# LOCATORS Y KEYWORDS PARA PAGO DE ENGANCHE CON TDC (TC078)
# ========================================
${KIOSCO_MENU_PAGO_ENGANCHE}              id:menu_pago_enganche
${KIOSCO_INPUT_REFERENCIA_VENTA_AP}       id:input_referencia_venta_ap
${KIOSCO_INPUT_MONTO_ENGANCHE}            id:input_monto_enganche
${KIOSCO_BOTON_SELECCIONAR_TDC}           id:btn_seleccionar_tdc
${KIOSCO_PANEL_INTERFAZ_PAGO_TDC}         id:panel_interfaz_pago_tdc
${KIOSCO_CAMPO_MONTO_ENGANCHE_PANTALLA}   css:.monto-enganche-pantalla
${KIOSCO_INPUT_NUMERO_TDC}                id:input_numero_tdc
${KIOSCO_INPUT_NOMBRE_TITULAR_TDC}        id:input_nombre_titular_tdc
${KIOSCO_INPUT_CVV_TDC}                   id:input_cvv_tdc
${KIOSCO_INPUT_FECHA_EXP_TDC}             id:input_fecha_exp_tdc
${KIOSCO_BOTON_CONFIRMAR_PAGO_TDC}        id:btn_confirmar_pago_tdc
${KIOSCO_MENSAJE_PROCESANDO_PAGO}         xpath://div[contains(text(),'Procesando pago')]
${KIOSCO_MENSAJE_PAGO_AUTORIZADO}         xpath://div[contains(text(),'Pago autorizado')]
${KIOSCO_PANEL_COMPROBANTE_PAGO}          id:panel_comprobante_pago
${KIOSCO_CAMPO_REFERENCIA_PAGO_ENGANCHE}  css:.referencia-pago-enganche
${KIOSCO_CAMPO_AUTORIZACION_PAGO}         css:.autorizacion-pago
${KIOSCO_CAMPO_FECHA_HORA_PAGO}           css:.fecha-hora-pago
${KIOSCO_CAMPO_MONTO_PAGADO_ENGANCHE}     css:.monto-pagado-enganche
${KIOSCO_MENSAJE_NOTIFICACION_ENVIADA}    xpath://div[contains(text(),'Notificación enviada a CPS')]

Acceder a módulo de pago de enganche en Kioscos
    Click Element    ${KIOSCO_MENU_PAGO_ENGANCHE}
    Wait Until Element Is Visible    ${KIOSCO_INPUT_REFERENCIA_VENTA_AP}    timeout=10s
    Log    Acceso a módulo de pago de enganche en Kioscos

Ingresar referencia de venta de Amigo Paguitos
    [Arguments]    ${referencia_venta}
    Input Text    ${KIOSCO_INPUT_REFERENCIA_VENTA_AP}    ${referencia_venta}
    Wait Until Element Is Visible    ${KIOSCO_INPUT_MONTO_ENGANCHE}    timeout=10s

Verificar monto de enganche mostrado en Kioscos
    [Arguments]    ${monto_esperado}
    Wait Until Element Is Visible    ${KIOSCO_CAMPO_MONTO_ENGANCHE_PANTALLA}    timeout=10s
    ${monto}=    Get Text    ${KIOSCO_CAMPO_MONTO_ENGANCHE_PANTALLA}
    Should Contain    ${monto}    ${monto_esperado}
    Log    Monto de enganche a pagar: ${monto}

Seleccionar opción de pago con tarjeta de crédito en Kioscos
    Click Button    ${KIOSCO_BOTON_SELECCIONAR_TDC}
    Wait Until Element Is Visible    ${KIOSCO_PANEL_INTERFAZ_PAGO_TDC}    timeout=10s
    Log    Interfaz de pago con TDC mostrada en Kioscos

Verificar interfaz de pago con TDC mostrada
    Page Should Contain Element    ${KIOSCO_PANEL_INTERFAZ_PAGO_TDC}
    Wait Until Element Is Visible    ${KIOSCO_INPUT_NUMERO_TDC}    timeout=10s
    Wait Until Element Is Visible    ${KIOSCO_INPUT_CVV_TDC}    timeout=10s
    Wait Until Element Is Visible    ${KIOSCO_INPUT_FECHA_EXP_TDC}    timeout=10s
    Log    Interfaz de pago con TDC lista para ingresar datos

Ingresar datos de tarjeta de crédito para pago de enganche
    [Arguments]    ${numero_tdc}=4111111111111111    ${nombre_titular}=Juan Perez    ${cvv}=123    ${fecha_exp}=12/28
    Input Text    ${KIOSCO_INPUT_NUMERO_TDC}    ${numero_tdc}
    Input Text    ${KIOSCO_INPUT_NOMBRE_TITULAR_TDC}    ${nombre_titular}
    Input Text    ${KIOSCO_INPUT_CVV_TDC}    ${cvv}
    Input Text    ${KIOSCO_INPUT_FECHA_EXP_TDC}    ${fecha_exp}
    Log    Datos de TDC ingresados para pago de enganche

Confirmar pago del enganche con TDC
    Click Button    ${KIOSCO_BOTON_CONFIRMAR_PAGO_TDC}
    Wait Until Element Is Visible    ${KIOSCO_MENSAJE_PROCESANDO_PAGO}    timeout=10s
    Log    Procesando pago de enganche con TDC

Esperar autorización de pago con TDC
    Wait Until Element Is Visible    ${KIOSCO_MENSAJE_PAGO_AUTORIZADO}    timeout=30s
    Log    Pago de enganche autorizado por pasarela de pagos

Verificar generación de comprobante de pago de enganche
    Wait Until Element Is Visible    ${KIOSCO_PANEL_COMPROBANTE_PAGO}    timeout=10s
    Page Should Contain Element    ${KIOSCO_CAMPO_REFERENCIA_PAGO_ENGANCHE}
    Page Should Contain Element    ${KIOSCO_CAMPO_AUTORIZACION_PAGO}
    Page Should Contain Element    ${KIOSCO_CAMPO_FECHA_HORA_PAGO}
    Page Should Contain Element    ${KIOSCO_CAMPO_MONTO_PAGADO_ENGANCHE}
    Log    Comprobante de pago de enganche generado

Obtener datos del comprobante de pago de enganche
    ${referencia}=    Get Text    ${KIOSCO_CAMPO_REFERENCIA_PAGO_ENGANCHE}
    ${autorizacion}=    Get Text    ${KIOSCO_CAMPO_AUTORIZACION_PAGO}
    ${fecha_hora}=    Get Text    ${KIOSCO_CAMPO_FECHA_HORA_PAGO}
    ${monto}=    Get Text    ${KIOSCO_CAMPO_MONTO_PAGADO_ENGANCHE}
    Should Not Be Empty    ${referencia}
    Should Not Be Empty    ${autorizacion}
    Should Not Be Empty    ${fecha_hora}
    Should Not Be Empty    ${monto}
    Log    Comprobante: Ref=${referencia}, Aut=${autorizacion}, Fecha=${fecha_hora}, Monto=${monto}
    [Return]    ${referencia}    ${autorizacion}    ${fecha_hora}    ${monto}

Verificar notificación enviada desde Kioscos a CPS
    Wait Until Element Is Visible    ${KIOSCO_MENSAJE_NOTIFICACION_ENVIADA}    timeout=15s
    Page Should Contain Element    ${KIOSCO_MENSAJE_NOTIFICACION_ENVIADA}
    Log    Kioscos notificó a CPS sobre el pago de enganche realizado
