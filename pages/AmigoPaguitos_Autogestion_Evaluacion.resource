*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_EVALUACION}                     /venta/evaluacion-crediticia

# Locators - Evaluación Crediticia
${LOCATOR_TXT_TITULO_EVALUACION}             css:.evaluacion-crediticia-container .titulo
${LOCATOR_TXT_DATOS_CLIENTE_EVALUACION}      css:.evaluacion-info .datos-cliente
${LOCATOR_BTN_INICIAR_EVALUACION}            id:btnIniciarEvaluacion
${LOCATOR_SPINNER_PROCESANDO}                css:.evaluacion-status .spinner
${LOCATOR_TXT_ESTADO_EVALUACION}             css:.evaluacion-status .estado

# Locators - Resultado de Evaluación
${LOCATOR_DIV_RESULTADO_EVALUACION}          css:.resultado-evaluacion
${LOCATOR_TXT_RESULTADO_APROBADO}            css:.resultado-evaluacion .aprobado
${LOCATOR_TXT_RESULTADO_RECHAZADO}           css:.resultado-evaluacion .rechazado
${LOCATOR_TXT_SCORE_CREDITICIO}              css:.resultado-evaluacion .score
${LOCATOR_TXT_MONTO_APROBADO}                css:.resultado-evaluacion .monto-aprobado
${LOCATOR_TXT_RAZON_RECHAZO}                 css:.resultado-evaluacion .razon-rechazo

# Locators - Información de Análisis
${LOCATOR_TXT_FECHA_EVALUACION}              css:.evaluacion-details .fecha-evaluacion
${LOCATOR_TXT_ID_EVALUACION}                 css:.evaluacion-details .id-evaluacion
${LOCATOR_TXT_ANALISIS_APLICADO}             css:.evaluacion-details .analisis-aplicado

# Locators - Navegación
${LOCATOR_BTN_CONTINUAR_A_OFERTA}            id:btnContinuarOferta
${LOCATOR_BTN_FINALIZAR_PROCESO}             id:btnFinalizarProceso

*** Keywords ***
Verificar Que Inicia Etapa De Evaluación Crediticia
    Wait Until Element Is Visible    ${LOCATOR_TXT_TITULO_EVALUACION}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_DATOS_CLIENTE_EVALUACION}
    ${titulo}=    Get Text    ${LOCATOR_TXT_TITULO_EVALUACION}
    Should Contain    ${titulo}    Evaluación Crediticia

Verificar Que Datos Del Cliente Están Disponibles
    ${datos}=    Get Text    ${LOCATOR_TXT_DATOS_CLIENTE_EVALUACION}
    Should Not Be Empty    ${datos}

Hacer Click En Botón Iniciar Evaluación
    Click Button    ${LOCATOR_BTN_INICIAR_EVALUACION}
    Wait Until Element Is Visible    ${LOCATOR_SPINNER_PROCESANDO}    timeout=5s

Verificar Que Sistema Procesa Evaluación Crediticia
    Element Should Be Visible    ${LOCATOR_SPINNER_PROCESANDO}
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_EVALUACION}
    Should Contain Any    ${estado}    Procesando    Analizando    En proceso

Esperar Resultado De Evaluación Crediticia
    Wait Until Element Is Visible    ${LOCATOR_DIV_RESULTADO_EVALUACION}    timeout=30s
    Wait Until Element Is Not Visible    ${LOCATOR_SPINNER_PROCESANDO}    timeout=30s

Obtener Resultado De Evaluación
    ${resultado_aprobado}=    Run Keyword And Return Status    Element Should Be Visible    ${LOCATOR_TXT_RESULTADO_APROBADO}
    ${resultado_rechazado}=    Run Keyword And Return Status    Element Should Be Visible    ${LOCATOR_TXT_RESULTADO_RECHAZADO}
    IF    ${resultado_aprobado}
        ${resultado}=    Set Variable    APROBADO
    ELSE IF    ${resultado_rechazado}
        ${resultado}=    Set Variable    RECHAZADO
    ELSE
        ${resultado}=    Set Variable    DESCONOCIDO
    END
    [Return]    ${resultado}

Verificar Que Evaluación Retorna Resultado
    Element Should Be Visible    ${LOCATOR_DIV_RESULTADO_EVALUACION}
    ${resultado}=    Obtener Resultado De Evaluación
    Should Not Be Equal As Strings    ${resultado}    DESCONOCIDO

Verificar Que Crédito Fue Aprobado
    Element Should Be Visible    ${LOCATOR_TXT_RESULTADO_APROBADO}
    ${mensaje}=    Get Text    ${LOCATOR_TXT_RESULTADO_APROBADO}
    Should Contain    ${mensaje}    Aprobado

Verificar Que Crédito Fue Rechazado
    Element Should Be Visible    ${LOCATOR_TXT_RESULTADO_RECHAZADO}
    ${razon}=    Get Text    ${LOCATOR_TXT_RAZON_RECHAZO}
    Should Not Be Empty    ${razon}

Obtener Información De Evaluación Aprobada
    ${score}=    Get Text    ${LOCATOR_TXT_SCORE_CREDITICIO}
    ${monto}=    Get Text    ${LOCATOR_TXT_MONTO_APROBADO}
    ${id_evaluacion}=    Get Text    ${LOCATOR_TXT_ID_EVALUACION}
    [Return]    ${score}    ${monto}    ${id_evaluacion}

Verificar Que Sistema Permite Avanzar A Oferta
    Element Should Be Enabled    ${LOCATOR_BTN_CONTINUAR_A_OFERTA}
    ${resultado}=    Obtener Resultado De Evaluación
    Should Be Equal As Strings    ${resultado}    APROBADO

Avanzar A Etapa De Oferta
    Click Button    ${LOCATOR_BTN_CONTINUAR_A_OFERTA}
    Wait Until Element Is Visible    css:.oferta-financiamiento-container    timeout=10s
