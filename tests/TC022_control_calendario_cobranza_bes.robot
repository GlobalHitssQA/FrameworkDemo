*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que BES controle y administre el calendario de cobranza de los préstamos de Amigo Paguitos de forma automática
    [Tags]    PruebaGeneradaIA    Cobranza    BES    Funcional
    [Documentation]    Verificar que BES controle y administre el calendario de cobranza de los préstamos
    ...                de Amigo Paguitos de forma automática, generando fechas de vencimiento según
    ...                frecuencia y plazo configurados, y actualizando el estatus de cuotas vencidas.
    ...                Técnica ISTQB: Tabla de decisión
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: BES configurado con tipos de ciclos (semanal, quincenal, mensual)
    ...                y plazos (3, 6, 9, 12); APIs de integración con Amigo Paguitos AG funcionales;
    ...                Usuario autenticado en el sistema
    Given se crea un préstamo nuevo en BES a través de las APIs especificando plazo y frecuencia de pago
    When BES registra el préstamo con los parámetros de plazo y frecuencia configurados
    Then BES genera automáticamente el calendario de cobranza según el número de ciclos y plazos
    And el sistema muestra el calendario con las fechas de vencimiento programadas para cada parcialidad
    And el número de cuotas en el calendario corresponde al plazo seleccionado
    And BES actualiza automáticamente el estatus de las cuotas al llegar la fecha de vencimiento

*** Keywords ***
Se crea un préstamo nuevo en BES a través de las APIs especificando plazo y frecuencia de pago
    Se crea un préstamo nuevo mediante API especificando plazo y frecuencia de pago    50000    12    12    15.5    2026-04-15    mensual

BES registra el préstamo con los parámetros de plazo y frecuencia configurados
    BES registra el préstamo con los parámetros configurados de plazo y frecuencia    ABC123456    50000    12    12    15.5    2026-04-15

BES genera automáticamente el calendario de cobranza según el número de ciclos y plazos
    BES genera automáticamente el calendario de cobranza según número de ciclos y plazos    mensual    12

El sistema muestra el calendario con las fechas de vencimiento programadas para cada parcialidad
    El sistema muestra el calendario con las fechas de vencimiento calculadas    12

El número de cuotas en el calendario corresponde al plazo seleccionado
    El número de cuotas en el calendario corresponde al plazo configurado    12

BES actualiza automáticamente el estatus de las cuotas al llegar la fecha de vencimiento
    BES actualiza automáticamente el estatus de las cuotas al llegar la fecha de vencimiento
