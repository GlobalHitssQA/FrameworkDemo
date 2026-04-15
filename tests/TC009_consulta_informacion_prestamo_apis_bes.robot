*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar consulta de información completa del préstamo mediante APIs de BES desde canales internos y externos
    [Tags]    PruebaGeneradaIA    Posventa    BES    API    Vista360    Funcional
    [Documentation]    Verificar la consulta de información completa del préstamo mediante las APIs de BES
    ...                desde canales internos y externos incluyendo Vista 360.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Préstamo activo en BES; APIs de consulta publicadas;
    ...                Usuario o canal con permisos de consulta; Vista 360 de BES disponible
    Given el usuario o canal que realizará la consulta está autenticado correctamente
    When se invoca la API de consulta de préstamo de BES enviando el identificador del préstamo
    Then BES recibe la petición y valida que los parámetros de búsqueda son correctos
    And la API retorna toda la información del préstamo incluyendo datos del cliente, cuotas, pagos, fechas y estatus
    And la información del crédito es accesible desde la Vista 360 de BES para canales internos y externos
    And los canales CACs, CVTs, CAT, Distribuidores y Cadenas pueden visualizar la información del crédito
    And se muestra el detalle de ventas por vendedor y el concentrado por fuerza de ventas cuando aplica

*** Keywords ***
El usuario o canal que realizará la consulta está autenticado correctamente
    El usuario o canal está autenticado y tiene permisos de consulta    CAC

Se invoca la API de consulta de préstamo de BES enviando el identificador del préstamo
    Se invoca la API de consulta de préstamo enviando identificador    PREST123456

BES recibe la petición y valida que los parámetros de búsqueda son correctos
    BES recibe la petición y valida los parámetros de búsqueda

La API retorna toda la información del préstamo incluyendo datos del cliente, cuotas, pagos, fechas y estatus
    La API retorna información completa del préstamo en formato estructurado

La información del crédito es accesible desde la Vista 360 de BES para canales internos y externos
    La información es accesible desde Vista 360 para canales internos y externos    PREST123456

Los canales CACs, CVTs, CAT, Distribuidores y Cadenas pueden visualizar la información del crédito
    @{canales}=    Create List    CAC    CVT    CAT    Distribuidor    Cadenas
    Los canales pueden visualizar información del crédito en Vista 360    PREST123456    @{canales}

Se muestra el detalle de ventas por vendedor y el concentrado por fuerza de ventas cuando aplica
    Se muestra detalle de ventas por vendedor y concentrado por fuerza de ventas    Vendedor1    Distribuidores
    Los reportes de ventas están disponibles para administradores
