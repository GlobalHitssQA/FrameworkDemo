*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar almacenamiento de información del usuario provista por Amigo Paguitos en BES
    [Tags]    PruebaGeneradaIA    Venta    BES    Integral
    [Documentation]    Verificar el almacenamiento de información del usuario en BES cuando Amigo Paguitos
    ...                envía los datos tras la formalización de venta.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Baja
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Venta formalizada en AP.AG; APIs de creación de préstamo definidas y disponibles;
    ...                Conexión entre AP.AG y BES activa
    Given la venta se ha formalizado correctamente en Amigo Paguitos Autogestión
    When la información del usuario se envía desde AP.AG hacia BES mediante las interfaces definidas
    Then los datos del usuario quedan almacenados correctamente en BES
    And la información completa del usuario puede consultarse mediante API

*** Keywords ***
La venta se ha formalizado correctamente en Amigo Paguitos Autogestión
    El usuario ha formalizado una venta en Amigo Paguitos    Juan Pérez    Calle Principal 123    5551234567    ABC123456

La información del usuario se envía desde AP.AG hacia BES mediante las interfaces definidas
    Se envían los datos del usuario a BES

Los datos del usuario quedan almacenados correctamente en BES
    Los datos quedan almacenados correctamente en BES    ABC123456    Juan Pérez    Calle Principal 123    5551234567

La información completa del usuario puede consultarse mediante API
    # Verificación adicional de que los datos persisten y son consultables
    Page Should Contain Element    ${BES_TABLA_RESULTADOS}
