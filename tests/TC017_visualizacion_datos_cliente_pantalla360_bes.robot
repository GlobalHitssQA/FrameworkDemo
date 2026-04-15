*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar que la pantalla 360 de BES muestre correctamente los datos completos del cliente con crédito de Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Consulta    BES    Pantalla360    DatosCliente    Funcional
    [Documentation]    Verificar que la pantalla 360 de BES muestre correctamente los datos completos del cliente con crédito de Amigo Paguitos
    ...                incluyendo datos personales (nombre completo, identificación, datos de contacto), información del equipo
    ...                financiado (marca, modelo, IMEI y características), historial de interacciones y que toda la información
    ...                se presente de forma clara, organizada y correctamente formateada.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Preconditions: Usuario autenticado en BES con permisos de consulta; Cliente con crédito de Amigo Paguitos
    ...                registrado en el sistema; Información del cliente previamente almacenada en BES
    Given el usuario autenticado en BES accede a la pantalla 360 para un cliente con crédito de Amigo Paguitos
    When la pantalla 360 carga con la información del cliente
    Then se muestran correctamente los datos personales del cliente incluyendo nombre completo, identificación y contacto
    And se muestra la información del equipo financiado incluyendo marca, modelo, IMEI y características
    And se muestra el historial de interacciones y transacciones del cliente con cronología de actividades
    And todos los datos se presentan de forma clara, organizada y sin errores de formato

*** Keywords ***
El usuario autenticado en BES accede a la pantalla 360 para un cliente con crédito de Amigo Paguitos
    El usuario ha iniciado sesión en BES con permisos de consulta
    Se accede a la pantalla 360 de BES para un cliente con crédito activo de Amigo Paguitos    5551234567

La pantalla 360 carga con la información del cliente
    El sistema carga la pantalla 360 con la información del cliente

Se muestran correctamente los datos personales del cliente incluyendo nombre completo, identificación y contacto
    Se verifican los datos personales del cliente incluyendo nombre completo, identificación y datos de contacto
    La pantalla despliega nombre completo, tipo y número de identificación, teléfono y correo electrónico del cliente

Se muestra la información del equipo financiado incluyendo marca, modelo, IMEI y características
    Se verifica la información del equipo financiado incluyendo marca, modelo e IMEI
    La pantalla incluye detalles del equipo: marca, modelo, IMEI y características del dispositivo adquirido

Se muestra el historial de interacciones y transacciones del cliente con cronología de actividades
    Se valida el historial de interacciones y transacciones del cliente
    El sistema presenta cronología de actividades del cliente relacionadas con el crédito

Todos los datos se presentan de forma clara, organizada y sin errores de formato
    Se confirma que todos los datos mostrados son legibles y están correctamente formateados
    La información se presenta de forma clara, organizada y sin errores de formato
