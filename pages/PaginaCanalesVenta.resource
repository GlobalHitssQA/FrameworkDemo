*** Variables ***
# Navegación a sección de documentación de requisitos
${MENU_DOCUMENTACION}                    id:menuDocumentacion
${SUBMENU_REQUISITOS_PROYECTO}           id:submenuRequisitosProyecto
${SECCION_REQUISITOS}                    id:seccionRequisitos

# Documento de requisitos
${DOCUMENTO_REQUISITOS_PAQUETES_AMIGO}   id:documentoRequisitosPaquetesAmigo
${SECCION_CANALES_IMPACTADOS}            id:seccionCanalesImpactados
${CAMPO_CANALES_IMPACTADOS}              id:campoCanalesImpactados
${TEXTO_SIN_CANALES_IMPACTADOS}          css:.texto-sin-impacto-canales
${BOTON_CERRAR_DOCUMENTO}                id:btnCerrarDocumento

# Simulación de venta en canal MiTelcel
${MENU_SIMULADOR_CANALES}                id:menuSimuladorCanales
${OPCION_CANAL_MI_TELCEL}                id:opcionCanalMiTelcel
${INPUT_NUMERO_LINEA_CANAL}              id:inputNumeroLineaCanal
${BOTON_BUSCAR_LINEA_CANAL}              id:btnBuscarLineaCanal
${SECCION_PAQUETES_DISPONIBLES_CANAL}    id:seccionPaquetesDisponiblesCanal
${PAQUETE_50_PESOS_CANAL}                id:paquete50PesosCanal
${BOTON_COMPRAR_PAQUETE_CANAL}           id:btnComprarPaqueteCanal
${MODAL_CONFIRMACION_COMPRA_CANAL}       css:.modal-confirmacion-compra
${BOTON_CONFIRMAR_COMPRA_CANAL}          id:btnConfirmarCompraCanal
${MENSAJE_EXITO_COMPRA_CANAL}            css:.mensaje-exito-compra
${SECCION_PROCESO_ACTIVACION}            id:seccionProcesoActivacion
${ESTADO_ACTIVACION}                     id:estadoActivacion
${MENSAJE_CONFIRMACION_USUARIO}          css:.mensaje-confirmacion-usuario
${TEXTO_VIGENCIA_MOSTRADA}               id:textoVigenciaMostrada
${SECCION_VIGENCIA_PAQUETE_CANAL}        id:seccionVigenciaPaqueteCanal

# Interfaces de canales
${SECCION_INTERFACES_CANALES}            id:seccionInterfacesCanales
${LISTA_CANALES_VENTA}                   css:.lista-canales-venta
${CANAL_MI_TELCEL_ITEM}                  css:[data-canal="mi-telcel"]
${LABEL_VERSION_INTERFAZ}                css:.version-interfaz
${LABEL_ESTADO_INTERFAZ}                 css:.estado-interfaz
${ICONO_SIN_MODIFICACIONES}              css:.icono-sin-modificaciones

*** Keywords ***
Navegar A Seccion De Requisitos Del Proyecto
    Wait Until Element Is Visible    ${MENU_DOCUMENTACION}    timeout=10s
    Click Element    ${MENU_DOCUMENTACION}
    Wait Until Element Is Visible    ${SUBMENU_REQUISITOS_PROYECTO}    timeout=10s
    Click Element    ${SUBMENU_REQUISITOS_PROYECTO}
    Wait Until Element Is Visible    ${SECCION_REQUISITOS}    timeout=10s

Abrir Documento De Requisitos Paquetes Internet Amigo
    Wait Until Element Is Visible    ${DOCUMENTO_REQUISITOS_PAQUETES_AMIGO}    timeout=10s
    Click Element    ${DOCUMENTO_REQUISITOS_PAQUETES_AMIGO}
    Wait Until Page Contains    Requisitos del proyecto

Verificar Seccion Canales Impactados Esta Visible
    Wait Until Element Is Visible    ${SECCION_CANALES_IMPACTADOS}    timeout=10s
    Scroll Element Into View    ${SECCION_CANALES_IMPACTADOS}

Obtener Texto Campo Canales Impactados
    Wait Until Element Is Visible    ${CAMPO_CANALES_IMPACTADOS}    timeout=10s
    ${texto}=    Get Text    ${CAMPO_CANALES_IMPACTADOS}
    [Return]    ${texto}

Verificar Documento Especifica Sin Canales Impactados
    ${texto_canales}=    Obtener Texto Campo Canales Impactados
    Should Contain    ${texto_canales}    ningún canal
    Should Contain    ${texto_canales}    no se ve afectado
    Element Should Be Visible    ${TEXTO_SIN_CANALES_IMPACTADOS}

Cerrar Documento De Requisitos
    Wait Until Element Is Enabled    ${BOTON_CERRAR_DOCUMENTO}    timeout=10s
    Click Button    ${BOTON_CERRAR_DOCUMENTO}

Navegar A Simulador De Canales De Venta
    Wait Until Element Is Visible    ${MENU_SIMULADOR_CANALES}    timeout=10s
    Click Element    ${MENU_SIMULADOR_CANALES}

Seleccionar Canal Mi Telcel Para Simulacion
    Wait Until Element Is Visible    ${OPCION_CANAL_MI_TELCEL}    timeout=10s
    Click Element    ${OPCION_CANAL_MI_TELCEL}
    Wait Until Page Contains    Simulador canal Mi Telcel

Buscar Linea Usuario En Canal
    [Arguments]    ${numero_linea}
    Wait Until Element Is Visible    ${INPUT_NUMERO_LINEA_CANAL}    timeout=10s
    Input Text    ${INPUT_NUMERO_LINEA_CANAL}    ${numero_linea}
    Click Button    ${BOTON_BUSCAR_LINEA_CANAL}
    Wait Until Element Is Visible    ${SECCION_PAQUETES_DISPONIBLES_CANAL}    timeout=15s

Seleccionar Paquete Internet Amigo 50 Pesos En Canal
    Wait Until Element Is Visible    ${PAQUETE_50_PESOS_CANAL}    timeout=10s
    Click Element    ${PAQUETE_50_PESOS_CANAL}
    Wait Until Element Is Enabled    ${BOTON_COMPRAR_PAQUETE_CANAL}

Realizar Compra De Paquete En Canal
    Click Button    ${BOTON_COMPRAR_PAQUETE_CANAL}
    Wait Until Element Is Visible    ${MODAL_CONFIRMACION_COMPRA_CANAL}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_COMPRA_CANAL}

Verificar Proceso De Venta Sin Errores En Canal
    Wait Until Element Is Visible    ${MENSAJE_EXITO_COMPRA_CANAL}    timeout=20s
    ${mensaje}=    Get Text    ${MENSAJE_EXITO_COMPRA_CANAL}
    Should Contain    ${mensaje}    exitosa
    Should Not Contain    ${mensaje}    error

Verificar Flujo De Venta Sin Cambios
    Element Should Be Visible    ${SECCION_PAQUETES_DISPONIBLES_CANAL}
    Element Should Be Visible    ${BOTON_COMPRAR_PAQUETE_CANAL}
    Element Should Be Visible    ${MODAL_CONFIRMACION_COMPRA_CANAL}
    Log    El flujo de venta mantiene sus pasos sin modificaciones

Verificar Activacion Completada Desde Canal
    Wait Until Element Is Visible    ${SECCION_PROCESO_ACTIVACION}    timeout=15s
    Wait Until Element Is Visible    ${ESTADO_ACTIVACION}    timeout=15s
    ${estado}=    Get Text    ${ESTADO_ACTIVACION}
    Should Contain    ${estado}    completada

Verificar Usuario Recibe Confirmacion Sin Demoras
    Wait Until Element Is Visible    ${MENSAJE_CONFIRMACION_USUARIO}    timeout=10s
    ${mensaje}=    Get Text    ${MENSAJE_CONFIRMACION_USUARIO}
    Should Contain    ${mensaje}    activado correctamente
    Should Not Contain    ${mensaje}    demora

Verificar Confirmacion Sin Errores
    Element Should Be Visible    ${MENSAJE_CONFIRMACION_USUARIO}
    ${mensaje}=    Get Text    ${MENSAJE_CONFIRMACION_USUARIO}
    Should Not Contain    ${mensaje}    error
    Should Not Contain    ${mensaje}    fallo

Navegar A Seccion Interfaces Canales
    Wait Until Element Is Visible    ${SECCION_INTERFACES_CANALES}    timeout=10s
    Scroll Element Into View    ${SECCION_INTERFACES_CANALES}
    Click Element    ${SECCION_INTERFACES_CANALES}

Verificar Canal Mi Telcel Sin Modificaciones En Interfaz
    Wait Until Element Is Visible    ${LISTA_CANALES_VENTA}    timeout=10s
    Wait Until Element Is Visible    ${CANAL_MI_TELCEL_ITEM}    timeout=10s
    ${version}=    Get Text    ${LABEL_VERSION_INTERFAZ}
    ${estado}=    Get Text    ${LABEL_ESTADO_INTERFAZ}
    Should Contain    ${estado}    sin modificaciones
    Element Should Be Visible    ${ICONO_SIN_MODIFICACIONES}

Verificar Canales Sin Necesidad De Actualizaciones
    ${estado}=    Get Text    ${LABEL_ESTADO_INTERFAZ}
    Should Contain    ${estado}    sin actualizaciones requeridas
    Should Not Contain    ${estado}    actualización pendiente

Verificar Vigencia Mostrada En Canal Durante Venta
    Wait Until Element Is Visible    ${SECCION_VIGENCIA_PAQUETE_CANAL}    timeout=10s
    Wait Until Element Is Visible    ${TEXTO_VIGENCIA_MOSTRADA}    timeout=10s
    ${vigencia}=    Get Text    ${TEXTO_VIGENCIA_MOSTRADA}
    Should Not Be Empty    ${vigencia}

Verificar Vigencia Clara Y Precisa En Canal
    ${vigencia}=    Get Text    ${TEXTO_VIGENCIA_MOSTRADA}
    Should Contain    ${vigencia}    días
    Should Not Contain    ${vigencia}    N/A
    Log    La vigencia del paquete se muestra de forma clara y precisa: ${vigencia}
