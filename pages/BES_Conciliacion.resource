*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_CONCILIACION}           /conciliacion/pagos

# Locators - Proceso de Conciliación
${LOCATOR_BTN_EJECUTAR_CONCILIACION}        id:btnEjecutarConciliacion
${LOCATOR_SELECT_PERIODO_CONCILIACION}      id:selectPeriodoConciliacion
${LOCATOR_BTN_INICIAR_PROCESO}              id:btnIniciarProceso
${LOCATOR_TXT_ESTADO_PROCESO}               css:.conciliation-status .estado-proceso
${LOCATOR_PROGRESS_BAR_CONCILIACION}        id:progressBarConciliacion

# Locators - Reporte de Diferencias
${LOCATOR_SECCION_DIFERENCIAS}              css:.diferencias-encontradas
${LOCATOR_TABLA_DIFERENCIAS}                id:tablaDiferencias
${LOCATOR_TXT_TOTAL_DIFERENCIAS}            css:.diferencias-summary .total-diferencias
${LOCATOR_BTN_VER_DETALLE_DIFERENCIA}       css:.btn-ver-detalle-diferencia

# Locators - Pagos con Discrepancias
${LOCATOR_TABLA_PAGOS_DISCREPANCIA}         id:tablaPagosDiscrepancia
${LOCATOR_TXT_ESTADO_PAGO_DISCREPANCIA}     css:.payment-discrepancy .estado-pago
${LOCATOR_TXT_ALERTA_REVISION}              css:.payment-discrepancy .alerta-revision
${LOCATOR_BTN_MARCAR_REVISION}              css:.btn-marcar-revision

# Locators - Ajuste Manual
${LOCATOR_BTN_AJUSTAR_PAGO}                 id:btnAjustarPago
${LOCATOR_INPUT_MONTO_AJUSTE}               id:inputMontoAjuste
${LOCATOR_TEXTAREA_JUSTIFICACION}           id:textareaJustificacion
${LOCATOR_BTN_CONFIRMAR_AJUSTE}             id:btnConfirmarAjuste
${LOCATOR_MSG_AJUSTE_EXITOSO}               css:.alert-success

# Locators - Reporte de Conciliación
${LOCATOR_BTN_GENERAR_REPORTE}              id:btnGenerarReporte
${LOCATOR_TABLA_PAGOS_CONCILIADOS}          id:tablaPagosConciliados
${LOCATOR_TABLA_PAGOS_PENDIENTES}           id:tablaPagosPendientes
${LOCATOR_TABLA_PAGOS_AJUSTADOS}            id:tablaPagosAjustados
${LOCATOR_TXT_TOTAL_CONCILIADOS}            css:.reporte-summary .total-conciliados
${LOCATOR_TXT_TOTAL_PENDIENTES}             css:.reporte-summary .total-pendientes
${LOCATOR_TXT_TOTAL_AJUSTADOS}              css:.reporte-summary .total-ajustados
${LOCATOR_BTN_DESCARGAR_REPORTE}            id:btnDescargarReporte

# Locators - Envío a BIBES
${LOCATOR_SECCION_ENVIO_BIBES}              css:.envio-bibes
${LOCATOR_BTN_ENVIAR_A_BIBES}               id:btnEnviarABibes
${LOCATOR_TXT_ESTADO_TRANSMISION}           css:.envio-bibes .estado-transmision
${LOCATOR_TXT_FECHA_ENVIO}                  css:.envio-bibes .fecha-envio
${LOCATOR_TXT_RESPUESTA_BIBES}              css:.envio-bibes .respuesta-bibes

*** Keywords ***
Navegar A Módulo De Conciliación
    Go To    ${URL_LOGIN}${URL_MODULO_CONCILIACION}
    Wait Until Element Is Visible    ${LOCATOR_BTN_EJECUTAR_CONCILIACION}    timeout=10s

Ejecutar Proceso Automático De Conciliación
    [Arguments]    ${periodo}
    Wait Until Element Is Visible    ${LOCATOR_SELECT_PERIODO_CONCILIACION}
    Select From List By Label    ${LOCATOR_SELECT_PERIODO_CONCILIACION}    ${periodo}
    Click Button    ${LOCATOR_BTN_EJECUTAR_CONCILIACION}
    Wait Until Element Is Visible    ${LOCATOR_PROGRESS_BAR_CONCILIACION}    timeout=10s

Verificar Que Proceso De Conciliación Inició
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_PROCESO}
    Should Contain Any    ${estado}    En proceso    Iniciado    Ejecutando

Esperar Finalización De Conciliación
    Wait Until Element Is Visible    ${LOCATOR_SECCION_DIFERENCIAS}    timeout=60s
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_PROCESO}
    Should Contain Any    ${estado}    Completado    Finalizado    Terminado

Verificar Reporte De Diferencias Generado
    Element Should Be Visible    ${LOCATOR_TABLA_DIFERENCIAS}
    Element Should Be Visible    ${LOCATOR_TXT_TOTAL_DIFERENCIAS}

Identificar Pagos Con Discrepancias
    Wait Until Element Is Visible    ${LOCATOR_TABLA_PAGOS_DISCREPANCIA}    timeout=10s
    ${estado_discrepancia}=    Get Text    ${LOCATOR_TXT_ESTADO_PAGO_DISCREPANCIA}
    Should Contain Any    ${estado_discrepancia}    Discrepancia    Diferencia    Requiere revisión

Verificar Alertas Para Revisión Manual
    Element Should Be Visible    ${LOCATOR_TXT_ALERTA_REVISION}
    ${alerta}=    Get Text    ${LOCATOR_TXT_ALERTA_REVISION}
    Should Contain Any    ${alerta}    Requiere revisión    Pendiente    Verificar

Realizar Ajuste Manual De Pago
    [Arguments]    ${monto_ajuste}    ${justificacion}
    Wait Until Element Is Visible    ${LOCATOR_BTN_AJUSTAR_PAGO}
    Click Button    ${LOCATOR_BTN_AJUSTAR_PAGO}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_MONTO_AJUSTE}    timeout=10s
    Input Text    ${LOCATOR_INPUT_MONTO_AJUSTE}    ${monto_ajuste}
    Input Text    ${LOCATOR_TEXTAREA_JUSTIFICACION}    ${justificacion}
    Click Button    ${LOCATOR_BTN_CONFIRMAR_AJUSTE}
    Wait Until Element Is Visible    ${LOCATOR_MSG_AJUSTE_EXITOSO}    timeout=10s

Verificar Registro De Ajuste Y Actualización De Saldo
    Element Should Be Visible    ${LOCATOR_MSG_AJUSTE_EXITOSO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_AJUSTE_EXITOSO}
    Should Contain Any    ${mensaje}    ajustado    actualizado    registrado

Generar Reporte De Conciliación Completo
    Wait Until Element Is Visible    ${LOCATOR_BTN_GENERAR_REPORTE}
    Click Button    ${LOCATOR_BTN_GENERAR_REPORTE}
    Wait Until Element Is Visible    ${LOCATOR_TABLA_PAGOS_CONCILIADOS}    timeout=10s

Verificar Detalle De Reporte De Conciliación
    Element Should Be Visible    ${LOCATOR_TABLA_PAGOS_CONCILIADOS}
    Element Should Be Visible    ${LOCATOR_TABLA_PAGOS_PENDIENTES}
    Element Should Be Visible    ${LOCATOR_TABLA_PAGOS_AJUSTADOS}
    Element Should Be Visible    ${LOCATOR_TXT_TOTAL_CONCILIADOS}
    Element Should Be Visible    ${LOCATOR_TXT_TOTAL_PENDIENTES}
    Element Should Be Visible    ${LOCATOR_TXT_TOTAL_AJUSTADOS}

Enviar Reporte De Conciliación A BIBES
    Wait Until Element Is Visible    ${LOCATOR_BTN_ENVIAR_A_BIBES}
    Click Button    ${LOCATOR_BTN_ENVIAR_A_BIBES}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_ENVIO_BIBES}    timeout=10s

Verificar Transmisión Exitosa A BIBES
    ${estado_transmision}=    Get Text    ${LOCATOR_TXT_ESTADO_TRANSMISION}
    Should Contain Any    ${estado_transmision}    Exitoso    Enviado    Transmitido
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_ENVIO}
    ${respuesta_bibes}=    Get Text    ${LOCATOR_TXT_RESPUESTA_BIBES}
    Should Contain Any    ${respuesta_bibes}    200    OK    Recibido
