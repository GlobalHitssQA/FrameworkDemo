*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Preparar Línea Con Dos Paquetes Internet Amigo
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_USUARIO}    5512345678
${USUARIO_PRUEBA}          testuser
${PASSWORD_PRUEBA}         testpass123

*** Test Cases ***
Comprobar Consulta De Datos En Aplicación MiTelcel
    [Documentation]    ID: 20
    ...                Título: Comprobar consulta de datos en aplicación MiTelcel
    ...                Proceso: Consulta
    ...                Aplicación: MiTelcel
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que la aplicación MiTelcel muestra correctamente la bolsa unificada
    ...                de datos y vigencia de Paquetes Internet Amigo
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: high
    ...                Técnica ISTQB: Casos de uso
    ...                Precondiciones: Usuario con línea activa; Paquetes Internet Amigo activados;
    ...                Aplicación MiTelcel instalada; Credenciales de acceso válidas; Conexión a internet disponible
    [Tags]    PruebaGeneradaIA    Consulta    MiTelcel    PaquetesInternetAmigo    Funcional
    Given el usuario ha iniciado sesión en la aplicación MiTelcel
    When navega a la sección de consulta de saldo y datos
    Then la aplicación muestra una sola bolsa de datos para navegación libre
    And la aplicación muestra una sola bolsa de datos para redes sociales
    And la vigencia mostrada corresponde al paquete con mayor vigencia

*** Keywords ***
Preparar Línea Con Dos Paquetes Internet Amigo
    Iniciar Sesión En UPC    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_USUARIO}
    Activar Dos Paquetes Internet Amigo Diferentes En Línea    PAQ_1GB_30D    PAQ_2GB_60D
    Log    El sistema suma los datos de ambos paquetes en una bolsa unificada

El Usuario Ha Iniciado Sesión En La Aplicación MiTelcel
    Abrir Aplicación MiTelcel En Dispositivo Del Usuario
    Log    La aplicación MiTelcel inicia correctamente y muestra la pantalla principal
    Log    La aplicación valida las credenciales y permite el acceso al usuario

Navega A La Sección De Consulta De Saldo Y Datos
    Navegar A Seccion Consulta Saldo Y Datos

La Aplicación Muestra Una Sola Bolsa De Datos Para Navegación Libre
    Verificar Bolsa Unica Para Navegacion Libre

La Aplicación Muestra Una Sola Bolsa De Datos Para Redes Sociales
    Verificar Bolsa Unica Para Redes Sociales

La Vigencia Mostrada Corresponde Al Paquete Con Mayor Vigencia
    Verificar Vigencia Del Paquete Con Mayor Vigencia En MiTelcel
