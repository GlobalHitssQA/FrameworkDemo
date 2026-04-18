*** Settings ***
Documentation    Caso de prueba: Verificar inhabilitación de equipos por incumplimiento de pago
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Inhabilitación de equipos
...              Escenario: Verificar que BES administra y ejecuta la inhabilitación de equipos
...              a través de las APIs de SITIC-Trustonic cuando existe incumplimiento de pago
...
...              Precondiciones:
...              - Financiamiento activo en BES con parcialidades vencidas
...              - Integración BES con SITIC-Trustonic configurada
...              - IMEI del equipo registrado en BES
...              - Calendario de cobranza configurado
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo
${IMEI_EQUIPO}    987654321098765

*** Test Cases ***
Verificar Inhabilitación De Equipos Por Incumplimiento De Pago
    [Documentation]    Este caso de prueba verifica que BES administra y ejecuta
    ...                correctamente la inhabilitación de equipos a través de SITIC-Trustonic
    ...                cuando existe incumplimiento de pago.
    ...
    ...                Pasos:
    ...                1. Identificar financiamiento con parcialidades vencidas sin pago
    ...                2. Verificar que BES ejecuta proceso de notificación al cliente
    ...                3. Confirmar que BES ejecuta inhabilitación a través de SITIC-Trustonic
    ...                4. Verificar que equipo queda inhabilitado exitosamente
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de inhabilitación de equipos

    Dado que existe un financiamiento con parcialidades vencidas    ${IMEI_EQUIPO}

    Entonces BES detecta el incumplimiento de pago y marca el financiamiento con estado de morosidad

    Entonces BES ejecuta el proceso de notificación de pago al cliente antes de la inhabilitación

    Cuando BES ejecuta la inhabilitación del equipo a través de SITIC-Trustonic    ${IMEI_EQUIPO}

    Entonces el equipo queda inhabilitado y se registra la inhabilitación en BES

    [Teardown]    Entonces cerrar la sesión del navegador
