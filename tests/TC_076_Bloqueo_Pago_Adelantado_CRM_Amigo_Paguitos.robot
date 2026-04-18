*** Settings ***
Documentation     TC076 - Validar que no se permite pago por adelantado CRM
...               Verifica que el sistema bloquea la funcionalidad de pago por adelantado desde CRM
...               para suscriptores de Amigo Paguitos, permitiendo solo sobrepagos que se mantienen
...               como saldo a favor
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Resource          ../resources/config.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Validar que no se permite pago por adelantado CRM
    [Documentation]    Verifica que el sistema bloquea el pago por adelantado CRM:
    ...                - No permite pago anticipado desde CRM que modifica parcialidades
    ...                - Acepta sobrepagos que se mantienen como saldo a favor
    [Tags]    PruebaGeneradaIA    Pagos    AmigoPaguitos    Restricciones    Funcional    Medium
    Dado que el usuario ha iniciado sesión en BES
    Y existe un suscriptor Amigo Paguitos con parcialidades pendientes    ${CUENTA_AMIGO_PAGUITOS}
    Cuando el sistema muestra información del suscriptor con parcialidades pendientes
    Y intenta ejecutar operación de pago por adelantado CRM desde CRM
    Entonces el sistema no muestra disponible opción de pago anticipado CRM
    Cuando realiza sobrepago mayor al monto de parcialidad vencida mediante API    1500
    Entonces el sistema acepta el pago y aplica monto a parcialidades vencidas
    Cuando consulta estado de cuenta después del sobrepago
    Entonces el sistema muestra saldo a favor disponible para futuras parcialidades
