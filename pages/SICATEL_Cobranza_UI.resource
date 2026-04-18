*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_SICATEL_LOGIN}                      https://sicatel-telcel-dev.com/login
${URL_SICATEL_MODULO_COBRANZA}            https://sicatel-telcel-dev.com/cobranza/pagos

# Locators - Login SICATEL
${LOCATOR_SICATEL_INPUT_USUARIO}          id:sicatel_username
${LOCATOR_SICATEL_INPUT_PASSWORD}         id:sicatel_password
${LOCATOR_SICATEL_BTN_LOGIN}              id:sicatel_btnLogin

# Locators - Búsqueda de Cliente
${LOCATOR_SICATEL_INPUT_NUMERO_TELEFONICO}    id:numeroTelefonico
${LOCATOR_SICATEL_BTN_BUSCAR_CLIENTE}         id:btnBuscarCliente

# Locators - Información del Cliente y Crédito
${LOCATOR_SICATEL_TXT_NOMBRE_CLIENTE}     css:.cliente-info .nombre-cliente
${LOCATOR_SICATEL_TXT_CUSTOMER_ID}        css:.cliente-info .customer-id
${LOCATOR_SICATEL_TXT_IMEI_EQUIPO}        css:.credito-info .imei
${LOCATOR_SICATEL_TXT_SALDO_PENDIENTE}    css:.credito-info .saldo-pendiente
${LOCATOR_SICATEL_TXT_MONTO_CUOTA}        css:.credito-info .monto-cuota

# Locators - Registro de Pago de Parcialidad
${LOCATOR_SICATEL_BTN_REGISTRAR_PAGO}     id:btnRegistrarPago
${LOCATOR_SICATEL_INPUT_MONTO_PAGO_PARCIALIDAD}    id:montoPagoParcialidad
${LOCATOR_SICATEL_BTN_CONFIRMAR_PAGO}     id:btnConfirmarPago

# Locators - Validación y Confirmación
${LOCATOR_SICATEL_TXT_VALIDACION_MONTO}   css:.validacion-pago .mensaje-validacion
${LOCATOR_SICATEL_MSG_PAGO_REGISTRADO}    css:.alert-success
${LOCATOR_SICATEL_TXT_SALDO_ACTUALIZADO}  css:.pago-confirmado .saldo-actualizado
${LOCATOR_SICATEL_TXT_ESTADO_CREDITO}     css:.pago-confirmado .estado-credito

*** Keywords ***
Abrir Navegador En SICATEL
    Open Browser    ${URL_SICATEL_LOGIN}    Chrome
    Maximize Browser Window
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_INPUT_USUARIO}    timeout=10s

Ingresar Credenciales En SICATEL
    [Arguments]    ${usuario}    ${password}
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_INPUT_USUARIO}
    Input Text    ${LOCATOR_SICATEL_INPUT_USUARIO}    ${usuario}
    Input Password    ${LOCATOR_SICATEL_INPUT_PASSWORD}    ${password}

Hacer Click En Botón Login SICATEL
    Click Button    ${LOCATOR_SICATEL_BTN_LOGIN}
    Wait Until Location Contains    /dashboard    timeout=10s

Navegar A Módulo Cobranza En SICATEL
    Go To    ${URL_SICATEL_MODULO_COBRANZA}
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_INPUT_NUMERO_TELEFONICO}    timeout=10s

Ingresar Número Telefónico Del Cliente En SICATEL
    [Arguments]    ${numero_telefonico}
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_INPUT_NUMERO_TELEFONICO}
    Input Text    ${LOCATOR_SICATEL_INPUT_NUMERO_TELEFONICO}    ${numero_telefonico}
    Click Button    ${LOCATOR_SICATEL_BTN_BUSCAR_CLIENTE}
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_TXT_NOMBRE_CLIENTE}    timeout=10s

Verificar Que Información Del Cliente Se Muestra En SICATEL
    Element Should Be Visible    ${LOCATOR_SICATEL_TXT_NOMBRE_CLIENTE}
    Element Should Be Visible    ${LOCATOR_SICATEL_TXT_CUSTOMER_ID}
    Element Should Be Visible    ${LOCATOR_SICATEL_TXT_IMEI_EQUIPO}

Verificar Que Información Del Crédito Se Muestra En SICATEL
    Element Should Be Visible    ${LOCATOR_SICATEL_TXT_SALDO_PENDIENTE}
    Element Should Be Visible    ${LOCATOR_SICATEL_TXT_MONTO_CUOTA}
    ${saldo}=    Get Text    ${LOCATOR_SICATEL_TXT_SALDO_PENDIENTE}
    Should Not Be Empty    ${saldo}

Hacer Click En Opción Registrar Pago De Parcialidad
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_BTN_REGISTRAR_PAGO}
    Click Button    ${LOCATOR_SICATEL_BTN_REGISTRAR_PAGO}
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_INPUT_MONTO_PAGO_PARCIALIDAD}    timeout=10s

Verificar Que Formulario De Pago Se Muestra
    Element Should Be Visible    ${LOCATOR_SICATEL_INPUT_MONTO_PAGO_PARCIALIDAD}
    Element Should Be Visible    ${LOCATOR_SICATEL_BTN_CONFIRMAR_PAGO}

Ingresar Monto Del Pago De Parcialidad
    [Arguments]    ${monto}
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_INPUT_MONTO_PAGO_PARCIALIDAD}
    Input Text    ${LOCATOR_SICATEL_INPUT_MONTO_PAGO_PARCIALIDAD}    ${monto}

Obtener Monto De Cuota Desde Pantalla
    ${monto_cuota}=    Get Text    ${LOCATOR_SICATEL_TXT_MONTO_CUOTA}
    [Return]    ${monto_cuota}

Verificar Que Monto Ingresado Es Validado Contra Monto De Cuota
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_TXT_VALIDACION_MONTO}    timeout=5s
    ${mensaje_validacion}=    Get Text    ${LOCATOR_SICATEL_TXT_VALIDACION_MONTO}
    Should Contain Any    ${mensaje_validacion}    válido    correcto    aceptado

Hacer Click En Botón Confirmar Pago
    Click Button    ${LOCATOR_SICATEL_BTN_CONFIRMAR_PAGO}
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_MSG_PAGO_REGISTRADO}    timeout=10s

Verificar Que Pago Se Registró Exitosamente
    Element Should Be Visible    ${LOCATOR_SICATEL_MSG_PAGO_REGISTRADO}
    ${mensaje}=    Get Text    ${LOCATOR_SICATEL_MSG_PAGO_REGISTRADO}
    Should Contain Any    ${mensaje}    registrado exitosamente    pago exitoso    registro completado

Verificar Que Saldo Pendiente Fue Actualizado
    Wait Until Element Is Visible    ${LOCATOR_SICATEL_TXT_SALDO_ACTUALIZADO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_SICATEL_TXT_SALDO_ACTUALIZADO}
    ${saldo_actualizado}=    Get Text    ${LOCATOR_SICATEL_TXT_SALDO_ACTUALIZADO}
    Should Not Be Empty    ${saldo_actualizado}

Cerrar Sesión En SICATEL
    Close Browser
