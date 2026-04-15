*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar acreditación de pagos de parcialidades por puntos de cobro existentes
    [Tags]    PruebaGeneradaIA    Cobranza    BES    CPS    SICATEL    Kioscos    Pantalla360    Integral
    [Documentation]    Verificar que BES se integre con CPS y acredite correctamente los pagos de parcialidades
    ...                realizados en los puntos de cobro existentes como SICATEL y Kioscos
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Integración BES-CPS configurada y funcional;
    ...                SICATEL y Kioscos operativos y conectados a CPS;
    ...                Préstamo activo con parcialidades pendientes de pago;
    ...                Puntos de cobro habilitados para recibir pagos de Amigo Paguitos
    Given la integración de BES con CPS está configurada para recibir notificaciones de pagos de enganche y parcialidades
    When se realiza un pago de parcialidad desde SICATEL para un préstamo activo registrado en BES
    Then CPS notifica a BES sobre el pago realizado incluyendo monto, fecha, referencia del préstamo y método de pago desde SICATEL
    And BES identifica el préstamo correspondiente y acredita el pago a la parcialidad correspondiente desde SICATEL
    When se realiza un pago desde un Kiosco con TDC para el mismo préstamo
    Then CPS notifica a BES sobre el pago realizado incluyendo monto, fecha, referencia del préstamo y método de pago desde Kioscos
    And BES identifica el préstamo correspondiente y acredita el pago a la parcialidad correspondiente desde Kioscos
    And BES actualiza el calendario de pagos marcando las parcialidades como pagadas
    And el historial de pagos del préstamo en la pantalla 360 muestra todos los pagos acreditados con fecha, monto, método de pago y punto de cobro

*** Keywords ***
La integración de BES con CPS está configurada para recibir notificaciones de pagos de enganche y parcialidades
    La integración entre BES y CPS está configurada para los puntos de cobro SICATEL y Kioscos

Se realiza un pago de parcialidad desde SICATEL para un préstamo activo registrado en BES
    Se realiza un pago de parcialidad en SICATEL para un préstamo de Amigo Paguitos    PREST123456    1    4500    ABC123456

CPS notifica a BES sobre el pago realizado incluyendo monto, fecha, referencia del préstamo y método de pago desde SICATEL
    CPS notifica a BES sobre el pago de parcialidad realizado desde SICATEL    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${MONTO_PARCIALIDAD}    ${FECHA_PAGO}    SICATEL

BES identifica el préstamo correspondiente y acredita el pago a la parcialidad correspondiente desde SICATEL
    BES localiza el préstamo, aplica el pago y actualiza el saldo pendiente desde SICATEL    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${FECHA_PAGO}    ${MONTO_PARCIALIDAD}

Se realiza un pago desde un Kiosco con TDC para el mismo préstamo
    Se realiza un pago de parcialidad mediante tarjeta de crédito en un Kiosco para el mismo préstamo    ${REFERENCIA_PRESTAMO}    2    4500    ABC123456    4111111111111111    123    12/28

CPS notifica a BES sobre el pago realizado incluyendo monto, fecha, referencia del préstamo y método de pago desde Kioscos
    CPS notifica a BES sobre el pago de parcialidad realizado desde Kioscos    ${REFERENCIA_PRESTAMO}    2    4500    ${FECHA_PAGO_KIOSCO}    Kioscos    ${MEDIO_PAGO}

BES identifica el préstamo correspondiente y acredita el pago a la parcialidad correspondiente desde Kioscos
    BES localiza el préstamo, aplica el pago y actualiza el saldo pendiente desde Kioscos    ${REFERENCIA_PRESTAMO}    2    ${FECHA_PAGO_KIOSCO}    4500    ${MEDIO_PAGO}

BES actualiza el calendario de pagos marcando las parcialidades como pagadas
    BES actualiza el calendario de pagos marcando las cuotas como pagadas    ${REFERENCIA_PRESTAMO}    1    2

El historial de pagos del préstamo en la pantalla 360 muestra todos los pagos acreditados con fecha, monto, método de pago y punto de cobro
    BES muestra en pantalla 360 todos los pagos acreditados con detalles completos    ${REFERENCIA_PRESTAMO}    1    2    ${MONTO_PARCIALIDAD}    4500
