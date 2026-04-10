*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_AMIGO}    5512345678

*** Test Cases ***
Verificar Activación De Tres O Más Paquetes Internet Amigo Consecutivos
    [Documentation]    ID: 25
    ...                Título: Verificar activación de tres o más paquetes Internet Amigo consecutivos
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Suma de Paquetes Internet Amigo
    ...                Escenario: Verificar que al activar tres o más paquetes Internet Amigo de manera consecutiva,
    ...                los datos se sumen correctamente y se mantenga la vigencia del paquete mayor
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: high
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario Amigo sin paquetes Internet Amigo activos;
    ...                Sistema UPC disponible; Tres o más paquetes Internet Amigo disponibles para activación
    [Tags]    PruebaGeneradaIA    Venta    PaquetesInternetAmigo    UPC    Funcional    SumaMultiplePaquetes
    Given el usuario Amigo sin paquetes activos está en el módulo de Paquetes Internet Amigo
    When activa el primer paquete Internet Amigo y registra sus datos y vigencia
    And activa el segundo paquete Internet Amigo diferente en el mismo usuario
    And activa el tercer paquete Internet Amigo en el mismo usuario
    Then el sistema muestra una única bolsa con la suma de los MBs de navegación libre de los tres paquetes
    And el sistema muestra la vigencia del paquete con mayor vigencia de los tres activados
    And el sistema conserva los beneficios del paquete con mayores beneficios

*** Keywords ***
El Usuario Amigo Sin Paquetes Activos Está En El Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Buscar Usuario Amigo Sin Paquetes Activos    ${NUMERO_LINEA_AMIGO}

Activa El Primer Paquete Internet Amigo Y Registra Sus Datos Y Vigencia
    Activar Primer Paquete Y Registrar Datos Y Vigencia

Activa El Segundo Paquete Internet Amigo Diferente En El Mismo Usuario
    Activar Segundo Paquete Consecutivo

Activa El Tercer Paquete Internet Amigo En El Mismo Usuario
    Activar Tercer Paquete Consecutivo

El Sistema Muestra Una Única Bolsa Con La Suma De Los MBs De Navegación Libre De Los Tres Paquetes
    Consultar Datos Disponibles En Plataformas
    Verificar Visualización De Una Sola Bolsa Consolidada

El Sistema Muestra La Vigencia Del Paquete Con Mayor Vigencia De Los Tres Activados
    Consultar Vigencia En Plataformas
    Verificar Vigencia Resultante Del Paquete Mayor

El Sistema Conserva Los Beneficios Del Paquete Con Mayores Beneficios
    Consultar Beneficios De La Línea
    Verificar Beneficios Del Paquete Mayor Están Activos
