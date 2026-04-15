*** Variables ***
${SICATEL_URL}                             https://sicatel.telcel.com
${SICATEL_MENU_PAGOS}                      id:menu_pagos
${SICATEL_INPUT_REFERENCIA_PRESTAMO}       id:input_referencia_prestamo
${SICATEL_INPUT_NUMERO_PARCIALIDAD}        id:input_numero_parcialidad
${SICATEL_INPUT_MONTO_PARCIALIDAD}         id:input_monto_parcialidad
${SICATEL_INPUT_IDENTIFICACION_CLIENTE}    id:input_identificacion_cliente
${SICATEL_BOTON_PROCESAR_PAGO}             id:btn_procesar_pago
${SICATEL_MENSAJE_PAGO_EXITOSO}            xpath://div[contains(text(),'Pago procesado exitosamente')]
${SICATEL_CAMPO_CONFIRMACION_PAGO}         css:.confirmacion-pago
${SICATEL_CAMPO_REFERENCIA_TRANSACCION}    css:.referencia-transaccion
${SICATEL_CAMPO_FECHA_PAGO}                css:.fecha-pago
${SICATEL_CAMPO_MONTO_PROCESADO}           css:.monto-procesado
${SICATEL_CAMPO_PUNTO_COBRO}               css:.punto-cobro

*** Keywords ***
Abrir sistema SICATEL
    Go To    ${SICATEL_URL}
    Wait Until Page Contains Element    ${SICATEL_MENU_PAGOS}    timeout=10s

Acceder a módulo de pagos en SICATEL
    Click Element    ${SICATEL_MENU_PAGOS}
    Wait Until Element Is Visible    ${SICATEL_INPUT_REFERENCIA_PRESTAMO}    timeout=10s

Ingresar datos del pago de parcialidad en SICATEL
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}
    Input Text    ${SICATEL_INPUT_REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Input Text    ${SICATEL_INPUT_NUMERO_PARCIALIDAD}    ${numero_parcialidad}
    Input Text    ${SICATEL_INPUT_MONTO_PARCIALIDAD}    ${monto}
    Input Text    ${SICATEL_INPUT_IDENTIFICACION_CLIENTE}    ${identificacion}

Procesar pago de parcialidad en SICATEL
    Click Button    ${SICATEL_BOTON_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${SICATEL_MENSAJE_PAGO_EXITOSO}    timeout=15s

Verificar pago procesado exitosamente en SICATEL
    Page Should Contain Element    ${SICATEL_MENSAJE_PAGO_EXITOSO}
    ${punto_cobro}=    Get Text    ${SICATEL_CAMPO_PUNTO_COBRO}
    Should Contain    ${punto_cobro}    SICATEL

Obtener datos del pago de parcialidad procesado
    ${referencia_transaccion}=    Get Text    ${SICATEL_CAMPO_REFERENCIA_TRANSACCION}
    ${fecha}=    Get Text    ${SICATEL_CAMPO_FECHA_PAGO}
    ${monto}=    Get Text    ${SICATEL_CAMPO_MONTO_PROCESADO}
    Should Not Be Empty    ${referencia_transaccion}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${monto}
    Log    Referencia: ${referencia_transaccion}, Fecha: ${fecha}, Monto: ${monto}
    [Return]    ${referencia_transaccion}    ${fecha}    ${monto}

# ========================================
# LOCATORS Y KEYWORDS PARA NOTIFICACIÓN DE PAGOS OXXO A CPS (TC077)
# ========================================
${SICATEL_MENU_NOTIFICACIONES}           id:menu_notificaciones
${SICATEL_CAMPO_ORIGEN_PAGO}             css:.origen-pago
${SICATEL_MENSAJE_NOTIFICACION_ENVIADA}  xpath://div[contains(text(),'Notificación enviada a CPS')]
${SICATEL_CAMPO_SISTEMA_DESTINO}         css:.sistema-destino

Enviar notificación de pago OXXO a CPS
    [Arguments]    ${referencia_transaccion}    ${monto}    ${fecha}    ${referencia_prestamo}
    Click Element    ${SICATEL_MENU_NOTIFICACIONES}
    Wait Until Element Is Visible    ${SICATEL_MENSAJE_NOTIFICACION_ENVIADA}    timeout=15s
    ${destino}=    Get Text    ${SICATEL_CAMPO_SISTEMA_DESTINO}
    Should Contain    ${destino}    CPS
    Log    Notificación enviada desde SICATEL a CPS para pago OXXO

Verificar origen del pago es OXXO
    ${origen}=    Get Text    ${SICATEL_CAMPO_ORIGEN_PAGO}
    Should Contain    ${origen}    OXXO
    Log    Origen del pago confirmado: OXXO
