*** Settings ***
Documentation    Caso de prueba ID 28: Verificación de consulta de estatus del préstamo
...              Proceso: Postventa
...              Aplicación: BES
...              Funcionalidad: Consulta de estatus del préstamo
...              Escenario: Verificar la consulta del estatus actual del préstamo en BES cuando
...              se accede a la información del financiamiento del cliente
...
...              Precondiciones:
...              - Usuario autenticado en BES
...              - Cliente con financiamiento en diferentes estatus
...              - Servicios de consulta disponibles
...              - Datos de préstamo actualizados
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con financiamiento
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Verificación De Consulta De Estatus Del Préstamo
    [Documentation]    Este caso de prueba verifica la consulta del estatus actual del préstamo
    ...                en BES cuando se accede a la información del financiamiento del cliente.
    ...                Se validan el campo installmentStatus del plan de instalación, el status
    ...                general del préstamo, el subsidyStatus relacionado al subsidio del equipo,
    ...                y que el estatus se actualice correctamente al realizar un pago o vencer una cuota.
    ...
    ...                Pasos:
    ...                1. Consultar un préstamo en BES mediante el número telefónico del cliente
    ...                2. Verificar el campo installmentStatus que indica el estatus del plan de instalación
    ...                3. Consultar el campo status del préstamo que indica el estado general
    ...                4. Verificar el campo subsidyStatus relacionado al subsidio del equipo
    ...                5. Validar que el estatus se actualice correctamente al realizar un pago o vencer una cuota
    ...
    ...                Verificaciones:
    ...                - El sistema carga la información del préstamo correctamente
    ...                - Se muestra el estatus del plan de instalación
    ...                - Se visualiza el estatus general del préstamo correctamente
    ...                - Se muestra el estatus del subsidio asociado al financiamiento
    ...                - El sistema actualiza el estatus en tiempo real reflejando los cambios
    [Tags]    PruebaGeneradaIA    Funcional    BES    Postventa    EstatusPrestamo    Medium

    # GIVEN: Usuario ha iniciado sesión en BES con credenciales válidas
    Dado que el usuario ha iniciado sesión en BES con credenciales válidas

    # WHEN: Consulta un préstamo en BES mediante el número telefónico del cliente
    Cuando consulta un préstamo en BES mediante número telefónico del cliente
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema carga la información del préstamo correctamente
    Entonces el sistema carga la información del préstamo correctamente

    # WHEN: Verifica el campo installmentStatus que indica el estatus del plan de instalación
    Cuando verifica el campo installmentStatus del plan de instalación

    # THEN: Se muestra el estatus del plan de instalación
    Entonces se muestra el estatus del plan de instalación

    # WHEN: Consulta el campo status del préstamo que indica el estado general
    Cuando consulta el campo status del préstamo

    # THEN: Se visualiza el estatus general del préstamo correctamente
    Entonces se visualiza el estatus general del préstamo correctamente

    # WHEN: Verifica el campo subsidyStatus relacionado al subsidio del equipo
    Cuando verifica el campo subsidyStatus del subsidio

    # THEN: Se muestra el estatus del subsidio asociado al financiamiento
    Entonces se muestra el estatus del subsidio asociado al financiamiento

    # WHEN: Valida que el estatus se actualice correctamente al realizar un pago o vencer una cuota
    Cuando valida que el estatus se actualiza al realizar cambios

    # THEN: El sistema actualiza el estatus en tiempo real reflejando los cambios en el comportamiento de pago
    Entonces el sistema actualiza el estatus en tiempo real reflejando cambios

    [Teardown]    Y cierra la sesión del sistema BES
