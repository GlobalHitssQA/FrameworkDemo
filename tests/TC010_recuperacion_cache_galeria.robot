*** Settings ***
Documentation     TC010 - Verificar recuperación de imágenes desde caché al reabrir la sección Fotos
...               tras cierre y reapertura de la app (Funcional / TTP / Transición de estados / iOS Claro Drive).
...               # Locators pendientes de validación con app en vivo (app nativa iOS)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Finalizar Prueba

*** Test Cases ***
Verificar Recuperacion De Imagenes Desde Cache Al Reabrir La Seccion Fotos Tras Cierre Y Reapertura
    [Documentation]    Valida que las miniaturas previamente cargadas se recuperen de inmediato desde caché,
    ...                coincidiendo en contenido y orden con la sesión previa.
    [Tags]    PruebaGeneradaIA
    Dado Que El Usuario Esta Autenticado En Claro Drive
    Y El Usuario Abre La Seccion Fotos
    Cuando El Usuario Carga Un Conjunto De Imagenes Con Scroll
    Entonces Las Imagenes Quedan Almacenadas En La Cache Local
    Cuando El Usuario Cierra Por Completo La Aplicacion
    Y El Usuario Reabre La Aplicacion Y La Seccion Fotos
    Entonces Las Miniaturas Se Muestran De Inmediato Desde Cache
    Entonces Las Imagenes Coinciden Con La Sesion Previa
