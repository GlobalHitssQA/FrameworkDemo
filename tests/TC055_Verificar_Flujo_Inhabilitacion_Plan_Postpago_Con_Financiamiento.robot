*** Settings ***
Documentation    Caso de prueba: Verificar flujo de inhabilitación para plan tipo postpago con financiamiento
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Inhabilitación y Habilitación de Equipos
...              Escenario: Verificar el flujo de inhabilitación de equipo para un plan tipo postpago
...              con financiamiento cuando el cliente incumple pagos
...
...              Precondiciones:
...              - Cliente con plan postpago y financiamiento activo
...              - Pagos vencidos en el calendario de cobranza
...              - Integración con SITIC-Trustonic operativa
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con plan postpago
${CUSTOMER_ID_POSTPAGO}    CUST_POSTPAGO_9876543
${IMEI_EQUIPO_POSTPAGO}    359012345678901

*** Test Cases ***
Verificar Flujo De Inhabilitación Para Plan Tipo Postpago Con Financiamiento
    [Documentation]    Este caso de prueba verifica el flujo completo de inhabilitación de equipo
    ...                para un cliente con plan postpago que tiene financiamiento activo y presenta
    ...                incumplimiento en el pago de cuotas según el calendario de cobranza.
    ...
    ...                Pasos:
    ...                1. Identificar cliente con plan postpago que tiene financiamiento activo y pagos vencidos
    ...                2. Validar que BES detecta el incumplimiento de pago según calendario de cobranza
    ...                3. Ejecutar el proceso de notificación de pago al cliente
    ...                4. Invocar la API de SITIC-Trustonic para inhabilitar el equipo
    ...                5. Verificar que el equipo queda inhabilitado en el sistema
    ...                6. Confirmar que el registro de inhabilitación se almacena correctamente
    [Tags]    PruebaGeneradaIA

    Dado que el usuario ha iniciado sesión en BES

    Y navega al módulo de inhabilitación de equipos

    Dado que existe un cliente con plan postpago y financiamiento activo    ${CUSTOMER_ID_POSTPAGO}

    Y el cliente tiene cuotas vencidas en el plan de financiamiento

    Cuando BES detecta el incumplimiento de pago según calendario de cobranza

    Entonces BES identifica las cuotas vencidas

    Cuando ejecuta el proceso de notificación de pago al cliente

    Entonces se envía notificación informando del incumplimiento

    Cuando invoca la API de SITIC-Trustonic para inhabilitar el equipo    ${IMEI_EQUIPO_POSTPAGO}

    Entonces BES ejecuta la integración con Trustonic para inhabilitar el dispositivo    ${IMEI_EQUIPO_POSTPAGO}

    Cuando verifica el estado del equipo en el sistema

    Entonces el estado del equipo cambia a inhabilitado

    Y confirma que el registro de inhabilitación se almacena correctamente

    [Teardown]    Entonces cerrar la sesión del navegador
