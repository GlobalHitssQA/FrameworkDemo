*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Comprobar Que No Se Crean Bolsas Separadas Al Activar Múltiples Paquetes
    [Documentation]    ID: 35
    ...                Título: Comprobar que no se crean bolsas separadas al activar múltiples paquetes
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que al activar múltiples Paquetes Internet Amigo se crea una sola bolsa unificada
    ...                en lugar de bolsas independientes
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondiciones: Usuario prepago autenticado; Sistema UPC disponible; Línea sin paquetes activos previamente
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Funcional
    Given el usuario consulta la línea prepago sin paquetes activos
    When activa un Paquete Internet Amigo de 50 pesos
    And activa un segundo Paquete Internet Amigo de 100 pesos
    And consulta el número de bolsas de datos creadas en plataformas
    Then se muestra una sola bolsa unificada de datos de navegación libre
    And se muestra una sola bolsa unificada de MB de redes sociales
    And no existen bolsas separadas por cada paquete activado

*** Keywords ***
El Usuario Consulta La Línea Prepago Sin Paquetes Activos
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}
    Log    Línea prepago consultada: ${NUMERO_LINEA_PREPAGO} - Sin paquetes activos previamente

Activa Un Paquete Internet Amigo De 50 Pesos
    Activar Paquete Amigo 50 En Línea Prepago
    Log    Paquete Internet Amigo de $50 activado exitosamente

Activa Un Segundo Paquete Internet Amigo De 100 Pesos
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Amigo 100 En La Misma Línea
    Log    Paquete Internet Amigo de $100 activado exitosamente

Consulta El Número De Bolsas De Datos Creadas En Plataformas
    Consultar Cantidad Total De Datos Disponibles
    Log    Consultando bolsas de datos en todas las plataformas de consulta

Se Muestra Una Sola Bolsa Unificada De Datos De Navegación Libre
    Verificar Sistema Muestra Bolsa Única Con Datos Sumados
    Log    Se verifica que existe solo una bolsa unificada de datos de navegación libre

Se Muestra Una Sola Bolsa Unificada De MB De Redes Sociales
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas
    Log    Se verifica que existe solo una bolsa unificada de datos para redes sociales

No Existen Bolsas Separadas Por Cada Paquete Activado
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Log    Se confirma que NO existen bolsas separadas ni independientes por cada paquete activado
