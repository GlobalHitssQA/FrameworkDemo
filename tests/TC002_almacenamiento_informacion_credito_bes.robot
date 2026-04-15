*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar almacenamiento de información del crédito provista por Amigo Paguitos en BES
    [Tags]    PruebaGeneradaIA    Venta    BES    Integral
    [Documentation]    Verificar el almacenamiento de información del financiamiento en BES cuando Amigo Paguitos
    ...                transfiere los datos del préstamo tras la aprobación y formalización.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Venta y financiamiento formalizados en AP.AG; Usuario registrado en BES;
    ...                APIs de creación de préstamo definidas; Conexión entre sistemas activa
    Given el financiamiento está aprobado con información completa de crédito en Amigo Paguitos
    When la información del crédito se transfiere desde AP.AG hacia BES mediante las APIs definidas
    Then el préstamo queda almacenado en BES con identificador único y toda la información del financiamiento
    And se genera el calendario de pagos con fechas de vencimiento y montos de parcialidades
    And la información completa del préstamo es consultable mediante APIs de BES

*** Keywords ***
El financiamiento está aprobado con información completa de crédito en Amigo Paguitos
    El financiamiento ha sido aprobado y formalizado en Amigo Paguitos    50000    12    12    15.5    2026-04-15

La información del crédito se transfiere desde AP.AG hacia BES mediante las APIs definidas
    Se transfiere la información del crédito desde AP.AG hacia BES

El préstamo queda almacenado en BES con identificador único y toda la información del financiamiento
    El préstamo queda registrado en BES con toda la información del financiamiento    ABC123456    50000    12    12    15.5    2026-04-15

Se genera el calendario de pagos con fechas de vencimiento y montos de parcialidades
    Se genera el calendario de pagos en BES    12

La información completa del préstamo es consultable mediante APIs de BES
    La información del préstamo puede consultarse mediante API de BES
