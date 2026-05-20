*** Settings ***
Documentation     TC013 - Validación de la asignación y persistencia de la
...               etiqueta Producto 2 ($0) en el SKU 7009251 cuando se activa
...               Chip 30 Prepago vía CAC. Flujo en BES, UPC y CRM: consulta
...               del catálogo de SKUs en UPC desde CAC, activación del Chip
...               30 con recuperación de la etiqueta Producto 2 en el flujo
...               de alta, validación del comprobante de venta con etiqueta y
...               precio, registro de trazabilidad en UPC y CRM asociada al
...               ICCID y MSISDN, y verificación de que la etiqueta Producto 2
...               ($0) no se confunde con Producto 1 ($15) en los reportes.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Particiones de equivalencia | Tipo: Funcional
...               Fase: UAT | Complejidad: media | BP: Purchase New Offer
...               Interfaz: CAC - BES - UPC - CRM
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver no disponible en este
...               entorno. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar La Asignación Y Persistencia De La Etiqueta Producto 2 $0 En El SKU 7009251 Cuando Se Activa Chip 30 Prepago Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5512345678
    When Se Consulta El Catálogo De SKUs En UPC Desde El Módulo CAC    7009251
    And Se Activa El Chip 30 Prepago Utilizando El SKU    7009251    700071780    8952050000123456789F
    And Se Genera El Comprobante De Venta Del Chip 30 Prepago Con La Etiqueta
    And Se Registra La Trazabilidad De La Etiqueta En UPC Y CRM    5512345678
    And Se Generan Los Reportes Diferenciados De Producto 1 Y Producto 2
    Then El Catálogo UPC Muestra El SKU Con La Etiqueta Visible    7009251    Producto 2    ${0}
    And BES Recupera La Etiqueta En El Flujo De Alta    Producto 2
    And El Comprobante Muestra La SIM Activada Con La Etiqueta Y Precio    Producto 2    ${0}
    And UPC Y CRM Almacenan La Etiqueta Asociada Al ICCID Y MSISDN
    And Los Reportes Diferencian Correctamente Producto 2 De Producto 1
