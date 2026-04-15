*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar configuración de número de ciclos quincenal según validación de perfil crediticio del usuario por Amigo Paguitos
    [Tags]    PruebaGeneradaIA    BES    Préstamos    ConfiguraciónCiclos    IOSPR-868
    [Documentation]    Verificar que el sistema permita configurar el número de ciclos quincenales de acuerdo
    ...                a la validación del usuario realizada por Amigo Paguitos, aceptando valores dentro del
    ...                rango permitido y rechazando valores fuera del rango según el perfil crediticio.
    ...                Técnica ISTQB: Valores límite
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES; Cliente validado por Amigo Paguitos con perfil
    ...                crediticio definido; Configuración de rangos de ciclos por perfil establecida en el sistema
    ...                Historia de Usuario: IOSPR-868
    Given el usuario autenticado accede al módulo de administración de préstamos en BES
    When se inicia la creación de un nuevo préstamo para cliente validado con ciclo quincenal
    Then el sistema muestra el rango de ciclos quincenales configurables según perfil crediticio determinado por Amigo Paguitos
    When se ingresa un número de ciclos quincenales dentro del rango permitido
    Then el sistema acepta la configuración quincenal y permite continuar
    When se intenta ingresar un número de ciclos quincenales fuera del rango permitido
    Then el sistema muestra mensaje indicando que excede lo permitido para periodicidad quincenal

*** Keywords ***
El usuario autenticado accede al módulo de administración de préstamos en BES
    El usuario autenticado accede al módulo de administración de préstamos en BES

Se inicia la creación de un nuevo préstamo para cliente validado con ciclo quincenal
    Se inicia la creación de un nuevo préstamo para cliente validado por Amigo Paguitos con ciclo quincenal    CLI123456

El sistema muestra el rango de ciclos quincenales configurables según perfil crediticio determinado por Amigo Paguitos
    El sistema muestra el rango de ciclos quincenales configurables según el perfil crediticio del usuario    6    24

Se ingresa un número de ciclos quincenales dentro del rango permitido
    Se ingresa un número de ciclos quincenales dentro del rango permitido para el usuario    12

El sistema acepta la configuración quincenal y permite continuar
    El sistema acepta la configuración quincenal y permite continuar con la creación del préstamo

Se intenta ingresar un número de ciclos quincenales fuera del rango permitido
    Se intenta ingresar un número de ciclos quincenales fuera del rango permitido para el usuario    30

El sistema muestra mensaje indicando que excede lo permitido para periodicidad quincenal
    El sistema muestra mensaje de error indicando que el número de ciclos quincenales excede lo permitido
