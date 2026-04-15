*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES habilite automáticamente los equipos previamente inhabilitados mediante integración con SITIC-Trustonic cuando el cliente regulariza sus pagos vencidos
    [Tags]    PruebaGeneradaIA    Cobranza    BES    Funcional    SITIC-Trustonic
    [Documentation]    Verificar que BES habilite automáticamente los equipos previamente inhabilitados
    ...                mediante integración con SITIC-Trustonic cuando el cliente regulariza sus pagos vencidos.
    ...                El sistema debe partir de un equipo inhabilitado por incumplimiento de pago asociado a un
    ...                préstamo en BES, mostrando el préstamo en estatus Vencido o En Mora y el equipo en estatus
    ...                Inhabilitado. Al registrar el pago de la parcialidad vencida a través de puntos de cobro
    ...                (SICATEL, Kioskos u OXXO) con integración a CPS, BES debe recibir la notificación de pago
    ...                desde CPS y acreditar el pago a la parcialidad vencida actualizando el saldo del préstamo.
    ...                BES debe cambiar el estatus del préstamo de Vencido o En Mora a Activo o Al Corriente según
    ...                corresponda, ejecutar la integración con las APIs de SITIC-Trustonic para habilitar el equipo
    ...                asociado al financiamiento ahora regularizado, mostrar el equipo en estatus Habilitado con
    ...                fecha y hora de la acción ejecutada, y el equipo debe quedar desbloqueado mediante la solución
    ...                SITIC-Trustonic permitiendo su uso normal por parte del cliente. Finalmente BES debe enviar
    ...                notificación automática al cliente informando que su equipo ha sido habilitado y puede usarlo
    ...                normalmente.
    ...                Técnica ISTQB: Transición de estados
    ...                Complejidad: Alta
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: BES integrado con SITIC-Trustonic mediante APIs; BES integrado con CPS para conocer
    ...                pagos; Equipo previamente inhabilitado por incumplimiento de pago; Usuario autenticado con permisos
    ...                de consulta
    Given existe un préstamo en BES con estatus Vencido o En Mora y equipo Inhabilitado por incumplimiento de pago
    When se registra el pago de la parcialidad vencida a través de puntos de cobro integrados con CPS
    And BES recibe la notificación de pago desde CPS y acredita el pago a la parcialidad vencida
    And BES actualiza el estatus del préstamo al regularizarse el pago
    And BES ejecuta el proceso automático de habilitación de equipo al cumplirse la regularización de pagos
    Then BES muestra el equipo en estatus Habilitado con fecha y hora de la acción ejecutada
    And el equipo queda desbloqueado mediante SITIC-Trustonic permitiendo su uso normal
    And BES envía notificación al cliente confirmando la habilitación del equipo tras regularización de pago

*** Keywords ***
Existe un préstamo en BES con estatus Vencido o En Mora y equipo Inhabilitado por incumplimiento de pago
    Existe un préstamo vencido con equipo inhabilitado en BES    PREST999888    359876543210987    ABC123456

Se registra el pago de la parcialidad vencida a través de puntos de cobro integrados con CPS
    Se procesa pago de parcialidad vencida desde punto de cobro SICATEL    PREST999888    1    4500    ABC123456

BES recibe la notificación de pago desde CPS y acredita el pago a la parcialidad vencida
    BES recibe notificación de pago de parcialidad desde CPS    PREST999888    1    4500
    BES acredita el pago a la parcialidad vencida actualizando el saldo    PREST999888    1    4500

BES actualiza el estatus del préstamo al regularizarse el pago
    BES actualiza estatus del préstamo a Activo o Al Corriente    PREST999888

BES ejecuta el proceso automático de habilitación de equipo al cumplirse la regularización de pagos
    BES ejecuta proceso automático de habilitación mediante APIs SITIC-Trustonic    PREST999888    359876543210987

BES muestra el equipo en estatus Habilitado con fecha y hora de la acción ejecutada
    BES muestra equipo en estatus Habilitado con fecha y hora    359876543210987

El equipo queda desbloqueado mediante SITIC-Trustonic permitiendo su uso normal
    El equipo queda desbloqueado y habilitado para uso normal    359876543210987

BES envía notificación al cliente confirmando la habilitación del equipo tras regularización de pago
    BES envía notificación de habilitación al cliente    ABC123456    359876543210987
