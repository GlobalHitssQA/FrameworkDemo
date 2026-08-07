*** Settings ***
Documentation     TC009 - Verificar comportamiento de la Galería al alcanzar el final del listado
...               de imágenes durante la paginación incremental (Funcional / TTP / Valores límite / iOS Claro Drive).
...               # Locators pendientes de validación con app en vivo (app nativa iOS)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Finalizar Prueba

*** Test Cases ***
Verificar Comportamiento De La Galeria Al Alcanzar El Final Del Listado Durante La Paginacion Incremental
    [Documentation]    Valida que la paginación incremental termine de forma estable en el último elemento,
    ...                sin cargas infinitas, sin pantallas en blanco y con la app respondiendo.
    [Tags]    PruebaGeneradaIA
    Dado Que El Usuario Esta Autenticado En Claro Drive
    Y El Usuario Abre La Seccion Fotos
    Cuando El Usuario Realiza Scroll Incremental Hacia El Final
    Entonces Los Lotes De Imagenes Se Cargan De Forma Fluida
    Cuando El Usuario Alcanza El Ultimo Elemento Del Listado
    Entonces La Galeria Muestra El Ultimo Elemento Y Detiene La Carga
    Cuando El Usuario Intenta Scroll Adicional Mas Alla Del Final
    Entonces El Fin Del Listado Se Mantiene Estable Sin Cargas Infinitas
    Entonces La Aplicacion Permanece Estable Y Responde A La Interaccion
