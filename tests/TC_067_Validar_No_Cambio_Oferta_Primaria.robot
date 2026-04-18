*** Settings ***
Documentation     TC067 - Validar que no se permite cambio de oferta primaria
...               Verifica que el sistema no permita realizar cambio de oferta primaria
...               en suscriptores Amigo Paguitos ni por GUI de BES ni a través de interfaz
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite cambio de oferta primaria
    [Documentation]    Verifica que el cambio de oferta primaria:
    ...                - NO esté disponible desde la GUI de BES
    ...                - NO esté disponible a través de API
    ...                - La oferta primaria permanezca sin cambios
    [Tags]    PruebaGeneradaIA    Ofertas    AmigoPaguitos    Restricciones    Funcional    Low
    Dado que el usuario ha iniciado sesión en BES
    Cuando accede a la vista 360 del suscriptor Amigo Paguitos    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    ${oferta_original}=    Y obtiene la oferta primaria actual
    Cuando intenta cambiar la oferta primaria desde la GUI
    Entonces el sistema debe mostrar mensaje de operación no permitida
    Y la oferta primaria debe permanecer sin cambios    ${oferta_original}
