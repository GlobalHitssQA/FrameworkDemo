*** Settings ***
Documentation    Caso de prueba: Verificar consulta de balance general vía QueryBalance
...              Proceso: Posventa
...              Aplicación: BES
...              Funcionalidad: Consulta de saldo de cuenta
...              Escenario: Verificar la consulta de balance general en BES cuando se solicita
...              información de saldos de un cliente de Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Número telefónico válido asociado a un cliente de Amigo Paguitos
...              - Servicio ArService.QueryBalance disponible
...              - Conexión a BES activa
...
...              Flujo de consulta:
...              1. Enviar solicitud de consulta de balance mediante el servicio ArService.QueryBalance
...                 con número telefónico válido como parámetro de entrada
...              2. BES ejecuta la búsqueda de información de balance en el sistema CBS utilizando
...                 el número telefónico proporcionado
...              3. BES devuelve el response con los campos balancetype y ARBalance al ESB
...              4. Capa de integración envía el response con la información de balance al consumidor
...
...              Resultados esperados:
...              - El sistema BES recibe la petición y procesa la consulta de balance
...              - El sistema localiza el registro del cliente y obtiene la información de saldo
...              - Capa de integración recibe correctamente los campos balancetype y ARBalance con valores válidos
...              - El consumidor recibe la respuesta con el tipo de balance y el saldo de cuentas por cobrar del cliente
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE_AMIGO_PAGUITOS}    5512345678

*** Test Cases ***
Verificar Consulta De Balance General Via QueryBalance
    [Documentation]    Este caso de prueba verifica la consulta de balance general en BES cuando
    ...                se solicita información de saldos de un cliente de Amigo Paguitos mediante
    ...                el servicio ArService.QueryBalance.
    ...
    ...                Flujo de integración validado:
    ...                1. Consumidor (Amigo Paguitos) envía solicitud de consulta de balance
    ...                2. ESB recibe petición y la envía al servicio ArService.QueryBalance con número telefónico
    ...                3. BES procesa la búsqueda en sistema CBS usando el número telefónico
    ...                4. BES devuelve response con campos balancetype y ARBalance al ESB
    ...                5. Capa de integración envía response al consumidor
    ...
    ...                Campos críticos retornados:
    ...                - balancetype: Tipo de balance de la cuenta del cliente
    ...                - ARBalance: Saldo de cuentas por cobrar del cliente
    ...                - CustID: Identificador del cliente para verificación cruzada
    ...                - serviceNumber: Número telefónico consultado
    ...
    ...                Validaciones clave:
    ...                - BES recibe y procesa correctamente la petición
    ...                - Sistema localiza el registro del cliente en CBS
    ...                - Response incluye balancetype con valor válido
    ...                - Response incluye ARBalance con monto numérico
    ...                - Capa de integración transmite correctamente la información al consumidor
    [Tags]    PruebaGeneradaIA    Funcional    BES    Posventa    ArService    QueryBalance    AmigoPaguitos

    # GIVEN: Usuario autenticado en el sistema con número telefónico válido asociado a cliente Amigo Paguitos
    # NOTA: Precondición implícita - Usuario autenticado y servicio disponible

    # WHEN: Enviar solicitud de consulta de balance mediante el servicio ArService.QueryBalance
    # con número telefónico válido como parámetro de entrada
    Cuando se ejecuta la consulta ArService QueryBalance con un número telefónico válido
    ...    ${NUMERO_TELEFONICO_CLIENTE_AMIGO_PAGUITOS}

    # THEN: El sistema BES recibe la petición y procesa la consulta de balance
    # AND: El sistema localiza el registro del cliente y obtiene la información de saldo
    Entonces BES procesa la petición y genera una respuesta con información de balance

    # AND: BES devuelve el response con el campo balancetype al ESB
    # AND: Capa de integración recibe correctamente el campo balancetype con valor válido
    Y la respuesta incluye el campo balancetype con el tipo de balance de la cuenta

    # AND: BES devuelve el response con el campo ARBalance al ESB
    # AND: Capa de integración recibe correctamente el campo ARBalance con valor válido
    Y la respuesta incluye el campo ARBalance con el monto del balance

    # THEN: El consumidor recibe la respuesta con el tipo de balance y el saldo de cuentas por cobrar del cliente
    # AND: Validar que los valores retornados corresponden al cliente consultado
    Entonces los valores retornados corresponden al cliente consultado mediante verificación cruzada con CustID
    ...    ${NUMERO_TELEFONICO_CLIENTE_AMIGO_PAGUITOS}

    # AND: La respuesta cumple con el esquema definido en la especificación
    Y la respuesta cumple con el esquema XML JSON definido en la especificación
