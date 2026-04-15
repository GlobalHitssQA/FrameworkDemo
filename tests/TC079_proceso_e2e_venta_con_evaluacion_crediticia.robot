*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar proceso completo de venta E2E con financiamiento Amigo Paguitos incluyendo evaluación crediticia hasta formalización en BES
    [Tags]    PruebaGeneradaIA    Venta    BES    AmigoPaguitos    Integral
    [Documentation]    Verificar el proceso completo End-to-End de venta con financiamiento Amigo Paguitos
    ...                desde el registro de usuario hasta la formalización en BES incluyendo la evaluación crediticia.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Plataforma AP.AG operativa; BES integrado con AP.AG mediante APIs;
    ...                Servicios de evaluación crediticia disponibles; Métodos de pago de enganche configurados;
    ...                Usuario no autenticado en el sistema
    Given el usuario inicia el proceso de venta registrándose en AP.AG con sus datos personales
    When el cliente acepta los términos legales del financiamiento
    And el cliente completa la autenticación de identidad
    And se ejecuta la evaluación crediticia del cliente
    And se genera la oferta de financiamiento basada en la evaluación aprobada
    And se enrolla el equipo capturando IMEI y datos del dispositivo
    And se procesa el pago de enganche mediante el método seleccionado
    And se formaliza la venta y se envía el contrato al cliente
    Then la información completa se transfiere desde AP.AG hacia BES vía APIs
    And el financiamiento se crea correctamente en BES con todos los datos del proceso

*** Keywords ***
El usuario inicia el proceso de venta registrándose en AP.AG con sus datos personales
    Se ejecuta registro de usuario en proceso E2E de venta    Carlos Martínez    Martinez.Carlos@telcel.com

El cliente acepta los términos legales del financiamiento
    Se ejecuta aceptación de legales en proceso E2E de venta

El cliente completa la autenticación de identidad
    Se ejecuta autenticación en proceso E2E de venta

Se ejecuta la evaluación crediticia del cliente
    Se ejecuta evaluación crediticia en proceso E2E de venta

Se genera la oferta de financiamiento basada en la evaluación aprobada
    Se genera y acepta oferta en proceso E2E de venta

Se enrolla el equipo capturando IMEI y datos del dispositivo
    Se enrolla equipo en proceso E2E de venta

Se procesa el pago de enganche mediante el método seleccionado
    Se procesa pago de enganche en proceso E2E de venta

Se formaliza la venta y se envía el contrato al cliente
    Se formaliza venta y envía contrato en proceso E2E de venta    Martinez.Carlos@telcel.com

La información completa se transfiere desde AP.AG hacia BES vía APIs
    Se ejecuta transferencia automática de venta completa desde AP.AG hacia BES

El financiamiento se crea correctamente en BES con todos los datos del proceso
    Se verifica creación completa del financiamiento en BES    Martinez.Carlos@telcel.com
