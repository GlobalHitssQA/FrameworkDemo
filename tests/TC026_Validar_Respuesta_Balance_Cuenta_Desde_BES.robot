*** Settings ***
Documentation    Caso de prueba: Validar respuesta con balance de cuenta desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar que BES retorna correctamente el balance de cuenta del cliente
...              incluyendo el tipo de balance y el monto asociado
...
...              Precondiciones:
...              - Cliente con cuenta activa en BES
...              - Número telefónico registrado y activo
...              - Balance de cuenta disponible para consulta
...              - Servicio ArService operativo
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con cuenta activa
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validar Respuesta Con Balance De Cuenta Desde BES
    [Documentation]    Este caso de prueba verifica que BES retorna correctamente el balance de cuenta
    ...                del cliente incluyendo el tipo de balance y el monto asociado al ejecutar la
    ...                consulta ArService.QueryBalance.
    ...
    ...                Flujo de validación:
    ...                1. Ejecutar la consulta ArService.QueryBalance con un número telefónico válido
    ...                2. Verificar que BES procesa la petición y genera una respuesta con información de balance
    ...                3. Verificar que la respuesta incluye el campo balancetype con el tipo de balance de la cuenta
    ...                4. Verificar que la respuesta incluye el campo ARBalance con el monto del balance
    ...                5. Validar que los valores retornados corresponden al cliente consultado mediante verificación cruzada con CustID
    ...                6. Verificar que la respuesta cumple con el esquema XML/JSON definido en la especificación
    ...
    ...                Campos críticos verificados:
    ...                - balancetype: Tipo de balance de la cuenta (catálogo de tipos)
    ...                - ARBalance: Monto numérico del saldo de la cuenta
    ...                - CustID: Identificador del cliente para verificación cruzada
    ...                - serviceNumber: Número telefónico consultado
    [Tags]    PruebaGeneradaIA    Funcional    BES    Integracion    API

    # WHEN: Ejecutar la consulta ArService.QueryBalance con un número telefónico válido
    Cuando se ejecuta la consulta ArService QueryBalance con un número telefónico válido
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # THEN: BES procesa la petición y genera una respuesta con información de balance
    Entonces BES procesa la petición y genera una respuesta con información de balance

    # AND: Verificar que la respuesta incluye el campo balancetype con el tipo de balance de la cuenta
    Y la respuesta incluye el campo balancetype con el tipo de balance de la cuenta

    # AND: Verificar que la respuesta incluye el campo ARBalance con el monto del balance
    Y la respuesta incluye el campo ARBalance con el monto del balance

    # THEN: Validar que los valores retornados corresponden al cliente consultado mediante verificación cruzada con CustID
    Entonces los valores retornados corresponden al cliente consultado mediante verificación cruzada con CustID
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # AND: Verificar que la respuesta cumple con el esquema XML/JSON definido en la especificación
    Y la respuesta cumple con el esquema XML JSON definido en la especificación
