*** Settings ***
Documentation     TC088 - Validar cambio de ciclo facturación de 99 a original
...               Verifica que el sistema permite cambiar el ciclo de facturación
...               de una cuenta Amigo Paguitos desde el ciclo 99 de vuelta a su
...               ciclo original únicamente mediante API
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar cambio de ciclo de facturación de 99 a original
    [Documentation]    Verifica que el cambio de ciclo de 99 a original:
    ...                - Sistema proporciona ciclo original desde historial
    ...                - API acepta solicitud de restauración
    ...                - CBS confirma y actualiza al ciclo original
    ...                - Se reanudan procesos normales de facturación
    [Tags]    PruebaGeneradaIA    Facturacion    AmigoPaguitos    RestauracionCiclo    API    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    Dado que existe una cuenta Amigo Paguitos en ciclo 99    ${CUENTA_AMIGO_PAGUITOS}
    Cuando el sistema muestra que la cuenta está asignada al ciclo 99
    ${ciclo_original}=    Cuando identifica cuál era el ciclo original antes del cambio a 99
    Cuando invoca API de BES para restaurar ciclo original    ${CUENTA_AMIGO_PAGUITOS}    ${ciclo_original}
    Entonces CBS confirma y actualiza al ciclo original    ${ciclo_original}
    Entonces se reanudan procesos normales de facturación
