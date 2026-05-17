*** Settings ***
Documentation     Keywords de orquestación en español (estilo Telcel).
...               Estos keywords NO contienen selectores ni endpoints: delegan
...               en los Page Resources (Vista360Page / BesPage).
...               Archivo Append-Only: solo se agregan keywords nuevos al final.
Library           SeleniumLibrary
Library           Collections
Resource          ../pages/Vista360Page.resource
Resource          ../pages/BesPage.resource

*** Variables ***
# Credenciales del asesor CAC (perfil Vista 360 - app surrogate ZeroBank)
${CAC_USUARIO}        username
${CAC_PASSWORD}       password

*** Keywords ***
# ─────────────────────────── GIVEN ───────────────────────────

El Asesor CAC Está Autenticado En Vista 360
    [Documentation]    El asesor con perfil CAC inicia sesión en Vista 360.
    Inicializar Contexto BES
    Abrir Vista 360
    Ir A Pantalla De Acceso
    Capturar Usuario CAC    ${CAC_USUARIO}
    Capturar Password CAC    ${CAC_PASSWORD}
    Confirmar Acceso CAC
    Validar Sesion CAC Iniciada

El Cliente Prepago Está Localizado Por Número Telefónico
    [Documentation]    Localiza al cliente prepago por su número telefónico.
    [Arguments]    ${numero_telefonico}
    Localizar Cliente Por Numero Telefonico    ${numero_telefonico}

La Clase De Crédito Está Configurada
    [Documentation]    Configura la clase de crédito del financiamiento.
    [Arguments]    ${clase_credito}
    Configurar Clase De Credito    ${clase_credito}

La Venta Está Formalizada En AP.AG Con Factura SAP
    [Documentation]    Registra la venta formalizada en AP.AG con factura SAP.
    [Arguments]    ${factura_sap}
    Registrar Venta Formalizada    ${factura_sap}

Existe Un Financiamiento Mensual Activo
    [Documentation]    Registra un financiamiento mensual activo con clase y plazo.
    [Arguments]    ${plazo}    ${clase_credito}
    Registrar Financiamiento Activo    ${plazo}    ${clase_credito}

# ─────────────────────────── WHEN ───────────────────────────

AP.AG Transfiere A BES El Préstamo Mensual
    [Documentation]    AP.AG transfiere a BES el préstamo mensual con enganche.
    [Arguments]    ${plazo_meses}    ${monto_enganche}    ${factura_sap}
    Transferir Prestamo Mensual A BES    ${plazo_meses}    ${monto_enganche}    ${factura_sap}

AP.AG Intenta Transferir A BES Préstamo Semanal Con Plazo No Disponible
    [Documentation]    AP.AG intenta transferir un préstamo semanal con plazo no disponible.
    [Arguments]    ${plazo}
    Transferir Prestamo Semanal Con Plazo No Disponible    ${plazo}

Se Consulta La Factura Mediante ARService QueryInvoice
    [Documentation]    Invoca ARService.QueryInvoice con el AccountId.
    [Arguments]    ${account_id}
    Consultar Factura Por AccountId    ${account_id}

Se Solicita La Consulta En La Pantalla 360 De BES
    [Documentation]    Solicita la consulta del crédito en la pantalla 360 de BES vía CAC.
    Consultar Pantalla 360 De BES

Se Invoca CustomerManagement GetSubscriberInfo
    [Documentation]    Invoca CustomerManagement Service.GetSubscriberInfo.
    Obtener Info Suscriptor BES

# ─────────────────────────── THEN ───────────────────────────

BES Crea El Préstamo Y Responde
    [Documentation]    Verifica creación del préstamo con el código esperado.
    [Arguments]    ${codigo}
    Validar Prestamo Creado Con Codigo    ${codigo}

El Enganche Y El Monto A Financiar Quedan Registrados Correctamente
    [Documentation]    Verifica enganche, monto a financiar e impuestos en BES.
    Validar Enganche Y Monto A Financiar Registrados

El Cálculo De Cuotas Mensuales Es Correcto
    [Documentation]    Verifica primera, intermedias y última cuota.
    Validar Calculo De Cuotas Mensuales

ARService QueryInvoice Devuelve Datos Consistentes Con El Enganche
    [Documentation]    Verifica invoiceAmount, taxAmount y dueDate consistentes.
    Validar Query Invoice Consistente Con Enganche

El Monto De Enganche En Pantalla 360 Coincide Con BES
    [Documentation]    Verifica que el enganche mostrado coincide con BES.
    Validar Enganche En Pantalla 360 Coincide

BES Rechaza La Creación Del Préstamo Y Responde
    [Documentation]    Verifica el rechazo de la creación con el código esperado.
    [Arguments]    ${codigo}
    Validar Prestamo Rechazado Con Codigo    ${codigo}

El Mensaje De Error Indica Plazo No Disponible
    [Documentation]    Verifica el mensaje de error de plazo no disponible.
    Validar Mensaje Error Plazo No Disponible

No Existe Préstamo Ni Calendario De Cobranza Asociado
    [Documentation]    Verifica que no se generó préstamo ni calendario.
    Validar No Existe Prestamo Ni Calendario

La Pantalla 360 Muestra El Estatus Y El Ciclo De Cobro Mensual
    [Documentation]    Verifica estatus del préstamo y ciclo de cobro mensual.
    Validar Pantalla 360 Muestra Estatus Y Ciclo

La Clase De Crédito Mensual Y El Tipo De Proyecto Son Correctos
    [Documentation]    Verifica clase de crédito mensual y tipo de proyecto.
    [Arguments]    ${clase_credito}
    Validar Clase De Credito Mensual Y Proyecto    ${clase_credito}

El Estatus Mostrado Coincide Con El InstallmentStatus De BES
    [Documentation]    Verifica consistencia del estatus entre pantalla 360 y BES.
    Validar Estatus Coincide Con InstallmentStatus

Cerrar Sesión CAC
    [Documentation]    Cierra el navegador de Vista 360.
    Cerrar Vista 360

# ═══════════════════════════════════════════════════════════════════════
# AMPLIACIÓN APPEND-ONLY — Orquestación TC013 / TC025 / TC030
# Keywords Given/When/Then en español. Sin selectores ni endpoints:
# delegan en BesPage / Vista360Page.
# ═══════════════════════════════════════════════════════════════════════

# ─────────────────────────── GIVEN ───────────────────────────

El Cliente Prepago Está Localizado Por Service Number
    [Documentation]    Localiza al cliente prepago elegible por su serviceNumber.
    [Arguments]    ${service_number}
    Localizar Cliente Por Service Number    ${service_number}

El Cliente Prepago Está Localizado Por SubscriberId
    [Documentation]    Localiza al cliente prepago por su subscriberId.
    [Arguments]    ${subscriber_id}
    Localizar Cliente Por Subscriber Id    ${subscriber_id}

Existe Un Financiamiento Semanal Activo Con Pagos
    [Documentation]    Registra un financiamiento semanal activo con cuotas y pagos.
    [Arguments]    ${plazo}    ${clase_credito}    ${imei}
    Registrar Financiamiento Semanal Activo Con Pagos    ${plazo}    ${clase_credito}    ${imei}

Existe Un Financiamiento Mensual Activo Sin Parcialidades Vencidas
    [Documentation]    Registra un financiamiento mensual a 12 meses sin parcialidades vencidas.
    [Arguments]    ${plazo}    ${clase_credito}    ${subscriber_id}
    Registrar Financiamiento Mensual Activo Sin Parcialidades Vencidas
    ...    ${plazo}    ${clase_credito}    ${subscriber_id}

# ─────────────────────────── WHEN ───────────────────────────

Se Captura La Solicitud De Financiamiento Semanal A 3 Meses
    [Documentation]    Captura la solicitud de financiamiento semanal a 3 meses en CAC.
    [Arguments]    ${service_number}    ${imei}    ${plazo}    ${monto_equipo}    ${clase_credito}
    Capturar Solicitud Financiamiento Semanal
    ...    ${service_number}    ${imei}    ${plazo}    ${monto_equipo}    ${clase_credito}

Se Envía La Solicitud De Creación De Préstamo Semanal A BES
    [Documentation]    Envía la solicitud de creación de préstamo semanal a BES.
    [Arguments]    ${clase_credito}
    Enviar Solicitud Creacion Prestamo Semanal A BES    ${clase_credito}

Se Consulta La Pantalla 360 De BES Para El Financiamiento Semanal
    [Documentation]    Consulta la pantalla 360 de BES vía CAC del financiamiento semanal.
    Consultar Pantalla 360 Semanal

Se Accede A La Pantalla 360 De BES Para El Financiamiento Semanal
    [Documentation]    Accede a la pantalla 360 de BES desde CAC.
    Acceder Pantalla 360 BES Semanal

Se Invoca TelcelCustomService QueryInstallmentByIMEI
    [Documentation]    Invoca TelcelCustomService.queryInstallmentByIMEI con el IMEI.
    [Arguments]    ${imei}
    Invocar Query Installment Por IMEI    ${imei}

Se Invoca BCService QueryInstallment
    [Documentation]    Invoca BCService.QueryInstallment con CusID e installmentPlanInstId.
    [Arguments]    ${cus_id}
    Invocar Query Installment Por Cus Id    ${cus_id}

Se Inicia La Cancelación Del Financiamiento Mensual En BES
    [Documentation]    Inicia el proceso de cancelación del financiamiento mensual.
    Iniciar Cancelacion Financiamiento Mensual

Se Procesa El Manejo De Saldo Y Parcialidades
    [Documentation]    Procesa el manejo del saldo y de las parcialidades en la cancelación.
    Procesar Manejo De Saldo Y Parcialidades En Cancelacion

Se Refleja La Cancelación En CPS Y Se Confirma El Estatus
    [Documentation]    CPS refleja la cancelación y BES confirma el cambio de estatus.
    Reflejar Cancelacion En CPS
    Confirmar Cambio Estatus A Cancelado

Se Consulta La Pantalla 360 De BES Para El Financiamiento Cancelado
    [Documentation]    Consulta la pantalla 360 de BES vía CAC del financiamiento cancelado.
    Consultar Pantalla 360 Financiamiento Cancelado

# ─────────────────────────── THEN ───────────────────────────

BES Crea El Préstamo Semanal Y Responde
    [Documentation]    Verifica creación del préstamo semanal con el código esperado.
    [Arguments]    ${codigo}
    Validar Prestamo Semanal Creado Con Codigo    ${codigo}

El Calendario De Cobranza Y Las Parcialidades Semanales Son Correctos
    [Documentation]    Verifica calendario de cobranza y ajuste de centavos.
    Validar Calendario Y Parcialidades Semanales

El Plazo Semanal Y El Monto De Parcialidad Corresponden A La Clase De Crédito
    [Documentation]    Verifica que el plazo y la parcialidad corresponden a la clase semanal.
    [Arguments]    ${clase_credito}    ${plazo}
    Validar Plazo Semanal Y Monto Parcialidad    ${clase_credito}    ${plazo}

La Pantalla 360 Muestra Los Datos Del Financiamiento Semanal Consistentes
    [Documentation]    Verifica serviceNumber, subscriberId, installmentPlanInstId,
    ...    billcycleTypeId y status consistentes con el alta.
    Validar Pantalla 360 Semanal Consistente

El Acceso A La Pantalla 360 De BES Responde
    [Documentation]    Verifica que el acceso a la pantalla 360 responde el código esperado.
    [Arguments]    ${codigo}
    Validar Acceso Pantalla 360 Responde    ${codigo}

QueryInstallmentByIMEI Retorna La Información Del Plan
    [Documentation]    Verifica installmentPlanInstId, type, installmentStatus y subsidyStatus.
    Validar Query Installment Por IMEI Retorna Datos

BCService QueryInstallment Retorna El Plan De Pago Completo
    [Documentation]    Verifica que se retorna el plan de pago completo.
    Validar Plan De Pago Completo

El Desglose De Cuotas En La Pantalla 360 Es Correcto
    [Documentation]    Verifica número/secuencia, monto, fecha de vencimiento y estatus.
    Validar Desglose Cuotas En Pantalla 360

Los Campos De Crédito Semanal Son Consistentes
    [Documentation]    Verifica consistencia de los campos de crédito semanal.
    [Arguments]    ${clase_credito}
    Validar Consistencia Campos Credito Semanal    ${clase_credito}

BES Inicia La Cancelación Sin Parcialidades Vencidas
    [Documentation]    Verifica que BES inicia la cancelación sin parcialidades vencidas.
    Validar Cancelacion Iniciada Sin Parcialidades Vencidas

El Saldo Se Procesa Respetando Los Pagos Sin Penalización
    [Documentation]    Verifica que se respetan los pagos acreditados sin penalización.
    Validar Saldo Procesado Sin Penalizacion

CPS Refleja La Cancelación Y Los Charge Codes
    [Documentation]    Verifica que CPS refleja la cancelación y los Charge Codes.
    Validar Reflejo En CPS Y Charge Codes

El Estatus Del Financiamiento Cambia A Cancelado
    [Documentation]    Verifica que el status cambia a cancelado y collectionProcessFlag.
    Validar Estatus Prestamo Cancelado

La Pantalla 360 Muestra El Financiamiento Cancelado Con Trazabilidad
    [Documentation]    Verifica el financiamiento cancelado con trazabilidad.
    Validar Pantalla 360 Muestra Financiamiento Cancelado
