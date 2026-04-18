*** Settings ***
Documentation    Caso de prueba: Validar consulta de propiedades de offering vía GetOfferingProp
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Administración de crédito Amigo Paguitos
...              Escenario: Verificar la consulta de propiedades de offering en BES cuando se requieren
...              datos del plan de financiamiento
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Cliente con offering activo en BES
...              - Servicios de BES disponibles
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con offering activo
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Validar Consulta De Propiedades De Offering Vía GetOfferingProp
    [Documentation]    Este caso de prueba verifica que el servicio GetOfferingProp de BES
    ...                retorna correctamente las propiedades del offering asociado a un cliente,
    ...                incluyendo primaryOfferingId, primaryOfferingName y paymentType necesarios
    ...                para la administración del crédito en Amigo Paguitos.
    ...
    ...                Pasos:
    ...                1. Enviar número telefónico al servicio GetOfferingProp de BES
    ...                2. Ejecutar consulta de propiedades del offering asociado
    ...                3. Validar que los datos retornados correspondan al cliente
    ...                4. Verificar que la respuesta incluya el tipo de pago
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    Cobranza

    # WHEN: Se envía número telefónico al servicio GetOfferingProp
    Cuando se envía número telefónico al servicio GetOfferingProp de BES
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: El servicio procesa la petición correctamente
    Entonces el servicio procesa la petición correctamente

    # AND: BES retorna primaryOfferingId y primaryOfferingName
    Y BES retorna primaryOfferingId y primaryOfferingName

    # AND: Los campos primaryOfferingId y primaryOfferingName contienen información válida
    Entonces los campos primaryOfferingId y primaryOfferingName contienen información válida

    # AND: Los datos retornados corresponden al cliente consultado
    Y los datos retornados corresponden al cliente consultado
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # AND: La respuesta incluye el campo paymentType
    Entonces la respuesta incluye el campo paymentType

    # AND: El campo paymentType está presente con valor correcto
    Y el campo paymentType está presente con valor correcto
