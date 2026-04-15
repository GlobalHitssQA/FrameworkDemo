*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES administre y ejecute habilitaciones de equipos mediante APIs de SITIC-Trustonic cuando el cliente regularice sus pagos después de una inhabilitación
    [Tags]    PruebaGeneradaIA    Cobranza    BES    Habilitacion    SITIC    Trustonic    Integral
    [Documentation]    Verificar que BES administre y ejecute habilitaciones de equipos mediante APIs de SITIC-Trustonic
    ...                cuando el cliente regularice sus pagos después de una inhabilitación, actualizando el estatus
    ...                del préstamo y registrando la habilitación en el historial visible en la pantalla 360.
    ...                Técnica ISTQB: Transición de estados
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Preconditions: Integración con APIs de SITIC-Trustonic funcional; Préstamo con equipo previamente
    ...                inhabilitado existente en BES; Pagos de regularización registrados en el sistema; Usuario autenticado con permisos de consulta
    Given existe un préstamo con equipo previamente inhabilitado por incumplimiento de pago
    When se registran los pagos de regularización que originaron la inhabilitación
    And se ejecuta el proceso de evaluación de habilitaciones en BES
    Then BES identifica que el préstamo ha regularizado los pagos y califica para habilitación
    And BES invoca automáticamente las APIs de SITIC-Trustonic para ejecutar la habilitación del equipo
    And BES actualiza el estatus del préstamo indicando que el equipo ha sido habilitado
    And el historial de habilitaciones muestra el registro con todos los datos de la transacción
    And el equipo queda desbloqueado y funcional para su uso normal

*** Keywords ***
Existe un préstamo con equipo previamente inhabilitado por incumplimiento de pago
    Consultar préstamo con equipo inhabilitado    referencia_prestamo=PREST111222    identificacion=CLI111222

Se registran los pagos de regularización que originaron la inhabilitación
    Registrar pagos de parcialidades vencidas para regularización    referencia_prestamo=PREST111222    numero_parcialidad=1    monto=4500

Se ejecuta el proceso de evaluación de habilitaciones en BES
    Ejecutar proceso de evaluación de habilitaciones en BES

BES identifica que el préstamo ha regularizado los pagos y califica para habilitación
    Verificar identificación de préstamos que califican para habilitación

BES invoca automáticamente las APIs de SITIC-Trustonic para ejecutar la habilitación del equipo
    Verificar invocación de APIs SITIC-Trustonic para habilitación de equipo    referencia_prestamo=PREST111222    imei=359123456789012

BES actualiza el estatus del préstamo indicando que el equipo ha sido habilitado
    Verificar actualización de estatus del préstamo a equipo habilitado    referencia_prestamo=PREST111222

El historial de habilitaciones muestra el registro con todos los datos de la transacción
    Consultar historial de habilitaciones en pantalla 360    referencia_prestamo=PREST111222
    Verificar registro de habilitación en historial    motivo=Regularización de pagos    estatus=Habilitado

El equipo queda desbloqueado y funcional para su uso normal
    Verificar equipo desbloqueado en sistema SITIC-Trustonic    imei=359123456789012
