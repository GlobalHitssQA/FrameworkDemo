*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar integración entre BES y CPS para conocer pagos de parcialidades realizados desde SICATEL
    [Tags]    PruebaGeneradaIA    Cobranza    BES    CPS    SICATEL    Integral
    [Documentation]    Verificar la integración entre BES y CPS para conocer los pagos de parcialidades
    ...                realizados desde SICATEL para un préstamo de Amigo Paguitos.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Préstamo activo en BES con calendario de cobranza generado;
    ...                Integración BES-CPS-SICATEL configurada; SICATEL disponible para recibir pagos
    Given la integración entre BES y CPS está activa y configurada para el punto de cobro SICATEL
    When se realiza un pago de parcialidad en SICATEL para un préstamo activo de Amigo Paguitos
    Then CPS notifica a BES sobre el pago realizado con monto, fecha, referencia del préstamo, número de parcialidad y punto de cobro
    And BES acredita el pago de la parcialidad en el calendario de cobranza con fecha y monto correctos
    And BES actualiza el saldo del préstamo reduciendo el monto según la parcialidad pagada
    And BES retorna mediante APIs el desglose de pagos mostrando la parcialidad acreditada desde SICATEL

*** Keywords ***
La integración entre BES y CPS está activa y configurada para el punto de cobro SICATEL
    La integración entre BES y CPS está configurada para el punto de cobro SICATEL

Se realiza un pago de parcialidad en SICATEL para un préstamo activo de Amigo Paguitos
    Se realiza un pago de parcialidad en SICATEL para un préstamo de Amigo Paguitos    PREST123456    1    4500    ABC123456

CPS notifica a BES sobre el pago realizado con monto, fecha, referencia del préstamo, número de parcialidad y punto de cobro
    CPS notifica a BES sobre el pago de parcialidad realizado desde SICATEL    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${MONTO_PARCIALIDAD}    ${FECHA_PAGO}    SICATEL

BES acredita el pago de la parcialidad en el calendario de cobranza con fecha y monto correctos
    BES acredita el pago de la parcialidad correspondiente en el calendario de cobranza    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${FECHA_PAGO}    ${MONTO_PARCIALIDAD}

BES actualiza el saldo del préstamo reduciendo el monto según la parcialidad pagada
    BES actualiza el saldo del préstamo después de acreditar el pago    ${REFERENCIA_PRESTAMO}

BES retorna mediante APIs el desglose de pagos mostrando la parcialidad acreditada desde SICATEL
    BES retorna el desglose de pagos mostrando la parcialidad acreditada desde SICATEL    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${MONTO_PARCIALIDAD}    ${FECHA_PAGO}    SICATEL
