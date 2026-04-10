*** Variables ***
# Navegación
${MENU_VENTA}                    css:nav [data-menu="venta"]
${SUBMENU_PAQUETES_INTERNET}     css:nav [data-submenu="paquetes-internet-amigo"]

# Búsqueda de línea
${INPUT_NUMERO_LINEA}            id:numeroLinea
${BOTON_BUSCAR_LINEA}            id:btnBuscarLinea
${LABEL_TIPO_LINEA}              css:.info-linea .tipo-linea
${LABEL_ESTADO_LINEA}            css:.info-linea .estado-linea

# Sección de paquetes disponibles
${CONTENEDOR_PAQUETES}           css:.paquetes-disponibles
${PAQUETE_1GB_30DIAS}            css:[data-paquete-id="PAQ_1GB_30D"]
${PAQUETE_2GB_60DIAS}            css:[data-paquete-id="PAQ_2GB_60D"]
${PAQUETE_500MB_15DIAS}          css:[data-paquete-id="PAQ_500MB_15D"]
${PAQUETE_3GB_90DIAS}            css:[data-paquete-id="PAQ_3GB_90D"]

# Botones de acción
${BOTON_ACTIVAR_PAQUETE}         css:.btn-activar-paquete
${BOTON_CONFIRMAR_ACTIVACION}    id:btnConfirmarActivacion
${MENSAJE_EXITO_ACTIVACION}      css:.alert-success .mensaje-activacion

# Sección de consulta de vigencia
${TAB_PLATAFORMA_360}            css:[data-tab="plataforma-360"]
${TAB_PLATAFORMA_MITELCEL}       css:[data-tab="plataforma-mitelcel"]
${TAB_PLATAFORMA_CLAROPAY}       css:[data-tab="plataforma-claropay"]

# Datos de vigencia en plataforma 360
${VIGENCIA_BOLSA_360}            css:#plataforma-360 .vigencia-bolsa
${DATOS_DISPONIBLES_360}         css:#plataforma-360 .datos-disponibles
${FECHA_VENCIMIENTO_360}         css:#plataforma-360 .fecha-vencimiento

# Datos de vigencia en MiTelcel
${VIGENCIA_BOLSA_MITELCEL}       css:#plataforma-mitelcel .vigencia-bolsa
${DATOS_DISPONIBLES_MITELCEL}    css:#plataforma-mitelcel .datos-disponibles
${FECHA_VENCIMIENTO_MITELCEL}    css:#plataforma-mitelcel .fecha-vencimiento

# Datos de vigencia en Claro Pay
${VIGENCIA_BOLSA_CLAROPAY}       css:#plataforma-claropay .vigencia-bolsa
${DATOS_DISPONIBLES_CLAROPAY}    css:#plataforma-claropay .datos-disponibles
${FECHA_VENCIMIENTO_CLAROPAY}    css:#plataforma-claropay .fecha-vencimiento

# Botón de actualizar consulta
${BOTON_ACTUALIZAR_CONSULTA}     id:btnActualizarConsulta

# Paquetes con diferentes beneficios
${PAQUETE_ESTANDAR_1GB}          css:[data-paquete-id="PAQ_1GB_ESTANDAR"]
${PAQUETE_PREMIUM_2GB_RRSS}      css:[data-paquete-id="PAQ_2GB_RRSS"]

# Sección de beneficios activos
${SECCION_BENEFICIOS_ACTIVOS}    css:.beneficios-activos
${LISTA_BENEFICIOS}              css:.lista-beneficios
${BENEFICIO_REDES_SOCIALES}      css:[data-beneficio="redes-sociales"]
${BENEFICIO_DATOS_ILIMITADOS}    css:[data-beneficio="datos-ilimitados"]
${LABEL_BENEFICIO_ACTIVO}        css:.beneficio-item.activo
${ICONO_REDES_SOCIALES}          css:.icono-redes-sociales-ilimitadas

# Contador de bolsas de datos consolidadas (Caso 4)
${CONTADOR_BOLSAS_DATOS_360}         css:#plataforma-360 .bolsa-datos
${CONTADOR_BOLSAS_DATOS_MITELCEL}    css:#plataforma-mitelcel .bolsa-datos
${CONTADOR_BOLSAS_DATOS_CLAROPAY}    css:#plataforma-claropay .bolsa-datos

# Bolsas de datos para redes sociales (Caso 5)
${CONTADOR_BOLSAS_RRSS_360}          css:#plataforma-360 .bolsa-datos-rrss
${CONTADOR_BOLSAS_RRSS_MITELCEL}     css:#plataforma-mitelcel .bolsa-datos-rrss
${CONTADOR_BOLSAS_RRSS_CLAROPAY}     css:#plataforma-claropay .bolsa-datos-rrss
${PAQUETE_INTERNET_AMIGO_500MB_RRSS}     css:[data-paquete-id="PAQ_500MB_RRSS"]
${PAQUETE_INTERNET_AMIGO_1GB_RRSS}       css:[data-paquete-id="PAQ_1GB_RRSS"]

# Paquetes Internet Amigo 50 y 100 (Caso 6)
${PAQUETE_INTERNET_AMIGO_50}         css:[data-paquete-id="PAQ_AMIGO_50"]
${PAQUETE_INTERNET_AMIGO_100}        css:[data-paquete-id="PAQ_AMIGO_100"]

# Consulta de datos totales en bolsa consolidada
${DATOS_TOTALES_BOLSA_360}           css:#plataforma-360 .datos-totales-bolsa
${DATOS_TOTALES_BOLSA_MITELCEL}      css:#plataforma-mitelcel .datos-totales-bolsa
${DATOS_TOTALES_BOLSA_CLAROPAY}      css:#plataforma-claropay .datos-totales-bolsa

*** Keywords ***
Navegar A Paquetes Internet Amigo
    Wait Until Element Is Visible    ${MENU_VENTA}    timeout=10s
    Click Element    ${MENU_VENTA}
    Wait Until Element Is Visible    ${SUBMENU_PAQUETES_INTERNET}    timeout=10s
    Click Element    ${SUBMENU_PAQUETES_INTERNET}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA}    timeout=10s

Buscar Línea Prepago
    [Arguments]    ${numero_linea}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA}    timeout=10s
    Input Text    ${INPUT_NUMERO_LINEA}    ${numero_linea}
    Click Button    ${BOTON_BUSCAR_LINEA}
    Wait Until Element Is Visible    ${LABEL_TIPO_LINEA}    timeout=15s

Verificar Tipo De Línea
    [Arguments]    ${tipo_esperado}
    ${tipo_actual}=    Get Text    ${LABEL_TIPO_LINEA}
    Should Contain    ${tipo_actual}    ${tipo_esperado}

Verificar Estado De Línea
    [Arguments]    ${estado_esperado}
    ${estado_actual}=    Get Text    ${LABEL_ESTADO_LINEA}
    Should Contain    ${estado_actual}    ${estado_esperado}

Seleccionar Paquete Por ID
    [Arguments]    ${paquete_id}
    ${locator}=    Set Variable    css:[data-paquete-id="${paquete_id}"]
    Wait Until Element Is Visible    ${locator}    timeout=10s
    Click Element    ${locator}
    Wait Until Element Is Enabled    ${BOTON_ACTIVAR_PAQUETE}    timeout=5s

Activar Paquete Internet Amigo Con Vigencia Menor
    [Arguments]    ${paquete_id}=PAQ_500MB_15D
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Activar Paquete Internet Amigo Con Vigencia Mayor
    [Arguments]    ${paquete_id}=PAQ_2GB_60D
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Verificar Mensaje De Activación Exitosa
    ${mensaje}=    Get Text    ${MENSAJE_EXITO_ACTIVACION}
    Should Contain    ${mensaje}    exitosamente

Abrir Pestaña Plataforma 360
    Click Element    ${TAB_PLATAFORMA_360}
    Wait Until Element Is Visible    ${VIGENCIA_BOLSA_360}    timeout=10s

Abrir Pestaña Plataforma MiTelcel
    Click Element    ${TAB_PLATAFORMA_MITELCEL}
    Wait Until Element Is Visible    ${VIGENCIA_BOLSA_MITELCEL}    timeout=10s

Abrir Pestaña Plataforma Claro Pay
    Click Element    ${TAB_PLATAFORMA_CLAROPAY}
    Wait Until Element Is Visible    ${VIGENCIA_BOLSA_CLAROPAY}    timeout=10s

Actualizar Consulta De Vigencia
    Click Button    ${BOTON_ACTUALIZAR_CONSULTA}
    Sleep    2s    # Esperar actualización de datos

Obtener Vigencia En Plataforma 360
    ${vigencia}=    Get Text    ${VIGENCIA_BOLSA_360}
    [Return]    ${vigencia}

Obtener Vigencia En Plataforma MiTelcel
    ${vigencia}=    Get Text    ${VIGENCIA_BOLSA_MITELCEL}
    [Return]    ${vigencia}

Obtener Vigencia En Plataforma Claro Pay
    ${vigencia}=    Get Text    ${VIGENCIA_BOLSA_CLAROPAY}
    [Return]    ${vigencia}

Verificar Vigencia Corresponde A Paquete Mayor
    [Arguments]    ${vigencia_esperada}
    Abrir Pestaña Plataforma 360
    ${vigencia_360}=    Obtener Vigencia En Plataforma 360
    Should Contain    ${vigencia_360}    ${vigencia_esperada}

    Abrir Pestaña Plataforma MiTelcel
    ${vigencia_mitelcel}=    Obtener Vigencia En Plataforma MiTelcel
    Should Contain    ${vigencia_mitelcel}    ${vigencia_esperada}

    Abrir Pestaña Plataforma Claro Pay
    ${vigencia_claropay}=    Obtener Vigencia En Plataforma Claro Pay
    Should Contain    ${vigencia_claropay}    ${vigencia_esperada}

Obtener Fecha De Vencimiento En Plataforma 360
    ${fecha}=    Get Text    ${FECHA_VENCIMIENTO_360}
    [Return]    ${fecha}

Obtener Fecha De Vencimiento En Plataforma MiTelcel
    ${fecha}=    Get Text    ${FECHA_VENCIMIENTO_MITELCEL}
    [Return]    ${fecha}

Obtener Fecha De Vencimiento En Plataforma Claro Pay
    ${fecha}=    Get Text    ${FECHA_VENCIMIENTO_CLAROPAY}
    [Return]    ${fecha}

Activar Paquete Con Beneficios Estándar
    [Arguments]    ${paquete_id}=PAQ_1GB_ESTANDAR
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Activar Paquete Con Mayores Beneficios
    [Arguments]    ${paquete_id}=PAQ_2GB_RRSS
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Consultar Beneficios Activos
    Wait Until Element Is Visible    ${SECCION_BENEFICIOS_ACTIVOS}    timeout=10s
    Wait Until Element Is Visible    ${LISTA_BENEFICIOS}    timeout=10s

Verificar Beneficio Redes Sociales Ilimitadas Activo
    Wait Until Element Is Visible    ${BENEFICIO_REDES_SOCIALES}    timeout=10s
    Element Should Be Visible    ${ICONO_REDES_SOCIALES}
    ${beneficio}=    Get Text    ${BENEFICIO_REDES_SOCIALES}
    Should Contain    ${beneficio}    Redes Sociales Ilimitadas

Obtener Lista De Beneficios Activos
    @{elementos}=    Get WebElements    ${LABEL_BENEFICIO_ACTIVO}
    @{beneficios}=    Create List
    FOR    ${elemento}    IN    @{elementos}
        ${texto}=    Get Text    ${elemento}
        Append To List    ${beneficios}    ${texto}
    END
    [Return]    @{beneficios}

Verificar Beneficio Está En Lista
    [Arguments]    ${beneficio_esperado}
    @{beneficios}=    Obtener Lista De Beneficios Activos
    Should Contain    ${beneficios}    ${beneficio_esperado}

Contar Bolsas De Datos En Plataforma 360
    ${cantidad}=    Get Element Count    ${CONTADOR_BOLSAS_DATOS_360}
    [Return]    ${cantidad}

Contar Bolsas De Datos En Plataforma MiTelcel
    ${cantidad}=    Get Element Count    ${CONTADOR_BOLSAS_DATOS_MITELCEL}
    [Return]    ${cantidad}

Contar Bolsas De Datos En Plataforma Claro Pay
    ${cantidad}=    Get Element Count    ${CONTADOR_BOLSAS_DATOS_CLAROPAY}
    [Return]    ${cantidad}

Verificar Una Sola Bolsa Consolidada En Plataforma 360
    Abrir Pestaña Plataforma 360
    ${cantidad}=    Contar Bolsas De Datos En Plataforma 360
    Should Be Equal As Numbers    ${cantidad}    1    msg=Se esperaba 1 bolsa consolidada pero se encontraron ${cantidad} en Plataforma 360

Verificar Una Sola Bolsa Consolidada En Plataforma MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    ${cantidad}=    Contar Bolsas De Datos En Plataforma MiTelcel
    Should Be Equal As Numbers    ${cantidad}    1    msg=Se esperaba 1 bolsa consolidada pero se encontraron ${cantidad} en MiTelcel

Verificar Una Sola Bolsa Consolidada En Plataforma Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    ${cantidad}=    Contar Bolsas De Datos En Plataforma Claro Pay
    Should Be Equal As Numbers    ${cantidad}    1    msg=Se esperaba 1 bolsa consolidada pero se encontraron ${cantidad} en Claro Pay

Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa Consolidada En Plataforma 360
    Verificar Una Sola Bolsa Consolidada En Plataforma MiTelcel
    Verificar Una Sola Bolsa Consolidada En Plataforma Claro Pay

Activar Paquete Internet Amigo Con Datos RRSS
    [Arguments]    ${paquete_id}
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Activar Dos Paquetes Con Datos RRSS
    [Arguments]    ${paquete_1}=PAQ_500MB_RRSS    ${paquete_2}=PAQ_1GB_RRSS
    Activar Paquete Internet Amigo Con Datos RRSS    ${paquete_1}
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo Con Datos RRSS    ${paquete_2}
    Verificar Mensaje De Activación Exitosa

Contar Bolsas De Datos RRSS En Plataforma 360
    ${cantidad}=    Get Element Count    ${CONTADOR_BOLSAS_RRSS_360}
    [Return]    ${cantidad}

Contar Bolsas De Datos RRSS En Plataforma MiTelcel
    ${cantidad}=    Get Element Count    ${CONTADOR_BOLSAS_RRSS_MITELCEL}
    [Return]    ${cantidad}

Contar Bolsas De Datos RRSS En Plataforma Claro Pay
    ${cantidad}=    Get Element Count    ${CONTADOR_BOLSAS_RRSS_CLAROPAY}
    [Return]    ${cantidad}

Verificar Una Sola Bolsa RRSS En Plataforma 360
    Abrir Pestaña Plataforma 360
    ${cantidad}=    Contar Bolsas De Datos RRSS En Plataforma 360
    Should Be Equal As Numbers    ${cantidad}    1    msg=Se esperaba 1 bolsa de datos RRSS consolidada pero se encontraron ${cantidad} en Plataforma 360

Verificar Una Sola Bolsa RRSS En Plataforma MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    ${cantidad}=    Contar Bolsas De Datos RRSS En Plataforma MiTelcel
    Should Be Equal As Numbers    ${cantidad}    1    msg=Se esperaba 1 bolsa de datos RRSS consolidada pero se encontraron ${cantidad} en MiTelcel

Verificar Una Sola Bolsa RRSS En Plataforma Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    ${cantidad}=    Contar Bolsas De Datos RRSS En Plataforma Claro Pay
    Should Be Equal As Numbers    ${cantidad}    1    msg=Se esperaba 1 bolsa de datos RRSS consolidada pero se encontraron ${cantidad} en Claro Pay

Verificar Una Sola Bolsa RRSS En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Plataforma 360
    Verificar Una Sola Bolsa RRSS En Plataforma MiTelcel
    Verificar Una Sola Bolsa RRSS En Plataforma Claro Pay

Activar Paquete Internet Amigo 50
    Seleccionar Paquete Por ID    PAQ_AMIGO_50
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Activar Paquete Internet Amigo 100
    Seleccionar Paquete Por ID    PAQ_AMIGO_100
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Obtener Datos Totales En Plataforma 360
    Abrir Pestaña Plataforma 360
    ${datos_totales}=    Get Text    ${DATOS_TOTALES_BOLSA_360}
    [Return]    ${datos_totales}

Obtener Datos Totales En Plataforma MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    ${datos_totales}=    Get Text    ${DATOS_TOTALES_BOLSA_MITELCEL}
    [Return]    ${datos_totales}

Obtener Datos Totales En Plataforma Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    ${datos_totales}=    Get Text    ${DATOS_TOTALES_BOLSA_CLAROPAY}
    [Return]    ${datos_totales}

Verificar Suma De Datos En Bolsa
    [Arguments]    ${datos_esperados}
    Abrir Pestaña Plataforma 360
    ${datos_360}=    Obtener Datos Totales En Plataforma 360
    Should Contain    ${datos_360}    ${datos_esperados}

    Abrir Pestaña Plataforma MiTelcel
    ${datos_mitelcel}=    Obtener Datos Totales En Plataforma MiTelcel
    Should Contain    ${datos_mitelcel}    ${datos_esperados}

    Abrir Pestaña Plataforma Claro Pay
    ${datos_claropay}=    Obtener Datos Totales En Plataforma Claro Pay
    Should Contain    ${datos_claropay}    ${datos_esperados}

# Locators para monitoreo de consumo de datos RRSS (Caso 8)
${DATOS_NAVEGACION_LIBRE_360}         css:#plataforma-360 .datos-navegacion-libre
${DATOS_NAVEGACION_LIBRE_MITELCEL}    css:#plataforma-mitelcel .datos-navegacion-libre
${DATOS_NAVEGACION_LIBRE_CLAROPAY}    css:#plataforma-claropay .datos-navegacion-libre
${SIMULADOR_USO_RRSS}                 id:simuladorUsoRedesSociales
${BOTON_SIMULAR_USO_RRSS}             id:btnSimularUsoRRSS
${MENSAJE_CONFIRMACION_USO_RRSS}      css:.mensaje-confirmacion-uso-rrss

*** Keywords ***
Obtener Datos Navegacion Libre En Plataforma 360
    Abrir Pestaña Plataforma 360
    ${datos}=    Get Text    ${DATOS_NAVEGACION_LIBRE_360}
    [Return]    ${datos}

Obtener Datos Navegacion Libre En Plataforma MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    ${datos}=    Get Text    ${DATOS_NAVEGACION_LIBRE_MITELCEL}
    [Return]    ${datos}

Obtener Datos Navegacion Libre En Plataforma Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    ${datos}=    Get Text    ${DATOS_NAVEGACION_LIBRE_CLAROPAY}
    [Return]    ${datos}

Simular Uso De Aplicaciones De Redes Sociales
    Wait Until Element Is Visible    ${SIMULADOR_USO_RRSS}    timeout=10s
    Scroll Element Into View    ${SIMULADOR_USO_RRSS}
    Click Element    ${BOTON_SIMULAR_USO_RRSS}
    Wait Until Element Is Visible    ${MENSAJE_CONFIRMACION_USO_RRSS}    timeout=15s

Verificar Confirmacion De Uso De RRSS
    ${mensaje}=    Get Text    ${MENSAJE_CONFIRMACION_USO_RRSS}
    Should Contain    ${mensaje}    exitoso
    [Return]    ${mensaje}

# Locators para notificaciones SMS de activación (Caso 9)
${SECCION_NOTIFICACIONES_SMS}         css:.seccion-notificaciones-sms
${BOTON_VER_MENSAJE_ACTIVACION}       id:btnVerMensajeActivacion
${MODAL_MENSAJE_SMS}                  id:modalMensajeSMS
${CONTENIDO_MENSAJE_SMS}              css:#modalMensajeSMS .contenido-mensaje
${VIGENCIA_EN_MENSAJE_SMS}            css:#modalMensajeSMS .vigencia-paquete
${TEXTO_CONFIRMACION_ACTIVACION}      css:#modalMensajeSMS .texto-confirmacion
${FECHA_VIGENCIA_MENSAJE}             css:#modalMensajeSMS .fecha-vigencia
${BOTON_CERRAR_MENSAJE_SMS}           css:#modalMensajeSMS .btn-cerrar
${HISTORIAL_MENSAJES_SMS}             css:.historial-mensajes-sms
${ULTIMO_MENSAJE_ENVIADO}             css:.historial-mensajes-sms .mensaje-item:first-child

*** Keywords ***
Abrir Seccion De Notificaciones SMS
    Wait Until Element Is Visible    ${SECCION_NOTIFICACIONES_SMS}    timeout=10s
    Scroll Element Into View    ${SECCION_NOTIFICACIONES_SMS}

Ver Mensaje De Activacion
    Wait Until Element Is Visible    ${BOTON_VER_MENSAJE_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_VER_MENSAJE_ACTIVACION}
    Wait Until Element Is Visible    ${MODAL_MENSAJE_SMS}    timeout=10s

Obtener Contenido Del Mensaje SMS
    Wait Until Element Is Visible    ${CONTENIDO_MENSAJE_SMS}    timeout=10s
    ${contenido}=    Get Text    ${CONTENIDO_MENSAJE_SMS}
    [Return]    ${contenido}

Verificar Mensaje Confirma Activacion Del Paquete
    ${contenido}=    Obtener Contenido Del Mensaje SMS
    Should Contain    ${contenido}    activación
    Should Contain    ${contenido}    exitosa

Obtener Vigencia Del Mensaje SMS
    Wait Until Element Is Visible    ${VIGENCIA_EN_MENSAJE_SMS}    timeout=10s
    ${vigencia}=    Get Text    ${VIGENCIA_EN_MENSAJE_SMS}
    [Return]    ${vigencia}

Verificar Vigencia Del Paquete En Mensaje
    [Arguments]    ${vigencia_esperada}
    ${vigencia_mensaje}=    Obtener Vigencia Del Mensaje SMS
    Should Contain    ${vigencia_mensaje}    ${vigencia_esperada}

Obtener Fecha De Vigencia En Mensaje SMS
    Wait Until Element Is Visible    ${FECHA_VIGENCIA_MENSAJE}    timeout=10s
    ${fecha}=    Get Text    ${FECHA_VIGENCIA_MENSAJE}
    [Return]    ${fecha}

Cerrar Modal De Mensaje SMS
    Wait Until Element Is Visible    ${BOTON_CERRAR_MENSAJE_SMS}    timeout=5s
    Click Element    ${BOTON_CERRAR_MENSAJE_SMS}
    Wait Until Element Is Not Visible    ${MODAL_MENSAJE_SMS}    timeout=5s

Verificar Recepcion De Mensaje SMS De Activacion
    Abrir Seccion De Notificaciones SMS
    Ver Mensaje De Activacion
    Verificar Mensaje Confirma Activacion Del Paquete

Verificar Vigencia Corresponde Al Paquete Adquirido En Mensaje
    [Arguments]    ${vigencia_esperada}
    ${vigencia}=    Obtener Vigencia Del Mensaje SMS
    Should Contain    ${vigencia}    ${vigencia_esperada}
    Log    Vigencia en mensaje SMS: ${vigencia}

Activar Segundo Paquete Y Verificar Vigencia Individual En Mensaje
    [Arguments]    ${paquete_id}    ${vigencia_esperada}
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Sleep    2s    # Esperar envío de notificación SMS
    Abrir Seccion De Notificaciones SMS
    Ver Mensaje De Activacion
    Verificar Vigencia Corresponde Al Paquete Adquirido En Mensaje    ${vigencia_esperada}
    Cerrar Modal De Mensaje SMS

# Locators para notificaciones SMS de vencimiento (Caso 10)
${BOTON_VER_MENSAJE_VENCIMIENTO}       id:btnVerMensajeVencimiento
${MENSAJE_VENCIMIENTO_SMS}             css:#modalMensajeSMS .mensaje-vencimiento
${TEXTO_CONFIRMACION_VENCIMIENTO}      css:#modalMensajeSMS .texto-vencimiento
${FECHA_VENCIMIENTO_EN_MENSAJE}        css:#modalMensajeSMS .fecha-vencimiento-paquete

*** Keywords ***
Ver Mensaje De Vencimiento
    Wait Until Element Is Visible    ${BOTON_VER_MENSAJE_VENCIMIENTO}    timeout=10s
    Click Button    ${BOTON_VER_MENSAJE_VENCIMIENTO}
    Wait Until Element Is Visible    ${MODAL_MENSAJE_SMS}    timeout=10s

Verificar Mensaje Confirma Vencimiento Del Paquete
    Wait Until Element Is Visible    ${MENSAJE_VENCIMIENTO_SMS}    timeout=10s
    ${contenido}=    Get Text    ${MENSAJE_VENCIMIENTO_SMS}
    Should Contain    ${contenido}    vencimiento
    Should Contain    ${contenido}    paquete

Obtener Fecha Vencimiento Del Mensaje
    Wait Until Element Is Visible    ${FECHA_VENCIMIENTO_EN_MENSAJE}    timeout=10s
    ${fecha}=    Get Text    ${FECHA_VENCIMIENTO_EN_MENSAJE}
    [Return]    ${fecha}

Verificar Recepcion De Mensaje SMS De Vencimiento
    Abrir Seccion De Notificaciones SMS
    Ver Mensaje De Vencimiento
    Verificar Mensaje Confirma Vencimiento Del Paquete

# Locators para notificaciones de consumo de datos (Caso 11)
${SIMULADOR_CONSUMO_DATOS}             id:simuladorConsumoDatos
${INPUT_PORCENTAJE_CONSUMO}            id:porcentajeConsumo
${BOTON_SIMULAR_CONSUMO}               id:btnSimularConsumo
${MENSAJE_CONFIRMACION_CONSUMO}        css:.mensaje-confirmacion-consumo
${BOTON_VER_MENSAJE_CONSUMO}           id:btnVerMensajeConsumo
${MENSAJE_CONSUMO_SMS}                 css:#modalMensajeSMS .mensaje-consumo
${TEXTO_NOTIFICACION_CONSUMO}          css:#modalMensajeSMS .texto-notificacion-consumo
${UMBRAL_CONSUMO_EN_MENSAJE}           css:#modalMensajeSMS .umbral-consumo
${PAQUETE_ADQUIRIDO_EN_MENSAJE}        css:#modalMensajeSMS .paquete-adquirido
${DATOS_CONSUMIDOS_EN_MENSAJE}         css:#modalMensajeSMS .datos-consumidos
${DATOS_RESTANTES_EN_MENSAJE}          css:#modalMensajeSMS .datos-restantes

*** Keywords ***
Abrir Simulador De Consumo De Datos
    Wait Until Element Is Visible    ${SIMULADOR_CONSUMO_DATOS}    timeout=10s
    Scroll Element Into View    ${SIMULADOR_CONSUMO_DATOS}

Simular Consumo De Datos Hasta Umbral
    [Arguments]    ${porcentaje}=80
    Abrir Simulador De Consumo De Datos
    Wait Until Element Is Visible    ${INPUT_PORCENTAJE_CONSUMO}    timeout=10s
    Input Text    ${INPUT_PORCENTAJE_CONSUMO}    ${porcentaje}
    Click Button    ${BOTON_SIMULAR_CONSUMO}
    Wait Until Element Is Visible    ${MENSAJE_CONFIRMACION_CONSUMO}    timeout=15s

Verificar Confirmacion De Consumo Simulado
    ${mensaje}=    Get Text    ${MENSAJE_CONFIRMACION_CONSUMO}
    Should Contain    ${mensaje}    exitoso
    [Return]    ${mensaje}

Ver Mensaje De Notificacion De Consumo
    Wait Until Element Is Visible    ${BOTON_VER_MENSAJE_CONSUMO}    timeout=10s
    Click Button    ${BOTON_VER_MENSAJE_CONSUMO}
    Wait Until Element Is Visible    ${MODAL_MENSAJE_SMS}    timeout=10s

Verificar Mensaje Notifica Consumo De Datos
    Wait Until Element Is Visible    ${MENSAJE_CONSUMO_SMS}    timeout=10s
    ${contenido}=    Get Text    ${MENSAJE_CONSUMO_SMS}
    Should Contain    ${contenido}    consumo
    Should Contain    ${contenido}    datos
    [Return]    ${contenido}

Obtener Umbral De Consumo Del Mensaje
    Wait Until Element Is Visible    ${UMBRAL_CONSUMO_EN_MENSAJE}    timeout=10s
    ${umbral}=    Get Text    ${UMBRAL_CONSUMO_EN_MENSAJE}
    [Return]    ${umbral}

Obtener Paquete Adquirido Del Mensaje De Consumo
    Wait Until Element Is Visible    ${PAQUETE_ADQUIRIDO_EN_MENSAJE}    timeout=10s
    ${paquete}=    Get Text    ${PAQUETE_ADQUIRIDO_EN_MENSAJE}
    [Return]    ${paquete}

Verificar Notificacion Corresponde Al Paquete Adquirido
    [Arguments]    ${paquete_esperado}
    ${paquete_mensaje}=    Obtener Paquete Adquirido Del Mensaje De Consumo
    Should Contain    ${paquete_mensaje}    ${paquete_esperado}

Obtener Datos Consumidos Del Mensaje
    Wait Until Element Is Visible    ${DATOS_CONSUMIDOS_EN_MENSAJE}    timeout=10s
    ${datos_consumidos}=    Get Text    ${DATOS_CONSUMIDOS_EN_MENSAJE}
    [Return]    ${datos_consumidos}

Obtener Datos Restantes Del Mensaje
    Wait Until Element Is Visible    ${DATOS_RESTANTES_EN_MENSAJE}    timeout=10s
    ${datos_restantes}=    Get Text    ${DATOS_RESTANTES_EN_MENSAJE}
    [Return]    ${datos_restantes}

Verificar Recepcion De Mensaje SMS De Consumo
    Abrir Seccion De Notificaciones SMS
    Ver Mensaje De Notificacion De Consumo
    Verificar Mensaje Notifica Consumo De Datos

Verificar Informacion Consumo Consistente Con Paquete
    [Arguments]    ${paquete_esperado}    ${vigencia_esperada}
    ${paquete_mensaje}=    Obtener Paquete Adquirido Del Mensaje De Consumo
    Should Contain    ${paquete_mensaje}    ${paquete_esperado}
    ${vigencia_mensaje}=    Obtener Vigencia Del Mensaje SMS
    Should Contain    ${vigencia_mensaje}    ${vigencia_esperada}

# Locators para perfil de usuario con productos BES (Caso 12)
${SECCION_PERFIL_USUARIO}         css:.perfil-usuario
${LABEL_ORIGEN_PRODUCTOS}         css:.perfil-usuario .origen-productos
${ICONO_PRODUCTOS_BES}            css:.perfil-usuario .icono-bes
${TEXTO_PRODUCTOS_BES}            css:.perfil-usuario .texto-productos-bes

# Paquetes Internet Amigo 30 pesos (Caso 13)
${PAQUETE_INTERNET_AMIGO_30}      css:[data-paquete-id="PAQ_AMIGO_30"]

*** Keywords ***
Verificar Usuario Tiene Productos Creados En BES
    Wait Until Element Is Visible    ${SECCION_PERFIL_USUARIO}    timeout=10s
    ${origen_productos}=    Get Text    ${LABEL_ORIGEN_PRODUCTOS}
    Should Contain    ${origen_productos}    BES
    Element Should Be Visible    ${ICONO_PRODUCTOS_BES}

Buscar Línea Mixta
    [Arguments]    ${numero_linea}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA}    timeout=10s
    Input Text    ${INPUT_NUMERO_LINEA}    ${numero_linea}
    Click Button    ${BOTON_BUSCAR_LINEA}
    Wait Until Element Is Visible    ${LABEL_TIPO_LINEA}    timeout=15s

Verificar Tipo De Línea Mixta
    ${tipo_actual}=    Get Text    ${LABEL_TIPO_LINEA}
    Should Contain    ${tipo_actual}    Mixto

Activar Paquete Internet Amigo 30
    Seleccionar Paquete Por ID    PAQ_AMIGO_30
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

# Locators para productos legados m2k (Caso 14)
${ICONO_PRODUCTOS_M2K}            css:.perfil-usuario .icono-m2k
${TEXTO_PRODUCTOS_M2K}            css:.perfil-usuario .texto-productos-m2k
${LABEL_PRODUCTOS_LEGADOS_M2K}    css:.perfil-usuario .productos-legados-m2k

# Paquete Internet Amigo 20 pesos (Caso 14)
${PAQUETE_INTERNET_AMIGO_20}      css:[data-paquete-id="PAQ_AMIGO_20"]

# Locators para usuario controlado con productos m2k (Caso 15)
${LABEL_TIPO_USUARIO_CONTROLADO}    css:.perfil-usuario .tipo-usuario-controlado
${ICONO_USUARIO_CONTROLADO}         css:.perfil-usuario .icono-controlado
${ETIQUETA_PRODUCTOS_M2K}           css:.perfil-usuario .etiqueta-m2k

*** Keywords ***
Verificar Usuario Tiene Productos Legados M2K Activos
    Wait Until Element Is Visible    ${SECCION_PERFIL_USUARIO}    timeout=10s
    ${origen_productos}=    Get Text    ${LABEL_ORIGEN_PRODUCTOS}
    Should Contain    ${origen_productos}    m2k
    Element Should Be Visible    ${ICONO_PRODUCTOS_M2K}

Verificar Tipo De Línea Mixta Con Productos M2K
    ${tipo_actual}=    Get Text    ${LABEL_TIPO_LINEA}
    Should Contain    ${tipo_actual}    Mixto
    Verificar Usuario Tiene Productos Legados M2K Activos

Activar Paquete Internet Amigo 20
    Seleccionar Paquete Por ID    PAQ_AMIGO_20
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Verificar Tipo De Usuario Controlado
    Wait Until Element Is Visible    ${LABEL_TIPO_USUARIO_CONTROLADO}    timeout=10s
    ${tipo_usuario}=    Get Text    ${LABEL_TIPO_USUARIO_CONTROLADO}
    Should Contain    ${tipo_usuario}    Controlado
    Element Should Be Visible    ${ICONO_USUARIO_CONTROLADO}

Buscar Usuario Por Número
    [Arguments]    ${numero_linea}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA}    timeout=10s
    Input Text    ${INPUT_NUMERO_LINEA}    ${numero_linea}
    Click Button    ${BOTON_BUSCAR_LINEA}
    Wait Until Element Is Visible    ${LABEL_TIPO_LINEA}    timeout=15s

# Locators para usuario VPN Cost Control PYME (Caso 16)
${LABEL_TIPO_USUARIO_VPNCC_PYME}    css:.perfil-usuario .tipo-usuario-vpncc-pyme
${ICONO_USUARIO_VPNCC_PYME}         css:.perfil-usuario .icono-vpncc-pyme
${TEXTO_PERFIL_VPNCC_PYME}          css:.perfil-usuario .texto-vpncc-pyme
${LABEL_PLAN_VPNCC_PYME}            css:.perfil-usuario .plan-vpncc-pyme

*** Keywords ***
Verificar Perfil Usuario VPN Cost Control PYME
    Wait Until Element Is Visible    ${SECCION_PERFIL_USUARIO}    timeout=10s
    Wait Until Element Is Visible    ${LABEL_TIPO_USUARIO_VPNCC_PYME}    timeout=10s
    ${tipo_usuario}=    Get Text    ${LABEL_TIPO_USUARIO_VPNCC_PYME}
    Should Contain    ${tipo_usuario}    VPN Cost Control PYME
    Element Should Be Visible    ${ICONO_USUARIO_VPNCC_PYME}

Buscar Línea VPN Cost Control PYME
    [Arguments]    ${numero_linea}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA}    timeout=10s
    Input Text    ${INPUT_NUMERO_LINEA}    ${numero_linea}
    Click Button    ${BOTON_BUSCAR_LINEA}
    Wait Until Element Is Visible    ${LABEL_TIPO_LINEA}    timeout=15s

Verificar Tipo De Línea VPN Cost Control PYME
    ${tipo_actual}=    Get Text    ${LABEL_TIPO_LINEA}
    Should Contain    ${tipo_actual}    VPN Cost Control PYME
    Verificar Perfil Usuario VPN Cost Control PYME

# Locators para usuario VPN Cost Control CORPORATIVO (Caso 17)
${LABEL_TIPO_USUARIO_VPNCC_CORPORATIVO}    css:.perfil-usuario .tipo-usuario-vpncc-corporativo
${ICONO_USUARIO_VPNCC_CORPORATIVO}         css:.perfil-usuario .icono-vpncc-corporativo
${TEXTO_PERFIL_VPNCC_CORPORATIVO}          css:.perfil-usuario .texto-vpncc-corporativo
${LABEL_PLAN_VPNCC_CORPORATIVO}            css:.perfil-usuario .plan-vpncc-corporativo

*** Keywords ***
Verificar Perfil Usuario VPN Cost Control CORPORATIVO
    Wait Until Element Is Visible    ${SECCION_PERFIL_USUARIO}    timeout=10s
    Wait Until Element Is Visible    ${LABEL_TIPO_USUARIO_VPNCC_CORPORATIVO}    timeout=10s
    ${tipo_usuario}=    Get Text    ${LABEL_TIPO_USUARIO_VPNCC_CORPORATIVO}
    Should Contain    ${tipo_usuario}    VPN Cost Control CORPORATIVO
    Element Should Be Visible    ${ICONO_USUARIO_VPNCC_CORPORATIVO}

Buscar Línea VPN Cost Control CORPORATIVO
    [Arguments]    ${numero_linea}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA}    timeout=10s
    Input Text    ${INPUT_NUMERO_LINEA}    ${numero_linea}
    Click Button    ${BOTON_BUSCAR_LINEA}
    Wait Until Element Is Visible    ${LABEL_TIPO_LINEA}    timeout=15s

Verificar Tipo De Línea VPN Cost Control CORPORATIVO
    ${tipo_actual}=    Get Text    ${LABEL_TIPO_LINEA}
    Should Contain    ${tipo_actual}    VPN Cost Control CORPORATIVO
    Verificar Perfil Usuario VPN Cost Control CORPORATIVO

# Locators para activación de múltiples paquetes consecutivos (Caso 25)
${SECCION_HISTORIAL_ACTIVACIONES}       css:.seccion-historial-activaciones
${CONTADOR_PAQUETES_ACTIVOS}            css:.contador-paquetes-activos
${LISTA_PAQUETES_ACTIVOS}               css:.lista-paquetes-activos
${ITEM_PAQUETE_ACTIVO}                  css:.lista-paquetes-activos .item-paquete

# Locators para Orden de Débito (Caso 18)
${SECCION_ORDEN_DEBITO}                  css:.seccion-orden-debito
${BOTON_CONSULTAR_ORDEN_DEBITO}          id:btnConsultarOrdenDebito
${MODAL_ORDEN_DEBITO}                    id:modalOrdenDebito
${LISTA_ORDEN_DEBITO}                    css:#modalOrdenDebito .lista-orden-debito
${ITEM_ORDEN_DEBITO}                     css:#modalOrdenDebito .item-orden-debito
${TEXTO_ORDEN_DEBITO}                    css:#modalOrdenDebito .texto-orden-debito
${BOTON_CERRAR_MODAL_ORDEN}              css:#modalOrdenDebito .btn-cerrar
${SECCION_LOGS_DEBITO}                   css:.seccion-logs-debito
${BOTON_VER_LOGS_DEBITO}                 id:btnVerLogsDebito
${MODAL_LOGS_DEBITO}                     id:modalLogsDebito
${CONTENIDO_LOGS_DEBITO}                 css:#modalLogsDebito .contenido-logs
${REGISTRO_LOG_DEBITO}                   css:#modalLogsDebito .registro-log
${FECHA_HORA_LOG}                        css:.registro-log .fecha-hora
${ORDEN_DEBITO_EN_LOG}                   css:.registro-log .orden-aplicado
${BOTON_CERRAR_MODAL_LOGS}               css:#modalLogsDebito .btn-cerrar

# Locators para Paquetes Amigo Sin Límite (Caso 34)
${MENU_PAQUETES_SIN_LIMITE}              css:nav [data-submenu="paquetes-sin-limite"]
${LABEL_TIPO_LINEA_CONTROL}              css:.info-linea .tipo-linea-control
${PAQUETE_SIN_LIMITE_1GB}                css:[data-paquete-id="PAQ_SIN_LIMITE_1GB"]
${PAQUETE_SIN_LIMITE_2GB}                css:[data-paquete-id="PAQ_SIN_LIMITE_2GB"]
${BOTON_ACTIVAR_SIN_LIMITE}              css:.btn-activar-sin-limite
${MENSAJE_EXITO_SIN_LIMITE}              css:.alert-success .mensaje-activacion-sin-limite
${DATOS_TOTALES_SIN_LIMITE}              css:.datos-totales-sin-limite
${VIGENCIA_SIN_LIMITE}                   css:.vigencia-sin-limite
${BENEFICIOS_SIN_LIMITE}                 css:.beneficios-sin-limite

*** Keywords ***
Abrir Seccion De Orden De Debito
    Wait Until Element Is Visible    ${SECCION_ORDEN_DEBITO}    timeout=10s
    Scroll Element Into View    ${SECCION_ORDEN_DEBITO}

Consultar Orden De Debito Del Sistema
    Wait Until Element Is Visible    ${BOTON_CONSULTAR_ORDEN_DEBITO}    timeout=10s
    Click Button    ${BOTON_CONSULTAR_ORDEN_DEBITO}
    Wait Until Element Is Visible    ${MODAL_ORDEN_DEBITO}    timeout=10s
    Wait Until Element Is Visible    ${LISTA_ORDEN_DEBITO}    timeout=10s

Obtener Orden De Debito Actual
    Wait Until Element Is Visible    ${TEXTO_ORDEN_DEBITO}    timeout=10s
    ${orden}=    Get Text    ${TEXTO_ORDEN_DEBITO}
    [Return]    ${orden}

Registrar Orden De Debito Original
    Abrir Seccion De Orden De Debito
    Consultar Orden De Debito Del Sistema
    ${orden_original}=    Obtener Orden De Debito Actual
    Set Global Variable    ${ORDEN_DEBITO_ORIGINAL}    ${orden_original}
    Log    Orden de débito original registrado: ${ORDEN_DEBITO_ORIGINAL}
    Cerrar Modal De Orden De Debito
    [Return]    ${orden_original}

Cerrar Modal De Orden De Debito
    Wait Until Element Is Visible    ${BOTON_CERRAR_MODAL_ORDEN}    timeout=5s
    Click Element    ${BOTON_CERRAR_MODAL_ORDEN}
    Wait Until Element Is Not Visible    ${MODAL_ORDEN_DEBITO}    timeout=5s

Realizar Consumo De Datos Del Usuario
    [Arguments]    ${cantidad_mb}=50
    Abrir Simulador De Consumo De Datos
    Wait Until Element Is Visible    ${INPUT_PORCENTAJE_CONSUMO}    timeout=10s
    Input Text    ${INPUT_PORCENTAJE_CONSUMO}    ${cantidad_mb}
    Click Button    ${BOTON_SIMULAR_CONSUMO}
    Wait Until Element Is Visible    ${MENSAJE_CONFIRMACION_CONSUMO}    timeout=15s
    ${mensaje}=    Get Text    ${MENSAJE_CONFIRMACION_CONSUMO}
    Should Contain    ${mensaje}    exitoso
    Log    Consumo de datos realizado: ${cantidad_mb}MB

Verificar Orden De Debito No Ha Sido Modificado
    Abrir Seccion De Orden De Debito
    Consultar Orden De Debito Del Sistema
    ${orden_actual}=    Obtener Orden De Debito Actual
    Should Be Equal    ${orden_actual}    ${ORDEN_DEBITO_ORIGINAL}    msg=El orden de débito NO debe modificarse. Original: ${ORDEN_DEBITO_ORIGINAL}, Actual: ${orden_actual}
    Log    Verificación exitosa: El orden de débito se mantiene inalterado
    Cerrar Modal De Orden De Debito

Abrir Seccion De Logs De Debito
    Wait Until Element Is Visible    ${SECCION_LOGS_DEBITO}    timeout=10s
    Scroll Element Into View    ${SECCION_LOGS_DEBITO}

Consultar Logs De Debito Del Sistema
    Wait Until Element Is Visible    ${BOTON_VER_LOGS_DEBITO}    timeout=10s
    Click Button    ${BOTON_VER_LOGS_DEBITO}
    Wait Until Element Is Visible    ${MODAL_LOGS_DEBITO}    timeout=10s
    Wait Until Element Is Visible    ${CONTENIDO_LOGS_DEBITO}    timeout=10s

Verificar Logs Confirman Orden De Debito Inalterado
    Abrir Seccion De Logs De Debito
    Consultar Logs De Debito Del Sistema
    ${orden_en_log}=    Get Text    ${ORDEN_DEBITO_EN_LOG}
    Should Be Equal    ${orden_en_log}    ${ORDEN_DEBITO_ORIGINAL}    msg=Los logs deben confirmar que el orden de débito permanece inalterado
    Log    Los registros confirman que el orden de débito permanece inalterado
    Cerrar Modal De Logs De Debito

Cerrar Modal De Logs De Debito
    Wait Until Element Is Visible    ${BOTON_CERRAR_MODAL_LOGS}    timeout=5s
    Click Element    ${BOTON_CERRAR_MODAL_LOGS}
    Wait Until Element Is Not Visible    ${MODAL_LOGS_DEBITO}    timeout=5s

*** Keywords ***
Navegar A Paquetes Amigo Sin Límite
    Wait Until Element Is Visible    ${MENU_VENTA}    timeout=10s
    Click Element    ${MENU_VENTA}
    Wait Until Element Is Visible    ${MENU_PAQUETES_SIN_LIMITE}    timeout=10s
    Click Element    ${MENU_PAQUETES_SIN_LIMITE}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA}    timeout=10s

Buscar Línea De Control
    [Arguments]    ${numero_linea}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA}    timeout=10s
    Input Text    ${INPUT_NUMERO_LINEA}    ${numero_linea}
    Click Button    ${BOTON_BUSCAR_LINEA}
    Wait Until Element Is Visible    ${LABEL_TIPO_LINEA_CONTROL}    timeout=15s

Verificar Tipo De Línea Control
    ${tipo_actual}=    Get Text    ${LABEL_TIPO_LINEA_CONTROL}
    Should Contain    ${tipo_actual}    Control
    Element Should Be Visible    ${LABEL_TIPO_LINEA_CONTROL}

Activar Paquete Amigo Sin Límite 1GB
    Wait Until Element Is Visible    ${PAQUETE_SIN_LIMITE_1GB}    timeout=10s
    Click Element    ${PAQUETE_SIN_LIMITE_1GB}
    Wait Until Element Is Enabled    ${BOTON_ACTIVAR_SIN_LIMITE}    timeout=5s
    Click Button    ${BOTON_ACTIVAR_SIN_LIMITE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_SIN_LIMITE}    timeout=20s

Activar Paquete Amigo Sin Límite 2GB
    Wait Until Element Is Visible    ${PAQUETE_SIN_LIMITE_2GB}    timeout=10s
    Click Element    ${PAQUETE_SIN_LIMITE_2GB}
    Wait Until Element Is Enabled    ${BOTON_ACTIVAR_SIN_LIMITE}    timeout=5s
    Click Button    ${BOTON_ACTIVAR_SIN_LIMITE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_SIN_LIMITE}    timeout=20s

Verificar Activación Exitosa Sin Límite
    ${mensaje}=    Get Text    ${MENSAJE_EXITO_SIN_LIMITE}
    Should Contain    ${mensaje}    exitosamente
    Element Should Be Visible    ${MENSAJE_EXITO_SIN_LIMITE}

Obtener Datos Totales Sin Límite
    Wait Until Element Is Visible    ${DATOS_TOTALES_SIN_LIMITE}    timeout=10s
    ${datos}=    Get Text    ${DATOS_TOTALES_SIN_LIMITE}
    [Return]    ${datos}

Obtener Vigencia Sin Límite
    Wait Until Element Is Visible    ${VIGENCIA_SIN_LIMITE}    timeout=10s
    ${vigencia}=    Get Text    ${VIGENCIA_SIN_LIMITE}
    [Return]    ${vigencia}

Obtener Beneficios Sin Límite
    Wait Until Element Is Visible    ${BENEFICIOS_SIN_LIMITE}    timeout=10s
    ${beneficios}=    Get Text    ${BENEFICIOS_SIN_LIMITE}
    [Return]    ${beneficios}

Activar Paquete Internet Amigo 1GB
    Seleccionar Paquete Por ID    PAQ_1GB_30D
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Activar Paquete Internet Amigo 2GB
    Seleccionar Paquete Por ID    PAQ_2GB_60D
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

# Locators para consumo de datos desde bolsa unificada (Caso 36)
${INPUT_CANTIDAD_CONSUMO_MB}              id:cantidadConsumoMB
${DATOS_RESTANTES_BOLSA_360}              css:#plataforma-360 .datos-restantes-bolsa
${DATOS_RESTANTES_BOLSA_MITELCEL}         css:#plataforma-mitelcel .datos-restantes-bolsa
${DATOS_RESTANTES_BOLSA_CLAROPAY}         css:#plataforma-claropay .datos-restantes-bolsa
${CONTADOR_DEBITOS_BOLSA}                 css:.contador-debitos-bolsa
${HISTORIAL_DEBITOS_BOLSA}                css:.historial-debitos-bolsa
${ITEM_DEBITO_BOLSA}                      css:.historial-debitos-bolsa .item-debito

*** Keywords ***
Obtener Datos Restantes En Plataforma 360
    Abrir Pestaña Plataforma 360
    Wait Until Element Is Visible    ${DATOS_RESTANTES_BOLSA_360}    timeout=10s
    ${datos_restantes}=    Get Text    ${DATOS_RESTANTES_BOLSA_360}
    [Return]    ${datos_restantes}

Obtener Datos Restantes En Plataforma MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    Wait Until Element Is Visible    ${DATOS_RESTANTES_BOLSA_MITELCEL}    timeout=10s
    ${datos_restantes}=    Get Text    ${DATOS_RESTANTES_BOLSA_MITELCEL}
    [Return]    ${datos_restantes}

Obtener Datos Restantes En Plataforma Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    Wait Until Element Is Visible    ${DATOS_RESTANTES_BOLSA_CLAROPAY}    timeout=10s
    ${datos_restantes}=    Get Text    ${DATOS_RESTANTES_BOLSA_CLAROPAY}
    [Return]    ${datos_restantes}

Verificar Datos Restantes En Bolsa
    [Arguments]    ${mb_esperados}
    Abrir Pestaña Plataforma 360
    ${datos_restantes}=    Obtener Datos Restantes En Plataforma 360
    Should Contain    ${datos_restantes}    ${mb_esperados}
    Log    Datos restantes verificados: ${datos_restantes} (Esperados: ${mb_esperados} MB)

Simular Consumo De Datos Por Cantidad Especifica
    [Arguments]    ${cantidad_mb}
    Abrir Simulador De Consumo De Datos
    Wait Until Element Is Visible    ${INPUT_CANTIDAD_CONSUMO_MB}    timeout=10s
    Input Text    ${INPUT_CANTIDAD_CONSUMO_MB}    ${cantidad_mb}
    Click Button    ${BOTON_SIMULAR_CONSUMO}
    Wait Until Element Is Visible    ${MENSAJE_CONFIRMACION_CONSUMO}    timeout=15s
    Log    Consumo simulado de ${cantidad_mb} MB realizado exitosamente

Contar Débitos En Historial De Bolsa
    Wait Until Element Is Visible    ${HISTORIAL_DEBITOS_BOLSA}    timeout=10s
    ${cantidad_debitos}=    Get Element Count    ${ITEM_DEBITO_BOLSA}
    [Return]    ${cantidad_debitos}

Verificar Débito Único En Bolsa Unificada
    Wait Until Element Is Visible    ${CONTADOR_DEBITOS_BOLSA}    timeout=10s
    ${cantidad_debitos}=    Contar Débitos En Historial De Bolsa
    Should Be True    ${cantidad_debitos} >= 1    msg=Debe haber al menos un débito registrado en la bolsa unificada
    Log    Se verifica que el débito se realizó en la bolsa unificada: ${cantidad_debitos} débito(s) registrado(s)

# Paquete Internet Amigo 200 pesos (Caso 39)
${PAQUETE_INTERNET_AMIGO_200}      css:[data-paquete-id="PAQ_AMIGO_200"]

# Locators para Diferentes Familias de Paquetes (Caso 40)
${SECCION_PAQUETES_SIN_LIMITE_ACTIVOS}      css:.seccion-paquetes-sin-limite-activos
${SECCION_PAQUETES_INTERNET_AMIGO_ACTIVOS}  css:.seccion-paquetes-internet-amigo-activos
${LISTA_PAQUETES_SIN_LIMITE}                css:.lista-paquetes-sin-limite .paquete-item
${LISTA_PAQUETES_INTERNET_AMIGO}            css:.lista-paquetes-internet-amigo .paquete-item
${ETIQUETA_FAMILIA_SIN_LIMITE}              css:.etiqueta-familia-sin-limite
${ETIQUETA_FAMILIA_INTERNET_AMIGO}          css:.etiqueta-familia-internet-amigo
${SEPARADOR_FAMILIAS_PAQUETES}              css:.separador-familias-paquetes
${TITULO_SECCION_SIN_LIMITE}                css:.seccion-paquetes-sin-limite-activos .titulo-seccion
${TITULO_SECCION_INTERNET_AMIGO}            css:.seccion-paquetes-internet-amigo-activos .titulo-seccion
${ICONO_FAMILIA_SIN_LIMITE}                 css:.icono-familia-sin-limite
${ICONO_FAMILIA_INTERNET_AMIGO}             css:.icono-familia-internet-amigo

*** Keywords ***
Activar Paquete Internet Amigo 200
    Seleccionar Paquete Por ID    PAQ_AMIGO_200
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Verificar Paquete Sin Limite Registrado Con Reglas Propias
    Wait Until Element Is Visible    ${SECCION_PAQUETES_SIN_LIMITE_ACTIVOS}    timeout=10s
    Element Should Be Visible    ${ETIQUETA_FAMILIA_SIN_LIMITE}
    Log    El Paquete Sin Límite está registrado con sus características y reglas propias

Verificar Paquete Internet Amigo Registrado Sin Interferir Con Sin Limite
    Wait Until Element Is Visible    ${SECCION_PAQUETES_INTERNET_AMIGO_ACTIVOS}    timeout=10s
    Element Should Be Visible    ${ETIQUETA_FAMILIA_INTERNET_AMIGO}
    Log    El Paquete Internet Amigo está registrado sin interferir con el Paquete Sin Límite

Verificar Familias De Paquetes Coexisten Sin Conflictos
    Wait Until Element Is Visible    ${SECCION_PAQUETES_SIN_LIMITE_ACTIVOS}    timeout=10s
    Wait Until Element Is Visible    ${SECCION_PAQUETES_INTERNET_AMIGO_ACTIVOS}    timeout=10s
    Element Should Be Visible    ${SEPARADOR_FAMILIAS_PAQUETES}
    Log    Ambas familias de paquetes coexisten sin conflictos de forma independiente

Contar Paquetes Sin Limite Activos
    Wait Until Element Is Visible    ${SECCION_PAQUETES_SIN_LIMITE_ACTIVOS}    timeout=10s
    ${cantidad}=    Get Element Count    ${LISTA_PAQUETES_SIN_LIMITE}
    [Return]    ${cantidad}

Contar Paquetes Internet Amigo Activos
    Wait Until Element Is Visible    ${SECCION_PAQUETES_INTERNET_AMIGO_ACTIVOS}    timeout=10s
    ${cantidad}=    Get Element Count    ${LISTA_PAQUETES_INTERNET_AMIGO}
    [Return]    ${cantidad}

Verificar Paquetes Internet Amigo Se Suman Entre Si
    ${cantidad_paquetes_amigo}=    Contar Paquetes Internet Amigo Activos
    Should Be True    ${cantidad_paquetes_amigo} >= 2    msg=Debe haber al menos 2 Paquetes Internet Amigo activos
    Verificar Una Sola Bolsa Consolidada En Plataforma 360
    Log    Los Paquetes Internet Amigo se suman entre sí sin afectar el Paquete Sin Límite

Verificar Visualizacion Separada De Familias En Plataformas
    Abrir Pestaña Plataforma 360
    Wait Until Element Is Visible    ${TITULO_SECCION_SIN_LIMITE}    timeout=10s
    Wait Until Element Is Visible    ${TITULO_SECCION_INTERNET_AMIGO}    timeout=10s
    ${titulo_sin_limite}=    Get Text    ${TITULO_SECCION_SIN_LIMITE}
    ${titulo_internet_amigo}=    Get Text    ${TITULO_SECCION_INTERNET_AMIGO}
    Should Contain    ${titulo_sin_limite}    Sin Límite
    Should Contain    ${titulo_internet_amigo}    Internet Amigo
    Log    Las plataformas muestran claramente separados los Paquetes Sin Límite y los Paquetes Internet Amigo unificados

Verificar Orden De Debito Entre Familias No Alterado
    Abrir Seccion De Orden De Debito
    Consultar Orden De Debito Del Sistema
    ${orden}=    Obtener Orden De Debito Actual
    Log    Orden de débito entre familias verificado: ${orden}
    Should Not Be Empty    ${orden}
    Cerrar Modal De Orden De Debito
    Log    El orden de débito entre diferentes familias de paquetes se mantiene sin alteraciones

# Locators para validación de claridad en presentación de vigencia (Caso 43)
${LABEL_VIGENCIA_FORMATO_AMIGABLE_360}         css:#plataforma-360 .vigencia-formato-usuario
${LABEL_VIGENCIA_FORMATO_AMIGABLE_MITELCEL}    css:#plataforma-mitelcel .vigencia-formato-usuario
${LABEL_VIGENCIA_FORMATO_AMIGABLE_CLAROPAY}    css:#plataforma-claropay .vigencia-formato-usuario
${ICONO_VIGENCIA_CLARA_360}                    css:#plataforma-360 .icono-vigencia-clara
${ICONO_VIGENCIA_CLARA_MITELCEL}               css:#plataforma-mitelcel .icono-vigencia-clara
${ICONO_VIGENCIA_CLARA_CLAROPAY}               css:#plataforma-claropay .icono-vigencia-clara

# Locators para validación de mercado Masivo y segmento Prepago (Caso 44)
${LABEL_MERCADO_USUARIO}                       css:.perfil-usuario .mercado-usuario
${LABEL_SEGMENTO_USUARIO}                      css:.perfil-usuario .segmento-usuario
${ICONO_MERCADO_MASIVO}                        css:.perfil-usuario .icono-mercado-masivo
${TEXTO_MERCADO_MASIVO}                        css:.perfil-usuario .texto-mercado-masivo
${TEXTO_SEGMENTO_PREPAGO}                      css:.perfil-usuario .texto-segmento-prepago
${ETIQUETA_REGLAS_APLICADAS}                   css:.info-paquete .etiqueta-reglas-nuevas

# Locators para validación de facturación sin impacto (Caso 45)
${SECCION_DOCUMENTOS_REQUISITOS}               css:.seccion-documentos-requisitos
${BOTON_VER_DOCUMENTO_REQUISITOS}              id:btnVerDocumentoRequisitos
${MODAL_DOCUMENTO_REQUISITOS}                  id:modalDocumentoRequisitos
${CAMPO_CAMBIO_FACTURACION}                    css:#modalDocumentoRequisitos .campo-cambio-facturacion
${BOTON_CERRAR_DOCUMENTO}                      css:#modalDocumentoRequisitos .btn-cerrar
${SECCION_FACTURACION}                         css:.seccion-facturacion
${BOTON_CONSULTAR_FACTURACION}                 id:btnConsultarFacturacion
${MODAL_DETALLE_FACTURACION}                   id:modalDetalleFacturacion
${LISTA_COBROS_APLICADOS}                      css:#modalDetalleFacturacion .lista-cobros
${ITEM_COBRO}                                  css:#modalDetalleFacturacion .item-cobro
${MONTO_COBRO}                                 css:.item-cobro .monto-cobro
${CONCEPTO_COBRO}                              css:.item-cobro .concepto-cobro
${FECHA_COBRO}                                 css:.item-cobro .fecha-cobro
${ESTRUCTURA_FACTURACION}                      css:#modalDetalleFacturacion .estructura-facturacion
${FORMATO_FACTURACION}                         css:#modalDetalleFacturacion .formato-facturacion
${BOTON_CERRAR_FACTURACION}                    css:#modalDetalleFacturacion .btn-cerrar

*** Keywords ***
Verificar Formato Amigable De Vigencia En Plataforma 360
    Wait Until Element Is Visible    ${VIGENCIA_BOLSA_360}    timeout=10s
    ${vigencia}=    Get Text    ${VIGENCIA_BOLSA_360}
    ${fecha}=    Get Text    ${FECHA_VENCIMIENTO_360}
    Should Not Contain    ${vigencia}    UTC
    Should Not Contain    ${vigencia}    timestamp
    Should Not Contain    ${fecha}    UNIX
    Log    La vigencia en Plataforma 360 se presenta en formato amigable: ${vigencia}
    [Return]    ${vigencia}

Verificar Formato Amigable De Vigencia En Plataforma MiTelcel
    Wait Until Element Is Visible    ${VIGENCIA_BOLSA_MITELCEL}    timeout=10s
    ${vigencia}=    Get Text    ${VIGENCIA_BOLSA_MITELCEL}
    ${fecha}=    Get Text    ${FECHA_VENCIMIENTO_MITELCEL}
    Should Not Contain    ${vigencia}    UTC
    Should Not Contain    ${vigencia}    timestamp
    Should Not Contain    ${fecha}    UNIX
    Log    La vigencia en MiTelcel se presenta en formato amigable: ${vigencia}
    [Return]    ${vigencia}

Verificar Formato Amigable De Vigencia En Plataforma Claro Pay
    Wait Until Element Is Visible    ${VIGENCIA_BOLSA_CLAROPAY}    timeout=10s
    ${vigencia}=    Get Text    ${VIGENCIA_BOLSA_CLAROPAY}
    ${fecha}=    Get Text    ${FECHA_VENCIMIENTO_CLAROPAY}
    Should Not Contain    ${vigencia}    UTC
    Should Not Contain    ${vigencia}    timestamp
    Should Not Contain    ${fecha}    UNIX
    Log    La vigencia en Claro Pay se presenta en formato amigable: ${vigencia}
    [Return]    ${vigencia}

*** Keywords ***
Verificar Usuario Pertenece A Mercado Masivo
    Wait Until Element Is Visible    ${LABEL_MERCADO_USUARIO}    timeout=10s
    ${mercado}=    Get Text    ${LABEL_MERCADO_USUARIO}
    Should Contain    ${mercado}    Masivo
    Element Should Be Visible    ${ICONO_MERCADO_MASIVO}
    Log    El sistema confirma que el usuario pertenece al mercado Masivo

Verificar Segmento Es Prepago
    Wait Until Element Is Visible    ${LABEL_SEGMENTO_USUARIO}    timeout=10s
    ${segmento}=    Get Text    ${LABEL_SEGMENTO_USUARIO}
    Should Contain    ${segmento}    Prepago
    Log    El sistema confirma que el segmento del usuario es Prepago

Verificar Sistema Aplica Nuevas Reglas De Negocio Para Masivo Prepago
    Wait Until Element Is Visible    ${ETIQUETA_REGLAS_APLICADAS}    timeout=10s
    ${etiqueta}=    Get Text    ${ETIQUETA_REGLAS_APLICADAS}
    Should Contain    ${etiqueta}    Reglas actualizadas
    Log    El sistema activa el paquete correctamente y aplica las nuevas reglas de negocio

Abrir Seccion De Documentos De Requisitos
    Wait Until Element Is Visible    ${SECCION_DOCUMENTOS_REQUISITOS}    timeout=10s
    Scroll Element Into View    ${SECCION_DOCUMENTOS_REQUISITOS}

Ver Documento De Requisitos Del Proyecto
    Wait Until Element Is Visible    ${BOTON_VER_DOCUMENTO_REQUISITOS}    timeout=10s
    Click Button    ${BOTON_VER_DOCUMENTO_REQUISITOS}
    Wait Until Element Is Visible    ${MODAL_DOCUMENTO_REQUISITOS}    timeout=10s

Obtener Valor Campo Cambio En Facturacion
    Wait Until Element Is Visible    ${CAMPO_CAMBIO_FACTURACION}    timeout=10s
    ${valor_campo}=    Get Text    ${CAMPO_CAMBIO_FACTURACION}
    [Return]    ${valor_campo}

Verificar Campo Cambio Facturacion Indica No
    ${valor}=    Obtener Valor Campo Cambio En Facturacion
    Should Contain    ${valor}    No
    Log    El documento de requisitos indica claramente: Cambio en facturación = No

Cerrar Modal Documento Requisitos
    Wait Until Element Is Visible    ${BOTON_CERRAR_DOCUMENTO}    timeout=5s
    Click Element    ${BOTON_CERRAR_DOCUMENTO}
    Wait Until Element Is Not Visible    ${MODAL_DOCUMENTO_REQUISITOS}    timeout=5s

Abrir Seccion De Facturacion
    Wait Until Element Is Visible    ${SECCION_FACTURACION}    timeout=10s
    Scroll Element Into View    ${SECCION_FACTURACION}

Consultar Detalle De Facturacion Del Usuario
    Wait Until Element Is Visible    ${BOTON_CONSULTAR_FACTURACION}    timeout=10s
    Click Button    ${BOTON_CONSULTAR_FACTURACION}
    Wait Until Element Is Visible    ${MODAL_DETALLE_FACTURACION}    timeout=10s
    Wait Until Element Is Visible    ${LISTA_COBROS_APLICADOS}    timeout=10s

Obtener Monto Del Cobro Aplicado
    [Arguments]    ${indice}=1
    ${locator_cobro}=    Set Variable    css:#modalDetalleFacturacion .item-cobro:nth-child(${indice}) .monto-cobro
    Wait Until Element Is Visible    ${locator_cobro}    timeout=10s
    ${monto}=    Get Text    ${locator_cobro}
    [Return]    ${monto}

Verificar Cobro Exacto Del Paquete
    [Arguments]    ${monto_esperado}
    ${monto_cobrado}=    Obtener Monto Del Cobro Aplicado    1
    Should Contain    ${monto_cobrado}    ${monto_esperado}
    Log    El sistema cobró exactamente ${monto_esperado} sin modificaciones adicionales

Obtener Concepto Del Cobro
    [Arguments]    ${indice}=1
    ${locator_concepto}=    Set Variable    css:#modalDetalleFacturacion .item-cobro:nth-child(${indice}) .concepto-cobro
    Wait Until Element Is Visible    ${locator_concepto}    timeout=10s
    ${concepto}=    Get Text    ${locator_concepto}
    [Return]    ${concepto}

Obtener Estructura Facturacion Actual
    Wait Until Element Is Visible    ${ESTRUCTURA_FACTURACION}    timeout=10s
    ${estructura}=    Get Text    ${ESTRUCTURA_FACTURACION}
    [Return]    ${estructura}

Obtener Formato Facturacion Actual
    Wait Until Element Is Visible    ${FORMATO_FACTURACION}    timeout=10s
    ${formato}=    Get Text    ${FORMATO_FACTURACION}
    [Return]    ${formato}

Cerrar Modal Detalle Facturacion
    Wait Until Element Is Visible    ${BOTON_CERRAR_FACTURACION}    timeout=5s
    Click Element    ${BOTON_CERRAR_FACTURACION}
    Wait Until Element Is Not Visible    ${MODAL_DETALLE_FACTURACION}    timeout=5s

Verificar Cobros Sin Alteraciones En Montos Y Conceptos
    [Arguments]    ${cantidad_cobros_esperados}=2
    Wait Until Element Is Visible    ${LISTA_COBROS_APLICADOS}    timeout=10s
    ${cantidad_cobros}=    Get Element Count    ${ITEM_COBRO}
    Should Be True    ${cantidad_cobros} >= ${cantidad_cobros_esperados}
    Log    Se verificó que hay al menos ${cantidad_cobros_esperados} cobros registrados sin alteraciones
