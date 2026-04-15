*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que la pantalla 360 de BES muestre el desglose completo de cuotas del crédito de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Consulta    BES    Pantalla360    DesgloseCuotas    Funcional
    [Documentation]    Verificar que la pantalla 360 de BES muestre el desglose completo de cuotas del crédito de Amigo Paguitos
    ...                incluyendo número de cuota, monto, fecha de vencimiento y estatus de cada cuota, el total de cuotas
    ...                correspondiente al plazo configurado, la periodicidad de pago (semanal, quincenal o mensual) y que
    ...                la suma de todas las cuotas corresponda al monto total financiado del equipo.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario autenticado en BES; Cliente con crédito activo de Amigo Paguitos con plan de cuotas definido; Conexión con servicios de BES disponible
    Given el usuario accede a la pantalla 360 de BES para un cliente con crédito activo de Amigo Paguitos
    When se navega a la sección de desglose de cuotas
    Then la pantalla muestra tabla con todas las cuotas incluyendo número, monto, fecha de vencimiento y estatus
    And el número total de cuotas coincide con el plazo configurado del crédito
    And se muestra la periodicidad de las cuotas configurada para el crédito
    And los montos de las cuotas suman el total del financiamiento

*** Keywords ***
El usuario accede a la pantalla 360 de BES para un cliente con crédito activo de Amigo Paguitos
    Se accede a la pantalla 360 de BES con cliente que tiene crédito activo de Amigo Paguitos    5551234567
    El sistema carga la pantalla 360 con la información del cliente y su crédito

Se navega a la sección de desglose de cuotas
    Se navega a la sección de desglose de cuotas dentro de la pantalla 360
    El sistema muestra la sección de desglose de cuotas del financiamiento

La pantalla muestra tabla con todas las cuotas incluyendo número, monto, fecha de vencimiento y estatus
    La pantalla despliega tabla con todas las cuotas y sus detalles completos

El número total de cuotas coincide con el plazo configurado del crédito
    El total de cuotas mostradas coincide con el plazo del financiamiento    12

Se muestra la periodicidad de las cuotas configurada para el crédito
    El sistema indica claramente la periodicidad de pago del crédito    mensual

Los montos de las cuotas suman el total del financiamiento
    La suma de todas las cuotas corresponde al monto total financiado del equipo    50000
