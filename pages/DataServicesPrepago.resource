*** Variables ***
${DSP_URL}                                      https://dataservices.telcel.com/prepago
${DSP_MENU_ACTIVACIONES}                        id:menu_activaciones
${DSP_INPUT_BUSCAR_SOLICITUD}                   id:buscar_solicitud_activacion
${DSP_BOTON_BUSCAR_SOLICITUD}                   css:.btn-buscar-solicitud
${DSP_TABLA_SOLICITUDES}                        xpath://table[@id='tabla_solicitudes_activacion']
${DSP_CAMPO_ID_SOLICITUD}                       xpath://td[@data-field='id_solicitud']
${DSP_CAMPO_CLIENTE_NOMBRE}                     xpath://td[@data-field='cliente_nombre']
${DSP_CAMPO_CLIENTE_IDENTIFICACION}             xpath://td[@data-field='cliente_identificacion']
${DSP_CAMPO_EQUIPO_IMEI}                        xpath://td[@data-field='equipo_imei']
${DSP_CAMPO_EQUIPO_MARCA}                       xpath://td[@data-field='equipo_marca']
${DSP_CAMPO_EQUIPO_MODELO}                      xpath://td[@data-field='equipo_modelo']
${DSP_CAMPO_ESTADO_SOLICITUD}                   xpath://td[@data-field='estado_solicitud']
${DSP_MENU_PROMOCIONES}                         id:menu_promociones_prepago
${DSP_SELECT_PROMOCION}                         id:select_promocion_vigente
${DSP_OPCION_AK_ASL}                            xpath://option[contains(text(),'AK ASL')]
${DSP_OPCION_AK_CON_TODO}                       xpath://option[contains(text(),'AK con Todo')]
${DSP_CAMPO_PROMOCION_APLICADA}                 xpath://div[@data-field='promocion_aplicada']
${DSP_BOTON_VALIDAR_PROMOCION}                  id:btn_validar_promocion
${DSP_MENSAJE_PROMOCION_VALIDADA}               xpath://div[contains(text(),'Promoción validada')]
${DSP_BOTON_CONFIRMAR_ACTIVACION}               id:btn_confirmar_activacion_dsp
${DSP_MENSAJE_ACTIVACION_CONFIRMADA}            xpath://div[contains(text(),'Activación confirmada exitosamente')]
${DSP_CAMPO_NUMERO_LINEA_ACTIVADA}              xpath://div[@data-field='numero_linea_activada']
${DSP_CAMPO_FECHA_ACTIVACION}                   xpath://div[@data-field='fecha_activacion']
${DSP_BOTON_ENVIAR_CONFIRMACION_BES}            id:btn_enviar_confirmacion_bes
${DSP_MENSAJE_CONFIRMACION_ENVIADA}             xpath://div[contains(text(),'Confirmación enviada a BES')]
${DSP_PANEL_DETALLE_SOLICITUD}                  css:.panel-detalle-solicitud
${DSP_CAMPO_ORIGEN_SOLICITUD}                   xpath://div[@data-field='origen_solicitud']
${DSP_SECCION_VALIDACION_PROMOCIONES}           id:seccion_validacion_promociones
${DSP_TABLA_PROMOCIONES_DISPONIBLES}            xpath://table[@id='tabla_promociones_disponibles']
${DSP_CAMPO_NOMBRE_PROMOCION}                   xpath://td[@data-field='nombre_promocion']
${DSP_CAMPO_DESCRIPCION_PROMOCION}              xpath://td[@data-field='descripcion_promocion']
${DSP_CAMPO_VIGENCIA_PROMOCION}                 xpath://td[@data-field='vigencia_promocion']

*** Keywords ***
Abrir sistema Data Services Prepago
    Go To    ${DSP_URL}
    Wait Until Page Contains Element    ${DSP_MENU_ACTIVACIONES}    timeout=10s

Acceder a módulo de activaciones prepago
    Click Element    ${DSP_MENU_ACTIVACIONES}
    Wait Until Element Is Visible    ${DSP_INPUT_BUSCAR_SOLICITUD}    timeout=10s

Buscar solicitud de activación desde BES
    [Arguments]    ${identificacion}
    Input Text    ${DSP_INPUT_BUSCAR_SOLICITUD}    ${identificacion}
    Click Button    ${DSP_BOTON_BUSCAR_SOLICITUD}
    Wait Until Element Is Visible    ${DSP_TABLA_SOLICITUDES}    timeout=10s

Verificar recepción de solicitud de activación desde BES
    [Arguments]    ${identificacion}
    Page Should Contain Element    ${DSP_TABLA_SOLICITUDES}
    ${nombre}=    Get Text    ${DSP_CAMPO_CLIENTE_NOMBRE}
    ${id_cliente}=    Get Text    ${DSP_CAMPO_CLIENTE_IDENTIFICACION}
    Should Contain    ${id_cliente}    ${identificacion}
    Log    Solicitud recibida de BES para cliente: ${nombre}, ID: ${id_cliente}

Verificar datos del equipo en solicitud
    [Arguments]    ${imei_esperado}
    ${imei}=    Get Text    ${DSP_CAMPO_EQUIPO_IMEI}
    ${marca}=    Get Text    ${DSP_CAMPO_EQUIPO_MARCA}
    ${modelo}=    Get Text    ${DSP_CAMPO_EQUIPO_MODELO}
    Should Contain    ${imei}    ${imei_esperado}
    Log    Datos del equipo: IMEI=${imei}, Marca=${marca}, Modelo=${modelo}

Verificar origen de solicitud es BES
    Wait Until Element Is Visible    ${DSP_PANEL_DETALLE_SOLICITUD}    timeout=10s
    ${origen}=    Get Text    ${DSP_CAMPO_ORIGEN_SOLICITUD}
    Should Contain    ${origen}    BES
    Log    Origen de solicitud verificado: ${origen}

Acceder a módulo de promociones vigentes
    Click Element    ${DSP_MENU_PROMOCIONES}
    Wait Until Element Is Visible    ${DSP_SECCION_VALIDACION_PROMOCIONES}    timeout=10s

Verificar disponibilidad de promociones vigentes
    Wait Until Element Is Visible    ${DSP_TABLA_PROMOCIONES_DISPONIBLES}    timeout=10s
    Page Should Contain Element    ${DSP_OPCION_AK_ASL}
    Page Should Contain Element    ${DSP_OPCION_AK_CON_TODO}
    Log    Promociones vigentes disponibles: AK ASL, AK con Todo

Seleccionar promoción AK ASL
    Wait Until Element Is Visible    ${DSP_SELECT_PROMOCION}    timeout=10s
    Select From List By Label    ${DSP_SELECT_PROMOCION}    AK ASL
    Log    Promoción AK ASL seleccionada

Seleccionar promoción AK con Todo
    Wait Until Element Is Visible    ${DSP_SELECT_PROMOCION}    timeout=10s
    Select From List By Label    ${DSP_SELECT_PROMOCION}    AK con Todo
    Log    Promoción AK con Todo seleccionada

Validar y aplicar promoción vigente
    Click Button    ${DSP_BOTON_VALIDAR_PROMOCION}
    Wait Until Element Is Visible    ${DSP_MENSAJE_PROMOCION_VALIDADA}    timeout=15s
    ${promocion}=    Get Text    ${DSP_CAMPO_PROMOCION_APLICADA}
    Log    Promoción aplicada: ${promocion}

Verificar aplicación correcta de promoción
    [Arguments]    ${promocion_esperada}
    ${promocion}=    Get Text    ${DSP_CAMPO_PROMOCION_APLICADA}
    Should Contain    ${promocion}    ${promocion_esperada}
    Log    Promoción ${promocion_esperada} aplicada correctamente

Confirmar activación de línea prepago en Data Services
    Click Button    ${DSP_BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${DSP_MENSAJE_ACTIVACION_CONFIRMADA}    timeout=15s
    Log    Activación de línea confirmada en Data Services Prepago

Verificar activación exitosa en Data Services Prepago
    Page Should Contain Element    ${DSP_MENSAJE_ACTIVACION_CONFIRMADA}
    ${numero}=    Get Text    ${DSP_CAMPO_NUMERO_LINEA_ACTIVADA}
    ${fecha}=    Get Text    ${DSP_CAMPO_FECHA_ACTIVACION}
    Should Not Be Empty    ${numero}
    Should Not Be Empty    ${fecha}
    Log    Línea activada: ${numero}, Fecha: ${fecha}

Enviar confirmación de activación hacia BES
    Click Button    ${DSP_BOTON_ENVIAR_CONFIRMACION_BES}
    Wait Until Element Is Visible    ${DSP_MENSAJE_CONFIRMACION_ENVIADA}    timeout=15s
    Log    Confirmación de activación enviada a BES

Verificar envío de confirmación a BES
    Page Should Contain Element    ${DSP_MENSAJE_CONFIRMACION_ENVIADA}
    ${estado}=    Get Text    ${DSP_CAMPO_ESTADO_SOLICITUD}
    Should Contain    ${estado}    Confirmada
    Log    Confirmación enviada a BES con estado: ${estado}
