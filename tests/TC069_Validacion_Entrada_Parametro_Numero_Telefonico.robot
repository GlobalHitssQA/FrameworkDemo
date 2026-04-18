*** Settings ***
Documentation    TC069: Validación de entrada con parámetro número telefónico
...
...              PROCESO: Ventas
...              APLICACIÓN: BES
...              FUNCIONALIDAD: Administración de crédito Amigo Paguitos
...
...              ESCENARIO: Verificar que la operación ConsultarPaguitos acepta correctamente
...              el parámetro de entrada número telefónico y lo procesa según lo especificado
...
...              PRECONDICIONES:
...              - Servicio ConsultarPaguitos configurado en Capa de Integración
...              - Número telefónico válido con información en BES
...              - Servicios proveedores de BES disponibles
...
...              TÉCNICA ISTQB: Particiones de equivalencia
...              COMPLEJIDAD: Baja

Library          RequestsLibrary
Resource         ../resources/keywords.resource
Test Tags        PruebaGeneradaIA

*** Variables ***
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validación de entrada con parámetro número telefónico
    [Documentation]    Verifica que la operación ConsultarPaguitos acepta y procesa correctamente
    ...                el parámetro de entrada número telefónico
    ...
    ...                STEP 1: Preparar request con número telefónico válido de 10 dígitos
    ...                STEP 2: Enviar el request al servicio ConsultarPaguitos a través de Capa de Integración
    ...                STEP 3: Verificar que el número telefónico se propaga a las llamadas a BES
    ...                STEP 4: Validar que el servicio devuelve información correspondiente al número telefónico
    [Tags]    PruebaGeneradaIA    AmigoPaguitos    ConsultarPaguitos    Validacion    ParticionesEquivalencia

    # STEP 1: Preparar un mensaje de request para ConsultarPaguitos incluyendo el campo número telefónico con un valor válido de 10 dígitos
    Cuando se prepara un mensaje de request para ConsultarPaguitos con número telefónico válido
    ...    ${NUMERO_TELEFONICO_VALIDO}
    Entonces el request se construye correctamente con el parámetro número telefónico

    # STEP 2: Enviar el request al servicio ConsultarPaguitos a través de Capa de Integración
    Cuando se envía el request al servicio ConsultarPaguitos a través de Capa de Integración
    Entonces Capa de Integración recibe el request y extrae el número telefónico correctamente

    # STEP 3: Verificar en los logs que Capa de Integración utiliza el número telefónico como parámetro en las llamadas a los servicios BES
    Y se verifica que el número telefónico se propaga a todos los servicios proveedores de BES

    # STEP 4: Validar que el servicio devuelve información correspondiente al número telefónico enviado en el request
    Y el servicio devuelve información correspondiente al número telefónico enviado
    ...    ${NUMERO_TELEFONICO_VALIDO}
