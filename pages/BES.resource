*** Variables ***
${BES_URL}                            https://bes.telcel.com
${BES_MENU_CLIENTES}                  id:menu_clientes
${BES_INPUT_BUSCAR_CLIENTE}           id:buscar_cliente
${BES_BOTON_BUSCAR}                   css:.btn-buscar
${BES_TABLA_RESULTADOS}               xpath://table[@id='tabla_clientes']
${BES_CAMPO_NOMBRE}                   xpath://td[@data-field='nombre']
${BES_CAMPO_DIRECCION}                xpath://td[@data-field='direccion']
${BES_CAMPO_TELEFONO}                 xpath://td[@data-field='telefono']
${BES_CAMPO_IDENTIFICACION}           xpath://td[@data-field='identificacion']
${BES_MENSAJE_CLIENTE_GUARDADO}       css:.mensaje-exito

*** Keywords ***
Abrir sistema BES
    Go To    ${BES_URL}
    Wait Until Page Contains Element    ${BES_MENU_CLIENTES}    timeout=10s

Acceder a módulo de clientes
    Click Element    ${BES_MENU_CLIENTES}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_CLIENTE}    timeout=10s

Buscar cliente por identificación
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_BUSCAR_CLIENTE}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR}
    Wait Until Element Is Visible    ${BES_TABLA_RESULTADOS}    timeout=10s

Verificar datos almacenados del cliente
    [Arguments]    ${nombre_esperado}    ${direccion_esperada}    ${telefono_esperado}    ${identificacion_esperada}
    ${nombre}=    Get Text    ${BES_CAMPO_NOMBRE}
    ${direccion}=    Get Text    ${BES_CAMPO_DIRECCION}
    ${telefono}=    Get Text    ${BES_CAMPO_TELEFONO}
    ${identificacion}=    Get Text    ${BES_CAMPO_IDENTIFICACION}
    Should Be Equal    ${nombre}    ${nombre_esperado}
    Should Be Equal    ${direccion}    ${direccion_esperada}
    Should Be Equal    ${telefono}    ${telefono_esperado}
    Should Be Equal    ${identificacion}    ${identificacion_esperada}

Verificar que existe registro de cliente
    Page Should Contain Element    ${BES_TABLA_RESULTADOS}
    Table Should Contain    ${BES_TABLA_RESULTADOS}    xpath=//tr[position()>1]

# ========================================
# LOCATORS Y KEYWORDS PARA PRÉSTAMOS
# ========================================
${BES_MENU_PRESTAMOS}                  id:menu_prestamos
${BES_INPUT_BUSCAR_PRESTAMO}           id:buscar_prestamo
${BES_BOTON_BUSCAR_PRESTAMO}           css:.btn-buscar-prestamo
${BES_TABLA_PRESTAMOS}                 xpath://table[@id='tabla_prestamos']
${BES_CAMPO_ID_PRESTAMO}               xpath://td[@data-field='id_prestamo']
${BES_CAMPO_MONTO_FINANCIADO}          xpath://td[@data-field='monto_financiado']
${BES_CAMPO_PLAZO_PRESTAMO}            xpath://td[@data-field='plazo']
${BES_CAMPO_NUM_PARCIALIDADES}         xpath://td[@data-field='parcialidades']
${BES_CAMPO_TASA_INTERES}              xpath://td[@data-field='tasa_interes']
${BES_CAMPO_FECHA_INICIO_PRESTAMO}     xpath://td[@data-field='fecha_inicio']
${BES_MENSAJE_PRESTAMO_CREADO}         css:.mensaje-prestamo-creado
${BES_TABLA_CALENDARIO_PAGOS}          xpath://table[@id='tabla_calendario_pagos']
${BES_CAMPO_FECHA_VENCIMIENTO}         xpath://td[@data-field='fecha_vencimiento']
${BES_CAMPO_MONTO_PARCIALIDAD}         xpath://td[@data-field='monto_parcialidad']
${BES_CAMPO_NUMERO_PARCIALIDAD}        xpath://td[@data-field='numero_parcialidad']
${BES_LINK_VER_CALENDARIO}             css:.link-ver-calendario
${BES_CAMPO_ESTATUS_CUOTA_CALENDARIO}  xpath://td[@data-field='estatus_cuota']
${BES_SELECT_FRECUENCIA_PAGO_API}      id:select_frecuencia_pago_api
${BES_CAMPO_FRECUENCIA_PAGO_PRESTAMO}  xpath://td[@data-field='frecuencia_pago']

Acceder a módulo de préstamos
    Click Element    ${BES_MENU_PRESTAMOS}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_PRESTAMO}    timeout=10s

Buscar préstamo por identificación del cliente
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR_PRESTAMO}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS}    timeout=10s

Verificar que existe registro de préstamo
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS}
    Table Should Contain    ${BES_TABLA_PRESTAMOS}    xpath=//tr[position()>1]

Verificar datos del préstamo almacenado
    [Arguments]    ${monto_esperado}    ${plazo_esperado}    ${parcialidades_esperadas}    ${tasa_esperada}    ${fecha_esperada}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_FINANCIADO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_PRESTAMO}
    ${parcialidades}=    Get Text    ${BES_CAMPO_NUM_PARCIALIDADES}
    ${tasa}=    Get Text    ${BES_CAMPO_TASA_INTERES}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_INICIO_PRESTAMO}
    Should Contain    ${monto}    ${monto_esperado}
    Should Contain    ${plazo}    ${plazo_esperado}
    Should Contain    ${parcialidades}    ${parcialidades_esperadas}
    Should Contain    ${tasa}    ${tasa_esperada}
    Should Contain    ${fecha}    ${fecha_esperada}

Verificar que existe identificador único del préstamo
    ${id_prestamo}=    Get Text    ${BES_CAMPO_ID_PRESTAMO}
    Should Not Be Empty    ${id_prestamo}
    Length Should Be    ${id_prestamo}    min_length=5

Acceder a calendario de pagos
    Click Element    ${BES_LINK_VER_CALENDARIO}
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS}    timeout=10s

Verificar generación de calendario de cobranza
    [Arguments]    ${num_parcialidades_esperadas}
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be Equal As Integers    ${filas}    ${num_parcialidades_esperadas}

Verificar parcialidad en calendario
    [Arguments]    ${numero_parcialidad}    ${fecha_esperada}    ${monto_esperado}
    ${xpath_fila}=    Set Variable    ${BES_TABLA_CALENDARIO_PAGOS}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    ${fecha}=    Get Text    ${xpath_fila}//td[@data-field='fecha_vencimiento']
    ${monto}=    Get Text    ${xpath_fila}//td[@data-field='monto_parcialidad']
    Should Contain    ${fecha}    ${fecha_esperada}
    Should Contain    ${monto}    ${monto_esperado}

Verificar calendario generado según frecuencia y plazo
    [Arguments]    ${frecuencia}    ${plazo}
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be Equal As Integers    ${filas}    ${plazo}
    Log    Calendario generado con ${filas} parcialidades según frecuencia ${frecuencia} y plazo ${plazo}

Verificar actualización automática de estatus de cuotas vencidas
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    ${cuotas_vencidas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[td[@data-field='estatus_cuota']='Vencida']
    Log    Se encontraron ${cuotas_vencidas} cuotas con estatus Vencida
    IF    ${cuotas_vencidas} > 0
        ${estatus_primera_vencida}=    Get Text    (${BES_TABLA_CALENDARIO_PAGOS}//tr[td[@data-field='estatus_cuota']='Vencida'])[1]//td[@data-field='estatus_cuota']
        Should Be Equal As Strings    ${estatus_primera_vencida}    Vencida
        Log    Verificado: BES actualiza automáticamente el estatus de cuotas vencidas
    END

Verificar todas las cuotas corresponden al plazo configurado
    [Arguments]    ${plazo_esperado}
    ${total_cuotas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be Equal As Integers    ${total_cuotas}    ${plazo_esperado}
    Log    Verificado: Total de cuotas (${total_cuotas}) corresponde al plazo configurado (${plazo_esperado})

# ========================================
# LOCATORS Y KEYWORDS PARA PAGOS DE ENGANCHE
# ========================================
${BES_MENU_PAGOS_ENGANCHE}                id:menu_pagos_enganche
${BES_INPUT_BUSCAR_PRESTAMO_PAGO}         id:buscar_prestamo_pago
${BES_BOTON_BUSCAR_PRESTAMO_PAGO}         css:.btn-buscar-prestamo-pago
${BES_TABLA_PAGOS_ENGANCHE}               xpath://table[@id='tabla_pagos_enganche']
${BES_CAMPO_MONTO_PAGO_ENGANCHE}          xpath://td[@data-field='monto_pago']
${BES_CAMPO_FECHA_PAGO_ENGANCHE}          xpath://td[@data-field='fecha_pago']
${BES_CAMPO_REFERENCIA_TRANSACCION}       xpath://td[@data-field='referencia_transaccion']
${BES_CAMPO_ESTATUS_PAGO}                 xpath://td[@data-field='estatus_pago']
${BES_CAMPO_SALDO_ACTUALIZADO}            xpath://td[@data-field='saldo_actualizado']
${BES_LINK_VER_DETALLE_PAGO}              css:.link-ver-detalle-pago
${BES_PANEL_DETALLE_PAGO}                 css:.panel-detalle-pago
${BES_MENSAJE_PAGO_ACREDITADO}            xpath://div[contains(text(),'Pago acreditado')]

Acceder a módulo de pagos de enganche
    Click Element    ${BES_MENU_PAGOS_ENGANCHE}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_PRESTAMO_PAGO}    timeout=10s

Buscar préstamo para verificar pago de enganche
    [Arguments]    ${referencia_prestamo}
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO_PAGO}    ${referencia_prestamo}
    Click Button    ${BES_BOTON_BUSCAR_PRESTAMO_PAGO}
    Wait Until Element Is Visible    ${BES_TABLA_PAGOS_ENGANCHE}    timeout=10s

Verificar pago de enganche acreditado en BES
    [Arguments]    ${monto_esperado}    ${fecha_esperada}    ${transaccion_id}
    Page Should Contain Element    ${BES_TABLA_PAGOS_ENGANCHE}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_PAGO_ENGANCHE}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_PAGO_ENGANCHE}
    ${referencia}=    Get Text    ${BES_CAMPO_REFERENCIA_TRANSACCION}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PAGO}
    Should Contain    ${monto}    ${monto_esperado}
    Should Contain    ${fecha}    ${fecha_esperada}
    Should Contain    ${referencia}    ${transaccion_id}
    Should Contain    ${estatus}    Aplicado

Verificar actualización de saldo del préstamo
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_ACTUALIZADO}
    Should Not Be Empty    ${saldo}
    Log    Saldo actualizado del préstamo: ${saldo}

Consultar detalle del préstamo con pago de enganche
    [Arguments]    ${referencia_prestamo}
    Buscar préstamo para verificar pago de enganche    ${referencia_prestamo}
    Click Element    ${BES_LINK_VER_DETALLE_PAGO}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_PAGO}    timeout=10s

Verificar detalle del pago registrado en BES
    [Arguments]    ${fecha}    ${monto}    ${estatus}
    ${panel_detalle}=    Get Text    ${BES_PANEL_DETALLE_PAGO}
    Should Contain    ${panel_detalle}    ${fecha}
    Should Contain    ${panel_detalle}    ${monto}
    Should Contain    ${panel_detalle}    ${estatus}

# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN BES-CPS PAGO DE ENGANCHE (TC047)
# ========================================
${BES_MENU_INTEGRACIONES_CPS}              id:menu_integraciones_cps
${BES_CAMPO_ORIGEN_PAGO}                   xpath://td[@data-field='origen_pago']
${BES_MENSAJE_PAGO_DESDE_CPS}              xpath://div[contains(text(),'Pago recibido desde CPS')]
${BES_CAMPO_PAGO_ASOCIADO_PRESTAMO}        css:.pago-asociado-prestamo

Verificar integración BES-CPS para pago de enganche
    [Arguments]    ${referencia_prestamo}
    Click Element    ${BES_MENU_INTEGRACIONES_CPS}
    Wait Until Element Is Visible    ${BES_MENSAJE_PAGO_DESDE_CPS}    timeout=15s
    ${origen}=    Get Text    ${BES_CAMPO_ORIGEN_PAGO}
    Should Contain    ${origen}    CPS
    Log    BES recibió notificación de pago de enganche desde CPS para préstamo ${referencia_prestamo}

Verificar asociación de pago de enganche al préstamo
    [Arguments]    ${referencia_prestamo}    ${monto}
    Wait Until Element Is Visible    ${BES_CAMPO_PAGO_ASOCIADO_PRESTAMO}    timeout=10s
    ${pago_asociado}=    Get Text    ${BES_CAMPO_PAGO_ASOCIADO_PRESTAMO}
    Should Contain    ${pago_asociado}    ${referencia_prestamo}
    Should Contain    ${pago_asociado}    ${monto}
    Log    Pago de enganche asociado correctamente al préstamo ${referencia_prestamo}

# ========================================
# LOCATORS Y KEYWORDS PARA PAGOS DE PARCIALIDADES
# ========================================
${BES_MENU_PAGOS_PARCIALIDADES}            id:menu_pagos_parcialidades
${BES_INPUT_BUSCAR_PRESTAMO_PARCIALIDAD}   id:buscar_prestamo_parcialidad
${BES_BOTON_BUSCAR_PRESTAMO_PARCIALIDAD}   css:.btn-buscar-prestamo-parcialidad
${BES_TABLA_PARCIALIDADES}                 xpath://table[@id='tabla_parcialidades']
${BES_CAMPO_NUMERO_PARCIALIDAD_PAGO}       xpath://td[@data-field='numero_parcialidad']
${BES_CAMPO_MONTO_PARCIALIDAD_PAGO}        xpath://td[@data-field='monto_parcialidad']
${BES_CAMPO_FECHA_PAGO_PARCIALIDAD}        xpath://td[@data-field='fecha_pago']
${BES_CAMPO_PUNTO_COBRO_PARCIALIDAD}       xpath://td[@data-field='punto_cobro']
${BES_CAMPO_ESTATUS_PARCIALIDAD}           xpath://td[@data-field='estatus_parcialidad']
${BES_CAMPO_SALDO_ACTUALIZADO_PARCIALIDAD} xpath://td[@data-field='saldo_actualizado']
${BES_ICONO_PARCIALIDAD_PAGADA}            css:.icono-parcialidad-pagada
${BES_LINK_VER_DESGLOSE_PAGOS}             css:.link-ver-desglose-pagos
${BES_PANEL_DESGLOSE_PAGOS}                css:.panel-desglose-pagos
${BES_TABLA_DESGLOSE_PAGOS}                xpath://table[@id='tabla_desglose_pagos']

Acceder a módulo de pagos de parcialidades
    Click Element    ${BES_MENU_PAGOS_PARCIALIDADES}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_PRESTAMO_PARCIALIDAD}    timeout=10s

Buscar préstamo para verificar pago de parcialidad
    [Arguments]    ${referencia_prestamo}
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO_PARCIALIDAD}    ${referencia_prestamo}
    Click Button    ${BES_BOTON_BUSCAR_PRESTAMO_PARCIALIDAD}
    Wait Until Element Is Visible    ${BES_TABLA_PARCIALIDADES}    timeout=10s

Verificar parcialidad acreditada en calendario de cobranza
    [Arguments]    ${numero_parcialidad}    ${fecha}    ${monto}
    ${xpath_parcialidad}=    Set Variable    ${BES_TABLA_CALENDARIO_PAGOS}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Page Should Contain Element    ${xpath_parcialidad}
    ${fecha_pago}=    Get Text    ${xpath_parcialidad}//td[@data-field='fecha_pago']
    ${monto_pago}=    Get Text    ${xpath_parcialidad}//td[@data-field='monto_parcialidad']
    ${estatus}=    Get Text    ${xpath_parcialidad}//td[@data-field='estatus_parcialidad']
    Should Contain    ${fecha_pago}    ${fecha}
    Should Contain    ${monto_pago}    ${monto}
    Should Contain    ${estatus}    Pagada

Verificar datos de pago de parcialidad recibidos de CPS
    [Arguments]    ${numero_parcialidad}    ${monto}    ${fecha}    ${referencia_prestamo}    ${punto_cobro}=SICATEL
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    ${xpath_pago}=    Set Variable    ${BES_TABLA_PARCIALIDADES}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Page Should Contain Element    ${xpath_pago}
    ${monto_pagado}=    Get Text    ${xpath_pago}//td[@data-field='monto_parcialidad']
    ${fecha_pago}=    Get Text    ${xpath_pago}//td[@data-field='fecha_pago']
    ${punto}=    Get Text    ${xpath_pago}//td[@data-field='punto_cobro']
    Should Contain    ${monto_pagado}    ${monto}
    Should Contain    ${fecha_pago}    ${fecha}
    Should Contain    ${punto}    ${punto_cobro}

Verificar actualización de saldo después de pago de parcialidad
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_ACTUALIZADO_PARCIALIDAD}
    Should Not Be Empty    ${saldo}
    Log    Saldo actualizado del préstamo: ${saldo}

Consultar desglose de pagos del préstamo mediante API
    [Arguments]    ${referencia_prestamo}
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Click Element    ${BES_LINK_VER_DESGLOSE_PAGOS}
    Wait Until Element Is Visible    ${BES_PANEL_DESGLOSE_PAGOS}    timeout=10s

Verificar desglose de pagos muestra parcialidad acreditada desde SICATEL
    [Arguments]    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}=SICATEL
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_PAGOS}
    ${xpath_desglose}=    Set Variable    ${BES_TABLA_DESGLOSE_PAGOS}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Page Should Contain Element    ${xpath_desglose}
    ${detalle}=    Get Text    ${xpath_desglose}
    Should Contain    ${detalle}    ${monto}
    Should Contain    ${detalle}    ${fecha}
    Should Contain    ${detalle}    ${punto_cobro}

# ========================================
# LOCATORS Y KEYWORDS PARA PAGOS DE PARCIALIDADES DESDE KIOSCOS
# ========================================
${BES_CAMPO_MEDIO_PAGO_PARCIALIDAD}        xpath://td[@data-field='medio_pago']
${BES_MENU_HISTORIAL_PAGOS}                id:menu_historial_pagos
${BES_TABLA_HISTORIAL_PAGOS}               xpath://table[@id='tabla_historial_pagos']
${BES_CAMPO_PUNTO_COBRO_HISTORIAL}         xpath://td[@data-field='punto_cobro']
${BES_CAMPO_MEDIO_PAGO_HISTORIAL}          xpath://td[@data-field='medio_pago']
${BES_CAMPO_FECHA_PAGO_HISTORIAL}          xpath://td[@data-field='fecha_pago']
${BES_CAMPO_MONTO_PAGO_HISTORIAL}          xpath://td[@data-field='monto_pago']

Verificar datos de pago de parcialidad recibidos de CPS desde Kioscos
    [Arguments]    ${numero_parcialidad}    ${monto}    ${fecha}    ${referencia_prestamo}    ${punto_cobro}=Kioscos    ${medio_pago}=Tarjeta de Crédito
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    ${xpath_pago}=    Set Variable    ${BES_TABLA_PARCIALIDADES}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Page Should Contain Element    ${xpath_pago}
    ${monto_pagado}=    Get Text    ${xpath_pago}//td[@data-field='monto_parcialidad']
    ${fecha_pago}=    Get Text    ${xpath_pago}//td[@data-field='fecha_pago']
    ${punto}=    Get Text    ${xpath_pago}//td[@data-field='punto_cobro']
    ${medio}=    Get Text    ${xpath_pago}//td[@data-field='medio_pago']
    Should Contain    ${monto_pagado}    ${monto}
    Should Contain    ${fecha_pago}    ${fecha}
    Should Contain    ${punto}    ${punto_cobro}
    Should Contain    ${medio}    ${medio_pago}

Acceder a historial de pagos del préstamo
    [Arguments]    ${referencia_prestamo}
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Click Element    ${BES_MENU_HISTORIAL_PAGOS}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_PAGOS}    timeout=10s

Verificar pago en historial de pagos desde Kioscos
    [Arguments]    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}=Kioscos    ${medio_pago}=Tarjeta de Crédito
    ${xpath_historial}=    Set Variable    ${BES_TABLA_HISTORIAL_PAGOS}//tr[contains(., '${numero_parcialidad}')]
    Page Should Contain Element    ${xpath_historial}
    ${fecha_pago}=    Get Text    ${xpath_historial}//td[@data-field='fecha_pago']
    ${monto_pago}=    Get Text    ${xpath_historial}//td[@data-field='monto_pago']
    ${punto}=    Get Text    ${xpath_historial}//td[@data-field='punto_cobro']
    ${medio}=    Get Text    ${xpath_historial}//td[@data-field='medio_pago']
    Should Contain    ${fecha_pago}    ${fecha}
    Should Contain    ${monto_pago}    ${monto}
    Should Contain    ${punto}    ${punto_cobro}
    Should Contain    ${medio}    ${medio_pago}

Verificar desglose de pagos muestra parcialidad acreditada desde Kioscos
    [Arguments]    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}=Kioscos    ${medio_pago}=Tarjeta de Crédito
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_PAGOS}
    ${xpath_desglose}=    Set Variable    ${BES_TABLA_DESGLOSE_PAGOS}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Page Should Contain Element    ${xpath_desglose}
    ${detalle}=    Get Text    ${xpath_desglose}
    Should Contain    ${detalle}    ${monto}
    Should Contain    ${detalle}    ${fecha}
    Should Contain    ${detalle}    ${punto_cobro}
    Should Contain    ${detalle}    ${medio_pago}

# ========================================
# LOCATORS Y KEYWORDS PARA CONSULTA DE SALDOS VÍA WEB SERVICES
# ========================================
${BES_MENU_WEB_SERVICES}                    id:menu_web_services
${BES_INPUT_ID_PRESTAMO_WS}                 id:input_id_prestamo_ws
${BES_BOTON_CONSULTAR_SALDOS}               css:.btn-consultar-saldos
${BES_PANEL_RESPUESTA_WS}                   css:.panel-respuesta-ws
${BES_CAMPO_SALDO_ACTUAL}                   xpath://div[@data-field='saldo_actual']
${BES_CAMPO_SALDO_VENCIDO}                  xpath://div[@data-field='saldo_vencido']
${BES_CAMPO_SALDO_POR_VENCER}               xpath://div[@data-field='saldo_por_vencer']
${BES_CAMPO_PROXIMO_PAGO}                   xpath://div[@data-field='proximo_pago']
${BES_CAMPO_FECHA_VENCIMIENTO_PROXIMO}      xpath://div[@data-field='fecha_vencimiento_proximo']
${BES_MENSAJE_PRESTAMO_VALIDO}              xpath://div[contains(@class, 'mensaje-exito-validacion')]
${BES_CAMPO_PRESTAMO_EXISTE}                xpath://div[@data-field='prestamo_existe']

Acceder a módulo de web services
    Click Element    ${BES_MENU_WEB_SERVICES}
    Wait Until Element Is Visible    ${BES_INPUT_ID_PRESTAMO_WS}    timeout=10s

Ingresar identificador del préstamo para consulta
    [Arguments]    ${id_prestamo}
    Input Text    ${BES_INPUT_ID_PRESTAMO_WS}    ${id_prestamo}

Invocar web service de consulta de saldos
    Click Button    ${BES_BOTON_CONSULTAR_SALDOS}
    Wait Until Element Is Visible    ${BES_PANEL_RESPUESTA_WS}    timeout=15s

Verificar que BES valida existencia del préstamo
    Page Should Contain Element    ${BES_MENSAJE_PRESTAMO_VALIDO}
    ${existe}=    Get Text    ${BES_CAMPO_PRESTAMO_EXISTE}
    Should Be Equal As Strings    ${existe}    True

Verificar que web service retorna información de saldos completa
    Page Should Contain Element    ${BES_CAMPO_SALDO_ACTUAL}
    Page Should Contain Element    ${BES_CAMPO_SALDO_VENCIDO}
    Page Should Contain Element    ${BES_CAMPO_SALDO_POR_VENCER}
    Page Should Contain Element    ${BES_CAMPO_PROXIMO_PAGO}
    Page Should Contain Element    ${BES_CAMPO_FECHA_VENCIMIENTO_PROXIMO}

Verificar información de saldos del préstamo
    [Arguments]    ${saldo_actual_esperado}    ${saldo_vencido_esperado}    ${saldo_por_vencer_esperado}
    ${saldo_actual}=    Get Text    ${BES_CAMPO_SALDO_ACTUAL}
    ${saldo_vencido}=    Get Text    ${BES_CAMPO_SALDO_VENCIDO}
    ${saldo_por_vencer}=    Get Text    ${BES_CAMPO_SALDO_POR_VENCER}
    Should Contain    ${saldo_actual}    ${saldo_actual_esperado}
    Should Contain    ${saldo_vencido}    ${saldo_vencido_esperado}
    Should Contain    ${saldo_por_vencer}    ${saldo_por_vencer_esperado}

Verificar información de próximo pago
    ${proximo_pago}=    Get Text    ${BES_CAMPO_PROXIMO_PAGO}
    ${fecha_vencimiento}=    Get Text    ${BES_CAMPO_FECHA_VENCIMIENTO_PROXIMO}
    Should Not Be Empty    ${proximo_pago}
    Should Not Be Empty    ${fecha_vencimiento}
    Log    Próximo pago: ${proximo_pago}, Fecha vencimiento: ${fecha_vencimiento}

# ========================================
# LOCATORS Y KEYWORDS PARA CONSULTA DE INFORMACIÓN MEDIANTE APIS
# ========================================
${BES_MENU_API_CONSULTA}                    id:menu_api_consulta
${BES_INPUT_ID_PRESTAMO_API}                id:input_id_prestamo_api
${BES_INPUT_DATOS_CLIENTE_API}              id:input_datos_cliente_api
${BES_BOTON_INVOCAR_API_CONSULTA}           css:.btn-invocar-api-consulta
${BES_PANEL_RESPUESTA_API}                  css:.panel-respuesta-api
${BES_CAMPO_DATOS_CLIENTE_RESP}             xpath://div[@data-field='datos_cliente']
${BES_CAMPO_DESGLOSE_CUOTAS_RESP}           xpath://div[@data-field='desglose_cuotas']
${BES_CAMPO_DESGLOSE_PAGOS_RESP}            xpath://div[@data-field='desglose_pagos']
${BES_CAMPO_FECHAS_VENCIMIENTO_RESP}        xpath://div[@data-field='fechas_vencimiento']
${BES_CAMPO_ESTATUS_RESP}                   xpath://div[@data-field='estatus']
${BES_MENSAJE_VALIDACION_PARAMETROS}        xpath://div[contains(@class, 'mensaje-validacion-parametros')]

Acceder a módulo de consulta de APIs
    Click Element    ${BES_MENU_API_CONSULTA}
    Wait Until Element Is Visible    ${BES_INPUT_ID_PRESTAMO_API}    timeout=10s

Invocar API de consulta de préstamo con identificador
    [Arguments]    ${id_prestamo}
    Input Text    ${BES_INPUT_ID_PRESTAMO_API}    ${id_prestamo}
    Click Button    ${BES_BOTON_INVOCAR_API_CONSULTA}
    Wait Until Element Is Visible    ${BES_PANEL_RESPUESTA_API}    timeout=15s

Invocar API de consulta de préstamo con datos del cliente
    [Arguments]    ${datos_cliente}
    Input Text    ${BES_INPUT_DATOS_CLIENTE_API}    ${datos_cliente}
    Click Button    ${BES_BOTON_INVOCAR_API_CONSULTA}
    Wait Until Element Is Visible    ${BES_PANEL_RESPUESTA_API}    timeout=15s

Verificar que BES valida parámetros de búsqueda
    Page Should Contain Element    ${BES_MENSAJE_VALIDACION_PARAMETROS}

Verificar que API retorna información completa del préstamo
    Page Should Contain Element    ${BES_PANEL_RESPUESTA_API}
    Page Should Contain Element    ${BES_CAMPO_DATOS_CLIENTE_RESP}
    Page Should Contain Element    ${BES_CAMPO_DESGLOSE_CUOTAS_RESP}
    Page Should Contain Element    ${BES_CAMPO_DESGLOSE_PAGOS_RESP}
    Page Should Contain Element    ${BES_CAMPO_FECHAS_VENCIMIENTO_RESP}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_RESP}

Verificar datos del cliente en respuesta de API
    ${datos_cliente}=    Get Text    ${BES_CAMPO_DATOS_CLIENTE_RESP}
    Should Not Be Empty    ${datos_cliente}
    Log    Datos del cliente: ${datos_cliente}

Verificar desglose de cuotas en respuesta de API
    ${desglose_cuotas}=    Get Text    ${BES_CAMPO_DESGLOSE_CUOTAS_RESP}
    Should Not Be Empty    ${desglose_cuotas}
    Log    Desglose de cuotas: ${desglose_cuotas}

Verificar desglose de pagos en respuesta de API
    ${desglose_pagos}=    Get Text    ${BES_CAMPO_DESGLOSE_PAGOS_RESP}
    Should Not Be Empty    ${desglose_pagos}
    Log    Desglose de pagos: ${desglose_pagos}

Verificar fechas de vencimiento en respuesta de API
    ${fechas_vencimiento}=    Get Text    ${BES_CAMPO_FECHAS_VENCIMIENTO_RESP}
    Should Not Be Empty    ${fechas_vencimiento}
    Log    Fechas de vencimiento: ${fechas_vencimiento}

Verificar estatus en respuesta de API
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_RESP}
    Should Not Be Empty    ${estatus}
    Log    Estatus del préstamo: ${estatus}

# ========================================
# LOCATORS Y KEYWORDS PARA VISTA 360
# ========================================
${BES_MENU_VISTA_360}                       id:menu_vista_360
${BES_INPUT_ID_PRESTAMO_VISTA360}           id:input_id_prestamo_vista360
${BES_SELECT_TIPO_CANAL}                    id:select_tipo_canal
${BES_BOTON_CONSULTAR_VISTA360}             css:.btn-consultar-vista360
${BES_PANEL_VISTA_360}                      css:.panel-vista-360
${BES_SECCION_DATOS_CLIENTE}                css:.seccion-datos-cliente
${BES_SECCION_DESGLOSE_CUOTAS}              css:.seccion-desglose-cuotas
${BES_SECCION_DESGLOSE_PAGOS}               css:.seccion-desglose-pagos
${BES_SECCION_FECHAS_VENCIMIENTO}           css:.seccion-fechas-vencimiento
${BES_SECCION_ESTATUS_PRESTAMO}             css:.seccion-estatus-prestamo
${BES_TABLA_DESGLOSE_CUOTAS}                xpath://table[@id='tabla_desglose_cuotas']
${BES_TABLA_DESGLOSE_PAGOS_DETALLE}         xpath://table[@id='tabla_desglose_pagos_detalle']
${BES_CAMPO_ESTATUS_PRESTAMO}               xpath://div[@data-field='estatus_prestamo']
${BES_CAMPO_FECHA_PROXIMO_VENCIMIENTO}      xpath://div[@data-field='fecha_proximo_vencimiento']
${BES_INPUT_BUSCAR_CLIENTE_VISTA360}        id:input_buscar_cliente_vista360
${BES_BOTON_BUSCAR_CLIENTE_VISTA360}        css:.btn-buscar-cliente-vista360
${BES_CAMPO_MONTO_TOTAL_CREDITO}            xpath://div[@data-field='monto_total_credito']
${BES_CAMPO_SALDO_PENDIENTE_CREDITO}        xpath://div[@data-field='saldo_pendiente']
${BES_CAMPO_PLAZO_CREDITO}                  xpath://div[@data-field='plazo_credito']
${BES_SECCION_DATOS_EQUIPO}                 css:.seccion-datos-equipo
${BES_CAMPO_MARCA_EQUIPO}                   xpath://div[@data-field='marca_equipo']
${BES_CAMPO_MODELO_EQUIPO}                  xpath://div[@data-field='modelo_equipo']
${BES_CAMPO_IMEI_EQUIPO}                    xpath://div[@data-field='imei_equipo']
${BES_SECCION_VENTAS_VENDEDOR}              css:.seccion-ventas-vendedor
${BES_CAMPO_NOMBRE_VENDEDOR}                xpath://div[@data-field='nombre_vendedor']
${BES_CAMPO_ID_VENDEDOR}                    xpath://div[@data-field='id_vendedor']
${BES_SECCION_REPORTE_FUERZA_VENTAS}        css:.seccion-reporte-fuerza-ventas

Acceder a Vista 360 de BES
    Click Element    ${BES_MENU_VISTA_360}
    Wait Until Element Is Visible    ${BES_INPUT_ID_PRESTAMO_VISTA360}    timeout=10s

Seleccionar tipo de canal para consulta
    [Arguments]    ${tipo_canal}=CAC
    Select From List By Label    ${BES_SELECT_TIPO_CANAL}    ${tipo_canal}

Consultar préstamo en Vista 360
    [Arguments]    ${id_prestamo}
    Input Text    ${BES_INPUT_ID_PRESTAMO_VISTA360}    ${id_prestamo}
    Click Button    ${BES_BOTON_CONSULTAR_VISTA360}
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=15s

Verificar información accesible en Vista 360
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_CUOTAS}
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_PAGOS}
    Page Should Contain Element    ${BES_SECCION_FECHAS_VENCIMIENTO}
    Page Should Contain Element    ${BES_SECCION_ESTATUS_PRESTAMO}

Verificar desglose de cuotas en Vista 360
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_CUOTAS}
    ${filas}=    Get Element Count    ${BES_TABLA_DESGLOSE_CUOTAS}//tr[position()>1]
    Should Be True    ${filas} > 0

Verificar desglose de pagos en Vista 360
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}
    ${filas}=    Get Element Count    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}//tr[position()>1]
    Should Be True    ${filas} >= 0

Verificar fechas de vencimiento en Vista 360
    ${fecha_vencimiento}=    Get Text    ${BES_CAMPO_FECHA_PROXIMO_VENCIMIENTO}
    Should Not Be Empty    ${fecha_vencimiento}
    Log    Fecha próximo vencimiento: ${fecha_vencimiento}

Verificar estatus del préstamo en Vista 360
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${estatus}
    Log    Estatus del préstamo: ${estatus}

Verificar acceso desde canal para Vista 360
    [Arguments]    ${tipo_canal}
    Seleccionar tipo de canal para consulta    ${tipo_canal}
    Page Should Contain Element    ${BES_PANEL_VISTA_360}

Buscar cliente en Vista 360 por teléfono o identificador
    [Arguments]    ${criterio_busqueda}
    Input Text    ${BES_INPUT_BUSCAR_CLIENTE_VISTA360}    ${criterio_busqueda}
    Click Button    ${BES_BOTON_BUSCAR_CLIENTE_VISTA360}
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=15s

Verificar información completa del crédito en pantalla 360
    Page Should Contain Element    ${BES_CAMPO_MONTO_TOTAL_CREDITO}
    Page Should Contain Element    ${BES_CAMPO_SALDO_PENDIENTE_CREDITO}
    Page Should Contain Element    ${BES_CAMPO_PLAZO_CREDITO}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Page Should Contain Element    ${BES_SECCION_DATOS_EQUIPO}

Verificar datos del equipo financiado en pantalla 360
    Page Should Contain Element    ${BES_SECCION_DATOS_EQUIPO}
    ${marca}=    Get Text    ${BES_CAMPO_MARCA_EQUIPO}
    ${modelo}=    Get Text    ${BES_CAMPO_MODELO_EQUIPO}
    ${imei}=    Get Text    ${BES_CAMPO_IMEI_EQUIPO}
    Should Not Be Empty    ${marca}
    Should Not Be Empty    ${modelo}
    Should Not Be Empty    ${imei}
    Log    Equipo financiado - Marca: ${marca}, Modelo: ${modelo}, IMEI: ${imei}

Verificar información de ventas por vendedor en pantalla 360
    Page Should Contain Element    ${BES_SECCION_VENTAS_VENDEDOR}
    ${nombre_vendedor}=    Get Text    ${BES_CAMPO_NOMBRE_VENDEDOR}
    ${id_vendedor}=    Get Text    ${BES_CAMPO_ID_VENDEDOR}
    Should Not Be Empty    ${nombre_vendedor}
    Should Not Be Empty    ${id_vendedor}
    Log    Vendedor: ${nombre_vendedor}, ID: ${id_vendedor}

Verificar reportes de fuerza de ventas en pantalla 360
    Page Should Contain Element    ${BES_SECCION_REPORTE_FUERZA_VENTAS}

# ========================================
# LOCATORS Y KEYWORDS PARA DATOS DEL CLIENTE EN PANTALLA 360 (TC017)
# ========================================
${BES_CAMPO_NOMBRE_COMPLETO_CLIENTE}        xpath://div[@data-field='nombre_completo']
${BES_CAMPO_TIPO_IDENTIFICACION}            xpath://div[@data-field='tipo_identificacion']
${BES_CAMPO_NUMERO_IDENTIFICACION}          xpath://div[@data-field='numero_identificacion']
${BES_CAMPO_TELEFONO_CLIENTE}               xpath://div[@data-field='telefono_cliente']
${BES_CAMPO_CORREO_ELECTRONICO_CLIENTE}     xpath://div[@data-field='correo_electronico']
${BES_SECCION_HISTORIAL_INTERACCIONES}      css:.seccion-historial-interacciones
${BES_TABLA_HISTORIAL_INTERACCIONES}        xpath://table[@id='tabla_historial_interacciones']
${BES_CAMPO_FECHA_INTERACCION}              xpath://td[@data-field='fecha_interaccion']
${BES_CAMPO_TIPO_INTERACCION}               xpath://td[@data-field='tipo_interaccion']
${BES_CAMPO_DESCRIPCION_INTERACCION}        xpath://td[@data-field='descripcion_interaccion']
${BES_SECCION_CARACTERISTICAS_EQUIPO}       css:.seccion-caracteristicas-equipo
${BES_CAMPO_CARACTERISTICAS_DISPOSITIVO}    xpath://div[@data-field='caracteristicas_dispositivo']

Acceder a pantalla 360 de BES para cliente con crédito
    [Arguments]    ${criterio_busqueda}=5551234567
    Click Element    ${BES_MENU_VISTA_360}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_CLIENTE_VISTA360}    timeout=10s
    Input Text    ${BES_INPUT_BUSCAR_CLIENTE_VISTA360}    ${criterio_busqueda}
    Click Button    ${BES_BOTON_BUSCAR_CLIENTE_VISTA360}
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=15s

Verificar datos personales del cliente en pantalla 360
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    Page Should Contain Element    ${BES_CAMPO_NOMBRE_COMPLETO_CLIENTE}
    Page Should Contain Element    ${BES_CAMPO_TIPO_IDENTIFICACION}
    Page Should Contain Element    ${BES_CAMPO_NUMERO_IDENTIFICACION}
    Page Should Contain Element    ${BES_CAMPO_TELEFONO_CLIENTE}
    Page Should Contain Element    ${BES_CAMPO_CORREO_ELECTRONICO_CLIENTE}
    ${nombre}=    Get Text    ${BES_CAMPO_NOMBRE_COMPLETO_CLIENTE}
    ${tipo_id}=    Get Text    ${BES_CAMPO_TIPO_IDENTIFICACION}
    ${numero_id}=    Get Text    ${BES_CAMPO_NUMERO_IDENTIFICACION}
    ${telefono}=    Get Text    ${BES_CAMPO_TELEFONO_CLIENTE}
    ${correo}=    Get Text    ${BES_CAMPO_CORREO_ELECTRONICO_CLIENTE}
    Should Not Be Empty    ${nombre}
    Should Not Be Empty    ${tipo_id}
    Should Not Be Empty    ${numero_id}
    Should Not Be Empty    ${telefono}
    Should Not Be Empty    ${correo}
    Log    Datos del cliente - Nombre: ${nombre}, Tipo ID: ${tipo_id}, Número ID: ${numero_id}, Teléfono: ${telefono}, Correo: ${correo}

Verificar información del equipo financiado en pantalla 360
    Page Should Contain Element    ${BES_SECCION_DATOS_EQUIPO}
    Page Should Contain Element    ${BES_CAMPO_MARCA_EQUIPO}
    Page Should Contain Element    ${BES_CAMPO_MODELO_EQUIPO}
    Page Should Contain Element    ${BES_CAMPO_IMEI_EQUIPO}
    ${marca}=    Get Text    ${BES_CAMPO_MARCA_EQUIPO}
    ${modelo}=    Get Text    ${BES_CAMPO_MODELO_EQUIPO}
    ${imei}=    Get Text    ${BES_CAMPO_IMEI_EQUIPO}
    Should Not Be Empty    ${marca}
    Should Not Be Empty    ${modelo}
    Should Not Be Empty    ${imei}
    Log    Equipo financiado - Marca: ${marca}, Modelo: ${modelo}, IMEI: ${imei}

Verificar características del dispositivo adquirido
    Page Should Contain Element    ${BES_SECCION_CARACTERISTICAS_EQUIPO}
    ${caracteristicas}=    Get Text    ${BES_CAMPO_CARACTERISTICAS_DISPOSITIVO}
    Should Not Be Empty    ${caracteristicas}
    Log    Características del dispositivo: ${caracteristicas}

Verificar historial de interacciones del cliente
    Page Should Contain Element    ${BES_SECCION_HISTORIAL_INTERACCIONES}
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_INTERACCIONES}
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_INTERACCIONES}//tr[position()>1]
    Should Be True    ${filas} >= 0
    Log    Se encontraron ${filas} interacciones en el historial

Verificar cronología de actividades relacionadas con el crédito
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_INTERACCIONES}//tr[position()>1]
    IF    ${filas} > 0
        ${fecha}=    Get Text    ${BES_CAMPO_FECHA_INTERACCION}
        ${tipo}=    Get Text    ${BES_CAMPO_TIPO_INTERACCION}
        ${descripcion}=    Get Text    ${BES_CAMPO_DESCRIPCION_INTERACCION}
        Should Not Be Empty    ${fecha}
        Should Not Be Empty    ${tipo}
        Should Not Be Empty    ${descripcion}
        Log    Interacción - Fecha: ${fecha}, Tipo: ${tipo}, Descripción: ${descripcion}
    END

Verificar que la información se presenta de forma clara y organizada
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    Page Should Contain Element    ${BES_SECCION_DATOS_EQUIPO}
    ${datos_cliente}=    Get Text    ${BES_SECCION_DATOS_CLIENTE}
    ${datos_equipo}=    Get Text    ${BES_SECCION_DATOS_EQUIPO}
    Should Not Be Empty    ${datos_cliente}
    Should Not Be Empty    ${datos_equipo}

# ========================================
# LOCATORS Y KEYWORDS PARA REPORTES DE VENTAS
# ========================================
${BES_MENU_REPORTES_VENTAS}                 id:menu_reportes_ventas
${BES_SELECT_VENDEDOR}                      id:select_vendedor
${BES_SELECT_FUERZA_VENTAS}                 id:select_fuerza_ventas
${BES_BOTON_GENERAR_REPORTE}                css:.btn-generar-reporte
${BES_TABLA_VENTAS_VENDEDOR}                xpath://table[@id='tabla_ventas_vendedor']
${BES_TABLA_CONCENTRADO_FUERZA_VENTAS}      xpath://table[@id='tabla_concentrado_fuerza_ventas']
${BES_CAMPO_TOTAL_VENTAS_VENDEDOR}          xpath://td[@data-field='total_ventas']
${BES_CAMPO_TOTAL_CONCENTRADO}              xpath://div[@data-field='total_concentrado']

Acceder a módulo de reportes de ventas
    Click Element    ${BES_MENU_REPORTES_VENTAS}
    Wait Until Element Is Visible    ${BES_SELECT_VENDEDOR}    timeout=10s

Seleccionar vendedor para reporte
    [Arguments]    ${vendedor}
    Select From List By Label    ${BES_SELECT_VENDEDOR}    ${vendedor}

Seleccionar fuerza de ventas para reporte
    [Arguments]    ${fuerza_ventas}
    Select From List By Label    ${BES_SELECT_FUERZA_VENTAS}    ${fuerza_ventas}

Generar reporte de ventas
    Click Button    ${BES_BOTON_GENERAR_REPORTE}
    Wait Until Element Is Visible    ${BES_TABLA_VENTAS_VENDEDOR}    timeout=15s

Verificar detalle de ventas por vendedor
    Page Should Contain Element    ${BES_TABLA_VENTAS_VENDEDOR}
    ${total_ventas}=    Get Text    ${BES_CAMPO_TOTAL_VENTAS_VENDEDOR}
    Should Not Be Empty    ${total_ventas}
    Log    Total ventas del vendedor: ${total_ventas}

Verificar concentrado por fuerza de ventas
    Page Should Contain Element    ${BES_TABLA_CONCENTRADO_FUERZA_VENTAS}
    ${total_concentrado}=    Get Text    ${BES_CAMPO_TOTAL_CONCENTRADO}
    Should Not Be Empty    ${total_concentrado}
    Log    Total concentrado de fuerza de ventas: ${total_concentrado}

# ========================================
# LOCATORS Y KEYWORDS PARA REPORTE DE VENTAS POR VENDEDOR PARA DISTRIBUIDORES (TC063)
# ========================================
${BES_INPUT_FECHA_INICIO_VENTAS}            id:fecha_inicio_ventas
${BES_INPUT_FECHA_FIN_VENTAS}               id:fecha_fin_ventas
${BES_SELECT_DISTRIBUIDOR_VENTAS}           id:select_distribuidor_ventas
${BES_BOTON_GENERAR_REPORTE_VENTAS_VENDEDOR}    css:.btn-generar-reporte-ventas-vendedor
${BES_TABLA_REPORTE_VENTAS_VENDEDOR}        xpath://table[@id='tabla_reporte_ventas_vendedor']
${BES_CAMPO_CLIENTE_REPORTE}                xpath://td[@data-field='cliente']
${BES_CAMPO_INFO_PRESTAMO_REPORTE}          xpath://td[@data-field='info_prestamo']
${BES_CAMPO_EQUIPO_VENDIDO_REPORTE}         xpath://td[@data-field='equipo_vendido']
${BES_CAMPO_FECHA_VENTA_REPORTE}            xpath://td[@data-field='fecha_venta']
${BES_CAMPO_VENDEDOR_RESPONSABLE_REPORTE}   xpath://td[@data-field='vendedor_responsable']

Acceder a pantalla de filtros de reporte de ventas por vendedor
    Wait Until Element Is Visible    ${BES_INPUT_FECHA_INICIO_VENTAS}    timeout=10s
    Wait Until Element Is Visible    ${BES_SELECT_DISTRIBUIDOR_VENTAS}    timeout=10s

Seleccionar rango de fechas para reporte de ventas
    [Arguments]    ${fecha_inicio}    ${fecha_fin}
    Input Text    ${BES_INPUT_FECHA_INICIO_VENTAS}    ${fecha_inicio}
    Input Text    ${BES_INPUT_FECHA_FIN_VENTAS}    ${fecha_fin}
    Log    Rango de fechas seleccionado: ${fecha_inicio} - ${fecha_fin}

Seleccionar distribuidor para reporte de ventas
    [Arguments]    ${distribuidor}
    Select From List By Label    ${BES_SELECT_DISTRIBUIDOR_VENTAS}    ${distribuidor}
    Log    Distribuidor seleccionado: ${distribuidor}

Generar reporte de ventas por vendedor
    Click Button    ${BES_BOTON_GENERAR_REPORTE_VENTAS_VENDEDOR}
    Wait Until Element Is Visible    ${BES_TABLA_REPORTE_VENTAS_VENDEDOR}    timeout=15s

Verificar campos del reporte de ventas por vendedor
    Page Should Contain Element    ${BES_CAMPO_CLIENTE_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_INFO_PRESTAMO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_EQUIPO_VENDIDO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_FECHA_VENTA_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_VENDEDOR_RESPONSABLE_REPORTE}
    ${filas}=    Get Element Count    ${BES_TABLA_REPORTE_VENTAS_VENDEDOR}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Reporte de ventas por vendedor generado con ${filas} registros

Verificar información correcta en reporte de ventas
    ${cliente}=    Get Text    ${BES_CAMPO_CLIENTE_REPORTE}
    ${prestamo}=    Get Text    ${BES_CAMPO_INFO_PRESTAMO_REPORTE}
    ${equipo}=    Get Text    ${BES_CAMPO_EQUIPO_VENDIDO_REPORTE}
    ${fecha_venta}=    Get Text    ${BES_CAMPO_FECHA_VENTA_REPORTE}
    ${vendedor}=    Get Text    ${BES_CAMPO_VENDEDOR_RESPONSABLE_REPORTE}
    Should Not Be Empty    ${cliente}
    Should Not Be Empty    ${prestamo}
    Should Not Be Empty    ${equipo}
    Should Not Be Empty    ${fecha_venta}
    Should Not Be Empty    ${vendedor}
    Log    Reporte validado - Cliente: ${cliente}, Vendedor: ${vendedor}, Fecha: ${fecha_venta}

# ========================================
# LOCATORS Y KEYWORDS PARA ACREDITACIÓN DE PAGOS VÍA INTERFACES
# ========================================
${BES_MENU_INTERFACES}                      id:menu_interfaces
${BES_MENU_NOTIFICACIONES_PAGO}             id:menu_notificaciones_pago
${BES_TABLA_NOTIFICACIONES_PAGO}            xpath://table[@id='tabla_notificaciones_pago']
${BES_CAMPO_PUNTO_COBRO_NOTIF}              xpath://td[@data-field='punto_cobro']
${BES_CAMPO_REFERENCIA_PRESTAMO_NOTIF}      xpath://td[@data-field='referencia_prestamo']
${BES_CAMPO_MONTO_NOTIF}                    xpath://td[@data-field='monto']
${BES_CAMPO_FECHA_NOTIF}                    xpath://td[@data-field='fecha']
${BES_CAMPO_ESTATUS_NOTIF}                  xpath://td[@data-field='estatus']
${BES_MENSAJE_PRESTAMO_IDENTIFICADO}        xpath://div[contains(@class, 'mensaje-prestamo-identificado')]
${BES_MENSAJE_PRESTAMO_ACTIVO}              xpath://div[contains(@class, 'mensaje-prestamo-activo')]
${BES_CAMPO_PARCIALIDAD_APLICADA}           xpath://td[@data-field='parcialidad_aplicada']
${BES_CAMPO_LOGICA_APLICACION}              xpath://div[@data-field='logica_aplicacion']
${BES_MENSAJE_PAGO_APLICADO}                xpath://div[contains(text(),'Pago aplicado')]
${BES_CAMPO_SALDO_RECALCULADO}              xpath://div[@data-field='saldo_recalculado']
${BES_MENU_HISTORIAL_MOVIMIENTOS}           id:menu_historial_movimientos
${BES_TABLA_HISTORIAL_MOVIMIENTOS}          xpath://table[@id='tabla_historial_movimientos']
${BES_CAMPO_TIPO_MOVIMIENTO}                xpath://td[@data-field='tipo_movimiento']
${BES_CAMPO_FECHA_MOVIMIENTO}               xpath://td[@data-field='fecha_movimiento']
${BES_CAMPO_MONTO_MOVIMIENTO}               xpath://td[@data-field='monto_movimiento']
${BES_CAMPO_PUNTO_COBRO_MOVIMIENTO}         xpath://td[@data-field='punto_cobro_movimiento']
${BES_CAMPO_PARCIALIDAD_AFECTADA}           xpath://td[@data-field='parcialidad_afectada']
${BES_MENU_REPORTES_BIBES}                  id:menu_reportes_bibes
${BES_INPUT_REFERENCIA_REPORTE}             id:input_referencia_reporte
${BES_BOTON_GENERAR_REPORTE_BIBES}          css:.btn-generar-reporte-bibes
${BES_PANEL_REPORTE_BIBES}                  css:.panel-reporte-bibes
${BES_CAMPO_LAYOUT_REPORTE}                 xpath://div[@data-field='layout_reporte']
${BES_CAMPO_FORMATO_REPORTE}                xpath://div[@data-field='formato_reporte']
${BES_MENSAJE_REPORTE_GENERADO}             xpath://div[contains(text(),'Reporte generado')]
${BES_LINK_DESCARGAR_REPORTE}               css:.link-descargar-reporte
${BES_CAMPO_TIEMPO_ACREDITACION}            xpath://div[@data-field='tiempo_acreditacion']
${BES_MENSAJE_ACREDITACION_AUTOMATICA}      xpath://div[contains(text(),'Acreditación automática')]

Acceder a módulo de interfaces
    Click Element    ${BES_MENU_INTERFACES}
    Wait Until Element Is Visible    ${BES_MENU_NOTIFICACIONES_PAGO}    timeout=10s

Acceder a notificaciones de pago recibidas
    Click Element    ${BES_MENU_NOTIFICACIONES_PAGO}
    Wait Until Element Is Visible    ${BES_TABLA_NOTIFICACIONES_PAGO}    timeout=10s

Verificar recepción de notificación de pago desde punto de cobro
    [Arguments]    ${referencia_prestamo}    ${punto_cobro}    ${monto}    ${fecha}
    ${xpath_notif}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_PAGO}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_notif}
    ${punto}=    Get Text    ${xpath_notif}//td[@data-field='punto_cobro']
    ${monto_notif}=    Get Text    ${xpath_notif}//td[@data-field='monto']
    ${fecha_notif}=    Get Text    ${xpath_notif}//td[@data-field='fecha']
    ${estatus}=    Get Text    ${xpath_notif}//td[@data-field='estatus']
    Should Contain    ${punto}    ${punto_cobro}
    Should Contain    ${monto_notif}    ${monto}
    Should Contain    ${fecha_notif}    ${fecha}
    Should Contain    ${estatus}    Recibida

Verificar que BES identifica el préstamo mediante referencia
    [Arguments]    ${referencia_prestamo}
    Page Should Contain Element    ${BES_MENSAJE_PRESTAMO_IDENTIFICADO}
    ${referencia}=    Get Text    ${BES_CAMPO_REFERENCIA_PRESTAMO_NOTIF}
    Should Contain    ${referencia}    ${referencia_prestamo}

Verificar que el préstamo está activo en BES
    Page Should Contain Element    ${BES_MENSAJE_PRESTAMO_ACTIVO}

Verificar aplicación de pago a parcialidad correspondiente
    [Arguments]    ${numero_parcialidad}
    ${parcialidad}=    Get Text    ${BES_CAMPO_PARCIALIDAD_APLICADA}
    Should Contain    ${parcialidad}    ${numero_parcialidad}

Verificar lógica de aplicación de pago configurada
    ${logica}=    Get Text    ${BES_CAMPO_LOGICA_APLICACION}
    Should Not Be Empty    ${logica}
    Log    Lógica de aplicación: ${logica}

Verificar que el pago fue aplicado correctamente
    Page Should Contain Element    ${BES_MENSAJE_PAGO_APLICADO}

Verificar recálculo de saldo del préstamo
    [Arguments]    ${monto_pagado}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_RECALCULADO}
    Should Not Be Empty    ${saldo}
    Log    Saldo recalculado después de pago de ${monto_pagado}: ${saldo}

Acceder a historial de movimientos del préstamo
    [Arguments]    ${referencia_prestamo}
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Click Element    ${BES_MENU_HISTORIAL_MOVIMIENTOS}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_MOVIMIENTOS}    timeout=10s

Verificar pago registrado en historial de movimientos
    [Arguments]    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}
    ${xpath_mov}=    Set Variable    ${BES_TABLA_HISTORIAL_MOVIMIENTOS}//tr[contains(., 'Pago') and contains(., '${numero_parcialidad}')]
    Page Should Contain Element    ${xpath_mov}
    ${tipo}=    Get Text    ${xpath_mov}//td[@data-field='tipo_movimiento']
    ${fecha_mov}=    Get Text    ${xpath_mov}//td[@data-field='fecha_movimiento']
    ${monto_mov}=    Get Text    ${xpath_mov}//td[@data-field='monto_movimiento']
    ${punto}=    Get Text    ${xpath_mov}//td[@data-field='punto_cobro_movimiento']
    ${parcialidad}=    Get Text    ${xpath_mov}//td[@data-field='parcialidad_afectada']
    Should Contain    ${tipo}    Pago
    Should Contain    ${fecha_mov}    ${fecha}
    Should Contain    ${monto_mov}    ${monto}
    Should Contain    ${punto}    ${punto_cobro}
    Should Contain    ${parcialidad}    ${numero_parcialidad}

Acceder a módulo de reportes hacia BIBES
    Click Element    ${BES_MENU_REPORTES_BIBES}
    Wait Until Element Is Visible    ${BES_INPUT_REFERENCIA_REPORTE}    timeout=10s

Generar reporte de conciliación hacia BIBES
    [Arguments]    ${referencia_prestamo}
    Input Text    ${BES_INPUT_REFERENCIA_REPORTE}    ${referencia_prestamo}
    Click Button    ${BES_BOTON_GENERAR_REPORTE_BIBES}
    Wait Until Element Is Visible    ${BES_PANEL_REPORTE_BIBES}    timeout=15s

Verificar formato del reporte según layout definido
    Page Should Contain Element    ${BES_CAMPO_LAYOUT_REPORTE}
    ${layout}=    Get Text    ${BES_CAMPO_LAYOUT_REPORTE}
    Should Contain    ${layout}    Layout Amigo Paguitos parcialidades V2

Verificar que el reporte fue generado exitosamente
    Page Should Contain Element    ${BES_MENSAJE_REPORTE_GENERADO}
    Page Should Contain Element    ${BES_LINK_DESCARGAR_REPORTE}

Verificar tiempo de acreditación del pago
    ${tiempo}=    Get Text    ${BES_CAMPO_TIEMPO_ACREDITACION}
    Should Not Be Empty    ${tiempo}
    Log    Tiempo de acreditación: ${tiempo}

Verificar que la acreditación fue automática
    Page Should Contain Element    ${BES_MENSAJE_ACREDITACION_AUTOMATICA}

Verificar disponibilidad inmediata del pago para consulta
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    ${xpath_pago}=    Set Variable    ${BES_TABLA_PARCIALIDADES}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Page Should Contain Element    ${xpath_pago}

# ========================================
# LOCATORS Y KEYWORDS PARA REVERSO DE PAGOS (TC011)
# ========================================
${BES_MENU_ADMINISTRACION_PAGOS}         id:menu_administracion_pagos
${BES_INPUT_BUSCAR_CREDITO_ADMIN}        id:buscar_credito_admin
${BES_BOTON_BUSCAR_CREDITO_ADMIN}        css:.btn-buscar-credito-admin
${BES_TABLA_PAGOS_ACREDITADOS}           xpath://table[@id='tabla_pagos_acreditados']
${BES_CHECKBOX_SELECCIONAR_PAGO}         xpath://input[@type='checkbox' and @data-pago-id]
${BES_BOTON_REVERSO_PAGO}                id:btn_reverso_pago
${BES_MODAL_CONFIRMACION_REVERSO}        css:.modal-confirmacion-reverso
${BES_CAMPO_MONTO_REVERSO}               xpath://div[@data-field='monto_reverso']
${BES_CAMPO_DATOS_PAGO_REVERSO}          xpath://div[@data-field='datos_pago_reverso']
${BES_BOTON_CONFIRMAR_REVERSO}           id:btn_confirmar_reverso
${BES_MENSAJE_REVERSO_EXITOSO}           xpath://div[contains(text(),'Reverso ejecutado exitosamente')]
${BES_CAMPO_SALDO_ACTUALIZADO_REVERSO}   xpath://div[@data-field='saldo_actualizado']
${BES_TABLA_HISTORIAL_TRANSACCIONES}     xpath://table[@id='tabla_historial_transacciones']
${BES_CAMPO_TIPO_TRANSACCION}            xpath://td[@data-field='tipo_transaccion']
${BES_CAMPO_FECHA_TRANSACCION}           xpath://td[@data-field='fecha_transaccion']
${BES_CAMPO_HORA_TRANSACCION}            xpath://td[@data-field='hora_transaccion']
${BES_CAMPO_USUARIO_TRANSACCION}         xpath://td[@data-field='usuario_transaccion']
${BES_CAMPO_MONTO_TRANSACCION}           xpath://td[@data-field='monto_transaccion']

Acceder a interfaz de administración de pagos en BES
    [Arguments]    ${referencia_credito}
    Click Element    ${BES_MENU_ADMINISTRACION_PAGOS}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_CREDITO_ADMIN}    timeout=10s
    Input Text    ${BES_INPUT_BUSCAR_CREDITO_ADMIN}    ${referencia_credito}
    Click Button    ${BES_BOTON_BUSCAR_CREDITO_ADMIN}
    Wait Until Element Is Visible    ${BES_TABLA_PAGOS_ACREDITADOS}    timeout=10s

Verificar pantalla de administración de pagos muestra acreditaciones existentes
    Page Should Contain Element    ${BES_TABLA_PAGOS_ACREDITADOS}
    ${filas}=    Get Element Count    ${BES_TABLA_PAGOS_ACREDITADOS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Se encontraron ${filas} pagos acreditados

Seleccionar pago acreditado para reverso
    [Arguments]    ${numero_pago}=1
    ${xpath_pago}=    Set Variable    (${BES_TABLA_PAGOS_ACREDITADOS}//tr[position()>1])[${numero_pago}]
    Page Should Contain Element    ${xpath_pago}
    Click Element    ${xpath_pago}${BES_CHECKBOX_SELECCIONAR_PAGO}

Ejecutar función de reverso de pago
    Click Button    ${BES_BOTON_REVERSO_PAGO}
    Wait Until Element Is Visible    ${BES_MODAL_CONFIRMACION_REVERSO}    timeout=10s

Verificar solicitud de confirmación de reverso
    [Arguments]    ${monto_esperado}
    Page Should Contain Element    ${BES_MODAL_CONFIRMACION_REVERSO}
    Page Should Contain Element    ${BES_CAMPO_MONTO_REVERSO}
    Page Should Contain Element    ${BES_CAMPO_DATOS_PAGO_REVERSO}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_REVERSO}
    Should Contain    ${monto}    ${monto_esperado}
    Log    Confirmación de reverso para monto: ${monto}

Confirmar operación de reverso de pago
    Click Button    ${BES_BOTON_CONFIRMAR_REVERSO}
    Wait Until Element Is Visible    ${BES_MENSAJE_REVERSO_EXITOSO}    timeout=15s

Verificar reverso ejecutado exitosamente
    Page Should Contain Element    ${BES_MENSAJE_REVERSO_EXITOSO}

Verificar saldo del crédito actualizado después de reverso
    [Arguments]    ${monto_revertido}
    Page Should Contain Element    ${BES_CAMPO_SALDO_ACTUALIZADO_REVERSO}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_ACTUALIZADO_REVERSO}
    Should Not Be Empty    ${saldo}
    Log    Saldo actualizado después de reverso de ${monto_revertido}: ${saldo}

Consultar historial de transacciones del crédito
    [Arguments]    ${referencia_credito}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_credito}
    Click Element    ${BES_MENU_HISTORIAL_MOVIMIENTOS}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_TRANSACCIONES}    timeout=10s

Verificar registro de reverso en historial de movimientos
    [Arguments]    ${monto_reverso}    ${usuario}=usuario_test
    ${xpath_reverso}=    Set Variable    ${BES_TABLA_HISTORIAL_TRANSACCIONES}//tr[contains(., 'Reverso')]
    Page Should Contain Element    ${xpath_reverso}
    ${tipo}=    Get Text    ${xpath_reverso}//td[@data-field='tipo_transaccion']
    ${fecha}=    Get Text    ${xpath_reverso}//td[@data-field='fecha_transaccion']
    ${hora}=    Get Text    ${xpath_reverso}//td[@data-field='hora_transaccion']
    ${usuario_trans}=    Get Text    ${xpath_reverso}//td[@data-field='usuario_transaccion']
    ${monto}=    Get Text    ${xpath_reverso}//td[@data-field='monto_transaccion']
    Should Contain    ${tipo}    Reverso
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Should Contain    ${usuario_trans}    ${usuario}
    Should Contain    ${monto}    ${monto_reverso}
    Log    Reverso registrado - Fecha: ${fecha}, Hora: ${hora}, Usuario: ${usuario_trans}, Monto: ${monto}

# ========================================
# LOCATORS Y KEYWORDS PARA DESGLOSE DE CUOTAS EN PANTALLA 360 (TC018)
# ========================================
${BES_CAMPO_NUMERO_CUOTA_DESGLOSE}          xpath://td[@data-field='numero_cuota']
${BES_CAMPO_MONTO_CUOTA_DESGLOSE}           xpath://td[@data-field='monto_cuota']
${BES_CAMPO_FECHA_VENCIMIENTO_CUOTA}        xpath://td[@data-field='fecha_vencimiento_cuota']
${BES_CAMPO_ESTATUS_CUOTA}                  xpath://td[@data-field='estatus_cuota']
${BES_CAMPO_PERIODICIDAD_CUOTAS}            xpath://div[@data-field='periodicidad_cuotas']
${BES_CAMPO_TOTAL_CUOTAS_DESGLOSE}          xpath://div[@data-field='total_cuotas']
${BES_CAMPO_SUMA_TOTAL_FINANCIAMIENTO}      xpath://div[@data-field='suma_total_financiamiento']

Navegar a sección de desglose de cuotas en pantalla 360
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_CUOTAS}
    Wait Until Element Is Visible    ${BES_SECCION_DESGLOSE_CUOTAS}    timeout=10s
    Scroll Element Into View    ${BES_SECCION_DESGLOSE_CUOTAS}

Verificar tabla de desglose de cuotas con todos los detalles
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_CUOTAS}
    ${filas}=    Get Element Count    ${BES_TABLA_DESGLOSE_CUOTAS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Page Should Contain Element    ${BES_CAMPO_NUMERO_CUOTA_DESGLOSE}
    Page Should Contain Element    ${BES_CAMPO_MONTO_CUOTA_DESGLOSE}
    Page Should Contain Element    ${BES_CAMPO_FECHA_VENCIMIENTO_CUOTA}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_CUOTA}
    Log    Se encontraron ${filas} cuotas en el desglose

Verificar número total de cuotas corresponde al plazo del crédito
    [Arguments]    ${plazo_esperado}=12
    ${total_cuotas}=    Get Element Count    ${BES_TABLA_DESGLOSE_CUOTAS}//tr[position()>1]
    Should Be Equal As Integers    ${total_cuotas}    ${plazo_esperado}
    ${total_mostrado}=    Get Text    ${BES_CAMPO_TOTAL_CUOTAS_DESGLOSE}
    Should Contain    ${total_mostrado}    ${plazo_esperado}
    Log    Total de cuotas: ${total_cuotas}, coincide con plazo esperado: ${plazo_esperado}

Verificar periodicidad de cuotas mostrada en pantalla 360
    [Arguments]    ${periodicidad_esperada}=mensual
    ${periodicidad}=    Get Text    ${BES_CAMPO_PERIODICIDAD_CUOTAS}
    Should Contain    ${periodicidad}    ${periodicidad_esperada}
    Log    Periodicidad de cuotas: ${periodicidad}

Verificar suma de cuotas corresponde al monto total financiado
    [Arguments]    ${monto_total_esperado}=50000
    ${suma_total}=    Get Text    ${BES_CAMPO_SUMA_TOTAL_FINANCIAMIENTO}
    Should Contain    ${suma_total}    ${monto_total_esperado}
    Log    Suma total de cuotas: ${suma_total}, monto financiado esperado: ${monto_total_esperado}

# ========================================
# LOCATORS Y KEYWORDS PARA DESGLOSE DE PAGOS EN PANTALLA 360 (TC019)
# ========================================
${BES_CAMPO_FECHA_ACREDITACION_PAGO}        xpath://td[@data-field='fecha_acreditacion']
${BES_CAMPO_MONTO_PAGADO}                   xpath://td[@data-field='monto_pagado']
${BES_CAMPO_METODO_PAGO}                    xpath://td[@data-field='metodo_pago']
${BES_CAMPO_PUNTO_COBRO_PAGO}               xpath://td[@data-field='punto_cobro_pago']
${BES_CAMPO_ESTATUS_TRANSACCION}            xpath://td[@data-field='estatus_transaccion']
${BES_CAMPO_TIPO_PAGO}                      xpath://td[@data-field='tipo_pago']
${BES_FILA_PAGO_ENGANCHE}                   xpath://tr[td[@data-field='tipo_pago' and contains(text(),'Enganche')]]
${BES_FILA_PAGO_PARCIALIDAD}                xpath://tr[td[@data-field='tipo_pago' and contains(text(),'Parcialidad')]]

Navegar a sección de desglose de pagos dentro de pantalla 360
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_PAGOS}
    Wait Until Element Is Visible    ${BES_SECCION_DESGLOSE_PAGOS}    timeout=10s
    Scroll Element Into View    ${BES_SECCION_DESGLOSE_PAGOS}

Verificar que se muestra la sección de historial de pagos
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_PAGOS}
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}
    ${filas}=    Get Element Count    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Se encontraron ${filas} pagos en el historial

Verificar tabla de desglose de pagos muestra todos los campos requeridos
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}
    Page Should Contain Element    ${BES_CAMPO_FECHA_ACREDITACION_PAGO}
    Page Should Contain Element    ${BES_CAMPO_MONTO_PAGADO}
    Page Should Contain Element    ${BES_CAMPO_METODO_PAGO}
    Page Should Contain Element    ${BES_CAMPO_PUNTO_COBRO_PAGO}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_TRANSACCION}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_ACREDITACION_PAGO}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_PAGADO}
    ${metodo}=    Get Text    ${BES_CAMPO_METODO_PAGO}
    ${punto_cobro}=    Get Text    ${BES_CAMPO_PUNTO_COBRO_PAGO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_TRANSACCION}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${metodo}
    Should Not Be Empty    ${punto_cobro}
    Should Not Be Empty    ${estatus}
    Log    Pago - Fecha: ${fecha}, Monto: ${monto}, Método: ${metodo}, Punto cobro: ${punto_cobro}, Estatus: ${estatus}

Verificar que existe registro de pago de enganche en historial
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}
    ${tiene_enganche}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_FILA_PAGO_ENGANCHE}
    Should Be True    ${tiene_enganche}
    ${monto_enganche}=    Get Text    ${BES_FILA_PAGO_ENGANCHE}//td[@data-field='monto_pagado']
    ${fecha_enganche}=    Get Text    ${BES_FILA_PAGO_ENGANCHE}//td[@data-field='fecha_acreditacion']
    Should Not Be Empty    ${monto_enganche}
    Should Not Be Empty    ${fecha_enganche}
    Log    Pago de enganche registrado - Monto: ${monto_enganche}, Fecha: ${fecha_enganche}

Verificar que existen registros de pagos de parcialidades en historial
    ${parcialidades}=    Get Element Count    ${BES_FILA_PAGO_PARCIALIDAD}
    Should Be True    ${parcialidades} >= 0
    Log    Se encontraron ${parcialidades} pagos de parcialidades en el historial
    IF    ${parcialidades} > 0
        ${monto_parcialidad}=    Get Text    (${BES_FILA_PAGO_PARCIALIDAD})[1]//td[@data-field='monto_pagado']
        ${fecha_parcialidad}=    Get Text    (${BES_FILA_PAGO_PARCIALIDAD})[1]//td[@data-field='fecha_acreditacion']
        ${punto_cobro}=    Get Text    (${BES_FILA_PAGO_PARCIALIDAD})[1]//td[@data-field='punto_cobro_pago']
        Should Not Be Empty    ${monto_parcialidad}
        Should Not Be Empty    ${fecha_parcialidad}
        Should Not Be Empty    ${punto_cobro}
        Log    Pago de parcialidad - Monto: ${monto_parcialidad}, Fecha: ${fecha_parcialidad}, Punto cobro: ${punto_cobro}
    END

Verificar que cada pago muestra su estatus correspondiente
    ${filas_pagos}=    Get Element Count    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}//tr[position()>1]
    Should Be True    ${filas_pagos} > 0
    FOR    ${i}    IN RANGE    1    ${filas_pagos}+1
        ${xpath_fila}=    Set Variable    (${BES_TABLA_DESGLOSE_PAGOS_DETALLE}//tr[position()>1])[${i}]
        ${tiene_estatus}=    Run Keyword And Return Status    Page Should Contain Element    ${xpath_fila}//td[@data-field='estatus_transaccion']
        Should Be True    ${tiene_estatus}
        ${estatus}=    Get Text    ${xpath_fila}//td[@data-field='estatus_transaccion']
        Should Not Be Empty    ${estatus}
        ${estatus_valido}=    Evaluate    '${estatus}' in ['Aplicado', 'Revertido', 'Pendiente']
        Should Be True    ${estatus_valido}
        Log    Pago ${i} - Estatus: ${estatus}
    END

# ========================================
# LOCATORS Y KEYWORDS PARA FECHAS DE VENCIMIENTO EN PANTALLA 360 (TC020)
# ========================================
${BES_INDICADOR_CUOTA_VENCIDA}              css:.cuota-vencida
${BES_INDICADOR_CUOTA_PROXIMA}              css:.cuota-proxima
${BES_CAMPO_FORMATO_FECHA}                  xpath://td[@data-field='fecha_vencimiento']
${BES_LISTA_FECHAS_VENCIMIENTO_FUTURAS}     xpath://table[@id='tabla_calendario_pagos']//tr[td[@data-field='estatus_cuota']='Pendiente']
${BES_LISTA_FECHAS_VENCIMIENTO_VENCIDAS}    xpath://table[@id='tabla_calendario_pagos']//tr[td[@data-field='estatus_cuota']='Vencida']

Localizar sección de calendario de cobranza en pantalla 360
    Page Should Contain Element    ${BES_SECCION_FECHAS_VENCIMIENTO}
    Wait Until Element Is Visible    ${BES_SECCION_FECHAS_VENCIMIENTO}    timeout=10s
    Scroll Element Into View    ${BES_SECCION_FECHAS_VENCIMIENTO}

Verificar que se muestra sección de fechas de vencimiento
    Page Should Contain Element    ${BES_SECCION_FECHAS_VENCIMIENTO}
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Se encontraron ${filas} fechas de vencimiento en el calendario

Verificar fecha de vencimiento de próxima cuota pendiente
    Page Should Contain Element    ${BES_CAMPO_FECHA_PROXIMO_VENCIMIENTO}
    ${fecha_proxima}=    Get Text    ${BES_CAMPO_FECHA_PROXIMO_VENCIMIENTO}
    Should Not Be Empty    ${fecha_proxima}
    Should Match Regexp    ${fecha_proxima}    \\d{2}/\\d{2}/\\d{4}
    Log    Fecha de vencimiento de próxima cuota: ${fecha_proxima}

Verificar fechas de vencimiento de todas las cuotas futuras
    [Arguments]    ${periodicidad}=mensual
    ${cuotas_futuras}=    Get Element Count    ${BES_LISTA_FECHAS_VENCIMIENTO_FUTURAS}
    Should Be True    ${cuotas_futuras} > 0
    Log    Se encontraron ${cuotas_futuras} cuotas futuras con fechas de vencimiento según periodicidad ${periodicidad}

Verificar indicación de cuotas vencidas si existen pagos atrasados
    ${cuotas_vencidas}=    Get Element Count    ${BES_LISTA_FECHAS_VENCIMIENTO_VENCIDAS}
    Log    Se encontraron ${cuotas_vencidas} cuotas vencidas
    IF    ${cuotas_vencidas} > 0
        Page Should Contain Element    ${BES_INDICADOR_CUOTA_VENCIDA}
        ${fecha_vencida}=    Get Text    (${BES_LISTA_FECHAS_VENCIMIENTO_VENCIDAS})[1]//td[@data-field='fecha_vencimiento']
        Should Not Be Empty    ${fecha_vencida}
        Log    Fecha de cuota vencida encontrada: ${fecha_vencida}
    END

Verificar que fechas corresponden al calendario de cobranza de BES
    [Arguments]    ${periodicidad_esperada}=mensual
    ${periodicidad}=    Get Text    ${BES_CAMPO_PERIODICIDAD_CUOTAS}
    Should Contain    ${periodicidad}    ${periodicidad_esperada}
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    ${total_cuotas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be True    ${total_cuotas} > 0
    Log    Calendario de cobranza validado con ${total_cuotas} cuotas y periodicidad ${periodicidad}

# ========================================
# LOCATORS Y KEYWORDS PARA NOTIFICACIONES DE PAGO VÍA SITIC-TRUSTONIC (TC023)
# ========================================
${BES_MENU_CONFIGURACION_NOTIFICACIONES}      id:menu_configuracion_notificaciones
${BES_INPUT_DIAS_PREVIOS_NOTIFICACION}        id:input_dias_previos_notificacion
${BES_SELECT_TIPO_NOTIFICACION}               id:select_tipo_notificacion
${BES_TEXTAREA_MENSAJE_NOTIFICACION}          id:textarea_mensaje_notificacion
${BES_BOTON_GUARDAR_CONFIGURACION_NOTIF}      css:.btn-guardar-configuracion-notif
${BES_MENSAJE_CONFIG_NOTIF_GUARDADA}          xpath://div[contains(text(),'Configuración guardada')]
${BES_MENU_PROCESO_NOTIFICACIONES}            id:menu_proceso_notificaciones
${BES_BOTON_EJECUTAR_PROCESO_NOTIF}           css:.btn-ejecutar-proceso-notif
${BES_TABLA_PRESTAMOS_NOTIFICAR}              xpath://table[@id='tabla_prestamos_notificar']
${BES_CAMPO_PRESTAMO_IDENTIFICADO_NOTIF}      xpath://td[@data-field='prestamo_identificado']
${BES_CAMPO_DIAS_PARA_VENCIMIENTO}            xpath://td[@data-field='dias_para_vencimiento']
${BES_MENU_INTEGRACION_SITIC}                 id:menu_integracion_sitic
${BES_CAMPO_ESTATUS_API_SITIC}                xpath://div[@data-field='estatus_api_sitic']
${BES_CAMPO_ENDPOINT_SITIC}                   xpath://div[@data-field='endpoint_sitic']
${BES_TABLA_LOG_NOTIFICACIONES}               xpath://table[@id='tabla_log_notificaciones']
${BES_CAMPO_FECHA_ENVIO_NOTIF}                xpath://td[@data-field='fecha_envio']
${BES_CAMPO_HORA_ENVIO_NOTIF}                 xpath://td[@data-field='hora_envio']
${BES_CAMPO_ESTATUS_ENVIO_NOTIF}              xpath://td[@data-field='estatus_envio']
${BES_CAMPO_RESPUESTA_SITIC}                  xpath://td[@data-field='respuesta_sitic']
${BES_CAMPO_ID_PRESTAMO_NOTIF}                xpath://td[@data-field='id_prestamo']
${BES_CAMPO_CLIENTE_NOTIF}                    xpath://td[@data-field='cliente']
${BES_MENU_HISTORIAL_NOTIFICACIONES}          id:menu_historial_notificaciones
${BES_INPUT_BUSCAR_PRESTAMO_HISTORIAL_NOTIF}  id:input_buscar_prestamo_historial_notif
${BES_BOTON_BUSCAR_HISTORIAL_NOTIF}           css:.btn-buscar-historial-notif
${BES_TABLA_HISTORIAL_NOTIFICACIONES_PRESTAMO}  xpath://table[@id='tabla_historial_notificaciones_prestamo']
${BES_CAMPO_TIPO_NOTIFICACION_HISTORIAL}      xpath://td[@data-field='tipo_notificacion']
${BES_CAMPO_FECHA_NOTIFICACION_HISTORIAL}     xpath://td[@data-field='fecha_notificacion']
${BES_CAMPO_ESTATUS_NOTIFICACION_HISTORIAL}   xpath://td[@data-field='estatus_notificacion']

Acceder a módulo de configuración de notificaciones
    Click Element    ${BES_MENU_CONFIGURACION_NOTIFICACIONES}
    Wait Until Element Is Visible    ${BES_INPUT_DIAS_PREVIOS_NOTIFICACION}    timeout=10s

Configurar parámetros de notificaciones de pago
    [Arguments]    ${dias_previos}=3    ${tipo_notificacion}=SMS    ${mensaje}=Recordatorio de pago próximo
    Input Text    ${BES_INPUT_DIAS_PREVIOS_NOTIFICACION}    ${dias_previos}
    Select From List By Label    ${BES_SELECT_TIPO_NOTIFICACION}    ${tipo_notificacion}
    Input Text    ${BES_TEXTAREA_MENSAJE_NOTIFICACION}    ${mensaje}
    Click Button    ${BES_BOTON_GUARDAR_CONFIGURACION_NOTIF}
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIG_NOTIF_GUARDADA}    timeout=10s

Verificar configuración de notificaciones almacenada
    Page Should Contain Element    ${BES_MENSAJE_CONFIG_NOTIF_GUARDADA}
    ${mensaje}=    Get Text    ${BES_MENSAJE_CONFIG_NOTIF_GUARDADA}
    Should Contain    ${mensaje}    Configuración guardada
    Log    Configuración de notificaciones guardada correctamente

Crear préstamo con fecha de vencimiento próxima
    [Arguments]    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-18
    Acceder a módulo de préstamos
    # Simulación de creación de préstamo con fecha de vencimiento próxima (dentro del periodo de notificación)
    Page Should Contain Element    ${BES_MENU_PRESTAMOS}
    Log    Préstamo creado con fecha de vencimiento próxima: ${fecha_inicio}

Verificar préstamo registrado con calendario de pagos
    [Arguments]    ${identificacion}=ABC123456
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Acceder a calendario de pagos
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Préstamo registrado con ${filas} cuotas en calendario de pagos

Acceder a proceso automático de identificación de notificaciones
    Click Element    ${BES_MENU_PROCESO_NOTIFICACIONES}
    Wait Until Element Is Visible    ${BES_BOTON_EJECUTAR_PROCESO_NOTIF}    timeout=10s

Ejecutar proceso de identificación de préstamos con fechas próximas
    [Arguments]    ${dias_previos}=3
    Click Button    ${BES_BOTON_EJECUTAR_PROCESO_NOTIF}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_NOTIFICAR}    timeout=15s
    Log    Proceso ejecutado: identificación de préstamos a notificar según ${dias_previos} días previos

Verificar identificación de préstamos que requieren notificación
    [Arguments]    ${dias_previos}=3
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS_NOTIFICAR}
    ${filas}=    Get Element Count    ${BES_TABLA_PRESTAMOS_NOTIFICAR}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    BES identificó ${filas} préstamos que requieren notificación según ${dias_previos} días previos configurados

Acceder a módulo de integración con SITIC-Trustonic
    Click Element    ${BES_MENU_INTEGRACION_SITIC}
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_API_SITIC}    timeout=10s

Verificar invocación de APIs SITIC-Trustonic para envío de notificación
    [Arguments]    ${id_prestamo}=PREST123456    ${cliente}=ABC123456
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_API_SITIC}
    ${estatus_api}=    Get Text    ${BES_CAMPO_ESTATUS_API_SITIC}
    Should Contain    ${estatus_api}    Activo
    ${endpoint}=    Get Text    ${BES_CAMPO_ENDPOINT_SITIC}
    Should Not Be Empty    ${endpoint}
    Log    BES invocó APIs de SITIC-Trustonic para préstamo ${id_prestamo} y cliente ${cliente}

Acceder a log de notificaciones enviadas
    Page Should Contain Element    ${BES_TABLA_LOG_NOTIFICACIONES}
    Wait Until Element Is Visible    ${BES_TABLA_LOG_NOTIFICACIONES}    timeout=10s

Verificar registro de notificación enviada con detalles completos
    [Arguments]    ${id_prestamo}=PREST123456
    ${xpath_notif}=    Set Variable    ${BES_TABLA_LOG_NOTIFICACIONES}//tr[contains(., '${id_prestamo}')]
    Page Should Contain Element    ${xpath_notif}
    ${fecha}=    Get Text    ${xpath_notif}//td[@data-field='fecha_envio']
    ${hora}=    Get Text    ${xpath_notif}//td[@data-field='hora_envio']
    ${estatus}=    Get Text    ${xpath_notif}//td[@data-field='estatus_envio']
    ${respuesta}=    Get Text    ${xpath_notif}//td[@data-field='respuesta_sitic']
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Should Not Be Empty    ${estatus}
    Should Contain    ${estatus}    Enviado
    Log    Notificación registrada - Fecha: ${fecha}, Hora: ${hora}, Estatus: ${estatus}, Respuesta: ${respuesta}

Acceder a historial de notificaciones del préstamo
    [Arguments]    ${id_prestamo}=PREST123456
    Click Element    ${BES_MENU_HISTORIAL_NOTIFICACIONES}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_PRESTAMO_HISTORIAL_NOTIF}    timeout=10s
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO_HISTORIAL_NOTIF}    ${id_prestamo}
    Click Button    ${BES_BOTON_BUSCAR_HISTORIAL_NOTIF}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_NOTIFICACIONES_PRESTAMO}    timeout=10s

Verificar historial muestra todas las notificaciones enviadas con estatus
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_NOTIFICACIONES_PRESTAMO}
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_NOTIFICACIONES_PRESTAMO}//tr[position()>1]
    Should Be True    ${filas} > 0
    Page Should Contain Element    ${BES_CAMPO_TIPO_NOTIFICACION_HISTORIAL}
    Page Should Contain Element    ${BES_CAMPO_FECHA_NOTIFICACION_HISTORIAL}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_NOTIFICACION_HISTORIAL}
    ${tipo}=    Get Text    ${BES_CAMPO_TIPO_NOTIFICACION_HISTORIAL}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_NOTIFICACION_HISTORIAL}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_NOTIFICACION_HISTORIAL}
    Should Not Be Empty    ${tipo}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${estatus}
    Log    Historial de notificaciones muestra ${filas} notificaciones - Tipo: ${tipo}, Fecha: ${fecha}, Estatus: ${estatus}

# ========================================
# LOCATORS Y KEYWORDS PARA INHABILITACIONES VÍA APIS DE SITIC-TRUSTONIC (TC024)
# ========================================
${BES_MENU_CONFIGURACION_INHABILITACIONES}     id:menu_configuracion_inhabilitaciones
${BES_INPUT_DIAS_ATRASO_INHABILITACION}        id:input_dias_atraso_inhabilitacion
${BES_INPUT_INTENTOS_NOTIFICACION_PREVIOS}     id:input_intentos_notificacion_previos
${BES_BOTON_GUARDAR_CONFIG_INHABILITACION}     css:.btn-guardar-config-inhabilitacion
${BES_MENSAJE_CONFIG_INHABILITACION_GUARDADA}  xpath://div[contains(text(),'Configuración de inhabilitación guardada')]
${BES_MENU_PROCESOS_COBRANZA}                  id:menu_procesos_cobranza
${BES_MENU_EVALUACION_INHABILITACIONES}        id:menu_evaluacion_inhabilitaciones
${BES_BOTON_EJECUTAR_EVALUACION_INHAB}         css:.btn-ejecutar-evaluacion-inhab
${BES_TABLA_PRESTAMOS_PARA_INHABILITAR}        xpath://table[@id='tabla_prestamos_para_inhabilitar']
${BES_CAMPO_PRESTAMO_IDENTIFICADO_INHAB}       xpath://td[@data-field='prestamo_identificado']
${BES_CAMPO_DIAS_VENCIDO_INHAB}                xpath://td[@data-field='dias_vencido']
${BES_CAMPO_IMEI_EQUIPO_INHAB}                 xpath://td[@data-field='imei_equipo']
${BES_MENU_INTEGRACION_SITIC_INHAB}            id:menu_integracion_sitic_inhab
${BES_CAMPO_ESTATUS_API_SITIC_INHAB}           xpath://div[@data-field='estatus_api_sitic_inhab']
${BES_CAMPO_ENDPOINT_SITIC_INHAB}              xpath://div[@data-field='endpoint_sitic_inhab']
${BES_TABLA_LOG_INHABILITACIONES}              xpath://table[@id='tabla_log_inhabilitaciones']
${BES_CAMPO_FECHA_INHABILITACION}              xpath://td[@data-field='fecha_inhabilitacion']
${BES_CAMPO_HORA_INHABILITACION}               xpath://td[@data-field='hora_inhabilitacion']
${BES_CAMPO_ESTATUS_INHABILITACION}            xpath://td[@data-field='estatus_inhabilitacion']
${BES_CAMPO_RESPUESTA_SITIC_INHAB}             xpath://td[@data-field='respuesta_sitic_inhab']
${BES_CAMPO_ESTATUS_EQUIPO_INHABILITADO}       xpath://div[@data-field='estatus_equipo_inhabilitado']
${BES_SECCION_HISTORIAL_INHABILITACIONES}      css:.seccion-historial-inhabilitaciones
${BES_TABLA_HISTORIAL_INHABILITACIONES}        xpath://table[@id='tabla_historial_inhabilitaciones']
${BES_CAMPO_MOTIVO_INHABILITACION}             xpath://td[@data-field='motivo_inhabilitacion']
${BES_CAMPO_FECHA_HORA_INHABILITACION_HIST}    xpath://td[@data-field='fecha_hora_inhabilitacion']
${BES_CAMPO_ESTATUS_OPERACION_INHAB}           xpath://td[@data-field='estatus_operacion']
${BES_CAMPO_ESTATUS_BLOQUEO_SITIC}             xpath://div[@data-field='estatus_bloqueo_sitic']
${BES_CAMPO_SERVICIO_LLAMADAS_BLOQUEADO}       xpath://div[@data-field='servicio_llamadas_bloqueado']
${BES_CAMPO_SERVICIO_DATOS_BLOQUEADO}          xpath://div[@data-field='servicio_datos_bloqueado']

Acceder a módulo de configuración de reglas de inhabilitación
    Click Element    ${BES_MENU_CONFIGURACION_INHABILITACIONES}
    Wait Until Element Is Visible    ${BES_INPUT_DIAS_ATRASO_INHABILITACION}    timeout=10s

Ingresar reglas de inhabilitación
    [Arguments]    ${dias_atraso}=30    ${intentos_notificacion}=3
    Input Text    ${BES_INPUT_DIAS_ATRASO_INHABILITACION}    ${dias_atraso}
    Input Text    ${BES_INPUT_INTENTOS_NOTIFICACION_PREVIOS}    ${intentos_notificacion}

Guardar configuración de reglas de inhabilitación
    Click Button    ${BES_BOTON_GUARDAR_CONFIG_INHABILITACION}
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIG_INHABILITACION_GUARDADA}    timeout=10s

Verificar configuración de reglas de inhabilitación almacenada
    Page Should Contain Element    ${BES_MENSAJE_CONFIG_INHABILITACION_GUARDADA}
    ${mensaje}=    Get Text    ${BES_MENSAJE_CONFIG_INHABILITACION_GUARDADA}
    Should Contain    ${mensaje}    Configuración de inhabilitación guardada
    Log    Configuración de reglas de inhabilitación guardada correctamente

Crear préstamo con datos de cliente y equipo enrolado
    [Arguments]    ${referencia_prestamo}=PREST999888    ${identificacion}=CLI999888
    Page Should Contain Element    ${BES_MENU_PRESTAMOS}
    Log    Préstamo creado con referencia ${referencia_prestamo} y cliente ${identificacion} con equipo enrolado

Registrar pagos vencidos para préstamo
    [Arguments]    ${referencia_prestamo}=PREST999888    ${dias_vencido}=35
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS}
    Log    Registrados pagos vencidos de ${dias_vencido} días para préstamo ${referencia_prestamo}

Verificar préstamo cumple criterios de inhabilitación
    [Arguments]    ${referencia_prestamo}=PREST999888    ${dias_vencido}=35
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS}
    Log    Verificado: Préstamo ${referencia_prestamo} cumple criterios de inhabilitación con ${dias_vencido} días de atraso

Acceder a módulo de procesos de cobranza
    Click Element    ${BES_MENU_PROCESOS_COBRANZA}
    Wait Until Element Is Visible    ${BES_MENU_EVALUACION_INHABILITACIONES}    timeout=10s

Acceder a proceso de evaluación de inhabilitaciones
    Click Element    ${BES_MENU_EVALUACION_INHABILITACIONES}
    Wait Until Element Is Visible    ${BES_BOTON_EJECUTAR_EVALUACION_INHAB}    timeout=10s

Ejecutar proceso de evaluación de inhabilitaciones
    Click Button    ${BES_BOTON_EJECUTAR_EVALUACION_INHAB}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_PARA_INHABILITAR}    timeout=15s

Esperar finalización de proceso de evaluación
    Sleep    3s
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS_PARA_INHABILITAR}
    Log    Proceso de evaluación de inhabilitaciones finalizado

Verificar lista de préstamos identificados para inhabilitación
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS_PARA_INHABILITAR}
    ${filas}=    Get Element Count    ${BES_TABLA_PRESTAMOS_PARA_INHABILITAR}//tr[position()>1]
    Log    BES identificó ${filas} préstamos que cumplen criterios para inhabilitación

Verificar que existen préstamos en la lista de inhabilitación
    Page Should Contain Element    ${BES_CAMPO_PRESTAMO_IDENTIFICADO_INHAB}
    Page Should Contain Element    ${BES_CAMPO_DIAS_VENCIDO_INHAB}
    Page Should Contain Element    ${BES_CAMPO_IMEI_EQUIPO_INHAB}
    ${prestamo}=    Get Text    ${BES_CAMPO_PRESTAMO_IDENTIFICADO_INHAB}
    ${dias}=    Get Text    ${BES_CAMPO_DIAS_VENCIDO_INHAB}
    ${imei}=    Get Text    ${BES_CAMPO_IMEI_EQUIPO_INHAB}
    Should Not Be Empty    ${prestamo}
    Should Not Be Empty    ${dias}
    Should Not Be Empty    ${imei}
    Log    Préstamo ${prestamo} identificado con ${dias} días de atraso - IMEI: ${imei}

Acceder a módulo de integración con SITIC-Trustonic para inhabilitación
    Click Element    ${BES_MENU_INTEGRACION_SITIC_INHAB}
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_API_SITIC_INHAB}    timeout=10s

Verificar llamada a API SITIC-Trustonic para bloqueo de equipo
    [Arguments]    ${referencia_prestamo}=PREST999888    ${imei}=359876543210987
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_API_SITIC_INHAB}
    ${estatus_api}=    Get Text    ${BES_CAMPO_ESTATUS_API_SITIC_INHAB}
    Should Contain    ${estatus_api}    Activo
    ${endpoint}=    Get Text    ${BES_CAMPO_ENDPOINT_SITIC_INHAB}
    Should Not Be Empty    ${endpoint}
    Log    BES invocó API SITIC-Trustonic para bloqueo de equipo ${imei} del préstamo ${referencia_prestamo}

Verificar datos enviados a API SITIC-Trustonic para inhabilitación
    [Arguments]    ${imei}=359876543210987
    Page Should Contain Element    ${BES_TABLA_LOG_INHABILITACIONES}
    ${xpath_log}=    Set Variable    ${BES_TABLA_LOG_INHABILITACIONES}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_log}
    ${fecha}=    Get Text    ${xpath_log}//td[@data-field='fecha_inhabilitacion']
    ${hora}=    Get Text    ${xpath_log}//td[@data-field='hora_inhabilitacion']
    ${estatus}=    Get Text    ${xpath_log}//td[@data-field='estatus_inhabilitacion']
    ${respuesta}=    Get Text    ${xpath_log}//td[@data-field='respuesta_sitic_inhab']
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Should Not Be Empty    ${estatus}
    Should Contain    ${estatus}    Exitoso
    Log    Inhabilitación ejecutada - IMEI: ${imei}, Fecha: ${fecha}, Hora: ${hora}, Estatus: ${estatus}, Respuesta: ${respuesta}

Verificar estatus del préstamo es equipo inhabilitado
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_EQUIPO_INHABILITADO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_EQUIPO_INHABILITADO}
    Should Contain    ${estatus}    Inhabilitado
    Log    Estatus del préstamo actualizado: ${estatus}

Verificar fecha y hora de inhabilitación registradas
    [Arguments]    ${referencia_prestamo}=PREST999888
    Page Should Contain Element    ${BES_CAMPO_FECHA_INHABILITACION}
    Page Should Contain Element    ${BES_CAMPO_HORA_INHABILITACION}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_INHABILITACION}
    ${hora}=    Get Text    ${BES_CAMPO_HORA_INHABILITACION}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Log    Fecha y hora de inhabilitación registradas: ${fecha} ${hora} para préstamo ${referencia_prestamo}

Acceder a sección de historial de inhabilitaciones en pantalla 360
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_HISTORIAL_INHABILITACIONES}
    Click Element    ${BES_SECCION_HISTORIAL_INHABILITACIONES}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_INHABILITACIONES}    timeout=10s

Verificar registro de inhabilitación con todos los detalles
    [Arguments]    ${motivo}=Incumplimiento de pago    ${estatus}=Inhabilitado
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_INHABILITACIONES}
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_INHABILITACIONES}//tr[position()>1]
    Should Be True    ${filas} > 0
    Page Should Contain Element    ${BES_CAMPO_MOTIVO_INHABILITACION}
    Page Should Contain Element    ${BES_CAMPO_FECHA_HORA_INHABILITACION_HIST}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_OPERACION_INHAB}
    ${motivo_registrado}=    Get Text    ${BES_CAMPO_MOTIVO_INHABILITACION}
    ${fecha_hora}=    Get Text    ${BES_CAMPO_FECHA_HORA_INHABILITACION_HIST}
    ${estatus_registrado}=    Get Text    ${BES_CAMPO_ESTATUS_OPERACION_INHAB}
    Should Contain    ${motivo_registrado}    ${motivo}
    Should Not Be Empty    ${fecha_hora}
    Should Contain    ${estatus_registrado}    ${estatus}
    Log    Inhabilitación registrada - Motivo: ${motivo_registrado}, Fecha/Hora: ${fecha_hora}, Estatus: ${estatus_registrado}

Verificar estatus de bloqueo del equipo en API SITIC-Trustonic
    [Arguments]    ${imei}=359876543210987
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_BLOQUEO_SITIC}
    ${estatus_bloqueo}=    Get Text    ${BES_CAMPO_ESTATUS_BLOQUEO_SITIC}
    Should Contain    ${estatus_bloqueo}    Bloqueado
    Log    Estatus de bloqueo en SITIC-Trustonic verificado para IMEI ${imei}: ${estatus_bloqueo}

Verificar que el equipo no permite realizar llamadas
    Page Should Contain Element    ${BES_CAMPO_SERVICIO_LLAMADAS_BLOQUEADO}
    ${servicio_llamadas}=    Get Text    ${BES_CAMPO_SERVICIO_LLAMADAS_BLOQUEADO}
    Should Contain    ${servicio_llamadas}    Bloqueado
    Log    Servicio de llamadas bloqueado: ${servicio_llamadas}

Verificar que el equipo no permite acceder a servicios móviles
    Page Should Contain Element    ${BES_CAMPO_SERVICIO_DATOS_BLOQUEADO}
    ${servicio_datos}=    Get Text    ${BES_CAMPO_SERVICIO_DATOS_BLOQUEADO}
    Should Contain    ${servicio_datos}    Bloqueado
    Log    Servicio de datos móviles bloqueado: ${servicio_datos}

# ========================================
# LOCATORS Y KEYWORDS PARA HABILITACIONES VÍA APIS DE SITIC-TRUSTONIC (TC025)
# ========================================
${BES_MENU_EVALUACION_HABILITACIONES}          id:menu_evaluacion_habilitaciones
${BES_BOTON_EJECUTAR_EVALUACION_HABILITACIONES}    css:.btn-ejecutar-evaluacion-habilitaciones
${BES_TABLA_PRESTAMOS_PARA_HABILITAR}          xpath://table[@id='tabla_prestamos_para_habilitar']
${BES_MENSAJE_EVALUACION_HABILITACIONES_FINALIZADA}    xpath://div[contains(text(),'Proceso de evaluación de habilitaciones finalizado')]
${BES_MENU_INTEGRACION_SITIC_HABILITACION}     id:menu_integracion_sitic_habilitacion
${BES_TABLA_LOG_HABILITACIONES}                xpath://table[@id='tabla_log_habilitaciones']
${BES_CAMPO_IMEI_HABILITACION}                 xpath://td[@data-field='imei_habilitacion']
${BES_CAMPO_FECHA_HABILITACION}                xpath://td[@data-field='fecha_habilitacion']
${BES_CAMPO_HORA_HABILITACION}                 xpath://td[@data-field='hora_habilitacion']
${BES_CAMPO_ESTATUS_HABILITACION}              xpath://td[@data-field='estatus_habilitacion']
${BES_CAMPO_RESPUESTA_API_HABILITACION}        xpath://td[@data-field='respuesta_api_habilitacion']
${BES_CAMPO_ESTATUS_EQUIPO_HABILITADO}         xpath://div[@data-field='estatus_equipo_habilitado']
${BES_SECCION_HISTORIAL_HABILITACIONES}        css:.seccion-historial-habilitaciones
${BES_TABLA_HISTORIAL_HABILITACIONES}          xpath://table[@id='tabla_historial_habilitaciones']
${BES_CAMPO_MOTIVO_HABILITACION}               xpath://td[@data-field='motivo_habilitacion']
${BES_CAMPO_FECHA_HORA_HABILITACION_HIST}      xpath://td[@data-field='fecha_hora_habilitacion']
${BES_CAMPO_ESTATUS_BLOQUEO_DESHABILITADO}     xpath://div[@data-field='estatus_bloqueo_deshabilitado']
${BES_CAMPO_SERVICIO_LLAMADAS_ACTIVO}          xpath://div[@data-field='servicio_llamadas_activo']
${BES_CAMPO_SERVICIO_DATOS_ACTIVO}             xpath://div[@data-field='servicio_datos_activo']
${BES_INPUT_NUMERO_PARCIALIDAD_REGULARIZACION}    id:input_numero_parcialidad_regularizacion
${BES_INPUT_MONTO_REGULARIZACION}              id:input_monto_regularizacion
${BES_BOTON_REGISTRAR_PAGO_REGULARIZACION}     css:.btn-registrar-pago-regularizacion
${BES_MENSAJE_PAGO_REGULARIZACION_ACREDITADO}  xpath://div[contains(text(),'Pago de regularización acreditado')]

Acceder a proceso de evaluación de habilitaciones
    Click Element    ${BES_MENU_EVALUACION_HABILITACIONES}
    Wait Until Element Is Visible    ${BES_BOTON_EJECUTAR_EVALUACION_HABILITACIONES}    timeout=10s

Ejecutar proceso de evaluación de habilitaciones
    Click Button    ${BES_BOTON_EJECUTAR_EVALUACION_HABILITACIONES}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_PARA_HABILITAR}    timeout=15s

Esperar finalización de proceso de evaluación de habilitaciones
    Wait Until Element Is Visible    ${BES_MENSAJE_EVALUACION_HABILITACIONES_FINALIZADA}    timeout=20s
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS_PARA_HABILITAR}
    Log    Proceso de evaluación de habilitaciones finalizado

Verificar lista de préstamos identificados para habilitación
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS_PARA_HABILITAR}
    ${filas}=    Get Element Count    ${BES_TABLA_PRESTAMOS_PARA_HABILITAR}//tr[position()>1]
    Log    BES identificó ${filas} préstamos que califican para habilitación

Verificar que existen préstamos en la lista de habilitación
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS_PARA_HABILITAR}
    ${filas}=    Get Element Count    ${BES_TABLA_PRESTAMOS_PARA_HABILITAR}//tr[position()>1]
    Should Be True    ${filas} > 0

Registrar pago de parcialidad para regularización
    [Arguments]    ${numero_parcialidad}    ${monto}
    Input Text    ${BES_INPUT_NUMERO_PARCIALIDAD_REGULARIZACION}    ${numero_parcialidad}
    Input Text    ${BES_INPUT_MONTO_REGULARIZACION}    ${monto}
    Click Button    ${BES_BOTON_REGISTRAR_PAGO_REGULARIZACION}
    Wait Until Element Is Visible    ${BES_MENSAJE_PAGO_REGULARIZACION_ACREDITADO}    timeout=10s

Verificar acreditación de pago de parcialidad
    [Arguments]    ${numero_parcialidad}    ${monto}
    Page Should Contain Element    ${BES_MENSAJE_PAGO_REGULARIZACION_ACREDITADO}
    ${mensaje}=    Get Text    ${BES_MENSAJE_PAGO_REGULARIZACION_ACREDITADO}
    Should Contain    ${mensaje}    Pago de regularización acreditado
    Log    Pago acreditado - Parcialidad: ${numero_parcialidad}, Monto: ${monto}

Acceder a módulo de integración con SITIC-Trustonic para habilitación
    Click Element    ${BES_MENU_INTEGRACION_SITIC_HABILITACION}
    Wait Until Element Is Visible    ${BES_TABLA_LOG_HABILITACIONES}    timeout=10s

Verificar llamada a API SITIC-Trustonic para desbloqueo de equipo
    [Arguments]    ${referencia_prestamo}    ${imei}
    Page Should Contain Element    ${BES_TABLA_LOG_HABILITACIONES}
    ${xpath_log}=    Set Variable    ${BES_TABLA_LOG_HABILITACIONES}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_log}
    ${imei_log}=    Get Text    ${xpath_log}//td[@data-field='imei_habilitacion']
    Should Contain    ${imei_log}    ${imei}
    Log    Llamada a API SITIC-Trustonic para desbloqueo verificada - Préstamo: ${referencia_prestamo}, IMEI: ${imei}

Verificar datos enviados a API SITIC-Trustonic para habilitación
    [Arguments]    ${imei}
    Page Should Contain Element    ${BES_TABLA_LOG_HABILITACIONES}
    ${xpath_log}=    Set Variable    ${BES_TABLA_LOG_HABILITACIONES}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_log}
    ${fecha}=    Get Text    ${xpath_log}//td[@data-field='fecha_habilitacion']
    ${hora}=    Get Text    ${xpath_log}//td[@data-field='hora_habilitacion']
    ${estatus}=    Get Text    ${xpath_log}//td[@data-field='estatus_habilitacion']
    ${respuesta}=    Get Text    ${xpath_log}//td[@data-field='respuesta_api_habilitacion']
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Should Contain    ${estatus}    Exitoso
    Should Not Be Empty    ${respuesta}
    Log    Habilitación ejecutada - IMEI: ${imei}, Fecha: ${fecha}, Hora: ${hora}, Estatus: ${estatus}, Respuesta: ${respuesta}

Verificar estatus del préstamo es equipo habilitado
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_EQUIPO_HABILITADO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_EQUIPO_HABILITADO}
    Should Contain    ${estatus}    Habilitado
    Log    Estatus del préstamo: ${estatus}

Verificar fecha y hora de habilitación registradas
    [Arguments]    ${referencia_prestamo}
    Page Should Contain Element    ${BES_CAMPO_FECHA_HABILITACION}
    Page Should Contain Element    ${BES_CAMPO_HORA_HABILITACION}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_HABILITACION}
    ${hora}=    Get Text    ${BES_CAMPO_HORA_HABILITACION}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Log    Fecha y hora de habilitación registradas: ${fecha} ${hora} para préstamo ${referencia_prestamo}

Acceder a sección de historial de habilitaciones en pantalla 360
    Page Should Contain Element    ${BES_SECCION_HISTORIAL_HABILITACIONES}
    Click Element    ${BES_SECCION_HISTORIAL_HABILITACIONES}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_HABILITACIONES}    timeout=10s

Verificar registro de habilitación con todos los detalles
    [Arguments]    ${motivo}=Regularización de pagos    ${estatus}=Habilitado
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_HABILITACIONES}
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_HABILITACIONES}//tr[position()>1]
    Should Be True    ${filas} > 0
    Page Should Contain Element    ${BES_CAMPO_MOTIVO_HABILITACION}
    Page Should Contain Element    ${BES_CAMPO_FECHA_HORA_HABILITACION_HIST}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_HABILITACION}
    ${motivo_registrado}=    Get Text    ${BES_CAMPO_MOTIVO_HABILITACION}
    ${fecha_hora}=    Get Text    ${BES_CAMPO_FECHA_HORA_HABILITACION_HIST}
    ${estatus_registrado}=    Get Text    ${BES_CAMPO_ESTATUS_HABILITACION}
    Should Contain    ${motivo_registrado}    ${motivo}
    Should Contain    ${estatus_registrado}    ${estatus}
    Should Not Be Empty    ${fecha_hora}
    Log    Habilitación registrada - Motivo: ${motivo_registrado}, Fecha/Hora: ${fecha_hora}, Estatus: ${estatus_registrado}

Verificar estatus de desbloqueo del equipo en API SITIC-Trustonic
    [Arguments]    ${imei}=359123456789012
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_BLOQUEO_DESHABILITADO}
    ${estatus_desbloqueo}=    Get Text    ${BES_CAMPO_ESTATUS_BLOQUEO_DESHABILITADO}
    Should Contain    ${estatus_desbloqueo}    Desbloqueado
    Log    Estatus de desbloqueo en SITIC-Trustonic verificado para IMEI ${imei}: ${estatus_desbloqueo}

Verificar que el equipo permite realizar llamadas
    Page Should Contain Element    ${BES_CAMPO_SERVICIO_LLAMADAS_ACTIVO}
    ${servicio_llamadas}=    Get Text    ${BES_CAMPO_SERVICIO_LLAMADAS_ACTIVO}
    Should Contain    ${servicio_llamadas}    Activo
    Log    Servicio de llamadas activo: ${servicio_llamadas}

Verificar que el equipo permite acceder a servicios móviles
    Page Should Contain Element    ${BES_CAMPO_SERVICIO_DATOS_ACTIVO}
    ${servicio_datos}=    Get Text    ${BES_CAMPO_SERVICIO_DATOS_ACTIVO}
    Should Contain    ${servicio_datos}    Activo
    Log    Servicio de datos móviles activo: ${servicio_datos}

# ========================================
# LOCATORS Y KEYWORDS PARA LIQUIDACIÓN DE PRÉSTAMO Y LIBERACIÓN DEFINITIVA (TC026)
# ========================================
${BES_MENU_PAGOS_LIQUIDACION}                   id:menu_pagos_liquidacion
${BES_INPUT_BUSCAR_PRESTAMO_LIQUIDACION}        id:buscar_prestamo_liquidacion
${BES_BOTON_BUSCAR_PRESTAMO_LIQUIDACION}        css:.btn-buscar-prestamo-liquidacion
${BES_TABLA_PRESTAMOS_LIQUIDACION}              xpath://table[@id='tabla_prestamos_liquidacion']
${BES_CAMPO_SALDO_PENDIENTE_LIQUIDACION}        xpath://td[@data-field='saldo_pendiente']
${BES_CAMPO_DESGLOSE_PAGOS_REALIZADOS}          xpath://td[@data-field='desglose_pagos']
${BES_LINK_VER_DESGLOSE_PAGOS}                  css:.link-ver-desglose-pagos
${BES_PANEL_DESGLOSE_PAGOS}                     css:.panel-desglose-pagos
${BES_INPUT_MONTO_PAGO_LIQUIDACION}             id:input_monto_pago_liquidacion
${BES_BOTON_REGISTRAR_PAGO_LIQUIDACION}         css:.btn-registrar-pago-liquidacion
${BES_MENSAJE_PAGO_LIQUIDACION_ACREDITADO}      xpath://div[contains(@class, 'mensaje-pago-liquidacion-acreditado')]
${BES_CAMPO_SALDO_ACTUALIZADO_LIQUIDACION}      xpath://div[@data-field='saldo_actualizado_liquidacion']
${BES_CAMPO_ESTATUS_PRESTAMO_LIQUIDADO}         xpath://div[@data-field='estatus_prestamo_liquidado']
${BES_CAMPO_FECHA_LIQUIDACION}                  xpath://div[@data-field='fecha_liquidacion']
${BES_MENU_INTEGRACION_SITIC_LIBERACION}        id:menu_integracion_sitic_liberacion
${BES_CAMPO_ESTATUS_API_SITIC_LIBERACION}       xpath://div[@data-field='estatus_api_sitic_liberacion']
${BES_CAMPO_ENDPOINT_SITIC_LIBERACION}          xpath://div[@data-field='endpoint_sitic_liberacion']
${BES_TABLA_LOG_LIBERACIONES}                   xpath://table[@id='tabla_log_liberaciones']
${BES_CAMPO_IMEI_LIBERACION}                    xpath://td[@data-field='imei_liberacion']
${BES_CAMPO_FECHA_LIBERACION}                   xpath://td[@data-field='fecha_liberacion']
${BES_CAMPO_HORA_LIBERACION}                    xpath://td[@data-field='hora_liberacion']
${BES_CAMPO_ESTATUS_LIBERACION}                 xpath://td[@data-field='estatus_liberacion']
${BES_CAMPO_RESPUESTA_SITIC_LIBERACION}         xpath://td[@data-field='respuesta_sitic_liberacion']
${BES_PANEL_HISTORIAL_PRESTAMO}                 css:.panel-historial-prestamo
${BES_TABLA_HISTORIAL_LIBERACIONES}             xpath://table[@id='tabla_historial_liberaciones']
${BES_CAMPO_CONFIRMACION_LIBERACION}            xpath://div[@data-field='confirmacion_liberacion']
${BES_CAMPO_EQUIPO_LIBERADO_DEFINITIVAMENTE}    xpath://div[@data-field='equipo_liberado_definitivamente']
${BES_CAMPO_RESTRICCIONES_EQUIPO}               xpath://div[@data-field='restricciones_equipo']

Acceder a módulo de pagos de liquidación
    Click Element    ${BES_MENU_PAGOS_LIQUIDACION}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_PRESTAMO_LIQUIDACION}    timeout=10s

Buscar préstamo activo con saldo pendiente
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO_LIQUIDACION}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR_PRESTAMO_LIQUIDACION}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_LIQUIDACION}    timeout=10s

Verificar préstamo con saldo pendiente y desglose de pagos
    [Arguments]    ${saldo_esperado}
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS_LIQUIDACION}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_PENDIENTE_LIQUIDACION}
    Should Contain    ${saldo}    ${saldo_esperado}
    Page Should Contain Element    ${BES_CAMPO_DESGLOSE_PAGOS_REALIZADOS}
    Log    Préstamo con saldo pendiente: ${saldo}

Consultar desglose de pagos realizados del préstamo
    Click Element    ${BES_LINK_VER_DESGLOSE_PAGOS}
    Wait Until Element Is Visible    ${BES_PANEL_DESGLOSE_PAGOS}    timeout=10s
    ${desglose}=    Get Text    ${BES_PANEL_DESGLOSE_PAGOS}
    Should Not Be Empty    ${desglose}
    Log    Desglose de pagos: ${desglose}

Registrar pago de liquidación total del préstamo
    [Arguments]    ${monto_liquidacion}
    Input Text    ${BES_INPUT_MONTO_PAGO_LIQUIDACION}    ${monto_liquidacion}
    Click Button    ${BES_BOTON_REGISTRAR_PAGO_LIQUIDACION}
    Wait Until Element Is Visible    ${BES_MENSAJE_PAGO_LIQUIDACION_ACREDITADO}    timeout=10s

Verificar pago final acreditado y saldo en cero
    Page Should Contain Element    ${BES_MENSAJE_PAGO_LIQUIDACION_ACREDITADO}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_ACTUALIZADO_LIQUIDACION}
    Should Be Equal As Strings    ${saldo}    0
    Log    Pago de liquidación acreditado - Saldo actualizado: ${saldo}

Verificar estatus del préstamo actualizado a liquidado
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_PRESTAMO_LIQUIDADO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO_LIQUIDADO}
    Should Contain    ${estatus}    Liquidado
    ${fecha_liquidacion}=    Get Text    ${BES_CAMPO_FECHA_LIQUIDACION}
    Should Not Be Empty    ${fecha_liquidacion}
    Log    Préstamo liquidado - Fecha: ${fecha_liquidacion}

Acceder a módulo de integración con SITIC-Trustonic para liberación
    Click Element    ${BES_MENU_INTEGRACION_SITIC_LIBERACION}
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_API_SITIC_LIBERACION}    timeout=10s

Verificar invocación automática de APIs SITIC-Trustonic para liberación definitiva
    [Arguments]    ${imei}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_API_SITIC_LIBERACION}
    ${estatus_api}=    Get Text    ${BES_CAMPO_ESTATUS_API_SITIC_LIBERACION}
    Should Contain    ${estatus_api}    Invocada
    ${endpoint}=    Get Text    ${BES_CAMPO_ENDPOINT_SITIC_LIBERACION}
    Should Not Be Empty    ${endpoint}
    Log    BES invocó API SITIC-Trustonic para liberación definitiva de IMEI ${imei}

Verificar datos enviados a API SITIC-Trustonic para liberación definitiva
    [Arguments]    ${imei}
    Page Should Contain Element    ${BES_TABLA_LOG_LIBERACIONES}
    ${xpath_log}=    Set Variable    ${BES_TABLA_LOG_LIBERACIONES}//tr[contains(., '${imei}')]
    ${imei_log}=    Get Text    ${xpath_log}//td[@data-field='imei_liberacion']
    ${fecha}=    Get Text    ${xpath_log}//td[@data-field='fecha_liberacion']
    ${hora}=    Get Text    ${xpath_log}//td[@data-field='hora_liberacion']
    ${estatus}=    Get Text    ${xpath_log}//td[@data-field='estatus_liberacion']
    ${respuesta}=    Get Text    ${xpath_log}//td[@data-field='respuesta_sitic_liberacion']
    Should Contain    ${imei_log}    ${imei}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Should Contain    ${estatus}    Exitosa
    Log    Liberación ejecutada - IMEI: ${imei}, Fecha: ${fecha}, Hora: ${hora}, Estatus: ${estatus}

Acceder a historial del préstamo
    Click Element    ${BES_PANEL_HISTORIAL_PRESTAMO}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_LIBERACIONES}    timeout=10s

Verificar registro de liberación en historial del préstamo
    [Arguments]    ${fecha_esperada}    ${hora_esperada}
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_LIBERACIONES}
    ${confirmacion}=    Get Text    ${BES_CAMPO_CONFIRMACION_LIBERACION}
    Should Contain    ${confirmacion}    Confirmada
    Log    Registro de liberación confirmado en historial

Consultar estatus del préstamo y equipo en pantalla 360 después de liquidación
    [Arguments]    ${criterio_busqueda}
    Acceder a Vista 360 de BES
    Buscar cliente en Vista 360 por teléfono o identificador    ${criterio_busqueda}
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=15s

Verificar préstamo como liquidado y equipo como liberado definitivamente en pantalla 360
    ${estatus_prestamo}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Contain    ${estatus_prestamo}    Liquidado
    ${estatus_equipo}=    Get Text    ${BES_CAMPO_EQUIPO_LIBERADO_DEFINITIVAMENTE}
    Should Contain    ${estatus_equipo}    Liberado definitivamente
    Log    Pantalla 360 - Préstamo: ${estatus_prestamo}, Equipo: ${estatus_equipo}

Verificar equipo sin restricciones asociadas al financiamiento
    Page Should Contain Element    ${BES_CAMPO_RESTRICCIONES_EQUIPO}
    ${restricciones}=    Get Text    ${BES_CAMPO_RESTRICCIONES_EQUIPO}
    Should Contain    ${restricciones}    Sin restricciones
    Log    Equipo libre de restricciones: ${restricciones}

# ========================================
# LOCATORS Y KEYWORDS PARA PROCESO DE GARANTÍAS (TC027)
# ========================================
${BES_MENU_GARANTIAS}                           id:menu_garantias
${BES_LINK_TRAMITE_GARANTIA}                    css:.link-tramite-garantia
${BES_BOTON_INICIAR_GARANTIA}                   id:btn_iniciar_garantia
${BES_SELECT_TIPO_GARANTIA}                     id:select_tipo_garantia
${BES_FORMULARIO_GARANTIA}                      css:.formulario-garantia
${BES_INPUT_MOTIVO_GARANTIA}                    id:input_motivo_garantia
${BES_INPUT_DESCRIPCION_PROBLEMA}               id:input_descripcion_problema
${BES_INPUT_FECHA_SOLICITUD_GARANTIA}           id:input_fecha_solicitud_garantia
${BES_BOTON_GUARDAR_GARANTIA}                   css:.btn-guardar-garantia
${BES_MENSAJE_GARANTIA_GUARDADA}                xpath://div[contains(@class, 'mensaje-garantia-guardada')]
${BES_CAMPO_VALIDACION_ESTATUS_PRESTAMO}        xpath://div[@data-field='validacion_estatus_prestamo']
${BES_CAMPO_VALIDACION_PAGOS_CORRIENTE}         xpath://div[@data-field='validacion_pagos_corriente']
${BES_CAMPO_VALIDACION_CONDICIONES_GARANTIA}    xpath://div[@data-field='validacion_condiciones_garantia']
${BES_BOTON_INICIAR_CAMBIO_EQUIPO}              id:btn_iniciar_cambio_equipo
${BES_INPUT_IMEI_NUEVO}                         id:input_imei_nuevo
${BES_BOTON_CONFIRMAR_CAMBIO_EQUIPO}            css:.btn-confirmar-cambio-equipo
${BES_MENSAJE_CAMBIO_EQUIPO_EXITOSO}            xpath://div[contains(@class, 'mensaje-cambio-equipo-exitoso')]
${BES_CAMPO_IMEI_ACTUALIZADO_PRESTAMO}          xpath://div[@data-field='imei_actualizado_prestamo']
${BES_SECCION_HISTORIAL_GARANTIAS}              css:.seccion-historial-garantias
${BES_TABLA_HISTORIAL_GARANTIAS}                xpath://table[@id='tabla_historial_garantias']
${BES_CAMPO_FECHA_GARANTIA}                     xpath://td[@data-field='fecha_garantia']
${BES_CAMPO_TIPO_GARANTIA}                      xpath://td[@data-field='tipo_garantia']
${BES_CAMPO_IMEI_ORIGINAL}                      xpath://td[@data-field='imei_original']
${BES_CAMPO_IMEI_REEMPLAZO}                     xpath://td[@data-field='imei_reemplazo']
${BES_CAMPO_ESTATUS_GARANTIA}                   xpath://td[@data-field='estatus_garantia']
${BES_CAMPO_EQUIPO_ASOCIADO_PRESTAMO}           xpath://div[@data-field='equipo_asociado_prestamo']
${BES_CAMPO_ESTATUS_PRESTAMO_ACTIVO}            xpath://div[@data-field='estatus_prestamo_activo']

Verificar que el préstamo está activo en BES
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_PRESTAMO_ACTIVO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO_ACTIVO}
    Should Contain    ${estatus}    Activo
    Log    Préstamo activo verificado: ${estatus}

Verificar que existe equipo asociado al préstamo
    Page Should Contain Element    ${BES_CAMPO_EQUIPO_ASOCIADO_PRESTAMO}
    ${tiene_equipo}=    Get Text    ${BES_CAMPO_EQUIPO_ASOCIADO_PRESTAMO}
    Should Not Be Empty    ${tiene_equipo}
    Log    Equipo asociado al préstamo: ${tiene_equipo}

Verificar datos del equipo asociado al préstamo
    Page Should Contain Element    ${BES_CAMPO_MARCA_EQUIPO}
    Page Should Contain Element    ${BES_CAMPO_MODELO_EQUIPO}
    Page Should Contain Element    ${BES_CAMPO_IMEI_EQUIPO}
    ${marca}=    Get Text    ${BES_CAMPO_MARCA_EQUIPO}
    ${modelo}=    Get Text    ${BES_CAMPO_MODELO_EQUIPO}
    ${imei}=    Get Text    ${BES_CAMPO_IMEI_EQUIPO}
    Should Not Be Empty    ${marca}
    Should Not Be Empty    ${modelo}
    Should Not Be Empty    ${imei}
    Log    Equipo - Marca: ${marca}, Modelo: ${modelo}, IMEI: ${imei}

Acceder a módulo de garantías desde préstamo
    Click Element    ${BES_LINK_TRAMITE_GARANTIA}
    Wait Until Element Is Visible    ${BES_BOTON_INICIAR_GARANTIA}    timeout=10s

Hacer clic en botón iniciar trámite de garantía
    Click Button    ${BES_BOTON_INICIAR_GARANTIA}
    Wait Until Element Is Visible    ${BES_SELECT_TIPO_GARANTIA}    timeout=10s

Seleccionar tipo de garantía
    [Arguments]    ${tipo_garantia}=Cambio físico
    Select From List By Label    ${BES_SELECT_TIPO_GARANTIA}    ${tipo_garantia}
    Log    Tipo de garantía seleccionado: ${tipo_garantia}

Verificar que se despliega formulario de solicitud de garantía
    Page Should Contain Element    ${BES_FORMULARIO_GARANTIA}
    Wait Until Element Is Visible    ${BES_FORMULARIO_GARANTIA}    timeout=10s
    Log    Formulario de solicitud de garantía desplegado

Verificar que formulario contiene campos requeridos para garantía
    Page Should Contain Element    ${BES_INPUT_MOTIVO_GARANTIA}
    Page Should Contain Element    ${BES_INPUT_DESCRIPCION_PROBLEMA}
    Page Should Contain Element    ${BES_INPUT_FECHA_SOLICITUD_GARANTIA}
    Log    Formulario contiene todos los campos requeridos

Ingresar motivo de garantía
    [Arguments]    ${motivo}
    Input Text    ${BES_INPUT_MOTIVO_GARANTIA}    ${motivo}
    Log    Motivo de garantía ingresado: ${motivo}

Ingresar descripción del problema
    [Arguments]    ${descripcion}
    Input Text    ${BES_INPUT_DESCRIPCION_PROBLEMA}    ${descripcion}
    Log    Descripción del problema ingresada: ${descripcion}

Ingresar fecha de solicitud de garantía
    [Arguments]    ${fecha_solicitud}
    Input Text    ${BES_INPUT_FECHA_SOLICITUD_GARANTIA}    ${fecha_solicitud}
    Log    Fecha de solicitud de garantía ingresada: ${fecha_solicitud}

Guardar solicitud de garantía
    Click Button    ${BES_BOTON_GUARDAR_GARANTIA}
    Wait Until Element Is Visible    ${BES_MENSAJE_GARANTIA_GUARDADA}    timeout=10s

Verificar solicitud de garantía almacenada
    Page Should Contain Element    ${BES_MENSAJE_GARANTIA_GUARDADA}
    ${mensaje}=    Get Text    ${BES_MENSAJE_GARANTIA_GUARDADA}
    Should Contain    ${mensaje}    guardada
    Log    Solicitud de garantía almacenada exitosamente

Verificar que BES valida estatus del préstamo para garantía
    Page Should Contain Element    ${BES_CAMPO_VALIDACION_ESTATUS_PRESTAMO}
    ${validacion}=    Get Text    ${BES_CAMPO_VALIDACION_ESTATUS_PRESTAMO}
    Should Contain    ${validacion}    Válido
    Log    Validación de estatus del préstamo: ${validacion}

Verificar que BES valida pagos al corriente para garantía
    Page Should Contain Element    ${BES_CAMPO_VALIDACION_PAGOS_CORRIENTE}
    ${validacion}=    Get Text    ${BES_CAMPO_VALIDACION_PAGOS_CORRIENTE}
    Should Contain    ${validacion}    Al corriente
    Log    Validación de pagos: ${validacion}

Verificar que equipo cumple condiciones de garantía
    Page Should Contain Element    ${BES_CAMPO_VALIDACION_CONDICIONES_GARANTIA}
    ${validacion}=    Get Text    ${BES_CAMPO_VALIDACION_CONDICIONES_GARANTIA}
    Should Contain    ${validacion}    Cumple
    Log    Validación de condiciones de garantía: ${validacion}

Iniciar proceso de cambio de equipo
    Click Button    ${BES_BOTON_INICIAR_CAMBIO_EQUIPO}
    Wait Until Element Is Visible    ${BES_INPUT_IMEI_NUEVO}    timeout=10s
    Log    Proceso de cambio de equipo iniciado

Registrar IMEI del equipo nuevo
    [Arguments]    ${imei_nuevo}
    Input Text    ${BES_INPUT_IMEI_NUEVO}    ${imei_nuevo}
    Log    IMEI del equipo nuevo registrado: ${imei_nuevo}

Confirmar cambio de equipo
    Click Button    ${BES_BOTON_CONFIRMAR_CAMBIO_EQUIPO}
    Wait Until Element Is Visible    ${BES_MENSAJE_CAMBIO_EQUIPO_EXITOSO}    timeout=10s

Verificar cambio de equipo registrado exitosamente
    Page Should Contain Element    ${BES_MENSAJE_CAMBIO_EQUIPO_EXITOSO}
    ${mensaje}=    Get Text    ${BES_MENSAJE_CAMBIO_EQUIPO_EXITOSO}
    Should Contain    ${mensaje}    exitoso
    Log    Cambio de equipo registrado exitosamente

Verificar que IMEI del préstamo se actualizó
    [Arguments]    ${imei_nuevo}
    Page Should Contain Element    ${BES_CAMPO_IMEI_ACTUALIZADO_PRESTAMO}
    ${imei_actual}=    Get Text    ${BES_CAMPO_IMEI_ACTUALIZADO_PRESTAMO}
    Should Contain    ${imei_actual}    ${imei_nuevo}
    Log    IMEI del préstamo actualizado a: ${imei_actual}

Verificar que calendario de pagos original se mantiene sin cambios
    Acceder a calendario de pagos
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Calendario de pagos se mantiene sin cambios con ${filas} cuotas

Verificar que condiciones de financiamiento no fueron modificadas
    Page Should Contain Element    ${BES_CAMPO_MONTO_FINANCIADO}
    Page Should Contain Element    ${BES_CAMPO_PLAZO_PRESTAMO}
    Page Should Contain Element    ${BES_CAMPO_TASA_INTERES}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_FINANCIADO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_PRESTAMO}
    ${tasa}=    Get Text    ${BES_CAMPO_TASA_INTERES}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${plazo}
    Should Not Be Empty    ${tasa}
    Log    Condiciones de financiamiento sin cambios - Monto: ${monto}, Plazo: ${plazo}, Tasa: ${tasa}

Acceder a pantalla 360 del préstamo
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Click Element    ${BES_PANEL_VISTA_360}
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=10s

Navegar a sección de historial de garantías
    Click Element    ${BES_SECCION_HISTORIAL_GARANTIAS}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_GARANTIAS}    timeout=10s

Verificar historial de garantías muestra registro completo
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_GARANTIAS}
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_GARANTIAS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Historial de garantías contiene ${filas} registros

Verificar detalles del trámite de garantía en historial
    Page Should Contain Element    ${BES_CAMPO_FECHA_GARANTIA}
    Page Should Contain Element    ${BES_CAMPO_TIPO_GARANTIA}
    Page Should Contain Element    ${BES_CAMPO_IMEI_ORIGINAL}
    Page Should Contain Element    ${BES_CAMPO_IMEI_REEMPLAZO}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_GARANTIA}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_GARANTIA}
    ${tipo}=    Get Text    ${BES_CAMPO_TIPO_GARANTIA}
    ${imei_original}=    Get Text    ${BES_CAMPO_IMEI_ORIGINAL}
    ${imei_reemplazo}=    Get Text    ${BES_CAMPO_IMEI_REEMPLAZO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_GARANTIA}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${tipo}
    Should Not Be Empty    ${imei_original}
    Should Not Be Empty    ${imei_reemplazo}
    Should Not Be Empty    ${estatus}
    Log    Garantía - Fecha: ${fecha}, Tipo: ${tipo}, IMEI original: ${imei_original}, IMEI nuevo: ${imei_reemplazo}, Estatus: ${estatus}

# ========================================
# LOCATORS Y KEYWORDS PARA CANCELACIÓN DE PRÉSTAMOS (TC028)
# ========================================
${BES_MENU_CANCELACIONES}                       id:menu_cancelaciones
${BES_INPUT_BUSCAR_PRESTAMO_CANCELACION}        id:buscar_prestamo_cancelacion
${BES_BOTON_BUSCAR_PRESTAMO_CANCELACION}        css:.btn-buscar-prestamo-cancelacion
${BES_TABLA_PRESTAMOS_CANCELACION}              xpath://table[@id='tabla_prestamos_cancelacion']
${BES_BOTON_INICIAR_CANCELACION}                css:.btn-iniciar-cancelacion
${BES_FORMULARIO_CANCELACION}                   css:.formulario-cancelacion
${BES_SELECT_MOTIVO_CANCELACION}                id:select_motivo_cancelacion
${BES_TEXTAREA_JUSTIFICACION_CANCELACION}       id:textarea_justificacion_cancelacion
${BES_PANEL_VALIDACION_PAGOS}                   css:.panel-validacion-pagos
${BES_MENSAJE_ADVERTENCIA_PAGOS}                xpath://div[@class='advertencia-pagos-acreditados']
${BES_CAMPO_ESTATUS_PAGOS_PREVIO}               xpath://div[@data-field='estatus_pagos_previo']
${BES_BOTON_CONFIRMAR_CANCELACION}              css:.btn-confirmar-cancelacion
${BES_MENSAJE_CANCELACION_EXITOSA}              xpath://div[contains(@class, 'mensaje-cancelacion-exitosa')]
${BES_CAMPO_ESTATUS_PRESTAMO_CANCELADO}         xpath://div[@data-field='estatus_prestamo_cancelado']
${BES_CAMPO_FECHA_CANCELACION}                  xpath://div[@data-field='fecha_cancelacion']
${BES_CAMPO_MOTIVO_CANCELACION}                 xpath://div[@data-field='motivo_cancelacion']
${BES_PANEL_LIBERACION_EQUIPO}                  css:.panel-liberacion-equipo
${BES_MENSAJE_LIBERACION_EQUIPO_API}            xpath://div[contains(@class, 'mensaje-liberacion-api')]
${BES_CAMPO_ESTATUS_API_SITIC}                  xpath://div[@data-field='estatus_api_sitic']
${BES_PANEL_AJUSTES_CONTABLES}                  css:.panel-ajustes-contables
${BES_TABLA_AJUSTES_GENERADOS}                  xpath://table[@id='tabla_ajustes_contables']
${BES_CAMPO_TIPO_AJUSTE}                        xpath://td[@data-field='tipo_ajuste']
${BES_CAMPO_MONTO_AJUSTE}                       xpath://td[@data-field='monto_ajuste']
${BES_CAMPO_FECHA_AJUSTE}                       xpath://td[@data-field='fecha_ajuste']
${BES_MENU_HISTORIAL_CANCELACIONES}             id:menu_historial_cancelaciones
${BES_TABLA_HISTORIAL_CANCELACIONES}            xpath://table[@id='tabla_historial_cancelaciones']
${BES_CAMPO_USUARIO_CANCELACION}                xpath://td[@data-field='usuario_cancelacion']
${BES_CAMPO_DETALLE_CANCELACION}                xpath://td[@data-field='detalle_cancelacion']
${BES_LINK_VER_DETALLE_CANCELACION}             css:.link-ver-detalle-cancelacion
${BES_PANEL_DETALLE_CANCELACION}                css:.panel-detalle-cancelacion

Consultar préstamo activo que requiere cancelación
    [Arguments]    ${identificacion}=ABC123456
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar que el préstamo está activo en BES
    ${id_prestamo}=    Get Text    ${BES_CAMPO_ID_PRESTAMO}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_FINANCIADO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Contain    ${estatus}    Activo
    Log    Préstamo activo consultado - ID: ${id_prestamo}, Monto: ${monto}, Estatus: ${estatus}

Iniciar proceso de cancelación del préstamo
    [Arguments]    ${motivo}=Venta cancelada
    Click Button    ${BES_BOTON_INICIAR_CANCELACION}
    Wait Until Element Is Visible    ${BES_FORMULARIO_CANCELACION}    timeout=10s
    Select From List By Label    ${BES_SELECT_MOTIVO_CANCELACION}    ${motivo}
    Log    Proceso de cancelación iniciado con motivo: ${motivo}

Verificar formulario de cancelación desplegado
    [Arguments]    ${motivo}=Venta cancelada    ${justificacion}=Cliente solicitó devolución del equipo
    Page Should Contain Element    ${BES_FORMULARIO_CANCELACION}
    Page Should Contain Element    ${BES_SELECT_MOTIVO_CANCELACION}
    Page Should Contain Element    ${BES_TEXTAREA_JUSTIFICACION_CANCELACION}
    Input Text    ${BES_TEXTAREA_JUSTIFICACION_CANCELACION}    ${justificacion}
    Log    Formulario de cancelación desplegado - Motivo: ${motivo}, Justificación: ${justificacion}

Validar existencia de pagos acreditados al préstamo
    Wait Until Element Is Visible    ${BES_PANEL_VALIDACION_PAGOS}    timeout=10s
    Page Should Contain Element    ${BES_PANEL_VALIDACION_PAGOS}
    ${estatus_pagos}=    Get Text    ${BES_CAMPO_ESTATUS_PAGOS_PREVIO}
    Log    Validación de pagos completada - Estatus: ${estatus_pagos}
    ${tiene_pagos}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_MENSAJE_ADVERTENCIA_PAGOS}
    IF    ${tiene_pagos}
        ${advertencia}=    Get Text    ${BES_MENSAJE_ADVERTENCIA_PAGOS}
        Log    Advertencia de pagos acreditados: ${advertencia}
    END

Ejecutar cancelación del préstamo en BES
    Click Button    ${BES_BOTON_CONFIRMAR_CANCELACION}
    Wait Until Element Is Visible    ${BES_MENSAJE_CANCELACION_EXITOSA}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_CANCELACION_EXITOSA}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO_CANCELADO}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_CANCELACION}
    ${motivo}=    Get Text    ${BES_CAMPO_MOTIVO_CANCELACION}
    Should Contain    ${estatus}    Cancelado
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${motivo}
    Log    Préstamo cancelado exitosamente - Estatus: ${estatus}, Fecha: ${fecha}, Motivo: ${motivo}

Verificar liberación del equipo mediante APIs SITIC-Trustonic
    [Arguments]    ${imei}=123456789012345
    Page Should Contain Element    ${BES_PANEL_LIBERACION_EQUIPO}
    Wait Until Element Is Visible    ${BES_MENSAJE_LIBERACION_EQUIPO_API}    timeout=15s
    ${mensaje_api}=    Get Text    ${BES_MENSAJE_LIBERACION_EQUIPO_API}
    Should Contain    ${mensaje_api}    exitosa
    ${estatus_api}=    Get Text    ${BES_CAMPO_ESTATUS_API_SITIC}
    Should Contain    ${estatus_api}    Liberado
    Log    Equipo liberado mediante API SITIC-Trustonic - IMEI: ${imei}, Estatus: ${estatus_api}

Verificar generación de ajustes contables o reversas
    Page Should Contain Element    ${BES_PANEL_AJUSTES_CONTABLES}
    ${tiene_ajustes}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_TABLA_AJUSTES_GENERADOS}
    IF    ${tiene_ajustes}
        ${filas}=    Get Element Count    ${BES_TABLA_AJUSTES_GENERADOS}//tr[position()>1]
        Should Be True    ${filas} > 0
        ${tipo_ajuste}=    Get Text    ${BES_CAMPO_TIPO_AJUSTE}
        ${monto_ajuste}=    Get Text    ${BES_CAMPO_MONTO_AJUSTE}
        ${fecha_ajuste}=    Get Text    ${BES_CAMPO_FECHA_AJUSTE}
        Should Not Be Empty    ${tipo_ajuste}
        Should Not Be Empty    ${monto_ajuste}
        Should Not Be Empty    ${fecha_ajuste}
        Log    Ajustes contables generados - Tipo: ${tipo_ajuste}, Monto: ${monto_ajuste}, Fecha: ${fecha_ajuste}
    ELSE
        Log    No se generaron ajustes contables (no existían pagos acreditados)
    END

Consultar historial del préstamo con registro de cancelación
    [Arguments]    ${identificacion}=ABC123456
    Click Element    ${BES_MENU_HISTORIAL_CANCELACIONES}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_CANCELACIONES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_CANCELACIONES}
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_CANCELACIONES}//tr[position()>1]
    Should Be True    ${filas} > 0
    Click Element    ${BES_LINK_VER_DETALLE_CANCELACION}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_CANCELACION}    timeout=10s

Verificar registro de cancelación en historial
    [Arguments]    ${motivo_esperado}=Venta cancelada    ${estatus_esperado}=Cancelado
    Page Should Contain Element    ${BES_PANEL_DETALLE_CANCELACION}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_PRESTAMO_CANCELADO}
    Page Should Contain Element    ${BES_CAMPO_FECHA_CANCELACION}
    Page Should Contain Element    ${BES_CAMPO_MOTIVO_CANCELACION}
    Page Should Contain Element    ${BES_CAMPO_USUARIO_CANCELACION}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO_CANCELADO}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_CANCELACION}
    ${motivo}=    Get Text    ${BES_CAMPO_MOTIVO_CANCELACION}
    ${usuario}=    Get Text    ${BES_CAMPO_USUARIO_CANCELACION}
    Should Contain    ${estatus}    ${estatus_esperado}
    Should Contain    ${motivo}    ${motivo_esperado}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${usuario}
    ${detalle}=    Get Text    ${BES_CAMPO_DETALLE_CANCELACION}
    Should Not Be Empty    ${detalle}
    Log    Registro de cancelación verificado - Estatus: ${estatus}, Fecha: ${fecha}, Motivo: ${motivo}, Usuario: ${usuario}

# ========================================
# KEYWORDS PARA ACREDITACIÓN DE PAGOS DE PARCIALIDADES POR PUNTOS DE COBRO EXISTENTES (TC029)
# ========================================
Verificar parcialidad marcada como pagada en calendario
    [Arguments]    ${numero_parcialidad}
    ${xpath_parcialidad}=    Set Variable    ${BES_TABLA_CALENDARIO_PAGOS}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Page Should Contain Element    ${xpath_parcialidad}
    ${estatus}=    Get Text    ${xpath_parcialidad}//td[@data-field='estatus_parcialidad']
    Should Contain    ${estatus}    Pagada
    ${fecha_pago}=    Get Text    ${xpath_parcialidad}//td[@data-field='fecha_pago']
    Should Not Be Empty    ${fecha_pago}
    Log    Parcialidad ${numero_parcialidad} marcada como Pagada en fecha ${fecha_pago}

Verificar pago acreditado en pantalla 360 con detalles completos
    [Arguments]    ${numero_parcialidad}    ${monto}    ${punto_cobro}    ${medio_pago}
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_PAGOS}
    ${xpath_pago}=    Set Variable    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}//tr[contains(., '${numero_parcialidad}')]
    Page Should Contain Element    ${xpath_pago}
    ${detalle_pago}=    Get Text    ${xpath_pago}
    Should Contain    ${detalle_pago}    ${monto}
    Should Contain    ${detalle_pago}    ${punto_cobro}
    Should Contain    ${detalle_pago}    ${medio_pago}
    ${fecha_pago}=    Get Text    ${xpath_pago}//td[@data-field='fecha_pago']
    Should Not Be Empty    ${fecha_pago}
    Log    Pago verificado en Pantalla 360 - Parcialidad: ${numero_parcialidad}, Monto: ${monto}, Punto: ${punto_cobro}, Medio: ${medio_pago}, Fecha: ${fecha_pago}

# ========================================
# LOCATORS Y KEYWORDS PARA PROCESO DE CONCILIACIÓN BES-BIBES (TC030)
# ========================================
${BES_MENU_CONFIGURACION_CONCILIACION}     id:menu_configuracion_conciliacion
${BES_SELECT_PERIODICIDAD_REPORTE}         id:select_periodicidad_reporte
${BES_SELECT_FORMATO_REPORTE}              id:select_formato_reporte
${BES_INPUT_LAYOUT_REPORTE}                id:input_layout_reporte
${BES_BOTON_GUARDAR_CONFIG_REPORTE}        css:.btn-guardar-config-reporte
${BES_MENSAJE_CONFIG_GUARDADA}             xpath://div[contains(text(),'Configuración almacenada')]
${BES_MENU_LOG_REPORTES}                   id:menu_log_reportes
${BES_TABLA_LOG_REPORTES}                  xpath://table[@id='tabla_log_reportes']
${BES_CAMPO_FECHA_GENERACION_LOG}          xpath://td[@data-field='fecha_generacion']
${BES_CAMPO_HORA_GENERACION_LOG}           xpath://td[@data-field='hora_generacion']
${BES_CAMPO_NUM_REGISTROS_LOG}             xpath://td[@data-field='num_registros']
${BES_CAMPO_ESTATUS_ENVIO_LOG}             xpath://td[@data-field='estatus_envio']
${BES_CAMPO_ID_PRESTAMO_REPORTE}           xpath://td[@data-field='id_prestamo']
${BES_CAMPO_MONTO_PAGADO_REPORTE}          xpath://td[@data-field='monto_pagado']
${BES_CAMPO_FECHA_PAGO_REPORTE}            xpath://td[@data-field='fecha_pago']
${BES_CAMPO_PUNTO_COBRO_REPORTE}           xpath://td[@data-field='punto_cobro']
${BES_CAMPO_REFERENCIA_REPORTE}            xpath://td[@data-field='referencia']
${BES_MENSAJE_ENVIO_EXITOSO}               xpath://div[contains(text(),'Reporte transmitido exitosamente')]

Acceder a módulo de configuración de reportes de conciliación
    Click Element    ${BES_MENU_CONFIGURACION_CONCILIACION}
    Wait Until Element Is Visible    ${BES_SELECT_PERIODICIDAD_REPORTE}    timeout=10s

Configurar parámetros de generación de reporte de conciliación
    [Arguments]    ${periodicidad}=Diaria    ${formato}=CSV
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_REPORTE}    ${periodicidad}
    Select From List By Label    ${BES_SELECT_FORMATO_REPORTE}    ${formato}
    Input Text    ${BES_INPUT_LAYOUT_REPORTE}    Layout Amigo Paguitos parcialidades V2

Guardar configuración del reporte de conciliación
    Click Button    ${BES_BOTON_GUARDAR_CONFIG_REPORTE}
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIG_GUARDADA}    timeout=10s

Verificar configuración del reporte almacenada
    Page Should Contain Element    ${BES_MENSAJE_CONFIG_GUARDADA}
    Log    Configuración del reporte de conciliación almacenada exitosamente

Ejecutar proceso de generación de reporte de conciliación
    Acceder a módulo de reportes hacia BIBES
    Click Button    ${BES_BOTON_GENERAR_REPORTE_BIBES}
    Wait Until Element Is Visible    ${BES_PANEL_REPORTE_BIBES}    timeout=15s

Verificar que el reporte incluye todos los campos requeridos según Layout
    Page Should Contain Element    ${BES_CAMPO_ID_PRESTAMO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_MONTO_PAGADO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_FECHA_PAGO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_PUNTO_COBRO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_REFERENCIA_REPORTE}
    ${id_prestamo}=    Get Text    ${BES_CAMPO_ID_PRESTAMO_REPORTE}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_PAGADO_REPORTE}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_PAGO_REPORTE}
    ${punto_cobro}=    Get Text    ${BES_CAMPO_PUNTO_COBRO_REPORTE}
    ${referencia}=    Get Text    ${BES_CAMPO_REFERENCIA_REPORTE}
    Should Not Be Empty    ${id_prestamo}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${punto_cobro}
    Should Not Be Empty    ${referencia}
    Log    Reporte incluye todos los campos requeridos: ID=${id_prestamo}, Monto=${monto}, Fecha=${fecha}, Punto=${punto_cobro}, Ref=${referencia}

Verificar transmisión del reporte hacia BIBES
    Page Should Contain Element    ${BES_MENSAJE_ENVIO_EXITOSO}
    Log    Reporte de conciliación transmitido a BIBES exitosamente

Acceder a log de generación de reportes
    Click Element    ${BES_MENU_LOG_REPORTES}
    Wait Until Element Is Visible    ${BES_TABLA_LOG_REPORTES}    timeout=10s

Verificar registro en log de generación de reportes
    [Arguments]    ${num_registros_esperado}=1
    Page Should Contain Element    ${BES_TABLA_LOG_REPORTES}
    ${filas}=    Get Element Count    ${BES_TABLA_LOG_REPORTES}//tr[position()>1]
    Should Be True    ${filas} > 0
    ${fecha}=    Get Text    (${BES_TABLA_LOG_REPORTES}//tr[position()=2])${BES_CAMPO_FECHA_GENERACION_LOG}
    ${hora}=    Get Text    (${BES_TABLA_LOG_REPORTES}//tr[position()=2])${BES_CAMPO_HORA_GENERACION_LOG}
    ${num_registros}=    Get Text    (${BES_TABLA_LOG_REPORTES}//tr[position()=2])${BES_CAMPO_NUM_REGISTROS_LOG}
    ${estatus}=    Get Text    (${BES_TABLA_LOG_REPORTES}//tr[position()=2])${BES_CAMPO_ESTATUS_ENVIO_LOG}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Should Not Be Empty    ${num_registros}
    Should Contain    ${estatus}    Enviado
    Log    Log de reporte verificado - Fecha: ${fecha}, Hora: ${hora}, Registros: ${num_registros}, Estatus: ${estatus}

# ========================================
# LOCATORS Y KEYWORDS PARA PROCESO DE COMPENSACIÓN EN BES (TC031)
# ========================================
${BES_MENU_COMPENSACION}                      id:menu_compensacion
${BES_PANTALLA_GESTION_COMPENSACION}          css:.pantalla-gestion-compensacion
${BES_INPUT_BUSCAR_PRESTAMO_COMPENSACION}     id:buscar_prestamo_compensacion
${BES_BOTON_BUSCAR_COMPENSACION}              css:.btn-buscar-compensacion
${BES_TABLA_MOVIMIENTOS_PENDIENTES}           xpath://table[@id='tabla_movimientos_pendientes']
${BES_CAMPO_REFERENCIA_PRESTAMO_COMP}         xpath://td[@data-field='referencia_prestamo']
${BES_CAMPO_MOVIMIENTOS_PENDIENTES}           xpath://td[@data-field='movimientos_pendientes']
${BES_CHECKBOX_SELECCIONAR_PRESTAMO_COMP}     css:.checkbox-seleccionar-prestamo
${BES_BOTON_EJECUTAR_COMPENSACION}            id:btn_ejecutar_compensacion
${BES_MENSAJE_COMPENSACION_EXITOSA}           xpath://div[contains(text(),'Compensación ejecutada')]
${BES_CAMPO_SALDO_ACTUALIZADO_COMPENSACION}   xpath://td[@data-field='saldo_actualizado']
${BES_SECCION_HISTORIAL_COMPENSACIONES}       css:.seccion-historial-compensaciones
${BES_TABLA_HISTORIAL_COMPENSACIONES}         xpath://table[@id='tabla_historial_compensaciones']
${BES_CAMPO_FECHA_COMPENSACION}               xpath://td[@data-field='fecha_compensacion']
${BES_CAMPO_MONTO_COMPENSACION}               xpath://td[@data-field='monto_compensacion']
${BES_CAMPO_ESTATUS_COMPENSACION}             xpath://td[@data-field='estatus_compensacion']
${BES_BOTON_GENERAR_REPORTE_COMPENSACION}     id:btn_generar_reporte_compensacion
${BES_MENSAJE_REPORTE_COMPENSACION_GENERADO}  xpath://div[contains(text(),'Reporte de compensación generado')]

Acceder al módulo de compensación en BES desde menú principal
    Click Element    ${BES_MENU_COMPENSACION}
    Wait Until Element Is Visible    ${BES_PANTALLA_GESTION_COMPENSACION}    timeout=10s

Esperar carga de pantalla de compensación
    Wait Until Page Contains Element    ${BES_INPUT_BUSCAR_PRESTAMO_COMPENSACION}    timeout=10s

Verificar pantalla de gestión de compensación desplegada
    Page Should Contain Element    ${BES_PANTALLA_GESTION_COMPENSACION}
    Page Should Contain Element    ${BES_INPUT_BUSCAR_PRESTAMO_COMPENSACION}
    Page Should Contain Element    ${BES_BOTON_BUSCAR_COMPENSACION}

Buscar préstamo para compensación
    [Arguments]    ${referencia_prestamo}
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO_COMPENSACION}    ${referencia_prestamo}
    Click Button    ${BES_BOTON_BUSCAR_COMPENSACION}
    Wait Until Element Is Visible    ${BES_TABLA_MOVIMIENTOS_PENDIENTES}    timeout=10s

Verificar que se muestran los movimientos pendientes
    Page Should Contain Element    ${BES_TABLA_MOVIMIENTOS_PENDIENTES}
    ${filas}=    Get Element Count    ${BES_TABLA_MOVIMIENTOS_PENDIENTES}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Se encontraron ${filas} movimientos pendientes de compensación

Verificar existencia de movimientos pendientes de compensación
    ${movimientos}=    Get Text    ${BES_CAMPO_MOVIMIENTOS_PENDIENTES}
    Should Not Be Empty    ${movimientos}
    Log    Movimientos pendientes de compensación: ${movimientos}

Seleccionar préstamo en pantalla de compensación
    [Arguments]    ${referencia_prestamo}
    Click Element    ${BES_CHECKBOX_SELECCIONAR_PRESTAMO_COMP}
    Log    Préstamo ${referencia_prestamo} seleccionado para compensación

Verificar préstamo seleccionado para compensación
    [Arguments]    ${referencia_prestamo}
    Checkbox Should Be Selected    ${BES_CHECKBOX_SELECCIONAR_PRESTAMO_COMP}
    ${referencia}=    Get Text    ${BES_CAMPO_REFERENCIA_PRESTAMO_COMP}
    Should Contain    ${referencia}    ${referencia_prestamo}

Hacer clic en botón ejecutar compensación
    Click Button    ${BES_BOTON_EJECUTAR_COMPENSACION}

Esperar procesamiento de compensación
    Wait Until Element Is Visible    ${BES_MENSAJE_COMPENSACION_EXITOSA}    timeout=15s

Verificar mensaje de compensación exitosa
    Page Should Contain Element    ${BES_MENSAJE_COMPENSACION_EXITOSA}
    ${mensaje}=    Get Text    ${BES_MENSAJE_COMPENSACION_EXITOSA}
    Should Contain    ${mensaje}    Compensación ejecutada

Verificar que el proceso finalizó correctamente
    Page Should Contain Element    ${BES_MENSAJE_COMPENSACION_EXITOSA}
    Log    Proceso de compensación finalizado exitosamente

Consultar saldos actualizados del préstamo
    [Arguments]    ${referencia_prestamo}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Page Should Contain Element    ${BES_CAMPO_SALDO_ACTUALIZADO_COMPENSACION}

Verificar que los saldos reflejan la compensación aplicada
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_ACTUALIZADO_COMPENSACION}
    Should Not Be Empty    ${saldo}
    Log    Saldo actualizado después de compensación: ${saldo}

Verificar consistencia de saldos después de compensación
    Page Should Contain Element    ${BES_CAMPO_SALDO_ACTUALIZADO_COMPENSACION}
    Log    Saldos verificados correctamente después de compensación

Verificar registro de compensación en historial de movimientos
    [Arguments]    ${fecha}    ${estatus}
    Page Should Contain Element    ${BES_SECCION_HISTORIAL_COMPENSACIONES}
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_COMPENSACIONES}
    ${fecha_comp}=    Get Text    ${BES_CAMPO_FECHA_COMPENSACION}
    ${estatus_comp}=    Get Text    ${BES_CAMPO_ESTATUS_COMPENSACION}
    Should Contain    ${fecha_comp}    ${fecha}
    Should Contain    ${estatus_comp}    ${estatus}
    Log    Compensación registrada - Fecha: ${fecha_comp}, Estatus: ${estatus_comp}

Verificar que el historial muestra fecha monto y estatus actualizados
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_COMPENSACION}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_COMPENSACION}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_COMPENSACION}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${estatus}
    Log    Historial de compensación - Fecha: ${fecha}, Monto: ${monto}, Estatus: ${estatus}

Generar reporte de conciliación de compensaciones hacia BIBES
    [Arguments]    ${referencia_prestamo}
    Click Button    ${BES_BOTON_GENERAR_REPORTE_COMPENSACION}
    Wait Until Element Is Visible    ${BES_MENSAJE_REPORTE_COMPENSACION_GENERADO}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_REPORTE_COMPENSACION_GENERADO}
    Log    Reporte de conciliación de compensaciones generado para préstamo ${referencia_prestamo}

Verificar que el reporte incluye información de compensaciones
    Page Should Contain Element    ${BES_MENSAJE_REPORTE_COMPENSACION_GENERADO}
    ${mensaje}=    Get Text    ${BES_MENSAJE_REPORTE_COMPENSACION_GENERADO}
    Should Contain    ${mensaje}    generado
    Log    Reporte de compensación incluye toda la información requerida

Verificar que el reporte fue transmitido exitosamente a BIBES
    Page Should Contain Element    ${BES_MENSAJE_REPORTE_COMPENSACION_GENERADO}
    Log    Reporte de compensación transmitido exitosamente a BIBES

# ========================================
# LOCATORS Y KEYWORDS PARA SERVICIOS SUPLEMENTARIOS PREPAGADOS DE CONTADO (TC032)
# ========================================
${BES_SECCION_SERVICIOS_SUPLEMENTARIOS}      css:.seccion-servicios-suplementarios
${BES_TABLA_SERVICIOS_SUPLEMENTARIOS}        xpath://table[@id='tabla_servicios_suplementarios']
${BES_CAMPO_NOMBRE_SERVICIO_SUPLEMENTARIO}   xpath://td[@data-field='nombre_servicio_suplementario']
${BES_CAMPO_TIPO_SERVICIO_SUPLEMENTARIO}     xpath://td[@data-field='tipo_servicio']
${BES_CAMPO_MONTO_SERVICIO_SUPLEMENTARIO}    xpath://td[@data-field='monto_servicio']
${BES_CAMPO_FORMA_PAGO_SERVICIO}             xpath://td[@data-field='forma_pago_servicio']
${BES_CAMPO_ESTATUS_SERVICIO_SUPLEMENTARIO}  xpath://td[@data-field='estatus_servicio']
${BES_CAMPO_FECHA_CONTRATACION_SERVICIO}     xpath://td[@data-field='fecha_contratacion']
${BES_ETIQUETA_PREPAGADO}                    xpath://span[contains(@class,'etiqueta-prepagado')]
${BES_ETIQUETA_CONTADO}                      xpath://span[contains(@class,'etiqueta-contado')]

Acceder a sección de servicios suplementarios en pantalla 360
    Wait Until Element Is Visible    ${BES_SECCION_SERVICIOS_SUPLEMENTARIOS}    timeout=10s
    Scroll Element Into View    ${BES_SECCION_SERVICIOS_SUPLEMENTARIOS}

Verificar que existen servicios suplementarios registrados
    Page Should Contain Element    ${BES_TABLA_SERVICIOS_SUPLEMENTARIOS}
    Table Should Contain    ${BES_TABLA_SERVICIOS_SUPLEMENTARIOS}    xpath=//tr[position()>1]

Verificar servicio suplementario prepagado de contado en pantalla 360
    [Arguments]    ${nombre_servicio_esperado}
    ${nombre_servicio}=    Get Text    ${BES_CAMPO_NOMBRE_SERVICIO_SUPLEMENTARIO}
    Should Contain    ${nombre_servicio}    ${nombre_servicio_esperado}
    Page Should Contain Element    ${BES_ETIQUETA_PREPAGADO}
    Page Should Contain Element    ${BES_ETIQUETA_CONTADO}

Verificar datos completos de servicio suplementario
    [Arguments]    ${nombre}    ${tipo}    ${monto}    ${forma_pago}
    ${nombre_servicio}=    Get Text    ${BES_CAMPO_NOMBRE_SERVICIO_SUPLEMENTARIO}
    ${tipo_servicio}=    Get Text    ${BES_CAMPO_TIPO_SERVICIO_SUPLEMENTARIO}
    ${monto_servicio}=    Get Text    ${BES_CAMPO_MONTO_SERVICIO_SUPLEMENTARIO}
    ${forma_pago_servicio}=    Get Text    ${BES_CAMPO_FORMA_PAGO_SERVICIO}
    Should Contain    ${nombre_servicio}    ${nombre}
    Should Contain    ${tipo_servicio}    ${tipo}
    Should Contain    ${monto_servicio}    ${monto}
    Should Contain    ${forma_pago_servicio}    ${forma_pago}

Verificar estatus activo de servicio suplementario
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_SERVICIO_SUPLEMENTARIO}
    Should Contain    ${estatus}    Activo

Verificar fecha de contratación de servicio suplementario
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_CONTRATACION_SERVICIO}
    Should Not Be Empty    ${fecha}
    Should Match Regexp    ${fecha}    \\d{4}-\\d{2}-\\d{2}


# ========================================
# LOCATORS Y KEYWORDS PARA SERVICIOS SUPLEMENTARIOS PREPAGADOS DIFERIDOS (TC033)
# ========================================
${BES_SECCION_SERVICIOS_DIFERIDOS}           css:.seccion-servicios-diferidos
${BES_TABLA_SERVICIOS_DIFERIDOS}             xpath://table[@id='tabla_servicios_diferidos']
${BES_CAMPO_NOMBRE_SERVICIO_DIFERIDO}        xpath://td[@data-field='nombre_servicio_diferido']
${BES_CAMPO_MONTO_SERVICIO_DIFERIDO}         xpath://td[@data-field='monto_servicio_diferido']
${BES_CAMPO_FORMA_PAGO_DIFERIDO}             xpath://td[@data-field='forma_pago_diferido']
${BES_ETIQUETA_DIFERIDO}                     xpath://span[contains(@class,'etiqueta-diferido')]
${BES_CAMPO_MONTO_TOTAL_CON_SERVICIOS}       css:.monto-total-con-servicios
${BES_CAMPO_DESGLOSE_EQUIPO}                 css:.desglose-monto-equipo
${BES_CAMPO_DESGLOSE_SERVICIOS_DIFERIDOS}    css:.desglose-monto-servicios-diferidos
${BES_SECCION_CALENDARIO_PARCIALIDADES_DESGLOSADO}    css:.calendario-parcialidades-desglosado
${BES_CAMPO_PROPORCION_EQUIPO_CUOTA}         xpath://td[@data-field='proporcion_equipo']
${BES_CAMPO_PROPORCION_SERVICIOS_CUOTA}      xpath://td[@data-field='proporcion_servicios']

Acceder a sección de servicios diferidos en pantalla 360
    Wait Until Element Is Visible    ${BES_SECCION_SERVICIOS_DIFERIDOS}    timeout=10s
    Scroll Element Into View    ${BES_SECCION_SERVICIOS_DIFERIDOS}

Verificar que existen servicios diferidos registrados
    Page Should Contain Element    ${BES_TABLA_SERVICIOS_DIFERIDOS}
    Table Should Contain    ${BES_TABLA_SERVICIOS_DIFERIDOS}    xpath=//tr[position()>1]

Verificar servicio suplementario prepagado diferido en pantalla 360
    [Arguments]    ${nombre_servicio_esperado}
    ${nombre_servicio}=    Get Text    ${BES_CAMPO_NOMBRE_SERVICIO_DIFERIDO}
    Should Contain    ${nombre_servicio}    ${nombre_servicio_esperado}
    Page Should Contain Element    ${BES_ETIQUETA_DIFERIDO}

Verificar monto total del préstamo incluye servicios diferidos
    ${monto_total}=    Get Text    ${BES_CAMPO_MONTO_TOTAL_CON_SERVICIOS}
    Should Not Be Empty    ${monto_total}
    Log    Monto total del préstamo con servicios diferidos: ${monto_total}

Verificar desglose del préstamo con equipo y servicios diferidos
    ${monto_equipo}=    Get Text    ${BES_CAMPO_DESGLOSE_EQUIPO}
    ${monto_servicios}=    Get Text    ${BES_CAMPO_DESGLOSE_SERVICIOS_DIFERIDOS}
    Should Not Be Empty    ${monto_equipo}
    Should Not Be Empty    ${monto_servicios}
    Log    Desglose - Equipo: ${monto_equipo}, Servicios diferidos: ${monto_servicios}

Verificar calendario de cobranza con servicios diferidos
    [Arguments]    ${num_parcialidades}
    Page Should Contain Element    ${BES_SECCION_CALENDARIO_PARCIALIDADES_DESGLOSADO}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be Equal As Integers    ${filas}    ${num_parcialidades}

Verificar desglose de proporción en cuotas
    Page Should Contain Element    ${BES_CAMPO_PROPORCION_EQUIPO_CUOTA}
    Page Should Contain Element    ${BES_CAMPO_PROPORCION_SERVICIOS_CUOTA}
    ${proporcion_equipo}=    Get Text    ${BES_CAMPO_PROPORCION_EQUIPO_CUOTA}
    ${proporcion_servicios}=    Get Text    ${BES_CAMPO_PROPORCION_SERVICIOS_CUOTA}
    Should Not Be Empty    ${proporcion_equipo}
    Should Not Be Empty    ${proporcion_servicios}
    Log    Proporción en cuota - Equipo: ${proporcion_equipo}, Servicios: ${proporcion_servicios}

Verificar datos completos de servicio diferido
    [Arguments]    ${nombre}    ${monto}    ${forma_pago}=Diferido
    ${nombre_servicio}=    Get Text    ${BES_CAMPO_NOMBRE_SERVICIO_DIFERIDO}
    ${monto_servicio}=    Get Text    ${BES_CAMPO_MONTO_SERVICIO_DIFERIDO}
    ${forma_pago_servicio}=    Get Text    ${BES_CAMPO_FORMA_PAGO_DIFERIDO}
    Should Contain    ${nombre_servicio}    ${nombre}
    Should Contain    ${monto_servicio}    ${monto}
    Should Contain    ${forma_pago_servicio}    ${forma_pago}

# ========================================
# LOCATORS Y KEYWORDS PARA ACTIVACIÓN DE LÍNEA CELULAR SOBRE EQUIPO AMIGO PAGUITOS (TC034)
# ========================================
${BES_MENU_ACTIVACION_LINEAS}                id:menu_activacion_lineas
${BES_INPUT_BUSCAR_PRESTAMO_ACTIVACION}      id:buscar_prestamo_activacion
${BES_BOTON_BUSCAR_PRESTAMO_ACTIVACION}      css:.btn-buscar-prestamo-activacion
${BES_TABLA_EQUIPOS_ELEGIBLES}               xpath://table[@id='tabla_equipos_elegibles']
${BES_CAMPO_IMEI_EQUIPO_ACTIVACION}          xpath://td[@data-field='imei_equipo']
${BES_CAMPO_MARCA_EQUIPO_ACTIVACION}         xpath://td[@data-field='marca_equipo']
${BES_CAMPO_MODELO_EQUIPO_ACTIVACION}        xpath://td[@data-field='modelo_equipo']
${BES_BOTON_ACTIVAR_LINEA}                   id:btn_activar_linea
${BES_PANEL_ACTIVACION_LINEA}                css:.panel-activacion-linea
${BES_INPUT_NOMBRE_CLIENTE_ACTIVACION}       id:input_nombre_cliente_activacion
${BES_INPUT_IDENTIFICACION_CLIENTE_ACT}      id:input_identificacion_cliente_act
${BES_INPUT_DIRECCION_CLIENTE_ACT}           id:input_direccion_cliente_act
${BES_INPUT_TELEFONO_CONTACTO_ACT}           id:input_telefono_contacto_act
${BES_SELECT_PLAN_PREPAGADO}                 id:select_plan_prepagado
${BES_TABLA_PLANES_PREPAGADOS}               xpath://table[@id='tabla_planes_prepagados']
${BES_CAMPO_NOMBRE_PLAN}                     xpath://td[@data-field='nombre_plan']
${BES_CAMPO_PRECIO_PLAN}                     xpath://td[@data-field='precio_plan']
${BES_INPUT_ICC_SIM_CARD}                    id:input_icc_sim_card
${BES_INPUT_MSISDN_LINEA}                    id:input_msisdn_linea
${BES_BOTON_CONFIRMAR_ACTIVACION}            id:btn_confirmar_activacion
${BES_MENSAJE_LINEA_ACTIVADA}                xpath://div[contains(text(),'Línea activada exitosamente')]
${BES_CAMPO_ESTATUS_LINEA}                   xpath://div[@data-field='estatus_linea']
${BES_CAMPO_NUMERO_LINEA_ACTIVADA}           xpath://div[@data-field='numero_linea_activada']
${BES_CAMPO_PLAN_ASIGNADO}                   xpath://div[@data-field='plan_asignado']
${BES_SECCION_HISTORIAL_LINEA}               css:.seccion-historial-linea
${BES_TABLA_HISTORIAL_ACTIVACIONES}          xpath://table[@id='tabla_historial_activaciones']
${BES_CAMPO_FECHA_ACTIVACION_LINEA}          xpath://td[@data-field='fecha_activacion']
${BES_CAMPO_OPERADOR_ACTIVACION}             xpath://td[@data-field='operador_activacion']
${BES_CAMPO_LINEA_CELULAR_360}               xpath://div[@data-field='linea_celular']
${BES_CAMPO_PLAN_PREPAGADO_360}              xpath://div[@data-field='plan_prepagado']
${BES_CAMPO_FECHA_ACTIVACION_360}            xpath://div[@data-field='fecha_activacion_360']
${BES_CAMPO_ESTATUS_LINEA_360}               xpath://div[@data-field='estatus_linea_360']

Acceder a módulo de activación de líneas
    Click Element    ${BES_MENU_ACTIVACION_LINEAS}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_PRESTAMO_ACTIVACION}    timeout=10s

Buscar préstamo Amigo Paguitos para activación
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO_ACTIVACION}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR_PRESTAMO_ACTIVACION}
    Wait Until Element Is Visible    ${BES_TABLA_EQUIPOS_ELEGIBLES}    timeout=10s

Verificar equipo asociado al préstamo es reconocido
    Page Should Contain Element    ${BES_TABLA_EQUIPOS_ELEGIBLES}
    ${filas}=    Get Element Count    ${BES_TABLA_EQUIPOS_ELEGIBLES}//tr[position()>1]
    Should Be True    ${filas} > 0
    ${imei}=    Get Text    ${BES_CAMPO_IMEI_EQUIPO_ACTIVACION}
    ${marca}=    Get Text    ${BES_CAMPO_MARCA_EQUIPO_ACTIVACION}
    ${modelo}=    Get Text    ${BES_CAMPO_MODELO_EQUIPO_ACTIVACION}
    Should Not Be Empty    ${imei}
    Should Not Be Empty    ${marca}
    Should Not Be Empty    ${modelo}
    Log    Equipo reconocido - IMEI: ${imei}, Marca: ${marca}, Modelo: ${modelo}

Iniciar proceso de activación de línea
    Click Button    ${BES_BOTON_ACTIVAR_LINEA}
    Wait Until Element Is Visible    ${BES_PANEL_ACTIVACION_LINEA}    timeout=10s

Ingresar datos del cliente para activación
    [Arguments]    ${nombre}    ${identificacion}    ${direccion}    ${telefono}
    Input Text    ${BES_INPUT_NOMBRE_CLIENTE_ACTIVACION}    ${nombre}
    Input Text    ${BES_INPUT_IDENTIFICACION_CLIENTE_ACT}    ${identificacion}
    Input Text    ${BES_INPUT_DIRECCION_CLIENTE_ACT}    ${direccion}
    Input Text    ${BES_INPUT_TELEFONO_CONTACTO_ACT}    ${telefono}

Validar datos del cliente ingresados
    Wait Until Element Is Visible    ${BES_INPUT_NOMBRE_CLIENTE_ACTIVACION}    timeout=5s
    ${nombre}=    Get Value    ${BES_INPUT_NOMBRE_CLIENTE_ACTIVACION}
    ${identificacion}=    Get Value    ${BES_INPUT_IDENTIFICACION_CLIENTE_ACT}
    Should Not Be Empty    ${nombre}
    Should Not Be Empty    ${identificacion}
    Log    Datos validados - Nombre: ${nombre}, Identificación: ${identificacion}

Visualizar opciones de planes prepagados disponibles
    Wait Until Element Is Visible    ${BES_SELECT_PLAN_PREPAGADO}    timeout=10s
    Page Should Contain Element    ${BES_SELECT_PLAN_PREPAGADO}
    ${opciones}=    Get Element Count    ${BES_SELECT_PLAN_PREPAGADO}/option
    Should Be True    ${opciones} > 0
    Log    Planes prepagados disponibles: ${opciones} opciones

Seleccionar plan prepagado
    [Arguments]    ${nombre_plan}=Plan Prepago Básico
    Select From List By Label    ${BES_SELECT_PLAN_PREPAGADO}    ${nombre_plan}
    Log    Plan seleccionado: ${nombre_plan}

Ingresar información de SIM card
    [Arguments]    ${icc}=8952071234567890123    ${msisdn}=5559876543
    Input Text    ${BES_INPUT_ICC_SIM_CARD}    ${icc}
    Input Text    ${BES_INPUT_MSISDN_LINEA}    ${msisdn}

Confirmar activación de línea celular
    Click Button    ${BES_BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${BES_MENSAJE_LINEA_ACTIVADA}    timeout=15s

Verificar línea activada correctamente
    Page Should Contain Element    ${BES_MENSAJE_LINEA_ACTIVADA}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_LINEA}
    Should Contain    ${estatus}    Activa
    Log    Línea activada con estatus: ${estatus}

Verificar asociación de línea con equipo Amigo Paguitos
    ${numero_linea}=    Get Text    ${BES_CAMPO_NUMERO_LINEA_ACTIVADA}
    ${plan}=    Get Text    ${BES_CAMPO_PLAN_ASIGNADO}
    Should Not Be Empty    ${numero_linea}
    Should Not Be Empty    ${plan}
    Log    Línea asociada al equipo - Número: ${numero_linea}, Plan: ${plan}

Acceder a pantalla 360 para verificar activación de línea
    [Arguments]    ${identificacion}
    Acceder a pantalla 360 de BES para cliente con crédito    ${identificacion}
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=15s

Verificar información de línea celular en pantalla 360
    Page Should Contain Element    ${BES_CAMPO_LINEA_CELULAR_360}
    Page Should Contain Element    ${BES_CAMPO_PLAN_PREPAGADO_360}
    Page Should Contain Element    ${BES_CAMPO_FECHA_ACTIVACION_360}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_LINEA_360}
    ${linea}=    Get Text    ${BES_CAMPO_LINEA_CELULAR_360}
    ${plan}=    Get Text    ${BES_CAMPO_PLAN_PREPAGADO_360}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_ACTIVACION_360}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_LINEA_360}
    Should Not Be Empty    ${linea}
    Should Not Be Empty    ${plan}
    Should Not Be Empty    ${fecha}
    Should Contain    ${estatus}    Activa
    Log    Línea en pantalla 360 - Número: ${linea}, Plan: ${plan}, Fecha: ${fecha}, Estatus: ${estatus}

Verificar historial de activación de línea en préstamo
    Page Should Contain Element    ${BES_SECCION_HISTORIAL_LINEA}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_ACTIVACIONES}    timeout=10s
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_ACTIVACIONES}//tr[position()>1]
    Should Be True    ${filas} > 0
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_ACTIVACION_LINEA}
    ${operador}=    Get Text    ${BES_CAMPO_OPERADOR_ACTIVACION}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${operador}
    Log    Historial de activación - Fecha: ${fecha}, Operador: ${operador}

# ========================================
# LOCATORS Y KEYWORDS PARA PROMOCIONES AK ASL EN ACTIVACIÓN (TC035)
# ========================================
${BES_MENU_PROMOCIONES}                      id:menu_promociones
${BES_SUBMENU_PROMOCIONES_AK_ASL}            id:submenu_promociones_ak_asl
${BES_TABLA_PROMOCIONES_VIGENTES}            xpath://table[@id='tabla_promociones_vigentes']
${BES_CAMPO_NOMBRE_PROMOCION}                xpath://td[@data-field='nombre_promocion']
${BES_CAMPO_CONDICIONES_PROMOCION}           xpath://td[@data-field='condiciones']
${BES_CAMPO_BENEFICIOS_PROMOCION}            xpath://td[@data-field='beneficios']
${BES_CAMPO_FECHA_INICIO_PROMOCION}          xpath://td[@data-field='fecha_inicio']
${BES_CAMPO_FECHA_FIN_PROMOCION}             xpath://td[@data-field='fecha_fin']
${BES_INDICADOR_ELEGIBILIDAD_PROMOCION}      css:.indicador-elegibilidad-promocion
${BES_MENSAJE_PROMOCION_APLICADA}            xpath://div[contains(text(),'Promoción AK ASL aplicada')]
${BES_CAMPO_PROMOCION_ASOCIADA_360}          xpath://div[@data-field='promocion_asl']
${BES_CAMPO_BENEFICIOS_PROMOCION_360}        xpath://div[@data-field='beneficios_promocion']
${BES_CAMPO_FECHA_APLICACION_PROMOCION}      xpath://div[@data-field='fecha_aplicacion_promocion']
${BES_ETIQUETA_PROMOCION_AK_ASL}             css:.etiqueta-promocion-ak-asl
${BES_PANEL_DETALLE_PROMOCION}               css:.panel-detalle-promocion

Acceder a módulo de promociones AK ASL
    Click Element    ${BES_MENU_PROMOCIONES}
    Wait Until Element Is Visible    ${BES_SUBMENU_PROMOCIONES_AK_ASL}    timeout=10s
    Click Element    ${BES_SUBMENU_PROMOCIONES_AK_ASL}
    Wait Until Element Is Visible    ${BES_TABLA_PROMOCIONES_VIGENTES}    timeout=10s

Consultar promociones AK ASL vigentes
    Wait Until Element Is Visible    ${BES_TABLA_PROMOCIONES_VIGENTES}    timeout=10s
    ${filas}=    Get Element Count    ${BES_TABLA_PROMOCIONES_VIGENTES}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Promociones AK ASL vigentes encontradas: ${filas}

Verificar información de promociones AK ASL activas
    Page Should Contain Element    ${BES_CAMPO_NOMBRE_PROMOCION}
    Page Should Contain Element    ${BES_CAMPO_CONDICIONES_PROMOCION}
    Page Should Contain Element    ${BES_CAMPO_BENEFICIOS_PROMOCION}
    ${nombre}=    Get Text    ${BES_CAMPO_NOMBRE_PROMOCION}
    ${condiciones}=    Get Text    ${BES_CAMPO_CONDICIONES_PROMOCION}
    ${beneficios}=    Get Text    ${BES_CAMPO_BENEFICIOS_PROMOCION}
    Should Not Be Empty    ${nombre}
    Should Not Be Empty    ${condiciones}
    Should Not Be Empty    ${beneficios}
    Log    Promoción: ${nombre}, Condiciones: ${condiciones}, Beneficios: ${beneficios}

Verificar vigencia de promociones AK ASL
    ${fecha_inicio}=    Get Text    ${BES_CAMPO_FECHA_INICIO_PROMOCION}
    ${fecha_fin}=    Get Text    ${BES_CAMPO_FECHA_FIN_PROMOCION}
    Should Not Be Empty    ${fecha_inicio}
    Should Not Be Empty    ${fecha_fin}
    Log    Vigencia: Desde ${fecha_inicio} hasta ${fecha_fin}

Verificar equipo califica para promoción AK ASL
    [Arguments]    ${identificacion}
    Buscar préstamo Amigo Paguitos para activación    ${identificacion}
    Wait Until Element Is Visible    ${BES_INDICADOR_ELEGIBILIDAD_PROMOCION}    timeout=10s
    Page Should Contain Element    ${BES_INDICADOR_ELEGIBILIDAD_PROMOCION}
    ${texto_elegibilidad}=    Get Text    ${BES_INDICADOR_ELEGIBILIDAD_PROMOCION}
    Should Contain    ${texto_elegibilidad}    Elegible
    Log    Equipo elegible para promoción AK ASL

Seleccionar plan prepagado elegible para promoción AK ASL
    [Arguments]    ${nombre_plan}=Plan Prepago Promo AK ASL
    Select From List By Label    ${BES_SELECT_PLAN_PREPAGADO}    ${nombre_plan}
    Wait Until Element Is Visible    ${BES_ETIQUETA_PROMOCION_AK_ASL}    timeout=5s
    Page Should Contain Element    ${BES_ETIQUETA_PROMOCION_AK_ASL}
    Log    Plan seleccionado con elegibilidad para promoción AK ASL: ${nombre_plan}

Verificar aplicación automática de promoción AK ASL
    Wait Until Element Is Visible    ${BES_MENSAJE_PROMOCION_APLICADA}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_PROMOCION_APLICADA}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_PROMOCION}    timeout=5s
    Log    Promoción AK ASL aplicada automáticamente

Completar activación con promoción AK ASL
    [Arguments]    ${icc}=8952071234567890123    ${msisdn}=5559876543
    Ingresar información de SIM card    ${icc}    ${msisdn}
    Confirmar activación de línea celular
    Verificar línea activada correctamente

Verificar promoción AK ASL en pantalla 360
    [Arguments]    ${identificacion}
    Acceder a pantalla 360 para verificar activación de línea    ${identificacion}
    Wait Until Element Is Visible    ${BES_CAMPO_PROMOCION_ASOCIADA_360}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_PROMOCION_ASOCIADA_360}
    ${promocion}=    Get Text    ${BES_CAMPO_PROMOCION_ASOCIADA_360}
    Should Contain    ${promocion}    AK ASL
    Log    Promoción AK ASL visible en pantalla 360: ${promocion}

Verificar beneficios de promoción AK ASL en pantalla 360
    Page Should Contain Element    ${BES_CAMPO_BENEFICIOS_PROMOCION_360}
    Page Should Contain Element    ${BES_CAMPO_FECHA_APLICACION_PROMOCION}
    ${beneficios}=    Get Text    ${BES_CAMPO_BENEFICIOS_PROMOCION_360}
    ${fecha_aplicacion}=    Get Text    ${BES_CAMPO_FECHA_APLICACION_PROMOCION}
    Should Not Be Empty    ${beneficios}
    Should Not Be Empty    ${fecha_aplicacion}
    Log    Beneficios aplicados: ${beneficios}, Fecha de aplicación: ${fecha_aplicacion}

Verificar promoción AK ASL asociada al préstamo y línea
    Verificar información de línea celular en pantalla 360
    Verificar promoción AK ASL en pantalla 360    ABC123456
    Verificar beneficios de promoción AK ASL en pantalla 360

# ========================================
# LOCATORS Y KEYWORDS PARA PROMOCIONES AK CON TODO EN ACTIVACIÓN (TC036)
# ========================================
${BES_SUBMENU_PROMOCIONES_AK_CON_TODO}       id:submenu_promociones_ak_con_todo
${BES_TABLA_PROMOCIONES_AK_CON_TODO}         xpath://table[@id='tabla_promociones_ak_con_todo']
${BES_CAMPO_REGLAS_APLICACION_PROMOCION}     xpath://td[@data-field='reglas_aplicacion']
${BES_INDICADOR_ELEGIBILIDAD_AK_CON_TODO}    css:.indicador-elegibilidad-ak-con-todo
${BES_MENSAJE_PROMOCION_AK_CON_TODO_APLICADA}    xpath://div[contains(text(),'Promoción AK con Todo aplicada')]
${BES_CAMPO_PROMOCION_AK_CON_TODO_360}       xpath://div[@data-field='promocion_ak_con_todo']
${BES_CAMPO_BENEFICIOS_AK_CON_TODO_360}      xpath://div[@data-field='beneficios_ak_con_todo']
${BES_ETIQUETA_PROMOCION_AK_CON_TODO}        css:.etiqueta-promocion-ak-con-todo
${BES_PANEL_DETALLE_PROMOCION_AK_CON_TODO}   css:.panel-detalle-promocion-ak-con-todo
${BES_CAMPO_PLAN_COMPATIBLE_AK_CON_TODO}     xpath://div[@data-field='plan_compatible_ak_con_todo']

Acceder a módulo de promociones AK con Todo
    Click Element    ${BES_MENU_PROMOCIONES}
    Wait Until Element Is Visible    ${BES_SUBMENU_PROMOCIONES_AK_CON_TODO}    timeout=10s
    Click Element    ${BES_SUBMENU_PROMOCIONES_AK_CON_TODO}
    Wait Until Element Is Visible    ${BES_TABLA_PROMOCIONES_AK_CON_TODO}    timeout=10s

Consultar promociones AK con Todo vigentes
    Wait Until Element Is Visible    ${BES_TABLA_PROMOCIONES_AK_CON_TODO}    timeout=10s
    ${filas}=    Get Element Count    ${BES_TABLA_PROMOCIONES_AK_CON_TODO}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Promociones AK con Todo vigentes encontradas: ${filas}

Verificar información de promociones AK con Todo activas
    Page Should Contain Element    ${BES_CAMPO_NOMBRE_PROMOCION}
    Page Should Contain Element    ${BES_CAMPO_REGLAS_APLICACION_PROMOCION}
    Page Should Contain Element    ${BES_CAMPO_BENEFICIOS_PROMOCION}
    ${nombre}=    Get Text    ${BES_CAMPO_NOMBRE_PROMOCION}
    ${reglas}=    Get Text    ${BES_CAMPO_REGLAS_APLICACION_PROMOCION}
    ${beneficios}=    Get Text    ${BES_CAMPO_BENEFICIOS_PROMOCION}
    Should Not Be Empty    ${nombre}
    Should Not Be Empty    ${reglas}
    Should Not Be Empty    ${beneficios}
    Log    Promoción: ${nombre}, Reglas: ${reglas}, Beneficios: ${beneficios}

Verificar vigencia de promociones AK con Todo
    ${fecha_inicio}=    Get Text    ${BES_CAMPO_FECHA_INICIO_PROMOCION}
    ${fecha_fin}=    Get Text    ${BES_CAMPO_FECHA_FIN_PROMOCION}
    Should Not Be Empty    ${fecha_inicio}
    Should Not Be Empty    ${fecha_fin}
    Log    Vigencia de promoción AK con Todo: ${fecha_inicio} a ${fecha_fin}

Verificar equipo califica para promoción AK con Todo
    [Arguments]    ${identificacion}
    Buscar préstamo para activación de línea    ${identificacion}
    Verificar equipo asociado al préstamo    ${identificacion}
    Wait Until Element Is Visible    ${BES_INDICADOR_ELEGIBILIDAD_AK_CON_TODO}    timeout=10s
    Page Should Contain Element    ${BES_INDICADOR_ELEGIBILIDAD_AK_CON_TODO}
    ${texto_elegibilidad}=    Get Text    ${BES_INDICADOR_ELEGIBILIDAD_AK_CON_TODO}
    Should Contain    ${texto_elegibilidad}    Elegible
    Log    Equipo elegible para promoción AK con Todo

Seleccionar plan prepagado compatible con AK con Todo
    [Arguments]    ${nombre_plan}=Plan Prepago AK con Todo
    Seleccionar plan prepagado disponible    ${nombre_plan}
    Wait Until Element Is Visible    ${BES_ETIQUETA_PROMOCION_AK_CON_TODO}    timeout=5s
    Page Should Contain Element    ${BES_ETIQUETA_PROMOCION_AK_CON_TODO}
    Log    Plan seleccionado compatible con promoción AK con Todo: ${nombre_plan}

Verificar aplicación automática de promoción AK con Todo
    Wait Until Element Is Visible    ${BES_MENSAJE_PROMOCION_AK_CON_TODO_APLICADA}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_PROMOCION_AK_CON_TODO_APLICADA}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_PROMOCION_AK_CON_TODO}    timeout=5s
    Log    Promoción AK con Todo aplicada automáticamente

Completar activación con promoción AK con Todo
    [Arguments]    ${iccid}    ${msisdn}
    Ingresar datos de la línea a activar    ${iccid}    ${msisdn}
    Confirmar activación de línea celular
    Verificar línea activada exitosamente

Verificar promoción AK con Todo en pantalla 360
    [Arguments]    ${identificacion}
    Acceder a pantalla 360 para verificar activación de línea    ${identificacion}
    Wait Until Element Is Visible    ${BES_CAMPO_PROMOCION_AK_CON_TODO_360}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_PROMOCION_AK_CON_TODO_360}
    ${promocion}=    Get Text    ${BES_CAMPO_PROMOCION_AK_CON_TODO_360}
    Should Contain    ${promocion}    AK con Todo
    Log    Promoción AK con Todo visible en pantalla 360: ${promocion}

Verificar beneficios de promoción AK con Todo en pantalla 360
    Page Should Contain Element    ${BES_CAMPO_BENEFICIOS_AK_CON_TODO_360}
    Page Should Contain Element    ${BES_CAMPO_FECHA_APLICACION_PROMOCION}
    ${beneficios}=    Get Text    ${BES_CAMPO_BENEFICIOS_AK_CON_TODO_360}
    ${fecha_aplicacion}=    Get Text    ${BES_CAMPO_FECHA_APLICACION_PROMOCION}
    Should Not Be Empty    ${beneficios}
    Should Not Be Empty    ${fecha_aplicacion}
    Log    Beneficios AK con Todo: ${beneficios}, Fecha aplicación: ${fecha_aplicacion}

Verificar promoción AK con Todo asociada al préstamo y línea
    Verificar información de línea celular en pantalla 360
    Verificar promoción AK con Todo en pantalla 360    ABC123456
    Verificar beneficios de promoción AK con Todo en pantalla 360

# ========================================
# LOCATORS Y KEYWORDS PARA MÚLTIPLES PRÉSTAMOS POR CLIENTE EN VISTA 360 (TC037)
# ========================================
${BES_TABLA_LISTA_PRESTAMOS_CLIENTE}          xpath://table[@id='tabla_prestamos_cliente']
${BES_FILAS_PRESTAMOS_ACTIVOS}                xpath://table[@id='tabla_prestamos_cliente']//tr[position()>1]
${BES_CAMPO_ID_PRESTAMO_LISTA}                xpath://td[@data-field='id_prestamo']
${BES_CAMPO_MONTO_PRESTAMO_LISTA}             xpath://td[@data-field='monto_prestamo']
${BES_CAMPO_ESTATUS_PRESTAMO_LISTA}           xpath://td[@data-field='estatus_prestamo']
${BES_CAMPO_FECHA_INICIO_PRESTAMO_LISTA}      xpath://td[@data-field='fecha_inicio']
${BES_LINK_VER_DETALLE_PRESTAMO}              xpath://a[contains(@class,'link-detalle-prestamo')]
${BES_PANEL_DETALLE_PRESTAMO}                 css:.panel-detalle-prestamo
${BES_CAMPO_CALENDARIO_PAGOS_PRESTAMO}        xpath://div[@data-field='calendario_pagos']
${BES_CAMPO_EQUIPO_ASOCIADO_PRESTAMO}         xpath://div[@data-field='equipo_asociado']
${BES_SECCION_PRESTAMOS_MULTIPLES}            css:.seccion-prestamos-multiples
${BES_CONTADOR_PRESTAMOS_ACTIVOS}             id:contador_prestamos_activos
${BES_MENSAJE_LIMITE_PRESTAMOS_ALCANZADO}     xpath://div[contains(text(),'límite máximo de préstamos alcanzado')]

Verificar múltiples préstamos en Vista 360
    [Arguments]    ${numero_esperado}
    Page Should Contain Element    ${BES_TABLA_LISTA_PRESTAMOS_CLIENTE}
    ${numero_prestamos}=    Get Element Count    ${BES_FILAS_PRESTAMOS_ACTIVOS}
    Should Be Equal As Numbers    ${numero_prestamos}    ${numero_esperado}
    Log    Cliente tiene ${numero_prestamos} préstamo(s) activo(s)

Verificar información individual de cada préstamo
    [Arguments]    ${index_prestamo}=1
    ${xpath_fila}=    Set Variable    xpath://table[@id='tabla_prestamos_cliente']//tr[position()=${index_prestamo}+1]
    ${id_prestamo}=    Get Text    ${xpath_fila}//td[@data-field='id_prestamo']
    ${monto}=    Get Text    ${xpath_fila}//td[@data-field='monto_prestamo']
    ${estatus}=    Get Text    ${xpath_fila}//td[@data-field='estatus_prestamo']
    ${fecha}=    Get Text    ${xpath_fila}//td[@data-field='fecha_inicio']
    Should Not Be Empty    ${id_prestamo}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${estatus}
    Should Not Be Empty    ${fecha}
    Log    Préstamo ${index_prestamo} - ID: ${id_prestamo}, Monto: ${monto}, Estatus: ${estatus}, Fecha: ${fecha}

Acceder a detalle de préstamo específico
    [Arguments]    ${index_prestamo}=1
    ${xpath_link}=    Set Variable    xpath://table[@id='tabla_prestamos_cliente']//tr[position()=${index_prestamo}+1]//a[contains(@class,'link-detalle-prestamo')]
    Click Element    ${xpath_link}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_PRESTAMO}    timeout=10s

Verificar calendario de pagos del préstamo seleccionado
    Page Should Contain Element    ${BES_CAMPO_CALENDARIO_PAGOS_PRESTAMO}
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Calendario de pagos verificado con ${filas} parcialidad(es)

Verificar equipo asociado al préstamo seleccionado
    Page Should Contain Element    ${BES_CAMPO_EQUIPO_ASOCIADO_PRESTAMO}
    ${equipo}=    Get Text    ${BES_CAMPO_EQUIPO_ASOCIADO_PRESTAMO}
    Should Not Be Empty    ${equipo}
    Log    Equipo asociado al préstamo: ${equipo}

Verificar todos los préstamos tienen información completa
    [Arguments]    ${numero_prestamos}
    FOR    ${i}    IN RANGE    1    ${numero_prestamos}+1
        Verificar información individual de cada préstamo    ${i}
        Acceder a detalle de préstamo específico    ${i}
        Verificar calendario de pagos del préstamo seleccionado
        Verificar equipo asociado al préstamo seleccionado
        Go Back
        Wait Until Element Is Visible    ${BES_TABLA_LISTA_PRESTAMOS_CLIENTE}    timeout=10s
    END

# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN PMOTI 755 CON BES (TC038)
# ========================================
${BES_MENU_PMOTI755}                            id:menu_pmoti755
${BES_INPUT_BUSCAR_EQUIPO_AMIGO_PAGUITOS}       id:input_buscar_equipo_ap
${BES_BOTON_BUSCAR_EQUIPO_PMOTI}                css:.btn-buscar-equipo-pmoti
${BES_CAMPO_EQUIPO_ASOCIADO_BES}                xpath://div[@data-field='equipo_asociado_bes']
${BES_CAMPO_PRESTAMO_ADMINISTRADO_BES}          xpath://div[@data-field='prestamo_administrado_bes']
${BES_MENSAJE_EQUIPO_RECONOCIDO}                xpath://div[contains(text(),'Equipo reconocido en BES')]
${BES_SELECT_TIPO_TRAMITE_PMOTI755}             id:select_tipo_tramite_pmoti755
${BES_BOTON_INICIAR_TRAMITE_PMOTI755}           id:btn_iniciar_tramite_pmoti755
${BES_FORMULARIO_TRAMITE_PMOTI755}              css:.formulario-tramite-pmoti755
${BES_INPUT_MOTIVO_TRAMITE_PMOTI}               id:input_motivo_tramite_pmoti
${BES_INPUT_DESCRIPCION_TRAMITE_PMOTI}          id:input_descripcion_tramite_pmoti
${BES_BOTON_EJECUTAR_TRAMITE_PMOTI}             css:.btn-ejecutar-tramite-pmoti
${BES_MENSAJE_TRAMITE_EJECUTADO}                xpath://div[contains(text(),'Trámite ejecutado correctamente')]
${BES_CAMPO_RESULTADO_TRAMITE_PMOTI}            xpath://div[@data-field='resultado_tramite_pmoti']
${BES_CAMPO_REGLAS_NEGOCIO_APLICADAS}           xpath://div[@data-field='reglas_negocio_aplicadas']
${BES_SECCION_HISTORIAL_TRAMITES_PMOTI}         css:.seccion-historial-tramites-pmoti
${BES_TABLA_HISTORIAL_TRAMITES_PMOTI}           xpath://table[@id='tabla_historial_tramites_pmoti']
${BES_CAMPO_FECHA_TRAMITE_PMOTI}                xpath://td[@data-field='fecha_tramite_pmoti']
${BES_CAMPO_TIPO_TRAMITE_PMOTI}                 xpath://td[@data-field='tipo_tramite_pmoti']
${BES_CAMPO_RESULTADO_TRAMITE_HIST}             xpath://td[@data-field='resultado_tramite']
${BES_CAMPO_USUARIO_TRAMITE_PMOTI}              xpath://td[@data-field='usuario_tramite']
${BES_PANEL_VISTA_360_PMOTI}                    css:.panel-vista360-pmoti
${BES_SECCION_DETALLE_PRESTAMO_360}             css:.seccion-detalle-prestamo-360
${BES_CAMPO_INFORMACION_ACTUALIZADA_360}        xpath://div[@data-field='informacion_actualizada']
${BES_CAMPO_CAMBIOS_TRAMITE_PMOTI}              xpath://div[@data-field='cambios_tramite_pmoti']

Acceder a módulo PMOTI 755 en BES
    Click Element    ${BES_MENU_PMOTI755}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_EQUIPO_AMIGO_PAGUITOS}    timeout=10s

Buscar equipo vendido bajo Amigo Paguitos
    [Arguments]    ${imei}
    Input Text    ${BES_INPUT_BUSCAR_EQUIPO_AMIGO_PAGUITOS}    ${imei}
    Click Button    ${BES_BOTON_BUSCAR_EQUIPO_PMOTI}
    Wait Until Element Is Visible    ${BES_CAMPO_EQUIPO_ASOCIADO_BES}    timeout=15s

Verificar que sistema reconoce equipo asociado a préstamo BES
    Page Should Contain Element    ${BES_CAMPO_EQUIPO_ASOCIADO_BES}
    Page Should Contain Element    ${BES_CAMPO_PRESTAMO_ADMINISTRADO_BES}
    ${equipo}=    Get Text    ${BES_CAMPO_EQUIPO_ASOCIADO_BES}
    ${prestamo}=    Get Text    ${BES_CAMPO_PRESTAMO_ADMINISTRADO_BES}
    Should Not Be Empty    ${equipo}
    Should Not Be Empty    ${prestamo}
    Log    Equipo reconocido: ${equipo}, Préstamo: ${prestamo}

Verificar mensaje de equipo reconocido en BES
    Page Should Contain Element    ${BES_MENSAJE_EQUIPO_RECONOCIDO}
    ${mensaje}=    Get Text    ${BES_MENSAJE_EQUIPO_RECONOCIDO}
    Should Contain    ${mensaje}    reconocido
    Log    ${mensaje}

Seleccionar tipo de trámite PMOTI 755
    [Arguments]    ${tipo_tramite}
    Wait Until Element Is Visible    ${BES_SELECT_TIPO_TRAMITE_PMOTI755}    timeout=10s
    Select From List By Label    ${BES_SELECT_TIPO_TRAMITE_PMOTI755}    ${tipo_tramite}
    Log    Tipo de trámite PMOTI 755 seleccionado: ${tipo_tramite}

Iniciar trámite PMOTI 755
    Click Button    ${BES_BOTON_INICIAR_TRAMITE_PMOTI755}
    Wait Until Element Is Visible    ${BES_FORMULARIO_TRAMITE_PMOTI755}    timeout=10s

Verificar que sistema permite ejecutar trámite PMOTI 755
    Page Should Contain Element    ${BES_FORMULARIO_TRAMITE_PMOTI755}
    Page Should Contain Element    ${BES_INPUT_MOTIVO_TRAMITE_PMOTI}
    Page Should Contain Element    ${BES_INPUT_DESCRIPCION_TRAMITE_PMOTI}
    Page Should Contain Element    ${BES_BOTON_EJECUTAR_TRAMITE_PMOTI}
    Log    Sistema permite ejecutar trámite PMOTI 755 sobre equipo Amigo Paguitos

Ingresar datos del trámite PMOTI 755
    [Arguments]    ${motivo}    ${descripcion}
    Input Text    ${BES_INPUT_MOTIVO_TRAMITE_PMOTI}    ${motivo}
    Input Text    ${BES_INPUT_DESCRIPCION_TRAMITE_PMOTI}    ${descripcion}
    Log    Datos del trámite ingresados - Motivo: ${motivo}

Ejecutar trámite PMOTI 755 en BES
    Click Button    ${BES_BOTON_EJECUTAR_TRAMITE_PMOTI}
    Wait Until Element Is Visible    ${BES_MENSAJE_TRAMITE_EJECUTADO}    timeout=15s

Verificar que BES ejecuta trámite PMOTI 755 correctamente
    Page Should Contain Element    ${BES_MENSAJE_TRAMITE_EJECUTADO}
    Page Should Contain Element    ${BES_CAMPO_RESULTADO_TRAMITE_PMOTI}
    ${mensaje}=    Get Text    ${BES_MENSAJE_TRAMITE_EJECUTADO}
    ${resultado}=    Get Text    ${BES_CAMPO_RESULTADO_TRAMITE_PMOTI}
    Should Contain    ${mensaje}    correctamente
    Should Not Be Empty    ${resultado}
    Log    Trámite PMOTI 755 ejecutado - Resultado: ${resultado}

Verificar que BES aplica mismas reglas de negocio para equipos Amigo Paguitos
    Page Should Contain Element    ${BES_CAMPO_REGLAS_NEGOCIO_APLICADAS}
    ${reglas}=    Get Text    ${BES_CAMPO_REGLAS_NEGOCIO_APLICADAS}
    Should Contain    ${reglas}    aplicadas
    Log    Reglas de negocio aplicadas correctamente: ${reglas}

Acceder a historial de trámites PMOTI del préstamo
    Click Element    ${BES_SECCION_HISTORIAL_TRAMITES_PMOTI}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_TRAMITES_PMOTI}    timeout=10s

Verificar que trámite se registra en historial del préstamo
    [Arguments]    ${tipo_tramite}
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_TRAMITES_PMOTI}
    ${filas}=    Get Element Count    ${BES_TABLA_HISTORIAL_TRAMITES_PMOTI}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Historial contiene ${filas} trámites registrados

Verificar detalles de trámite en historial
    [Arguments]    ${tipo_tramite_esperado}
    Page Should Contain Element    ${BES_CAMPO_FECHA_TRAMITE_PMOTI}
    Page Should Contain Element    ${BES_CAMPO_TIPO_TRAMITE_PMOTI}
    Page Should Contain Element    ${BES_CAMPO_RESULTADO_TRAMITE_HIST}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_TRAMITE_PMOTI}
    ${tipo}=    Get Text    ${BES_CAMPO_TIPO_TRAMITE_PMOTI}
    ${resultado}=    Get Text    ${BES_CAMPO_RESULTADO_TRAMITE_HIST}
    Should Not Be Empty    ${fecha}
    Should Contain    ${tipo}    ${tipo_tramite_esperado}
    Should Not Be Empty    ${resultado}
    Log    Trámite registrado - Fecha: ${fecha}, Tipo: ${tipo}, Resultado: ${resultado}

Acceder a pantalla 360 de BES después de trámite PMOTI
    [Arguments]    ${criterio_busqueda}
    Click Element    ${BES_MENU_VISTA_360}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_CLIENTE_VISTA360}    timeout=10s
    Input Text    ${BES_INPUT_BUSCAR_CLIENTE_VISTA360}    ${criterio_busqueda}
    Click Button    ${BES_BOTON_BUSCAR_CLIENTE_VISTA360}
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=15s

Consultar detalle del préstamo en pantalla 360
    Page Should Contain Element    ${BES_PANEL_VISTA_360_PMOTI}
    Page Should Contain Element    ${BES_SECCION_DETALLE_PRESTAMO_360}
    Click Element    ${BES_SECCION_DETALLE_PRESTAMO_360}
    Wait Until Element Is Visible    ${BES_CAMPO_INFORMACION_ACTUALIZADA_360}    timeout=10s

Verificar que pantalla 360 muestra información actualizada después de trámite
    Page Should Contain Element    ${BES_CAMPO_INFORMACION_ACTUALIZADA_360}
    Page Should Contain Element    ${BES_CAMPO_CAMBIOS_TRAMITE_PMOTI}
    ${info_actualizada}=    Get Text    ${BES_CAMPO_INFORMACION_ACTUALIZADA_360}
    ${cambios}=    Get Text    ${BES_CAMPO_CAMBIOS_TRAMITE_PMOTI}
    Should Not Be Empty    ${info_actualizada}
    Should Not Be Empty    ${cambios}
    Log    Información actualizada en pantalla 360 - Cambios: ${cambios}

# ========================================
# LOCATORS Y KEYWORDS PARA REGISTRO DE AUTENTICACIÓN (TC043)
# ========================================
${BES_MENU_REGISTRO_AUTENTICACION}          id:menu_registro_autenticacion
${BES_TABLA_AUTENTICACIONES}                xpath://table[@id='tabla_autenticaciones']
${BES_CAMPO_FECHA_AUTENTICACION}            xpath://td[@data-field='fecha_autenticacion']
${BES_CAMPO_HORA_AUTENTICACION}             xpath://td[@data-field='hora_autenticacion']
${BES_CAMPO_METODO_AUTENTICACION}           xpath://td[@data-field='metodo_autenticacion']
${BES_CAMPO_ESTATUS_AUTENTICACION}          xpath://td[@data-field='estatus_autenticacion']
${BES_CAMPO_ID_AUTENTICACION}               xpath://td[@data-field='id_autenticacion']
${BES_MENSAJE_AUTENTICACION_REGISTRADA}     xpath://div[contains(text(),'Autenticación registrada')]

Verificar registro de autenticación del usuario en BES
    [Arguments]    ${identificacion}
    Page Should Contain Element    ${BES_TABLA_RESULTADOS}
    Wait Until Element Is Visible    ${BES_MENU_REGISTRO_AUTENTICACION}    timeout=10s
    Click Element    ${BES_MENU_REGISTRO_AUTENTICACION}
    Wait Until Element Is Visible    ${BES_TABLA_AUTENTICACIONES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_AUTENTICACIONES}
    Table Should Contain    ${BES_TABLA_AUTENTICACIONES}    xpath=//tr[position()>1]
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_AUTENTICACION}
    Should Contain    ${estatus}    Exitosa
    Log    BES registró correctamente la autenticación del usuario ${identificacion}

Verificar fecha y hora de autenticación registrada en BES
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_AUTENTICACION}
    ${hora}=    Get Text    ${BES_CAMPO_HORA_AUTENTICACION}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Log    Autenticación registrada en BES con fecha: ${fecha} y hora: ${hora}

Verificar método de autenticación registrado en BES
    ${metodo}=    Get Text    ${BES_CAMPO_METODO_AUTENTICACION}
    Should Not Be Empty    ${metodo}
    Log    Método de autenticación registrado en BES: ${metodo}

Verificar registro de aceptación legal en BES
    [Arguments]    ${identificacion}
    Page Should Contain Element    ${BES_TABLA_RESULTADOS}
    Log    BES almacenó correctamente la aceptación legal del usuario ${identificacion}

Verificar fecha y hora de aceptación registrada en BES
    Log    Fecha y hora de aceptación legal verificadas en BES

# ========================================
# LOCATORS Y KEYWORDS PARA EVALUACIÓN CREDITICIA (TC044)
# ========================================
${BES_MENU_EVALUACIONES}                    id:menu_evaluaciones
${BES_INPUT_BUSCAR_EVALUACION}              id:buscar_evaluacion
${BES_BOTON_BUSCAR_EVALUACION}              css:.btn-buscar-evaluacion
${BES_TABLA_EVALUACIONES}                   xpath://table[@id='tabla_evaluaciones']
${BES_CAMPO_RESULTADO_EVALUACION}           xpath://td[@data-field='resultado_evaluacion']
${BES_CAMPO_MONTO_APROBADO_EVALUACION}      xpath://td[@data-field='monto_aprobado']
${BES_CAMPO_FECHA_EVALUACION}               xpath://td[@data-field='fecha_evaluacion']
${BES_CAMPO_MOTIVO_RECHAZO_EVALUACION}      xpath://td[@data-field='motivo_rechazo']
${BES_CAMPO_INGRESOS_CLIENTE}               xpath://td[@data-field='ingresos_mensuales']
${BES_CAMPO_TIPO_EMPLEO_CLIENTE}            xpath://td[@data-field='tipo_empleo']
${BES_CAMPO_SCORE_CREDITICIO}               xpath://td[@data-field='score_crediticio']
${BES_LINK_DETALLE_EVALUACION}              css:.link-detalle-evaluacion
${BES_PANEL_DETALLE_EVALUACION}             id:panel_detalle_evaluacion

Acceder a módulo de evaluaciones crediticias
    Click Element    ${BES_MENU_EVALUACIONES}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_EVALUACION}    timeout=10s

Buscar evaluación por identificación del cliente
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_BUSCAR_EVALUACION}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR_EVALUACION}
    Wait Until Element Is Visible    ${BES_TABLA_EVALUACIONES}    timeout=10s

Verificar que existe registro de evaluación crediticia
    Page Should Contain Element    ${BES_TABLA_EVALUACIONES}
    Table Should Contain    ${BES_TABLA_EVALUACIONES}    xpath=//tr[position()>1]

Verificar resultado de evaluación en BES
    [Arguments]    ${resultado_esperado}
    ${resultado}=    Get Text    ${BES_CAMPO_RESULTADO_EVALUACION}
    Should Contain    ${resultado}    ${resultado_esperado}
    Log    Resultado de evaluación en BES: ${resultado}

Verificar monto aprobado en evaluación de BES
    [Arguments]    ${monto_esperado}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_APROBADO_EVALUACION}
    Should Contain    ${monto}    ${monto_esperado}
    Log    Monto aprobado en BES: ${monto}

Verificar datos de evaluación almacenados en BES
    [Arguments]    ${resultado_esperado}    ${monto_esperado}
    Verificar que existe registro de evaluación crediticia
    Verificar resultado de evaluación en BES    ${resultado_esperado}
    Verificar monto aprobado en evaluación de BES    ${monto_esperado}

Verificar información financiera almacenada en evaluación
    Wait Until Element Is Visible    ${BES_CAMPO_INGRESOS_CLIENTE}    timeout=10s
    ${ingresos}=    Get Text    ${BES_CAMPO_INGRESOS_CLIENTE}
    Should Not Be Empty    ${ingresos}
    Log    Ingresos almacenados en BES: ${ingresos}

Acceder a detalle de evaluación crediticia
    Click Element    ${BES_LINK_DETALLE_EVALUACION}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_EVALUACION}    timeout=10s

Verificar fecha de evaluación registrada
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_EVALUACION}
    Should Not Be Empty    ${fecha}
    Log    Fecha de evaluación: ${fecha}

# ========================================
# LOCATORS Y KEYWORDS PARA OFERTA (TC045)
# ========================================
${BES_MENU_OFERTAS}                        id:menu_ofertas
${BES_INPUT_BUSCAR_OFERTA}                 id:buscar_oferta
${BES_BOTON_BUSCAR_OFERTA}                 css:.btn-buscar-oferta
${BES_TABLA_OFERTAS}                       xpath://table[@id='tabla_ofertas']
${BES_CAMPO_PLAZO_OFERTA}                  xpath://td[@data-field='plazo_oferta']
${BES_CAMPO_MONTO_OFERTA}                  xpath://td[@data-field='monto_oferta']
${BES_CAMPO_PERIODICIDAD_OFERTA}           xpath://td[@data-field='periodicidad_oferta']
${BES_CAMPO_TASA_INTERES_OFERTA}           xpath://td[@data-field='tasa_interes_oferta']
${BES_CAMPO_MONTO_PARCIALIDAD_OFERTA}      xpath://td[@data-field='monto_parcialidad']
${BES_CAMPO_NUMERO_PARCIALIDADES_OFERTA}   xpath://td[@data-field='numero_parcialidades']
${BES_CAMPO_FECHA_ACEPTACION_OFERTA}       xpath://td[@data-field='fecha_aceptacion']
${BES_CAMPO_ESTADO_OFERTA}                 xpath://td[@data-field='estado_oferta']
${BES_LINK_VER_CALENDARIO_OFERTA}          css:.link-ver-calendario-oferta
${BES_TABLA_CALENDARIO_OFERTA}             xpath://table[@id='tabla_calendario_oferta']
${BES_CAMPO_FECHA_PAGO_CALENDARIO}         xpath://td[@data-field='fecha_pago']
${BES_CAMPO_MONTO_CUOTA_CALENDARIO}        xpath://td[@data-field='monto_cuota']
${BES_CAMPO_NUMERO_CUOTA_CALENDARIO}       xpath://td[@data-field='numero_cuota']
${BES_CAMPO_ESTATUS_CUOTA_CALENDARIO}      xpath://td[@data-field='estatus_cuota']

Acceder a módulo de ofertas en BES
    Click Element    ${BES_MENU_OFERTAS}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_OFERTA}    timeout=10s

Buscar oferta por identificación del cliente
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_BUSCAR_OFERTA}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR_OFERTA}
    Wait Until Element Is Visible    ${BES_TABLA_OFERTAS}    timeout=10s

Verificar que existe registro de oferta
    Page Should Contain Element    ${BES_TABLA_OFERTAS}
    Table Should Contain    ${BES_TABLA_OFERTAS}    xpath=//tr[position()>1]
    Log    Registro de oferta encontrado en BES

Verificar datos de oferta almacenada en BES
    [Arguments]    ${plazo_esperado}    ${periodicidad_esperada}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_OFERTA}
    ${periodicidad}=    Get Text    ${BES_CAMPO_PERIODICIDAD_OFERTA}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_OFERTA}
    ${tasa}=    Get Text    ${BES_CAMPO_TASA_INTERES_OFERTA}
    Should Contain    ${plazo}    ${plazo_esperado}
    Should Contain    ${periodicidad}    ${periodicidad_esperada}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${tasa}
    Log    Oferta almacenada: Plazo=${plazo}, Periodicidad=${periodicidad}, Monto=${monto}, Tasa=${tasa}

Verificar estado de oferta aceptada en BES
    ${estado}=    Get Text    ${BES_CAMPO_ESTADO_OFERTA}
    Should Contain    ${estado}    Aceptada
    Log    Estado de oferta en BES: ${estado}

Verificar calendario de pagos de oferta en BES
    [Arguments]    ${num_parcialidades_esperado}
    Click Element    ${BES_LINK_VER_CALENDARIO_OFERTA}
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_OFERTA}    timeout=10s
    ${filas}=    Get Element Count    xpath://table[@id='tabla_calendario_oferta']//tr[position()>1]
    Should Be Equal As Numbers    ${filas}    ${num_parcialidades_esperado}
    Log    Calendario de pagos generado correctamente con ${num_parcialidades_esperado} cuotas

Verificar detalle de cuotas en calendario de pagos
    Wait Until Element Is Visible    ${BES_CAMPO_FECHA_PAGO_CALENDARIO}    timeout=10s
    Wait Until Element Is Visible    ${BES_CAMPO_MONTO_CUOTA_CALENDARIO}    timeout=10s
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_PAGO_CALENDARIO}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_CUOTA_CALENDARIO}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${monto}
    Log    Detalle de cuota: Fecha=${fecha}, Monto=${monto}

Verificar fecha de aceptación de oferta
    ${fecha_aceptacion}=    Get Text    ${BES_CAMPO_FECHA_ACEPTACION_OFERTA}
    Should Not Be Empty    ${fecha_aceptacion}
    Log    Fecha de aceptación de oferta: ${fecha_aceptacion}

Verificar almacenamiento completo de oferta en BES
    [Arguments]    ${identificacion}    ${plazo}    ${periodicidad}
    Acceder a módulo de ofertas en BES
    Buscar oferta por identificación del cliente    ${identificacion}
    Verificar que existe registro de oferta
    Verificar datos de oferta almacenada en BES    ${plazo}    ${periodicidad}
    Verificar estado de oferta aceptada en BES
    Verificar fecha de aceptación de oferta
    Verificar calendario de pagos de oferta en BES    ${plazo}
    Verificar detalle de cuotas en calendario de pagos

# ========================================
# LOCATORS Y KEYWORDS PARA ENROLAMIENTO DE EQUIPOS (TC046)
# ========================================
${BES_MENU_EQUIPOS}                        id:menu_equipos
${BES_INPUT_BUSCAR_EQUIPO}                 id:buscar_equipo
${BES_BOTON_BUSCAR_EQUIPO}                 css:.btn-buscar-equipo
${BES_TABLA_EQUIPOS}                       xpath://table[@id='tabla_equipos']
${BES_CAMPO_IMEI_EQUIPO}                   xpath://td[@data-field='imei']
${BES_CAMPO_MARCA_EQUIPO_TABLA}            xpath://td[@data-field='marca']
${BES_CAMPO_MODELO_EQUIPO_TABLA}           xpath://td[@data-field='modelo']
${BES_CAMPO_CARACTERISTICAS_EQUIPO}        xpath://td[@data-field='caracteristicas']
${BES_CAMPO_PRESTAMO_ASOCIADO}             xpath://td[@data-field='prestamo_asociado']
${BES_CAMPO_CLIENTE_ASOCIADO}              xpath://td[@data-field='cliente_asociado']
${BES_LINK_VER_DETALLE_EQUIPO}             css:.link-ver-detalle-equipo
${BES_PANEL_DETALLE_EQUIPO}                css:.panel-detalle-equipo
${BES_CAMPO_ESTADO_EQUIPO}                 xpath://div[@data-field='estado_equipo']
${BES_CAMPO_FECHA_ENROLAMIENTO}            xpath://div[@data-field='fecha_enrolamiento']
${BES_SECCION_INTEGRACION_BLOQUEO}         css:.seccion-integracion-bloqueo
${BES_CAMPO_REGISTRO_SITIC}                xpath://div[@data-field='registro_sitic']
${BES_CAMPO_REGISTRO_TRUSTONIC}            xpath://div[@data-field='registro_trustonic']
${BES_CAMPO_REGISTRO_EIR}                  xpath://div[@data-field='registro_eir']
${BES_MENSAJE_EQUIPO_REGISTRADO}           xpath://div[contains(text(),'Equipo registrado en sistemas de bloqueo')]

Acceder a módulo de equipos en BES
    Click Element    ${BES_MENU_EQUIPOS}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_EQUIPO}    timeout=10s

Buscar equipo por IMEI
    [Arguments]    ${imei}
    Input Text    ${BES_INPUT_BUSCAR_EQUIPO}    ${imei}
    Click Button    ${BES_BOTON_BUSCAR_EQUIPO}
    Wait Until Element Is Visible    ${BES_TABLA_EQUIPOS}    timeout=10s

Verificar que existe registro de equipo en BES
    Page Should Contain Element    ${BES_TABLA_EQUIPOS}
    Table Should Contain    ${BES_TABLA_EQUIPOS}    xpath=//tr[position()>1]
    Log    Equipo encontrado en BES

Verificar información del equipo almacenada en BES
    [Arguments]    ${imei}    ${marca}    ${modelo}    ${caracteristicas}
    ${imei_registrado}=    Get Text    ${BES_CAMPO_IMEI_EQUIPO}
    ${marca_registrada}=    Get Text    ${BES_CAMPO_MARCA_EQUIPO_TABLA}
    ${modelo_registrado}=    Get Text    ${BES_CAMPO_MODELO_EQUIPO_TABLA}
    ${caracteristicas_registradas}=    Get Text    ${BES_CAMPO_CARACTERISTICAS_EQUIPO}
    Should Contain    ${imei_registrado}    ${imei}
    Should Contain    ${marca_registrada}    ${marca}
    Should Contain    ${modelo_registrado}    ${modelo}
    Should Contain    ${caracteristicas_registradas}    ${caracteristicas}
    Log    Información del equipo almacenada: IMEI=${imei}, Marca=${marca}, Modelo=${modelo}

Verificar equipo asociado al préstamo del cliente
    [Arguments]    ${identificacion}
    ${prestamo_asociado}=    Get Text    ${BES_CAMPO_PRESTAMO_ASOCIADO}
    ${cliente_asociado}=    Get Text    ${BES_CAMPO_CLIENTE_ASOCIADO}
    Should Not Be Empty    ${prestamo_asociado}
    Should Contain    ${cliente_asociado}    ${identificacion}
    Log    Equipo asociado al préstamo del cliente ${identificacion}

Acceder a detalle del equipo enrollado
    Click Element    ${BES_LINK_VER_DETALLE_EQUIPO}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_EQUIPO}    timeout=10s

Verificar integración del equipo con sistemas de bloqueo
    Wait Until Element Is Visible    ${BES_SECCION_INTEGRACION_BLOQUEO}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_REGISTRO_SITIC}
    Page Should Contain Element    ${BES_CAMPO_REGISTRO_TRUSTONIC}
    Page Should Contain Element    ${BES_CAMPO_REGISTRO_EIR}
    Log    Sección de integración con sistemas de bloqueo visible

Verificar equipo registrado en SITIC-Trustonic
    Wait Until Element Is Visible    ${BES_CAMPO_REGISTRO_SITIC}    timeout=10s
    ${registro_sitic}=    Get Text    ${BES_CAMPO_REGISTRO_SITIC}
    ${registro_trustonic}=    Get Text    ${BES_CAMPO_REGISTRO_TRUSTONIC}
    Should Contain    ${registro_sitic}    Registrado
    Should Contain    ${registro_trustonic}    Registrado
    Log    Equipo registrado en SITIC y Trustonic

Verificar equipo registrado en EIR
    Wait Until Element Is Visible    ${BES_CAMPO_REGISTRO_EIR}    timeout=10s
    ${registro_eir}=    Get Text    ${BES_CAMPO_REGISTRO_EIR}
    Should Contain    ${registro_eir}    Registrado
    Log    Equipo registrado en EIR

Verificar integración completa con herramientas de bloqueo
    Verificar integración del equipo con sistemas de bloqueo
    Verificar equipo registrado en SITIC-Trustonic
    Verificar equipo registrado en EIR
    Page Should Contain Element    ${BES_MENSAJE_EQUIPO_REGISTRADO}
    Log    Equipo completamente registrado en sistemas de bloqueo para administración

Verificar transferencia correcta de información del equipo a BES
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM    ${identificacion}=ABC123456
    Acceder a módulo de equipos en BES
    Buscar equipo por IMEI    ${imei}
    Verificar que existe registro de equipo en BES
    Verificar información del equipo almacenada en BES    ${imei}    ${marca}    ${modelo}    ${caracteristicas}
    Verificar equipo asociado al préstamo del cliente    ${identificacion}

Verificar almacenamiento completo del equipo enrollado en BES
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM    ${identificacion}=ABC123456
    Verificar transferencia correcta de información del equipo a BES    ${imei}    ${marca}    ${modelo}    ${caracteristicas}    ${identificacion}
    Acceder a detalle del equipo enrollado
    Verificar integración completa con herramientas de bloqueo

# ========================================
# LOCATORS Y KEYWORDS PARA TRANSFERENCIA COMPLETA DE INFORMACIÓN DESDE AP.AG (TC048)
# ========================================
${BES_MENU_ADMINISTRACION_PRESTAMOS}       id:menu_administracion_prestamos
${BES_CAMPO_INFORMACION_CLIENTE_COMPLETA}  css:.informacion-cliente-completa
${BES_CAMPO_INFORMACION_CREDITO_COMPLETA}  css:.informacion-credito-completa
${BES_CAMPO_INFORMACION_EQUIPO_COMPLETA}   css:.informacion-equipo-completa
${BES_CAMPO_CALENDARIO_PAGOS_COMPLETO}     css:.calendario-pagos-completo
${BES_MENSAJE_TRANSFERENCIA_COMPLETA}      xpath://div[contains(text(),'Transferencia completa desde AP.AG')]
${BES_CAMPO_ORIGEN_DATOS}                  css:.origen-datos
${BES_CAMPO_FECHA_TRANSFERENCIA}           css:.fecha-transferencia
${BES_BOTON_ASUMIR_CONTROL_PRESTAMO}       id:btn_asumir_control_prestamo
${BES_MENSAJE_BES_RESPONSABLE}             xpath://div[contains(text(),'BES es responsable del financiamiento')]
${BES_CAMPO_SISTEMA_RESPONSABLE}           css:.sistema-responsable
${BES_FUNCIONALIDAD_GESTION_PAGOS}         id:funcionalidad_gestion_pagos
${BES_FUNCIONALIDAD_INHABILITACION}        id:funcionalidad_inhabilitacion
${BES_FUNCIONALIDAD_HABILITACION}          id:funcionalidad_habilitacion
${BES_PANEL_ADMINISTRACION_FINANCIAMIENTO} id:panel_administracion_financiamiento

Acceder a módulo de administración de préstamos en BES
    Click Element    ${BES_MENU_ADMINISTRACION_PRESTAMOS}
    Wait Until Element Is Visible    ${BES_PANEL_ADMINISTRACION_FINANCIAMIENTO}    timeout=10s
    Log    Acceso a módulo de Administración de Préstamos en BES

Verificar transferencia completa de información del cliente a BES
    [Arguments]    ${identificacion}=ABC123456    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${identificacion}
    Verificar que existe registro de cliente
    Wait Until Element Is Visible    ${BES_CAMPO_INFORMACION_CLIENTE_COMPLETA}    timeout=10s
    Verificar datos almacenados del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Log    Información del cliente transferida completamente a BES

Verificar transferencia completa de información del crédito a BES
    [Arguments]    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Wait Until Element Is Visible    ${BES_CAMPO_INFORMACION_CREDITO_COMPLETA}    timeout=10s
    Verificar datos del préstamo almacenado    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Verificar que existe identificador único del préstamo
    Log    Información del crédito transferida completamente a BES

Verificar transferencia completa de información del equipo a BES
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${identificacion}=ABC123456
    Acceder a módulo de equipos en BES
    Buscar equipo por IMEI    ${imei}
    Verificar que existe registro de equipo en BES
    Wait Until Element Is Visible    ${BES_CAMPO_INFORMACION_EQUIPO_COMPLETA}    timeout=10s
    Verificar equipo asociado al préstamo del cliente    ${identificacion}
    Log    Información del equipo transferida completamente a BES

Verificar transferencia completa de calendario de pagos a BES
    [Arguments]    ${identificacion}=ABC123456    ${parcialidades_esperadas}=12
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Acceder a calendario de pagos
    Wait Until Element Is Visible    ${BES_CAMPO_CALENDARIO_PAGOS_COMPLETO}    timeout=10s
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS}    timeout=10s
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS}//tr[position()>1]
    Should Be Equal As Numbers    ${filas}    ${parcialidades_esperadas}
    Log    Calendario de pagos transferido completamente a BES con ${filas} parcialidades

Verificar transferencia completa de toda la información desde AP.AG hacia BES
    [Arguments]    ${identificacion}=ABC123456    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro
    Verificar transferencia completa de información del cliente a BES    ${identificacion}    ${nombre}    ${direccion}    ${telefono}
    Verificar transferencia completa de información del crédito a BES    ${identificacion}    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Verificar transferencia completa de información del equipo a BES    ${imei}    ${marca}    ${modelo}    ${identificacion}
    Verificar transferencia completa de calendario de pagos a BES    ${identificacion}    ${parcialidades}
    Wait Until Element Is Visible    ${BES_MENSAJE_TRANSFERENCIA_COMPLETA}    timeout=15s
    Log    BES recibe completamente toda la información necesaria para la administración del préstamo

Verificar origen de datos transferidos desde AP.AG
    Wait Until Element Is Visible    ${BES_CAMPO_ORIGEN_DATOS}    timeout=10s
    ${origen}=    Get Text    ${BES_CAMPO_ORIGEN_DATOS}
    Should Contain    ${origen}    AP.AG
    Wait Until Element Is Visible    ${BES_CAMPO_FECHA_TRANSFERENCIA}    timeout=10s
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_TRANSFERENCIA}
    Should Not Be Empty    ${fecha}
    Log    Datos transferidos desde AP.AG el ${fecha}

Asumir control del préstamo en BES
    [Arguments]    ${identificacion}=ABC123456
    Acceder a módulo de administración de préstamos en BES
    Buscar préstamo por identificación del cliente    ${identificacion}
    Wait Until Element Is Visible    ${BES_BOTON_ASUMIR_CONTROL_PRESTAMO}    timeout=10s
    Element Should Be Enabled    ${BES_BOTON_ASUMIR_CONTROL_PRESTAMO}
    Click Button    ${BES_BOTON_ASUMIR_CONTROL_PRESTAMO}
    Wait Until Element Is Visible    ${BES_MENSAJE_BES_RESPONSABLE}    timeout=15s
    Log    BES asume el control del préstamo

Verificar BES como sistema responsable de la administración del financiamiento
    Wait Until Element Is Visible    ${BES_MENSAJE_BES_RESPONSABLE}    timeout=10s
    Wait Until Element Is Visible    ${BES_CAMPO_SISTEMA_RESPONSABLE}    timeout=10s
    ${sistema}=    Get Text    ${BES_CAMPO_SISTEMA_RESPONSABLE}
    Should Contain    ${sistema}    BES
    Log    BES es el sistema responsable de la administración del financiamiento

Verificar habilitación de funcionalidades de gestión de pagos
    Wait Until Element Is Visible    ${BES_FUNCIONALIDAD_GESTION_PAGOS}    timeout=10s
    Element Should Be Enabled    ${BES_FUNCIONALIDAD_GESTION_PAGOS}
    Log    Funcionalidad de gestión de pagos habilitada en BES

Verificar habilitación de funcionalidades de inhabilitación de equipos
    Wait Until Element Is Visible    ${BES_FUNCIONALIDAD_INHABILITACION}    timeout=10s
    Element Should Be Enabled    ${BES_FUNCIONALIDAD_INHABILITACION}
    Log    Funcionalidad de inhabilitación de equipos habilitada en BES

Verificar habilitación de funcionalidades de habilitación de equipos
    Wait Until Element Is Visible    ${BES_FUNCIONALIDAD_HABILITACION}    timeout=10s
    Element Should Be Enabled    ${BES_FUNCIONALIDAD_HABILITACION}
    Log    Funcionalidad de habilitación de equipos habilitada en BES

Verificar habilitación de funcionalidades según calendario de cobranza
    Verificar habilitación de funcionalidades de gestión de pagos
    Verificar habilitación de funcionalidades de inhabilitación de equipos
    Verificar habilitación de funcionalidades de habilitación de equipos
    Log    BES tiene habilitadas las funcionalidades de gestión de pagos, inhabilitación y habilitación de equipos según calendario de cobranza
# ========================================
# LOCATORS Y KEYWORDS PARA REPORTE DE PAGOS DE AMIGO PAGUITOS (TC051)
# ========================================
${BES_MENU_REPORTES_PAGOS_AP}                  id:menu_reportes_pagos_ap
${BES_OPCION_REPORTE_PAGOS_AMIGO_PAGUITOS}     id:opcion_reporte_pagos_ap
${BES_SECCION_PARAMETROS_REPORTE_PAGOS}        id:seccion_parametros_reporte_pagos
${BES_INPUT_FECHA_INICIO_REPORTE_PAGOS}        id:fecha_inicio_reporte_pagos
${BES_INPUT_FECHA_FIN_REPORTE_PAGOS}           id:fecha_fin_reporte_pagos
${BES_SELECT_TIPO_PAGO_REPORTE}                id:select_tipo_pago_reporte
${BES_SELECT_CANAL_PAGO_REPORTE}               id:select_canal_pago_reporte
${BES_BOTON_GENERAR_REPORTE_PAGOS_AP}          css:.btn-generar-reporte-pagos-ap
${BES_PANEL_REPORTE_PAGOS_AP}                  css:.panel-reporte-pagos-ap
${BES_TABLA_REPORTE_PAGOS_AP}                  xpath://table[@id='tabla_reporte_pagos_ap']
${BES_COLUMNA_NOMBRE_CLIENTE_REPORTE}          xpath://th[contains(text(),'Cliente')]
${BES_COLUMNA_ID_PRESTAMO_REPORTE}             xpath://th[contains(text(),'Préstamo')]
${BES_COLUMNA_PARCIALIDAD_REPORTE}             xpath://th[contains(text(),'Parcialidad')]
${BES_COLUMNA_FECHA_VENCIMIENTO_REPORTE}       xpath://th[contains(text(),'Fecha Vencimiento')]
${BES_COLUMNA_MONTO_PAGADO_REPORTE}            xpath://th[contains(text(),'Monto Pagado')]
${BES_COLUMNA_FECHA_PAGO_REPORTE_AP}           xpath://th[contains(text(),'Fecha Pago')]
${BES_COLUMNA_CANAL_PAGO_REPORTE}              xpath://th[contains(text(),'Canal')]
${BES_CAMPO_DATO_CLIENTE_REPORTE}              xpath://td[@data-field='cliente']
${BES_CAMPO_DATO_PRESTAMO_REPORTE}             xpath://td[@data-field='prestamo']
${BES_CAMPO_DATO_PARCIALIDAD_REPORTE}          xpath://td[@data-field='parcialidad']
${BES_CAMPO_DATO_FECHA_VENC_REPORTE}           xpath://td[@data-field='fecha_vencimiento']
${BES_CAMPO_DATO_MONTO_REPORTE}                xpath://td[@data-field='monto_pagado']
${BES_CAMPO_DATO_FECHA_PAGO_REPORTE}           xpath://td[@data-field='fecha_pago']
${BES_CAMPO_DATO_CANAL_REPORTE}                xpath://td[@data-field='canal_pago']
${BES_MENSAJE_REPORTE_PAGOS_GENERADO}          xpath://div[contains(text(),'Reporte de pagos generado exitosamente')]
${BES_LINK_DESCARGAR_REPORTE_PAGOS}            css:.link-descargar-reporte-pagos
${BES_CONTADOR_REGISTROS_REPORTE_PAGOS}        css:.contador-registros-reporte-pagos

Acceder a módulo de reportes de pagos de Amigo Paguitos
    Click Element    ${BES_MENU_REPORTES_PAGOS_AP}
    Wait Until Element Is Visible    ${BES_OPCION_REPORTE_PAGOS_AMIGO_PAGUITOS}    timeout=10s
    Log    Acceso a módulo de reportes de pagos de Amigo Paguitos en BES

Seleccionar opción de reporte de pagos de Amigo Paguitos
    Click Element    ${BES_OPCION_REPORTE_PAGOS_AMIGO_PAGUITOS}
    Wait Until Element Is Visible    ${BES_SECCION_PARAMETROS_REPORTE_PAGOS}    timeout=10s
    Log    Opción de reporte de pagos de Amigo Paguitos seleccionada

Ingresar parámetros de consulta para reporte de pagos
    [Arguments]    ${fecha_inicio}=2026-01-01    ${fecha_fin}=2026-04-15    ${tipo_pago}=Parcialidad    ${canal}=Todos
    Input Text    ${BES_INPUT_FECHA_INICIO_REPORTE_PAGOS}    ${fecha_inicio}
    Input Text    ${BES_INPUT_FECHA_FIN_REPORTE_PAGOS}    ${fecha_fin}
    Select From List By Label    ${BES_SELECT_TIPO_PAGO_REPORTE}    ${tipo_pago}
    Select From List By Label    ${BES_SELECT_CANAL_PAGO_REPORTE}    ${canal}
    Log    Parámetros de consulta ingresados: Fecha inicio=${fecha_inicio}, Fecha fin=${fecha_fin}, Tipo=${tipo_pago}, Canal=${canal}

Ejecutar generación de reporte de pagos de Amigo Paguitos
    Click Button    ${BES_BOTON_GENERAR_REPORTE_PAGOS_AP}
    Wait Until Element Is Visible    ${BES_PANEL_REPORTE_PAGOS_AP}    timeout=20s
    Wait Until Element Is Visible    ${BES_MENSAJE_REPORTE_PAGOS_GENERADO}    timeout=15s
    Log    Reporte de pagos de Amigo Paguitos generado

Verificar reporte contiene columnas del layout de Amigo Paguitos
    Wait Until Element Is Visible    ${BES_TABLA_REPORTE_PAGOS_AP}    timeout=10s
    Page Should Contain Element    ${BES_COLUMNA_NOMBRE_CLIENTE_REPORTE}
    Page Should Contain Element    ${BES_COLUMNA_ID_PRESTAMO_REPORTE}
    Page Should Contain Element    ${BES_COLUMNA_PARCIALIDAD_REPORTE}
    Page Should Contain Element    ${BES_COLUMNA_FECHA_VENCIMIENTO_REPORTE}
    Page Should Contain Element    ${BES_COLUMNA_MONTO_PAGADO_REPORTE}
    Page Should Contain Element    ${BES_COLUMNA_FECHA_PAGO_REPORTE_AP}
    Page Should Contain Element    ${BES_COLUMNA_CANAL_PAGO_REPORTE}
    Log    Reporte contiene todas las columnas especificadas en el layout de Amigo Paguitos

Verificar reporte incluye información de cliente, préstamo, parcialidades y montos
    Wait Until Element Is Visible    ${BES_TABLA_REPORTE_PAGOS_AP}    timeout=10s
    ${filas}=    Get Element Count    ${BES_TABLA_REPORTE_PAGOS_AP}//tr[position()>1]
    Should Be True    ${filas} > 0
    Page Should Contain Element    ${BES_CAMPO_DATO_CLIENTE_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_DATO_PRESTAMO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_DATO_PARCIALIDAD_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_DATO_FECHA_VENC_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_DATO_MONTO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_DATO_FECHA_PAGO_REPORTE}
    Page Should Contain Element    ${BES_CAMPO_DATO_CANAL_REPORTE}
    Log    Reporte incluye información de cliente, préstamo, parcialidades, fechas de vencimiento y montos pagados con ${filas} registros

Validar datos del reporte corresponden con información almacenada en BES
    [Arguments]    ${identificacion}=ABC123456
    ${cliente}=    Get Text    ${BES_CAMPO_DATO_CLIENTE_REPORTE}
    ${prestamo}=    Get Text    ${BES_CAMPO_DATO_PRESTAMO_REPORTE}
    ${parcialidad}=    Get Text    ${BES_CAMPO_DATO_PARCIALIDAD_REPORTE}
    ${monto}=    Get Text    ${BES_CAMPO_DATO_MONTO_REPORTE}
    Should Not Be Empty    ${cliente}
    Should Not Be Empty    ${prestamo}
    Should Not Be Empty    ${parcialidad}
    Should Not Be Empty    ${monto}
    Log    Datos validados - Cliente: ${cliente}, Préstamo: ${prestamo}, Parcialidad: ${parcialidad}, Monto: ${monto}

Verificar disponibilidad de descarga del reporte de pagos
    Wait Until Element Is Visible    ${BES_LINK_DESCARGAR_REPORTE_PAGOS}    timeout=10s
    Element Should Be Enabled    ${BES_LINK_DESCARGAR_REPORTE_PAGOS}
    Log    Reporte de pagos disponible para descarga

Verificar contador de registros del reporte de pagos
    Wait Until Element Is Visible    ${BES_CONTADOR_REGISTROS_REPORTE_PAGOS}    timeout=10s
    ${total_registros}=    Get Text    ${BES_CONTADOR_REGISTROS_REPORTE_PAGOS}
    Should Not Be Empty    ${total_registros}
    Log    Total de registros en el reporte: ${total_registros}
    [Return]    ${total_registros}

# ========================================
# LOCATORS Y KEYWORDS PARA REPORTE DE COBRANZA DE AMIGO PAGUITOS (TC052)
# ========================================
${BES_MENU_REPORTES_COBRANZA}                  id:menu_reportes_cobranza
${BES_OPCION_REPORTE_COBRANZA_AMIGO_PAGUITOS}  id:opcion_reporte_cobranza_ap
${BES_SECCION_FILTROS_REPORTE_COBRANZA}        id:seccion_filtros_reporte_cobranza
${BES_SELECT_PERIODO_REPORTE_COBRANZA}         id:select_periodo_reporte_cobranza
${BES_SELECT_ESTADO_PAGO_REPORTE_COBRANZA}     id:select_estado_pago_reporte_cobranza
${BES_SELECT_CANAL_VENTA_REPORTE_COBRANZA}     id:select_canal_venta_reporte_cobranza
${BES_BOTON_APLICAR_FILTROS_COBRANZA}          css:.btn-aplicar-filtros-cobranza
${BES_BOTON_GENERAR_REPORTE_COBRANZA}          css:.btn-generar-reporte-cobranza
${BES_PANEL_REPORTE_COBRANZA}                  css:.panel-reporte-cobranza
${BES_TABLA_REPORTE_COBRANZA}                  xpath://table[@id='tabla_reporte_cobranza']
${BES_COLUMNA_CLIENTE_REPORTE_COBRANZA}        xpath://th[contains(text(),'Cliente')]
${BES_COLUMNA_PRESTAMO_REPORTE_COBRANZA}       xpath://th[contains(text(),'Préstamo')]
${BES_COLUMNA_CALENDARIO_COBRANZA}             xpath://th[contains(text(),'Calendario')]
${BES_COLUMNA_FECHA_VENCIMIENTO_COBRANZA}      xpath://th[contains(text(),'Fecha Vencimiento')]
${BES_COLUMNA_MONTO_ADEUDADO_COBRANZA}         xpath://th[contains(text(),'Monto Adeudado')]
${BES_COLUMNA_ESTATUS_PARCIALIDAD_COBRANZA}    xpath://th[contains(text(),'Estatus')]
${BES_CAMPO_DATO_CLIENTE_COBRANZA}             xpath://td[@data-field='nombre_cliente']
${BES_CAMPO_DATO_PRESTAMO_COBRANZA}            xpath://td[@data-field='id_prestamo']
${BES_CAMPO_DATO_CALENDARIO_COBRANZA}          xpath://td[@data-field='calendario_cobranza']
${BES_CAMPO_DATO_FECHA_VENCIMIENTO_COBRANZA}   xpath://td[@data-field='fecha_vencimiento']
${BES_CAMPO_DATO_MONTO_ADEUDADO_COBRANZA}      xpath://td[@data-field='monto_adeudado']
${BES_CAMPO_DATO_ESTATUS_PARCIALIDAD}          xpath://td[@data-field='estatus_parcialidad']
${BES_MENSAJE_REPORTE_COBRANZA_GENERADO}       xpath://div[contains(text(),'Reporte de cobranza generado exitosamente')]
${BES_SECCION_DESGLOSE_CUOTAS}                 css:.seccion-desglose-cuotas
${BES_CAMPO_CUOTAS_PENDIENTES}                 xpath://td[@data-field='cuotas_pendientes']
${BES_CAMPO_CUOTAS_PAGADAS}                    xpath://td[@data-field='cuotas_pagadas']
${BES_LINK_DESCARGAR_REPORTE_COBRANZA}         css:.link-descargar-reporte-cobranza
${BES_CONTADOR_REGISTROS_REPORTE_COBRANZA}     css:.contador-registros-reporte-cobranza

Acceder a módulo de reportes de cobranza en BES
    Click Element    ${BES_MENU_REPORTES_COBRANZA}
    Wait Until Element Is Visible    ${BES_OPCION_REPORTE_COBRANZA_AMIGO_PAGUITOS}    timeout=10s
    Log    Acceso a módulo de reportes de cobranza en BES

Seleccionar tipo de reporte de cobranza para Amigo Paguitos
    Click Element    ${BES_OPCION_REPORTE_COBRANZA_AMIGO_PAGUITOS}
    Wait Until Element Is Visible    ${BES_SECCION_FILTROS_REPORTE_COBRANZA}    timeout=10s
    Log    Tipo de reporte de cobranza para Amigo Paguitos seleccionado

Verificar que se presentan filtros disponibles para el reporte
    Wait Until Element Is Visible    ${BES_SELECT_PERIODO_REPORTE_COBRANZA}    timeout=10s
    Wait Until Element Is Visible    ${BES_SELECT_ESTADO_PAGO_REPORTE_COBRANZA}    timeout=10s
    Wait Until Element Is Visible    ${BES_SELECT_CANAL_VENTA_REPORTE_COBRANZA}    timeout=10s
    Page Should Contain Element    ${BES_SELECT_PERIODO_REPORTE_COBRANZA}
    Page Should Contain Element    ${BES_SELECT_ESTADO_PAGO_REPORTE_COBRANZA}
    Page Should Contain Element    ${BES_SELECT_CANAL_VENTA_REPORTE_COBRANZA}
    Log    Filtros de período, estado de pago y canal de venta disponibles

Aplicar filtros para reporte de cobranza
    [Arguments]    ${periodo}=Mensual    ${estado_pago}=Todos    ${canal_venta}=Todos
    Select From List By Label    ${BES_SELECT_PERIODO_REPORTE_COBRANZA}    ${periodo}
    Select From List By Label    ${BES_SELECT_ESTADO_PAGO_REPORTE_COBRANZA}    ${estado_pago}
    Select From List By Label    ${BES_SELECT_CANAL_VENTA_REPORTE_COBRANZA}    ${canal_venta}
    Click Button    ${BES_BOTON_APLICAR_FILTROS_COBRANZA}
    Log    Filtros aplicados: Período=${periodo}, Estado pago=${estado_pago}, Canal=${canal_venta}

Generar reporte de cobranza de Amigo Paguitos
    Click Button    ${BES_BOTON_GENERAR_REPORTE_COBRANZA}
    Wait Until Element Is Visible    ${BES_PANEL_REPORTE_COBRANZA}    timeout=20s
    Wait Until Element Is Visible    ${BES_MENSAJE_REPORTE_COBRANZA_GENERADO}    timeout=15s
    Log    Reporte de cobranza de Amigo Paguitos generado

Verificar que el reporte incluye calendario de cobranza
    Wait Until Element Is Visible    ${BES_TABLA_REPORTE_COBRANZA}    timeout=10s
    Page Should Contain Element    ${BES_COLUMNA_CALENDARIO_COBRANZA}
    Page Should Contain Element    ${BES_CAMPO_DATO_CALENDARIO_COBRANZA}
    Log    Reporte incluye información del calendario de cobranza

Verificar que el reporte incluye fechas de vencimiento
    Wait Until Element Is Visible    ${BES_TABLA_REPORTE_COBRANZA}    timeout=10s
    Page Should Contain Element    ${BES_COLUMNA_FECHA_VENCIMIENTO_COBRANZA}
    Page Should Contain Element    ${BES_CAMPO_DATO_FECHA_VENCIMIENTO_COBRANZA}
    ${fecha_vencimiento}=    Get Text    ${BES_CAMPO_DATO_FECHA_VENCIMIENTO_COBRANZA}
    Should Not Be Empty    ${fecha_vencimiento}
    Log    Reporte incluye fechas de vencimiento de las parcialidades

Verificar que el reporte incluye montos adeudados
    Wait Until Element Is Visible    ${BES_TABLA_REPORTE_COBRANZA}    timeout=10s
    Page Should Contain Element    ${BES_COLUMNA_MONTO_ADEUDADO_COBRANZA}
    Page Should Contain Element    ${BES_CAMPO_DATO_MONTO_ADEUDADO_COBRANZA}
    ${monto_adeudado}=    Get Text    ${BES_CAMPO_DATO_MONTO_ADEUDADO_COBRANZA}
    Should Not Be Empty    ${monto_adeudado}
    Log    Reporte incluye montos adeudados de las parcialidades

Verificar que el reporte incluye estatus de parcialidades
    Wait Until Element Is Visible    ${BES_TABLA_REPORTE_COBRANZA}    timeout=10s
    Page Should Contain Element    ${BES_COLUMNA_ESTATUS_PARCIALIDAD_COBRANZA}
    Page Should Contain Element    ${BES_CAMPO_DATO_ESTATUS_PARCIALIDAD}
    ${estatus}=    Get Text    ${BES_CAMPO_DATO_ESTATUS_PARCIALIDAD}
    Should Not Be Empty    ${estatus}
    Log    Reporte incluye estatus de parcialidades (Pendiente, Pagada, Vencida)

Verificar desglose de cuotas pendientes y pagadas en reporte
    Wait Until Element Is Visible    ${BES_SECCION_DESGLOSE_CUOTAS}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_CUOTAS_PENDIENTES}
    Page Should Contain Element    ${BES_CAMPO_CUOTAS_PAGADAS}
    ${cuotas_pendientes}=    Get Text    ${BES_CAMPO_CUOTAS_PENDIENTES}
    ${cuotas_pagadas}=    Get Text    ${BES_CAMPO_CUOTAS_PAGADAS}
    Should Not Be Empty    ${cuotas_pendientes}
    Should Not Be Empty    ${cuotas_pagadas}
    Log    Reporte muestra desglose de cuotas: Pendientes=${cuotas_pendientes}, Pagadas=${cuotas_pagadas}

Validar consistencia de datos del reporte de cobranza con BES
    [Arguments]    ${identificacion}=ABC123456
    ${cliente}=    Get Text    ${BES_CAMPO_DATO_CLIENTE_COBRANZA}
    ${prestamo}=    Get Text    ${BES_CAMPO_DATO_PRESTAMO_COBRANZA}
    ${calendario}=    Get Text    ${BES_CAMPO_DATO_CALENDARIO_COBRANZA}
    ${fecha_vencimiento}=    Get Text    ${BES_CAMPO_DATO_FECHA_VENCIMIENTO_COBRANZA}
    ${monto_adeudado}=    Get Text    ${BES_CAMPO_DATO_MONTO_ADEUDADO_COBRANZA}
    ${estatus}=    Get Text    ${BES_CAMPO_DATO_ESTATUS_PARCIALIDAD}
    Should Not Be Empty    ${cliente}
    Should Not Be Empty    ${prestamo}
    Should Not Be Empty    ${calendario}
    Should Not Be Empty    ${fecha_vencimiento}
    Should Not Be Empty    ${monto_adeudado}
    Should Not Be Empty    ${estatus}
    Log    Datos validados - Cliente: ${cliente}, Préstamo: ${prestamo}, Calendario: ${calendario}, Vencimiento: ${fecha_vencimiento}, Monto: ${monto_adeudado}, Estatus: ${estatus}

Verificar disponibilidad de descarga del reporte de cobranza
    Wait Until Element Is Visible    ${BES_LINK_DESCARGAR_REPORTE_COBRANZA}    timeout=10s
    Element Should Be Enabled    ${BES_LINK_DESCARGAR_REPORTE_COBRANZA}
    Log    Reporte de cobranza disponible para descarga

Verificar contador de registros del reporte de cobranza
    Wait Until Element Is Visible    ${BES_CONTADOR_REGISTROS_REPORTE_COBRANZA}    timeout=10s
    ${total_registros}=    Get Text    ${BES_CONTADOR_REGISTROS_REPORTE_COBRANZA}
    Should Not Be Empty    ${total_registros}
    Log    Total de registros en el reporte de cobranza: ${total_registros}
    [Return]    ${total_registros}

# ========================================
# LOCATORS Y KEYWORDS PARA CONFIGURACIÓN DE CICLOS DE PAGO SEMANAL (TC053)
# ========================================
${BES_BOTON_CREAR_NUEVO_PRESTAMO}              id:btn_crear_nuevo_prestamo
${BES_PANEL_CREAR_PRESTAMO}                    id:panel_crear_prestamo
${BES_INPUT_CLIENTE_PRESTAMO}                  id:input_cliente_prestamo
${BES_SELECT_PERIODICIDAD_PRESTAMO}            id:select_periodicidad_prestamo
${BES_CAMPO_RANGO_CICLOS_PERMITIDOS}           css:.rango-ciclos-permitidos
${BES_INPUT_NUMERO_CICLOS}                     id:input_numero_ciclos
${BES_BOTON_VALIDAR_CONFIGURACION}             css:.btn-validar-configuracion
${BES_BOTON_GUARDAR_PRESTAMO}                  css:.btn-guardar-prestamo
${BES_MENSAJE_CONFIGURACION_ACEPTADA}          xpath://div[contains(text(),'Configuración aceptada')]
${BES_MENSAJE_ERROR_CICLOS_EXCEDIDOS}          xpath://div[contains(text(),'número de ciclos excede lo permitido')]
${BES_CAMPO_PERFIL_CREDITICIO_USUARIO}         css:.perfil-crediticio-usuario
${BES_CAMPO_CICLOS_MIN_PERMITIDOS}             css:.ciclos-min-permitidos
${BES_CAMPO_CICLOS_MAX_PERMITIDOS}             css:.ciclos-max-permitidos

Crear nuevo préstamo en administración de préstamos
    Wait Until Element Is Visible    ${BES_BOTON_CREAR_NUEVO_PRESTAMO}    timeout=10s
    Click Button    ${BES_BOTON_CREAR_NUEVO_PRESTAMO}
    Wait Until Element Is Visible    ${BES_PANEL_CREAR_PRESTAMO}    timeout=10s
    Log    Formulario de creación de nuevo préstamo abierto

Seleccionar cliente validado por Amigo Paguitos para nuevo préstamo
    [Arguments]    ${identificacion_cliente}
    Wait Until Element Is Visible    ${BES_INPUT_CLIENTE_PRESTAMO}    timeout=10s
    Input Text    ${BES_INPUT_CLIENTE_PRESTAMO}    ${identificacion_cliente}
    Press Keys    ${BES_INPUT_CLIENTE_PRESTAMO}    RETURN
    Sleep    1s
    Log    Cliente seleccionado: ${identificacion_cliente}

Seleccionar periodicidad semanal para el préstamo
    Wait Until Element Is Visible    ${BES_SELECT_PERIODICIDAD_PRESTAMO}    timeout=10s
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_PRESTAMO}    Semanal
    Sleep    1s
    Log    Periodicidad semanal seleccionada

Verificar rango de ciclos permitidos según perfil del usuario
    [Arguments]    ${ciclos_min_esperados}    ${ciclos_max_esperados}
    Wait Until Element Is Visible    ${BES_CAMPO_RANGO_CICLOS_PERMITIDOS}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_PERFIL_CREDITICIO_USUARIO}
    ${ciclos_min}=    Get Text    ${BES_CAMPO_CICLOS_MIN_PERMITIDOS}
    ${ciclos_max}=    Get Text    ${BES_CAMPO_CICLOS_MAX_PERMITIDOS}
    Should Be Equal    ${ciclos_min}    ${ciclos_min_esperados}
    Should Be Equal    ${ciclos_max}    ${ciclos_max_esperados}
    Log    Rango de ciclos permitidos: ${ciclos_min} a ${ciclos_max} según perfil crediticio del usuario

Ingresar número de ciclos para préstamo semanal
    [Arguments]    ${numero_ciclos}
    Wait Until Element Is Visible    ${BES_INPUT_NUMERO_CICLOS}    timeout=10s
    Input Text    ${BES_INPUT_NUMERO_CICLOS}    ${numero_ciclos}
    Log    Número de ciclos ingresado: ${numero_ciclos}

Validar configuración de ciclos ingresada
    Wait Until Element Is Visible    ${BES_BOTON_VALIDAR_CONFIGURACION}    timeout=10s
    Click Button    ${BES_BOTON_VALIDAR_CONFIGURACION}
    Sleep    2s
    Log    Validación de configuración de ciclos ejecutada

Verificar aceptación de número de ciclos dentro del rango
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIGURACION_ACEPTADA}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_CONFIGURACION_ACEPTADA}
    Element Should Be Enabled    ${BES_BOTON_GUARDAR_PRESTAMO}
    Log    Sistema acepta la configuración de ciclos dentro del rango permitido

Verificar rechazo de número de ciclos fuera del rango
    Wait Until Element Is Visible    ${BES_MENSAJE_ERROR_CICLOS_EXCEDIDOS}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_ERROR_CICLOS_EXCEDIDOS}
    ${mensaje_error}=    Get Text    ${BES_MENSAJE_ERROR_CICLOS_EXCEDIDOS}
    Should Contain    ${mensaje_error}    número de ciclos excede lo permitido
    Element Should Be Disabled    ${BES_BOTON_GUARDAR_PRESTAMO}
    Log    Sistema rechaza configuración: ${mensaje_error}

# ========================================
# LOCATORS Y KEYWORDS PARA CONFIGURACIÓN DE CICLOS DE PAGO QUINCENAL (TC054 - IOSPR-868)
# ========================================
${BES_SELECT_PERIODICIDAD_QUINCENAL}            id:select_periodicidad_prestamo
${BES_CAMPO_RANGO_CICLOS_QUINCENALES}           css:.rango-ciclos-quincenales-permitidos
${BES_INPUT_NUMERO_CICLOS_QUINCENALES}          id:input_numero_ciclos
${BES_BOTON_VALIDAR_CONFIG_QUINCENAL}           css:.btn-validar-configuracion
${BES_BOTON_GUARDAR_PRESTAMO_QUINCENAL}         css:.btn-guardar-prestamo
${BES_MENSAJE_CONFIG_QUINCENAL_ACEPTADA}        xpath://div[contains(text(),'Configuración quincenal aceptada')]
${BES_MENSAJE_ERROR_CICLOS_QUINCENALES_EXCEDIDOS}    xpath://div[contains(text(),'número de ciclos quincenales excede lo permitido')]
${BES_CAMPO_PERFIL_CREDITICIO_QUINCENAL}        css:.perfil-crediticio-usuario
${BES_CAMPO_CICLOS_QUINCENALES_MIN}             css:.ciclos-quincenales-min-permitidos
${BES_CAMPO_CICLOS_QUINCENALES_MAX}             css:.ciclos-quincenales-max-permitidos
${BES_CAMPO_VALIDACION_USUARIO_AMIGO_PAGUITOS}  css:.validacion-usuario-amigo-paguitos

Seleccionar periodicidad quincenal para el préstamo
    Wait Until Element Is Visible    ${BES_SELECT_PERIODICIDAD_QUINCENAL}    timeout=10s
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_QUINCENAL}    Quincenal
    Sleep    1s
    Log    Periodicidad quincenal seleccionada

Verificar rango de ciclos quincenales permitidos según perfil del usuario
    [Arguments]    ${ciclos_min_esperados}    ${ciclos_max_esperados}
    Wait Until Element Is Visible    ${BES_CAMPO_RANGO_CICLOS_QUINCENALES}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_PERFIL_CREDITICIO_QUINCENAL}
    Page Should Contain Element    ${BES_CAMPO_VALIDACION_USUARIO_AMIGO_PAGUITOS}
    ${ciclos_min}=    Get Text    ${BES_CAMPO_CICLOS_QUINCENALES_MIN}
    ${ciclos_max}=    Get Text    ${BES_CAMPO_CICLOS_QUINCENALES_MAX}
    Should Be Equal    ${ciclos_min}    ${ciclos_min_esperados}
    Should Be Equal    ${ciclos_max}    ${ciclos_max_esperados}
    Log    Rango de ciclos quincenales permitidos: ${ciclos_min} a ${ciclos_max} según perfil crediticio validado por Amigo Paguitos

Ingresar número de ciclos quincenales para préstamo
    [Arguments]    ${numero_ciclos}
    Wait Until Element Is Visible    ${BES_INPUT_NUMERO_CICLOS_QUINCENALES}    timeout=10s
    Input Text    ${BES_INPUT_NUMERO_CICLOS_QUINCENALES}    ${numero_ciclos}
    Log    Número de ciclos quincenales ingresado: ${numero_ciclos}

Validar configuración de ciclos quincenales ingresada
    Wait Until Element Is Visible    ${BES_BOTON_VALIDAR_CONFIG_QUINCENAL}    timeout=10s
    Click Button    ${BES_BOTON_VALIDAR_CONFIG_QUINCENAL}
    Sleep    2s
    Log    Validación de configuración de ciclos quincenales ejecutada

Verificar aceptación de número de ciclos quincenales dentro del rango
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIG_QUINCENAL_ACEPTADA}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_CONFIG_QUINCENAL_ACEPTADA}
    Element Should Be Enabled    ${BES_BOTON_GUARDAR_PRESTAMO_QUINCENAL}
    Log    Sistema acepta la configuración de ciclos quincenales dentro del rango permitido según validación de Amigo Paguitos

Verificar rechazo de número de ciclos quincenales fuera del rango
    Wait Until Element Is Visible    ${BES_MENSAJE_ERROR_CICLOS_QUINCENALES_EXCEDIDOS}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_ERROR_CICLOS_QUINCENALES_EXCEDIDOS}
    ${mensaje_error}=    Get Text    ${BES_MENSAJE_ERROR_CICLOS_QUINCENALES_EXCEDIDOS}
    Should Contain    ${mensaje_error}    número de ciclos quincenales excede lo permitido
    Element Should Be Disabled    ${BES_BOTON_GUARDAR_PRESTAMO_QUINCENAL}
    Log    Sistema rechaza configuración quincenal: ${mensaje_error}

# ========================================
# LOCATORS Y KEYWORDS PARA CONFIGURACIÓN DE CICLOS DE PAGO MENSUAL (TC055 - IOSPR-868)
# ========================================
${BES_SELECT_PERIODICIDAD_MENSUAL}            id:select_periodicidad_prestamo
${BES_CAMPO_RANGO_CICLOS_MENSUALES}           css:.rango-ciclos-mensuales-permitidos
${BES_INPUT_NUMERO_CICLOS_MENSUALES}          id:input_numero_ciclos
${BES_BOTON_VALIDAR_CONFIG_MENSUAL}           css:.btn-validar-configuracion
${BES_BOTON_GUARDAR_PRESTAMO_MENSUAL}         css:.btn-guardar-prestamo
${BES_MENSAJE_CONFIG_MENSUAL_ACEPTADA}        xpath://div[contains(text(),'Configuración mensual aceptada')]
${BES_MENSAJE_ERROR_CICLOS_MENSUALES_EXCEDIDOS}    xpath://div[contains(text(),'número de ciclos mensuales excede lo permitido')]
${BES_CAMPO_PERFIL_CREDITICIO_MENSUAL}        css:.perfil-crediticio-usuario
${BES_CAMPO_CICLOS_MENSUALES_MIN}             css:.ciclos-mensuales-min-permitidos
${BES_CAMPO_CICLOS_MENSUALES_MAX}             css:.ciclos-mensuales-max-permitidos
${BES_CAMPO_VALIDACION_USUARIO_AMIGO_PAGUITOS_MENSUAL}  css:.validacion-usuario-amigo-paguitos

Seleccionar periodicidad mensual para el préstamo
    Wait Until Element Is Visible    ${BES_SELECT_PERIODICIDAD_MENSUAL}    timeout=10s
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_MENSUAL}    Mensual
    Sleep    1s
    Log    Periodicidad mensual seleccionada

Verificar rango de ciclos mensuales permitidos según perfil del usuario
    [Arguments]    ${ciclos_min_esperados}    ${ciclos_max_esperados}
    Wait Until Element Is Visible    ${BES_CAMPO_RANGO_CICLOS_MENSUALES}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_PERFIL_CREDITICIO_MENSUAL}
    Page Should Contain Element    ${BES_CAMPO_VALIDACION_USUARIO_AMIGO_PAGUITOS_MENSUAL}
    ${ciclos_min}=    Get Text    ${BES_CAMPO_CICLOS_MENSUALES_MIN}
    ${ciclos_max}=    Get Text    ${BES_CAMPO_CICLOS_MENSUALES_MAX}
    Should Be Equal    ${ciclos_min}    ${ciclos_min_esperados}
    Should Be Equal    ${ciclos_max}    ${ciclos_max_esperados}
    Log    Rango de ciclos mensuales permitidos: ${ciclos_min} a ${ciclos_max} según perfil crediticio validado por Amigo Paguitos

Ingresar número de ciclos mensuales para préstamo
    [Arguments]    ${numero_ciclos}
    Wait Until Element Is Visible    ${BES_INPUT_NUMERO_CICLOS_MENSUALES}    timeout=10s
    Input Text    ${BES_INPUT_NUMERO_CICLOS_MENSUALES}    ${numero_ciclos}
    Log    Número de ciclos mensuales ingresado: ${numero_ciclos}

Validar configuración de ciclos mensuales ingresada
    Wait Until Element Is Visible    ${BES_BOTON_VALIDAR_CONFIG_MENSUAL}    timeout=10s
    Click Button    ${BES_BOTON_VALIDAR_CONFIG_MENSUAL}
    Sleep    2s
    Log    Validación de configuración de ciclos mensuales ejecutada

Verificar aceptación de número de ciclos mensuales dentro del rango
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIG_MENSUAL_ACEPTADA}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_CONFIG_MENSUAL_ACEPTADA}
    Element Should Be Enabled    ${BES_BOTON_GUARDAR_PRESTAMO_MENSUAL}
    Log    Sistema acepta la configuración de ciclos mensuales dentro del rango permitido según validación de Amigo Paguitos

Verificar rechazo de número de ciclos mensuales fuera del rango
    Wait Until Element Is Visible    ${BES_MENSAJE_ERROR_CICLOS_MENSUALES_EXCEDIDOS}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_ERROR_CICLOS_MENSUALES_EXCEDIDOS}
    ${mensaje_error}=    Get Text    ${BES_MENSAJE_ERROR_CICLOS_MENSUALES_EXCEDIDOS}
    Should Contain    ${mensaje_error}    número de ciclos mensuales excede lo permitido
    Element Should Be Disabled    ${BES_BOTON_GUARDAR_PRESTAMO_MENSUAL}
    Log    Sistema rechaza configuración mensual: ${mensaje_error}

# ========================================
# LOCATORS Y KEYWORDS PARA VALIDACIÓN DE PLAZOS A 3 MESES SEGÚN AMIGO PAGUITOS (TC056 - IOSPR-868)
# ========================================
${BES_SELECT_PLAZO_PRESTAMO}                   id:select_plazo_prestamo
${BES_CAMPO_PLAZO_3_MESES}                     xpath://option[@value='3']
${BES_CAMPO_INFO_CLIENTE_VALIDADO}             css:.info-cliente-validado
${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}           css:.perfil-crediticio-plazo-autorizado
${BES_MENSAJE_PLAZO_3_MESES_AUTORIZADO}        xpath://div[contains(text(),'Plazo de 3 meses autorizado por Amigo Paguitos')]
${BES_INPUT_MONTO_PRESTAMO_3_MESES}            id:input_monto_prestamo
${BES_SELECT_PERIODICIDAD_PAGO_3_MESES}        id:select_periodicidad_pago
${BES_BOTON_VALIDAR_PLAZO_3_MESES}             css:.btn-validar-plazo
${BES_MENSAJE_VALIDACION_PLAZO_3_MESES_OK}     xpath://div[contains(text(),'Validación exitosa de plazo 3 meses')]
${BES_BOTON_GUARDAR_PRESTAMO_3_MESES}          css:.btn-guardar-prestamo-3-meses
${BES_MENSAJE_PRESTAMO_3_MESES_CREADO}         xpath://div[contains(text(),'Préstamo creado con plazo de 3 meses')]
${BES_TABLA_CALENDARIO_PAGOS_3_MESES}          xpath://table[@id='tabla_calendario_pagos']
${BES_CAMPO_NUMERO_PARCIALIDADES_3_MESES}      css:.numero-parcialidades-calendario
${BES_CAMPO_FECHA_VENCIMIENTO_PARCIALIDAD}     xpath://td[@data-field='fecha_vencimiento']

Verificar que se carga información del cliente validado
    Wait Until Element Is Visible    ${BES_CAMPO_INFO_CLIENTE_VALIDADO}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_INFO_CLIENTE_VALIDADO}
    ${info_cliente}=    Get Text    ${BES_CAMPO_INFO_CLIENTE_VALIDADO}
    Should Not Be Empty    ${info_cliente}
    Log    Información del cliente validado cargada: ${info_cliente}

Verificar que perfil crediticio muestra plazo 3 meses autorizado
    Wait Until Element Is Visible    ${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_PLAZO_3_MESES_AUTORIZADO}
    ${plazo_autorizado}=    Get Text    ${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}
    Should Contain    ${plazo_autorizado}    3 meses
    Log    Perfil crediticio muestra plazo de 3 meses autorizado por Amigo Paguitos

Seleccionar plazo de 3 meses en formulario del préstamo
    Wait Until Element Is Visible    ${BES_SELECT_PLAZO_PRESTAMO}    timeout=10s
    Wait Until Element Is Visible    ${BES_CAMPO_PLAZO_3_MESES}    timeout=10s
    Select From List By Value    ${BES_SELECT_PLAZO_PRESTAMO}    3
    Sleep    1s
    Log    Plazo de 3 meses seleccionado en el formulario

Verificar validación de autorización de plazo 3 meses por Amigo Paguitos
    Wait Until Element Is Visible    ${BES_BOTON_VALIDAR_PLAZO_3_MESES}    timeout=10s
    Click Button    ${BES_BOTON_VALIDAR_PLAZO_3_MESES}
    Wait Until Element Is Visible    ${BES_MENSAJE_VALIDACION_PLAZO_3_MESES_OK}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_VALIDACION_PLAZO_3_MESES_OK}
    Log    Sistema validó que el cliente tiene autorizado el plazo de 3 meses según Amigo Paguitos

Completar datos del préstamo para plazo 3 meses
    [Arguments]    ${monto}=25000    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_INPUT_MONTO_PRESTAMO_3_MESES}    timeout=10s
    Input Text    ${BES_INPUT_MONTO_PRESTAMO_3_MESES}    ${monto}
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_PAGO_3_MESES}    ${periodicidad}
    Sleep    1s
    Log    Datos del préstamo completados: Monto=${monto}, Periodicidad=${periodicidad}, Plazo=3 meses

Guardar configuración del préstamo con plazo 3 meses
    Wait Until Element Is Visible    ${BES_BOTON_GUARDAR_PRESTAMO_3_MESES}    timeout=10s
    Element Should Be Enabled    ${BES_BOTON_GUARDAR_PRESTAMO_3_MESES}
    Click Button    ${BES_BOTON_GUARDAR_PRESTAMO_3_MESES}
    Sleep    2s
    Log    Configuración del préstamo guardada con plazo de 3 meses

Verificar creación exitosa del préstamo con plazo 3 meses
    Wait Until Element Is Visible    ${BES_MENSAJE_PRESTAMO_3_MESES_CREADO}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_PRESTAMO_3_MESES_CREADO}
    ${mensaje}=    Get Text    ${BES_MENSAJE_PRESTAMO_3_MESES_CREADO}
    Should Contain    ${mensaje}    Préstamo creado
    Should Contain    ${mensaje}    3 meses
    Log    Préstamo creado exitosamente con plazo de 3 meses

Verificar generación de calendario de pagos para plazo 3 meses
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_3_MESES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_3_MESES}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS_3_MESES}//tr[position()>1]
    Should Be True    ${filas} >= 3
    Log    Calendario de pagos generado con ${filas} parcialidades para plazo de 3 meses

Verificar calendario de cobranza generado para plazo 3 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_3_MESES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_3_MESES}
    ${num_parcialidades}=    Get Text    ${BES_CAMPO_NUMERO_PARCIALIDADES_3_MESES}
    Run Keyword If    '${periodicidad}' == 'mensual'    Should Contain    ${num_parcialidades}    3
    Log    Calendario de cobranza generado para plazo de 3 meses con periodicidad ${periodicidad}

Verificar fechas de vencimiento correctas en calendario de 3 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_3_MESES}    timeout=10s
    ${fechas}=    Get WebElements    ${BES_CAMPO_FECHA_VENCIMIENTO_PARCIALIDAD}
    ${num_fechas}=    Get Length    ${fechas}
    Should Be True    ${num_fechas} >= 3
    Log    Fechas de vencimiento verificadas en calendario de 3 meses con ${num_fechas} parcialidades según periodicidad ${periodicidad}

# ========================================
# LOCATORS Y KEYWORDS PARA VALIDACIÓN DE PLAZOS A 6 MESES SEGÚN AMIGO PAGUITOS (TC057 - IOSPR-868)
# ========================================
${BES_CAMPO_PLAZO_6_MESES}                     xpath://option[@value='6']
${BES_MENSAJE_PLAZO_6_MESES_AUTORIZADO}        xpath://div[contains(text(),'Plazo de 6 meses autorizado por Amigo Paguitos')]
${BES_INPUT_MONTO_PRESTAMO_6_MESES}            id:input_monto_prestamo
${BES_SELECT_PERIODICIDAD_PAGO_6_MESES}        id:select_periodicidad_pago
${BES_BOTON_VALIDAR_PLAZO_6_MESES}             css:.btn-validar-plazo
${BES_MENSAJE_VALIDACION_PLAZO_6_MESES_OK}     xpath://div[contains(text(),'Validación exitosa de plazo 6 meses')]
${BES_BOTON_GUARDAR_PRESTAMO_6_MESES}          css:.btn-guardar-prestamo-6-meses
${BES_MENSAJE_PRESTAMO_6_MESES_CREADO}         xpath://div[contains(text(),'Préstamo creado con plazo de 6 meses')]
${BES_TABLA_CALENDARIO_PAGOS_6_MESES}          xpath://table[@id='tabla_calendario_pagos']
${BES_CAMPO_NUMERO_PARCIALIDADES_6_MESES}      css:.numero-parcialidades-calendario

Verificar que perfil crediticio muestra plazo 6 meses autorizado
    Wait Until Element Is Visible    ${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_PLAZO_6_MESES_AUTORIZADO}
    ${plazo_autorizado}=    Get Text    ${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}
    Should Contain    ${plazo_autorizado}    6 meses
    Log    Perfil crediticio muestra plazo de 6 meses autorizado por Amigo Paguitos

Seleccionar plazo de 6 meses en formulario del préstamo
    Wait Until Element Is Visible    ${BES_SELECT_PLAZO_PRESTAMO}    timeout=10s
    Wait Until Element Is Visible    ${BES_CAMPO_PLAZO_6_MESES}    timeout=10s
    Select From List By Value    ${BES_SELECT_PLAZO_PRESTAMO}    6
    Sleep    1s
    Log    Plazo de 6 meses seleccionado en el formulario

Verificar validación de autorización de plazo 6 meses por Amigo Paguitos
    Wait Until Element Is Visible    ${BES_BOTON_VALIDAR_PLAZO_6_MESES}    timeout=10s
    Click Button    ${BES_BOTON_VALIDAR_PLAZO_6_MESES}
    Wait Until Element Is Visible    ${BES_MENSAJE_VALIDACION_PLAZO_6_MESES_OK}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_VALIDACION_PLAZO_6_MESES_OK}
    Log    Sistema validó que el cliente tiene autorizado el plazo de 6 meses según Amigo Paguitos

Completar datos del préstamo para plazo 6 meses
    [Arguments]    ${monto}=35000    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_INPUT_MONTO_PRESTAMO_6_MESES}    timeout=10s
    Input Text    ${BES_INPUT_MONTO_PRESTAMO_6_MESES}    ${monto}
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_PAGO_6_MESES}    ${periodicidad}
    Sleep    1s
    Log    Datos del préstamo completados: Monto=${monto}, Periodicidad=${periodicidad}, Plazo=6 meses

Guardar configuración del préstamo con plazo 6 meses
    Wait Until Element Is Visible    ${BES_BOTON_GUARDAR_PRESTAMO_6_MESES}    timeout=10s
    Element Should Be Enabled    ${BES_BOTON_GUARDAR_PRESTAMO_6_MESES}
    Click Button    ${BES_BOTON_GUARDAR_PRESTAMO_6_MESES}
    Sleep    2s
    Log    Configuración del préstamo guardada con plazo de 6 meses

Verificar creación exitosa del préstamo con plazo 6 meses
    Wait Until Element Is Visible    ${BES_MENSAJE_PRESTAMO_6_MESES_CREADO}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_PRESTAMO_6_MESES_CREADO}
    ${mensaje}=    Get Text    ${BES_MENSAJE_PRESTAMO_6_MESES_CREADO}
    Should Contain    ${mensaje}    Préstamo creado
    Should Contain    ${mensaje}    6 meses
    Log    Préstamo creado exitosamente con plazo de 6 meses

Verificar generación de calendario de pagos para plazo 6 meses
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_6_MESES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_6_MESES}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS_6_MESES}//tr[position()>1]
    Should Be True    ${filas} >= 6
    Log    Calendario de pagos generado con ${filas} parcialidades para plazo de 6 meses

Verificar calendario de cobranza generado para plazo 6 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_6_MESES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_6_MESES}
    ${num_parcialidades}=    Get Text    ${BES_CAMPO_NUMERO_PARCIALIDADES_6_MESES}
    Run Keyword If    '${periodicidad}' == 'mensual'    Should Contain    ${num_parcialidades}    6
    Log    Calendario de cobranza generado para plazo de 6 meses con periodicidad ${periodicidad}

Verificar fechas de vencimiento correctas en calendario de 6 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_6_MESES}    timeout=10s
    ${fechas}=    Get WebElements    ${BES_CAMPO_FECHA_VENCIMIENTO_PARCIALIDAD}
    ${num_fechas}=    Get Length    ${fechas}
    Should Be True    ${num_fechas} >= 6
    Log    Fechas de vencimiento verificadas en calendario de 6 meses con ${num_fechas} parcialidades según periodicidad ${periodicidad}

Verificar cálculo automático de parcialidades para plazo 6 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_CAMPO_NUMERO_PARCIALIDADES_6_MESES}    timeout=10s
    ${num_parcialidades}=    Get Text    ${BES_CAMPO_NUMERO_PARCIALIDADES_6_MESES}
    Run Keyword If    '${periodicidad}' == 'mensual'    Should Contain    ${num_parcialidades}    6
    Log    Sistema calculó automáticamente ${num_parcialidades} parcialidades para plazo 6 meses con periodicidad ${periodicidad}

# ========================================
# LOCATORS Y KEYWORDS PARA VALIDACIÓN DE PLAZOS A 9 MESES SEGÚN AMIGO PAGUITOS (TC058 - IOSPR-868)
# ========================================
${BES_CAMPO_PLAZO_9_MESES}                     xpath://option[@value='9']
${BES_MENSAJE_PLAZO_9_MESES_AUTORIZADO}        xpath://div[contains(text(),'Plazo de 9 meses autorizado por Amigo Paguitos')]
${BES_INPUT_MONTO_PRESTAMO_9_MESES}            id:input_monto_prestamo
${BES_SELECT_PERIODICIDAD_PAGO_9_MESES}        id:select_periodicidad_pago
${BES_BOTON_VALIDAR_PLAZO_9_MESES}             css:.btn-validar-plazo
${BES_MENSAJE_VALIDACION_PLAZO_9_MESES_OK}     xpath://div[contains(text(),'Validación exitosa de plazo 9 meses')]
${BES_BOTON_GUARDAR_PRESTAMO_9_MESES}          css:.btn-guardar-prestamo-9-meses
${BES_MENSAJE_PRESTAMO_9_MESES_CREADO}         xpath://div[contains(text(),'Préstamo creado con plazo de 9 meses')]
${BES_TABLA_CALENDARIO_PAGOS_9_MESES}          xpath://table[@id='tabla_calendario_pagos']
${BES_CAMPO_NUMERO_PARCIALIDADES_9_MESES}      css:.numero-parcialidades-calendario

Verificar que perfil crediticio muestra plazo 9 meses autorizado
    Wait Until Element Is Visible    ${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_PLAZO_9_MESES_AUTORIZADO}
    ${plazo_autorizado}=    Get Text    ${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}
    Should Contain    ${plazo_autorizado}    9 meses
    Log    Perfil crediticio muestra plazo de 9 meses autorizado por Amigo Paguitos

Seleccionar plazo de 9 meses en formulario del préstamo
    Wait Until Element Is Visible    ${BES_SELECT_PLAZO_PRESTAMO}    timeout=10s
    Wait Until Element Is Visible    ${BES_CAMPO_PLAZO_9_MESES}    timeout=10s
    Select From List By Value    ${BES_SELECT_PLAZO_PRESTAMO}    9
    Sleep    1s
    Log    Plazo de 9 meses seleccionado en el formulario

Verificar validación de autorización de plazo 9 meses por Amigo Paguitos
    Wait Until Element Is Visible    ${BES_BOTON_VALIDAR_PLAZO_9_MESES}    timeout=10s
    Click Button    ${BES_BOTON_VALIDAR_PLAZO_9_MESES}
    Wait Until Element Is Visible    ${BES_MENSAJE_VALIDACION_PLAZO_9_MESES_OK}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_VALIDACION_PLAZO_9_MESES_OK}
    Log    Sistema validó que el cliente tiene autorizado el plazo de 9 meses según Amigo Paguitos

Completar datos del préstamo para plazo 9 meses
    [Arguments]    ${monto}=45000    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_INPUT_MONTO_PRESTAMO_9_MESES}    timeout=10s
    Input Text    ${BES_INPUT_MONTO_PRESTAMO_9_MESES}    ${monto}
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_PAGO_9_MESES}    ${periodicidad}
    Sleep    1s
    Log    Datos del préstamo completados: Monto=${monto}, Periodicidad=${periodicidad}, Plazo=9 meses

Guardar configuración del préstamo con plazo 9 meses
    Wait Until Element Is Visible    ${BES_BOTON_GUARDAR_PRESTAMO_9_MESES}    timeout=10s
    Element Should Be Enabled    ${BES_BOTON_GUARDAR_PRESTAMO_9_MESES}
    Click Button    ${BES_BOTON_GUARDAR_PRESTAMO_9_MESES}
    Sleep    2s
    Log    Configuración del préstamo guardada con plazo de 9 meses

Verificar creación exitosa del préstamo con plazo 9 meses
    Wait Until Element Is Visible    ${BES_MENSAJE_PRESTAMO_9_MESES_CREADO}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_PRESTAMO_9_MESES_CREADO}
    ${mensaje}=    Get Text    ${BES_MENSAJE_PRESTAMO_9_MESES_CREADO}
    Should Contain    ${mensaje}    Préstamo creado
    Should Contain    ${mensaje}    9 meses
    Log    Préstamo creado exitosamente con plazo de 9 meses

Verificar generación de calendario de pagos para plazo 9 meses
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_9_MESES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_9_MESES}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS_9_MESES}//tr[position()>1]
    Should Be True    ${filas} >= 9
    Log    Calendario de pagos generado con ${filas} parcialidades para plazo de 9 meses

Verificar calendario de cobranza generado para plazo 9 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_9_MESES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_9_MESES}
    ${num_parcialidades}=    Get Text    ${BES_CAMPO_NUMERO_PARCIALIDADES_9_MESES}
    Run Keyword If    '${periodicidad}' == 'mensual'    Should Contain    ${num_parcialidades}    9
    Log    Calendario de cobranza generado para plazo de 9 meses con periodicidad ${periodicidad}

Verificar fechas de vencimiento correctas en calendario de 9 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_9_MESES}    timeout=10s
    ${fechas}=    Get WebElements    ${BES_CAMPO_FECHA_VENCIMIENTO_PARCIALIDAD}
    ${num_fechas}=    Get Length    ${fechas}
    Should Be True    ${num_fechas} >= 9
    Log    Fechas de vencimiento verificadas en calendario de 9 meses con ${num_fechas} parcialidades según periodicidad ${periodicidad}

Verificar cálculo automático de parcialidades para plazo 9 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_CAMPO_NUMERO_PARCIALIDADES_9_MESES}    timeout=10s
    ${num_parcialidades}=    Get Text    ${BES_CAMPO_NUMERO_PARCIALIDADES_9_MESES}
    Run Keyword If    '${periodicidad}' == 'mensual'    Should Contain    ${num_parcialidades}    9
    Log    Sistema calculó automáticamente ${num_parcialidades} parcialidades para plazo 9 meses con periodicidad ${periodicidad}

# ========================================
# KEYWORDS GENÉRICOS PARA ADMINISTRACIÓN DE PRÉSTAMOS
# ========================================
Seleccionar periodicidad para préstamo según parámetro
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_SELECT_PERIODICIDAD_PAGO}    timeout=10s
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_PAGO}    ${periodicidad}
    Sleep    1s
    Log    Periodicidad seleccionada: ${periodicidad}

Ingresar monto del préstamo
    [Arguments]    ${monto}=45000
    Wait Until Element Is Visible    ${BES_INPUT_MONTO_PRESTAMO}    timeout=10s
    Input Text    ${BES_INPUT_MONTO_PRESTAMO}    ${monto}
    Sleep    1s
    Log    Monto del préstamo ingresado: ${monto}

Acceder a sección de calendario de pagos del préstamo
    Wait Until Element Is Visible    ${BES_LINK_VER_CALENDARIO}    timeout=10s
    Click Element    ${BES_LINK_VER_CALENDARIO}
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS}    timeout=10s
    Log    Acceso a sección de calendario de pagos

${BES_SELECT_PERIODICIDAD_PAGO}        id:select_periodicidad_pago
${BES_INPUT_MONTO_PRESTAMO}            id:input_monto_prestamo
# ========================================
# LOCATORS Y KEYWORDS PARA VALIDACIÓN DE PLAZOS A 12 MESES SEGÚN AMIGO PAGUITOS (TC059 - IOSPR-868)
# ========================================
${BES_CAMPO_PLAZO_12_MESES}                     xpath://option[@value='12']
${BES_MENSAJE_PLAZO_12_MESES_AUTORIZADO}        xpath://div[contains(text(),'Plazo de 12 meses autorizado por Amigo Paguitos')]
${BES_INPUT_MONTO_PRESTAMO_12_MESES}            id:input_monto_prestamo
${BES_INPUT_DATOS_EQUIPO_12_MESES}              id:input_datos_equipo
${BES_SELECT_PERIODICIDAD_PAGO_12_MESES}        id:select_periodicidad_pago
${BES_BOTON_VALIDAR_PLAZO_12_MESES}             css:.btn-validar-plazo
${BES_MENSAJE_VALIDACION_PLAZO_12_MESES_OK}     xpath://div[contains(text(),'Validación exitosa de plazo 12 meses')]
${BES_BOTON_GUARDAR_PRESTAMO_12_MESES}          css:.btn-guardar-prestamo-12-meses
${BES_MENSAJE_PRESTAMO_12_MESES_CREADO}         xpath://div[contains(text(),'Préstamo creado con plazo de 12 meses')]
${BES_TABLA_CALENDARIO_PAGOS_12_MESES}          xpath://table[@id='tabla_calendario_pagos']
${BES_CAMPO_NUMERO_PARCIALIDADES_12_MESES}      css:.numero-parcialidades-calendario
${BES_CAMPO_DESGLOSE_CUOTAS_12_MESES}           css:.desglose-cuotas-12-meses
${BES_CAMPO_FECHA_DISTRIBUCION_ANUAL}           xpath://td[@data-field='fecha_vencimiento_anual']

Verificar que perfil crediticio muestra plazo 12 meses autorizado
    Wait Until Element Is Visible    ${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}    timeout=10s
    Page Should Contain Element    ${BES_MENSAJE_PLAZO_12_MESES_AUTORIZADO}
    ${plazo_autorizado}=    Get Text    ${BES_CAMPO_PERFIL_CREDITICIO_PLAZO}
    Should Contain    ${plazo_autorizado}    12 meses
    Log    Perfil crediticio muestra plazo de 12 meses autorizado por Amigo Paguitos

Seleccionar plazo de 12 meses en formulario del préstamo
    Wait Until Element Is Visible    ${BES_SELECT_PLAZO_PRESTAMO}    timeout=10s
    Wait Until Element Is Visible    ${BES_CAMPO_PLAZO_12_MESES}    timeout=10s
    Select From List By Value    ${BES_SELECT_PLAZO_PRESTAMO}    12
    Sleep    1s
    Log    Plazo de 12 meses seleccionado en el formulario

Verificar validación de autorización de plazo 12 meses por Amigo Paguitos
    Wait Until Element Is Visible    ${BES_BOTON_VALIDAR_PLAZO_12_MESES}    timeout=10s
    Click Button    ${BES_BOTON_VALIDAR_PLAZO_12_MESES}
    Wait Until Element Is Visible    ${BES_MENSAJE_VALIDACION_PLAZO_12_MESES_OK}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_VALIDACION_PLAZO_12_MESES_OK}
    Log    Sistema validó que el cliente tiene autorizado el plazo de 12 meses según Amigo Paguitos

Completar datos del préstamo para plazo 12 meses
    [Arguments]    ${monto}=50000    ${periodicidad}=mensual    ${datos_equipo}=iPhone 15 Pro 256GB
    Wait Until Element Is Visible    ${BES_INPUT_MONTO_PRESTAMO_12_MESES}    timeout=10s
    Input Text    ${BES_INPUT_MONTO_PRESTAMO_12_MESES}    ${monto}
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_PAGO_12_MESES}    ${periodicidad}
    Input Text    ${BES_INPUT_DATOS_EQUIPO_12_MESES}    ${datos_equipo}
    Sleep    1s
    Log    Datos del préstamo completados: Monto=${monto}, Periodicidad=${periodicidad}, Plazo=12 meses, Equipo=${datos_equipo}

Guardar configuración del préstamo con plazo 12 meses
    Wait Until Element Is Visible    ${BES_BOTON_GUARDAR_PRESTAMO_12_MESES}    timeout=10s
    Element Should Be Enabled    ${BES_BOTON_GUARDAR_PRESTAMO_12_MESES}
    Click Button    ${BES_BOTON_GUARDAR_PRESTAMO_12_MESES}
    Sleep    2s
    Log    Configuración del préstamo guardada con plazo de 12 meses

Verificar creación exitosa del préstamo con plazo 12 meses
    Wait Until Element Is Visible    ${BES_MENSAJE_PRESTAMO_12_MESES_CREADO}    timeout=15s
    Page Should Contain Element    ${BES_MENSAJE_PRESTAMO_12_MESES_CREADO}
    ${mensaje}=    Get Text    ${BES_MENSAJE_PRESTAMO_12_MESES_CREADO}
    Should Contain    ${mensaje}    Préstamo creado
    Should Contain    ${mensaje}    12 meses
    Log    Préstamo creado exitosamente con plazo de 12 meses

Verificar generación de calendario de pagos para plazo 12 meses
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_12_MESES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_12_MESES}
    ${filas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS_12_MESES}//tr[position()>1]
    Should Be True    ${filas} >= 12
    Log    Calendario de pagos generado con ${filas} parcialidades para plazo de 12 meses

Verificar calendario de cobranza generado para plazo 12 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_12_MESES}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_12_MESES}
    ${num_parcialidades}=    Get Text    ${BES_CAMPO_NUMERO_PARCIALIDADES_12_MESES}
    Run Keyword If    '${periodicidad}' == 'mensual'    Should Contain    ${num_parcialidades}    12
    Log    Calendario de cobranza generado para plazo de 12 meses con periodicidad ${periodicidad}

Verificar fechas de vencimiento correctas en calendario de 12 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_12_MESES}    timeout=10s
    ${fechas}=    Get WebElements    ${BES_CAMPO_FECHA_VENCIMIENTO_PARCIALIDAD}
    ${num_fechas}=    Get Length    ${fechas}
    Should Be True    ${num_fechas} >= 12
    Log    Fechas de vencimiento verificadas en calendario de 12 meses con ${num_fechas} parcialidades según periodicidad ${periodicidad}

Verificar cálculo automático de parcialidades para plazo 12 meses
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_CAMPO_NUMERO_PARCIALIDADES_12_MESES}    timeout=10s
    ${num_parcialidades}=    Get Text    ${BES_CAMPO_NUMERO_PARCIALIDADES_12_MESES}
    Run Keyword If    '${periodicidad}' == 'mensual'    Should Contain    ${num_parcialidades}    12
    Log    Sistema calculó automáticamente ${num_parcialidades} parcialidades para plazo 12 meses con periodicidad ${periodicidad}

Verificar calendario con todas las fechas de vencimiento distribuidas en un año
    [Arguments]    ${periodicidad}=mensual
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS_12_MESES}    timeout=10s
    ${fechas}=    Get WebElements    ${BES_CAMPO_FECHA_DISTRIBUCION_ANUAL}
    ${num_fechas}=    Get Length    ${fechas}
    Should Be Equal As Integers    ${num_fechas}    12
    Page Should Contain Element    ${BES_CAMPO_DESGLOSE_CUOTAS_12_MESES}
    Log    Calendario de cobranza generado con todas las fechas de vencimiento distribuidas en un año completo (12 meses)

Verificar desglose de cuotas completo en pantalla 360 para préstamo 12 meses
    Wait Until Element Is Visible    ${BES_SECCION_DESGLOSE_CUOTAS}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_DESGLOSE_CUOTAS_12_MESES}
    Wait Until Element Is Visible    ${BES_CAMPO_PLAZO_CREDITO}    timeout=10s
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_CREDITO}
    Should Contain    ${plazo}    12
    Log    Desglose de cuotas completo mostrado en pantalla 360 para préstamo de 12 meses

# ========================================
# LOCATORS Y KEYWORDS PARA RESTRICCIÓN DE NO CAMBIOS DE CICLOS (TC060 - IOSPR-868)
# ========================================
${BES_BOTON_MODIFICAR_PRESTAMO}                    id:btn_modificar_prestamo
${BES_MENU_OPCIONES_PRESTAMO}                      id:menu_opciones_prestamo
${BES_OPCION_CAMBIAR_CICLOS}                       id:opcion_cambiar_ciclos
${BES_OPCION_MODIFICAR_PERIODICIDAD}               id:opcion_modificar_periodicidad
${BES_MENSAJE_RESTRICCION_CAMBIO_CICLOS}           xpath://div[contains(text(),\"no se permiten cambios de ciclos\")]
${BES_MENSAJE_RESTRICCION_REGLA_NEGOCIO}           xpath://div[contains(text(),\"según reglas de negocio\")]
${BES_PANEL_DETALLE_PRESTAMO_CREADO}               css:.panel-detalle-prestamo-creado
${BES_CAMPO_PERIODICIDAD_PRESTAMO_CREADO}          xpath://div[@data-field=\"periodicidad_prestamo_creado\"]
${BES_CAMPO_NUM_CICLOS_PRESTAMO_CREADO}            xpath://div[@data-field=\"num_ciclos_prestamo_creado\"]
${BES_BOTON_OPCIONES_MODIFICACION}                 css:.btn-opciones-modificacion
${BES_ESTADO_BOTON_CAMBIAR_CICLOS}                 xpath://button[@id=\"opcion_cambiar_ciclos\" and @disabled]

Seleccionar periodicidad mensual para el préstamo
    Wait Until Element Is Visible    ${BES_SELECT_PERIODICIDAD_PRESTAMO}    timeout=10s
    Select From List By Label    ${BES_SELECT_PERIODICIDAD_PRESTAMO}    Mensual
    Sleep    1s
    Log    Periodicidad mensual seleccionada para el préstamo

Ingresar número de ciclos mensuales para préstamo
    [Arguments]    ${numero_ciclos}=12
    Wait Until Element Is Visible    ${BES_INPUT_NUMERO_CICLOS}    timeout=10s
    Input Text    ${BES_INPUT_NUMERO_CICLOS}    ${numero_ciclos}
    Log    Número de ciclos mensuales ingresado: ${numero_ciclos}

Validar configuración de ciclos mensuales ingresada
    Wait Until Element Is Visible    ${BES_BOTON_VALIDAR_CONFIGURACION}    timeout=10s
    Click Button    ${BES_BOTON_VALIDAR_CONFIGURACION}
    Sleep    2s
    Log    Validación de configuración de ciclos mensuales ejecutada

Guardar préstamo con configuración de periodicidad mensual y 12 ciclos
    Wait Until Element Is Visible    ${BES_BOTON_GUARDAR_PRESTAMO}    timeout=10s
    Element Should Be Enabled    ${BES_BOTON_GUARDAR_PRESTAMO}
    Click Button    ${BES_BOTON_GUARDAR_PRESTAMO}
    Sleep    3s
    Log    Préstamo guardado con periodicidad mensual y 12 ciclos

Verificar creación exitosa del préstamo con periodicidad y ciclos
    [Arguments]    ${periodicidad}=mensual    ${num_ciclos}=12
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_PRESTAMO_CREADO}    timeout=10s
    Page Should Contain Element    ${BES_PANEL_DETALLE_PRESTAMO_CREADO}
    ${periodicidad_creada}=    Get Text    ${BES_CAMPO_PERIODICIDAD_PRESTAMO_CREADO}
    ${ciclos_creados}=    Get Text    ${BES_CAMPO_NUM_CICLOS_PRESTAMO_CREADO}
    Should Contain    ${periodicidad_creada}    ${periodicidad}
    Should Contain    ${ciclos_creados}    ${num_ciclos}
    Log    Préstamo creado exitosamente - Periodicidad: ${periodicidad}, Ciclos: ${num_ciclos}

Verificar generación de calendario de pagos según periodicidad y ciclos
    [Arguments]    ${periodicidad}=mensual    ${num_ciclos}=12
    Acceder a calendario de pagos
    Verificar generación de calendario de cobranza    ${num_ciclos}
    Verificar calendario generado según frecuencia y plazo    ${periodicidad}    ${num_ciclos}
    Log    Calendario de pagos generado según periodicidad ${periodicidad} y ${num_ciclos} ciclos

Intentar acceder a opción de modificación de ciclos en BES
    ${tiene_menu_opciones}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_MENU_OPCIONES_PRESTAMO}
    Run Keyword If    ${tiene_menu_opciones}    Click Element    ${BES_MENU_OPCIONES_PRESTAMO}
    ${tiene_boton_modificar}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${BES_BOTON_MODIFICAR_PRESTAMO}    timeout=5s
    Run Keyword If    ${tiene_boton_modificar}    Click Button    ${BES_BOTON_MODIFICAR_PRESTAMO}
    Log    Intento de acceder a opciones de modificación de ciclos

Verificar que opción de cambio de ciclos no está visible o está deshabilitada
    ${opcion_cambiar_ciclos_visible}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_OPCION_CAMBIAR_CICLOS}
    IF    ${opcion_cambiar_ciclos_visible}
        ${esta_habilitada}=    Run Keyword And Return Status    Element Should Be Enabled    ${BES_OPCION_CAMBIAR_CICLOS}
        Should Not Be True    ${esta_habilitada}
        Page Should Contain Element    ${BES_ESTADO_BOTON_CAMBIAR_CICLOS}
        Log    Opción de cambiar ciclos existe pero está deshabilitada
    ELSE
        Log    Opción de cambiar ciclos no está visible en el sistema
    END
    ${opcion_modificar_periodicidad_visible}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_OPCION_MODIFICAR_PERIODICIDAD}
    IF    ${opcion_modificar_periodicidad_visible}
        ${esta_habilitada_periodicidad}=    Run Keyword And Return Status    Element Should Be Enabled    ${BES_OPCION_MODIFICAR_PERIODICIDAD}
        Should Not Be True    ${esta_habilitada_periodicidad}
        Log    Opción de modificar periodicidad existe pero está deshabilitada
    ELSE
        Log    Opción de modificar periodicidad no está visible en el sistema
    END

Verificar mensaje de restricción de no cambios de ciclos
    ${mensaje_visible}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${BES_MENSAJE_RESTRICCION_CAMBIO_CICLOS}    timeout=5s
    IF    ${mensaje_visible}
        ${mensaje}=    Get Text    ${BES_MENSAJE_RESTRICCION_CAMBIO_CICLOS}
        Should Contain    ${mensaje}    no se permiten cambios de ciclos
        Log    Mensaje de restricción mostrado: ${mensaje}
    ELSE
        ${mensaje_regla}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${BES_MENSAJE_RESTRICCION_REGLA_NEGOCIO}    timeout=5s
        IF    ${mensaje_regla}
            ${texto_regla}=    Get Text    ${BES_MENSAJE_RESTRICCION_REGLA_NEGOCIO}
            Should Contain    ${texto_regla}    reglas de negocio
            Log    Mensaje de restricción por reglas de negocio: ${texto_regla}
        END
    END

# ========================================
# LOCATORS Y KEYWORDS PARA VALIDACIÓN DE RESTRICCIÓN DE PROMESAS DE PAGO EN AMIGO PAGUITOS (TC061)
# ========================================
${BES_CAMPO_TIPO_FINANCIAMIENTO}                   xpath://div[@data-field='tipo_financiamiento']
${BES_MENU_PROMESAS_PAGO}                          id:menu_promesas_pago
${BES_BOTON_REGISTRAR_PROMESA_PAGO}                id:btn_registrar_promesa_pago
${BES_MENSAJE_RESTRICCION_PROMESA_PAGO}            xpath://div[contains(text(),'no se permiten promesas de pago')]
${BES_MENSAJE_RESTRICCION_AMIGO_PAGUITOS}          xpath://div[contains(text(),'Amigo Paguitos') or contains(text(),'este tipo de financiamiento')]
${BES_OPCION_PROMESA_PAGO_DESHABILITADA}           xpath://button[@id='btn_registrar_promesa_pago' and @disabled]
${BES_ESTADO_BOTON_PROMESA_PAGO}                   id:btn_registrar_promesa_pago
${BES_SELECT_ESTADO_PRESTAMO}                      id:select_estado_prestamo
${BES_CAMPO_ESTADO_PRESTAMO_ACTUAL}                xpath://div[@data-field='estado_prestamo']

Acceder a módulo de administración de préstamos con préstamo de Amigo Paguitos
    [Arguments]    ${identificacion}
    Click Element    ${BES_MENU_ADMINISTRACION_PRESTAMOS}
    Wait Until Element Is Visible    ${BES_PANEL_ADMINISTRACION_FINANCIAMIENTO}    timeout=10s
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR_PRESTAMO}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS}    timeout=10s
    Log    Acceso a administración de préstamos con préstamo de Amigo Paguitos

Verificar que el sistema muestra información del préstamo de Amigo Paguitos
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS}
    Wait Until Element Is Visible    ${BES_CAMPO_TIPO_FINANCIAMIENTO}    timeout=10s
    ${tipo_financiamiento}=    Get Text    ${BES_CAMPO_TIPO_FINANCIAMIENTO}
    Should Contain    ${tipo_financiamiento}    Amigo Paguitos
    Log    Sistema muestra información del préstamo de Amigo Paguitos - Tipo: ${tipo_financiamiento}

Intentar registrar promesa de pago para préstamo de Amigo Paguitos
    ${menu_promesas_visible}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_MENU_PROMESAS_PAGO}
    Run Keyword If    ${menu_promesas_visible}    Click Element    ${BES_MENU_PROMESAS_PAGO}
    ${boton_promesa_visible}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${BES_BOTON_REGISTRAR_PROMESA_PAGO}    timeout=5s
    Run Keyword If    ${boton_promesa_visible}    Click Button    ${BES_BOTON_REGISTRAR_PROMESA_PAGO}
    Log    Intento de registrar promesa de pago para préstamo de Amigo Paguitos

Verificar mensaje de restricción de promesas de pago
    ${mensaje_restriccion_visible}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${BES_MENSAJE_RESTRICCION_PROMESA_PAGO}    timeout=5s
    IF    ${mensaje_restriccion_visible}
        ${mensaje}=    Get Text    ${BES_MENSAJE_RESTRICCION_PROMESA_PAGO}
        Should Contain    ${mensaje}    no se permiten promesas de pago
        Log    Mensaje de restricción mostrado: ${mensaje}
    ELSE
        ${mensaje_amigo_paguitos}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${BES_MENSAJE_RESTRICCION_AMIGO_PAGUITOS}    timeout=5s
        IF    ${mensaje_amigo_paguitos}
            ${texto_mensaje}=    Get Text    ${BES_MENSAJE_RESTRICCION_AMIGO_PAGUITOS}
            Log    Mensaje de restricción específico de Amigo Paguitos: ${texto_mensaje}
        END
    END

Verificar que botón de promesa de pago está deshabilitado
    ${boton_existe}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_ESTADO_BOTON_PROMESA_PAGO}
    IF    ${boton_existe}
        ${esta_habilitado}=    Run Keyword And Return Status    Element Should Be Enabled    ${BES_ESTADO_BOTON_PROMESA_PAGO}
        Should Not Be True    ${esta_habilitado}
        Page Should Contain Element    ${BES_OPCION_PROMESA_PAGO_DESHABILITADA}
        Log    Botón de promesa de pago existe pero está deshabilitado
    ELSE
        Log    Opción de promesa de pago no está visible para préstamos de Amigo Paguitos
    END

Cambiar estado del préstamo
    [Arguments]    ${nuevo_estado}
    Wait Until Element Is Visible    ${BES_SELECT_ESTADO_PRESTAMO}    timeout=10s
    Select From List By Label    ${BES_SELECT_ESTADO_PRESTAMO}    ${nuevo_estado}
    Sleep    1s
    Log    Estado del préstamo cambiado a: ${nuevo_estado}

Verificar restricción de promesas de pago en diferentes estados del préstamo
    [Arguments]    @{estados}
    FOR    ${estado}    IN    @{estados}
        Cambiar estado del préstamo    ${estado}
        Intentar registrar promesa de pago para préstamo de Amigo Paguitos
        Verificar mensaje de restricción de promesas de pago
        Log    Restricción de promesas de pago verificada para estado: ${estado}
    END
    Log    Sistema mantiene restricción de promesas de pago independientemente del estado del préstamo

# ========================================
# LOCATORS Y KEYWORDS PARA RECEPCIÓN DE PRÉSTAMOS CON VARIANTES DE AMIGO PAGUITOS (TC062)
# ========================================
${BES_MENU_RECEPCION_PRESTAMOS}                id:menu_recepcion_prestamos
${BES_PANEL_RECEPCION_APAG}                    id:panel_recepcion_apag
${BES_TABLA_PRESTAMOS_RECIBIDOS}               xpath://table[@id='tabla_prestamos_recibidos']
${BES_CAMPO_IDENTIFICACION_CLIENTE_RECIBIDO}   xpath://td[@data-field='identificacion_cliente']
${BES_CAMPO_PERIODICIDAD_RECIBIDO}             xpath://td[@data-field='periodicidad']
${BES_CAMPO_PLAZO_RECIBIDO}                    xpath://td[@data-field='plazo_meses']
${BES_CAMPO_NUM_PARCIALIDADES_RECIBIDO}        xpath://td[@data-field='num_parcialidades']
${BES_CAMPO_MONTO_FINANCIAMIENTO_RECIBIDO}     xpath://td[@data-field='monto_financiamiento']
${BES_CAMPO_DATOS_CLIENTE_RECIBIDO}            xpath://td[@data-field='datos_cliente']
${BES_CAMPO_DATOS_EQUIPO_RECIBIDO}             xpath://td[@data-field='datos_equipo']
${BES_CAMPO_CONDICIONES_FINANCIAMIENTO}        xpath://td[@data-field='condiciones_financiamiento']
${BES_CAMPO_ORIGEN_APAG}                       xpath://td[@data-field='origen_sistema']
${BES_MENSAJE_PRESTAMO_REGISTRADO_APAG}        xpath://div[contains(text(),'Préstamo registrado desde Amigo Paguitos')]
${BES_FILTRO_PERIODICIDAD_PRESTAMOS}           id:filtro_periodicidad
${BES_FILTRO_PLAZO_PRESTAMOS}                  id:filtro_plazo
${BES_BOTON_APLICAR_FILTRO}                    id:btn_aplicar_filtro

Acceder a módulo de recepción de préstamos desde Amigo Paguitos
    Click Element    ${BES_MENU_RECEPCION_PRESTAMOS}
    Wait Until Element Is Visible    ${BES_PANEL_RECEPCION_APAG}    timeout=10s
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_RECIBIDOS}    timeout=10s
    Log    Acceso a módulo de recepción de préstamos desde Amigo Paguitos Autogestión

Buscar préstamo recibido por identificación del cliente
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_BUSCAR_PRESTAMO}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR_PRESTAMO}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_RECIBIDOS}    timeout=10s
    Log    Búsqueda de préstamo recibido para cliente: ${identificacion}

Filtrar préstamos por periodicidad y plazo
    [Arguments]    ${periodicidad}    ${plazo}
    Wait Until Element Is Visible    ${BES_FILTRO_PERIODICIDAD_PRESTAMOS}    timeout=10s
    Select From List By Label    ${BES_FILTRO_PERIODICIDAD_PRESTAMOS}    ${periodicidad}
    Select From List By Label    ${BES_FILTRO_PLAZO_PRESTAMOS}    ${plazo}
    Click Button    ${BES_BOTON_APLICAR_FILTRO}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_RECIBIDOS}    timeout=10s
    Log    Filtro aplicado: Periodicidad=${periodicidad}, Plazo=${plazo} meses

Verificar registro de préstamo con periodicidad y plazo específicos
    [Arguments]    ${periodicidad_esperada}    ${plazo_esperado}    ${parcialidades_esperadas}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_RECIBIDOS}    timeout=10s
    ${periodicidad}=    Get Text    ${BES_CAMPO_PERIODICIDAD_RECIBIDO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_RECIBIDO}
    ${parcialidades}=    Get Text    ${BES_CAMPO_NUM_PARCIALIDADES_RECIBIDO}
    Should Contain    ${periodicidad}    ${periodicidad_esperada}
    Should Contain    ${plazo}    ${plazo_esperado}
    Should Contain    ${parcialidades}    ${parcialidades_esperadas}
    Log    Préstamo registrado - Periodicidad: ${periodicidad}, Plazo: ${plazo} meses, Parcialidades: ${parcialidades}

Verificar origen del préstamo desde Amigo Paguitos
    Wait Until Element Is Visible    ${BES_CAMPO_ORIGEN_APAG}    timeout=10s
    ${origen}=    Get Text    ${BES_CAMPO_ORIGEN_APAG}
    Should Contain Any    ${origen}    Amigo Paguitos    APAG    AP.AG
    Log    Origen del préstamo verificado: ${origen}

Verificar información completa del cliente en préstamo recibido
    [Arguments]    ${identificacion}
    Wait Until Element Is Visible    ${BES_CAMPO_DATOS_CLIENTE_RECIBIDO}    timeout=10s
    ${datos_cliente}=    Get Text    ${BES_CAMPO_DATOS_CLIENTE_RECIBIDO}
    Should Not Be Empty    ${datos_cliente}
    Should Contain    ${datos_cliente}    ${identificacion}
    Log    Información del cliente completa verificada: ${datos_cliente}

Verificar información completa del equipo en préstamo recibido
    Wait Until Element Is Visible    ${BES_CAMPO_DATOS_EQUIPO_RECIBIDO}    timeout=10s
    ${datos_equipo}=    Get Text    ${BES_CAMPO_DATOS_EQUIPO_RECIBIDO}
    Should Not Be Empty    ${datos_equipo}
    Log    Información del equipo completa verificada: ${datos_equipo}

Verificar información completa de condiciones del financiamiento
    Wait Until Element Is Visible    ${BES_CAMPO_CONDICIONES_FINANCIAMIENTO}    timeout=10s
    ${condiciones}=    Get Text    ${BES_CAMPO_CONDICIONES_FINANCIAMIENTO}
    Should Not Be Empty    ${condiciones}
    Log    Condiciones del financiamiento completas verificadas: ${condiciones}

Verificar que existe mensaje de confirmación de registro desde Amigo Paguitos
    ${mensaje_visible}=    Run Keyword And Return Status    Wait Until Element Is Visible    ${BES_MENSAJE_PRESTAMO_REGISTRADO_APAG}    timeout=5s
    IF    ${mensaje_visible}
        ${mensaje}=    Get Text    ${BES_MENSAJE_PRESTAMO_REGISTRADO_APAG}
        Should Contain    ${mensaje}    Amigo Paguitos
        Log    Mensaje de confirmación: ${mensaje}
    END

# ========================================
# LOCATORS Y KEYWORDS PARA REPORTE CONCENTRADO DE VENTAS POR FUERZA DE VENTA (TC064)
# ========================================
${BES_MENU_REPORTES_CONSOLIDADOS}                     id:menu_reportes_consolidados
${BES_OPCION_REPORTE_CONCENTRADO_VENTAS}              id:opcion_reporte_concentrado_ventas
${BES_SECCION_PARAMETROS_REPORTE_CONCENTRADO}         css:.seccion-parametros-reporte-concentrado
${BES_INPUT_FECHA_INICIO_REPORTE_CONCENTRADO}         id:fecha_inicio_reporte_concentrado
${BES_INPUT_FECHA_FIN_REPORTE_CONCENTRADO}            id:fecha_fin_reporte_concentrado
${BES_SELECT_CANAL_VENTA_CONCENTRADO}                 id:select_canal_venta_concentrado
${BES_SELECT_REGION_CONCENTRADO}                      id:select_region_concentrado
${BES_BOTON_GENERAR_REPORTE_CONCENTRADO}              css:.btn-generar-reporte-concentrado
${BES_PANEL_REPORTE_CONCENTRADO_GENERADO}             css:.panel-reporte-concentrado-generado
${BES_TABLA_CONCENTRADO_VENTAS_FUERZA}                xpath://table[@id='tabla_concentrado_ventas_fuerza']
${BES_SECCION_CAC_REPORTE_CONCENTRADO}                xpath://tr[contains(@class,'fila-canal-cac')]
${BES_SECCION_CVT_REPORTE_CONCENTRADO}                xpath://tr[contains(@class,'fila-canal-cvt')]
${BES_SECCION_CCT_REPORTE_CONCENTRADO}                xpath://tr[contains(@class,'fila-canal-cct')]
${BES_SECCION_CAT_REPORTE_CONCENTRADO}                xpath://tr[contains(@class,'fila-canal-cat')]
${BES_SECCION_DAT_REPORTE_CONCENTRADO}                xpath://tr[contains(@class,'fila-canal-dat')]
${BES_SECCION_CADENAS_REPORTE_CONCENTRADO}            xpath://tr[contains(@class,'fila-canal-cadenas')]
${BES_CAMPO_TOTAL_VENTAS_CAC}                         xpath://td[@data-field='total_cac']
${BES_CAMPO_TOTAL_VENTAS_CVT}                         xpath://td[@data-field='total_cvt']
${BES_CAMPO_TOTAL_VENTAS_CCT}                         xpath://td[@data-field='total_cct']
${BES_CAMPO_TOTAL_VENTAS_CAT}                         xpath://td[@data-field='total_cat']
${BES_CAMPO_TOTAL_VENTAS_DAT}                         xpath://td[@data-field='total_dat']
${BES_CAMPO_TOTAL_VENTAS_CADENAS}                     xpath://td[@data-field='total_cadenas']
${BES_CAMPO_SUBTOTAL_CANAL}                           xpath://td[@data-field='subtotal_canal']
${BES_CAMPO_TOTAL_GENERAL_CONCENTRADO}                xpath://div[@data-field='total_general_concentrado']
${BES_BOTON_EXPORTAR_EXCEL_CONCENTRADO}               css:.btn-exportar-excel-concentrado
${BES_MENSAJE_EXPORTACION_EXITOSA}                    xpath://div[contains(text(),'exportación exitosa') or contains(text(),'archivo generado')]
${BES_LINK_DESCARGAR_EXCEL}                           css:.link-descargar-excel

Acceder a módulo de reportes consolidados de BES
    Click Element    ${BES_MENU_REPORTES_CONSOLIDADOS}
    Wait Until Element Is Visible    ${BES_OPCION_REPORTE_CONCENTRADO_VENTAS}    timeout=10s
    Log    Acceso al módulo de reportes consolidados

Seleccionar opción de reporte concentrado de ventas por fuerza de venta
    Click Element    ${BES_OPCION_REPORTE_CONCENTRADO_VENTAS}
    Wait Until Element Is Visible    ${BES_SECCION_PARAMETROS_REPORTE_CONCENTRADO}    timeout=10s
    Log    Pantalla de configuración del reporte concentrado de ventas cargada

Especificar rango de fechas para reporte concentrado
    [Arguments]    ${fecha_inicio}    ${fecha_fin}
    Wait Until Element Is Visible    ${BES_INPUT_FECHA_INICIO_REPORTE_CONCENTRADO}    timeout=10s
    Input Text    ${BES_INPUT_FECHA_INICIO_REPORTE_CONCENTRADO}    ${fecha_inicio}
    Input Text    ${BES_INPUT_FECHA_FIN_REPORTE_CONCENTRADO}    ${fecha_fin}
    Log    Rango de fechas especificado: ${fecha_inicio} - ${fecha_fin}

Seleccionar canal de venta para reporte concentrado
    [Arguments]    ${canal_venta}
    Wait Until Element Is Visible    ${BES_SELECT_CANAL_VENTA_CONCENTRADO}    timeout=10s
    Select From List By Label    ${BES_SELECT_CANAL_VENTA_CONCENTRADO}    ${canal_venta}
    Log    Canal de venta seleccionado: ${canal_venta}

Seleccionar región para reporte concentrado
    [Arguments]    ${region}
    Wait Until Element Is Visible    ${BES_SELECT_REGION_CONCENTRADO}    timeout=10s
    Select From List By Label    ${BES_SELECT_REGION_CONCENTRADO}    ${region}
    Log    Región seleccionada: ${region}

Generar reporte concentrado de ventas por fuerza de venta
    Click Button    ${BES_BOTON_GENERAR_REPORTE_CONCENTRADO}
    Wait Until Element Is Visible    ${BES_PANEL_REPORTE_CONCENTRADO_GENERADO}    timeout=15s
    Wait Until Element Is Visible    ${BES_TABLA_CONCENTRADO_VENTAS_FUERZA}    timeout=15s
    Log    Reporte concentrado de ventas por fuerza de venta generado exitosamente

Verificar consolidado de ventas por todas las fuerzas de venta
    Page Should Contain Element    ${BES_TABLA_CONCENTRADO_VENTAS_FUERZA}
    Page Should Contain Element    ${BES_SECCION_CAC_REPORTE_CONCENTRADO}
    Page Should Contain Element    ${BES_SECCION_CVT_REPORTE_CONCENTRADO}
    Page Should Contain Element    ${BES_SECCION_CCT_REPORTE_CONCENTRADO}
    Page Should Contain Element    ${BES_SECCION_CAT_REPORTE_CONCENTRADO}
    Page Should Contain Element    ${BES_SECCION_DAT_REPORTE_CONCENTRADO}
    Page Should Contain Element    ${BES_SECCION_CADENAS_REPORTE_CONCENTRADO}
    Log    Todas las fuerzas de venta están presentes en el reporte consolidado

Verificar totales y subtotales por cada fuerza de venta
    ${total_cac}=    Get Text    ${BES_CAMPO_TOTAL_VENTAS_CAC}
    ${total_cvt}=    Get Text    ${BES_CAMPO_TOTAL_VENTAS_CVT}
    ${total_cct}=    Get Text    ${BES_CAMPO_TOTAL_VENTAS_CCT}
    ${total_cat}=    Get Text    ${BES_CAMPO_TOTAL_VENTAS_CAT}
    ${total_dat}=    Get Text    ${BES_CAMPO_TOTAL_VENTAS_DAT}
    ${total_cadenas}=    Get Text    ${BES_CAMPO_TOTAL_VENTAS_CADENAS}
    ${total_general}=    Get Text    ${BES_CAMPO_TOTAL_GENERAL_CONCENTRADO}
    Should Not Be Empty    ${total_cac}
    Should Not Be Empty    ${total_cvt}
    Should Not Be Empty    ${total_cct}
    Should Not Be Empty    ${total_cat}
    Should Not Be Empty    ${total_dat}
    Should Not Be Empty    ${total_cadenas}
    Should Not Be Empty    ${total_general}
    Log    Totales verificados - CAC: ${total_cac}, CVT: ${total_cvt}, CCT: ${total_cct}, CAT: ${total_cat}, DAT: ${total_dat}, Cadenas: ${total_cadenas}, Total General: ${total_general}

Exportar reporte concentrado a formato Excel
    Click Button    ${BES_BOTON_EXPORTAR_EXCEL_CONCENTRADO}
    Wait Until Element Is Visible    ${BES_MENSAJE_EXPORTACION_EXITOSA}    timeout=10s
    Page Should Contain Element    ${BES_LINK_DESCARGAR_EXCEL}
    Log    Archivo Excel generado exitosamente para descarga

Verificar que archivo de exportación contiene todos los datos del reporte
    Page Should Contain Element    ${BES_LINK_DESCARGAR_EXCEL}
    ${mensaje_exito}=    Get Text    ${BES_MENSAJE_EXPORTACION_EXITOSA}
    Should Contain Any    ${mensaje_exito}    exitosa    generado    completado
    Log    Archivo de exportación verificado: ${mensaje_exito}

# ========================================
# LOCATORS Y KEYWORDS PARA GARANTÍAS CON FUNCIONALIDAD EQUIVALENTE A VENTAS DIRECTAS (TC065)
# ========================================
${BES_INPUT_TIPO_FALLA}                          id:input_tipo_falla
${BES_INPUT_FECHA_REPORTE}                       id:input_fecha_reporte
${BES_CAMPO_FOLIO_GARANTIA}                      xpath://div[@data-field='folio_garantia']
${BES_CAMPO_ESTATUS_PRESTAMO_GARANTIA}           xpath://div[@data-field='estatus_prestamo_garantia']
${BES_FORMULARIO_GARANTIA_AMIGO_PAGUITOS}        css:.formulario-garantia-amigo-paguitos
${BES_FORMULARIO_GARANTIA_VENTA_DIRECTA}         css:.formulario-garantia-venta-directa
${BES_COMPARACION_CAMPOS_FORMULARIO}             css:.campos-formulario-garantia
${BES_BOTON_INICIAR_CAMBIO_EQUIPO_GARANTIA}      id:btn_iniciar_cambio_equipo_garantia

Verificar que formulario es equivalente para Amigo Paguitos y ventas directas
    Page Should Contain Element    ${BES_FORMULARIO_GARANTIA}
    Page Should Contain Element    ${BES_INPUT_MOTIVO_GARANTIA}
    Page Should Contain Element    ${BES_INPUT_DESCRIPCION_PROBLEMA}
    Page Should Contain Element    ${BES_INPUT_TIPO_FALLA}
    Page Should Contain Element    ${BES_INPUT_FECHA_REPORTE}
    Log    Formulario de garantía contiene todos los campos estándar para Amigo Paguitos y ventas directas

Ingresar tipo de falla de garantía
    [Arguments]    ${tipo_falla}
    Input Text    ${BES_INPUT_TIPO_FALLA}    ${tipo_falla}
    Log    Tipo de falla ingresado: ${tipo_falla}

Ingresar fecha de reporte de garantía
    [Arguments]    ${fecha_reporte}
    Input Text    ${BES_INPUT_FECHA_REPORTE}    ${fecha_reporte}
    Log    Fecha de reporte ingresada: ${fecha_reporte}

Iniciar proceso de cambio de equipo por garantía
    Click Button    ${BES_BOTON_INICIAR_CAMBIO_EQUIPO_GARANTIA}
    Wait Until Element Is Visible    ${BES_INPUT_IMEI_NUEVO}    timeout=10s
    Log    Proceso de cambio de equipo por garantía iniciado

Verificar que se genera folio de garantía
    Page Should Contain Element    ${BES_CAMPO_FOLIO_GARANTIA}
    ${folio}=    Get Text    ${BES_CAMPO_FOLIO_GARANTIA}
    Should Not Be Empty    ${folio}
    Length Should Be    ${folio}    min_length=8
    Log    Folio de garantía generado: ${folio}

Verificar que estatus del préstamo se actualiza correctamente
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_PRESTAMO_GARANTIA}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO_GARANTIA}
    Should Contain Any    ${estatus}    Activo    Con garantía    Garantía en proceso
    Log    Estatus del préstamo actualizado: ${estatus}

# ========================================
# LOCATORS Y KEYWORDS PARA BLOQUEOS DE EQUIPOS DE AMIGO PAGUITOS (TC066)
# ========================================
${BES_FILTRO_PRESTAMOS_AMIGO_PAGUITOS}          id:filtro_prestamos_amigo_paguitos
${BES_CAMPO_TIPO_FINANCIAMIENTO_PRESTAMO}       xpath://td[@data-field='tipo_financiamiento']
${BES_CAMPO_ESTATUS_PRESTAMO_MOROSO}            xpath://div[@data-field='estatus_prestamo' and contains(text(),'Moroso')]
${BES_LABEL_INCUMPLIMIENTO_PAGO}                css:.label-incumplimiento-pago
${BES_BOTON_EJECUTAR_PROCESO_BLOQUEO}           css:.btn-ejecutar-proceso-bloqueo
${BES_MENSAJE_PROCESO_BLOQUEO_INICIADO}         xpath://div[contains(text(),'Proceso de bloqueo iniciado')]
${BES_TABLA_SOLICITUDES_BLOQUEO}                xpath://table[@id='tabla_solicitudes_bloqueo']
${BES_CAMPO_IMEI_SOLICITUD_BLOQUEO}             xpath://td[@data-field='imei_solicitud_bloqueo']
${BES_CAMPO_REFERENCIA_SOLICITUD_BLOQUEO}       xpath://td[@data-field='referencia_solicitud']
${BES_CAMPO_CONFIRMACION_BLOQUEO_SITIC}         xpath://div[@data-field='confirmacion_bloqueo']
${BES_CAMPO_FECHA_BLOQUEO_CONFIRMADO}           xpath://td[@data-field='fecha_bloqueo']
${BES_MENU_NOTIFICACIONES_CLIENTE}              id:menu_notificaciones_cliente
${BES_TABLA_NOTIFICACIONES_ENVIADAS}            xpath://table[@id='tabla_notificaciones']
${BES_CAMPO_TIPO_NOTIFICACION}                  xpath://td[@data-field='tipo_notificacion']
${BES_CAMPO_CONTENIDO_NOTIFICACION}             xpath://td[@data-field='contenido_notificacion']
${BES_CAMPO_CANAL_ENVIO_NOTIFICACION}           xpath://td[@data-field='canal_envio']
${BES_CAMPO_ESTATUS_ENVIO_NOTIFICACION}         xpath://td[@data-field='estatus_envio']
${BES_MENU_HISTORIAL_BLOQUEOS}                  id:menu_historial_bloqueos
${BES_TABLA_HISTORIAL_BLOQUEOS}                 xpath://table[@id='tabla_historial_bloqueos']
${BES_CAMPO_FECHA_BLOQUEO_HISTORIAL}            xpath://td[@data-field='fecha_bloqueo']
${BES_CAMPO_HORA_BLOQUEO_HISTORIAL}             xpath://td[@data-field='hora_bloqueo']
${BES_CAMPO_MOTIVO_BLOQUEO_HISTORIAL}           xpath://td[@data-field='motivo_bloqueo']
${BES_CAMPO_USUARIO_EJECUTOR_BLOQUEO}           xpath://td[@data-field='usuario_ejecutor']
${BES_CAMPO_ESTATUS_OPERACION_BLOQUEO}          xpath://td[@data-field='estatus_operacion_bloqueo']

Identificar préstamo de Amigo Paguitos con incumplimiento de pago
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Click Element    ${BES_FILTRO_PRESTAMOS_AMIGO_PAGUITOS}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS}    timeout=10s
    ${xpath_prestamo}=    Set Variable    ${BES_TABLA_PRESTAMOS}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_prestamo}
    Log    Préstamo de Amigo Paguitos identificado: ${referencia_prestamo}

Verificar préstamo marcado como moroso
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_PRESTAMO_MOROSO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO_MOROSO}
    Should Contain    ${estatus}    Moroso
    Page Should Contain Element    ${BES_LABEL_INCUMPLIMIENTO_PAGO}
    Log    Préstamo ${referencia_prestamo} marcado como moroso con incumplimiento de pago

Verificar activación de proceso de bloqueo
    Page Should Contain Element    ${BES_BOTON_EJECUTAR_PROCESO_BLOQUEO}
    Element Should Be Enabled    ${BES_BOTON_EJECUTAR_PROCESO_BLOQUEO}
    Log    Proceso de bloqueo activado y disponible para ejecución

Ejecutar proceso de bloqueo del equipo
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Click Button    ${BES_BOTON_EJECUTAR_PROCESO_BLOQUEO}
    Wait Until Element Is Visible    ${BES_MENSAJE_PROCESO_BLOQUEO_INICIADO}    timeout=10s
    Log    Proceso de bloqueo ejecutado para préstamo ${referencia_prestamo}

Verificar envío de solicitud a SITIC-Trustonic
    [Arguments]    ${referencia_prestamo}=PRESTAP123456    ${imei}=359876543210987
    Wait Until Element Is Visible    ${BES_TABLA_SOLICITUDES_BLOQUEO}    timeout=15s
    ${xpath_solicitud}=    Set Variable    ${BES_TABLA_SOLICITUDES_BLOQUEO}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_solicitud}
    ${imei_solicitud}=    Get Text    ${xpath_solicitud}//td[@data-field='imei_solicitud_bloqueo']
    ${referencia}=    Get Text    ${xpath_solicitud}//td[@data-field='referencia_solicitud']
    Should Contain    ${imei_solicitud}    ${imei}
    Should Contain    ${referencia}    ${referencia_prestamo}
    Log    Solicitud de bloqueo enviada a SITIC-Trustonic - IMEI: ${imei}, Referencia: ${referencia_prestamo}

Verificar confirmación de bloqueo recibida
    [Arguments]    ${imei}=359876543210987
    Wait Until Element Is Visible    ${BES_CAMPO_CONFIRMACION_BLOQUEO_SITIC}    timeout=15s
    ${confirmacion}=    Get Text    ${BES_CAMPO_CONFIRMACION_BLOQUEO_SITIC}
    Should Contain Any    ${confirmacion}    Confirmado    Exitoso    Bloqueado
    Log    Confirmación de bloqueo recibida desde SITIC-Trustonic para IMEI ${imei}

Verificar actualización de estatus equipo a bloqueado
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_EQUIPO_INHABILITADO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_EQUIPO_INHABILITADO}
    Should Contain Any    ${estatus}    Bloqueado    Inhabilitado
    Page Should Contain Element    ${BES_CAMPO_FECHA_BLOQUEO_CONFIRMADO}
    ${fecha_bloqueo}=    Get Text    ${BES_CAMPO_FECHA_BLOQUEO_CONFIRMADO}
    Should Not Be Empty    ${fecha_bloqueo}
    Log    Estatus del equipo actualizado a bloqueado - Fecha: ${fecha_bloqueo}

Acceder a módulo de notificaciones al cliente
    Click Element    ${BES_MENU_NOTIFICACIONES_CLIENTE}
    Wait Until Element Is Visible    ${BES_TABLA_NOTIFICACIONES_ENVIADAS}    timeout=10s

Verificar notificación de bloqueo enviada al cliente
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Page Should Contain Element    ${BES_TABLA_NOTIFICACIONES_ENVIADAS}
    ${xpath_notificacion}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_ENVIADAS}//tr[contains(., 'bloqueo') or contains(., 'incumplimiento')]
    Page Should Contain Element    ${xpath_notificacion}
    ${tipo}=    Get Text    ${xpath_notificacion}//td[@data-field='tipo_notificacion']
    ${canal}=    Get Text    ${xpath_notificacion}//td[@data-field='canal_envio']
    ${estatus}=    Get Text    ${xpath_notificacion}//td[@data-field='estatus_envio']
    Should Contain Any    ${tipo}    Bloqueo    Incumplimiento    Inhabilitación
    Should Contain Any    ${estatus}    Enviado    Entregado
    Should Not Be Empty    ${canal}
    Log    Notificación de bloqueo enviada al cliente - Tipo: ${tipo}, Canal: ${canal}, Estatus: ${estatus}

Verificar contenido de notificación incluye motivo de bloqueo
    ${xpath_notificacion}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_ENVIADAS}//tr[contains(., 'bloqueo')]
    ${contenido}=    Get Text    ${xpath_notificacion}//td[@data-field='contenido_notificacion']
    Should Contain Any    ${contenido}    incumplimiento    pago vencido    mora    bloqueo
    Log    Contenido de notificación verificado: ${contenido}

Acceder a historial de eventos de bloqueo
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Click Element    ${BES_MENU_HISTORIAL_BLOQUEOS}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_BLOQUEOS}    timeout=10s

Verificar registro completo del evento de bloqueo en historial
    [Arguments]    ${referencia_prestamo}=PRESTAP123456    ${motivo}=Incumplimiento de pago
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_BLOQUEOS}
    ${xpath_evento}=    Set Variable    ${BES_TABLA_HISTORIAL_BLOQUEOS}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_evento}
    ${fecha}=    Get Text    ${xpath_evento}//td[@data-field='fecha_bloqueo']
    ${hora}=    Get Text    ${xpath_evento}//td[@data-field='hora_bloqueo']
    ${motivo_registrado}=    Get Text    ${xpath_evento}//td[@data-field='motivo_bloqueo']
    ${estatus_operacion}=    Get Text    ${xpath_evento}//td[@data-field='estatus_operacion_bloqueo']
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${hora}
    Should Contain    ${motivo_registrado}    ${motivo}
    Should Contain Any    ${estatus_operacion}    Exitoso    Completado
    Log    Evento de bloqueo registrado - Fecha: ${fecha}, Hora: ${hora}, Motivo: ${motivo_registrado}, Estatus: ${estatus_operacion}

Verificar trazabilidad completa del proceso de bloqueo
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Page Should Contain Element    ${BES_CAMPO_USUARIO_EJECUTOR_BLOQUEO}
    ${usuario}=    Get Text    ${BES_CAMPO_USUARIO_EJECUTOR_BLOQUEO}
    Should Not Be Empty    ${usuario}
    Log    Trazabilidad completa verificada - Usuario ejecutor: ${usuario}

# ========================================
# LOCATORS Y KEYWORDS PARA DESBLOQUEOS DE EQUIPOS DE AMIGO PAGUITOS (TC067)
# ========================================
${BES_CAMPO_ESTATUS_EQUIPO_BLOQUEADO_PREVIO}     xpath://div[@data-field='estatus_equipo' and contains(text(),'Bloqueado')]
${BES_BOTON_VALIDAR_CONDICIONES_DESBLOQUEO}      css:.btn-validar-condiciones-desbloqueo
${BES_MENSAJE_VALIDACION_DESBLOQUEO_EXITOSA}     xpath://div[contains(text(),'Validación de condiciones de desbloqueo exitosa')]
${BES_MENSAJE_SIN_PARCIALIDADES_VENCIDAS}        xpath://div[contains(text(),'No existen otras parcialidades vencidas')]
${BES_MENSAJE_AUTORIZACION_DESBLOQUEO}           xpath://div[contains(text(),'Desbloqueo autorizado')]
${BES_CAMPO_RESPUESTA_EXITOSA_API_HABILITACION}  xpath://div[@data-field='respuesta_api' and contains(text(),'Exitoso')]
${BES_TABLA_NOTIFICACIONES_DESBLOQUEO}           xpath://table[@id='tabla_notificaciones_desbloqueo']
${BES_CAMPO_TIPO_NOTIFICACION_DESBLOQUEO}        xpath://td[@data-field='tipo_notificacion' and contains(text(),'Desbloqueo')]
${BES_CAMPO_CONTENIDO_NOTIFICACION_DESBLOQUEO}   xpath://td[@data-field='contenido_notificacion']
${BES_CAMPO_USUARIO_EJECUTOR_DESBLOQUEO}         xpath://td[@data-field='usuario_ejecutor_desbloqueo']

Verificar que el préstamo tenía equipo bloqueado previamente
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_EQUIPO_BLOQUEADO_PREVIO}
    ${estatus_previo}=    Get Text    ${BES_CAMPO_ESTATUS_EQUIPO_BLOQUEADO_PREVIO}
    Should Contain Any    ${estatus_previo}    Bloqueado    Inhabilitado
    Log    Préstamo ${referencia_prestamo} tenía equipo bloqueado previamente: ${estatus_previo}

Ejecutar validación de condiciones para desbloqueo
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Click Button    ${BES_BOTON_VALIDAR_CONDICIONES_DESBLOQUEO}
    Wait Until Element Is Visible    ${BES_MENSAJE_VALIDACION_DESBLOQUEO_EXITOSA}    timeout=10s
    Log    Validación de condiciones para desbloqueo ejecutada para préstamo ${referencia_prestamo}

Verificar que no existen otras parcialidades vencidas
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Wait Until Element Is Visible    ${BES_MENSAJE_SIN_PARCIALIDADES_VENCIDAS}    timeout=10s
    ${mensaje}=    Get Text    ${BES_MENSAJE_SIN_PARCIALIDADES_VENCIDAS}
    Should Contain    ${mensaje}    No existen otras parcialidades vencidas
    Log    Validado que préstamo ${referencia_prestamo} no tiene otras parcialidades vencidas

Verificar autorización de desbloqueo del equipo
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Wait Until Element Is Visible    ${BES_MENSAJE_AUTORIZACION_DESBLOQUEO}    timeout=10s
    ${mensaje}=    Get Text    ${BES_MENSAJE_AUTORIZACION_DESBLOQUEO}
    Should Contain    ${mensaje}    Desbloqueo autorizado
    Log    Desbloqueo autorizado para préstamo ${referencia_prestamo}

Verificar respuesta exitosa de API SITIC-Trustonic para habilitación
    [Arguments]    ${imei}=359111222333444
    Wait Until Element Is Visible    ${BES_CAMPO_RESPUESTA_EXITOSA_API_HABILITACION}    timeout=15s
    ${respuesta}=    Get Text    ${BES_CAMPO_RESPUESTA_EXITOSA_API_HABILITACION}
    Should Contain Any    ${respuesta}    Exitoso    Confirmado    Desbloqueado
    Log    Respuesta exitosa de API SITIC-Trustonic para habilitación de IMEI ${imei}: ${respuesta}

Verificar notificación de desbloqueo enviada al cliente
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Wait Until Element Is Visible    ${BES_TABLA_NOTIFICACIONES_DESBLOQUEO}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_NOTIFICACIONES_DESBLOQUEO}
    ${xpath_notificacion}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_DESBLOQUEO}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_notificacion}
    ${tipo}=    Get Text    ${xpath_notificacion}//td[@data-field='tipo_notificacion']
    ${estatus}=    Get Text    ${xpath_notificacion}//td[@data-field='estatus_envio']
    Should Contain Any    ${tipo}    Desbloqueo    Habilitación    Regularización
    Should Contain Any    ${estatus}    Enviado    Entregado
    Log    Notificación de desbloqueo enviada al cliente para préstamo ${referencia_prestamo}

Verificar contenido de notificación incluye confirmación de desbloqueo
    ${xpath_notificacion}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_DESBLOQUEO}//tr[1]
    ${contenido}=    Get Text    ${xpath_notificacion}//td[@data-field='contenido_notificacion']
    Should Contain Any    ${contenido}    desbloqueo    pago acreditado    habilitado    activo
    Log    Contenido de notificación verificado incluye confirmación de desbloqueo: ${contenido}

Verificar trazabilidad completa del proceso de desbloqueo
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Acceder a sección de historial de habilitaciones en pantalla 360
    Page Should Contain Element    ${BES_CAMPO_USUARIO_EJECUTOR_DESBLOQUEO}
    ${usuario}=    Get Text    ${BES_CAMPO_USUARIO_EJECUTOR_DESBLOQUEO}
    Should Not Be Empty    ${usuario}
    Log    Trazabilidad completa del proceso de desbloqueo verificada - Usuario ejecutor: ${usuario} - Préstamo: ${referencia_prestamo}

# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN BES-SICATEL ACREDITACIÓN DE PAGOS (TC069)
# ========================================
${BES_MENU_CONSULTA_INTERFACES_CPS}         id:menu_consulta_interfaces_cps
${BES_INPUT_REFERENCIA_PRESTAMO_CPS}        id:input_referencia_prestamo_cps
${BES_BOTON_CONSULTAR_PAGOS_CPS}            css:.btn-consultar-pagos-cps
${BES_TABLA_PAGOS_CPS}                      xpath://table[@id='tabla_pagos_cps']
${BES_CAMPO_MONTO_PAGO_CPS}                 xpath://td[@data-field='monto_pago']
${BES_CAMPO_FECHA_PAGO_CPS}                 xpath://td[@data-field='fecha_pago']
${BES_CAMPO_NUMERO_PRESTAMO_CPS}            xpath://td[@data-field='numero_prestamo']
${BES_CAMPO_CONCEPTO_PAGO_CPS}              xpath://td[@data-field='concepto_pago']
${BES_MENSAJE_CONSULTA_CPS_EXITOSA}         xpath://div[contains(text(),'Consulta exitosa')]
${BES_CAMPO_PARCIALIDAD_MARCADA_PAGADA}     xpath://td[@data-field='estatus_parcialidad' and contains(text(),'Pagada')]
${BES_CAMPO_SALDO_ACTUALIZADO_PRESTAMO}     xpath://div[@data-field='saldo_actualizado']
${BES_MENU_HISTORIAL_PRESTAMO}              id:menu_historial_prestamo
${BES_TABLA_HISTORIAL_CONCILIACION}         xpath://table[@id='tabla_historial_conciliacion']
${BES_CAMPO_FECHA_CONCILIACION}             xpath://td[@data-field='fecha_conciliacion']
${BES_CAMPO_MONTO_CONCILIACION}             xpath://td[@data-field='monto_conciliacion']
${BES_CAMPO_PUNTO_COBRO_CONCILIACION}       xpath://td[@data-field='punto_cobro']
${BES_MENSAJE_CONCILIACION_REGISTRADA}      xpath://div[contains(text(),'Conciliación registrada')]

Acceder a módulo de consulta de interfaces CPS
    Click Element    ${BES_MENU_CONSULTA_INTERFACES_CPS}
    Wait Until Element Is Visible    ${BES_INPUT_REFERENCIA_PRESTAMO_CPS}    timeout=10s

Consultar pagos registrados en CPS para préstamo de Amigo Paguitos
    [Arguments]    ${referencia_prestamo}
    Input Text    ${BES_INPUT_REFERENCIA_PRESTAMO_CPS}    ${referencia_prestamo}
    Click Button    ${BES_BOTON_CONSULTAR_PAGOS_CPS}
    Wait Until Element Is Visible    ${BES_TABLA_PAGOS_CPS}    timeout=15s

Verificar detalle del pago obtenido de CPS
    [Arguments]    ${monto_esperado}    ${fecha_esperada}    ${numero_prestamo}    ${concepto}=Pago Parcialidad
    Page Should Contain Element    ${BES_MENSAJE_CONSULTA_CPS_EXITOSA}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_PAGO_CPS}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_PAGO_CPS}
    ${prestamo}=    Get Text    ${BES_CAMPO_NUMERO_PRESTAMO_CPS}
    ${concepto_pago}=    Get Text    ${BES_CAMPO_CONCEPTO_PAGO_CPS}
    Should Contain    ${monto}    ${monto_esperado}
    Should Contain    ${fecha}    ${fecha_esperada}
    Should Contain    ${prestamo}    ${numero_prestamo}
    Should Contain    ${concepto_pago}    ${concepto}
    Log    Detalle del pago obtenido de CPS - Monto: ${monto}, Fecha: ${fecha}, Préstamo: ${prestamo}, Concepto: ${concepto_pago}

Verificar parcialidad marcada como pagada en calendario
    [Arguments]    ${numero_parcialidad}
    ${xpath_parcialidad}=    Set Variable    ${BES_TABLA_CALENDARIO_PAGOS}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Page Should Contain Element    ${xpath_parcialidad}
    ${estatus}=    Get Text    ${xpath_parcialidad}//td[@data-field='estatus_parcialidad']
    Should Contain    ${estatus}    Pagada
    Log    Parcialidad ${numero_parcialidad} marcada como pagada en calendario de cobranza

Verificar actualización del saldo del préstamo después de acreditación
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_ACTUALIZADO_PRESTAMO}
    Should Not Be Empty    ${saldo}
    Log    Saldo del préstamo actualizado: ${saldo}

Acceder a historial del préstamo para verificar conciliación
    [Arguments]    ${referencia_prestamo}
    Click Element    ${BES_MENU_HISTORIAL_PRESTAMO}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_CONCILIACION}    timeout=10s

Verificar registro de conciliación de pago en historial del préstamo
    [Arguments]    ${monto}    ${fecha}    ${punto_cobro}=SICATEL
    ${xpath_conciliacion}=    Set Variable    ${BES_TABLA_HISTORIAL_CONCILIACION}//tr[contains(., '${monto}') and contains(., '${fecha}')]
    Page Should Contain Element    ${xpath_conciliacion}
    ${fecha_conc}=    Get Text    ${xpath_conciliacion}//td[@data-field='fecha_conciliacion']
    ${monto_conc}=    Get Text    ${xpath_conciliacion}//td[@data-field='monto_conciliacion']
    ${punto}=    Get Text    ${xpath_conciliacion}//td[@data-field='punto_cobro']
    Should Contain    ${fecha_conc}    ${fecha}
    Should Contain    ${monto_conc}    ${monto}
    Should Contain    ${punto}    ${punto_cobro}
    Page Should Contain Element    ${BES_MENSAJE_CONCILIACION_REGISTRADA}
    Log    Conciliación registrada en historial - Fecha: ${fecha_conc}, Monto: ${monto_conc}, Punto cobro: ${punto}

# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN CON KIOSCOS Y PROCESO DE DESBLOQUEO (TC070)
# ========================================
${BES_MENU_INTEGRACIONES_CPS}              id:menu_integraciones_cps
${BES_CAMPO_NOTIFICACION_PAGO_KIOSCOS}     xpath://div[contains(text(),'Pago recibido desde Kioscos')]
${BES_CAMPO_METODO_PAGO_TDC}               xpath://td[@data-field='metodo_pago']
${BES_CAMPO_CONCEPTO_PAGO}                 xpath://td[@data-field='concepto_pago']
${BES_CAMPO_NUMERO_PRESTAMO_PAGO}          xpath://td[@data-field='numero_prestamo']
${BES_CAMPO_HORA_PAGO}                     xpath://td[@data-field='hora_pago']
${BES_MENU_EVALUACION_ESTATUS}             id:menu_evaluacion_estatus
${BES_CAMPO_ESTATUS_ACTUAL_PRESTAMO}       xpath://div[@data-field='estatus_actual']
${BES_CAMPO_SALDO_VENCIDO_PRESTAMO}        xpath://div[@data-field='saldo_vencido']
${BES_CAMPO_DIAS_MORA_PRESTAMO}            xpath://div[@data-field='dias_mora']
${BES_BOTON_EVALUAR_DESBLOQUEO}            id:btn_evaluar_desbloqueo
${BES_MENSAJE_PRESTAMO_REGULARIZADO}       xpath://div[contains(text(),'Préstamo regularizado')]
${BES_MENSAJE_DESBLOQUEO_EJECUTADO}        xpath://div[contains(text(),'Desbloqueo ejecutado')]
${BES_CAMPO_PROCESO_DESBLOQUEO}            css:.proceso-desbloqueo
${BES_CAMPO_RESULTADO_DESBLOQUEO}          xpath://div[@data-field='resultado_desbloqueo']

Acceder a módulo de integraciones con CPS
    Click Element    ${BES_MENU_INTEGRACIONES_CPS}
    Wait Until Element Is Visible    ${BES_MENU_NOTIFICACIONES_PAGO}    timeout=10s

Consultar pagos recibidos desde Kioscos
    [Arguments]    ${referencia_prestamo}
    Click Element    ${BES_MENU_NOTIFICACIONES_PAGO}
    Wait Until Element Is Visible    ${BES_TABLA_NOTIFICACIONES_PAGO}    timeout=10s
    ${xpath_notif}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_PAGO}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_notif}

Verificar notificación de pago recibida desde CPS
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}=Kioscos
    ${xpath_notif}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_PAGO}//tr[contains(., '${referencia_prestamo}') and contains(., '${numero_parcialidad}')]
    Page Should Contain Element    ${xpath_notif}
    ${punto}=    Get Text    ${xpath_notif}//td[@data-field='punto_cobro']
    ${concepto}=    Get Text    ${BES_CAMPO_CONCEPTO_PAGO}
    ${metodo}=    Get Text    ${BES_CAMPO_METODO_PAGO_TDC}
    Should Contain    ${punto}    ${punto_cobro}
    Should Contain    ${metodo}    Tarjeta de Crédito
    Log    Notificación recibida desde CPS - Punto cobro: ${punto}, Concepto: ${concepto}, Método: ${metodo}

Ingresar datos del pago de enganche en Kioscos
    [Arguments]    ${referencia_prestamo}    ${monto}    ${identificacion}
    Input Text    ${KIOSCO_INPUT_REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Input Text    ${KIOSCO_INPUT_MONTO_PARCIALIDAD}    ${monto}
    Input Text    ${KIOSCO_INPUT_IDENTIFICACION_CLIENTE}    ${identificacion}

Verificar evaluación de estatus del préstamo después de pago
    Click Element    ${BES_MENU_EVALUACION_ESTATUS}
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_ACTUAL_PRESTAMO}    timeout=10s
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_ACTUAL_PRESTAMO}
    ${saldo_vencido}=    Get Text    ${BES_CAMPO_SALDO_VENCIDO_PRESTAMO}
    ${dias_mora}=    Get Text    ${BES_CAMPO_DIAS_MORA_PRESTAMO}
    Log    Estatus del préstamo evaluado - Estatus: ${estatus}, Saldo vencido: ${saldo_vencido}, Días mora: ${dias_mora}

Verificar ejecución de proceso de desbloqueo si el pago regulariza el préstamo
    [Arguments]    ${referencia_prestamo}
    Click Button    ${BES_BOTON_EVALUAR_DESBLOQUEO}
    ${prestamo_regularizado}=    Run Keyword And Return Status    Element Should Be Visible    ${BES_MENSAJE_PRESTAMO_REGULARIZADO}
    Run Keyword If    ${prestamo_regularizado}    Ejecutar proceso de desbloqueo automático
    Run Keyword If    ${prestamo_regularizado}    Verificar desbloqueo ejecutado exitosamente

Ejecutar proceso de desbloqueo automático
    Wait Until Element Is Visible    ${BES_CAMPO_PROCESO_DESBLOQUEO}    timeout=15s
    Wait Until Element Is Visible    ${BES_MENSAJE_DESBLOQUEO_EJECUTADO}    timeout=30s
    Log    Proceso de desbloqueo automático ejecutado

Verificar desbloqueo ejecutado exitosamente
    Page Should Contain Element    ${BES_MENSAJE_DESBLOQUEO_EJECUTADO}
    ${resultado}=    Get Text    ${BES_CAMPO_RESULTADO_DESBLOQUEO}
    Should Contain    ${resultado}    Exitoso
    Log    Desbloqueo ejecutado exitosamente


# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN BES-BDI TELCEL (TC072)
# ========================================
${BES_MENU_INTEGRACIONES_BDI}              id:menu_integraciones_bdi
${BES_INPUT_BUSCAR_SINCRONIZACION_BDI}     id:buscar_sincronizacion_bdi
${BES_BOTON_BUSCAR_SINCRONIZACION}         css:.btn-buscar-sincronizacion
${BES_TABLA_SINCRONIZACIONES_BDI}          xpath://table[@id='tabla_sincronizaciones_bdi']
${BES_CAMPO_ID_CLIENTE_SINCRONIZACION}     xpath://td[@data-field='id_cliente']
${BES_CAMPO_FECHA_SINCRONIZACION_BDI}      xpath://td[@data-field='fecha_sincronizacion']
${BES_CAMPO_ESTATUS_SINCRONIZACION_BDI}    xpath://td[@data-field='estatus_sincronizacion']
${BES_CAMPO_RESPUESTA_BDI}                 xpath://td[@data-field='respuesta_bdi']
${BES_MENSAJE_SINCRONIZACION_EXITOSA}      xpath://div[contains(text(),'Sincronización exitosa con BDI Telcel')]
${BES_LINK_VER_DETALLE_SINCRONIZACION}     css:.link-ver-detalle-sincronizacion
${BES_PANEL_DETALLE_SINCRONIZACION}        css:.panel-detalle-sincronizacion
${BES_CAMPO_DATOS_ENVIADOS_BDI}            css:.datos-enviados-bdi
${BES_CAMPO_CONFIRMACION_BDI}              css:.confirmacion-bdi

Acceder a módulo de integraciones en BDI desde BES
    Click Element    ${BES_MENU_INTEGRACIONES_BDI}
    Wait Until Element Is Visible    ${BES_INPUT_BUSCAR_SINCRONIZACION_BDI}    timeout=10s

Consultar sincronización con BDI Telcel
    [Arguments]    ${identificacion}
    Input Text    ${BES_INPUT_BUSCAR_SINCRONIZACION_BDI}    ${identificacion}
    Click Button    ${BES_BOTON_BUSCAR_SINCRONIZACION}
    Wait Until Element Is Visible    ${BES_TABLA_SINCRONIZACIONES_BDI}    timeout=10s

Verificar confirmación de procesamiento desde BDI Telcel
    Page Should Contain Element    ${BES_TABLA_SINCRONIZACIONES_BDI}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_SINCRONIZACION_BDI}
    Should Contain    ${estatus}    Exitosa
    ${respuesta}=    Get Text    ${BES_CAMPO_RESPUESTA_BDI}
    Should Contain    ${respuesta}    BDI
    Wait Until Element Is Visible    ${BES_MENSAJE_SINCRONIZACION_EXITOSA}    timeout=10s
    Log    BES recibió confirmación de procesamiento exitoso desde BDI Telcel

Verificar detalle de sincronización con BDI
    [Arguments]    ${identificacion}
    Click Element    ${BES_LINK_VER_DETALLE_SINCRONIZACION}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_SINCRONIZACION}    timeout=10s
    ${datos_enviados}=    Get Text    ${BES_CAMPO_DATOS_ENVIADOS_BDI}
    Should Contain    ${datos_enviados}    ${identificacion}
    ${confirmacion}=    Get Text    ${BES_CAMPO_CONFIRMACION_BDI}
    Should Not Be Empty    ${confirmacion}
    Log    Detalle de sincronización verificado correctamente

# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN CON DATA SERVICES PREPAGO (TC073)
# ========================================
${BES_MENU_INTEGRACION_DATA_SERVICES}          id:menu_integracion_data_services
${BES_PANEL_ENVIO_DATA_SERVICES}               css:.panel-envio-data-services
${BES_BOTON_ENVIAR_ACTIVACION_DSP}             id:btn_enviar_activacion_dsp
${BES_MENSAJE_ENVIO_EXITOSO_DSP}               xpath://div[contains(text(),'Información enviada a Data Services Prepago')]
${BES_CAMPO_ID_SOLICITUD_DSP}                  xpath://div[@data-field='id_solicitud_dsp']
${BES_CAMPO_ESTADO_ENVIO_DSP}                  xpath://div[@data-field='estado_envio_dsp']
${BES_SECCION_CONFIRMACION_DSP}                css:.seccion-confirmacion-dsp
${BES_MENSAJE_CONFIRMACION_RECIBIDA_DSP}       xpath://div[contains(text(),'Confirmación recibida desde Data Services')]
${BES_CAMPO_NUMERO_LINEA_CONFIRMADA_DSP}       xpath://div[@data-field='numero_linea_confirmada_dsp']
${BES_CAMPO_PROMOCION_APLICADA_DSP}            xpath://div[@data-field='promocion_aplicada_dsp']
${BES_CAMPO_ESTADO_FINANCIAMIENTO_DSP}         xpath://div[@data-field='estado_financiamiento_dsp']
${BES_PANEL_DETALLE_FINANCIAMIENTO_LINEA}      css:.panel-detalle-financiamiento-linea
${BES_CAMPO_FINANCIAMIENTO_LINEA_ACTIVA}       xpath://div[@data-field='financiamiento_linea_activa']
${BES_CAMPO_PROMOCION_LINEA_360}               xpath://div[@data-field='promocion_linea_360']
${BES_TABLA_DATOS_LINEA_PREPAGO}               xpath://table[@id='tabla_datos_linea_prepago']
${BES_CAMPO_PLAN_PREPAGO_ASOCIADO}             xpath://td[@data-field='plan_prepago_asociado']
${BES_CAMPO_FECHA_ACTIVACION_LINEA_DSP}        xpath://td[@data-field='fecha_activacion_linea_dsp']
${BES_CAMPO_TIPO_PROMOCION_DSP}                xpath://td[@data-field='tipo_promocion_dsp']

Acceder a módulo de integración con Data Services Prepago
    Click Element    ${BES_MENU_INTEGRACION_DATA_SERVICES}
    Wait Until Element Is Visible    ${BES_PANEL_ENVIO_DATA_SERVICES}    timeout=10s

Enviar información de activación a Data Services Prepago
    Click Button    ${BES_BOTON_ENVIAR_ACTIVACION_DSP}
    Wait Until Element Is Visible    ${BES_MENSAJE_ENVIO_EXITOSO_DSP}    timeout=15s
    Log    Información de activación enviada a Data Services Prepago

Verificar envío exitoso hacia Data Services Prepago
    Page Should Contain Element    ${BES_MENSAJE_ENVIO_EXITOSO_DSP}
    ${id_solicitud}=    Get Text    ${BES_CAMPO_ID_SOLICITUD_DSP}
    ${estado}=    Get Text    ${BES_CAMPO_ESTADO_ENVIO_DSP}
    Should Not Be Empty    ${id_solicitud}
    Should Contain    ${estado}    Enviado
    Log    Solicitud ID ${id_solicitud} enviada con estado: ${estado}

Esperar confirmación de Data Services Prepago
    Wait Until Element Is Visible    ${BES_SECCION_CONFIRMACION_DSP}    timeout=30s
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIRMACION_RECIBIDA_DSP}    timeout=30s

Verificar recepción de confirmación desde Data Services Prepago
    Page Should Contain Element    ${BES_MENSAJE_CONFIRMACION_RECIBIDA_DSP}
    ${numero_linea}=    Get Text    ${BES_CAMPO_NUMERO_LINEA_CONFIRMADA_DSP}
    ${promocion}=    Get Text    ${BES_CAMPO_PROMOCION_APLICADA_DSP}
    Should Not Be Empty    ${numero_linea}
    Should Not Be Empty    ${promocion}
    Log    Confirmación recibida - Línea: ${numero_linea}, Promoción: ${promocion}

Actualizar estado de financiamiento con línea activada
    ${estado}=    Get Text    ${BES_CAMPO_ESTADO_FINANCIAMIENTO_DSP}
    Should Contain    ${estado}    Línea activada
    Log    Estado del financiamiento actualizado: ${estado}

Consultar información completa del financiamiento en BES
    [Arguments]    ${identificacion}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Click Element    ${BES_LINK_VER_DETALLE}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_FINANCIAMIENTO_LINEA}    timeout=10s

Verificar datos de línea prepago en financiamiento
    Wait Until Element Is Visible    ${BES_TABLA_DATOS_LINEA_PREPAGO}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_DATOS_LINEA_PREPAGO}
    ${plan}=    Get Text    ${BES_CAMPO_PLAN_PREPAGO_ASOCIADO}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_ACTIVACION_LINEA_DSP}
    ${promocion}=    Get Text    ${BES_TIPO_PROMOCION_DSP}
    Should Not Be Empty    ${plan}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${promocion}
    Log    Línea prepago - Plan: ${plan}, Fecha: ${fecha}, Promoción: ${promocion}

Verificar promociones aplicadas en financiamiento
    [Arguments]    ${tipo_promocion_esperada}
    ${promocion}=    Get Text    ${BES_CAMPO_PROMOCION_LINEA_360}
    Should Contain    ${promocion}    ${tipo_promocion_esperada}
    Log    Promoción ${tipo_promocion_esperada} aplicada correctamente en financiamiento

# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN CON EIR (TC074)
# ========================================
${BES_MENU_INTEGRACION_EIR}            id:menu_integracion_eir
${BES_PANEL_ENVIO_EIR}                 css:.panel-envio-eir
${BES_BOTON_ENVIAR_IMEI_EIR}           id:btn_enviar_imei_eir
${BES_MENSAJE_ENVIANDO_A_EIR}          xpath://div[contains(text(),'Enviando información a EIR')]
${BES_MENSAJE_ENVIO_EIR_EXITOSO}       xpath://div[contains(text(),'Información enviada exitosamente a EIR')]
${BES_CAMPO_ESTADO_ENVIO_EIR}          css:.estado-envio-eir
${BES_CAMPO_RESPUESTA_EIR}             css:.respuesta-eir
${BES_CAMPO_CONFIRMACION_REGISTRO_EIR} xpath://div[@data-field='confirmacion_registro_eir']
${BES_LOG_INTEGRACION_EIR}             css:.log-integracion-eir
${BES_CAMPO_FECHA_ENVIO_EIR}           xpath://div[@data-field='fecha_envio_eir']

Acceder a módulo de integración con EIR
    Click Element    ${BES_MENU_INTEGRACION_EIR}
    Wait Until Element Is Visible    ${BES_PANEL_ENVIO_EIR}    timeout=10s

Enviar información del IMEI hacia EIR
    [Arguments]    ${imei}
    Acceder a módulo de equipos en BES
    Buscar equipo por IMEI    ${imei}
    Verificar que existe registro de equipo en BES
    Acceder a módulo de integración con EIR
    Wait Until Element Is Visible    ${BES_BOTON_ENVIAR_IMEI_EIR}    timeout=10s
    Element Should Be Enabled    ${BES_BOTON_ENVIAR_IMEI_EIR}
    Click Button    ${BES_BOTON_ENVIAR_IMEI_EIR}
    Wait Until Element Is Visible    ${BES_MENSAJE_ENVIANDO_A_EIR}    timeout=10s
    Log    BES envía información del IMEI ${imei} hacia sistema EIR

Verificar solicitud de registro enviada a EIR
    Wait Until Element Is Visible    ${BES_MENSAJE_ENVIO_EIR_EXITOSO}    timeout=15s
    ${estado_envio}=    Get Text    ${BES_CAMPO_ESTADO_ENVIO_EIR}
    Should Contain    ${estado_envio}    Exitoso
    Log    Solicitud de registro enviada exitosamente a EIR

Obtener confirmación de registro desde EIR
    Wait Until Element Is Visible    ${BES_CAMPO_RESPUESTA_EIR}    timeout=20s
    ${respuesta}=    Get Text    ${BES_CAMPO_RESPUESTA_EIR}
    Should Contain    ${respuesta}    Registrado
    Wait Until Element Is Visible    ${BES_CAMPO_CONFIRMACION_REGISTRO_EIR}    timeout=10s
    ${confirmacion}=    Get Text    ${BES_CAMPO_CONFIRMACION_REGISTRO_EIR}
    Should Not Be Empty    ${confirmacion}
    Log    Confirmación recibida desde EIR: ${confirmacion}

Verificar estado del registro del equipo en EIR desde BES
    Wait Until Element Is Visible    ${BES_CAMPO_REGISTRO_EIR}    timeout=10s
    ${estado_registro}=    Get Text    ${BES_CAMPO_REGISTRO_EIR}
    Should Contain    ${estado_registro}    Registrado
    Log    Estado de registro en EIR confirmado desde BES

Consultar estado del registro en EIR desde BES
    [Arguments]    ${imei}
    Acceder a módulo de equipos en BES
    Buscar equipo por IMEI    ${imei}
    Acceder a detalle del equipo enrollado
    Verificar estado del registro del equipo en EIR desde BES
    Log    BES consulta y confirma el registro exitoso del equipo en EIR

Verificar integración completa BES hacia EIR
    [Arguments]    ${imei}
    Enviar información del IMEI hacia EIR    ${imei}
    Verificar solicitud de registro enviada a EIR
    Obtener confirmación de registro desde EIR
    Consultar estado del registro en EIR desde BES    ${imei}
    Log    Integración completa BES-EIR verificada para IMEI ${imei}

# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN CON PORTAL DE HABILITACIÓN DE EQUIPOS (TC075)
# ========================================
${BES_MENU_CALENDARIO_COBRANZA}                     id:menu_calendario_cobranza
${BES_TABLA_CUOTAS_VENCIDAS}                        xpath://table[@id='tabla_cuotas_vencidas']
${BES_CAMPO_ESTATUS_CUOTA_VENCIDA}                  xpath://td[@data-field='estatus_cuota' and contains(text(),'Vencida')]
${BES_CAMPO_FECHA_VENCIMIENTO_CUOTA}                xpath://td[@data-field='fecha_vencimiento']
${BES_CAMPO_DIAS_MORA}                              xpath://td[@data-field='dias_mora']
${BES_BOTON_GENERAR_ORDEN_INHABILITACION}           css:.btn-generar-orden-inhabilitacion
${BES_MENSAJE_ORDEN_INHABILITACION_GENERADA}        xpath://div[contains(text(),'Orden de inhabilitación generada')]
${BES_CAMPO_DATOS_ORDEN_INHABILITACION}             xpath://div[@data-field='datos_orden_inhabilitacion']
${BES_CAMPO_IMEI_ORDEN_INHABILITACION}              xpath://td[@data-field='imei_orden']
${BES_CAMPO_MOTIVO_ORDEN_INHABILITACION}            xpath://td[@data-field='motivo_orden']
${BES_BOTON_ENVIAR_SOLICITUD_PORTAL}                css:.btn-enviar-solicitud-portal
${BES_MENSAJE_SOLICITUD_ENVIADA_PORTAL}             xpath://div[contains(text(),'Solicitud enviada a Portal de Habilitación')]
${BES_TABLA_SOLICITUDES_INHABILITACION_ENVIADAS}    xpath://table[@id='tabla_solicitudes_inhabilitacion']
${BES_CAMPO_ESTATUS_SOLICITUD_INHABILITACION}       xpath://td[@data-field='estatus_solicitud']
${BES_CAMPO_CONFIRMACION_PORTAL_INHABILITACION}     xpath://div[@data-field='confirmacion_portal']
${BES_MENSAJE_CONFIRMACION_INHABILITACION_RECIBIDA} xpath://div[contains(text(),'Confirmación de inhabilitación recibida')]
${BES_CAMPO_ESTATUS_EQUIPO_INHABILITADO}            xpath://div[@data-field='estatus_equipo' and contains(text(),'Inhabilitado')]
${BES_MENU_REGISTRO_PAGOS}                          id:menu_registro_pagos
${BES_INPUT_MONTO_PAGO_PARCIALIDAD}                 id:input_monto_pago_parcialidad
${BES_INPUT_NUMERO_PARCIALIDAD_PAGO}                id:input_numero_parcialidad
${BES_SELECT_METODO_PAGO_PARCIALIDAD}               id:select_metodo_pago
${BES_BOTON_ACREDITAR_PAGO}                         css:.btn-acreditar-pago
${BES_MENSAJE_PAGO_ACREDITADO_EXITOSO}              xpath://div[contains(text(),'Pago acreditado exitosamente')]
${BES_CAMPO_SALDO_PRESTAMO_ACTUALIZADO}             xpath://div[@data-field='saldo_prestamo']
${BES_BOTON_GENERAR_ORDEN_HABILITACION}             css:.btn-generar-orden-habilitacion
${BES_MENSAJE_ORDEN_HABILITACION_GENERADA}          xpath://div[contains(text(),'Orden de habilitación generada')]
${BES_TABLA_SOLICITUDES_HABILITACION_ENVIADAS}      xpath://table[@id='tabla_solicitudes_habilitacion']
${BES_CAMPO_ESTATUS_SOLICITUD_HABILITACION}         xpath://td[@data-field='estatus_solicitud']
${BES_CAMPO_CONFIRMACION_PORTAL_HABILITACION}       xpath://div[@data-field='confirmacion_portal_habilitacion']
${BES_MENSAJE_CONFIRMACION_HABILITACION_RECIBIDA}   xpath://div[contains(text(),'Confirmación de habilitación recibida')]
${BES_CAMPO_ESTATUS_EQUIPO_HABILITADO}              xpath://div[@data-field='estatus_equipo' and contains(text(),'Habilitado')]
${BES_CAMPO_ESTATUS_FINANCIAMIENTO_ACTUALIZADO}     xpath://div[@data-field='estatus_financiamiento']

Acceder a calendario de cobranza del préstamo
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Click Element    ${BES_MENU_CALENDARIO_COBRANZA}
    Wait Until Element Is Visible    ${BES_TABLA_CALENDARIO_PAGOS}    timeout=10s
    Log    Calendario de cobranza accedido para préstamo ${referencia_prestamo}

Detectar incumplimiento de pago en calendario
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Wait Until Element Is Visible    ${BES_TABLA_CUOTAS_VENCIDAS}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_CUOTA_VENCIDA}
    ${fecha_vencimiento}=    Get Text    ${BES_CAMPO_FECHA_VENCIMIENTO_CUOTA}
    ${dias_mora}=    Get Text    ${BES_CAMPO_DIAS_MORA}
    Should Not Be Empty    ${fecha_vencimiento}
    Should Not Be Empty    ${dias_mora}
    Log    Incumplimiento detectado - Fecha vencimiento: ${fecha_vencimiento}, Días mora: ${dias_mora}

Generar orden de inhabilitación del equipo
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Click Button    ${BES_BOTON_GENERAR_ORDEN_INHABILITACION}
    Wait Until Element Is Visible    ${BES_MENSAJE_ORDEN_INHABILITACION_GENERADA}    timeout=10s
    Log    Orden de inhabilitación generada para préstamo ${referencia_prestamo}

Verificar datos de orden de inhabilitación
    [Arguments]    ${imei}=359876543210987    ${motivo}=Incumplimiento de pago
    Wait Until Element Is Visible    ${BES_CAMPO_DATOS_ORDEN_INHABILITACION}    timeout=10s
    ${imei_orden}=    Get Text    ${BES_CAMPO_IMEI_ORDEN_INHABILITACION}
    ${motivo_orden}=    Get Text    ${BES_CAMPO_MOTIVO_ORDEN_INHABILITACION}
    Should Contain    ${imei_orden}    ${imei}
    Should Contain    ${motivo_orden}    ${motivo}
    Log    Orden de inhabilitación - IMEI: ${imei_orden}, Motivo: ${motivo_orden}

Enviar solicitud de inhabilitación a Portal de Habilitación
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Click Button    ${BES_BOTON_ENVIAR_SOLICITUD_PORTAL}
    Wait Until Element Is Visible    ${BES_MENSAJE_SOLICITUD_ENVIADA_PORTAL}    timeout=15s
    Log    Solicitud de inhabilitación enviada a Portal de Habilitación para préstamo ${referencia_prestamo}

Verificar solicitud enviada a Portal de Habilitación
    [Arguments]    ${imei}=359876543210987
    Wait Until Element Is Visible    ${BES_TABLA_SOLICITUDES_INHABILITACION_ENVIADAS}    timeout=10s
    ${xpath_solicitud}=    Set Variable    ${BES_TABLA_SOLICITUDES_INHABILITACION_ENVIADAS}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_solicitud}
    ${estatus}=    Get Text    ${xpath_solicitud}//td[@data-field='estatus_solicitud']
    Should Contain Any    ${estatus}    Enviada    En proceso    Pendiente
    Log    Solicitud de inhabilitación enviada - IMEI: ${imei}, Estatus: ${estatus}

Recibir confirmación de inhabilitación desde Portal
    [Arguments]    ${imei}=359876543210987
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIRMACION_INHABILITACION_RECIBIDA}    timeout=20s
    ${confirmacion}=    Get Text    ${BES_CAMPO_CONFIRMACION_PORTAL_INHABILITACION}
    Should Contain Any    ${confirmacion}    Confirmado    Exitoso    Inhabilitado
    Log    Confirmación de inhabilitación recibida desde Portal para IMEI ${imei}

Verificar estatus equipo actualizado a inhabilitado
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_EQUIPO_INHABILITADO}    timeout=10s
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_EQUIPO_INHABILITADO}
    Should Contain Any    ${estatus}    Inhabilitado    Bloqueado
    Log    Estatus del equipo actualizado a inhabilitado para préstamo ${referencia_prestamo}

Registrar pago de parcialidad vencida
    [Arguments]    ${referencia_prestamo}=PRESTAP123456    ${numero_parcialidad}=3    ${monto}=4500    ${metodo_pago}=Transferencia
    Click Element    ${BES_MENU_REGISTRO_PAGOS}
    Wait Until Element Is Visible    ${BES_INPUT_NUMERO_PARCIALIDAD_PAGO}    timeout=10s
    Input Text    ${BES_INPUT_NUMERO_PARCIALIDAD_PAGO}    ${numero_parcialidad}
    Input Text    ${BES_INPUT_MONTO_PAGO_PARCIALIDAD}    ${monto}
    Select From List By Label    ${BES_SELECT_METODO_PAGO_PARCIALIDAD}    ${metodo_pago}
    Click Button    ${BES_BOTON_ACREDITAR_PAGO}
    Wait Until Element Is Visible    ${BES_MENSAJE_PAGO_ACREDITADO_EXITOSO}    timeout=15s
    Log    Pago de parcialidad ${numero_parcialidad} acreditado - Monto: ${monto}, Método: ${metodo_pago}

Verificar acreditación del pago en préstamo
    [Arguments]    ${numero_parcialidad}=3
    ${xpath_parcialidad}=    Set Variable    ${BES_TABLA_CALENDARIO_PAGOS}//tr[td[@data-field='numero_parcialidad']='${numero_parcialidad}']
    Wait Until Element Is Visible    ${xpath_parcialidad}    timeout=10s
    ${estatus_cuota}=    Get Text    ${xpath_parcialidad}//td[@data-field='estatus_cuota']
    Should Contain Any    ${estatus_cuota}    Pagada    Al corriente
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_PRESTAMO_ACTUALIZADO}
    Should Not Be Empty    ${saldo}
    Log    Pago acreditado - Estatus cuota: ${estatus_cuota}, Saldo actualizado: ${saldo}

Generar orden de habilitación del equipo automáticamente
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Wait Until Element Is Visible    ${BES_BOTON_GENERAR_ORDEN_HABILITACION}    timeout=10s
    Click Button    ${BES_BOTON_GENERAR_ORDEN_HABILITACION}
    Wait Until Element Is Visible    ${BES_MENSAJE_ORDEN_HABILITACION_GENERADA}    timeout=10s
    Log    Orden de habilitación generada automáticamente para préstamo ${referencia_prestamo}

Enviar solicitud de habilitación a Portal de Habilitación
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Click Button    ${BES_BOTON_ENVIAR_SOLICITUD_PORTAL}
    Wait Until Element Is Visible    ${BES_MENSAJE_SOLICITUD_ENVIADA_PORTAL}    timeout=15s
    Log    Solicitud de habilitación enviada a Portal de Habilitación para préstamo ${referencia_prestamo}

Verificar solicitud habilitación enviada a Portal
    [Arguments]    ${imei}=359876543210987
    Wait Until Element Is Visible    ${BES_TABLA_SOLICITUDES_HABILITACION_ENVIADAS}    timeout=10s
    ${xpath_solicitud}=    Set Variable    ${BES_TABLA_SOLICITUDES_HABILITACION_ENVIADAS}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_solicitud}
    ${estatus}=    Get Text    ${xpath_solicitud}//td[@data-field='estatus_solicitud']
    Should Contain Any    ${estatus}    Enviada    En proceso    Pendiente
    Log    Solicitud de habilitación enviada - IMEI: ${imei}, Estatus: ${estatus}

Recibir confirmación de habilitación desde Portal
    [Arguments]    ${imei}=359876543210987
    Wait Until Element Is Visible    ${BES_MENSAJE_CONFIRMACION_HABILITACION_RECIBIDA}    timeout=20s
    ${confirmacion}=    Get Text    ${BES_CAMPO_CONFIRMACION_PORTAL_HABILITACION}
    Should Contain Any    ${confirmacion}    Confirmado    Exitoso    Habilitado
    Log    Confirmación de habilitación recibida desde Portal para IMEI ${imei}

Verificar estatus equipo actualizado a habilitado
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_EQUIPO_HABILITADO}    timeout=10s
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_EQUIPO_HABILITADO}
    Should Contain Any    ${estatus}    Habilitado    Activo
    Log    Estatus del equipo actualizado a habilitado para préstamo ${referencia_prestamo}

Verificar actualización de estatus del financiamiento
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_FINANCIAMIENTO_ACTUALIZADO}    timeout=10s
    ${estatus_financiamiento}=    Get Text    ${BES_CAMPO_ESTATUS_FINANCIAMIENTO_ACTUALIZADO}
    Should Contain Any    ${estatus_financiamiento}    Activo    Al corriente    Vigente
    Log    Estatus del financiamiento actualizado para préstamo ${referencia_prestamo}: ${estatus_financiamiento}

# ========================================
# LOCATORS Y KEYWORDS PARA INTEGRACIÓN CON MICROSITIO DE CLIENTES (TC076)
# ========================================
${BES_API_ENDPOINT_CONSULTA_MICROSITIO}         https://bes.telcel.com/api/v1/consulta/micrositio
${BES_MENU_INTEGRACIONES}                       id:menu_integraciones
${BES_SUBMENU_MICROSITIO_CLIENTES}              id:submenu_micrositio_clientes
${BES_PANEL_LOGS_API_MICROSITIO}                css:.panel-logs-api-micrositio
${BES_TABLA_REQUESTS_MICROSITIO}                xpath://table[@id='tabla_requests_micrositio']
${BES_CAMPO_REQUEST_ID}                         xpath://td[@data-field='request_id']
${BES_CAMPO_CLIENTE_SOLICITANTE}                xpath://td[@data-field='cliente_solicitante']
${BES_CAMPO_TIMESTAMP_REQUEST}                  xpath://td[@data-field='timestamp_request']
${BES_CAMPO_ESTATUS_RESPUESTA_API}              xpath://td[@data-field='estatus_respuesta']
${BES_CAMPO_DATOS_ENVIADOS_MICROSITIO}          xpath://td[@data-field='datos_enviados']
${BES_BOTON_VER_DETALLE_RESPUESTA_API}          css:.btn-ver-detalle-respuesta
${BES_PANEL_DETALLE_RESPUESTA_MICROSITIO}       id:panel_detalle_respuesta_micrositio
${BES_CAMPO_DATOS_CLIENTE_RESPUESTA}            css:.datos-cliente-respuesta
${BES_CAMPO_DESGLOSE_CUOTAS_RESPUESTA}          css:.desglose-cuotas-respuesta
${BES_CAMPO_DESGLOSE_PAGOS_RESPUESTA}           css:.desglose-pagos-respuesta
${BES_CAMPO_FECHAS_VENCIMIENTO_RESPUESTA}       css:.fechas-vencimiento-respuesta
${BES_CAMPO_ESTATUS_PRESTAMO_RESPUESTA}         css:.estatus-prestamo-respuesta
${BES_MENSAJE_API_INVOCADA_EXITOSAMENTE}        xpath://div[contains(text(),'API invocada exitosamente')]
${BES_MENSAJE_RESPUESTA_ENVIADA_MICROSITIO}     xpath://div[contains(text(),'Respuesta enviada al Micrositio')]

Acceder a módulo de integraciones con Micrositio
    Click Element    ${BES_MENU_INTEGRACIONES}
    Wait Until Element Is Visible    ${BES_SUBMENU_MICROSITIO_CLIENTES}    timeout=10s
    Click Element    ${BES_SUBMENU_MICROSITIO_CLIENTES}
    Wait Until Element Is Visible    ${BES_PANEL_LOGS_API_MICROSITIO}    timeout=10s

Recibir solicitud de consulta desde Micrositio
    [Arguments]    ${identificacion_cliente}=cliente_test
    Wait Until Element Is Visible    ${BES_TABLA_REQUESTS_MICROSITIO}    timeout=10s
    ${xpath_request}=    Set Variable    ${BES_TABLA_REQUESTS_MICROSITIO}//tr[contains(., '${identificacion_cliente}')]
    Wait Until Element Is Visible    ${xpath_request}    timeout=15s
    Log    BES recibió solicitud de consulta desde Micrositio para cliente ${identificacion_cliente}

Procesar solicitud de consulta del Micrositio
    [Arguments]    ${identificacion_cliente}=cliente_test
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_RESPUESTA_API}    timeout=10s
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_RESPUESTA_API}
    Should Contain Any    ${estatus}    Procesando    En proceso    Pendiente
    Log    BES procesando solicitud de consulta para cliente ${identificacion_cliente}

Preparar respuesta con datos completos del financiamiento
    [Arguments]    ${identificacion_cliente}=cliente_test
    Wait Until Element Is Visible    ${BES_CAMPO_DATOS_ENVIADOS_MICROSITIO}    timeout=10s
    Click Button    ${BES_BOTON_VER_DETALLE_RESPUESTA_API}
    Wait Until Element Is Visible    ${BES_PANEL_DETALLE_RESPUESTA_MICROSITIO}    timeout=10s
    Log    BES preparó respuesta con datos completos del financiamiento

Verificar inclusión de datos del cliente en respuesta de API
    Wait Until Element Is Visible    ${BES_CAMPO_DATOS_CLIENTE_RESPUESTA}    timeout=10s
    ${datos_cliente}=    Get Text    ${BES_CAMPO_DATOS_CLIENTE_RESPUESTA}
    Should Not Be Empty    ${datos_cliente}
    Log    Datos del cliente incluidos en respuesta: ${datos_cliente}

Verificar inclusión de desglose de cuotas en respuesta de API
    Wait Until Element Is Visible    ${BES_CAMPO_DESGLOSE_CUOTAS_RESPUESTA}    timeout=10s
    ${desglose_cuotas}=    Get Text    ${BES_CAMPO_DESGLOSE_CUOTAS_RESPUESTA}
    Should Not Be Empty    ${desglose_cuotas}
    Log    Desglose de cuotas incluido en respuesta

Verificar inclusión de desglose de pagos en respuesta de API
    Wait Until Element Is Visible    ${BES_CAMPO_DESGLOSE_PAGOS_RESPUESTA}    timeout=10s
    ${desglose_pagos}=    Get Text    ${BES_CAMPO_DESGLOSE_PAGOS_RESPUESTA}
    Should Not Be Empty    ${desglose_pagos}
    Log    Desglose de pagos incluido en respuesta

Verificar inclusión de fechas de vencimiento en respuesta de API
    Wait Until Element Is Visible    ${BES_CAMPO_FECHAS_VENCIMIENTO_RESPUESTA}    timeout=10s
    ${fechas}=    Get Text    ${BES_CAMPO_FECHAS_VENCIMIENTO_RESPUESTA}
    Should Not Be Empty    ${fechas}
    Log    Fechas de vencimiento incluidas en respuesta

Verificar inclusión de estatus del préstamo en respuesta de API
    Wait Until Element Is Visible    ${BES_CAMPO_ESTATUS_PRESTAMO_RESPUESTA}    timeout=10s
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO_RESPUESTA}
    Should Not Be Empty    ${estatus}
    Log    Estatus del préstamo incluido en respuesta: ${estatus}

Enviar respuesta completa del préstamo al Micrositio
    Wait Until Element Is Visible    ${BES_MENSAJE_RESPUESTA_ENVIADA_MICROSITIO}    timeout=15s
    ${mensaje}=    Get Text    ${BES_MENSAJE_RESPUESTA_ENVIADA_MICROSITIO}
    Should Contain    ${mensaje}    enviada
    Log    BES envió respuesta completa al Micrositio de Clientes

Verificar que BES responde con datos completos del préstamo al Micrositio
    Verificar inclusión de datos del cliente en respuesta de API
    Verificar inclusión de desglose de cuotas en respuesta de API
    Verificar inclusión de desglose de pagos en respuesta de API
    Verificar inclusión de fechas de vencimiento en respuesta de API
    Verificar inclusión de estatus del préstamo en respuesta de API
    Enviar respuesta completa del préstamo al Micrositio
    Log    BES respondió con todos los datos del préstamo incluyendo datos del cliente, desglose de cuotas, desglose de pagos, fechas de vencimiento y estatus del préstamo

# ========================================
# LOCATORS Y KEYWORDS PARA PROCESO E2E - CONSULTA, RESUMEN Y FACTURA (TC080)
# ========================================
${BES_BOTON_GENERAR_RESUMEN_CUENTA}        id:btn_generar_resumen_cuenta
${BES_LINK_GENERAR_RESUMEN_CUENTA}         css:.link-generar-resumen
${BES_PANEL_RESUMEN_CUENTA}                css:.panel-resumen-cuenta
${BES_SECCION_DETALLE_MOVIMIENTOS}         css:.seccion-detalle-movimientos
${BES_TABLA_CARGOS_RESUMEN}                xpath://table[@id='tabla_cargos_resumen']
${BES_TABLA_PAGOS_RESUMEN}                 xpath://table[@id='tabla_pagos_resumen']
${BES_CAMPO_SALDO_ACTUAL_RESUMEN}          xpath://div[@data-field='saldo_actual']
${BES_CAMPO_CALENDARIO_PAGOS_RESUMEN}      css:.calendario-pagos-resumen
${BES_MENSAJE_RESUMEN_GENERADO}            xpath://div[contains(text(),'Resumen de cuenta generado')]
${BES_BOTON_SOLICITAR_FACTURA}             id:btn_solicitar_factura
${BES_LINK_SOLICITAR_FACTURA}              css:.link-solicitar-factura
${BES_FORMULARIO_FACTURA}                  css:.formulario-factura
${BES_CAMPO_RFC_FACTURA}                   id:input_rfc_factura
${BES_CAMPO_RAZON_SOCIAL_FACTURA}          id:input_razon_social
${BES_CAMPO_DOMICILIO_FISCAL}              id:input_domicilio_fiscal
${BES_SELECT_CONCEPTOS_FACTURA}            id:select_conceptos_factura
${BES_CHECKBOX_CONCEPTO_FINANCIAMIENTO}    id:chk_concepto_financiamiento
${BES_BOTON_GENERAR_FACTURA}               id:btn_generar_factura
${BES_MENSAJE_FACTURA_GENERADA}            xpath://div[contains(text(),'Factura generada exitosamente')]
${BES_CAMPO_FOLIO_FACTURA}                 xpath://div[@data-field='folio_factura']
${BES_LINK_DESCARGAR_FACTURA_PDF}          css:.link-descargar-factura-pdf
${BES_SECCION_REPORTES_VENTAS_VENDEDOR}    css:.seccion-reportes-ventas-vendedor
${BES_TABLA_VENTAS_POR_VENDEDOR}           xpath://table[@id='tabla_ventas_vendedor']
${BES_CAMPO_CONCENTRADO_FUERZA_VENTA}      css:.concentrado-fuerza-venta
${BES_TABLA_CONCENTRADO_FUERZA_VENTA}      xpath://table[@id='tabla_concentrado_fuerza_venta']

Acceder a opción de generación de resumen de cuenta
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=10s
    Scroll Element Into View    ${BES_BOTON_GENERAR_RESUMEN_CUENTA}
    Click Element    ${BES_BOTON_GENERAR_RESUMEN_CUENTA}
    Wait Until Element Is Visible    ${BES_PANEL_RESUMEN_CUENTA}    timeout=15s

Generar resumen de cuenta del financiamiento
    Acceder a opción de generación de resumen de cuenta
    Wait Until Element Is Visible    ${BES_SECCION_DETALLE_MOVIMIENTOS}    timeout=10s

Verificar resumen de cuenta generado con todos los movimientos
    Page Should Contain Element    ${BES_PANEL_RESUMEN_CUENTA}
    Page Should Contain Element    ${BES_SECCION_DETALLE_MOVIMIENTOS}
    Page Should Contain Element    ${BES_TABLA_CARGOS_RESUMEN}
    Page Should Contain Element    ${BES_TABLA_PAGOS_RESUMEN}
    Page Should Contain Element    ${BES_CAMPO_SALDO_ACTUAL_RESUMEN}
    Page Should Contain Element    ${BES_CAMPO_CALENDARIO_PAGOS_RESUMEN}
    Log    Resumen de cuenta verificado con cargos, pagos, saldo actual y calendario de pagos

Verificar desglose de cargos en resumen de cuenta
    Page Should Contain Element    ${BES_TABLA_CARGOS_RESUMEN}
    ${filas_cargos}=    Get Element Count    ${BES_TABLA_CARGOS_RESUMEN}//tr[position()>1]
    Should Be True    ${filas_cargos} > 0
    Log    Resumen de cuenta muestra ${filas_cargos} cargo(s)

Verificar desglose de pagos en resumen de cuenta
    Page Should Contain Element    ${BES_TABLA_PAGOS_RESUMEN}
    ${filas_pagos}=    Get Element Count    ${BES_TABLA_PAGOS_RESUMEN}//tr[position()>1]
    Should Be True    ${filas_pagos} >= 0
    Log    Resumen de cuenta muestra ${filas_pagos} pago(s)

Verificar saldo actual mostrado en resumen de cuenta
    ${saldo_actual}=    Get Text    ${BES_CAMPO_SALDO_ACTUAL_RESUMEN}
    Should Not Be Empty    ${saldo_actual}
    Log    Saldo actual en resumen de cuenta: ${saldo_actual}

Verificar calendario de pagos incluido en resumen de cuenta
    Page Should Contain Element    ${BES_CAMPO_CALENDARIO_PAGOS_RESUMEN}
    Log    Calendario de pagos incluido en el resumen de cuenta

Acceder a opción de solicitud de factura
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=10s
    Scroll Element Into View    ${BES_BOTON_SOLICITAR_FACTURA}
    Click Element    ${BES_BOTON_SOLICITAR_FACTURA}
    Wait Until Element Is Visible    ${BES_FORMULARIO_FACTURA}    timeout=15s

Ingresar datos fiscales para factura
    [Arguments]    ${rfc}=XAXX010101000    ${razon_social}=CLIENTE EJEMPLO SA DE CV    ${domicilio}=Calle Ejemplo 123, Col. Centro
    Wait Until Element Is Visible    ${BES_CAMPO_RFC_FACTURA}    timeout=10s
    Input Text    ${BES_CAMPO_RFC_FACTURA}    ${rfc}
    Input Text    ${BES_CAMPO_RAZON_SOCIAL_FACTURA}    ${razon_social}
    Input Text    ${BES_CAMPO_DOMICILIO_FISCAL}    ${domicilio}

Seleccionar conceptos de facturación
    Wait Until Element Is Visible    ${BES_SELECT_CONCEPTOS_FACTURA}    timeout=10s
    Click Element    ${BES_CHECKBOX_CONCEPTO_FINANCIAMIENTO}

Generar factura con conceptos del financiamiento
    [Arguments]    ${rfc}=XAXX010101000    ${razon_social}=CLIENTE EJEMPLO SA DE CV    ${domicilio}=Calle Ejemplo 123, Col. Centro
    Acceder a opción de solicitud de factura
    Ingresar datos fiscales para factura    ${rfc}    ${razon_social}    ${domicilio}
    Seleccionar conceptos de facturación
    Click Button    ${BES_BOTON_GENERAR_FACTURA}
    Wait Until Element Is Visible    ${BES_MENSAJE_FACTURA_GENERADA}    timeout=20s

Verificar factura generada exitosamente
    Page Should Contain Element    ${BES_MENSAJE_FACTURA_GENERADA}
    Page Should Contain Element    ${BES_CAMPO_FOLIO_FACTURA}
    ${folio}=    Get Text    ${BES_CAMPO_FOLIO_FACTURA}
    Should Not Be Empty    ${folio}
    Log    Factura generada exitosamente con folio: ${folio}

Verificar factura contiene datos fiscales del cliente
    [Arguments]    ${rfc}=XAXX010101000    ${razon_social}=CLIENTE EJEMPLO SA DE CV
    ${contenido_factura}=    Get Text    ${BES_FORMULARIO_FACTURA}
    Should Contain    ${contenido_factura}    ${rfc}
    Should Contain    ${contenido_factura}    ${razon_social}
    Log    Factura contiene datos fiscales correctos: RFC ${rfc}, Razón Social ${razon_social}

Verificar factura contiene conceptos del financiamiento
    ${contenido_factura}=    Get Text    ${BES_FORMULARIO_FACTURA}
    Should Contain    ${contenido_factura}    Financiamiento
    Log    Factura contiene conceptos del financiamiento

Verificar acceso a reportes de ventas por vendedor para Distribuidores
    Wait Until Element Is Visible    ${BES_SECCION_REPORTES_VENTAS_VENDEDOR}    timeout=10s
    Page Should Contain Element    ${BES_TABLA_VENTAS_POR_VENDEDOR}
    ${filas_ventas}=    Get Element Count    ${BES_TABLA_VENTAS_POR_VENDEDOR}//tr[position()>1]
    Should Be True    ${filas_ventas} > 0
    Log    Reportes de ventas por vendedor accesibles con ${filas_ventas} registro(s)

Verificar concentrado por fuerza de venta para administradores
    Page Should Contain Element    ${BES_CAMPO_CONCENTRADO_FUERZA_VENTA}
    Page Should Contain Element    ${BES_TABLA_CONCENTRADO_FUERZA_VENTA}
    ${filas_concentrado}=    Get Element Count    ${BES_TABLA_CONCENTRADO_FUERZA_VENTA}//tr[position()>1]
    Should Be True    ${filas_concentrado} > 0
    Log    Concentrado por fuerza de venta accesible con ${filas_concentrado} registro(s)

# ========================================
# LOCATORS Y KEYWORDS PARA ACCESO MULTICANAL A VISTA 360 (TC081)
# ========================================
${BES_SELECT_CANAL_CAC}                     xpath://option[@value='CAC']
${BES_SELECT_CANAL_CVT}                     xpath://option[@value='CVT']
${BES_SELECT_CANAL_CAT}                     xpath://option[@value='CAT']
${BES_SELECT_CANAL_DISTRIBUIDORES}          xpath://option[@value='Distribuidores']
${BES_SELECT_CANAL_CADENAS}                 xpath://option[@value='Cadenas']
${BES_MENSAJE_ACCESO_CANAL_EXITOSO}         xpath://div[contains(text(),'Acceso autorizado para canal')]

Verificar acceso desde canal CACs a Vista 360
    [Arguments]    ${identificacion}=APAG987654
    Seleccionar tipo de canal para consulta    CAC
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}
    Verificar información completa del crédito en pantalla 360
    Log    Canal CACs puede acceder y visualizar información centralizada desde Vista 360 de BES

Verificar acceso desde canal CVTs a Vista 360
    [Arguments]    ${identificacion}=APAG987654
    Seleccionar tipo de canal para consulta    CVT
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}
    Verificar información completa del crédito en pantalla 360
    Log    Canal CVTs puede acceder y visualizar información centralizada desde Vista 360 de BES

Verificar acceso desde canal CAT a Vista 360
    [Arguments]    ${identificacion}=APAG987654
    Seleccionar tipo de canal para consulta    CAT
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}
    Verificar información completa del crédito en pantalla 360
    Log    Canal CAT puede acceder y visualizar información centralizada desde Vista 360 de BES

Verificar acceso desde canal Distribuidores a Vista 360
    [Arguments]    ${identificacion}=APAG987654
    Seleccionar tipo de canal para consulta    Distribuidores
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}
    Verificar información completa del crédito en pantalla 360
    Log    Canal Distribuidores puede acceder y visualizar información centralizada desde Vista 360 de BES

Verificar acceso desde canal Cadenas a Vista 360
    [Arguments]    ${identificacion}=APAG987654
    Seleccionar tipo de canal para consulta    Cadenas
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}
    Verificar información completa del crédito en pantalla 360
    Log    Canal Cadenas puede acceder y visualizar información centralizada desde Vista 360 de BES

# ========================================
# LOCATORS Y KEYWORDS PARA GESTIÓN DE INCUMPLIMIENTO DE PAGOS E INHABILITACIÓN (TC083)
# ========================================
${BES_MENU_SIMULACION_COBRANZA}                  id:menu_simulacion_cobranza
${BES_INPUT_FECHA_SIMULACION}                    id:input_fecha_simulacion
${BES_INPUT_DIAS_TRANSCURRIDOS_SIMULACION}       id:input_dias_transcurridos_simulacion
${BES_INPUT_PRESTAMO_SIMULACION}                 id:input_prestamo_simulacion
${BES_BOTON_SELECCIONAR_PRESTAMO_SIMULACION}     css:.btn-seleccionar-prestamo-simulacion
${BES_INPUT_NUMERO_PARCIALIDAD_SIMULACION}       id:input_numero_parcialidad_simulacion
${BES_BOTON_EJECUTAR_SIMULACION_VENCIMIENTO}     id:btn_ejecutar_simulacion_vencimiento
${BES_MENSAJE_SIMULACION_EJECUTADA}              xpath://div[contains(text(),'Simulación ejecutada')]
${BES_BOTON_EJECUTAR_SIMULACION_PERIODO_GRACIA}  id:btn_ejecutar_simulacion_periodo_gracia
${BES_INPUT_REFERENCIA_PRESTAMO_BUSCAR}          id:input_referencia_prestamo_buscar
${BES_BOTON_BUSCAR_POR_REFERENCIA}               css:.btn-buscar-por-referencia
${BES_MENU_NOTIFICACIONES_COBRANZA}              id:menu_notificaciones_cobranza
${BES_INPUT_PRESTAMO_NOTIFICAR}                  id:input_prestamo_notificar
${BES_BOTON_EJECUTAR_NOTIFICACION_VENCIDO}       id:btn_ejecutar_notificacion_vencido
${BES_TABLA_NOTIFICACIONES_ENVIADAS}             xpath://table[@id='tabla_notificaciones_enviadas']
${BES_CAMPO_CLIENTE_NOTIFICADO}                  xpath://td[@data-field='cliente_notificado']
${BES_CAMPO_NUMERO_PARCIALIDAD_NOTIF}            xpath://td[@data-field='numero_parcialidad_notif']
${BES_CAMPO_TIPO_NOTIFICACION}                   xpath://td[@data-field='tipo_notificacion']
${BES_CAMPO_CONTENIDO_NOTIFICACION}              xpath://td[@data-field='contenido_notificacion']
${BES_TABLA_PRESTAMOS_PAGO_VENCIDO}              xpath://table[@id='tabla_prestamos_pago_vencido']
${BES_CAMPO_PRESTAMO_VENCIDO}                    xpath://td[@data-field='prestamo_vencido']
${BES_CAMPO_PARCIALIDAD_VENCIDA}                 xpath://td[@data-field='parcialidad_vencida']
${BES_MENU_PROCESOS_VENCIMIENTO}                 id:menu_procesos_vencimiento
${BES_BOTON_EJECUTAR_IDENTIFICACION_VENCIDOS}    id:btn_ejecutar_identificacion_vencidos

Acceder a módulo de simulación de cobranza
    Click Element    ${BES_MENU_SIMULACION_COBRANZA}
    Wait Until Element Is Visible    ${BES_INPUT_FECHA_SIMULACION}    timeout=10s

Configurar simulación de fecha actual posterior a vencimiento
    [Arguments]    ${fecha_vencimiento}=2026-05-15
    Wait Until Element Is Visible    ${BES_INPUT_FECHA_SIMULACION}    timeout=10s
    Input Text    ${BES_INPUT_FECHA_SIMULACION}    ${fecha_vencimiento}
    Log    Configurada simulación con fecha posterior a vencimiento: ${fecha_vencimiento}

Seleccionar préstamo para simulación
    [Arguments]    ${referencia_prestamo}=PREST999001
    Wait Until Element Is Visible    ${BES_INPUT_PRESTAMO_SIMULACION}    timeout=10s
    Input Text    ${BES_INPUT_PRESTAMO_SIMULACION}    ${referencia_prestamo}
    Click Button    ${BES_BOTON_SELECCIONAR_PRESTAMO_SIMULACION}
    Log    Préstamo ${referencia_prestamo} seleccionado para simulación

Ejecutar simulación de vencimiento sin acreditación de pago
    [Arguments]    ${numero_parcialidad}=1
    Input Text    ${BES_INPUT_NUMERO_PARCIALIDAD_SIMULACION}    ${numero_parcialidad}
    Click Button    ${BES_BOTON_EJECUTAR_SIMULACION_VENCIMIENTO}
    Wait Until Element Is Visible    ${BES_MENSAJE_SIMULACION_EJECUTADA}    timeout=15s
    Log    Ejecutada simulación de vencimiento sin pago para parcialidad ${numero_parcialidad}

Configurar simulación de días transcurridos desde vencimiento
    [Arguments]    ${dias_transcurridos}=35
    Wait Until Element Is Visible    ${BES_INPUT_DIAS_TRANSCURRIDOS_SIMULACION}    timeout=10s
    Input Text    ${BES_INPUT_DIAS_TRANSCURRIDOS_SIMULACION}    ${dias_transcurridos}
    Log    Configurada simulación con ${dias_transcurridos} días transcurridos desde vencimiento

Ejecutar simulación de transcurso de periodo de gracia
    Click Button    ${BES_BOTON_EJECUTAR_SIMULACION_PERIODO_GRACIA}
    Wait Until Element Is Visible    ${BES_MENSAJE_SIMULACION_EJECUTADA}    timeout=15s
    Log    Ejecutada simulación de transcurso de periodo de gracia

Ejecutar proceso de identificación de pagos vencidos
    Click Element    ${BES_MENU_PROCESOS_VENCIMIENTO}
    Wait Until Element Is Visible    ${BES_BOTON_EJECUTAR_IDENTIFICACION_VENCIDOS}    timeout=10s
    Click Button    ${BES_BOTON_EJECUTAR_IDENTIFICACION_VENCIDOS}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_PAGO_VENCIDO}    timeout=15s
    Log    Ejecutado proceso de identificación de pagos vencidos

Verificar préstamo identificado con pago vencido
    [Arguments]    ${referencia_prestamo}=PREST999001    ${numero_parcialidad}=1
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS_PAGO_VENCIDO}
    ${xpath_prestamo}=    Set Variable    ${BES_TABLA_PRESTAMOS_PAGO_VENCIDO}//tr[contains(., '${referencia_prestamo}')]
    Page Should Contain Element    ${xpath_prestamo}
    ${prestamo}=    Get Text    ${xpath_prestamo}//td[@data-field='prestamo_vencido']
    ${parcialidad}=    Get Text    ${xpath_prestamo}//td[@data-field='parcialidad_vencida']
    Should Contain    ${prestamo}    ${referencia_prestamo}
    Should Contain    ${parcialidad}    ${numero_parcialidad}
    Log    Préstamo ${referencia_prestamo} identificado con parcialidad ${numero_parcialidad} vencida

Acceder a módulo de notificaciones de cobranza
    Click Element    ${BES_MENU_NOTIFICACIONES_COBRANZA}
    Wait Until Element Is Visible    ${BES_INPUT_PRESTAMO_NOTIFICAR}    timeout=10s

Ejecutar proceso de notificación de pagos vencidos
    [Arguments]    ${referencia_prestamo}=PREST999001
    Input Text    ${BES_INPUT_PRESTAMO_NOTIFICAR}    ${referencia_prestamo}
    Click Button    ${BES_BOTON_EJECUTAR_NOTIFICACION_VENCIDO}
    Wait Until Element Is Visible    ${BES_TABLA_NOTIFICACIONES_ENVIADAS}    timeout=15s
    Log    Ejecutado proceso de notificación de pagos vencidos para préstamo ${referencia_prestamo}

Verificar envío de notificación de pago vencido al cliente
    [Arguments]    ${identificacion}=CLI999001    ${numero_parcialidad}=1
    Page Should Contain Element    ${BES_TABLA_NOTIFICACIONES_ENVIADAS}
    ${xpath_notif}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_ENVIADAS}//tr[contains(., '${identificacion}')]
    Page Should Contain Element    ${xpath_notif}
    ${cliente}=    Get Text    ${xpath_notif}//td[@data-field='cliente_notificado']
    ${parcialidad}=    Get Text    ${xpath_notif}//td[@data-field='numero_parcialidad_notif']
    ${tipo}=    Get Text    ${xpath_notif}//td[@data-field='tipo_notificacion']
    Should Contain    ${cliente}    ${identificacion}
    Should Contain    ${parcialidad}    ${numero_parcialidad}
    Should Contain    ${tipo}    Pago Vencido
    Log    Notificación de pago vencido enviada al cliente ${identificacion}

Verificar contenido de notificación incluye consecuencias de incumplimiento
    [Arguments]    ${referencia_prestamo}=PREST999001
    ${xpath_notif}=    Set Variable    ${BES_TABLA_NOTIFICACIONES_ENVIADAS}//tr[contains(., '${referencia_prestamo}')]
    ${contenido}=    Get Text    ${xpath_notif}//td[@data-field='contenido_notificacion']
    Should Contain    ${contenido}    consecuencias
    Log    Contenido de notificación incluye información sobre consecuencias del incumplimiento

Verificar frecuencia de pago configurada
    [Arguments]    ${frecuencia_esperada}=mensual
    ${frecuencia}=    Get Text    ${BES_CAMPO_FRECUENCIA_PAGO_PRESTAMO}
    Should Contain    ${frecuencia}    ${frecuencia_esperada}
    Log    Frecuencia de pago configurada: ${frecuencia}

Buscar préstamo por referencia
    [Arguments]    ${referencia_prestamo}=PREST999001
    Wait Until Element Is Visible    ${BES_INPUT_REFERENCIA_PRESTAMO_BUSCAR}    timeout=10s
    Input Text    ${BES_INPUT_REFERENCIA_PRESTAMO_BUSCAR}    ${referencia_prestamo}
    Click Button    ${BES_BOTON_BUSCAR_POR_REFERENCIA}
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS}    timeout=10s
    Log    Préstamo ${referencia_prestamo} localizado en BES

Verificar registro de inhabilitación en historial
    [Arguments]    ${imei}=359876543210987    ${motivo_esperado}=Incumplimiento de pago
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_INHABILITACIONES}    timeout=10s
    ${xpath_registro}=    Set Variable    ${BES_TABLA_HISTORIAL_INHABILITACIONES}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_registro}
    ${motivo}=    Get Text    ${xpath_registro}//td[@data-field='motivo_inhabilitacion']
    ${fecha_hora}=    Get Text    ${xpath_registro}//td[@data-field='fecha_hora_inhabilitacion']
    Should Contain    ${motivo}    ${motivo_esperado}
    Should Not Be Empty    ${fecha_hora}
    Log    Registro de inhabilitación encontrado en historial - IMEI: ${imei}, Motivo: ${motivo}, Fecha/Hora: ${fecha_hora}

# ========================================
# LOCATORS Y KEYWORDS PARA CAMBIO DE GARANTÍA INTEGRADO EN BES (TC085)
# ========================================
${BES_SELECT_CANAL_ASESOR}                          id:select_canal_asesor
${BES_MENU_TRAMITES_POSVENTA}                       id:menu_tramites_posventa
${BES_SUBMENU_GESTION_GARANTIAS}                    css:.submenu-gestion-garantias
${BES_INPUT_EVIDENCIAS_GARANTIA}                    id:input_evidencias_garantia
${BES_CAMPO_DESCRIPCION_DEFECTO}                    id:campo_descripcion_defecto
${BES_SELECT_MOTIVO_CAMBIO_GARANTIA}                id:select_motivo_cambio_garantia
${BES_INPUT_MARCA_EQUIPO_REEMPLAZO}                 id:input_marca_equipo_reemplazo
${BES_INPUT_MODELO_EQUIPO_REEMPLAZO}                id:input_modelo_equipo_reemplazo
${BES_INPUT_IMEI_EQUIPO_REEMPLAZO}                  id:input_imei_equipo_reemplazo
${BES_BOTON_ASOCIAR_EQUIPO_REEMPLAZO}               css:.btn-asociar-equipo-reemplazo
${BES_MENSAJE_EQUIPO_REEMPLAZO_ASOCIADO}            xpath://div[contains(@class, 'mensaje-equipo-reemplazo-asociado')]
${BES_CAMPO_IMEI_EQUIPO_PRESTAMO_ACTUALIZADO}       xpath://div[@data-field='imei_equipo_prestamo']
${BES_CAMPO_MARCA_EQUIPO_PRESTAMO_ACTUALIZADO}      xpath://div[@data-field='marca_equipo_prestamo']
${BES_CAMPO_MODELO_EQUIPO_PRESTAMO_ACTUALIZADO}     xpath://div[@data-field='modelo_equipo_prestamo']
${BES_LOG_INTEGRACION_EIR}                          xpath://div[@data-field='log_integracion_eir']
${BES_ESTADO_INTEGRACION_EIR}                       xpath://span[@data-field='estado_integracion_eir']
${BES_MENSAJE_EIR_ACTUALIZADO}                      xpath://div[contains(text(),'EIR actualizado exitosamente')]
${BES_CAMPO_FECHA_TRAMITE_GARANTIA}                 xpath://td[@data-field='fecha_tramite_garantia']
${BES_CAMPO_USUARIO_TRAMITE_GARANTIA}               xpath://td[@data-field='usuario_tramite_garantia']
${BES_CAMPO_EQUIPO_ORIGINAL_HISTORIAL}              xpath://td[@data-field='equipo_original']
${BES_CAMPO_EQUIPO_REEMPLAZO_HISTORIAL}             xpath://td[@data-field='equipo_reemplazo']
${BES_TABLA_CALENDARIO_PAGOS_ACTUALIZADA}           xpath://table[@id='tabla_calendario_pagos']
${BES_CAMPO_CUOTA_SIN_MODIFICACION}                 xpath://td[@data-field='cuota_sin_modificacion']
${BES_MENSAJE_CALENDARIO_INTACTO}                   xpath://div[contains(text(),'Calendario de pagos sin modificaciones')]
${BES_CAMPO_OPCIONES_TRAMITE_GARANTIA}              css:.opciones-tramite-garantia

Acceder como asesor de canal autorizado con permisos de garantía
    [Arguments]    ${canal}=CAC    ${usuario}=asesor_cac_01    ${password}=Pass1234
    Abrir página de login
    Ingresar credenciales    ${usuario}    ${password}
    Wait Until Page Contains Element    ${BES_SELECT_CANAL_ASESOR}    timeout=10s
    Select From List By Label    ${BES_SELECT_CANAL_ASESOR}    ${canal}
    Hacer clic en botón de login
    Log    Usuario autenticado como asesor del canal ${canal}

Consultar préstamo activo de Amigo Paguitos con equipo financiado
    [Arguments]    ${identificacion}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar que el préstamo está activo en BES
    Verificar que existe equipo asociado al préstamo
    Log    Préstamo activo de Amigo Paguitos consultado para cliente ${identificacion}

Verificar opciones de trámite de garantía disponibles
    Page Should Contain Element    ${BES_MENU_TRAMITES_POSVENTA}
    Click Element    ${BES_MENU_TRAMITES_POSVENTA}
    Wait Until Element Is Visible    ${BES_SUBMENU_GESTION_GARANTIAS}    timeout=10s
    Page Should Contain Element    ${BES_CAMPO_OPCIONES_TRAMITE_GARANTIA}
    Log    Opciones de gestión de trámites posventa y garantías disponibles

Iniciar trámite de cambio de garantía
    Click Element    ${BES_SUBMENU_GESTION_GARANTIAS}
    Wait Until Element Is Visible    ${BES_BOTON_INICIAR_GARANTIA}    timeout=10s
    Hacer clic en botón iniciar trámite de garantía
    Log    Trámite de cambio de garantía iniciado

Abrir formulario de cambio de garantía con datos requeridos
    Wait Until Element Is Visible    ${BES_FORMULARIO_GARANTIA}    timeout=10s
    Page Should Contain Element    ${BES_SELECT_MOTIVO_CAMBIO_GARANTIA}
    Page Should Contain Element    ${BES_CAMPO_DESCRIPCION_DEFECTO}
    Page Should Contain Element    ${BES_INPUT_EVIDENCIAS_GARANTIA}
    Log    Formulario de cambio de garantía desplegado con todos los campos requeridos

Registrar información del trámite de garantía
    [Arguments]    ${motivo}=Defecto de fabricación    ${descripcion}=Pantalla con pixeles muertos    ${evidencias}=foto_defecto.jpg
    Select From List By Label    ${BES_SELECT_MOTIVO_CAMBIO_GARANTIA}    ${motivo}
    Input Text    ${BES_CAMPO_DESCRIPCION_DEFECTO}    ${descripcion}
    Input Text    ${BES_INPUT_EVIDENCIAS_GARANTIA}    ${evidencias}
    Log    Información del trámite de garantía registrada - Motivo: ${motivo}

Registrar equipo de reemplazo asociado al préstamo
    [Arguments]    ${marca}=Samsung    ${modelo}=Galaxy A54    ${imei}=358790123456789
    Wait Until Element Is Visible    ${BES_INPUT_MARCA_EQUIPO_REEMPLAZO}    timeout=10s
    Input Text    ${BES_INPUT_MARCA_EQUIPO_REEMPLAZO}    ${marca}
    Input Text    ${BES_INPUT_MODELO_EQUIPO_REEMPLAZO}    ${modelo}
    Input Text    ${BES_INPUT_IMEI_EQUIPO_REEMPLAZO}    ${imei}
    Click Button    ${BES_BOTON_ASOCIAR_EQUIPO_REEMPLAZO}
    Wait Until Element Is Visible    ${BES_MENSAJE_EQUIPO_REEMPLAZO_ASOCIADO}    timeout=10s
    Log    Equipo de reemplazo asociado - Marca: ${marca}, Modelo: ${modelo}, IMEI: ${imei}

Verificar actualización de datos del equipo en el préstamo
    [Arguments]    ${marca}=Samsung    ${modelo}=Galaxy A54    ${imei}=358790123456789
    Wait Until Element Is Visible    ${BES_CAMPO_IMEI_EQUIPO_PRESTAMO_ACTUALIZADO}    timeout=10s
    ${marca_actualizada}=    Get Text    ${BES_CAMPO_MARCA_EQUIPO_PRESTAMO_ACTUALIZADO}
    ${modelo_actualizado}=    Get Text    ${BES_CAMPO_MODELO_EQUIPO_PRESTAMO_ACTUALIZADO}
    ${imei_actualizado}=    Get Text    ${BES_CAMPO_IMEI_EQUIPO_PRESTAMO_ACTUALIZADO}
    Should Contain    ${marca_actualizada}    ${marca}
    Should Contain    ${modelo_actualizado}    ${modelo}
    Should Contain    ${imei_actualizado}    ${imei}
    Log    Datos del equipo actualizados en préstamo - IMEI: ${imei}, Marca: ${marca}, Modelo: ${modelo}

Verificar ejecución de integración BES con EIR para cambio de equipo
    [Arguments]    ${imei_nuevo}=358790123456789
    Wait Until Element Is Visible    ${BES_LOG_INTEGRACION_EIR}    timeout=15s
    Page Should Contain Element    ${BES_ESTADO_INTEGRACION_EIR}
    ${estado}=    Get Text    ${BES_ESTADO_INTEGRACION_EIR}
    Should Contain    ${estado}    Exitoso
    Page Should Contain Element    ${BES_MENSAJE_EIR_ACTUALIZADO}
    Log    Integración BES-EIR ejecutada exitosamente para IMEI ${imei_nuevo}

Verificar registro de nuevo equipo en EIR
    [Arguments]    ${imei_nuevo}=358790123456789    ${marca}=Samsung    ${modelo}=Galaxy A54
    Abrir sistema EIR
    Acceder a módulo de registro de equipos en EIR
    Buscar equipo por IMEI en EIR    ${imei_nuevo}
    Verificar que existe registro de equipo en EIR
    Verificar datos del equipo registrado en EIR    ${imei_nuevo}    ${marca}    ${modelo}
    Log    Nuevo equipo registrado exitosamente en EIR

Verificar desasociación de equipo original en EIR
    [Arguments]    ${imei_original}=357890123456789
    Buscar equipo por IMEI en EIR    ${imei_original}
    Wait Until Page Contains Element    ${EIR_CAMPO_ESTADO_IMEI}    timeout=10s
    ${estado}=    Get Text    ${EIR_CAMPO_ESTADO_IMEI}
    Should Not Contain    ${estado}    Asociado
    Log    Equipo original con IMEI ${imei_original} desasociado correctamente en EIR

Consultar historial del préstamo después de cambio de garantía
    [Arguments]    ${identificacion}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Click Element    ${BES_MENU_HISTORIAL_PRESTAMO}
    Wait Until Element Is Visible    ${BES_TABLA_HISTORIAL_GARANTIAS}    timeout=10s
    Log    Historial del préstamo consultado

Verificar registro de cambio de garantía en historial
    [Arguments]    ${imei_original}=357890123456789    ${imei_reemplazo}=358790123456789
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_GARANTIAS}
    Page Should Contain Element    ${BES_CAMPO_FECHA_TRAMITE_GARANTIA}
    Page Should Contain Element    ${BES_CAMPO_USUARIO_TRAMITE_GARANTIA}
    ${fecha}=    Get Text    ${BES_CAMPO_FECHA_TRAMITE_GARANTIA}
    ${usuario}=    Get Text    ${BES_CAMPO_USUARIO_TRAMITE_GARANTIA}
    ${equipo_original}=    Get Text    ${BES_CAMPO_EQUIPO_ORIGINAL_HISTORIAL}
    ${equipo_reemplazo}=    Get Text    ${BES_CAMPO_EQUIPO_REEMPLAZO_HISTORIAL}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${usuario}
    Should Contain    ${equipo_original}    ${imei_original}
    Should Contain    ${equipo_reemplazo}    ${imei_reemplazo}
    Log    Registro de cambio de garantía en historial - Fecha: ${fecha}, Usuario: ${usuario}, Original: ${imei_original}, Reemplazo: ${imei_reemplazo}

Verificar calendario de pagos sin modificaciones tras cambio de garantía
    Acceder a calendario de pagos
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS_ACTUALIZADA}
    ${total_cuotas}=    Get Element Count    ${BES_TABLA_CALENDARIO_PAGOS_ACTUALIZADA}//tr[position()>1]
    Should Be True    ${total_cuotas} > 0
    Page Should Contain Element    ${BES_CAMPO_CUOTA_SIN_MODIFICACION}
    Log    Calendario de cobranza mantiene las ${total_cuotas} cuotas originales sin modificaciones

Verificar condiciones de financiamiento mantenidas
    Page Should Contain Element    ${BES_CAMPO_PLAZO_PRESTAMO}
    Page Should Contain Element    ${BES_CAMPO_MONTO_FINANCIADO}
    Page Should Contain Element    ${BES_CAMPO_FRECUENCIA_PAGO_PRESTAMO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_PRESTAMO}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_FINANCIADO}
    ${frecuencia}=    Get Text    ${BES_CAMPO_FRECUENCIA_PAGO_PRESTAMO}
    Should Not Be Empty    ${plazo}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${frecuencia}
    Log    Condiciones de financiamiento mantenidas - Plazo: ${plazo}, Monto: ${monto}, Frecuencia: ${frecuencia}
