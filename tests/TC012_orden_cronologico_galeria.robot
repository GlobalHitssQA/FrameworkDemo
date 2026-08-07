*** Settings ***
Documentation     TC012 - Verificar que la sección Fotos mantiene orden cronológico correcto
...               tras la optimización (Regresión / TTP / iOS Claro Drive).
...               # Locators pendientes de validación con app en vivo
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Finalizar Prueba

*** Test Cases ***
Verificar Orden Cronologico Correcto En La Seccion Fotos Tras Optimizacion
    [Documentation]    Valida que la Galería mantenga el orden cronológico descendente y continuo entre lotes.
    [Tags]    PruebaGeneradaIA
    Dado Que El Usuario Esta Autenticado En Claro Drive
    Y El Usuario Abre La Seccion Fotos
    Entonces Las Imagenes Se Presentan Ordenadas Cronologicamente
    Cuando El Usuario Recorre Varios Lotes De La Galeria
    Entonces El Orden Cronologico Se Mantiene Entre Lotes
