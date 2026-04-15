*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la acreditación de pagos de parcialidades mediante las interfaces de BES desde los distintos puntos de cobro
    [Tags]    PruebaGeneradaIA    Cobranza    BES    Interfaces    Integral
    [Documentation]    Verificar la acreditación de pagos de parcialidades mediante las interfaces de BES
    ...                desde los distintos puntos de cobro (SICATEL, Kioscos, OXXO, etc.).
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Preconditions: Préstamo activo en BES; Integración con puntos de cobro configurada;
    ...                Pago realizado en punto de cobro; Layout de reporte hacia BIBES definido
    Given un préstamo activo existe en BES y las interfaces con puntos de cobro están configuradas
    When BES recibe la notificación de pago desde el punto de cobro a través de la interfaz correspondiente
    Then BES identifica correctamente el préstamo asociado al pago mediante la referencia recibida
    And BES aplica el pago a la parcialidad correspondiente según el calendario de cobranza
    And BES actualiza el saldo del préstamo después de acreditar el pago
    And BES registra el pago en el historial de movimientos del préstamo
    And BES genera el reporte de conciliación de parcialidades hacia BIBES según el layout definido
    And el proceso de acreditación es automático sin intervención manual

*** Keywords ***
Un préstamo activo existe en BES y las interfaces con puntos de cobro están configuradas
    Existe un préstamo activo en BES con calendario de cobranza generado    PREST123456    ABC123456

BES recibe la notificación de pago desde el punto de cobro a través de la interfaz correspondiente
    Se simula recepción de notificación de pago desde punto de cobro SICATEL    PREST123456    1    4500    2026-04-15    SICATEL

BES identifica correctamente el préstamo asociado al pago mediante la referencia recibida
    BES identifica el préstamo asociado mediante la referencia del pago    PREST123456

BES aplica el pago a la parcialidad correspondiente según el calendario de cobranza
    BES aplica el pago a la parcialidad más antigua pendiente    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${MONTO_PARCIALIDAD}    ${FECHA_PAGO}

BES actualiza el saldo del préstamo después de acreditar el pago
    BES actualiza el saldo del préstamo después de acreditar el pago    ${REFERENCIA_PRESTAMO}

BES registra el pago en el historial de movimientos del préstamo
    BES registra el pago en el historial de movimientos con todos los detalles    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}    ${MONTO_PARCIALIDAD}    ${FECHA_PAGO}    SICATEL

BES genera el reporte de conciliación de parcialidades hacia BIBES según el layout definido
    BES genera el reporte de conciliación hacia BIBES con formato de layout definido    ${REFERENCIA_PRESTAMO}

El proceso de acreditación es automático sin intervención manual
    BES verifica que el pago fue acreditado automáticamente sin demoras    ${REFERENCIA_PRESTAMO}    ${NUMERO_PARCIALIDAD}
