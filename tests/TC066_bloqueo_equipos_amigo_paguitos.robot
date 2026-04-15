*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES ejecute el proceso de bloqueo de equipos de Amigo Paguitos cuando se detecte incumplimiento de pago
    [Tags]    PruebaGeneradaIA    Posventa    BES    GestionBloqueos    Funcional
    [Documentation]    Verificar que BES ejecute el proceso de bloqueo de equipos de Amigo Paguitos
    ...                cuando se detecte incumplimiento de pago según el calendario de cobranza.
    ...                Técnica ISTQB: Transición de estados
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado en BES; Préstamo de Amigo Paguitos activo con pagos vencidos;
    ...                Integración con SITIC-Trustonic configurada y activa; Calendario de cobranza administrado por BES
    Given se identifica préstamo de Amigo Paguitos con incumplimiento de pago según calendario de cobranza
    When el sistema ejecuta el proceso de bloqueo y envía solicitud a SITIC-Trustonic
    Then BES recibe confirmación de bloqueo desde API SITIC-Trustonic
    And el sistema envía notificación al cliente sobre el bloqueo del equipo
    And el evento de bloqueo queda registrado en el historial con trazabilidad completa

*** Keywords ***
Se identifica préstamo de Amigo Paguitos con incumplimiento de pago según calendario de cobranza
    Se identifica préstamo de Amigo Paguitos con incumplimiento de pago según calendario de cobranza    PRESTAP123456

El sistema ejecuta el proceso de bloqueo y envía solicitud a SITIC-Trustonic
    El sistema ejecuta el proceso de bloqueo y envía solicitud a SITIC-Trustonic    PRESTAP123456    359876543210987

BES recibe confirmación de bloqueo desde API SITIC-Trustonic
    BES recibe confirmación de bloqueo desde API SITIC-Trustonic    PRESTAP123456    359876543210987

El sistema envía notificación al cliente sobre el bloqueo del equipo
    El sistema envía notificación al cliente sobre el bloqueo del equipo    PRESTAP123456

El evento de bloqueo queda registrado en el historial con trazabilidad completa
    El evento de bloqueo queda registrado en el historial con trazabilidad completa    PRESTAP123456    Incumplimiento de pago
