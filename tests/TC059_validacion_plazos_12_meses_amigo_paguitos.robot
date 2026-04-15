*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que el sistema permita configurar plazo de 12 meses cuando el usuario ha sido validado y autorizado por Amigo Paguitos para este plazo
    [Tags]    PruebaGeneradaIA    BES    ConfiguraciónPlazos    IOSPR-868    Funcional
    [Documentation]    Verificar que el sistema permita configurar plazo de 12 meses cuando el usuario ha sido
    ...                validado y autorizado por Amigo Paguitos para este plazo. El sistema debe presentar el
    ...                plazo de 12 meses como disponible, aceptarlo como válido, calcular automáticamente las
    ...                parcialidades mensuales y generar el calendario de cobranza completo distribuido en un año.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Alta
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES con rol de administración de préstamos; Cliente
    ...                con evaluación crediticia aprobada en Amigo Paguitos para 12 meses; Configuración de plazos
    ...                y cálculo de parcialidades activa
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha ingresado al módulo de préstamos de BES con credenciales válidas y seleccionó crear nuevo préstamo
    When se ingresa o selecciona cliente validado por Amigo Paguitos con autorización para plazo de 12 meses
    Then el sistema muestra el plazo de 12 meses como disponible según evaluación crediticia
    When se selecciona plazo de 12 meses en la configuración del préstamo
    Then el sistema acepta el plazo de 12 meses como válido para el cliente
    When se configura monto del financiamiento y periodicidad de pago mensual
    Then el sistema calcula automáticamente el desglose de parcialidades para 12 meses
    When se guarda el préstamo y se genera el calendario de cobranza
    Then el sistema crea el préstamo con plazo de 12 meses y genera calendario completo
    And la consulta del préstamo en pantalla 360 de BES muestra plazo de 12 meses con desglose de cuotas y calendario completo

*** Keywords ***
El usuario ha ingresado al módulo de préstamos de BES con credenciales válidas y seleccionó crear nuevo préstamo
    El usuario autenticado accede al módulo de administración de préstamos en BES
    El sistema presenta formulario para crear nuevo préstamo

Se ingresa o selecciona cliente validado por Amigo Paguitos con autorización para plazo de 12 meses
    Se selecciona cliente validado por Amigo Paguitos con autorización para plazo de 12 meses    CLI123456

El sistema muestra el plazo de 12 meses como disponible según evaluación crediticia
    El sistema carga perfil del cliente y muestra plazos disponibles según evaluación crediticia con plazo 12 meses autorizado

Se selecciona plazo de 12 meses en la configuración del préstamo
    Seleccionar plazo de 12 meses en formulario del préstamo

El sistema acepta el plazo de 12 meses como válido para el cliente
    Verificar validación de autorización de plazo 12 meses por Amigo Paguitos

Se configura monto del financiamiento y periodicidad de pago mensual
    Configurar monto del financiamiento y periodicidad de pago mensual y completar datos del equipo    50000    mensual

El sistema calcula automáticamente el desglose de parcialidades para 12 meses
    Verificar cálculo automático de parcialidades para plazo 12 meses    mensual

Se guarda el préstamo y se genera el calendario de cobranza
    Guardar configuración del préstamo con plazo 12 meses y generar calendario de cobranza

El sistema crea el préstamo con plazo de 12 meses y genera calendario completo
    Verificar creación exitosa del préstamo con plazo 12 meses
    Verificar generación de calendario de pagos para plazo 12 meses

La consulta del préstamo en pantalla 360 de BES muestra plazo de 12 meses con desglose de cuotas y calendario completo
    Consultar préstamo creado en pantalla 360 de BES y verificar plazo 12 meses    CLI123456
    Verificar calendario de cobranza generado para plazo 12 meses con todas las fechas de vencimiento distribuidas en un año    mensual
    Verificar fechas de vencimiento correctas en calendario de 12 meses distribuidas en un año    mensual
