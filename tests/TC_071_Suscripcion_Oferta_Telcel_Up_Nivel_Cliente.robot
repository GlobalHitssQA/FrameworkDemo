*** Settings ***
Documentation     TC071 - Validar suscripción a oferta Telcel Up a nivel cliente
...               Verifica que un cliente de Amigo Paguitos puede suscribirse
...               a la oferta suplementaria Telcel Up a nivel de cliente
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar suscripción a oferta Telcel Up a nivel cliente
    [Documentation]    Verifica que se permite suscribir Telcel Up a nivel cliente para Amigo Paguitos:
    ...                - Muestra información de cuenta Mixto y equipo financiado
    ...                - Presenta ofertas suplementarias disponibles
    ...                - Permite configurar parámetros de Telcel Up
    ...                - Registra exitosamente Telcel Up y genera cargo
    [Tags]    PruebaGeneradaIA    TelcelUp    AmigoPaguitos    Suscripcion    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    Y existe un cliente Amigo Paguitos con cuenta Mixto activa    ${CLIENTE_AMIGO_PAGUITOS}
    Cuando el sistema muestra información de cuenta Mixto y equipo financiado
    Cuando selecciona alta de productos o servicios adicionales
    Entonces el sistema presenta ofertas suplementarias disponibles
    Cuando selecciona oferta Telcel Up a nivel cliente
    Entonces el sistema permite configurar parámetros de Telcel Up
    Cuando confirma y aplica suscripción de Telcel Up
    Entonces el sistema registra Telcel Up y genera cargo correspondiente
