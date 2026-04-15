*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la disponibilidad de información del financiamiento Amigo Paguitos en el Micrositio de Clientes cuando se realiza una consulta
    [Tags]    PruebaGeneradaIA    AdministraciónDeCrédito    BES    MicrositioClientes    IntegralConsulta    Funcional
    [Documentation]    Verificar la disponibilidad de información del financiamiento Amigo Paguitos en el Micrositio
    ...                de Clientes cuando se realiza una consulta mediante la integración con BES. El sistema debe
    ...                responder con los datos completos del préstamo incluyendo datos del cliente, desglose de cuotas,
    ...                desglose de pagos, fechas de vencimiento y estatus del préstamo.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: BES integrado con Micrositio de Clientes mediante APIs de consulta;
    ...                Cliente con financiamiento Amigo Paguitos activo; Cliente autenticado en el Micrositio;
    ...                Conexión activa entre sistemas
    Given el cliente accede al Micrositio de Clientes con credenciales válidas
    Then el sistema autentica al cliente y muestra el menú principal del Micrositio
    When el Micrositio muestra la opción de consulta de financiamientos activos
    And el Micrositio invoca la API de consulta de BES para obtener los datos del financiamiento
    Then BES responde con los datos completos del préstamo incluyendo datos del cliente desglose de cuotas desglose de pagos fechas de vencimiento y estatus del préstamo
    And el Micrositio presenta al cliente de forma clara el estado de su financiamiento con todos los detalles de cuotas pagos y fechas
