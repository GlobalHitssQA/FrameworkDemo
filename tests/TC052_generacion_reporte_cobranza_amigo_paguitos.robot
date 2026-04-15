*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la generación correcta del reporte de cobranza con calendario de pagos y estado de parcialidades de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Reportes    BES    AmigoPaguitos    Cobranza
    [Documentation]    Verificar la generación correcta del reporte de cobranza con calendario de pagos y estado de parcialidades de Amigo Paguitos.
    ...                El sistema debe permitir acceder al módulo de reportes de cobranza, seleccionar el tipo de reporte específico para Amigo Paguitos,
    ...                aplicar los filtros necesarios (período, estado de pago, canal de venta), generar el reporte procesando la solicitud,
    ...                validar que el reporte incluya calendario de cobranza, fechas de vencimiento, montos adeudados y estatus de parcialidades,
    ...                mostrar toda la información de cobranza requerida con el desglose de cuotas pendientes y pagadas,
    ...                y verificar que los datos de cobranza coinciden con el calendario administrado por BES.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario autenticado con rol de cobranza; Préstamos de Amigo Paguitos migrados a BES; Calendario de cobranza configurado en el sistema
    Given el usuario accede al módulo de reportes de cobranza en BES con credenciales válidas
    When se selecciona el tipo de reporte de cobranza para préstamos de Amigo Paguitos
    And se aplican los filtros necesarios y se genera el reporte
    Then el reporte muestra toda la información de cobranza requerida con el desglose de cuotas pendientes y pagadas
    And los datos de cobranza coinciden con el calendario administrado por BES
