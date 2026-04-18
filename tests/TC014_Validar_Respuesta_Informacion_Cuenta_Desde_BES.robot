*** Settings ***
Documentation    Caso de prueba: Validar respuesta con información de cuenta desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para administración de crédito
...              Escenario: Verificar que la respuesta de BES contenga la información completa de la cuenta
...              del suscriptor para la gestión de crédito
...
...              Precondiciones:
...              - API CustomerManagement Service GetAccountInfo disponible en BES
...              - accountId válido de una cuenta existente en BES
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - accountId de una cuenta existente en BES
${ACCOUNT_ID_VALIDO}    ACC123456789

*** Test Cases ***
Validar Respuesta Con Información De Cuenta Desde BES
    [Documentation]    Este caso de prueba verifica que la API CustomerManagement Service GetAccountInfo
    ...                de BES devuelve correctamente todos los datos de la cuenta del suscriptor necesarios
    ...                para la gestión de crédito en Amigo Paguitos.
    ...
    ...                Flujo de validación:
    ...                1. Ejecutar API GetAccountInfo con un accountId válido
    ...                2. Validar que BES procesa la petición y genera respuesta exitosa
    ...                3. Validar que la respuesta contiene el campo billcycleTypeId con el tipo de ciclo de facturación
    ...                4. Validar que la respuesta contiene el campo acctCode con el código de cuenta
    ...                5. Validar que la respuesta contiene el campo collectionProcessFlag indicando el estado de cobranza
    ...
    ...                Campos críticos verificados:
    ...                - billcycleTypeId: Tipo de ciclo de facturación de la cuenta
    ...                - acctCode: Código de la cuenta del suscriptor
    ...                - collectionProcessFlag: Indicador de si la cuenta está en proceso de cobranza
    [Tags]    PruebaGeneradaIA    Funcional    BES    Integracion    API

    # WHEN: Ejecutar la API CustomerManagement Service GetAccountInfo con accountId válido
    Cuando se ejecuta la API CustomerManagement Service GetAccountInfo con accountId válido
    ...    ${ACCOUNT_ID_VALIDO}

    # THEN: BES procesa la petición y genera una respuesta con la información de la cuenta
    Entonces BES procesa la petición y genera una respuesta con la información de la cuenta

    # AND: Validar que la respuesta contiene el campo billcycleTypeId con el tipo de ciclo de facturación
    Y la respuesta contiene el campo billcycleTypeId con el tipo de ciclo de facturación

    # AND: Validar que la respuesta contiene el campo acctCode con el código de cuenta
    Y la respuesta contiene el campo acctCode con el código de cuenta

    # THEN: Validar que la respuesta contiene el campo collectionProcessFlag indicando el estado de cobranza
    Entonces la respuesta contiene el campo collectionProcessFlag indicando el estado de cobranza
