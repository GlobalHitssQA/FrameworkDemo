*** Settings ***
Documentation     TC025 - Intento de alta de financiamiento con datos de cliente
...               incompletos enviados desde AP.AG hacia BES. BES detecta el
...               incumplimiento de obligatoriedad y responde ESB1 sin reintento,
...               sin crear préstamo ni registro parcial; el error se propaga a
...               AP.AG y la venta no se formaliza en BES.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Particiones de equivalencia | Tipo: Casos de error
...               Fase: UAT | Complejidad: baja | BP: Purchase New Offer
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
Verificar El Rechazo Del Alta De Financiamiento En BES Cuando AP.AG Envía Datos De Cliente Incompletos En El REQUEST
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    When AP.AG Formaliza La Venta Y Genera El REQUEST Con Datos De Cliente Incompletos    359876543210777    ${3}    ${3500}    SB
    And BES Recibe E Intenta Validar El Esquema Del Mensaje De Entrada
    Then BES Responde Error De Esquema Sin Reintento    ESB1
    And BES No Crea El Financiamiento Ni Genera Registro Parcial
    And La Respuesta De Error Se Propaga Hacia AP.AG Con Los Campos Faltantes    ESB1
