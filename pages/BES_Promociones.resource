*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# Locators - Promociones Disponibles
${LOCATOR_DIV_PROMOCIONES_DISPONIBLES}      css:.promociones-container .promociones-disponibles
${LOCATOR_CHECKBOX_PROMO_AK_ASL}            id:checkPromoAK_ASL
${LOCATOR_CHECKBOX_PROMO_AK_CON_TODO}       id:checkPromoAK_ConTodo

# Locators - Detalles de Promoción AK ASL
${LOCATOR_DIV_DETALLE_AK_ASL}               css:.promo-details .ak-asl-details
${LOCATOR_TXT_TERMINOS_AK_ASL}              css:.promo-details .ak-asl-details .terminos
${LOCATOR_TXT_BENEFICIOS_AK_ASL}            css:.promo-details .ak-asl-details .beneficios
${LOCATOR_BTN_CONFIRMAR_AK_ASL}             id:btnConfirmarPromoAK_ASL

# Locators - Detalles de Promoción AK con Todo
${LOCATOR_DIV_DETALLE_AK_CON_TODO}          css:.promo-details .ak-con-todo-details
${LOCATOR_TXT_TERMINOS_AK_CON_TODO}         css:.promo-details .ak-con-todo-details .terminos
${LOCATOR_TXT_BENEFICIOS_AK_CON_TODO}       css:.promo-details .ak-con-todo-details .beneficios
${LOCATOR_BTN_CONFIRMAR_AK_CON_TODO}        id:btnConfirmarPromoAK_ConTodo

# Locators - Confirmación de Aplicación
${LOCATOR_MSG_PROMO_APLICADA}               css:.alert-success .msg-promocion
${LOCATOR_TXT_PROMO_APLICADA_NOMBRE}        css:.promotion-applied .nombre-promocion
${LOCATOR_TXT_BENEFICIOS_OTORGADOS}         css:.promotion-applied .beneficios-otorgados

# Locators - Elegibilidad
${LOCATOR_TXT_ESTADO_ELEGIBILIDAD}          css:.eligibility-status .estado
${LOCATOR_TXT_MENSAJE_ELEGIBILIDAD}         css:.eligibility-status .mensaje

*** Keywords ***
Verificar Que Equipo Es Elegible Para Promoción
    [Arguments]    ${nombre_promocion}
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_ELEGIBILIDAD}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_ELEGIBILIDAD}
    Should Be Equal As Strings    ${estado}    Elegible
    ${mensaje}=    Get Text    ${LOCATOR_TXT_MENSAJE_ELEGIBILIDAD}
    Should Contain    ${mensaje}    ${nombre_promocion}

Seleccionar Promoción AK ASL
    Wait Until Element Is Visible    ${LOCATOR_CHECKBOX_PROMO_AK_ASL}
    Click Element    ${LOCATOR_CHECKBOX_PROMO_AK_ASL}
    Wait Until Element Is Visible    ${LOCATOR_DIV_DETALLE_AK_ASL}    timeout=5s

Verificar Que Se Muestran Términos Y Condiciones AK ASL
    Element Should Be Visible    ${LOCATOR_DIV_DETALLE_AK_ASL}
    Element Should Be Visible    ${LOCATOR_TXT_TERMINOS_AK_ASL}
    ${terminos}=    Get Text    ${LOCATOR_TXT_TERMINOS_AK_ASL}
    Should Not Be Empty    ${terminos}
    Should Contain    ${terminos}    AK ASL

Verificar Que Se Muestran Beneficios AK ASL
    Element Should Be Visible    ${LOCATOR_TXT_BENEFICIOS_AK_ASL}
    ${beneficios}=    Get Text    ${LOCATOR_TXT_BENEFICIOS_AK_ASL}
    Should Not Be Empty    ${beneficios}

Confirmar Aplicación De Promoción AK ASL
    Wait Until Element Is Enabled    ${LOCATOR_BTN_CONFIRMAR_AK_ASL}
    Click Button    ${LOCATOR_BTN_CONFIRMAR_AK_ASL}
    Wait Until Element Is Visible    ${LOCATOR_MSG_PROMO_APLICADA}    timeout=10s

Verificar Que Promoción AK ASL Fue Aplicada
    Element Should Be Visible    ${LOCATOR_MSG_PROMO_APLICADA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_PROMO_APLICADA}
    Should Contain    ${mensaje}    AK ASL
    Should Contain    ${mensaje}    aplicada exitosamente
    Element Should Be Visible    ${LOCATOR_TXT_BENEFICIOS_OTORGADOS}

Seleccionar Promoción AK Con Todo
    Wait Until Element Is Visible    ${LOCATOR_CHECKBOX_PROMO_AK_CON_TODO}
    Click Element    ${LOCATOR_CHECKBOX_PROMO_AK_CON_TODO}
    Wait Until Element Is Visible    ${LOCATOR_DIV_DETALLE_AK_CON_TODO}    timeout=5s

Verificar Que Se Muestran Términos Y Beneficios AK Con Todo
    Element Should Be Visible    ${LOCATOR_DIV_DETALLE_AK_CON_TODO}
    Element Should Be Visible    ${LOCATOR_TXT_TERMINOS_AK_CON_TODO}
    Element Should Be Visible    ${LOCATOR_TXT_BENEFICIOS_AK_CON_TODO}
    ${terminos}=    Get Text    ${LOCATOR_TXT_TERMINOS_AK_CON_TODO}
    Should Not Be Empty    ${terminos}
    Should Contain    ${terminos}    AK con Todo

Confirmar Aplicación De Promoción AK Con Todo
    Wait Until Element Is Enabled    ${LOCATOR_BTN_CONFIRMAR_AK_CON_TODO}
    Click Button    ${LOCATOR_BTN_CONFIRMAR_AK_CON_TODO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_PROMO_APLICADA}    timeout=10s

Verificar Que Promoción AK Con Todo Fue Aplicada
    Element Should Be Visible    ${LOCATOR_MSG_PROMO_APLICADA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_PROMO_APLICADA}
    Should Contain    ${mensaje}    AK con Todo
    Should Contain    ${mensaje}    aplicada exitosamente
    Element Should Be Visible    ${LOCATOR_TXT_BENEFICIOS_OTORGADOS}

Obtener Beneficios Otorgados
    ${beneficios}=    Get Text    ${LOCATOR_TXT_BENEFICIOS_OTORGADOS}
    [Return]    ${beneficios}

Verificar Registro De Beneficios De Promoción
    [Arguments]    ${nombre_promocion}
    ${beneficios}=    Obtener Beneficios Otorgados
    Should Not Be Empty    ${beneficios}
    Should Contain    ${beneficios}    ${nombre_promocion}

# ============================================
# Keywords para Casos 42, 43, 44 - Promociones en venta y activación
# ============================================

Consultar Promociones Vigentes En Sistema
    [Arguments]    ${tipo_promocion}
    [Documentation]    Consulta las promociones vigentes de un tipo específico
    Wait Until Element Is Visible    ${LOCATOR_DIV_PROMOCIONES_DISPONIBLES}    timeout=10s
    Element Should Be Visible    ${LOCATOR_DIV_PROMOCIONES_DISPONIBLES}
    ${promociones_html}=    Get Text    ${LOCATOR_DIV_PROMOCIONES_DISPONIBLES}
    Should Contain    ${promociones_html}    ${tipo_promocion}

Verificar Promociones Activas Y Condiciones
    [Arguments]    ${tipo_promocion}
    [Documentation]    Verifica que las promociones estén activas y muestre sus condiciones
    Wait Until Element Is Visible    ${LOCATOR_DIV_PROMOCIONES_DISPONIBLES}    timeout=10s
    ${promociones}=    Get Text    ${LOCATOR_DIV_PROMOCIONES_DISPONIBLES}
    Should Contain    ${promociones}    ${tipo_promocion}
    Should Contain    ${promociones}    Vigente
    Should Contain    ${promociones}    Condiciones

Aplicar Promoción Automáticamente Al Cumplir Condiciones
    [Arguments]    ${tipo_promocion}
    [Documentation]    Verifica que la promoción se aplique automáticamente cuando se cumplen condiciones
    Wait Until Element Is Visible    ${LOCATOR_MSG_PROMO_APLICADA}    timeout=15s
    ${mensaje}=    Get Text    ${LOCATOR_MSG_PROMO_APLICADA}
    Should Contain    ${mensaje}    ${tipo_promocion}
    Should Contain    ${mensaje}    aplicada automáticamente

Verificar Beneficios En Financiamiento
    [Arguments]    ${tipo_promocion}
    [Documentation]    Verifica que los beneficios de la promoción se reflejen en el financiamiento
    Wait Until Element Is Visible    css:.financing-info .promocion-aplicada    timeout=10s
    ${info_financiamiento}=    Get Text    css:.financing-info
    Should Contain    ${info_financiamiento}    ${tipo_promocion}
    Element Should Be Visible    ${LOCATOR_TXT_BENEFICIOS_OTORGADOS}

Verificar Promoción Asociada A Crédito En BES
    [Arguments]    ${tipo_promocion}    ${numero_telefonico}
    [Documentation]    Verifica en BES que la promoción esté asociada al crédito del cliente
    Wait Until Element Is Visible    css:.credit-info .promocion-asociada    timeout=10s
    ${info_credito}=    Get Text    css:.credit-info
    Should Contain    ${info_credito}    ${tipo_promocion}
    Should Contain    ${info_credito}    ${numero_telefonico}

Verificar Gestión De Promoción Durante Vida Del Financiamiento
    [Arguments]    ${tipo_promocion}
    [Documentation]    Verifica que BES gestione la promoción durante la vida del financiamiento
    Wait Until Element Is Visible    css:.lifecycle-info .promocion-activa    timeout=10s
    ${info_ciclo_vida}=    Get Text    css:.lifecycle-info
    Should Contain    ${info_ciclo_vida}    ${tipo_promocion}
    Should Contain    ${info_ciclo_vida}    Gestionando promoción
