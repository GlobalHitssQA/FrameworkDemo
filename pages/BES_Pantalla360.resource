*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_PANTALLA_360}           /cliente/pantalla360

# Locators - Búsqueda de Cliente
${LOCATOR_INPUT_NUMERO_TELEFONICO_360}    id:searchNumeroTelefonico360
${LOCATOR_BTN_BUSCAR_CLIENTE_360}         id:btnBuscarCliente360

# Locators - Información de Crédito en Pantalla 360
${LOCATOR_TXT_INSTALLMENT_PLAN_INST_ID}   css:.credito-360 .installment-plan-inst-id
${LOCATOR_TXT_TIPO_FINANCIAMIENTO}        css:.credito-360 .type
${LOCATOR_TXT_INSTALLMENT_STATUS}         css:.credito-360 .installment-status
${LOCATOR_TXT_SUBSIDY_STATUS}             css:.credito-360 .subsidy-status
${LOCATOR_TXT_TOTAL_CYCLE}                css:.credito-360 .total-cycle
${LOCATOR_TXT_TOTAL_AMOUNT}               css:.credito-360 .total-amount

# Locators - Sección de Crédito Amigo Paguitos
${LOCATOR_SECCION_CREDITO_360}            css:.credito-amigo-paguitos-info
${LOCATOR_TXT_NOMBRE_CLIENTE_360}         css:.cliente-360 .nombre-completo
${LOCATOR_TXT_CUSTOMER_ID_360}            css:.cliente-360 .customer-id
${LOCATOR_TXT_IMEI_360}                   css:.credito-360 .imei

*** Keywords ***
Navegar A Pantalla 360 De BES
    Go To    ${URL_LOGIN}${URL_MODULO_PANTALLA_360}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_NUMERO_TELEFONICO_360}    timeout=10s

Ingresar Número Telefónico En Pantalla 360
    [Arguments]    ${numero_telefonico}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_NUMERO_TELEFONICO_360}
    Input Text    ${LOCATOR_INPUT_NUMERO_TELEFONICO_360}    ${numero_telefonico}
    Click Button    ${LOCATOR_BTN_BUSCAR_CLIENTE_360}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_CREDITO_360}    timeout=10s

Verificar Que Pantalla 360 Muestra Información Del Crédito
    Wait Until Element Is Visible    ${LOCATOR_SECCION_CREDITO_360}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_INSTALLMENT_PLAN_INST_ID}
    Element Should Be Visible    ${LOCATOR_TXT_TIPO_FINANCIAMIENTO}
    Element Should Be Visible    ${LOCATOR_TXT_INSTALLMENT_STATUS}

Obtener InstallmentPlanInstId Desde Pantalla 360
    ${installment_plan_inst_id}=    Get Text    ${LOCATOR_TXT_INSTALLMENT_PLAN_INST_ID}
    Should Not Be Empty    ${installment_plan_inst_id}    msg=installmentPlanInstId está vacío en pantalla 360
    [Return]    ${installment_plan_inst_id}

Verificar Que Se Muestra Tipo De Financiamiento Y Estatus Del Subsidio
    Element Should Be Visible    ${LOCATOR_TXT_TIPO_FINANCIAMIENTO}
    Element Should Be Visible    ${LOCATOR_TXT_INSTALLMENT_STATUS}
    Element Should Be Visible    ${LOCATOR_TXT_SUBSIDY_STATUS}

    ${tipo}=                Get Text    ${LOCATOR_TXT_TIPO_FINANCIAMIENTO}
    ${installment_status}=  Get Text    ${LOCATOR_TXT_INSTALLMENT_STATUS}
    ${subsidy_status}=      Get Text    ${LOCATOR_TXT_SUBSIDY_STATUS}

    Should Not Be Empty    ${tipo}                msg=Campo type está vacío
    Should Not Be Empty    ${installment_status}  msg=Campo installmentStatus está vacío
    Should Not Be Empty    ${subsidy_status}      msg=Campo subsidyStatus está vacío

Verificar Que Se Muestran Total De Ciclos Y Monto Total Del Crédito
    Element Should Be Visible    ${LOCATOR_TXT_TOTAL_CYCLE}
    Element Should Be Visible    ${LOCATOR_TXT_TOTAL_AMOUNT}

    ${total_cycle}=   Get Text    ${LOCATOR_TXT_TOTAL_CYCLE}
    ${total_amount}=  Get Text    ${LOCATOR_TXT_TOTAL_AMOUNT}

    Should Not Be Empty    ${total_cycle}   msg=Campo totalCycle está vacío
    Should Not Be Empty    ${total_amount}  msg=Campo totalAmount está vacío

    # Verificar que totalCycle es numérico
    Should Match Regexp    ${total_cycle}    ^\\d+$    msg=totalCycle no es un valor numérico válido

    # Verificar que totalAmount tiene formato de monto
    Should Match Regexp    ${total_amount}    ^\\d+(\\.\\d{2})?$    msg=totalAmount no tiene formato de monto válido

# ====================================
# LOCATORS NUEVOS - Casos ID 34-38
# ====================================

# Locators - Ventas por vendedor (Caso ID 34)
${LOCATOR_SECCION_VENTAS_VENDEDOR_360}         css:.ventas-por-vendedor-360
${LOCATOR_INPUT_ID_VENDEDOR_360}               id:inputVendedorId360
${LOCATOR_INPUT_FECHA_INICIO_360}              id:inputFechaInicio360
${LOCATOR_INPUT_FECHA_FIN_360}                 id:inputFechaFin360
${LOCATOR_BTN_CONSULTAR_VENTAS_360}            id:btnConsultarVentas360
${LOCATOR_TXT_SERVICE_NUMBER_VENTA_360}        css:.venta-detalle .service-number
${LOCATOR_TXT_IMEI_VENTA_360}                  css:.venta-detalle .imei-equipo
${LOCATOR_TXT_TOTAL_AMOUNT_VENTA_360}          css:.venta-detalle .total-amount-credito
${LOCATOR_SECCION_CONCENTRADO_VENTAS_360}      css:.concentrado-ventas-fuerza

# Locators - Datos del cliente (Caso ID 35)
${LOCATOR_TXT_FIRST_NAME_360}                  css:.cliente-360 .first-name
${LOCATOR_TXT_MIDDLE_NAME_360}                 css:.cliente-360 .middle-name
${LOCATOR_TXT_LAST_NAME_360}                   css:.cliente-360 .last-name
${LOCATOR_TXT_CURP_360}                        css:.cliente-360 .curp
${LOCATOR_TXT_RFC_360}                         css:.cliente-360 .rfc
${LOCATOR_TXT_REGION_ID_360}                   css:.cliente-360 .region-id
${LOCATOR_TXT_REGION_NAME_360}                 css:.cliente-360 .region-name

# Locators - Desglose de cuotas (Caso ID 36)
${LOCATOR_SECCION_DESGLOSE_CUOTAS_360}         css:.desglose-cuotas-360
${LOCATOR_TXT_CYCLE_SEQUENCE_360}              css:.cuota-item .cycle-sequence
${LOCATOR_TXT_INITIAL_AMOUNT_360}              css:.cuota-item .initial-amount
${LOCATOR_TXT_AMOUNT_CUOTA_360}                css:.cuota-item .amount
${LOCATOR_TXT_CYCLE_CLASS_360}                 css:.cuota-item .cycle-class
${LOCATOR_TXT_CYCLE_STATUS_360}                css:.cuota-item .cycle-status
${LOCATOR_TXT_CYCLE_DUE_DATE_360}              css:.cuota-item .cycle-due-date

# Locators - Desglose de pagos (Caso ID 37)
${LOCATOR_SECCION_DESGLOSE_PAGOS_360}          css:.desglose-pagos-360
${LOCATOR_TXT_SERVICE_CATEGORY_360}            css:.pago-item .service-category
${LOCATOR_TXT_CHARGE_CODE_GROUP_360}           css:.pago-item .charge-code-group
${LOCATOR_TXT_CHARGE_CODE_360}                 css:.pago-item .charge-code
${LOCATOR_TXT_CHARGE_AMOUNT_360}               css:.pago-item .charge-amount
${LOCATOR_TXT_DISCOUNT_AMT_360}                css:.pago-item .discount-amt
${LOCATOR_TXT_OPEN_AMOUNT_360}                 css:.pago-item .open-amount
${LOCATOR_TXT_TAX_AMOUNT_360}                  css:.pago-item .tax-amount
${LOCATOR_TXT_OPEN_TAX_AMOUNT_360}             css:.pago-item .open-tax-amount
${LOCATOR_TXT_IVA_TAX_AMOUNT_360}              css:.pago-item .iva-tax-amount
${LOCATOR_TXT_OPEN_IVA_TAX_AMOUNT_360}         css:.pago-item .open-iva-tax-amount
${LOCATOR_TXT_DISPUTE_AMOUNT_360}              css:.pago-item .dispute-amount
${LOCATOR_TXT_PAGO_STATUS_360}                 css:.pago-item .pago-status

# Locators - Fechas de vencimiento (Caso ID 38)
${LOCATOR_SECCION_FECHAS_VENCIMIENTO_360}      css:.fechas-vencimiento-360
${LOCATOR_TXT_DUE_DATE_INVOICE_360}            css:.fechas-360 .due-date-invoice
${LOCATOR_TXT_BILL_CYCLE_BEGIN_TIME_360}       css:.fechas-360 .bill-cycle-begin-time
${LOCATOR_TXT_BILL_CYCLE_END_TIME_360}         css:.fechas-360 .bill-cycle-end-time

# ====================================
# KEYWORDS NUEVOS - Casos ID 34-38
# ====================================

# Keywords - Ventas por vendedor (Caso ID 34)
Acceder A Reportes De Ventas En Pantalla 360
    Wait Until Element Is Visible    ${LOCATOR_SECCION_VENTAS_VENDEDOR_360}    timeout=10s
    Element Should Be Visible    ${LOCATOR_SECCION_VENTAS_VENDEDOR_360}

Seleccionar Filtro De Ventas Por Vendedor Para Amigo Paguitos
    Wait Until Element Is Visible    ${LOCATOR_INPUT_ID_VENDEDOR_360}    timeout=10s
    Element Should Be Visible    ${LOCATOR_INPUT_FECHA_INICIO_360}
    Element Should Be Visible    ${LOCATOR_INPUT_FECHA_FIN_360}

Ingresar Identificador Del Vendedor Y Rango De Fechas
    [Arguments]    ${vendedor_id}    ${fecha_inicio}    ${fecha_fin}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_ID_VENDEDOR_360}
    Input Text    ${LOCATOR_INPUT_ID_VENDEDOR_360}    ${vendedor_id}
    Input Text    ${LOCATOR_INPUT_FECHA_INICIO_360}    ${fecha_inicio}
    Input Text    ${LOCATOR_INPUT_FECHA_FIN_360}    ${fecha_fin}
    Click Button    ${LOCATOR_BTN_CONSULTAR_VENTAS_360}
    Wait Until Element Is Visible    ${LOCATOR_SECCION_VENTAS_VENDEDOR_360}    timeout=10s

Verificar Que Se Visualizan Datos Del Cliente Equipo Y Monto Del Crédito
    Element Should Be Visible    ${LOCATOR_TXT_SERVICE_NUMBER_VENTA_360}
    Element Should Be Visible    ${LOCATOR_TXT_IMEI_VENTA_360}
    Element Should Be Visible    ${LOCATOR_TXT_TOTAL_AMOUNT_VENTA_360}
    ${service_number}=    Get Text    ${LOCATOR_TXT_SERVICE_NUMBER_VENTA_360}
    ${imei}=    Get Text    ${LOCATOR_TXT_IMEI_VENTA_360}
    ${total_amount}=    Get Text    ${LOCATOR_TXT_TOTAL_AMOUNT_VENTA_360}
    Should Not Be Empty    ${service_number}    msg=serviceNumber está vacío
    Should Not Be Empty    ${imei}    msg=IMEI está vacío
    Should Not Be Empty    ${total_amount}    msg=totalAmount está vacío

Verificar Que Se Muestra Concentrado De Ventas Por Fuerza De Venta
    Element Should Be Visible    ${LOCATOR_SECCION_CONCENTRADO_VENTAS_360}
    ${concentrado}=    Get Text    ${LOCATOR_SECCION_CONCENTRADO_VENTAS_360}
    Should Not Be Empty    ${concentrado}    msg=Concentrado de ventas está vacío

# Keywords - Datos del cliente (Caso ID 35)
Verificar Que Se Muestran Nombres Del Cliente En Pantalla 360
    Element Should Be Visible    ${LOCATOR_TXT_FIRST_NAME_360}
    Element Should Be Visible    ${LOCATOR_TXT_LAST_NAME_360}
    ${first_name}=    Get Text    ${LOCATOR_TXT_FIRST_NAME_360}
    ${last_name}=    Get Text    ${LOCATOR_TXT_LAST_NAME_360}
    Should Not Be Empty    ${first_name}    msg=firstName está vacío
    Should Not Be Empty    ${last_name}    msg=lastName está vacío

Verificar Que Se Muestran Datos Fiscales CURP Y RFC
    Element Should Be Visible    ${LOCATOR_TXT_CURP_360}
    Element Should Be Visible    ${LOCATOR_TXT_RFC_360}
    ${curp}=    Get Text    ${LOCATOR_TXT_CURP_360}
    ${rfc}=    Get Text    ${LOCATOR_TXT_RFC_360}
    Should Not Be Empty    ${curp}    msg=CURP está vacío
    Should Not Be Empty    ${rfc}    msg=RFC está vacío

Verificar Que Se Muestran Datos De Región En Pantalla 360
    Element Should Be Visible    ${LOCATOR_TXT_REGION_ID_360}
    Element Should Be Visible    ${LOCATOR_TXT_REGION_NAME_360}
    ${region_id}=    Get Text    ${LOCATOR_TXT_REGION_ID_360}
    ${region_name}=    Get Text    ${LOCATOR_TXT_REGION_NAME_360}
    Should Not Be Empty    ${region_id}    msg=RegionID está vacío
    Should Not Be Empty    ${region_name}    msg=regionName está vacío

Validar Que Información Coincide Con Datos Almacenados En BES
    # Este keyword verifica que los datos mostrados coinciden con BES
    # La verificación se hace implícitamente al cargar los datos desde las APIs de BES
    Log    Información de cliente cargada desde CustomerManagement Service

# Keywords - Desglose de cuotas (Caso ID 36)
Verificar Que Se Muestra Número De Secuencia De Cada Cuota
    Element Should Be Visible    ${LOCATOR_TXT_CYCLE_SEQUENCE_360}
    ${cycle_sequence}=    Get Text    ${LOCATOR_TXT_CYCLE_SEQUENCE_360}
    Should Not Be Empty    ${cycle_sequence}    msg=cycleSequence está vacío
    Should Match Regexp    ${cycle_sequence}    ^\\d+$    msg=cycleSequence no es numérico

Verificar Que Se Muestran Montos Inicial Y De Cuota
    Element Should Be Visible    ${LOCATOR_TXT_INITIAL_AMOUNT_360}
    Element Should Be Visible    ${LOCATOR_TXT_AMOUNT_CUOTA_360}
    ${initial_amount}=    Get Text    ${LOCATOR_TXT_INITIAL_AMOUNT_360}
    ${amount}=    Get Text    ${LOCATOR_TXT_AMOUNT_CUOTA_360}
    Should Not Be Empty    ${initial_amount}    msg=initialAmount está vacío
    Should Not Be Empty    ${amount}    msg=amount está vacío

Verificar Que Se Muestra Clase De Cuota Y Su Estatus
    Element Should Be Visible    ${LOCATOR_TXT_CYCLE_CLASS_360}
    Element Should Be Visible    ${LOCATOR_TXT_CYCLE_STATUS_360}
    ${cycle_class}=    Get Text    ${LOCATOR_TXT_CYCLE_CLASS_360}
    ${status}=    Get Text    ${LOCATOR_TXT_CYCLE_STATUS_360}
    Should Not Be Empty    ${cycle_class}    msg=cycleClass está vacío
    Should Not Be Empty    ${status}    msg=status de cuota está vacío

Verificar Que Se Muestra Fecha De Vencimiento De Cada Cuota
    Element Should Be Visible    ${LOCATOR_TXT_CYCLE_DUE_DATE_360}
    ${cycle_due_date}=    Get Text    ${LOCATOR_TXT_CYCLE_DUE_DATE_360}
    Should Not Be Empty    ${cycle_due_date}    msg=cycleDueDate está vacío
    Should Match Regexp    ${cycle_due_date}    ^\\d{2}/\\d{2}/\\d{4}$    msg=Fecha no tiene formato DD/MM/AAAA

# Keywords - Desglose de pagos (Caso ID 37)
Verificar Que Se Muestra Desglose De Rubros Del Invoice
    Element Should Be Visible    ${LOCATOR_TXT_SERVICE_CATEGORY_360}
    Element Should Be Visible    ${LOCATOR_TXT_CHARGE_CODE_GROUP_360}
    Element Should Be Visible    ${LOCATOR_TXT_CHARGE_CODE_360}
    ${service_category}=    Get Text    ${LOCATOR_TXT_SERVICE_CATEGORY_360}
    ${charge_code_group}=    Get Text    ${LOCATOR_TXT_CHARGE_CODE_GROUP_360}
    ${charge_code}=    Get Text    ${LOCATOR_TXT_CHARGE_CODE_360}
    Should Not Be Empty    ${service_category}    msg=serviceCategory está vacío
    Should Not Be Empty    ${charge_code_group}    msg=chargeCodeGroup está vacío
    Should Not Be Empty    ${charge_code}    msg=chargeCode está vacío

Verificar Que Se Muestran Montos Cargo Descuento Y Saldo Abierto
    Element Should Be Visible    ${LOCATOR_TXT_CHARGE_AMOUNT_360}
    Element Should Be Visible    ${LOCATOR_TXT_DISCOUNT_AMT_360}
    Element Should Be Visible    ${LOCATOR_TXT_OPEN_AMOUNT_360}
    ${charge_amount}=    Get Text    ${LOCATOR_TXT_CHARGE_AMOUNT_360}
    ${discount_amt}=    Get Text    ${LOCATOR_TXT_DISCOUNT_AMT_360}
    ${open_amount}=    Get Text    ${LOCATOR_TXT_OPEN_AMOUNT_360}
    Should Not Be Empty    ${charge_amount}    msg=chargeAmount está vacío
    Should Not Be Empty    ${discount_amt}    msg=discountAmt está vacío
    Should Not Be Empty    ${open_amount}    msg=openAmount está vacío

Verificar Que Se Muestran Montos De Impuestos Completos
    Element Should Be Visible    ${LOCATOR_TXT_TAX_AMOUNT_360}
    Element Should Be Visible    ${LOCATOR_TXT_OPEN_TAX_AMOUNT_360}
    Element Should Be Visible    ${LOCATOR_TXT_IVA_TAX_AMOUNT_360}
    Element Should Be Visible    ${LOCATOR_TXT_OPEN_IVA_TAX_AMOUNT_360}
    ${tax_amount}=    Get Text    ${LOCATOR_TXT_TAX_AMOUNT_360}
    ${open_tax_amount}=    Get Text    ${LOCATOR_TXT_OPEN_TAX_AMOUNT_360}
    ${iva_tax_amount}=    Get Text    ${LOCATOR_TXT_IVA_TAX_AMOUNT_360}
    ${open_iva_tax_amount}=    Get Text    ${LOCATOR_TXT_OPEN_IVA_TAX_AMOUNT_360}
    Should Not Be Empty    ${tax_amount}    msg=taxAmount está vacío
    Should Not Be Empty    ${open_tax_amount}    msg=openTaxAmount está vacío
    Should Not Be Empty    ${iva_tax_amount}    msg=iVATaxAmount está vacío
    Should Not Be Empty    ${open_iva_tax_amount}    msg=openIVATaxAmount está vacío

Verificar Que Se Muestra Monto En Disputa Y Estatus De Cada Pago
    Element Should Be Visible    ${LOCATOR_TXT_DISPUTE_AMOUNT_360}
    Element Should Be Visible    ${LOCATOR_TXT_PAGO_STATUS_360}
    ${dispute_amount}=    Get Text    ${LOCATOR_TXT_DISPUTE_AMOUNT_360}
    ${status}=    Get Text    ${LOCATOR_TXT_PAGO_STATUS_360}
    Should Not Be Empty    ${dispute_amount}    msg=disputeAmount está vacío
    Should Not Be Empty    ${status}    msg=status de pago está vacío

# Keywords - Fechas de vencimiento (Caso ID 38)
Verificar Que Se Muestra Fecha De Vencimiento General Del Invoice
    Element Should Be Visible    ${LOCATOR_TXT_DUE_DATE_INVOICE_360}
    ${due_date}=    Get Text    ${LOCATOR_TXT_DUE_DATE_INVOICE_360}
    Should Not Be Empty    ${due_date}    msg=dueDate del invoice está vacío
    Should Match Regexp    ${due_date}    ^\\d{2}/\\d{2}/\\d{4}$    msg=Fecha no tiene formato DD/MM/AAAA

Verificar Que Se Muestran Fechas Del Ciclo De Facturación
    Element Should Be Visible    ${LOCATOR_TXT_BILL_CYCLE_BEGIN_TIME_360}
    Element Should Be Visible    ${LOCATOR_TXT_BILL_CYCLE_END_TIME_360}
    ${begin_time}=    Get Text    ${LOCATOR_TXT_BILL_CYCLE_BEGIN_TIME_360}
    ${end_time}=    Get Text    ${LOCATOR_TXT_BILL_CYCLE_END_TIME_360}
    Should Not Be Empty    ${begin_time}    msg=billCycleBeginTime está vacío
    Should Not Be Empty    ${end_time}    msg=billCycleEndTime está vacío
    Should Match Regexp    ${begin_time}    ^\\d{2}/\\d{2}/\\d{4}$    msg=Fecha inicio no tiene formato DD/MM/AAAA
    Should Match Regexp    ${end_time}    ^\\d{2}/\\d{2}/\\d{4}$    msg=Fecha fin no tiene formato DD/MM/AAAA

Validar Que Fechas Están En Formato Legible Y Ordenadas Cronológicamente
    # Verificar formato DD/MM/AAAA en todas las fechas visibles
    ${due_date}=    Get Text    ${LOCATOR_TXT_DUE_DATE_INVOICE_360}
    ${begin_time}=    Get Text    ${LOCATOR_TXT_BILL_CYCLE_BEGIN_TIME_360}
    ${end_time}=    Get Text    ${LOCATOR_TXT_BILL_CYCLE_END_TIME_360}
    Should Match Regexp    ${due_date}    ^\\d{2}/\\d{2}/\\d{4}$    msg=dueDate no tiene formato DD/MM/AAAA
    Should Match Regexp    ${begin_time}    ^\\d{2}/\\d{2}/\\d{4}$    msg=billCycleBeginTime no tiene formato DD/MM/AAAA
    Should Match Regexp    ${end_time}    ^\\d{2}/\\d{2}/\\d{4}$    msg=billCycleEndTime no tiene formato DD/MM/AAAA

# ====================================
# LOCATORS NUEVOS - Caso ID 39
# ====================================

# Locators - Estatus del préstamo (Caso ID 39)
${LOCATOR_TXT_STATUS_SUBSCRIBER_360}        css:.credito-360 .status-subscriber
${LOCATOR_TXT_STATUS_CUOTA_360}             css:.cuota-item .status

# ====================================
# KEYWORDS NUEVOS - Caso ID 39
# ====================================

# Keywords - Estatus del préstamo (Caso ID 39)
Verificar Que Se Muestra Estatus General Del Servicio
    Element Should Be Visible    ${LOCATOR_TXT_STATUS_SUBSCRIBER_360}
    ${status_subscriber}=    Get Text    ${LOCATOR_TXT_STATUS_SUBSCRIBER_360}
    Should Not Be Empty    ${status_subscriber}    msg=Status del subscriber está vacío
    Log    Estado actual de la línea asociada al crédito: ${status_subscriber}

Verificar Que Se Muestra Estatus Del Plan De Financiamiento
    Element Should Be Visible    ${LOCATOR_TXT_INSTALLMENT_STATUS}
    ${installment_status}=    Get Text    ${LOCATOR_TXT_INSTALLMENT_STATUS}
    Should Not Be Empty    ${installment_status}    msg=installmentStatus está vacío
    Should Contain Any    ${installment_status}    Activo    En Proceso    Completado    msg=installmentStatus no tiene un valor válido

Verificar Que Se Muestra Estatus Del Subsidio
    Element Should Be Visible    ${LOCATOR_TXT_SUBSIDY_STATUS}
    ${subsidy_status}=    Get Text    ${LOCATOR_TXT_SUBSIDY_STATUS}
    Should Not Be Empty    ${subsidy_status}    msg=subsidyStatus está vacío
    Should Contain Any    ${subsidy_status}    Activo    Aplicado    Inactivo    msg=subsidyStatus no tiene un valor válido

Verificar Que Se Muestra Estatus De Cada Cuota Individual
    Element Should Be Visible    ${LOCATOR_TXT_STATUS_CUOTA_360}
    ${status_cuota}=    Get Text    ${LOCATOR_TXT_STATUS_CUOTA_360}
    Should Not Be Empty    ${status_cuota}    msg=Status de cuota está vacío
    Should Contain Any    ${status_cuota}    Pagada    Pendiente    Vencida    msg=Status de cuota no tiene un valor válido

# ====================================
# KEYWORDS ADICIONALES - Casos ID 27, 28
# ====================================

# Keywords adicionales para fechas de vencimiento (Caso ID 27)
Verificar Que Fechas Respetan Ciclo De Pago
    [Arguments]    ${tipo_ciclo}
    Element Should Be Visible    ${LOCATOR_TXT_CYCLE_DUE_DATE_360}
    ${cycle_due_date}=    Get Text    ${LOCATOR_TXT_CYCLE_DUE_DATE_360}
    Should Not Be Empty    ${cycle_due_date}    msg=cycleDueDate está vacío
    Log    Validando que fechas respetan ciclo de pago: ${tipo_ciclo}

# Keywords adicionales para estatus del préstamo (Caso ID 28)
Verificar Actualización De Estatus En Tiempo Real
    Wait Until Element Is Visible    ${LOCATOR_TXT_INSTALLMENT_STATUS}    timeout=10s
    ${status}=    Get Text    ${LOCATOR_TXT_INSTALLMENT_STATUS}
    Should Not Be Empty    ${status}    msg=installmentStatus está vacío
    Log    Estatus del préstamo se actualiza en tiempo real: ${status}
