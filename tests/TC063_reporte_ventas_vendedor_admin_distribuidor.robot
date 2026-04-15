*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que los administradores del distribuidor puedan consultar el reporte de ventas por vendedor en BES
    [Tags]    PruebaGeneradaIA    Reportes    BES    AmigoPaguitos    Ventas
    [Documentation]    Verificar que los administradores del distribuidor puedan consultar el reporte de ventas por vendedor en BES.
    ...                El sistema debe permitir al administrador autenticarse, acceder al módulo de reportes,
    ...                seleccionar filtros de fecha y distribuidor, y generar un reporte que muestre las ventas
    ...                agrupadas por vendedor incluyendo datos del cliente, información del préstamo, equipo vendido,
    ...                fecha de venta y vendedor responsable con información correcta y actualizada.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Baja
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario con rol de administrador de distribuidor autenticado en BES; Ventas de Amigo Paguitos registradas en el sistema; Información de vendedores asociada a las ventas
    Given el administrador del distribuidor se autentica en BES con credenciales autorizadas
    When se accede al reporte de ventas por vendedor de Amigo Paguitos
    And se selecciona rango de fechas y distribuidor correspondiente
    And se genera el reporte de ventas agrupadas por vendedor
    Then el reporte muestra todos los campos requeridos con información correcta y actualizada
