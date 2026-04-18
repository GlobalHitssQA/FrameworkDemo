*** Settings ***
Documentation     TC073 - Validar que no se permite intercambio de recursos
...               Verifica que el sistema bloquea el proceso de intercambio de recursos
...               para suscriptores de Amigo Paguitos tanto desde GUI BES como a través de interfaz
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite intercambio de recursos
    [Documentation]    Verifica que el sistema bloquea el intercambio de recursos para suscriptores Amigo Paguitos:
    ...                - Desde GUI de BES
    ...                - A través de interfaz API
    [Tags]    PruebaGeneradaIA    Tramites    AmigoPaguitos    Restricciones    CasosDeError    Low
    Dado que el usuario ha iniciado sesión en BES
    Y existe un suscriptor Mixto de Amigo Paguitos activo    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Cuando el sistema muestra la información del suscriptor Mixto con equipo financiado
    Y intenta acceder a funcionalidad de intercambio de recursos desde GUI
    Entonces el sistema no muestra opción de intercambio o está deshabilitada
    Cuando intenta ejecutar intercambio de recursos mediante interfaz API    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Entonces el sistema retorna error indicando operación no disponible para Amigo Paguitos
