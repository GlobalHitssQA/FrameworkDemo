*** Settings ***
Documentation     TC050 - Validación del cobro de $50 al cliente en BES cuando
...               se realiza un Cambio de SIM Prepago estándar vía CAC. Flujo:
...               ingreso al módulo de Cambio de SIM Prepago en BES CRM desde
...               el canal CAC, captura del número de línea y validación de
...               elegibilidad, captura del ICCID de la SIM Universal nueva y
...               motivo de cambio estándar, consulta del precio al cliente
...               final calculado por BES conforme al cuadro 1 ($50),
...               confirmación del cambio de SIM, generación del ticket con el
...               cobro y actualización del ICCID en la línea del cliente.
...               Proceso: Cancelación | Aplicación: BES CRM | Vertical: PREPAGO
...               Técnica ISTQB: Valores límite | Tipo: Funcional
...               Fase: UAT | Complejidad: media | BP: BES
...               Área: Activaciones / Facturación
...               Legado: BES CRM POSVENTA
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
Verificar El Cobro De $50 Al Cliente En BES Cuando Se Realiza Un Cambio De SIM Prepago Estándar Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Activo Está Listo Para Cambio De SIM    5512345678    8952050000111111111F    AMIGO_SIN_LIMITE
    When Se Ingresa Al Modulo De Cambio De SIM Prepago Desde El Canal CAC
    And Se Captura El Numero De Linea Y Se Valida Elegibilidad    5512345678
    And Se Captura El ICCID Nuevo Y Motivo Estandar De Cambio De SIM    8952050000222222222F    PREFERENCIA_USUARIO
    And Se Consulta El Precio Cobrado Al Cliente Final Por El Cambio De SIM
    And Se Confirma El Cambio De SIM Y Se Genera El Ticket Cambio SIM
    Then BES Despliega El Flujo De Cambio De SIM Prepago Con El Catalogo De Precios
    And BES Confirma Elegibilidad De La Linea Para Cambio De SIM
    And BES Asocia La Nueva SIM A La Linea Y Calcula Precio Al Cliente Cambio SIM
    And BES Devuelve El Precio Final Al Cliente Por El Cambio De SIM    ${50}
    And El Ticket Muestra El Cobro Y BES Actualiza El ICCID De La Linea    ${50}
