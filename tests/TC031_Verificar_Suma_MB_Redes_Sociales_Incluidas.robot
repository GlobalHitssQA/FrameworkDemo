*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Verificar Que Se Suman Correctamente Los MB De Redes Sociales Incluidas
    [Documentation]    ID: 31
    ...                Título: Verificar que se suman correctamente los MB de redes sociales incluidas
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que al activar múltiples Paquetes Internet Amigo los MB de redes sociales
    ...                se suman correctamente en una sola bolsa unificada
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: low
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondición: Usuario prepago o mixto autenticado; Sistema UPC disponible;
    ...                Paquetes Internet Amigo disponibles para activación
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Funcional    RRSS
    Given el usuario prepago está en el módulo de Paquetes Internet Amigo
    When activa el Paquete Internet Amigo de 100 pesos con redes sociales ilimitadas
    And activa el Paquete Internet Amigo de 50 pesos con MB de redes sociales
    Then el sistema muestra una sola bolsa consolidada de datos RRSS en todas las plataformas
    And los beneficios de redes sociales ilimitadas del paquete de 100 pesos se mantienen activos

*** Keywords ***
El Usuario Prepago Está En El Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa El Paquete Internet Amigo De 100 Pesos Con Redes Sociales Ilimitadas
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa

Activa El Paquete Internet Amigo De 50 Pesos Con MB De Redes Sociales
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

El Sistema Muestra Una Sola Bolsa Consolidada De Datos RRSS En Todas Las Plataformas
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

Los Beneficios De Redes Sociales Ilimitadas Del Paquete De 100 Pesos Se Mantienen Activos
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo
