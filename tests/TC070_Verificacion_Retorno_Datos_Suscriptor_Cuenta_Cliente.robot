*** Settings ***
Documentation    TC070: Verificación de retorno de datos de suscriptor, cuenta y cliente
...
...              PROCESO: Ventas
...              APLICACIÓN: BES
...              FUNCIONALIDAD: Administración de crédito Amigo Paguitos
...
...              ESCENARIO: Verificar que la operación ConsultarPaguitos devuelve correctamente
...              los datos de suscriptor, cuenta y cliente cuando se consulta un número telefónico válido
...
...              PRECONDICIONES:
...              - Número telefónico válido con información completa de suscriptor, cuenta y cliente en BES
...              - Servicios CustomerManagementService, TelcelCustomService, BCService y ArService disponibles
...              - Servicio ConsultarPaguitos configurado en Capa de Integración
...
...              TÉCNICA ISTQB: Particiones de equivalencia
...              COMPLEJIDAD: Media

Library          RequestsLibrary
Resource         ../resources/keywords.resource
Test Tags        PruebaGeneradaIA

*** Variables ***
${NUMERO_TELEFONICO_COMPLETO}    5512345678

*** Test Cases ***
Verificación de retorno de datos de suscriptor cuenta y cliente
    [Documentation]    Verifica que la operación ConsultarPaguitos devuelve todos los datos requeridos
    ...                de suscriptor, cuenta y cliente cuando se consulta un número telefónico válido
    ...
    ...                STEP 1: Invocar ConsultarPaguitos con número telefónico con información completa
    ...                STEP 2: Verificar que el response incluye los datos de suscriptor
    ...                STEP 3: Verificar que el response incluye los datos de cuenta
    ...                STEP 4: Verificar que el response incluye los datos de cliente
    ...                STEP 5: Verificar que el response incluye los datos de plan de cuotas
    ...                STEP 6: Verificar que el response incluye los datos de balance
    [Tags]    PruebaGeneradaIA    AmigoPaguitos    ConsultarPaguitos    DatosCliente    ParticionesEquivalencia

    # STEP 1: Invocar la operación ConsultarPaguitos con un número telefónico válido que tenga información completa
    Cuando se invoca ConsultarPaguitos con un número telefónico que tiene información completa
    ...    ${NUMERO_TELEFONICO_COMPLETO}

    # STEP 2: Verificar que el response incluye los datos de suscriptor con todos los campos poblados
    Entonces el response incluye todos los datos de suscriptor con valores poblados

    # STEP 3: Verificar que el response incluye los datos de cuenta con todos los campos poblados
    Y el response incluye todos los datos de cuenta con valores poblados

    # STEP 4: Verificar que el response incluye los datos de cliente con todos los campos poblados
    Y el response incluye todos los datos de cliente con valores poblados

    # STEP 5: Verificar que el response incluye los datos de plan de cuotas con todos los campos poblados
    Y el response incluye todos los datos de plan de cuotas con valores poblados

    # STEP 6: Verificar que el response incluye los datos de balance con todos los campos poblados
    Y el response incluye todos los datos de balance con valores poblados
