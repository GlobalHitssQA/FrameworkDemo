*** Settings ***
Documentation    Caso de prueba: Verificar respuesta con datos de suscriptor desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para administración de crédito
...              Escenario: Verificar que la respuesta de BES contenga todos los datos del suscriptor
...              necesarios para la administración del crédito en Amigo Paguitos
...
...              Precondiciones:
...              - API CustomerManagement Service GetSubscriberinfo disponible en BES
...              - Número telefónico con suscriptor activo existente en BES
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico del suscriptor
${NUMERO_TELEFONICO_SUSCRIPTOR}    5512345678

*** Test Cases ***
Verificar Respuesta Con Datos De Suscriptor Desde BES
    [Documentation]    Este caso de prueba verifica que la API CustomerManagement Service GetSubscriberinfo
    ...                de BES devuelve correctamente todos los datos del suscriptor necesarios para la
    ...                administración del crédito en Amigo Paguitos.
    ...
    ...                Flujo de validación:
    ...                1. Ejecutar API GetSubscriberinfo con número telefónico válido
    ...                2. Validar que BES procesa la petición y genera respuesta exitosa
    ...                3. Validar que la respuesta contiene el campo serviceNumber con el valor correcto
    ...                4. Validar que la respuesta contiene los campos subscriberId, activeDate, statusTime
    ...                5. Validar que la respuesta contiene los campos paymentType, status, primaryOfferingId, primaryOfferingName
    ...                6. Validar que la respuesta contiene los campos accountId y CustID
    ...
    ...                Campos críticos verificados:
    ...                - serviceNumber: Número telefónico del suscriptor
    ...                - subscriberId: Identificador único del suscriptor
    ...                - activeDate: Fecha de activación del servicio
    ...                - statusTime: Timestamp del estado actual
    ...                - paymentType: Tipo de pago (prepago/postpago)
    ...                - status: Estado del suscriptor
    ...                - primaryOfferingId: ID de la oferta principal
    ...                - primaryOfferingName: Nombre de la oferta principal
    ...                - accountId: Identificador de la cuenta
    ...                - CustID: Identificador del cliente
    [Tags]    PruebaGeneradaIA    Funcional    BES    Integracion    API

    # WHEN: Ejecutar la API CustomerManagement Service GetSubscriberinfo con número telefónico válido
    Cuando se ejecuta la API CustomerManagement Service GetSubscriberinfo con número telefónico válido
    ...    ${NUMERO_TELEFONICO_SUSCRIPTOR}

    # THEN: BES procesa la petición y genera respuesta con información del suscriptor
    Entonces BES procesa la petición y genera una respuesta con la información del suscriptor

    # AND: Validar que la respuesta contiene el campo serviceNumber con el número telefónico consultado
    Y la respuesta contiene el campo serviceNumber con el número telefónico consultado
    ...    ${NUMERO_TELEFONICO_SUSCRIPTOR}

    # AND: Validar que la respuesta contiene los campos subscriberId, activeDate, statusTime
    Y la respuesta contiene los campos subscriberId activeDate statusTime

    # AND: Validar que la respuesta contiene los campos paymentType, status, primaryOfferingId, primaryOfferingName
    Y la respuesta contiene los campos paymentType status primaryOfferingId primaryOfferingName

    # THEN: Validar que la respuesta contiene los campos accountId y CustID
    Entonces la respuesta contiene los campos accountId y CustID
