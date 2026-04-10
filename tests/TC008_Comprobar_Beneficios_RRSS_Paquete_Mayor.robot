*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Comprobar Que Se Mantienen Beneficios De Redes Sociales Ilimitadas Del Paquete Mayor
    [Documentation]    ID: 8
    ...                Título: Comprobar que se mantienen beneficios de redes sociales ilimitadas del paquete mayor
    ...                Proceso: Venta
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    ...                Escenario: Verificar que los beneficios de redes sociales ilimitadas del paquete mayor
    ...                se conservan al sumar paquetes Internet Amigo con diferentes beneficios
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: low
    ...                Técnica ISTQB: Tabla de decisión
    ...                Precondición: Usuario prepago autenticado; Línea activa;
    ...                Paquete 100 disponible con beneficio de redes sociales ilimitadas
    [Tags]    PruebaGeneradaIA    Venta    PaquetesInternetAmigo    UPC    Funcional    BeneficiosRRSS
    Given el usuario prepago tiene línea activa en módulo de Paquetes Internet Amigo
    When activa Paquete Internet Amigo 50 sin beneficio de redes sociales ilimitadas
    And activa Paquete Internet Amigo 100 que incluye redes sociales ilimitadas
    Then el beneficio de redes sociales ilimitadas del Paquete 100 está activo
    And el usuario accede a redes sociales sin consumir datos de navegación libre

*** Keywords ***
El Usuario Prepago Tiene Línea Activa En Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Paquete Internet Amigo 50 Sin Beneficio De Redes Sociales Ilimitadas
    Activar Paquete Amigo 50 Sin Beneficio RRSS Ilimitadas

Activa Paquete Internet Amigo 100 Que Incluye Redes Sociales Ilimitadas
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Amigo 100 Con Beneficio RRSS Ilimitadas

El Beneficio De Redes Sociales Ilimitadas Del Paquete 100 Está Activo
    Consultar Beneficios Activos De Redes Sociales

El Usuario Accede A Redes Sociales Sin Consumir Datos De Navegación Libre
    Registrar Datos Navegacion Libre Antes De Usar RRSS
    Utilizar Aplicaciones De Redes Sociales
    Verificar Datos Navegacion Libre No Fueron Consumidos
