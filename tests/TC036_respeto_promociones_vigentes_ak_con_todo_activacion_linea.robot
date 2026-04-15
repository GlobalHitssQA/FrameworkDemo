*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que las promociones vigentes AK con Todo se respeten y apliquen durante la activación de línea sobre equipo Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Activación    BES    AmigoPaguitos    Promociones    AK_con_Todo    Funcional
    [Documentation]    Verificar que las promociones vigentes AK con Todo se respeten y apliquen durante la activación de línea sobre equipo Amigo Paguitos.
    ...                El sistema debe mostrar las promociones AK con Todo activas configuradas con sus reglas de aplicación y beneficios,
    ...                reconocer automáticamente la elegibilidad del equipo vendido bajo Amigo Paguitos para la promoción AK con Todo,
    ...                identificar y aplicar automáticamente la promoción AK con Todo cuando se selecciona un plan prepagado compatible,
    ...                activar la línea con todos los beneficios de la promoción AK con Todo correctamente configurados, y finalmente
    ...                verificar en BES y en la pantalla 360 que la promoción AK con Todo esté asociada al préstamo y a la línea activada,
    ...                mostrando los beneficios otorgados por la promoción.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Préstamo de Amigo Paguitos registrado en BES; Promociones AK con Todo vigentes y activas;
    ...                Equipo elegible para promoción AK con Todo; Usuario con permisos de activación; Planes prepagados compatibles con AK con Todo disponibles;
    ...                Motor de reglas de promociones operativo
    Given el usuario consulta las promociones AK con Todo vigentes en el sistema
    Then el sistema despliega las promociones AK con Todo activas con sus reglas de aplicación y beneficios
    When el usuario selecciona un equipo vendido bajo Amigo Paguitos elegible para promoción AK con Todo
    Then el sistema identifica el equipo y permite iniciar el proceso de activación de línea
    When el usuario inicia la activación de línea celular seleccionando un plan prepagado compatible con AK con Todo
    Then el sistema valida la elegibilidad y aplica automáticamente la promoción AK con Todo al plan seleccionado
    When el usuario completa el proceso de activación con la promoción AK con Todo aplicada
    Then el sistema activa la línea correctamente con todos los beneficios de la promoción AK con Todo configurados
    And el usuario verifica en la pantalla 360 de BES que el préstamo muestre la línea activada con promoción AK con Todo

*** Keywords ***
El usuario consulta las promociones AK con Todo vigentes en el sistema
    El usuario consulta las promociones AK con Todo vigentes en el sistema

El sistema despliega las promociones AK con Todo activas con sus reglas de aplicación y beneficios
    El sistema despliega las promociones AK con Todo activas con sus reglas de aplicación y beneficios

El usuario selecciona un equipo vendido bajo Amigo Paguitos elegible para promoción AK con Todo
    El usuario selecciona un equipo vendido bajo Amigo Paguitos elegible para promoción AK con Todo    ABC123456

El sistema identifica el equipo y permite iniciar el proceso de activación de línea
    El sistema identifica el equipo y permite iniciar el proceso de activación de línea    ABC123456

El usuario inicia la activación de línea celular seleccionando un plan prepagado compatible con AK con Todo
    El usuario inicia la activación de línea celular seleccionando un plan prepagado compatible con AK con Todo    Juan Pérez    ABC123456    Calle Principal 123    5551234567    Plan Prepago AK con Todo

El sistema valida la elegibilidad y aplica automáticamente la promoción AK con Todo al plan seleccionado
    El sistema valida la elegibilidad y aplica automáticamente la promoción AK con Todo al plan seleccionado

El usuario completa el proceso de activación con la promoción AK con Todo aplicada
    El usuario completa el proceso de activación con la promoción AK con Todo aplicada    8952071234567890123    5559876543

El sistema activa la línea correctamente con todos los beneficios de la promoción AK con Todo configurados
    El sistema activa la línea correctamente con todos los beneficios de la promoción AK con Todo configurados

El usuario verifica en la pantalla 360 de BES que el préstamo muestre la línea activada con promoción AK con Todo
    El usuario verifica en la pantalla 360 de BES que el préstamo muestre la línea activada con promoción AK con Todo    ABC123456
