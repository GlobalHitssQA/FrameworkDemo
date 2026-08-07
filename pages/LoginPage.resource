*** Settings ***
Documentation     Page Object de la pantalla de Login de la app de video Telcel/Claro.
...               Contiene únicamente locators y keywords de interacción con la pantalla de acceso.
Library           SeleniumLibrary

*** Variables ***
# ------------------------------------------------------------------
# Locators pendientes de validación con app en vivo
# (no se dispuso de URL/credenciales de la app de video para ATSCL-2710)
# Prioridad de locators: id > name > CSS semántico > XPath
# ------------------------------------------------------------------
${URL_APP}                     https://video.telcel.com
${NAVEGADOR}                   chrome
${LOCATOR_INPUT_USUARIO}       id:user_login
${LOCATOR_INPUT_PASSWORD}      id:user_password
${LOCATOR_BOTON_INGRESAR}     css:button[type="submit"]
${LOCATOR_HOME_APP}            css:[data-testid="home-app"]

*** Keywords ***
Abrir Navegador En La App De Video
    [Documentation]    Abre el navegador en la URL de la app de video de Telcel.
    [Arguments]    ${url}=${URL_APP}    ${navegador}=${NAVEGADOR}
    Open Browser    ${url}    ${navegador}
    Maximize Browser Window

Ingresar Credenciales De Usuario
    [Documentation]    Escribe usuario y contraseña y ejecuta el ingreso.
    [Arguments]    ${usuario}    ${password}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_USUARIO}    timeout=15s
    Input Text       ${LOCATOR_INPUT_USUARIO}     ${usuario}
    Input Password   ${LOCATOR_INPUT_PASSWORD}    ${password}
    Click Element    ${LOCATOR_BOTON_INGRESAR}

Verificar Ingreso Exitoso A La App
    [Documentation]    Verifica que se cargó la home de la app tras el login.
    Wait Until Element Is Visible    ${LOCATOR_HOME_APP}    timeout=20s
