*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL_LOGIN}                https://bes-telcel-dev.com/login
${LOCATOR_INPUT_USUARIO}    id:username
${LOCATOR_INPUT_PASSWORD}   id:password
${LOCATOR_BTN_INGRESAR}     id:btnLogin
# Credenciales de prueba
${USUARIO_PRUEBA}           test_admin
${PASSWORD_PRUEBA}          Test123!
# Elementos de verificación de login exitoso
${LOCATOR_MENU_PRINCIPAL}   id:mainMenu

*** Keywords ***
Abrir Navegador En Página De Login
    Open Browser    ${URL_LOGIN}    Chrome
    Maximize Browser Window
    Wait Until Element Is Visible    ${LOCATOR_INPUT_USUARIO}    timeout=10s

Ingresar Credenciales
    [Arguments]    ${usuario}    ${password}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_USUARIO}
    Input Text    ${LOCATOR_INPUT_USUARIO}    ${usuario}
    Input Password    ${LOCATOR_INPUT_PASSWORD}    ${password}

Hacer Click En Botón Ingresar
    Click Button    ${LOCATOR_BTN_INGRESAR}
    Wait Until Location Contains    /dashboard    timeout=10s

Cerrar Sesión Del Navegador
    Close Browser

Verificar Login Exitoso
    [Documentation]    Verifica que el login fue exitoso revisando elementos del menú principal
    Wait Until Element Is Visible    ${LOCATOR_MENU_PRINCIPAL}    timeout=15s
    Page Should Contain Element    ${LOCATOR_MENU_PRINCIPAL}
