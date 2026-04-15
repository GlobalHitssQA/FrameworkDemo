*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que el sistema no permita realizar cambios de ciclos de pago una vez que el préstamo ha sido creado
    [Tags]    PruebaGeneradaIA    BES    Préstamos    RestricciónCambios    IOSPR-868    Funcional
    [Documentation]    Verificar que el sistema no permita realizar cambios de ciclos de pago una vez que el
    ...                préstamo ha sido creado. El sistema debe crear el préstamo con la periodicidad y número
    ...                de ciclos especificados, generar el calendario de cobranza según la configuración inicial,
    ...                y posteriormente no permitir modificaciones en los ciclos, mostrando que la opción de cambio
    ...                está deshabilitada o no disponible, con mensaje informativo sobre la restricción activa.
    ...                Técnica ISTQB: Casos de error
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES; Préstamo activo creado con ciclos y periodicidad
    ...                definidos; Regla de negocio de no cambios de ciclos configurada en el sistema
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha accedido al sistema BES con credenciales válidas y visualiza el menú principal
    When se crea un préstamo completo con cliente de Amigo Paguitos especificando periodicidad mensual y 12 ciclos
    Then el sistema crea el préstamo exitosamente y genera calendario de cobranza según configuración inicial de 12 ciclos mensuales
    When se consulta el préstamo creado en la administración o en la vista 360 de BES
    Then el sistema muestra el detalle completo del préstamo incluyendo periodicidad mensual y calendario de 12 pagos
    When se intenta acceder a la opción de modificación de ciclos o periodicidad del préstamo creado
    Then el sistema no muestra la opción de cambio de ciclos o la opción aparece deshabilitada
    And el sistema muestra mensaje indicando que no se permiten cambios de ciclos según reglas de negocio
    And el calendario de cobranza permanece sin cambios con la configuración original de periodicidad mensual

*** Keywords ***
El usuario ha accedido al sistema BES con credenciales válidas y visualiza el menú principal
    El usuario ha accedido al sistema BES con credenciales válidas y visualiza el menú principal

Se crea un préstamo completo con cliente de Amigo Paguitos especificando periodicidad mensual y 12 ciclos
    Se crea un préstamo completo con cliente de Amigo Paguitos especificando periodicidad mensual y 12 ciclos    CLI123456

El sistema crea el préstamo exitosamente y genera calendario de cobranza según configuración inicial de 12 ciclos mensuales
    El sistema crea el préstamo exitosamente y genera calendario de cobranza según configuración inicial    12    mensual

Se consulta el préstamo creado en la administración o en la vista 360 de BES
    Se consulta el préstamo creado en la vista 360 de BES    CLI123456

El sistema muestra el detalle completo del préstamo incluyendo periodicidad mensual y calendario de 12 pagos
    El sistema muestra el detalle completo del préstamo con periodicidad y calendario    12    mensual

Se intenta acceder a la opción de modificación de ciclos o periodicidad del préstamo creado
    Se intenta acceder a la opción de modificación de ciclos o periodicidad del préstamo

El sistema no muestra la opción de cambio de ciclos o la opción aparece deshabilitada
    El sistema no muestra la opción de cambio de ciclos o la opción aparece deshabilitada

El sistema muestra mensaje indicando que no se permiten cambios de ciclos según reglas de negocio
    El sistema muestra mensaje de restricción de no cambios de ciclos según reglas de negocio

El calendario de cobranza permanece sin cambios con la configuración original de periodicidad mensual
    El calendario de cobranza permanece sin cambios con la configuración original    12    mensual
