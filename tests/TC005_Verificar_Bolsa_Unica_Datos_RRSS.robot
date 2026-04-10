*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Cerrar Navegador

*** Test Cases ***
Verificar visualización de una sola bolsa de datos para redes sociales incluidas
    [Documentation]    ID: 5
    ...                Proceso: Consulta
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    ...                Escenario: Verificar que se muestra una única bolsa de datos para redes sociales
    ...                en plataformas de consulta cuando existen múltiples paquetes Internet Amigo activos
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: low
    ...                Técnica ISTQB: Casos de uso
    [Tags]    PruebaGeneradaIA    Consulta    PaquetesInternetAmigo    UPC    Funcional
    Given el usuario está autenticado en UPC
    When se activan dos paquetes Internet Amigo con datos para redes sociales
    And se consultan los datos RRSS en las plataformas de consulta
    Then se visualiza una sola bolsa consolidada de datos RRSS en todas las plataformas
