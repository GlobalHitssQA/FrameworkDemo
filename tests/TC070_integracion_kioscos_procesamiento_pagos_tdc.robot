*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES procese correctamente los pagos de parcialidades y enganches de Amigo Paguitos realizados en Kioskos con tarjeta de crédito
    [Tags]    PruebaGeneradaIA    Kioscos    BES    CPS    IntegracionPagos    TDC    Integral
    [Documentation]    Verificar que BES procese correctamente los pagos de parcialidades y enganches de Amigo Paguitos
    ...                realizados en Kioskos utilizando tarjeta de crédito. El sistema debe procesar el pago con TDC en Kioskos,
    ...                generar el comprobante de transacción, enviar la confirmación de pago a CPS/EPAC con los datos de la transacción,
    ...                permitir que BES consulte la información de pagos realizados a través de Kioskos mediante la integración con CPS,
    ...                acreditar el pago al concepto correspondiente del préstamo (enganche o parcialidad), ejecutar el proceso de
    ...                desbloqueo si el pago regulariza el préstamo, y registrar la acreditación del pago en el historial del préstamo
    ...                con todos los detalles de la transacción incluyendo punto de cobro Kioskos y método de pago TDC.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Cliente con préstamo de Amigo Paguitos registrado en BES; Integración entre BES, CPS/EPAC y Kioskos activa; Kioskos configurados para recibir pagos con TDC; Enganche o parcialidad pendiente de pago
    Given la integración entre BES, CPS y Kioskos está configurada y activa
    When el cliente realiza un pago de enganche o parcialidad de Amigo Paguitos en Kioskos utilizando tarjeta de crédito
    Then Kioskos procesa el pago con TDC y genera el comprobante de transacción
    And Kioskos envía la confirmación de pago a CPS/EPAC con los datos de la transacción
    And BES consulta la información de pagos realizados a través de Kioskos mediante la integración con CPS
    And BES obtiene el detalle completo: monto pagado, concepto, número de préstamo, fecha y hora
    And BES acredita el pago al concepto correspondiente del préstamo
    And BES actualiza el estatus del préstamo y ejecuta el proceso de desbloqueo si aplica
    And BES registra la acreditación del pago en el historial del préstamo con todos los detalles de la transacción
