*** Settings ***
Documentation    Caso de prueba: Verificar consulta de información del cliente desde Comercio Electrónico
...              Proceso: Consulta
...              Aplicación: Comercio Electrónico
...              Funcionalidad: Consulta de información de crédito
...              Escenario: Verificar la consulta de información del cliente Amigo Paguitos
...              desde Comercio Electrónico hacia BES cuando se solicita información del financiamiento
...
...              Precondiciones:
...              - Cliente con préstamo registrado en BES
...              - Comercio Electrónico con acceso configurado al servicio
...              - Servicio PACPagosService disponible en Capa de Integración
...              - APIs de BES operativas (CustomerManagementService, TelcelCustomService, BCService, ArService)
...
...              Flujo de integración:
...              1. Comercio Electrónico realiza petición al servicio PACPagosService.Consulta con número telefónico
...              2. Comercio Electrónico establece conexión exitosa con Capa de Integración
...              3. Capa de Integración actúa como mediador consumiendo las OPEN APIs de BES
...              4. BES retorna información completa del financiamiento y cliente
...              5. Comercio Electrónico recibe y procesa la respuesta mostrando el estatus del préstamo
...
...              Campos verificados en la respuesta:
...              - primaryOfferingId, primaryOfferingName, billcycletype, acctCode
...              - collectionProcessFlag, installmentStatus, subsidyStatus
...              - cycleSequence, amount, cycleClass, cycleDueDate, shortName
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente
${NUMERO_TELEFONICO_CLIENTE}          5512345678

# Datos esperados en la respuesta - Offering y Account
${PRIMARY_OFFERING_ID_ESPERADO}       OFF12345
${PRIMARY_OFFERING_NAME_ESPERADO}     Plan Amigo Paguitos Básico
${BILLCYCLETYPE_ESPERADO}             Mensual
${ACCT_CODE_ESPERADO}                 ACC-2024-00123
${COLLECTION_PROCESS_FLAG_ESPERADO}   N

# Datos esperados en la respuesta - Financiamiento
${INSTALLMENT_STATUS_ESPERADO}        Activo
${SUBSIDY_STATUS_ESPERADO}            Vigente
${CYCLE_SEQUENCE_ESPERADO}            3
${AMOUNT_ESPERADO}                    1500.00
${CYCLE_CLASS_ESPERADO}               Regular
${CYCLE_DUE_DATE_ESPERADO}            2024-04-30
${SHORT_NAME_ESPERADO}                Juan P.

*** Test Cases ***
Verificar Consulta De Información Del Cliente Desde Comercio Electrónico
    [Documentation]    Este caso de prueba verifica que Comercio Electrónico puede consultar
    ...                exitosamente la información completa del cliente Amigo Paguitos desde BES
    ...                utilizando el servicio PACPagosService.Consulta con el número telefónico
    ...                como parámetro.
    ...
    ...                Flujo validado:
    ...                1. Comercio Electrónico invoca PACPagosService.Consulta con número telefónico
    ...                2. Conexión exitosa establecida con Capa de Integración
    ...                3. Capa de Integración consume APIs de BES (CustomerManagement, TelcelCustom, BC, AR)
    ...                4. BES procesa todas las consultas y devuelve información completa sin errores
    ...                5. Comercio Electrónico recibe respuesta consolidada con estatus del préstamo y datos del cliente
    ...
    ...                Verificaciones realizadas:
    ...                - Todos los campos del financiamiento están presentes
    ...                - Los valores coinciden con los datos del cliente
    ...                - No hay errores en la integración entre sistemas
    ...                - La información se muestra correctamente en Comercio Electrónico
    [Tags]    PruebaGeneradaIA    Funcional    ComercioElectronico    Consulta    Integracion

    # WHEN: Comercio Electrónico realiza petición al servicio PACPagosService.Consulta con número telefónico
    Cuando Comercio Electrónico realiza petición al servicio PACPagosService Consulta con el número telefónico
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: Comercio Electrónico establece conexión exitosa con Capa de Integración y envía la solicitud
    Entonces Comercio Electrónico establece conexión exitosa con Capa de Integración

    # AND: Capa de Integración actúa como mediador y consume las OPEN APIs de BES exitosamente
    Y Capa de Integración actúa como mediador y consume las OPEN APIs de BES

    # AND: BES procesa todas las consultas y devuelve la información solicitada sin errores
    Entonces BES retorna información completa incluyendo todos los campos del financiamiento

    # AND: Comercio Electrónico recibe y procesa correctamente la respuesta consolidada
    Y Comercio Electrónico recibe y procesa correctamente la respuesta consolidada
    ...    ${PRIMARY_OFFERING_ID_ESPERADO}
    ...    ${PRIMARY_OFFERING_NAME_ESPERADO}
    ...    ${BILLCYCLETYPE_ESPERADO}
    ...    ${ACCT_CODE_ESPERADO}
    ...    ${COLLECTION_PROCESS_FLAG_ESPERADO}
    ...    ${INSTALLMENT_STATUS_ESPERADO}
    ...    ${SUBSIDY_STATUS_ESPERADO}
    ...    ${CYCLE_SEQUENCE_ESPERADO}
    ...    ${AMOUNT_ESPERADO}
    ...    ${CYCLE_CLASS_ESPERADO}
    ...    ${CYCLE_DUE_DATE_ESPERADO}
    ...    ${SHORT_NAME_ESPERADO}

    # AND: Comercio Electrónico muestra el estatus del préstamo y datos del cliente de forma clara
    Entonces Comercio Electrónico muestra el estatus del préstamo y datos del cliente
