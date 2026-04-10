*** Variables ***
# Locators para página de Login UPC
${URL_LOGIN_UPC}              https://upc.telcel.com/login
${LOCATOR_USUARIO_UPC}        id:username
${LOCATOR_PASSWORD_UPC}       id:password
${LOCATOR_BOTON_LOGIN_UPC}    id:btnLogin
${LOCATOR_DASHBOARD_UPC}      css:.dashboard-container

*** Keywords ***
Abrir Página De Login UPC
    Open Browser    ${URL_LOGIN_UPC}    Chrome
    Maximize Browser Window
    Wait Until Element Is Visible    ${LOCATOR_USUARIO_UPC}    timeout=10s

Ingresar Usuario UPC
    [Arguments]    ${usuario}
    Wait Until Element Is Visible    ${LOCATOR_USUARIO_UPC}
    Input Text    ${LOCATOR_USUARIO_UPC}    ${usuario}

Ingresar Contraseña UPC
    [Arguments]    ${password}
    Wait Until Element Is Visible    ${LOCATOR_PASSWORD_UPC}
    Input Text    ${LOCATOR_PASSWORD_UPC}    ${password}

Hacer Clic En Botón Login UPC
    Wait Until Element Is Enabled    ${LOCATOR_BOTON_LOGIN_UPC}
    Click Button    ${LOCATOR_BOTON_LOGIN_UPC}

Verificar Acceso Al Dashboard UPC
    Wait Until Element Is Visible    ${LOCATOR_DASHBOARD_UPC}    timeout=15s
    Location Should Contain    dashboard
