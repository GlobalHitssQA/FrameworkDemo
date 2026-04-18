*** Settings ***
Documentation    Caso de prueba: Validar corrección de valores en encabezado HTTP del request
...              Proceso: Administración de Crédito
...              Aplicación: Enterprise Service Bus (ESB)
...              Funcionalidad: Validación y corrección de encabezados HTTP
...              Escenario: Verificar que después de recibir el error ESB17, el consumidor pueda
...              corregir los valores en el encabezado HTTP del request y ejecutar exitosamente
...              la consulta al servicio PACPagosService
...
...              Precondiciones:
...              - Servicio PACPagosService desplegado y disponible
...              - Usuario con credenciales válidas y permisos asignados
...              - Datos de cliente Amigo Paguitos existentes en BES para consulta
...              - Especificación de encabezados HTTP documentada
...
...              Técnica ISTQB: Casos de error
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Número telefónico válido de cliente Amigo Paguitos
${NUMERO_TELEFONICO_VALIDO}    5512345678

*** Test Cases ***
Validar Corrección De Valores En Encabezado HTTP Del Request
    [Documentation]    Este caso de prueba verifica que después de recibir el error ESB17 por encabezados
    ...                HTTP inválidos, el consumidor pueda corregir los valores en el encabezado HTTP del
    ...                request y ejecutar exitosamente la consulta al servicio PACPagosService.
    ...
    ...                Flujo de validación:
    ...                1. Ejecutar inicialmente una petición al servicio PACPagosService con encabezados HTTP inválidos para provocar el error ESB17
    ...                2. Revisar el mensaje de error ESB17 y la especificación del servicio PACPagosService para identificar los encabezados HTTP requeridos (sendBy, user, Token, ClientId)
    ...                3. Corregir la petición HTTP agregando todos los encabezados requeridos con valores válidos que correspondan al ambiente correcto (pruebas, QA o producción)
    ...                4. Enviar nuevamente la petición corregida al servicio PACPagosService con el número telefónico válido en el payload
    ...                5. Verificar que el sistema valide exitosamente los encabezados HTTP y permita el procesamiento de la petición
    ...                6. Validar que la petición se ejecute completamente y retorne la información del cliente de Amigo Paguitos con código de éxito ESB0
    [Tags]    PruebaGeneradaIA    CasosDeError    ESB    ValidacionEncabezados    CorreccionErrores

    [Setup]    Dado que el servicio PACPagosService está disponible

    # STEP 1: Ejecutar inicialmente una petición al servicio PACPagosService con encabezados HTTP inválidos para provocar el error ESB17
    Cuando envío una petición con encabezados HTTP inválidos    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 1 (validación): El ESB retorna el error ESB17 indicando que el encabezado HTTP del mensaje de entrada no es válido
    Entonces el sistema retorna error ESB17

    # STEP 2: Revisar el mensaje de error ESB17 y la especificación del servicio PACPagosService para identificar los encabezados HTTP requeridos (sendBy, user, Token, ClientId)
    Y identifico los encabezados HTTP requeridos

    # STEP 3: Corregir la petición HTTP agregando todos los encabezados requeridos con valores válidos que correspondan al ambiente correcto (pruebas, QA o producción)
    Cuando corrijo la petición con encabezados HTTP válidos

    # STEP 4: Enviar nuevamente la petición corregida al servicio PACPagosService con el número telefónico válido en el payload
    Y envío la petición corregida al servicio    ${NUMERO_TELEFONICO_VALIDO}

    # STEP 5: Verificar que el sistema valide exitosamente los encabezados HTTP y permita el procesamiento de la petición
    Entonces el ESB valida exitosamente los encabezados HTTP

    # STEP 6: Validar que la petición se ejecute completamente y retorne la información del cliente de Amigo Paguitos con código de éxito ESB0
    Y el servicio retorna la información del cliente con código ESB0

    [Teardown]    Finalmente cierro la sesión del servicio
