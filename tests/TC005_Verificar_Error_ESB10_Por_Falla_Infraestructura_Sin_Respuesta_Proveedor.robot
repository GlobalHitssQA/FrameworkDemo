*** Settings ***
Documentation    Caso de prueba: Verificar error ESB10 por falla de infraestructura sin respuesta del proveedor
...              Proceso: Integración de servicios
...              Aplicación: ESB (Enterprise Service Bus)
...              Funcionalidad: Gestión de excepciones de infraestructura
...              Escenario: Verificar el comportamiento del ESB cuando ocurre una excepción no esperada
...              y el proveedor BES no devuelve respuesta debido a falla de infraestructura
...
...              Precondiciones:
...              - Servicio BES con conectividad intermitente o caído
...              - Usuario autenticado en el sistema
...              - Configuración de reintentos habilitada en ESB
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Alta

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Configuración de falla de infraestructura
${NUMERO_TELEFONICO_VALIDO}           5512345678
${MAX_REINTENTOS_CONFIGURADO}         3
${TRANSACTION_ID_EJEMPLO}             TXN-2026-ESB10-001

*** Test Cases ***
Verificar Error ESB10 Por Falla De Infraestructura Sin Respuesta Del Proveedor
    [Documentation]    Este caso de prueba verifica el comportamiento del ESB cuando ocurre una
    ...                excepción no esperada y el proveedor BES no devuelve respuesta debido a
    ...                falla de infraestructura.
    ...
    ...                Flujo de validación:
    ...                1. Simular una falla de infraestructura o comunicaciones que impida que BES devuelva respuesta
    ...                2. Enviar una petición desde Amigo Paguitos al servicio AmigoPaguitosPagosService
    ...                3. Verificar que el ESB detecta que no hay respuesta del proveedor (timeout)
    ...                4. Validar que el ESB genera el código de error ESB10
    ...                5. Verificar que el ESB ejecuta el mecanismo de reintento automático
    ...                6. Revisar el log de incidentes para validar el registro de la falla
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    FallaInfraestructura    IntegracionServicios

    # STEP 1 y 2: Simular falla de infraestructura y enviar petición desde Amigo Paguitos
    Cuando se envía una petición desde Amigo Paguitos al servicio AmigoPaguitosPagosService
    ...    ${NUMERO_TELEFONICO_VALIDO}

    Y se simula una falla de infraestructura o comunicaciones que impida que BES devuelva respuesta al ESB

    # STEP 3: Verificar que el ESB no recibe respuesta del proveedor BES (timeout)
    Entonces el ESB no recibe respuesta del proveedor BES debido a la falla de infraestructura

    # STEP 4: Validar que el ESB genera el código de error ESB10
    Y el ESB genera el código de error ESB10 indicando excepción no esperada o sin respuesta del proveedor

    # STEP 5: Verificar que el ESB ejecuta el mecanismo de reintento automático según configuración
    Y el ESB ejecuta el mecanismo de reintento automático según configuración

    # STEP 6: Revisar el log de incidentes para validar que se registró la falla de infraestructura
    Cuando se revisa el log de incidentes para validar que se registró la falla de infraestructura
    ...    ${TRANSACTION_ID_EJEMPLO}

    # STEP 6 (validación): El log contiene timestamp, detalles de infraestructura y número de reintentos
    Entonces el log contiene el registro de la falla con timestamp detalles de infraestructura y número de reintentos realizados
    ...    ${MAX_REINTENTOS_CONFIGURADO}
