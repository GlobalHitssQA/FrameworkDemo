*** Settings ***
Documentation     TC 33 - Consulta de información del crédito mensual 12 meses en
...               pantalla 360 BES vía CAC. Verifica el estatus del préstamo.
...               Proceso: Consulta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Transición de estados | Fase: UAT
...               # Locators pendientes de validación con app en vivo
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Estatus Del Préstamo En Pantalla 360 De BES Al Consultar Un Crédito Mensual 12 Meses Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5587654321
    And Existe Un Financiamiento Mensual Activo    ${12}    MP
    When Se Solicita La Consulta En La Pantalla 360 De BES
    And Se Invoca CustomerManagement GetSubscriberInfo
    Then La Pantalla 360 Muestra El Estatus Y El Ciclo De Cobro Mensual
    And La Clase De Crédito Mensual Y El Tipo De Proyecto Son Correctos    MP
    And El Estatus Mostrado Coincide Con El InstallmentStatus De BES
