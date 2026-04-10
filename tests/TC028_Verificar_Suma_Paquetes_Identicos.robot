*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_AMIGO}    5512345678

*** Test Cases ***
Verificar Comportamiento Al Activar Dos Paquetes Internet Amigo Idénticos
    [Documentation]    ID: 28
    ...                Título: Verificar comportamiento al activar dos paquetes Internet Amigo idénticos
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Suma de Paquetes Internet Amigo
    ...                Escenario: Verificar que al activar dos paquetes Internet Amigo de la misma denominación,
    ...                los datos se sumen y se mantenga la vigencia correspondiente
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario Amigo sin paquetes Internet Amigo activos;
    ...                Sistema UPC disponible; Dos paquetes Internet Amigo de la misma denominación disponibles
    [Tags]    PruebaGeneradaIA    Venta    PaquetesInternetAmigo    UPC    Funcional    PaquetesIdenticos
    Given el usuario Amigo sin paquetes activos está autenticado en el módulo de Internet Amigo
    When activa un paquete Internet Amigo de una denominación específica
    And activa un segundo paquete Internet Amigo de la misma denominación
    Then el sistema muestra una única bolsa con la suma de MBs de ambos paquetes idénticos
    And el sistema mantiene la vigencia del paquete correspondiente a esa denominación
    And el sistema conserva los beneficios del paquete sin duplicarlos
    And el usuario recibe notificaciones de activación para cada paquete con la vigencia correspondiente

*** Keywords ***
El Usuario Amigo Sin Paquetes Activos Está Autenticado En El Módulo De Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Buscar Usuario Amigo Sin Paquetes Activos    ${NUMERO_LINEA_AMIGO}

Activa Un Paquete Internet Amigo De Una Denominación Específica
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

Activa Un Segundo Paquete Internet Amigo De La Misma Denominación
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

El Sistema Muestra Una Única Bolsa Con La Suma De MBs De Ambos Paquetes Idénticos
    Consultar Datos Disponibles En Plataformas
    Verificar Visualización De Una Sola Bolsa Consolidada

El Sistema Mantiene La Vigencia Del Paquete Correspondiente A Esa Denominación
    Consultar Vigencia En Plataformas
    Abrir Pestaña Plataforma 360
    ${vigencia_360}=    Obtener Vigencia En Plataforma 360
    Should Not Be Empty    ${vigencia_360}
    Log    Vigencia del paquete en Plataforma 360: ${vigencia_360}

El Sistema Conserva Los Beneficios Del Paquete Sin Duplicarlos
    Consultar Beneficios De La Línea
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

El Usuario Recibe Notificaciones De Activación Para Cada Paquete Con La Vigencia Correspondiente
    Abrir Seccion De Notificaciones SMS
    Ver Mensaje De Activacion
    Verificar Mensaje Confirma Activacion Del Paquete
    Cerrar Modal De Mensaje SMS
