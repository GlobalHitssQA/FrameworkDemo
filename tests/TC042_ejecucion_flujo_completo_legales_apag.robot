*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar ejecución completa del flujo de Legales en AP.AG y transferencia de información hacia BES
    [Tags]    PruebaGeneradaIA    Legales    BES    Integral
    [Documentation]    Verificar la ejecución completa del flujo de Legales en Amigo Paguitos Autogestión (AP.AG)
    ...                y la transferencia correcta de la información de aceptación legal hacia el sistema BES.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Usuario registrado en AP.AG; Documentos legales configurados en el sistema;
    ...                Conectividad entre AP.AG y BES activa
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha completado el registro en AP.AG y accede a la etapa de Legales
    When el sistema muestra los términos y condiciones legales aplicables al financiamiento
    And el usuario revisa los documentos legales presentados
    And el usuario acepta los términos y condiciones mediante el mecanismo de aceptación
    And el usuario confirma la aceptación de los documentos legales
    Then el sistema registra la aceptación y avanza a la siguiente etapa del flujo
    And la información de aceptación de legales se transfiere correctamente a BES
    And BES almacena la información de aceptación legal asociada al préstamo del usuario

*** Keywords ***
El usuario ha completado el registro en AP.AG y accede a la etapa de Legales
    El usuario ha completado registro previo y accede a etapa de Legales

El sistema muestra los términos y condiciones legales aplicables al financiamiento
    Verificar visualización de términos y condiciones legales

El usuario revisa los documentos legales presentados
    Revisar documentos legales presentados en pantalla de Legales

El usuario acepta los términos y condiciones mediante el mecanismo de aceptación
    Aceptar términos y condiciones mediante checkboxes

El usuario confirma la aceptación de los documentos legales
    Confirmar aceptación de documentos legales

El sistema registra la aceptación y avanza a la siguiente etapa del flujo
    Verificar registro de aceptación y avance a siguiente etapa

La información de aceptación de legales se transfiere correctamente a BES
    Verificar transferencia de aceptación legal hacia BES    test@telcel.com

BES almacena la información de aceptación legal asociada al préstamo del usuario
    Verificar almacenamiento de aceptación legal en BES    test@telcel.com
