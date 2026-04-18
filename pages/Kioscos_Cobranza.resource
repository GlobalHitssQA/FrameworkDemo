*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_KIOSCO_INICIO}                          https://kiosco-telcel-dev.com/inicio
${URL_KIOSCO_PAGOS}                           https://kiosco-telcel-dev.com/pagos/amigopaguitos

# Locators - Pantalla Principal Kiosco
${LOCATOR_KIOSCO_BTN_PAGO_AMIGO_PAGUITOS}     id:btnPagoAmigoPaguitos
${LOCATOR_KIOSCO_BTN_INICIAR_PAGO}            id:btnIniciarPago

# Locators - Captura de Número Telefónico
${LOCATOR_KIOSCO_INPUT_NUMERO_TELEFONICO}     id:numeroTelefonicoKiosco
${LOCATOR_KIOSCO_BTN_CONTINUAR}               id:btnContinuar
${LOCATOR_KIOSCO_TXT_TITULO_CAPTURA}          css:.pantalla-captura .titulo

# Locators - Información del Crédito
${LOCATOR_KIOSCO_TXT_SALDO_PENDIENTE}         css:.info-credito .saldo-pendiente
${LOCATOR_KIOSCO_TXT_PROXIMA_PARCIALIDAD}     css:.info-credito .proxima-parcialidad
${LOCATOR_KIOSCO_TXT_MONTO_PARCIALIDAD}       css:.info-credito .monto-parcialidad
${LOCATOR_KIOSCO_TXT_FECHA_VENCIMIENTO}       css:.info-credito .fecha-vencimiento
${LOCATOR_KIOSCO_TXT_CUSTOMER_ID}             css:.info-credito .customer-id

# Locators - Selección de Método de Pago
${LOCATOR_KIOSCO_BTN_METODO_PAGO}             id:btnSeleccionarMetodoPago
${LOCATOR_KIOSCO_BTN_TARJETA_CREDITO}         id:btnTarjetaCredito
${LOCATOR_KIOSCO_BTN_TARJETA_DEBITO}          id:btnTarjetaDebito
${LOCATOR_KIOSCO_TXT_MENSAJE_LECTOR}          css:.lector-tarjeta .mensaje-instruccion

# Locators - Procesamiento de Pago
${LOCATOR_KIOSCO_TXT_PROCESANDO_PAGO}         css:.procesamiento-pago .mensaje-procesando
${LOCATOR_KIOSCO_TXT_ESTADO_TRANSACCION}      css:.procesamiento-pago .estado-transaccion
${LOCATOR_KIOSCO_SPINNER_PROCESAMIENTO}       css:.procesamiento-pago .spinner

# Locators - Comprobante y Confirmación
${LOCATOR_KIOSCO_TXT_COMPROBANTE_TRANSACCION}    css:.comprobante .numero-transaccion
${LOCATOR_KIOSCO_TXT_FECHA_HORA_PAGO}            css:.comprobante .fecha-hora
${LOCATOR_KIOSCO_TXT_MONTO_PAGADO}               css:.comprobante .monto-pagado
${LOCATOR_KIOSCO_TXT_METODO_PAGO_USADO}          css:.comprobante .metodo-pago
${LOCATOR_KIOSCO_MSG_PAGO_EXITOSO}               css:.alert-success
${LOCATOR_KIOSCO_BTN_IMPRIMIR_COMPROBANTE}       id:btnImprimirComprobante
${LOCATOR_KIOSCO_BTN_FINALIZAR}                  id:btnFinalizar

# Locators - Verificación en BES
${LOCATOR_KIOSCO_TXT_REGISTRO_BES}            css:.verificacion-bes .registro-confirmado
${LOCATOR_KIOSCO_TXT_SALDO_ACTUALIZADO_BES}   css:.verificacion-bes .saldo-actualizado
${LOCATOR_KIOSCO_TXT_ESTADO_CREDITO_BES}      css:.verificacion-bes .estado-credito

*** Keywords ***
Abrir Navegador En Kiosco
    Open Browser    ${URL_KIOSCO_INICIO}    Chrome
    Maximize Browser Window
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_BTN_PAGO_AMIGO_PAGUITOS}    timeout=10s

Seleccionar Opción De Pago Amigo Paguitos En Kiosco
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_BTN_PAGO_AMIGO_PAGUITOS}
    Click Button    ${LOCATOR_KIOSCO_BTN_PAGO_AMIGO_PAGUITOS}
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_INPUT_NUMERO_TELEFONICO}    timeout=10s

Verificar Que Kiosco Muestra Pantalla De Captura De Número Telefónico
    Element Should Be Visible    ${LOCATOR_KIOSCO_INPUT_NUMERO_TELEFONICO}
    Element Should Be Visible    ${LOCATOR_KIOSCO_BTN_CONTINUAR}
    ${titulo}=    Get Text    ${LOCATOR_KIOSCO_TXT_TITULO_CAPTURA}
    Should Contain Any    ${titulo}    número telefónico    teléfono    ingrese su número

Ingresar Número Telefónico En Kiosco
    [Arguments]    ${numero_telefonico}
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_INPUT_NUMERO_TELEFONICO}
    Input Text    ${LOCATOR_KIOSCO_INPUT_NUMERO_TELEFONICO}    ${numero_telefonico}
    Click Button    ${LOCATOR_KIOSCO_BTN_CONTINUAR}
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_TXT_SALDO_PENDIENTE}    timeout=10s

Verificar Que Sistema Recupera Información Del Crédito En Kiosco
    Element Should Be Visible    ${LOCATOR_KIOSCO_TXT_SALDO_PENDIENTE}
    Element Should Be Visible    ${LOCATOR_KIOSCO_TXT_PROXIMA_PARCIALIDAD}
    Element Should Be Visible    ${LOCATOR_KIOSCO_TXT_MONTO_PARCIALIDAD}
    ${saldo}=    Get Text    ${LOCATOR_KIOSCO_TXT_SALDO_PENDIENTE}
    Should Not Be Empty    ${saldo}
    ${parcialidad}=    Get Text    ${LOCATOR_KIOSCO_TXT_PROXIMA_PARCIALIDAD}
    Should Not Be Empty    ${parcialidad}

Obtener Información Del Crédito Desde Kiosco
    ${saldo_pendiente}=     Get Text    ${LOCATOR_KIOSCO_TXT_SALDO_PENDIENTE}
    ${proxima_parcialidad}=     Get Text    ${LOCATOR_KIOSCO_TXT_PROXIMA_PARCIALIDAD}
    ${monto_parcialidad}=     Get Text    ${LOCATOR_KIOSCO_TXT_MONTO_PARCIALIDAD}
    [Return]    ${saldo_pendiente}    ${proxima_parcialidad}    ${monto_parcialidad}

Seleccionar Método De Pago En Kiosco
    [Arguments]    ${tipo_tarjeta}
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_BTN_METODO_PAGO}
    Click Button    ${LOCATOR_KIOSCO_BTN_METODO_PAGO}
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_BTN_TARJETA_CREDITO}    timeout=5s
    Run Keyword If    '${tipo_tarjeta}' == 'credito'    Click Button    ${LOCATOR_KIOSCO_BTN_TARJETA_CREDITO}
    Run Keyword If    '${tipo_tarjeta}' == 'debito'    Click Button    ${LOCATOR_KIOSCO_BTN_TARJETA_DEBITO}
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_TXT_MENSAJE_LECTOR}    timeout=5s

Verificar Que Kiosco Activa Lector De Tarjetas
    Element Should Be Visible    ${LOCATOR_KIOSCO_TXT_MENSAJE_LECTOR}
    ${mensaje}=    Get Text    ${LOCATOR_KIOSCO_TXT_MENSAJE_LECTOR}
    Should Contain Any    ${mensaje}    insertar    inserte    tarjeta    lector

Simular Inserción De Tarjeta Y Pago
    [Arguments]    ${numero_tarjeta}=4152313541234567
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_TXT_MENSAJE_LECTOR}
    Sleep    2s
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_TXT_PROCESANDO_PAGO}    timeout=15s

Verificar Que Sistema Procesa El Pago En Kiosco
    Element Should Be Visible    ${LOCATOR_KIOSCO_TXT_PROCESANDO_PAGO}
    ${estado}=    Get Text    ${LOCATOR_KIOSCO_TXT_ESTADO_TRANSACCION}
    Should Contain Any    ${estado}    procesando    en proceso    validando

Verificar Que Sistema Genera Comprobante De Transacción
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_TXT_COMPROBANTE_TRANSACCION}    timeout=15s
    Element Should Be Visible    ${LOCATOR_KIOSCO_TXT_FECHA_HORA_PAGO}
    Element Should Be Visible    ${LOCATOR_KIOSCO_TXT_MONTO_PAGADO}
    Element Should Be Visible    ${LOCATOR_KIOSCO_TXT_METODO_PAGO_USADO}
    ${numero_comprobante}=    Get Text    ${LOCATOR_KIOSCO_TXT_COMPROBANTE_TRANSACCION}
    Should Not Be Empty    ${numero_comprobante}

Verificar Que Pago Fue Exitoso En Kiosco
    Element Should Be Visible    ${LOCATOR_KIOSCO_MSG_PAGO_EXITOSO}
    ${mensaje}=    Get Text    ${LOCATOR_KIOSCO_MSG_PAGO_EXITOSO}
    Should Contain Any    ${mensaje}    exitoso    exitosamente    completado    aprobado

Obtener Datos Del Comprobante De Kiosco
    ${numero_transaccion}=    Get Text    ${LOCATOR_KIOSCO_TXT_COMPROBANTE_TRANSACCION}
    ${fecha_hora}=    Get Text    ${LOCATOR_KIOSCO_TXT_FECHA_HORA_PAGO}
    ${monto_pagado}=    Get Text    ${LOCATOR_KIOSCO_TXT_MONTO_PAGADO}
    ${metodo_pago}=    Get Text    ${LOCATOR_KIOSCO_TXT_METODO_PAGO_USADO}
    [Return]    ${numero_transaccion}    ${fecha_hora}    ${monto_pagado}    ${metodo_pago}

Imprimir Comprobante En Kiosco
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_BTN_IMPRIMIR_COMPROBANTE}
    Click Button    ${LOCATOR_KIOSCO_BTN_IMPRIMIR_COMPROBANTE}
    Sleep    2s

Finalizar Transacción En Kiosco
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_BTN_FINALIZAR}
    Click Button    ${LOCATOR_KIOSCO_BTN_FINALIZAR}
    Wait Until Element Is Visible    ${LOCATOR_KIOSCO_BTN_PAGO_AMIGO_PAGUITOS}    timeout=10s

Cerrar Sesión En Kiosco
    Close Browser
