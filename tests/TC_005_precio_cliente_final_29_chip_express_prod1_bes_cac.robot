*** Settings ***
Documentation     TC005 - Validación del precio final $29 al cliente en la
...               activación de Chip Express Prepago Prod. 1 (SKU $15) en BES
...               vía CAC. Flujo: inicio del flujo de venta en el módulo CAC con
...               consulta del catálogo de precios al cliente final,
...               selección de la oferta Chip Express Sin Límite sobre el SKU,
...               cálculo del precio al cliente final por BES conforme al
...               cuadro 1 del requerimiento, generación del ticket de venta
...               en CAC y comparación cruzada del monto $29 entre BES, UPC y
...               el ticket entregado al cliente.
...               Proceso: Alta | Aplicación: BES CRM | Vertical: PREPAGO
...               Técnica ISTQB: Valores límite | Tipo: Funcional
...               Fase: UAT | Complejidad: media | BP: Purchase New Offer
...               Área: Activaciones / Facturación
...               Legado: BES CRM ORDER MANAGEMENT
...               Interfaz: CustomerManagement Service
...               Insumo: ADECUACIONES_SIM_UNIVERSAL_2026_V3_20022026.xlsx
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver no disponible en este
...               entorno. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar Que El Precio Final Cobrado Al Cliente En BES Es $29 Cuando Se Activa Chip Express Prod 1 Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5512345678
    When Se Inicia El Flujo De Venta De Chip Express En El Modulo CAC    7008294
    And Se Selecciona La Oferta Chip Express Sin Limite Sobre El SKU    1013    7008294
    And Se Consulta El Precio Al Cliente Final Calculado Por BES Para Chip Express
    And Se Genera El Ticket De Venta En CAC Para Chip Express
    And Se Compara El Monto Del Ticket Contra El Precio En BES Y UPC Para Chip Express
    Then BES Muestra El SKU Y Consulta El Catalogo De Precios Al Cliente Final Chip Express    ${15}
    And BES Asocia La Oferta Y Dispara El Calculo Del Precio Al Cliente Chip Express
    And BES Devuelve El Precio Final Al Cliente Para Chip Express    ${29}
    And El Ticket Muestra El Monto Cobrado Al Cliente Final Chip Express    ${29}
    And El Monto Coincide Entre BES UPC Y El Ticket Entregado Al Cliente Chip Express    ${29}
