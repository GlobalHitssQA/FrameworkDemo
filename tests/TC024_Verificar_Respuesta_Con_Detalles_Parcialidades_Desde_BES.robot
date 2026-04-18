*** Settings ***
Documentation    Caso de prueba: Verificar respuesta con detalles de parcialidades desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar que BES retorna correctamente el desglose detallado de las parcialidades
...              del plan de financiamiento incluyendo montos, fechas de vencimiento y estatus de cada parcialidad
...
...              Precondiciones:
...              - Financiamiento activo con parcialidades registradas en BES
...              - CustID e installmentPlanInstId válidos
...              - Servicio BCService operativo
...              - Al menos una parcialidad vencida o pagada para validar estatus
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con plan de financiamiento activo con parcialidades
${CUST_ID_PRUEBA}                   CUS123456789
${INSTALLMENT_PLAN_INST_ID_PRUEBA}  987654321

*** Test Cases ***
Verificar Respuesta Con Detalles De Parcialidades Desde BES
    [Documentation]    Este caso de prueba verifica que BES retorna correctamente el desglose
    ...                detallado de las parcialidades del plan de financiamiento cuando se ejecuta
    ...                la consulta BCService.QueryInstallment con parámetros válidos (CustID, installmentPlanInstId).
    ...                Se validan todos los campos obligatorios incluyendo totalCycle, totalAmount,
    ...                unpaidAmount, shortName y el detalle de cada parcialidad (cycleSequence, amount,
    ...                status, cycleDueDate).
    ...
    ...                Pasos:
    ...                1. Ejecutar la consulta BCService.QueryInstallment con parámetros válidos
    ...                2. Verificar que BES procesa la consulta y retorna información de parcialidades
    ...                3. Verificar que la respuesta incluye el campo totalCycle con el número total de parcialidades
    ...                4. Verificar que la respuesta incluye el campo totalAmount con el monto total del financiamiento
    ...                5. Verificar que se incluyen los campos cycleSequence, amount, status y cycleDueDate para cada parcialidad
    ...                6. Validar que el campo unpaidAmount refleja el saldo pendiente por pagar del financiamiento
    ...                7. Verificar que el campo shortName contiene la descripción breve del plan de parcialidades
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    API    ParticionesEquivalencia

    # WHEN: Ejecutar la consulta BCService.QueryInstallment con parámetros válidos (CustID, installmentPlanInstId)
    Cuando se ejecuta la consulta BCService QueryInstallment con parámetros válidos
    ...    ${CUST_ID_PRUEBA}
    ...    ${INSTALLMENT_PLAN_INST_ID_PRUEBA}

    # THEN: BES procesa la consulta y retorna información de parcialidades
    Entonces BES procesa la consulta y retorna información de parcialidades

    # AND: Verificar que la respuesta incluye el campo totalCycle con el número total de parcialidades del plan
    Y la respuesta incluye el campo totalCycle con el número total de parcialidades del plan

    # AND: Verificar que la respuesta incluye el campo totalAmount con el monto total del financiamiento
    Y la respuesta incluye el campo totalAmount con el monto total del financiamiento

    # AND: Verificar que se incluyen los campos cycleSequence, amount, status y cycleDueDate para cada parcialidad
    Y se incluyen los campos cycleSequence amount status y cycleDueDate para cada parcialidad

    # AND: Validar que el campo unpaidAmount refleja el saldo pendiente por pagar del financiamiento
    Y el campo unpaidAmount refleja el saldo pendiente por pagar del financiamiento

    # THEN: Verificar que el campo shortName contiene la descripción breve del plan de parcialidades
    Entonces el campo shortName contiene la descripción breve del plan de parcialidades
