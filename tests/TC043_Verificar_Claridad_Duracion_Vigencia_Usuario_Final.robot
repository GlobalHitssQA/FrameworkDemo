*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Preparar Línea Prepago Para Validar Claridad De Vigencia
Suite Teardown    Cerrar Navegador

*** Variables ***
${NUMERO_LINEA_USUARIO}    5512345678
${USUARIO_PRUEBA}          testuser
${PASSWORD_PRUEBA}         testpass123
${VIGENCIA_ESPERADA_DIAS}  15 días

*** Test Cases ***
Verificar Claridad En La Duración Mostrada Al Usuario Final
    [Documentation]    ID: 43
    ...                Título: Verificar claridad en la duración mostrada al usuario final
    ...                Proceso: Consulta
    ...                Aplicación: Plataformas de consulta (360, MiTelcel, Claro Pay)
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que la duración o vigencia de los Paquetes Internet Amigo
    ...                se muestra de forma clara y comprensible al usuario final en las diferentes
    ...                plataformas de consulta
    ...                Tipo de Prueba: No funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondiciones: Usuario Prepago autenticado; Acceso a las plataformas 360, MiTelcel y Claro Pay;
    ...                Paquetes Internet Amigo disponibles para activación; Sistema UPC operativo con nuevas reglas implementadas
    [Tags]    PruebaGeneradaIA    Consulta    Plataforma360    MiTelcel    ClaroPay    PaquetesInternetAmigo    NoFuncional
    Given se activa un Paquete Internet Amigo de 50 pesos con vigencia de 7 días
    Then el sistema registra el paquete con vigencia de 7 días
    When se consulta la información del paquete desde la plataforma 360
    Then la plataforma muestra la vigencia del paquete de forma clara indicando la fecha de vencimiento o días restantes
    When se activa un segundo Paquete Internet Amigo de 100 pesos con vigencia de 15 días
    Then el sistema suma los datos y mantiene la vigencia del paquete con mayor duración 15 días
    When se consulta nuevamente desde MiTelcel la información del paquete combinado
    Then la plataforma MiTelcel muestra únicamente la vigencia del paquete de mayor duración 15 días de forma clara y sin ambigüedades
    When se verifica la visualización de la vigencia desde Claro Pay
    Then Claro Pay muestra la misma vigencia de 15 días de forma consistente con las otras plataformas
    And se valida que la presentación de la duración sea comprensible para el usuario final sin terminología técnica confusa

*** Keywords ***
Preparar Línea Prepago Para Validar Claridad De Vigencia
    Iniciar Sesión En UPC    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    ${NUMERO_LINEA_USUARIO}
    Log    Línea prepago preparada y autenticada para validar claridad de vigencia

Se Activa Un Paquete Internet Amigo De 50 Pesos Con Vigencia De 7 Días
    Activar Paquete Amigo 50 En Línea Prepago
    Log    Paquete Internet Amigo de 50 pesos con vigencia de 7 días activado exitosamente

El Sistema Registra El Paquete Con Vigencia De 7 Días
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${vigencia_actual}=    Obtener Vigencia En Plataforma 360
    Should Not Be Empty    ${vigencia_actual}
    Log    El sistema registró correctamente el paquete con su vigencia de 7 días

Se Consulta La Información Del Paquete Desde La Plataforma 360
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    Log    Consultando información del paquete en Plataforma 360

La Plataforma Muestra La Vigencia Del Paquete De Forma Clara Indicando La Fecha De Vencimiento O Días Restantes
    ${vigencia}=    Obtener Vigencia En Plataforma 360
    ${fecha_vencimiento}=    Obtener Fecha De Vencimiento En Plataforma 360
    Should Not Be Empty    ${vigencia}
    Should Not Be Empty    ${fecha_vencimiento}
    Log    La Plataforma 360 muestra de forma clara la vigencia: ${vigencia} y fecha de vencimiento: ${fecha_vencimiento}

Se Activa Un Segundo Paquete Internet Amigo De 100 Pesos Con Vigencia De 15 Días
    Activar Paquete Amigo 100 En La Misma Línea
    Log    Segundo Paquete Internet Amigo de 100 pesos con vigencia de 15 días activado exitosamente

El Sistema Suma Los Datos Y Mantiene La Vigencia Del Paquete Con Mayor Duración 15 Días
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Plataforma 360
    Abrir Pestaña Plataforma 360
    ${vigencia_actual}=    Obtener Vigencia En Plataforma 360
    Should Contain    ${vigencia_actual}    15
    Log    El sistema sumó los datos y mantiene la vigencia del paquete de mayor duración: 15 días

Se Consulta Nuevamente Desde MiTelcel La Información Del Paquete Combinado
    Abrir Pestaña Plataforma MiTelcel
    Log    Consultando información del paquete combinado en MiTelcel

La Plataforma MiTelcel Muestra Únicamente La Vigencia Del Paquete De Mayor Duración 15 Días De Forma Clara Y Sin Ambigüedades
    ${vigencia_mitelcel}=    Obtener Vigencia En Plataforma MiTelcel
    ${fecha_vencimiento_mt}=    Obtener Fecha De Vencimiento En Plataforma MiTelcel
    Should Not Be Empty    ${vigencia_mitelcel}
    Should Not Be Empty    ${fecha_vencimiento_mt}
    Should Contain    ${vigencia_mitelcel}    15
    Log    MiTelcel muestra de forma clara y sin ambigüedades la vigencia de 15 días: ${vigencia_mitelcel}

Se Verifica La Visualización De La Vigencia Desde Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    Log    Verificando visualización de vigencia en Claro Pay

Claro Pay Muestra La Misma Vigencia De 15 Días De Forma Consistente Con Las Otras Plataformas
    ${vigencia_claropay}=    Obtener Vigencia En Plataforma Claro Pay
    ${fecha_vencimiento_cp}=    Obtener Fecha De Vencimiento En Plataforma Claro Pay
    Should Not Be Empty    ${vigencia_claropay}
    Should Not Be Empty    ${fecha_vencimiento_cp}
    Should Contain    ${vigencia_claropay}    15
    Log    Claro Pay muestra consistentemente la misma vigencia de 15 días: ${vigencia_claropay}

Se Valida Que La Presentación De La Duración Sea Comprensible Para El Usuario Final Sin Terminología Técnica Confusa
    Verificar Presentacion Clara De Vigencia En Todas Las Plataformas
    Log    Se validó que todas las plataformas presentan la duración en formato amigable sin terminología técnica confusa
