*** Settings ***
Documentation    Page Object de la pantalla de Login de la App iOS Claro Drive.
...              Locators pendientes de validación con app en vivo (app nativa iOS no accesible vía Selenium web).
Library          SeleniumLibrary

*** Variables ***
# Locators pendientes de validación con app en vivo
${URL_APP_CLARO_DRIVE}          about:blank
${LOGIN_CAMPO_USUARIO}          id:usuario
${LOGIN_CAMPO_PASSWORD}         id:password
${LOGIN_BOTON_INGRESAR}         id:btn_ingresar
${LOGIN_INDICADOR_SESION}       id:home_usuario

*** Keywords ***
Abrir Aplicacion Claro Drive
    [Documentation]    Abre el navegador/app en la URL de Claro Drive.
    Open Browser    ${URL_APP_CLARO_DRIVE}    browser=chrome
    Maximize Browser Window

Ingresar Credenciales De Usuario
    [Documentation]    Ingresa usuario y contraseña y confirma el login.
    [Arguments]    ${usuario}    ${password}
    Wait Until Element Is Visible    ${LOGIN_CAMPO_USUARIO}    timeout=15s
    Input Text                       ${LOGIN_CAMPO_USUARIO}     ${usuario}
    Input Password                   ${LOGIN_CAMPO_PASSWORD}    ${password}
    Click Element                    ${LOGIN_BOTON_INGRESAR}

Validar Sesion Iniciada
    [Documentation]    Verifica que el usuario quedó autenticado.
    Wait Until Element Is Visible    ${LOGIN_INDICADOR_SESION}    timeout=15s
