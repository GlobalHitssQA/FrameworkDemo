*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que las promociones vigentes AK ASL se apliquen correctamente durante la activación de línea sobre equipo Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Activación    BES    AmigoPaguitos    Promociones    AK_ASL    Funcional
    [Documentation]    Verificar que las promociones vigentes AK ASL se apliquen correctamente durante la activación de línea sobre equipo Amigo Paguitos.
    ...                El sistema debe mostrar las promociones AK ASL activas configuradas con sus condiciones y beneficios,
    ...                reconocer automáticamente la elegibilidad del equipo vendido bajo Amigo Paguitos para la promoción AK ASL,
    ...                identificar y aplicar automáticamente la promoción AK ASL cuando se selecciona un plan prepagado elegible,
    ...                activar la línea con los beneficios de la promoción AK ASL correctamente configurados, y finalmente
    ...                verificar en BES y en la pantalla 360 que la promoción AK ASL esté asociada al préstamo y a la línea activada,
    ...                mostrando los beneficios otorgados por la promoción.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Préstamo de equipo Amigo Paguitos registrado en BES; Promociones AK ASL vigentes y configuradas en el sistema;
    ...                Equipo elegible para promoción AK ASL; Usuario autenticado con permisos de activación; Catálogo de planes prepagados actualizado;
    ...                Integración con motor de promociones activa
    Given el usuario consulta las promociones AK ASL vigentes configuradas en el sistema
    Then el sistema muestra las promociones AK ASL activas con condiciones y beneficios
    When el usuario inicia activación de línea sobre equipo Amigo Paguitos que califica para promoción AK ASL
    Then el sistema reconoce el equipo elegible para promoción AK ASL
    When el usuario selecciona plan prepagado elegible para promoción AK ASL durante la activación
    Then el sistema identifica elegibilidad y aplica promoción AK ASL automáticamente
    When el usuario completa activación de línea con promoción AK ASL aplicada
    Then el sistema activa línea con beneficios de promoción AK ASL configurados
    And el usuario verifica en BES y pantalla 360 que promoción AK ASL está asociada al préstamo y línea

*** Keywords ***
El usuario consulta las promociones AK ASL vigentes configuradas en el sistema
    El usuario consulta las promociones AK ASL vigentes configuradas en el sistema

El sistema muestra las promociones AK ASL activas con condiciones y beneficios
    El sistema muestra las promociones AK ASL activas con condiciones y beneficios

El usuario inicia activación de línea sobre equipo Amigo Paguitos que califica para promoción AK ASL
    El usuario inicia activación de línea sobre equipo Amigo Paguitos que califica para promoción AK ASL    ABC123456

El sistema reconoce el equipo elegible para promoción AK ASL
    El sistema reconoce el equipo elegible para promoción AK ASL    ABC123456

El usuario selecciona plan prepagado elegible para promoción AK ASL durante la activación
    El usuario selecciona plan prepagado elegible para promoción AK ASL durante la activación    Juan Pérez    ABC123456    Calle Principal 123    5551234567    Plan Prepago Promo AK ASL

El sistema identifica elegibilidad y aplica promoción AK ASL automáticamente
    El sistema identifica elegibilidad y aplica promoción AK ASL automáticamente

El usuario completa activación de línea con promoción AK ASL aplicada
    El usuario completa activación de línea con promoción AK ASL aplicada    8952071234567890123    5559876543

El sistema activa línea con beneficios de promoción AK ASL configurados
    El sistema activa línea con beneficios de promoción AK ASL configurados

El usuario verifica en BES y pantalla 360 que promoción AK ASL está asociada al préstamo y línea
    El usuario verifica en BES y pantalla 360 que promoción AK ASL está asociada al préstamo y línea    ABC123456
