*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_COMPENSACION}           /compensacion/pagos

# Locators - Identificación de Pago para Compensación
${LOCATOR_INPUT_BUSCAR_CREDITO_COMP}        id:inputBuscarCreditoCompensacion
${LOCATOR_BTN_BUSCAR_CREDITO_COMP}          id:btnBuscarCreditoCompensacion
${LOCATOR_TABLA_PAGOS_CREDITO}              id:tablaPagosCredito
${LOCATOR_CHECKBOX_SELECCIONAR_PAGO}        css:.payment-row input[type='checkbox']
${LOCATOR_TXT_TIPO_COMPENSACION}            css:.payment-info .tipo-compensacion
${LOCATOR_TXT_MOTIVO_SUGERIDO}              css:.payment-info .motivo-sugerido

# Locators - Formulario de Compensación
${LOCATOR_BTN_INICIAR_COMPENSACION}         id:btnIniciarCompensacion
${LOCATOR_INPUT_CREDITO_ORIGEN}             id:inputCreditoOrigen
${LOCATOR_INPUT_CREDITO_DESTINO}            id:inputCreditoDestino
${LOCATOR_INPUT_MONTO_COMPENSAR}            id:inputMontoCompensar
${LOCATOR_SELECT_MOTIVO_COMPENSACION}       id:selectMotivoCompensacion
${LOCATOR_TEXTAREA_OBSERVACIONES_COMP}      id:textareaObservacionesCompensacion
${LOCATOR_BTN_CONFIRMAR_COMPENSACION}       id:btnConfirmarCompensacion

# Locators - Validación y Resultado
${LOCATOR_MSG_COMPENSACION_REGISTRADA}      css:.alert-success
${LOCATOR_SECCION_RESULTADO_COMP}           css:.resultado-compensacion
${LOCATOR_TXT_MONTO_COMPENSADO}             css:.resultado-compensacion .monto-compensado
${LOCATOR_TXT_CREDITO_ORIGEN_COMP}          css:.resultado-compensacion .credito-origen
${LOCATOR_TXT_CREDITO_DESTINO_COMP}         css:.resultado-compensacion .credito-destino

# Locators - Actualización de Saldos
${LOCATOR_SECCION_SALDOS_ACTUALIZADOS}      css:.saldos-actualizados
${LOCATOR_TXT_SALDO_ORIGEN_ANTES}           css:.saldos-origen .saldo-antes
${LOCATOR_TXT_SALDO_ORIGEN_DESPUES}         css:.saldos-origen .saldo-despues
${LOCATOR_TXT_SALDO_DESTINO_ANTES}          css:.saldos-destino .saldo-antes
${LOCATOR_TXT_SALDO_DESTINO_DESPUES}        css:.saldos-destino .saldo-despues

# Locators - Movimientos Contables
${LOCATOR_SECCION_MOVIMIENTOS_CONTABLES}    css:.movimientos-contables
${LOCATOR_TABLA_ASIENTOS_CONTABLES}         id:tablaAsientosContables
${LOCATOR_TXT_FECHA_ASIENTO}                css:.asiento-contable .fecha
${LOCATOR_TXT_TIPO_MOVIMIENTO}              css:.asiento-contable .tipo-movimiento
${LOCATOR_TXT_MONTO_ASIENTO}                css:.asiento-contable .monto

# Locators - Historial de Compensación
${LOCATOR_BTN_VER_HISTORIAL_COMP}           id:btnVerHistorialCompensacion
${LOCATOR_TABLA_HISTORIAL_COMP}             id:tablaHistorialCompensacion
${LOCATOR_TXT_DETALLE_COMPENSACION}         css:.compensacion-history .detalle
${LOCATOR_TXT_FECHA_COMPENSACION}           css:.compensacion-history .fecha
${LOCATOR_TXT_JUSTIFICACION_COMP}           css:.compensacion-history .justificacion

*** Keywords ***
Navegar A Módulo De Compensación
    Go To    ${URL_LOGIN}${URL_MODULO_COMPENSACION}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_BUSCAR_CREDITO_COMP}    timeout=10s

Buscar Crédito Para Compensación
    [Arguments]    ${credito_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_BUSCAR_CREDITO_COMP}
    Input Text    ${LOCATOR_INPUT_BUSCAR_CREDITO_COMP}    ${credito_id}
    Click Button    ${LOCATOR_BTN_BUSCAR_CREDITO_COMP}
    Wait Until Element Is Visible    ${LOCATOR_TABLA_PAGOS_CREDITO}    timeout=10s

Identificar Pago Que Requiere Compensación
    Wait Until Element Is Visible    ${LOCATOR_TXT_TIPO_COMPENSACION}    timeout=10s
    ${tipo}=    Get Text    ${LOCATOR_TXT_TIPO_COMPENSACION}
    Should Contain Any    ${tipo}    Pago en exceso    Aplicación incorrecta    Requiere ajuste
    Element Should Be Visible    ${LOCATOR_TXT_MOTIVO_SUGERIDO}

Seleccionar Pago Para Compensar
    Wait Until Element Is Visible    ${LOCATOR_CHECKBOX_SELECCIONAR_PAGO}
    Click Element    ${LOCATOR_CHECKBOX_SELECCIONAR_PAGO}

Iniciar Proceso De Compensación
    [Arguments]    ${credito_origen}    ${credito_destino}    ${monto}    ${motivo}    ${observaciones}
    Wait Until Element Is Visible    ${LOCATOR_BTN_INICIAR_COMPENSACION}
    Click Button    ${LOCATOR_BTN_INICIAR_COMPENSACION}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CREDITO_ORIGEN}    timeout=10s
    Input Text    ${LOCATOR_INPUT_CREDITO_ORIGEN}        ${credito_origen}
    Input Text    ${LOCATOR_INPUT_CREDITO_DESTINO}       ${credito_destino}
    Input Text    ${LOCATOR_INPUT_MONTO_COMPENSAR}       ${monto}
    Select From List By Label    ${LOCATOR_SELECT_MOTIVO_COMPENSACION}    ${motivo}
    Input Text    ${LOCATOR_TEXTAREA_OBSERVACIONES_COMP}    ${observaciones}

Confirmar Compensación
    Click Button    ${LOCATOR_BTN_CONFIRMAR_COMPENSACION}
    Wait Until Element Is Visible    ${LOCATOR_MSG_COMPENSACION_REGISTRADA}    timeout=10s

Verificar Que Compensación Fue Registrada
    Element Should Be Visible    ${LOCATOR_MSG_COMPENSACION_REGISTRADA}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_COMPENSACION_REGISTRADA}
    Should Contain Any    ${mensaje}    compensación registrada    exitosamente    completada

Verificar Datos De Compensación
    [Arguments]    ${monto_esperado}    ${credito_origen_esperado}    ${credito_destino_esperado}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_RESULTADO_COMP}    timeout=10s
    ${monto}=    Get Text    ${LOCATOR_TXT_MONTO_COMPENSADO}
    Should Contain    ${monto}    ${monto_esperado}
    ${origen}=    Get Text    ${LOCATOR_TXT_CREDITO_ORIGEN_COMP}
    Should Contain    ${origen}    ${credito_origen_esperado}
    ${destino}=    Get Text    ${LOCATOR_TXT_CREDITO_DESTINO_COMP}
    Should Contain    ${destino}    ${credito_destino_esperado}

Verificar Actualización De Saldos De Parcialidades
    Wait Until Element Is Visible    ${LOCATOR_SECCION_SALDOS_ACTUALIZADOS}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_SALDO_ORIGEN_ANTES}
    Element Should Be Visible    ${LOCATOR_TXT_SALDO_ORIGEN_DESPUES}
    Element Should Be Visible    ${LOCATOR_TXT_SALDO_DESTINO_ANTES}
    Element Should Be Visible    ${LOCATOR_TXT_SALDO_DESTINO_DESPUES}

Verificar Generación De Movimientos Contables
    Wait Until Element Is Visible    ${LOCATOR_SECCION_MOVIMIENTOS_CONTABLES}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_ASIENTOS_CONTABLES}
    ${tipo_movimiento}=    Get Text    ${LOCATOR_TXT_TIPO_MOVIMIENTO}
    Should Contain Any    ${tipo_movimiento}    Compensación    Ajuste    Transferencia
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_ASIENTO}
    Element Should Be Visible    ${LOCATOR_TXT_MONTO_ASIENTO}

Consultar Historial De Compensaciones
    [Arguments]    ${credito_id}
    Buscar Crédito Para Compensación    ${credito_id}
    Wait Until Element Is Visible    ${LOCATOR_BTN_VER_HISTORIAL_COMP}
    Click Button    ${LOCATOR_BTN_VER_HISTORIAL_COMP}
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_COMP}    timeout=10s

Verificar Registro En Historial De Compensación
    [Arguments]    ${monto}    ${motivo}
    Element Should Be Visible    ${LOCATOR_TABLA_HISTORIAL_COMP}
    ${detalle}=    Get Text    ${LOCATOR_TXT_DETALLE_COMPENSACION}
    Should Contain    ${detalle}    ${monto}
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_COMPENSACION}
    ${justificacion}=    Get Text    ${LOCATOR_TXT_JUSTIFICACION_COMP}
    Should Contain    ${justificacion}    ${motivo}
