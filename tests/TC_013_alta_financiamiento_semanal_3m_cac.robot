*** Settings ***
Documentation     TC013 - Alta de financiamiento semanal plazo 3 meses vía CAC.
...               Verifica el alta del financiamiento semanal a 3 meses en BES
...               vía CAC cuando el cliente prepago es elegible.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Valores límite | Fase: UAT | Complejidad: media
...               Interfaz: APIsBES-APAG (creación de préstamo)
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver glibc incompatible con
...               Alpine/musl. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Alta De Financiamiento Semanal A 3 Meses En BES Vía CAC Cuando El Cliente Es Elegible
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Está Localizado Por Service Number    5512345678
    When Se Captura La Solicitud De Financiamiento Semanal A 3 Meses    5512345678    359876543210123    ${3}    ${3500}    SB
    And Se Envía La Solicitud De Creación De Préstamo Semanal A BES    SB
    And Se Consulta La Pantalla 360 De BES Para El Financiamiento Semanal
    Then BES Crea El Préstamo Semanal Y Responde    ESB0
    And El Calendario De Cobranza Y Las Parcialidades Semanales Son Correctos
    And El Plazo Semanal Y El Monto De Parcialidad Corresponden A La Clase De Crédito    SB    ${3}
    And La Pantalla 360 Muestra Los Datos Del Financiamiento Semanal Consistentes
