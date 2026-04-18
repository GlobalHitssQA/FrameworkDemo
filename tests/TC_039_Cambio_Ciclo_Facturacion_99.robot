*** Settings ***
Documentation     TC039 - Cambio de ciclo de facturación a 99 para deducción fiscal
...               Verifica que BES permita cambiar el ciclo de facturación de una cuenta
...               de Amigo Paguitos al ciclo 99 para efectos de deducción fiscal
...               únicamente a través de API
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Cambio de ciclo de facturación a 99 para deducción fiscal
    [Documentation]    Verifica que el cambio de ciclo a 99:
    ...                - NO esté disponible desde la GUI de BES
    ...                - SÍ esté disponible a través de API
    ...                - El sistema actualice correctamente el ciclo
    [Tags]    PruebaGeneradaIA    Facturacion    AmigoPaguitos    CambioCiclo    API    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    ${ciclo_original}=    Dado que existe una cuenta de Amigo Paguitos con ciclo activo    ${CUENTA_AMIGO_PAGUITOS}
    Cuando intenta cambiar el ciclo a 99 desde la GUI
    Entonces el sistema no debe permitir el cambio desde la interfaz gráfica
    Cuando ejecuta el cambio de ciclo a 99 a través de API    ${CUENTA_AMIGO_PAGUITOS}
    Entonces el sistema debe cambiar exitosamente el ciclo a 99
