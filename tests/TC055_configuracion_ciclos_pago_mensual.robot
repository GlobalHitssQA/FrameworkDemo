*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar configuración de número de ciclos mensual según validación de perfil crediticio del usuario por Amigo Paguitos
    [Tags]    PruebaGeneradaIA    BES    Préstamos    ConfiguraciónCiclos    IOSPR-868
    [Documentation]    Verificar que el sistema permita configurar el número de ciclos mensuales de acuerdo
    ...                a la validación del usuario realizada por Amigo Paguitos, aceptando valores dentro del
    ...                rango permitido y rechazando valores fuera del rango según el perfil crediticio.
    ...                Técnica ISTQB: Valores límite
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES con permisos de creación de préstamos;
    ...                Cliente con evaluación crediticia aprobada en Amigo Paguitos; Reglas de configuración
    ...                de ciclos mensuales establecidas
    ...                Historia de Usuario: IOSPR-868
    Given el usuario autenticado accede al módulo de administración de préstamos en BES
    When se inicia la creación de un nuevo préstamo para cliente validado con ciclo mensual
    Then el sistema muestra el rango de ciclos mensuales configurables según perfil crediticio determinado por Amigo Paguitos
    When se ingresa un número de ciclos mensuales dentro del rango permitido
    Then el sistema acepta la configuración mensual y permite continuar
    When se intenta ingresar un número de ciclos mensuales fuera del rango permitido
    Then el sistema muestra mensaje indicando que excede lo permitido para periodicidad mensual

*** Keywords ***
El usuario autenticado accede al módulo de administración de préstamos en BES
    El usuario autenticado accede al módulo de administración de préstamos en BES

Se inicia la creación de un nuevo préstamo para cliente validado con ciclo mensual
    Se inicia la creación de un nuevo préstamo para cliente validado por Amigo Paguitos con ciclo mensual    CLI123456

El sistema muestra el rango de ciclos mensuales configurables según perfil crediticio determinado por Amigo Paguitos
    El sistema muestra el rango de ciclos mensuales configurables según el perfil crediticio del usuario    3    12

Se ingresa un número de ciclos mensuales dentro del rango permitido
    Se ingresa un número de ciclos mensuales dentro del rango permitido para el usuario    6

El sistema acepta la configuración mensual y permite continuar
    El sistema acepta la configuración mensual y permite continuar con la creación del préstamo

Se intenta ingresar un número de ciclos mensuales fuera del rango permitido
    Se intenta ingresar un número de ciclos mensuales fuera del rango permitido para el usuario    18

El sistema muestra mensaje indicando que excede lo permitido para periodicidad mensual
    El sistema muestra mensaje de error indicando que el número de ciclos mensuales excede lo permitido
