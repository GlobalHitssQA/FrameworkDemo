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
${CUSTOMER_ID_PRUEBA}                 CUST-POST-SUBS-001
${NUMERO_TELEFONO_PRUEBA}             5512345678
${IMEI_ESPERADO}                      123456789012345

*** Test Cases ***
Validar Flujo De Inhabilitación Para Plan Tipo Postpago Con Subsidio
    [Documentation]    Este caso de prueba verifica el flujo completo de inhabilitación de equipo
    ...                para un cliente con plan tipo postpago que tiene subsidio activo y presenta
    ...                incumplimiento de pago.
    ...
    ...                Flujo de validación:
    ...                1. Identificar un cliente con plan postpago que tiene subsidio activo y presenta morosidad
    ...                2. Consultar el estado del subsidio mediante subsidyStatus en BES
    ...                3. Validar que BES administra el calendario de cobranza para el subsidio
    ...                4. Ejecutar notificación de pago pendiente al cliente
    ...                5. Invocar la API de SITIC-Trustonic para inhabilitar el equipo
    ...                6. Verificar que el equipo queda inhabilitado y el estado se actualiza en BES
    [Tags]    PruebaGeneradaIA    Inhabilitacion    Subsidios    Postpago    BES    SITIC-Trustonic

    # STEP 1: Identificar un cliente con plan postpago que tiene subsidio activo y presenta morosidad
    Dado que el usuario ha iniciado sesión en BES
    Y navega al módulo de inhabilitación de equipos
    Dado que se identifica un cliente con plan postpago que tiene subsidio activo y presenta morosidad
    ...    ${CUSTOMER_ID_PRUEBA}

    # STEP 1 (validación): El sistema identifica al cliente y el subsidio asociado
    Entonces se obtiene el estado actual del subsidio del cliente

    # STEP 2: Consultar el estado del subsidio mediante subsidyStatus en BES
    Cuando se consulta el estado del subsidio mediante subsidyStatus en BES

    # STEP 2 (validación): Se obtiene el estado actual del subsidio del cliente
    Entonces se obtiene el estado actual del subsidio del cliente

    # STEP 3: Validar que BES administra el calendario de cobranza para el subsidio
    Cuando se valida que BES administra el calendario de cobranza para el subsidio

    # STEP 3 (validación): El calendario de cobranza refleja las cuotas del subsidio pendientes de pago
    Entonces el calendario de cobranza refleja las cuotas del subsidio pendientes de pago

    # STEP 4: Ejecutar notificación de pago pendiente al cliente
    Cuando se ejecuta notificación de pago pendiente al cliente

    # STEP 4 (validación): Se envía notificación informando del incumplimiento del subsidio
    Entonces se envía notificación informando del incumplimiento del subsidio

    # STEP 5: Invocar la API de SITIC-Trustonic para inhabilitar el equipo
    Cuando se invoca la API de SITIC-Trustonic para inhabilitar el equipo

    # STEP 5 (validación): BES ejecuta la inhabilitación del dispositivo a través de Trustonic
    Entonces BES ejecuta la inhabilitación del dispositivo a través de Trustonic

    # STEP 6: Verificar que el equipo queda inhabilitado y el estado se actualiza en BES
    Cuando se verifica que el equipo queda inhabilitado y el estado se actualiza en BES

    # STEP 6 (validación): El equipo no puede operar y el sistema registra la inhabilitación
    Entonces el equipo no puede operar y el sistema registra la inhabilitación

    # Teardown: Cerrar sesión del navegador
    Entonces cerrar la sesión del navegador
