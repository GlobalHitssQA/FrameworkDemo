*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que la pantalla 360 de BES muestre el historial completo de pagos realizados al crédito de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Consulta    BES    Pantalla360    DesglosePagos    Funcional
    [Documentation]    Verificar que la pantalla 360 de BES muestre el historial completo de pagos realizados al crédito de Amigo Paguitos
    ...                incluyendo todos los pagos de enganche y parcialidades con su fecha de acreditación, monto pagado,
    ...                método de pago utilizado (efectivo, tarjeta), punto de cobro (SICATEL, Kioscos, OXXO) y el estatus
    ...                de cada transacción (aplicado, revertido, pendiente).
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario autenticado en BES; Cliente con crédito de Amigo Paguitos con pagos registrados; Integración con CPS para conocer pagos de enganche y parcialidades habilitada
    Given el usuario accede a la pantalla 360 de BES para un cliente con crédito de Amigo Paguitos que tiene pagos registrados
    When se navega a la sección de desglose de pagos dentro de la pantalla 360
    Then la pantalla muestra tabla con todos los pagos realizados incluyendo fecha, monto, método de pago y punto de cobro
    And se muestra el pago de enganche realizado al momento de la venta con su monto y fecha
    And se muestran todos los pagos de parcialidades acreditados al crédito con su detalle completo
    And cada pago muestra el estatus de la transacción: aplicado, revertido o pendiente

*** Keywords ***
El usuario accede a la pantalla 360 de BES para un cliente con crédito de Amigo Paguitos que tiene pagos registrados
    El usuario autenticado accede a pantalla 360 de BES para cliente con crédito y pagos registrados    5551234567
    El sistema carga la pantalla 360 con la información del cliente y su crédito

Se navega a la sección de desglose de pagos dentro de la pantalla 360
    Navegar a sección de desglose de pagos en pantalla 360
    El sistema muestra la sección de historial de pagos del financiamiento

La pantalla muestra tabla con todos los pagos realizados incluyendo fecha, monto, método de pago y punto de cobro
    Verificar tabla de desglose de pagos con todos los detalles completos

Se muestra el pago de enganche realizado al momento de la venta con su monto y fecha
    Verificar pago de enganche en historial de pagos

Se muestran todos los pagos de parcialidades acreditados al crédito con su detalle completo
    Verificar pagos de parcialidades en historial de pagos

Cada pago muestra el estatus de la transacción: aplicado, revertido o pendiente
    Verificar estatus de transacciones en historial de pagos
