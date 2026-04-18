*** Variables ***
# Login Page Locators
${URL_LOGIN}              https://bes-qa.telcel.com/login
${INPUT_USERNAME}         id:username
${INPUT_PASSWORD}         id:password
${BTN_LOGIN}              id:btnLogin
${BTN_INGRESAR}           css:button[type='submit']
${LBL_DASHBOARD}          id:dashboard
${MENU_PRINCIPAL}         css:.main-menu

*** Keywords ***
Abrir navegador en página de login
    Open Browser    ${URL_LOGIN}    chrome
    Maximize Browser Window
    Set Selenium Speed    0.3s
    Wait Until Element Is Visible    ${INPUT_USERNAME}    timeout=10s

Ingresar credenciales
    [Arguments]    ${usuario}    ${password}
    Wait Until Element Is Visible    ${INPUT_USERNAME}    timeout=10s
    Input Text    ${INPUT_USERNAME}    ${usuario}
    Input Text    ${INPUT_PASSWORD}    ${password}

Ingresar credenciales de prueba
    Ingresar credenciales    user_test    pass_test

Hacer click en botón de login
    Wait Until Element Is Enabled    ${BTN_LOGIN}    timeout=5s
    Click Button    ${BTN_LOGIN}

Verificar login exitoso
    Wait Until Element Is Visible    ${LBL_DASHBOARD}    timeout=15s
    Location Should Contain    dashboard

Cerrar sesión y navegador
    Close All Browsers
