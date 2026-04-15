*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la generación del reporte de conciliación de parcialidades de pago de equipos Amigo Paguitos hacia BIBES según layout definido
    [Tags]    PruebaGeneradaIA    Conciliacion    BES    BIBES    Reportes    Integracion
    [Documentation]    Verificar la generación del reporte de conciliación de parcialidades de pago de equipos Amigo Paguitos hacia BIBES según layout definido.
    ...                El sistema debe generar el reporte con todos los campos requeridos del layout Amigo Paguitos parcialidades V2,
    ...                transmitirlo exitosamente a BIBES a través del mecanismo de integración configurado,
    ...                y registrar la operación en el log de reportes generados con fecha, hora, número de registros y estatus de transmisión.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: BES integrado con CPS para recepción de pagos; Integración con BIBES configurada y operativa; Layout de reporte Amigo Paguitos parcialidades V2 implementado; Préstamos de Amigo Paguitos con parcialidades pagadas; Puntos de cobro (SICATEL, kioskos) activos; Usuario con permisos de generación de reportes
    Given se configuran los parámetros de generación del reporte de conciliación según layout Amigo Paguitos parcialidades V2
    And se han registrado pagos de parcialidades a través de diferentes puntos de cobro
    And BES ha acreditado correctamente todos los pagos integrándose con CPS
    When se ejecuta el proceso de generación del reporte de conciliación de parcialidades en BES
    Then el sistema procesa toda la información de pagos y genera el reporte según el layout definido
    And el reporte generado contiene todos los campos requeridos del layout Amigo Paguitos parcialidades V2
    And BES envía el reporte hacia BIBES a través del mecanismo de integración definido
    And el sistema recibe confirmación de recepción del reporte desde BIBES
    And BES registra la operación en el log de reportes con fecha, hora, número de registros y estatus de transmisión

*** Keywords ***
Se configuran los parámetros de generación del reporte de conciliación según layout Amigo Paguitos parcialidades V2
    Se configuran los parámetros de generación del reporte de conciliación en BES    Diaria    CSV

Se han registrado pagos de parcialidades a través de diferentes puntos de cobro
    Se registran múltiples pagos de parcialidades en diferentes puntos de cobro    PREST123456    ABC123456

BES ha acreditado correctamente todos los pagos integrándose con CPS
    BES acredita todos los pagos y actualiza los saldos de los préstamos    PREST123456

Se ejecuta el proceso de generación del reporte de conciliación de parcialidades en BES
    Se ejecuta el proceso de generación del reporte de conciliación en BES

El sistema procesa toda la información de pagos y genera el reporte según el layout definido
    BES procesa todas las transacciones del periodo y genera el archivo de conciliación

El reporte generado contiene todos los campos requeridos del layout Amigo Paguitos parcialidades V2
    El reporte incluye todos los campos requeridos según el Layout

BES envía el reporte hacia BIBES a través del mecanismo de integración definido
    BES transmite el archivo de conciliación a BIBES exitosamente

El sistema recibe confirmación de recepción del reporte desde BIBES
    # La confirmación se verifica consultando BIBES directamente
    Sleep    1s

BES registra la operación en el log de reportes con fecha, hora, número de registros y estatus de transmisión
    Se consulta el log de generación de reportes en BES
    El log muestra el registro de generación con fecha, hora, número de registros y estatus de envío    2
    BIBES confirma la recepción del reporte y muestra los datos conciliados
