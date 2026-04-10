*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_MIXTO_BES}    5519876543

*** Test Cases ***
Verificar Funcionamiento En Usuarios Mixtos Con Productos Creados En BES
    [Documentation]    ID: 13
    ...                Título: Verificar funcionamiento en usuarios Mixtos con productos creados en BES
    ...                Proceso: Provisión
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que las reglas de negocio de suma de datos y vigencias se aplican correctamente
    ...                en usuarios mixtos con productos BES
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario mixto activo; Productos creados en BES; Sistema UPC disponible;
    ...                Paquetes Internet Amigo configurados
    [Tags]    PruebaGeneradaIA    Provision    PaquetesInternetAmigo    UPC    Funcional    BES    UsuarioMixto
    Given el usuario mixto con productos BES está identificado en el sistema
    When activa un Paquete Internet Amigo de 30 pesos
    And activa un segundo Paquete Internet Amigo de 50 pesos
    Then el sistema muestra la vigencia correspondiente al paquete de 50 pesos
    And el sistema mantiene los beneficios del paquete de 50 pesos
    And el sistema muestra una sola bolsa para navegación libre y una sola para RRSS incluidas

*** Keywords ***
El Usuario Mixto Con Productos BES Está Identificado En El Sistema
    Acceder A Módulo De Paquetes Internet Amigo
    Identificar Usuario Mixto Con Productos BES    ${NUMERO_LINEA_MIXTO_BES}

Activa Un Paquete Internet Amigo De 30 Pesos
    Activar Paquete Internet Amigo 30 Pesos

Activa Un Segundo Paquete Internet Amigo De 50 Pesos
    Activar Paquete Internet Amigo 50 Pesos En Usuario Mixto

El Sistema Muestra La Vigencia Correspondiente Al Paquete De 50 Pesos
    Verificar Vigencia Del Paquete De 50 Pesos

El Sistema Mantiene Los Beneficios Del Paquete De 50 Pesos
    Verificar Beneficios Del Paquete De 50 Pesos

El Sistema Muestra Una Sola Bolsa Para Navegación Libre Y Una Sola Para RRSS Incluidas
    Verificar Bolsa Única Para Navegación Libre Y RRSS
