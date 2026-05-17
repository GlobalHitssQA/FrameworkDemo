*** Settings ***
Documentation     TC 25 - Alta de financiamiento mensual plazo 3 meses cliente
...               nuevo vía CAC. Verifica el monto de enganche registrado en BES.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Valores límite | Fase: UAT
...               # Locators pendientes de validación con app en vivo
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Monto De Enganche Registrado En BES Para Financiamiento Mensual 3 Meses Cliente Nuevo Vía CAC
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Número Telefónico    5512345678
    And La Clase De Crédito Está Configurada    MP
    And La Venta Está Formalizada En AP.AG Con Factura SAP    SAP-0009001
    When AP.AG Transfiere A BES El Préstamo Mensual    ${3}    ${500}    SAP-0009001
    And Se Consulta La Factura Mediante ARService QueryInvoice    5512345678
    Then BES Crea El Préstamo Y Responde    ESB0
    And El Enganche Y El Monto A Financiar Quedan Registrados Correctamente
    And El Cálculo De Cuotas Mensuales Es Correcto
    And ARService QueryInvoice Devuelve Datos Consistentes Con El Enganche
    And El Monto De Enganche En Pantalla 360 Coincide Con BES
