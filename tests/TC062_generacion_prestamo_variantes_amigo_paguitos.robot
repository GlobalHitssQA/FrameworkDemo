*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la creación de préstamos en BES con diferentes configuraciones de plazos y periodicidad de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    BES    Préstamos    AmigoPaguitos    ConfiguraciónVariantes
    [Documentation]    Verificar que BES recibe y registra correctamente préstamos desde Amigo Paguitos Autogestión
    ...                con diferentes combinaciones de periodicidad (semanal, quincenal, mensual) y plazos (3, 6, 9, 12 meses),
    ...                validando que el número de parcialidades se calcule correctamente según el ciclo y plazo configurado.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en sistema; Integración entre Amigo Paguitos Autogestión
    ...                y BES activa; Configuración de plazos (3, 6, 9, 12) y periodicidades (semanal, quincenal, mensual) habilitada
    Given el usuario autenticado accede al sistema BES
    When Amigo Paguitos Autogestión envía información de préstamo con periodicidad semanal y plazo de 3 meses
    Then BES registra el préstamo con ciclo semanal y 12 parcialidades
    When Amigo Paguitos Autogestión envía información de préstamo con periodicidad quincenal y plazo de 6 meses
    Then BES registra el préstamo con ciclo quincenal y 12 parcialidades
    When Amigo Paguitos Autogestión envía información de préstamo con periodicidad mensual y plazo de 9 meses
    Then BES registra el préstamo con ciclo mensual y 9 parcialidades
    When Amigo Paguitos Autogestión envía información de préstamo con periodicidad mensual y plazo de 12 meses
    Then BES registra el préstamo con ciclo mensual y 12 parcialidades
    When se consultan los préstamos generados en BES
    Then cada préstamo contiene la información completa del cliente equipo y condiciones del financiamiento
