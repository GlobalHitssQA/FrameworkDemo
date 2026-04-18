*** Settings ***
Documentation    Caso de prueba: Validar habilitación de equipos tras pago de parcialidades
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Habilitación de equipos
...              Escenario: Verificar que BES habilita automáticamente los equipos a través de
...              SITIC-Trustonic cuando el cliente realiza el pago de parcialidades vencidas
...
...              Precondiciones:
...              - Equipo previamente inhabilitado por incumplimiento
...              - Integración BES con SITIC-Trustonic operativa
...              - Pago de parcialidades recibido en CPS
...              - IMEI del equipo registrado correctamente
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Equipo
${IMEI_EQUIPO_INHABILITADO}    111222333444555

# Datos de prueba - Pago
${MONTO_PAGO}                  2500
${METODO_PAGO}                 SICATEL
${REFERENCIA_PAGO}             PAG-20260417-001

*** Test Cases ***
Validar Habilitación De Equipos Tras Pago De Parcialidades
    [Documentation]    Este caso de prueba verifica que BES habilita automáticamente
    ...                los equipos a través de SITIC-Trustonic cuando el cliente realiza
    ...                el pago de parcialidades vencidas.
    ...
    ...                Pasos:
    ...                1. Partir de un equipo inhabilitado por incumplimiento
    ...                2. Acreditar pago de parcialidades vencidas a través de CPS
    ...                3. Verificar que BES ejecuta automáticamente la habilitación
    ...                4. Confirmar que el equipo queda habilitado y servicio activo
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de cobranza y pagos

    Dado que existe un equipo inhabilitado por incumplimiento de pago registrado en BES    ${IMEI_EQUIPO_INHABILITADO}

    Cuando acredita el pago de las parcialidades vencidas a través de CPS
    ...    ${MONTO_PAGO}
    ...    ${METODO_PAGO}
    ...    ${REFERENCIA_PAGO}

    Entonces BES recibe y acredita exitosamente el pago actualizando el saldo

    Y BES ejecuta automáticamente el proceso de habilitación del equipo a través de SITIC-Trustonic    ${IMEI_EQUIPO_INHABILITADO}

    Entonces el equipo queda habilitado y el cliente puede utilizar el servicio

    [Teardown]    Entonces cerrar la sesión del navegador
