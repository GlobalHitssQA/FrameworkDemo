*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_AMIGO}    5512345679

*** Test Cases ***
Validar Activación De Un Solo Paquete Internet Amigo Sin Suma
    [Documentation]    ID: 24
    ...                Título: Validar activación de un solo Paquete Internet Amigo sin suma
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Activación de Paquetes Internet Amigo
    ...                Escenario: Verificar el comportamiento del sistema cuando un usuario activa únicamente
    ...                un paquete Internet Amigo sin tener otros paquetes activos
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario Amigo sin paquetes Internet Amigo activos; Sistema UPC disponible;
    ...                Paquete Internet Amigo disponible para activación
    [Tags]    PruebaGeneradaIA    Venta    PaquetesInternetAmigo    UPC    Funcional    ActivacionSinSuma
    Given el usuario Amigo no tiene paquetes Internet Amigo activos
    When activa un solo paquete Internet Amigo de cualquier denominación
    Then el sistema muestra los MBs de navegación libre correspondientes al paquete activado
    And el sistema muestra la vigencia correspondiente al paquete activado según su denominación
    And el usuario recibe un mensaje de texto confirmando la activación con la vigencia del paquete adquirido

*** Keywords ***
El Usuario Amigo No Tiene Paquetes Internet Amigo Activos
    Acceder A Módulo De Paquetes Internet Amigo
    Buscar Usuario Amigo Sin Paquetes Activos    ${NUMERO_LINEA_AMIGO}

Activa Un Solo Paquete Internet Amigo De Cualquier Denominación
    Activar Un Solo Paquete Internet Amigo

El Sistema Muestra Los MBs De Navegación Libre Correspondientes Al Paquete Activado
    Consultar Y Verificar Datos De Navegación Asignados

El Sistema Muestra La Vigencia Correspondiente Al Paquete Activado Según Su Denominación
    Consultar Y Verificar Vigencia Del Paquete Activado

El Usuario Recibe Un Mensaje De Texto Confirmando La Activación Con La Vigencia Del Paquete Adquirido
    Verificar Recepción De Notificación SMS De Activación
