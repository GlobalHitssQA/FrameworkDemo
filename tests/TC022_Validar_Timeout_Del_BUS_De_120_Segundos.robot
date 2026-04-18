*** Settings ***
Documentation    TC022: Validar timeout del BUS de 120 segundos
...
...              PROCESO: Cobranza
...              APLICACIÓN: BES (Backend Enterprise System)
...              FUNCIONALIDAD: Administración de crédito Amigo Paguitos
...
...              ESCENARIO: Verificar el comportamiento del BUS cuando el flujo de mensaje
...              excede el tiempo de respuesta configurado de 120 segundos
...
...              PRECONDICIONES:
...              - Usuario autenticado en el sistema
...              - Servicio PACPagosService disponible
...              - Configuración de timeout del BUS establecida en 120 segundos
...
...              TÉCNICA ISTQB: Valores límite
...              COMPLEJIDAD: Media

Library          RequestsLibrary
Resource         ../resources/keywords.resource
Test Tags        PruebaGeneradaIA
Test Teardown    Finalmente cierro la sesión del servicio

*** Variables ***
${NUMERO_TELEFONICO_PRUEBA}    5512345678
${TIMEOUT_BUS_CONFIGURADO}     120

*** Test Cases ***
Validar timeout del BUS de 120 segundos
    [Documentation]    Verifica que el BUS genera el código de error ESB6 cuando el flujo de mensaje
    ...                excede el tiempo de respuesta configurado de 120 segundos, y permite reintento
    [Tags]    PruebaGeneradaIA    NoFuncional    Timeout    ESB6    BUS    AmigoPaguitos

    # STEP 1: Configurar el BUS para simular un procesamiento que exceda los 120 segundos
    Dado que el BUS está configurado para procesar durante más de 120 segundos    125

    # STEP 2: Enviar una petición desde el consumidor Amigo Paguitos hacia el servicio PACPagosService
    Cuando envío una petición desde el consumidor Amigo Paguitos hacia PACPagosService    ${NUMERO_TELEFONICO_PRUEBA}

    # STEP 2 (continuación): La capa de integración recibe la petición y comienza el procesamiento
    Entonces la capa de integración recibe la petición y comienza el procesamiento

    # STEP 3: Monitorear el tiempo de ejecución del flujo de mensaje en el BUS
    Cuando monitoreo el tiempo de procesamiento del flujo de mensaje en el BUS

    # STEP 4: Verificar que al alcanzar los 120 segundos el sistema genera el código de error ESB6
    Entonces al alcanzar los 120 segundos el sistema genera el código de error ESB6

    # STEP 5: Validar que se permite el reintento de la operación según la configuración establecida
    Y el sistema permite el reintento de la operación según la configuración establecida
