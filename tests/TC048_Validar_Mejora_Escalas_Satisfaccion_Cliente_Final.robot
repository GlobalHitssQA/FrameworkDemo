*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Setup       Iniciar Sesión En Sistema De Medición
Suite Teardown    Cerrar Navegador

*** Variables ***
${USUARIO_PRUEBA}          testuser
${PASSWORD_PRUEBA}         testpass123
${NUMERO_LINEA_USUARIO}    5512345678

*** Test Cases ***
Validar Mejora En Escalas De Satisfacción Del Cliente Final
    [Documentation]    ID: 48
    ...                Título: Validar mejora en escalas de satisfacción del cliente final
    ...                Proceso: Postventa
    ...                Aplicación: Sistema de Medición de Satisfacción
    ...                Funcionalidad: Ajuste Reglas de negocio Paquetes Internet Amigo
    ...                Escenario: Verificar que el ajuste de reglas de negocio para Paquetes Internet Amigo
    ...                contribuye a mejorar las escalas de satisfacción del cliente final
    ...                según los objetivos institucionales
    ...                Tipo de Prueba: No funcional
    ...                Complejidad: medium
    ...                Técnica ISTQB: Casos de uso
    ...                Precondiciones: Sistema de medición de satisfacción operativo;
    ...                Línea base de satisfacción registrada antes del cambio;
    ...                Nuevas reglas de negocio implementadas en producción;
    ...                Acceso a métricas de NPS y escalas de satisfacción;
    ...                Periodo de tiempo suficiente para recopilar datos post-implementación
    [Tags]    PruebaGeneradaIA    Postventa    NoFuncional    SistemaSatisfaccion    PaquetesInternetAmigo    Metricas
    Given se registra el nivel de satisfacción actual antes de implementar ajuste
    Then se obtiene línea base de satisfacción relacionada con Paquetes Internet Amigo
    When se implementa el ajuste de reglas de negocio que homologa Paquetes Internet Amigo con Paquetes Sin Límite
    Then el sistema aplica las nuevas reglas facilitando experiencia con vigencias claras y bolsa única de datos
    When se monitorea la experiencia del cliente al utilizar Paquetes Internet Amigo con las nuevas reglas
    Then los usuarios experimentan menor confusión al consultar sus paquetes en las diferentes plataformas
    When se recopila feedback y métricas de satisfacción después de la implementación
    Then se registran las nuevas métricas de escalas de satisfacción del cliente final
    When se comparan las escalas de satisfacción antes y después del ajuste de reglas de negocio
    Then se observa mejora en las escalas de satisfacción del cliente final según objetivos institucionales
    When se valida el cumplimiento del objetivo de mejora en la experiencia del cliente
    Then el indicador de Escalas de Satisfacción muestra incremento positivo alineado con los beneficios esperados del proyecto

*** Keywords ***
Iniciar Sesión En Sistema De Medición
    Iniciar Sesión En UPC    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}

Se Registra El Nivel De Satisfacción Actual Antes De Implementar Ajuste
    Registrar Nivel De Satisfacción Actual Antes De Implementar Ajuste

Se Obtiene Línea Base De Satisfacción Relacionada Con Paquetes Internet Amigo
    Obtener Línea Base De Satisfacción De Paquetes Internet Amigo
    Log    Se obtuvo línea base de satisfacción actual relacionada con Paquetes Internet Amigo

Se Implementa El Ajuste De Reglas De Negocio Que Homologa Paquetes Internet Amigo Con Paquetes Sin Límite
    Verificar Ajuste De Reglas De Negocio Implementado En Producción

El Sistema Aplica Las Nuevas Reglas Facilitando Experiencia Con Vigencias Claras Y Bolsa Única De Datos
    Verificar Sistema Aplica Nuevas Reglas Facilitando Experiencia Usuario
    Log    El sistema aplica las nuevas reglas facilitando la experiencia del usuario con vigencias claras y bolsa única de datos

Se Monitorea La Experiencia Del Cliente Al Utilizar Paquetes Internet Amigo Con Las Nuevas Reglas
    Monitorear Experiencia Del Cliente Con Nuevas Reglas

Los Usuarios Experimentan Menor Confusión Al Consultar Sus Paquetes En Las Diferentes Plataformas
    Verificar Usuarios Experimentan Menor Confusión En Plataformas
    Log    Los usuarios experimentan menor confusión al consultar sus paquetes en las diferentes plataformas

Se Recopila Feedback Y Métricas De Satisfacción Después De La Implementación
    Recopilar Feedback Y Métricas De Satisfacción Post Implementación

Se Registran Las Nuevas Métricas De Escalas De Satisfacción Del Cliente Final
    Verificar Nuevas Métricas De Satisfacción Registradas
    Log    Se registraron las nuevas métricas de escalas de satisfacción del cliente final

Se Comparan Las Escalas De Satisfacción Antes Y Después Del Ajuste De Reglas De Negocio
    Comparar Escalas De Satisfacción Antes Y Después Del Ajuste

Se Observa Mejora En Las Escalas De Satisfacción Del Cliente Final Según Objetivos Institucionales
    Verificar Mejora En Escalas De Satisfacción Cliente Final
    Log    Se observa mejora en las escalas de satisfacción del cliente final según objetivos institucionales

Se Valida El Cumplimiento Del Objetivo De Mejora En La Experiencia Del Cliente
    Validar Cumplimiento De Objetivo De Mejora En Experiencia Cliente

El Indicador De Escalas De Satisfacción Muestra Incremento Positivo Alineado Con Los Beneficios Esperados Del Proyecto
    Verificar Indicador Escalas Satisfacción Incremento Positivo Alineado Beneficios
    Log    El indicador de Escalas de Satisfacción muestra incremento positivo alineado con los beneficios esperados del proyecto
