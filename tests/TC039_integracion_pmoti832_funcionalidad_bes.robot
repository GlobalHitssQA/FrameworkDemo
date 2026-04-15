*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la integración del PMOTI 832 con BES para soportar trámites posventa con la misma funcionalidad en equipos Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Posventa    BES    PMOTI832    Integral
    [Documentation]    Verificar la integración del PMOTI 832 con BES para soportar trámites posventa con la misma
    ...                funcionalidad en equipos Amigo Paguitos. El sistema debe identificar equipos vendidos bajo
    ...                el esquema Amigo Paguitos (PMOTI 832) asociados a préstamos activos administrados por BES,
    ...                permitir ejecutar trámites posventa (cambio de garantía, cesión de derechos), aplicar las
    ...                mismas reglas de negocio que para equipos vendidos directamente por BES, completar el trámite
    ...                y actualizar el estatus del préstamo, registrar el trámite en el historial de la pantalla 360
    ...                y reflejar correctamente la operación en reportes de ventas y comisiones de distribuidores.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: BES integrado con funcionalidad del PMOTI 832;
    ...                Préstamo de Amigo Paguitos (CR 832) activo; Usuario autenticado con permisos de trámites posventa;
    ...                Procesos de cambio de garantía y cesión de derechos configurados; Integración con sistemas de reportes activa
    Given se selecciona un equipo vendido bajo el esquema Amigo Paguitos PMOTI 832 registrado en BES
    When se inicia un trámite posventa del PMOTI 832 aplicando reglas de negocio de BES
    Then el sistema completa el trámite y actualiza el estatus del préstamo en BES
    And se verifica el registro del trámite en el historial de la pantalla 360 de BES
    And los reportes de ventas y comisiones reflejan correctamente la operación ejecutada
