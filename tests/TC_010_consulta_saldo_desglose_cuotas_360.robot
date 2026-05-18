*** Settings ***
Documentation     TC010 - Consulta de saldo y desglose de cuotas de un
...               financiamiento activo en la Vista 360 de BES desde CAC.
...               Verifica saldo vigente, monto financiado, monto pagado y el
...               desglose de cuotas, validando consistencia con AP.AG.
...               Proceso: Consulta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Casos de uso | Tipo: Funcional | Fase: UAT
...               Complejidad: baja | Legado: BES CRM POSVENTA
...               Interfaz: API de consulta de saldos / información del préstamo BES
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver glibc incompatible con
...               Alpine/musl. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar La Consulta De Saldo Y Desglose De Cuotas En La Pantalla 360 De BES Cuando Existe Un Financiamiento Activo Consultado Desde CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Service Number    5598765432
    And Existe Un Financiamiento Activo Transferido Desde AP.AG    5598765432    359876543210999    ${3}    SM    ${4500}    ${500}
    When Se Busca Al Cliente Y Se Abre La Pantalla 360 De BES Desde CAC
    And Se Consulta El Saldo Vigente Del Financiamiento
    And Se Consulta El Desglose De Cuotas Del Financiamiento
    Then La Información General Del Crédito Se Despliega En La Pantalla 360
    And El Saldo El Monto Financiado Y El Monto Pagado Son Correctos
    And El Desglose Muestra Número Importe Fechas Y Estatus
    And Los Datos Son Consistentes Con La Información Transferida Por AP.AG
