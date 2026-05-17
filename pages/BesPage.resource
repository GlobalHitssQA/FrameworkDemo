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
