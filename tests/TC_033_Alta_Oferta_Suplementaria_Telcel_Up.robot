*** Settings ***
Documentation     TC033 - Alta de oferta suplementaria Telcel Up a nivel cliente
...               Verifica que se permita el alta de la oferta suplementaria Telcel Up
...               a nivel cliente para suscriptores de Amigo Paguitos
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Alta de oferta suplementaria Telcel Up a nivel cliente
    [Documentation]    Verifica que se permita agregar Telcel Up como servicio adicional
    ...                a nivel cliente para suscriptores de Amigo Paguitos con financiamiento activo
    [Tags]    PruebaGeneradaIA    ServiciosAdicionales    AmigoPaguitos    TelcelUp    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    Y existe un cliente de Amigo Paguitos con financiamiento activo    ${CLIENTE_AMIGO_PAGUITOS}
    Cuando accede a la opción de alta de servicios adicionales
    Y selecciona la oferta suplementaria Telcel Up
    Y confirma el alta de la oferta suplementaria
    Entonces el sistema debe registrar exitosamente el alta de Telcel Up
