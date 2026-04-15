*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar consulta de saldos del préstamo mediante web services de BES para servicios de terceros
    [Tags]    PruebaGeneradaIA    Posventa    BES    WebServices    Funcional
    [Documentation]    Verificar la consulta de saldos de préstamos mediante los web services provistos por BES
    ...                para servicios de terceros.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Baja
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Préstamo activo en BES con movimientos registrados;
    ...                Web services de consulta publicados y disponibles;
    ...                Usuario autorizado para realizar consultas
    Given el identificador del préstamo está disponible y es válido
    When se invoca el web service de consulta de saldos de BES con el identificador del préstamo
    Then BES recibe la petición de consulta y valida que el préstamo existe
    And el web service retorna saldo actual, saldo vencido, saldo por vencer, próximo pago y fecha de vencimiento
    And la información de saldos es correcta y está actualizada según los pagos registrados

*** Keywords ***
El identificador del préstamo está disponible y es válido
    El préstamo a consultar tiene identificador válido disponible    PREST123456

Se invoca el web service de consulta de saldos de BES con el identificador del préstamo
    Se invoca el web service de consulta de saldos con el identificador del préstamo    PREST123456

BES recibe la petición de consulta y valida que el préstamo existe
    BES recibe la petición y valida que el préstamo existe

El web service retorna saldo actual, saldo vencido, saldo por vencer, próximo pago y fecha de vencimiento
    El web service retorna la información de saldos del préstamo

La información de saldos es correcta y está actualizada según los pagos registrados
    Los saldos mostrados son correctos y están actualizados    45000    0    45000
