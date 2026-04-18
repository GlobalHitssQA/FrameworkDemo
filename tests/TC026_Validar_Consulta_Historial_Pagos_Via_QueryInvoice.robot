*** Settings ***
Documentation    Caso de prueba: Validar consulta de historial de pagos vía QueryInvoice
...              Proceso: Cobranza
...              Aplicación: BES
...              Funcionalidad: Consulta de historial de pagos
...              Escenario: Verificar la consulta del historial de pagos del cliente mediante el servicio ARServices.QueryInvoice
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - AccountId válido con historial de pagos
...              - Servicio ARServices.QueryInvoice disponible
...
...              Flujo de consulta:
...              1. Obtener el AccountId del cliente para consultar su historial de pagos
...              2. Enviar la petición al servicio ARServices.QueryInvoice con el AccountId como parámetro
...              3. Verificar que BES procesa la consulta y recupera el historial de facturas y pagos
...              4. Validar que la respuesta contiene los campos acctKey, transType, billCycleID, billCycleBeginTime,
...                 billCycleEndTime, invoiceAmount, openAmount, taxAmount, openTaxAmount, disputeAmount, iVATaxAmount,
...                 openIVATaxAmount, dueDate, status e invoiceID
...              5. Verificar que los detalles de cargos incluyen serviceCategory, chargeCodeGroup, chargeCode,
...                 chargeAmount, discountAmt y status
...
...              Campos del historial de pagos:
...              - acctKey: Clave de identificación de la cuenta
...              - transType: Tipo de transacción
...              - billCycleID: Identificador del ciclo de facturación
...              - billCycleBeginTime: Fecha de inicio del ciclo de facturación
...              - billCycleEndTime: Fecha de fin del ciclo de facturación
...              - invoiceAmount: Monto total de la factura
...              - openAmount: Monto pendiente de pago
...              - taxAmount: Monto de impuestos
...              - openTaxAmount: Monto pendiente de impuestos
...              - disputeAmount: Monto en disputa
...              - iVATaxAmount: Monto de IVA
...              - openIVATaxAmount: Monto pendiente de IVA
...              - dueDate: Fecha de vencimiento
...              - status: Estado de la factura
...              - invoiceID: Identificador único de la factura
...
...              Detalles de cargos:
...              - serviceCategory: Categoría del servicio
...              - chargeCodeGroup: Grupo del código de cargo
...              - chargeCode: Código del cargo
...              - chargeAmount: Monto del cargo
...              - discountAmt: Monto del descuento aplicado
...              - status: Estado del cargo
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente con historial de pagos
${ACCOUNT_ID_CLIENTE}    ACC123456789

*** Test Cases ***
Validar Consulta De Historial De Pagos Via QueryInvoice
    [Documentation]    Este caso de prueba verifica la consulta del historial de pagos del cliente
    ...                mediante el servicio ARServices.QueryInvoice.
    ...
    ...                Flujo de integración validado:
    ...                1. Sistema obtiene el AccountId del cliente
    ...                2. Sistema invoca ARServices.QueryInvoice con el AccountId
    ...                3. BES procesa la consulta y recupera el historial de facturas y pagos
    ...                4. Sistema valida que la respuesta contiene todos los campos del historial
    ...                5. Sistema verifica que los detalles de cargos están completos
    ...
    ...                Información validada:
    ...                - Campos de identificación: acctKey, transType, billCycleID
    ...                - Campos de ciclo de facturación: billCycleBeginTime, billCycleEndTime
    ...                - Campos de montos: invoiceAmount, openAmount, taxAmount, openTaxAmount,
    ...                  disputeAmount, iVATaxAmount, openIVATaxAmount
    ...                - Campos complementarios: dueDate, status, invoiceID
    ...                - Detalles de cargos: serviceCategory, chargeCodeGroup, chargeCode,
    ...                  chargeAmount, discountAmt, status
    ...
    ...                Validaciones de error:
    ...                - Status code 200 (Transacción exitosa)
    ...                - Todos los campos requeridos presentes en la respuesta
    ...                - Valores numéricos válidos en campos de montos
    ...                - Fechas en formato válido
    ...                - Detalles de cargos completos y consistentes con la factura
    [Tags]    PruebaGeneradaIA    Integral    BES    ARServices    QueryInvoice    Cobranza    CasosDeUso

    # GIVEN: El AccountId del cliente está disponible y es válido
    Dado que se obtiene el AccountId del cliente para consultar su historial de pagos
    ...    ${ACCOUNT_ID_CLIENTE}

    # WHEN: Se envía la petición al servicio ARServices.QueryInvoice con el AccountId como parámetro
    Cuando se envía la petición al servicio ARServices QueryInvoice con el AccountId

    # THEN: BES procesa la consulta y recupera el historial de facturas y pagos asociadas a la cuenta
    Entonces BES procesa la consulta y recupera el historial de facturas y pagos

    # AND: La respuesta contiene todos los campos del historial de pagos especificados
    Y la respuesta contiene todos los campos del historial de pagos especificados

    # AND: Los detalles de cada cargo incluyen serviceCategory, chargeCodeGroup, chargeCode, chargeAmount, discountAmt y status
    Y verifica que los detalles de cargos están completos y son consistentes
