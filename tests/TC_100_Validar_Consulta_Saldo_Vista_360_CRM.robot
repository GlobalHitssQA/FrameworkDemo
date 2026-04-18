*** Settings ***
Documentation     TC100 - Validar consulta de saldo en vista 360 CRM
...               Verifica que los canales internos y externos pueden visualizar
...               información del crédito Amigo Paguitos en la pantalla 360 de BES
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar consulta de saldo en vista 360 CRM
    [Documentation]    Verifica que la Vista 360 del cliente:
    ...                - Permite acceso según permisos del canal
    ...                - Despliega pantalla 360 con información del crédito
    ...                - Muestra información completa: datos cliente, cuotas, pagos, vencimiento, estatus
    [Tags]    PruebaGeneradaIA    Consulta    AmigoPaguitos    Vista360    CRM    Funcional    Medium
    Dado que el usuario se autentica con permisos de canal interno o externo    ${USUARIO_TEST}    ${PASSWORD_TEST}
    Cuando accede a Vista 360 del cliente con suscriptor Amigo Paguitos    ${CLIENTE_AMIGO_PAGUITOS}
    Entonces el sistema despliega pantalla 360 con información del crédito
    Y la Vista 360 despliega correctamente toda la información del financiamiento
