*** Settings ***
Documentation    Caso de prueba ID 26: Verificación de desglose de pagos realizados
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Consulta de pagos realizados
...              Escenario: Verificar el desglose completo de pagos realizados por el cliente en el
...              sistema BES cuando se consulta el historial de transacciones
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Cliente con financiamiento activo
...              - Pagos previamente realizados y acreditados
...              - Integración con puntos de cobro activa
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Low

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con pagos realizados
${NUMERO_TELEFONICO_PAGOS}      5534567890
${CUSTOMER_ID_PAGOS}            CUS567890123

# Datos de prueba - Rango de fechas para filtro
${FECHA_INICIO_FILTRO}          01/04/2026
${FECHA_FIN_FILTRO}             18/04/2026

# Datos de prueba - Puntos de cobro esperados
${PUNTO_COBRO_SICATEL}          SICATEL
${PUNTO_COBRO_KIOSCO}           Kiosco
${PUNTO_COBRO_OXXO}             OXXO

*** Test Cases ***
Verificación De Desglose De Pagos Realizados
    [Documentation]    Este caso de prueba verifica el desglose completo de pagos realizados por
    ...                el cliente en el sistema BES cuando se consulta el historial de transacciones.
    ...
    ...                Pasos:
    ...                1. Consultar el historial de pagos de un cliente con crédito activo en BES
    ...                2. Verificar que se desglosen todos los pagos con fecha, monto, método y estatus
    ...                3. Filtrar pagos por rango de fechas específico
    ...                4. Verificar que se muestren pagos desde diferentes puntos de cobro
    ...
    ...                Verificaciones:
    ...                - Sistema muestra la pantalla de historial de pagos del cliente
    ...                - Se visualiza tabla con todos los pagos: fecha, monto, punto de cobro, estatus
    ...                - Sistema filtra y muestra únicamente pagos dentro del rango seleccionado
    ...                - Se identifican correctamente diferentes métodos y puntos de cobro en desglose
    [Tags]    PruebaGeneradaIA    Funcional    Cobranza    HistorialPagos    Low

    # GIVEN: Usuario autenticado en BES
    Dado que el usuario ha iniciado sesión en BES

    # AND: Navegar al módulo de cobranza y pagos
    Y navega al módulo de cobranza y pagos

    # WHEN: Consultar el historial de pagos de un cliente con crédito activo en BES
    Cuando consulta el historial de pagos de un cliente con crédito activo
    ...    ${CUSTOMER_ID_PAGOS}

    # THEN: El sistema muestra la pantalla de historial de pagos del cliente
    Entonces el sistema muestra la pantalla de historial de pagos del cliente

    # WHEN: Verificar que se desglosen todos los pagos con fecha, monto, método de pago y estatus
    Cuando verifica el desglose de pagos en el historial

    # THEN: Se visualiza tabla con todos los pagos: fecha, monto, punto de cobro, estatus
    Entonces se visualiza tabla con todos los pagos mostrando detalles completos

    # WHEN: Filtrar pagos por rango de fechas específico
    Cuando filtra los pagos por rango de fechas
    ...    ${FECHA_INICIO_FILTRO}
    ...    ${FECHA_FIN_FILTRO}

    # THEN: El sistema filtra y muestra únicamente los pagos dentro del rango seleccionado
    Entonces el sistema muestra únicamente pagos dentro del rango de fechas seleccionado

    # WHEN: Verificar que se muestren pagos desde diferentes puntos de cobro
    Cuando verifica que existan pagos desde diferentes puntos de cobro

    # THEN: Se identifican correctamente los diferentes métodos y puntos de cobro en el desglose
    Entonces se identifican correctamente pagos desde SICATEL en el desglose
    Y se identifican correctamente pagos desde Kioscos en el desglose
    Y se identifican correctamente pagos desde OXXO en el desglose

    [Teardown]    Entonces cerrar la sesión del navegador
