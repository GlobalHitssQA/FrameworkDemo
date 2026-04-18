*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_VENTA_SERVICIOS}           /ventas/servicios-suplementarios

# Locators - Búsqueda de Cliente
${LOCATOR_INPUT_NUMERO_TELEFONICO_VENTA}    id:inputNumeroTelefonicoVenta
${LOCATOR_BTN_BUSCAR_CLIENTE_VENTA}         id:btnBuscarClienteVenta
${LOCATOR_SECCION_INFO_CLIENTE_VENTA}       css:.seccion-info-cliente-venta

# Locators - Información del Cliente
${LOCATOR_TXT_NOMBRE_CLIENTE_VENTA}         css:.info-cliente-venta .nombre-cliente
${LOCATOR_TXT_TIPO_CLIENTE_VENTA}           css:.info-cliente-venta .tipo-cliente
${LOCATOR_TXT_ESTADO_LINEA_VENTA}           css:.info-cliente-venta .estado-linea

# Locators - Selección de Servicio
${LOCATOR_SELECT_SERVICIO_SUPLEMENTARIO}    id:selectServicioSuplementario
${LOCATOR_TXT_NOMBRE_SERVICIO}              css:.servicio-detalle .nombre-servicio
${LOCATOR_TXT_DESCRIPCION_SERVICIO}         css:.servicio-detalle .descripcion-servicio
${LOCATOR_TXT_PRECIO_SERVICIO}              css:.servicio-detalle .precio-servicio

# Locators - Modalidad de Pago
${LOCATOR_RADIO_PAGO_CONTADO}               id:radiopagoContado
${LOCATOR_RADIO_PAGO_PARCIALIDADES}         id:radioPagoParcialidades
${LOCATOR_TXT_ESQUEMA_PAGO}                 css:.esquema-pago .tipo-esquema

# Locators - Confirmación de Venta
${LOCATOR_BTN_CONFIRMAR_VENTA}              id:btnConfirmarVenta
${LOCATOR_MSG_VENTA_EXITOSA}                css:.alert-success
${LOCATOR_TXT_FOLIO_VENTA}                  css:.resultado-venta .folio-venta
${LOCATOR_TXT_FECHA_VENTA}                  css:.resultado-venta .fecha-venta

*** Keywords ***
Navegar A Módulo De Venta De Servicios Suplementarios
    Go To    ${URL_LOGIN}${URL_MODULO_VENTA_SERVICIOS}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_NUMERO_TELEFONICO_VENTA}    timeout=10s

Ingresar Número Telefónico Para Venta
    [Arguments]    ${numero_telefonico}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_NUMERO_TELEFONICO_VENTA}
    Input Text    ${LOCATOR_INPUT_NUMERO_TELEFONICO_VENTA}    ${numero_telefonico}
    Click Button    ${LOCATOR_BTN_BUSCAR_CLIENTE_VENTA}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_INFO_CLIENTE_VENTA}    timeout=10s

Verificar Que Cliente Prepagado Es Recuperado
    Wait Until Element Is Visible    ${LOCATOR_TXT_TIPO_CLIENTE_VENTA}    timeout=10s
    ${tipo_cliente}=    Get Text    ${LOCATOR_TXT_TIPO_CLIENTE_VENTA}
    Should Contain    ${tipo_cliente}    Prepagado
    Element Should Be Visible    ${LOCATOR_TXT_NOMBRE_CLIENTE_VENTA}
    Element Should Be Visible    ${LOCATOR_TXT_ESTADO_LINEA_VENTA}

Seleccionar Servicio Suplementario
    [Arguments]    ${servicio}
    Wait Until Element Is Visible    ${LOCATOR_SELECT_SERVICIO_SUPLEMENTARIO}
    Select From List By Label    ${LOCATOR_SELECT_SERVICIO_SUPLEMENTARIO}    ${servicio}
    Wait Until Element Is Visible    ${LOCATOR_TXT_NOMBRE_SERVICIO}    timeout=5s

Verificar Detalle Del Servicio Suplementario Seleccionado
    Element Should Be Visible    ${LOCATOR_TXT_NOMBRE_SERVICIO}
    Element Should Be Visible    ${LOCATOR_TXT_DESCRIPCION_SERVICIO}
    Element Should Be Visible    ${LOCATOR_TXT_PRECIO_SERVICIO}
    ${precio}=    Get Text    ${LOCATOR_TXT_PRECIO_SERVICIO}
    Should Not Be Empty    ${precio}

Seleccionar Modalidad De Pago Contado
    Wait Until Element Is Visible    ${LOCATOR_RADIO_PAGO_CONTADO}
    Select Radio Button    modalidadPago    contado
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESQUEMA_PAGO}    timeout=5s

Verificar Que Se Aplica Esquema De Pago De Contado
    ${esquema}=    Get Text    ${LOCATOR_TXT_ESQUEMA_PAGO}
    Should Contain    ${esquema}    Contado
    Should Not Contain    ${esquema}    Parcialidades

Confirmar Transacción De Venta
    Wait Until Element Is Enabled    ${LOCATOR_BTN_CONFIRMAR_VENTA}
    Click Button    ${LOCATOR_BTN_CONFIRMAR_VENTA}
    Wait Until Element Is Visible    ${LOCATOR_MSG_VENTA_EXITOSA}    timeout=10s

Verificar Que Venta Fue Registrada Exitosamente
    Element Should Be Visible    ${LOCATOR_MSG_VENTA_EXITOSA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_VENTA_EXITOSA}
    Should Contain    ${mensaje}    exitosa
    Element Should Be Visible    ${LOCATOR_TXT_FOLIO_VENTA}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_VENTA}
    ${folio}=    Get Text    ${LOCATOR_TXT_FOLIO_VENTA}
    Should Not Be Empty    ${folio}

# ============================================
# Keywords para Caso 40 - Venta de servicios sin afectar financiamiento
# ============================================

Verificar Que Servicio No Está Incluido En Financiamiento
    [Documentation]    Verifica que el servicio suplementario no fue agregado al financiamiento
    ${info_financiamiento}=    Get Text    ${LOCATOR_SECCION_INFO_CLIENTE_VENTA}
    Should Not Contain    ${info_financiamiento}    incluido en financiamiento
    Element Should Be Visible    ${LOCATOR_MSG_VENTA_EXITOSA}

Verificar Valores Originales Del Financiamiento No Se Alteran
    [Arguments]    ${total_amount_original}    ${total_cycle_original}
    [Documentation]    Verifica que totalAmount y totalCycle mantienen sus valores originales
    Wait Until Element Is Visible    css:.financing-info .total-amount    timeout=10s
    Wait Until Element Is Visible    css:.financing-info .total-cycle    timeout=10s
    ${total_amount_actual}=    Get Text    css:.financing-info .total-amount
    ${total_cycle_actual}=     Get Text    css:.financing-info .total-cycle
    Should Be Equal As Strings    ${total_amount_actual}    ${total_amount_original}
    Should Be Equal As Strings    ${total_cycle_actual}    ${total_cycle_original}

Activar Servicio Suplementario En Número Telefónico
    [Arguments]    ${numero_telefonico}    ${servicio}
    [Documentation]    Activa el servicio suplementario en el número telefónico del cliente
    Wait Until Element Is Visible    id:btnActivarServicio    timeout=10s
    Click Button    id:btnActivarServicio
    Wait Until Element Is Visible    css:.alert-success    timeout=15s
    ${mensaje}=    Get Text    css:.alert-success
    Should Contain    ${mensaje}    activado exitosamente

Verificar Servicio Activo Y Financiamiento Sin Alteraciones
    [Arguments]    ${servicio}    ${total_amount_original}    ${total_cycle_original}
    [Documentation]    Verifica que servicio está activo y financiamiento sin cambios
    Wait Until Element Is Visible    css:.servicios-activos .servicio-item    timeout=10s
    ${servicios_activos}=    Get Text    css:.servicios-activos
    Should Contain    ${servicios_activos}    ${servicio}
    Should Contain    ${servicios_activos}    Activo
    Verificar Valores Originales Del Financiamiento No Se Alteran    ${total_amount_original}    ${total_cycle_original}
