*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_SUBSIDIOS}                      /cobranza/subsidios

# Locators - Búsqueda de Cliente con Subsidio
${LOCATOR_INPUT_CUSTOMER_ID_SUBSIDIO}        id:searchCustomerIdSubsidio
${LOCATOR_INPUT_NUMERO_TELEFONO_SUBSIDIO}    id:searchNumeroTelefonoSubsidio
${LOCATOR_BTN_BUSCAR_SUBSIDIO}               id:btnBuscarSubsidio

# Locators - Información del Cliente y Plan
${LOCATOR_TXT_CUSTOMER_ID_SUBSIDIO}          css:.subsidio-detail .customer-id
${LOCATOR_TXT_NUMERO_TELEFONO}               css:.subsidio-detail .numero-telefono
${LOCATOR_TXT_TIPO_PLAN}                     css:.subsidio-detail .tipo-plan
${LOCATOR_TXT_ESTADO_PLAN}                   css:.subsidio-detail .estado-plan

# Locators - Información del Subsidio
${LOCATOR_SECCION_SUBSIDIO}                  id:seccionSubsidio
${LOCATOR_TXT_SUBSIDIO_ID}                   css:.subsidio-info .subsidio-id
${LOCATOR_TXT_ESTADO_SUBSIDIO}               css:.subsidio-info .estado-subsidio
${LOCATOR_TXT_MONTO_SUBSIDIO}                css:.subsidio-info .monto-subsidio
${LOCATOR_TXT_FECHA_INICIO_SUBSIDIO}         css:.subsidio-info .fecha-inicio
${LOCATOR_TXT_MOROSIDAD_ESTADO}              css:.subsidio-info .morosidad-estado

# Locators - Calendario de Cobranza del Subsidio
${LOCATOR_SECCION_CALENDARIO_SUBSIDIO}       id:seccionCalendarioSubsidio
${LOCATOR_TABLA_CALENDARIO_SUBSIDIO}         id:tablaCalendarioSubsidio
${LOCATOR_TXT_CUOTA_NUMERO}                  css:.calendario-subsidio .cuota-numero
${LOCATOR_TXT_CUOTA_MONTO}                   css:.calendario-subsidio .cuota-monto
${LOCATOR_TXT_CUOTA_FECHA_VENCIMIENTO}       css:.calendario-subsidio .cuota-fecha-vencimiento
${LOCATOR_TXT_CUOTA_ESTADO}                  css:.calendario-subsidio .cuota-estado
${LOCATOR_TXT_CUOTAS_PENDIENTES}             css:.calendario-subsidio .cuotas-pendientes
${LOCATOR_TXT_CUOTAS_VENCIDAS}               css:.calendario-subsidio .cuotas-vencidas

# Locators - Estado de Morosidad
${LOCATOR_SECCION_MOROSIDAD}                 id:seccionMorosidad
${LOCATOR_TXT_DIAS_MOROSIDAD}                css:.morosidad-detail .dias-morosidad
${LOCATOR_TXT_MONTO_VENCIDO}                 css:.morosidad-detail .monto-vencido
${LOCATOR_TXT_ULTIMO_PAGO_FECHA}             css:.morosidad-detail .ultimo-pago-fecha
${LOCATOR_TXT_ULTIMO_PAGO_MONTO}             css:.morosidad-detail .ultimo-pago-monto

*** Keywords ***
Navegar A Módulo De Subsidios
    Go To    ${URL_LOGIN}${URL_MODULO_SUBSIDIOS}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_SUBSIDIO}    timeout=10s

Buscar Cliente Por Customer ID En Subsidios
    [Arguments]    ${customer_id}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_SUBSIDIO}
    Input Text    ${LOCATOR_INPUT_CUSTOMER_ID_SUBSIDIO}    ${customer_id}
    Click Button    ${LOCATOR_BTN_BUSCAR_SUBSIDIO}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUSTOMER_ID_SUBSIDIO}    timeout=10s

Buscar Cliente Por Numero De Telefono En Subsidios
    [Arguments]    ${numero_telefono}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_NUMERO_TELEFONO_SUBSIDIO}
    Input Text    ${LOCATOR_INPUT_NUMERO_TELEFONO_SUBSIDIO}    ${numero_telefono}
    Click Button    ${LOCATOR_BTN_BUSCAR_SUBSIDIO}
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUSTOMER_ID_SUBSIDIO}    timeout=10s

Verificar Que Cliente Tiene Plan Postpago
    Wait Until Element Is Visible    ${LOCATOR_TXT_TIPO_PLAN}    timeout=10s
    ${tipo_plan}=    Get Text    ${LOCATOR_TXT_TIPO_PLAN}
    Should Contain Any    ${tipo_plan}    Postpago    Post-pago    POST

Verificar Que Cliente Tiene Subsidio Activo
    Wait Until Element Is Visible    ${LOCATOR_SECCION_SUBSIDIO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_SUBSIDIO_ID}
    ${estado_subsidio}=    Get Text    ${LOCATOR_TXT_ESTADO_SUBSIDIO}
    Should Contain Any    ${estado_subsidio}    Activo    Vigente

Verificar Que Cliente Presenta Morosidad
    Wait Until Element Is Visible    ${LOCATOR_TXT_MOROSIDAD_ESTADO}    timeout=10s
    ${morosidad}=    Get Text    ${LOCATOR_TXT_MOROSIDAD_ESTADO}
    Should Contain Any    ${morosidad}    Morosidad    Moroso    Vencido

Obtener Información Del Cliente Con Subsidio
    [Documentation]    Obtiene información del cliente con plan postpago y subsidio
    ${customer_id}=       Get Text    ${LOCATOR_TXT_CUSTOMER_ID_SUBSIDIO}
    ${numero_telefono}=   Get Text    ${LOCATOR_TXT_NUMERO_TELEFONO}
    ${tipo_plan}=         Get Text    ${LOCATOR_TXT_TIPO_PLAN}
    ${estado_plan}=       Get Text    ${LOCATOR_TXT_ESTADO_PLAN}
    [Return]    ${customer_id}    ${numero_telefono}    ${tipo_plan}    ${estado_plan}

Consultar Estado Del Subsidio
    [Documentation]    Consulta el estado del subsidio mediante subsidyStatus en BES
    Wait Until Element Is Visible    ${LOCATOR_SECCION_SUBSIDIO}    timeout=10s
    ${subsidio_id}=           Get Text    ${LOCATOR_TXT_SUBSIDIO_ID}
    ${estado_subsidio}=       Get Text    ${LOCATOR_TXT_ESTADO_SUBSIDIO}
    ${monto_subsidio}=        Get Text    ${LOCATOR_TXT_MONTO_SUBSIDIO}
    ${fecha_inicio}=          Get Text    ${LOCATOR_TXT_FECHA_INICIO_SUBSIDIO}
    Log    Estado del subsidio consultado: ID=${subsidio_id}, Estado=${estado_subsidio}, Monto=${monto_subsidio}
    [Return]    ${subsidio_id}    ${estado_subsidio}    ${monto_subsidio}    ${fecha_inicio}

Verificar Que BES Administra Calendario De Cobranza Para Subsidio
    [Documentation]    Valida que BES administra el calendario de cobranza para el subsidio
    Wait Until Element Is Visible    ${LOCATOR_SECCION_CALENDARIO_SUBSIDIO}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_CALENDARIO_SUBSIDIO}
    Element Should Be Visible    ${LOCATOR_TXT_CUOTA_NUMERO}
    Element Should Be Visible    ${LOCATOR_TXT_CUOTA_FECHA_VENCIMIENTO}

Verificar Que Calendario Refleja Cuotas De Subsidio Pendientes
    [Documentation]    Verifica que el calendario refleja las cuotas del subsidio pendientes de pago
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUOTAS_PENDIENTES}    timeout=10s
    ${cuotas_pendientes}=    Get Text    ${LOCATOR_TXT_CUOTAS_PENDIENTES}
    Should Not Be Equal As Strings    ${cuotas_pendientes}    0
    ${cuotas_vencidas}=    Get Text    ${LOCATOR_TXT_CUOTAS_VENCIDAS}
    Should Not Be Equal As Strings    ${cuotas_vencidas}    0
    Log    Cuotas pendientes: ${cuotas_pendientes}, Cuotas vencidas: ${cuotas_vencidas}

Obtener Información De Morosidad Del Subsidio
    [Documentation]    Obtiene información detallada sobre la morosidad del subsidio
    Wait Until Element Is Visible    ${LOCATOR_SECCION_MOROSIDAD}    timeout=10s
    ${dias_morosidad}=        Get Text    ${LOCATOR_TXT_DIAS_MOROSIDAD}
    ${monto_vencido}=         Get Text    ${LOCATOR_TXT_MONTO_VENCIDO}
    ${ultimo_pago_fecha}=     Get Text    ${LOCATOR_TXT_ULTIMO_PAGO_FECHA}
    ${ultimo_pago_monto}=     Get Text    ${LOCATOR_TXT_ULTIMO_PAGO_MONTO}
    [Return]    ${dias_morosidad}    ${monto_vencido}    ${ultimo_pago_fecha}    ${ultimo_pago_monto}

Obtener Estado Actual Del Subsidio Del Cliente
    [Documentation]    Obtiene el estado actual completo del subsidio del cliente
    ${subsidio_id}    ${estado}    ${monto}    ${fecha_inicio}=    Consultar Estado Del Subsidio
    ${cuotas_pendientes}=    Get Text    ${LOCATOR_TXT_CUOTAS_PENDIENTES}
    ${cuotas_vencidas}=      Get Text    ${LOCATOR_TXT_CUOTAS_VENCIDAS}
    Log    Estado del subsidio: ${estado}, Cuotas vencidas: ${cuotas_vencidas}
    [Return]    ${estado}    ${cuotas_vencidas}
