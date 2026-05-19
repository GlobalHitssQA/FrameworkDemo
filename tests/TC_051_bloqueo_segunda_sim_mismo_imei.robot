*** Settings ***
Documentation     TC051 - Verificar que el sistema bloquea la facturación de
...               más de una SIM por el mismo IMEI en CAC Prepago. Se consulta
...               el histórico del IMEI Telcel válido con una SIM Amigo Kit ya
...               facturada; al intentar activar y facturar una segunda SIM
...               Amigo Kit (SKU 7009251) con el mismo IMEI, BES aplica la
...               regla "Solo se podrá facturar 1 SIM por Equipo", bloquea la
...               operación, muestra la notificación de IMEI ya asociado y la
...               SIM original conserva la asociación sin alteraciones.
...               Proceso: Alta | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Tabla de decisión | Tipo: Casos de error
...               Fase: UAT | Complejidad: baja | BP: Purchase New Offer
...               Interfaz: BES ESB - newSubscriber
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver no disponible en este
...               entorno. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Bloqueo En BES Cuando Se Intenta Facturar Una Segunda SIM Con El Mismo IMEI Ya Asociado A Una SIM Previamente Activada En CAC Prepago
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And Existe Un IMEI Con Una SIM Amigo Kit Ya Facturada    359876543210555    8952050000333333333F    7009251
    When Se Consulta El Histórico De SIMs Asociadas Al IMEI    359876543210555
    And Se Intenta Activar Y Facturar Una Segunda SIM Amigo Kit Con El Mismo IMEI    359876543210555    8952050000444444444F    7009251
    Then El Sistema Muestra Una SIM Amigo Kit Ya Asociada Y Facturada Al IMEI
    And El Sistema Bloquea La Operación Por La Regla De 1 SIM Por IMEI
    And El Sistema Muestra Notificación De IMEI Ya Asociado A SIM Previa
    And El Registro Original Conserva La Asociación SIM IMEI Sin Alteraciones
