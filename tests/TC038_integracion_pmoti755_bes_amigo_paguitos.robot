*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la integración del PMOTI 755 con BES para garantizar funcionalidad de trámites posventa en equipos Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Posventa    BES    PMOTI755    Integral
    [Documentation]    Verificar la integración del PMOTI 755 con BES para garantizar funcionalidad de trámites
    ...                posventa en equipos Amigo Paguitos. El sistema debe reconocer equipos vendidos bajo
    ...                Amigo Paguitos, permitir ejecutar trámites del PMOTI 755 (garantía, bloqueo, desbloqueo),
    ...                aplicar las mismas reglas de negocio que para equipos vendidos directamente por BES,
    ...                registrar los trámites en el historial del préstamo y mostrar la información actualizada
    ...                en la pantalla 360 de BES.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: BES integrado con funcionalidad del PMOTI 755;
    ...                Préstamo de Amigo Paguitos activo en BES; Equipo asociado al préstamo identificable;
    ...                Usuario con permisos de trámites posventa; Procesos de garantías, bloqueos y desbloqueos configurados
    Given se identifica un equipo vendido bajo Amigo Paguitos que requiere trámite PMOTI 755
    When se inicia el trámite PMOTI 755 sobre el equipo de Amigo Paguitos
    Then BES procesa el trámite PMOTI 755 aplicando las mismas reglas de negocio
    And se verifica el registro del trámite en el historial del préstamo en BES
    And se consulta la información actualizada en la pantalla 360 de BES después del trámite
