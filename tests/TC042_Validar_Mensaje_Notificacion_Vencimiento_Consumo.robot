*** Settings ***
Documentation     Test Case ID: 42
...               Título: Validar mensaje de notificación según lo que ocurra primero vencimiento o consumo
...               Proceso: Postventa
...               Aplicación: UPC
...               Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
...
...               Escenario: Verificar que el sistema envía el mensaje de notificación correcto
...               dependiendo de si ocurre primero el vencimiento del paquete o el consumo total de datos
...
...               Tipo de Prueba: Funcional
...               Complejidad: Medium
...               Técnica ISTQB: Tabla de decisión
...               Precondiciones: Usuario Prepago autenticado en el sistema;
...               Sistema UPC operativo; Capacidad de simular consumo de datos;
...               Acceso a logs de notificaciones

Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678
${PAQUETE_50_PESOS}        PAQ_AMIGO_50
${PAQUETE_100_PESOS}       PAQ_AMIGO_100
${VIGENCIA_7_DIAS}         7 días
${VIGENCIA_15_DIAS}        15 días

*** Test Cases ***
Validar Mensaje De Notificación Según Lo Que Ocurra Primero Vencimiento O Consumo
    [Documentation]    Verifica que el sistema envía el mensaje de notificación correcto
    ...                dependiendo de si ocurre primero el vencimiento del paquete o
    ...                el consumo total de datos del Paquete Internet Amigo
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    Notificaciones

    Given el usuario Prepago está autenticado y accede al módulo de Paquetes Internet Amigo

    # Escenario 1: Consumo total antes de vencimiento
    When activa un Paquete Internet Amigo de 50 pesos con vigencia de 7 días
    And el sistema registra la vigencia de 7 días del paquete activado
    And simula el consumo total de los datos del paquete antes del vencimiento
    Then el sistema envía mensaje de notificación de consumo total de datos

    # Escenario 2: Vencimiento antes de consumo total
    When activa otro Paquete Internet Amigo de 100 pesos con vigencia de 15 días
    And el sistema registra la vigencia de 15 días del segundo paquete
    And espera el vencimiento del paquete sin consumir todos los datos
    Then el sistema envía mensaje de notificación de vencimiento por tiempo

*** Keywords ***
El Usuario Prepago Está Autenticado Y Accede Al Módulo De Paquetes Internet Amigo
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}

Activa Un Paquete Internet Amigo De 50 Pesos Con Vigencia De 7 Días
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

El Sistema Registra La Vigencia De 7 Días Del Paquete Activado
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${vigencia}=    Obtener Vigencia En Plataforma 360
    Should Contain    ${vigencia}    ${VIGENCIA_7_DIAS}
    Log    Vigencia de 7 días registrada correctamente: ${vigencia}

Simula El Consumo Total De Los Datos Del Paquete Antes Del Vencimiento
    Simular Consumo De Datos Hasta Umbral    100
    Verificar Confirmacion De Consumo Simulado
    Log    Se simuló el consumo del 100% de los datos antes del vencimiento

El Sistema Envía Mensaje De Notificación De Consumo Total De Datos
    Sleep    2s    # Esperar envío de notificación SMS
    Verificar Recepcion De Mensaje SMS De Consumo
    Cerrar Modal De Mensaje SMS

Activa Otro Paquete Internet Amigo De 100 Pesos Con Vigencia De 15 Días
    Sleep    2s    # Esperar procesamiento del sistema
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa

El Sistema Registra La Vigencia De 15 Días Del Segundo Paquete
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${vigencia}=    Obtener Vigencia En Plataforma 360
    Should Contain    ${vigencia}    ${VIGENCIA_15_DIAS}
    Log    Vigencia de 15 días registrada correctamente: ${vigencia}

Espera El Vencimiento Del Paquete Sin Consumir Todos Los Datos
    Log    Simulando espera hasta el vencimiento del paquete sin consumir el 100% de datos
    Sleep    2s    # En pruebas reales, esto debería esperar hasta la fecha de vencimiento

El Sistema Envía Mensaje De Notificación De Vencimiento Por Tiempo
    Sleep    2s    # Esperar envío de notificación SMS de vencimiento
    Verificar Recepcion De Mensaje SMS De Vencimiento
    Cerrar Modal De Mensaje SMS
    Log    Se verificó que el sistema envió notificación de vencimiento por tiempo
