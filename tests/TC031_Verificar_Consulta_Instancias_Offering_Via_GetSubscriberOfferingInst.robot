*** Settings ***
Documentation    Caso de prueba: Verificar consulta de instancias de offering vía GetSubscriberOfferingInst
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Administración de crédito Amigo Paguitos
...              Escenario: Verificar la consulta de instancias de offering en BES cuando se solicita
...              información del cliente desde PAC
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Número telefónico válido registrado en BES
...              - Conexión a servicios backend disponible
...
...              Flujo de consulta:
...              1. Enviar solicitud con número telefónico al servicio GetSubscriberOfferingInst
...              2. Validar que BES procese la consulta de instancias de offering
...              3. Verificar que se devuelva installmentPlanInstId en el response
...
...              Campos validados:
...              - serviceNumber: Número telefónico del suscriptor consultado
...              - installmentPlanInstId: Identificador de la instancia del plan de financiamiento
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico de cliente con plan de financiamiento activo
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Verificar Consulta De Instancias De Offering Via GetSubscriberOfferingInst
    [Documentation]    Este caso de prueba verifica la consulta de instancias de offering
    ...                en BES cuando se solicita información del cliente desde PAC mediante
    ...                el servicio TelcelInterfaceService.GetSubscriberOfferingInst.
    ...
    ...                Flujo de integración validado:
    ...                1. Sistema PAC solicita información de instancias de offering
    ...                2. Sistema invoca GetSubscriberOfferingInst con número telefónico
    ...                3. BES procesa la consulta en su base de datos
    ...                4. Sistema valida que la respuesta contiene installmentPlanInstId
    ...                5. Sistema verifica que el installmentPlanInstId corresponde al cliente
    ...
    ...                Información validada:
    ...                - Código de aceptación HTTP 200
    ...                - Campo serviceNumber con el número telefónico consultado
    ...                - Campo installmentPlanInstId con valor numérico válido
    ...                - Correspondencia entre installmentPlanInstId y cliente consultado
    ...
    ...                Validaciones de error:
    ...                - Status code 200 (Transacción exitosa)
    ...                - Campo installmentPlanInstId presente en la respuesta
    ...                - Valor de installmentPlanInstId no vacío y numérico
    ...                - installmentPlanInstId corresponde al plan de financiamiento activo del cliente
    [Tags]    PruebaGeneradaIA    Funcional    Cobranza    BES    API    AmigoPaguitos    ParticionesDeEquivalencia

    # GIVEN: Se prepara una solicitud con número telefónico válido
    Dado que se prepara una solicitud con número telefónico válido para GetSubscriberOfferingInst
    ...    ${NUMERO_TELEFONICO_VALIDO}

    # WHEN: Se envía la solicitud al servicio GetSubscriberOfferingInst con el número telefónico
    Cuando se envía la solicitud al servicio GetSubscriberOfferingInst con el número telefónico

    # THEN: El servicio recibe la petición y retorna código de aceptación
    Entonces el servicio recibe la petición y retorna código de aceptación

    # AND: BES procesa la consulta de instancias de offering ejecutando búsqueda en su base de datos
    Entonces BES procesa la consulta de instancias de offering exitosamente

    # AND: El response contiene el campo installmentPlanInstId con valor válido
    Y el response contiene el campo installmentPlanInstId con valor válido

    # AND: Verifica que el installmentPlanInstId corresponde al cliente consultado
    Y verifica que el installmentPlanInstId corresponde al cliente consultado
