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

# ═══════════════════════════════════════════════════════════════════════
# AMPLIACIÓN APPEND-ONLY — Orquestación TC001 / TC010 / TC025
# Keywords Given/When/Then en español. Sin selectores ni endpoints:
# delegan en BesPage / Vista360Page.
# ═══════════════════════════════════════════════════════════════════════

# ─────────────────────────── GIVEN ───────────────────────────

Existe Un Financiamiento Activo Transferido Desde AP.AG
    [Documentation]    Registra un financiamiento activo con enganche acreditado
    ...    e información transferida desde AP.AG.
    [Arguments]    ${service_number}    ${imei}    ${plazo}    ${clase_credito}    ${monto_financiado}    ${monto_enganche}
    Registrar Financiamiento Activo Transferido Desde APAG
    ...    ${service_number}    ${imei}    ${plazo}    ${clase_credito}    ${monto_financiado}    ${monto_enganche}

# ─────────────────────────── WHEN ───────────────────────────

AP.AG Formaliza La Venta Y El Financiamiento Semanal
    [Documentation]    AP.AG formaliza la venta, oferta y enganche del
    ...    financiamiento semanal.
    [Arguments]    ${service_number}    ${imei}    ${plazo}    ${clase_credito}    ${monto_equipo}
    Formalizar Venta Y Financiamiento Semanal En APAG
    ...    ${service_number}    ${imei}    ${plazo}    ${clase_credito}    ${monto_equipo}

AP.AG Dispara La Transferencia De Creación De Préstamo Hacia BES
    [Documentation]    AP.AG invoca la API de creación de préstamo de BES.
    Disparar Transferencia Creacion Prestamo Semanal A BES

Se Consulta El Financiamiento En La Pantalla 360 De BES Desde CAC
    [Documentation]    Consulta el financiamiento en la pantalla 360 de BES vía CAC.
    Consultar Pantalla 360 Alta Semanal Desde CAC

Se Busca Al Cliente Y Se Abre La Pantalla 360 De BES Desde CAC
    [Documentation]    Busca al cliente y abre la pantalla 360 de BES desde CAC.
    Buscar Cliente Y Abrir Pantalla 360 BES Desde CAC

Se Consulta El Saldo Vigente Del Financiamiento
    [Documentation]    Consulta el saldo vigente del financiamiento.
    Consultar Saldo Vigente Del Financiamiento

Se Consulta El Desglose De Cuotas Del Financiamiento
    [Documentation]    Consulta el desglose de cuotas del financiamiento.
    Consultar Desglose De Cuotas Del Financiamiento

AP.AG Formaliza La Venta Y Genera El REQUEST Con Datos De Cliente Incompletos
    [Documentation]    AP.AG genera el REQUEST de creación de préstamo omitiendo
    ...    campos obligatorios del cliente.
    [Arguments]    ${imei}    ${plazo}    ${monto_equipo}    ${clase_credito}
    Formalizar Venta En APAG Con Datos Cliente Incompletos
    ...    ${imei}    ${plazo}    ${monto_equipo}    ${clase_credito}

BES Recibe E Intenta Validar El Esquema Del Mensaje De Entrada
    [Documentation]    BES recibe el REQUEST e intenta validar el esquema.
    Enviar Request Creacion Prestamo Con Datos Incompletos A BES

# ─────────────────────────── THEN ───────────────────────────

BES Recibe Valida El Esquema Y Responde Sin Reintento
    [Documentation]    Verifica que BES validó el esquema y respondió el código
    ...    esperado sin reintento.
    [Arguments]    ${codigo}
    Validar Esquema Y Respuesta ESB0 Sin Reintento    ${codigo}

BES-CRM Valida La Correspondencia Del Ciclo Semanal Plazo Y Clase De Crédito
    [Documentation]    Verifica que el ciclo Semanal y el plazo correspondan a la
    ...    clase de crédito y que el préstamo quede Activo.
    [Arguments]    ${clase_credito}    ${plazo}
    Validar Correspondencia Ciclo Semanal Plazo Y Clase    ${clase_credito}    ${plazo}

El Préstamo Queda Registrado Con Desglose De Cuotas Y Calendario De Cobranza
    [Documentation]    Verifica el registro del préstamo, desglose de cuotas y
    ...    calendario de cobranza controlado por BES.
    Verificar Registro Prestamo Desglose Y Calendario

La Pantalla 360 Despliega Datos Del Cliente Cuotas Y Estatus
    [Documentation]    Verifica que la pantalla 360 despliega datos del cliente,
    ...    desglose de cuotas, fechas de vencimiento y estatus.
    Validar Pantalla 360 Despliega Datos Cliente Cuotas Y Estatus

La Información General Del Crédito Se Despliega En La Pantalla 360
    [Documentation]    Verifica que se despliega la información general del crédito.
    Validar Informacion General Credito Desplegada

El Saldo El Monto Financiado Y El Monto Pagado Son Correctos
    [Documentation]    Verifica que el saldo, monto financiado y monto pagado son
    ...    correctos.
    Validar Saldo Monto Financiado Y Pagado

El Desglose Muestra Número Importe Fechas Y Estatus
    [Documentation]    Verifica número de parcialidades, importe, fechas de
    ...    vencimiento y estatus.
    Validar Desglose Numero Importe Fechas Y Estatus

Los Datos Son Consistentes Con La Información Transferida Por AP.AG
    [Documentation]    Verifica que los datos coinciden con lo transferido por AP.AG.
    Validar Consistencia Datos Contra APAG

BES Responde Error De Esquema Sin Reintento
    [Documentation]    Verifica que BES respondió error de esquema sin reintento.
    [Arguments]    ${codigo}
    Validar Respuesta Error Esquema ESB1 Sin Reintento    ${codigo}

BES No Crea El Financiamiento Ni Genera Registro Parcial
    [Documentation]    Verifica que no se crea préstamo ni registro parcial.
    Validar No Se Crea Prestamo Ni Registro Parcial

La Respuesta De Error Se Propaga Hacia AP.AG Con Los Campos Faltantes
    [Documentation]    Verifica que el error se propaga hacia AP.AG con los campos
    ...    obligatorios faltantes.
    [Arguments]    ${codigo}
    Validar Error Propagado Hacia APAG Con Campos Faltantes    ${codigo}

# ═══════════════════════════════════════════════════════════════════════
# AMPLIACIÓN APPEND-ONLY — Orquestación TC005 / TC016 / TC051
# Activación Chip Express Offer ID 1013, Cambio de SIM Prepago $50 y
# Bloqueo 1 SIM por IMEI. Sin selectores ni endpoints: delegan en
# BesPage / Vista360Page.
# ═══════════════════════════════════════════════════════════════════════

# ─────────────────────────── GIVEN ───────────────────────────

El Cliente Prepago Activo Está Listo Para Cambio De SIM
    [Documentation]    Registra al cliente Prepago activo con MSISDN, ICCID
    ...    actual y plan vigente.
    [Arguments]    ${msisdn}    ${iccid_anterior}    ${plan_vigente}
    Registrar Cliente Prepago Activo Para Cambio SIM    ${msisdn}    ${iccid_anterior}    ${plan_vigente}

Existe Un IMEI Con Una SIM Amigo Kit Ya Facturada
    [Documentation]    Registra en BES el histórico de un IMEI con una SIM
    ...    Amigo Kit previamente facturada y asociada.
    [Arguments]    ${imei}    ${iccid_previa}    ${sku_previa}
    Registrar IMEI Con SIM Previa Facturada    ${imei}    ${iccid_previa}    ${sku_previa}

# ─────────────────────────── WHEN ───────────────────────────

Se Busca El Producto Chip Express En CAC Por SKU
    [Documentation]    Busca el producto Chip Express por SKU en CAC y obtiene
    ...    su visualización desde catálogo UPC sincronizado en BES.
    [Arguments]    ${sku}
    Buscar Producto Chip Express En CAC Por SKU    ${sku}

Se Asigna El Offer ID Al SKU Del Chip Express
    [Documentation]    Asigna el Offer ID al SKU del Chip Express en BES.
    [Arguments]    ${offer_id}    ${sku}
    Asignar Offer Id Al SKU Chip Express    ${offer_id}    ${sku}

Se Captura El ICCID De La SIM Universal Y Se Confirma La Activación
    [Documentation]    Captura el ICCID y confirma la activación del Chip
    ...    Express en BES vía CustomerManagement.newSubscriber.
    [Arguments]    ${iccid}
    Capturar ICCID Y Activar Chip Express En BES    ${iccid}

Se Evalúa La Aplicación De Promociones Para Chip Express
    [Documentation]    Evalúa la aplicación de promociones para Chip Express.
    Evaluar Aplicacion De Promociones Chip Express

Se Genera La Factura Del CAC Para Chip Express
    [Documentation]    Genera la factura del CAC con precio al canal y precio
    ...    al cliente final.
    Generar Factura CAC Chip Express

Se Captura La Solicitud De Cambio De SIM Prepago Con Motivo
    [Documentation]    Captura la solicitud de Cambio de SIM Prepago en CAC.
    [Arguments]    ${motivo}
    Capturar Solicitud Cambio De SIM Prepago    ${motivo}

Se Selecciona La SIM Universal Prod 2 Y Se Captura El ICCID
    [Documentation]    Selecciona la SIM Universal Prod 2 y captura su ICCID.
    [Arguments]    ${sku}    ${iccid_nuevo}
    Seleccionar SIM Universal Prod 2 Y Capturar ICCID    ${sku}    ${iccid_nuevo}

Se Confirma El Cobro Y Se Procesa El Cambio De SIM En BES
    [Documentation]    Confirma el cobro al cliente y procesa el cambio de SIM
    ...    en BES vía CustomerManagement.changeSIM.
    Confirmar Cobro Y Procesar Cambio SIM En BES

Se Actualiza El ICCID En El Perfil Del Suscriptor En BES Y UPC
    [Documentation]    Actualiza el ICCID en perfil del suscriptor y UPC.
    Actualizar ICCID En Perfil Suscriptor Y UPC

Se Desactiva El ICCID Anterior En Red Y BES
    [Documentation]    Desactiva el ICCID anterior en red y BES.
    Desactivar ICCID Anterior En Red Y BES

Se Verifica Que El Cambio No Afecta El Plan Vigente Del Cliente
    [Documentation]    Verifica que el cambio no afecta el plan vigente del
    ...    cliente ni sus beneficios.
    Verificar Plan Y Beneficios Vigentes Cambio SIM

Se Consulta El Histórico De SIMs Asociadas Al IMEI
    [Documentation]    Consulta el histórico de SIMs asociadas al IMEI en BES.
    [Arguments]    ${imei}
    Consultar Historico SIMs Por IMEI    ${imei}

Se Intenta Activar Y Facturar Una Segunda SIM Amigo Kit Con El Mismo IMEI
    [Documentation]    Intenta activar y facturar una segunda SIM Amigo Kit
    ...    con el mismo IMEI en CAC.
    [Arguments]    ${imei}    ${iccid_nueva}    ${sku_nueva}
    Intentar Activar Y Facturar Segunda SIM Con Mismo IMEI    ${imei}    ${iccid_nueva}    ${sku_nueva}

# ─────────────────────────── THEN ───────────────────────────

El Sistema Muestra Chip Express Con Precios Y Etiqueta
    [Documentation]    Verifica visualización con etiqueta y precios al canal y
    ...    al cliente.
    [Arguments]    ${etiqueta}    ${precio_canal}    ${precio_cliente}
    Validar Producto Chip Express Visualizado Con Etiqueta    ${etiqueta}    ${precio_canal}    ${precio_cliente}

BES Acepta La Combinación Offer Y SKU Sin Errores
    [Documentation]    Verifica que BES aceptó la combinación Offer/SKU.
    [Arguments]    ${codigo}
    Validar Asignacion Offer Aceptada Sin Errores    ${codigo}

BES Genera La Orden De Activación Con Estatus Exitoso
    [Documentation]    Verifica que BES generó la orden de activación con
    ...    estatus exitoso.
    Validar Orden Activacion Chip Express Exitosa

El Sistema No Aplica Promociones A Chip Express
    [Documentation]    Verifica que no se aplican promociones a Chip Express.
    Validar No Se Aplica Promocion Chip Express

La Factura Del CAC Refleja Los Precios Al Canal Y Al Cliente
    [Documentation]    Verifica precio al canal y precio al cliente final en la
    ...    factura del CAC.
    [Arguments]    ${precio_canal}    ${precio_cliente}
    Validar Precios En Factura CAC Chip Express    ${precio_canal}    ${precio_cliente}

BES Acepta La Solicitud Y Muestra El Precio De Cambio De SIM
    [Documentation]    Verifica que BES acepta la solicitud y muestra el precio
    ...    de cambio de SIM al cliente.
    [Arguments]    ${precio}
    Validar Solicitud Cambio SIM Acepta Con Precio    ${precio}

BES Valida La Disponibilidad Del ICCID Y Registra La Asociación Al MSISDN
    [Documentation]    Verifica disponibilidad del ICCID y la asociación al
    ...    MSISDN del cliente.
    Validar Iccid Nuevo Disponible Y Asociado A MSISDN

El Cobro Se Refleja En La Cuenta Y La Orden De Cambio Se Genera
    [Documentation]    Verifica que el cobro se reflejó en la cuenta y la orden
    ...    de cambio fue generada.
    [Arguments]    ${monto}
    Validar Cobro Reflejado Y Orden Cambio SIM Generada    ${monto}

El Nuevo ICCID Queda Asociado Al MSISDN Y Aprovisionado En Red
    [Documentation]    Verifica que el nuevo ICCID queda asociado al MSISDN en
    ...    BES y UPC y aprovisionado en red.
    Validar ICCID Actualizado En Perfil BES Y UPC

La SIM Anterior Queda Desactivada Y El Nuevo ICCID Activo Para Tráfico
    [Documentation]    Verifica que la SIM anterior queda desactivada en red y
    ...    BES.
    Validar ICCID Anterior Desactivado

El Plan Y Los Beneficios Del Cliente No Se Ven Afectados
    [Documentation]    Verifica que no se afectan precios al usuario ni la
    ...    configuración del plan (regla 5).
    [Arguments]    ${plan}
    Validar Plan Y Beneficios No Afectados Por Cambio SIM    ${plan}

El Sistema Muestra Una SIM Amigo Kit Ya Asociada Y Facturada Al IMEI
    [Documentation]    Verifica que el histórico muestra una SIM Amigo Kit
    ...    asociada y facturada al IMEI.
    Validar Historico SIMs Muestra Una Sim Facturada

El Sistema Bloquea La Operación Por La Regla De 1 SIM Por IMEI
    [Documentation]    Verifica que el sistema bloquea la operación conforme a
    ...    la regla "Solo se podrá facturar 1 SIM por Equipo".
    Validar Bloqueo Segunda SIM Por IMEI

El Sistema Muestra Notificación De IMEI Ya Asociado A SIM Previa
    [Documentation]    Verifica el mensaje de error/bloqueo en BES.
    Validar Mensaje Error Bloqueo IMEI

El Registro Original Conserva La Asociación SIM IMEI Sin Alteraciones
    [Documentation]    Verifica que la SIM original no se ve afectada por el
    ...    intento de segunda facturación.
    Validar SIM Original Sin Alteraciones Por Bloqueo
