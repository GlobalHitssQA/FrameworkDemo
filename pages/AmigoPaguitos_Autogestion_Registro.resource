*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_AMIGO_PAGUITOS_AUTOGESTION}           https://amigopaguitos-telcel-dev.com
${URL_MODULO_VENTA}                          /venta/flujo
${URL_MODULO_REGISTRO_USUARIO}               /venta/registro-usuario

# Locators - Pantalla de Inicio
${LOCATOR_BTN_INICIAR_VENTA}                 id:btnIniciarVenta
${LOCATOR_TXT_PANTALLA_INICIO}               css:.venta-inicio .mensaje-bienvenida

# Locators - Registro de Usuario
${LOCATOR_INPUT_NOMBRE}                      id:inputNombre
${LOCATOR_INPUT_APELLIDO_PATERNO}            id:inputApellidoPaterno
${LOCATOR_INPUT_APELLIDO_MATERNO}            id:inputApellidoMaterno
${LOCATOR_INPUT_CURP}                        id:inputCURP
${LOCATOR_INPUT_RFC}                         id:inputRFC
${LOCATOR_INPUT_TELEFONO_CONTACTO}           id:inputTelefonoContacto
${LOCATOR_INPUT_EMAIL}                       id:inputEmail
${LOCATOR_INPUT_DOMICILIO}                   id:inputDomicilio
${LOCATOR_INPUT_CIUDAD}                      id:inputCiudad
${LOCATOR_INPUT_ESTADO}                      id:inputEstado
${LOCATOR_INPUT_CODIGO_POSTAL}               id:inputCodigoPostal

# Locators - Validación y Acciones
${LOCATOR_BTN_VALIDAR_DATOS}                 id:btnValidarDatos
${LOCATOR_BTN_COMPLETAR_REGISTRO}            id:btnCompletarRegistro
${LOCATOR_MSG_VALIDACION_EXITOSA}            css:.alert-success .msg-validacion
${LOCATOR_MSG_REGISTRO_COMPLETO}             css:.alert-success .msg-registro-completo
${LOCATOR_TXT_USUARIO_ALMACENADO}            css:.registro-info .usuario-id

# Locators - Navegación de Etapas
${LOCATOR_TXT_ETAPA_ACTUAL}                  css:.flujo-venta .etapa-actual
${LOCATOR_BTN_SIGUIENTE_ETAPA}               id:btnSiguienteEtapa
${LOCATOR_PROGRESSBAR_FLUJO}                 css:.flujo-venta .progress-bar

*** Keywords ***
Abrir Plataforma Amigo Paguitos Autogestión
    Open Browser    ${URL_AMIGO_PAGUITOS_AUTOGESTION}    Chrome
    Maximize Browser Window
    Wait Until Element Is Visible    ${LOCATOR_TXT_PANTALLA_INICIO}    timeout=10s

Verificar Pantalla De Inicio Del Proceso De Venta
    Element Should Be Visible    ${LOCATOR_TXT_PANTALLA_INICIO}
    Element Should Be Visible    ${LOCATOR_BTN_INICIAR_VENTA}
    ${mensaje}=    Get Text    ${LOCATOR_TXT_PANTALLA_INICIO}
    Should Not Be Empty    ${mensaje}

Iniciar Flujo De Venta De Equipo Con Financiamiento
    Click Button    ${LOCATOR_BTN_INICIAR_VENTA}
    Wait Until Element Is Visible    ${LOCATOR_TXT_ETAPA_ACTUAL}    timeout=10s

Verificar Que Etapa Es Registro De Usuario
    ${etapa}=    Get Text    ${LOCATOR_TXT_ETAPA_ACTUAL}
    Should Contain    ${etapa}    Registro de Usuario
    Element Should Be Visible    ${LOCATOR_INPUT_NOMBRE}

Ingresar Datos Del Usuario Para Registro
    [Arguments]    ${nombre}    ${apellido_paterno}    ${apellido_materno}    ${curp}    ${rfc}    ${telefono}    ${email}    ${domicilio}    ${ciudad}    ${estado}    ${codigo_postal}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_NOMBRE}
    Input Text    ${LOCATOR_INPUT_NOMBRE}                ${nombre}
    Input Text    ${LOCATOR_INPUT_APELLIDO_PATERNO}      ${apellido_paterno}
    Input Text    ${LOCATOR_INPUT_APELLIDO_MATERNO}      ${apellido_materno}
    Input Text    ${LOCATOR_INPUT_CURP}                  ${curp}
    Input Text    ${LOCATOR_INPUT_RFC}                   ${rfc}
    Input Text    ${LOCATOR_INPUT_TELEFONO_CONTACTO}     ${telefono}
    Input Text    ${LOCATOR_INPUT_EMAIL}                 ${email}
    Input Text    ${LOCATOR_INPUT_DOMICILIO}             ${domicilio}
    Input Text    ${LOCATOR_INPUT_CIUDAD}                ${ciudad}
    Input Text    ${LOCATOR_INPUT_ESTADO}                ${estado}
    Input Text    ${LOCATOR_INPUT_CODIGO_POSTAL}         ${codigo_postal}

Hacer Click En Botón Validar Datos Usuario
    Click Button    ${LOCATOR_BTN_VALIDAR_DATOS}
    Wait Until Element Is Visible    ${LOCATOR_MSG_VALIDACION_EXITOSA}    timeout=10s

Verificar Que Datos Del Usuario Son Validados Y Aceptados
    Element Should Be Visible    ${LOCATOR_MSG_VALIDACION_EXITOSA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_VALIDACION_EXITOSA}
    Should Contain    ${mensaje}    validados

Hacer Click En Botón Completar Registro Usuario
    Click Button    ${LOCATOR_BTN_COMPLETAR_REGISTRO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_REGISTRO_COMPLETO}    timeout=10s

Verificar Que Usuario Fue Almacenado Y Permite Avanzar
    Element Should Be Visible    ${LOCATOR_MSG_REGISTRO_COMPLETO}
    Element Should Be Visible    ${LOCATOR_TXT_USUARIO_ALMACENADO}
    ${usuario_id}=    Get Text    ${LOCATOR_TXT_USUARIO_ALMACENADO}
    Should Not Be Empty    ${usuario_id}
    Element Should Be Enabled    ${LOCATOR_BTN_SIGUIENTE_ETAPA}

Avanzar A Siguiente Etapa Del Flujo
    Click Button    ${LOCATOR_BTN_SIGUIENTE_ETAPA}
    Wait Until Element Is Visible    ${LOCATOR_TXT_ETAPA_ACTUAL}    timeout=10s
