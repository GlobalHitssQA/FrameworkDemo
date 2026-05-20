*** Settings ***
Documentation     TC013 - Validación del precio final $0 al cliente en la
...               activación de Chip 30 Prepago Prod. 2 (SKU $0) vía CAC en
...               BES. Flujo: inicio del flujo de venta en el módulo de
...               Activaciones con recuperación del SKU Prod. 2 a precio canal
...               $0, asociación de la oferta Amigo Chip 30 Sin Límite a la
...               SIM Universal, cálculo del precio al cliente final por BES
...               conforme al cuadro 1, generación del ticket de venta en CAC
...               y comparación cruzada del monto $0 entre BES, UPC y el
...               ticket entregado al cliente.
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
Verificar Que El Precio Final Cobrado Al Cliente En BES Es $0 Cuando Se Activa Chip 30 Prod 2 Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5512345678
    When Se Inicia El Flujo De Venta De Chip 30 En El Modulo De Activaciones    7009251
    And Se Asocia La Oferta Chip 30 A La SIM Universal Seleccionada    700071780
    And Se Consulta El Precio Al Cliente Final Retornado Por BES Para Chip 30
    And Se Genera El Ticket De Venta De Chip 30 En CAC
    And Se Compara El Monto Cobrado Contra El Catalogo En UPC Y BES Para Chip 30
    Then BES Recupera El SKU Prod 2 Con Precio Al Canal Chip 30    ${0}
    And BES Calcula El Precio Al Cliente Final Conforme Al Cuadro 1 Chip 30
    And BES Devuelve El Precio Final Al Cliente Para Chip 30    ${0}
    And El Ticket Muestra El Monto Cobrado Al Cliente Final Chip 30    ${0}
    And El Monto Es Consistente Entre BES UPC Y El Ticket Entregado Chip 30    ${0}
