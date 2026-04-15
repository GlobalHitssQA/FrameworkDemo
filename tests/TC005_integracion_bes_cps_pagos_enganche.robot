*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar integración entre BES y CPS para conocer los pagos de enganche realizados por los clientes
    [Tags]    PruebaGeneradaIA    Cobranza    BES    CPS    Integral
    [Documentation]    Verificar la integración entre BES y CPS para conocer los pagos de enganche
    ...                realizados por los clientes en el sistema de pagos CPS.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Préstamo creado en BES; Integración BES-CPS configurada;
    ...                CPS disponible para procesar pagos; Pago de enganche pendiente de aplicar
    Given la integración entre BES y CPS está configurada y activa para recibir información de pagos
    When se ejecuta un pago de enganche en CPS asociado a un préstamo de Amigo Paguitos
    Then CPS notifica a BES sobre el pago de enganche realizado con monto, fecha, referencia e identificador de transacción
    And BES registra el pago de enganche en el préstamo correspondiente y actualiza el saldo
    And BES muestra el pago de enganche registrado con fecha, monto y estatus aplicado correctamente

*** Keywords ***
La integración entre BES y CPS está configurada y activa para recibir información de pagos
    La integración entre BES y CPS está configurada y activa

Se ejecuta un pago de enganche en CPS asociado a un préstamo de Amigo Paguitos
    ${transaccion_id}=    Se ejecuta un pago de enganche en CPS asociado a un préstamo    5000    PREST123456    ABC123456
    Set Suite Variable    ${TRANSACCION_ID}    ${transaccion_id}
    Set Suite Variable    ${MONTO_PAGO}    5000
    Set Suite Variable    ${REFERENCIA_PRESTAMO}    PREST123456
    Set Suite Variable    ${FECHA_PAGO}    2026-04-15

CPS notifica a BES sobre el pago de enganche realizado con monto, fecha, referencia e identificador de transacción
    CPS notifica a BES sobre el pago de enganche realizado    ${REFERENCIA_PRESTAMO}    ${MONTO_PAGO}    ${FECHA_PAGO}    ${TRANSACCION_ID}

BES registra el pago de enganche en el préstamo correspondiente y actualiza el saldo
    BES registra el pago de enganche en el préstamo correspondiente    ${REFERENCIA_PRESTAMO}    ${MONTO_PAGO}    ${FECHA_PAGO}    ${TRANSACCION_ID}

BES muestra el pago de enganche registrado con fecha, monto y estatus aplicado correctamente
    BES muestra el pago de enganche en el detalle del préstamo    ${REFERENCIA_PRESTAMO}    ${FECHA_PAGO}    ${MONTO_PAGO}    Aplicado
