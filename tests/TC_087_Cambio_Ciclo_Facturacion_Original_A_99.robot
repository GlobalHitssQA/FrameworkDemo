*** Settings ***
Documentation     TC087 - Validar cambio de ciclo facturación de original a ciclo 99
...               Verifica que el sistema permite cambiar el ciclo de facturación
...               de una cuenta Amigo Paguitos desde su ciclo original al ciclo 99
...               únicamente mediante API
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar cambio de ciclo de facturación de original a ciclo 99
    [Documentation]    Verifica que el cambio de ciclo a 99:
    ...                - API acepta solicitud de cambio
    ...                - CBS confirma y actualiza ciclo a 99
    ...                - No se generan cargos ni facturas en ciclo 99
    ...                - Cambio queda registrado en historial
    [Tags]    PruebaGeneradaIA    Facturacion    AmigoPaguitos    CambioCiclo    API    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    ${ciclo_original}=    Dado que existe una cuenta Amigo Paguitos con ciclo original asignado    ${CUENTA_AMIGO_PAGUITOS}
    ${ciclo_actual}=    Cuando el sistema muestra el ciclo de facturación actual
    Cuando invoca API de BES para cambiar ciclo a 99    ${CUENTA_AMIGO_PAGUITOS}
    Entonces la API acepta la solicitud de cambio de ciclo
    Entonces CBS confirma y actualiza ciclo a 99
    Entonces no se generan cargos ni facturas durante ciclo 99
    Entonces el cambio queda registrado en historial de modificaciones
