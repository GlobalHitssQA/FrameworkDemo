*** Settings ***
Documentation    Caso de prueba: Verificar configuración de ciclos de pago semanal, quincenal y mensual
...              Proceso: Administración de crédito
...              Aplicación: BES
...              Funcionalidad: Configuración de ciclos de pago
...              Escenario: Verificar que el sistema BES permita configurar correctamente
...              los ciclos de pago semanal, quincenal y mensual según la validación del
...              usuario y definición de Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en BES con permisos de configuración
...              - Reglas de ciclos de pago definidas por Amigo Paguitos
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Test Cases ***
Verificar Configuración De Ciclos De Pago Semanal Quincenal Y Mensual
    [Documentation]    Este caso de prueba verifica que el sistema BES permita configurar
    ...                correctamente los ciclos de pago semanal, quincenal y mensual según
    ...                la validación del usuario y definición de Amigo Paguitos.
    ...
    ...                Pasos:
    ...                1. Acceder al módulo de configuración de préstamos en BES
    ...                2. Seleccionar la opción de configurar ciclo de pago para un nuevo préstamo
    ...                3. Configurar un préstamo con ciclo de pago semanal
    ...                4. Configurar un préstamo con ciclo de pago quincenal
    ...                5. Configurar un préstamo con ciclo de pago mensual
    ...                6. Verificar que cada configuración respete las reglas de Amigo Paguitos
    [Tags]    PruebaGeneradaIA

    # Step 1: Acceder al módulo de configuración de préstamos en BES
    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de configuración de ciclos de pago

    # Step 2: Seleccionar la opción de configurar ciclo de pago para un nuevo préstamo
    Entonces el sistema muestra las opciones de configuración de ciclos de pago

    # Step 3: Configurar un préstamo con ciclo de pago semanal
    Cuando configura un préstamo con ciclo de pago semanal

    Entonces el sistema acepta la configuración y genera el calendario de pagos semanales

    # Step 4: Configurar un préstamo con ciclo de pago quincenal
    Cuando configura un préstamo con ciclo de pago quincenal

    Entonces el sistema acepta la configuración y genera el calendario de pagos quincenales

    # Step 5: Configurar un préstamo con ciclo de pago mensual
    Cuando configura un préstamo con ciclo de pago mensual

    Entonces el sistema acepta la configuración y genera el calendario de pagos mensuales

    # Step 6: Verificar que cada configuración respete las reglas de Amigo Paguitos
    Entonces el sistema valida y aplica correctamente cada tipo de ciclo según las reglas de negocio

    [Teardown]    Entonces cerrar la sesión del navegador
