*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES administre y ejecute inhabilitaciones de equipos mediante APIs de SITIC-Trustonic cuando el cliente incumpla con los pagos programados
    [Tags]    PruebaGeneradaIA    Cobranza    BES    Inhabilitacion    SITIC    Trustonic    Integral
    [Documentation]    Verificar que BES administre y ejecute inhabilitaciones de equipos mediante APIs de SITIC-Trustonic
    ...                cuando el cliente incumpla con los pagos programados, actualizando el estatus del préstamo
    ...                y registrando la inhabilitación en el historial del cliente visible en la pantalla 360.
    ...                Técnica ISTQB: Transición de estados
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Preconditions: Integración con APIs de SITIC-Trustonic funcional; Reglas de inhabilitación configuradas en BES;
    ...                Préstamo con pagos vencidos registrado en el sistema; Equipo activo y enrolado en el sistema de bloqueo
    Given las reglas de inhabilitación están configuradas en BES con criterios específicos
    And existe un préstamo con pagos vencidos que cumple los criterios de inhabilitación
    When se ejecuta el proceso de evaluación de inhabilitaciones en BES
    Then BES identifica los préstamos que cumplen criterios para inhabilitación del equipo
    And BES invoca las APIs de SITIC-Trustonic para inhabilitar el equipo asociado al préstamo
    And BES actualiza el estatus del préstamo indicando que el equipo ha sido inhabilitado
    And el historial de inhabilitaciones muestra el registro con fecha, hora, motivo y estatus de la operación
    And el equipo queda bloqueado para su uso sin permitir llamadas ni acceso a servicios móviles

*** Keywords ***
Las reglas de inhabilitación están configuradas en BES con criterios específicos
    Configurar reglas de inhabilitación en BES    dias_atraso=30    intentos_notificacion=3

Existe un préstamo con pagos vencidos que cumple los criterios de inhabilitación
    Crear préstamo con pagos vencidos que cumple criterios de inhabilitación    referencia_prestamo=PREST999888    identificacion=CLI999888    dias_vencido=35

Se ejecuta el proceso de evaluación de inhabilitaciones en BES
    Ejecutar proceso de evaluación de inhabilitaciones en BES

BES identifica los préstamos que cumplen criterios para inhabilitación del equipo
    Verificar identificación de préstamos que cumplen criterios de inhabilitación

BES invoca las APIs de SITIC-Trustonic para inhabilitar el equipo asociado al préstamo
    Verificar invocación de APIs SITIC-Trustonic para inhabilitación de equipo    referencia_prestamo=PREST999888    imei=359876543210987

BES actualiza el estatus del préstamo indicando que el equipo ha sido inhabilitado
    Verificar actualización de estatus del préstamo a equipo inhabilitado    referencia_prestamo=PREST999888

El historial de inhabilitaciones muestra el registro con fecha, hora, motivo y estatus de la operación
    Consultar historial de inhabilitaciones en pantalla 360    referencia_prestamo=PREST999888
    Verificar registro de inhabilitación en historial    motivo=Incumplimiento de pago    estatus=Inhabilitado

El equipo queda bloqueado para su uso sin permitir llamadas ni acceso a servicios móviles
    Verificar equipo bloqueado en sistema SITIC-Trustonic    imei=359876543210987
