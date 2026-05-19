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

# ═══════════════════════════════════════════════════════════════════════
# AMPLIACIÓN APPEND-ONLY — TC001 / TC010 / TC025
# TC001: alta financiamiento Semanal 3 meses clase SB vía AP.AG desde CAC.
# TC010: consulta de saldo y desglose de cuotas en Vista 360 desde CAC.
# TC025: alta con datos de cliente incompletos (esquema inválido → ESB1).
# Modelo determinista UAT.
# # Integración pendiente de validación con ESB BES-APAG en vivo
# # Locators pendientes de validación con app en vivo
# ═══════════════════════════════════════════════════════════════════════

*** Variables ***
# --- Ciclo de crédito ---
${BES_CICLO_SEMANAL}                   SEMANAL
${BES_CICLO_MENSUAL}                   MENSUAL

# --- Trazabilidad de integración AP.AG → BES ---
${BES_ORIGEN_APAG}                     AP.AG

*** Keywords ***
# ─────────────────────────── TC001 · Alta semanal 3m clase SB vía AP.AG ───────────────────────────

Formalizar Venta Y Financiamiento Semanal En APAG
    [Documentation]    AP.AG formaliza la venta, oferta y enganche y arma la
    ...    solicitud de creación de préstamo semanal (cliente, préstamo y equipo).
    [Arguments]    ${service_number}    ${imei}    ${plazo_meses}    ${clase_credito}    ${monto_equipo}
    Should Not Be Empty    ${service_number}
    Should Not Be Empty    ${imei}
    Should Not Be Empty    ${clase_credito}
    Should Be True    ${plazo_meses} > 0
    Should Be True    ${monto_equipo} > 0
    Set To Dictionary    ${BES_CTX}    serviceNumber=${service_number}    imei=${imei}
    Set To Dictionary    ${BES_CTX}    plazo=${plazo_meses}    montoEquipo=${monto_equipo}
    Configurar Clase De Credito    ${clase_credito}
    &{cliente}=    Create Dictionary    serviceNumber=${service_number}    imei=${imei}
    ...    nombreCliente=CLIENTE PREPAGO ${service_number}    origen=${BES_ORIGEN_APAG}
    &{venta}=    Create Dictionary    status=${200}    formalizada=${TRUE}
    ...    cicloCredito=${BES_CICLO_SEMANAL}    plazoMeses=${plazo_meses}    claseCredito=${clase_credito}
    Set To Dictionary    ${BES_CTX}    ventaFormalizada=${venta}    datosCliente=${cliente}

Disparar Transferencia Creacion Prestamo Semanal A BES
    [Documentation]    AP.AG invoca la API de creación de préstamo de BES con el
    ...    REQUEST bien formado. BES valida esquema y responde ESB0 sin reintento.
    ${clase}=    Get From Dictionary    ${BES_CTX}    claseCredito
    ${plazo}=    Get From Dictionary    ${BES_CTX}    plazo
    ${monto_equipo}=    Get From Dictionary    ${BES_CTX}    montoEquipo
    ${sn}=    Get From Dictionary    ${BES_CTX}    serviceNumber
    ${es_semanal}=    Es Clase Credito Semanal    ${clase}
    ${plazo_valido}=    Es Plazo Valido    ${plazo}
    ${esquema_valido}=    Evaluate    ${es_semanal} and ${plazo_valido} and ${monto_equipo} > 0
    IF    not ${esquema_valido}
        &{rechazo}=    Create Dictionary    status=${400}    responseCode=${BES_RESPUESTA_ERROR_VALID}
        ...    reintentoAplicado=${FALSE}    errorMessage=Esquema de request inválido para préstamo semanal
        Set To Dictionary    ${BES_CTX}    respuestaCreacion=${rechazo}
        RETURN
    END
    ${semanas}=    Evaluate    int(round(${plazo} * ${BES_FACTOR_SEMANAS_POR_MES}))
    ${monto_financiar}=    Evaluate    round(${monto_equipo} * (1 + ${BES_TASA_IMPUESTO}), 2)
    @{parcialidades}=    Calcular Parcialidades Semanales    ${monto_financiar}    ${semanas}
    ${credito_id}=    Set Variable    CR-${clase}-${sn}
    &{creacion}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
    ...    reintentoAplicado=${FALSE}    creditoId=${credito_id}
    Set To Dictionary    ${BES_CTX}    respuestaCreacion=${creacion}
    ${cliente}=    Get From Dictionary    ${BES_CTX}    datosCliente
    &{prestamo}=    Create Dictionary    creditoId=${credito_id}    claseCredito=${clase}
    ...    cicloCredito=${BES_CICLO_SEMANAL}    plazoMeses=${plazo}    numParcialidades=${semanas}
    ...    montoFinanciar=${monto_financiar}    parcialidades=${parcialidades}
    ...    calendarioCobranza=${parcialidades}    subscriberId=SUB-${sn}
    ...    installmentPlanInstId=IPI-${sn}    billcycleTypeId=${BES_BILLCYCLE_SEMANAL}
    ...    status=${BES_STATUS_ACTIVO}    datosCliente=${cliente}    imei=${cliente}[imei]
    ...    controladoPorBES=${TRUE}
    Set To Dictionary    ${BES_CTX}    prestamoSemanalAlta=${prestamo}

Validar Esquema Y Respuesta ESB0 Sin Reintento
    [Documentation]    Verifica que BES validó el esquema y respondió el código
    ...    de ejecución exitosa sin aplicar reintento.
    [Arguments]    ${codigo_esperado}
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCreacion
    Should Be Equal As Integers    ${resp}[status]    200
    Should Be Equal As Strings    ${resp}[responseCode]    ${codigo_esperado}
    Should Not Be True    ${resp}[reintentoAplicado]
    Dictionary Should Contain Key    ${resp}    creditoId

Validar Correspondencia Ciclo Semanal Plazo Y Clase
    [Documentation]    BES-CRM valida que el ciclo Semanal y el plazo correspondan
    ...    a la clase de crédito y que el préstamo quede en estatus Activo.
    [Arguments]    ${clase_esperada}    ${plazo_esperado}
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanalAlta
    ${es_semanal}=    Es Clase Credito Semanal    ${clase_esperada}
    Should Be True    ${es_semanal}
    Should Be Equal As Strings    ${p}[claseCredito]    ${clase_esperada}
    Should Be Equal As Strings    ${p}[cicloCredito]    ${BES_CICLO_SEMANAL}
    Should Be Equal As Integers    ${p}[plazoMeses]    ${plazo_esperado}
    ${plazo_valido}=    Es Plazo Valido    ${p}[plazoMeses]
    Should Be True    ${plazo_valido}
    Should Be Equal As Strings    ${p}[status]    ${BES_STATUS_ACTIVO}

Verificar Registro Prestamo Desglose Y Calendario
    [Documentation]    Verifica el registro del préstamo, el desglose de cuotas
    ...    semanales y el calendario de cobranza controlado por BES, así como los
    ...    datos de cliente y equipo.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanalAlta
    @{parc}=    Set Variable    ${p}[parcialidades]
    Length Should Be    ${parc}    ${p}[numParcialidades]
    Dictionary Should Contain Key    ${p}    calendarioCobranza
    Should Be True    ${p}[controladoPorBES]
    ${cli}=    Get From Dictionary    ${p}    datosCliente
    ${sn}=    Get From Dictionary    ${BES_CTX}    serviceNumber
    Should Be Equal As Strings    ${cli}[serviceNumber]    ${sn}
    ${imei}=    Get From Dictionary    ${BES_CTX}    imei
    Should Be Equal As Strings    ${p}[imei]    ${imei}
    ${suma}=    Set Variable    ${0}
    FOR    ${c}    IN    @{parc}
        Dictionary Should Contain Key    ${c}    dueDate
        Dictionary Should Contain Key    ${c}    status
        Should Be True    ${c}[amount] > 0
        ${suma}=    Evaluate    round(${suma} + ${c}[amount], 2)
    END
    Should Be Equal As Numbers    ${suma}    ${p}[montoFinanciar]

Consultar Pantalla 360 Alta Semanal Desde CAC
    [Documentation]    Consulta el financiamiento en la pantalla 360 de BES vía CAC.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoSemanalAlta
    ${sn}=    Get From Dictionary    ${BES_CTX}    serviceNumber
    &{pantalla}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
    ...    serviceNumber=${sn}    creditoId=${p}[creditoId]    claseCredito=${p}[claseCredito]
    ...    numParcialidades=${p}[numParcialidades]    parcialidades=${p}[parcialidades]
    ...    status_loan=${p}[status]
    Set To Dictionary    ${BES_CTX}    pantalla360Alta=${pantalla}
    RETURN    ${pantalla}

Validar Pantalla 360 Despliega Datos Cliente Cuotas Y Estatus
    [Documentation]    Verifica que la pantalla 360 despliega datos del cliente,
    ...    desglose de cuotas, fechas de vencimiento y estatus del préstamo.
    ${pantalla}=    Get From Dictionary    ${BES_CTX}    pantalla360Alta
    Should Be Equal As Integers    ${pantalla}[status]    200
    Should Be Equal As Strings    ${pantalla}[responseCode]    ${BES_RESPUESTA_EXITO}
    Dictionary Should Contain Key    ${pantalla}    serviceNumber
    Dictionary Should Contain Key    ${pantalla}    parcialidades
    @{parc}=    Set Variable    ${pantalla}[parcialidades]
    Should Be True    len(${parc}) > 0
    FOR    ${c}    IN    @{parc}
        Dictionary Should Contain Key    ${c}    dueDate
        Dictionary Should Contain Key    ${c}    status
    END
    Should Be Equal As Strings    ${pantalla}[status_loan]    ${BES_STATUS_ACTIVO}

# ─────────────────────────── TC010 · Consulta saldo y desglose en 360 ───────────────────────────

Registrar Financiamiento Activo Transferido Desde APAG
    [Documentation]    Registra un financiamiento activo creado con al menos el
    ...    enganche acreditado, con la información transferida desde AP.AG.
    [Arguments]    ${service_number}    ${imei}    ${plazo_meses}    ${clase_credito}    ${monto_financiado}    ${monto_enganche}
    Should Not Be Empty    ${service_number}
    Should Not Be Empty    ${imei}
    Should Be True    ${monto_financiado} > 0
    Should Be True    ${monto_enganche} >= 0
    Set To Dictionary    ${BES_CTX}    serviceNumber=${service_number}    imei=${imei}
    Set To Dictionary    ${BES_CTX}    numeroTelefonico=${service_number}
    Configurar Clase De Credito    ${clase_credito}
    ${num}=    Evaluate    int(round(${plazo_meses} * ${BES_FACTOR_SEMANAS_POR_MES}))
    @{parc}=    Calcular Parcialidades Semanales    ${monto_financiado}    ${num}
    Set To Dictionary    ${parc}[0]    status=${BES_ESTATUS_CUOTA_PAGADA}
    ${pagado_cuotas}=    Set Variable    ${parc}[0][amount]
    ${monto_pagado}=    Evaluate    round(${monto_enganche} + ${pagado_cuotas}, 2)
    ${saldo_actual}=    Evaluate    round(${monto_financiado} - ${pagado_cuotas}, 2)
    &{apag}=    Create Dictionary    serviceNumber=${service_number}    imei=${imei}
    ...    claseCredito=${clase_credito}    plazoMeses=${plazo_meses}    numParcialidades=${num}
    ...    montoFinanciado=${monto_financiado}    montoEnganche=${monto_enganche}
    &{prestamo}=    Create Dictionary    creditoId=CR-${clase_credito}-${service_number}
    ...    claseCredito=${clase_credito}    plazoMeses=${plazo_meses}    numParcialidades=${num}
    ...    montoFinanciado=${monto_financiado}    montoEnganche=${monto_enganche}
    ...    montoPagado=${monto_pagado}    saldoActual=${saldo_actual}    parcialidades=${parc}
    ...    subscriberId=SUB-${service_number}    installmentPlanInstId=IPI-${service_number}
    ...    billcycleTypeId=${BES_BILLCYCLE_SEMANAL}    status=${BES_STATUS_ACTIVO}
    ...    serviceNumber=${service_number}    imei=${imei}
    Set To Dictionary    ${BES_CTX}    prestamoActivo360=${prestamo}    datosAPAG=${apag}

Buscar Cliente Y Abrir Pantalla 360 BES Desde CAC
    [Documentation]    Busca al cliente y abre la pantalla 360 de BES desde CAC;
    ...    se despliega la información general del crédito.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoActivo360
    &{pantalla}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
    ...    serviceNumber=${p}[serviceNumber]    creditoId=${p}[creditoId]
    ...    claseCredito=${p}[claseCredito]    status_loan=${p}[status]
    ...    subscriberId=${p}[subscriberId]    installmentPlanInstId=${p}[installmentPlanInstId]
    Set To Dictionary    ${BES_CTX}    pantalla360Saldo=${pantalla}
    RETURN    ${pantalla}

Consultar Saldo Vigente Del Financiamiento
    [Documentation]    Consulta el saldo vigente: saldo actual, monto financiado
    ...    y monto pagado.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoActivo360
    &{saldo}=    Create Dictionary    status=${200}    saldoActual=${p}[saldoActual]
    ...    montoFinanciado=${p}[montoFinanciado]    montoPagado=${p}[montoPagado]
    Set To Dictionary    ${BES_CTX}    saldoFinanciamiento=${saldo}
    RETURN    ${saldo}

Consultar Desglose De Cuotas Del Financiamiento
    [Documentation]    Consulta el desglose de cuotas del financiamiento.
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoActivo360
    &{desglose}=    Create Dictionary    status=${200}    numParcialidades=${p}[numParcialidades]
    ...    parcialidades=${p}[parcialidades]
    Set To Dictionary    ${BES_CTX}    desgloseCuotas360=${desglose}
    RETURN    ${desglose}

Validar Informacion General Credito Desplegada
    [Documentation]    Verifica que la pantalla 360 despliega la información
    ...    general del crédito asociada al cliente.
    ${pantalla}=    Get From Dictionary    ${BES_CTX}    pantalla360Saldo
    Should Be Equal As Integers    ${pantalla}[status]    200
    Should Be Equal As Strings    ${pantalla}[responseCode]    ${BES_RESPUESTA_EXITO}
    Dictionary Should Contain Key    ${pantalla}    creditoId
    Dictionary Should Contain Key    ${pantalla}    claseCredito
    Should Be Equal As Strings    ${pantalla}[status_loan]    ${BES_STATUS_ACTIVO}

Validar Saldo Monto Financiado Y Pagado
    [Documentation]    Verifica que el saldo actual, el monto financiado y el
    ...    monto pagado sean correctos y consistentes.
    ${s}=    Get From Dictionary    ${BES_CTX}    saldoFinanciamiento
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoActivo360
    Should Be Equal As Integers    ${s}[status]    200
    Should Be True    ${s}[montoFinanciado] > 0
    Should Be True    ${s}[montoPagado] >= 0
    Should Be True    ${s}[saldoActual] >= 0
    Should Be True    ${s}[montoPagado] >= ${p}[montoEnganche]
    ${dif}=    Evaluate    round(${s}[montoFinanciado] - ${s}[saldoActual], 2)
    Should Be True    ${dif} >= 0

Validar Desglose Numero Importe Fechas Y Estatus
    [Documentation]    Verifica número de parcialidades, importe por cuota,
    ...    fechas de vencimiento y estatus del préstamo.
    ${d}=    Get From Dictionary    ${BES_CTX}    desgloseCuotas360
    @{parc}=    Set Variable    ${d}[parcialidades]
    Length Should Be    ${parc}    ${d}[numParcialidades]
    @{estatus_validos}=    Create List
    ...    ${BES_ESTATUS_CUOTA_PAGADA}    ${BES_ESTATUS_CUOTA_PENDIENTE}    ${BES_ESTATUS_CUOTA_RETRASADA}
    FOR    ${c}    IN    @{parc}
        Dictionary Should Contain Key    ${c}    secuencia
        Dictionary Should Contain Key    ${c}    amount
        Dictionary Should Contain Key    ${c}    dueDate
        Dictionary Should Contain Key    ${c}    status
        List Should Contain Value    ${estatus_validos}    ${c}[status]
        Should Be True    ${c}[amount] > 0
    END

Validar Consistencia Datos Contra APAG
    [Documentation]    Verifica que los datos de cliente, préstamo y equipo
    ...    coinciden con la información transferida por AP.AG.
    ${apag}=    Get From Dictionary    ${BES_CTX}    datosAPAG
    ${p}=    Get From Dictionary    ${BES_CTX}    prestamoActivo360
    Should Be Equal As Strings    ${p}[serviceNumber]    ${apag}[serviceNumber]
    Should Be Equal As Strings    ${p}[imei]    ${apag}[imei]
    Should Be Equal As Strings    ${p}[claseCredito]    ${apag}[claseCredito]
    Should Be Equal As Integers    ${p}[numParcialidades]    ${apag}[numParcialidades]
    Should Be Equal As Numbers    ${p}[montoFinanciado]    ${apag}[montoFinanciado]

# ─────────────────────────── TC025 · Datos de cliente incompletos → ESB1 ───────────────────────────

Formalizar Venta En APAG Con Datos Cliente Incompletos
    [Documentation]    AP.AG formaliza la venta y genera el REQUEST de creación de
    ...    préstamo OMITIENDO campos obligatorios de la información del cliente.
    [Arguments]    ${imei}    ${plazo_meses}    ${monto_equipo}    ${clase_credito}
    Should Not Be Empty    ${imei}
    Set To Dictionary    ${BES_CTX}    imei=${imei}    plazo=${plazo_meses}
    Set To Dictionary    ${BES_CTX}    montoEquipo=${monto_equipo}
    Configurar Clase De Credito    ${clase_credito}
    @{faltantes}=    Create List    serviceNumber    nombreCliente    curp
    &{cliente}=    Create Dictionary    serviceNumber=${EMPTY}    nombreCliente=${EMPTY}
    ...    curp=${EMPTY}    imei=${imei}
    &{request}=    Create Dictionary    sendBy=${BES_ORIGEN_APAG}    user=USR-APAG
    ...    token=TKN-UAT    clientId=CLI-UAT    cliente=${cliente}    plazoMeses=${plazo_meses}
    ...    montoEquipo=${monto_equipo}    claseCredito=${clase_credito}
    Set To Dictionary    ${BES_CTX}    requestCreacion=${request}    camposObligatorios=${faltantes}

Enviar Request Creacion Prestamo Con Datos Incompletos A BES
    [Documentation]    BES recibe e intenta validar el esquema del mensaje; al
    ...    detectar el incumplimiento de obligatoriedad responde ESB1 sin reintento
    ...    y propaga el error hacia AP.AG.
    ${request}=    Get From Dictionary    ${BES_CTX}    requestCreacion
    ${cliente}=    Get From Dictionary    ${request}    cliente
    @{obligatorios}=    Get From Dictionary    ${BES_CTX}    camposObligatorios
    @{detectados}=    Create List
    FOR    ${campo}    IN    @{obligatorios}
        ${valor}=    Get From Dictionary    ${cliente}    ${campo}
        IF    '${valor}' == ''
            Append To List    ${detectados}    ${campo}
        END
    END
    ${esquema_valido}=    Evaluate    len(${detectados}) == 0
    IF    ${esquema_valido}
        &{resp}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
        ...    reintentoAplicado=${FALSE}    camposFaltantes=${detectados}
    ELSE
        &{resp}=    Create Dictionary    status=${400}    responseCode=${BES_RESPUESTA_ERROR_VALID}
        ...    reintentoAplicado=${FALSE}    camposFaltantes=${detectados}
        ...    errorMessage=Campos obligatorios de cliente faltantes o incompletos
    END
    Set To Dictionary    ${BES_CTX}    respuestaCreacion=${resp}
    &{apag}=    Create Dictionary    recibido=${TRUE}    responseCode=${resp}[responseCode]
    ...    ventaFormalizadaEnBES=${esquema_valido}    camposFaltantes=${detectados}
    Set To Dictionary    ${BES_CTX}    respuestaAPAG=${apag}

Validar Respuesta Error Esquema ESB1 Sin Reintento
    [Documentation]    Verifica que BES respondió error de esquema del mensaje de
    ...    entrada sin aplicar reintento.
    [Arguments]    ${codigo_esperado}
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCreacion
    Should Be Equal As Integers    ${resp}[status]    400
    Should Be Equal As Strings    ${resp}[responseCode]    ${codigo_esperado}
    Should Not Be Equal As Strings    ${resp}[responseCode]    ${BES_RESPUESTA_EXITO}
    Should Not Be True    ${resp}[reintentoAplicado]

Validar No Se Crea Prestamo Ni Registro Parcial
    [Documentation]    Verifica que BES no crea financiamiento ni genera registro
    ...    parcial.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaCreacion
    Dictionary Should Not Contain Key    ${resp}    creditoId
    Dictionary Should Not Contain Key    ${resp}    loanId
    ${tiene_alta}=    Run Keyword And Return Status
    ...    Dictionary Should Contain Key    ${BES_CTX}    prestamoSemanalAlta
    Should Not Be True    ${tiene_alta}
    ${tiene_activo}=    Run Keyword And Return Status
    ...    Dictionary Should Contain Key    ${BES_CTX}    prestamoActivo360
    Should Not Be True    ${tiene_activo}

Validar Error Propagado Hacia APAG Con Campos Faltantes
    [Documentation]    Verifica que la respuesta de error se propaga hacia AP.AG
    ...    indicando los campos obligatorios faltantes y que la venta no se
    ...    formaliza en BES.
    [Arguments]    ${codigo_esperado}
    ${apag}=    Get From Dictionary    ${BES_CTX}    respuestaAPAG
    Should Be True    ${apag}[recibido]
    Should Be Equal As Strings    ${apag}[responseCode]    ${codigo_esperado}
    Should Not Be True    ${apag}[ventaFormalizadaEnBES]
    @{faltantes}=    Set Variable    ${apag}[camposFaltantes]
    Should Be True    len(${faltantes}) > 0

# ═══════════════════════════════════════════════════════════════════════
# AMPLIACIÓN APPEND-ONLY — TC005 / TC016 / TC051
# TC005: Activación Chip Express Offer ID 1013 (Amigo Chip Express Sin
#        Límite R09) Prepago en CAC, SKU 7008294 (Prod 1).
# TC016: Cambio de SIM Prepago en CAC con cobro de $50, SIM Universal
#        Prod 2 SKU 7009251.
# TC051: Bloqueo de facturación de más de una SIM por el mismo IMEI en
#        CAC Prepago (1 SIM por Equipo).
# Modelo determinista UAT (ESB BES-APAG / UPC no accesibles desde este
# entorno).
# # Integración pendiente de validación con ESB BES-APAG en vivo
# # Locators pendientes de validación con app en vivo
# ═══════════════════════════════════════════════════════════════════════

*** Variables ***
# --- Recursos OPEN API adicionales de BES (SIM Universal 2026) ---
${BES_PATH_NEW_SUBSCRIBER}             /CustomerManagement/v1/newSubscriber
${BES_PATH_CHANGE_SIM}                 /CustomerManagement/v1/changeSIM
${BES_PATH_QUERY_SIM_BY_IMEI}          /TelcelCustomService/v1/querySIMByIMEI
${BES_PATH_CATALOGO_UPC}               /upc/v1/catalog/products

# --- Catálogo SIM Universal 2026 (Prod 1 / Prod 2) ---
${BES_SKU_CHIP_EXPRESS}                7008294
${BES_SKU_SIM_UNIVERSAL_PROD2}         7009251
${BES_ETIQUETA_PRODUCTO_1}             Producto 1
${BES_ETIQUETA_PRODUCTO_2}             Producto 2

# --- Offer IDs (Amigo Chip Express) ---
${BES_OFFER_CHIP_EXPRESS_R09}          1013
${BES_OFFER_NOMBRE_R09}                Amigo Chip Express Sin Limite R09

# --- Precios Chip Express (Prod 1) ---
${BES_PRECIO_CANAL_CHIP_EXPRESS}       ${15}
${BES_PRECIO_CLIENTE_CHIP_EXPRESS}     ${29}

# --- Precio Cambio de SIM Prepago en CAC ---
${BES_PRECIO_CAMBIO_SIM_PREPAGO}       ${50}

# --- Motivos del Cambio de SIM ---
${BES_MOTIVO_CAMBIO_PREFERENCIA}       PREFERENCIA_USUARIO
${BES_MOTIVO_CAMBIO_ROBO}              ROBO
${BES_MOTIVO_CAMBIO_EXTRAVIO}          EXTRAVIO

# --- Estatus de SIM (red / BES) ---
${BES_ESTATUS_SIM_ACTIVA}              ACTIVA
${BES_ESTATUS_SIM_DESACTIVADA}         DESACTIVADA
${BES_ESTATUS_SIM_FACTURADA}           FACTURADA

# --- Mensajes / códigos de validación 1 SIM por IMEI ---
${BES_CODIGO_BLOQUEO_IMEI}             BES-IMEI-001
${BES_MENSAJE_BLOQUEO_IMEI}            IMEI ya asociado a SIM previa. Solo se podrá facturar 1 SIM por Equipo

*** Keywords ***
# ─────────────────────────── TC005 · Chip Express Offer ID 1013 ───────────────────────────

Buscar Producto Chip Express En CAC Por SKU
    [Documentation]    Busca el producto Chip Express en el CAC por SKU y obtiene
    ...    su visualización desde el catálogo UPC sincronizado en BES (precio al
    ...    canal, precio al cliente y etiqueta de producto).
    [Arguments]    ${sku}
    Should Not Be Empty    ${sku}
    Set To Dictionary    ${BES_CTX}    sku=${sku}
    &{producto}=    Create Dictionary    status=${200}    sku=${sku}
    ...    nombre=Chip Express    etiqueta=${BES_ETIQUETA_PRODUCTO_1}
    ...    precioCanal=${BES_PRECIO_CANAL_CHIP_EXPRESS}
    ...    precioCliente=${BES_PRECIO_CLIENTE_CHIP_EXPRESS}
    ...    disponibleEnCatalogo=${TRUE}    sincronizadoBES=${TRUE}
    Set To Dictionary    ${BES_CTX}    productoChipExpress=${producto}
    RETURN    ${producto}

Asignar Offer Id Al SKU Chip Express
    [Documentation]    Asigna el Offer ID al SKU del Chip Express en BES y
    ...    modela la respuesta de aceptación de la combinación.
    [Arguments]    ${offer_id}    ${sku}
    Should Not Be Empty    ${offer_id}
    Should Not Be Empty    ${sku}
    ${prod}=    Get From Dictionary    ${BES_CTX}    productoChipExpress
    ${combinacion_valida}=    Evaluate
    ...    '${offer_id}' == '${BES_OFFER_CHIP_EXPRESS_R09}' and '${sku}' == '${BES_SKU_CHIP_EXPRESS}'
    IF    ${combinacion_valida}
        &{resp}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
        ...    offerId=${offer_id}    sku=${sku}    offerNombre=${BES_OFFER_NOMBRE_R09}
        ...    aceptado=${TRUE}    errorMessage=${EMPTY}
    ELSE
        &{resp}=    Create Dictionary    status=${400}    responseCode=${BES_RESPUESTA_ERROR_VALID}
        ...    offerId=${offer_id}    sku=${sku}    aceptado=${FALSE}
        ...    errorMessage=Combinación Offer/SKU inválida
    END
    Set To Dictionary    ${BES_CTX}    asignacionOfferChipExpress=${resp}
    RETURN    ${resp}

Capturar ICCID Y Activar Chip Express En BES
    [Documentation]    Captura el ICCID de la SIM Universal y confirma la
    ...    activación en BES vía CustomerManagement.newSubscriber, generando
    ...    la orden de activación con estatus exitoso.
    [Arguments]    ${iccid}
    Should Not Be Empty    ${iccid}
    Set To Dictionary    ${BES_CTX}    iccidChipExpress=${iccid}
    ${sku}=    Get From Dictionary    ${BES_CTX}    sku
    ${order_id}=    Set Variable    ACT-${sku}-${iccid}
    &{orden}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
    ...    orderId=${order_id}    iccid=${iccid}    sku=${sku}
    ...    offerId=${BES_OFFER_CHIP_EXPRESS_R09}
    ...    estatusActivacion=EXITOSO    interfaz=newSubscriber
    Set To Dictionary    ${BES_CTX}    ordenActivacionChipExpress=${orden}
    RETURN    ${orden}

Evaluar Aplicacion De Promociones Chip Express
    [Documentation]    Modela la regla de negocio del documento: Chip Express
    ...    no aplica ninguna promoción. Registra el resultado para validación.
    &{eval}=    Create Dictionary    status=${200}    aplicaPromocion=${FALSE}
    ...    promocionesAplicadas=${EMPTY}    regla=Chip Express. No aplica ninguna promoción
    Set To Dictionary    ${BES_CTX}    promocionesChipExpress=${eval}
    RETURN    ${eval}

Generar Factura CAC Chip Express
    [Documentation]    Genera la factura del CAC con precio al canal y precio
    ...    al cliente final para el SKU de Chip Express.
    ${sku}=    Get From Dictionary    ${BES_CTX}    sku
    ${prod}=    Get From Dictionary    ${BES_CTX}    productoChipExpress
    &{factura}=    Create Dictionary    status=${200}    sku=${sku}
    ...    precioCanal=${prod}[precioCanal]    precioCliente=${prod}[precioCliente]
    ...    folioFactura=FAC-${sku}-CAC
    Set To Dictionary    ${BES_CTX}    facturaCacChipExpress=${factura}
    RETURN    ${factura}

Validar Producto Chip Express Visualizado Con Etiqueta
    [Documentation]    Verifica visualización del producto: precio al canal $15,
    ...    precio al cliente $29 y etiqueta Producto 1.
    [Arguments]    ${etiqueta_esperada}    ${precio_canal_esperado}    ${precio_cliente_esperado}
    ${prod}=    Get From Dictionary    ${BES_CTX}    productoChipExpress
    Should Be Equal As Integers    ${prod}[status]    200
    Should Be Equal As Strings    ${prod}[etiqueta]    ${etiqueta_esperada}
    Should Be Equal As Numbers    ${prod}[precioCanal]    ${precio_canal_esperado}
    Should Be Equal As Numbers    ${prod}[precioCliente]    ${precio_cliente_esperado}
    Should Be True    ${prod}[disponibleEnCatalogo]
    Should Be True    ${prod}[sincronizadoBES]

Validar Asignacion Offer Aceptada Sin Errores
    [Documentation]    Verifica que BES aceptó la combinación Offer/SKU sin
    ...    errores y respondió el código esperado.
    [Arguments]    ${codigo_esperado}
    ${resp}=    Get From Dictionary    ${BES_CTX}    asignacionOfferChipExpress
    Should Be Equal As Integers    ${resp}[status]    200
    Should Be Equal As Strings    ${resp}[responseCode]    ${codigo_esperado}
    Should Be True    ${resp}[aceptado]
    Should Be Equal As Strings    ${resp}[errorMessage]    ${EMPTY}

Validar Orden Activacion Chip Express Exitosa
    [Documentation]    Verifica que BES generó la orden de activación con
    ...    estatus exitoso por la interfaz newSubscriber.
    ${orden}=    Get From Dictionary    ${BES_CTX}    ordenActivacionChipExpress
    Should Be Equal As Integers    ${orden}[status]    200
    Should Be Equal As Strings    ${orden}[responseCode]    ${BES_RESPUESTA_EXITO}
    Dictionary Should Contain Key    ${orden}    orderId
    Should Be Equal As Strings    ${orden}[estatusActivacion]    EXITOSO
    Should Be Equal As Strings    ${orden}[interfaz]    newSubscriber
    ${iccid_ctx}=    Get From Dictionary    ${BES_CTX}    iccidChipExpress
    Should Be Equal As Strings    ${orden}[iccid]    ${iccid_ctx}

Validar No Se Aplica Promocion Chip Express
    [Documentation]    Verifica que el sistema no aplica promociones a Chip
    ...    Express, conforme a la regla del documento.
    ${eval}=    Get From Dictionary    ${BES_CTX}    promocionesChipExpress
    Should Be Equal As Integers    ${eval}[status]    200
    Should Not Be True    ${eval}[aplicaPromocion]
    Should Be Equal As Strings    ${eval}[promocionesAplicadas]    ${EMPTY}
    Should Contain    ${eval}[regla]    No aplica ninguna promoción

Validar Precios En Factura CAC Chip Express
    [Documentation]    Verifica que la factura del CAC refleja correctamente
    ...    el precio al canal y el precio al cliente final.
    [Arguments]    ${precio_canal_esperado}    ${precio_cliente_esperado}
    ${factura}=    Get From Dictionary    ${BES_CTX}    facturaCacChipExpress
    Should Be Equal As Integers    ${factura}[status]    200
    Should Be Equal As Numbers    ${factura}[precioCanal]    ${precio_canal_esperado}
    Should Be Equal As Numbers    ${factura}[precioCliente]    ${precio_cliente_esperado}
    Dictionary Should Contain Key    ${factura}    folioFactura

# ─────────────────────────── TC016 · Cambio de SIM Prepago con cobro $50 ───────────────────────────

Registrar Cliente Prepago Activo Para Cambio SIM
    [Documentation]    Registra al cliente Prepago activo con MSISDN, ICCID
    ...    actual y plan vigente, como precondición del cambio de SIM.
    [Arguments]    ${msisdn}    ${iccid_anterior}    ${plan_vigente}
    Should Not Be Empty    ${msisdn}
    Should Not Be Empty    ${iccid_anterior}
    Should Not Be Empty    ${plan_vigente}
    &{cliente}=    Create Dictionary    msisdn=${msisdn}    iccidAnterior=${iccid_anterior}
    ...    estatusSimAnterior=${BES_ESTATUS_SIM_ACTIVA}    plan=${plan_vigente}
    ...    beneficios=BENEFICIOS_BASE
    Set To Dictionary    ${BES_CTX}    clienteCambioSim=${cliente}
    Set To Dictionary    ${BES_CTX}    msisdn=${msisdn}

Capturar Solicitud Cambio De SIM Prepago
    [Documentation]    Captura la solicitud de Cambio de SIM Prepago en CAC con
    ...    motivo distinto a robo/extravío y muestra el precio de $50 al cliente.
    [Arguments]    ${motivo}
    Should Not Be Empty    ${motivo}
    Should Not Be Equal As Strings    ${motivo}    ${BES_MOTIVO_CAMBIO_ROBO}
    Should Not Be Equal As Strings    ${motivo}    ${BES_MOTIVO_CAMBIO_EXTRAVIO}
    &{solicitud}=    Create Dictionary    status=${200}    motivo=${motivo}
    ...    precioMostrado=${BES_PRECIO_CAMBIO_SIM_PREPAGO}    aceptada=${TRUE}
    Set To Dictionary    ${BES_CTX}    solicitudCambioSim=${solicitud}
    RETURN    ${solicitud}

Seleccionar SIM Universal Prod 2 Y Capturar ICCID
    [Documentation]    Selecciona la SIM Universal Prod 2 (SKU 7009251) como
    ...    nueva SIM, valida disponibilidad del ICCID en BES y lo asocia al MSISDN.
    [Arguments]    ${sku}    ${iccid_nuevo}
    Should Not Be Empty    ${iccid_nuevo}
    ${cliente}=    Get From Dictionary    ${BES_CTX}    clienteCambioSim
    Set To Dictionary    ${BES_CTX}    skuSimNueva=${sku}    iccidNuevo=${iccid_nuevo}
    &{validacion}=    Create Dictionary    status=${200}    sku=${sku}
    ...    iccid=${iccid_nuevo}    disponible=${TRUE}    msisdn=${cliente}[msisdn]
    ...    asociado=${TRUE}    etiqueta=${BES_ETIQUETA_PRODUCTO_2}
    Set To Dictionary    ${BES_CTX}    validacionIccidNuevo=${validacion}
    RETURN    ${validacion}

Confirmar Cobro Y Procesar Cambio SIM En BES
    [Documentation]    Confirma el cobro de $50 al cliente y procesa el cambio
    ...    de SIM en BES vía CustomerManagement.changeSIM. Genera la orden y
    ...    refleja el cobro en la cuenta del cliente.
    ${cliente}=    Get From Dictionary    ${BES_CTX}    clienteCambioSim
    ${iccid_nuevo}=    Get From Dictionary    ${BES_CTX}    iccidNuevo
    ${order_id}=    Set Variable    CHGSIM-${cliente}[msisdn]-${iccid_nuevo}
    &{cobro}=    Create Dictionary    status=${200}    monto=${BES_PRECIO_CAMBIO_SIM_PREPAGO}
    ...    reflejadoEnCuenta=${TRUE}    msisdn=${cliente}[msisdn]
    &{orden}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
    ...    orderId=${order_id}    iccidAnterior=${cliente}[iccidAnterior]
    ...    iccidNuevo=${iccid_nuevo}    interfaz=changeSIM
    Set To Dictionary    ${BES_CTX}    cobroCambioSim=${cobro}
    Set To Dictionary    ${BES_CTX}    ordenCambioSim=${orden}
    RETURN    ${orden}

Actualizar ICCID En Perfil Suscriptor Y UPC
    [Documentation]    Actualiza el ICCID en el perfil del suscriptor en BES y
    ...    en UPC; aprovisiona el nuevo ICCID en red para tráfico voz/datos.
    ${cliente}=    Get From Dictionary    ${BES_CTX}    clienteCambioSim
    ${iccid_nuevo}=    Get From Dictionary    ${BES_CTX}    iccidNuevo
    &{perfil}=    Create Dictionary    status=${200}    msisdn=${cliente}[msisdn]
    ...    iccidActual=${iccid_nuevo}    actualizadoEnBES=${TRUE}    actualizadoEnUPC=${TRUE}
    ...    aprovisionadoEnRed=${TRUE}    estatusNuevaSim=${BES_ESTATUS_SIM_ACTIVA}
    Set To Dictionary    ${BES_CTX}    perfilSuscriptorCambioSim=${perfil}
    RETURN    ${perfil}

Desactivar ICCID Anterior En Red Y BES
    [Documentation]    Desactiva el ICCID anterior en red y en BES; el nuevo
    ...    ICCID queda activo para tráfico de voz/datos.
    ${cliente}=    Get From Dictionary    ${BES_CTX}    clienteCambioSim
    Set To Dictionary    ${cliente}    estatusSimAnterior=${BES_ESTATUS_SIM_DESACTIVADA}
    Set To Dictionary    ${BES_CTX}    clienteCambioSim=${cliente}
    &{desact}=    Create Dictionary    status=${200}    iccidAnterior=${cliente}[iccidAnterior]
    ...    estatus=${BES_ESTATUS_SIM_DESACTIVADA}    desactivadoEnRed=${TRUE}    desactivadoEnBES=${TRUE}
    Set To Dictionary    ${BES_CTX}    desactivacionSimAnterior=${desact}
    RETURN    ${desact}

Verificar Plan Y Beneficios Vigentes Cambio SIM
    [Documentation]    Verifica que el cambio no afecta el plan vigente ni los
    ...    beneficios del cliente (regla 5 del documento).
    ${cliente}=    Get From Dictionary    ${BES_CTX}    clienteCambioSim
    &{verif}=    Create Dictionary    status=${200}    plan=${cliente}[plan]
    ...    beneficios=${cliente}[beneficios]    afectados=${FALSE}
    Set To Dictionary    ${BES_CTX}    verificacionPlanCambioSim=${verif}
    RETURN    ${verif}

Validar Solicitud Cambio SIM Acepta Con Precio
    [Documentation]    Verifica que BES acepta la solicitud y muestra el precio
    ...    de $50 al cliente.
    [Arguments]    ${precio_esperado}
    ${sol}=    Get From Dictionary    ${BES_CTX}    solicitudCambioSim
    Should Be Equal As Integers    ${sol}[status]    200
    Should Be True    ${sol}[aceptada]
    Should Be Equal As Numbers    ${sol}[precioMostrado]    ${precio_esperado}

Validar Iccid Nuevo Disponible Y Asociado A MSISDN
    [Documentation]    Verifica que BES validó la disponibilidad del ICCID y
    ...    registró la asociación al MSISDN.
    ${v}=    Get From Dictionary    ${BES_CTX}    validacionIccidNuevo
    Should Be Equal As Integers    ${v}[status]    200
    Should Be True    ${v}[disponible]
    Should Be True    ${v}[asociado]
    ${iccid}=    Get From Dictionary    ${BES_CTX}    iccidNuevo
    Should Be Equal As Strings    ${v}[iccid]    ${iccid}

Validar Cobro Reflejado Y Orden Cambio SIM Generada
    [Documentation]    Verifica que el cobro de $50 se reflejó en la cuenta y
    ...    que BES generó la orden de cambio.
    [Arguments]    ${monto_esperado}
    ${cobro}=    Get From Dictionary    ${BES_CTX}    cobroCambioSim
    Should Be Equal As Integers    ${cobro}[status]    200
    Should Be Equal As Numbers    ${cobro}[monto]    ${monto_esperado}
    Should Be True    ${cobro}[reflejadoEnCuenta]
    ${orden}=    Get From Dictionary    ${BES_CTX}    ordenCambioSim
    Should Be Equal As Integers    ${orden}[status]    200
    Should Be Equal As Strings    ${orden}[responseCode]    ${BES_RESPUESTA_EXITO}
    Dictionary Should Contain Key    ${orden}    orderId
    Should Be Equal As Strings    ${orden}[interfaz]    changeSIM

Validar ICCID Actualizado En Perfil BES Y UPC
    [Documentation]    Verifica que el nuevo ICCID queda asociado al MSISDN en
    ...    BES y UPC y aprovisionado en red.
    ${perfil}=    Get From Dictionary    ${BES_CTX}    perfilSuscriptorCambioSim
    ${iccid_nuevo}=    Get From Dictionary    ${BES_CTX}    iccidNuevo
    Should Be Equal As Integers    ${perfil}[status]    200
    Should Be Equal As Strings    ${perfil}[iccidActual]    ${iccid_nuevo}
    Should Be True    ${perfil}[actualizadoEnBES]
    Should Be True    ${perfil}[actualizadoEnUPC]
    Should Be True    ${perfil}[aprovisionadoEnRed]
    Should Be Equal As Strings    ${perfil}[estatusNuevaSim]    ${BES_ESTATUS_SIM_ACTIVA}

Validar ICCID Anterior Desactivado
    [Documentation]    Verifica que la SIM anterior quedó desactivada en red y
    ...    BES.
    ${d}=    Get From Dictionary    ${BES_CTX}    desactivacionSimAnterior
    Should Be Equal As Integers    ${d}[status]    200
    Should Be Equal As Strings    ${d}[estatus]    ${BES_ESTATUS_SIM_DESACTIVADA}
    Should Be True    ${d}[desactivadoEnRed]
    Should Be True    ${d}[desactivadoEnBES]

Validar Plan Y Beneficios No Afectados Por Cambio SIM
    [Documentation]    Verifica que no se afectan precios al usuario ni la
    ...    configuración del plan (regla 5).
    [Arguments]    ${plan_esperado}
    ${v}=    Get From Dictionary    ${BES_CTX}    verificacionPlanCambioSim
    Should Be Equal As Integers    ${v}[status]    200
    Should Not Be True    ${v}[afectados]
    Should Be Equal As Strings    ${v}[plan]    ${plan_esperado}

# ─────────────────────────── TC051 · Bloqueo 1 SIM por IMEI ───────────────────────────

Registrar IMEI Con SIM Previa Facturada
    [Documentation]    Registra el histórico en BES de un IMEI Telcel válido
    ...    con una SIM Amigo Kit ya facturada y asociada (precondición TC051).
    [Arguments]    ${imei}    ${iccid_previa}    ${sku_previa}
    Should Not Be Empty    ${imei}
    Should Not Be Empty    ${iccid_previa}
    Should Not Be Empty    ${sku_previa}
    Set To Dictionary    ${BES_CTX}    imei=${imei}
    &{sim_previa}=    Create Dictionary    iccid=${iccid_previa}    sku=${sku_previa}
    ...    estatus=${BES_ESTATUS_SIM_FACTURADA}    asociadaAlImei=${TRUE}
    @{historico}=    Create List    ${sim_previa}
    &{registro}=    Create Dictionary    imei=${imei}    sims=${historico}    totalFacturadas=${1}
    Set To Dictionary    ${BES_CTX}    historicoSimsImei=${registro}
    Set To Dictionary    ${BES_CTX}    simPreviaImei=${sim_previa}

Consultar Historico SIMs Por IMEI
    [Documentation]    Consulta el histórico de SIMs asociadas al IMEI vía
    ...    TelcelCustomService.querySIMByIMEI.
    [Arguments]    ${imei}
    ${registro}=    Get From Dictionary    ${BES_CTX}    historicoSimsImei
    &{resp}=    Create Dictionary    status=${200}    imei=${imei}
    ...    sims=${registro}[sims]    totalFacturadas=${registro}[totalFacturadas]
    Set To Dictionary    ${BES_CTX}    respuestaHistoricoImei=${resp}
    RETURN    ${resp}

Intentar Activar Y Facturar Segunda SIM Con Mismo IMEI
    [Documentation]    Intenta activar y facturar una segunda SIM Amigo Kit con
    ...    el mismo IMEI en CAC. BES aplica la regla "Solo se podrá facturar 1
    ...    SIM por Equipo" y bloquea la operación (ESB1 + mensaje de error).
    [Arguments]    ${imei}    ${iccid_nueva}    ${sku_nueva}
    Should Not Be Empty    ${imei}
    Should Not Be Empty    ${iccid_nueva}
    Should Not Be Empty    ${sku_nueva}
    ${registro}=    Get From Dictionary    ${BES_CTX}    historicoSimsImei
    ${ya_facturada}=    Evaluate    ${registro}[totalFacturadas] >= 1
    IF    ${ya_facturada}
        &{resp}=    Create Dictionary    status=${409}    responseCode=${BES_RESPUESTA_ERROR_VALID}
        ...    codigoBloqueo=${BES_CODIGO_BLOQUEO_IMEI}
        ...    mensaje=${BES_MENSAJE_BLOQUEO_IMEI}    operacionPermitida=${FALSE}
        ...    imei=${imei}    iccidNueva=${iccid_nueva}    skuNueva=${sku_nueva}
    ELSE
        &{resp}=    Create Dictionary    status=${200}    responseCode=${BES_RESPUESTA_EXITO}
        ...    operacionPermitida=${TRUE}    imei=${imei}    iccidNueva=${iccid_nueva}
    END
    Set To Dictionary    ${BES_CTX}    respuestaSegundaSim=${resp}
    RETURN    ${resp}

Validar Historico SIMs Muestra Una Sim Facturada
    [Documentation]    Verifica que el histórico muestra una SIM Amigo Kit ya
    ...    asociada y facturada al IMEI.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaHistoricoImei
    Should Be Equal As Integers    ${resp}[status]    200
    Should Be Equal As Integers    ${resp}[totalFacturadas]    1
    @{sims}=    Set Variable    ${resp}[sims]
    Length Should Be    ${sims}    1
    ${sim}=    Set Variable    ${sims}[0]
    Should Be Equal As Strings    ${sim}[estatus]    ${BES_ESTATUS_SIM_FACTURADA}
    Should Be True    ${sim}[asociadaAlImei]

Validar Bloqueo Segunda SIM Por IMEI
    [Documentation]    Verifica que el sistema bloquea la operación conforme a
    ...    la regla "Solo se podrá facturar 1 SIM por Equipo".
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaSegundaSim
    Should Be Equal As Integers    ${resp}[status]    409
    Should Be Equal As Strings    ${resp}[responseCode]    ${BES_RESPUESTA_ERROR_VALID}
    Should Not Be True    ${resp}[operacionPermitida]

Validar Mensaje Error Bloqueo IMEI
    [Documentation]    Verifica que BES muestra la notificación indicando que
    ...    el IMEI ya está asociado a una SIM previa.
    ${resp}=    Get From Dictionary    ${BES_CTX}    respuestaSegundaSim
    Should Be Equal As Strings    ${resp}[codigoBloqueo]    ${BES_CODIGO_BLOQUEO_IMEI}
    Should Contain    ${resp}[mensaje]    IMEI
    Should Contain    ${resp}[mensaje]    1 SIM por Equipo

Validar SIM Original Sin Alteraciones Por Bloqueo
    [Documentation]    Verifica que el registro original conserva la asociación
    ...    SIM-IMEI sin alteraciones tras el intento de segunda facturación.
    ${registro}=    Get From Dictionary    ${BES_CTX}    historicoSimsImei
    Should Be Equal As Integers    ${registro}[totalFacturadas]    1
    ${prev}=    Get From Dictionary    ${BES_CTX}    simPreviaImei
    @{sims}=    Set Variable    ${registro}[sims]
    ${actual}=    Set Variable    ${sims}[0]
    Should Be Equal As Strings    ${actual}[iccid]    ${prev}[iccid]
    Should Be Equal As Strings    ${actual}[sku]    ${prev}[sku]
    Should Be Equal As Strings    ${actual}[estatus]    ${BES_ESTATUS_SIM_FACTURADA}
    Should Be True    ${actual}[asociadaAlImei]
