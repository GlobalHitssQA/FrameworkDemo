*** Settings ***
Documentation     TC001 - Alta de financiamiento Semanal plazo 3 meses clase SB en
...               BES vía AP.AG desde CAC. AP.AG formaliza la venta y transfiere
...               la información vía API; BES valida esquema (ESB0), BES-CRM valida
...               la correspondencia ciclo/plazo/clase y crea el préstamo Activo.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Casos de uso | Tipo: Funcional | Fase: UAT
...               Complejidad: media | BP: Purchase New Offer
...               Interfaz: API de creación de préstamo BES (PAC-Equlaity / AP.AG)
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver glibc incompatible con
...               Alpine/musl. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Alta De Financiamiento Semanal A 3 Meses Clase SB En BES Cuando AP.AG Transfiere La Información Vía API Desde CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Service Number    5512345678
    When AP.AG Formaliza La Venta Y El Financiamiento Semanal    5512345678    359876543210123    ${3}    SB    ${3500}
    And AP.AG Dispara La Transferencia De Creación De Préstamo Hacia BES
    And Se Consulta El Financiamiento En La Pantalla 360 De BES Desde CAC
    Then BES Recibe Valida El Esquema Y Responde Sin Reintento    ESB0
    And BES-CRM Valida La Correspondencia Del Ciclo Semanal Plazo Y Clase De Crédito    SB    ${3}
    And El Préstamo Queda Registrado Con Desglose De Cuotas Y Calendario De Cobranza
    And La Pantalla 360 Despliega Datos Del Cliente Cuotas Y Estatus
