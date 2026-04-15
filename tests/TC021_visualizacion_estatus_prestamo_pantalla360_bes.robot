*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar la visualización del estatus del préstamo y datos del crédito en la pantalla 360 de BES para canales internos y externos
    [Tags]    PruebaGeneradaIA    Consulta    BES    Pantalla360    EstatusPrestamo    Funcional
    [Documentation]    Verificar que la pantalla 360 de BES muestre correctamente el estatus del préstamo y datos del crédito
    ...                para usuarios de canales internos y externos (CAC, CVT, CAT, Distribuidor, Cadena) con permisos de consulta.
    ...                Se valida la visualización de datos del cliente, desglose de cuotas, desglose de pagos, fechas de vencimiento
    ...                y estatus del préstamo, así como el reporte de ventas por vendedor para administradores del Distribuidor.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario de canal autenticado en BES con permisos de consulta; Cliente con préstamo activo de
    ...                Amigo Paguitos existente en el sistema; Conexión a servicios backend disponible
    Given el usuario de canal está autenticado en BES y accede a la pantalla 360
    When se busca y selecciona un cliente con préstamo activo de Amigo Paguitos
    And se accede a la pantalla 360 del cliente seleccionado
    Then el sistema despliega la pantalla 360 con los datos del préstamo
    And se verifican los datos del cliente en la pantalla 360
    And se verifica el desglose de cuotas del préstamo
    And se verifica el desglose de pagos del préstamo
    And se verifican las fechas de vencimiento del préstamo
    And se verifica el estatus del préstamo en la pantalla 360
    And la información del crédito mostrada corresponde con los datos registrados en BES
    And se verifica la visualización de ventas por vendedor en el reporte para administradores del Distribuidor

*** Keywords ***
El usuario de canal está autenticado en BES y accede a la pantalla 360
    El usuario de canal con permisos de consulta ingresa a BES y accede a Vista 360

Se busca y selecciona un cliente con préstamo activo de Amigo Paguitos
    Se busca un cliente que tiene un préstamo activo registrado en BES

Se accede a la pantalla 360 del cliente seleccionado
    El sistema despliega la pantalla 360 del cliente

El sistema despliega la pantalla 360 con los datos del préstamo
    La pantalla 360 muestra la información del crédito

Se verifican los datos del cliente en la pantalla 360
    Se validan los datos del cliente mostrados en pantalla 360

Se verifica el desglose de cuotas del préstamo
    Se valida el desglose de cuotas en la pantalla 360

Se verifica el desglose de pagos del préstamo
    Se valida el desglose de pagos en la pantalla 360

Se verifican las fechas de vencimiento del préstamo
    Se validan las fechas de vencimiento en la pantalla 360

Se verifica el estatus del préstamo en la pantalla 360
    Se valida el estatus del préstamo mostrado en pantalla 360

La información del crédito mostrada corresponde con los datos registrados en BES
    Validar que la información del crédito corresponda con los datos almacenados en BES

Se verifica la visualización de ventas por vendedor en el reporte para administradores del Distribuidor
    Validar visualización del reporte de ventas por vendedor consolidado para administradores
