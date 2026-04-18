*** Settings ***
Documentation     TC080 - Validar que no se permite suspender suscriptor Amigo Paguitos
...               Verifica que las operaciones de suspensión y reactivación de suscriptor
...               no están disponibles para clientes Amigo Paguitos ya que no tienen
...               tarjeta SIM asociada
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite suspender suscriptor Amigo Paguitos
    [Documentation]    Verifica que las operaciones de suspensión y reactivación:
    ...                - NO estén disponibles desde GUI de BES
    ...                - Sistema rechace petición por API indicando sin tarjeta SIM
    ...                - Reactivación tampoco esté disponible
    [Tags]    PruebaGeneradaIA    Suscriptor    AmigoPaguitos    Suspension    Restricciones    CasosError    Low
    Dado que el usuario ha iniciado sesión en BES
    Dado que existe un suscriptor Mixto Amigo Paguitos activo sin SIM    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Cuando el sistema muestra información del suscriptor Mixto sin SIM asociada
    Cuando intenta ejecutar operación de suspensión por cobranza parcial desde GUI
    Entonces el sistema no muestra disponibles opciones de suspensión
    Cuando intenta ejecutar suspensión de suscriptor a través de API    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Entonces el sistema rechaza petición indicando sin tarjeta SIM
    Cuando intenta ejecutar reactivación de suscriptor desde GUI
    Entonces el sistema rechaza operación de reactivación
