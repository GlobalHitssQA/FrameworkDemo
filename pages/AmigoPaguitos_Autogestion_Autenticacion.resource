*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_AUTENTICACION}                  /venta/autenticacion

# Locators - Etapa de Legales
${LOCATOR_CHECKBOX_ACEPTO_TERMINOS}          id:checkboxAceptoTerminos
${LOCATOR_CHECKBOX_ACEPTO_PRIVACIDAD}        id:checkboxAceptoPrivacidad
${LOCATOR_BTN_CONTINUAR_LEGALES}             id:btnContinuarLegales
${LOCATOR_TXT_TERMINOS_CONDICIONES}          css:.legales-container .terminos
${LOCATOR_TXT_AVISO_PRIVACIDAD}              css:.legales-container .privacidad

# Locators - Autenticación de Cliente
${LOCATOR_INPUT_USUARIO_AUTH}                id:inputUsuarioAuth
${LOCATOR_INPUT_PASSWORD_AUTH}               id:inputPasswordAuth
${LOCATOR_INPUT_CODIGO_VERIFICACION}         id:inputCodigoVerificacion
${LOCATOR_BTN_SOLICITAR_CODIGO}              id:btnSolicitarCodigo
${LOCATOR_BTN_VALIDAR_CREDENCIALES}          id:btnValidarCredenciales
${LOCATOR_MSG_CODIGO_ENVIADO}                css:.alert-info .msg-codigo
${LOCATOR_MSG_AUTENTICACION_EXITOSA}         css:.alert-success .msg-autenticacion

# Locators - Validación de Autenticación
${LOCATOR_TXT_CLIENTE_AUTENTICADO}           css:.auth-info .cliente-nombre
${LOCATOR_TXT_FECHA_AUTENTICACION}           css:.auth-info .fecha-autenticacion
${LOCATOR_TXT_TOKEN_SESION}                  css:.auth-info .token-sesion
${LOCATOR_ICON_AUTENTICADO}                  css:.auth-status .icon-check

# Locators - Navegación
${LOCATOR_BTN_CONTINUAR_A_EVALUACION}        id:btnContinuarEvaluacion

*** Keywords ***
Completar Etapa De Legales
    Wait Until Element Is Visible    ${LOCATOR_CHECKBOX_ACEPTO_TERMINOS}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_TERMINOS_CONDICIONES}
    Element Should Be Visible    ${LOCATOR_TXT_AVISO_PRIVACIDAD}
    Click Element    ${LOCATOR_CHECKBOX_ACEPTO_TERMINOS}
    Click Element    ${LOCATOR_CHECKBOX_ACEPTO_PRIVACIDAD}
    Click Button    ${LOCATOR_BTN_CONTINUAR_LEGALES}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_USUARIO_AUTH}    timeout=10s

Verificar Que Sistema Avanza A Etapa De Autenticación
    Element Should Be Visible    ${LOCATOR_INPUT_USUARIO_AUTH}
    Element Should Be Visible    ${LOCATOR_INPUT_PASSWORD_AUTH}
    ${etapa}=    Get Text    ${LOCATOR_TXT_ETAPA_ACTUAL}
    Should Contain    ${etapa}    Autenticación

Ingresar Credenciales De Autenticación Del Cliente
    [Arguments]    ${usuario}    ${password}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_USUARIO_AUTH}
    Input Text    ${LOCATOR_INPUT_USUARIO_AUTH}      ${usuario}
    Input Password    ${LOCATOR_INPUT_PASSWORD_AUTH}    ${password}

Solicitar Código De Verificación
    Click Button    ${LOCATOR_BTN_SOLICITAR_CODIGO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_CODIGO_ENVIADO}    timeout=10s

Verificar Que Código Fue Enviado
    Element Should Be Visible    ${LOCATOR_MSG_CODIGO_ENVIADO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_CODIGO_ENVIADO}
    Should Contain    ${mensaje}    enviado

Ingresar Código De Verificación
    [Arguments]    ${codigo}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CODIGO_VERIFICACION}
    Input Text    ${LOCATOR_INPUT_CODIGO_VERIFICACION}    ${codigo}

Hacer Click En Botón Validar Credenciales
    Click Button    ${LOCATOR_BTN_VALIDAR_CREDENCIALES}
    Wait Until Element Is Visible    ${LOCATOR_MSG_AUTENTICACION_EXITOSA}    timeout=15s

Verificar Que Sistema Valida Credenciales Proporcionadas
    Element Should Be Visible    ${LOCATOR_MSG_AUTENTICACION_EXITOSA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_AUTENTICACION_EXITOSA}
    Should Contain    ${mensaje}    exitosa

Verificar Que Cliente Es Autenticado Exitosamente
    Element Should Be Visible    ${LOCATOR_ICON_AUTENTICADO}
    Element Should Be Visible    ${LOCATOR_TXT_CLIENTE_AUTENTICADO}
    ${nombre}=    Get Text    ${LOCATOR_TXT_CLIENTE_AUTENTICADO}
    Should Not Be Empty    ${nombre}

Verificar Que Información De Autenticación Se Almacena
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_AUTENTICACION}
    Element Should Be Visible    ${LOCATOR_TXT_TOKEN_SESION}
    ${fecha}=    Get Text    ${LOCATOR_TXT_FECHA_AUTENTICACION}
    ${token}=    Get Text    ${LOCATOR_TXT_TOKEN_SESION}
    Should Not Be Empty    ${fecha}
    Should Not Be Empty    ${token}

Verificar Que Permite Continuar Con Evaluación Crediticia
    Element Should Be Enabled    ${LOCATOR_BTN_CONTINUAR_A_EVALUACION}

Avanzar A Etapa De Evaluación Crediticia
    Click Button    ${LOCATOR_BTN_CONTINUAR_A_EVALUACION}
    Wait Until Element Is Visible    css:.evaluacion-crediticia-container    timeout=10s
