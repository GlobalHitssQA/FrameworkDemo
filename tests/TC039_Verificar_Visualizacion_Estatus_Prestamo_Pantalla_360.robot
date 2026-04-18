*** Settings ***
Documentation    Caso de prueba ID 39: Verificar visualización de estatus del préstamo en pantalla 360
...              Proceso: Consulta
...              Aplicación: BES
...              Funcionalidad: Pantalla 360 - Estatus del préstamo
...              Escenario: Verificar que la pantalla 360 de BES muestre correctamente el estatus del
...              préstamo Amigo Paguitos en sus diferentes estados
...
...              Precondiciones:
...              - Crédito Amigo Paguitos registrado en BES
...              - Usuario con permisos de consulta autenticado
...              - APIs CustomerManagement, TelcelCustomService y BCService disponibles
...
...              Técnica ISTQB: Transición de estados
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con crédito Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}    5512345001

*** Test Cases ***
Verificar Visualización De Estatus Del Préstamo En Pantalla 360
    [Documentation]    Este caso de prueba verifica que la pantalla 360 de BES muestre correctamente
    ...                el estatus del préstamo Amigo Paguitos en sus diferentes estados, incluyendo
    ...                el status del subscriber, el installmentStatus del plan de financiamiento,
    ...                el subsidyStatus y el status de cada cuota individual.
    ...
    ...                Pasos:
    ...                1. Consultar un cliente con crédito Amigo Paguitos en la pantalla 360 de BES
    ...                2. Verificar que se muestre el estatus general del servicio (status del subscriber)
    ...                3. Verificar que se muestre el estatus del plan de financiamiento (installmentStatus)
    ...                4. Verificar que se muestre el estatus del subsidio (subsidyStatus)
    ...                5. Verificar que se muestre el estatus de cada cuota individual
    ...
    ...                Verificaciones:
    ...                - Sistema invoca CustomerManagement Service para obtener información del subscriber
    ...                - Pantalla despliega el estado actual de la línea asociada al crédito
    ...                - Se visualiza el estado del préstamo obtenido mediante TelcelCustomService.queryInstallmentByIMEI
    ...                - La pantalla muestra si el subsidio está activo, aplicado o en otro estado
    ...                - Se despliega el estado de pago de cada parcialidad: pagada, pendiente o vencida
    [Tags]    PruebaGeneradaIA    Funcional    BES    Consulta    Pantalla360    Medium

    # GIVEN: Usuario ha accedido a la pantalla 360 de BES con credenciales válidas
    Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas

    # WHEN: Consulta un cliente con crédito Amigo Paguitos en la pantalla 360 de BES
    Cuando consulta un cliente con crédito Amigo Paguitos en la pantalla 360 de BES
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema invoca CustomerManagement Service para obtener información del subscriber
    Entonces el sistema invoca CustomerManagement Service para obtener información del subscriber

    # WHEN: Verifica que se muestre el estatus general del servicio
    Cuando verifica que se muestra el estatus general del servicio

    # THEN: La pantalla despliega el estado actual de la línea asociada al crédito
    Entonces la pantalla despliega el estado actual de la línea asociada al crédito

    # WHEN: Verifica que se muestre el estatus del plan de financiamiento
    Cuando verifica que se muestra el estatus del plan de financiamiento

    # THEN: Se visualiza el estado del préstamo obtenido mediante TelcelCustomService.queryInstallmentByIMEI
    Entonces se visualiza el estado del préstamo obtenido mediante TelcelCustomService queryInstallmentByIMEI

    # WHEN: Verifica que se muestre el estatus del subsidio
    Cuando verifica que se muestra el estatus del subsidio

    # THEN: La pantalla muestra si el subsidio está activo, aplicado o en otro estado
    Entonces la pantalla muestra si el subsidio está activo aplicado o en otro estado

    # WHEN: Verifica que se muestre el estatus de cada cuota individual
    Cuando verifica que se muestra el estatus de cada cuota individual

    # THEN: Se despliega el estado de pago de cada parcialidad: pagada, pendiente o vencida
    Entonces se despliega el estado de pago de cada parcialidad

    [Teardown]    Y cierra la sesión de la pantalla 360
