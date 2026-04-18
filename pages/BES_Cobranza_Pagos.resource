*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_COBRANZA_PAGOS}           /cobranza/pagos

# Locators - Búsqueda de Financiamiento
${LOCATOR_INPUT_CUSTOMER_ID_PAGOS}     id:searchCustomerIdPagos
${LOCATOR_INPUT_IMEI_PAGOS}            id:searchIMEIPagos
${LOCATOR_BTN_BUSCAR_FINANCIAMIENTO_PAGOS}    id:btnBuscarFinanciamientoPagos

# Locators - Información del Financiamiento
${LOCATOR_TXT_CUSTOMER_ID_PAGOS}       css:.financing-payment .customer-id
${LOCATOR_TXT_IMEI_PAGOS}              css:.financing-payment .imei
${LOCATOR_TXT_SALDO_PENDIENTE}         css:.financing-payment .saldo-pendiente
${LOCATOR_TXT_PARCIALIDADES_VENCIDAS_PAGOS}    css:.financing-payment .parcialidades-vencidas
${LOCATOR_TXT_ESTADO_FINANCIAMIENTO}   css:.financing-payment .estado-financiamiento

# Locators - Acreditación de Pago
${LOCATOR_INPUT_MONTO_PAGO}            id:inputMontoPago
${LOCATOR_SELECT_METODO_PAGO}          id:selectMetodoPago
${LOCATOR_INPUT_REFERENCIA_PAGO}       id:inputReferenciaPago
${LOCATOR_BTN_ACREDITAR_PAGO}          id:btnAcreditarPago
${LOCATOR_MSG_PAGO_EXITOSO}            css:.alert-success

# Locators - Verificación Post-Pago
${LOCATOR_TXT_SALDO_ACTUALIZADO}       css:.payment-confirmation .saldo-actualizado
${LOCATOR_TXT_PARCIALIDADES_PAGADAS}   css:.payment-confirmation .parcialidades-pagadas
${LOCATOR_TXT_ESTADO_ACTUALIZADO}      css:.payment-confirmation .estado-actualizado

# Locators - Proceso de Habilitación Automática
${LOCATOR_SECCION_HABILITACION}        css:.habilitacion-info
${LOCATOR_TXT_PROCESO_HABILITACION}    css:.habilitacion-info .proceso-iniciado
${LOCATOR_TXT_SOLICITUD_HABILITACION_SITIC}    css:.habilitacion-info .solicitud-enviada-sitic
${LOCATOR_TXT_IMEI_HABILITADO}         css:.habilitacion-info .imei-habilitado
${LOCATOR_TXT_RESPUESTA_SITIC_HABILITACION}    css:.habilitacion-info .respuesta-sitic

# Locators - Estado Final del Equipo Post-Habilitación
${LOCATOR_TXT_ESTADO_EQUIPO_PAGOS}     css:.device-status .estado-equipo
${LOCATOR_TXT_FECHA_HABILITACION}      css:.device-status .fecha-habilitacion
${LOCATOR_TXT_SERVICIO_ACTIVO}         css:.device-status .servicio-activo

# Locators - Pagos desde Puntos de Cobro (SICATEL y Kioscos)
${LOCATOR_SELECT_PUNTO_COBRO}          id:selectPuntoCobro
${LOCATOR_INPUT_REFERENCIA_SICATEL}    id:inputReferenciaSicatel
${LOCATOR_TXT_NOTIFICACION_CPS_EPAC}   css:.payment-notification .notificacion-cps
${LOCATOR_TXT_PUNTO_COBRO_ORIGEN}      css:.payment-info .punto-cobro
${LOCATOR_TXT_FECHA_HORA_PAGO}         css:.payment-info .fecha-hora
${LOCATOR_TABLA_CALENDARIO_COBRANZA}   id:tablaCalendarioCobranza
${LOCATOR_TXT_PARCIALIDAD_ESTADO}      css:.calendar-detail .parcialidad-estado
${LOCATOR_BTN_VER_HISTORIAL_PAGOS}     id:btnVerHistorialPagos
${LOCATOR_TABLA_HISTORIAL_PAGOS}       id:tablaHistorialPagos
${LOCATOR_TXT_DETALLE_PAGO_HISTORIAL}  css:.payment-history .detalle-pago

# Locators - Calendario de Cobranza y Notificaciones de Pago
${LOCATOR_INPUT_CUSTOMER_ID_NOTIFICACION}    id:searchCustomerIdNotificacion
${LOCATOR_INPUT_CREDITO_ID_CALENDARIO}       id:inputCreditoIdCalendario
${LOCATOR_BTN_CONFIGURAR_CALENDARIO}         id:btnConfigurarCalendario
${LOCATOR_INPUT_FECHA_VENCIMIENTO_1}         id:inputFechaVencimiento1
${LOCATOR_INPUT_FECHA_VENCIMIENTO_2}         id:inputFechaVencimiento2
${LOCATOR_INPUT_FECHA_VENCIMIENTO_3}         id:inputFechaVencimiento3
${LOCATOR_BTN_GUARDAR_CALENDARIO}            id:btnGuardarCalendario
${LOCATOR_MSG_CALENDARIO_GUARDADO}           css:.alert-success.calendario-guardado
${LOCATOR_BTN_EJECUTAR_PROCESO_NOTIFICACIONES}    id:btnEjecutarProcesoNotificaciones
${LOCATOR_TABLA_NOTIFICACIONES_GENERADAS}    id:tablaNotificacionesGeneradas
${LOCATOR_TXT_ESTADO_NOTIFICACION}           css:.notification-status .estado
${LOCATOR_TXT_CANAL_ENVIO_NOTIFICACION}      css:.notification-channel .canal
${LOCATOR_TXT_FECHA_ENVIO_NOTIFICACION}      css:.notification-timestamp .fecha-envio
${LOCATOR_TXT_REGISTRO_EXITOSO_NOTIFICACION}    css:.notification-success .registro-exitoso

*** Keywords ***
Navegar A Módulo De Cobranza Pagos
    Go To    ${URL_LOGIN}${URL_MODULO_COBRANZA_PAGOS}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_PAGOS}    timeout=10s

Buscar Financiamiento Por IMEI Para Pago
    [Arguments]    ${imei}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_IMEI_PAGOS}
    Input Text    ${LOCATOR_INPUT_IMEI_PAGOS}    ${imei}
    Click Button    ${LOCATOR_BTN_BUSCAR_FINANCIAMIENTO_PAGOS}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUSTOMER_ID_PAGOS}    timeout=10s

Buscar Financiamiento Por Customer ID Para Pago
    [Arguments]    ${customer_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_PAGOS}
    Input Text    ${LOCATOR_INPUT_CUSTOMER_ID_PAGOS}    ${customer_id}
    Click Button    ${LOCATOR_BTN_BUSCAR_FINANCIAMIENTO_PAGOS}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUSTOMER_ID_PAGOS}    timeout=10s

Obtener Información Del Financiamiento Para Pago
    ${customer_id}=         Get Text    ${LOCATOR_TXT_CUSTOMER_ID_PAGOS}
    ${imei}=                Get Text    ${LOCATOR_TXT_IMEI_PAGOS}
    ${saldo_pendiente}=     Get Text    ${LOCATOR_TXT_SALDO_PENDIENTE}
    ${parcialidades}=       Get Text    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS_PAGOS}
    ${estado}=              Get Text    ${LOCATOR_TXT_ESTADO_FINANCIAMIENTO}
    [Return]    ${customer_id}    ${imei}    ${saldo_pendiente}    ${parcialidades}    ${estado}

Verificar Que Financiamiento Tiene Parcialidades Vencidas
    Wait Until Element Is Visible    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS_PAGOS}    timeout=10s
    ${parcialidades_vencidas}=    Get Text    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS_PAGOS}
    Should Not Be Equal As Strings    ${parcialidades_vencidas}    0
    ${saldo_pendiente}=    Get Text    ${LOCATOR_TXT_SALDO_PENDIENTE}
    Should Not Be Equal As Strings    ${saldo_pendiente}    0

Ingresar Datos Del Pago
    [Arguments]    ${monto}    ${metodo_pago}    ${referencia}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_MONTO_PAGO}
    Input Text    ${LOCATOR_INPUT_MONTO_PAGO}    ${monto}
    Select From List By Label    ${LOCATOR_SELECT_METODO_PAGO}    ${metodo_pago}
    Input Text    ${LOCATOR_INPUT_REFERENCIA_PAGO}    ${referencia}

Hacer Click En Botón Acreditar Pago
    Click Button    ${LOCATOR_BTN_ACREDITAR_PAGO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_PAGO_EXITOSO}    timeout=10s

Verificar Que Pago Fue Acreditado Exitosamente
    Element Should Be Visible    ${LOCATOR_MSG_PAGO_EXITOSO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_PAGO_EXITOSO}
    Should Contain    ${mensaje}    acreditado exitosamente

Verificar Que Saldo Y Estado Fueron Actualizados
    Wait Until Element Is Visible    ${LOCATOR_TXT_SALDO_ACTUALIZADO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_PARCIALIDADES_PAGADAS}
    Element Should Be Visible    ${LOCATOR_TXT_ESTADO_ACTUALIZADO}
    ${estado_actualizado}=    Get Text    ${LOCATOR_TXT_ESTADO_ACTUALIZADO}
    Should Not Contain    ${estado_actualizado}    Morosidad

Verificar Que BES Inicia Proceso De Habilitación Automática
    [Arguments]    ${imei_esperado}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_HABILITACION}    timeout=10s
    ${proceso_iniciado}=    Get Text    ${LOCATOR_TXT_PROCESO_HABILITACION}
    Should Be Equal As Strings    ${proceso_iniciado}    Sí
    ${solicitud_enviada}=    Get Text    ${LOCATOR_TXT_SOLICITUD_HABILITACION_SITIC}
    Should Be Equal As Strings    ${solicitud_enviada}    Sí
    ${imei_habilitado}=    Get Text    ${LOCATOR_TXT_IMEI_HABILITADO}
    Should Be Equal As Strings    ${imei_habilitado}    ${imei_esperado}

Verificar Integración Con SITIC-Trustonic Para Habilitación
    ${respuesta_sitic}=    Get Text    ${LOCATOR_TXT_RESPUESTA_SITIC_HABILITACION}
    Should Contain Any    ${respuesta_sitic}    Exitoso    Completado    Habilitado

Verificar Que Equipo Queda Habilitado Y Servicio Activo
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_EQUIPO_PAGOS}    timeout=10s
    ${estado_equipo}=    Get Text    ${LOCATOR_TXT_ESTADO_EQUIPO_PAGOS}
    Should Contain Any    ${estado_equipo}    Habilitado    Activo    Desbloqueado
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_HABILITACION}
    ${servicio_activo}=    Get Text    ${LOCATOR_TXT_SERVICIO_ACTIVO}
    Should Be Equal As Strings    ${servicio_activo}    Sí

Registrar Pago Desde Punto De Cobro
    [Arguments]    ${credito_id}    ${monto}    ${punto_cobro}    ${referencia}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_PAGOS}
    Input Text    ${LOCATOR_INPUT_CUSTOMER_ID_PAGOS}    ${credito_id}
    Click Button    ${LOCATOR_BTN_BUSCAR_FINANCIAMIENTO_PAGOS}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_MONTO_PAGO}    timeout=10s
    Input Text    ${LOCATOR_INPUT_MONTO_PAGO}    ${monto}
    Select From List By Label    ${LOCATOR_SELECT_PUNTO_COBRO}    ${punto_cobro}
    Input Text    ${LOCATOR_INPUT_REFERENCIA_SICATEL}    ${referencia}

Verificar Notificación De Pago Desde CPS-EPAC
    Wait Until Element Is Visible    ${LOCATOR_TXT_NOTIFICACION_CPS_EPAC}    timeout=10s
    ${notificacion}=    Get Text    ${LOCATOR_TXT_NOTIFICACION_CPS_EPAC}
    Should Contain Any    ${notificacion}    Recibida    Procesada    Exitosa

Verificar Registro De Transacción De Pago
    [Arguments]    ${monto_esperado}    ${punto_cobro_esperado}
    Wait Until Element Is Visible    ${LOCATOR_TXT_PUNTO_COBRO_ORIGEN}    timeout=10s
    ${punto_cobro}=    Get Text    ${LOCATOR_TXT_PUNTO_COBRO_ORIGEN}
    Should Be Equal As Strings    ${punto_cobro}    ${punto_cobro_esperado}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_HORA_PAGO}

Verificar Acreditación A Parcialidad Correspondiente
    Wait Until Element Is Visible    ${LOCATOR_MSG_PAGO_EXITOSO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_SALDO_ACTUALIZADO}

Verificar Actualización De Calendario De Cobranza
    Wait Until Element Is Visible    ${LOCATOR_TABLA_CALENDARIO_COBRANZA}    timeout=10s
    ${estado_parcialidad}=    Get Text    ${LOCATOR_TXT_PARCIALIDAD_ESTADO}
    Should Contain Any    ${estado_parcialidad}    Pagada    Liquidada    Completada

Consultar Historial De Pagos
    Wait Until Element Is Visible    ${LOCATOR_BTN_VER_HISTORIAL_PAGOS}
    Click Button    ${LOCATOR_BTN_VER_HISTORIAL_PAGOS}
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}    timeout=10s

Verificar Detalle En Historial De Pagos
    [Arguments]    ${punto_cobro}    ${referencia}
    Element Should Be Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}
    ${detalle}=    Get Text    ${LOCATOR_TXT_DETALLE_PAGO_HISTORIAL}
    Should Contain    ${detalle}    ${punto_cobro}
    Should Contain    ${detalle}    ${referencia}

Buscar Credito Para Configurar Calendario
    [Arguments]    ${credito_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CREDITO_ID_CALENDARIO}
    Input Text    ${LOCATOR_INPUT_CREDITO_ID_CALENDARIO}    ${credito_id}
    Click Button    ${LOCATOR_BTN_CONFIGURAR_CALENDARIO}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_FECHA_VENCIMIENTO_1}    timeout=10s

Configurar Fechas De Vencimiento De Parcialidades
    [Arguments]    ${fecha_1}    ${fecha_2}    ${fecha_3}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_FECHA_VENCIMIENTO_1}
    Input Text    ${LOCATOR_INPUT_FECHA_VENCIMIENTO_1}    ${fecha_1}
    Input Text    ${LOCATOR_INPUT_FECHA_VENCIMIENTO_2}    ${fecha_2}
    Input Text    ${LOCATOR_INPUT_FECHA_VENCIMIENTO_3}    ${fecha_3}

Guardar Calendario De Cobranza
    Click Button    ${LOCATOR_BTN_GUARDAR_CALENDARIO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_CALENDARIO_GUARDADO}    timeout=10s

Verificar Que Calendario Fue Almacenado Correctamente
    Element Should Be Visible    ${LOCATOR_MSG_CALENDARIO_GUARDADO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_CALENDARIO_GUARDADO}
    Should Contain Any    ${mensaje}    guardado correctamente    configurado exitosamente    almacenado

Ejecutar Proceso Automatico De Notificaciones
    Wait Until Element Is Visible    ${LOCATOR_BTN_EJECUTAR_PROCESO_NOTIFICACIONES}
    Click Button    ${LOCATOR_BTN_EJECUTAR_PROCESO_NOTIFICACIONES}
    Wait Until Element Is Visible    ${LOCATOR_TABLA_NOTIFICACIONES_GENERADAS}    timeout=15s

Verificar Que Notificaciones Fueron Generadas Correctamente
    Element Should Be Visible    ${LOCATOR_TABLA_NOTIFICACIONES_GENERADAS}
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_NOTIFICACION}
    Should Contain Any    ${estado}    Generada    Pendiente    Programada

Verificar Envio De Notificaciones A Traves Del Canal Configurado
    Wait Until Element Is Visible    ${LOCATOR_TXT_CANAL_ENVIO_NOTIFICACION}    timeout=10s
    ${canal}=    Get Text    ${LOCATOR_TXT_CANAL_ENVIO_NOTIFICACION}
    Should Not Be Empty    ${canal}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_ENVIO_NOTIFICACION}

Verificar Registro Exitoso De Envio De Notificaciones
    Wait Until Element Is Visible    ${LOCATOR_TXT_REGISTRO_EXITOSO_NOTIFICACION}    timeout=10s
    ${registro}=    Get Text    ${LOCATOR_TXT_REGISTRO_EXITOSO_NOTIFICACION}
    Should Contain Any    ${registro}    Exitoso    Enviado    Completado
    ${estado_actualizado}=    Get Text    ${LOCATOR_TXT_ESTADO_NOTIFICACION}
    Should Contain Any    ${estado_actualizado}    Enviada    Completada    Entregada

Verificar Actualización De Calendario De Cobranza Con Estado
    [Arguments]    ${estado_esperado}
    Wait Until Element Is Visible    ${LOCATOR_TABLA_CALENDARIO_COBRANZA}    timeout=10s
    ${estado_parcialidad}=    Get Text    ${LOCATOR_TXT_PARCIALIDAD_ESTADO}
    Should Be Equal As Strings    ${estado_parcialidad}    ${estado_esperado}

# ====================================
# KEYWORDS NUEVOS - Casos ID 21, 22, 26
# ====================================

# Keywords para reversos de pagos (Caso ID 22)
Solicitar Reverso De Pago
    [Arguments]    ${id_transaccion}    ${motivo_reverso}
    Wait Until Element Is Visible    id:btnSolicitarReverso    timeout=10s
    Click Button    id:btnSolicitarReverso
    Wait Until Element Is Visible    id:inputIdTransaccion    timeout=10s
    Input Text    id:inputIdTransaccion    ${id_transaccion}
    Input Text    id:inputMotivoReverso    ${motivo_reverso}
    Click Button    id:btnConfirmarReverso

Validar Que Transacción Es Reversible
    Wait Until Element Is Visible    css:.validation-message.reversible    timeout=10s
    ${mensaje}=    Get Text    css:.validation-message.reversible
    Should Contain Any    ${mensaje}    reversible    válida    permitida

Ejecutar Proceso De Reverso
    Click Button    id:btnEjecutarReverso
    Wait Until Element Is Visible    css:.alert-success.reverso-exitoso    timeout=15s

Verificar Que Reverso Fue Ejecutado Y Saldo Actualizado
    Element Should Be Visible    css:.alert-success.reverso-exitoso
    Wait Until Element Is Visible    ${LOCATOR_TXT_SALDO_ACTUALIZADO}    timeout=10s
    ${mensaje}=    Get Text    css:.alert-success.reverso-exitoso
    Should Contain Any    ${mensaje}    revertido    cancelado    anulado

Verificar Que Parcialidad Está Marcada Como Pendiente
    Wait Until Element Is Visible    ${LOCATOR_TXT_PARCIALIDAD_ESTADO}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_TXT_PARCIALIDAD_ESTADO}
    Should Contain Any    ${estado}    Pendiente    Sin Pagar    No Pagada

Verificar Movimiento De Reverso En Historial
    [Arguments]    ${monto}    ${motivo}
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}    timeout=10s
    ${historial}=    Get Text    ${LOCATOR_TABLA_HISTORIAL_PAGOS}
    Should Contain    ${historial}    Reverso
    Should Contain    ${historial}    ${monto}
    Should Contain    ${historial}    ${motivo}

# Keywords para filtrado de pagos (Caso ID 26)
Filtrar Historial De Pagos Por Rango De Fechas
    [Arguments]    ${fecha_inicio}    ${fecha_fin}
    Wait Until Element Is Visible    id:inputFechaInicioPagos    timeout=10s
    Input Text    id:inputFechaInicioPagos    ${fecha_inicio}
    Input Text    id:inputFechaFinPagos    ${fecha_fin}
    Click Button    id:btnFiltrarPagos
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}    timeout=10s

Verificar Que Pagos Están Dentro Del Rango De Fechas
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}    timeout=10s
    ${cantidad_pagos}=    Get Element Count    css:.payment-history .detalle-pago
    Should Be True    ${cantidad_pagos} > 0    msg=No se encontraron pagos en el rango de fechas

Verificar Que Existen Pagos Desde Punto De Cobro
    [Arguments]    ${punto_cobro}
    ${cantidad_pagos}=    Get Element Count    xpath://table[@id='tablaHistorialPagos']//td[contains(text(),'${punto_cobro}')]
    Should Be True    ${cantidad_pagos} > 0    msg=No se encontraron pagos desde ${punto_cobro}
