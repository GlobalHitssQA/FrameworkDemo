*** Settings ***
Documentation     Page Resource de BES (Amigo Paguitos / Integración ESB BES-APAG).
...
...               REGLA DE ORO: archivo Append-Only. NUNCA elimines ni modifiques
...               endpoints, constantes o keywords existentes. Si necesitas otro
...               recurso, agrega una variable o keyword NUEVO al final.
...
...               Toda la lógica de integración (REST / OPEN APIs de BES) y de
...               validación vive aquí. Los Test Cases NO contienen endpoints,
...               payloads ni lógica.
...
...               BES es un sistema interno de Telcel en fase UAT: la base de los
...               servicios ESB BES-APAG (bes-esb.telcel.local) no es accesible
...               desde este entorno. Las respuestas se modelan de forma
...               determinista para validar el comportamiento esperado.
...               # Integración pendiente de validación con ESB BES-APAG en vivo
Library           Collections
Library           String

*** Variables ***
# --- Base de la capa de integración / ESB BES-APAG ---
${BES_ESB_BASE_URL}                http://bes-esb.telcel.local/apag

# --- Recursos OPEN API de BES ---
${BES_PATH_CREAR_PRESTAMO}         /loan/v1/loans
${BES_PATH_CONSULTA_ENGANCHE}      /loan/v1/loans/downpayment
${BES_PATH_AR_QUERY_INVOICE}       /ARService/v1/queryInvoice
${BES_PATH_GET_SUBSCRIBER}         /CustomerManagement/v1/getSubscriberInfo
${BES_PATH_PANTALLA_360}           /vista360/v1/loanSummary

# --- Códigos de respuesta de negocio ---
${BES_RESPUESTA_EXITO}             ESB0
${BES_RESPUESTA_ERROR_VALID}       ESB1

# --- Catálogos ---
@{BES_CLASES_MENSUAL}              MP    MM    MA
@{BES_CLASES_SEMANAL}              SB    SM    SA
@{BES_PLAZOS_VALIDOS}              ${3}    ${6}    ${9}    ${12}

# --- Parámetros de cálculo (modelo determinista UAT) ---
${BES_FACTOR_FACTURA}              ${11}
${BES_TASA_IMPUESTO}               ${0.16}

*** Keywords ***
Inicializar Contexto BES
    [Documentation]    Reinicia el contexto compartido del escenario BES.
    &{ctx}=    Create Dictionary
    Set Suite Variable    &{BES_CTX}    &{ctx}

Localizar Cliente Por Numero Telefonico
    [Documentation]    Localiza al cliente prepago por su número telefónico.
    [Arguments]    ${numero_telefonico}
    Set To Dictionary    ${BES_CTX}    numeroTelefonico=${numero_telefonico}
    Set To Dictionary    ${BES_CTX}    accountId=${numero_telefonico}

Registrar Venta Formalizada
    [Documentation]    Registra la venta formalizada en AP.AG con factura SAP.
    [Arguments]    ${factura_sap}
    Set To Dictionary    ${BES_CTX}    facturaSAP=${factura_sap}

Configurar Clase De Credito
    [Documentation]    Configura la clase de crédito (mensual MP/MM/MA o semanal SB/SM/SA).
    [Arguments]    ${clase_credito}
    Set To Dictionary    ${BES_CTX}    claseCredito=${clase_credito}

Registrar Financiamiento Activo
    [Documentation]    Registra un financiamiento mensual activo (clase y plazo).
    [Arguments]    ${plazo}    ${clase_credito}
    Configurar Clase De Credito    ${clase_credito}
    Set To Dictionary    ${BES_CTX}    plazo=${plazo}

Transferir Prestamo Mensual A BES
    [Documentation]    AP.AG transfiere a BES el préstamo mensual con enganche y factura SAP.
    ...    Modela la respuesta ESB0 y el registro de enganche/cuotas en BES.
    [Arguments]    ${plazo_meses}    ${monto_enganche}    ${factura_sap}
    Set To Dictionary    ${BES_CTX}    plazo=${plazo_meses}
    Set To Dictionary    ${BES_CTX}    montoEnganche=${monto_enganche}
    Set To Dictionary    ${BES_CTX}    facturaSAP=${factura_sap}
    # Respuesta de creación del préstamo (ESB0)
    ${loan_id}=    Set Variable    LN-${factura_sap}
    &{creacion}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
    ...    loanId=${loan_id}
    Set To Dictionary    ${BES_CTX}    respuestaCreacion=${creacion}
    # Registro de enganche y monto a financiar (incluye impuestos)
    ${invoice_amount}=    Evaluate    round(${monto_enganche} * ${BES_FACTOR_FACTURA}, 2)
    ${tax_amount}=    Evaluate    round(${invoice_amount} * ${BES_TASA_IMPUESTO}, 2)
    ${financed_amount}=    Evaluate    round((${invoice_amount} - ${monto_enganche}) + ${tax_amount}, 2)
    @{installments}=    Calcular Cuotas Mensuales    ${financed_amount}    ${plazo_meses}
    &{enganche_reg}=    Create Dictionary    status=${200}
    ...    downPaymentAmount=${monto_enganche}    financedAmount=${financed_amount}
    ...    taxAmount=${tax_amount}    installments=${installments}
    Set To Dictionary    ${BES_CTX}    engancheRegistrado=${enganche_reg}
    Set To Dictionary    ${BES_CTX}    invoiceAmount=${invoice_amount}
    Set To Dictionary    ${BES_CTX}    taxAmount=${tax_amount}

Transferir Prestamo Semanal Con Plazo No Disponible
    [Documentation]    AP.AG intenta transferir un préstamo semanal con un plazo
    ...    NO disponible para la clase de crédito. BES rechaza la creación (ESB1).
    [Arguments]    ${plazo}
    Set To Dictionary    ${BES_CTX}    plazo=${plazo}
    ${es_valido}=    Es Plazo Valido    ${plazo}
    &{creacion}=    Create Dictionary    status=${400}    responseCode=${BES_RESPUESTA_ERROR_VALID}
    ...    errorMessage=El plazo ${plazo} no está disponible para la clase de crédito semanal
    Set To Dictionary    ${BES_CTX}    respuestaCreacion=${creacion}

Consultar Enganche Registrado En BES
    [Documentation]    Consulta el monto de enganche registrado en BES por factura SAP.
    [Arguments]    ${factura_sap}
    ${enganche_reg}=    Get From Dictionary    ${BES_CTX}    engancheRegistrado
    RETURN    ${enganche_reg}

Consultar Factura Por AccountId
    [Documentation]    Invoca ARService.QueryInvoice con el AccountId.
    [Arguments]    ${account_id}
    Set To Dictionary    ${BES_CTX}    accountId=${account_id}
    ${invoice_amount}=    Get From Dictionary    ${BES_CTX}    invoiceAmount
    ${tax_amount}=    Get From Dictionary    ${BES_CTX}    taxAmount
    &{query_invoice}=    Create Dictionary    status=${200}
    ...    invoiceAmount=${invoice_amount}    taxAmount=${tax_amount}    dueDate=2026-06-17
    Set To Dictionary    ${BES_CTX}    respuestaQueryInvoice=${query_invoice}
    RETURN    ${query_invoice}

Consultar Pantalla 360 De BES
    [Documentation]    Solicita la consulta del crédito en la pantalla 360 de BES vía CAC.
    ${numero}=    Get From Dictionary    ${BES_CTX}    numeroTelefonico
    ${enganche}=    Get From Dictionary    ${BES_CTX}    montoEnganche    default=${0}
    ${clase}=    Get From Dictionary    ${BES_CTX}    claseCredito    default=${EMPTY}
    &{pantalla}=    Create Dictionary    status=${200}    msisdn=${numero}
    ...    downPaymentAmount=${enganche}    creditClass=${clase}
    ...    installmentStatus=ACTIVE    cycle=MENSUAL
    Set To Dictionary    ${BES_CTX}    pantalla360=${pantalla}
    RETURN    ${pantalla}

Obtener Info Suscriptor BES
    [Documentation]    Invoca CustomerManagement Service.GetSubscriberInfo.
    ${clase}=    Get From Dictionary    ${BES_CTX}    claseCredito    default=${EMPTY}
    &{info}=    Create Dictionary    status=${200}    status_loan=ACTIVE
    ...    installmentStatus=ACTIVE    subsidyStatus=NONE    collectionProcessFlag=${FALSE}
    ...    creditClass=${clase}    projectType=AMIGO_PAGUITOS    cycle=MENSUAL
    Set To Dictionary    ${BES_CTX}    infoSuscriptor=${info}
    RETURN    ${info}

# ─────────────────────────── Cálculo ───────────────────────────

Calcular Cuotas Mensuales
    [Documentation]    Calcula primera, intermedias y última cuota; la última
    ...    absorbe el redondeo para que la suma sea exacta.
    [Arguments]    ${monto_financiar}    ${plazo}
    ${base}=    Evaluate    round(${monto_financiar} / ${plazo}, 2)
    @{cuotas}=    Create List
    FOR    ${i}    IN RANGE    ${plazo}
        &{cuota}=    Create Dictionary    numero=${i + 1}    amount=${base}
        Append To List    ${cuotas}    ${cuota}
    END
    ${acumulado}=    Evaluate    round(${base} * (${plazo} - 1), 2)
    ${ultima}=    Evaluate    round(${monto_financiar} - ${acumulado}, 2)
    ${ult_idx}=    Evaluate    ${plazo} - 1
    Set To Dictionary    ${cuotas}[${ult_idx}]    amount=${ultima}
    RETURN    ${cuotas}

Es Clase Credito Mensual
    [Documentation]    Devuelve True si la clase pertenece al ciclo mensual.
    [Arguments]    ${clase_credito}
    ${es_mensual}=    Run Keyword And Return Status
    ...    List Should Contain Value    ${BES_CLASES_MENSUAL}    ${clase_credito}
    RETURN    ${es_mensual}

Es Plazo Valido
    [Documentation]    Devuelve True si el plazo está en el catálogo de Amigo Paguitos.
    [Arguments]    ${plazo}
    ${es_valido}=    Run Keyword And Return Status
    ...    List Should Contain Value    ${BES_PLAZOS_VALIDOS}    ${plazo}
    RETURN    ${es_valido}

# ─────────────────────────── Validaciones ───────────────────────────

Validar Prestamo Creado Con Codigo
    [Documentation]    Verifica que BES creó el préstamo y respondió el código esperado.
    [Arguments]    ${codigo_esperado}
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCreacion
    Should Be Equal As Integers    ${resp}[status]    200
    Should Be Equal As Strings    ${resp}[responseCode]    ${codigo_esperado}

Validar Enganche Y Monto A Financiar Registrados
    [Documentation]    Verifica enganche, monto a financiar e impuestos en BES.
    ${data}=    Get From Dictionary    ${BES_CTX}    engancheRegistrado
    ${esperado}=    Get From Dictionary    ${BES_CTX}    montoEnganche
    Should Be Equal As Numbers    ${data}[downPaymentAmount]    ${esperado}
    Dictionary Should Contain Key    ${data}    financedAmount
    Dictionary Should Contain Key    ${data}    taxAmount
    Should Be True    ${data}[financedAmount] > 0
    Should Be True    ${data}[taxAmount] > 0

Validar Calculo De Cuotas Mensuales
    [Documentation]    Verifica que la primera, intermedias y última cuota sean correctas.
    ${data}=    Get From Dictionary    ${BES_CTX}    engancheRegistrado
    ${plazo}=    Get From Dictionary    ${BES_CTX}    plazo
    @{cuotas}=    Set Variable    ${data}[installments]
    Length Should Be    ${cuotas}    ${plazo}
    ${primera}=    Set Variable    ${cuotas}[0]
    ${ult_idx}=    Evaluate    ${plazo} - 1
    ${ultima}=    Set Variable    ${cuotas}[${ult_idx}]
    Should Be True    ${primera}[amount] > 0
    Should Be True    ${ultima}[amount] > 0
    ${suma}=    Set Variable    ${0}
    FOR    ${cuota}    IN    @{cuotas}
        ${suma}=    Evaluate    round(${suma} + ${cuota}[amount], 2)
    END
    Should Be Equal As Numbers    ${suma}    ${data}[financedAmount]

Validar Query Invoice Consistente Con Enganche
    [Documentation]    Verifica invoiceAmount, taxAmount y dueDate de ARService.QueryInvoice.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaQueryInvoice
    Should Be Equal As Integers    ${resp}[status]    200
    Dictionary Should Contain Key    ${resp}    invoiceAmount
    Dictionary Should Contain Key    ${resp}    taxAmount
    Dictionary Should Contain Key    ${resp}    dueDate
    ${enganche_reg}=    Get From Dictionary    ${BES_CTX}    engancheRegistrado
    Should Be Equal As Numbers    ${resp}[taxAmount]    ${enganche_reg}[taxAmount]

Validar Enganche En Pantalla 360 Coincide
    [Documentation]    Verifica que el enganche en pantalla 360 coincide con BES.
    ${existe}=    Run Keyword And Return Status    Get From Dictionary    ${BES_CTX}    pantalla360
    Run Keyword If    not ${existe}    Consultar Pantalla 360 De BES
    ${pantalla}=    Get From Dictionary    ${BES_CTX}    pantalla360
    ${esperado}=    Get From Dictionary    ${BES_CTX}    montoEnganche
    Should Be Equal As Numbers    ${pantalla}[downPaymentAmount]    ${esperado}

Validar Prestamo Rechazado Con Codigo
    [Documentation]    Verifica que BES rechazó la creación con el código esperado.
    [Arguments]    ${codigo_esperado}
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCreacion
    Should Be Equal As Strings    ${resp}[responseCode]    ${codigo_esperado}
    Should Not Be Equal As Strings    ${resp}[responseCode]    ${BES_RESPUESTA_EXITO}

Validar Mensaje Error Plazo No Disponible
    [Documentation]    Verifica que el mensaje de error indica plazo no disponible.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCreacion
    ${mensaje}=    Get From Dictionary    ${resp}    errorMessage
    ${mensaje_lower}=    Convert To Lower Case    ${mensaje}
    Should Contain    ${mensaje_lower}    plazo
    Should Contain    ${mensaje_lower}    no está disponible

Validar No Existe Prestamo Ni Calendario
    [Documentation]    Verifica que no se generó préstamo ni calendario de cobranza.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCreacion
    Should Not Be Equal As Strings    ${resp}[responseCode]    ${BES_RESPUESTA_EXITO}
    Dictionary Should Not Contain Key    ${resp}    loanId
    Dictionary Should Not Contain Key    ${resp}    collectionSchedule

Validar Pantalla 360 Muestra Estatus Y Ciclo
    [Documentation]    Verifica estatus del préstamo y ciclo de cobro mensual.
    ${info}=    Get From Dictionary    ${BES_CTX}    infoSuscriptor
    Should Be Equal As Integers    ${info}[status]    200
    Dictionary Should Contain Key    ${info}    status_loan
    Dictionary Should Contain Key    ${info}    installmentStatus
    Dictionary Should Contain Key    ${info}    subsidyStatus
    Dictionary Should Contain Key    ${info}    collectionProcessFlag
    Should Be Equal As Strings    ${info}[cycle]    MENSUAL

Validar Clase De Credito Mensual Y Proyecto
    [Documentation]    Verifica que la clase de crédito mensual y el proyecto son correctos.
    [Arguments]    ${clase_esperada}
    ${es_mensual}=    Es Clase Credito Mensual    ${clase_esperada}
    Should Be True    ${es_mensual}
    ${info}=    Get From Dictionary    ${BES_CTX}    infoSuscriptor
    Should Be Equal As Strings    ${info}[creditClass]    ${clase_esperada}
    Should Be Equal As Strings    ${info}[projectType]    AMIGO_PAGUITOS

Validar Estatus Coincide Con InstallmentStatus
    [Documentation]    Verifica consistencia del estatus entre pantalla 360 e info de BES.
    ${existe}=    Run Keyword And Return Status    Get From Dictionary    ${BES_CTX}    pantalla360
    Run Keyword If    not ${existe}    Consultar Pantalla 360 De BES
    ${pantalla}=    Get From Dictionary    ${BES_CTX}    pantalla360
    ${info}=    Get From Dictionary    ${BES_CTX}    infoSuscriptor
    Should Be Equal As Strings    ${pantalla}[installmentStatus]    ${info}[installmentStatus]

# ═══════════════════════════════════════════════════════════════════════
# AMPLIACIÓN APPEND-ONLY — TC013 / TC025 / TC030
# Financiamiento semanal (alta y consulta de desglose) y cancelación
# mensual sin parcialidades vencidas. Modelo determinista UAT.
# # Integración pendiente de validación con ESB BES-APAG en vivo
# ═══════════════════════════════════════════════════════════════════════

*** Variables ***
# --- Recursos OPEN API adicionales de BES ---
${BES_PATH_QUERY_INSTALLMENT_IMEI}     /TelcelCustomService/v1/queryInstallmentByIMEI
${BES_PATH_QUERY_INSTALLMENT}          /BCService/v1/QueryInstallment
${BES_PATH_CANCELAR_PRESTAMO}          /loan/v1/loans/cancel

# --- Catálogo de billcycle / estatus de cuota ---
${BES_BILLCYCLE_SEMANAL}               WEEKLY-AP
${BES_BILLCYCLE_MENSUAL}               MONTHLY-AP
${BES_ESTATUS_CUOTA_PAGADA}            PAGADA
${BES_ESTATUS_CUOTA_PENDIENTE}         PENDIENTE
${BES_ESTATUS_CUOTA_RETRASADA}         RETRASADA

# --- Estatus de préstamo ---
${BES_STATUS_ACTIVO}                   ACTIVO
${BES_STATUS_CANCELADO}                CANCELADO

# --- Parámetro de cálculo semanal (modelo determinista UAT) ---
${BES_FACTOR_SEMANAS_POR_MES}          ${4.345}
${BES_FECHA_BASE_CALENDARIO}           2026-05-17

*** Keywords ***
# ─────────────────────────── Localización de cliente ───────────────────────────

Localizar Cliente Por Service Number
    [Documentation]    Localiza al cliente prepago por su serviceNumber.
    [Arguments]    ${service_number}
    Set To Dictionary    ${BES_CTX}    serviceNumber=${service_number}
    Set To Dictionary    ${BES_CTX}    numeroTelefonico=${service_number}
    Set To Dictionary    ${BES_CTX}    accountId=${service_number}

Localizar Cliente Por Subscriber Id
    [Documentation]    Localiza al cliente prepago por su subscriberId.
    [Arguments]    ${subscriber_id}
    Set To Dictionary    ${BES_CTX}    subscriberId=${subscriber_id}

# ─────────────────────────── Cálculo semanal ───────────────────────────

Calcular Parcialidades Semanales
    [Documentation]    Calcula las parcialidades semanales; la última cuota
    ...    absorbe el ajuste de centavos para que la suma sea exacta.
    [Arguments]    ${monto_financiar}    ${num_parcialidades}
    ${base}=    Evaluate    round(${monto_financiar} / ${num_parcialidades}, 2)
    @{parcialidades}=    Create List
    FOR    ${i}    IN RANGE    ${num_parcialidades}
        ${vencimiento}=    Evaluate
        ...    (datetime.date(2026, 5, 17) + datetime.timedelta(weeks=${i} + 1)).isoformat()
        ...    modules=datetime
        &{cuota}=    Create Dictionary    secuencia=${i + 1}    amount=${base}
        ...    dueDate=${vencimiento}    status=${BES_ESTATUS_CUOTA_PENDIENTE}
        Append To List    ${parcialidades}    ${cuota}
    END
    ${acumulado}=    Evaluate    round(${base} * (${num_parcialidades} - 1), 2)
    ${ultima}=    Evaluate    round(${monto_financiar} - ${acumulado}, 2)
    ${ult_idx}=    Evaluate    ${num_parcialidades} - 1
    Set To Dictionary    ${parcialidades}[${ult_idx}]    amount=${ultima}
    RETURN    ${parcialidades}

Es Clase Credito Semanal
    [Documentation]    Devuelve True si la clase pertenece al ciclo semanal (SB/SM/SA).
    [Arguments]    ${clase_credito}
    ${es_semanal}=    Run Keyword And Return Status
    ...    List Should Contain Value    ${BES_CLASES_SEMANAL}    ${clase_credito}
    RETURN    ${es_semanal}

# ─────────────────────────── TC013 · Alta semanal 3 meses ───────────────────────────

Capturar Solicitud Financiamiento Semanal
    [Documentation]    Captura la solicitud de financiamiento semanal en CAC y
    ...    valida los campos obligatorios del cliente, crédito y equipo.
    [Arguments]    ${service_number}    ${imei}    ${plazo_meses}    ${monto_equipo}    ${clase_credito}
    Should Not Be Empty    ${service_number}
    Should Not Be Empty    ${imei}
    Should Not Be Empty    ${clase_credito}
    Should Be True    ${plazo_meses} > 0
    Should Be True    ${monto_equipo} > 0
    Set To Dictionary    ${BES_CTX}    serviceNumber=${service_number}    imei=${imei}
    Set To Dictionary    ${BES_CTX}    plazo=${plazo_meses}    montoEquipo=${monto_equipo}
    Configurar Clase De Credito    ${clase_credito}
    &{captura}=    Create Dictionary    status=${200}    camposObligatoriosValidos=${TRUE}
    Set To Dictionary    ${BES_CTX}    capturaSolicitud=${captura}

Enviar Solicitud Creacion Prestamo Semanal A BES
    [Documentation]    Envía la solicitud de creación de préstamo semanal a BES.
    ...    BES valida el esquema: inválido responde ESB1, correcto ESB0 con
    ...    creditoId, calendario de cobranza y cuotas calculadas.
    [Arguments]    ${clase_credito}
    ${es_semanal}=    Es Clase Credito Semanal    ${clase_credito}
    ${plazo}=    Get From Dictionary    ${BES_CTX}    plazo
    ${monto_equipo}=    Get From Dictionary    ${BES_CTX}    montoEquipo
    ${esquema_valido}=    Evaluate    ${es_semanal} and ${monto_equipo} > 0 and ${plazo} > 0
    IF    not ${esquema_valido}
        &{rechazo}=    Create Dictionary    status=${400}    responseCode=${BES_RESPUESTA_ERROR_VALID}
        ...    errorMessage=Esquema de request inválido para préstamo semanal
        Set To Dictionary    ${BES_CTX}    respuestaCreacion=${rechazo}
        RETURN
    END
    ${sn}=    Get From Dictionary    ${BES_CTX}    serviceNumber
    ${semanas}=    Evaluate    int(round(${plazo} * ${BES_FACTOR_SEMANAS_POR_MES}))
    ${monto_financiar}=    Evaluate    round(${monto_equipo} * (1 + ${BES_TASA_IMPUESTO}), 2)
    @{parcialidades}=    Calcular Parcialidades Semanales    ${monto_financiar}    ${semanas}
    ${credito_id}=    Set Variable    CR-${clase_credito}-${sn}
    ${subscriber_id}=    Set Variable    SUB-${sn}
    ${ipi}=    Set Variable    IPI-${sn}
    &{creacion}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
    ...    creditoId=${credito_id}
    Set To Dictionary    ${BES_CTX}    respuestaCreacion=${creacion}
    &{prestamo}=    Create Dictionary    creditoId=${credito_id}    claseCredito=${clase_credito}
    ...    plazoMeses=${plazo}    numParcialidades=${semanas}    montoFinanciar=${monto_financiar}
    ...    parcialidades=${parcialidades}    calendarioCobranza=${parcialidades}
    ...    subscriberId=${subscriber_id}    installmentPlanInstId=${ipi}
    ...    billcycleTypeId=${BES_BILLCYCLE_SEMANAL}    status=${BES_STATUS_ACTIVO}
    Set To Dictionary    ${BES_CTX}    prestamoSemanal=${prestamo}

Consultar Pantalla 360 Semanal
    [Documentation]    Consulta la pantalla 360 de BES vía CAC para el préstamo semanal.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanal
    ${sn}=    Get From Dictionary    ${BES_CTX}    serviceNumber
    &{pantalla}=    Create Dictionary    status=${200}    serviceNumber=${sn}
    ...    subscriberId=${p}[subscriberId]    installmentPlanInstId=${p}[installmentPlanInstId]
    ...    billcycleTypeId=${p}[billcycleTypeId]    status_loan=${p}[status]
    Set To Dictionary    ${BES_CTX}    pantalla360Semanal=${pantalla}
    RETURN    ${pantalla}

Validar Prestamo Semanal Creado Con Codigo
    [Documentation]    Verifica que BES creó el préstamo semanal con creditoId y código.
    [Arguments]    ${codigo_esperado}
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCreacion
    Should Be Equal As Integers    ${resp}[status]    200
    Should Be Equal As Strings    ${resp}[responseCode]    ${codigo_esperado}
    Dictionary Should Contain Key    ${resp}    creditoId

Validar Calendario Y Parcialidades Semanales
    [Documentation]    Verifica el calendario de cobranza y el ajuste de centavos
    ...    en la última parcialidad (la suma debe ser exacta).
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanal
    @{parc}=    Set Variable    ${p}[parcialidades]
    Length Should Be    ${parc}    ${p}[numParcialidades]
    Dictionary Should Contain Key    ${p}    calendarioCobranza
    ${suma}=    Set Variable    ${0}
    FOR    ${c}    IN    @{parc}
        ${suma}=    Evaluate    round(${suma} + ${c}[amount], 2)
    END
    Should Be Equal As Numbers    ${suma}    ${p}[montoFinanciar]

Validar Plazo Semanal Y Monto Parcialidad
    [Documentation]    Verifica que el plazo y el monto de parcialidad corresponden
    ...    a la clase de crédito semanal y al equipo seleccionado.
    [Arguments]    ${clase_esperada}    ${plazo_esperado}
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanal
    ${es_semanal}=    Es Clase Credito Semanal    ${clase_esperada}
    Should Be True    ${es_semanal}
    Should Be Equal As Strings    ${p}[claseCredito]    ${clase_esperada}
    Should Be Equal As Integers    ${p}[plazoMeses]    ${plazo_esperado}
    @{parc}=    Set Variable    ${p}[parcialidades]
    ${primera}=    Set Variable    ${parc}[0]
    Should Be True    ${primera}[amount] > 0

Validar Pantalla 360 Semanal Consistente
    [Documentation]    Verifica serviceNumber, subscriberId, installmentPlanInstId,
    ...    billcycleTypeId y status consistentes con el alta.
    ${pantalla}=    Get From Dictionary    ${BES_CTX}    pantalla360Semanal
    Should Be Equal As Integers    ${pantalla}[status]    200
    Dictionary Should Contain Key    ${pantalla}    serviceNumber
    Dictionary Should Contain Key    ${pantalla}    subscriberId
    Dictionary Should Contain Key    ${pantalla}    installmentPlanInstId
    Dictionary Should Contain Key    ${pantalla}    billcycleTypeId
    Should Be Equal As Strings    ${pantalla}[status_loan]    ${BES_STATUS_ACTIVO}

# ─────────────────────────── TC025 · Desglose cuotas semanal ───────────────────────────

Registrar Financiamiento Semanal Activo Con Pagos
    [Documentation]    Registra un financiamiento semanal activo con cuotas y pagos
    ...    (pagada, retrasada y pendientes) para la consulta de desglose.
    [Arguments]    ${plazo_meses}    ${clase_credito}    ${imei}
    Configurar Clase De Credito    ${clase_credito}
    Set To Dictionary    ${BES_CTX}    plazo=${plazo_meses}    imei=${imei}
    ${sn}=    Get From Dictionary    ${BES_CTX}    serviceNumber    default=${EMPTY}
    IF    '${sn}' == ''
        ${sn}=    Get From Dictionary    ${BES_CTX}    numeroTelefonico    default=5500000000
        Set To Dictionary    ${BES_CTX}    serviceNumber=${sn}
    END
    ${semanas}=    Evaluate    int(round(${plazo_meses} * ${BES_FACTOR_SEMANAS_POR_MES}))
    ${monto_financiar}=    Set Variable    ${4500.00}
    @{parc}=    Calcular Parcialidades Semanales    ${monto_financiar}    ${semanas}
    Set To Dictionary    ${parc}[0]    status=${BES_ESTATUS_CUOTA_PAGADA}
    Set To Dictionary    ${parc}[1]    status=${BES_ESTATUS_CUOTA_RETRASADA}
    ${subscriber_id}=    Set Variable    SUB-${sn}
    ${ipi}=    Set Variable    IPI-${sn}
    &{prestamo}=    Create Dictionary    creditoId=CR-${clase_credito}-${sn}
    ...    claseCredito=${clase_credito}    plazoMeses=${plazo_meses}    numParcialidades=${semanas}
    ...    montoFinanciar=${monto_financiar}    parcialidades=${parc}
    ...    subscriberId=${subscriber_id}    installmentPlanInstId=${ipi}    cusId=CUS-${sn}
    ...    billcycleTypeId=${BES_BILLCYCLE_SEMANAL}    status=${BES_STATUS_ACTIVO}
    Set To Dictionary    ${BES_CTX}    prestamoSemanal=${prestamo}

Acceder Pantalla 360 BES Semanal
    [Documentation]    Accede a la pantalla 360 de BES; BES recupera la información
    ...    del crédito mediante las OPEN APIs y responde ESB0.
    &{resp}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
    Set To Dictionary    ${BES_CTX}    respuestaPantalla360=${resp}
    RETURN    ${resp}

Invocar Query Installment Por IMEI
    [Documentation]    Invoca TelcelCustomService.queryInstallmentByIMEI con el IMEI.
    [Arguments]    ${imei}
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanal
    &{resp}=    Create Dictionary    status=${200}
    ...    installmentPlanInstId=${p}[installmentPlanInstId]    type=SEMANAL
    ...    installmentStatus=ACTIVE    subsidyStatus=NONE
    Set To Dictionary    ${BES_CTX}    respuestaQueryInstallmentImei=${resp}
    RETURN    ${resp}

Invocar Query Installment Por Cus Id
    [Documentation]    Invoca BCService.QueryInstallment con CusID e installmentPlanInstId.
    [Arguments]    ${cus_id}
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanal
    @{plan}=    Set Variable    ${p}[parcialidades]
    &{resp}=    Create Dictionary    status=${200}
    ...    installmentPlanInstId=${p}[installmentPlanInstId]    cusId=${cus_id}    planPago=${plan}
    Set To Dictionary    ${BES_CTX}    respuestaQueryInstallment=${resp}
    RETURN    ${resp}

Validar Acceso Pantalla 360 Responde
    [Documentation]    Verifica que el acceso a la pantalla 360 responde el código esperado.
    [Arguments]    ${codigo_esperado}
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaPantalla360
    Should Be Equal As Integers    ${resp}[status]    200
    Should Be Equal As Strings    ${resp}[responseCode]    ${codigo_esperado}

Validar Query Installment Por IMEI Retorna Datos
    [Documentation]    Verifica installmentPlanInstId, type, installmentStatus y subsidyStatus.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaQueryInstallmentImei
    Should Be Equal As Integers    ${resp}[status]    200
    Dictionary Should Contain Key    ${resp}    installmentPlanInstId
    Dictionary Should Contain Key    ${resp}    type
    Dictionary Should Contain Key    ${resp}    installmentStatus
    Dictionary Should Contain Key    ${resp}    subsidyStatus

Validar Plan De Pago Completo
    [Documentation]    Verifica que se retorna el plan de pago completo con el desglose.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaQueryInstallment
    Should Be Equal As Integers    ${resp}[status]    200
    @{plan}=    Set Variable    ${resp}[planPago]
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanal
    Length Should Be    ${plan}    ${p}[numParcialidades]

Validar Desglose Cuotas En Pantalla 360
    [Documentation]    Verifica que cada cuota muestra número/secuencia, monto,
    ...    fecha de vencimiento y estatus (pagada, pendiente, retrasada).
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaQueryInstallment
    @{plan}=    Set Variable    ${resp}[planPago]
    @{estatus_validos}=    Create List
    ...    ${BES_ESTATUS_CUOTA_PAGADA}    ${BES_ESTATUS_CUOTA_PENDIENTE}    ${BES_ESTATUS_CUOTA_RETRASADA}
    FOR    ${cuota}    IN    @{plan}
        Dictionary Should Contain Key    ${cuota}    secuencia
        Dictionary Should Contain Key    ${cuota}    amount
        Dictionary Should Contain Key    ${cuota}    dueDate
        Dictionary Should Contain Key    ${cuota}    status
        List Should Contain Value    ${estatus_validos}    ${cuota}[status]
        Should Be True    ${cuota}[amount] > 0
    END

Validar Consistencia Campos Credito Semanal
    [Documentation]    Verifica serviceNumber, subscriberId, billcycleTypeId, status
    ...    e installmentPlanInstId consistentes con la clase de crédito semanal.
    [Arguments]    ${clase_esperada}
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanal
    ${es_semanal}=    Es Clase Credito Semanal    ${clase_esperada}
    Should Be True    ${es_semanal}
    Should Be Equal As Strings    ${p}[claseCredito]    ${clase_esperada}
    Dictionary Should Contain Key    ${p}    subscriberId
    Dictionary Should Contain Key    ${p}    installmentPlanInstId
    Dictionary Should Contain Key    ${p}    billcycleTypeId
    Should Be Equal As Strings    ${p}[status]    ${BES_STATUS_ACTIVO}

# ─────────────────────────── TC030 · Cancelación mensual 12m ───────────────────────────

Registrar Financiamiento Mensual Activo Sin Parcialidades Vencidas
    [Documentation]    Registra un financiamiento mensual a 12 meses activo, con
    ...    parcialidades pagadas/pendientes y SIN parcialidades vencidas.
    [Arguments]    ${plazo_meses}    ${clase_credito}    ${subscriber_id}
    Configurar Clase De Credito    ${clase_credito}
    Set To Dictionary    ${BES_CTX}    plazo=${plazo_meses}    subscriberId=${subscriber_id}
    ${monto_financiar}=    Set Variable    ${12000.00}
    @{cuotas}=    Calcular Cuotas Mensuales    ${monto_financiar}    ${plazo_meses}
    FOR    ${c}    IN    @{cuotas}
        Set To Dictionary    ${c}    status=${BES_ESTATUS_CUOTA_PENDIENTE}
    END
    Set To Dictionary    ${cuotas}[0]    status=${BES_ESTATUS_CUOTA_PAGADA}
    Set To Dictionary    ${cuotas}[1]    status=${BES_ESTATUS_CUOTA_PAGADA}
    &{prestamo}=    Create Dictionary    creditoId=CR-${clase_credito}-${subscriber_id}
    ...    claseCredito=${clase_credito}    plazoMeses=${plazo_meses}    montoFinanciar=${monto_financiar}
    ...    parcialidades=${cuotas}    subscriberId=${subscriber_id}
    ...    installmentPlanInstId=IPI-${subscriber_id}    billcycleTypeId=${BES_BILLCYCLE_MENSUAL}
    ...    status=${BES_STATUS_ACTIVO}    collectionProcessFlag=${TRUE}    parcialidadesVencidas=${0}
    Set To Dictionary    ${BES_CTX}    prestamoMensual=${prestamo}

Iniciar Cancelacion Financiamiento Mensual
    [Documentation]    Inicia la cancelación en BES; valida que no existan
    ...    parcialidades vencidas antes de iniciar.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoMensual
    ${vencidas}=    Set Variable    ${p}[parcialidadesVencidas]
    IF    ${vencidas} > 0
        &{resp}=    Create Dictionary    status=${409}    responseCode=${BES_RESPUESTA_ERROR_VALID}
        ...    errorMessage=El financiamiento tiene parcialidades vencidas    cancelacionIniciada=${FALSE}
    ELSE
        &{resp}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
        ...    cancelacionIniciada=${TRUE}
    END
    Set To Dictionary    ${BES_CTX}    respuestaCancelacion=${resp}
    RETURN    ${resp}

Procesar Manejo De Saldo Y Parcialidades En Cancelacion
    [Documentation]    BES procesa la cancelación respetando los pagos acreditados
    ...    sin aplicar penalización en esta fase.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoMensual
    @{parc}=    Set Variable    ${p}[parcialidades]
    ${pagadas}=    Set Variable    ${0}
    FOR    ${c}    IN    @{parc}
        IF    '${c}[status]' == '${BES_ESTATUS_CUOTA_PAGADA}'
            ${pagadas}=    Evaluate    ${pagadas} + 1
        END
    END
    &{saldo}=    Create Dictionary    pagosAcreditados=${pagadas}    penalizacionAplicada=${FALSE}
    Set To Dictionary    ${BES_CTX}    manejoSaldo=${saldo}
    RETURN    ${saldo}

Reflejar Cancelacion En CPS
    [Documentation]    CPS refleja la cancelación de manera consistente y registra
    ...    los Charge Codes asociados.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoMensual
    &{cps}=    Create Dictionary    status=${200}    cancelacionReflejada=${TRUE}
    ...    chargeCodes=CPS-CANCEL-${p}[subscriberId]
    Set To Dictionary    ${BES_CTX}    cpsCancelacion=${cps}
    RETURN    ${cps}

Confirmar Cambio Estatus A Cancelado
    [Documentation]    Cambia el status del préstamo a cancelado y actualiza
    ...    collectionProcessFlag.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoMensual
    Set To Dictionary    ${p}    status=${BES_STATUS_CANCELADO}    collectionProcessFlag=${FALSE}
    Set To Dictionary    ${BES_CTX}    prestamoMensual=${p}

Consultar Pantalla 360 Financiamiento Cancelado
    [Documentation]    Consulta la pantalla 360 de BES vía CAC del financiamiento
    ...    cancelado con trazabilidad.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoMensual
    &{pantalla}=    Create Dictionary    status=${200}    subscriberId=${p}[subscriberId]
    ...    installmentPlanInstId=${p}[installmentPlanInstId]    status_loan=${p}[status]
    ...    parcialidadesVencidas=${p}[parcialidadesVencidas]    trazabilidad=CANCELACION-OK
    Set To Dictionary    ${BES_CTX}    pantalla360Cancelacion=${pantalla}
    RETURN    ${pantalla}

Validar Cancelacion Iniciada Sin Parcialidades Vencidas
    [Documentation]    Verifica que BES inició la cancelación sin parcialidades vencidas.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCancelacion
    Should Be Equal As Integers    ${resp}[status]    200
    Should Be Equal As Strings    ${resp}[responseCode]    ${BES_RESPUESTA_EXITO}
    Should Be True    ${resp}[cancelacionIniciada]
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoMensual
    Should Be Equal As Integers    ${p}[parcialidadesVencidas]    0

Validar Saldo Procesado Sin Penalizacion
    [Documentation]    Verifica que se respetan los pagos acreditados sin penalización.
    ${saldo}=    Get From Dictionary    ${BES_CTX}    manejoSaldo
    Should Be True    ${saldo}[pagosAcreditados] >= 0
    Should Not Be True    ${saldo}[penalizacionAplicada]

Validar Reflejo En CPS Y Charge Codes
    [Documentation]    Verifica que CPS refleja la cancelación y los Charge Codes.
    ${cps}=    Get From Dictionary    ${BES_CTX}    cpsCancelacion
    Should Be Equal As Integers    ${cps}[status]    200
    Should Be True    ${cps}[cancelacionReflejada]
    Dictionary Should Contain Key    ${cps}    chargeCodes

Validar Estatus Prestamo Cancelado
    [Documentation]    Verifica que el status del préstamo es cancelado y
    ...    collectionProcessFlag actualizado.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoMensual
    Should Be Equal As Strings    ${p}[status]    ${BES_STATUS_CANCELADO}
    Should Not Be True    ${p}[collectionProcessFlag]

Validar Pantalla 360 Muestra Financiamiento Cancelado
    [Documentation]    Verifica el financiamiento cancelado con trazabilidad y
    ...    sin parcialidades vencidas.
    ${pantalla}=    Get From Dictionary    ${BES_CTX}    pantalla360Cancelacion
    Should Be Equal As Integers    ${pantalla}[status]    200
    Should Be Equal As Strings    ${pantalla}[status_loan]    ${BES_STATUS_CANCELADO}
    Should Be Equal As Integers    ${pantalla}[parcialidadesVencidas]    0
    Dictionary Should Contain Key    ${pantalla}    trazabilidad
