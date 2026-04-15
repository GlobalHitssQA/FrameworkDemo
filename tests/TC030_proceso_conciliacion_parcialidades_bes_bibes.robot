*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES genere correctamente el reporte de conciliación de parcialidades hacia BIBES
    [Tags]    PruebaGeneradaIA    Conciliacion    BES    BIBES    Integral    Reportes
    [Documentation]    Verificar que BES genere correctamente el reporte de conciliación de parcialidades hacia BIBES
    ...                para conciliar los pagos recibidos en los diferentes puntos de cobro (SICATEL, Kioscos, OXXO).
    ...                El reporte debe incluir todos los campos requeridos según el Layout de Amigo Paguitos parcialidades V2:
    ...                ID préstamo, monto pagado, fecha, punto de cobro y referencia.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Alta
    ...                Tipo de prueba: Integral
    ...                Preconditions: Integración BES-BIBES configurada; Layout de Amigo Paguitos parcialidades V2 implementado en BES; Pagos de parcialidades registrados en el sistema; Proceso de conciliación configurado con periodicidad definida
    Given la integración BES-BIBES está configurada con Layout de Amigo Paguitos parcialidades V2
    And se han registrado múltiples pagos de parcialidades en diferentes puntos de cobro
    And BES ha acreditado todos los pagos y actualizado los saldos correspondientes
    When se ejecuta el proceso de generación del reporte de conciliación en BES
    Then BES genera el archivo de conciliación con todos los campos requeridos según el Layout
    And BES transmite el reporte hacia BIBES mediante el mecanismo de integración configurado
    And el log de BES registra la generación del reporte con fecha, hora, número de registros y estatus de envío
    And BIBES confirma la recepción y el procesamiento exitoso del reporte de conciliación

*** Keywords ***
La integración BES-BIBES está configurada con Layout de Amigo Paguitos parcialidades V2
    Se configuran los parámetros de generación del reporte de conciliación en BES    Diaria    CSV

Se han registrado múltiples pagos de parcialidades en diferentes puntos de cobro
    Se registran múltiples pagos de parcialidades en diferentes puntos de cobro    PREST123456    ABC123456

BES ha acreditado todos los pagos y actualizado los saldos correspondientes
    BES acredita todos los pagos y actualiza los saldos de los préstamos    PREST123456

Se ejecuta el proceso de generación del reporte de conciliación en BES
    Se ejecuta el proceso de generación del reporte de conciliación en BES

BES genera el archivo de conciliación con todos los campos requeridos según el Layout
    BES procesa todas las transacciones del periodo y genera el archivo de conciliación
    El reporte incluye todos los campos requeridos según el Layout

BES transmite el reporte hacia BIBES mediante el mecanismo de integración configurado
    BES transmite el archivo de conciliación a BIBES exitosamente

El log de BES registra la generación del reporte con fecha, hora, número de registros y estatus de envío
    Se consulta el log de generación de reportes en BES
    El log muestra el registro de generación con fecha, hora, número de registros y estatus de envío    2

BIBES confirma la recepción y el procesamiento exitoso del reporte de conciliación
    BIBES confirma la recepción del reporte y muestra los datos conciliados
