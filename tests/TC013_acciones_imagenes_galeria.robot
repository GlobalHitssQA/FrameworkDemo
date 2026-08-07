*** Settings ***
Documentation     TC013 - Verificar que las acciones de preview, compartir, eliminar y mover imágenes
...               funcionan correctamente tras la optimización de Galería (Regresión / TTP / Tabla de decisión / iOS Claro Drive).
...               # Locators pendientes de validación con app en vivo (app nativa iOS)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Finalizar Prueba

*** Test Cases ***
Verificar Acciones De Preview Compartir Eliminar Y Mover Imagenes Tras La Optimizacion De Galeria
    [Documentation]    Valida que preview, compartir, mover y eliminar funcionen correctamente en la Galería iOS
    ...                tras la optimización, sin regresiones, duplicados ni errores de renderizado.
    [Tags]    PruebaGeneradaIA
    Dado Que El Usuario Esta Autenticado En Claro Drive
    Y El Usuario Abre La Seccion Fotos
    Cuando El Usuario Ejecuta La Accion Preview Sobre La Imagen
    Entonces La Imagen Se Muestra En Vista Previa Completa
    Cuando El Usuario Comparte La Imagen A Un Destino
    Entonces La Imagen Se Comparte Correctamente
    Cuando El Usuario Mueve La Imagen A Otra Ubicacion
    Entonces La Imagen Se Mueve A La Ubicacion Destino
    Cuando El Usuario Elimina La Imagen Seleccionada
    Entonces La Imagen Se Elimina De La Galeria
    Entonces La Galeria Refleja Los Cambios Sin Regresiones
