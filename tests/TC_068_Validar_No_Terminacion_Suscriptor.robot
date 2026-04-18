*** Settings ***
Documentation     TC068 - Validar que no se permite terminación de suscriptor
...               Verifica que el sistema no permite ejecutar el proceso de terminación de suscriptor
...               para clientes Amigo Paguitos ni por GUI ni por interfaz
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite terminación de suscriptor
    [Documentation]    Verifica que el sistema bloquea el proceso de terminación para suscriptores Amigo Paguitos:
    ...                - Muestra información completa del suscriptor incluyendo financiamiento
    ...                - Bloquea terminación desde GUI
    ...                - Rechaza terminación mediante API
    ...                - Mantiene estado activo sin cambios
    [Tags]    PruebaGeneradaIA    Terminacion    AmigoPaguitos    Restricciones    CasosError    Low
    Dado que el usuario ha iniciado sesión en BES
    Y existe un suscriptor Amigo Paguitos con financiamiento vigente    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Cuando el sistema muestra la información completa del suscriptor
    Cuando intenta iniciar terminación del suscriptor desde GUI
    Entonces el sistema bloquea terminación mostrando mensaje
    Cuando intenta ejecutar terminación mediante interfaz API    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Entonces BES rechaza la solicitud con código de error
    Y el suscriptor permanece activo sin cambios
