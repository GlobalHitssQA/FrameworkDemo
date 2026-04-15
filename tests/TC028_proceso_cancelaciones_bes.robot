*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES ejecute correctamente el proceso de cancelación de préstamos de Amigo Paguitos gestionando los ajustes necesarios en el sistema
    [Tags]    PruebaGeneradaIA    Posventa    BES    Cancelación    Funcional
    [Documentation]    Verificar que BES ejecute correctamente el proceso de cancelación de préstamos de Amigo Paguitos
    ...                gestionando los ajustes necesarios en el sistema.
    ...                Incluye consulta de préstamo activo, inicio de proceso de cancelación con motivo,
    ...                validación de pagos acreditados, ejecución de cancelación, liberación de equipo mediante APIs SITIC-Trustonic,
    ...                generación de ajustes contables o reversas y consulta del historial de cancelación.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Préstamo activo registrado en BES; Integración con APIs de SITIC-Trustonic funcional;
    ...                Reglas de cancelación configuradas; Usuario autenticado con permisos de cancelación de préstamos
    Given el usuario consulta un préstamo activo que requiere cancelación en BES
    When se inicia el proceso de cancelación del préstamo especificando el motivo
    Then el sistema despliega el formulario de cancelación con los campos de motivo y justificación
    And BES valida si existen pagos acreditados al préstamo antes de proceder con la cancelación
    And se ejecuta la cancelación del préstamo en BES
    And BES ejecuta el proceso de liberación del equipo mediante las APIs de SITIC-Trustonic
    And BES genera los ajustes contables o reversas correspondientes si existían pagos acreditados
    And se consulta el historial del préstamo verificando el registro de cancelación
