*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_FINANCIAMIENTO}           /financiamiento/ciclo-vida

# Locators - Creación de Financiamiento
${LOCATOR_BTN_CREAR_FINANCIAMIENTO}    id:btnCrearFinanciamiento
${LOCATOR_INPUT_TOTAL_CYCLE}           id:inputTotalCycle
${LOCATOR_INPUT_TOTAL_AMOUNT}          id:inputTotalAmount
${LOCATOR_INPUT_CYCLE_SEQUENCE}        id:inputCycleSequence
${LOCATOR_INPUT_INITIAL_AMOUNT}        id:inputInitialAmount
${LOCATOR_INPUT_AMOUNT}                id:inputAmount
${LOCATOR_INPUT_CUSTOMER_ID}           id:inputCustomerId
${LOCATOR_BTN_GUARDAR_FINANCIAMIENTO}  id:btnGuardarFinanciamiento
${LOCATOR_MSG_EXITO_CREACION}          css:.alert-success

# Locators - Consulta de Financiamiento (BCService.QueryInstallment)
${LOCATOR_INPUT_CUS_ID}                id:inputCusId
${LOCATOR_INPUT_INSTALLMENT_PLAN_ID}   id:inputInstallmentPlanId
${LOCATOR_BTN_CONSULTAR}               id:btnConsultarFinanciamiento

# Locators - Resultados de Consulta
${LOCATOR_TXT_INSTALLMENT_STATUS}      css:.financing-info .installment-status
${LOCATOR_TXT_SUBSIDY_STATUS}          css:.financing-info .subsidy-status
${LOCATOR_TXT_TOTAL_CYCLE}             css:.financing-info .total-cycle
${LOCATOR_TXT_TOTAL_AMOUNT}            css:.financing-info .total-amount
${LOCATOR_TXT_CYCLE_CLASS}             css:.financing-info .cycle-class
${LOCATOR_TXT_STATUS}                  css:.financing-info .status
${LOCATOR_TXT_CYCLE_DUE_DATE}          css:.financing-info .cycle-due-date

# Locators - Calendario de Cobranza
${LOCATOR_TABLA_CALENDARIO_COBRANZA}   id:tablaCalendarioCobranza
${LOCATOR_TXT_ESTADO_CALENDARIO}       css:.calendar-info .estado
${LOCATOR_TXT_NOTIFICACIONES}          css:.calendar-info .notificaciones

# Locators - Simulación de Tiempo
${LOCATOR_BTN_SIMULAR_TIEMPO}          id:btnSimularTiempo
${LOCATOR_INPUT_DIAS_SIMULAR}          id:inputDiasSimular
${LOCATOR_BTN_EJECUTAR_SIMULACION}     id:btnEjecutarSimulacion

# Locators - Configuración de Ciclos de Pago
${LOCATOR_DIV_CONFIG_CICLOS}           css:.config-ciclos-pago
${LOCATOR_RADIO_CICLO_SEMANAL}         id:radioCicloSemanal
${LOCATOR_RADIO_CICLO_QUINCENAL}       id:radioCicloQuincenal
${LOCATOR_RADIO_CICLO_MENSUAL}         id:radioCicloMensual
${LOCATOR_TXT_TIPO_CICLO_SELECCIONADO} css:.cycle-config .tipo-ciclo
${LOCATOR_DIV_CALENDARIO_GENERADO}     css:.calendar-preview .calendario-pagos
${LOCATOR_TXT_FECHAS_PAGO}             css:.calendar-preview .fechas-pago
${LOCATOR_TXT_REGLAS_VALIDADAS}        css:.validation-info .reglas-aplicadas
${LOCATOR_BTN_APLICAR_CICLO}           id:btnAplicarCiclo
${LOCATOR_MSG_CICLO_CONFIGURADO}       css:.alert-success .msg-ciclo

*** Keywords ***
Navegar A Módulo De Financiamiento
    Go To    ${URL_LOGIN}${URL_MODULO_FINANCIAMIENTO}
    Wait Until Element Is Visible    ${LOCATOR_BTN_CREAR_FINANCIAMIENTO}    timeout=10s

Hacer Click En Botón Crear Financiamiento
    Click Button    ${LOCATOR_BTN_CREAR_FINANCIAMIENTO}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_TOTAL_CYCLE}    timeout=10s

Ingresar Datos Del Financiamiento
    [Arguments]    ${customer_id}    ${total_cycle}    ${total_amount}    ${cycle_sequence}    ${initial_amount}    ${amount}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID}
    Input Text    ${LOCATOR_INPUT_CUSTOMER_ID}        ${customer_id}
    Input Text    ${LOCATOR_INPUT_TOTAL_CYCLE}        ${total_cycle}
    Input Text    ${LOCATOR_INPUT_TOTAL_AMOUNT}       ${total_amount}
    Input Text    ${LOCATOR_INPUT_CYCLE_SEQUENCE}     ${cycle_sequence}
    Input Text    ${LOCATOR_INPUT_INITIAL_AMOUNT}     ${initial_amount}
    Input Text    ${LOCATOR_INPUT_AMOUNT}             ${amount}

Hacer Click En Botón Guardar Financiamiento
    Click Button    ${LOCATOR_BTN_GUARDAR_FINANCIAMIENTO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_EXITO_CREACION}    timeout=10s

Verificar Que Financiamiento Fue Creado
    Element Should Be Visible    ${LOCATOR_MSG_EXITO_CREACION}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_EXITO_CREACION}
    Should Contain    ${mensaje}    creado exitosamente

Ingresar Parámetros Para Consulta De Financiamiento
    [Arguments]    ${cus_id}    ${installment_plan_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUS_ID}
    Input Text    ${LOCATOR_INPUT_CUS_ID}                ${cus_id}
    Input Text    ${LOCATOR_INPUT_INSTALLMENT_PLAN_ID}   ${installment_plan_id}

Hacer Click En Botón Consultar Financiamiento
    Click Button    ${LOCATOR_BTN_CONSULTAR}
    Wait Until Element Is Visible    ${LOCATOR_TXT_INSTALLMENT_STATUS}    timeout=10s

Obtener Estado Del Financiamiento
    ${installment_status}=    Get Text    ${LOCATOR_TXT_INSTALLMENT_STATUS}
    ${subsidy_status}=        Get Text    ${LOCATOR_TXT_SUBSIDY_STATUS}
    ${total_cycle}=           Get Text    ${LOCATOR_TXT_TOTAL_CYCLE}
    ${total_amount}=          Get Text    ${LOCATOR_TXT_TOTAL_AMOUNT}
    ${cycle_class}=           Get Text    ${LOCATOR_TXT_CYCLE_CLASS}
    ${status}=                Get Text    ${LOCATOR_TXT_STATUS}
    [Return]    ${installment_status}    ${subsidy_status}    ${total_cycle}    ${total_amount}    ${cycle_class}    ${status}

Verificar Que Estado Del Financiamiento Es Correcto
    [Arguments]    ${installment_status_esperado}    ${subsidy_status_esperado}    ${total_cycle_esperado}    ${total_amount_esperado}    ${cycle_class_esperado}    ${status_esperado}
    ${installment_status}    ${subsidy_status}    ${total_cycle}    ${total_amount}    ${cycle_class}    ${status}=    Obtener Estado Del Financiamiento
    Should Be Equal As Strings    ${installment_status}    ${installment_status_esperado}
    Should Be Equal As Strings    ${subsidy_status}        ${subsidy_status_esperado}
    Should Be Equal As Strings    ${total_cycle}           ${total_cycle_esperado}
    Should Be Equal As Strings    ${total_amount}          ${total_amount_esperado}
    Should Be Equal As Strings    ${cycle_class}           ${cycle_class_esperado}
    Should Be Equal As Strings    ${status}                ${status_esperado}

Simular Paso Del Tiempo
    [Arguments]    ${dias}
    Wait Until Element Is Visible    ${LOCATOR_BTN_SIMULAR_TIEMPO}
    Click Button    ${LOCATOR_BTN_SIMULAR_TIEMPO}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_DIAS_SIMULAR}    timeout=5s
    Input Text    ${LOCATOR_INPUT_DIAS_SIMULAR}    ${dias}
    Click Button    ${LOCATOR_BTN_EJECUTAR_SIMULACION}
    Sleep    2s

Obtener Fecha De Vencimiento De Ciclo
    ${cycle_due_date}=    Get Text    ${LOCATOR_TXT_CYCLE_DUE_DATE}
    [Return]    ${cycle_due_date}

Verificar Que Calendario De Cobranza Esta Activo
    Wait Until Element Is Visible    ${LOCATOR_TABLA_CALENDARIO_COBRANZA}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_CALENDARIO_COBRANZA}
    ${estado}=    Get Text    ${LOCATOR_TXT_ESTADO_CALENDARIO}
    Should Be Equal As Strings    ${estado}    Activo

Verificar Que Notificaciones Fueron Generadas
    Element Should Be Visible    ${LOCATOR_TXT_NOTIFICACIONES}
    ${notificaciones}=    Get Text    ${LOCATOR_TXT_NOTIFICACIONES}
    Should Not Be Empty    ${notificaciones}
    Should Contain    ${notificaciones}    generada

Acceder A Configuración De Ciclos De Pago
    Wait Until Element Is Visible    ${LOCATOR_DIV_CONFIG_CICLOS}    timeout=10s
    Element Should Be Visible    ${LOCATOR_DIV_CONFIG_CICLOS}

Verificar Que Opciones De Ciclos Están Disponibles
    Element Should Be Visible    ${LOCATOR_RADIO_CICLO_SEMANAL}
    Element Should Be Visible    ${LOCATOR_RADIO_CICLO_QUINCENAL}
    Element Should Be Visible    ${LOCATOR_RADIO_CICLO_MENSUAL}

Seleccionar Ciclo De Pago Semanal
    Wait Until Element Is Visible    ${LOCATOR_RADIO_CICLO_SEMANAL}
    Click Element    ${LOCATOR_RADIO_CICLO_SEMANAL}
    Wait Until Element Is Visible    ${LOCATOR_DIV_CALENDARIO_GENERADO}    timeout=5s

Seleccionar Ciclo De Pago Quincenal
    Wait Until Element Is Visible    ${LOCATOR_RADIO_CICLO_QUINCENAL}
    Click Element    ${LOCATOR_RADIO_CICLO_QUINCENAL}
    Wait Until Element Is Visible    ${LOCATOR_DIV_CALENDARIO_GENERADO}    timeout=5s

Seleccionar Ciclo De Pago Mensual
    Wait Until Element Is Visible    ${LOCATOR_RADIO_CICLO_MENSUAL}
    Click Element    ${LOCATOR_RADIO_CICLO_MENSUAL}
    Wait Until Element Is Visible    ${LOCATOR_DIV_CALENDARIO_GENERADO}    timeout=5s

Verificar Que Calendario Fue Generado Con Ciclo
    [Arguments]    ${tipo_ciclo}
    Element Should Be Visible    ${LOCATOR_DIV_CALENDARIO_GENERADO}
    ${tipo_seleccionado}=    Get Text    ${LOCATOR_TXT_TIPO_CICLO_SELECCIONADO}
    Should Be Equal As Strings    ${tipo_seleccionado}    ${tipo_ciclo}
    Element Should Be Visible    ${LOCATOR_TXT_FECHAS_PAGO}
    ${fechas}=    Get Text    ${LOCATOR_TXT_FECHAS_PAGO}
    Should Not Be Empty    ${fechas}

Verificar Que Reglas De Amigo Paguitos Se Aplican
    Wait Until Element Is Visible    ${LOCATOR_TXT_REGLAS_VALIDADAS}    timeout=5s
    ${reglas}=    Get Text    ${LOCATOR_TXT_REGLAS_VALIDADAS}
    Should Not Be Empty    ${reglas}
    Should Contain    ${reglas}    Amigo Paguitos

Aplicar Configuración De Ciclo
    Wait Until Element Is Enabled    ${LOCATOR_BTN_APLICAR_CICLO}
    Click Button    ${LOCATOR_BTN_APLICAR_CICLO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_CICLO_CONFIGURADO}    timeout=10s

Verificar Que Ciclo Fue Configurado Exitosamente
    [Arguments]    ${tipo_ciclo}
    Element Should Be Visible    ${LOCATOR_MSG_CICLO_CONFIGURADO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_CICLO_CONFIGURADO}
    Should Contain    ${mensaje}    ${tipo_ciclo}
    Should Contain    ${mensaje}    configurado exitosamente
