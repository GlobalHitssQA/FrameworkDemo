*** Variables ***
${URL_LOGIN}              https://upc.telcel.com/login
${LOCATOR_USUARIO}        id:username
${LOCATOR_PASSWORD}       id:password
${LOCATOR_BOTON_LOGIN}    id:btnLogin
${LOCATOR_DASHBOARD}      css:.dashboard-container

*** Keywords ***
Abrir Página De Login
    Open Browser    ${URL_LOGIN}    chrome
    Maximize Browser Window
    Wait Until Element Is Visible    ${LOCATOR_USUARIO}    timeout=10s

Ingresar Usuario
    [Arguments]    ${usuario}
    Wait Until Element Is Visible    ${LOCATOR_USUARIO}    timeout=10s
    Input Text    ${LOCATOR_USUARIO}    ${usuario}

Ingresar Contraseña
    [Arguments]    ${password}
    Wait Until Element Is Visible    ${LOCATOR_PASSWORD}    timeout=10s
    Input Text    ${LOCATOR_PASSWORD}    ${password}

Hacer Clic En Botón Login
    Wait Until Element Is Enabled    ${LOCATOR_BOTON_LOGIN}    timeout=10s
    Click Button    ${LOCATOR_BOTON_LOGIN}

Verificar Acceso Al Dashboard
    Wait Until Element Is Visible    ${LOCATOR_DASHBOARD}    timeout=15s
    Location Should Contain    /dashboard
