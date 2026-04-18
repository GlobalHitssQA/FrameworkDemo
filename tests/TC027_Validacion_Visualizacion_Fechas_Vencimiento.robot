*** Settings ***
Documentation    Caso de prueba ID 27: Validación de visualización de fechas de vencimiento
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Consulta de fechas de vencimiento
...              Escenario: Verificar la correcta visualización de fechas de vencimiento de cuotas
...              en el sistema BES cuando se consulta el calendario de pagos del cliente
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Cliente con financiamiento activo
...              - Plan de instalación con cuotas generadas
...              - Ciclo de pago configurado correctamente
...
...              Técnica ISTQB: Valores límite
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con financiamiento y cuotas
${NUMERO_TELEFONICO_CLIENTE}    5512345678
${TIPO_CICLO_ESPERADO}          Mensual

*** Test Cases ***
Validación De Visualización De Fechas De Vencimiento
    [Documentation]    Este caso de prueba verifica la correcta visualización de fechas de
    ...                vencimiento de cuotas en el sistema BES cuando se consulta el calendario
    ...                de pagos del cliente. Se valida que cada cuota tenga su fecha de vencimiento
    ...                correctamente calculada según el ciclo configurado y que se identifiquen
    ...                correctamente las cuotas vencidas comparando con la fecha actual.
    ...
    ...                Pasos:
    ...                1. Consultar el plan de pagos de un cliente con financiamiento activo en BES
    ...                2. Verificar que cada cuota tenga su fecha de vencimiento (cycleDueDate) correctamente calculada
    ...                3. Validar que las fechas de vencimiento respeten el ciclo de pago del cliente
    ...                4. Verificar que se identifiquen cuotas vencidas comparando la fecha actual con cycleDueDate
    ...
    ...                Verificaciones:
    ...                - El sistema muestra el calendario de pagos del financiamiento
    ...                - Cada cuota muestra la fecha de vencimiento calculada según el ciclo configurado
    ...                - Las fechas se incrementan correctamente según el tipo de ciclo
    ...                - El sistema marca como vencidas las cuotas cuya fecha es anterior a la fecha actual
    [Tags]    PruebaGeneradaIA    Funcional    BES    Cobranza    FechasVencimiento    Low

    # GIVEN: Usuario ha iniciado sesión en BES con credenciales válidas
    Dado que el usuario ha iniciado sesión en BES con credenciales válidas

    # WHEN: Consulta el plan de pagos de un cliente con financiamiento activo en BES
    Cuando consulta el plan de pagos de un cliente con financiamiento activo en BES
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema muestra el calendario de pagos del financiamiento
    Entonces el sistema muestra el calendario de pagos del financiamiento

    # WHEN: Verifica que cada cuota tenga su fecha de vencimiento correctamente calculada
    Cuando verifica que cada cuota tiene su fecha de vencimiento correctamente calculada

    # THEN: Cada cuota muestra la fecha de vencimiento calculada según el ciclo configurado
    Entonces cada cuota muestra la fecha de vencimiento calculada según el ciclo configurado

    # WHEN: Valida que las fechas de vencimiento respetan el ciclo de pago del cliente
    Cuando valida que las fechas de vencimiento respetan el ciclo de pago del cliente
    ...    ${TIPO_CICLO_ESPERADO}

    # THEN: Las fechas se incrementan correctamente según el tipo de ciclo
    Entonces las fechas se incrementan correctamente según el tipo de ciclo
    ...    ${TIPO_CICLO_ESPERADO}

    # WHEN: Verifica que se identifican cuotas vencidas comparando la fecha actual con cycleDueDate
    Cuando verifica que se identifican cuotas vencidas comparando fecha actual con cycleDueDate

    # THEN: El sistema marca como vencidas las cuotas cuya fecha de vencimiento es anterior a la fecha actual
    Entonces el sistema marca como vencidas las cuotas con fecha anterior a la fecha actual

    [Teardown]    Y cierra la sesión del sistema BES
