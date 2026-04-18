*** Settings ***
Documentation    Caso de prueba: Comprobar proceso de conciliación de pagos
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Conciliación de pagos
...              Escenario: Verificar el proceso de conciliación de pagos en BES para asegurar
...              la correspondencia entre los pagos recibidos y los registrados en el sistema
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Pagos registrados en el sistema
...              - Integración con puntos de cobro activa
...              - Acceso a BIBES configurado
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Medium

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Conciliación
${PERIODO_CONCILIACION}                 Abril 2026
${MONTO_AJUSTE_PAGO}                    150.00
${JUSTIFICACION_AJUSTE}                 Diferencia detectada en el pago registrado por el punto de cobro - Ajuste autorizado por supervisor

*** Test Cases ***
Comprobar Proceso De Conciliación De Pagos
    [Documentation]    Este caso de prueba verifica el proceso de conciliación de pagos en BES
    ...                para asegurar la correspondencia entre los pagos recibidos y los registrados
    ...                en el sistema.
    ...
    ...                Flujo del proceso:
    ...                1. Ejecutar el proceso automático de conciliación de pagos en BES comparando
    ...                   los pagos registrados con los reportados por los puntos de cobro
    ...                2. Identificar en el proceso de conciliación los pagos que requieren ajuste
    ...                   o investigación
    ...                3. Realizar el ajuste manual de un pago identificado con diferencia registrando
    ...                   la justificación
    ...                4. Generar el reporte de conciliación con el detalle de pagos conciliados,
    ...                   pendientes y ajustados
    ...                5. Verificar que BES envía el reporte de conciliación a BIBES para el
    ...                   registro contable
    ...
    ...                Verificaciones:
    ...                - BES inicia el proceso de conciliación y genera el reporte de diferencias
    ...                - El sistema marca los pagos con discrepancias y genera alertas para revisión manual
    ...                - BES permite ajustar el pago, registra el motivo del ajuste y actualiza el saldo del crédito
    ...                - El sistema genera el reporte completo de conciliación con todas las transacciones procesadas
    ...                - El sistema transmite el reporte de conciliación al sistema de inteligencia de negocios
    [Tags]    PruebaGeneradaIA    Funcional    Conciliacion    AdministracionCredito

    # GIVEN: Usuario autenticado en BES
    Dado que el usuario ha iniciado sesión en BES

    # AND: Navegar al módulo de conciliación de pagos
    Y navega al módulo de conciliación de pagos

    # WHEN: Ejecutar el proceso automático de conciliación de pagos comparando los pagos registrados con los reportados por los puntos de cobro
    Cuando ejecuta el proceso automático de conciliación de pagos
    ...    ${PERIODO_CONCILIACION}

    # THEN: BES inicia el proceso de conciliación y genera el reporte de diferencias si existen
    Entonces BES inicia el proceso de conciliación y genera el reporte de diferencias

    # WHEN: Identificar en el proceso de conciliación los pagos que requieren ajuste o investigación
    Cuando identifica los pagos que requieren ajuste o investigación

    # THEN: El sistema marca los pagos con discrepancias y genera alertas para revisión manual
    Entonces el sistema marca los pagos con discrepancias y genera alertas para revisión manual

    # WHEN: Realizar el ajuste manual de un pago identificado con diferencia registrando la justificación
    Cuando realiza el ajuste manual de un pago con diferencia
    ...    ${MONTO_AJUSTE_PAGO}
    ...    ${JUSTIFICACION_AJUSTE}

    # THEN: BES permite ajustar el pago, registra el motivo del ajuste y actualiza el saldo del crédito
    Entonces BES registra el ajuste y actualiza el saldo del crédito

    # WHEN: Generar el reporte de conciliación con el detalle de pagos conciliados, pendientes y ajustados
    Cuando genera el reporte de conciliación completo

    # THEN: El sistema genera el reporte completo de conciliación con todas las transacciones procesadas
    Entonces el sistema genera el reporte completo con todas las transacciones procesadas

    # WHEN: Verificar que BES envía el reporte de conciliación a BIBES para el registro contable
    Cuando envía el reporte de conciliación a BIBES

    # THEN: El sistema transmite el reporte de conciliación al sistema de inteligencia de negocios según lo especificado
    Entonces el sistema transmite el reporte de conciliación a BIBES exitosamente

    [Teardown]    Entonces cerrar la sesión del navegador
