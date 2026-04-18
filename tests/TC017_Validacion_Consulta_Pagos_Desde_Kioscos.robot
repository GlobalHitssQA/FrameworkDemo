*** Settings ***
Documentation    Caso de prueba ID 17: Validación de consulta de pagos desde kioscos
...              Proceso: Consulta
...              Aplicación: Kioscos
...              Funcionalidad: Consulta de saldos y pagos
...              Escenario: Verificar que desde kioscos se pueda consultar correctamente la información
...              de saldos, pagos realizados y parcialidades pendientes del préstamo de Amigo Paguitos
...
...              Precondiciones:
...              - Kiosco operativo con conexión a BES
...              - Préstamo activo con parcialidades pendientes
...              - Servicio de consulta BES disponible
...              - Usuario con número telefónico válido
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con préstamo de Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}      5512345678
${SALDO_TOTAL_ESPERADO}           10500.00
${MONTO_PARCIALIDAD_PENDIENTE}    500.00

*** Test Cases ***
Validación De Consulta De Pagos Desde Kioscos
    [Documentation]    Este caso de prueba valida que desde kioscos se pueda consultar correctamente
    ...                la información de saldos, pagos realizados y parcialidades pendientes del
    ...                préstamo de Amigo Paguitos.
    ...
    ...                Flujo de prueba:
    ...                1. Acceder al kiosco e ingresar número telefónico del cliente
    ...                2. Ejecutar consulta de saldo del préstamo desde kiosco hacia BES
    ...                3. Verificar que kiosco muestre saldo total y monto de parcialidades pendientes
    ...                4. Consultar historial de pagos realizados desde el kiosco
    ...                5. Verificar que kiosco muestre fecha de vencimiento de próxima parcialidad
    ...
    ...                Verificaciones:
    ...                - Kiosco acepta número telefónico y presenta opción de consulta
    ...                - Kiosco invoca servicio hacia BES y recibe información de saldos
    ...                - Kiosco presenta saldo total, monto de parcialidades vencidas y siguiente parcialidad
    ...                - Kiosco muestra listado de pagos acreditados con fecha, monto y estado
    ...                - Kiosco presenta fecha de vencimiento de la siguiente parcialidad pendiente
    [Tags]    PruebaGeneradaIA    Funcional    Consulta    Kioscos    BES    Medium

    # GIVEN: Kiosco operativo con conexión a BES
    Dado que el kiosco está operativo con conexión a BES

    # AND: Existe un préstamo activo con parcialidades pendientes
    Y existe un préstamo activo con parcialidades pendientes para consulta desde kiosco
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # WHEN: Cliente accede al kiosco e ingresa su número telefónico
    Cuando cliente accede al kiosco e ingresa su número telefónico
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El kiosco acepta el número telefónico y presenta la opción de consulta de información
    Entonces el kiosco acepta el número telefónico y presenta opción de consulta de información

    # WHEN: Se ejecuta la consulta de saldo del préstamo desde el kiosco hacia BES
    Cuando se ejecuta la consulta de saldo del préstamo desde kiosco hacia BES
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El kiosco invoca el servicio hacia BES y recibe información de saldos
    Entonces el kiosco invoca el servicio hacia BES y recibe información de saldos
    ...    ${SALDO_TOTAL_ESPERADO}

    # WHEN: Se verifica que el kiosco muestra el saldo total del préstamo
    Cuando se verifica que el kiosco muestra el saldo total del préstamo

    # THEN: El kiosco presenta en pantalla el saldo total del préstamo y monto de parcialidades pendientes
    Entonces el kiosco presenta saldo total y monto de parcialidades vencidas en pantalla
    ...    ${SALDO_TOTAL_ESPERADO}

    # AND: El kiosco muestra el monto de la siguiente parcialidad a vencer
    Y el kiosco muestra el monto de la siguiente parcialidad a vencer
    ...    ${MONTO_PARCIALIDAD_PENDIENTE}

    # WHEN: Se consulta el historial de pagos realizados desde el kiosco
    Cuando se consulta el historial de pagos realizados desde el kiosco
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El kiosco muestra el listado de pagos acreditados con fecha monto y estado de cada parcialidad
    Entonces el kiosco muestra listado de pagos acreditados con fecha monto y estado

    # WHEN: Se verifica la fecha de vencimiento de la próxima parcialidad
    Cuando se verifica la fecha de vencimiento de la próxima parcialidad desde kiosco

    # THEN: El kiosco presenta correctamente la fecha de vencimiento de la siguiente parcialidad pendiente
    Entonces el kiosco presenta fecha de vencimiento de la siguiente parcialidad pendiente
