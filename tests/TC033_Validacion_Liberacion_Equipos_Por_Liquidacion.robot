*** Settings ***
Documentation    Caso de prueba ID 33: Validación de liberación de equipos por liquidación de financiamiento
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Liberación por Liquidación de Financiamiento
...              Escenario: Verificar liberación de equipos en BES cuando el cliente Amigo Paguitos
...              liquida completamente el financiamiento
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Cliente con financiamiento próximo a liquidar
...              - Una sola parcialidad pendiente de pago
...              - Integración con SITIC-Trustonic disponible
...
...              Técnica ISTQB: Transición de estados
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente próximo a liquidar
${NUMERO_TELEFONICO_CLIENTE}    5512345678
${IMEI_EQUIPO}                  123456789012345
${MONTO_PAGO_FINAL}             1000.00
${METODO_PAGO}                  Efectivo
${REFERENCIA_PAGO}              REF-2024-FINAL

*** Test Cases ***
Validación De Liberación De Equipos Por Liquidación De Financiamiento
    [Documentation]    Este caso de prueba verifica la liberación de equipos en BES cuando
    ...                el cliente Amigo Paguitos liquida completamente el financiamiento. Se valida
    ...                que al acreditar el pago de la última parcialidad pendiente, el sistema
    ...                actualice el installmentStatus a liquidado y ejecute el proceso de liberación
    ...                del equipo a través de las APIs de SITIC-Trustonic, dejando el equipo
    ...                completamente libre sin restricciones de financiamiento.
    ...
    ...                Pasos:
    ...                1. Consultar información del financiamiento activo del cliente mediante BCService.QueryInstallment
    ...                2. Acreditar pago de la última parcialidad pendiente completando el financiamiento
    ...                3. Verificar que el installmentStatus cambia a liquidado o completado
    ...                4. Ejecutar proceso de liberación del equipo a través de las APIs de SITIC-Trustonic
    ...                5. Consultar el estado final del equipo y verificar inexistencia de restricciones
    ...
    ...                Verificaciones:
    ...                - El sistema muestra totalCycle, cycleSequence actual y totalAmount del financiamiento
    ...                - El sistema registra el pago final y actualiza cycleSequence igual a totalCycle
    ...                - El sistema actualiza installmentStatus y subsidyStatus reflejando liquidación total
    ...                - El sistema envía notificación de liberación definitiva y el equipo queda completamente desbloqueado
    ...                - El sistema muestra el equipo liberado sin restricciones de financiamiento
    [Tags]    PruebaGeneradaIA    Funcional    BES    AdministracionCredito    Liberacion    Medium

    # GIVEN: Usuario ha iniciado sesión en BES con credenciales válidas
    Dado que el usuario ha iniciado sesión en BES con credenciales válidas

    # WHEN: Consulta información del financiamiento activo del cliente mediante BCService.QueryInstallment
    Cuando consulta información del financiamiento activo mediante BCService QueryInstallment
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema muestra totalCycle, cycleSequence actual y totalAmount del financiamiento
    Entonces el sistema muestra totalCycle cycleSequence y totalAmount del financiamiento

    # WHEN: Acredita pago de la última parcialidad pendiente completando el financiamiento
    Cuando acredita pago de última parcialidad pendiente completando financiamiento
    ...    ${MONTO_PAGO_FINAL}    ${METODO_PAGO}    ${REFERENCIA_PAGO}

    # THEN: El sistema registra el pago final y actualiza cycleSequence igual a totalCycle
    Entonces el sistema registra pago final y actualiza cycleSequence igual a totalCycle

    # WHEN: Verifica que el installmentStatus cambia a liquidado o completado
    Cuando verifica que installmentStatus cambia a liquidado o completado

    # THEN: El sistema actualiza installmentStatus y subsidyStatus reflejando liquidación total
    Entonces el sistema actualiza installmentStatus y subsidyStatus reflejando liquidación total

    # WHEN: Ejecuta proceso de liberación del equipo a través de las APIs de SITIC-Trustonic
    Cuando ejecuta proceso de liberación del equipo mediante SITIC Trustonic
    ...    ${IMEI_EQUIPO}

    # THEN: El sistema envía notificación de liberación definitiva y el equipo queda completamente desbloqueado
    Entonces el sistema envía notificación de liberación y equipo queda completamente desbloqueado
    ...    ${IMEI_EQUIPO}

    # WHEN: Consulta el estado final del equipo y verificar inexistencia de restricciones
    Cuando consulta estado final del equipo y verifica inexistencia de restricciones
    ...    ${IMEI_EQUIPO}

    # THEN: El sistema muestra el equipo liberado sin restricciones de financiamiento
    Entonces el sistema muestra equipo liberado sin restricciones de financiamiento

    [Teardown]    Y cierra la sesión del sistema BES
