*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678
${PAQUETE_ID}              PAQ_1GB_30D
${PAQUETE_NOMBRE}          Paquete 1GB
${VIGENCIA_PAQUETE}        30 días
${UMBRAL_CONSUMO}          80

*** Test Cases ***
Comprobar Notificación De Consumo De Datos Cuando Aplique
    [Documentation]    ID: 11
    ...                Título: Comprobar notificación de consumo de datos cuando aplique
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que el usuario reciba notificaciones de consumo de datos
    ...                y vencimiento según la vigencia del paquete adquirido en Paquetes Internet Amigo
    ...                Tipo de Prueba: Funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondición: Usuario con línea prepago activa;
    ...                Sistema UPC configurado; Plantillas de notificaciones definidas para Paquetes Internet Amigo
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Funcional    NotificacionesConsumo
    Given el usuario prepago accede al módulo de Paquetes Internet Amigo
    When activa un Paquete Internet Amigo en la línea prepago
    Then el sistema registra la activación del paquete con su vigencia correspondiente
    When consume datos del paquete hasta alcanzar el umbral de notificación
    Then el sistema envía notificación de consumo según el texto definido para el paquete
    When espera a que se cumpla la vigencia del paquete sin consumir todos los datos
    Then el sistema envía notificación de vencimiento del paquete
    And las notificaciones muestran información consistente con la vigencia del paquete activo

*** Keywords ***
El Usuario Prepago Accede Al Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Un Paquete Internet Amigo En La Línea Prepago
    Activar Paquete Internet Amigo Y Registrar Vigencia    ${PAQUETE_ID}

El Sistema Registra La Activación Del Paquete Con Su Vigencia Correspondiente
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${vigencia}=    Obtener Vigencia En Plataforma 360
    Should Contain    ${vigencia}    ${VIGENCIA_PAQUETE}
    Log    Paquete activado correctamente con vigencia: ${vigencia}

Consume Datos Del Paquete Hasta Alcanzar El Umbral De Notificación
    Consumir Datos Hasta Umbral De Notificacion    ${UMBRAL_CONSUMO}

El Sistema Envía Notificación De Consumo Según El Texto Definido Para El Paquete
    Verificar Recepcion De Notificacion De Consumo
    Verificar Texto De Notificacion Corresponde Al Paquete    ${PAQUETE_NOMBRE}

Espera A Que Se Cumpla La Vigencia Del Paquete Sin Consumir Todos Los Datos
    Cerrar Modal De Mensaje SMS
    Esperar Vencimiento Sin Consumir Todos Los Datos

El Sistema Envía Notificación De Vencimiento Del Paquete
    Verificar Recepcion De Notificacion De Vencimiento De Paquete

Las Notificaciones Muestran Información Consistente Con La Vigencia Del Paquete Activo
    Cerrar Modal De Mensaje SMS
    Ver Mensaje De Notificacion De Consumo
    Verificar Notificaciones Consistentes Con Vigencia Del Paquete    ${PAQUETE_NOMBRE}    ${VIGENCIA_PAQUETE}
    Cerrar Modal De Mensaje SMS
