*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Cerrar Navegador

*** Test Cases ***
Verificar Inicio De Sesión Exitoso En UPC
    [Tags]    PruebaGeneradaIA    Login
    Given el usuario abre la aplicación UPC
    When ingresa credenciales válidas
    Then debe acceder al dashboard principal

*** Keywords ***
El Usuario Abre La Aplicación UPC
    Abrir Página De Login

Ingresa Credenciales Válidas
    Ingresar Usuario    testuser
    Ingresar Contraseña    testpass123
    Hacer Clic En Botón Login

Debe Acceder Al Dashboard Principal
    Verificar Acceso Al Dashboard
