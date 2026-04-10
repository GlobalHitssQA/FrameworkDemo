*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Activar Paquetes Internet Amigo En Linea De Usuario Amigo
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_AMIGO}    5512345678
${USUARIO_AMIGO}         testuser
${PASSWORD_AMIGO}        testpass123

*** Test Cases ***
Validar Consulta De Datos En Plataforma Claro Pay
    [Documentation]    ID: 21
    ...                Título: Validar consulta de datos en plataforma Claro Pay
    ...                Proceso: Postventa
    ...                Aplicación: Claro Pay
    ...                Funcionalidad: Consulta de Paquetes Internet Amigo
    ...                Escenario: Verificar la visualización correcta de una sola bolsa de datos en plataforma Claro Pay
    ...                cuando el usuario tiene paquetes Internet Amigo activos
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Precondiciones: Usuario Amigo autenticado; Usuario con uno o más paquetes Internet Amigo activos;
    ...                Plataforma Claro Pay disponible
    [Tags]    PruebaGeneradaIA    Postventa    ClaroPay    PaquetesInternetAmigo    Funcional
    Given el usuario Amigo accede a la plataforma Claro Pay
    When navega a la sección de consulta de paquetes o saldo de datos
    Then el sistema muestra la información de paquetes Internet Amigo del usuario
    And se verifica que se muestra una sola bolsa de datos para navegación libre
    And se verifica que se muestra una sola bolsa de datos para redes sociales
    And se valida que la vigencia mostrada corresponde al paquete con mayor vigencia

*** Keywords ***
Activar Paquetes Internet Amigo En Linea De Usuario Amigo
    Iniciar Sesión En UPC    ${USUARIO_AMIGO}    ${PASSWORD_AMIGO}
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_AMIGO}
    Activar Múltiples Paquetes Internet Amigo    PAQ_1GB_30D    PAQ_2GB_60D
    Log    El sistema suma los datos de los paquetes en una bolsa unificada

El Usuario Amigo Accede A La Plataforma Claro Pay
    Acceder A Plataforma Claro Pay Con Usuario Amigo    ${USUARIO_AMIGO}    ${PASSWORD_AMIGO}
    Log    El sistema permite el acceso a la plataforma Claro Pay y muestra la pantalla principal de consulta

Navega A La Sección De Consulta De Paquetes O Saldo De Datos
    Consultar Seccion De Paquetes Internet Amigo En Claro Pay

El Sistema Muestra La Información De Paquetes Internet Amigo Del Usuario
    Wait Until Element Is Visible    ${LOCATOR_SECCION_SALDO_CP}    timeout=15s
    Element Should Be Visible    ${LOCATOR_BOLSA_NAVEGACION_LIBRE_CP}
    Element Should Be Visible    ${LOCATOR_BOLSA_DATOS_RRSS_CP}
    Log    El sistema muestra la información de paquetes Internet Amigo del usuario

Se Verifica Que Se Muestra Una Sola Bolsa De Datos Para Navegación Libre
    Verificar Bolsa Unica De Navegacion Libre En Claro Pay
    ${datos_navegacion}=    Obtener Datos Navegacion Libre En Claro Pay
    Should Not Be Empty    ${datos_navegacion}
    Log    El sistema presenta los datos de navegación libre agrupados en una única bolsa: ${datos_navegacion}

Se Verifica Que Se Muestra Una Sola Bolsa De Datos Para Redes Sociales
    Verificar Bolsa Unica De RRSS En Claro Pay
    ${datos_rrss}=    Obtener Saldo RRSS Claro Pay
    Should Not Be Empty    ${datos_rrss}
    Log    El sistema presenta los datos de redes sociales agrupados en una única bolsa: ${datos_rrss}

Se Valida Que La Vigencia Mostrada Corresponde Al Paquete Con Mayor Vigencia
    Verificar Vigencia Del Paquete Mayor En Claro Pay
    Log    El sistema muestra la vigencia del paquete más grande activo
