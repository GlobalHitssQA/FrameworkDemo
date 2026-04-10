*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678
${VIGENCIA_PAQUETE_1GB}    30 días
${VIGENCIA_PAQUETE_2GB}    60 días

*** Test Cases ***
Validar Notificación De Activación Con Vigencia Del Paquete Adquirido
    [Documentation]    ID: 9
    ...                Título: Validar notificación de activación con vigencia del paquete adquirido
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    ...                Escenario: Verificar que el usuario recibe notificación de activación con la vigencia correcta
    ...                cuando activa un Paquete Internet Amigo
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: low
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Usuario prepago o mixto con línea activa;
    ...                Sistema de notificaciones SMS operativo; Dispositivo con capacidad de recibir mensajes
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Funcional    NotificacionesSMS
    Given el usuario prepago tiene línea activa y accede al módulo de Paquetes Internet Amigo
    When activa un Paquete Internet Amigo de 1GB
    Then recibe mensaje de notificación confirmando la activación del paquete
    And el mensaje incluye la vigencia del paquete adquirido
    When activa un segundo paquete de 2GB
    Then la notificación refleja la vigencia del paquete recién adquirido

*** Keywords ***
El Usuario Prepago Tiene Línea Activa Y Accede Al Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Un Paquete Internet Amigo De 1GB
    Activar Paquete Y Verificar Notificacion    PAQ_1GB_30D

Recibe Mensaje De Notificación Confirmando La Activación Del Paquete
    Consultar Mensaje De Notificacion De Activacion

El Mensaje Incluye La Vigencia Del Paquete Adquirido
    Verificar Contenido Del Mensaje Incluye Vigencia Del Paquete    ${VIGENCIA_PAQUETE_1GB}

Activa Un Segundo Paquete De 2GB
    Activar Segundo Paquete Y Verificar Vigencia Individual    PAQ_2GB_60D    ${VIGENCIA_PAQUETE_2GB}

La Notificación Refleja La Vigencia Del Paquete Recién Adquirido
    Log    Vigencia del segundo paquete verificada en mensaje SMS
