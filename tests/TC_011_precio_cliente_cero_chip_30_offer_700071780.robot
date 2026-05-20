*** Settings ***
Documentation     TC011 - Validación del precio a cliente final $0 en la
...               activación del Chip 30 Prepago (Prod 2, SKU 7009251) con
...               Offer ID 700071780 (Amigo Chip 30 Sin Límite) vía CAC.
...               Flujo en BES y UPC: inicio del alta con visualización del
...               precio al cliente $0 en pantalla, captura de datos del
...               cliente y confirmación del alta, generación del ticket del
...               CAC con cobro $0 al cliente final, validación cruzada del
...               precio en UPC sin diferencias y verificación de que no se
...               afectaron precios de otras ofertas Prepago existentes.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Valores límite | Tipo: Funcional
...               Fase: UAT | Complejidad: media | BP: Purchase New Offer
...               Interfaz: CAC - BES - UPC
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver no disponible en este
...               entorno. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Precio A Cliente Final $0 En El Ticket Del CAC Y En UPC Cuando Se Activa Chip 30 Prepago Con Offer ID 700071780
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5512345678
    When Se Inicia El Alta Del Chip 30 Prepago Con SKU Y Offer    7009251    700071780
    And Se Procesa El Alta Del Chip 30 Y Se Genera El Comprobante De Venta
    ...    CLIENTE PREPAGO CHIP30    CURP000000HDFAAA01    8952050000123456789F    700071780
    And Se Consulta En UPC El Precio De La Oferta Chip 30 Prepago    700071780    ${0}
    And Se Verifica Que No Se Afectaron Precios De Otras Ofertas Prepago
    Then La Pantalla Inicial Del Chip 30 Muestra El Precio Al Cliente Final    ${0}
    And El Ticket Del CAC Muestra El Cobro Indicado Al Cliente Final    ${0}
    And UPC Confirma El Precio Al Cliente Alineado Al Ticket Del CAC
    And Las Demás Ofertas Prepago Mantienen Sus Precios Originales Sin Alteración
