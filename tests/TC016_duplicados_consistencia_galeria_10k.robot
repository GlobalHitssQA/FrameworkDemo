*** Settings ***
Documentation     TC016 - Verificar ausencia de duplicados y consistencia de imágenes tras
...               múltiples reaperturas de Galería con cuenta 10K (Funcional / TTP / iOS Claro Drive).
...               # Locators pendientes de validación con app en vivo
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Finalizar Prueba

*** Variables ***
${CONTEO_INICIAL_10K}    10000

*** Test Cases ***
Verificar Ausencia De Duplicados Y Consistencia Tras Multiples Reaperturas Con Cuenta 10K
    [Documentation]    Valida que tras múltiples reaperturas la Galería mantenga cantidad, secuencia y ausencia de duplicados.
    [Tags]    PruebaGeneradaIA
    Dado Que El Usuario Esta Autenticado En Claro Drive
    Y El Usuario Abre La Seccion Fotos
    Cuando El Usuario Recorre Varios Lotes De La Galeria
    Entonces La Galeria No Presenta Duplicados Ni Discrepancias
    Cuando El Usuario Reabre La Seccion Fotos Varias Veces    3
    Entonces La Galeria No Presenta Duplicados Ni Discrepancias
    Entonces El Conteo Total De Imagenes Se Mantiene Consistente    ${CONTEO_INICIAL_10K}
