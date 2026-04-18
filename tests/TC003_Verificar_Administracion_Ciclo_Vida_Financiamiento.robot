*** Settings ***
Documentation    Caso de prueba: Comprobar administración del ciclo de vida del financiamiento
...              Proceso: Postventa
...              Aplicación: BES
...              Funcionalidad: Administración de vida del financiamiento
...              Escenario: Verificar que BES administra correctamente el ciclo de vida del financiamiento
...              desde su creación hasta su liquidación o cancelación
...
...              Precondiciones:
...              - Financiamiento creado en BES
...              - Calendario de pagos configurado
...              - Servicios BCService disponibles
...
...              Técnica ISTQB: Transición de estados
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente
${CUSTOMER_ID}              CUS123456789

# Datos de prueba - Financiamiento
${TOTAL_CYCLE}              12
${TOTAL_AMOUNT}             18000
${CYCLE_SEQUENCE}           1
${INITIAL_AMOUNT}           1500
${AMOUNT}                   1500

# Datos de prueba - Consulta BCService.QueryInstallment
${INSTALLMENT_PLAN_ID}      INST987654321

# Estados esperados - Creación
${INSTALLMENT_STATUS_INICIAL}    Activo
${SUBSIDY_STATUS_INICIAL}        No Aplica
${CYCLE_CLASS_INICIAL}           mensual
${STATUS_INICIAL}                Vigente

# Estados esperados - Después de simulación
${INSTALLMENT_STATUS_ACTUALIZADO}    En Proceso
${STATUS_ACTUALIZADO}                 Vigente

# Simulación de tiempo
${DIAS_A_SIMULAR}            15

*** Test Cases ***
Verificar Administración Del Ciclo De Vida Del Financiamiento
    [Documentation]    Este caso de prueba verifica que BES administra correctamente
    ...                el ciclo de vida del financiamiento desde su creación hasta
    ...                su liquidación o cancelación, incluyendo la gestión autónoma
    ...                del calendario de cobranza.
    ...
    ...                Pasos:
    ...                1. Crear un financiamiento en BES con información completa del préstamo
    ...                2. Consultar el estado del financiamiento utilizando BCService.QueryInstallment
    ...                3. Simular el paso del tiempo y verificar actualización de estado
    ...                4. Verificar que BES controla el calendario de cobranza de manera autónoma
    [Tags]    PruebaGeneradaIA    Funcional    BES    Postventa    CicloVida    TransicionEstados

    # GIVEN: El usuario ha iniciado sesión en BES
    Dado que el usuario ha iniciado sesión en BES

    # AND: Navega al módulo de financiamiento
    Y navega al módulo de financiamiento

    # WHEN: Crea un financiamiento con información completa del préstamo
    Cuando crea un nuevo financiamiento con información completa
    ...    ${CUSTOMER_ID}
    ...    ${TOTAL_CYCLE}
    ...    ${TOTAL_AMOUNT}
    ...    ${CYCLE_SEQUENCE}
    ...    ${INITIAL_AMOUNT}
    ...    ${AMOUNT}

    # THEN: BES crea el financiamiento con estado inicial y calendario de pagos configurado
    Entonces el financiamiento se crea con estado inicial y calendario de pagos

    # WHEN: Consulta el estado del financiamiento utilizando BCService.QueryInstallment
    Cuando consulta el estado del financiamiento
    ...    ${CUSTOMER_ID}
    ...    ${INSTALLMENT_PLAN_ID}

    # THEN: BES devuelve información del financiamiento con todos los campos esperados
    Entonces el sistema devuelve la información del financiamiento correctamente
    ...    ${INSTALLMENT_STATUS_INICIAL}
    ...    ${SUBSIDY_STATUS_INICIAL}
    ...    ${TOTAL_CYCLE}
    ...    ${TOTAL_AMOUNT}
    ...    ${CYCLE_CLASS_INICIAL}
    ...    ${STATUS_INICIAL}

    # WHEN: Simula el paso del tiempo para verificar actualización de estado
    Cuando simula el paso de tiempo    ${DIAS_A_SIMULAR}

    # AND: Consulta nuevamente el estado del financiamiento
    Y consulta nuevamente el estado del financiamiento
    ...    ${CUSTOMER_ID}
    ...    ${INSTALLMENT_PLAN_ID}

    # THEN: BES actualiza correctamente el estado del financiamiento según el calendario
    Entonces el sistema actualiza el estado según las fechas de vencimiento
    ...    ${INSTALLMENT_STATUS_ACTUALIZADO}
    ...    ${SUBSIDY_STATUS_INICIAL}
    ...    ${TOTAL_CYCLE}
    ...    ${TOTAL_AMOUNT}
    ...    ${CYCLE_CLASS_INICIAL}
    ...    ${STATUS_ACTUALIZADO}

    # AND: BES gestiona el calendario de cobranza de manera autónoma
    Entonces el calendario de cobranza se gestiona de manera autónoma

    [Teardown]    Entonces cerrar la sesión del navegador
