*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que la pantalla 360 de BES muestre correctamente las fechas de vencimiento del calendario de cobranza del crédito de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Consulta    BES    Pantalla360    FechasVencimiento    Funcional
    [Documentation]    Verificar que la pantalla 360 de BES muestre correctamente las fechas de vencimiento del calendario de cobranza
    ...                del crédito de Amigo Paguitos incluyendo la fecha de vencimiento de la próxima cuota pendiente con formato
    ...                claro (día/mes/año), fechas de vencimiento de todas las cuotas futuras según la periodicidad configurada
    ...                (semanal, quincenal o mensual), indicador especial para cuotas vencidas si existen pagos atrasados, y que
    ...                las fechas mostradas coincidan con el calendario de cobranza administrado por BES según la configuración
    ...                del crédito.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario autenticado en BES; Cliente con crédito activo de Amigo Paguitos con calendario de cobranza definido; BES administrando el calendario de cobranza del financiamiento
    Given el usuario accede a la pantalla 360 de BES para un cliente con crédito activo
    When se localiza la sección de calendario de cobranza o fechas de vencimiento
    Then el sistema muestra la fecha de vencimiento de la próxima cuota pendiente con formato claro
    And se muestran las fechas de vencimiento de todas las cuotas futuras según la periodicidad configurada
    And se indican las cuotas vencidas si existen pagos atrasados
    And las fechas de vencimiento corresponden al calendario de cobranza controlado por BES

*** Keywords ***
El usuario accede a la pantalla 360 de BES para un cliente con crédito activo
    El usuario accede a la pantalla 360 de BES para cliente con crédito de Amigo Paguitos    5551234567
    El sistema carga la pantalla 360 con información del cliente y su crédito

Se localiza la sección de calendario de cobranza o fechas de vencimiento
    Se localiza la sección de calendario de cobranza en pantalla 360
    El sistema muestra fechas de vencimiento de las cuotas del crédito

El sistema muestra la fecha de vencimiento de la próxima cuota pendiente con formato claro
    La pantalla destaca la fecha de vencimiento de la próxima cuota pendiente

Se muestran las fechas de vencimiento de todas las cuotas futuras según la periodicidad configurada
    El sistema despliega fechas de vencimiento de todas las cuotas futuras    mensual

Se indican las cuotas vencidas si existen pagos atrasados
    El sistema resalta las cuotas vencidas si existen pagos atrasados

Las fechas de vencimiento corresponden al calendario de cobranza controlado por BES
    Las fechas de vencimiento corresponden al calendario de cobranza de BES    mensual
