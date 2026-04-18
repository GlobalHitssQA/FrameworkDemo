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
# Datos de prueba - Suscriptor
${NUMERO_TELEFONICO_SUSCRIPTOR}    5512345678

*** Test Cases ***
Verificar Respuesta Con Datos De Suscriptor Desde BES
    [Documentation]    Este caso de prueba verifica que la API CustomerManagement Service
    ...                GetSubscriberinfo de BES devuelve todos los campos necesarios del suscriptor
    ...                para la administración del crédito en Amigo Paguitos.
    ...
    ...                Pasos:
    ...                1. Ejecutar la API GetSubscriberinfo con un número telefónico válido
    ...                2. Verificar que BES procesa la petición y genera respuesta exitosa
    ...                3. Validar que la respuesta contiene el campo serviceNumber con el valor correcto
    ...                4. Validar que la respuesta contiene subscriberId, activeDate y statusTime
    ...                5. Validar que la respuesta contiene paymentType, status, primaryOfferingId y primaryOfferingName
    ...                6. Validar que la respuesta contiene accountId y CustID
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    Venta

    # WHEN: Se ejecuta la API CustomerManagement Service GetSubscriberinfo con número telefónico válido
    Cuando se ejecuta la API CustomerManagement Service GetSubscriberinfo con número telefónico válido
    ...    ${NUMERO_TELEFONICO_SUSCRIPTOR}

    # THEN: BES procesa la petición y genera una respuesta con la información del suscriptor
    Entonces BES procesa la petición y genera una respuesta con la información del suscriptor

    # AND: La respuesta contiene el campo serviceNumber con el número telefónico consultado
    Y la respuesta contiene el campo serviceNumber con el número telefónico consultado
    ...    ${NUMERO_TELEFONICO_SUSCRIPTOR}

    # AND: La respuesta contiene los campos subscriberId, activeDate y statusTime con valores válidos
    Y la respuesta contiene los campos subscriberId activeDate statusTime

    # AND: La respuesta contiene los campos paymentType, status, primaryOfferingId y primaryOfferingName con valores válidos
    Y la respuesta contiene los campos paymentType status primaryOfferingId primaryOfferingName

    # AND: La respuesta contiene los campos accountId y CustID con identificadores válidos del suscriptor
    Entonces la respuesta contiene los campos accountId y CustID
