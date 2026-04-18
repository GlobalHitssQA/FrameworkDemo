*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_INHABILITACION}           /cobranza/inhabilitacion

# Locators - Búsqueda de Financiamiento
${LOCATOR_INPUT_IMEI}                  id:searchIMEI
${LOCATOR_INPUT_CUSTOMER_ID_BUSCAR}    id:searchCustomerId
${LOCATOR_BTN_BUSCAR_FINANCIAMIENTO}   id:btnSearchFinancing

# Locators - Información de Financiamiento en Morosidad
${LOCATOR_TXT_CUSTOMER_ID}             css:.financing-detail .customer-id
${LOCATOR_TXT_IMEI}                    css:.financing-detail .imei
${LOCATOR_TXT_PARCIALIDADES_VENCIDAS}  css:.financing-detail .parcialidades-vencidas
${LOCATOR_TXT_CYCLE_DUE_DATE}          css:.financing-detail .cycle-due-date
${LOCATOR_TXT_ESTADO_MOROSIDAD}        css:.financing-detail .estado-morosidad

# Locators - Historial de Notificaciones
${LOCATOR_SECCION_NOTIFICACIONES}      id:seccionNotificaciones
${LOCATOR_TABLA_NOTIFICACIONES}        id:tablaNotificaciones
${LOCATOR_TXT_NOTIFICACION_ENVIADA}    css:.notifications-table .notificacion-estado
${LOCATOR_TXT_FECHA_NOTIFICACION}      css:.notifications-table .fecha-notificacion
${LOCATOR_TXT_TIPO_NOTIFICACION}       css:.notifications-table .tipo-notificacion

# Locators - Proceso de Inhabilitación
${LOCATOR_BTN_INHABILITAR_EQUIPO}      id:btnInhabilitarEquipo
${LOCATOR_MODAL_CONFIRMACION}          id:modalConfirmacionInhabilitacion
${LOCATOR_BTN_CONFIRMAR_INHABILITACION}    id:btnConfirmarInhabilitacion
${LOCATOR_MSG_INHABILITACION_EXITOSA}  css:.alert-success

# Locators - Integración SITIC-Trustonic
${LOCATOR_SECCION_INTEGRACION}         id:seccionIntegracionSITIC
${LOCATOR_TXT_SOLICITUD_ENVIADA}       css:.integration-info .solicitud-enviada
${LOCATOR_TXT_IMEI_SOLICITADO}         css:.integration-info .imei-solicitado
${LOCATOR_TXT_RESPUESTA_SITIC}         css:.integration-info .respuesta-sitic
${LOCATOR_TXT_ESTADO_INTEGRACION}      css:.integration-info .estado-integracion

# Locators - Estado del Equipo
${LOCATOR_TXT_ESTADO_EQUIPO}           css:.device-status .estado-equipo
${LOCATOR_TXT_FECHA_INHABILITACION}    css:.device-status .fecha-inhabilitacion
${LOCATOR_TXT_MOTIVO_INHABILITACION}   css:.device-status .motivo-inhabilitacion

# Locators - Calendario de Cobranza Amigo Paguitos (Caso ID 57)
${LOCATOR_SECCION_CALENDARIO_AMIGO_PAGUITOS}    css:.calendario-amigo-paguitos
${LOCATOR_TXT_TIPO_CICLO_COBRANZA}              css:.calendar-config .tipo-ciclo
${LOCATOR_TXT_FRECUENCIA_PAGO}                  css:.calendar-config .frecuencia-pago

# Locators - Promesas de Pago (Caso ID 57)
${LOCATOR_SECCION_PROMESAS_PAGO}                css:.promesas-pago-section
${LOCATOR_TXT_PROMESAS_ACTIVAS}                 css:.promesas-pago .promesas-activas
${LOCATOR_TABLA_PROMESAS_PAGO}                  id:tablaPromesasPago
${LOCATOR_TXT_ESTADO_PROMESA}                   css:.promesa-item .estado-promesa

*** Keywords ***
Navegar A Módulo De Inhabilitación
    Go To    ${URL_LOGIN}${URL_MODULO_INHABILITACION}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_IMEI}    timeout=10s

Buscar Financiamiento Por IMEI
    [Arguments]    ${imei}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_IMEI}
    Input Text    ${LOCATOR_INPUT_IMEI}    ${imei}
    Click Button    ${LOCATOR_BTN_BUSCAR_FINANCIAMIENTO}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUSTOMER_ID}    timeout=10s

Buscar Financiamiento Por Customer ID
    [Arguments]    ${customer_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_BUSCAR}
    Input Text    ${LOCATOR_INPUT_CUSTOMER_ID_BUSCAR}    ${customer_id}
    Click Button    ${LOCATOR_BTN_BUSCAR_FINANCIAMIENTO}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUSTOMER_ID}    timeout=10s

Verificar Que Financiamiento Tiene Incumplimiento De Pago
    Wait Until Element Is Visible    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS}    timeout=10s
    ${parcialidades_vencidas}=    Get Text    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS}
    Should Not Be Equal As Strings    ${parcialidades_vencidas}    0
    Element Should Be Visible    ${LOCATOR_TXT_ESTADO_MOROSIDAD}
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_MOROSIDAD}
    Should Contain    ${estado}    Morosidad

Obtener Información De Financiamiento En Morosidad
    ${customer_id}=    Get Text    ${LOCATOR_TXT_CUSTOMER_ID}
    ${imei}=           Get Text    ${LOCATOR_TXT_IMEI}
    ${parcialidades}=  Get Text    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS}
    ${cycle_due_date}= Get Text    ${LOCATOR_TXT_CYCLE_DUE_DATE}
    ${estado}=         Get Text    ${LOCATOR_TXT_ESTADO_MOROSIDAD}
    [Return]    ${customer_id}    ${imei}    ${parcialidades}    ${cycle_due_date}    ${estado}

Verificar Que Notificaciones Fueron Enviadas Al Cliente
    Wait Until Element Is Visible    ${LOCATOR_SECCION_NOTIFICACIONES}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_NOTIFICACIONES}
    ${estado_notificacion}=    Get Text    ${LOCATOR_TXT_NOTIFICACION_ENVIADA}
    Should Contain    ${estado_notificacion}    Enviada
    ${tipo_notificacion}=    Get Text    ${LOCATOR_TXT_TIPO_NOTIFICACION}
    Should Contain Any    ${tipo_notificacion}    Pago Pendiente    Recordatorio de Pago

Ejecutar Inhabilitación Del Equipo
    Wait Until Element Is Visible    ${LOCATOR_BTN_INHABILITAR_EQUIPO}
    Click Button    ${LOCATOR_BTN_INHABILITAR_EQUIPO}
    Wait Until Element Is Visible    ${LOCATOR_MODAL_CONFIRMACION}    timeout=5s
    Click Button    ${LOCATOR_BTN_CONFIRMAR_INHABILITACION}
    Wait Until Element Is Visible    ${LOCATOR_MSG_INHABILITACION_EXITOSA}    timeout=10s

Verificar Que Inhabilitación Fue Exitosa
    Element Should Be Visible    ${LOCATOR_MSG_INHABILITACION_EXITOSA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_INHABILITACION_EXITOSA}
    Should Contain    ${mensaje}    inhabilitación exitosa

Verificar Integración Con SITIC-Trustonic
    [Arguments]    ${imei_esperado}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_INTEGRACION}    timeout=10s
    ${solicitud_enviada}=    Get Text    ${LOCATOR_TXT_SOLICITUD_ENVIADA}
    Should Be Equal As Strings    ${solicitud_enviada}    Sí
    ${imei_solicitado}=    Get Text    ${LOCATOR_TXT_IMEI_SOLICITADO}
    Should Be Equal As Strings    ${imei_solicitado}    ${imei_esperado}
    ${estado_integracion}=    Get Text    ${LOCATOR_TXT_ESTADO_INTEGRACION}
    Should Contain Any    ${estado_integracion}    Exitoso    Completado

Verificar Que Equipo Queda Inhabilitado
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_EQUIPO}    timeout=10s
    ${estado_equipo}=    Get Text    ${LOCATOR_TXT_ESTADO_EQUIPO}
    Should Contain Any    ${estado_equipo}    Inhabilitado    Bloqueado
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_INHABILITACION}
    ${motivo}=    Get Text    ${LOCATOR_TXT_MOTIVO_INHABILITACION}
    Should Contain    ${motivo}    Incumplimiento de pago

Obtener Información De Morosidad Del Financiamiento
    [Documentation]    Obtiene información detallada sobre la morosidad del financiamiento
    ${parcialidades_vencidas}=    Get Text    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS}
    ${cycle_due_date}=            Get Text    ${LOCATOR_TXT_CYCLE_DUE_DATE}
    ${estado_morosidad}=          Get Text    ${LOCATOR_TXT_ESTADO_MOROSIDAD}
    [Return]    ${parcialidades_vencidas}    ${cycle_due_date}    ${estado_morosidad}

Verificar Registro De Inhabilitación Con Fecha Hora Y Motivo
    [Documentation]    Verifica que el registro de inhabilitación incluye fecha, hora y motivo
    Wait Until Element Is Visible    ${LOCATOR_TXT_FECHA_INHABILITACION}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_INHABILITACION}
    ${fecha_inhabilitacion}=    Get Text    ${LOCATOR_TXT_FECHA_INHABILITACION}
    Should Not Be Empty    ${fecha_inhabilitacion}
    Element Should Be Visible    ${LOCATOR_TXT_MOTIVO_INHABILITACION}
    ${motivo_inhabilitacion}=    Get Text    ${LOCATOR_TXT_MOTIVO_INHABILITACION}
    Should Contain    ${motivo_inhabilitacion}    Incumplimiento de pago
    Log    Registro de inhabilitación almacenado: Fecha=${fecha_inhabilitacion}, Motivo=${motivo_inhabilitacion}

# ====================================
# KEYWORDS NUEVOS - Caso ID 57
# ====================================

Verificar Que BES Administra Calendario De Cobranza Amigo Paguitos
    [Documentation]    Verifica que BES administra el calendario de cobranza específico de Amigo Paguitos
    Wait Until Element Is Visible    ${LOCATOR_SECCION_CALENDARIO_AMIGO_PAGUITOS}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_TIPO_CICLO_COBRANZA}
    Element Should Be Visible    ${LOCATOR_TXT_FRECUENCIA_PAGO}

Verificar Ciclo Configurable En Calendario Amigo Paguitos
    [Documentation]    Verifica que el calendario refleja ciclos configurables: semanal, quincenal o mensual
    Wait Until Element Is Visible    ${LOCATOR_TXT_TIPO_CICLO_COBRANZA}    timeout=10s
    ${tipo_ciclo}=    Get Text    ${LOCATOR_TXT_TIPO_CICLO_COBRANZA}
    Should Contain Any    ${tipo_ciclo}    Semanal    Quincenal    Mensual
    ${frecuencia}=    Get Text    ${LOCATOR_TXT_FRECUENCIA_PAGO}
    Should Not Be Empty    ${frecuencia}
    Log    Calendario de cobranza Amigo Paguitos configurado con ciclo: ${tipo_ciclo}, Frecuencia: ${frecuencia}

Verificar Que No Hay Promesas De Pago Activas
    [Documentation]    Verifica que no existen promesas de pago registradas para el cliente
    Wait Until Element Is Visible    ${LOCATOR_SECCION_PROMESAS_PAGO}    timeout=10s
    ${promesas_activas}=    Get Text    ${LOCATOR_TXT_PROMESAS_ACTIVAS}
    Should Be Equal As Strings    ${promesas_activas}    0
    Log    No hay promesas de pago activas para el cliente

Enviar Notificación De Pago Al Cliente
    [Documentation]    Ejecuta el envío de notificación al cliente informando del incumplimiento de parcialidades
    Verificar Que Notificaciones Fueron Enviadas Al Cliente
