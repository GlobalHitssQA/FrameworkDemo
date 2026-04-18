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
# Datos de prueba - Suscriptor activo
${TELEFONO_SUSCRIPTOR}    5512345678

*** Test Cases ***
Verificar Respuesta Con Datos De Suscriptor Desde BES
    [Documentation]    Este caso de prueba verifica que la API CustomerManagement Service
    ...                GetSubscriberinfo de BES retorna correctamente todos los campos necesarios
    ...                para la administración del crédito en Amigo Paguitos.
    ...
    ...                Flujo de validación:
    ...                1. Ejecutar API GetSubscriberinfo con número telefónico válido
    ...                2. Verificar que BES procesa la petición exitosamente
    ...                3. Validar campo serviceNumber con el número consultado
    ...                4. Validar campos subscriberId, activeDate, statusTime
    ...                5. Validar campos paymentType, status, primaryOfferingId, primaryOfferingName
    ...                6. Validar campos accountId y CustID
    ...
    ...                Campos validados:
    ...                - serviceNumber (identificador del servicio telefónico)
    ...                - subscriberId (identificador único del suscriptor)
    ...                - activeDate (fecha de activación del servicio)
    ...                - statusTime (fecha y hora del último cambio de estado)
    ...                - paymentType (tipo de pago: prepago/postpago)
    ...                - status (estado actual del suscriptor)
    ...                - primaryOfferingId (identificador de la oferta principal)
    ...                - primaryOfferingName (nombre de la oferta principal)
    ...                - accountId (identificador de la cuenta)
    ...                - CustID (identificador del cliente)
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    IntegracionAmigoPaguitos

    # STEP 1: Ejecutar la API CustomerManagement Service GetSubscriberinfo con número válido
    Cuando se ejecuta la API CustomerManagement Service GetSubscriberinfo con un número telefónico válido
    ...    ${TELEFONO_SUSCRIPTOR}

    # STEP 1 EXPECTED: BES procesa la petición y genera una respuesta
    Entonces BES procesa la petición y genera una respuesta con la información del suscriptor

    # STEP 2: Validar que la respuesta contiene el campo serviceNumber con el valor correcto
    Y la respuesta contiene el campo serviceNumber con el número telefónico consultado
    ...    ${TELEFONO_SUSCRIPTOR}

    # STEP 3: Validar que la respuesta contiene subscriberId, activeDate, statusTime
    Y la respuesta contiene los campos subscriberId activeDate statusTime con valores válidos

    # STEP 4: Validar que la respuesta contiene paymentType, status, primaryOfferingId, primaryOfferingName
    Y la respuesta contiene los campos paymentType status primaryOfferingId primaryOfferingName con valores válidos

    # STEP 5: Validar que la respuesta contiene accountId y CustID
    Entonces la respuesta contiene los campos accountId y CustID con identificadores válidos del suscriptor
