*** Settings ***
Documentation    Caso de prueba: Validar consulta de información de suscriptor vía GetSubscriberInfo
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Consulta de información de suscriptor
...              Escenario: Verificar la consulta de información del suscriptor desde BES mediante
...              el servicio CustomerManagementService.GetSubscriberInfo
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Número telefónico registrado en BES
...              - Servicio CustomerManagementService.GetSubscriberInfo disponible
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico de suscriptor registrado
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validar Consulta De Información De Suscriptor Via GetSubscriberInfo
    [Documentation]    Este caso de prueba valida la consulta de información del suscriptor
    ...                desde BES mediante el servicio CustomerManagementService.GetSubscriberInfo.
    ...
    ...                Flujo de prueba:
    ...                1. Preparar petición con número telefónico válido
    ...                2. Enviar petición al servicio CustomerManagementService.GetSubscriberInfo
    ...                3. Verificar que BES procesa la consulta y recupera información del suscriptor
    ...                4. Validar que la respuesta contiene todos los campos requeridos
    ...                5. Verificar que los datos retornados son consistentes y válidos
    ...
    ...                Campos validados:
    ...                - serviceNumber: Número telefónico del suscriptor
    ...                - subscriberId: Identificador único del suscriptor en BES
    ...                - activeDate: Fecha de activación del servicio
    ...                - statusTime: Timestamp del último cambio de estado
    ...                - paymentType: Tipo de pago del suscriptor
    ...                - status: Estado actual del suscriptor
    ...                - primaryOfferingId: ID de la oferta principal asociada
    ...                - primaryOfferingName: Nombre de la oferta principal
    ...                - accountId: Identificador de la cuenta asociada
    ...                - CustID: Identificador del cliente en el sistema
    [Tags]    PruebaGeneradaIA    Funcional    Cobranza    BES    API

    # GIVEN: Se prepara una petición con número telefónico válido
    Dado que se prepara una petición con número telefónico válido para GetSubscriberInfo
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # WHEN: Se envía la petición al servicio CustomerManagementService.GetSubscriberInfo
    Cuando se envía la petición al servicio CustomerManagement Service GetSubscriberInfo

    # THEN: BES procesa la consulta y recupera la información del suscriptor
    Entonces BES procesa la consulta y recupera la información del suscriptor

    # AND: La respuesta contiene todos los campos requeridos del suscriptor
    Y la respuesta contiene todos los campos requeridos del suscriptor

    # AND: Verifica que los datos retornados son consistentes y válidos
    Y verifica que los datos retornados son consistentes y válidos
