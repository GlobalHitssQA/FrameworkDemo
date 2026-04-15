*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES administre y ejecute notificaciones de pago a clientes mediante integración con APIs de SITIC-Trustonic cuando se acerque la fecha de vencimiento
    [Tags]    PruebaGeneradaIA    Cobranza    BES    SITIC-Trustonic    Integral
    [Documentation]    Verificar que BES administre y ejecute notificaciones de pago a clientes mediante
    ...                integración con APIs de SITIC-Trustonic cuando se acerque la fecha de vencimiento.
    ...                BES debe configurar parámetros de notificación, identificar préstamos con fechas
    ...                próximas, invocar las APIs de SITIC-Trustonic, registrar logs completos y mantener
    ...                historial de todas las notificaciones enviadas con su estatus.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Integración con APIs de SITIC-Trustonic configurada y funcional;
    ...                Parámetros de notificaciones configurados en BES; Préstamos activos con fechas de
    ...                vencimiento próximas; Usuario autenticado con permisos de administración
    Given la configuración de notificaciones de pago está almacenada en BES
    When se crea un préstamo con fecha de vencimiento próxima dentro del periodo configurado
    Then BES ejecuta el proceso de identificación de préstamos con fechas de pago próximas
    And BES invoca las APIs de SITIC-Trustonic con la información del préstamo y cliente
    And el sistema registra el log de la notificación enviada incluyendo fecha, hora y estatus de envío
    And el historial de notificaciones del préstamo muestra todas las notificaciones enviadas al cliente con su estatus correspondiente

*** Keywords ***
La configuración de notificaciones de pago está almacenada en BES
    La configuración de notificaciones de pago está definida en BES    3    SMS    Recordatorio de pago próximo

Se crea un préstamo con fecha de vencimiento próxima dentro del periodo configurado
    Se crea un préstamo con fecha de vencimiento próxima dentro del periodo de notificación    ABC123456    50000    12    12    15.5    2026-04-18

BES ejecuta el proceso de identificación de préstamos con fechas de pago próximas
    BES ejecuta el proceso automático de identificación de préstamos con fechas de pago próximas    3

BES invoca las APIs de SITIC-Trustonic con la información del préstamo y cliente
    BES invoca las APIs de SITIC-Trustonic para enviar notificación de pago al cliente    PREST123456    ABC123456

El sistema registra el log de la notificación enviada incluyendo fecha, hora y estatus de envío
    BES registra el log de la notificación enviada con todos los datos de la transacción    PREST123456

El historial de notificaciones del préstamo muestra todas las notificaciones enviadas al cliente con su estatus correspondiente
    El historial de notificaciones muestra todas las notificaciones enviadas al cliente con estatus correspondiente    PREST123456
