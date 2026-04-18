*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_ACTIVACION}                    /activacion/lineas

# Locators - Interfaz de Activación
${LOCATOR_INPUT_IMEI}                       id:inputIMEI
${LOCATOR_BTN_VALIDAR_IMEI}                 id:btnValidarIMEI
${LOCATOR_TXT_INFO_EQUIPO}                  css:.device-validation .info-equipo
${LOCATOR_TXT_INFO_FINANCIAMIENTO}          css:.device-validation .info-financiamiento

# Locators - Tipo de Línea
${LOCATOR_RADIO_PREPAGADO}                  id:radioPrepagado
${LOCATOR_RADIO_POSPAGADO}                  id:radioPospagado
${LOCATOR_DIV_OPCIONES_PREPAGADO}           css:.activacion-options .prepagado-options

# Locators - Datos del Cliente
${LOCATOR_INPUT_NOMBRE_CLIENTE}             id:inputNombreCliente
${LOCATOR_INPUT_CURP_CLIENTE}               id:inputCURPCliente
${LOCATOR_INPUT_RFC_CLIENTE}                id:inputRFCCliente
${LOCATOR_INPUT_DOMICILIO_CLIENTE}          id:inputDomicilioCliente
${LOCATOR_TXT_DATOS_CLIENTE_VALIDADOS}      css:.client-info .datos-validados

# Locators - Proceso de Activación
${LOCATOR_BTN_ACTIVAR_LINEA}                id:btnActivarLinea
${LOCATOR_MSG_ACTIVACION_EXITOSA}           css:.alert-success .msg-activacion
${LOCATOR_TXT_NUMERO_ACTIVADO}              css:.activation-result .numero-linea

# Locators - Verificación de Estado
${LOCATOR_TXT_ESTADO_LINEA}                 css:.line-status .estado
${LOCATOR_TXT_IMEI_VINCULADO}               css:.line-status .imei-vinculado
${LOCATOR_TXT_FECHA_ACTIVACION}             css:.line-status .fecha-activacion

*** Keywords ***
Navegar A Módulo De Activación De Líneas
    Go To    ${URL_LOGIN}${URL_MODULO_ACTIVACION}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_IMEI}    timeout=10s

Ingresar IMEI Del Equipo
    [Arguments]    ${imei}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_IMEI}
    Input Text    ${LOCATOR_INPUT_IMEI}    ${imei}

Hacer Click En Botón Validar IMEI
    Click Button    ${LOCATOR_BTN_VALIDAR_IMEI}
    Wait Until Element Is Visible    ${LOCATOR_TXT_INFO_EQUIPO}    timeout=10s

Verificar Que IMEI Es Válido Y Recupera Información
    Element Should Be Visible    ${LOCATOR_TXT_INFO_EQUIPO}
    Element Should Be Visible    ${LOCATOR_TXT_INFO_FINANCIAMIENTO}
    ${info_equipo}=    Get Text    ${LOCATOR_TXT_INFO_EQUIPO}
    Should Not Be Empty    ${info_equipo}
    ${info_financiamiento}=    Get Text    ${LOCATOR_TXT_INFO_FINANCIAMIENTO}
    Should Contain    ${info_financiamiento}    Amigo Paguitos

Seleccionar Tipo De Línea Prepagado
    Wait Until Element Is Visible    ${LOCATOR_RADIO_PREPAGADO}
    Click Element    ${LOCATOR_RADIO_PREPAGADO}
    Wait Until Element Is Visible    ${LOCATOR_DIV_OPCIONES_PREPAGADO}    timeout=5s

Verificar Que Se Muestran Opciones Para Prepagado
    Element Should Be Visible    ${LOCATOR_DIV_OPCIONES_PREPAGADO}
    ${opciones}=    Get Text    ${LOCATOR_DIV_OPCIONES_PREPAGADO}
    Should Not Be Empty    ${opciones}

Ingresar Datos Del Cliente Para Activación
    [Arguments]    ${nombre}    ${curp}    ${rfc}    ${domicilio}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_NOMBRE_CLIENTE}
    Input Text    ${LOCATOR_INPUT_NOMBRE_CLIENTE}    ${nombre}
    Input Text    ${LOCATOR_INPUT_CURP_CLIENTE}     ${curp}
    Input Text    ${LOCATOR_INPUT_RFC_CLIENTE}      ${rfc}
    Input Text    ${LOCATOR_INPUT_DOMICILIO_CLIENTE}    ${domicilio}

Verificar Que Datos Del Cliente Son Validados
    Wait Until Element Is Visible    ${LOCATOR_TXT_DATOS_CLIENTE_VALIDADOS}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_DATOS_CLIENTE_VALIDADOS}
    ${validacion}=    Get Text    ${LOCATOR_TXT_DATOS_CLIENTE_VALIDADOS}
    Should Contain    ${validacion}    asociado al financiamiento

Hacer Click En Botón Activar Línea
    Wait Until Element Is Enabled    ${LOCATOR_BTN_ACTIVAR_LINEA}
    Click Button    ${LOCATOR_BTN_ACTIVAR_LINEA}
    Wait Until Element Is Visible    ${LOCATOR_MSG_ACTIVACION_EXITOSA}    timeout=15s

Verificar Que Línea Fue Activada Exitosamente
    Element Should Be Visible    ${LOCATOR_MSG_ACTIVACION_EXITOSA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_ACTIVACION_EXITOSA}
    Should Contain    ${mensaje}    activada exitosamente
    Element Should Be Visible    ${LOCATOR_TXT_NUMERO_ACTIVADO}

Obtener Estado De La Línea Activada
    ${estado}=            Get Text    ${LOCATOR_TXT_ESTADO_LINEA}
    ${imei_vinculado}=    Get Text    ${LOCATOR_TXT_IMEI_VINCULADO}
    ${fecha_activacion}=  Get Text    ${LOCATOR_TXT_FECHA_ACTIVACION}
    [Return]    ${estado}    ${imei_vinculado}    ${fecha_activacion}

Verificar Que Línea Está Activa Y Vinculada Al IMEI
    [Arguments]    ${imei_esperado}
    ${estado}    ${imei_vinculado}    ${fecha_activacion}=    Obtener Estado De La Línea Activada
    Should Be Equal As Strings    ${estado}    Activo
    Should Be Equal As Strings    ${imei_vinculado}    ${imei_esperado}
    Should Not Be Empty    ${fecha_activacion}

# ============================================
# Keywords para Caso 42 - Activación con promociones
# ============================================

Verificar Venta De Equipo Registrada
    [Documentation]    Verifica que la venta del equipo se haya registrado exitosamente
    Wait Until Element Is Visible    css:.sale-info .registro-exitoso    timeout=10s
    Element Should Be Visible    css:.sale-info .registro-exitoso
    ${mensaje}=    Get Text    css:.sale-info .registro-exitoso
    Should Contain    ${mensaje}    registrada exitosamente

Solicitar Activación Con Promoción
    [Arguments]    ${promocion}    ${nombre}    ${curp}    ${rfc}    ${domicilio}
    [Documentation]    Solicita activación de línea aplicando una promoción específica
    Wait Until Element Is Visible    css:.promocion-selector    timeout=10s
    Select From List By Label    css:.promocion-selector    ${promocion}
    Ingresar Datos Del Cliente Para Activación    ${nombre}    ${curp}    ${rfc}    ${domicilio}
    Wait Until Element Is Visible    id:btnConfirmarActivacionConPromocion    timeout=5s
    Click Button    id:btnConfirmarActivacionConPromocion

Verificar Aplicación Correcta De Promoción
    [Arguments]    ${promocion}
    [Documentation]    Verifica que la promoción se haya aplicado correctamente
    Wait Until Element Is Visible    css:.promotion-applied    timeout=10s
    ${info_promocion}=    Get Text    css:.promotion-applied
    Should Contain    ${info_promocion}    ${promocion}
    Should Contain    ${info_promocion}    aplicada correctamente

Verificar Beneficios Según Condiciones Vigentes
    [Arguments]    ${promocion}
    [Documentation]    Verifica que los beneficios se apliquen según las condiciones vigentes
    Wait Until Element Is Visible    css:.benefits-info    timeout=10s
    ${beneficios}=    Get Text    css:.benefits-info
    Should Contain    ${beneficios}    ${promocion}
    Should Not Be Empty    ${beneficios}

Verificar Gestión Integrada De Financiamiento Y Línea
    [Documentation]    Verifica que BES gestione de manera integrada el financiamiento y la línea activada
    Wait Until Element Is Visible    css:.integrated-management    timeout=10s
    ${info_gestion}=    Get Text    css:.integrated-management
    Should Contain    ${info_gestion}    Financiamiento activo
    Should Contain    ${info_gestion}    Línea activada
    Should Contain    ${info_gestion}    Gestión integrada
