*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_PAGO_ENGANCHE}                  /venta/pago-enganche

# Locators - Pago de Enganche
${LOCATOR_TXT_TITULO_PAGO_ENGANCHE}          css:.pago-enganche-container .titulo
${LOCATOR_TXT_RESUMEN_VENTA}                 css:.pago-enganche-info .resumen-venta
${LOCATOR_TXT_MONTO_ENGANCHE}                css:.pago-enganche-info .monto-enganche

# Locators - Opciones de Método de Pago
${LOCATOR_DIV_METODOS_PAGO}                  css:.metodos-pago-container
${LOCATOR_RADIO_METODO_SICATEL}              id:radioMetodoSicatel
${LOCATOR_RADIO_METODO_KIOSCO}               id:radioMetodoKiosco
${LOCATOR_RADIO_METODO_OXXO}                 id:radioMetodoOxxo
${LOCATOR_TXT_METODO_SELECCIONADO}           css:.seleccion-metodo .metodo-actual

# Locators - Procesamiento de Pago
${LOCATOR_BTN_PROCESAR_PAGO}                 id:btnProcesarPago
${LOCATOR_DIV_PROCESAMIENTO}                 css:.procesamiento-pago
${LOCATOR_TXT_ESTADO_PAGO}                   css:.procesamiento-pago .estado
${LOCATOR_TXT_REFERENCIA_PAGO}               css:.procesamiento-pago .referencia

# Locators - Integración con CPS
${LOCATOR_DIV_INTEGRACION_CPS}               css:.integracion-cps
${LOCATOR_TXT_ESTADO_CPS}                    css:.integracion-cps .estado-integracion
${LOCATOR_TXT_CONFIRMACION_CPS}              css:.integracion-cps .confirmacion-pago

# Locators - Confirmación y Actualización
${LOCATOR_MSG_PAGO_EXITOSO}                  css:.alert-success .msg-pago
${LOCATOR_TXT_ESTADO_FINANCIAMIENTO}         css:.resultado-pago .estado-financiamiento
${LOCATOR_TXT_SALDO_ACTUALIZADO}             css:.resultado-pago .saldo-actualizado

# Locators - Navegación
${LOCATOR_BTN_CONTINUAR_A_ENVIO_CONTRATO}    id:btnContinuarEnvioContrato

*** Keywords ***
Avanzar A Etapa De Pago De Enganche
    Wait Until Element Is Visible    ${LOCATOR_TXT_TITULO_PAGO_ENGANCHE}    timeout=10s

Verificar Que Inicia Etapa De Pago De Enganche
    Wait Until Element Is Visible    ${LOCATOR_TXT_TITULO_PAGO_ENGANCHE}    timeout=10s
    ${titulo}=    Get Text    ${LOCATOR_TXT_TITULO_PAGO_ENGANCHE}
    Should Contain    ${titulo}    Pago de Enganche

Verificar Que Sistema Avanza A Pago De Enganche
    Verificar Que Inicia Etapa De Pago De Enganche
    Element Should Be Visible    ${LOCATOR_TXT_RESUMEN_VENTA}
    Element Should Be Visible    ${LOCATOR_TXT_MONTO_ENGANCHE}

Verificar Que Sistema Muestra Opciones De Pago Disponibles
    Wait Until Element Is Visible    ${LOCATOR_DIV_METODOS_PAGO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_RADIO_METODO_SICATEL}
    Element Should Be Visible    ${LOCATOR_RADIO_METODO_KIOSCO}
    Element Should Be Visible    ${LOCATOR_RADIO_METODO_OXXO}

Seleccionar Método De Pago Del Enganche
    [Arguments]    ${metodo}
    Wait Until Element Is Visible    ${LOCATOR_DIV_METODOS_PAGO}    timeout=10s
    IF    '${metodo}' == 'SICATEL'
        Click Element    ${LOCATOR_RADIO_METODO_SICATEL}
    ELSE IF    '${metodo}' == 'Kioskos' or '${metodo}' == 'Kiosco'
        Click Element    ${LOCATOR_RADIO_METODO_KIOSCO}
    ELSE IF    '${metodo}' == 'OXXO'
        Click Element    ${LOCATOR_RADIO_METODO_OXXO}
    END
    Wait Until Element Is Visible    ${LOCATOR_TXT_METODO_SELECCIONADO}    timeout=5s

Procesar Pago Del Enganche A Través Del Método Seleccionado
    Wait Until Element Is Enabled    ${LOCATOR_BTN_PROCESAR_PAGO}
    Click Button    ${LOCATOR_BTN_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${LOCATOR_DIV_PROCESAMIENTO}    timeout=15s

Verificar Que Sistema Integra Con CPS Para Registrar Pago
    Wait Until Element Is Visible    ${LOCATOR_DIV_INTEGRACION_CPS}    timeout=15s
    ${estado_cps}=    Get Text    ${LOCATOR_TXT_ESTADO_CPS}
    Should Contain Any    ${estado_cps}    Integración exitosa    Conectado    Procesando
    Element Should Be Visible    ${LOCATOR_TXT_CONFIRMACION_CPS}

Confirmar Recepción Del Pago De Enganche
    Wait Until Element Is Visible    ${LOCATOR_MSG_PAGO_EXITOSO}    timeout=20s
    Element Should Be Visible    ${LOCATOR_TXT_REFERENCIA_PAGO}

Verificar Que Sistema Valida Pago Y Actualiza Estado Del Financiamiento
    Element Should Be Visible    ${LOCATOR_MSG_PAGO_EXITOSO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_PAGO_EXITOSO}
    Should Contain Any    ${mensaje}    exitoso    completado    registrado
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_FINANCIAMIENTO}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_FINANCIAMIENTO}
    Should Contain    ${estado}    Enganche pagado

Verificar Que Sistema Permite Continuar Con Envío De Contrato
    Wait Until Element Is Enabled    ${LOCATOR_BTN_CONTINUAR_A_ENVIO_CONTRATO}
    Element Should Be Visible    ${LOCATOR_BTN_CONTINUAR_A_ENVIO_CONTRATO}

Avanzar A Etapa De Envío De Contrato
    Wait Until Element Is Enabled    ${LOCATOR_BTN_CONTINUAR_A_ENVIO_CONTRATO}
    Click Button    ${LOCATOR_BTN_CONTINUAR_A_ENVIO_CONTRATO}
    Wait Until Element Is Visible    css:.envio-contrato-container    timeout=10s
