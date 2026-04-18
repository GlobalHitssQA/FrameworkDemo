*** Settings ***
Documentation    Caso de prueba: Comprobar consulta de información del cliente desde PAC Micrositio
...              Proceso: Consulta
...              Aplicación: PAC Micrositio
...              Funcionalidad: Consulta de información de crédito
...              Escenario: Verificar la consulta de información del cliente Amigo Paguitos
...              desde PAC Micrositio hacia BES cuando se proporciona el número telefónico
...              como parámetro
...
...              Precondiciones:
...              - Cliente con financiamiento activo en BES
...              - PAC Micrositio autenticado y con permisos
...              - Servicio PACPagosService desplegado en Capa de Integración
...              - APIs de BES disponibles (CustomerManagement Service, Telcel custom service, BCService, ArService)
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente
${NUMERO_TELEFONICO_CLIENTE}     5512345678

# Datos esperados en la respuesta - Service y Subscriber
${SERVICE_NUMBER_ESPERADO}       5512345678
${SUBSCRIBER_ID_ESPERADO}        SUB987654321
${ACCOUNT_ID_ESPERADO}           ACC123456789
${CUSTOMER_ID_ESPERADO}          CUS123456789
${STATUS_ESPERADO}               Activo

# Datos esperados en la respuesta - Equipo
${IMEI_ESPERADO}                 123456789012345

# Datos esperados en la respuesta - Financiamiento
${INSTALLMENT_PLAN_ID_ESPERADO}  INST987654321
${TOTAL_CYCLE_ESPERADO}          12
${BALANCE_TYPE_ESPERADO}         Postpago
${AR_BALANCE_ESPERADO}           10500.00

# Datos esperados en la respuesta - Información Personal
${FIRSTNAME_ESPERADO}            Juan
${LASTNAME_ESPERADO}             Pérez García
${CURP_ESPERADO}                 PEGJ850315HDFRNN09
${RFC_ESPERADO}                  PEGJ850315ABC
${REGION_NAME_ESPERADO}          Ciudad de México

*** Test Cases ***
Comprobar Consulta De Información Del Cliente Desde PAC Micrositio
    [Documentation]    Este caso de prueba verifica que PAC Micrositio puede consultar
    ...                exitosamente la información completa del cliente Amigo Paguitos
    ...                desde BES utilizando el número telefónico como parámetro.
    ...
    ...                Flujo de integración:
    ...                1. PAC Micrositio invoca PACPagosService.Consulta con número telefónico
    ...                2. Capa de Integración recibe y redirige la solicitud hacia BES
    ...                3. BES consume APIs (CustomerManagement, Telcel custom, BCService, ArService)
    ...                4. BES devuelve información consolidada del cliente y su financiamiento
    ...                5. PAC Micrositio recibe y muestra toda la información correctamente
    ...
    ...                Campos verificados:
    ...                - serviceNumber, subscriberId, activeDate, status, accountId, CustID
    ...                - IMEI, installmentPlanInstId, totalCycle, balancetype, ARBalance
    ...                - Firstname, lastName, CURP, RFC, regionName
    [Tags]    PruebaGeneradaIA    Funcional    PACMicrositio    Consulta    Integracion

    # WHEN: PAC Micrositio invoca el servicio PACPagosService.Consulta con número telefónico
    Cuando PAC Micrositio invoca el servicio de consulta con el número telefónico del cliente
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # THEN: Capa de Integración recibe la solicitud y la redirige hacia BES
    Entonces Capa de Integración recibe la solicitud y redirige hacia BES

    # AND: BES consume las APIs y devuelve toda la información del cliente
    Y BES devuelve toda la información del cliente incluyendo todos los campos requeridos

    # AND: PAC Micrositio recibe la respuesta consolidada con toda la información
    Entonces PAC Micrositio recibe la respuesta consolidada con información del cliente y financiamiento
    ...    ${SERVICE_NUMBER_ESPERADO}
    ...    ${SUBSCRIBER_ID_ESPERADO}
    ...    ${ACCOUNT_ID_ESPERADO}
    ...    ${CUSTOMER_ID_ESPERADO}
    ...    ${IMEI_ESPERADO}
    ...    ${INSTALLMENT_PLAN_ID_ESPERADO}
    ...    ${TOTAL_CYCLE_ESPERADO}
    ...    ${BALANCE_TYPE_ESPERADO}
    ...    ${AR_BALANCE_ESPERADO}
    ...    ${FIRSTNAME_ESPERADO}
    ...    ${LASTNAME_ESPERADO}
    ...    ${CURP_ESPERADO}
    ...    ${RFC_ESPERADO}
    ...    ${REGION_NAME_ESPERADO}
