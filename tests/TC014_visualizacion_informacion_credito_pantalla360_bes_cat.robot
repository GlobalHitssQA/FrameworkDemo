*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar visualización de información completa del crédito en pantalla 360 de BES desde canal CAT
    [Tags]    PruebaGeneradaIA    Consulta    BES    Pantalla360    CAT    Funcional
    [Documentation]    Verificar que los usuarios del canal CAT puedan visualizar la información completa del crédito
    ...                en la pantalla 360 de BES incluyendo monto total, saldo pendiente, plazo, estatus del préstamo,
    ...                datos del equipo financiado, ventas por vendedor y reportes de fuerza de venta.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario CAT autenticado en BES; Cliente con crédito activo de Amigo Paguitos
    ...                existente en el sistema; Integración entre BES y canales CAT habilitada
    Given el usuario CAT está autenticado en BES y accede a la pantalla 360
    When se busca un cliente con crédito activo utilizando número de teléfono o identificador
    Then el sistema localiza al cliente y muestra su información básica
    And se accede correctamente a la pantalla 360 del cliente
    And la pantalla 360 despliega toda la información del crédito incluyendo monto, saldo, plazo y estatus
    And se muestran los datos del equipo financiado asociado al crédito
    And se verifican las ventas por vendedor y reportes de fuerza de venta
    And toda la información desplegada corresponde al crédito consultado

*** Keywords ***
El usuario CAT está autenticado en BES y accede a la pantalla 360
    El usuario del canal CAT ingresa al sistema BES con credenciales válidas

Se busca un cliente con crédito activo utilizando número de teléfono o identificador
    Se busca un cliente con crédito activo de Amigo Paguitos desde CAT    5551234567

El sistema localiza al cliente y muestra su información básica
    El sistema localiza al cliente desde CAT y muestra sus datos básicos

Se accede correctamente a la pantalla 360 del cliente
    Se accede a la pantalla 360 del cliente desde CAT

La pantalla 360 despliega toda la información del crédito incluyendo monto, saldo, plazo y estatus
    La pantalla 360 muestra información completa del crédito desde CAT

Se muestran los datos del equipo financiado asociado al crédito
    Se verifican los datos del equipo financiado desde CAT

Se verifican las ventas por vendedor y reportes de fuerza de venta
    Se verifican las ventas por vendedor y reportes de fuerza de venta desde CAT

Toda la información desplegada corresponde al crédito consultado
    Toda la información mostrada corresponde al crédito consultado desde CAT
