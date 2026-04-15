*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar ejecución completa del flujo de Autenticación en AP.AG y transferencia de información hacia BES
    [Tags]    PruebaGeneradaIA    Autenticacion    BES    Integral
    [Documentation]    Verificar la ejecución completa del flujo de Autenticación en la plataforma
    ...                Amigo Paguitos Autogestión (AP.AG) y la transferencia correcta de la información
    ...                de autenticación hacia el sistema BES.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Usuario registrado y con legales aceptados en AP.AG;
    ...                Métodos de autenticación configurados; Conectividad entre AP.AG y BES activa
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha completado la etapa de Legales en AP.AG y accede a Autenticación
    When el sistema muestra las opciones de autenticación disponibles
    And el usuario selecciona el método de autenticación y proporciona las credenciales requeridas
    And el usuario completa exitosamente el proceso de autenticación
    Then el sistema confirma la autenticación exitosa y habilita la continuación del flujo
    And la información de autenticación se transfiere correctamente a BES
    And BES registra la autenticación exitosa del usuario asociada al proceso de financiamiento

*** Keywords ***
El usuario ha completado la etapa de Legales en AP.AG y accede a Autenticación
    El usuario ha completado etapa de Legales y accede a Autenticación

El sistema muestra las opciones de autenticación disponibles
    Verificar visualización de opciones de autenticación en AP.AG

El usuario selecciona el método de autenticación y proporciona las credenciales requeridas
    Seleccionar método de autenticación y proporcionar credenciales    123456

El usuario completa exitosamente el proceso de autenticación
    Completar proceso de autenticación exitosamente

El sistema confirma la autenticación exitosa y habilita la continuación del flujo
    Verificar confirmación de autenticación exitosa y continuación de flujo

La información de autenticación se transfiere correctamente a BES
    Verificar transferencia de información de autenticación hacia BES    test@telcel.com

BES registra la autenticación exitosa del usuario asociada al proceso de financiamiento
    Verificar registro de autenticación exitosa en BES    test@telcel.com
