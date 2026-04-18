*** Settings ***
Documentation    Caso de prueba: Comprobar respuesta con IMEI del equipo desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para administración de crédito
...              Escenario: Verificar que la respuesta de BES contenga el IMEI correcto del equipo
...              para la gestión del financiamiento
...
...              Precondiciones:
...              - API TelcelCustomService GetSubscriberAndIMEIInfo disponible en BES
...              - Número telefónico con equipo y IMEI registrados en BES
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Suscriptor con equipo
${NUMERO_TELEFONICO_EQUIPO}    5512345678
${IMEI_ESPERADO_EQUIPO}        123456789012345

*** Test Cases ***
Comprobar Respuesta Con IMEI Del Equipo Desde BES
    [Documentation]    Este caso de prueba verifica que la API TelcelCustomService
    ...                GetSubscriberAndIMEIInfo de BES devuelve el IMEI correcto del equipo
    ...                asociado al número telefónico consultado para la gestión del financiamiento
    ...                en Amigo Paguitos.
    ...
    ...                Pasos:
    ...                1. Ejecutar la API GetSubscriberAndIMEIInfo con un número telefónico válido
    ...                2. Verificar que BES procesa la petición y genera respuesta con el IMEI
    ...                3. Validar que la respuesta contiene el campo IMEI
    ...                4. Validar que el IMEI tiene el formato correcto de 15 dígitos numéricos
    ...                5. Verificar que el IMEI corresponde al equipo asociado al número telefónico consultado
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    Venta

    # WHEN: Se ejecuta la API TelcelCustomService GetSubscriberAndIMEIInfo con número telefónico válido
    Cuando se ejecuta la API TelcelCustomService GetSubscriberAndIMEIInfo con un número telefónico válido
    ...    ${NUMERO_TELEFONICO_EQUIPO}

    # THEN: BES procesa la petición y genera una respuesta con el IMEI del equipo
    Entonces BES procesa la petición y genera una respuesta con el IMEI del equipo

    # AND: La respuesta contiene el campo IMEI
    Y la respuesta contiene el campo IMEI

    # AND: El IMEI tiene el formato correcto de 15 dígitos numéricos
    Y el IMEI tiene el formato correcto de 15 dígitos numéricos

    # AND: El IMEI devuelto corresponde al equipo correcto registrado en BES para ese número telefónico
    Entonces el IMEI corresponde al equipo asociado al número telefónico consultado
    ...    ${NUMERO_TELEFONICO_EQUIPO}    ${IMEI_ESPERADO_EQUIPO}
