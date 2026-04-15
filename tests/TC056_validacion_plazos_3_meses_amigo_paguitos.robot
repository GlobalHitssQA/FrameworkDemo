*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que el sistema permita configurar plazo de 3 meses cuando el usuario ha sido validado y autorizado por Amigo Paguitos para este plazo
    [Tags]    PruebaGeneradaIA    BES    Préstamos    ConfiguraciónPlazos    IOSPR-868
    [Documentation]    Verificar que el sistema permita configurar plazo de 3 meses cuando el usuario ha sido validado
    ...                y autorizado por Amigo Paguitos para este plazo, validando que el cliente tenga autorizado dicho plazo
    ...                según la evaluación de Amigo Paguitos y que el sistema genere el calendario de pagos correspondiente
    ...                con las parcialidades distribuidas en 3 meses según la periodicidad seleccionada.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado con permisos de creación de préstamos; Cliente validado en
    ...                Amigo Paguitos con plazo de 3 meses autorizado; Reglas de negocio de plazos configuradas en BES
    ...                Historia de Usuario: IOSPR-868
    Given el usuario autenticado accede al módulo de creación de préstamos en BES
    When se selecciona un cliente previamente validado por Amigo Paguitos con plazo de 3 meses autorizado
    Then el sistema recupera la información del cliente y su perfil crediticio aprobado
    When se selecciona la opción de plazo a 3 meses en el formulario de configuración del préstamo
    Then el sistema valida que el cliente tenga autorizado el plazo de 3 meses según la evaluación de Amigo Paguitos
    When se completa el resto de información del préstamo y se guarda la configuración
    Then el sistema acepta el plazo de 3 meses y crea el préstamo con el calendario de pagos correspondiente
    And el calendario de cobranza generado contempla parcialidades según el plazo de 3 meses y la periodicidad seleccionada

*** Keywords ***
El usuario autenticado accede al módulo de creación de préstamos en BES
    El usuario autenticado accede al módulo de creación de préstamos en BES

Se selecciona un cliente previamente validado por Amigo Paguitos con plazo de 3 meses autorizado
    Seleccionar cliente validado por Amigo Paguitos con plazo de 3 meses autorizado    CLI789012

El sistema recupera la información del cliente y su perfil crediticio aprobado
    El sistema recupera información del cliente y perfil crediticio con plazo 3 meses aprobado

Se selecciona la opción de plazo a 3 meses en el formulario de configuración del préstamo
    Seleccionar plazo de 3 meses en formulario de configuración del préstamo

El sistema valida que el cliente tenga autorizado el plazo de 3 meses según la evaluación de Amigo Paguitos
    El sistema valida autorización de plazo 3 meses según evaluación de Amigo Paguitos

Se completa el resto de información del préstamo y se guarda la configuración
    Completar información del préstamo y guardar configuración con plazo 3 meses

El sistema acepta el plazo de 3 meses y crea el préstamo con el calendario de pagos correspondiente
    El sistema acepta plazo 3 meses y crea préstamo con calendario de pagos

El calendario de cobranza generado contempla parcialidades según el plazo de 3 meses y la periodicidad seleccionada
    Verificar calendario de cobranza con parcialidades distribuidas en plazo 3 meses según periodicidad seleccionada
