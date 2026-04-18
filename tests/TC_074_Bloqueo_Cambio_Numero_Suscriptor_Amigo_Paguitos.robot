*** Settings ***
Documentation     TC074 - Validar que no se permite cambio de número de suscriptor
...               Verifica que el sistema bloquea el proceso de cambio de número de suscriptor
...               para clientes Amigo Paguitos tanto desde GUI BES como a través de interfaz
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite cambio de número de suscriptor
    [Documentation]    Verifica que el sistema bloquea el cambio de número para suscriptores Amigo Paguitos:
    ...                - Desde GUI de BES
    ...                - A través de interfaz API
    [Tags]    PruebaGeneradaIA    Tramites    AmigoPaguitos    Restricciones    CasosDeError    Low
    Dado que el usuario ha iniciado sesión en BES
    Y existe un suscriptor de Amigo Paguitos con MSISDN dummy asignado    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Cuando el sistema muestra información del suscriptor con número dummy
    Y intenta ejecutar trámite de cambio de número desde GUI
    Entonces el sistema no permite cambio de número o muestra mensaje no disponible
    Cuando intenta ejecutar cambio de número mediante interfaz API    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Entonces el sistema retorna error operación no disponible para suscriptores Amigo Paguitos
