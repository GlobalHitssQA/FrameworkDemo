*** Settings ***
Documentation    Caso de prueba ID 19: Validación de APIs de administración del préstamo
...              Proceso: Administración de crédito
...              Aplicación: BES
...              Funcionalidad: APIs de administración de préstamo
...              Escenario: Verificar que las APIs de BES para administración del préstamo funcionen correctamente
...              permitiendo consultar información, gestionar pagos, actualizar estados y administrar
...              el calendario de cobranza
...
...              Precondiciones:
...              - Préstamo creado en BES
...              - APIs de BES disponibles
...              - Datos de préstamo válidos
...              - Usuario con permisos de consulta
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Parámetros de préstamo existente
${ACCOUNT_ID_PRESTAMO}            ACC123456
${CUSTOMER_ID_PRESTAMO}           CUST789012
${INSTALLMENT_PLAN_INST_ID}       PLAN345678
${NUMERO_TELEFONICO_PRESTAMO}     5512345678
${IMEI_EQUIPO_PRESTAMO}           123456789012345

*** Test Cases ***
Validación De APIs De Administración Del Préstamo
    [Documentation]    Este caso de prueba verifica que las APIs de BES para administración del préstamo
    ...                funcionen correctamente permitiendo consultar información, gestionar pagos,
    ...                actualizar estados y administrar el calendario de cobranza.
    ...
    ...                Flujo de prueba:
    ...                1. Invocar API ArService.QueryInvoice con AccountId para consultar facturación
    ...                2. Invocar API BCService.QueryInstallment para consultar detalle de parcialidades
    ...                3. Invocar API ArService.QueryBalance con número telefónico para consultar saldos
    ...                4. Invocar API TelcelCustomService.queryInstallmentByIMEI para consultar estado de financiamiento
    ...                5. Verificar que las APIs respondan correctamente ante préstamos en diferentes estados
    ...
    ...                Verificaciones:
    ...                - ArService.QueryInvoice devuelve información completa de facturación
    ...                - BCService.QueryInstallment devuelve detalle completo de parcialidades
    ...                - ArService.QueryBalance devuelve información correcta de saldos
    ...                - TelcelCustomService.queryInstallmentByIMEI devuelve estado del financiamiento
    ...                - APIs responden correctamente ante préstamos en estados: activo, vencido, liquidado
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    AdministracionPrestamo    Medium

    # GIVEN: Préstamo creado en BES con estado activo
    Dado que existe un préstamo creado en BES con estado activo
    ...    ${CUSTOMER_ID_PRESTAMO}    ${INSTALLMENT_PLAN_INST_ID}

    # AND: APIs de BES para administración de préstamos están disponibles
    Y las APIs de BES para administración de préstamos están disponibles

    # WHEN: Se invoca API ArService QueryInvoice con AccountId para consultar facturación
    Cuando se invoca API ArService QueryInvoice con AccountId
    ...    ${ACCOUNT_ID_PRESTAMO}

    # THEN: BES devuelve información de facturación completa del préstamo
    Entonces BES devuelve información de facturación completa del préstamo

    # AND: La respuesta incluye acctKey transType billCycleID billCycleBeginTime billCycleEndTime invoiceAmount openAmount taxAmount dueDate status
    Y la respuesta incluye todos los campos de información de facturación

    # WHEN: Se invoca API BCService QueryInstallment con CustID e installmentPlanInstId
    Cuando se invoca API BCService QueryInstallment con CustID e installmentPlanInstId
    ...    ${CUSTOMER_ID_PRESTAMO}    ${INSTALLMENT_PLAN_INST_ID}

    # THEN: BES devuelve el detalle completo de parcialidades del préstamo
    Entonces BES devuelve detalle completo de parcialidades del préstamo

    # AND: La respuesta incluye totalCycle totalAmount cycleSequence initialAmount amount cycleClass status cycleDueDate unpaidAmount
    Y la respuesta incluye todos los campos de detalle de parcialidades

    # WHEN: Se invoca API ArService QueryBalance con número telefónico para consultar saldos
    Cuando se invoca API ArService QueryBalance con número telefónico
    ...    ${NUMERO_TELEFONICO_PRESTAMO}

    # THEN: BES devuelve la información de saldos del préstamo
    Entonces BES devuelve información de saldos del préstamo correctamente

    # AND: La respuesta incluye balancetype ARBalance unpaidAmount
    Y la respuesta incluye balancetype ARBalance unpaidAmount

    # WHEN: Se invoca API TelcelCustomService queryInstallmentByIMEI para consultar estado de financiamiento
    Cuando se invoca API TelcelCustomService queryInstallmentByIMEI
    ...    ${IMEI_EQUIPO_PRESTAMO}

    # THEN: BES devuelve información del financiamiento asociado al IMEI
    Entonces BES devuelve información del financiamiento asociado al IMEI

    # AND: La respuesta incluye installmentPlanInstId type installmentStatus subsidyStatus
    Y la respuesta incluye installmentPlanInstId type installmentStatus subsidyStatus

    # WHEN: Se consultan préstamos en diferentes estados: activo vencido liquidado
    Cuando se consultan préstamos en diferentes estados mediante las APIs de administración

    # THEN: BES devuelve información correcta según el estado del préstamo y muestra el status correspondiente
    Entonces BES devuelve información correcta según el estado del préstamo mostrando status correspondiente
