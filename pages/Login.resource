*** Variables ***
${URL_LOGIN}              https://sistema.telcel.com/login
${LOGIN_INPUT_USUARIO}    id:username
${LOGIN_INPUT_PASSWORD}   id:password
${LOGIN_BOTON_ENTRAR}     id:loginButton
${LOGIN_MENSAJE_BIENVENIDA}    css:.welcome-message

*** Keywords ***
Abrir página de login
    Open Browser    ${URL_LOGIN}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    ${LOGIN_INPUT_USUARIO}    timeout=10s

Ingresar credenciales
    [Arguments]    ${usuario}    ${password}
    Input Text    ${LOGIN_INPUT_USUARIO}    ${usuario}
    Input Text    ${LOGIN_INPUT_PASSWORD}    ${password}

Hacer clic en botón de login
    Click Button    ${LOGIN_BOTON_ENTRAR}
    Wait Until Page Contains Element    ${LOGIN_MENSAJE_BIENVENIDA}    timeout=15s
