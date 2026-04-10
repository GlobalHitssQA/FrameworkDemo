*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Preparar Línea Con Dos Paquetes Internet Amigo Activos
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_USUARIO}    5512345678
${USUARIO_PRUEBA}          testuser
${PASSWORD_PRUEBA}         testpass123
${PAQUETE_1}               PAQ_1GB_30D
${PAQUETE_2}               PAQ_2GB_60D

*** Test Cases ***
Comprobar Experiencia Del Usuario Al Consultar Saldo En Diferentes Plataformas
    [Documentation]    ID: 38
    ...                Título: Comprobar experiencia del usuario al consultar saldo en diferentes plataformas
    ...                Proceso: Consulta
    ...                Aplicación: UPC
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que la experiencia del usuario al consultar saldo es consistente
    ...                y clara en todas las plataformas disponibles
    ...                Tipo de Prueba: No funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondiciones: Usuario prepago autenticado; Múltiples Paquetes Internet Amigo activos;
    ...                Acceso a plataformas 360, MiTelcel y Claro Pay
    [Tags]    PruebaGeneradaIA    NoFuncional    ExperienciaUsuario    Plataforma360    MiTelcel    ClaroPay    PaquetesInternetAmigo
    Given el sistema ha unificado los datos según las nuevas reglas de negocio
    When el usuario accede a plataforma 360 y consulta saldo de datos
    Then la plataforma muestra claramente una bolsa unificada con total de MB vigencia del paquete mayor y beneficios
    When el usuario accede a aplicación MiTelcel y consulta el mismo saldo
    Then la aplicación muestra la misma información de forma clara y consistente con la plataforma 360
    When el usuario accede a Claro Pay y consulta el mismo saldo
    Then Claro Pay muestra la misma información de forma clara y consistente con las otras plataformas
    And se verifica que no hay confusión ni información contradictoria entre plataformas
    And se valida que la visualización facilita la comprensión del usuario sobre sus datos disponibles

*** Keywords ***
Preparar Línea Con Dos Paquetes Internet Amigo Activos
    Iniciar Sesión En UPC    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_USUARIO}
    Activar Dos Paquetes Internet Amigo Diferentes En Línea    ${PAQUETE_1}    ${PAQUETE_2}
    Log    Se activaron dos Paquetes Internet Amigo de diferentes montos en la línea prepago

El Sistema Ha Unificado Los Datos Según Las Nuevas Reglas De Negocio
    Log    El sistema unifica los datos según las nuevas reglas de negocio
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas

El Usuario Accede A Plataforma 360 Y Consulta Saldo De Datos
    Consultar Información En Plataforma 360

La Plataforma Muestra Claramente Una Bolsa Unificada Con Total De MB Vigencia Del Paquete Mayor Y Beneficios
    Verificar Información Transparente Y Clara En Plataforma 360
    Log    La plataforma 360 muestra claramente una bolsa unificada con total de MB, vigencia del paquete mayor y beneficios

El Usuario Accede A Aplicación MiTelcel Y Consulta El Mismo Saldo
    Consultar Información En Aplicación MiTelcel

La Aplicación Muestra La Misma Información De Forma Clara Y Consistente Con La Plataforma 360
    Verificar Información Transparente Y Clara En MiTelcel
    Log    La aplicación MiTelcel muestra la misma información de forma clara y consistente con la plataforma 360

El Usuario Accede A Claro Pay Y Consulta El Mismo Saldo
    Consultar Información En Claro Pay

Claro Pay Muestra La Misma Información De Forma Clara Y Consistente Con Las Otras Plataformas
    Verificar Información Transparente Y Clara En Claro Pay
    Log    Claro Pay muestra la misma información de forma clara y consistente con las otras plataformas

Se Verifica Que No Hay Confusión Ni Información Contradictoria Entre Plataformas
    Verificar No Se Muestran Bolsas Separadas Ni Información Confusa
    Log    Todas las plataformas muestran información idéntica, clara y sin generar confusión al usuario

Se Valida Que La Visualización Facilita La Comprensión Del Usuario Sobre Sus Datos Disponibles
    Verificar Consistencia De Información Entre Plataformas
    Log    La información es más transparente y fácil de entender que antes del ajuste de reglas
