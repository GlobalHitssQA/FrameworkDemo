*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar el registro de equipos en EIR cuando BES procesa una venta con financiamiento Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Integral    BES    EIR    AmigoPaguitos
    [Documentation]    Verificar el registro de equipos en EIR cuando BES procesa una venta con financiamiento Amigo Paguitos.
    ...                El sistema debe registrar el IMEI del equipo en EIR, validarlo, y vincularlo con el cliente y financiamiento.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: BES integrado con sistema EIR; Equipo con IMEI válido; Venta de Amigo Paguitos formalizada; Usuario autenticado en el sistema
    Given BES ha registrado una venta de equipo con financiamiento Amigo Paguitos incluyendo el IMEI del equipo
    When BES envía desde el sistema la información del IMEI del equipo hacia el sistema EIR para su registro
    And EIR recibe y valida la solicitud de registro del equipo con el IMEI y datos asociados al financiamiento
    And EIR confirma que el IMEI es válido y no está bloqueado
    And EIR registra exitosamente el equipo asociándolo al financiamiento Amigo Paguitos del cliente
    Then BES consulta y obtiene la confirmación de que el equipo fue registrado correctamente en EIR

*** Keywords ***
BES ha registrado una venta de equipo con financiamiento Amigo Paguitos incluyendo el IMEI del equipo
    Se registra en BES una venta de equipo con financiamiento Amigo Paguitos incluyendo el IMEI    Juan Pérez    Calle Principal 123    5551234567    ABC123456    123456789012345    Apple    iPhone 15 Pro
    BES almacena correctamente la información del equipo incluyendo el IMEI y los datos del financiamiento    123456789012345    Apple    iPhone 15 Pro    ABC123456

BES envía desde el sistema la información del IMEI del equipo hacia el sistema EIR para su registro
    BES envía la información del IMEI del equipo hacia el sistema EIR para su registro    123456789012345

EIR recibe y valida la solicitud de registro del equipo con el IMEI y datos asociados al financiamiento
    EIR recibe la solicitud de registro del equipo con el IMEI y datos asociados al financiamiento    123456789012345

EIR confirma que el IMEI es válido y no está bloqueado
    EIR confirma que el IMEI es válido y puede ser registrado en el sistema    123456789012345

EIR registra exitosamente el equipo asociándolo al financiamiento Amigo Paguitos del cliente
    EIR registra exitosamente el equipo y lo vincula con el cliente y el financiamiento    123456789012345    Apple    iPhone 15 Pro    ABC123456

BES consulta y obtiene la confirmación de que el equipo fue registrado correctamente en EIR
    BES obtiene la confirmación de que el equipo fue registrado correctamente en EIR    123456789012345
