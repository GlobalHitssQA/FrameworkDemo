*** Settings ***
Documentation     TC069 - Validar que no se permite cesión de derechos
...               Verifica que el sistema bloquea el proceso de cesión de derechos
...               para suscriptores Amigo Paguitos tanto por GUI de BES como por interfaz
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite cesión de derechos
    [Documentation]    Verifica que el sistema bloquea cesión de derechos para suscriptores Amigo Paguitos:
    ...                - Despliega información del suscriptor identificado como Amigo Paguitos
    ...                - Bloquea cesión de derechos desde GUI
    ...                - Rechaza cesión mediante API
    ...                - Mantiene titularidad sin cambios
    [Tags]    PruebaGeneradaIA    CesionDerechos    AmigoPaguitos    Restricciones    CasosError    Low
    Dado que el usuario ha iniciado sesión en BES
    Cuando accede al perfil del suscriptor Amigo Paguitos en BES    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Entonces el sistema despliega información identificada como Amigo Paguitos
    Cuando intenta iniciar cesión de derechos desde GUI de BES
    Entonces el sistema bloquea cesión mostrando mensaje no disponible
    Cuando intenta ejecutar cesión mediante interfaz API de BES    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Entonces BES rechaza la solicitud con código de error
    Y la titularidad del suscriptor permanece sin cambios
