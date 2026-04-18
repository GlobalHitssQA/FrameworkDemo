*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_ENVIO_CONTRATO}                 /venta/envio-contrato

# Locators - Envío de Contrato
${LOCATOR_TXT_TITULO_ENVIO_CONTRATO}         css:.envio-contrato-container .titulo
${LOCATOR_TXT_RESUMEN_FINANCIAMIENTO}        css:.envio-contrato-info .resumen-financiamiento
${LOCATOR_TXT_DATOS_CLIENTE_CONTRATO}        css:.envio-contrato-info .datos-cliente

# Locators - Formalización de Venta
${LOCATOR_DIV_FORMALIZACION_VENTA}           css:.formalizacion-venta-container
${LOCATOR_TXT_ESTADO_VENTA}                  css:.formalizacion-venta .estado-venta
${LOCATOR_TXT_FECHA_FORMALIZACION}           css:.formalizacion-venta .fecha-formalizacion
${LOCATOR_MSG_VENTA_FORMALIZADA}             css:.alert-success .msg-formalizacion

# Locators - Generación de Contrato
${LOCATOR_DIV_GENERACION_CONTRATO}           css:.generacion-contrato
${LOCATOR_TXT_ESTADO_GENERACION}             css:.generacion-contrato .estado-generacion
${LOCATOR_TXT_ID_CONTRATO}                   css:.generacion-contrato .id-contrato

# Locators - Información del Contrato
${LOCATOR_DIV_INFORMACION_CONTRATO}          css:.informacion-contrato
${LOCATOR_TXT_MONTO_TOTAL_CONTRATO}          css:.informacion-contrato .monto-total
${LOCATOR_TXT_ENGANCHE_CONTRATO}             css:.informacion-contrato .enganche
${LOCATOR_TXT_DESGLOSE_CUOTAS}               css:.informacion-contrato .desglose-cuotas
${LOCATOR_TABLA_FECHAS_VENCIMIENTO}          css:.informacion-contrato .tabla-vencimientos
${LOCATOR_TXT_TERMINOS_FINANCIAMIENTO}       css:.informacion-contrato .terminos-financiamiento

# Locators - Medio de Envío
${LOCATOR_DIV_METODOS_ENVIO}                 css:.metodos-envio-container
${LOCATOR_RADIO_ENVIO_CORREO}                id:radioEnvioCorreo
${LOCATOR_RADIO_ENVIO_SMS}                   id:radioEnvioSMS
${LOCATOR_RADIO_ENVIO_PLATAFORMA}            id:radioEnvioPlataforma
${LOCATOR_INPUT_CORREO_DESTINO}              id:inputCorreoDestino
${LOCATOR_INPUT_TELEFONO_SMS}                id:inputTelefonoSMS

# Locators - Envío del Contrato
${LOCATOR_BTN_ENVIAR_CONTRATO}               id:btnEnviarContrato
${LOCATOR_DIV_ENVIO_EN_PROGRESO}             css:.envio-en-progreso
${LOCATOR_MSG_CONTRATO_ENVIADO}              css:.alert-success .msg-envio-contrato
${LOCATOR_TXT_MEDIO_CONFIGURADO}             css:.resultado-envio .medio-configurado
${LOCATOR_TXT_FECHA_HORA_ENVIO}              css:.resultado-envio .fecha-hora-envio

# Locators - Verificación de Recepción
${LOCATOR_DIV_VERIFICACION_RECEPCION}        css:.verificacion-recepcion
${LOCATOR_TXT_ESTADO_RECEPCION}              css:.verificacion-recepcion .estado-recepcion
${LOCATOR_TXT_CONTENIDO_COMPLETO}            css:.verificacion-recepcion .contenido-completo

# Locators - Finalización
${LOCATOR_MSG_PROCESO_COMPLETADO}            css:.alert-success .msg-proceso-completado
${LOCATOR_BTN_FINALIZAR_PROCESO}             id:btnFinalizarProceso

*** Keywords ***
Verificar Que Sistema Completa Etapas Del Flujo De Venta
    Wait Until Element Is Visible    ${LOCATOR_TXT_TITULO_ENVIO_CONTRATO}    timeout=10s
    ${titulo}=    Get Text    ${LOCATOR_TXT_TITULO_ENVIO_CONTRATO}
    Should Contain    ${titulo}    Envío de Contrato

Formalizar Venta Y Financiamiento Del Equipo Desde AP AG
    Wait Until Element Is Visible    ${LOCATOR_DIV_FORMALIZACION_VENTA}    timeout=10s
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_VENTA}
    Should Contain    ${estado}    Formalizada

Verificar Que Sistema Confirma Formalización Y Genera Contrato
    Element Should Be Visible    ${LOCATOR_MSG_VENTA_FORMALIZADA}
    Wait Until Element Is Visible    ${LOCATOR_DIV_GENERACION_CONTRATO}    timeout=10s
    ${estado_generacion}=    Get Text    ${LOCATOR_TXT_ESTADO_GENERACION}
    Should Contain Any    ${estado_generacion}    Generado    Creado    Completado
    Element Should Be Visible    ${LOCATOR_TXT_ID_CONTRATO}

Ejecutar Operación De Envío De Contrato Al Cliente
    [Arguments]    ${medio_envio}=Correo electrónico
    Wait Until Element Is Visible    ${LOCATOR_DIV_METODOS_ENVIO}    timeout=10s
    IF    '${medio_envio}' == 'Correo electrónico' or '${medio_envio}' == 'correo'
        Click Element    ${LOCATOR_RADIO_ENVIO_CORREO}
        Wait Until Element Is Visible    ${LOCATOR_INPUT_CORREO_DESTINO}
    ELSE IF    '${medio_envio}' == 'SMS' or '${medio_envio}' == 'sms'
        Click Element    ${LOCATOR_RADIO_ENVIO_SMS}
        Wait Until Element Is Visible    ${LOCATOR_INPUT_TELEFONO_SMS}
    ELSE IF    '${medio_envio}' == 'Plataforma digital' or '${medio_envio}' == 'plataforma'
        Click Element    ${LOCATOR_RADIO_ENVIO_PLATAFORMA}
    END
    Wait Until Element Is Enabled    ${LOCATOR_BTN_ENVIAR_CONTRATO}
    Click Button    ${LOCATOR_BTN_ENVIAR_CONTRATO}
    Wait Until Element Is Visible    ${LOCATOR_DIV_ENVIO_EN_PROGRESO}    timeout=10s

Verificar Que Sistema Envía Contrato A Través Del Medio Configurado
    Wait Until Element Is Visible    ${LOCATOR_MSG_CONTRATO_ENVIADO}    timeout=20s
    ${mensaje}=    Get Text    ${LOCATOR_MSG_CONTRATO_ENVIADO}
    Should Contain Any    ${mensaje}    enviado exitosamente    enviado correctamente    completado
    Element Should Be Visible    ${LOCATOR_TXT_MEDIO_CONFIGURADO}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_HORA_ENVIO}

Verificar Que Cliente Recibe Contrato Con Información Completa Del Financiamiento
    Wait Until Element Is Visible    ${LOCATOR_DIV_VERIFICACION_RECEPCION}    timeout=10s
    ${estado_recepcion}=    Get Text    ${LOCATOR_TXT_ESTADO_RECEPCION}
    Should Contain Any    ${estado_recepcion}    Recibido    Entregado    Exitoso

Verificar Que Contrato Contiene Toda La Información Del Crédito
    Element Should Be Visible    ${LOCATOR_DIV_INFORMACION_CONTRATO}
    Element Should Be Visible    ${LOCATOR_TXT_MONTO_TOTAL_CONTRATO}
    Element Should Be Visible    ${LOCATOR_TXT_ENGANCHE_CONTRATO}
    Element Should Be Visible    ${LOCATOR_TXT_DESGLOSE_CUOTAS}
    Element Should Be Visible    ${LOCATOR_TABLA_FECHAS_VENCIMIENTO}
    Element Should Be Visible    ${LOCATOR_TXT_TERMINOS_FINANCIAMIENTO}
    ${monto}=    Get Text    ${LOCATOR_TXT_MONTO_TOTAL_CONTRATO}
    Should Not Be Empty    ${monto}

Verificar Que Contrato Incluye Datos Del Cliente
    Element Should Be Visible    ${LOCATOR_TXT_DATOS_CLIENTE_CONTRATO}
    ${datos_cliente}=    Get Text    ${LOCATOR_TXT_DATOS_CLIENTE_CONTRATO}
    Should Not Be Empty    ${datos_cliente}

Verificar Que Contrato Incluye Desglose De Cuotas Y Fechas De Vencimiento
    Element Should Be Visible    ${LOCATOR_TXT_DESGLOSE_CUOTAS}
    Element Should Be Visible    ${LOCATOR_TABLA_FECHAS_VENCIMIENTO}
    ${filas_fechas}=    Get Element Count    ${LOCATOR_TABLA_FECHAS_VENCIMIENTO} tbody tr
    Should Be True    ${filas_fechas} > 0

Verificar Que Contrato Incluye Términos Del Financiamiento
    Element Should Be Visible    ${LOCATOR_TXT_TERMINOS_FINANCIAMIENTO}
    ${terminos}=    Get Text    ${LOCATOR_TXT_TERMINOS_FINANCIAMIENTO}
    Should Not Be Empty    ${terminos}

Finalizar Proceso De Venta
    Wait Until Element Is Visible    ${LOCATOR_MSG_PROCESO_COMPLETADO}    timeout=10s
    Wait Until Element Is Enabled    ${LOCATOR_BTN_FINALIZAR_PROCESO}
    Click Button    ${LOCATOR_BTN_FINALIZAR_PROCESO}
