*** Settings ***
Documentation    Caso de prueba ID 15: Validación de integración BES con CPS para pagos de parcialidades
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Gestión de pagos de parcialidades
...              Escenario: Verificar que BES se integra correctamente con CPS para conocer los pagos
...              de parcialidades realizados por los distintos puntos de cobro y acreditar correctamente los pagos
...
...              Precondiciones:
...              - Préstamo activo con parcialidades pendientes
...              - Integración BES-CPS configurada
...              - Puntos de cobro operativos
...              - Calendario de cobranza creado en BES
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Préstamo con parcialidades pendientes
${CUSTOMER_ID_PRESTAMO}           CUST123456
${CREDITO_ID_PARCIALIDADES}       CRED789012
${MONTO_PARCIALIDAD}              500.00
${NUMERO_PARCIALIDAD}             1
${NUMERO_TELEFONICO_PRESTAMO}     5512345678
${IMEI_EQUIPO_PRESTAMO}           123456789012345

*** Test Cases ***
Validación De Integración BES Con CPS Para Pagos De Parcialidades
    [Documentation]    Este caso de prueba valida que BES se integra correctamente con CPS
    ...                para consultar los pagos de parcialidades realizados desde diferentes
    ...                puntos de cobro (SICATEL, kioscos) y acreditar correctamente los pagos
    ...                actualizando el calendario de cobranza y el saldo del préstamo.
    ...
    ...                Flujo de prueba:
    ...                1. Realizar un pago de parcialidad desde SICATEL para un préstamo activo
    ...                2. Ejecutar consulta desde BES hacia CPS para obtener información del pago
    ...                3. Acreditar el pago en BES actualizando calendario y saldo
    ...                4. Realizar pago desde kiosco y verificar acreditación
    ...                5. Consultar historial de pagos del préstamo en BES
    ...
    ...                Verificaciones:
    ...                - Pago se registra exitosamente en CPS con monto, fecha y número de parcialidad
    ...                - BES consulta a CPS y recibe información completa del pago
    ...                - BES acredita el pago, marca la parcialidad como pagada y actualiza saldo pendiente
    ...                - BES procesa pagos desde kiosco correctamente
    ...                - Historial de pagos muestra todos los pagos acreditados con detalles completos
    [Tags]    PruebaGeneradaIA    Integral    Cobranza    BES    CPS    Medium

    # GIVEN: Préstamo activo con parcialidades pendientes en BES
    Dado que existe un préstamo activo con parcialidades pendientes en BES
    ...    ${CUSTOMER_ID_PRESTAMO}    ${CREDITO_ID_PARCIALIDADES}

    # AND: Integración BES-CPS configurada y operativa
    Y la integración BES CPS está configurada y operativa

    # WHEN: Se realiza un pago de parcialidad desde SICATEL
    Cuando se realiza un pago de parcialidad desde SICATEL
    ...    ${CREDITO_ID_PARCIALIDADES}    ${MONTO_PARCIALIDAD}    ${NUMERO_PARCIALIDAD}

    # THEN: El pago se registra exitosamente en CPS con monto fecha y número de parcialidad
    Entonces el pago se registra exitosamente en CPS con monto fecha y número de parcialidad
    ...    ${MONTO_PARCIALIDAD}    ${NUMERO_PARCIALIDAD}

    # WHEN: BES ejecuta consulta hacia CPS para obtener información del pago
    Cuando BES ejecuta consulta hacia CPS para obtener información del pago de parcialidad
    ...    ${CREDITO_ID_PARCIALIDADES}

    # THEN: BES consulta a CPS y recibe información completa del pago
    Entonces BES consulta a CPS y recibe información completa del pago de parcialidad
    ...    ${MONTO_PARCIALIDAD}    ${NUMERO_PARCIALIDAD}

    # WHEN: BES acredita el pago de parcialidad actualizando calendario y saldo
    Cuando BES acredita el pago de parcialidad actualizando calendario y saldo
    ...    ${CREDITO_ID_PARCIALIDADES}    ${MONTO_PARCIALIDAD}    ${NUMERO_PARCIALIDAD}

    # THEN: BES marca la parcialidad como pagada y actualiza saldo pendiente
    Entonces BES marca la parcialidad como pagada y actualiza el saldo pendiente
    ...    ${NUMERO_PARCIALIDAD}

    # WHEN: Se realiza un pago de parcialidad desde kiosco
    Cuando se realiza un pago de parcialidad desde kiosco
    ...    ${NUMERO_TELEFONICO_PRESTAMO}    ${MONTO_PARCIALIDAD}    2

    # THEN: BES consulta a CPS recibe el pago desde kiosco y lo acredita correctamente
    Entonces BES consulta a CPS recibe el pago desde kiosco y lo acredita correctamente
    ...    2

    # AND: El calendario de cobranza muestra la parcialidad actualizada
    Y el calendario de cobranza muestra la parcialidad desde kiosco actualizada
    ...    2

    # WHEN: Se consulta el historial de pagos del préstamo en BES
    Cuando se consulta el historial de pagos del préstamo en BES
    ...    ${CREDITO_ID_PARCIALIDADES}

    # THEN: BES muestra todos los pagos de parcialidades acreditados con detalles completos
    Entonces BES muestra todos los pagos de parcialidades acreditados con detalles completos
    ...    2
