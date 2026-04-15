*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar el intercambio de información entre BES y BDI Telcel cuando se procesa una venta con financiamiento Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Integral    BES    BDI    AmigoPaguitos
    [Documentation]    Verificar el intercambio de información entre BES y BDI Telcel cuando se procesa
    ...                una venta con financiamiento Amigo Paguitos.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: BES integrado con BDI Telcel; APIs de creación de préstamo configuradas;
    ...                Plataforma AP.AG operativa; Usuario autenticado con permisos de venta
    Given la plataforma AP.AG captura correctamente los datos del cliente y del financiamiento
    When la información de la venta formalizada se transfiere desde AP.AG hacia BES
    And BES recibe y valida la información completa del préstamo
    And BES procesa y envía los datos relevantes hacia BDI Telcel
    Then BDI Telcel registra correctamente la información del financiamiento Amigo Paguitos
    And BDI Telcel almacena todos los datos del cliente préstamo y equipo
    And BES consulta y obtiene confirmación de que los datos fueron procesados correctamente en BDI Telcel

*** Keywords ***
La plataforma AP.AG captura correctamente los datos del cliente y del financiamiento
    Una venta con financiamiento Amigo Paguitos ha sido procesada desde AP.AG    Juan Pérez    Calle Principal 123    5551234567    ABC123456    50000    12    12    15.5    2026-04-15

La información de la venta formalizada se transfiere desde AP.AG hacia BES
    La información se transfiere desde AP.AG hacia BES mediante las APIs definidas

BES recibe y valida la información completa del préstamo
    BES recibe la información completa del préstamo desde AP.AG    ABC123456    Juan Pérez    Calle Principal 123    5551234567    50000    12    12    15.5    2026-04-15

BES procesa y envía los datos relevantes hacia BDI Telcel
    BES procesa la información y la envía hacia BDI Telcel    ABC123456

BDI Telcel registra correctamente la información del financiamiento Amigo Paguitos
    BDI Telcel recibe y registra la información del financiamiento Amigo Paguitos    ABC123456    50000    12

BDI Telcel almacena todos los datos del cliente préstamo y equipo
    BDI Telcel almacena correctamente los datos del cliente préstamo y equipo    ABC123456    Juan Pérez    50000    12    12    15.5    iPhone 15 Pro    123456789012345

BES consulta y obtiene confirmación de que los datos fueron procesados correctamente en BDI Telcel
    BES consulta la información sincronizada en BDI Telcel    ABC123456
    BES obtiene confirmación de que los datos fueron procesados correctamente en BDI Telcel    ABC123456
