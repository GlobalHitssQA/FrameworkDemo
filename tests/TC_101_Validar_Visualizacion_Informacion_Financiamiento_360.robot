*** Settings ***
Documentation     TC101 - Validar visualización de información financiamiento en vista 360
...               Verifica la visualización completa de la información del financiamiento
...               de Amigo Paguitos en la pantalla 360 de BES cuando un cliente tiene
...               un crédito activo
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar visualización de información financiamiento en vista 360
    [Documentation]    Verifica que la pantalla 360:
    ...                - Muestra la sección de información del crédito
    ...                - Despliega datos: monto, plazo, periodicidad, cliente, cuotas, vencimiento, estatus
    ...                - Todos los datos del financiamiento se visualizan correctamente
    [Tags]    PruebaGeneradaIA    Postventa    AmigoPaguitos    Vista360    Financiamiento    Funcional    Low
    Dado que el usuario ha accedido a BES con permisos de consulta
    Cuando accede a pantalla 360 con cliente que tiene financiamiento activo    ${CLIENTE_AMIGO_PAGUITOS}
    Cuando navega a sección de información de financiamiento
    Entonces el sistema despliega sección de información del crédito
    Y todos los datos del financiamiento se visualizan correctamente
