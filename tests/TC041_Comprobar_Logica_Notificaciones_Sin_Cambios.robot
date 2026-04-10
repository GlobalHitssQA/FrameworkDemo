*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En UPC
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_PREPAGO}    5512345678

*** Test Cases ***
Comprobar Que La Lógica De Notificaciones Permanece Sin Cambios
    [Documentation]    ID: 41
    ...                Título: Comprobar que la lógica de notificaciones permanece sin cambios
    ...                Proceso: Postventa
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que la lógica de notificaciones para Paquetes Internet Amigo
    ...                se mantiene sin modificaciones después del ajuste de reglas de negocio
    ...                Tipo de Prueba: Regresión
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondiciones: Usuario Prepago autenticado en el sistema; Paquete Internet Amigo activo;
    ...                Sistema UPC configurado con las nuevas reglas de negocio; Acceso a logs de notificaciones
    [Tags]    PruebaGeneradaIA    Postventa    PaquetesInternetAmigo    UPC    Regresion    Notificaciones
    Given el usuario prepago tiene un paquete Internet Amigo activo en el sistema
    When se registra el comportamiento de notificaciones antes del ajuste de reglas
    And se aplica el ajuste de reglas de negocio para suma de datos y vigencias
    Then el usuario recibe los mismos textos de notificación que antes del cambio
    And el mensaje de vencimiento o consumo se envía según lo que ocurra primero
    And se confirma que la lógica de notificaciones permanece inalterada

*** Keywords ***
El Usuario Prepago Tiene Un Paquete Internet Amigo Activo En El Sistema
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_PREPAGO}
    Activar Paquete Internet Amigo Y Registrar Vigencia Para Notificaciones

Se Registra El Comportamiento De Notificaciones Antes Del Ajuste De Reglas
    Registrar Texto De Notificacion De Activacion Actual
    Registrar Texto De Notificacion De Vencimiento Esperado
    Registrar Texto De Notificacion De Consumo Esperado

Se Aplica El Ajuste De Reglas De Negocio Para Suma De Datos Y Vigencias
    Activar Segundo Paquete Para Verificar Suma Segun Nuevas Reglas
    Verificar Que Reglas De Negocio Aplicaron Correctamente

El Usuario Recibe Los Mismos Textos De Notificación Que Antes Del Cambio
    Verificar Texto De Notificacion De Activacion No Ha Cambiado
    Log    Los textos de las notificaciones se mantienen idénticos después del ajuste

El Mensaje De Vencimiento O Consumo Se Envía Según Lo Que Ocurra Primero
    Verificar Logica De Envio De Notificaciones Segun Evento

Se Confirma Que La Lógica De Notificaciones Permanece Inalterada
    Verificar Logica Original De Notificaciones Se Mantiene
    Log    La lógica de notificaciones permanece sin modificaciones después del ajuste de reglas de negocio
