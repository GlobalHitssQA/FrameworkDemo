*** Settings ***
Documentation     TC 29 - Intento de alta de financiamiento con plazo no
...               disponible para ciclo semanal vía CAC. Valida el mensaje de
...               error retornado por BES.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Tabla de decisión | Tipo: Casos de error | Fase: UAT
...               # Locators pendientes de validación con app en vivo
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Validar Mensaje De Error En BES Al Intentar Alta De Financiamiento Con Plazo No Disponible Para Ciclo Semanal Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5598765432
    And La Clase De Crédito Está Configurada    SB
    When AP.AG Intenta Transferir A BES Préstamo Semanal Con Plazo No Disponible    ${7}
    Then BES Rechaza La Creación Del Préstamo Y Responde    ESB1
    And El Mensaje De Error Indica Plazo No Disponible
    And No Existe Préstamo Ni Calendario De Cobranza Asociado
