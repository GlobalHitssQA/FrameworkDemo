*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Activar Dos O Más Paquetes Internet Amigo En Línea De Usuario
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_USUARIO}    5512345678

*** Test Cases ***
Verificar Que La Plataforma 360 Muestra Correctamente La Bolsa Unificada De Datos Para Navegación Libre Y Redes Sociales De Paquetes Internet Amigo
    [Documentation]    ID: 19
    ...                Título: Verificar consulta de datos en plataforma 360
    ...                Proceso: Consulta
    ...                Aplicación: Plataforma 360
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que la plataforma 360 muestra correctamente la bolsa unificada de datos
    ...                para navegación libre y redes sociales de Paquetes Internet Amigo
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Usuario con línea activa; Paquetes Internet Amigo activados;
    ...                Plataforma 360 operativa; Credenciales de acceso válidas
    [Tags]    PruebaGeneradaIA    Consulta    Plataforma360    PaquetesInternetAmigo    Funcional
    Given se ha accedido a la plataforma 360 con credenciales de consulta
    When se busca la línea del usuario con los paquetes activados
    Then la plataforma muestra la información de la línea consultada
    And se consulta la sección de datos disponibles del usuario
    And la plataforma muestra una sola bolsa de datos para navegación libre
    And se consulta la sección de datos de redes sociales incluidas
    And la plataforma muestra una sola bolsa de datos para MBs de RRSS
    And se verifica que la vigencia mostrada corresponde al paquete con mayor vigencia
    And la plataforma 360 muestra la vigencia del paquete con mayor vigencia activa

*** Keywords ***
Activar Dos O Más Paquetes Internet Amigo En Línea De Usuario
    Iniciar Sesión En UPC
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_USUARIO}
    Activar Múltiples Paquetes Internet Amigo    PAQ_1GB_30D    PAQ_2GB_60D
    Log    El sistema suma los datos de los paquetes en una bolsa unificada

Se Ha Accedido A La Plataforma 360 Con Credenciales De Consulta
    Acceder A Plataforma 360 Con Credenciales De Consulta
    Log    La plataforma 360 permite el acceso y muestra el menú principal

Se Busca La Línea Del Usuario Con Los Paquetes Activados
    Buscar Línea Con Paquetes Internet Amigo Activados    ${NUMERO_LINEA_USUARIO}

La Plataforma Muestra La Información De La Línea Consultada
    Verificar Línea Encontrada En Plataforma 360    ${NUMERO_LINEA_USUARIO}
    Log    La plataforma muestra la información de la línea consultada

Se Consulta La Sección De Datos Disponibles Del Usuario
    Consultar Sección De Datos Disponibles Del Usuario

La Plataforma Muestra Una Sola Bolsa De Datos Para Navegación Libre
    ${datos_navegacion}=    Obtener Datos Disponibles Para Navegación Libre
    Should Not Be Empty    ${datos_navegacion}
    Log    La plataforma muestra una sola bolsa de datos para navegación libre: ${datos_navegacion}

Se Consulta La Sección De Datos De Redes Sociales Incluidas
    Consultar Sección De Datos De Redes Sociales Incluidas

La Plataforma Muestra Una Sola Bolsa De Datos Para MBs De RRSS
    ${datos_rrss}=    Obtener Datos Disponibles RRSS
    Should Not Be Empty    ${datos_rrss}
    Log    La plataforma muestra una sola bolsa de datos para MBs de RRSS: ${datos_rrss}

Se Verifica Que La Vigencia Mostrada Corresponde Al Paquete Con Mayor Vigencia
    Verificar Vigencia Mostrada Corresponde Al Paquete Con Mayor Vigencia

La Plataforma 360 Muestra La Vigencia Del Paquete Con Mayor Vigencia Activa
    ${vigencia}=    Obtener Vigencia Del Paquete Mayor
    ${fecha_vencimiento}=    Obtener Fecha Vencimiento Del Paquete Mayor
    Should Not Be Empty    ${vigencia}
    Should Not Be Empty    ${fecha_vencimiento}
    Log    La plataforma 360 muestra la vigencia del paquete con mayor vigencia activa
    Log    Vigencia: ${vigencia}
    Log    Fecha de vencimiento: ${fecha_vencimiento}
