*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar transferencia completa de información desde AP.AG hacia BES tras formalización de venta
    [Tags]    PruebaGeneradaIA    Venta    BES    Integral
    [Documentation]    Verificar la transferencia completa de información desde Amigo Paguitos Autogestión hacia BES
    ...                cuando se formaliza una venta con financiamiento completando todo el flujo de venta.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Flujo de venta completo ejecutado en AP.AG; APIs de BES definidas y publicadas;
    ...                Conectividad entre AP.AG y BES disponible; Usuario y equipo validados
    Given el flujo de venta completo se ha ejecutado exitosamente en Amigo Paguitos Autogestión
    When se ejecuta la transferencia automática de datos desde AP.AG hacia BES al formalizar la venta
    Then BES recibe y valida toda la información necesaria para la administración del préstamo
    And BES crea exitosamente el nuevo préstamo con toda la información transferida
    And el proceso de transferencia es transparente sin intervención manual
    And la información del préstamo recién creado puede consultarse en BES

*** Keywords ***
El flujo de venta completo se ha ejecutado exitosamente en Amigo Paguitos Autogestión
    El usuario ha completado el flujo de venta con financiamiento en Amigo Paguitos    Juan Pérez    Calle Principal 123    5551234567    ABC123456    50000    12    12    15.5    2026-04-15

Se ejecuta la transferencia automática de datos desde AP.AG hacia BES al formalizar la venta
    Se ejecuta transferencia automática de venta y crédito desde AP.AG hacia BES

BES recibe y valida toda la información necesaria para la administración del préstamo
    Se verifica recepción de datos en BES    ABC123456

BES crea exitosamente el nuevo préstamo con toda la información transferida
    Se verifica creación exitosa del préstamo en BES    ABC123456    Juan Pérez    Calle Principal 123    5551234567    50000    12    12    15.5    2026-04-15

El proceso de transferencia es transparente sin intervención manual
    Se verifica transparencia del proceso de transferencia

La información del préstamo recién creado puede consultarse en BES
    Se consulta y verifica información completa del préstamo en BES    ABC123456    50000    12    12
