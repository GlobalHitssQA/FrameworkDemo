*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_CANCELACIONES}           /cancelaciones/financiamiento

# Locators - Inicio de Cancelación
${LOCATOR_INPUT_BUSCAR_CREDITO_CANCELAR}    id:inputBuscarCreditoCancelar
${LOCATOR_BTN_BUSCAR_CREDITO_CANCELAR}      id:btnBuscarCreditoCancelar
${LOCATOR_BTN_INICIAR_CANCELACION}          id:btnIniciarCancelacion

# Locators - Formulario de Cancelación
${LOCATOR_SELECT_MOTIVO_CANCELACION}        id:selectMotivoCancelacion
${LOCATOR_TEXTAREA_OBSERVACIONES}           id:textareaObservaciones
${LOCATOR_BTN_CONFIRMAR_CANCELACION}        id:btnConfirmarCancelacion
${LOCATOR_MSG_VALIDACION_PERMISOS}          css:.validation-info .permisos-usuario

# Locators - Resultado de Cancelación
${LOCATOR_MSG_CANCELACION_EXITOSA}          css:.alert-success
${LOCATOR_TXT_ESTADO_CREDITO_CANCELADO}     css:.credit-status .estado-credito
${LOCATOR_TXT_MOTIVO_REGISTRADO}            css:.cancellation-info .motivo-cancelacion
${LOCATOR_TABLA_HISTORIAL_CANCELACION}      id:tablaHistorialCancelacion

# Locators - Liberación de Equipo
${LOCATOR_SECCION_LIBERACION}               css:.liberacion-equipo
${LOCATOR_TXT_SOLICITUD_LIBERACION}         css:.liberacion-equipo .solicitud-enviada
${LOCATOR_TXT_IMEI_LIBERADO}                css:.liberacion-equipo .imei-liberado
${LOCATOR_TXT_RESPUESTA_SITIC_LIBERACION}   css:.liberacion-equipo .respuesta-sitic

# Locators - Ajustes Contables
${LOCATOR_SECCION_AJUSTES_CONTABLES}        css:.ajustes-contables
${LOCATOR_TABLA_REVERSOS}                   id:tablaReversosContables
${LOCATOR_TXT_MONTO_REVERSADO}              css:.ajustes-contables .monto-reversado
${LOCATOR_TXT_FECHA_AJUSTE}                 css:.ajustes-contables .fecha-ajuste

# Locators - Verificación de Operaciones Bloqueadas
${LOCATOR_BTN_INTENTAR_PAGO}                id:btnIntentarPago
${LOCATOR_BTN_INTENTAR_MODIFICACION}        id:btnIntentarModificacion
${LOCATOR_MSG_OPERACION_BLOQUEADA}          css:.alert-danger

*** Keywords ***
Navegar A Módulo De Cancelaciones
    Go To    ${URL_LOGIN}${URL_MODULO_CANCELACIONES}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_BUSCAR_CREDITO_CANCELAR}    timeout=10s

Buscar Crédito Para Cancelar
    [Arguments]    ${credito_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_BUSCAR_CREDITO_CANCELAR}
    Input Text    ${LOCATOR_INPUT_BUSCAR_CREDITO_CANCELAR}    ${credito_id}
    Click Button    ${LOCATOR_BTN_BUSCAR_CREDITO_CANCELAR}
    Wait Until Element Is Visible    ${LOCATOR_BTN_INICIAR_CANCELACION}    timeout=10s

Iniciar Proceso De Cancelación
    [Arguments]    ${motivo_cancelacion}    ${observaciones}
    Click Button    ${LOCATOR_BTN_INICIAR_CANCELACION}
    Wait Until Element Is Visible    ${LOCATOR_SELECT_MOTIVO_CANCELACION}    timeout=10s
    Select From List By Label    ${LOCATOR_SELECT_MOTIVO_CANCELACION}    ${motivo_cancelacion}
    Input Text    ${LOCATOR_TEXTAREA_OBSERVACIONES}    ${observaciones}

Verificar Validación De Permisos De Usuario
    Element Should Be Visible    ${LOCATOR_MSG_VALIDACION_PERMISOS}
    ${mensaje_permisos}=    Get Text    ${LOCATOR_MSG_VALIDACION_PERMISOS}
    Should Contain Any    ${mensaje_permisos}    autorizado    permiso válido    verificado

Confirmar Cancelación De Crédito
    Click Button    ${LOCATOR_BTN_CONFIRMAR_CANCELACION}
    Wait Until Element Is Visible    ${LOCATOR_MSG_CANCELACION_EXITOSA}    timeout=10s

Verificar Que Crédito Fue Cancelado
    Element Should Be Visible    ${LOCATOR_MSG_CANCELACION_EXITOSA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_CANCELACION_EXITOSA}
    Should Contain    ${mensaje}    cancelado exitosamente

Verificar Estado Cancelado Y Motivo Registrado
    [Arguments]    ${motivo_esperado}
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_CREDITO_CANCELADO}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_CREDITO_CANCELADO}
    Should Contain Any    ${estado}    Cancelado    Anulado
    ${motivo}=    Get Text    ${LOCATOR_TXT_MOTIVO_REGISTRADO}
    Should Contain    ${motivo}    ${motivo_esperado}
    Element Should Be Visible    ${LOCATOR_TABLA_HISTORIAL_CANCELACION}

Verificar Liberación De Equipo A Través De SITIC
    Wait Until Element Is Visible    ${LOCATOR_SECCION_LIBERACION}    timeout=10s
    ${solicitud_liberacion}=    Get Text    ${LOCATOR_TXT_SOLICITUD_LIBERACION}
    Should Be Equal As Strings    ${solicitud_liberacion}    Sí
    Element Should Be Visible    ${LOCATOR_TXT_IMEI_LIBERADO}

Verificar Respuesta De SITIC Para Liberación
    ${respuesta_sitic}=    Get Text    ${LOCATOR_TXT_RESPUESTA_SITIC_LIBERACION}
    Should Contain Any    ${respuesta_sitic}    Exitoso    Liberado    200    OK

Verificar Ajustes Contables Y Reversos
    Wait Until Element Is Visible    ${LOCATOR_SECCION_AJUSTES_CONTABLES}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_REVERSOS}
    ${monto_reversado}=    Get Text    ${LOCATOR_TXT_MONTO_REVERSADO}
    Should Not Be Empty    ${monto_reversado}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_AJUSTE}

Verificar Que Operaciones Están Bloqueadas En Crédito Cancelado
    Wait Until Element Is Visible    ${LOCATOR_BTN_INTENTAR_PAGO}
    Click Button    ${LOCATOR_BTN_INTENTAR_PAGO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_OPERACION_BLOQUEADA}    timeout=5s
    ${mensaje_bloqueo}=    Get Text    ${LOCATOR_MSG_OPERACION_BLOQUEADA}
    Should Contain Any    ${mensaje_bloqueo}    no permitida    cancelado    bloqueado
