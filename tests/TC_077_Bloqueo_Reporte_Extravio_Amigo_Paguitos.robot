*** Settings ***
Documentation     TC077 - Validar que no se permite crear reporte por extravío
...               Verifica que el sistema bloquea la creación y cancelación de reportes por extravío
...               (petición o robo) para suscriptores de Amigo Paguitos
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite crear reporte por extravío
    [Documentation]    Verifica que el sistema bloquea reportes por extravío para suscriptores Amigo Paguitos:
    ...                - No permite crear reporte desde GUI de BES
    ...                - No permite crear reporte mediante interfaz API
    ...                - No permite cancelar reportes por extravío
    [Tags]    PruebaGeneradaIA    Tramites    AmigoPaguitos    Restricciones    CasosDeError    Low
    Dado que el usuario ha iniciado sesión en BES
    Y existe un suscriptor Mixto de Amigo Paguitos activo    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Cuando el sistema muestra la información del suscriptor Mixto con equipo financiado
    Y intenta acceder al módulo de creación de reporte por extravío desde GUI
    Entonces el sistema no muestra opción crear reporte extravío o está deshabilitada
    Cuando intenta crear reporte por extravío mediante interfaz API    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Entonces el sistema rechaza petición retornando mensaje de error
    Cuando verifica que tampoco se permite cancelar reporte por extravío
