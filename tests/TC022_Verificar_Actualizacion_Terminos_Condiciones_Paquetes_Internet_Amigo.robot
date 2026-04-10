*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Test Cases ***
Verificar Actualización De Términos Y Condiciones De Paquetes Internet Amigo
    [Documentation]    ID: 22
    ...                Título: Verificar actualización de términos y condiciones de paquetes Internet Amigo
    ...                Proceso: Venta
    ...                Aplicación: Portal de Términos y Condiciones
    ...                Funcionalidad: Actualización de Términos y Condiciones Internet Amigo
    ...                Escenario: Verificar que los términos y condiciones de paquetes Internet Amigo
    ...                reflejen las nuevas reglas de negocio de suma de datos y vigencias
    ...                Tipo de Prueba: Lineamiento
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Documento de términos y condiciones actualizado disponible;
    ...                Acceso al portal o repositorio de términos y condiciones
    [Tags]    PruebaGeneradaIA    Venta    TerminosCondiciones    Lineamiento    PaquetesInternetAmigo
    Given el documento de términos y condiciones de paquetes Internet Amigo está disponible
    When se busca la sección que describe el comportamiento con múltiples paquetes activos
    Then el documento contiene explicación de suma de datos de navegación libre
    And el documento contiene explicación de suma de datos de redes sociales
    And el documento explica la regla de vigencia del paquete mayor con sus beneficios

*** Keywords ***
El Documento De Términos Y Condiciones De Paquetes Internet Amigo Está Disponible
    Acceder Al Portal De Terminos Y Condiciones De Paquetes Internet Amigo

Se Busca La Sección Que Describe El Comportamiento Con Múltiples Paquetes Activos
    Buscar Seccion Comportamiento Con Multiples Paquetes Activos

El Documento Contiene Explicación De Suma De Datos De Navegación Libre
    Verificar Descripcion De Suma De Datos De Navegacion Libre
    Verificar Documento Contiene Explicacion De Suma De Datos Navegacion Libre

El Documento Contiene Explicación De Suma De Datos De Redes Sociales
    Verificar Descripcion De Suma De Datos De Redes Sociales
    Verificar Documento Contiene Explicacion De Suma De Datos RRSS

El Documento Explica La Regla De Vigencia Del Paquete Mayor Con Sus Beneficios
    Verificar Descripcion De Vigencia Resultante
    Verificar Documento Explica Vigencia Del Paquete Mayor
