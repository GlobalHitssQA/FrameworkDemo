*** Settings ***
Documentation     TC016 - Cambio de SIM Prepago en CAC con cobro de $50. Flujo
...               E2E desde la solicitud hasta la confirmación en BES: captura
...               de solicitud con motivo distinto a robo/extravío, selección
...               de SIM Universal Prod 2 (SKU 7009251) y captura de ICCID,
...               cobro de $50 reflejado en la cuenta, actualización del ICCID
...               en perfil del suscriptor en BES y UPC, desactivación del
...               ICCID anterior en red/BES y validación de que el plan y los
...               beneficios vigentes no se ven afectados (regla 5).
...               Proceso: Cambio de SIM | Aplicación: BES | Vertical: PREPAGO
...               Técnica ISTQB: Casos de uso | Tipo: Funcional | Fase: UAT
...               Complejidad: media | BP: Suspend or Resume Subscriber
...               Interfaz: BES ESB - changeSIM
...               # Integración pendiente de validación con ESB BES-APAG en vivo
...               # Locators pendientes de validación con app en vivo
...               (Selenium no ejecutable: chromedriver no disponible en este
...               entorno. Login modelado con locators del proyecto existente.)
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Test Teardown     Cerrar Sesión CAC

*** Test Cases ***
Verificar El Flujo E2E De Cambio De SIM Prepago En BES Con Cobro De $50 Cuando Se Solicita Un Cambio En CAC Sin Robo Ni Extravío
    [Tags]    PruebaGeneradaIA
    Given El Asesor CAC Está Autenticado En Vista 360
    And El Cliente Prepago Activo Está Listo Para Cambio De SIM    5512345678    8952050000111111111F    AMIGO_SIN_LIMITE
    When Se Captura La Solicitud De Cambio De SIM Prepago Con Motivo    PREFERENCIA_USUARIO
    And Se Selecciona La SIM Universal Prod 2 Y Se Captura El ICCID    7009251    8952050000222222222F
    And Se Confirma El Cobro Y Se Procesa El Cambio De SIM En BES
    And Se Actualiza El ICCID En El Perfil Del Suscriptor En BES Y UPC
    And Se Desactiva El ICCID Anterior En Red Y BES
    And Se Verifica Que El Cambio No Afecta El Plan Vigente Del Cliente
    Then BES Acepta La Solicitud Y Muestra El Precio De Cambio De SIM    ${50}
    And BES Valida La Disponibilidad Del ICCID Y Registra La Asociación Al MSISDN
    And El Cobro Se Refleja En La Cuenta Y La Orden De Cambio Se Genera    ${50}
    And El Nuevo ICCID Queda Asociado Al MSISDN Y Aprovisionado En Red
    And La SIM Anterior Queda Desactivada Y El Nuevo ICCID Activo Para Tráfico
    And El Plan Y Los Beneficios Del Cliente No Se Ven Afectados    AMIGO_SIN_LIMITE
