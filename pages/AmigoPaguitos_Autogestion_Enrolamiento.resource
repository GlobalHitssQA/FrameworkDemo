*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_ENROLAMIENTO}                   /venta/enrolamiento-equipos

# Locators - Enrolamiento de Equipos
${LOCATOR_TXT_TITULO_ENROLAMIENTO}           css:.enrolamiento-equipos-container .titulo
${LOCATOR_TXT_RESUMEN_OFERTA}                css:.enrolamiento-info .resumen-oferta
${LOCATOR_TXT_DATOS_FINANCIAMIENTO}          css:.enrolamiento-info .datos-financiamiento

# Locators - Ingreso de IMEI
${LOCATOR_INPUT_IMEI}                        id:inputIMEI
${LOCATOR_BTN_VALIDAR_IMEI}                  id:btnValidarIMEI
${LOCATOR_MSG_IMEI_VALIDO}                   css:.alert-success .msg-imei
${LOCATOR_MSG_IMEI_INVALIDO}                 css:.alert-danger .msg-imei-error

# Locators - Información del Equipo
${LOCATOR_DIV_INFO_EQUIPO}                   css:.info-equipo-container
${LOCATOR_TXT_MARCA_EQUIPO}                  css:.info-equipo .marca
${LOCATOR_TXT_MODELO_EQUIPO}                 css:.info-equipo .modelo
${LOCATOR_TXT_PRECIO_EQUIPO}                 css:.info-equipo .precio
${LOCATOR_IMG_EQUIPO}                        css:.info-equipo .imagen-equipo

# Locators - Número Telefónico
${LOCATOR_INPUT_NUMERO_TELEFONICO}           id:inputNumeroTelefonico
${LOCATOR_BTN_VALIDAR_NUMERO}                id:btnValidarNumero
${LOCATOR_MSG_NUMERO_VALIDO}                 css:.alert-success .msg-numero

# Locators - Asociación
${LOCATOR_BTN_ASOCIAR_EQUIPO}                id:btnAsociarEquipo
${LOCATOR_DIV_ASOCIACION_INFO}               css:.asociacion-info
${LOCATOR_TXT_EQUIPO_ASOCIADO}               css:.asociacion-info .equipo
${LOCATOR_TXT_CREDITO_ASOCIADO}              css:.asociacion-info .credito
${LOCATOR_TXT_LINEA_ASOCIADA}                css:.asociacion-info .linea
${LOCATOR_MSG_ASOCIACION_EXITOSA}            css:.alert-success .msg-asociacion

# Locators - Registro de Enrolamiento
${LOCATOR_BTN_COMPLETAR_ENROLAMIENTO}        id:btnCompletarEnrolamiento
${LOCATOR_MSG_ENROLAMIENTO_COMPLETO}         css:.alert-success .msg-enrolamiento
${LOCATOR_TXT_ID_ENROLAMIENTO}               css:.enrolamiento-result .id-enrolamiento
${LOCATOR_TXT_FECHA_ENROLAMIENTO}            css:.enrolamiento-result .fecha-enrolamiento

# Locators - Navegación
${LOCATOR_BTN_CONTINUAR_A_PAGO_ENGANCHE}     id:btnContinuarPagoEnganche

*** Keywords ***
Verificar Que Inicia Etapa De Enrolamiento
    Wait Until Element Is Visible    ${LOCATOR_TXT_TITULO_ENROLAMIENTO}    timeout=10s
    ${titulo}=    Get Text    ${LOCATOR_TXT_TITULO_ENROLAMIENTO}
    Should Contain    ${titulo}    Enrolamiento

Verificar Que Oferta Aceptada Permite Enrolar Equipo
    Element Should Be Visible    ${LOCATOR_TXT_RESUMEN_OFERTA}
    Element Should Be Visible    ${LOCATOR_TXT_DATOS_FINANCIAMIENTO}
    ${resumen}=    Get Text    ${LOCATOR_TXT_RESUMEN_OFERTA}
    Should Not Be Empty    ${resumen}

Ingresar IMEI Del Equipo A Financiar
    [Arguments]    ${imei}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_IMEI}
    Input Text    ${LOCATOR_INPUT_IMEI}    ${imei}

Hacer Click En Botón Validar IMEI
    Click Button    ${LOCATOR_BTN_VALIDAR_IMEI}
    Wait Until Element Is Visible    ${LOCATOR_DIV_INFO_EQUIPO}    timeout=10s

Verificar Que IMEI Es Validado Y Registrado
    Element Should Be Visible    ${LOCATOR_MSG_IMEI_VALIDO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_IMEI_VALIDO}
    Should Contain    ${mensaje}    válido

Verificar Que Información Del Equipo Es Mostrada
    Element Should Be Visible    ${LOCATOR_DIV_INFO_EQUIPO}
    Element Should Be Visible    ${LOCATOR_TXT_MARCA_EQUIPO}
    Element Should Be Visible    ${LOCATOR_TXT_MODELO_EQUIPO}
    Element Should Be Visible    ${LOCATOR_TXT_PRECIO_EQUIPO}
    ${marca}=     Get Text    ${LOCATOR_TXT_MARCA_EQUIPO}
    ${modelo}=    Get Text    ${LOCATOR_TXT_MODELO_EQUIPO}
    Should Not Be Empty    ${marca}
    Should Not Be Empty    ${modelo}

Ingresar Número Telefónico Para Asociar
    [Arguments]    ${numero}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_NUMERO_TELEFONICO}
    Input Text    ${LOCATOR_INPUT_NUMERO_TELEFONICO}    ${numero}

Hacer Click En Botón Validar Número
    Click Button    ${LOCATOR_BTN_VALIDAR_NUMERO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_NUMERO_VALIDO}    timeout=10s

Verificar Que Número Telefónico Es Validado
    Element Should Be Visible    ${LOCATOR_MSG_NUMERO_VALIDO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_NUMERO_VALIDO}
    Should Contain    ${mensaje}    válido

Hacer Click En Botón Asociar Equipo
    Click Button    ${LOCATOR_BTN_ASOCIAR_EQUIPO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_ASOCIACION_EXITOSA}    timeout=10s

Verificar Que Asociación Fue Creada
    Element Should Be Visible    ${LOCATOR_MSG_ASOCIACION_EXITOSA}
    Element Should Be Visible    ${LOCATOR_DIV_ASOCIACION_INFO}

Verificar Relación Entre Equipo Crédito Y Línea
    Element Should Be Visible    ${LOCATOR_TXT_EQUIPO_ASOCIADO}
    Element Should Be Visible    ${LOCATOR_TXT_CREDITO_ASOCIADO}
    Element Should Be Visible    ${LOCATOR_TXT_LINEA_ASOCIADA}
    ${equipo}=     Get Text    ${LOCATOR_TXT_EQUIPO_ASOCIADO}
    ${credito}=    Get Text    ${LOCATOR_TXT_CREDITO_ASOCIADO}
    ${linea}=      Get Text    ${LOCATOR_TXT_LINEA_ASOCIADA}
    Should Not Be Empty    ${equipo}
    Should Not Be Empty    ${credito}
    Should Not Be Empty    ${linea}

Hacer Click En Botón Completar Enrolamiento
    Click Button    ${LOCATOR_BTN_COMPLETAR_ENROLAMIENTO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_ENROLAMIENTO_COMPLETO}    timeout=10s

Verificar Que Enrolamiento Fue Registrado
    Element Should Be Visible    ${LOCATOR_MSG_ENROLAMIENTO_COMPLETO}
    Element Should Be Visible    ${LOCATOR_TXT_ID_ENROLAMIENTO}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_ENROLAMIENTO}
    ${id_enrolamiento}=    Get Text    ${LOCATOR_TXT_ID_ENROLAMIENTO}
    ${fecha}=              Get Text    ${LOCATOR_TXT_FECHA_ENROLAMIENTO}
    Should Not Be Empty    ${id_enrolamiento}
    Should Not Be Empty    ${fecha}

Verificar Que Permite Avanzar A Pago De Enganche
    Element Should Be Enabled    ${LOCATOR_BTN_CONTINUAR_A_PAGO_ENGANCHE}

Avanzar A Pago De Enganche
    Click Button    ${LOCATOR_BTN_CONTINUAR_A_PAGO_ENGANCHE}
    Wait Until Element Is Visible    css:.pago-enganche-container    timeout=10s

Cerrar Sesión Del Navegador En Amigo Paguitos
    Close Browser
