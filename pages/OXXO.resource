*** Variables ***
${OXXO_URL}                              https://oxxo.telcel.com
${OXXO_MENU_PAGOS}                       id:menu_pagos
${OXXO_INPUT_REFERENCIA_PAGO}            id:input_referencia_pago
${OXXO_CAMPO_MONTO_A_PAGAR}              css:.monto-a-pagar
${OXXO_BOTON_PROCESAR_PAGO}              id:btn_procesar_pago
${OXXO_MENSAJE_PAGO_EXITOSO}             xpath://div[contains(text(),'Pago procesado exitosamente')]
${OXXO_CAMPO_CONFIRMACION_PAGO}          css:.confirmacion-pago
${OXXO_CAMPO_REFERENCIA_TRANSACCION}     css:.referencia-transaccion
${OXXO_CAMPO_FECHA_PAGO}                 css:.fecha-pago
${OXXO_CAMPO_MONTO_PROCESADO}            css:.monto-procesado

*** Keywords ***
Abrir sistema OXXO
    Go To    ${OXXO_URL}
    Wait Until Page Contains Element    ${OXXO_MENU_PAGOS}    timeout=10s

Acceder a módulo de pagos en OXXO
    Click Element    ${OXXO_MENU_PAGOS}
    Wait Until Element Is Visible    ${OXXO_INPUT_REFERENCIA_PAGO}    timeout=10s

Ingresar referencia de pago de enganche en OXXO
    [Arguments]    ${referencia}
    Input Text    ${OXXO_INPUT_REFERENCIA_PAGO}    ${referencia}
    Wait Until Element Is Visible    ${OXXO_CAMPO_MONTO_A_PAGAR}    timeout=10s

Verificar monto del enganche en punto de venta OXXO
    [Arguments]    ${monto_esperado}=5000
    ${monto}=    Get Text    ${OXXO_CAMPO_MONTO_A_PAGAR}
    Should Contain    ${monto}    ${monto_esperado}
    Log    Monto a pagar en OXXO: ${monto}

Procesar pago del enganche en OXXO
    Click Button    ${OXXO_BOTON_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${OXXO_MENSAJE_PAGO_EXITOSO}    timeout=15s

Verificar pago procesado exitosamente en OXXO
    Page Should Contain Element    ${OXXO_MENSAJE_PAGO_EXITOSO}
    Wait Until Element Is Visible    ${OXXO_CAMPO_CONFIRMACION_PAGO}    timeout=10s

Obtener datos de confirmación del pago OXXO
    ${referencia_transaccion}=    Get Text    ${OXXO_CAMPO_REFERENCIA_TRANSACCION}
    ${fecha}=    Get Text    ${OXXO_CAMPO_FECHA_PAGO}
    ${monto}=    Get Text    ${OXXO_CAMPO_MONTO_PROCESADO}
    Should Not Be Empty    ${referencia_transaccion}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${monto}
    Log    Transacción OXXO: Referencia=${referencia_transaccion}, Fecha=${fecha}, Monto=${monto}
    [Return]    ${referencia_transaccion}    ${fecha}    ${monto}
