*** Settings ***
Documentation    Caso de prueba: Verificar consulta con suscriptor desactivado usando account code
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Consulta de información de suscriptores Amigo Paguitos
...              Escenario: Verificar la consulta de información en BES cuando se utiliza account code
...              como parámetro de entrada para un suscriptor desactivado
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Suscriptor desactivado existente en BES con account code válido
...              - Servicio ConsultarPaguitos disponible
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Account code de suscriptor desactivado
${ACCOUNT_CODE_SUSCRIPTOR_DESACTIVADO}    ACC-2024-DESACT-00456

*** Test Cases ***
Verificar Consulta Con Suscriptor Desactivado Usando Account Code
    [Documentation]    Este caso de prueba verifica la consulta de información en BES cuando se utiliza
    ...                account code como parámetro de entrada para un suscriptor desactivado.
    ...
    ...                Pasos de validación:
    ...                1. Ingresar account code de un suscriptor desactivado como parámetro en el servicio ConsultarPaguitos
    ...                2. Verificar que el sistema acepta la petición y procesa la consulta
    ...                3. Verificar que BES ejecuta la búsqueda en CustomerManagement Service utilizando el account code
    ...                4. Validar que BES retorna la información asociada al account code incluyendo estado desactivado
    ...                5. Validar que la respuesta incluye serviceNumber, subscriberId, status con valor desactivado
    ...
    ...                Campos críticos verificados:
    ...                - serviceNumber: Número telefónico del suscriptor
    ...                - subscriberId: Identificador único del suscriptor
    ...                - status: Estado del suscriptor (debe ser "Desactivado")
    ...                - accountCode: Código de cuenta utilizado para la búsqueda
    [Tags]    PruebaGeneradaIA    Funcional    BES    AdministracionCredito    API

    # WHEN: Se ingresa account code de un suscriptor desactivado como parámetro en el servicio ConsultarPaguitos
    Cuando se ingresa account code de suscriptor desactivado como parámetro en el servicio ConsultarPaguitos
    ...    ${ACCOUNT_CODE_SUSCRIPTOR_DESACTIVADO}

    # THEN: El sistema acepta la petición y procesa la consulta
    Entonces el sistema acepta la petición y procesa la consulta

    # AND: BES ejecuta la búsqueda en CustomerManagement Service utilizando el account code del suscriptor
    Cuando BES ejecuta la búsqueda en CustomerManagement Service utilizando el account code del suscriptor

    # THEN: BES retorna la información asociada al account code incluyendo estado de suscriptor desactivado
    Entonces BES retorna la información asociada al account code incluyendo estado de suscriptor desactivado

    # AND: La respuesta incluye los campos serviceNumber, subscriberId, status con valor de desactivado
    Y la respuesta incluye los campos serviceNumber subscriberId status con valor de desactivado
