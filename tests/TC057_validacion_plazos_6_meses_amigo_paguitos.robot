*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que el sistema permita configurar plazo de 6 meses cuando el usuario ha sido validado y autorizado por Amigo Paguitos para este plazo
    [Tags]    PruebaGeneradaIA    BES    Préstamos    ConfiguraciónPlazos    IOSPR-868
    [Documentation]    Verificar que el sistema permita configurar plazo de 6 meses cuando el usuario ha sido validado
    ...                y autorizado por Amigo Paguitos para este plazo, validando que el cliente tenga autorizado dicho plazo
    ...                según la evaluación de Amigo Paguitos y que el sistema genere el calendario de pagos correspondiente
    ...                con las parcialidades distribuidas en 6 meses según la periodicidad seleccionada.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES; Cliente con evaluación crediticia aprobada en
    ...                Amigo Paguitos para plazo de 6 meses; Configuración de plazos habilitada en el sistema
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha ingresado al módulo de administración de préstamos de BES con usuario válido
    When se inician los datos del cliente que ha sido validado por Amigo Paguitos con autorización para 6 meses
    Then el sistema carga el perfil crediticio del cliente con los plazos autorizados
    When se selecciona plazo de 6 meses en la configuración del financiamiento
    Then el sistema valida que el plazo de 6 meses esté autorizado para el cliente según evaluación de Amigo Paguitos
    When se configura la periodicidad de pago y el monto del financiamiento
    Then el sistema calcula automáticamente el número de parcialidades según plazo de 6 meses y periodicidad seleccionada
    When se guarda la configuración del préstamo
    Then el sistema crea el préstamo con plazo de 6 meses y genera el calendario de cobranza correspondiente
    And se verifica el calendario de pagos generado
    And el calendario muestra las parcialidades distribuidas en 6 meses con fechas de vencimiento correctamente calculadas

*** Keywords ***
El usuario ha ingresado al módulo de administración de préstamos de BES con usuario válido
    El usuario autenticado accede al módulo de administración de préstamos en BES

Se inician los datos del cliente que ha sido validado por Amigo Paguitos con autorización para 6 meses
    Seleccionar cliente validado por Amigo Paguitos con plazo de 6 meses autorizado    CLI890123

El sistema carga el perfil crediticio del cliente con los plazos autorizados
    El sistema recupera información del cliente y perfil crediticio con plazo 6 meses aprobado

Se selecciona plazo de 6 meses en la configuración del financiamiento
    Seleccionar plazo de 6 meses en formulario de configuración del préstamo

El sistema valida que el plazo de 6 meses esté autorizado para el cliente según evaluación de Amigo Paguitos
    El sistema valida autorización de plazo 6 meses según evaluación de Amigo Paguitos

Se configura la periodicidad de pago y el monto del financiamiento
    Configurar periodicidad de pago y monto para préstamo con plazo 6 meses

El sistema calcula automáticamente el número de parcialidades según plazo de 6 meses y periodicidad seleccionada
    El sistema calcula automáticamente número de parcialidades para plazo 6 meses según periodicidad

Se guarda la configuración del préstamo
    Completar información del préstamo y guardar configuración con plazo 6 meses

El sistema crea el préstamo con plazo de 6 meses y genera el calendario de cobranza correspondiente
    El sistema acepta plazo 6 meses y crea préstamo con calendario de pagos

Se verifica el calendario de pagos generado
    Acceder a visualización del calendario de pagos generado para el préstamo

El calendario muestra las parcialidades distribuidas en 6 meses con fechas de vencimiento correctamente calculadas
    Verificar calendario de cobranza con parcialidades distribuidas en plazo 6 meses según periodicidad seleccionada
