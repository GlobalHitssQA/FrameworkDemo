*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_OFERTA}                         /venta/oferta-financiamiento

# Locators - Oferta de Financiamiento
${LOCATOR_TXT_TITULO_OFERTA}                 css:.oferta-financiamiento-container .titulo
${LOCATOR_TXT_MONTO_APROBADO_OFERTA}         css:.oferta-info .monto-aprobado
${LOCATOR_TXT_DATOS_CLIENTE_OFERTA}          css:.oferta-info .datos-cliente

# Locators - Opciones de Plazo
${LOCATOR_DIV_OPCIONES_PLAZO}                css:.opciones-plazo-container
${LOCATOR_RADIO_PLAZO_3_MESES}               id:radioPlazo3
${LOCATOR_RADIO_PLAZO_6_MESES}               id:radioPlazo6
${LOCATOR_RADIO_PLAZO_9_MESES}               id:radioPlazo9
${LOCATOR_RADIO_PLAZO_12_MESES}              id:radioPlazo12
${LOCATOR_TXT_PLAZO_SELECCIONADO}            css:.seleccion-plazo .plazo-actual

# Locators - Opciones de Ciclo de Pago
${LOCATOR_DIV_OPCIONES_CICLO}                css:.opciones-ciclo-container
${LOCATOR_RADIO_CICLO_SEMANAL}               id:radioCicloSemanal
${LOCATOR_RADIO_CICLO_QUINCENAL}             id:radioCicloQuincenal
${LOCATOR_RADIO_CICLO_MENSUAL}               id:radioCicloMensual
${LOCATOR_TXT_CICLO_SELECCIONADO}            css:.seleccion-ciclo .ciclo-actual

# Locators - Desglose de Oferta
${LOCATOR_BTN_CALCULAR_OFERTA}               id:btnCalcularOferta
${LOCATOR_DIV_DESGLOSE_OFERTA}               css:.desglose-oferta
${LOCATOR_TXT_MONTO_TOTAL_OFERTA}            css:.desglose-oferta .monto-total
${LOCATOR_TXT_ENGANCHE}                      css:.desglose-oferta .enganche
${LOCATOR_TXT_NUMERO_PARCIALIDADES}          css:.desglose-oferta .numero-parcialidades
${LOCATOR_TXT_MONTO_PARCIALIDAD}             css:.desglose-oferta .monto-parcialidad
${LOCATOR_TABLA_PARCIALIDADES}               css:.desglose-oferta .tabla-parcialidades
${LOCATOR_TXT_TASA_INTERES}                  css:.desglose-oferta .tasa-interes
${LOCATOR_TXT_CAT}                           css:.desglose-oferta .cat

# Locators - Validación de Usuario
${LOCATOR_TXT_VALIDACION_USUARIO}            css:.validacion-usuario .mensaje
${LOCATOR_ICON_VALIDACION_OK}                css:.validacion-usuario .icon-check

# Locators - Acciones
${LOCATOR_BTN_ACEPTAR_OFERTA}                id:btnAceptarOferta
${LOCATOR_BTN_RECHAZAR_OFERTA}               id:btnRechazarOferta
${LOCATOR_MSG_OFERTA_ACEPTADA}               css:.alert-success .msg-oferta

# Locators - Navegación
${LOCATOR_BTN_CONTINUAR_A_ENROLAMIENTO}      id:btnContinuarEnrolamiento

*** Keywords ***
Verificar Que Inicia Etapa De Oferta
    Wait Until Element Is Visible    ${LOCATOR_TXT_TITULO_OFERTA}    timeout=10s
    ${titulo}=    Get Text    ${LOCATOR_TXT_TITULO_OFERTA}
    Should Contain    ${titulo}    Oferta

Verificar Que Resultado Aprobado Permite Generar Oferta
    Element Should Be Visible    ${LOCATOR_TXT_MONTO_APROBADO_OFERTA}
    ${monto}=    Get Text    ${LOCATOR_TXT_MONTO_APROBADO_OFERTA}
    Should Not Be Empty    ${monto}

Consultar Opciones De Plazo Disponibles
    Wait Until Element Is Visible    ${LOCATOR_DIV_OPCIONES_PLAZO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_DIV_OPCIONES_PLAZO}

Verificar Que Se Muestran Plazos Configurables
    [Arguments]    @{plazos_esperados}
    FOR    ${plazo}    IN    @{plazos_esperados}
        IF    '${plazo}' == '3'
            Element Should Be Visible    ${LOCATOR_RADIO_PLAZO_3_MESES}
        ELSE IF    '${plazo}' == '6'
            Element Should Be Visible    ${LOCATOR_RADIO_PLAZO_6_MESES}
        ELSE IF    '${plazo}' == '9'
            Element Should Be Visible    ${LOCATOR_RADIO_PLAZO_9_MESES}
        ELSE IF    '${plazo}' == '12'
            Element Should Be Visible    ${LOCATOR_RADIO_PLAZO_12_MESES}
        END
    END

Consultar Opciones De Ciclo De Pago Disponibles
    Wait Until Element Is Visible    ${LOCATOR_DIV_OPCIONES_CICLO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_DIV_OPCIONES_CICLO}

Verificar Que Se Muestran Ciclos Configurables
    Element Should Be Visible    ${LOCATOR_RADIO_CICLO_SEMANAL}
    Element Should Be Visible    ${LOCATOR_RADIO_CICLO_QUINCENAL}
    Element Should Be Visible    ${LOCATOR_RADIO_CICLO_MENSUAL}

Seleccionar Plazo De Financiamiento
    [Arguments]    ${plazo}
    IF    '${plazo}' == '3'
        Click Element    ${LOCATOR_RADIO_PLAZO_3_MESES}
    ELSE IF    '${plazo}' == '6'
        Click Element    ${LOCATOR_RADIO_PLAZO_6_MESES}
    ELSE IF    '${plazo}' == '9'
        Click Element    ${LOCATOR_RADIO_PLAZO_9_MESES}
    ELSE IF    '${plazo}' == '12'
        Click Element    ${LOCATOR_RADIO_PLAZO_12_MESES}
    END
    Wait Until Element Is Visible    ${LOCATOR_TXT_PLAZO_SELECCIONADO}    timeout=5s

Seleccionar Ciclo De Pago
    [Arguments]    ${ciclo}
    IF    '${ciclo}' == 'Semanal' or '${ciclo}' == 'semanal'
        Click Element    ${LOCATOR_RADIO_CICLO_SEMANAL}
    ELSE IF    '${ciclo}' == 'Quincenal' or '${ciclo}' == 'quincenal'
        Click Element    ${LOCATOR_RADIO_CICLO_QUINCENAL}
    ELSE IF    '${ciclo}' == 'Mensual' or '${ciclo}' == 'mensual'
        Click Element    ${LOCATOR_RADIO_CICLO_MENSUAL}
    END
    Wait Until Element Is Visible    ${LOCATOR_TXT_CICLO_SELECCIONADO}    timeout=5s

Hacer Click En Botón Calcular Oferta
    Click Button    ${LOCATOR_BTN_CALCULAR_OFERTA}
    Wait Until Element Is Visible    ${LOCATOR_DIV_DESGLOSE_OFERTA}    timeout=10s

Verificar Que Sistema Calcula Y Genera Oferta
    Element Should Be Visible    ${LOCATOR_DIV_DESGLOSE_OFERTA}
    Element Should Be Visible    ${LOCATOR_TXT_MONTO_TOTAL_OFERTA}

Verificar Que Oferta Incluye Desglose Completo
    Element Should Be Visible    ${LOCATOR_TXT_MONTO_TOTAL_OFERTA}
    Element Should Be Visible    ${LOCATOR_TXT_ENGANCHE}
    Element Should Be Visible    ${LOCATOR_TXT_NUMERO_PARCIALIDADES}
    Element Should Be Visible    ${LOCATOR_TXT_MONTO_PARCIALIDAD}
    Element Should Be Visible    ${LOCATOR_TABLA_PARCIALIDADES}
    ${monto_total}=    Get Text    ${LOCATOR_TXT_MONTO_TOTAL_OFERTA}
    ${enganche}=       Get Text    ${LOCATOR_TXT_ENGANCHE}
    ${parcialidades}=  Get Text    ${LOCATOR_TXT_NUMERO_PARCIALIDADES}
    Should Not Be Empty    ${monto_total}
    Should Not Be Empty    ${enganche}
    Should Not Be Empty    ${parcialidades}

Obtener Detalles De La Oferta
    ${monto_total}=    Get Text    ${LOCATOR_TXT_MONTO_TOTAL_OFERTA}
    ${enganche}=       Get Text    ${LOCATOR_TXT_ENGANCHE}
    ${parcialidades}=  Get Text    ${LOCATOR_TXT_NUMERO_PARCIALIDADES}
    ${monto_parcialidad}=    Get Text    ${LOCATOR_TXT_MONTO_PARCIALIDAD}
    ${plazo}=          Get Text    ${LOCATOR_TXT_PLAZO_SELECCIONADO}
    ${ciclo}=          Get Text    ${LOCATOR_TXT_CICLO_SELECCIONADO}
    [Return]    ${monto_total}    ${enganche}    ${parcialidades}    ${monto_parcialidad}    ${plazo}    ${ciclo}

Verificar Validación De Usuario En Oferta
    Element Should Be Visible    ${LOCATOR_TXT_VALIDACION_USUARIO}
    Element Should Be Visible    ${LOCATOR_ICON_VALIDACION_OK}

Hacer Click En Botón Aceptar Oferta
    Click Button    ${LOCATOR_BTN_ACEPTAR_OFERTA}
    Wait Until Element Is Visible    ${LOCATOR_MSG_OFERTA_ACEPTADA}    timeout=10s

Verificar Que Oferta Fue Aceptada
    Element Should Be Visible    ${LOCATOR_MSG_OFERTA_ACEPTADA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_OFERTA_ACEPTADA}
    Should Contain    ${mensaje}    aceptada

Verificar Que Permite Avanzar A Enrolamiento
    Element Should Be Enabled    ${LOCATOR_BTN_CONTINUAR_A_ENROLAMIENTO}

Avanzar A Etapa De Enrolamiento De Equipos
    Click Button    ${LOCATOR_BTN_CONTINUAR_A_ENROLAMIENTO}
    Wait Until Element Is Visible    css:.enrolamiento-equipos-container    timeout=10s
