*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar pago de enganche a través de KIOSKOS con TDC
    [Tags]    PruebaGeneradaIA    PagoEnganche    Kioscos    TDC    BES    AmigoPaguitos    Integral
    [Documentation]    Verificar el proceso de pago de enganche mediante tarjeta de crédito en Kioskos para una venta con financiamiento Amigo Paguitos.
    ...                El sistema debe iniciar desde la plataforma AP.AG una venta con financiamiento Amigo Paguitos que requiera pago de enganche,
    ...                registrar la venta y solicitar la forma de pago del enganche, permitir seleccionar en Kioskos la opción de pago de enganche
    ...                con tarjeta de crédito, mostrar la interfaz de pago con TDC y el monto del enganche a pagar, procesar la transacción con
    ...                la pasarela de pagos y solicitar autorización, recibir la autorización y generar el comprobante con los datos de la transacción,
    ...                notificar desde Kioskos hacia CPS el pago de enganche realizado con TDC, registrar en CPS el pago de enganche con los datos
    ...                de la transacción de TDC, integrar BES con CPS para conocer y acreditar el pago de enganche, consultar en BES el pago
    ...                acreditado en CPS y actualizar el financiamiento Amigo Paguitos, y finalmente continuar el proceso de venta en AP.AG
    ...                tras la confirmación del pago del enganche permitiendo finalizar el proceso de venta y envío de contrato.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Precondiciones: BES integrado con CPS y Kioskos; Venta Amigo Paguitos en proceso en AP.AG; Kiosco operativo con terminal de pago TDC; Cliente con tarjeta de crédito válida
    Given se inicia desde la plataforma AP.AG una venta con financiamiento Amigo Paguitos que requiera pago de enganche
    And AP.AG registra la venta y solicita la forma de pago del enganche
    When se selecciona en Kioskos la opción de pago de enganche con tarjeta de crédito
    And el Kiosco muestra la interfaz de pago con TDC y el monto del enganche a pagar
    And se ingresan los datos de la tarjeta de crédito en el Kiosco y confirmar el pago del enganche
    And el Kiosco procesa la transacción con la pasarela de pagos y solicita autorización
    And se obtiene la autorización del pago con TDC y generar el comprobante de pago del enganche
    And el Kiosco recibe la autorización y genera el comprobante con los datos de la transacción
    And se notifica desde Kioskos hacia CPS el pago de enganche realizado con TDC
    And CPS recibe y registra el pago de enganche con los datos de la transacción de TDC
    And se integra BES con CPS para conocer y acreditar el pago de enganche
    And BES consulta en CPS el pago acreditado y actualiza el financiamiento Amigo Paguitos
    And se continua el proceso de venta en AP.AG tras la confirmación del pago del enganche
    Then AP.AG recibe la confirmación de BES y permite finalizar el proceso de venta y envío de contrato

*** Keywords ***
Se inicia desde la plataforma AP.AG una venta con financiamiento Amigo Paguitos que requiera pago de enganche
    Se inicia desde la plataforma AP.AG una venta con financiamiento Amigo Paguitos que requiera pago de enganche    Juan Pérez    Calle Principal 123    5551234567    ABC123456    15000    12

AP.AG registra la venta y solicita la forma de pago del enganche
    AP.AG registra la venta y solicita la forma de pago del enganche

Se selecciona en Kioskos la opción de pago de enganche con tarjeta de crédito
    Se selecciona en Kioskos la opción de pago de enganche con tarjeta de crédito    AP202604150001

El Kiosco muestra la interfaz de pago con TDC y el monto del enganche a pagar
    El Kiosco muestra la interfaz de pago con TDC y el monto del enganche a pagar

Se ingresan los datos de la tarjeta de crédito en el Kiosco y confirmar el pago del enganche
    Se ingresan los datos de la tarjeta de crédito en el Kiosco y confirmar el pago del enganche    4111111111111111    Juan Perez    123    12/28

El Kiosco procesa la transacción con la pasarela de pagos y solicita autorización
    El Kiosco procesa la transacción con la pasarela de pagos y solicita autorización

Se obtiene la autorización del pago con TDC y generar el comprobante de pago del enganche
    ${referencia}    ${autorizacion}    ${fecha_hora}    ${monto}=    Se obtiene la autorización del pago con TDC y generar el comprobante de pago del enganche
    Set Suite Variable    ${REFERENCIA_PAGO}    ${referencia}
    Set Suite Variable    ${AUTORIZACION_PAGO}    ${autorizacion}
    Set Suite Variable    ${FECHA_HORA_PAGO}    ${fecha_hora}
    Set Suite Variable    ${MONTO_PAGO}    ${monto}

El Kiosco recibe la autorización y genera el comprobante con los datos de la transacción
    El Kiosco recibe la autorización y genera el comprobante con los datos de la transacción

Se notifica desde Kioskos hacia CPS el pago de enganche realizado con TDC
    Se notifica desde Kioskos hacia CPS el pago de enganche realizado con TDC

CPS recibe y registra el pago de enganche con los datos de la transacción de TDC
    ${transaccion_id}=    CPS recibe y registra el pago de enganche con los datos de la transacción de TDC    5000    PRES202604150001    ABC123456
    Set Suite Variable    ${TRANSACCION_ID}    ${transaccion_id}

Se integra BES con CPS para conocer y acreditar el pago de enganche
    Se integra BES con CPS para conocer y acreditar el pago de enganche    PRES202604150001    5000    2026-04-15    ${TRANSACCION_ID}

BES consulta en CPS el pago acreditado y actualiza el financiamiento Amigo Paguitos
    BES consulta en CPS el pago acreditado y actualiza el financiamiento Amigo Paguitos    PRES202604150001    5000

Se continua el proceso de venta en AP.AG tras la confirmación del pago del enganche
    Se continua el proceso de venta en AP.AG tras la confirmación del pago del enganche    abc123456@telcel.com

AP.AG recibe la confirmación de BES y permite finalizar el proceso de venta y envío de contrato
    AP.AG recibe la confirmación de BES y permite finalizar el proceso de venta y envío de contrato    abc123456@telcel.com
