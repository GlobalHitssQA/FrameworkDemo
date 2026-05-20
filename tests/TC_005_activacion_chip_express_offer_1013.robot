*** Settings ***
Documentation     TC005 - Activación Chip Express Offer ID 1013 (Amigo Chip
...               Express Sin Límite R09) Prepago en CAC. Flujo E2E en BES:
...               búsqueda del SKU 7008294 (Producto 1) en CAC, asignación del
...               Offer ID 1013, captura de ICCID y activación vía
...               CustomerManagement.newSubscriber, evaluación de promociones
...               (no aplica para Chip Express) y validación de precios al
...               canal $15 y al cliente final $29 en la factura del CAC.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Particiones de equivalencia | Tipo: Funcional
...               Fase: UAT | Complejidad: media | BP: Purchase New Offer
...               Interfaz: BES ESB - newSubscriber
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver no disponible en este
...               entorno. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar La Activación E2E De Chip Express Prepago En BES Cuando Se Asigna Offer ID 1013 Al SKU 7008294 Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5512345678
    When Se Busca El Producto Chip Express En CAC Por SKU    7008294
    And Se Asigna El Offer ID Al SKU Del Chip Express    1013    7008294
    And Se Captura El ICCID De La SIM Universal Y Se Confirma La Activación    8952050000123456789F
    And Se Evalúa La Aplicación De Promociones Para Chip Express
    And Se Genera La Factura Del CAC Para Chip Express
    Then El Sistema Muestra Chip Express Con Precios Y Etiqueta    Producto 1    ${15}    ${29}
    And BES Acepta La Combinación Offer Y SKU Sin Errores    ESB0
    And BES Genera La Orden De Activación Con Estatus Exitoso
    And El Sistema No Aplica Promociones A Chip Express
    And La Factura Del CAC Refleja Los Precios Al Canal Y Al Cliente    ${15}    ${29}
