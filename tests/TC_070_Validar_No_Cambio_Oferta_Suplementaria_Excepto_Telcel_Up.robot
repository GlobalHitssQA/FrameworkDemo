*** Settings ***
Documentation     TC070 - Validar que no se permite cambio oferta suplementaria excepto Telcel Up
...               Verifica que el sistema solo permite agregar o modificar la oferta suplementaria Telcel Up
...               a nivel cliente en suscriptores Amigo Paguitos y bloquea cualquier otra oferta suplementaria
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite cambio oferta suplementaria excepto Telcel Up
    [Documentation]    Verifica restricción de ofertas suplementarias para Amigo Paguitos:
    ...                - Muestra información del suscriptor con ofertas actuales
    ...                - Bloquea ofertas suplementarias diferentes a Telcel Up
    ...                - Permite agregar Telcel Up a nivel cliente
    ...                - Confirma que solo Telcel Up está permitida
    [Tags]    PruebaGeneradaIA    OfertasSuplementarias    AmigoPaguitos    TelcelUp    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    Y existe un cliente Amigo Paguitos en vista 360    ${CLIENTE_AMIGO_PAGUITOS}
    Cuando el sistema muestra información con ofertas actuales
    Cuando intenta agregar oferta suplementaria diferente a Telcel Up
    Entonces BES bloquea operación mostrando solo Telcel Up permitido
    Cuando intenta agregar oferta Telcel Up a nivel cliente
    Y confirma agregar Telcel Up
    Entonces el sistema permite y agrega exitosamente Telcel Up
    Y las ofertas muestran únicamente Telcel Up como permitida
