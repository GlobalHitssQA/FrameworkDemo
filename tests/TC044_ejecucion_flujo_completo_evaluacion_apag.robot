*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar ejecución completa del flujo de Evaluación crediticia en AP.AG y transferencia de información hacia BES
    [Tags]    PruebaGeneradaIA    Evaluacion    BES    Integral
    [Documentation]    Verificar la ejecución completa del flujo de Evaluación crediticia en la plataforma
    ...                Amigo Paguitos Autogestión (AP.AG) y la transferencia correcta de la información
    ...                hacia el sistema BES.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Usuario autenticado en AP.AG; Motor de evaluación crediticia disponible;
    ...                Conectividad entre AP.AG y BES activa; APIs de evaluación configuradas
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha completado la Autenticación en AP.AG y accede a la etapa de Evaluación
    When el sistema inicia el proceso de evaluación crediticia del usuario
    And el usuario proporciona la información financiera requerida para evaluación
    And el sistema procesa la información financiera y ejecuta la evaluación crediticia
    Then el sistema muestra el resultado de evaluación con aprobación o rechazo
    And la información de evaluación se transfiere correctamente a BES
    And BES almacena los resultados de evaluación crediticia y monto aprobado

*** Keywords ***
El usuario ha completado la Autenticación en AP.AG y accede a la etapa de Evaluación
    El usuario ha completado Autenticación y accede a Evaluación

El sistema inicia el proceso de evaluación crediticia del usuario
    Iniciar proceso de evaluación crediticia en AP.AG

El usuario proporciona la información financiera requerida para evaluación
    Proporcionar información financiera para evaluación    50000    Empleado    2    Empresa Ejemplo SA    5551234567

El sistema procesa la información financiera y ejecuta la evaluación crediticia
    Ejecutar evaluación crediticia en motor de evaluación

El sistema muestra el resultado de evaluación con aprobación o rechazo
    Verificar resultado de evaluación crediticia mostrado

La información de evaluación se transfiere correctamente a BES
    Verificar transferencia de evaluación crediticia hacia BES    test@telcel.com

BES almacena los resultados de evaluación crediticia y monto aprobado
    Verificar almacenamiento de evaluación crediticia en BES    test@telcel.com    Aprobada    50000
