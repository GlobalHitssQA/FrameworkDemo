*** Settings ***
Documentation    Caso de prueba: Comprobar respuesta con estatus de plan de pago desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para Administración de Crédito
...              Escenario: Verificar que BES retorna correctamente el estatus del plan de pago
...              al consultar información de parcialidades asociadas al cliente de Amigo Paguitos
...
...              Precondiciones:
...              - Plan de parcialidades activo registrado en BES
...              - IMEI asociado a un financiamiento válido
...              - Usuario con permisos de consulta autenticado
...              - Servicio TelcelCustomService disponible
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - IMEI con plan de parcialidades activo
${IMEI_CON_PLAN_ACTIVO}    123456789012345

*** Test Cases ***
Comprobar Respuesta Con Estatus De Plan De Pago Desde BES
    [Documentation]    Este caso de prueba verifica que BES retorna correctamente el estatus
    ...                del plan de pago cuando se consulta información de parcialidades asociadas
    ...                al cliente de Amigo Paguitos mediante la API TelcelCustomService.queryInstallmentByIMEI.
    ...
    ...                Pasos:
    ...                1. Ejecutar consulta hacia BES utilizando TelcelCustomService.queryInstallmentByIMEI con un IMEI válido
    ...                2. Recibir la respuesta de BES con los datos del plan de parcialidades
    ...                3. Verificar que el campo installmentStatus contiene un valor válido del catálogo de estatus de plan
    ...                4. Verificar que el campo subsidyStatus indica el estado del subsidio asociado al plan
    ...                5. Validar que la respuesta completa es estructurada correctamente y sin errores de formato
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    API    ParticionesEquivalencia

    # WHEN: Ejecutar consulta hacia BES utilizando TelcelCustomService.queryInstallmentByIMEI con un IMEI válido
    Cuando se ejecuta consulta hacia BES utilizando queryInstallmentByIMEI con IMEI válido
    ...    ${IMEI_CON_PLAN_ACTIVO}

    # THEN: BES es invocada correctamente por el ESB y retorna un objeto con los campos type installmentStatus y subsidyStatus
    Entonces BES procesa la petición queryInstallmentByIMEI y retorna objeto con campos type installmentStatus y subsidyStatus

    # AND: Verificar que el campo installmentStatus contiene un valor válido del catálogo de estatus de plan
    Y el campo installmentStatus contiene valor válido del catálogo de estatus de plan

    # AND: Verificar que el campo subsidyStatus indica el estado del subsidio asociado al plan
    Y el campo subsidyStatus indica estado del subsidio asociado al plan

    # THEN: Validar que la respuesta completa es estructurada correctamente y sin errores de formato
    Entonces la respuesta cumple con el esquema definido y no presenta errores de estructura
