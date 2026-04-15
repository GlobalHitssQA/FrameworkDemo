*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la generación del reporte concentrado de ventas por fuerza de venta en BES
    [Tags]    PruebaGeneradaIA    Reportes    BES    Consolidados    VentasConcentradas
    [Documentation]    Verificar la generación del reporte concentrado de ventas por fuerza de venta en BES.
    ...                El sistema debe permitir al usuario autenticarse con permisos de consulta de reportes consolidados,
    ...                acceder al módulo de reportes consolidados, seleccionar la opción de reporte concentrado de ventas,
    ...                especificar parámetros de búsqueda (rango de fechas, canal de venta y región),
    ...                generar el reporte que concentre información de ventas de CAC, CVT, CCT, CAT, DAT, Cadenas Comerciales
    ...                y otros canales mostrando el consolidado con totales y subtotales,
    ...                y exportar el reporte a formato Excel para análisis detallado con todos los datos incluidos.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario con permisos de consulta de reportes consolidados autenticado; Ventas registradas en múltiples canales de venta; Información de fuerza de venta configurada en BES
    Given el usuario se autentica en BES con credenciales de usuario autorizado para consultar reportes consolidados
    When se selecciona la opción de reporte concentrado de ventas por fuerza de venta
    And se especifican parámetros de búsqueda con rango de fechas canal de venta y región
    And se genera el reporte concentrado de ventas por fuerza de venta
    Then el reporte muestra el consolidado de ventas por cada fuerza de venta con totales y subtotales
    And se exporta el reporte a formato Excel para análisis detallado
