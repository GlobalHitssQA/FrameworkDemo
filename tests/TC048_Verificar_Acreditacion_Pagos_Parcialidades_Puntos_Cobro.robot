*** Settings ***
Documentation    Caso de prueba: Verificar acreditación de pagos de parcialidades en puntos de cobro
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Acreditación de pagos desde puntos de cobro
...              Escenario: Verificar la acreditación de pagos de parcialidades en BES cuando el cliente
...              realiza pagos a través de puntos de cobro como SICATEL y Kioscos
...
...              Precondiciones:
...              - Integración entre BES y CPS-EPAC configurada
...              - Crédito de Amigo Paguitos activo
...              - Puntos de cobro SICATEL y Kioscos disponibles
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Medium

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Crédito Amigo Paguitos
${CREDITO_ID}                  CRE456789123
${CUSTOMER_ID_PAGO}            CUS789456123

# Datos de prueba - Pago desde SICATEL
${MONTO_PAGO_PARCIALIDAD}      500.00
${PUNTO_COBRO_SICATEL}         SICATEL
${REFERENCIA_PAGO_SICATEL}     SICATEL-202604170930-789456

# Datos de prueba - Verificación
${ESTADO_PARCIALIDAD_ESPERADO}     Pagada

*** Test Cases ***
Verificar Acreditación De Pagos De Parcialidades En Puntos De Cobro
    [Documentation]    Este caso de prueba verifica la acreditación de pagos de parcialidades
    ...                en BES cuando el cliente realiza pagos a través de puntos de cobro
    ...                como SICATEL y Kioscos.
    ...
    ...                Flujo del proceso:
    ...                1. Cliente realiza pago de parcialidad desde SICATEL
    ...                2. SICATEL procesa el pago y envía notificación de acreditación a BES
    ...                3. BES recibe la notificación de pago desde la integración con CPS-EPAC
    ...                4. BES registra la transacción de pago con monto, fecha y referencia
    ...                5. BES acredita el pago a la parcialidad correspondiente del crédito
    ...                6. BES actualiza el calendario de cobranza reflejando el pago realizado
    ...                7. Sistema registra en historial de pagos el detalle completo de la operación
    ...
    ...                Verificaciones:
    ...                - SICATEL procesa el pago y envía notificación a BES
    ...                - BES recibe notificación desde integración CPS-EPAC
    ...                - BES registra transacción con monto, fecha y referencia del punto de cobro
    ...                - BES acredita el pago a la parcialidad correspondiente
    ...                - Calendario de cobranza se actualiza con la parcialidad pagada
    ...                - Historial de pagos muestra detalle completo incluyendo punto de cobro
    [Tags]    PruebaGeneradaIA    Funcional    Cobranza    AcreditacionPagos    PuntosCobro

    # GIVEN: Usuario autenticado en BES
    Dado que el usuario ha iniciado sesión en BES

    # AND: Navegar al módulo de cobranza y pagos
    Y navega al módulo de cobranza y pagos

    # WHEN: Registrar un pago de parcialidad desde SICATEL para un crédito de Amigo Paguitos
    Cuando registra pago de parcialidad desde punto de cobro SICATEL
    ...    ${CREDITO_ID}
    ...    ${MONTO_PAGO_PARCIALIDAD}
    ...    ${PUNTO_COBRO_SICATEL}
    ...    ${REFERENCIA_PAGO_SICATEL}

    # THEN: SICATEL procesa el pago y envía la notificación de acreditación a BES
    Entonces SICATEL procesa el pago y envía notificación de acreditación a BES

    # THEN: BES recibe la notificación de pago desde la integración con CPS-EPAC
    Y BES recibe notificación de pago desde integración con CPS-EPAC

    # THEN: BES registra la transacción de pago con el monto, fecha y referencia del punto de cobro
    Y BES registra la transacción de pago con monto fecha y referencia
    ...    ${MONTO_PAGO_PARCIALIDAD}
    ...    ${PUNTO_COBRO_SICATEL}

    # THEN: BES acredita el pago a la parcialidad correspondiente del crédito
    Y BES acredita el pago a la parcialidad correspondiente del crédito

    # THEN: BES actualiza el calendario de cobranza reflejando el pago realizado
    Y BES actualiza el calendario de cobranza reflejando el pago realizado
    ...    ${ESTADO_PARCIALIDAD_ESPERADO}

    # THEN: Consultar el historial de pagos del crédito para verificar el registro completo
    Y consulta el historial de pagos del crédito para verificar el registro completo
    ...    ${PUNTO_COBRO_SICATEL}
    ...    ${REFERENCIA_PAGO_SICATEL}

    [Teardown]    Entonces cerrar la sesión del navegador
