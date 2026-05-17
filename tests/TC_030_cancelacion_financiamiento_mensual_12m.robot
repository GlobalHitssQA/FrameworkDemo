*** Settings ***
Documentation     TC030 - Cancelación de financiamiento mensual 12 meses sin
...               parcialidades vencidas vía CAC. Verifica la cancelación en
...               BES cuando no existen parcialidades vencidas.
...               Proceso: Cancelación | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Tabla de decisión | Fase: UAT | Complejidad: media
...               Interfaz: APIsBES-APAG (cancelación de préstamo)
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver glibc incompatible con
...               Alpine/musl. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar La Cancelación Del Financiamiento Mensual A 12 Meses En BES Sin Parcialidades Vencidas Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por SubscriberId    SUB-5587654321
    And Existe Un Financiamiento Mensual Activo Sin Parcialidades Vencidas    ${12}    MP    SUB-5587654321
    When Se Inicia La Cancelación Del Financiamiento Mensual En BES
    And Se Procesa El Manejo De Saldo Y Parcialidades
    And Se Refleja La Cancelación En CPS Y Se Confirma El Estatus
    And Se Consulta La Pantalla 360 De BES Para El Financiamiento Cancelado
    Then BES Inicia La Cancelación Sin Parcialidades Vencidas
    And El Saldo Se Procesa Respetando Los Pagos Sin Penalización
    And CPS Refleja La Cancelación Y Los Charge Codes
    And El Estatus Del Financiamiento Cambia A Cancelado
    And La Pantalla 360 Muestra El Financiamiento Cancelado Con Trazabilidad
