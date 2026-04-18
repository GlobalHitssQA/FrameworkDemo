*** Settings ***
Documentation    Caso de prueba ID 31: Validación de inhabilitación de equipos por falta de pago
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Gestión de Pagos e Inhabilitación de Equipos
...              Escenario: Verificar inhabilitación de equipos en BES cuando el cliente Amigo Paguitos
...              no realiza pagos de parcialidades
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Cliente con financiamiento activo en Amigo Paguitos
...              - Equipo previamente habilitado
...              - Integración con SITIC-Trustonic disponible
...
...              Técnica ISTQB: Transición de estados
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con parcialidades vencidas
${NUMERO_TELEFONICO_CLIENTE}    5512345678
${IMEI_EQUIPO}                  123456789012345

*** Test Cases ***
Validación De Inhabilitación De Equipos Por Falta De Pago
    [Documentation]    Este caso de prueba verifica la inhabilitación de equipos en BES cuando
    ...                el cliente Amigo Paguitos no realiza pagos de parcialidades. Se valida que
    ...                al existir parcialidades vencidas, el proceso de inhabilitación se ejecute
    ...                correctamente a través de las APIs de SITIC-Trustonic y que el equipo quede
    ...                efectivamente bloqueado con el financiamiento marcado con collectionProcessFlag activo.
    ...
    ...                Pasos:
    ...                1. Consultar información del cliente con financiamiento activo mediante el servicio PACPagosService
    ...                2. Verificar que existen parcialidades vencidas sin pago en el calendario de cobranza
    ...                3. Ejecutar proceso de inhabilitación del equipo a través de las APIs de SITIC-Trustonic
    ...                4. Consultar nuevamente el estado del equipo IMEI asociado al cliente
    ...
    ...                Verificaciones:
    ...                - El sistema devuelve información del cliente incluyendo installmentPlanInstId, status y parcialidades
    ...                - El sistema muestra parcialidades con status vencido y unpaidAmount mayor a cero
    ...                - El sistema envía notificación de inhabilitación y el equipo queda bloqueado
    ...                - El sistema muestra el equipo inhabilitado y el financiamiento con collectionProcessFlag activo
    [Tags]    PruebaGeneradaIA    Funcional    BES    AdministracionCredito    Inhabilitacion    Low

    # GIVEN: Usuario ha iniciado sesión en BES con credenciales válidas
    Dado que el usuario ha iniciado sesión en BES con credenciales válidas

    # WHEN: Consulta información del cliente con financiamiento activo mediante el servicio PACPagosService con número telefónico
    Cuando consulta información del cliente con financiamiento activo mediante número telefónico
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El sistema devuelve información del cliente incluyendo installmentPlanInstId, status del plan y estado de parcialidades
    Entonces el sistema devuelve información del cliente incluyendo installmentPlanInstId y parcialidades

    # WHEN: Verifica que existen parcialidades vencidas sin pago en el calendario de cobranza
    Cuando verifica que existen parcialidades vencidas sin pago en el calendario

    # THEN: El sistema muestra parcialidades con status vencido y unpaidAmount mayor a cero
    Entonces el sistema muestra parcialidades con status vencido y unpaidAmount mayor a cero

    # WHEN: Ejecuta proceso de inhabilitación del equipo a través de las APIs de SITIC-Trustonic
    Cuando ejecuta proceso de inhabilitación del equipo mediante SITIC Trustonic
    ...    ${IMEI_EQUIPO}

    # THEN: El sistema envía notificación de inhabilitación y el equipo queda bloqueado
    Entonces el sistema envía notificación de inhabilitación y el equipo queda bloqueado
    ...    ${IMEI_EQUIPO}

    # WHEN: Consulta nuevamente el estado del equipo IMEI asociado al cliente
    Cuando consulta nuevamente el estado del equipo IMEI asociado al cliente
    ...    ${IMEI_EQUIPO}

    # THEN: El sistema muestra el equipo inhabilitado y el financiamiento con collectionProcessFlag activo
    Entonces el sistema muestra el equipo inhabilitado y financiamiento con collectionProcessFlag activo

    [Teardown]    Y cierra la sesión del sistema BES
