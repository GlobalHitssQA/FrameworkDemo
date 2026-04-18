*** Settings ***
Documentation    Caso de prueba ID 38: Validar visualización de fechas de vencimiento en pantalla 360
...              Proceso: Consulta
...              Aplicación: BES
...              Funcionalidad: Pantalla 360 - Fechas de vencimiento
...              Escenario: Verificar que la pantalla 360 muestre correctamente las fechas de
...              vencimiento del crédito y sus parcialidades Amigo Paguitos
...
...              Precondiciones:
...              - Crédito Amigo Paguitos con calendario de pagos establecido
...              - Usuario autenticado en pantalla 360
...              - Servicios BCService y ArService operativos
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con crédito y cuotas programadas
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Validar Visualización De Fechas De Vencimiento En Pantalla 360
    [Documentation]    Este caso de prueba verifica que la pantalla 360 muestre correctamente
    ...                las fechas de vencimiento del crédito y sus parcialidades Amigo Paguitos,
    ...                incluyendo fecha general del invoice, fechas de cada cuota y fechas del
    ...                ciclo de facturación, todas en formato legible y ordenadas cronológicamente.
    ...
    ...                Pasos:
    ...                1. Consultar en pantalla 360 un cliente con crédito Amigo Paguitos y cuotas programadas
    ...                2. Verificar que se muestre la fecha de vencimiento general del invoice (dueDate del ArService)
    ...                3. Verificar que se muestren las fechas de vencimiento de cada cuota (cycleDueDate del BCService)
    ...                4. Verificar que se muestren las fechas del ciclo de facturación (billCycleBeginTime y billCycleEndTime)
    ...                5. Validar que las fechas mostradas estén en formato legible y ordenadas cronológicamente
    ...
    ...                Verificaciones:
    ...                - Sistema obtiene información de fechas mediante servicios BCService y ArService
    ...                - Pantalla despliega fecha límite de pago del ciclo de facturación
    ...                - Se visualiza fecha de vencimiento específica de cada parcialidad del financiamiento
    ...                - Pantalla muestra período del ciclo de facturación vigente
    ...                - Todas las fechas se presentan en formato DD/MM/AAAA y en orden temporal correcto
    [Tags]    PruebaGeneradaIA    Funcional    BES    Consulta    Pantalla360    Medium

    # GIVEN: Usuario ha accedido a la pantalla 360 de BES con credenciales válidas
    Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas

    # WHEN: Consulta en pantalla 360 un cliente con crédito Amigo Paguitos y cuotas programadas
    Cuando consulta en pantalla 360 un cliente con crédito Amigo Paguitos y cuotas programadas
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema obtiene información de fechas mediante servicios BCService y ArService
    Entonces el sistema obtiene información de fechas mediante servicios BCService y ArService

    # WHEN: Verifica que se muestre la fecha de vencimiento general del invoice (dueDate del ArService)
    Cuando verifica que se muestre la fecha de vencimiento general del invoice dueDate del ArService

    # THEN: La pantalla despliega la fecha límite de pago del ciclo de facturación
    Entonces la pantalla despliega la fecha límite de pago del ciclo de facturación

    # WHEN: Verifica que se muestren las fechas de vencimiento de cada cuota (cycleDueDate del BCService)
    Cuando verifica que se muestren las fechas de vencimiento de cada cuota cycleDueDate del BCService

    # THEN: Se visualiza la fecha de vencimiento específica de cada parcialidad del financiamiento
    Entonces se visualiza la fecha de vencimiento específica de cada parcialidad del financiamiento

    # WHEN: Verifica que se muestren las fechas del ciclo de facturación (billCycleBeginTime y billCycleEndTime)
    Cuando verifica que se muestren las fechas del ciclo de facturación billCycleBeginTime y billCycleEndTime

    # THEN: La pantalla muestra el período del ciclo de facturación vigente
    Entonces la pantalla muestra el período del ciclo de facturación vigente

    # WHEN: Valida que las fechas mostradas estén en formato legible y ordenadas cronológicamente
    Cuando valida que las fechas mostradas estén en formato legible y ordenadas cronológicamente

    # THEN: Todas las fechas se presentan en formato DD/MM/AAAA y en orden temporal correcto
    Entonces todas las fechas se presentan en formato DD/MM/AAAA y en orden temporal correcto

    [Teardown]    Y cierra la sesión de la pantalla 360
