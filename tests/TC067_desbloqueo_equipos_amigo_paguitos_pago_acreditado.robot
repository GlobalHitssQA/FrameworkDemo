*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES ejecute el proceso de desbloqueo de equipos de Amigo Paguitos cuando se acredite el pago correspondiente
    [Tags]    PruebaGeneradaIA    Posventa    BES    GestionDesbloqueos    Funcional
    [Documentation]    Verificar que BES ejecute el proceso de desbloqueo de equipos de Amigo Paguitos
    ...                cuando se acredite el pago correspondiente. El sistema debe validar que no existan otras
    ...                parcialidades vencidas, enviar la solicitud a SITIC-Trustonic, recibir confirmación,
    ...                actualizar el estatus del equipo a activo, enviar notificación al cliente y registrar
    ...                el evento en el historial con trazabilidad completa.
    ...                Técnica ISTQB: Transición de estados
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES; Préstamo de Amigo Paguitos con equipo previamente bloqueado;
    ...                Pago acreditado en el sistema; Integración con SITIC-Trustonic activa
    Given se acredita el pago de parcialidad vencida en préstamo de Amigo Paguitos con equipo bloqueado
    When el sistema valida que el préstamo cumple las condiciones para desbloqueo del equipo
    And se ejecuta el proceso de desbloqueo del equipo en BES
    Then BES envía la solicitud de desbloqueo a la integración con SITIC-Trustonic
    And la API de SITIC-Trustonic confirma la ejecución del desbloqueo
    And el sistema actualiza el estatus del equipo a activo
    And BES envía notificación al cliente confirmando el desbloqueo del equipo
    And el evento de desbloqueo queda registrado en el historial del préstamo con trazabilidad completa

*** Keywords ***
Se acredita el pago de parcialidad vencida en préstamo de Amigo Paguitos con equipo bloqueado
    Se acredita pago de parcialidad vencida en préstamo bloqueado    PRESTAP456789    1    4500

El sistema valida que el préstamo cumple las condiciones para desbloqueo del equipo
    El sistema valida condiciones para desbloqueo del equipo    PRESTAP456789

Se ejecuta el proceso de desbloqueo del equipo en BES
    Se ejecuta proceso de desbloqueo del equipo    PRESTAP456789

BES envía la solicitud de desbloqueo a la integración con SITIC-Trustonic
    BES envía solicitud de desbloqueo a SITIC-Trustonic    PRESTAP456789    359111222333444

La API de SITIC-Trustonic confirma la ejecución del desbloqueo
    API SITIC-Trustonic confirma ejecución del desbloqueo    359111222333444

El sistema actualiza el estatus del equipo a activo
    El sistema actualiza estatus del equipo a activo    PRESTAP456789

BES envía notificación al cliente confirmando el desbloqueo del equipo
    BES envía notificación de desbloqueo exitoso al cliente    PRESTAP456789

El evento de desbloqueo queda registrado en el historial del préstamo con trazabilidad completa
    El evento de desbloqueo queda registrado en historial con trazabilidad    PRESTAP456789    Pago acreditado
