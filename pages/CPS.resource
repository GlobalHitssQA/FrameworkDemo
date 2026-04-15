*** Variables ***
${CPS_URL}                                https://cps.telcel.com
${CPS_MENU_CONFIGURACION}                 id:menu_configuracion
${CPS_MENU_INTEGRACIONES}                 id:menu_integraciones
${CPS_CHECKBOX_INTEGRACION_BES}           id:checkbox_integracion_bes
${CPS_BOTON_ACTIVAR_INTEGRACION}          id:btn_activar_integracion
${CPS_MENSAJE_INTEGRACION_ACTIVA}         xpath://div[contains(text(),'Integración activa')]
${CPS_ESTADO_INTEGRACION}                 css:.estado-integracion

# ========================================
# LOCATORS PARA PROCESAMIENTO DE PAGOS
# ========================================
${CPS_MENU_PAGOS}                         id:menu_pagos
${CPS_BOTON_NUEVO_PAGO}                   id:btn_nuevo_pago
${CPS_INPUT_MONTO_PAGO}                   id:input_monto_pago
${CPS_INPUT_REFERENCIA_PRESTAMO}          id:input_referencia_prestamo
${CPS_INPUT_IDENTIFICACION_CLIENTE}       id:input_identificacion_cliente
${CPS_SELECT_TIPO_PAGO}                   id:select_tipo_pago
${CPS_BOTON_PROCESAR_PAGO}                id:btn_procesar_pago
${CPS_MENSAJE_PAGO_EXITOSO}               xpath://div[contains(text(),'Pago procesado exitosamente')]
${CPS_CAMPO_TRANSACCION_ID}               css:.transaccion-id
${CPS_CAMPO_FECHA_PAGO}                   css:.fecha-pago
${CPS_CAMPO_MONTO_PROCESADO}              css:.monto-procesado

# ========================================
# LOCATORS PARA NOTIFICACIONES Y LOGS
# ========================================
${CPS_MENU_NOTIFICACIONES}                id:menu_notificaciones
${CPS_TABLA_NOTIFICACIONES}               xpath://table[@id='tabla_notificaciones']
${CPS_CAMPO_SISTEMA_DESTINO}              xpath://td[@data-field='sistema_destino']
${CPS_CAMPO_TIPO_NOTIFICACION}            xpath://td[@data-field='tipo_notificacion']
${CPS_CAMPO_ESTADO_NOTIFICACION}          xpath://td[@data-field='estado']
${CPS_CAMPO_DETALLE_NOTIFICACION}         css:.detalle-notificacion
${CPS_LINK_VER_DETALLE}                   css:.link-ver-detalle

*** Keywords ***
Abrir sistema CPS
    Go To    ${CPS_URL}
    Wait Until Page Contains Element    ${CPS_MENU_CONFIGURACION}    timeout=10s

Acceder a módulo de configuración
    Click Element    ${CPS_MENU_CONFIGURACION}
    Wait Until Element Is Visible    ${CPS_MENU_INTEGRACIONES}    timeout=10s

Configurar integración con BES
    Click Element    ${CPS_MENU_INTEGRACIONES}
    Wait Until Element Is Visible    ${CPS_CHECKBOX_INTEGRACION_BES}    timeout=10s
    Select Checkbox    ${CPS_CHECKBOX_INTEGRACION_BES}
    Click Button    ${CPS_BOTON_ACTIVAR_INTEGRACION}
    Wait Until Element Is Visible    ${CPS_MENSAJE_INTEGRACION_ACTIVA}    timeout=15s

Verificar integración BES-CPS activa
    ${estado}=    Get Text    ${CPS_ESTADO_INTEGRACION}
    Should Contain    ${estado}    Activa

Acceder a módulo de pagos
    Click Element    ${CPS_MENU_PAGOS}
    Wait Until Element Is Visible    ${CPS_BOTON_NUEVO_PAGO}    timeout=10s

Iniciar nuevo pago de enganche
    Click Button    ${CPS_BOTON_NUEVO_PAGO}
    Wait Until Element Is Visible    ${CPS_INPUT_MONTO_PAGO}    timeout=10s

Ingresar datos del pago de enganche
    [Arguments]    ${monto}    ${referencia_prestamo}    ${identificacion}
    Input Text    ${CPS_INPUT_MONTO_PAGO}    ${monto}
    Input Text    ${CPS_INPUT_REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Input Text    ${CPS_INPUT_IDENTIFICACION_CLIENTE}    ${identificacion}
    Select From List By Label    ${CPS_SELECT_TIPO_PAGO}    Enganche

Procesar pago de enganche
    Click Button    ${CPS_BOTON_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${CPS_MENSAJE_PAGO_EXITOSO}    timeout=15s

Verificar pago procesado exitosamente
    Page Should Contain Element    ${CPS_MENSAJE_PAGO_EXITOSO}

Obtener datos del pago procesado
    ${transaccion_id}=    Get Text    ${CPS_CAMPO_TRANSACCION_ID}
    ${fecha}=    Get Text    ${CPS_CAMPO_FECHA_PAGO}
    ${monto}=    Get Text    ${CPS_CAMPO_MONTO_PROCESADO}
    Should Not Be Empty    ${transaccion_id}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${monto}
    Log    Transacción ID: ${transaccion_id}, Fecha: ${fecha}, Monto: ${monto}
    [Return]    ${transaccion_id}

Acceder a módulo de notificaciones
    Click Element    ${CPS_MENU_NOTIFICACIONES}
    Wait Until Element Is Visible    ${CPS_TABLA_NOTIFICACIONES}    timeout=10s

Verificar notificación enviada a BES
    [Arguments]    ${referencia_prestamo}
    ${xpath_notificacion}=    Set Variable    ${CPS_TABLA_NOTIFICACIONES}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_notificacion}
    ${sistema_destino}=    Get Text    ${xpath_notificacion}//td[@data-field='sistema_destino']
    ${tipo}=    Get Text    ${xpath_notificacion}//td[@data-field='tipo_notificacion']
    ${estado}=    Get Text    ${xpath_notificacion}//td[@data-field='estado']
    Should Contain    ${sistema_destino}    BES
    Should Contain    ${tipo}    Pago Enganche
    Should Contain    ${estado}    Enviada

Verificar detalle de notificación
    [Arguments]    ${monto}    ${fecha}    ${referencia}    ${transaccion_id}
    Click Element    ${CPS_LINK_VER_DETALLE}
    Wait Until Element Is Visible    ${CPS_CAMPO_DETALLE_NOTIFICACION}    timeout=10s
    ${detalle}=    Get Text    ${CPS_CAMPO_DETALLE_NOTIFICACION}
    Should Contain    ${detalle}    ${monto}
    Should Contain    ${detalle}    ${fecha}
    Should Contain    ${detalle}    ${referencia}
    Should Contain    ${detalle}    ${transaccion_id}

# ========================================
# LOCATORS Y KEYWORDS PARA PAGOS DE PARCIALIDADES DESDE SICATEL
# ========================================
${CPS_MENU_PUNTOS_COBRO}                  id:menu_puntos_cobro
${CPS_SELECT_PUNTO_COBRO}                 id:select_punto_cobro
${CPS_CAMPO_PUNTO_COBRO_ACTIVO}           xpath://td[@data-field='punto_cobro']
${CPS_INPUT_NUMERO_PARCIALIDAD}           id:input_numero_parcialidad
${CPS_TABLA_PAGOS_PARCIALIDADES}          xpath://table[@id='tabla_pagos_parcialidades']
${CPS_CAMPO_NUMERO_PARCIALIDAD}           xpath://td[@data-field='numero_parcialidad']
${CPS_CAMPO_MONTO_PARCIALIDAD}            xpath://td[@data-field='monto_parcialidad']
${CPS_CAMPO_PUNTO_COBRO_ORIGEN}           xpath://td[@data-field='punto_cobro']
${CPS_MENSAJE_INTEGRACION_SICATEL}        xpath://div[contains(text(),'SICATEL configurado')]

Configurar integración con punto de cobro SICATEL
    Click Element    ${CPS_MENU_PUNTOS_COBRO}
    Wait Until Element Is Visible    ${CPS_SELECT_PUNTO_COBRO}    timeout=10s
    Select From List By Label    ${CPS_SELECT_PUNTO_COBRO}    SICATEL
    Click Button    ${CPS_BOTON_ACTIVAR_INTEGRACION}
    Wait Until Element Is Visible    ${CPS_MENSAJE_INTEGRACION_SICATEL}    timeout=15s

Verificar integración con punto de cobro SICATEL activa
    ${estado}=    Get Text    ${CPS_ESTADO_INTEGRACION}
    Should Contain    ${estado}    Activa
    Page Should Contain Element    ${CPS_CAMPO_PUNTO_COBRO_ACTIVO}

Registrar pago de parcialidad desde SICATEL en CPS
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}    ${referencia_transaccion}
    Acceder a módulo de pagos
    Wait Until Element Is Visible    ${CPS_INPUT_REFERENCIA_PRESTAMO}    timeout=10s
    Input Text    ${CPS_INPUT_REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Input Text    ${CPS_INPUT_NUMERO_PARCIALIDAD}    ${numero_parcialidad}
    Input Text    ${CPS_INPUT_MONTO_PAGO}    ${monto}
    Input Text    ${CPS_INPUT_IDENTIFICACION_CLIENTE}    ${identificacion}
    Select From List By Label    ${CPS_SELECT_TIPO_PAGO}    Parcialidad
    Click Button    ${CPS_BOTON_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${CPS_MENSAJE_PAGO_EXITOSO}    timeout=15s

Verificar notificación de pago de parcialidad enviada a BES
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}=SICATEL
    Acceder a módulo de notificaciones
    ${xpath_notificacion}=    Set Variable    ${CPS_TABLA_NOTIFICACIONES}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_notificacion}
    ${sistema_destino}=    Get Text    ${xpath_notificacion}//td[@data-field='sistema_destino']
    ${tipo}=    Get Text    ${xpath_notificacion}//td[@data-field='tipo_notificacion']
    ${estado}=    Get Text    ${xpath_notificacion}//td[@data-field='estado']
    Should Contain    ${sistema_destino}    BES
    Should Contain    ${tipo}    Pago Parcialidad
    Should Contain    ${estado}    Enviada

Verificar detalle de notificación de parcialidad
    [Arguments]    ${monto}    ${fecha}    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}
    Click Element    ${CPS_LINK_VER_DETALLE}
    Wait Until Element Is Visible    ${CPS_CAMPO_DETALLE_NOTIFICACION}    timeout=10s
    ${detalle}=    Get Text    ${CPS_CAMPO_DETALLE_NOTIFICACION}
    Should Contain    ${detalle}    ${monto}
    Should Contain    ${detalle}    ${fecha}
    Should Contain    ${detalle}    ${referencia_prestamo}
    Should Contain    ${detalle}    ${numero_parcialidad}
    Should Contain    ${detalle}    ${punto_cobro}

# ========================================
# LOCATORS Y KEYWORDS PARA PAGOS DE PARCIALIDADES DESDE KIOSCOS
# ========================================
${CPS_MENSAJE_INTEGRACION_KIOSCOS}        xpath://div[contains(text(),'Kioscos configurado')]
${CPS_CAMPO_MEDIO_PAGO}                   xpath://td[@data-field='medio_pago']

Configurar integración con punto de cobro Kioscos
    Click Element    ${CPS_MENU_PUNTOS_COBRO}
    Wait Until Element Is Visible    ${CPS_SELECT_PUNTO_COBRO}    timeout=10s
    Select From List By Label    ${CPS_SELECT_PUNTO_COBRO}    Kioscos
    Click Button    ${CPS_BOTON_ACTIVAR_INTEGRACION}
    Wait Until Element Is Visible    ${CPS_MENSAJE_INTEGRACION_KIOSCOS}    timeout=15s

Verificar integración con punto de cobro Kioscos activa
    ${estado}=    Get Text    ${CPS_ESTADO_INTEGRACION}
    Should Contain    ${estado}    Activa
    Page Should Contain Element    ${CPS_CAMPO_PUNTO_COBRO_ACTIVO}

Registrar pago de parcialidad desde Kioscos en CPS
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}    ${medio_pago}=Tarjeta de Crédito
    Acceder a módulo de pagos
    Wait Until Element Is Visible    ${CPS_INPUT_REFERENCIA_PRESTAMO}    timeout=10s
    Input Text    ${CPS_INPUT_REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Input Text    ${CPS_INPUT_NUMERO_PARCIALIDAD}    ${numero_parcialidad}
    Input Text    ${CPS_INPUT_MONTO_PAGO}    ${monto}
    Input Text    ${CPS_INPUT_IDENTIFICACION_CLIENTE}    ${identificacion}
    Select From List By Label    ${CPS_SELECT_TIPO_PAGO}    Parcialidad
    Click Button    ${CPS_BOTON_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${CPS_MENSAJE_PAGO_EXITOSO}    timeout=15s

Verificar notificación de pago de parcialidad enviada a BES desde Kioscos
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}=Kioscos    ${medio_pago}=Tarjeta de Crédito
    Acceder a módulo de notificaciones
    ${xpath_notificacion}=    Set Variable    ${CPS_TABLA_NOTIFICACIONES}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_notificacion}
    ${sistema_destino}=    Get Text    ${xpath_notificacion}//td[@data-field='sistema_destino']
    ${tipo}=    Get Text    ${xpath_notificacion}//td[@data-field='tipo_notificacion']
    ${estado}=    Get Text    ${xpath_notificacion}//td[@data-field='estado']
    Should Contain    ${sistema_destino}    BES
    Should Contain    ${tipo}    Pago Parcialidad
    Should Contain    ${estado}    Enviada

Verificar detalle de notificación de parcialidad desde Kioscos
    [Arguments]    ${monto}    ${fecha}    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}    ${medio_pago}
    Click Element    ${CPS_LINK_VER_DETALLE}
    Wait Until Element Is Visible    ${CPS_CAMPO_DETALLE_NOTIFICACION}    timeout=10s
    ${detalle}=    Get Text    ${CPS_CAMPO_DETALLE_NOTIFICACION}
    Should Contain    ${detalle}    ${monto}
    Should Contain    ${detalle}    ${fecha}
    Should Contain    ${detalle}    ${referencia_prestamo}
    Should Contain    ${detalle}    ${numero_parcialidad}
    Should Contain    ${detalle}    ${punto_cobro}
    Should Contain    ${detalle}    ${medio_pago}

# ========================================
# LOCATORS Y KEYWORDS PARA PAGO DE ENGANCHE DESDE PUNTOS DE COBRO (TC047)
# ========================================
${CPS_CAMPO_CONFIRMACION_PAGO_ENGANCHE}    css:.confirmacion-pago-enganche
${CPS_MENSAJE_PAGO_ENGANCHE_REGISTRADO}    xpath://div[contains(text(),'Pago de enganche registrado')]

Registrar pago de enganche desde punto de cobro en CPS
    [Arguments]    ${monto}    ${referencia_prestamo}    ${identificacion}    ${punto_cobro}=Kioscos
    Acceder a módulo de pagos
    Iniciar nuevo pago de enganche
    Ingresar datos del pago de enganche    ${monto}    ${referencia_prestamo}    ${identificacion}
    Procesar pago de enganche
    Verificar pago procesado exitosamente
    Wait Until Element Is Visible    ${CPS_MENSAJE_PAGO_ENGANCHE_REGISTRADO}    timeout=10s
    Log    Pago de enganche registrado en CPS desde punto de cobro ${punto_cobro}
    ${transaccion_id}=    Obtener datos del pago procesado
    [Return]    ${transaccion_id}

Verificar registro correcto del pago de enganche en CPS
    [Arguments]    ${referencia_prestamo}
    Wait Until Element Is Visible    ${CPS_CAMPO_CONFIRMACION_PAGO_ENGANCHE}    timeout=10s
    ${confirmacion}=    Get Text    ${CPS_CAMPO_CONFIRMACION_PAGO_ENGANCHE}
    Should Contain    ${confirmacion}    ${referencia_prestamo}
    Log    Pago de enganche registrado correctamente para préstamo ${referencia_prestamo}

# ========================================
# LOCATORS Y KEYWORDS PARA RECEPCIÓN DE PAGOS OXXO DESDE SICATEL (TC077)
# ========================================
${CPS_CAMPO_ORIGEN_NOTIFICACION}          css:.origen-notificacion
${CPS_CAMPO_CANAL_PAGO}                   css:.canal-pago
${CPS_MENSAJE_PAGO_OXXO_RECIBIDO}         xpath://div[contains(text(),'Pago desde OXXO recibido')]

Recibir notificación de pago de enganche desde SICATEL
    [Arguments]    ${referencia_transaccion}    ${monto}    ${fecha}    ${referencia_prestamo}
    Acceder a módulo de notificaciones
    Wait Until Element Is Visible    ${CPS_MENSAJE_PAGO_OXXO_RECIBIDO}    timeout=15s
    ${origen}=    Get Text    ${CPS_CAMPO_ORIGEN_NOTIFICACION}
    Should Contain    ${origen}    SICATEL
    Log    CPS recibió notificación de pago desde SICATEL

Verificar datos del pago de enganche OXXO en CPS
    [Arguments]    ${referencia_transaccion}    ${monto}    ${referencia_prestamo}
    ${canal}=    Get Text    ${CPS_CAMPO_CANAL_PAGO}
    Should Contain    ${canal}    OXXO
    ${monto_recibido}=    Get Text    ${CPS_CAMPO_MONTO_PROCESADO}
    Should Contain    ${monto_recibido}    ${monto}
    Log    Datos del pago OXXO verificados en CPS: Monto=${monto}, Canal=OXXO

Registrar pago de enganche OXXO en CPS
    [Arguments]    ${referencia_transaccion}    ${monto}    ${fecha}    ${referencia_prestamo}    ${identificacion}
    Ingresar datos del pago de enganche    ${monto}    ${referencia_prestamo}    ${identificacion}
    Procesar pago de enganche
    Verificar pago procesado exitosamente
    Log    Pago de enganche desde OXXO registrado en CPS
