*** Settings ***
Documentation    Caso de prueba ID 54: Validar consulta de instancia de offering de cliente vía QueryCustOfferingInst
...              Proceso: Administración de Crédito
...              Aplicación: BES
...              Funcionalidad: Consulta de Instancias de Offering
...              Escenario: Verificar la consulta de la instancia de offering del cliente cuando se invoca
...              el servicio QueryCustOfferingInst desde Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Cliente con offering activo en BES
...              - CustID válido disponible para consulta
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con offering activo
${CUST_ID_VALIDO}                  12345678
${INSTALLMENT_PLAN_INST_ID_ESPERADO}    987654321

*** Test Cases ***
Validar Consulta De Instancia De Offering De Cliente Via QueryCustOfferingInst
    [Documentation]    Este caso de prueba verifica la consulta de la instancia de offering del cliente
    ...                cuando se invoca el servicio TelcelInterfaceService.QueryCustOfferingInst desde
    ...                Amigo Paguitos, validando que el ESB procesa la petición correctamente, BES
    ...                consulta la instancia de offering asociada al cliente y devuelve el
    ...                installmentPlanInstId a la Capa de Integración.
    ...
    ...                Pasos:
    ...                1. Invocar TelcelInterfaceService.QueryCustOfferingInst con CustID como parámetro
    ...                2. Validar que BES consulta la instancia de offering asociada al cliente
    ...                3. Verificar que la respuesta contiene el identificador de instancia del plan
    ...                4. Confirmar que installmentPlanInstId se devuelve correctamente a Capa de Integración
    ...
    ...                Verificaciones:
    ...                - El ESB procesa la petición y la envía a BES
    ...                - BES recupera información del offering incluyendo installmentPlanInstId
    ...                - La respuesta incluye installmentPlanInstId y otros atributos del offering
    ...                - Capa de Integración recibe el installmentPlanInstId para posteriores consultas
    [Tags]    PruebaGeneradaIA    Funcional    AdministracionCredito    BES    API    Low

    # GIVEN: Se prepara una petición con CustID válido de un cliente con offering activo
    Dado que se tiene un cliente con CustID válido y offering activo en BES
    ...    ${CUST_ID_VALIDO}

    # WHEN: Se invoca el servicio TelcelInterfaceService.QueryCustOfferingInst
    Cuando se invoca el servicio TelcelInterfaceService QueryCustOfferingInst con el CustID del cliente

    # THEN: El ESB procesa la petición y la envía a BES
    Entonces el ESB procesa la petición QueryCustOfferingInst y BES genera respuesta exitosa

    # AND: BES consulta la instancia de offering asociada al cliente
    Y BES recupera la información del offering incluyendo installmentPlanInstId

    # AND: La respuesta contiene el identificador de la instancia del plan de financiamiento
    Y la respuesta contiene el campo installmentPlanInstId con valor numérico válido

    # AND: El installmentPlanInstId se devuelve correctamente a Capa de Integración
    Y el installmentPlanInstId devuelto corresponde al plan de financiamiento activo del cliente
    ...    ${INSTALLMENT_PLAN_INST_ID_ESPERADO}
