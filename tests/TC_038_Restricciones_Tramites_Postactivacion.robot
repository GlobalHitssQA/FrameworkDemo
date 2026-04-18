*** Settings ***
Documentation     TC038 - Validación de restricciones de trámites postactivación no permitidos
...               Verifica que el sistema no permita ejecutar trámites postactivación restringidos
...               para suscriptores de Amigo Paguitos como cambio de número, cambio de SIM,
...               cesión de derechos y reporte de pérdida
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validación de restricciones de trámites postactivación no permitidos
    [Documentation]    Verifica que el sistema bloquee operaciones no permitidas para Amigo Paguitos:
    ...                - Cambio de número
    ...                - Cambio de SIM
    ...                - Cesión de derechos
    ...                - Reporte de pérdida o robo
    [Tags]    PruebaGeneradaIA    Tramites    AmigoPaguitos    Restricciones    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    Y existe un suscriptor de Amigo Paguitos activo    ${SUSCRIPTOR_AMIGO_PAGUITOS}
    Cuando intenta realizar un cambio de número
    Entonces el sistema debe bloquear la operación con mensaje de restricción
    Cuando intenta realizar un cambio de SIM
    Entonces el sistema debe bloquear la operación con mensaje de restricción
    Cuando intenta realizar una cesión de derechos
    Entonces el sistema debe bloquear la operación con mensaje de restricción
    Cuando intenta realizar un reporte de pérdida o robo
    Entonces el sistema debe bloquear la operación con mensaje de restricción
