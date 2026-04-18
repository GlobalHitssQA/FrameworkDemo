*** Settings ***
Documentation     TC075 - Validar que no se permite cambio de SIM
...               Verifica que el sistema bloquea el proceso de cambio de SIM (ICCID)
...               para suscriptores de Amigo Paguitos tanto desde GUI BES como a través de interfaz
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite cambio de SIM
    [Documentation]    Verifica que el sistema bloquea el cambio de SIM para suscriptores Amigo Paguitos:
    ...                - Desde GUI de BES
    ...                - A través de interfaz API con nuevo ICCID
    [Tags]    PruebaGeneradaIA    Tramites    AmigoPaguitos    Restricciones    CasosDeError    Low
    Dado que el usuario ha iniciado sesión en BES
    Y existe un suscriptor Mixto de Amigo Paguitos activo sin SIM    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Cuando el sistema muestra información del suscriptor Mixto sin SIM
    Y intenta ejecutar trámite de cambio de SIM desde GUI
    Entonces el sistema no muestra opción de cambio SIM o está deshabilitada
    Cuando intenta ejecutar cambio de SIM mediante interfaz API con nuevo ICCID    ${SUSCRIPTOR_AMIGO_PAGUITOS}    8952123456789012345
    Entonces el sistema rechaza petición con mensaje operación no disponible
