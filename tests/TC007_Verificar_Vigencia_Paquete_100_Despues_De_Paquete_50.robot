*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Verificar que se muestra vigencia del Paquete 100 al activar después del Paquete 50
    [Documentation]    ID: 7
    ...                Título: Verificar que se muestra vigencia del Paquete 100 al activar después del Paquete 50
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    ...                Escenario: Verificar que la vigencia del paquete mayor prevalece cuando se activa
    ...                el Paquete Internet Amigo 100 después del Paquete Internet Amigo 50
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: low
    ...                Técnica ISTQB: Transición de estados
    ...                Precondición: Usuario prepago autenticado; Línea activa;
    ...                Capacidad de activar paquetes en días consecutivos
    [Tags]    PruebaGeneradaIA    Venta    PaquetesInternetAmigo    UPC    Funcional
    Given el usuario prepago está en el módulo de Paquetes Internet Amigo con línea activa
    When activa el Paquete Internet Amigo 50 y registra su fecha de vigencia
    And activa el Paquete Internet Amigo 100 un día después del paquete 50
    Then el sistema muestra la vigencia del Paquete 100 como vigencia de la bolsa consolidada

*** Keywords ***
El Usuario Prepago Está En El Módulo De Paquetes Internet Amigo Con Línea Activa
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa El Paquete Internet Amigo 50 Y Registra Su Fecha De Vigencia
    Activar Paquete Amigo 50 Y Guardar Vigencia

Activa El Paquete Internet Amigo 100 Un Día Después Del Paquete 50
    Simular Espera De Un Día
    Activar Paquete Amigo 100 En La Misma Línea

El Sistema Muestra La Vigencia Del Paquete 100 Como Vigencia De La Bolsa Consolidada
    Consultar Vigencia En Plataformas
    Verificar Vigencia Corresponde A Paquete Internet Amigo 100 En Todas Las Plataformas
