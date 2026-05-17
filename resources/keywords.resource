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
