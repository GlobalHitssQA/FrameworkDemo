*** Settings ***
Documentation    Caso de prueba ID 22: Verificación de reversos de pagos procesados
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Reversos de pagos
...              Escenario: Verificar el proceso de reverso de pagos acreditados en BES cuando
...              se detecta un error en la transacción o se solicita cancelación
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Pago previamente acreditado en BES
...              - Transacción reversible dentro del tiempo permitido
...              - API de reversos disponible
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Low

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Crédito con pago acreditado
${CUSTOMER_ID_REVERSO}          CUS789012345
${IMEI_EQUIPO_REVERSO}          359876543210123

# Datos de prueba - Pago original a reversar
${MONTO_PAGO_ORIGINAL}          600.00
${METODO_PAGO_ORIGINAL}         SICATEL
${REFERENCIA_PAGO_ORIGINAL}     SICATEL-202604180930-789012
${ID_TRANSACCION}               TXN-456789012345

# Datos de prueba - Reverso
${MOTIVO_REVERSO}               Error en transacción detectado

*** Test Cases ***
Verificación De Reversos De Pagos Procesados
    [Documentation]    Este caso de prueba verifica el proceso de reverso de pagos acreditados
    ...                en BES cuando se detecta un error en la transacción o se solicita cancelación.
    ...
    ...                Pasos:
    ...                1. Acreditar un pago de parcialidad en BES desde punto de cobro
    ...                2. Solicitar el reverso del pago mediante la API de reverso de pagos con identificador
    ...                3. Ejecutar el proceso de reverso en el sistema BES
    ...                4. Verificar en el historial de transacciones que se registre el reverso
    ...
    ...                Verificaciones:
    ...                - El pago se registra correctamente en el sistema BES
    ...                - BES recibe la solicitud de reverso y valida que la transacción sea reversible
    ...                - Sistema revierte el pago, actualiza saldo y marca parcialidad como pendiente
    ...                - Se visualiza el movimiento de reverso con fecha, monto y motivo correspondiente
    [Tags]    PruebaGeneradaIA    Funcional    Cobranza    ReversosPagos    Low

    # GIVEN: Usuario ha iniciado sesión en BES
    Dado que el usuario ha iniciado sesión en BES

    # AND: Navegar al módulo de cobranza y pagos
    Y navega al módulo de cobranza y pagos

    # GIVEN: Acreditar un pago de parcialidad en BES desde punto de cobro
    Dado que existe un pago de parcialidad acreditado en BES desde punto de cobro
    ...    ${CUSTOMER_ID_REVERSO}
    ...    ${MONTO_PAGO_ORIGINAL}
    ...    ${METODO_PAGO_ORIGINAL}
    ...    ${REFERENCIA_PAGO_ORIGINAL}

    # WHEN: Solicitar el reverso del pago mediante la API con el identificador de transacción
    Cuando solicita el reverso del pago con el identificador de transacción
    ...    ${ID_TRANSACCION}
    ...    ${MOTIVO_REVERSO}

    # THEN: BES recibe la solicitud de reverso y valida que la transacción sea reversible
    Entonces BES recibe la solicitud de reverso y valida que sea reversible

    # WHEN: Ejecutar el proceso de reverso en el sistema BES
    Cuando ejecuta el proceso de reverso en BES

    # THEN: El sistema revierte el pago, actualiza saldo y marca parcialidad como pendiente
    Entonces el sistema revierte el pago y actualiza saldo del préstamo
    Y marca la parcialidad como pendiente nuevamente

    # WHEN: Consultar el historial de transacciones del crédito
    Cuando consulta el historial de transacciones del crédito

    # THEN: Se visualiza el movimiento de reverso con fecha, monto y motivo correspondiente
    Entonces se visualiza el movimiento de reverso en el historial
    ...    ${MONTO_PAGO_ORIGINAL}
    ...    ${MOTIVO_REVERSO}

    [Teardown]    Entonces cerrar la sesión del navegador
