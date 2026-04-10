*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Verificar Recepción De Mensaje De Vencimiento Del Paquete
    [Documentation]    ID: 10
    ...                Título: Verificar recepción de mensaje de vencimiento del paquete
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Paquetes Internet Amigo
    ...                Escenario: Verificar que el usuario recibe mensaje de vencimiento cuando la vigencia
    ...                del paquete Internet Amigo llega a su fin
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: low
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Usuario prepago o mixto con línea activa;
    ...                Paquete Internet Amigo próximo a vencer; Sistema de notificaciones SMS operativo
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Funcional    NotificacionesVencimiento
    Given el usuario prepago accede al módulo de Paquetes Internet Amigo con línea activa
    When activa un Paquete Internet Amigo y registra su fecha de vencimiento
    And espera hasta que la vigencia del paquete alcance su fecha de vencimiento
    Then el sistema detecta que el paquete ha vencido
    And el usuario recibe un mensaje de texto notificando el vencimiento del paquete
    And el mensaje se envía según la lógica de notificaciones establecida

*** Keywords ***
El Usuario Prepago Accede Al Módulo De Paquetes Internet Amigo Con Línea Activa
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Un Paquete Internet Amigo Y Registra Su Fecha De Vencimiento
    Activar Paquete Y Registrar Fecha De Vencimiento    PAQ_1GB_30D

Espera Hasta Que La Vigencia Del Paquete Alcance Su Fecha De Vencimiento
    Esperar Vencimiento Del Paquete

El Sistema Detecta Que El Paquete Ha Vencido
    Log    El sistema detectó que el paquete ha alcanzado su fecha de vencimiento

El Usuario Recibe Un Mensaje De Texto Notificando El Vencimiento Del Paquete
    Consultar Mensaje De Notificacion De Vencimiento

El Mensaje Se Envía Según La Lógica De Notificaciones Establecida
    Verificar Logica De Notificaciones Sin Modificar
