*** Settings ***
Documentation    Caso de prueba: Validar reintento automático ante excepción no esperada del ESB
...              Proceso: Integración de servicios
...              Aplicación: ESB (Enterprise Service Bus)
...              Funcionalidad: Gestión de reintentos automáticos
...              Escenario: Verificar el mecanismo de reintento automático del ESB cuando ocurre
...              una excepción no esperada durante el procesamiento de la petición
...
...              Precondiciones:
...              - ESB configurado con parámetros de reintento automático
...              - Usuario autenticado en el sistema
...              - Servicio BES disponible
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Alta

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Configuración de reintentos
${MAX_REINTENTOS}                      3
${TIEMPO_ENTRE_REINTENTOS_SEGUNDOS}    5

# Datos de prueba - Petición
${NUMERO_TELEFONICO_PRUEBA}            5512345678
${TRANSACTION_ID_ESPERADO}             TXN123456789

*** Test Cases ***
Validar Reintento Automático Ante Excepción No Esperada Del ESB
    [Documentation]    Este caso de prueba verifica el mecanismo de reintento automático del ESB
    ...                cuando ocurre una excepción no esperada (error ESB5) durante el procesamiento
    ...                de la petición desde Amigo Paguitos.
    ...
    ...                Pasos:
    ...                1. Configurar el entorno de prueba para simular una excepción no esperada
    ...                   en el ESB durante el procesamiento de la petición
    ...                2. Enviar una petición desde Amigo Paguitos al servicio AmigoPaguitosPagosService
    ...                3. Provocar una excepción no esperada durante el flujo de procesamiento en el ESB
    ...                4. Verificar que el ESB detecta la excepción y registra el error ESB5
    ...                5. Verificar que el ESB ejecuta automáticamente el reintento de la operación
    ...                   según la configuración establecida
    ...                6. Monitorear el tiempo entre cada reintento y el número máximo de reintentos configurados
    ...                7. Revisar el log de transacciones para validar el registro de cada intento
    [Tags]    PruebaGeneradaIA    Funcional    ESB    Reintentos    IntegracionServicios

    # GIVEN: El ESB está configurado con parámetros de reintento automático
    Dado que el ESB está configurado con parámetros de reintento automático
    ...    ${MAX_REINTENTOS}    ${TIEMPO_ENTRE_REINTENTOS_SEGUNDOS}

    # WHEN: Se envía una petición desde Amigo Paguitos al servicio AmigoPaguitosPagosService
    Cuando se envía una petición desde Amigo Paguitos al servicio AmigoPaguitosPagosService
    ...    ${NUMERO_TELEFONICO_PRUEBA}

    # AND: Se provoca una excepción no esperada durante el flujo de procesamiento en el ESB
    Y se provoca una excepción no esperada durante el flujo de procesamiento en el ESB

    # THEN: El ESB detecta la excepción y registra el error ESB5
    Entonces el ESB detecta la excepción y registra el error ESB5

    # AND: El ESB ejecuta automáticamente el reintento de la operación según la configuración establecida
    Y el ESB ejecuta automáticamente el reintento de la operación según la configuración establecida

    # AND: El ESB respeta los parámetros de tiempo entre reintentos y número máximo de intentos
    Entonces el ESB respeta los parámetros de tiempo entre reintentos y número máximo de intentos
    ...    ${MAX_REINTENTOS}    ${TIEMPO_ENTRE_REINTENTOS_SEGUNDOS}

    # WHEN: Se revisa el log de transacciones para validar el registro de cada intento
    Cuando se revisa el log de transacciones para validar el registro de cada intento
    ...    ${TRANSACTION_ID_ESPERADO}

    # THEN: El log muestra cada intento de reintento con timestamp, número de intento y resultado
    Entonces el log muestra cada intento de reintento con timestamp número de intento y resultado
    ...    ${MAX_REINTENTOS}
