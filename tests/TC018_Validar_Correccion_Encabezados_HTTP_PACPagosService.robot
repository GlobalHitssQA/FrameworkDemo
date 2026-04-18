*** Settings ***
Documentation    TC018: Validar corrección de valores en encabezado HTTP del request
...
...              PROCESO: Administración de Crédito
...              APLICACIÓN: Enterprise Service Bus (ESB)
...              FUNCIONALIDAD: Validación y corrección de encabezados HTTP
...
...              ESCENARIO: Verificar que después de recibir el error ESB17, el consumidor
...              pueda corregir los valores en el encabezado HTTP del request y ejecutar
...              exitosamente la consulta al servicio PACPagosService
...
...              PRECONDICIONES:
...              - Servicio PACPagosService desplegado y disponible
...              - Usuario con credenciales válidas y permisos asignados
...              - Datos de cliente Amigo Paguitos existentes en BES para consulta
...              - Especificación de encabezados HTTP documentada

Library          RequestsLibrary
Resource         ../resources/keywords.resource
Test Tags        PruebaGeneradaIA
Test Teardown    Finalmente cierro la sesión del servicio

*** Variables ***
${TELEFONO_CLIENTE_PRUEBA}    5512345678

*** Test Cases ***
Validar corrección de valores en encabezado HTTP del request
    [Documentation]    Verifica que el consumidor pueda corregir encabezados HTTP inválidos
    ...                y ejecutar exitosamente la consulta al servicio PACPagosService
    ...                después de recibir el error ESB17
    [Tags]    PruebaGeneradaIA    ESB    PACPagosService    ValidacionEncabezados    ESB17

    # STEP 1: Provocar error ESB17 con encabezados inválidos
    Dado que el servicio PACPagosService está disponible
    Cuando envío una petición con encabezados HTTP inválidos    ${TELEFONO_CLIENTE_PRUEBA}
    Entonces el sistema retorna error ESB17

    # STEP 2-3: Identificar y corregir encabezados HTTP
    Y identifico los encabezados HTTP requeridos
    Cuando corrijo la petición con encabezados HTTP válidos

    # STEP 4-6: Enviar petición corregida y validar respuesta exitosa
    Y envío la petición corregida al servicio    ${TELEFONO_CLIENTE_PRUEBA}
    Entonces el ESB valida exitosamente los encabezados HTTP
    Y el servicio retorna la información del cliente con código ESB0
