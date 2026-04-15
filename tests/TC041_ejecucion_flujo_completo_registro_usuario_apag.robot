*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar ejecución completa del flujo de Registro de Usuario en AP.AG y transferencia hacia BES
    [Tags]    PruebaGeneradaIA    Registro    BES    Integral
    [Documentation]    Verificar la ejecución completa del flujo de Registro de Usuario en la plataforma
    ...                Amigo Paguitos Autogestión (AP.AG) y la transferencia correcta de la información
    ...                del usuario hacia el sistema BES mediante las APIs definidas.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Plataforma AP.AG disponible; Conectividad entre AP.AG y BES activa;
    ...                APIs de BES para creación de usuario configuradas
    ...                Historia de Usuario: IOSPR-868
    Given el usuario accede a la plataforma de Amigo Paguitos Autogestión para iniciar el registro
    When se completa el proceso de registro ingresando todos los datos personales requeridos
    And se validan y completan todos los campos obligatorios del formulario
    And se confirma el registro del usuario en la plataforma
    Then el sistema registra al usuario exitosamente y muestra mensaje de confirmación
    And la información del usuario se transfiere correctamente hacia BES mediante las APIs
    And BES almacena correctamente todos los datos provistos por Amigo Paguitos

*** Keywords ***
El usuario accede a la plataforma de Amigo Paguitos Autogestión para iniciar el registro
    El usuario accede a la plataforma de Amigo Paguitos Autogestión

Se completa el proceso de registro ingresando todos los datos personales requeridos
    Se inicia el proceso de registro ingresando datos personales    Carlos    Martínez González    carlos.martinez@telcel.com    5559876543    Av. Insurgentes Sur 1234, Col. Del Valle

Se validan y completan todos los campos obligatorios del formulario
    Se valida el formulario de registro completo

Se confirma el registro del usuario en la plataforma
    Se confirma el registro del usuario en AP.AG

El sistema registra al usuario exitosamente y muestra mensaje de confirmación
    Verificar confirmación de registro exitoso

La información del usuario se transfiere correctamente hacia BES mediante las APIs
    Se verifica la transferencia de información del usuario hacia BES    carlos.martinez@telcel.com    Carlos Martínez González    5559876543

BES almacena correctamente todos los datos provistos por Amigo Paguitos
    BES almacena correctamente la información del usuario desde Amigo Paguitos    carlos.martinez@telcel.com    Carlos Martínez González    Av. Insurgentes Sur 1234, Col. Del Valle    5559876543
