*** Variables ***
${AP_URL}                             https://amigopaguitos.telcel.com
${AP_MENU_VENTAS}                     id:menu_ventas
${AP_BOTON_NUEVA_VENTA}               css:.btn-nueva-venta
${AP_INPUT_NOMBRE_CLIENTE}            id:cliente_nombre
${AP_INPUT_DIRECCION}                 id:cliente_direccion
${AP_INPUT_TELEFONO}                  id:cliente_telefono
${AP_INPUT_IDENTIFICACION}            id:cliente_identificacion
${AP_BOTON_FORMALIZAR}                id:btn_formalizar_venta
${AP_MENSAJE_VENTA_FORMALIZADA}       xpath://div[contains(text(),'Venta formalizada')]
${AP_ESTADO_VENTA}                    css:.estado-venta

*** Keywords ***
Abrir Amigo Paguitos
    Go To    ${AP_URL}
    Wait Until Page Contains Element    ${AP_MENU_VENTAS}    timeout=10s

Acceder a módulo de ventas
    Click Element    ${AP_MENU_VENTAS}
    Wait Until Element Is Visible    ${AP_BOTON_NUEVA_VENTA}    timeout=10s

Iniciar nueva venta
    Click Button    ${AP_BOTON_NUEVA_VENTA}
    Wait Until Element Is Visible    ${AP_INPUT_NOMBRE_CLIENTE}    timeout=10s

Ingresar datos del cliente
    [Arguments]    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Input Text    ${AP_INPUT_NOMBRE_CLIENTE}    ${nombre}
    Input Text    ${AP_INPUT_DIRECCION}    ${direccion}
    Input Text    ${AP_INPUT_TELEFONO}    ${telefono}
    Input Text    ${AP_INPUT_IDENTIFICACION}    ${identificacion}

Formalizar la venta
    Click Button    ${AP_BOTON_FORMALIZAR}
    Wait Until Element Is Visible    ${AP_MENSAJE_VENTA_FORMALIZADA}    timeout=15s

Verificar estado de venta formalizada
    ${estado}=    Get Text    ${AP_ESTADO_VENTA}
    Should Contain    ${estado}    Formalizada

# ========================================
# LOCATORS Y KEYWORDS PARA FINANCIAMIENTO
# ========================================
${AP_MENU_FINANCIAMIENTO}              id:menu_financiamiento
${AP_INPUT_MONTO_FINANCIADO}           id:financiamiento_monto
${AP_INPUT_PLAZO}                      id:financiamiento_plazo
${AP_INPUT_NUM_PARCIALIDADES}          id:financiamiento_parcialidades
${AP_INPUT_TASA_INTERES}               id:financiamiento_tasa
${AP_INPUT_FECHA_INICIO}               id:financiamiento_fecha_inicio
${AP_SELECT_FRECUENCIA_PAGO}           id:financiamiento_frecuencia
${AP_BOTON_APROBAR_FINANCIAMIENTO}     id:btn_aprobar_financiamiento
${AP_ESTADO_FINANCIAMIENTO}            css:.estado-financiamiento
${AP_MENSAJE_FINANCIAMIENTO_APROBADO}  xpath://div[contains(text(),'Financiamiento aprobado')]
${AP_CAMPO_MONTO_APROBADO}             css:.monto-aprobado
${AP_CAMPO_PLAZO_APROBADO}             css:.plazo-aprobado
${AP_CAMPO_TASA_APROBADA}              css:.tasa-aprobada

Acceder a módulo de financiamiento
    Click Element    ${AP_MENU_FINANCIAMIENTO}
    Wait Until Element Is Visible    ${AP_INPUT_MONTO_FINANCIADO}    timeout=10s

Ingresar parámetros del financiamiento
    [Arguments]    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Input Text    ${AP_INPUT_MONTO_FINANCIADO}    ${monto}
    Input Text    ${AP_INPUT_PLAZO}    ${plazo}
    Input Text    ${AP_INPUT_NUM_PARCIALIDADES}    ${parcialidades}
    Input Text    ${AP_INPUT_TASA_INTERES}    ${tasa}
    Input Text    ${AP_INPUT_FECHA_INICIO}    ${fecha_inicio}

Ingresar parámetros del financiamiento con frecuencia
    [Arguments]    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}    ${frecuencia}
    Input Text    ${AP_INPUT_MONTO_FINANCIADO}    ${monto}
    Input Text    ${AP_INPUT_PLAZO}    ${plazo}
    Input Text    ${AP_INPUT_NUM_PARCIALIDADES}    ${parcialidades}
    Input Text    ${AP_INPUT_TASA_INTERES}    ${tasa}
    Input Text    ${AP_INPUT_FECHA_INICIO}    ${fecha_inicio}
    Select From List By Label    ${AP_SELECT_FRECUENCIA_PAGO}    ${frecuencia}

Aprobar el financiamiento
    Click Button    ${AP_BOTON_APROBAR_FINANCIAMIENTO}
    Wait Until Element Is Visible    ${AP_MENSAJE_FINANCIAMIENTO_APROBADO}    timeout=15s

Verificar estado de financiamiento aprobado
    ${estado}=    Get Text    ${AP_ESTADO_FINANCIAMIENTO}
    Should Contain    ${estado}    Aprobado

Verificar parámetros del crédito aprobado
    [Arguments]    ${monto_esperado}    ${plazo_esperado}    ${tasa_esperada}
    ${monto}=    Get Text    ${AP_CAMPO_MONTO_APROBADO}
    ${plazo}=    Get Text    ${AP_CAMPO_PLAZO_APROBADO}
    ${tasa}=    Get Text    ${AP_CAMPO_TASA_APROBADA}
    Should Contain    ${monto}    ${monto_esperado}
    Should Contain    ${plazo}    ${plazo_esperado}
    Should Contain    ${tasa}    ${tasa_esperada}

# ========================================
# LOCATORS Y KEYWORDS PARA FLUJO COMPLETO DE VENTA (TC003)
# ========================================
${AP_MENU_REGISTRO_USUARIO}            id:menu_registro_usuario
${AP_INPUT_NOMBRE_USUARIO}             id:registro_nombre
${AP_INPUT_EMAIL_USUARIO}              id:registro_email
${AP_BOTON_REGISTRAR_USUARIO}          id:btn_registrar_usuario
${AP_MENSAJE_USUARIO_REGISTRADO}       xpath://div[contains(text(),'Usuario registrado')]
${AP_MENU_LEGALES}                     id:menu_legales
${AP_CHECKBOX_ACEPTAR_TERMINOS}        id:checkbox_terminos_condiciones
${AP_CHECKBOX_ACEPTAR_PRIVACIDAD}      id:checkbox_aviso_privacidad
${AP_BOTON_ACEPTAR_LEGALES}            id:btn_aceptar_legales
${AP_MENSAJE_LEGALES_ACEPTADOS}        xpath://div[contains(text(),'Términos aceptados')]
${AP_MENU_AUTENTICACION}               id:menu_autenticacion
${AP_INPUT_CODIGO_AUTENTICACION}       id:input_codigo_autenticacion
${AP_BOTON_VALIDAR_AUTENTICACION}      id:btn_validar_autenticacion
${AP_MENSAJE_AUTENTICACION_EXITOSA}    xpath://div[contains(text(),'Autenticación exitosa')]
${AP_MENU_EVALUACION}                  id:menu_evaluacion
${AP_BOTON_INICIAR_EVALUACION}         id:btn_iniciar_evaluacion
${AP_CAMPO_RESULTADO_EVALUACION}       css:.resultado-evaluacion
${AP_MENSAJE_EVALUACION_APROBADA}      xpath://div[contains(text(),'Evaluación aprobada')]
${AP_MENU_OFERTA}                      id:menu_oferta
${AP_CAMPO_OFERTA_MONTO}               css:.oferta-monto
${AP_CAMPO_OFERTA_PLAZO}               css:.oferta-plazo
${AP_BOTON_ACEPTAR_OFERTA}             id:btn_aceptar_oferta
${AP_MENSAJE_OFERTA_ACEPTADA}          xpath://div[contains(text(),'Oferta aceptada')]
${AP_MENU_ENROLAMIENTO_EQUIPOS}        id:menu_enrolamiento_equipos
${AP_SELECT_EQUIPO}                    id:select_equipo
${AP_INPUT_IMEI}                       id:input_imei
${AP_BOTON_ENROLLAR_EQUIPO}            id:btn_enrollar_equipo
${AP_MENSAJE_EQUIPO_ENROLLADO}         xpath://div[contains(text(),'Equipo enrollado')]
${AP_MENU_PAGO_ENGANCHE}               id:menu_pago_enganche
${AP_INPUT_MONTO_ENGANCHE}             id:input_monto_enganche
${AP_SELECT_METODO_PAGO}               id:select_metodo_pago
${AP_BOTON_PROCESAR_PAGO}              id:btn_procesar_pago
${AP_MENSAJE_PAGO_PROCESADO}           xpath://div[contains(text(),'Pago procesado')]
${AP_MENU_ENVIO_CONTRATO}              id:menu_envio_contrato
${AP_INPUT_EMAIL_CONTRATO}             id:input_email_contrato
${AP_BOTON_ENVIAR_CONTRATO}            id:btn_enviar_contrato
${AP_MENSAJE_CONTRATO_ENVIADO}         xpath://div[contains(text(),'Contrato enviado')]

Ejecutar paso de registro de usuario
    [Arguments]    ${nombre}    ${email}
    Click Element    ${AP_MENU_REGISTRO_USUARIO}
    Wait Until Element Is Visible    ${AP_INPUT_NOMBRE_USUARIO}    timeout=10s
    Input Text    ${AP_INPUT_NOMBRE_USUARIO}    ${nombre}
    Input Text    ${AP_INPUT_EMAIL_USUARIO}    ${email}
    Click Button    ${AP_BOTON_REGISTRAR_USUARIO}
    Wait Until Element Is Visible    ${AP_MENSAJE_USUARIO_REGISTRADO}    timeout=10s

Ejecutar paso de aceptación de legales
    Click Element    ${AP_MENU_LEGALES}
    Wait Until Element Is Visible    ${AP_CHECKBOX_ACEPTAR_TERMINOS}    timeout=10s
    Select Checkbox    ${AP_CHECKBOX_ACEPTAR_TERMINOS}
    Select Checkbox    ${AP_CHECKBOX_ACEPTAR_PRIVACIDAD}
    Click Button    ${AP_BOTON_ACEPTAR_LEGALES}
    Wait Until Element Is Visible    ${AP_MENSAJE_LEGALES_ACEPTADOS}    timeout=10s

Ejecutar paso de autenticación
    [Arguments]    ${codigo}=123456
    Click Element    ${AP_MENU_AUTENTICACION}
    Wait Until Element Is Visible    ${AP_INPUT_CODIGO_AUTENTICACION}    timeout=10s
    Input Text    ${AP_INPUT_CODIGO_AUTENTICACION}    ${codigo}
    Click Button    ${AP_BOTON_VALIDAR_AUTENTICACION}
    Wait Until Element Is Visible    ${AP_MENSAJE_AUTENTICACION_EXITOSA}    timeout=10s

Ejecutar paso de evaluación
    Click Element    ${AP_MENU_EVALUACION}
    Wait Until Element Is Visible    ${AP_BOTON_INICIAR_EVALUACION}    timeout=10s
    Click Button    ${AP_BOTON_INICIAR_EVALUACION}
    Wait Until Element Is Visible    ${AP_MENSAJE_EVALUACION_APROBADA}    timeout=15s
    ${resultado}=    Get Text    ${AP_CAMPO_RESULTADO_EVALUACION}
    Should Contain    ${resultado}    Aprobada

Ejecutar paso de aceptación de oferta
    Click Element    ${AP_MENU_OFERTA}
    Wait Until Element Is Visible    ${AP_CAMPO_OFERTA_MONTO}    timeout=10s
    ${monto}=    Get Text    ${AP_CAMPO_OFERTA_MONTO}
    ${plazo}=    Get Text    ${AP_CAMPO_OFERTA_PLAZO}
    Log    Oferta recibida: Monto=${monto}, Plazo=${plazo}
    Click Button    ${AP_BOTON_ACEPTAR_OFERTA}
    Wait Until Element Is Visible    ${AP_MENSAJE_OFERTA_ACEPTADA}    timeout=10s

Ejecutar paso de enrolamiento de equipos
    [Arguments]    ${equipo}=iPhone 15    ${imei}=123456789012345
    Click Element    ${AP_MENU_ENROLAMIENTO_EQUIPOS}
    Wait Until Element Is Visible    ${AP_SELECT_EQUIPO}    timeout=10s
    Select From List By Label    ${AP_SELECT_EQUIPO}    ${equipo}
    Input Text    ${AP_INPUT_IMEI}    ${imei}
    Click Button    ${AP_BOTON_ENROLLAR_EQUIPO}
    Wait Until Element Is Visible    ${AP_MENSAJE_EQUIPO_ENROLLADO}    timeout=10s

Ejecutar paso de pago de enganche
    [Arguments]    ${monto_enganche}=5000    ${metodo_pago}=Tarjeta de Crédito
    Click Element    ${AP_MENU_PAGO_ENGANCHE}
    Wait Until Element Is Visible    ${AP_INPUT_MONTO_ENGANCHE}    timeout=10s
    Input Text    ${AP_INPUT_MONTO_ENGANCHE}    ${monto_enganche}
    Select From List By Label    ${AP_SELECT_METODO_PAGO}    ${metodo_pago}
    Click Button    ${AP_BOTON_PROCESAR_PAGO}
    Wait Until Element Is Visible    ${AP_MENSAJE_PAGO_PROCESADO}    timeout=15s

Ejecutar paso de envío de contrato
    [Arguments]    ${email}
    Click Element    ${AP_MENU_ENVIO_CONTRATO}
    Wait Until Element Is Visible    ${AP_INPUT_EMAIL_CONTRATO}    timeout=10s
    Input Text    ${AP_INPUT_EMAIL_CONTRATO}    ${email}
    Click Button    ${AP_BOTON_ENVIAR_CONTRATO}
    Wait Until Element Is Visible    ${AP_MENSAJE_CONTRATO_ENVIADO}    timeout=10s

Ejecutar flujo completo de venta en AP.AG
    [Arguments]    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Acceder a módulo de ventas
    Iniciar nueva venta
    Ejecutar paso de registro de usuario    ${nombre}    ${identificacion}@telcel.com
    Ejecutar paso de aceptación de legales
    Ejecutar paso de autenticación
    Ejecutar paso de evaluación
    Ejecutar paso de aceptación de oferta
    Ejecutar paso de enrolamiento de equipos
    Ejecutar paso de pago de enganche
    Ejecutar paso de envío de contrato    ${identificacion}@telcel.com
    Ingresar datos del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Formalizar la venta
    Verificar estado de venta formalizada

Ejecutar flujo completo de financiamiento en AP.AG
    [Arguments]    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Acceder a módulo de financiamiento
    Ingresar parámetros del financiamiento    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Aprobar el financiamiento
    Verificar estado de financiamiento aprobado
    Verificar parámetros del crédito aprobado    ${monto}    ${plazo}    ${tasa}

# ========================================
# LOCATORS Y KEYWORDS PARA SERVICIOS SUPLEMENTARIOS PREPAGADOS DE CONTADO (TC032)
# ========================================
${AP_MENU_SERVICIOS_SUPLEMENTARIOS}        id:menu_servicios_suplementarios
${AP_BOTON_AGREGAR_SERVICIOS}              id:btn_agregar_servicios
${AP_CATALOGO_SERVICIOS_PREPAGADOS}        id:catalogo_servicios_prepagados
${AP_TABLA_SERVICIOS_DISPONIBLES}          xpath://table[@id='tabla_servicios_disponibles']
${AP_CHECKBOX_SERVICIO_SUPLEMENTARIO}      xpath://input[@type='checkbox' and @data-servicio-id]
${AP_CAMPO_NOMBRE_SERVICIO}                xpath://td[@data-field='nombre_servicio']
${AP_CAMPO_PRECIO_SERVICIO}                xpath://td[@data-field='precio_servicio']
${AP_CAMPO_DESCRIPCION_SERVICIO}           xpath://td[@data-field='descripcion_servicio']
${AP_CAMPO_TOTAL_SERVICIOS}                id:total_servicios_seleccionados
${AP_SELECT_METODO_PAGO_CONTADO}           id:select_metodo_pago_contado
${AP_BOTON_CONFIRMAR_PAGO_CONTADO}         id:btn_confirmar_pago_contado
${AP_MENSAJE_SERVICIOS_AGREGADOS}          xpath://div[contains(text(),'Servicios agregados exitosamente')]
${AP_MENSAJE_PAGO_CONTADO_PROCESADO}       xpath://div[contains(text(),'Pago de contado procesado')]
${AP_RESUMEN_SERVICIOS_CONTRATADOS}        css:.resumen-servicios-contratados
${AP_LISTA_SERVICIOS_CONTRATADOS}          xpath://ul[@id='lista_servicios_contratados']/li

Acceder a módulo de servicios suplementarios
    Click Element    ${AP_MENU_SERVICIOS_SUPLEMENTARIOS}
    Wait Until Element Is Visible    ${AP_BOTON_AGREGAR_SERVICIOS}    timeout=10s

Visualizar catálogo de servicios prepagados de contado
    Click Button    ${AP_BOTON_AGREGAR_SERVICIOS}
    Wait Until Element Is Visible    ${AP_CATALOGO_SERVICIOS_PREPAGADOS}    timeout=10s
    Wait Until Element Is Visible    ${AP_TABLA_SERVICIOS_DISPONIBLES}    timeout=10s

Seleccionar servicio suplementario prepagado
    [Arguments]    ${nombre_servicio}
    ${xpath_servicio}=    Set Variable    xpath://tr[td[contains(text(),'${nombre_servicio}')]]//input[@type='checkbox']
    Wait Until Element Is Visible    ${xpath_servicio}    timeout=10s
    Select Checkbox    ${xpath_servicio}

Seleccionar múltiples servicios suplementarios prepagados
    [Arguments]    @{lista_servicios}
    FOR    ${servicio}    IN    @{lista_servicios}
        Seleccionar servicio suplementario prepagado    ${servicio}
    END

Verificar monto total de servicios seleccionados
    ${total}=    Get Text    ${AP_CAMPO_TOTAL_SERVICIOS}
    Should Not Be Empty    ${total}
    Should Not Be Equal    ${total}    0

Confirmar pago de contado de servicios suplementarios
    [Arguments]    ${metodo_pago}=Tarjeta de Crédito
    Select From List By Label    ${AP_SELECT_METODO_PAGO_CONTADO}    ${metodo_pago}
    Click Button    ${AP_BOTON_CONFIRMAR_PAGO_CONTADO}
    Wait Until Element Is Visible    ${AP_MENSAJE_PAGO_CONTADO_PROCESADO}    timeout=15s

Verificar servicios suplementarios agregados a la venta
    Wait Until Element Is Visible    ${AP_RESUMEN_SERVICIOS_CONTRATADOS}    timeout=10s
    Page Should Contain Element    ${AP_LISTA_SERVICIOS_CONTRATADOS}

Completar venta con servicios suplementarios prepagados de contado
    Wait Until Element Is Visible    ${AP_MENSAJE_SERVICIOS_AGREGADOS}    timeout=10s
    Formalizar la venta
    Verificar estado de venta formalizada

# ========================================
# LOCATORS Y KEYWORDS PARA SERVICIOS SUPLEMENTARIOS PREPAGADOS DIFERIDOS (TC033)
# ========================================
${AP_CATALOGO_SERVICIOS_DIFERIDOS}         id:catalogo_servicios_diferidos
${AP_TABLA_SERVICIOS_DIFERIDOS}            xpath://table[@id='tabla_servicios_diferidos']
${AP_CHECKBOX_SERVICIO_DIFERIDO}           xpath://input[@type='checkbox' and @data-servicio-diferido-id]
${AP_CAMPO_TOTAL_SERVICIOS_DIFERIDOS}      id:total_servicios_diferidos
${AP_BOTON_INCLUIR_EN_FINANCIAMIENTO}      id:btn_incluir_servicios_financiamiento
${AP_MENSAJE_SERVICIOS_DIFERIDOS_AGREGADOS}    xpath://div[contains(text(),'Servicios diferidos agregados')]
${AP_CAMPO_MONTO_TOTAL_PRESTAMO_RECALCULADO}   css:.monto-total-prestamo-recalculado
${AP_CAMPO_PARCIALIDAD_RECALCULADA}        css:.parcialidad-recalculada
${AP_SELECT_PLAZO_OFERTA}                  id:select_plazo_oferta
${AP_SELECT_PERIODICIDAD_OFERTA}           id:select_periodicidad_oferta
${AP_CAMPO_MONTO_EQUIPO}                   css:.monto-equipo
${AP_CAMPO_MONTO_SERVICIOS_DIFERIDOS}      css:.monto-servicios-diferidos
${AP_BOTON_AGREGAR_SERVICIOS_DIFERIDOS}    id:btn_agregar_servicios_diferidos

Visualizar catálogo de servicios prepagados diferidos
    Click Button    ${AP_BOTON_AGREGAR_SERVICIOS_DIFERIDOS}
    Wait Until Element Is Visible    ${AP_CATALOGO_SERVICIOS_DIFERIDOS}    timeout=10s
    Wait Until Element Is Visible    ${AP_TABLA_SERVICIOS_DIFERIDOS}    timeout=10s

Seleccionar servicio suplementario prepagado diferido
    [Arguments]    ${nombre_servicio}
    ${xpath_servicio}=    Set Variable    xpath://tr[td[contains(text(),'${nombre_servicio}')]]//input[@type='checkbox' and @data-servicio-diferido-id]
    Wait Until Element Is Visible    ${xpath_servicio}    timeout=10s
    Select Checkbox    ${xpath_servicio}

Seleccionar múltiples servicios suplementarios diferidos
    [Arguments]    @{lista_servicios}
    FOR    ${servicio}    IN    @{lista_servicios}
        Seleccionar servicio suplementario prepagado diferido    ${servicio}
    END

Verificar monto total de servicios diferidos seleccionados
    ${total}=    Get Text    ${AP_CAMPO_TOTAL_SERVICIOS_DIFERIDOS}
    Should Not Be Empty    ${total}
    Should Not Be Equal    ${total}    0

Incluir servicios diferidos en el financiamiento
    Click Button    ${AP_BOTON_INCLUIR_EN_FINANCIAMIENTO}
    Wait Until Element Is Visible    ${AP_MENSAJE_SERVICIOS_DIFERIDOS_AGREGADOS}    timeout=15s

Verificar recálculo del monto total del préstamo
    Wait Until Element Is Visible    ${AP_CAMPO_MONTO_TOTAL_PRESTAMO_RECALCULADO}    timeout=10s
    ${monto_recalculado}=    Get Text    ${AP_CAMPO_MONTO_TOTAL_PRESTAMO_RECALCULADO}
    Should Not Be Empty    ${monto_recalculado}
    Log    Monto total del préstamo recalculado: ${monto_recalculado}

Verificar recálculo de parcialidades según plazo
    [Arguments]    ${plazo_esperado}
    Wait Until Element Is Visible    ${AP_CAMPO_PARCIALIDAD_RECALCULADA}    timeout=10s
    ${parcialidad}=    Get Text    ${AP_CAMPO_PARCIALIDAD_RECALCULADA}
    Should Not Be Empty    ${parcialidad}
    Log    Parcialidad recalculada para plazo ${plazo_esperado}: ${parcialidad}

Seleccionar plazo de financiamiento
    [Arguments]    ${plazo}=12
    Select From List By Value    ${AP_SELECT_PLAZO_OFERTA}    ${plazo}

Seleccionar periodicidad de financiamiento
    [Arguments]    ${periodicidad}=mensual
    Select From List By Label    ${AP_SELECT_PERIODICIDAD_OFERTA}    ${periodicidad}

Verificar desglose de monto equipo y servicios diferidos
    ${monto_equipo}=    Get Text    ${AP_CAMPO_MONTO_EQUIPO}
    ${monto_servicios}=    Get Text    ${AP_CAMPO_MONTO_SERVICIOS_DIFERIDOS}
    Should Not Be Empty    ${monto_equipo}
    Should Not Be Empty    ${monto_servicios}
    Log    Monto equipo: ${monto_equipo}, Monto servicios diferidos: ${monto_servicios}

Completar venta con servicios suplementarios diferidos
    Wait Until Element Is Visible    ${AP_MENSAJE_SERVICIOS_DIFERIDOS_AGREGADOS}    timeout=10s
    Ejecutar paso de pago de enganche
    Ejecutar paso de envío de contrato    cliente@telcel.com
    Formalizar la venta
    Verificar estado de venta formalizada

# ========================================
# LOCATORS Y KEYWORDS PARA REGISTRO DE USUARIO COMPLETO (TC041)
# ========================================
${AP_MENU_REGISTRO}                           id:menu_registro
${AP_INPUT_NOMBRE_REGISTRO}                   id:registro_nombre
${AP_INPUT_APELLIDOS_REGISTRO}                id:registro_apellidos
${AP_INPUT_EMAIL_REGISTRO}                    id:registro_email
${AP_INPUT_TELEFONO_REGISTRO}                 id:registro_telefono
${AP_INPUT_DIRECCION_REGISTRO}                id:registro_direccion
${AP_BOTON_CONFIRMAR_REGISTRO}                id:btn_confirmar_registro
${AP_MENSAJE_REGISTRO_EXITOSO}                xpath://div[contains(text(),'Registro exitoso')]
${AP_FORMULARIO_REGISTRO}                     id:formulario_registro
${AP_CAMPO_VALIDACION_DATOS}                  css:.validacion-datos-registro

Acceder a módulo de registro en Amigo Paguitos Autogestión
    Click Element    ${AP_MENU_REGISTRO}
    Wait Until Element Is Visible    ${AP_FORMULARIO_REGISTRO}    timeout=10s

Ingresar datos personales completos para registro
    [Arguments]    ${nombre}    ${apellidos}    ${email}    ${telefono}    ${direccion}
    Input Text    ${AP_INPUT_NOMBRE_REGISTRO}    ${nombre}
    Input Text    ${AP_INPUT_APELLIDOS_REGISTRO}    ${apellidos}
    Input Text    ${AP_INPUT_EMAIL_REGISTRO}    ${email}
    Input Text    ${AP_INPUT_TELEFONO_REGISTRO}    ${telefono}
    Input Text    ${AP_INPUT_DIRECCION_REGISTRO}    ${direccion}

Validar que todos los campos obligatorios están completos
    Wait Until Element Is Visible    ${AP_BOTON_CONFIRMAR_REGISTRO}    timeout=5s
    Element Should Be Enabled    ${AP_BOTON_CONFIRMAR_REGISTRO}

Confirmar el registro del usuario
    Click Button    ${AP_BOTON_CONFIRMAR_REGISTRO}
    Wait Until Element Is Visible    ${AP_MENSAJE_REGISTRO_EXITOSO}    timeout=15s

Verificar confirmación de registro exitoso
    ${mensaje}=    Get Text    ${AP_MENSAJE_REGISTRO_EXITOSO}
    Should Contain    ${mensaje}    exitoso
    Log    Usuario registrado exitosamente en AP.AG

# ========================================
# LOCATORS Y KEYWORDS PARA CONFIGURACIÓN DE LÍMITE DE PRÉSTAMOS POR CLIENTE (TC037)
# ========================================
${AP_MENU_CONFIGURACION}                      id:menu_configuracion
${AP_SUBMENU_CONFIGURACION_PRESTAMOS}         id:submenu_config_prestamos
${AP_INPUT_LIMITE_PRESTAMOS_CLIENTE}          id:input_limite_prestamos_cliente
${AP_BOTON_GUARDAR_CONFIG_PRESTAMOS}          css:.btn-guardar-config-prestamos
${AP_MENSAJE_CONFIG_GUARDADA}                 xpath://div[contains(text(),'Configuración guardada exitosamente')]
${AP_CAMPO_LIMITE_ACTUAL}                     xpath://div[@data-field='limite_actual_prestamos']
${AP_MENU_VALIDACIONES}                       id:menu_validaciones
${AP_MENSAJE_LIMITE_EXCEDIDO}                 xpath://div[contains(text(),'límite máximo de préstamos')]
${AP_MENSAJE_VALIDACION_LIMITE}               css:.mensaje-validacion-limite

Acceder a módulo de configuración en Amigo Paguitos
    Click Element    ${AP_MENU_CONFIGURACION}
    Wait Until Element Is Visible    ${AP_SUBMENU_CONFIGURACION_PRESTAMOS}    timeout=10s

Acceder a configuración de límite de préstamos
    Click Element    ${AP_SUBMENU_CONFIGURACION_PRESTAMOS}
    Wait Until Element Is Visible    ${AP_INPUT_LIMITE_PRESTAMOS_CLIENTE}    timeout=10s

Configurar límite máximo de préstamos por cliente
    [Arguments]    ${limite}
    Input Text    ${AP_INPUT_LIMITE_PRESTAMOS_CLIENTE}    ${limite}
    Click Button    ${AP_BOTON_GUARDAR_CONFIG_PRESTAMOS}
    Wait Until Element Is Visible    ${AP_MENSAJE_CONFIG_GUARDADA}    timeout=10s

Verificar configuración de límite almacenada
    [Arguments]    ${limite_esperado}
    ${limite_actual}=    Get Text    ${AP_CAMPO_LIMITE_ACTUAL}
    Should Contain    ${limite_actual}    ${limite_esperado}
    Log    Límite de préstamos por cliente configurado: ${limite_actual}

Crear préstamo para cliente existente
    [Arguments]    ${identificacion}    ${monto}=15000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Acceder a módulo de ventas
    Iniciar nueva venta
    Input Text    ${AP_INPUT_IDENTIFICACION}    ${identificacion}
    Acceder a módulo de financiamiento
    Ingresar parámetros del financiamiento    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Aprobar el financiamiento
    Verificar estado de financiamiento aprobado

Verificar validación de límite de préstamos
    Page Should Contain Element    ${AP_MENSAJE_VALIDACION_LIMITE}
    Log    El sistema validó correctamente el límite de préstamos por cliente

Verificar rechazo por límite excedido
    Wait Until Element Is Visible    ${AP_MENSAJE_LIMITE_EXCEDIDO}    timeout=10s
    ${mensaje}=    Get Text    ${AP_MENSAJE_LIMITE_EXCEDIDO}
    Should Contain    ${mensaje}    límite máximo
    Log    Préstamo rechazado correctamente por exceder límite: ${mensaje}

# ========================================
# LOCATORS Y KEYWORDS PARA FLUJO COMPLETO DE LEGALES (TC042)
# ========================================
${AP_SECCION_LEGALES}                      id:seccion_legales
${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO}    id:documento_contrato_financiamiento
${AP_DOCUMENTO_TERMINOS_CONDICIONES}       id:documento_terminos_condiciones
${AP_DOCUMENTO_AVISO_PRIVACIDAD}           id:documento_aviso_privacidad
${AP_BOTON_CONTINUAR_LEGALES}              id:btn_continuar_legales
${AP_MENSAJE_LEGALES_COMPLETOS}            xpath://div[contains(text(),'Documentos legales completos')]
${AP_ETAPA_SIGUIENTE_AUTENTICACION}        id:menu_autenticacion

Acceder a módulo de legales en Amigo Paguitos
    Click Element    ${AP_MENU_LEGALES}
    Wait Until Element Is Visible    ${AP_SECCION_LEGALES}    timeout=10s

Verificar que se muestran todos los documentos legales requeridos
    Wait Until Element Is Visible    ${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO}    timeout=10s
    Wait Until Element Is Visible    ${AP_DOCUMENTO_TERMINOS_CONDICIONES}    timeout=10s
    Wait Until Element Is Visible    ${AP_DOCUMENTO_AVISO_PRIVACIDAD}    timeout=10s
    Page Should Contain Element    ${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO}
    Page Should Contain Element    ${AP_DOCUMENTO_TERMINOS_CONDICIONES}
    Page Should Contain Element    ${AP_DOCUMENTO_AVISO_PRIVACIDAD}

Verificar visualización de contrato de financiamiento
    Wait Until Element Is Visible    ${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO}    timeout=10s
    ${visible}=    Run Keyword And Return Status    Element Should Be Visible    ${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO}
    Should Be True    ${visible}
    Log    Contrato de financiamiento mostrado correctamente

Verificar visualización de términos y condiciones
    Wait Until Element Is Visible    ${AP_DOCUMENTO_TERMINOS_CONDICIONES}    timeout=10s
    ${visible}=    Run Keyword And Return Status    Element Should Be Visible    ${AP_DOCUMENTO_TERMINOS_CONDICIONES}
    Should Be True    ${visible}
    Log    Términos y condiciones mostrados correctamente

Verificar visualización de aviso de privacidad
    Wait Until Element Is Visible    ${AP_DOCUMENTO_AVISO_PRIVACIDAD}    timeout=10s
    ${visible}=    Run Keyword And Return Status    Element Should Be Visible    ${AP_DOCUMENTO_AVISO_PRIVACIDAD}
    Should Be True    ${visible}
    Log    Aviso de privacidad mostrado correctamente

Seleccionar checkbox de aceptación de términos
    Wait Until Element Is Visible    ${AP_CHECKBOX_ACEPTAR_TERMINOS}    timeout=10s
    Select Checkbox    ${AP_CHECKBOX_ACEPTAR_TERMINOS}
    Checkbox Should Be Selected    ${AP_CHECKBOX_ACEPTAR_TERMINOS}

Seleccionar checkbox de aceptación de aviso de privacidad
    Wait Until Element Is Visible    ${AP_CHECKBOX_ACEPTAR_PRIVACIDAD}    timeout=10s
    Select Checkbox    ${AP_CHECKBOX_ACEPTAR_PRIVACIDAD}
    Checkbox Should Be Selected    ${AP_CHECKBOX_ACEPTAR_PRIVACIDAD}

Verificar habilitación del botón continuar
    Wait Until Element Is Visible    ${AP_BOTON_CONTINUAR_LEGALES}    timeout=10s
    Element Should Be Enabled    ${AP_BOTON_CONTINUAR_LEGALES}
    Log    Botón continuar habilitado tras aceptación de términos

Confirmar aceptación de legales mediante botón
    Click Button    ${AP_BOTON_ACEPTAR_LEGALES}

Esperar confirmación de aceptación exitosa
    Wait Until Element Is Visible    ${AP_MENSAJE_LEGALES_ACEPTADOS}    timeout=10s

Verificar mensaje de aceptación de legales exitosa
    ${mensaje}=    Get Text    ${AP_MENSAJE_LEGALES_ACEPTADOS}
    Should Contain    ${mensaje}    aceptados
    Log    Aceptación de legales registrada exitosamente

Verificar avance a siguiente etapa del flujo
    Wait Until Element Is Visible    ${AP_ETAPA_SIGUIENTE_AUTENTICACION}    timeout=10s
    Page Should Contain Element    ${AP_ETAPA_SIGUIENTE_AUTENTICACION}
    Log    Sistema avanzó a la siguiente etapa después de aceptación de legales

# ========================================
# LOCATORS Y KEYWORDS PARA FLUJO COMPLETO DE EVALUACIÓN (TC044)
# ========================================
${AP_SECCION_EVALUACION}                      id:seccion_evaluacion
${AP_INPUT_INGRESOS_MENSUALES}                id:evaluacion_ingresos_mensuales
${AP_SELECT_TIPO_EMPLEO}                      id:evaluacion_tipo_empleo
${AP_INPUT_ANTIGUEDAD_LABORAL}                id:evaluacion_antiguedad_laboral
${AP_INPUT_NOMBRE_EMPRESA}                    id:evaluacion_nombre_empresa
${AP_INPUT_REFERENCIA_PERSONAL_1}             id:evaluacion_referencia_personal_1
${AP_INPUT_REFERENCIA_PERSONAL_2}             id:evaluacion_referencia_personal_2
${AP_INPUT_HISTORIAL_CREDITICIO}              id:evaluacion_historial_crediticio
${AP_BOTON_ENVIAR_EVALUACION}                 id:btn_enviar_evaluacion
${AP_LOADER_EVALUACION}                       css:.loader-evaluacion
${AP_MENSAJE_EVALUACION_PROCESADA}            xpath://div[contains(text(),'Evaluación procesada')]
${AP_CAMPO_ESTADO_EVALUACION}                 css:.estado-evaluacion
${AP_CAMPO_MONTO_AUTORIZADO}                  css:.monto-autorizado
${AP_CAMPO_MOTIVO_RECHAZO}                    css:.motivo-rechazo
${AP_PANEL_RESULTADO_EVALUACION}              id:panel_resultado_evaluacion
${AP_ETAPA_SIGUIENTE_OFERTA}                  id:menu_oferta

Acceder a módulo de evaluación crediticia
    Click Element    ${AP_MENU_EVALUACION}
    Wait Until Element Is Visible    ${AP_SECCION_EVALUACION}    timeout=10s

Ingresar información financiera para evaluación
    [Arguments]    ${ingresos}    ${tipo_empleo}    ${antiguedad}    ${empresa}    ${referencia}
    Input Text    ${AP_INPUT_INGRESOS_MENSUALES}    ${ingresos}
    Select From List By Label    ${AP_SELECT_TIPO_EMPLEO}    ${tipo_empleo}
    Input Text    ${AP_INPUT_ANTIGUEDAD_LABORAL}    ${antiguedad}
    Input Text    ${AP_INPUT_NOMBRE_EMPRESA}    ${empresa}
    Input Text    ${AP_INPUT_REFERENCIA_PERSONAL_1}    ${referencia}

Ingresar información financiera completa para evaluación
    [Arguments]    ${ingresos}    ${tipo_empleo}    ${antiguedad}    ${empresa}    ${referencia1}    ${referencia2}    ${historial}
    Input Text    ${AP_INPUT_INGRESOS_MENSUALES}    ${ingresos}
    Select From List By Label    ${AP_SELECT_TIPO_EMPLEO}    ${tipo_empleo}
    Input Text    ${AP_INPUT_ANTIGUEDAD_LABORAL}    ${antiguedad}
    Input Text    ${AP_INPUT_NOMBRE_EMPRESA}    ${empresa}
    Input Text    ${AP_INPUT_REFERENCIA_PERSONAL_1}    ${referencia1}
    Input Text    ${AP_INPUT_REFERENCIA_PERSONAL_2}    ${referencia2}
    Input Text    ${AP_INPUT_HISTORIAL_CREDITICIO}    ${historial}

Enviar información para evaluación crediticia
    Click Button    ${AP_BOTON_ENVIAR_EVALUACION}
    Wait Until Element Is Not Visible    ${AP_LOADER_EVALUACION}    timeout=30s
    Wait Until Element Is Visible    ${AP_MENSAJE_EVALUACION_PROCESADA}    timeout=15s

Validar que información financiera fue recibida
    Element Should Be Visible    ${AP_BOTON_ENVIAR_EVALUACION}
    Element Should Be Enabled    ${AP_BOTON_ENVIAR_EVALUACION}

Esperar resultado de evaluación crediticia
    Wait Until Element Is Visible    ${AP_PANEL_RESULTADO_EVALUACION}    timeout=20s
    Wait Until Element Is Visible    ${AP_CAMPO_ESTADO_EVALUACION}    timeout=10s

Verificar resultado de evaluación aprobada
    ${estado}=    Get Text    ${AP_CAMPO_ESTADO_EVALUACION}
    Should Contain    ${estado}    Aprobada
    Log    Evaluación crediticia aprobada

Verificar monto autorizado en evaluación
    Wait Until Element Is Visible    ${AP_CAMPO_MONTO_AUTORIZADO}    timeout=10s
    ${monto}=    Get Text    ${AP_CAMPO_MONTO_AUTORIZADO}
    Should Not Be Empty    ${monto}
    Log    Monto autorizado: ${monto}
    [Return]    ${monto}

Verificar resultado de evaluación rechazada
    ${estado}=    Get Text    ${AP_CAMPO_ESTADO_EVALUACION}
    Should Contain    ${estado}    Rechazada
    Wait Until Element Is Visible    ${AP_CAMPO_MOTIVO_RECHAZO}    timeout=10s
    ${motivo}=    Get Text    ${AP_CAMPO_MOTIVO_RECHAZO}
    Should Not Be Empty    ${motivo}
    Log    Evaluación rechazada. Motivo: ${motivo}

Verificar que resultado incluye aprobación con monto o rechazo con motivo
    ${estado}=    Get Text    ${AP_CAMPO_ESTADO_EVALUACION}
    Run Keyword If    '${estado}' == 'Aprobada'    Verificar monto autorizado en evaluación
    Run Keyword If    '${estado}' == 'Rechazada'    Verificar resultado de evaluación rechazada

Ejecutar flujo completo de evaluación crediticia en AP.AG
    [Arguments]    ${ingresos}=50000    ${tipo_empleo}=Empleado    ${antiguedad}=2    ${empresa}=Empresa Ejemplo SA    ${referencia}=5551234567
    Acceder a módulo de evaluación crediticia
    Ingresar información financiera para evaluación    ${ingresos}    ${tipo_empleo}    ${antiguedad}    ${empresa}    ${referencia}
    Validar que información financiera fue recibida
    Enviar información para evaluación crediticia
    Esperar resultado de evaluación crediticia
    Verificar resultado de evaluación aprobada
    Verificar monto autorizado en evaluación

# ========================================
# LOCATORS Y KEYWORDS PARA FLUJO COMPLETO DE OFERTA (TC045)
# ========================================
${AP_SECCION_OFERTA}                       id:seccion_oferta
${AP_TABLA_OPCIONES_FINANCIAMIENTO}        xpath://table[@id='tabla_opciones_financiamiento']
${AP_CAMPO_OPCION_PLAZO_3_MESES}           xpath://td[@data-plazo='3']
${AP_CAMPO_OPCION_PLAZO_6_MESES}           xpath://td[@data-plazo='6']
${AP_CAMPO_OPCION_PLAZO_9_MESES}           xpath://td[@data-plazo='9']
${AP_CAMPO_OPCION_PLAZO_12_MESES}          xpath://td[@data-plazo='12']
${AP_CAMPO_PERIODICIDAD_SEMANAL}           xpath://td[@data-periodicidad='semanal']
${AP_CAMPO_PERIODICIDAD_QUINCENAL}         xpath://td[@data-periodicidad='quincenal']
${AP_CAMPO_PERIODICIDAD_MENSUAL}           xpath://td[@data-periodicidad='mensual']
${AP_CAMPO_DETALLE_MONTO_OFERTA}           css:.detalle-monto-oferta
${AP_CAMPO_DETALLE_PLAZO_OFERTA}           css:.detalle-plazo-oferta
${AP_CAMPO_DETALLE_PERIODICIDAD_OFERTA}    css:.detalle-periodicidad-oferta
${AP_CAMPO_DETALLE_TASA_INTERES_OFERTA}    css:.detalle-tasa-interes-oferta
${AP_CAMPO_DETALLE_MONTO_PARCIALIDADES}    css:.detalle-monto-parcialidades
${AP_RADIO_OPCION_OFERTA}                  xpath://input[@type='radio' and @name='opcion_oferta']
${AP_RADIO_OFERTA_PLAZO}                   xpath://input[@type='radio' and @data-plazo-value]
${AP_RADIO_OFERTA_PERIODICIDAD}            xpath://input[@type='radio' and @data-periodicidad-value]
${AP_BOTON_VER_DESGLOSE_OFERTA}            id:btn_ver_desglose_oferta
${AP_PANEL_DESGLOSE_PAGOS_OFERTA}          id:panel_desglose_pagos
${AP_BOTON_CONFIRMAR_OFERTA}               id:btn_confirmar_oferta
${AP_MENSAJE_OFERTA_CONFIRMADA}            xpath://div[contains(text(),'Oferta confirmada exitosamente')]
${AP_ESTADO_OFERTA_ACEPTADA}               css:.estado-oferta-aceptada
${AP_BOTON_CONTINUAR_DESDE_OFERTA}         id:btn_continuar_desde_oferta
${AP_CAMPO_NUMERO_PARCIALIDADES_OFERTA}    css:.numero-parcialidades-oferta

Acceder a módulo de oferta en Amigo Paguitos
    Click Element    ${AP_MENU_OFERTA}
    Wait Until Element Is Visible    ${AP_SECCION_OFERTA}    timeout=10s

Verificar visualización de tabla de opciones de financiamiento
    Wait Until Element Is Visible    ${AP_TABLA_OPCIONES_FINANCIAMIENTO}    timeout=10s
    Page Should Contain Element    ${AP_TABLA_OPCIONES_FINANCIAMIENTO}
    Log    Tabla de opciones de financiamiento mostrada correctamente

Verificar disponibilidad de opciones de plazo
    Wait Until Element Is Visible    ${AP_CAMPO_OPCION_PLAZO_3_MESES}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_OPCION_PLAZO_6_MESES}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_OPCION_PLAZO_9_MESES}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_OPCION_PLAZO_12_MESES}    timeout=10s
    Log    Opciones de plazo disponibles: 3, 6, 9 y 12 meses

Verificar disponibilidad de opciones de periodicidad
    Wait Until Element Is Visible    ${AP_CAMPO_PERIODICIDAD_SEMANAL}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_PERIODICIDAD_QUINCENAL}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_PERIODICIDAD_MENSUAL}    timeout=10s
    Log    Opciones de periodicidad disponibles: semanal, quincenal y mensual

Revisar detalle de opción de oferta
    [Arguments]    ${plazo}=12
    ${xpath_fila_opcion}=    Set Variable    xpath://tr[@data-plazo='${plazo}']
    Wait Until Element Is Visible    ${xpath_fila_opcion}    timeout=10s
    Click Element    ${AP_BOTON_VER_DESGLOSE_OFERTA}
    Wait Until Element Is Visible    ${AP_PANEL_DESGLOSE_PAGOS_OFERTA}    timeout=10s
    ${monto}=    Get Text    ${AP_CAMPO_DETALLE_MONTO_OFERTA}
    ${tasa}=    Get Text    ${AP_CAMPO_DETALLE_TASA_INTERES_OFERTA}
    ${parcialidad}=    Get Text    ${AP_CAMPO_DETALLE_MONTO_PARCIALIDADES}
    Log    Detalle de oferta: Monto=${monto}, Tasa=${tasa}, Parcialidad=${parcialidad}

Seleccionar opción de oferta por plazo y periodicidad
    [Arguments]    ${plazo}=12    ${periodicidad}=mensual
    ${xpath_radio}=    Set Variable    xpath://input[@type='radio' and @data-plazo-value='${plazo}' and @data-periodicidad-value='${periodicidad}']
    Wait Until Element Is Visible    ${xpath_radio}    timeout=10s
    Select Radio Button    opcion_oferta    ${xpath_radio}
    Log    Opción seleccionada: Plazo=${plazo} meses, Periodicidad=${periodicidad}

Confirmar aceptación de oferta
    Click Button    ${AP_BOTON_CONFIRMAR_OFERTA}
    Wait Until Element Is Visible    ${AP_MENSAJE_OFERTA_CONFIRMADA}    timeout=15s
    Log    Oferta confirmada exitosamente

Verificar oferta aceptada y registrada
    Wait Until Element Is Visible    ${AP_ESTADO_OFERTA_ACEPTADA}    timeout=10s
    ${estado}=    Get Text    ${AP_ESTADO_OFERTA_ACEPTADA}
    Should Contain    ${estado}    Aceptada
    Log    Estado de oferta: ${estado}

Verificar habilitación de continuación del flujo
    Wait Until Element Is Visible    ${AP_BOTON_CONTINUAR_DESDE_OFERTA}    timeout=10s
    Element Should Be Enabled    ${AP_BOTON_CONTINUAR_DESDE_OFERTA}
    Log    Botón de continuación habilitado correctamente

Obtener detalles de oferta aceptada
    ${monto}=    Get Text    ${AP_CAMPO_DETALLE_MONTO_OFERTA}
    ${plazo}=    Get Text    ${AP_CAMPO_DETALLE_PLAZO_OFERTA}
    ${periodicidad}=    Get Text    ${AP_CAMPO_DETALLE_PERIODICIDAD_OFERTA}
    ${tasa}=    Get Text    ${AP_CAMPO_DETALLE_TASA_INTERES_OFERTA}
    ${num_parcialidades}=    Get Text    ${AP_CAMPO_NUMERO_PARCIALIDADES_OFERTA}
    Log    Detalles de oferta aceptada: Monto=${monto}, Plazo=${plazo}, Periodicidad=${periodicidad}, Tasa=${tasa}, Parcialidades=${num_parcialidades}
    [Return]    ${monto}    ${plazo}    ${periodicidad}    ${tasa}    ${num_parcialidades}

Ejecutar flujo completo de oferta en AP.AG
    [Arguments]    ${plazo}=12    ${periodicidad}=mensual
    Acceder a módulo de oferta en Amigo Paguitos
    Verificar visualización de tabla de opciones de financiamiento
    Verificar disponibilidad de opciones de plazo
    Verificar disponibilidad de opciones de periodicidad
    Revisar detalle de opción de oferta    ${plazo}
    Seleccionar opción de oferta por plazo y periodicidad    ${plazo}    ${periodicidad}
    Confirmar aceptación de oferta
    Verificar oferta aceptada y registrada
    Verificar habilitación de continuación del flujo

# ========================================
# LOCATORS Y KEYWORDS PARA ENROLAMIENTO COMPLETO DE EQUIPOS (TC046)
# ========================================
${AP_SECCION_ENROLAMIENTO_EQUIPOS}         id:seccion_enrolamiento_equipos
${AP_INPUT_MARCA_EQUIPO}                   id:input_marca_equipo
${AP_INPUT_MODELO_EQUIPO}                  id:input_modelo_equipo
${AP_INPUT_CARACTERISTICAS_TECNICAS}       id:input_caracteristicas_tecnicas
${AP_MENSAJE_IMEI_VALIDO}                  xpath://div[contains(text(),'IMEI válido')]
${AP_MENSAJE_IMEI_INVALIDO}                xpath://div[contains(text(),'IMEI inválido')]
${AP_MENSAJE_EQUIPO_ASOCIADO}              xpath://div[contains(text(),'Equipo asociado al préstamo')]
${AP_BOTON_CONFIRMAR_REGISTRO_EQUIPO}      id:btn_confirmar_registro_equipo
${AP_MENSAJE_ENROLAMIENTO_FINALIZADO}      xpath://div[contains(text(),'Enrolamiento finalizado')]
${AP_CAMPO_VALIDACION_IMEI}                css:.validacion-imei
${AP_CAMPO_ESTADO_REGISTRO_EQUIPO}         css:.estado-registro-equipo
${AP_BOTON_PREPARAR_TRANSFERENCIA_BES}     id:btn_preparar_transferencia_bes

Acceder a etapa de enrolamiento de equipos
    Click Element    ${AP_MENU_ENROLAMIENTO_EQUIPOS}
    Wait Until Element Is Visible    ${AP_SECCION_ENROLAMIENTO_EQUIPOS}    timeout=10s
    Log    Acceso a etapa de Enrolamiento de Equipos

Verificar que el sistema muestra pantalla para registrar información del equipo
    Wait Until Element Is Visible    ${AP_INPUT_IMEI}    timeout=10s
    Wait Until Element Is Visible    ${AP_INPUT_MARCA_EQUIPO}    timeout=10s
    Wait Until Element Is Visible    ${AP_INPUT_MODELO_EQUIPO}    timeout=10s
    Page Should Contain Element    ${AP_SECCION_ENROLAMIENTO_EQUIPOS}
    Log    Pantalla de registro de equipo mostrada correctamente

Ingresar datos del equipo a financiar
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM
    Input Text    ${AP_INPUT_IMEI}    ${imei}
    Input Text    ${AP_INPUT_MARCA_EQUIPO}    ${marca}
    Input Text    ${AP_INPUT_MODELO_EQUIPO}    ${modelo}
    Input Text    ${AP_INPUT_CARACTERISTICAS_TECNICAS}    ${caracteristicas}
    Log    Datos del equipo ingresados: IMEI=${imei}, Marca=${marca}, Modelo=${modelo}

Verificar validación de IMEI válido
    Wait Until Element Is Visible    ${AP_MENSAJE_IMEI_VALIDO}    timeout=10s
    ${validacion}=    Get Text    ${AP_CAMPO_VALIDACION_IMEI}
    Should Contain    ${validacion}    válido
    Log    IMEI validado correctamente

Verificar que IMEI corresponde al equipo seleccionado
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro
    Wait Until Element Is Visible    ${AP_CAMPO_VALIDACION_IMEI}    timeout=10s
    ${validacion}=    Get Text    ${AP_CAMPO_VALIDACION_IMEI}
    Should Contain    ${validacion}    ${marca}
    Should Contain    ${validacion}    ${modelo}
    Log    IMEI ${imei} corresponde al equipo ${marca} ${modelo}

Registrar equipo asociándolo al financiamiento
    Click Button    ${AP_BOTON_CONFIRMAR_REGISTRO_EQUIPO}
    Wait Until Element Is Visible    ${AP_MENSAJE_EQUIPO_ASOCIADO}    timeout=15s
    Log    Equipo registrado y asociado al financiamiento

Verificar confirmación de registro del equipo
    Wait Until Element Is Visible    ${AP_MENSAJE_EQUIPO_ASOCIADO}    timeout=10s
    ${estado}=    Get Text    ${AP_CAMPO_ESTADO_REGISTRO_EQUIPO}
    Should Contain    ${estado}    asociado
    Log    Confirmación de registro del equipo recibida

Completar proceso de enrolamiento del equipo
    Click Button    ${AP_BOTON_ENROLLAR_EQUIPO}
    Wait Until Element Is Visible    ${AP_MENSAJE_ENROLAMIENTO_FINALIZADO}    timeout=15s
    Log    Proceso de enrolamiento completado

Verificar finalización de enrolamiento y preparación de información
    Wait Until Element Is Visible    ${AP_MENSAJE_ENROLAMIENTO_FINALIZADO}    timeout=10s
    Page Should Contain Element    ${AP_BOTON_PREPARAR_TRANSFERENCIA_BES}
    Log    Enrolamiento finalizado, información preparada para transferencia a BES

Preparar información del equipo para registro en sistemas de bloqueo
    Click Button    ${AP_BOTON_PREPARAR_TRANSFERENCIA_BES}
    Log    Información del equipo preparada para sistemas de bloqueo

Ejecutar flujo completo de enrolamiento de equipos en AP.AG
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM
    Acceder a etapa de enrolamiento de equipos
    Verificar que el sistema muestra pantalla para registrar información del equipo
    Ingresar datos del equipo a financiar    ${imei}    ${marca}    ${modelo}    ${caracteristicas}
    Verificar validación de IMEI válido
    Verificar que IMEI corresponde al equipo seleccionado    ${imei}    ${marca}    ${modelo}
    Registrar equipo asociándolo al financiamiento
    Verificar confirmación de registro del equipo
    Completar proceso de enrolamiento del equipo
    Verificar finalización de enrolamiento y preparación de información
    Preparar información del equipo para registro en sistemas de bloqueo

# ========================================
# LOCATORS Y KEYWORDS PARA FLUJO COMPLETO DE PAGO DE ENGANCHE (TC047)
# ========================================
${AP_CAMPO_MONTO_ENGANCHE_REQUERIDO}       css:.monto-enganche-requerido
${AP_SECCION_OPCIONES_PAGO_ENGANCHE}       id:seccion_opciones_pago_enganche
${AP_TABLA_METODOS_PAGO_DISPONIBLES}       xpath://table[@id='tabla_metodos_pago']
${AP_CAMPO_METODO_PAGO_KIOSCO}             xpath://td[contains(text(),'Kiosco con TDC')]
${AP_CAMPO_METODO_PAGO_OXXO}               xpath://td[contains(text(),'OXXO')]
${AP_CAMPO_METODO_PAGO_SICATEL}            xpath://td[contains(text(),'SICATEL')]
${AP_BOTON_SELECCIONAR_METODO_PAGO}        id:btn_seleccionar_metodo_pago
${AP_MENSAJE_METODO_PAGO_SELECCIONADO}     xpath://div[contains(text(),'Método de pago seleccionado')]
${AP_CAMPO_INSTRUCCIONES_PAGO}             css:.instrucciones-pago-enganche
${AP_MENSAJE_ESPERANDO_CONFIRMACION_PAGO}  xpath://div[contains(text(),'Esperando confirmación de pago')]
${AP_MENSAJE_PAGO_CONFIRMADO_BES}          xpath://div[contains(text(),'Pago confirmado por BES')]
${AP_BOTON_CONTINUAR_SIGUIENTE_ETAPA}      id:btn_continuar_siguiente_etapa
${AP_MENSAJE_SIGUIENTE_ETAPA_HABILITADA}   xpath://div[contains(text(),'Siguiente etapa habilitada')]

Acceder a etapa de pago de enganche en AP.AG
    Click Element    ${AP_MENU_PAGO_ENGANCHE}
    Wait Until Element Is Visible    ${AP_INPUT_MONTO_ENGANCHE}    timeout=10s
    Log    Acceso a etapa de Pago de Enganche en AP.AG

Verificar visualización del monto del enganche requerido
    [Arguments]    ${monto_esperado}=5000
    Wait Until Element Is Visible    ${AP_CAMPO_MONTO_ENGANCHE_REQUERIDO}    timeout=10s
    ${monto}=    Get Text    ${AP_CAMPO_MONTO_ENGANCHE_REQUERIDO}
    Should Contain    ${monto}    ${monto_esperado}
    Log    Monto del enganche requerido: ${monto}

Verificar visualización de opciones de pago disponibles
    Wait Until Element Is Visible    ${AP_SECCION_OPCIONES_PAGO_ENGANCHE}    timeout=10s
    Wait Until Element Is Visible    ${AP_TABLA_METODOS_PAGO_DISPONIBLES}    timeout=10s
    Page Should Contain Element    ${AP_CAMPO_METODO_PAGO_KIOSCO}
    Page Should Contain Element    ${AP_CAMPO_METODO_PAGO_SICATEL}
    Log    Opciones de pago disponibles mostradas correctamente

Seleccionar método de pago del enganche
    [Arguments]    ${metodo_pago}=Kiosco con TDC
    ${xpath_metodo}=    Set Variable    xpath://tr[td[contains(text(),'${metodo_pago}')]]//button[@id='btn_seleccionar_metodo_pago']
    Wait Until Element Is Visible    ${xpath_metodo}    timeout=10s
    Click Button    ${xpath_metodo}
    Wait Until Element Is Visible    ${AP_MENSAJE_METODO_PAGO_SELECCIONADO}    timeout=10s
    Log    Método de pago seleccionado: ${metodo_pago}

Verificar instrucciones específicas para realizar el pago
    Wait Until Element Is Visible    ${AP_CAMPO_INSTRUCCIONES_PAGO}    timeout=10s
    ${instrucciones}=    Get Text    ${AP_CAMPO_INSTRUCCIONES_PAGO}
    Should Not Be Empty    ${instrucciones}
    Log    Instrucciones para realizar el pago: ${instrucciones}

Esperar confirmación de pago desde CPS y BES
    Wait Until Element Is Visible    ${AP_MENSAJE_ESPERANDO_CONFIRMACION_PAGO}    timeout=10s
    Wait Until Element Is Visible    ${AP_MENSAJE_PAGO_CONFIRMADO_BES}    timeout=30s
    Log    Pago confirmado por BES

Verificar habilitación de siguiente etapa del flujo
    Wait Until Element Is Visible    ${AP_BOTON_CONTINUAR_SIGUIENTE_ETAPA}    timeout=10s
    Element Should Be Enabled    ${AP_BOTON_CONTINUAR_SIGUIENTE_ETAPA}
    Wait Until Element Is Visible    ${AP_MENSAJE_SIGUIENTE_ETAPA_HABILITADA}    timeout=10s
    Log    Siguiente etapa del flujo habilitada correctamente

Continuar a siguiente etapa tras confirmación de pago
    Click Button    ${AP_BOTON_CONTINUAR_SIGUIENTE_ETAPA}
    Log    Continuando a siguiente etapa del flujo

# ========================================
# LOCATORS Y KEYWORDS PARA GENERACIÓN DE REFERENCIA DE PAGO OXXO (TC077)
# ========================================
${AP_CAMPO_REFERENCIA_PAGO_OXXO}          css:.referencia-pago-oxxo
${AP_BOTON_GENERAR_REFERENCIA_OXXO}       id:btn_generar_referencia_oxxo
${AP_MENSAJE_REFERENCIA_GENERADA}         xpath://div[contains(text(),'Referencia generada')]
${AP_CAMPO_MONTO_REFERENCIA_OXXO}         css:.monto-referencia-oxxo
${AP_PANEL_INSTRUCCIONES_PAGO_OXXO}       id:panel_instrucciones_oxxo
${AP_CAMPO_CODIGO_BARRAS_OXXO}            css:.codigo-barras-oxxo
${AP_MENSAJE_VENTA_PENDIENTE_PAGO}        xpath://div[contains(text(),'Venta pendiente de pago de enganche')]

Generar referencia de pago OXXO para enganche
    [Arguments]    ${monto_enganche}=5000
    Wait Until Element Is Visible    ${AP_MENU_PAGO_ENGANCHE}    timeout=10s
    Click Element    ${AP_MENU_PAGO_ENGANCHE}
    Wait Until Element Is Visible    ${AP_SELECT_METODO_PAGO}    timeout=10s
    Select From List By Label    ${AP_SELECT_METODO_PAGO}    OXXO
    Input Text    ${AP_INPUT_MONTO_ENGANCHE}    ${monto_enganche}
    Click Button    ${AP_BOTON_GENERAR_REFERENCIA_OXXO}
    Wait Until Element Is Visible    ${AP_MENSAJE_REFERENCIA_GENERADA}    timeout=15s
    Log    Referencia de pago OXXO generada

Obtener referencia de pago OXXO
    Wait Until Element Is Visible    ${AP_CAMPO_REFERENCIA_PAGO_OXXO}    timeout=10s
    ${referencia}=    Get Text    ${AP_CAMPO_REFERENCIA_PAGO_OXXO}
    Should Not Be Empty    ${referencia}
    Log    Referencia OXXO: ${referencia}
    [Return]    ${referencia}

Verificar monto en referencia de pago OXXO
    [Arguments]    ${monto_esperado}=5000
    Wait Until Element Is Visible    ${AP_CAMPO_MONTO_REFERENCIA_OXXO}    timeout=10s
    ${monto}=    Get Text    ${AP_CAMPO_MONTO_REFERENCIA_OXXO}
    Should Contain    ${monto}    ${monto_esperado}
    Log    Monto de enganche en referencia OXXO: ${monto}

Verificar instrucciones de pago OXXO mostradas al cliente
    Wait Until Element Is Visible    ${AP_PANEL_INSTRUCCIONES_PAGO_OXXO}    timeout=10s
    Page Should Contain Element    ${AP_CAMPO_CODIGO_BARRAS_OXXO}
    ${instrucciones}=    Get Text    ${AP_PANEL_INSTRUCCIONES_PAGO_OXXO}
    Should Not Be Empty    ${instrucciones}
    Log    Instrucciones de pago OXXO mostradas al cliente

Verificar venta en estado pendiente de pago de enganche
    Wait Until Element Is Visible    ${AP_MENSAJE_VENTA_PENDIENTE_PAGO}    timeout=10s
    ${estado}=    Get Text    ${AP_ESTADO_VENTA}
    Should Contain    ${estado}    Pendiente
    Log    Venta en estado: Pendiente de pago de enganche

# ========================================
# LOCATORS Y KEYWORDS PARA FLUJO COMPLETO DE ENVÍO DE CONTRATO (TC048)
# ========================================
${AP_SECCION_ENVIO_CONTRATO}               id:seccion_envio_contrato
${AP_PANEL_CONTRATO_GENERADO}              id:panel_contrato_generado
${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO_COMPLETO}    id:documento_contrato_financiamiento_completo
${AP_CAMPO_TERMINOS_CONTRATO}              css:.terminos-contrato
${AP_CAMPO_MONTO_CONTRATO}                 css:.monto-contrato
${AP_CAMPO_PLAZO_CONTRATO}                 css:.plazo-contrato
${AP_CAMPO_TASA_CONTRATO}                  css:.tasa-contrato
${AP_CAMPO_CALENDARIO_PAGOS_CONTRATO}      css:.calendario-pagos-contrato
${AP_TABLA_CALENDARIO_CONTRATO}            xpath://table[@id='tabla_calendario_contrato']
${AP_CHECKBOX_ACEPTAR_FIRMA_CONTRATO}      id:checkbox_aceptar_firma_contrato
${AP_BOTON_FIRMAR_CONTRATO}                id:btn_firmar_contrato
${AP_MENSAJE_CONTRATO_FIRMADO}             xpath://div[contains(text(),'Contrato firmado exitosamente')]
${AP_CAMPO_ESTADO_FIRMA_CONTRATO}          css:.estado-firma-contrato
${AP_SELECT_CANAL_ENVIO_CONTRATO}          id:select_canal_envio_contrato
${AP_RADIO_CANAL_EMAIL}                    xpath://input[@type='radio' and @value='email']
${AP_RADIO_CANAL_SMS}                      xpath://input[@type='radio' and @value='sms']
${AP_INPUT_TELEFONO_SMS_CONTRATO}          id:input_telefono_sms_contrato
${AP_MENSAJE_CONFIRMACION_ENVIO_CONTRATO}  xpath://div[contains(text(),'Confirmación de envío')]
${AP_CAMPO_NUMERO_CONFIRMACION_ENVIO}      css:.numero-confirmacion-envio
${AP_MENSAJE_FORMALIZACION_VENTA_COMPLETA} xpath://div[contains(text(),'Formalización de venta completa')]
${AP_CAMPO_ESTADO_FORMALIZACION}           css:.estado-formalizacion

Acceder a etapa de envío de contrato en AP.AG
    Click Element    ${AP_MENU_ENVIO_CONTRATO}
    Wait Until Element Is Visible    ${AP_SECCION_ENVIO_CONTRATO}    timeout=10s
    Log    Acceso a etapa de Envío de Contrato en AP.AG

Verificar que el sistema genera el contrato de financiamiento
    Wait Until Element Is Visible    ${AP_PANEL_CONTRATO_GENERADO}    timeout=15s
    Wait Until Element Is Visible    ${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO_COMPLETO}    timeout=10s
    Page Should Contain Element    ${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO_COMPLETO}
    Log    Sistema generó el contrato de financiamiento con toda la información

Verificar información del préstamo en el contrato
    [Arguments]    ${monto_esperado}=50000    ${plazo_esperado}=12    ${tasa_esperada}=15.5
    Wait Until Element Is Visible    ${AP_CAMPO_MONTO_CONTRATO}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_PLAZO_CONTRATO}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_TASA_CONTRATO}    timeout=10s
    ${monto}=    Get Text    ${AP_CAMPO_MONTO_CONTRATO}
    ${plazo}=    Get Text    ${AP_CAMPO_PLAZO_CONTRATO}
    ${tasa}=    Get Text    ${AP_CAMPO_TASA_CONTRATO}
    Should Contain    ${monto}    ${monto_esperado}
    Should Contain    ${plazo}    ${plazo_esperado}
    Should Contain    ${tasa}    ${tasa_esperada}
    Log    Información del préstamo verificada: Monto=${monto}, Plazo=${plazo}, Tasa=${tasa}

Verificar información del cliente en el contrato
    [Arguments]    ${nombre_esperado}=Juan Pérez    ${identificacion_esperada}=ABC123456
    ${contrato_texto}=    Get Text    ${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO_COMPLETO}
    Should Contain    ${contrato_texto}    ${nombre_esperado}
    Should Contain    ${contrato_texto}    ${identificacion_esperada}
    Log    Información del cliente verificada en el contrato

Verificar información del equipo en el contrato
    [Arguments]    ${equipo_esperado}=iPhone 15 Pro
    ${contrato_texto}=    Get Text    ${AP_DOCUMENTO_CONTRATO_FINANCIAMIENTO_COMPLETO}
    Should Contain    ${contrato_texto}    ${equipo_esperado}
    Log    Información del equipo verificada en el contrato

Verificar términos del financiamiento en el contrato
    Wait Until Element Is Visible    ${AP_CAMPO_TERMINOS_CONTRATO}    timeout=10s
    ${terminos}=    Get Text    ${AP_CAMPO_TERMINOS_CONTRATO}
    Should Not Be Empty    ${terminos}
    Log    Términos del financiamiento mostrados en el contrato

Verificar calendario de pagos en el contrato
    Wait Until Element Is Visible    ${AP_CAMPO_CALENDARIO_PAGOS_CONTRATO}    timeout=10s
    Wait Until Element Is Visible    ${AP_TABLA_CALENDARIO_CONTRATO}    timeout=10s
    Page Should Contain Element    ${AP_TABLA_CALENDARIO_CONTRATO}
    ${filas}=    Get Element Count    ${AP_TABLA_CALENDARIO_CONTRATO}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Calendario de pagos verificado en el contrato con ${filas} cuotas

Revisar el contrato generado con todos los términos del financiamiento
    [Arguments]    ${monto}=50000    ${plazo}=12    ${tasa}=15.5    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${equipo}=iPhone 15 Pro
    Verificar que el sistema genera el contrato de financiamiento
    Verificar información del préstamo en el contrato    ${monto}    ${plazo}    ${tasa}
    Verificar información del cliente en el contrato    ${nombre}    ${identificacion}
    Verificar información del equipo en el contrato    ${equipo}
    Verificar términos del financiamiento en el contrato
    Verificar calendario de pagos en el contrato

Confirmar aceptación del contrato
    Wait Until Element Is Visible    ${AP_CHECKBOX_ACEPTAR_FIRMA_CONTRATO}    timeout=10s
    Select Checkbox    ${AP_CHECKBOX_ACEPTAR_FIRMA_CONTRATO}
    Checkbox Should Be Selected    ${AP_CHECKBOX_ACEPTAR_FIRMA_CONTRATO}
    Log    Checkbox de aceptación del contrato seleccionado

Firmar el contrato
    Wait Until Element Is Visible    ${AP_BOTON_FIRMAR_CONTRATO}    timeout=10s
    Element Should Be Enabled    ${AP_BOTON_FIRMAR_CONTRATO}
    Click Button    ${AP_BOTON_FIRMAR_CONTRATO}
    Wait Until Element Is Visible    ${AP_MENSAJE_CONTRATO_FIRMADO}    timeout=15s
    Log    Contrato firmado exitosamente

Verificar registro de firma del contrato
    Wait Until Element Is Visible    ${AP_MENSAJE_CONTRATO_FIRMADO}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_ESTADO_FIRMA_CONTRATO}    timeout=10s
    ${estado}=    Get Text    ${AP_CAMPO_ESTADO_FIRMA_CONTRATO}
    Should Contain    ${estado}    firmado
    Log    Firma del contrato registrada correctamente

Seleccionar canal de envío del contrato
    [Arguments]    ${canal}=email
    Wait Until Element Is Visible    ${AP_SELECT_CANAL_ENVIO_CONTRATO}    timeout=10s
    Run Keyword If    '${canal}' == 'email'    Click Element    ${AP_RADIO_CANAL_EMAIL}
    Run Keyword If    '${canal}' == 'sms'    Click Element    ${AP_RADIO_CANAL_SMS}
    Log    Canal de envío seleccionado: ${canal}

Ingresar destinatario del contrato
    [Arguments]    ${email}    ${telefono}=${EMPTY}
    Run Keyword If    '${email}' != '${EMPTY}'    Input Text    ${AP_INPUT_EMAIL_CONTRATO}    ${email}
    Run Keyword If    '${telefono}' != '${EMPTY}'    Input Text    ${AP_INPUT_TELEFONO_SMS_CONTRATO}    ${telefono}
    Log    Destinatario del contrato ingresado

Enviar contrato al cliente mediante canal especificado
    [Arguments]    ${canal}=email    ${email}=cliente@telcel.com    ${telefono}=${EMPTY}
    Seleccionar canal de envío del contrato    ${canal}
    Ingresar destinatario del contrato    ${email}    ${telefono}
    Click Button    ${AP_BOTON_ENVIAR_CONTRATO}
    Wait Until Element Is Visible    ${AP_MENSAJE_CONTRATO_ENVIADO}    timeout=15s
    Log    Contrato enviado al cliente mediante ${canal}

Verificar confirmación de envío del contrato
    Wait Until Element Is Visible    ${AP_MENSAJE_CONFIRMACION_ENVIO_CONTRATO}    timeout=10s
    Wait Until Element Is Visible    ${AP_CAMPO_NUMERO_CONFIRMACION_ENVIO}    timeout=10s
    ${numero_confirmacion}=    Get Text    ${AP_CAMPO_NUMERO_CONFIRMACION_ENVIO}
    Should Not Be Empty    ${numero_confirmacion}
    Log    Confirmación de envío recibida: ${numero_confirmacion}
    [Return]    ${numero_confirmacion}

Verificar finalización del proceso de formalización
    Wait Until Element Is Visible    ${AP_MENSAJE_FORMALIZACION_VENTA_COMPLETA}    timeout=15s
    Wait Until Element Is Visible    ${AP_CAMPO_ESTADO_FORMALIZACION}    timeout=10s
    ${estado}=    Get Text    ${AP_CAMPO_ESTADO_FORMALIZACION}
    Should Contain    ${estado}    completa
    Log    Proceso de formalización finalizado correctamente

Ejecutar flujo completo de envío de contrato en AP.AG
    [Arguments]    ${monto}=50000    ${plazo}=12    ${tasa}=15.5    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${equipo}=iPhone 15 Pro    ${canal}=email    ${email}=cliente@telcel.com
    Acceder a etapa de envío de contrato en AP.AG
    Revisar el contrato generado con todos los términos del financiamiento    ${monto}    ${plazo}    ${tasa}    ${nombre}    ${identificacion}    ${equipo}
    Confirmar aceptación del contrato
    Firmar el contrato
    Verificar registro de firma del contrato
    Enviar contrato al cliente mediante canal especificado    ${canal}    ${email}
    Verificar confirmación de envío del contrato
    Verificar finalización del proceso de formalización
