*** Settings ***
Documentation    Caso de prueba: Validar respuesta con información de facturación desde BES
...              Proceso: Venta
...              Aplicación: BES
...              Funcionalidad: Integración de BES de Amigo Paguitos para administración de crédito
...              Escenario: Verificar que la respuesta de BES contenga la información completa de facturación
...              del cliente para la administración del crédito
...
...              Precondiciones:
...              - API ARServices QueryInvoice disponible en BES
...              - accountId válido con información de facturación existente en BES
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Alta

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - accountId con información de facturación existente en BES
${ACCOUNT_ID_FACTURACION}    ACC987654321

*** Test Cases ***
Validar Respuesta Con Información De Facturación Desde BES
    [Documentation]    Este caso de prueba verifica que la API ARServices QueryInvoice de BES devuelve
    ...                correctamente toda la información de facturación del cliente necesaria para la
    ...                administración del crédito en Amigo Paguitos.
    ...
    ...                Flujo de validación:
    ...                1. Ejecutar la API ARServices QueryInvoice de BES con un accountId válido
    ...                2. Validar que BES procesa la petición y genera una respuesta con la información de facturación
    ...                3. Validar que la respuesta contiene los campos de identificación: acctKey, transType, billCycleID
    ...                4. Validar que la respuesta contiene los campos de ciclo de facturación: billCycleBeginTime, billCycleEndTime
    ...                5. Validar que la respuesta contiene los campos de montos: invoiceAmount, openAmount, taxAmount,
    ...                   openTaxAmount, disputeAmount, iVATaxAmount, openIVATaxAmount
    ...                6. Validar que la respuesta contiene los campos complementarios: dueDate, status, invoiceID,
    ...                   serviceCategory, chargeCodeGroup, chargeCode, chargeAmount, discountAmt
    ...
    ...                Campos críticos verificados:
    ...                - acctKey: Clave de la cuenta
    ...                - transType: Tipo de transacción
    ...                - billCycleID: ID del ciclo de facturación
    ...                - billCycleBeginTime: Fecha de inicio del ciclo de facturación
    ...                - billCycleEndTime: Fecha de fin del ciclo de facturación
    ...                - invoiceAmount: Monto total de la factura
    ...                - openAmount: Monto pendiente
    ...                - taxAmount: Monto de impuestos
    ...                - openTaxAmount: Monto de impuestos pendiente
    ...                - disputeAmount: Monto en disputa
    ...                - iVATaxAmount: Monto de IVA
    ...                - openIVATaxAmount: Monto de IVA pendiente
    ...                - dueDate: Fecha de vencimiento
    ...                - status: Estado de la factura
    ...                - invoiceID: ID de la factura
    ...                - serviceCategory: Categoría del servicio
    ...                - chargeCodeGroup: Grupo de código de cargo
    ...                - chargeCode: Código de cargo
    ...                - chargeAmount: Monto del cargo
    ...                - discountAmt: Monto del descuento
    [Tags]    PruebaGeneradaIA    Funcional    BES    Integracion    API

    # WHEN: Ejecutar la API ARServices QueryInvoice de BES con un accountId válido
    Cuando se ejecuta la API ARServices QueryInvoice de BES con un accountId válido
    ...    ${ACCOUNT_ID_FACTURACION}

    # THEN: BES procesa la petición y genera una respuesta con la información de facturación
    Entonces BES procesa la petición QueryInvoice y genera una respuesta con la información de facturación

    # AND: Validar que la respuesta contiene los campos de identificación acctKey, transType, billCycleID
    Y la respuesta contiene los campos de identificación acctKey transType billCycleID con valores válidos

    # AND: Validar que la respuesta contiene los campos de ciclo de facturación billCycleBeginTime, billCycleEndTime
    Y la respuesta contiene los campos de ciclo de facturación billCycleBeginTime billCycleEndTime con fechas válidas del periodo de facturación

    # AND: Validar que la respuesta contiene los campos de montos con valores numéricos válidos
    Y la respuesta contiene los campos de montos invoiceAmount openAmount taxAmount openTaxAmount disputeAmount iVATaxAmount openIVATaxAmount con valores numéricos válidos

    # THEN: Validar que la respuesta contiene los campos complementarios de facturación con valores correctos
    Entonces la respuesta contiene los campos complementarios dueDate status invoiceID serviceCategory chargeCodeGroup chargeCode chargeAmount discountAmt con valores correctos para la administración del crédito
