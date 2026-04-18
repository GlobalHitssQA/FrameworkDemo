*** Settings ***
Documentation     TC072 - Validar remoción de oferta Telcel Up a nivel cliente
...               Verifica que un cliente de Amigo Paguitos puede dar de baja
...               la oferta suplementaria Telcel Up previamente suscrita a nivel de cliente
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar remoción de oferta Telcel Up a nivel cliente
    [Documentation]    Verifica que se permite dar de baja Telcel Up a nivel cliente para Amigo Paguitos:
    ...                - Muestra cliente con oferta Telcel Up activa
    ...                - Presenta ofertas activas que pueden removerse
    ...                - Solicita confirmación de baja
    ...                - Elimina Telcel Up y detiene futuros cargos
    [Tags]    PruebaGeneradaIA    TelcelUp    AmigoPaguitos    Baja    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    Y existe un cliente con Telcel Up activa    ${CLIENTE_AMIGO_PAGUITOS}
    Cuando el sistema muestra cliente con oferta Telcel Up activa
    Cuando selecciona baja de productos o servicios adicionales
    Entonces el sistema presenta ofertas activas que pueden removerse
    Cuando selecciona Telcel Up para su cancelación
    Entonces el sistema solicita confirmación de baja
    Cuando confirma cancelación de suscripción de Telcel Up
    Entonces el sistema elimina Telcel Up y detiene futuros cargos
