*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar integración con Vista 360 para consulta completa de información de crédito de Amigo Paguitos desde canales internos y externos
    [Tags]    PruebaGeneradaIA    Consulta    BES    Vista360    IntegralCanales    Funcional
    [Documentation]    Verificar que los canales internos y externos puedan consultar la información completa del crédito
    ...                de Amigo Paguitos desde Vista 360 de BES incluyendo datos del cliente, desglose de cuotas,
    ...                desglose de pagos, fechas de vencimiento, estatus del préstamo, saldo actual e información
    ...                del equipo asociado al financiamiento con historial de pagos realizados y pendientes.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Integral
    ...                Preconditions: Usuario de canal autorizado autenticado en Vista 360; Cliente con préstamo de
    ...                Amigo Paguitos registrado en BES; Integración entre BES y Vista 360 activa
    Given el usuario de canal autorizado está autenticado en Vista 360 de BES
    When se busca un cliente con préstamo activo de Amigo Paguitos por número de línea o identificador
    Then el sistema muestra la información general del cliente y sus préstamos activos
    And se selecciona el préstamo de Amigo Paguitos para visualizar el detalle completo
    And Vista 360 despliega información completa del crédito con datos del cliente, desglose de cuotas, desglose de pagos, fechas de vencimiento, estatus del préstamo y saldo actual
    And se verifica que se muestre el historial de pagos realizados y pagos pendientes con el calendario de cobranza
    And se consulta información del equipo asociado al financiamiento mostrando marca, modelo, IMEI y estatus actual

*** Keywords ***
El usuario de canal autorizado está autenticado en Vista 360 de BES
    El usuario del canal CAC ingresa al sistema BES con credenciales válidas

Se busca un cliente con préstamo activo de Amigo Paguitos por número de línea o identificador
    Se busca un cliente con crédito activo de Amigo Paguitos    5551234567

El sistema muestra la información general del cliente y sus préstamos activos
    El sistema localiza al cliente y muestra sus datos básicos

Se selecciona el préstamo de Amigo Paguitos para visualizar el detalle completo
    Se accede a la pantalla 360 del cliente

Vista 360 despliega información completa del crédito con datos del cliente, desglose de cuotas, desglose de pagos, fechas de vencimiento, estatus del préstamo y saldo actual
    La pantalla 360 muestra información completa del crédito
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

Se verifica que se muestre el historial de pagos realizados y pagos pendientes con el calendario de cobranza
    Navegar a sección de desglose de pagos dentro de pantalla 360
    Verificar que se muestra la sección de historial de pagos
    Verificar que cada registro de pago incluye fecha de acreditación
    Verificar que cada pago incluye monto pagado y aplicación a capital e intereses
    Localizar sección de calendario de cobranza en pantalla 360
    Verificar que se muestra sección de fechas de vencimiento

Se consulta información del equipo asociado al financiamiento mostrando marca, modelo, IMEI y estatus actual
    Verificar datos del equipo financiado en pantalla 360
