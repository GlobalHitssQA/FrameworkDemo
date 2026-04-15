*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que los trámites de garantía para equipos vendidos con Amigo Paguitos tengan la misma funcionalidad que las ventas directas de BES
    [Tags]    PruebaGeneradaIA    Posventa    BES    Garantías    Funcional
    [Documentation]    Verificar que los trámites de garantía para equipos vendidos con Amigo Paguitos
    ...                tengan la misma funcionalidad que las ventas directas de BES.
    ...                Se valida que el formulario sea idéntico, que se permita registrar equipo de reemplazo
    ...                manteniendo las condiciones del financiamiento, y que se genere el folio correspondiente
    ...                sin afectar el calendario de pagos.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES; Préstamo de Amigo Paguitos activo con equipo registrado;
    ...                Proceso de garantías configurado en BES; Integración con sistemas de inventario activa
    Given el usuario accede al módulo de garantías en BES con un préstamo activo de Amigo Paguitos
    When se inicia el proceso de garantía seleccionando el equipo vendido bajo financiamiento Amigo Paguitos
    Then el sistema despliega el formulario de garantía con los mismos campos que para ventas directas
    And se ingresa la información requerida del trámite de garantía
    And se registra el equipo de reemplazo asociado al mismo préstamo
    And se confirma el trámite de garantía
    And el sistema genera el folio de garantía y actualiza el estatus sin afectar el calendario de pagos
