*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar integración entre BES y CPS para conocer pagos de parcialidades realizados desde Kioscos con tarjeta de crédito
    [Tags]    PruebaGeneradaIA    Cobranza    BES    CPS    Kioscos    Integral
    [Documentation]    Verificar la integración entre BES y CPS para conocer los pagos de parcialidades
    ...                realizados desde Kioscos con tarjeta de crédito para un préstamo de Amigo Paguitos.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Préstamo activo en BES; Integración BES-CPS-Kioscos configurada;
    ...                Kiosco disponible para recibir pagos con tarjeta de crédito; Parcialidad pendiente de pago
    Given la integración entre BES y CPS está activa y configurada para el punto de cobro Kioscos
    When se realiza un pago de parcialidad mediante tarjeta de crédito en un Kiosco para un préstamo de Amigo Paguitos
    Then CPS notifica a BES sobre el pago con datos completos incluyendo monto, fecha, referencia del préstamo, número de parcialidad, medio de pago y punto de cobro
    And BES acredita el pago de la parcialidad correspondiente en el calendario de cobranza marcándola como pagada con fecha, monto y medio de pago registrados
    And BES actualiza el saldo del préstamo reduciendo correctamente el monto según la parcialidad pagada desde Kioscos
    And BES muestra en el historial de pagos el pago realizado desde Kioscos con todos los detalles de la transacción

*** Keywords ***
La integración entre BES y CPS está activa y configurada para el punto de cobro Kioscos
    La integración entre BES y CPS está configurada para el punto de cobro Kioscos

Se realiza un pago de parcialidad mediante tarjeta de crédito en un Kiosco para un préstamo de Amigo Paguitos
    Se realiza un pago de parcialidad mediante tarjeta de crédito en un Kiosco para un préstamo de Amigo Paguitos    PREST123456    1    4500    ABC123456    4111111111111111    123    12/28

CPS notifica a BES sobre el pago con datos completos incluyendo monto, fecha, referencia del préstamo, número de parcialidad, medio de pago y punto de cobro
    CPS notifica a BES sobre el pago de parcialidad realizado desde Kioscos    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${MONTO_PARCIALIDAD}    ${FECHA_PAGO}    Kioscos    ${MEDIO_PAGO}

BES acredita el pago de la parcialidad correspondiente en el calendario de cobranza marcándola como pagada con fecha, monto y medio de pago registrados
    BES acredita el pago de la parcialidad en el calendario de cobranza con datos de pago desde Kioscos    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${FECHA_PAGO}    ${MONTO_PARCIALIDAD}    ${MEDIO_PAGO}

BES actualiza el saldo del préstamo reduciendo correctamente el monto según la parcialidad pagada desde Kioscos
    BES actualiza el saldo del préstamo después de acreditar el pago desde Kioscos    ${REFERENCIA_PRESTAMO}

BES muestra en el historial de pagos el pago realizado desde Kioscos con todos los detalles de la transacción
    BES muestra el pago realizado desde Kioscos en el historial de pagos con todos los detalles    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${MONTO_PARCIALIDAD}    ${FECHA_PAGO}    Kioscos    ${MEDIO_PAGO}
