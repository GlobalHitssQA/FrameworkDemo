*** Settings ***
Documentation     TC025 - Consulta de desglose de cuotas de financiamiento semanal
...               en la pantalla 360 de BES vía CAC. Verifica el desglose de
...               cuotas cuando el asesor CAC consulta al cliente.
...               Proceso: Consulta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Casos de uso | Fase: UAT | Complejidad: media
...               Interfaz: BCService.QueryInstallment / queryInstallmentByIMEI
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver glibc incompatible con
...               Alpine/musl. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Desglose De Cuotas Del Financiamiento Semanal En La Pantalla 360 De BES Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Service Number    5598765432
    And Existe Un Financiamiento Semanal Activo Con Pagos    ${3}    SM    359876543210999
    When Se Accede A La Pantalla 360 De BES Para El Financiamiento Semanal
    And Se Invoca TelcelCustomService QueryInstallmentByIMEI    359876543210999
    And Se Invoca BCService QueryInstallment    CUS-5598765432
    Then El Acceso A La Pantalla 360 De BES Responde    ESB0
    And QueryInstallmentByIMEI Retorna La Información Del Plan
    And BCService QueryInstallment Retorna El Plan De Pago Completo
    And El Desglose De Cuotas En La Pantalla 360 Es Correcto
    And Los Campos De Crédito Semanal Son Consistentes    SM
