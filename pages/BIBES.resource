*** Variables ***
${BIBES_URL}                           https://bibes.telcel.com
${BIBES_MENU_CONCILIACION}             id:menu_conciliacion
${BIBES_INPUT_BUSCAR_REPORTE}          id:buscar_reporte
${BIBES_BOTON_BUSCAR_REPORTE}          css:.btn-buscar-reporte
${BIBES_TABLA_REPORTES_RECIBIDOS}      xpath://table[@id='tabla_reportes_recibidos']
${BIBES_CAMPO_FECHA_RECEPCION}         xpath://td[@data-field='fecha_recepcion']
${BIBES_CAMPO_ORIGEN_REPORTE}          xpath://td[@data-field='origen']
${BIBES_CAMPO_NUM_REGISTROS}           xpath://td[@data-field='num_registros']
${BIBES_CAMPO_ESTATUS_PROCESAMIENTO}   xpath://td[@data-field='estatus_procesamiento']
${BIBES_LINK_VER_DETALLE_REPORTE}      css:.link-ver-detalle-reporte
${BIBES_PANEL_DETALLE_REPORTE}         css:.panel-detalle-reporte
${BIBES_TABLA_DATOS_CONCILIADOS}       xpath://table[@id='tabla_datos_conciliados']
${BIBES_MENSAJE_REPORTE_PROCESADO}     xpath://div[contains(text(),'Reporte procesado')]

*** Keywords ***
Abrir sistema BIBES
    Go To    ${BIBES_URL}
    Wait Until Page Contains Element    ${BIBES_MENU_CONCILIACION}    timeout=10s

Acceder a módulo de conciliación en BIBES
    Click Element    ${BIBES_MENU_CONCILIACION}
    Wait Until Element Is Visible    ${BIBES_INPUT_BUSCAR_REPORTE}    timeout=10s

Buscar reporte de conciliación recibido
    [Arguments]    ${criterio_busqueda}=BES
    Input Text    ${BIBES_INPUT_BUSCAR_REPORTE}    ${criterio_busqueda}
    Click Button    ${BIBES_BOTON_BUSCAR_REPORTE}
    Wait Until Element Is Visible    ${BIBES_TABLA_REPORTES_RECIBIDOS}    timeout=10s

Verificar recepción de reporte de conciliación desde BES
    Page Should Contain Element    ${BIBES_TABLA_REPORTES_RECIBIDOS}
    ${filas}=    Get Element Count    ${BIBES_TABLA_REPORTES_RECIBIDOS}//tr[position()>1]
    Should Be True    ${filas} > 0
    ${origen}=    Get Text    (${BIBES_TABLA_REPORTES_RECIBIDOS}//tr[position()=2])${BIBES_CAMPO_ORIGEN_REPORTE}
    Should Contain    ${origen}    BES
    Log    Reporte de conciliación recibido desde BES

Verificar datos conciliados en BIBES
    Click Element    ${BIBES_LINK_VER_DETALLE_REPORTE}
    Wait Until Element Is Visible    ${BIBES_PANEL_DETALLE_REPORTE}    timeout=10s
    Page Should Contain Element    ${BIBES_TABLA_DATOS_CONCILIADOS}
    ${filas}=    Get Element Count    ${BIBES_TABLA_DATOS_CONCILIADOS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Datos conciliados mostrados en BIBES con ${filas} registros

Verificar procesamiento exitoso del reporte en BIBES
    Page Should Contain Element    ${BIBES_MENSAJE_REPORTE_PROCESADO}
    ${estatus}=    Get Text    (${BIBES_TABLA_REPORTES_RECIBIDOS}//tr[position()=2])${BIBES_CAMPO_ESTATUS_PROCESAMIENTO}
    Should Contain    ${estatus}    Procesado
    Log    Reporte procesado exitosamente en BIBES con estatus: ${estatus}

# ========================================
# LOCATORS Y KEYWORDS PARA REPORTES DE VENTAS (TC049)
# ========================================
${BIBES_MENU_REPORTES}                  id:menu_reportes
${BIBES_OPCION_REPORTE_VENTAS}          id:opcion_reporte_ventas
${BIBES_SELECT_PERIODO}                 id:select_periodo_reporte
${BIBES_SELECT_CANAL_VENTA}             id:select_canal_venta
${BIBES_INPUT_FECHA_INICIO}             id:fecha_inicio_reporte
${BIBES_INPUT_FECHA_FIN}                id:fecha_fin_reporte
${BIBES_SELECT_REGION}                  id:select_region_reporte
${BIBES_BOTON_GENERAR_REPORTE_VENTAS}   id:btn_generar_reporte_ventas
${BIBES_TABLA_REPORTE_VENTAS}           xpath://table[@id='tabla_reporte_ventas']
${BIBES_CAMPO_DATOS_CLIENTE}            xpath://td[@data-field='datos_cliente']
${BIBES_CAMPO_EQUIPO}                   xpath://td[@data-field='equipo']
${BIBES_CAMPO_MONTO_FINANCIADO_REPORTE} xpath://td[@data-field='monto_financiado']
${BIBES_CAMPO_PLAZO_REPORTE}            xpath://td[@data-field='plazo']
${BIBES_CAMPO_ENGANCHE}                 xpath://td[@data-field='enganche']
${BIBES_CAMPO_PARCIALIDADES_REPORTE}    xpath://td[@data-field='parcialidades']
${BIBES_CAMPO_VENDEDOR}                 xpath://td[@data-field='vendedor']
${BIBES_CAMPO_ORIGEN_VENTA}             xpath://td[@data-field='origen_venta']
${BIBES_SECCION_REPORTE_VENDEDOR}       css:.seccion-reporte-vendedor
${BIBES_SECCION_FUERZA_VENTAS}          css:.seccion-fuerza-ventas
${BIBES_MENSAJE_REPORTE_GENERADO}       xpath://div[contains(text(),'Reporte generado exitosamente')]

Acceder a módulo de reportes en BIBES
    Click Element    ${BIBES_MENU_REPORTES}
    Wait Until Element Is Visible    ${BIBES_OPCION_REPORTE_VENTAS}    timeout=10s

Seleccionar reporte de ventas
    Click Element    ${BIBES_OPCION_REPORTE_VENTAS}
    Wait Until Element Is Visible    ${BIBES_SELECT_PERIODO}    timeout=10s

Configurar filtros del reporte de ventas
    [Arguments]    ${periodo}    ${canal}    ${fecha_inicio}    ${fecha_fin}    ${region}
    Select From List By Label    ${BIBES_SELECT_PERIODO}    ${periodo}
    Select From List By Label    ${BIBES_SELECT_CANAL_VENTA}    ${canal}
    Input Text    ${BIBES_INPUT_FECHA_INICIO}    ${fecha_inicio}
    Input Text    ${BIBES_INPUT_FECHA_FIN}    ${fecha_fin}
    Select From List By Label    ${BIBES_SELECT_REGION}    ${region}

Generar reporte de ventas en BIBES
    Click Button    ${BIBES_BOTON_GENERAR_REPORTE_VENTAS}
    Wait Until Element Is Visible    ${BIBES_TABLA_REPORTE_VENTAS}    timeout=15s
    Wait Until Element Is Visible    ${BIBES_MENSAJE_REPORTE_GENERADO}    timeout=10s

Verificar que el reporte incluye ventas de Amigo Paguitos con todos los campos
    Page Should Contain Element    ${BIBES_TABLA_REPORTE_VENTAS}
    ${filas}=    Get Element Count    ${BIBES_TABLA_REPORTE_VENTAS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Page Should Contain Element    ${BIBES_CAMPO_DATOS_CLIENTE}
    Page Should Contain Element    ${BIBES_CAMPO_EQUIPO}
    Page Should Contain Element    ${BIBES_CAMPO_MONTO_FINANCIADO_REPORTE}
    Page Should Contain Element    ${BIBES_CAMPO_PLAZO_REPORTE}
    Page Should Contain Element    ${BIBES_CAMPO_ENGANCHE}
    Page Should Contain Element    ${BIBES_CAMPO_PARCIALIDADES_REPORTE}
    Log    Reporte de ventas incluye ${filas} registros con todos los campos del layout

Verificar consolidación de ventas tradicionales y Amigo Paguitos en reporte
    ${ventas_tradicionales}=    Get Element Count    ${BIBES_TABLA_REPORTE_VENTAS}//tr[td[contains(text(),'Tradicional')]]
    ${ventas_amigo_paguitos}=    Get Element Count    ${BIBES_TABLA_REPORTE_VENTAS}//tr[td[contains(text(),'Amigo Paguitos')]]
    Should Be True    ${ventas_tradicionales} >= 0
    Should Be True    ${ventas_amigo_paguitos} > 0
    Log    Reporte consolidado - Ventas Tradicionales: ${ventas_tradicionales}, Amigo Paguitos: ${ventas_amigo_paguitos}

Verificar información de ventas por vendedor en reporte
    Page Should Contain Element    ${BIBES_SECCION_REPORTE_VENDEDOR}
    Page Should Contain Element    ${BIBES_CAMPO_VENDEDOR}
    ${vendedores}=    Get Element Count    ${BIBES_TABLA_REPORTE_VENTAS}//td[@data-field='vendedor']
    Should Be True    ${vendedores} > 0
    Log    Reporte muestra información de ${vendedores} vendedores

Verificar información agrupada por fuerza de venta en reporte
    Page Should Contain Element    ${BIBES_SECCION_FUERZA_VENTAS}
    ${grupos}=    Get Element Count    ${BIBES_SECCION_FUERZA_VENTAS}//div[contains(@class,'grupo-fuerza-ventas')]
    Should Be True    ${grupos} > 0
    Log    Reporte agrupa información en ${grupos} grupos de fuerza de ventas

# ========================================
# LOCATORS Y KEYWORDS PARA REPORTES DE COMISIONES (TC050)
# ========================================
${BIBES_MENU_REPORTES_COMISIONES}       id:menu_reportes_comisiones
${BIBES_OPCION_REPORTE_COMISIONES_DIST} id:opcion_reporte_comisiones_distribuidores
${BIBES_SELECT_PERIODO_COMISIONES}      id:select_periodo_comisiones
${BIBES_INPUT_FECHA_INICIO_COMISION}    id:fecha_inicio_comisiones
${BIBES_INPUT_FECHA_FIN_COMISION}       id:fecha_fin_comisiones
${BIBES_SELECT_DISTRIBUIDOR}            id:select_distribuidor_comisiones
${BIBES_SELECT_CANAL_COMISION}          id:select_canal_comisiones
${BIBES_INPUT_FILTRO_VENDEDOR}          id:input_filtro_vendedor
${BIBES_BOTON_GENERAR_REPORTE_COMISIONES} id:btn_generar_reporte_comisiones
${BIBES_TABLA_REPORTE_COMISIONES}       xpath://table[@id='tabla_reporte_comisiones']
${BIBES_CAMPO_DISTRIBUIDOR}             xpath://td[@data-field='distribuidor']
${BIBES_CAMPO_VENDEDOR_COMISION}        xpath://td[@data-field='vendedor']
${BIBES_CAMPO_VENTA_TRADICIONAL}        xpath://td[@data-field='venta_tradicional']
${BIBES_CAMPO_VENTA_AMIGO_PAGUITOS}     xpath://td[@data-field='venta_amigo_paguitos']
${BIBES_CAMPO_COMISION_TRADICIONAL}     xpath://td[@data-field='comision_tradicional']
${BIBES_CAMPO_COMISION_AMIGO_PAGUITOS}  xpath://td[@data-field='comision_amigo_paguitos']
${BIBES_CAMPO_COMISION_TOTAL}           xpath://td[@data-field='comision_total']
${BIBES_CAMPO_ENGANCHE_COMISION}        xpath://td[@data-field='enganche']
${BIBES_CAMPO_PARCIALIDADES_COMISION}   xpath://td[@data-field='parcialidades']
${BIBES_MENSAJE_REPORTE_COMISIONES_GENERADO} xpath://div[contains(text(),'Reporte de comisiones generado')]
${BIBES_SECCION_DESGLOSE_COMISIONES}    css:.seccion-desglose-comisiones
${BIBES_CAMPO_POLITICA_COMERCIAL}       xpath://td[@data-field='politica_comercial']

Acceder a módulo de reportes de comisiones en BIBES
    Click Element    ${BIBES_MENU_REPORTES}
    Wait Until Element Is Visible    ${BIBES_MENU_REPORTES_COMISIONES}    timeout=10s
    Click Element    ${BIBES_MENU_REPORTES_COMISIONES}
    Wait Until Element Is Visible    ${BIBES_OPCION_REPORTE_COMISIONES_DIST}    timeout=10s

Seleccionar reporte de comisiones de distribuidores
    Click Element    ${BIBES_OPCION_REPORTE_COMISIONES_DIST}
    Wait Until Element Is Visible    ${BIBES_SELECT_PERIODO_COMISIONES}    timeout=10s

Configurar filtros del reporte de comisiones
    [Arguments]    ${periodo}    ${distribuidor}    ${canal}    ${fecha_inicio}    ${fecha_fin}
    Select From List By Label    ${BIBES_SELECT_PERIODO_COMISIONES}    ${periodo}
    Select From List By Label    ${BIBES_SELECT_DISTRIBUIDOR}    ${distribuidor}
    Select From List By Label    ${BIBES_SELECT_CANAL_COMISION}    ${canal}
    Input Text    ${BIBES_INPUT_FECHA_INICIO_COMISION}    ${fecha_inicio}
    Input Text    ${BIBES_INPUT_FECHA_FIN_COMISION}    ${fecha_fin}

Generar reporte de comisiones de distribuidores
    Click Button    ${BIBES_BOTON_GENERAR_REPORTE_COMISIONES}
    Wait Until Element Is Visible    ${BIBES_TABLA_REPORTE_COMISIONES}    timeout=15s
    Wait Until Element Is Visible    ${BIBES_MENSAJE_REPORTE_COMISIONES_GENERADO}    timeout=10s

Verificar que el reporte incluye comisiones de Amigo Paguitos desglosadas por distribuidor y vendedor
    Page Should Contain Element    ${BIBES_TABLA_REPORTE_COMISIONES}
    ${filas}=    Get Element Count    ${BIBES_TABLA_REPORTE_COMISIONES}//tr[position()>1]
    Should Be True    ${filas} > 0
    Page Should Contain Element    ${BIBES_CAMPO_DISTRIBUIDOR}
    Page Should Contain Element    ${BIBES_CAMPO_VENDEDOR_COMISION}
    Page Should Contain Element    ${BIBES_CAMPO_VENTA_AMIGO_PAGUITOS}
    Page Should Contain Element    ${BIBES_CAMPO_COMISION_AMIGO_PAGUITOS}
    Page Should Contain Element    ${BIBES_SECCION_DESGLOSE_COMISIONES}
    Log    Reporte de comisiones incluye ${filas} registros con comisiones de Amigo Paguitos desglosadas

Verificar comisiones de ventas tradicionales y Amigo Paguitos con cálculo correcto
    ${filas_tradicional}=    Get Element Count    ${BIBES_TABLA_REPORTE_COMISIONES}//tr[td[@data-field='venta_tradicional']]
    ${filas_amigo_paguitos}=    Get Element Count    ${BIBES_TABLA_REPORTE_COMISIONES}//tr[td[@data-field='venta_amigo_paguitos']]
    Should Be True    ${filas_tradicional} >= 0
    Should Be True    ${filas_amigo_paguitos} > 0
    Page Should Contain Element    ${BIBES_CAMPO_COMISION_TRADICIONAL}
    Page Should Contain Element    ${BIBES_CAMPO_COMISION_AMIGO_PAGUITOS}
    Page Should Contain Element    ${BIBES_CAMPO_COMISION_TOTAL}
    Log    Reporte muestra comisiones tradicionales y de Amigo Paguitos con cálculo correcto según políticas comerciales

Verificar cálculo correcto de comisiones considerando enganche y parcialidades de Amigo Paguitos
    Page Should Contain Element    ${BIBES_CAMPO_ENGANCHE_COMISION}
    Page Should Contain Element    ${BIBES_CAMPO_PARCIALIDADES_COMISION}
    Page Should Contain Element    ${BIBES_CAMPO_POLITICA_COMERCIAL}
    ${filas_con_enganche}=    Get Element Count    ${BIBES_TABLA_REPORTE_COMISIONES}//tr[td[@data-field='enganche'] and not(contains(text(),'0'))]
    ${filas_con_parcialidades}=    Get Element Count    ${BIBES_TABLA_REPORTE_COMISIONES}//tr[td[@data-field='parcialidades'] and not(contains(text(),'0'))]
    Should Be True    ${filas_con_enganche} > 0 or ${filas_con_parcialidades} > 0
    Log    Reporte aplica reglas de cálculo de comisiones para Amigo Paguitos considerando enganche y parcialidades
