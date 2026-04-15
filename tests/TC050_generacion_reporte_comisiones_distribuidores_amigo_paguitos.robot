*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la generación correcta del reporte de comisiones de distribuidores actualizado incluyendo las comisiones generadas por ventas de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Reportes    Comisiones    BIBES    BES    AmigoPaguitos    Integracion
    [Documentation]    Verificar la generación correcta del reporte de comisiones de distribuidores actualizado incluyendo las comisiones generadas por ventas de Amigo Paguitos.
    ...                El sistema BIBES debe generar el reporte de comisiones calculando correctamente las comisiones correspondientes a las ventas realizadas,
    ...                incluyendo tanto ventas tradicionales como las de Amigo Paguitos, desglosadas por distribuidor y vendedor.
    ...                Las comisiones deben calcularse correctamente considerando el enganche, parcialidades y reglas de negocio específicas de Amigo Paguitos
    ...                según las políticas comerciales vigentes.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Ventas de Amigo Paguitos con comisiones configuradas en BES; BES integrado con BIBES para envío de información de comisiones; Reglas de comisionamiento para Amigo Paguitos definidas; Usuario con permisos para generar reportes de comisiones
    Given el usuario accede al sistema BIBES para consulta de reportes de comisiones
    When se selecciona el reporte de comisiones de distribuidores especificando el periodo a consultar
    And se configuran los filtros del reporte de comisiones incluyendo parámetros relevantes
    And se genera el reporte de comisiones calculando comisiones de ventas incluyendo Amigo Paguitos
    Then el reporte muestra comisiones de ventas tradicionales y de Amigo Paguitos desglosadas por distribuidor y vendedor
    And el sistema aplica correctamente las reglas de cálculo de comisiones para Amigo Paguitos
