*** Settings ***
Documentation    Caso de prueba: Validar flujo de inhabilitación para plan tipo postpago con subsidio
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Inhabilitación y Habilitación de Equipos
...              Escenario: Verificar el flujo de inhabilitación de equipo para un plan tipo postpago
...              con subsidio cuando se detecta incumplimiento de pago
...
...              Precondiciones:
...              - Cliente con plan postpago y subsidio activo
...              - Pagos de subsidio vencidos
...              - Integración con SITIC-Trustonic operativa
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con plan postpago y subsidio
${CUSTOMER_ID_POSTPAGO_SUBSIDIO}    CUS456789012
${IMEI_EQUIPO_SUBSIDIO}             987654321098765

*** Test Cases ***
Validar Flujo De Inhabilitación Para Plan Tipo Postpago Con Subsidio
    [Documentation]    Este caso de prueba verifica el flujo completo de inhabilitación de equipo
    ...                para un cliente con plan postpago que tiene subsidio activo y presenta
    ...                incumplimiento de pago según el calendario de cobranza del subsidio.
    ...
    ...                Pasos:
    ...                1. Identificar cliente con plan postpago, subsidio activo y morosidad
    ...                2. Consultar el estado del subsidio mediante subsidyStatus en BES
    ...                3. Validar que BES administra el calendario de cobranza para el subsidio
    ...                4. Ejecutar notificación de pago pendiente al cliente
    ...                5. Invocar la API de SITIC-Trustonic para inhabilitar el equipo
    ...                6. Verificar que el equipo queda inhabilitado y el estado se actualiza en BES
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de inhabilitación de equipos

    Dado que existe un cliente con plan postpago y subsidio activo con morosidad    ${CUSTOMER_ID_POSTPAGO_SUBSIDIO}

    Cuando consulta el estado del subsidio mediante subsidyStatus en BES

    Entonces BES muestra el estado del subsidio asociado al cliente

    Y valida que BES administra el calendario de cobranza para el subsidio

    Entonces BES ejecuta la notificación de pago pendiente al cliente

    Cuando BES invoca la API de SITIC-Trustonic para inhabilitar el equipo por incumplimiento del subsidio    ${IMEI_EQUIPO_SUBSIDIO}

    Entonces el equipo queda inhabilitado en el sistema

    Y el registro de inhabilitación se almacena correctamente con fecha hora y motivo

    [Teardown]    Entonces cerrar la sesión del navegador
