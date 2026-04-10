*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO_BES}    5512345678

*** Test Cases ***
Validar Funcionamiento En Usuarios Prepago Con Productos Creados En BES
    [Documentation]    ID: 12
    ...                Título: Validar funcionamiento en usuarios Prepago con productos creados en BES
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que las nuevas reglas de suma de datos y vigencias funcionan correctamente
    ...                en usuarios prepago con productos creados en BES
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario prepago activo; Productos creados en BES; Sistema UPC operativo;
    ...                Paquetes Internet Amigo disponibles para activación
    [Tags]    PruebaGeneradaIA    Provision    PaquetesInternetAmigo    UPC    Funcional    BES
    Given el usuario prepago con productos BES está identificado en el sistema
    When activa un Paquete Internet Amigo de 50 pesos en la línea
    And activa un segundo Paquete Internet Amigo de 100 pesos un día después
    Then el sistema muestra la vigencia del paquete de 100 pesos que es mayor
    And el sistema mantiene los beneficios de redes sociales ilimitadas del paquete de 100 pesos
    And el sistema muestra una sola bolsa de datos unificada para navegación libre y RRSS

*** Keywords ***
El Usuario Prepago Con Productos BES Está Identificado En El Sistema
    Acceder A Módulo De Paquetes Internet Amigo
    Identificar Usuario Prepago Con Productos BES    ${NUMERO_LINEA_PREPAGO_BES}

Activa Un Paquete Internet Amigo De 50 Pesos En La Línea
    Activar Paquete Internet Amigo 50 Pesos

Activa Un Segundo Paquete Internet Amigo De 100 Pesos Un Día Después
    Activar Paquete Internet Amigo 100 Pesos Un Día Después

El Sistema Muestra La Vigencia Del Paquete De 100 Pesos Que Es Mayor
    Verificar Vigencia Del Paquete Mayor

El Sistema Mantiene Los Beneficios De Redes Sociales Ilimitadas Del Paquete De 100 Pesos
    Verificar Beneficios De Redes Sociales Del Paquete Mayor

El Sistema Muestra Una Sola Bolsa De Datos Unificada Para Navegación Libre Y RRSS
    Verificar Bolsa Única De Datos Para Navegación Y RRSS
