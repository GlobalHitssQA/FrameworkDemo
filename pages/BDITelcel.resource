*** Variables ***
${BDI_URL}                                 https://bdi.telcel.com
${BDI_MENU_FINANCIAMIENTOS}                id:menu_financiamientos
${BDI_INPUT_BUSCAR_FINANCIAMIENTO}         id:buscar_financiamiento
${BDI_BOTON_BUSCAR}                        css:.btn-buscar
${BDI_TABLA_FINANCIAMIENTOS}               xpath://table[@id='tabla_financiamientos']
${BDI_CAMPO_ID_FINANCIAMIENTO}             xpath://td[@data-field='id_financiamiento']
${BDI_CAMPO_CLIENTE}                       xpath://td[@data-field='cliente']
${BDI_CAMPO_MONTO_FINANCIADO}              xpath://td[@data-field='monto']
${BDI_CAMPO_PLAZO}                         xpath://td[@data-field='plazo']
${BDI_CAMPO_FECHA_REGISTRO}                xpath://td[@data-field='fecha_registro']
${BDI_CAMPO_ESTATUS_FINANCIAMIENTO}        xpath://td[@data-field='estatus']
${BDI_CAMPO_ORIGEN_DATOS}                  xpath://td[@data-field='origen']
${BDI_LINK_VER_DETALLE}                    css:.link-ver-detalle
${BDI_PANEL_DETALLE_FINANCIAMIENTO}        css:.panel-detalle-financiamiento
${BDI_CAMPO_DATOS_CLIENTE_DETALLE}         css:.datos-cliente-detalle
${BDI_CAMPO_DATOS_PRESTAMO_DETALLE}        css:.datos-prestamo-detalle
${BDI_CAMPO_DATOS_EQUIPO_DETALLE}          css:.datos-equipo-detalle
${BDI_MENSAJE_DATOS_RECIBIDOS}             xpath://div[contains(text(),'Datos recibidos desde BES')]
${BDI_MENSAJE_PROCESAMIENTO_EXITOSO}       xpath://div[contains(text(),'Procesamiento exitoso')]

*** Keywords ***
Abrir sistema BDI Telcel
    Go To    ${BDI_URL}
    Wait Until Page Contains Element    ${BDI_MENU_FINANCIAMIENTOS}    timeout=10s

Acceder a módulo de financiamientos en BDI Telcel
    Click Element    ${BDI_MENU_FINANCIAMIENTOS}
    Wait Until Element Is Visible    ${BDI_INPUT_BUSCAR_FINANCIAMIENTO}    timeout=10s

Buscar financiamiento en BDI Telcel por identificación del cliente
    [Arguments]    ${identificacion}
    Input Text    ${BDI_INPUT_BUSCAR_FINANCIAMIENTO}    ${identificacion}
    Click Button    ${BDI_BOTON_BUSCAR}
    Wait Until Element Is Visible    ${BDI_TABLA_FINANCIAMIENTOS}    timeout=10s

Verificar que existe registro de financiamiento en BDI Telcel
    Page Should Contain Element    ${BDI_TABLA_FINANCIAMIENTOS}
    ${filas}=    Get Element Count    ${BDI_TABLA_FINANCIAMIENTOS}//tr[position()>1]
    Should Be True    ${filas} > 0

Verificar origen de datos es BES
    ${origen}=    Get Text    ${BDI_CAMPO_ORIGEN_DATOS}
    Should Contain    ${origen}    BES
    Log    Datos recibidos desde BES correctamente

Verificar información del financiamiento en BDI Telcel
    [Arguments]    ${identificacion_esperada}    ${monto_esperado}    ${plazo_esperado}
    ${cliente}=    Get Text    ${BDI_CAMPO_CLIENTE}
    ${monto}=    Get Text    ${BDI_CAMPO_MONTO_FINANCIADO}
    ${plazo}=    Get Text    ${BDI_CAMPO_PLAZO}
    ${estatus}=    Get Text    ${BDI_CAMPO_ESTATUS_FINANCIAMIENTO}
    Should Contain    ${cliente}    ${identificacion_esperada}
    Should Contain    ${monto}    ${monto_esperado}
    Should Contain    ${plazo}    ${plazo_esperado}
    Should Contain    ${estatus}    Registrado
    Log    Financiamiento registrado en BDI Telcel: Cliente=${cliente}, Monto=${monto}, Plazo=${plazo}

Acceder a detalle del financiamiento en BDI Telcel
    Click Element    ${BDI_LINK_VER_DETALLE}
    Wait Until Element Is Visible    ${BDI_PANEL_DETALLE_FINANCIAMIENTO}    timeout=10s

Verificar datos del cliente en BDI Telcel
    [Arguments]    ${nombre_esperado}    ${identificacion_esperada}
    Wait Until Element Is Visible    ${BDI_CAMPO_DATOS_CLIENTE_DETALLE}    timeout=10s
    ${datos_cliente}=    Get Text    ${BDI_CAMPO_DATOS_CLIENTE_DETALLE}
    Should Contain    ${datos_cliente}    ${nombre_esperado}
    Should Contain    ${datos_cliente}    ${identificacion_esperada}
    Log    Datos del cliente verificados en BDI Telcel

Verificar información del préstamo en BDI Telcel
    [Arguments]    ${monto_esperado}    ${plazo_esperado}    ${parcialidades_esperadas}    ${tasa_esperada}
    Wait Until Element Is Visible    ${BDI_CAMPO_DATOS_PRESTAMO_DETALLE}    timeout=10s
    ${datos_prestamo}=    Get Text    ${BDI_CAMPO_DATOS_PRESTAMO_DETALLE}
    Should Contain    ${datos_prestamo}    ${monto_esperado}
    Should Contain    ${datos_prestamo}    ${plazo_esperado}
    Should Contain    ${datos_prestamo}    ${parcialidades_esperadas}
    Should Contain    ${datos_prestamo}    ${tasa_esperada}
    Log    Información del préstamo verificada en BDI Telcel

Verificar información del equipo en BDI Telcel
    [Arguments]    ${equipo_esperado}    ${imei_esperado}
    Wait Until Element Is Visible    ${BDI_CAMPO_DATOS_EQUIPO_DETALLE}    timeout=10s
    ${datos_equipo}=    Get Text    ${BDI_CAMPO_DATOS_EQUIPO_DETALLE}
    Should Contain    ${datos_equipo}    ${equipo_esperado}
    Should Contain    ${datos_equipo}    ${imei_esperado}
    Log    Información del equipo verificada en BDI Telcel

Verificar procesamiento exitoso en BDI Telcel
    Wait Until Element Is Visible    ${BDI_MENSAJE_PROCESAMIENTO_EXITOSO}    timeout=15s
    Page Should Contain Element    ${BDI_MENSAJE_PROCESAMIENTO_EXITOSO}
    Log    BDI Telcel procesó exitosamente la información del financiamiento

Verificar recepción de mensaje de datos desde BES
    Wait Until Element Is Visible    ${BDI_MENSAJE_DATOS_RECIBIDOS}    timeout=10s
    ${mensaje}=    Get Text    ${BDI_MENSAJE_DATOS_RECIBIDOS}
    Should Contain    ${mensaje}    BES
    Log    BDI Telcel confirmó recepción de datos desde BES

# ========================================
# LOCATORS Y KEYWORDS ADICIONALES PARA INTEGRACIÓN BES-BDI (TC072)
# ========================================
${BDI_MENU_INTEGRACIONES}                  id:menu_integraciones
${BDI_CAMPO_FECHA_SINCRONIZACION}          css:.fecha-sincronizacion
${BDI_CAMPO_ESTATUS_SINCRONIZACION}        css:.estatus-sincronizacion
${BDI_TABLA_LOG_INTEGRACION}               xpath://table[@id='tabla_log_integracion']
${BDI_CAMPO_TIMESTAMP_RECEPCION}           xpath://td[@data-field='timestamp_recepcion']
${BDI_CAMPO_ID_TRANSACCION_BES}            xpath://td[@data-field='id_transaccion_bes']
${BDI_CAMPO_RESULTADO_VALIDACION}          xpath://td[@data-field='resultado_validacion']
${BDI_MENSAJE_CONFIRMACION_PROCESAMIENTO}  xpath://div[contains(text(),'Confirmación de procesamiento enviada a BES')]

Acceder a módulo de integraciones en BDI Telcel
    Click Element    ${BDI_MENU_INTEGRACIONES}
    Wait Until Element Is Visible    ${BDI_TABLA_LOG_INTEGRACION}    timeout=10s

Verificar registro de recepción de datos desde BES
    [Arguments]    ${identificacion}
    Page Should Contain Element    ${BDI_TABLA_LOG_INTEGRACION}
    ${filas}=    Get Element Count    ${BDI_TABLA_LOG_INTEGRACION}//tr[position()>1]
    Should Be True    ${filas} > 0
    ${timestamp}=    Get Text    ${BDI_CAMPO_TIMESTAMP_RECEPCION}
    Should Not Be Empty    ${timestamp}
    Log    Registro de recepción encontrado en BDI Telcel con timestamp: ${timestamp}

Verificar confirmación de sincronización hacia BES
    Wait Until Element Is Visible    ${BDI_MENSAJE_CONFIRMACION_PROCESAMIENTO}    timeout=15s
    ${confirmacion}=    Get Text    ${BDI_MENSAJE_CONFIRMACION_PROCESAMIENTO}
    Should Contain    ${confirmacion}    BES
    Log    BDI Telcel envió confirmación de procesamiento a BES

Verificar estatus de sincronización exitosa
    ${estatus}=    Get Text    ${BDI_CAMPO_ESTATUS_SINCRONIZACION}
    Should Contain    ${estatus}    Exitosa
    ${fecha}=    Get Text    ${BDI_CAMPO_FECHA_SINCRONIZACION}
    Should Not Be Empty    ${fecha}
    Log    Sincronización exitosa en BDI Telcel - Fecha: ${fecha}
