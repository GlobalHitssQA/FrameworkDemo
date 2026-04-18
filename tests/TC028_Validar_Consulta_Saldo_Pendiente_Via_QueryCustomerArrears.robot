*** Settings ***
Documentation    Caso de prueba: Validar consulta de saldo pendiente vía QueryCustomerArrears
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Consulta de saldo pendiente
...              Escenario: Verificar la consulta del saldo pendiente del cliente mediante
...              el servicio ArService.QueryBalance
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Número telefónico con cuenta activa en BES
...              - Servicio ArService.QueryBalance disponible
...
...              Flujo de consulta:
...              1. Preparar una petición con el número telefónico del cliente como parámetro de entrada
...              2. Enviar la petición al servicio ArService.QueryBalance de BES
...              3. Verificar que BES procesa la consulta y recupera el saldo pendiente del cliente
...              4. Validar que la respuesta contiene los campos balancetype y ARBalance
...              5. Verificar que los valores de saldo retornados son numéricos y reflejan correctamente el adeudo del cliente
...
...              Campos críticos retornados:
...              - balancetype: Tipo de saldo de la cuenta
...              - ARBalance: Monto del saldo pendiente (adeudo del cliente)
...              - CustID: Identificador del cliente
...              - serviceNumber: Número telefónico consultado
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con saldo pendiente
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Validar Consulta De Saldo Pendiente Via QueryCustomerArrears
    [Documentation]    Este caso de prueba verifica la consulta del saldo pendiente del cliente
    ...                mediante el servicio ArService.QueryBalance de BES. Se valida que el sistema
    ...                procese correctamente la petición con el número telefónico del cliente y
    ...                retorne información precisa del saldo pendiente incluyendo el tipo de balance
    ...                y el monto del adeudo.
    ...
    ...                Pasos de validación:
    ...                1. Preparar petición con número telefónico correctamente formateado
    ...                2. Enviar petición al servicio ArService.QueryBalance
    ...                3. Verificar procesamiento exitoso por parte de BES
    ...                4. Validar presencia de campos balancetype y ARBalance
    ...                5. Verificar valores numéricos correctos que reflejan el adeudo actual
    ...
    ...                Validaciones específicas:
    ...                - El número telefónico está correctamente formateado para la consulta
    ...                - BES localiza el saldo pendiente asociado al número telefónico
    ...                - La respuesta incluye el tipo de saldo y el monto del saldo pendiente
    ...                - Los valores de saldo son numéricos y corresponden al estado actual de la cuenta
    [Tags]    PruebaGeneradaIA    Funcional    BES    Cobranza    QueryBalance

    # GIVEN: Preparar una petición con el número telefónico del cliente como parámetro de entrada
    Dado que se prepara una petición con número telefónico del cliente como parámetro
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # WHEN: Enviar la petición al servicio ArService.QueryBalance de BES
    Cuando se envía la petición al servicio ArService QueryBalance de BES

    # THEN: Verificar que BES procesa la consulta y recupera el saldo pendiente del cliente
    Entonces BES procesa la consulta y recupera el saldo pendiente del cliente

    # AND: Validar que la respuesta contiene el campo balancetype
    Y la respuesta contiene el campo balancetype con el tipo de saldo

    # AND: Validar que la respuesta contiene el campo ARBalance
    Y la respuesta contiene el campo ARBalance con el monto del saldo pendiente

    # THEN: Verificar que los valores de saldo retornados son numéricos y reflejan correctamente el adeudo del cliente
    Entonces los valores de saldo retornados son numéricos y corresponden al estado actual de la cuenta
    ...    ${NUMERO_TELEFONICO_CLIENTE}
