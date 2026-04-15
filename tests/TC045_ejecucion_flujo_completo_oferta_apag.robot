*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar ejecución completa del flujo de Oferta en AP.AG y transferencia de información hacia BES
    [Tags]    PruebaGeneradaIA    Oferta    BES    Integral
    [Documentation]    Verificar la ejecución completa del flujo de Oferta en Amigo Paguitos Autogestión (AP.AG)
    ...                y la transferencia correcta de la información de la oferta aceptada hacia el sistema BES.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: Evaluación crediticia aprobada en AP.AG; Ofertas configuradas en el sistema según políticas de negocio;
    ...                Conectividad entre AP.AG y BES activa
    ...                Historia de Usuario: IOSPR-868
    Given el usuario ha completado la Evaluación exitosamente y accede a la etapa de Oferta
    When el sistema muestra las opciones de financiamiento disponibles según la evaluación crediticia
    And el usuario revisa las diferentes opciones de oferta presentadas con plazos y periodicidades
    And el usuario selecciona la opción de financiamiento que se ajusta a sus necesidades
    And el usuario confirma la aceptación de la oferta seleccionada
    Then el sistema registra la oferta aceptada y habilita la continuación del flujo de venta
    And la información de la oferta aceptada se transfiere correctamente a BES
    And BES almacena la información del préstamo con el calendario de pagos definido

*** Keywords ***
El usuario ha completado la Evaluación exitosamente y accede a la etapa de Oferta
    El usuario completa evaluación crediticia exitosamente y navega a Oferta

El sistema muestra las opciones de financiamiento disponibles según la evaluación crediticia
    Verificar visualización de opciones de financiamiento disponibles

El usuario revisa las diferentes opciones de oferta presentadas con plazos y periodicidades
    Revisar opciones de oferta con diferentes plazos y periodicidades

El usuario selecciona la opción de financiamiento que se ajusta a sus necesidades
    Seleccionar opción de financiamiento específica    12    mensual

El usuario confirma la aceptación de la oferta seleccionada
    Confirmar aceptación de la oferta seleccionada

El sistema registra la oferta aceptada y habilita la continuación del flujo de venta
    Verificar registro de oferta aceptada y habilitación del flujo

La información de la oferta aceptada se transfiere correctamente a BES
    Verificar transferencia de información de oferta hacia BES    ABC123456

BES almacena la información del préstamo con el calendario de pagos definido
    Verificar almacenamiento de oferta en BES con calendario de pagos    ABC123456    12    mensual
