*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar visualización de información completa del crédito en pantalla 360 de BES desde canal Cadenas Comerciales
    [Tags]    PruebaGeneradaIA    Consulta    BES    Pantalla360    CadenasComerciales    Funcional
    [Documentation]    Verificar que los usuarios del canal Cadenas Comerciales puedan visualizar la información completa del crédito
    ...                en la pantalla 360 de BES incluyendo monto total, saldo pendiente, plazo, estatus del préstamo,
    ...                datos del equipo financiado, ventas por vendedor y reportes de fuerza de venta.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario Cadenas Comerciales autenticado en BES; Cliente con crédito activo de Amigo Paguitos
    ...                existente en el sistema; Integración entre BES y canales Cadenas Comerciales habilitada
    Given el usuario Cadenas Comerciales está autenticado en BES y accede a la pantalla 360
    When se busca un cliente con crédito activo utilizando número de teléfono o identificador desde Cadenas Comerciales
    Then el sistema localiza al cliente y muestra su información básica desde Cadenas Comerciales
    And se accede correctamente a la pantalla 360 del cliente desde Cadenas Comerciales
    And la pantalla 360 despliega toda la información del crédito incluyendo monto, saldo, plazo y estatus desde Cadenas Comerciales
    And se muestran los datos del equipo financiado asociado al crédito desde Cadenas Comerciales
    And se verifican las ventas por vendedor y reportes de fuerza de venta desde Cadenas Comerciales
    And toda la información desplegada corresponde al crédito consultado desde Cadenas Comerciales

*** Keywords ***
El usuario Cadenas Comerciales está autenticado en BES y accede a la pantalla 360
    El usuario del canal Cadenas Comerciales ingresa al sistema BES con credenciales válidas

Se busca un cliente con crédito activo utilizando número de teléfono o identificador desde Cadenas Comerciales
    Se busca un cliente con crédito activo de Amigo Paguitos desde Cadenas Comerciales    5551234567

El sistema localiza al cliente y muestra su información básica desde Cadenas Comerciales
    El sistema localiza al cliente desde Cadenas Comerciales y muestra sus datos básicos

Se accede correctamente a la pantalla 360 del cliente desde Cadenas Comerciales
    Se accede a la pantalla 360 del cliente desde Cadenas Comerciales

La pantalla 360 despliega toda la información del crédito incluyendo monto, saldo, plazo y estatus desde Cadenas Comerciales
    La pantalla 360 muestra información completa del crédito desde Cadenas Comerciales

Se muestran los datos del equipo financiado asociado al crédito desde Cadenas Comerciales
    Se verifican los datos del equipo financiado desde Cadenas Comerciales

Se verifican las ventas por vendedor y reportes de fuerza de venta desde Cadenas Comerciales
    Se verifican las ventas por vendedor y reportes de fuerza de venta desde Cadenas Comerciales

Toda la información desplegada corresponde al crédito consultado desde Cadenas Comerciales
    Toda la información mostrada corresponde al crédito consultado desde Cadenas Comerciales
