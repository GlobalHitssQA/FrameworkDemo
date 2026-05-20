*** Settings ***
Documentation     TC003 - Alta de Chip 30 Prepago (Prod 2 $0) con Offer ID
...               700071780 (Amigo Chip 30 Sin Límite) y PASL 30 precargado
...               vía CAC. Flujo E2E en BES y UPC: selección del SKU 7009251
...               con la oferta vigente, captura de datos del cliente Prepago
...               y asignación del ICCID de la SIM Universal Prod 2,
...               confirmación del alta con folio exitoso, aprovisionamiento
...               del PASL 30 precargado y validación del cobro $0 al cliente
...               final en el ticket del CAC.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Casos de uso | Tipo: Funcional
...               Fase: E2E | Complejidad: media | BP: Purchase New Offer
...               Interfaz: CAC - BES - UPC (PASL 30 precargado)
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver no disponible en este
...               entorno. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Alta Exitosa De Chip 30 Prepago Con Offer ID 700071780 Y Precarga Del PASL 30 En BES Y UPC Cuando El Alta Se Realiza Desde CAC Con SKU 7009251
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5512345678
    When Se Selecciona El Producto Chip 30 Prepago Con SKU Y Offer ID    7009251    700071780
    And Se Capturan Los Datos Del Cliente Prepago Y Se Asigna El ICCID De La SIM Universal Prod 2
    ...    CLIENTE PREPAGO CHIP30    CURP000000HDFAAA01    8952050000123456789F
    And Se Confirma El Alta Del Chip 30 Con La Oferta    700071780
    And Se Valida Que El PASL 30 Quedó Precargado Y Activo En La Línea
    And Se Genera El Ticket Del CAC Para El Chip 30 Prepago
    Then BES Muestra El Producto Chip 30 Con Precio Al Canal Y Oferta Seleccionable    ${0}    700071780
    And BES Valida Los Datos Del Cliente Y Acepta La Asignación Del ICCID
    And BES Genera El Folio De Alta Exitosa Y Dispara El Aprovisionamiento Del PASL 30    ESB0
    And La Línea Muestra El PASL 30 Activo Con Vigencia Y Beneficios
    And El Ticket Del CAC Muestra El Cobro Indicado Al Cliente Final    ${0}
