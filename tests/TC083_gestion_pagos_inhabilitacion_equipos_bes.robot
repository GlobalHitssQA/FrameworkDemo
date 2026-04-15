*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES gestione el incumplimiento de pagos ejecutando la inhabilitación de equipos mediante integración con SITIC-Trustonic cuando un cliente no realiza el pago de parcialidades en tiempo
    [Tags]    PruebaGeneradaIA    Funcional    BES    SITIC    Trustonic    Cobranza
    [Documentation]    Verificar que BES gestione el incumplimiento de pagos ejecutando la inhabilitación de equipos
    ...                mediante integración con SITIC-Trustonic cuando un cliente no realiza el pago de
    ...                parcialidades en tiempo.
    ...                Técnica ISTQB: Transición de estados
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: BES integrado con SITIC-Trustonic mediante APIs; Préstamo activo con calendario
    ...                de cobranza configurado; Usuario autenticado con permisos de administración; Configuración de
    ...                periodos de gracia y políticas de inhabilitación definidas
    Given se configura un préstamo activo en BES con calendario de cobranza
    When se simula el vencimiento de una parcialidad sin pago del cliente
    And BES identifica el incumplimiento de pago al superar la fecha de vencimiento
    And BES ejecuta el proceso de notificación de pago vencido al cliente
    And se ejecuta el proceso de inhabilitación cuando se cumple el periodo de gracia
    Then BES ejecuta la integración con SITIC-Trustonic para inhabilitar el equipo
    And el préstamo se muestra en estatus Vencido o En Mora con equipo Inhabilitado
    And el equipo queda bloqueado impidiendo su uso hasta regularización del pago

*** Keywords ***
Se configura un préstamo activo en BES con calendario de cobranza
    Configurar préstamo activo en BES con calendario de cobranza    PREST999001    CLI999001    mensual    50000    12    12    15.5    2026-04-15

Se simula el vencimiento de una parcialidad sin pago del cliente
    Simular vencimiento de parcialidad sin pago    PREST999001    1    2026-05-15

BES identifica el incumplimiento de pago al superar la fecha de vencimiento
    BES identifica incumplimiento de pago por parcialidad vencida    PREST999001    1

BES ejecuta el proceso de notificación de pago vencido al cliente
    BES envía notificación de pago vencido al cliente    PREST999001    CLI999001    1

Se ejecuta el proceso de inhabilitación cuando se cumple el periodo de gracia
    Configurar reglas de inhabilitación por incumplimiento de pago    30    7
    Simular transcurso del periodo de gracia configurado    PREST999001    35

BES ejecuta la integración con SITIC-Trustonic para inhabilitar el equipo
    BES ejecuta integración con APIs SITIC-Trustonic para inhabilitar equipo    PREST999001    359876543210987

El préstamo se muestra en estatus Vencido o En Mora con equipo Inhabilitado
    Consultar estatus del préstamo y del equipo después de inhabilitación    PREST999001    359876543210987

El equipo queda bloqueado impidiendo su uso hasta regularización del pago
    Verificar equipo bloqueado mediante SITIC-Trustonic impidiendo su uso    359876543210987
