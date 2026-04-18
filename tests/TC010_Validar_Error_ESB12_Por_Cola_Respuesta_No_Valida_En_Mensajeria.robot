*** Settings ***
Documentation    Caso de prueba: Validar error ESB12 por cola de respuesta no válida en mensajería
...              Proceso: Integración de servicios
...              Aplicación: ESB (Enterprise Service Bus)
...              Funcionalidad: Gestión de colas de mensajería
...              Escenario: Verificar que el ESB detecta y notifica cuando la cola de respuesta
...              configurada para mensajería no es válida
...
...              Precondiciones:
...              - Cola de mensajería configurada incorrectamente en ESB
...              - Usuario autenticado en el sistema
...              - Mediación configurada para usar mensajería
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Alta

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cola de respuesta no válida
${COLA_RESPUESTA_INVALIDA}    queue.response.nonexistent
${NUMERO_TELEFONICO_VALIDO}    5512345678
${TRANSACTION_ID_EJEMPLO}      TXN-ESB12-001234

*** Test Cases ***
Validar Error ESB12 Por Cola De Respuesta No Válida En Mensajería
    [Documentation]    Este caso de prueba verifica que el ESB detecta y notifica cuando la cola
    ...                de respuesta configurada para mensajería no es válida.
    ...
    ...                Flujo de validación:
    ...                1. Configurar el ESB con una cola de respuesta no válida o inexistente para mediaciones que usan recursos de mensajería
    ...                2. Enviar una petición desde Amigo Paguitos que requiera uso de recursos de mensajería en el ESB
    ...                3. Verificar que el ESB detecta que la cola de respuesta no es válida durante el procesamiento
    ...                4. Validar que el ESB genera el código de error ESB12 indicando cola de respuesta no válida
    ...                5. Verificar que el ESB ejecuta reintento automático según configuración para este tipo de error
    ...                6. Revisar el log de infraestructura para identificar el detalle del problema con la cola de mensajería
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    Mensajeria    IntegracionServicios

    # STEP 1: Configurar el ESB con una cola de respuesta no válida o inexistente para mediaciones que usan recursos de mensajería
    Dado que el ESB está configurado con una cola de respuesta no válida para mensajería
    ...    ${COLA_RESPUESTA_INVALIDA}

    # STEP 2: Enviar una petición desde Amigo Paguitos que requiera uso de recursos de mensajería en el ESB
    Cuando se envía una petición desde Amigo Paguitos que requiere uso de recursos de mensajería en el ESB
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 3: Verificar que el ESB detecta que la cola de respuesta no es válida durante el procesamiento
    Entonces el ESB detecta que la cola de respuesta no es válida durante el procesamiento

    # STEP 4: Validar que el ESB genera el código de error ESB12 indicando cola de respuesta no válida
    Y el ESB genera el código de error ESB12 indicando cola de respuesta no válida

    # STEP 5: Verificar que el ESB ejecuta reintento automático según configuración para este tipo de error
    Y el ESB ejecuta reintento automático según configuración para este tipo de error

    # STEP 6: Revisar el log de infraestructura para identificar el detalle del problema con la cola de mensajería
    Cuando se revisa el log de infraestructura para identificar el problema con la cola de mensajería
    ...    ${TRANSACTION_ID_EJEMPLO}

    # STEP 6 (validación): El log registra el nombre de la cola inválida, el error de acceso y las acciones de reintento realizadas
    Entonces el log registra el nombre de la cola inválida el error de acceso y las acciones de reintento realizadas
