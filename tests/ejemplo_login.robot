*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar inicio de sesión exitoso en el sistema
    [Tags]    PruebaGeneradaIA    Login    Smoke
    [Documentation]    Caso de ejemplo que verifica el login básico al sistema
    Given el usuario está en la página de login
    When ingresa credenciales válidas
    Then accede exitosamente al sistema

*** Keywords ***
El usuario está en la página de login
    Abrir página de login

Ingresa credenciales válidas
    Ingresar credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer clic en botón de login

Accede exitosamente al sistema
    Page Should Contain Element    ${LOGIN_MENSAJE_BIENVENIDA}
