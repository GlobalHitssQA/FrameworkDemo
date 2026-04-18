*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_GARANTIAS}           /garantias/gestion

# Locators - Registro de Solicitud de Garantía
${LOCATOR_BTN_NUEVA_GARANTIA}          id:btnNuevaSolicitudGarantia
${LOCATOR_INPUT_CREDITO_ID}            id:inputCreditoId
${LOCATOR_INPUT_IMEI_ORIGINAL}         id:inputImeiOriginal
${LOCATOR_SELECT_TIPO_GARANTIA}        id:selectTipoGarantia
${LOCATOR_TEXTAREA_MOTIVO_GARANTIA}    id:textareaMotivo
${LOCATOR_BTN_REGISTRAR_SOLICITUD}     id:btnRegistrarSolicitudGarantia
${LOCATOR_MSG_SOLICITUD_CREADA}        css:.alert-success

# Locators - Validación de Crédito
${LOCATOR_SECCION_VALIDACION}          css:.validacion-credito
${LOCATOR_TXT_ESTADO_CREDITO}          css:.validacion-credito .estado-credito
${LOCATOR_TXT_CUMPLIMIENTO_PAGOS}      css:.validacion-credito .cumplimiento-pagos
${LOCATOR_TXT_VALIDACION_RESULTADO}    css:.validacion-credito .resultado-validacion

# Locators - Cambio de Equipo
${LOCATOR_BTN_CAMBIAR_EQUIPO}          id:btnCambiarEquipo
${LOCATOR_INPUT_IMEI_NUEVO}            id:inputImeiNuevo
${LOCATOR_INPUT_MODELO_NUEVO}          id:inputModeloNuevo
${LOCATOR_BTN_CONFIRMAR_CAMBIO}        id:btnConfirmarCambio
${LOCATOR_MSG_CAMBIO_EXITOSO}          css:.alert-success

# Locators - Historial de Equipo
${LOCATOR_SECCION_HISTORIAL}           css:.historial-equipos
${LOCATOR_TABLA_HISTORIAL}             id:tablaHistorialEquipos
${LOCATOR_TXT_IMEI_HISTORIAL}          css:.historial-equipos .imei-anterior
${LOCATOR_TXT_FECHA_CAMBIO}            css:.historial-equipos .fecha-cambio

# Locators - Integración Trustonic
${LOCATOR_SECCION_TRUSTONIC}           css:.integracion-trustonic
${LOCATOR_TXT_ESTADO_SINCRONIZACION}   css:.integracion-trustonic .estado-sincronizacion
${LOCATOR_TXT_IMEI_SINCRONIZADO}       css:.integracion-trustonic .imei-sincronizado
${LOCATOR_TXT_RESPUESTA_TRUSTONIC}     css:.integracion-trustonic .respuesta-trustonic

*** Keywords ***
Navegar A Módulo De Garantías
    Go To    ${URL_LOGIN}${URL_MODULO_GARANTIAS}
    Wait Until Element Is Visible    ${LOCATOR_BTN_NUEVA_GARANTIA}    timeout=10s

Hacer Click En Botón Nueva Garantía
    Click Button    ${LOCATOR_BTN_NUEVA_GARANTIA}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CREDITO_ID}    timeout=10s

Registrar Solicitud De Garantía
    [Arguments]    ${credito_id}    ${imei_original}    ${tipo_garantia}    ${motivo}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CREDITO_ID}
    Input Text    ${LOCATOR_INPUT_CREDITO_ID}        ${credito_id}
    Input Text    ${LOCATOR_INPUT_IMEI_ORIGINAL}     ${imei_original}
    Select From List By Label    ${LOCATOR_SELECT_TIPO_GARANTIA}    ${tipo_garantia}
    Input Text    ${LOCATOR_TEXTAREA_MOTIVO_GARANTIA}    ${motivo}
    Click Button    ${LOCATOR_BTN_REGISTRAR_SOLICITUD}
    Wait Until Element Is Visible    ${LOCATOR_MSG_SOLICITUD_CREADA}    timeout=10s

Verificar Que Solicitud De Garantía Fue Creada
    Element Should Be Visible    ${LOCATOR_MSG_SOLICITUD_CREADA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_SOLICITUD_CREADA}
    Should Contain    ${mensaje}    creada exitosamente

Verificar Validación De Estado De Crédito
    Wait Until Element Is Visible    ${LOCATOR_SECCION_VALIDACION}    timeout=10s
    ${estado_credito}=    Get Text    ${LOCATOR_TXT_ESTADO_CREDITO}
    Should Contain Any    ${estado_credito}    Activo    Al corriente
    ${cumplimiento_pagos}=    Get Text    ${LOCATOR_TXT_CUMPLIMIENTO_PAGOS}
    Should Be Equal As Strings    ${cumplimiento_pagos}    Cumple

Verificar Que Validación De Crédito Es Exitosa
    ${resultado}=    Get Text    ${LOCATOR_TXT_VALIDACION_RESULTADO}
    Should Contain Any    ${resultado}    Aprobado    Validado    Cumple requisitos

Ejecutar Cambio De Equipo En Garantía
    [Arguments]    ${imei_nuevo}    ${modelo_nuevo}
    Wait Until Element Is Visible    ${LOCATOR_BTN_CAMBIAR_EQUIPO}
    Click Button    ${LOCATOR_BTN_CAMBIAR_EQUIPO}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_IMEI_NUEVO}    timeout=10s
    Input Text    ${LOCATOR_INPUT_IMEI_NUEVO}     ${imei_nuevo}
    Input Text    ${LOCATOR_INPUT_MODELO_NUEVO}   ${modelo_nuevo}
    Click Button    ${LOCATOR_BTN_CONFIRMAR_CAMBIO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_CAMBIO_EXITOSO}    timeout=10s

Verificar Que Nuevo IMEI Fue Registrado
    [Arguments]    ${imei_esperado}
    Element Should Be Visible    ${LOCATOR_MSG_CAMBIO_EXITOSO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_CAMBIO_EXITOSO}
    Should Contain    ${mensaje}    ${imei_esperado}

Verificar Que Historial De Equipo Original Se Mantiene
    [Arguments]    ${imei_original}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_HISTORIAL}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_HISTORIAL}
    ${imei_historial}=    Get Text    ${LOCATOR_TXT_IMEI_HISTORIAL}
    Should Contain    ${imei_historial}    ${imei_original}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_CAMBIO}

Verificar Sincronización Con Trustonic
    [Arguments]    ${imei_nuevo}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_TRUSTONIC}    timeout=10s
    ${estado_sync}=    Get Text    ${LOCATOR_TXT_ESTADO_SINCRONIZACION}
    Should Contain Any    ${estado_sync}    Sincronizado    Exitoso    Completado
    ${imei_sync}=    Get Text    ${LOCATOR_TXT_IMEI_SINCRONIZADO}
    Should Be Equal As Strings    ${imei_sync}    ${imei_nuevo}
    ${respuesta}=    Get Text    ${LOCATOR_TXT_RESPUESTA_TRUSTONIC}
    Should Contain Any    ${respuesta}    200    OK    Exitoso
