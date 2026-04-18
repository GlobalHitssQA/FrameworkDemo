*** Settings ***
Documentation    Caso de prueba: Verificar respuesta con installmentPlanInstId desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para administración de crédito
...              Escenario: Verificar que la respuesta de BES contenga el identificador del plan
...              de financiamiento para la administración del crédito
...
...              Precondiciones:
...              - API TelcelInterfaceService QueryCustOfferingInst disponible en BES
...              - CustID válido con plan de financiamiento activo en BES
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con plan de financiamiento activo
${CUST_ID_PRUEBA}                        CUS789456123
${INSTALLMENT_PLAN_INST_ID_ESPERADO}     987654321

*** Test Cases ***
Verificar Respuesta Con installmentPlanInstId Desde BES
    [Documentation]    Este caso de prueba verifica que la respuesta de BES contenga
    ...                el identificador del plan de financiamiento (installmentPlanInstId)
    ...                cuando se ejecuta la API TelcelInterfaceService QueryCustOfferingInst
    ...                con un CustID válido, y que dicho identificador sea numérico válido
    ...                y corresponda al plan de financiamiento activo del cliente.
    ...
    ...                Pasos:
    ...                1. Ejecutar la API TelcelInterfaceService QueryCustOfferingInst con CustID válido
    ...                2. Validar que la respuesta contenga el campo installmentPlanInstId
    ...                3. Validar que el installmentPlanInstId tenga un valor numérico válido
    ...                4. Verificar que el installmentPlanInstId corresponda al plan activo del cliente
    [Tags]    PruebaGeneradaIA    Funcional    BES    Venta    API    ParticionesEquivalencia

    # WHEN: Ejecutar la API TelcelInterfaceService QueryCustOfferingInst con CustID válido
    Cuando se ejecuta la API TelcelInterfaceService QueryCustOfferingInst con un CustID válido
    ...    ${CUST_ID_PRUEBA}

    # THEN: BES procesa la petición y genera una respuesta con el identificador del plan
    Entonces BES procesa la petición QueryCustOfferingInst y genera una respuesta con el identificador del plan

    # AND: Validar que la respuesta contenga el campo installmentPlanInstId
    Y la respuesta contiene el campo installmentPlanInstId

    # AND: Validar que el installmentPlanInstId tenga un valor numérico válido
    Y el installmentPlanInstId tiene un valor numérico válido

    # THEN: Verificar que el installmentPlanInstId corresponda al plan activo del cliente
    Entonces el installmentPlanInstId corresponde al plan de financiamiento activo del cliente
    ...    ${CUST_ID_PRUEBA}
    ...    ${INSTALLMENT_PLAN_INST_ID_ESPERADO}
