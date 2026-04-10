*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Validar que no se altera el orden de débito de los paquetes
    [Documentation]    ID: 18
    ...                Título: Validar que no se altera el orden de débito de los paquetes
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que el orden de débito de los paquetes se mantiene sin alteraciones
    ...                después de implementar las nuevas reglas de negocio
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Usuario prepago con línea activa; Sistema UPC configurado;
    ...                Orden de débito original documentado; Paquetes Internet Amigo disponibles
    [Tags]    PruebaGeneradaIA    Provision    PaquetesInternetAmigo    UPC    Funcional
    Given el usuario prepago tiene múltiples Paquetes Internet Amigo activos
    And el orden de débito original está documentado en el sistema
    When el usuario realiza consumo de datos de la bolsa unificada
    Then el orden de débito no ha sido modificado por la suma de datos
    And los logs del sistema confirman que el orden permanece inalterado

*** Keywords ***
El Usuario Prepago Tiene Múltiples Paquetes Internet Amigo Activos
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}
    Activar Multiples Paquetes Internet Amigo En Linea Prepago    PAQ_AMIGO_50    PAQ_AMIGO_100

El Orden De Debito Original Está Documentado En El Sistema
    ${orden_original}=    Registrar Orden De Debito Original Del Sistema
    Log    Orden de débito original registrado: ${orden_original}

El Usuario Realiza Consumo De Datos De La Bolsa Unificada
    Realizar Consumo De Datos De La Bolsa Unificada    50

El Orden De Debito No Ha Sido Modificado Por La Suma De Datos
    Verificar Orden De Debito Se Mantiene Sin Alteraciones

Los Logs Del Sistema Confirman Que El Orden Permanece Inalterado
    Consultar Y Verificar Logs De Debito Del Sistema
