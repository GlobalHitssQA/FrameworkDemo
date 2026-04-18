*** Settings ***
Documentation    Caso de prueba ID 36: Verificar visualización de desglose de cuotas en pantalla 360
...              Proceso: Consulta
...              Aplicación: BES
...              Funcionalidad: Pantalla 360 - Desglose de cuotas
...              Escenario: Verificar que la pantalla 360 de BES muestre el desglose detallado
...              de las cuotas del financiamiento Amigo Paguitos
...
...              Precondiciones:
...              - Crédito Amigo Paguitos con cuotas generadas en BES
...              - Usuario autenticado en pantalla 360
...              - Servicio BCService operativo
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con crédito y cuotas activas
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Verificar Visualización De Desglose De Cuotas En Pantalla 360
    [Documentation]    Este caso de prueba verifica que la pantalla 360 de BES muestre el
    ...                desglose detallado de las cuotas del financiamiento Amigo Paguitos,
    ...                incluyendo número de secuencia, montos, clase de cuota, estatus y
    ...                fechas de vencimiento de cada parcialidad.
    ...
    ...                Pasos:
    ...                1. Consultar un cliente con crédito Amigo Paguitos activo en la pantalla 360
    ...                2. Verificar que se muestre el número de secuencia de cada cuota (cycleSequence)
    ...                3. Verificar que se muestren los montos: inicial (initialAmount) y de cuota (amount)
    ...                4. Verificar que se muestre la clase de cuota (cycleClass) y su estatus
    ...                5. Verificar que se muestre la fecha de vencimiento de cada cuota (cycleDueDate)
    ...
    ...                Verificaciones:
    ...                - Sistema recupera información mediante servicio BCService.QueryInstallment
    ...                - Pantalla despliega numeración secuencial de cuotas del financiamiento
    ...                - Se visualizan monto del enganche y monto de cada parcialidad
    ...                - Pantalla muestra tipo de cuota y estatus actual de cada una
    ...                - Se despliegan fechas de vencimiento programadas para cada parcialidad
    [Tags]    PruebaGeneradaIA    Funcional    BES    Consulta    Pantalla360    Medium

    # GIVEN: Usuario ha accedido a la pantalla 360 de BES con credenciales válidas
    Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas

    # WHEN: Consulta un cliente con crédito Amigo Paguitos activo en la pantalla 360
    Cuando consulta un cliente con crédito Amigo Paguitos activo en la pantalla 360
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema recupera la información del crédito mediante el servicio BCService.QueryInstallment
    Entonces el sistema recupera la información del crédito mediante el servicio BCService QueryInstallment

    # WHEN: Verifica que se muestre el número de secuencia de cada cuota (cycleSequence)
    Cuando verifica que se muestre el número de secuencia de cada cuota cycleSequence

    # THEN: La pantalla despliega la numeración secuencial de las cuotas del financiamiento
    Entonces la pantalla despliega la numeración secuencial de las cuotas del financiamiento

    # WHEN: Verifica que se muestren los montos: inicial (initialAmount) y de cuota (amount)
    Cuando verifica que se muestren los montos inicial initialAmount y de cuota amount

    # THEN: Se visualizan correctamente el monto del enganche y el monto de cada parcialidad
    Entonces se visualizan correctamente el monto del enganche y el monto de cada parcialidad

    # WHEN: Verifica que se muestre la clase de cuota (cycleClass) y su estatus
    Cuando verifica que se muestre la clase de cuota cycleClass y su estatus

    # THEN: La pantalla muestra el tipo de cuota y el estatus actual de cada una
    Entonces la pantalla muestra el tipo de cuota y el estatus actual de cada una

    # WHEN: Verifica que se muestre la fecha de vencimiento de cada cuota (cycleDueDate)
    Cuando verifica que se muestre la fecha de vencimiento de cada cuota cycleDueDate

    # THEN: Se despliegan las fechas de vencimiento programadas para cada parcialidad
    Entonces se despliegan las fechas de vencimiento programadas para cada parcialidad

    [Teardown]    Y cierra la sesión de la pantalla 360
