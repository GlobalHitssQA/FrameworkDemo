*** Settings ***
Documentation    Caso de prueba: Validar proceso de compensación de pagos
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Compensación de pagos
...              Escenario: Verificar el proceso de compensación de pagos en BES cuando se requiere
...              aplicar ajustes, devoluciones o redistribución de pagos entre parcialidades
...
...              Precondiciones:
...              - Usuario con permisos de compensación autenticado en BES
...              - Créditos de Amigo Paguitos con pagos aplicados
...              - Motivo de compensación válido
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Medium

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Crédito
${CREDITO_ID}                     CRE789012345
${CREDITO_ORIGEN}                 CRE789012345
${CREDITO_DESTINO}                CRE789012346

# Datos de prueba - Compensación
${MONTO_COMPENSAR}                500.00
${MOTIVO_COMPENSACION}            Pago en exceso
${OBSERVACIONES_COMP}             Pago aplicado incorrectamente en parcialidad 3, se redistribuye a parcialidad 5

*** Test Cases ***
Validar Proceso De Compensación De Pagos
    [Documentation]    Este caso de prueba verifica el proceso de compensación de pagos en BES
    ...                cuando se requiere aplicar ajustes, devoluciones o redistribución de pagos
    ...                entre parcialidades.
    ...
    ...                Flujo del proceso:
    ...                1. Identificar en BES un pago que requiere compensación por pago en exceso
    ...                   o aplicación incorrecta
    ...                2. Ejecutar el proceso de compensación especificando el crédito origen,
    ...                   destino y monto a compensar
    ...                3. Verificar que BES aplica la compensación ajustando los saldos de las
    ...                   parcialidades afectadas
    ...                4. Validar que BES genera los movimientos contables correspondientes
    ...                   a la compensación
    ...                5. Consultar el historial del crédito para verificar el registro de la
    ...                   compensación con su justificación
    ...
    ...                Verificaciones:
    ...                - BES detecta el pago que requiere compensación y permite iniciar el proceso de ajuste
    ...                - El sistema registra la solicitud de compensación con los datos completos de la operación
    ...                - El sistema actualiza los saldos del crédito origen y destino reflejando la compensación realizada
    ...                - El sistema registra los asientos contables de la compensación para el control financiero
    ...                - El historial muestra el detalle completo de la compensación incluyendo fecha, monto, origen y destino
    [Tags]    PruebaGeneradaIA    Funcional    Compensacion    AdministracionCredito

    # GIVEN: Usuario autenticado en BES con permisos de compensación
    Dado que el usuario ha iniciado sesión en BES

    # AND: Navegar al módulo de compensación
    Y navega al módulo de compensación

    # WHEN: Identificar en BES un pago que requiere compensación por pago en exceso o aplicación incorrecta
    Cuando busca un crédito para compensación
    ...    ${CREDITO_ID}

    # THEN: BES detecta el pago que requiere compensación y permite iniciar el proceso de ajuste
    Entonces BES detecta el pago que requiere compensación

    # AND: Seleccionar el pago que será compensado
    Y selecciona el pago para compensar

    # WHEN: Ejecutar el proceso de compensación especificando el crédito origen, destino y monto a compensar
    Cuando inicia el proceso de compensación con los datos requeridos
    ...    ${CREDITO_ORIGEN}
    ...    ${CREDITO_DESTINO}
    ...    ${MONTO_COMPENSAR}
    ...    ${MOTIVO_COMPENSACION}
    ...    ${OBSERVACIONES_COMP}

    # AND: Confirmar la compensación
    Y confirma la compensación

    # THEN: El sistema registra la solicitud de compensación con los datos completos de la operación
    Entonces el sistema registra la compensación exitosamente

    # AND: Validar que la compensación fue registrada con los datos correctos
    Y valida que los datos de compensación son correctos
    ...    ${MONTO_COMPENSAR}
    ...    ${CREDITO_ORIGEN}
    ...    ${CREDITO_DESTINO}

    # THEN: Verificar que BES aplica la compensación ajustando los saldos de las parcialidades afectadas
    Entonces BES actualiza los saldos de las parcialidades afectadas

    # THEN: Validar que BES genera los movimientos contables correspondientes a la compensación
    Entonces BES genera los movimientos contables de la compensación

    # WHEN: Consultar el historial del crédito para verificar el registro de la compensación con su justificación
    Cuando consulta el historial de compensaciones del crédito
    ...    ${CREDITO_ID}

    # THEN: El historial muestra el detalle completo de la compensación incluyendo fecha, monto, origen y destino
    Entonces el historial muestra el registro completo de la compensación
    ...    ${MONTO_COMPENSAR}
    ...    ${MOTIVO_COMPENSACION}

    [Teardown]    Entonces cerrar la sesión del navegador
