*** Settings ***
Documentation    TC072: Verificación de retorno de información de balance y facturación
...
...              PROCESO: Administración de Crédito
...              APLICACIÓN: BES
...              FUNCIONALIDAD: Consulta de balance y facturación de cuenta
...
...              ESCENARIO: Verificar el retorno de información de balance y facturación desde BES
...              cuando se consulta información de una cuenta Amigo Paguitos
...
...              PRECONDICIONES:
...              - Usuario autenticado
...              - Cuenta prepago activa con financiamiento
...              - Servicios BES disponibles
...
...              TÉCNICA ISTQB: Particiones de equivalencia
...              COMPLEJIDAD: Media

Library          RequestsLibrary
Resource         ../resources/keywords.resource
Test Tags        PruebaGeneradaIA

*** Variables ***
${NUMERO_TELEFONICO_CUENTA_ACTIVA}    5512345678

*** Test Cases ***
Verificación de retorno de información de balance y facturación
    [Documentation]    Verifica el retorno de información de balance y facturación desde BES
    ...                cuando se consulta información de una cuenta Amigo Paguitos
    ...
    ...                STEP 1: Enviar petición con número telefónico asociado a cuenta activa
    ...                STEP 2: Verificar que Capa de Integración invoca ArService.QueryBalance de BES
    ...                STEP 3: Validar que balancetype y ARBalance están presentes en la respuesta
    ...                STEP 4: Verificar que ARBalance representa correctamente el saldo pendiente
    ...                STEP 5: Confirmar que la información de balance se integra en la respuesta final
    [Tags]    PruebaGeneradaIA    AmigoPaguitos    Balance    Facturacion    ParticionesEquivalencia

    # STEP 1: Enviar petición al servicio ConsultarPaguitos con número telefónico válido asociado a cuenta activa
    Cuando se envía petición al servicio ConsultarPaguitos con cuenta activa
    ...    ${NUMERO_TELEFONICO_CUENTA_ACTIVA}

    # STEP 2: Capa de Integración invoca ArService.QueryBalance de BES con el número telefónico como parámetro
    Entonces la Capa de Integración invoca ArService QueryBalance de BES
    Y BES retorna información de balance con balancetype y ARBalance

    # STEP 3: Validar que los campos balancetype y ARBalance estén presentes en la respuesta
    Y los campos balancetype y ARBalance están presentes con valores válidos y no nulos

    # STEP 4: Verificar que el valor de ARBalance represente correctamente el saldo pendiente de la cuenta
    Y el ARBalance representa correctamente el saldo pendiente de la cuenta

    # STEP 5: Confirmar que la información de balance se integre correctamente en la respuesta final al consumidor
    Y la información de balance se integra correctamente en la respuesta final
