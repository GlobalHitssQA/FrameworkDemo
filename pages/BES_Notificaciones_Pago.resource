*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_NOTIFICACIONES_PAGO}           /notificaciones/pago

# Locators - Búsqueda de Crédito
${LOCATOR_INPUT_CREDITO_ID_NOTIF}           id:searchCreditoIdNotif
${LOCATOR_INPUT_CUSTOMER_ID_NOTIF}          id:searchCustomerIdNotif
${LOCATOR_BTN_BUSCAR_CREDITO_NOTIF}         id:btnBuscarCreditoNotif

# Locators - Información del Crédito
${LOCATOR_TXT_CREDITO_ID_NOTIF}             css:.credit-notification .credito-id
${LOCATOR_TXT_CUSTOMER_ID_NOTIF}            css:.credit-notification .customer-id
${LOCATOR_TXT_TIPO_PRODUCTO}                css:.credit-notification .tipo-producto
${LOCATOR_TXT_ESTADO_CREDITO_NOTIF}         css:.credit-notification .estado-credito

# Locators - Calendario de Cobranza
${LOCATOR_SECCION_CALENDARIO_COBRANZA}      css:.seccion-calendario-cobranza
${LOCATOR_TABLA_CALENDARIO_NOTIF}           id:tablaCalendarioCobranzaNotif
${LOCATOR_TXT_FECHA_VENCIMIENTO}            css:.calendario-detail .fecha-vencimiento
${LOCATOR_TXT_NUMERO_PARCIALIDAD}           css:.calendario-detail .numero-parcialidad
${LOCATOR_TXT_MONTO_PARCIALIDAD}            css:.calendario-detail .monto-parcialidad
${LOCATOR_TXT_ESTADO_PARCIALIDAD}           css:.calendario-detail .estado-parcialidad
${LOCATOR_BTN_VER_CALENDARIO_COMPLETO}      id:btnVerCalendarioCompleto

# Locators - Configuración de Notificaciones
${LOCATOR_SECCION_CONFIG_NOTIF}             css:.seccion-configuracion-notificaciones
${LOCATOR_SELECT_CANAL_NOTIFICACION}        id:selectCanalNotificacion
${LOCATOR_INPUT_DIAS_ANTES_VENCIMIENTO}     id:inputDiasAntesVencimiento
${LOCATOR_CHECKBOX_NOTIF_VENCIMIENTO}       id:checkboxNotifVencimiento
${LOCATOR_CHECKBOX_NOTIF_MOROSIDAD}         id:checkboxNotifMorosidad
${LOCATOR_BTN_GUARDAR_CONFIG_NOTIF}         id:btnGuardarConfigNotif
${LOCATOR_MSG_CONFIG_GUARDADA}              css:.alert-success .msg-config-guardada

# Locators - Proceso Automático de Generación
${LOCATOR_SECCION_PROCESO_AUTO}             css:.seccion-proceso-automatico
${LOCATOR_BTN_EJECUTAR_PROCESO_AUTO}        id:btnEjecutarProcesoAutomatico
${LOCATOR_TXT_ESTADO_PROCESO}               css:.proceso-info .estado-proceso
${LOCATOR_TXT_FECHA_EJECUCION}              css:.proceso-info .fecha-ejecucion
${LOCATOR_TXT_NOTIF_GENERADAS}              css:.proceso-info .notificaciones-generadas
${LOCATOR_PROGRESS_BAR_PROCESO}             css:.proceso-info .progress-bar

# Locators - Notificaciones Generadas
${LOCATOR_TABLA_NOTIF_GENERADAS}            id:tablaNotificacionesGeneradas
${LOCATOR_TXT_ID_NOTIFICACION}              css:.notification-item .notif-id
${LOCATOR_TXT_TIPO_NOTIFICACION}            css:.notification-item .tipo-notificacion
${LOCATOR_TXT_FECHA_GENERACION}             css:.notification-item .fecha-generacion
${LOCATOR_TXT_ESTADO_NOTIFICACION}          css:.notification-item .estado-notificacion
${LOCATOR_TXT_CANAL_ENVIO}                  css:.notification-item .canal-envio

# Locators - Envío de Notificaciones
${LOCATOR_SECCION_ENVIO}                    css:.seccion-envio-notificaciones
${LOCATOR_TXT_DESTINATARIO}                 css:.envio-detail .destinatario
${LOCATOR_TXT_CANAL_UTILIZADO}              css:.envio-detail .canal-utilizado
${LOCATOR_TXT_ESTADO_ENVIO}                 css:.envio-detail .estado-envio
${LOCATOR_TXT_FECHA_ENVIO}                  css:.envio-detail .fecha-envio
${LOCATOR_TXT_RESPUESTA_CANAL}              css:.envio-detail .respuesta-canal

# Locators - Registro y Auditoría
${LOCATOR_TABLA_HISTORIAL_NOTIF}            id:tablaHistorialNotificaciones
${LOCATOR_BTN_VER_DETALLE_NOTIF}            css:.notification-item .btn-ver-detalle
${LOCATOR_MODAL_DETALLE_NOTIF}              id:modalDetalleNotificacion
${LOCATOR_TXT_CONTENIDO_NOTIF}              css:.modal-body .contenido-notificacion
${LOCATOR_TXT_LOG_ENVIO}                    css:.modal-body .log-envio
${LOCATOR_BTN_CERRAR_MODAL}                 css:.modal-footer .btn-cerrar

# Locators - Validación de Reglas Amigo Paguitos
${LOCATOR_TXT_REGLAS_APLICADAS_NOTIF}       css:.validation-notif .reglas-aplicadas
${LOCATOR_TXT_CRITERIO_ENVIO}               css:.validation-notif .criterio-envio

*** Keywords ***
Navegar A Módulo De Notificaciones De Pago
    Go To    ${URL_LOGIN}${URL_MODULO_NOTIFICACIONES_PAGO}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CREDITO_ID_NOTIF}    timeout=10s

Buscar Crédito Por ID Para Notificaciones
    [Arguments]    ${credito_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CREDITO_ID_NOTIF}
    Input Text    ${LOCATOR_INPUT_CREDITO_ID_NOTIF}    ${credito_id}
    Click Button    ${LOCATOR_BTN_BUSCAR_CREDITO_NOTIF}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CREDITO_ID_NOTIF}    timeout=10s

Buscar Crédito Por Customer ID Para Notificaciones
    [Arguments]    ${customer_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_NOTIF}
    Input Text    ${LOCATOR_INPUT_CUSTOMER_ID_NOTIF}    ${customer_id}
    Click Button    ${LOCATOR_BTN_BUSCAR_CREDITO_NOTIF}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CREDITO_ID_NOTIF}    timeout=10s

Verificar Que Crédito Es De Amigo Paguitos
    Wait Until Element Is Visible    ${LOCATOR_TXT_TIPO_PRODUCTO}    timeout=10s
    ${tipo_producto}=    Get Text    ${LOCATOR_TXT_TIPO_PRODUCTO}
    Should Contain    ${tipo_producto}    Amigo Paguitos

Obtener Información Del Crédito Para Notificaciones
    ${credito_id}=        Get Text    ${LOCATOR_TXT_CREDITO_ID_NOTIF}
    ${customer_id}=       Get Text    ${LOCATOR_TXT_CUSTOMER_ID_NOTIF}
    ${tipo_producto}=     Get Text    ${LOCATOR_TXT_TIPO_PRODUCTO}
    ${estado_credito}=    Get Text    ${LOCATOR_TXT_ESTADO_CREDITO_NOTIF}
    [Return]    ${credito_id}    ${customer_id}    ${tipo_producto}    ${estado_credito}

Verificar Que Calendario De Cobranza Esta Configurado
    Wait Until Element Is Visible    ${LOCATOR_SECCION_CALENDARIO_COBRANZA}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_CALENDARIO_NOTIF}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_VENCIMIENTO}
    Element Should Be Visible    ${LOCATOR_TXT_NUMERO_PARCIALIDAD}

Obtener Fechas De Vencimiento Del Calendario
    Wait Until Element Is Visible    ${LOCATOR_TABLA_CALENDARIO_NOTIF}    timeout=10s
    ${fechas}=    Get Text    ${LOCATOR_TXT_FECHA_VENCIMIENTO}
    [Return]    ${fechas}

Verificar Que Fechas Programadas Estan Almacenadas
    ${fechas}=    Obtener Fechas De Vencimiento Del Calendario
    Should Not Be Empty    ${fechas}
    Element Should Be Visible    ${LOCATOR_TXT_ESTADO_PARCIALIDAD}

Configurar Canal De Notificaciones
    [Arguments]    ${canal}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_CONFIG_NOTIF}    timeout=10s
    Wait Until Element Is Visible    ${LOCATOR_SELECT_CANAL_NOTIFICACION}
    Select From List By Label    ${LOCATOR_SELECT_CANAL_NOTIFICACION}    ${canal}

Configurar Dias Antes De Vencimiento
    [Arguments]    ${dias}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_DIAS_ANTES_VENCIMIENTO}
    Input Text    ${LOCATOR_INPUT_DIAS_ANTES_VENCIMIENTO}    ${dias}

Habilitar Notificaciones De Vencimiento
    Wait Until Element Is Visible    ${LOCATOR_CHECKBOX_NOTIF_VENCIMIENTO}
    Select Checkbox    ${LOCATOR_CHECKBOX_NOTIF_VENCIMIENTO}

Habilitar Notificaciones De Morosidad
    Wait Until Element Is Visible    ${LOCATOR_CHECKBOX_NOTIF_MOROSIDAD}
    Select Checkbox    ${LOCATOR_CHECKBOX_NOTIF_MOROSIDAD}

Guardar Configuración De Notificaciones
    Wait Until Element Is Enabled    ${LOCATOR_BTN_GUARDAR_CONFIG_NOTIF}
    Click Button    ${LOCATOR_BTN_GUARDAR_CONFIG_NOTIF}
    Wait Until Element Is Visible    ${LOCATOR_MSG_CONFIG_GUARDADA}    timeout=10s

Verificar Que Configuración Fue Guardada
    Element Should Be Visible    ${LOCATOR_MSG_CONFIG_GUARDADA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_CONFIG_GUARDADA}
    Should Contain    ${mensaje}    configuración guardada

Ejecutar Proceso Automático De Generación De Notificaciones
    Wait Until Element Is Visible    ${LOCATOR_SECCION_PROCESO_AUTO}    timeout=10s
    Wait Until Element Is Enabled    ${LOCATOR_BTN_EJECUTAR_PROCESO_AUTO}
    Click Button    ${LOCATOR_BTN_EJECUTAR_PROCESO_AUTO}
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_PROCESO}    timeout=15s

Verificar Que Proceso Automatico Se Ejecuta Correctamente
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_PROCESO}    timeout=15s
    ${estado_proceso}=    Get Text    ${LOCATOR_TXT_ESTADO_PROCESO}
    Should Contain Any    ${estado_proceso}    Completado    Exitoso    Finalizado
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_EJECUCION}

Verificar Que Notificaciones Fueron Generadas Por Proceso Automatico
    Wait Until Element Is Visible    ${LOCATOR_TXT_NOTIF_GENERADAS}    timeout=10s
    ${notif_generadas}=    Get Text    ${LOCATOR_TXT_NOTIF_GENERADAS}
    Should Not Be Equal As Strings    ${notif_generadas}    0
    Element Should Be Visible    ${LOCATOR_TABLA_NOTIF_GENERADAS}

Obtener Cantidad De Notificaciones Generadas
    ${cantidad}=    Get Text    ${LOCATOR_TXT_NOTIF_GENERADAS}
    [Return]    ${cantidad}

Verificar Que Notificaciones Corresponden A Parcialidades Proximas
    Wait Until Element Is Visible    ${LOCATOR_TABLA_NOTIF_GENERADAS}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_TIPO_NOTIFICACION}
    ${tipo_notif}=    Get Text    ${LOCATOR_TXT_TIPO_NOTIFICACION}
    Should Contain Any    ${tipo_notif}    Próximo vencimiento    Recordatorio pago    Alerta vencimiento

Verificar Estado De Notificaciones Generadas
    [Arguments]    ${estado_esperado}
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_NOTIFICACION}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_NOTIFICACION}
    Should Be Equal As Strings    ${estado}    ${estado_esperado}

Verificar Que Sistema Registra Envio Exitoso
    Wait Until Element Is Visible    ${LOCATOR_SECCION_ENVIO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_ESTADO_ENVIO}
    ${estado_envio}=    Get Text    ${LOCATOR_TXT_ESTADO_ENVIO}
    Should Contain Any    ${estado_envio}    Enviado    Exitoso    Completado

Verificar Que Notificaciones Fueron Enviadas Al Cliente
    Element Should Be Visible    ${LOCATOR_TXT_DESTINATARIO}
    ${destinatario}=    Get Text    ${LOCATOR_TXT_DESTINATARIO}
    Should Not Be Empty    ${destinatario}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_ENVIO}
    ${fecha_envio}=    Get Text    ${LOCATOR_TXT_FECHA_ENVIO}
    Should Not Be Empty    ${fecha_envio}

Verificar Canal Utilizado Para Envio
    [Arguments]    ${canal_esperado}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CANAL_UTILIZADO}    timeout=10s
    ${canal}=    Get Text    ${LOCATOR_TXT_CANAL_UTILIZADO}
    Should Be Equal As Strings    ${canal}    ${canal_esperado}

Verificar Que Estado Se Actualiza En BES
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_NOTIFICACION}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_NOTIFICACION}
    Should Contain Any    ${estado}    Enviado    Completado    Procesado

Consultar Historial De Notificaciones
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_NOTIF}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_HISTORIAL_NOTIF}

Ver Detalle De Notificacion
    [Arguments]    ${index}
    Wait Until Element Is Visible    ${LOCATOR_BTN_VER_DETALLE_NOTIF}    timeout=10s
    ${botones}=    Get WebElements    ${LOCATOR_BTN_VER_DETALLE_NOTIF}
    Click Element    ${botones}[${index}]
    Wait Until Element Is Visible    ${LOCATOR_MODAL_DETALLE_NOTIF}    timeout=5s

Verificar Contenido De Notificacion
    Element Should Be Visible    ${LOCATOR_TXT_CONTENIDO_NOTIF}
    ${contenido}=    Get Text    ${LOCATOR_TXT_CONTENIDO_NOTIF}
    Should Not Be Empty    ${contenido}

Verificar Log De Envio
    Element Should Be Visible    ${LOCATOR_TXT_LOG_ENVIO}
    ${log}=    Get Text    ${LOCATOR_TXT_LOG_ENVIO}
    Should Not Be Empty    ${log}

Cerrar Modal De Detalle
    Wait Until Element Is Enabled    ${LOCATOR_BTN_CERRAR_MODAL}
    Click Button    ${LOCATOR_BTN_CERRAR_MODAL}
    Wait Until Element Is Not Visible    ${LOCATOR_MODAL_DETALLE_NOTIF}    timeout=5s

Verificar Que Reglas De Amigo Paguitos Se Aplican A Notificaciones
    Wait Until Element Is Visible    ${LOCATOR_TXT_REGLAS_APLICADAS_NOTIF}    timeout=10s
    ${reglas}=    Get Text    ${LOCATOR_TXT_REGLAS_APLICADAS_NOTIF}
    Should Not Be Empty    ${reglas}
    Should Contain    ${reglas}    Amigo Paguitos
