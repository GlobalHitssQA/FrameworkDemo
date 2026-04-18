*** Settings ***
Documentation    Caso de prueba: Comprobar consumo de API ArService QueryBalance
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar que el sistema consume correctamente la API ArService
...              QueryBalance para obtener el balance de la cuenta del cliente desde BES
...
...              Precondiciones:
...              - Número telefónico válido registrado en BES
...              - Cliente con cuenta activa
...              - Servicio ArService disponible
...              - Usuario autenticado con permisos de consulta
...
...              Flujo de consulta:
...              1. Obtener número telefónico del cliente desde información de venta
...              2. Invocar API ArService.QueryBalance enviando número telefónico
...              3. Verificar que BES procesa petición y retorna balancetype y ARBalance
...              4. Validar que transacción se completa sin códigos de error (ESB2, ESB3, ESB4)
...
...              Campos retornados por BES:
...              - balancetype: Tipo de balance de la cuenta (Prepago, Pospago, etc.)
...              - ARBalance: Monto del balance de la cuenta
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Comprobar Consumo De API ArService QueryBalance
    [Documentation]    Este caso de prueba verifica que el sistema consume correctamente
    ...                la API ArService.QueryBalance para obtener el balance de la cuenta
    ...                del cliente desde BES.
    ...
    ...                Flujo de integración validado:
    ...                1. Sistema obtiene número telefónico del cliente
    ...                2. ESB invoca API ArService.QueryBalance con número telefónico
    ...                3. BES procesa petición y retorna información de balance
    ...                4. Sistema valida respuesta sin errores de conexión o timeout
    ...
    ...                Información retornada:
    ...                - balancetype: Tipo de balance (Prepago, Pospago, Híbrido, Crédito, Débito)
    ...                - ARBalance: Monto del balance de la cuenta
    ...                - CustID: Identificador del cliente para verificación cruzada
    ...                - serviceNumber: Número telefónico consultado
    ...
    ...                Validaciones de error:
    ...                - No se presentan errores ESB2 (Servicio NO disponible)
    ...                - No se presentan errores ESB3 (Timeout de servicio)
    ...                - No se presentan errores ESB4 (Falla de conexión)
    ...                - Status code 200 (Transacción exitosa)
    [Tags]    PruebaGeneradaIA    Integral    BES    ArService    QueryBalance    CasosDeUso

    # WHEN: Obtener el número telefónico del cliente desde la información de venta de Amigo Paguitos
    # NOTA: En este caso, el número telefónico ya está disponible como variable de prueba
    # representando que se obtuvo desde la información de venta

    # AND: Invocar la API ArService.QueryBalance enviando el número telefónico como parámetro de entrada
    Cuando se ejecuta la consulta ArService QueryBalance con un número telefónico válido
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El ESB consume la API correctamente y envía el número telefónico a BES
    # AND: BES procesa la petición y retorna información del balance de cuenta
    Entonces BES procesa la petición y genera una respuesta con información de balance

    # AND: La respuesta incluye el campo balancetype con el tipo de balance de la cuenta
    Y la respuesta incluye el campo balancetype con el tipo de balance de la cuenta

    # AND: La respuesta incluye el campo ARBalance con el monto del balance
    Y la respuesta incluye el campo ARBalance con el monto del balance

    # AND: Los valores retornados corresponden al cliente consultado mediante verificación cruzada con CustID
    Entonces los valores retornados corresponden al cliente consultado mediante verificación cruzada con CustID
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # AND: La respuesta cumple con el esquema XML JSON definido en la especificación
    # THEN: La transacción se completa exitosamente sin códigos de error ESB2, ESB3 o ESB4
    Y la respuesta cumple con el esquema XML JSON definido en la especificación
