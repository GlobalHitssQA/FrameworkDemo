*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES administre completamente el ciclo de vida del financiamiento desde su creación hasta su liquidación
    [Tags]    PruebaGeneradaIA    BES    Postventa    CicloVida    Integral
    [Documentation]    Verificar que BES administra completamente el ciclo de vida del financiamiento desde su creación
    ...                hasta su liquidación cuando un préstamo es transferido desde Amigo Paguitos.
    ...                Técnica ISTQB: Transición de estados
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: BES integrado con AP.AG mediante APIs; BES integrado con CPS para conocer pagos;
    ...                BES integrado con SITIC-Trustonic para gestión de equipos; Usuario autenticado con permisos de consulta
    Given BES ha recibido la transferencia de información completa del préstamo formalizado desde AP.AG
    When se consulta el calendario de cobranza del financiamiento en BES
    Then BES muestra el calendario de cobranza completo con todas las parcialidades
    When se registra el pago de una parcialidad a través de punto de cobro SICATEL integrado con CPS
    Then BES recibe la notificación de pago desde CPS y actualiza el saldo del préstamo
    And el pago queda reflejado como acreditado en el calendario de cobranza
    When se ejecuta el proceso de notificación de pago al cliente cuando se acerca la fecha de vencimiento
    Then BES ejecuta automáticamente el envío de notificaciones de recordatorio de pago al cliente
    When se liquida completamente el financiamiento con el último pago
    Then BES actualiza el estatus del préstamo a Liquidado
    And BES ejecuta el proceso de liberación del equipo mediante integración con APIs de SITIC-Trustonic
    When se consulta el historial completo del financiamiento desde su creación hasta su liquidación
    Then BES despliega el historial completo del préstamo con todas las transacciones y eventos del ciclo de vida

*** Keywords ***
BES ha recibido la transferencia de información completa del préstamo formalizado desde AP.AG
    El préstamo ha sido transferido desde Amigo Paguitos hacia BES con información completa    ABC123456    Juan Pérez    Calle Principal 123    5551234567    50000    12    12    15.5    2026-04-15

Se consulta el calendario de cobranza del financiamiento en BES
    Se consulta calendario de cobranza del financiamiento en BES    ABC123456

BES muestra el calendario de cobranza completo con todas las parcialidades
    BES muestra calendario completo con fechas de vencimiento y montos de parcialidades    12

Se registra el pago de una parcialidad a través de punto de cobro SICATEL integrado con CPS
    Se registra pago de parcialidad mediante SICATEL integrado con CPS    PREST123456    1    4166.67    ABC123456    TRX001

BES recibe la notificación de pago desde CPS y actualiza el saldo del préstamo
    BES recibe notificación de pago desde CPS y actualiza saldo    PREST123456    1    4166.67    2026-04-18

El pago queda reflejado como acreditado en el calendario de cobranza
    El pago queda acreditado en calendario de cobranza    1    2026-04-18    4166.67

Se ejecuta el proceso de notificación de pago al cliente cuando se acerca la fecha de vencimiento
    Se ejecuta proceso automático de notificación de recordatorio de pago    ABC123456    PREST123456

BES ejecuta automáticamente el envío de notificaciones de recordatorio de pago al cliente
    BES ejecuta envío automático de notificaciones mediante SITIC-Trustonic    PREST123456    ABC123456

Se liquida completamente el financiamiento con el último pago
    Se liquida totalmente el financiamiento registrando último pago    ABC123456    PREST123456    4166.67

BES actualiza el estatus del préstamo a Liquidado
    BES actualiza estatus del préstamo a Liquidado con fecha de liquidación    PREST123456

BES ejecuta el proceso de liberación del equipo mediante integración con APIs de SITIC-Trustonic
    BES ejecuta liberación definitiva del equipo mediante APIs SITIC-Trustonic    123456789012345    PREST123456

Se consulta el historial completo del financiamiento desde su creación hasta su liquidación
    Se consulta historial completo del préstamo desde creación hasta liquidación    ABC123456    PREST123456

BES despliega el historial completo del préstamo con todas las transacciones y eventos del ciclo de vida
    BES despliega historial completo con transacciones pagos notificaciones cambios de estatus y eventos    PREST123456
