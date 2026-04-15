*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES administre correctamente el proceso de garantías para equipos vendidos bajo el esquema de Amigo Paguitos considerando los trámites posventa
    [Tags]    PruebaGeneradaIA    Posventa    BES    Garantías    Funcional
    [Documentation]    Verificar que BES administre correctamente el proceso de garantías para equipos vendidos
    ...                bajo el esquema de Amigo Paguitos considerando los trámites posventa.
    ...                Incluye consulta de préstamo, inicio de trámite de garantía, validación de condiciones,
    ...                cambio de equipo con actualización de IMEI y consulta de historial de garantías.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Funcional
    ...                Preconditions: BES con módulo de garantías configurado; Préstamo activo con equipo registrado;
    ...                Políticas de garantía configuradas en el sistema; Usuario autenticado con permisos para gestionar garantías
    Given el usuario está autenticado en BES y consulta un préstamo activo con equipo registrado
    When se inicia el trámite de garantía en BES seleccionando el tipo de garantía
    Then el sistema despliega el formulario de solicitud de garantía
    And se registran los datos de la garantía en el sistema
    And BES valida el estatus del préstamo y los pagos antes de autorizar la garantía
    And se ejecuta el proceso de cambio de equipo reemplazando el equipo original por uno nuevo
    And BES actualiza la información del equipo en el préstamo manteniendo el calendario de pagos
    And se consulta el historial de garantías del préstamo en la pantalla 360
