*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la generación correcta del reporte de pagos con información de parcialidades proveniente de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Reportes    BES    AmigoPaguitos    Cobranza
    [Documentation]    Verificar la generación correcta del reporte de pagos con información de parcialidades proveniente de Amigo Paguitos.
    ...                El sistema debe permitir seleccionar los parámetros de consulta requeridos (fecha, tipo de pago, canal),
    ...                generar el reporte con las columnas especificadas en el layout de parcialidades de Amigo Paguitos,
    ...                y validar que los datos mostrados correspondan con la información almacenada en BES.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Usuario con permisos de generación de reportes autenticado en BES; Información de préstamos de Amigo Paguitos migrada a BES; Registros de pagos existentes en el sistema
    Given el usuario accede al módulo de reportes de BES con permisos autorizados
    When se selecciona la opción de generación de reporte de pagos de Amigo Paguitos
    And se ingresan los parámetros de consulta requeridos para el reporte de pagos
    And se ejecuta la generación del reporte de pagos de Amigo Paguitos
    Then el reporte de pagos se genera correctamente con las columnas del layout de Amigo Paguitos
    And el reporte contiene información de cliente, préstamo, parcialidades, fechas de vencimiento y montos pagados
    And los datos del reporte corresponden con la información almacenada en BES proveniente de Amigo Paguitos
