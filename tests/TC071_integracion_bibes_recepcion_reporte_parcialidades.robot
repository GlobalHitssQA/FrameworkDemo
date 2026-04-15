*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la generación y envío del reporte de parcialidades hacia BIBES cuando BES procesa pagos de equipos bajo el esquema de financiamiento Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Integral    BES    BIBES    Reportes    Conciliacion    AmigoPaguitos
    [Documentation]    Verificar la generación y envío del reporte de parcialidades hacia BIBES cuando BES procesa pagos
    ...                de equipos bajo el esquema de financiamiento Amigo Paguitos.
    ...                El sistema debe configurar el formato del reporte según Layout Amigo Paguitos parcialidades V2,
    ...                registrar ventas con financiamiento y generación de parcialidades, ejecutar proceso de conciliación,
    ...                enviar reporte a BIBES y validar recepción con datos estructurados correctamente.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Precondiciones: BES integrado con sistema BIBES; Layout de reporte de parcialidades configurado según especificación V2; Venta de equipo Amigo Paguitos existente con parcialidades generadas; Conexión activa entre BES y BIBES
    Given BES configura correctamente el formato del reporte con todos los campos requeridos para BIBES según Layout V2
    When BES registra correctamente la venta y genera las parcialidades correspondientes según el plan de pagos configurado
    And BES genera el reporte de parcialidades con la información completa de los pagos procesados
    And BES envía exitosamente el reporte a BIBES y recibe confirmación de recepción
    Then BIBES muestra el reporte recibido con todos los datos de parcialidades correctamente estructurados y sin errores de formato

*** Keywords ***
BES configura correctamente el formato del reporte con todos los campos requeridos para BIBES según Layout V2
    Se configura en BES la generación del reporte de parcialidades según Layout Amigo Paguitos parcialidades V2

BES registra correctamente la venta y genera las parcialidades correspondientes según el plan de pagos configurado
    Se procesa en BES una venta de equipo con financiamiento Amigo Paguitos que genera parcialidades    ABC123456    Juan Pérez    Calle Principal 123    5551234567    60000    12    12    15.5    2026-04-15

BES genera el reporte de parcialidades con la información completa de los pagos procesados
    Se ejecuta el proceso de conciliación de parcialidades en BES

BES envía exitosamente el reporte a BIBES y recibe confirmación de recepción
    El reporte generado se envía hacia BIBES mediante la interfaz configurada

BIBES muestra el reporte recibido con todos los datos de parcialidades correctamente estructurados y sin errores de formato
    Se valida en BIBES la recepción y contenido del reporte de parcialidades
