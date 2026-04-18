*** Settings ***
Documentation    Caso de prueba ID 18: Verificación de APIs de creación de préstamo en BES
...              Proceso: Administración de crédito
...              Aplicación: BES
...              Funcionalidad: APIs de creación de préstamo
...              Escenario: Verificar que las APIs de BES para creación de préstamo funcionen correctamente
...              recibiendo y procesando la información del cliente, préstamo y equipo provista por Amigo Paguitos
...
...              Precondiciones:
...              - APIs de BES disponibles y configuradas
...              - Base de datos BES operativa
...              - Datos de prueba válidos para creación de préstamo
...              - Conexión entre AP.AG y BES establecida
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Parámetros para creación de préstamo
${NUMERO_TELEFONICO}              5512345678
${ACCOUNT_ID_CLIENTE}             ACC123456
${CUSTOMER_ID_CLIENTE}            CUST789012
${IMEI_EQUIPO}                    123456789012345
${INSTALLMENT_PLAN_INST_ID}       PLAN345678
${TOTAL_CYCLE}                    12
${TOTAL_AMOUNT}                   12000.00
${CYCLE_SEQUENCE}                 1
${INITIAL_AMOUNT}                 1000.00

*** Test Cases ***
Verificación De APIs De Creación De Préstamo En BES
    [Documentation]    Este caso de prueba verifica que las APIs de BES para creación de préstamo
    ...                funcionen correctamente recibiendo y procesando la información del cliente,
    ...                préstamo y equipo provista por Amigo Paguitos.
    ...
    ...                Flujo de prueba:
    ...                1. Invocar API CustomerManagementService.GetSubscriberInfo con número telefónico
    ...                2. Invocar API CustomerManagementService.GetAccountInfo con AccountId
    ...                3. Invocar API TelcelCustomService.GetSubscriberAndIMEIInfo para obtener IMEI
    ...                4. Invocar API BCService para crear el plan de financiamiento
    ...                5. Verificar que todas las APIs respondan dentro del timeout establecido
    ...
    ...                Verificaciones:
    ...                - GetSubscriberInfo devuelve información completa del suscriptor
    ...                - GetAccountInfo devuelve información de la cuenta correctamente
    ...                - GetSubscriberAndIMEIInfo devuelve IMEI del equipo asociado
    ...                - BCService crea plan de financiamiento y devuelve confirmación exitosa
    ...                - Todas las APIs responden en tiempo menor a 3 segundos
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    CreacionPrestamo    Medium

    # GIVEN: APIs de BES disponibles y configuradas para creación de préstamo
    Dado que las APIs de BES están disponibles y configuradas para creación de préstamo

    # AND: Conexión entre Amigo Paguitos Autogestión y BES establecida
    Y la conexión entre Amigo Paguitos y BES está establecida

    # WHEN: Se invoca API CustomerManagementService GetSubscriberInfo con número telefónico
    Cuando se invoca API CustomerManagementService GetSubscriberInfo con número telefónico
    ...    ${NUMERO_TELEFONICO}

    # THEN: BES recibe la petición y devuelve información del suscriptor exitosamente
    Entonces BES recibe petición y devuelve información del suscriptor exitosamente
    ...    ${NUMERO_TELEFONICO}

    # AND: La respuesta incluye serviceNumber subscriberId activeDate statusTime paymentType status primaryOfferingId primaryOfferingName accountId CustID
    Y la respuesta incluye todos los campos requeridos del suscriptor para creación de préstamo

    # WHEN: Se invoca API CustomerManagementService GetAccountInfo con AccountId
    Cuando se invoca API CustomerManagementService GetAccountInfo con AccountId
    ...    ${ACCOUNT_ID_CLIENTE}

    # THEN: BES recibe la petición y devuelve la información de la cuenta
    Entonces BES recibe petición y devuelve información de la cuenta
    ...    ${ACCOUNT_ID_CLIENTE}

    # AND: La respuesta incluye billcycleTypeId acctCode collectionProcessFlag
    Y la respuesta incluye billcycleTypeId acctCode collectionProcessFlag

    # WHEN: Se invoca API TelcelCustomService GetSubscriberAndIMEIInfo con número telefónico
    Cuando se invoca API TelcelCustomService GetSubscriberAndIMEIInfo con número telefónico
    ...    ${NUMERO_TELEFONICO}

    # THEN: BES recibe la petición y devuelve el IMEI del equipo asociado al número telefónico
    Entonces BES recibe petición y devuelve IMEI del equipo asociado
    ...    ${IMEI_EQUIPO}

    # WHEN: Se invoca API BCService para crear el plan de financiamiento
    Cuando se invoca API BCService para crear plan de financiamiento
    ...    ${CUSTOMER_ID_CLIENTE}    ${INSTALLMENT_PLAN_INST_ID}    ${TOTAL_CYCLE}    ${TOTAL_AMOUNT}    ${CYCLE_SEQUENCE}    ${INITIAL_AMOUNT}

    # THEN: BES recibe la petición crea el plan de financiamiento y devuelve confirmación exitosa
    Entonces BES crea plan de financiamiento y devuelve confirmación exitosa con identificador
    ...    ${INSTALLMENT_PLAN_INST_ID}

    # WHEN: Se verifica el tiempo de respuesta de todas las APIs invocadas
    Cuando se verifica el tiempo de respuesta de todas las APIs invocadas

    # THEN: Todas las APIs de BES responden exitosamente en tiempo menor a 3 segundos
    Entonces todas las APIs de BES responden exitosamente en tiempo menor a 3 segundos
