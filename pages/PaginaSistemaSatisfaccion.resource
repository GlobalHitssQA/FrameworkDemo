*** Variables ***
# Locators para Sistema de Medición de Satisfacción del Cliente
${URL_SISTEMA_SATISFACCION}                    https://upc.telcel.com/satisfaccion
${LOCATOR_MODULO_SATISFACCION}                 css:.modulo-satisfaccion
${LOCATOR_SECCION_METRICAS_NPS}                id:seccionMetricasNPS
${LOCATOR_SECCION_ESCALAS_SATISFACCION}        id:seccionEscalasSatisfaccion
${LOCATOR_SECCION_FEEDBACK_CLIENTES}           id:seccionFeedbackClientes

# Locators para Línea Base de Satisfacción
${LOCATOR_BOTON_REGISTRAR_LINEA_BASE}          id:btnRegistrarLineaBase
${LOCATOR_CAMPO_FECHA_REGISTRO_LINEA_BASE}     id:fechaRegistroLineaBase
${LOCATOR_CAMPO_NIVEL_SATISFACCION_ACTUAL}     id:nivelSatisfaccionActual
${LOCATOR_CAMPO_NPS_ACTUAL}                    id:npsActual
${LOCATOR_MENSAJE_LINEA_BASE_REGISTRADA}       css:.mensaje-linea-base-exitosa
${LOCATOR_TABLA_LINEA_BASE_REGISTRADA}         id:tablaLineaBaseRegistrada

# Locators para Implementación de Ajuste de Reglas
${LOCATOR_SECCION_IMPLEMENTACION_REGLAS}       id:seccionImplementacionReglas
${LOCATOR_ESTADO_IMPLEMENTACION}               id:estadoImplementacionReglas
${LOCATOR_FECHA_IMPLEMENTACION}                id:fechaImplementacion
${LOCATOR_CONFIRMACION_REGLAS_ACTIVAS}         css:.confirmacion-reglas-activas

# Locators para Monitoreo de Experiencia del Cliente
${LOCATOR_SECCION_MONITOREO_EXPERIENCIA}       id:seccionMonitoreoExperiencia
${LOCATOR_TABLA_FEEDBACK_USUARIOS}             id:tablaFeedbackUsuarios
${LOCATOR_FILTRO_PAQUETES_INTERNET_AMIGO}      id:filtroPaquetesInternetAmigo
${LOCATOR_CAMPO_NIVEL_CONFUSION}               id:nivelConfusion
${LOCATOR_CAMPO_CLARIDAD_VIGENCIA}             id:claridadVigencia
${LOCATOR_CAMPO_CLARIDAD_BOLSA_DATOS}          id:claridadBolsaDatos

# Locators para Recopilación de Feedback Post-Implementación
${LOCATOR_BOTON_RECOPILAR_FEEDBACK}            id:btnRecopilarFeedbackPostImplementacion
${LOCATOR_CAMPO_FECHA_RECOPILACION}            id:fechaRecopilacionFeedback
${LOCATOR_TABLA_METRICAS_POST_IMPLEMENTACION}  id:tablaMetricasPostImplementacion
${LOCATOR_CAMPO_NPS_POST_IMPLEMENTACION}       id:npsPostImplementacion
${LOCATOR_CAMPO_SATISFACCION_POST}             id:satisfaccionPostImplementacion
${LOCATOR_MENSAJE_FEEDBACK_REGISTRADO}         css:.mensaje-feedback-registrado

# Locators para Comparación de Escalas de Satisfacción
${LOCATOR_SECCION_COMPARACION_ESCALAS}         id:seccionComparacionEscalas
${LOCATOR_BOTON_GENERAR_COMPARACION}           id:btnGenerarComparacion
${LOCATOR_GRAFICA_COMPARACION_ANTES_DESPUES}   id:graficaComparacionAntesDespues
${LOCATOR_CAMPO_DIFERENCIA_SATISFACCION}       id:diferenciaSatisfaccion
${LOCATOR_CAMPO_PORCENTAJE_MEJORA}             id:porcentajeMejora
${LOCATOR_INDICADOR_MEJORA_POSITIVA}           css:.indicador-mejora-positiva
${LOCATOR_INDICADOR_MEJORA_NEGATIVA}           css:.indicador-mejora-negativa

# Locators para Validación de Objetivos Institucionales
${LOCATOR_SECCION_OBJETIVOS_INSTITUCIONALES}   id:seccionObjetivosInstitucionales
${LOCATOR_CAMPO_OBJETIVO_SATISFACCION}         id:objetivoSatisfaccionInstitucional
${LOCATOR_CAMPO_META_PORCENTAJE}               id:metaPorcentajeMejora
${LOCATOR_CAMPO_RESULTADO_ACTUAL}              id:resultadoActualMejora
${LOCATOR_INDICADOR_CUMPLIMIENTO_OBJETIVO}     id:indicadorCumplimientoObjetivo
${LOCATOR_ESTADO_CUMPLIMIENTO}                 id:estadoCumplimientoObjetivo
${LOCATOR_MENSAJE_OBJETIVO_CUMPLIDO}           css:.mensaje-objetivo-cumplido
${LOCATOR_MENSAJE_OBJETIVO_NO_CUMPLIDO}        css:.mensaje-objetivo-no-cumplido

*** Keywords ***
Navegar A Sistema De Medición De Satisfacción
    Wait Until Element Is Visible    ${LOCATOR_MODULO_SATISFACCION}    timeout=10s
    Click Element    ${LOCATOR_MODULO_SATISFACCION}
    Wait Until Location Contains    satisfaccion
    Log    Se accedió al Sistema de Medición de Satisfacción del Cliente

Acceder A Sección De Escalas De Satisfacción
    Wait Until Element Is Visible    ${LOCATOR_SECCION_ESCALAS_SATISFACCION}    timeout=10s
    Scroll Element Into View    ${LOCATOR_SECCION_ESCALAS_SATISFACCION}
    Click Element    ${LOCATOR_SECCION_ESCALAS_SATISFACCION}
    Log    Se accedió a la sección de Escalas de Satisfacción

Registrar Línea Base De Satisfacción Actual
    Wait Until Element Is Visible    ${LOCATOR_BOTON_REGISTRAR_LINEA_BASE}    timeout=10s
    Click Button    ${LOCATOR_BOTON_REGISTRAR_LINEA_BASE}
    Wait Until Element Is Visible    ${LOCATOR_MENSAJE_LINEA_BASE_REGISTRADA}    timeout=15s
    Log    Se registró la línea base de satisfacción actual

Obtener Nivel De Satisfacción Línea Base
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_NIVEL_SATISFACCION_ACTUAL}    timeout=10s
    ${nivel_satisfaccion}=    Get Text    ${LOCATOR_CAMPO_NIVEL_SATISFACCION_ACTUAL}
    [Return]    ${nivel_satisfaccion}

Obtener NPS Línea Base
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_NPS_ACTUAL}    timeout=10s
    ${nps_actual}=    Get Text    ${LOCATOR_CAMPO_NPS_ACTUAL}
    [Return]    ${nps_actual}

Verificar Línea Base Registrada Exitosamente
    Wait Until Element Is Visible    ${LOCATOR_TABLA_LINEA_BASE_REGISTRADA}    timeout=10s
    Element Should Be Visible    ${LOCATOR_MENSAJE_LINEA_BASE_REGISTRADA}
    Log    La línea base de satisfacción fue registrada exitosamente

Acceder A Sección De Implementación De Reglas
    Wait Until Element Is Visible    ${LOCATOR_SECCION_IMPLEMENTACION_REGLAS}    timeout=10s
    Click Element    ${LOCATOR_SECCION_IMPLEMENTACION_REGLAS}
    Log    Se accedió a la sección de implementación de reglas de negocio

Verificar Estado De Implementación De Reglas
    Wait Until Element Is Visible    ${LOCATOR_ESTADO_IMPLEMENTACION}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_ESTADO_IMPLEMENTACION}
    Should Contain    ${estado}    Implementado
    Log    El estado de implementación de reglas es: ${estado}

Verificar Reglas De Negocio Activas En Producción
    Wait Until Element Is Visible    ${LOCATOR_CONFIRMACION_REGLAS_ACTIVAS}    timeout=10s
    Element Should Be Visible    ${LOCATOR_CONFIRMACION_REGLAS_ACTIVAS}
    Log    Las nuevas reglas de negocio están activas en producción

Acceder A Sección De Monitoreo De Experiencia
    Wait Until Element Is Visible    ${LOCATOR_SECCION_MONITOREO_EXPERIENCIA}    timeout=10s
    Click Element    ${LOCATOR_SECCION_MONITOREO_EXPERIENCIA}
    Log    Se accedió a la sección de monitoreo de experiencia del cliente

Aplicar Filtro Paquetes Internet Amigo
    Wait Until Element Is Visible    ${LOCATOR_FILTRO_PAQUETES_INTERNET_AMIGO}    timeout=10s
    Click Element    ${LOCATOR_FILTRO_PAQUETES_INTERNET_AMIGO}
    Sleep    2s
    Log    Se aplicó filtro para Paquetes Internet Amigo

Obtener Nivel De Confusión Del Usuario
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_NIVEL_CONFUSION}    timeout=10s
    ${nivel_confusion}=    Get Text    ${LOCATOR_CAMPO_NIVEL_CONFUSION}
    [Return]    ${nivel_confusion}

Obtener Claridad En Vigencia
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_CLARIDAD_VIGENCIA}    timeout=10s
    ${claridad_vigencia}=    Get Text    ${LOCATOR_CAMPO_CLARIDAD_VIGENCIA}
    [Return]    ${claridad_vigencia}

Obtener Claridad En Bolsa De Datos
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_CLARIDAD_BOLSA_DATOS}    timeout=10s
    ${claridad_bolsa}=    Get Text    ${LOCATOR_CAMPO_CLARIDAD_BOLSA_DATOS}
    [Return]    ${claridad_bolsa}

Verificar Menor Confusión En Plataformas
    ${nivel_confusion}=    Obtener Nivel De Confusión Del Usuario
    Should Contain Any    ${nivel_confusion}    Bajo    Menor    Reducido
    Log    Los usuarios experimentan menor confusión: ${nivel_confusion}

Acceder A Sección De Feedback Post Implementación
    Wait Until Element Is Visible    ${LOCATOR_BOTON_RECOPILAR_FEEDBACK}    timeout=10s
    Click Button    ${LOCATOR_BOTON_RECOPILAR_FEEDBACK}
    Wait Until Element Is Visible    ${LOCATOR_MENSAJE_FEEDBACK_REGISTRADO}    timeout=15s
    Log    Se accedió a la sección de feedback post implementación

Obtener Métricas Post Implementación
    Wait Until Element Is Visible    ${LOCATOR_TABLA_METRICAS_POST_IMPLEMENTACION}    timeout=10s
    ${nps_post}=    Get Text    ${LOCATOR_CAMPO_NPS_POST_IMPLEMENTACION}
    ${satisfaccion_post}=    Get Text    ${LOCATOR_CAMPO_SATISFACCION_POST}
    Set Global Variable    ${NPS_POST_IMPLEMENTACION}    ${nps_post}
    Set Global Variable    ${SATISFACCION_POST_IMPLEMENTACION}    ${satisfaccion_post}
    Log    NPS Post: ${NPS_POST_IMPLEMENTACION}, Satisfacción Post: ${SATISFACCION_POST_IMPLEMENTACION}

Verificar Feedback Registrado Exitosamente
    Element Should Be Visible    ${LOCATOR_MENSAJE_FEEDBACK_REGISTRADO}
    Log    Las métricas de feedback post implementación fueron registradas exitosamente

Acceder A Sección De Comparación De Escalas
    Wait Until Element Is Visible    ${LOCATOR_SECCION_COMPARACION_ESCALAS}    timeout=10s
    Click Element    ${LOCATOR_SECCION_COMPARACION_ESCALAS}
    Log    Se accedió a la sección de comparación de escalas de satisfacción

Generar Comparación Antes Y Después
    Wait Until Element Is Visible    ${LOCATOR_BOTON_GENERAR_COMPARACION}    timeout=10s
    Click Button    ${LOCATOR_BOTON_GENERAR_COMPARACION}
    Wait Until Element Is Visible    ${LOCATOR_GRAFICA_COMPARACION_ANTES_DESPUES}    timeout=15s
    Log    Se generó la comparación de escalas antes y después de la implementación

Obtener Diferencia De Satisfacción
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_DIFERENCIA_SATISFACCION}    timeout=10s
    ${diferencia}=    Get Text    ${LOCATOR_CAMPO_DIFERENCIA_SATISFACCION}
    [Return]    ${diferencia}

Obtener Porcentaje De Mejora
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_PORCENTAJE_MEJORA}    timeout=10s
    ${porcentaje_mejora}=    Get Text    ${LOCATOR_CAMPO_PORCENTAJE_MEJORA}
    [Return]    ${porcentaje_mejora}

Verificar Mejora En Escalas De Satisfacción
    Wait Until Element Is Visible    ${LOCATOR_INDICADOR_MEJORA_POSITIVA}    timeout=10s
    Element Should Be Visible    ${LOCATOR_INDICADOR_MEJORA_POSITIVA}
    ${porcentaje}=    Obtener Porcentaje De Mejora
    Should Not Contain    ${porcentaje}    -
    Log    Se observa mejora positiva en las escalas de satisfacción: ${porcentaje}

Acceder A Sección De Objetivos Institucionales
    Wait Until Element Is Visible    ${LOCATOR_SECCION_OBJETIVOS_INSTITUCIONALES}    timeout=10s
    Click Element    ${LOCATOR_SECCION_OBJETIVOS_INSTITUCIONALES}
    Log    Se accedió a la sección de objetivos institucionales

Obtener Objetivo De Satisfacción Institucional
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_OBJETIVO_SATISFACCION}    timeout=10s
    ${objetivo}=    Get Text    ${LOCATOR_CAMPO_OBJETIVO_SATISFACCION}
    [Return]    ${objetivo}

Obtener Meta De Porcentaje De Mejora
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_META_PORCENTAJE}    timeout=10s
    ${meta}=    Get Text    ${LOCATOR_CAMPO_META_PORCENTAJE}
    [Return]    ${meta}

Obtener Resultado Actual De Mejora
    Wait Until Element Is Visible    ${LOCATOR_CAMPO_RESULTADO_ACTUAL}    timeout=10s
    ${resultado}=    Get Text    ${LOCATOR_CAMPO_RESULTADO_ACTUAL}
    [Return]    ${resultado}

Verificar Cumplimiento De Objetivo Institucional
    Wait Until Element Is Visible    ${LOCATOR_INDICADOR_CUMPLIMIENTO_OBJETIVO}    timeout=10s
    Wait Until Element Is Visible    ${LOCATOR_ESTADO_CUMPLIMIENTO}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_ESTADO_CUMPLIMIENTO}
    Should Contain Any    ${estado}    Cumplido    Alcanzado    Exitoso
    Element Should Be Visible    ${LOCATOR_MENSAJE_OBJETIVO_CUMPLIDO}
    Log    El objetivo institucional de mejora en satisfacción fue cumplido: ${estado}

Verificar Incremento Positivo Alineado Con Beneficios Esperados
    ${porcentaje_mejora}=    Obtener Porcentaje De Mejora
    ${meta_esperada}=    Obtener Meta De Porcentaje De Mejora
    ${resultado_actual}=    Obtener Resultado Actual De Mejora
    Log    Meta esperada: ${meta_esperada}
    Log    Resultado actual: ${resultado_actual}
    Log    Porcentaje de mejora: ${porcentaje_mejora}
    Should Not Contain    ${porcentaje_mejora}    -
    Element Should Be Visible    ${LOCATOR_INDICADOR_MEJORA_POSITIVA}
    Log    El indicador muestra incremento positivo alineado con los beneficios esperados del proyecto
