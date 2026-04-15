*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar activación de línea celular sobre equipo vendido en esquema Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Activación    BES    AmigoPaguitos    Funcional
    [Documentation]    Verificar la activación de una línea celular sobre un equipo vendido bajo el esquema Amigo Paguitos administrado por BES.
    ...                El sistema debe permitir completar el proceso de venta y financiamiento de un equipo bajo Amigo Paguitos,
    ...                registrar el préstamo en BES con toda la información del equipo, cliente y financiamiento, acceder al módulo
    ...                de activación y reconocer el equipo asociado al préstamo, validar los datos del cliente y mostrar las opciones
    ...                de planes prepagados disponibles, activar la línea celular y asociarla al equipo vendido, y finalmente
    ...                verificar en BES que la activación de línea quede registrada en el historial del préstamo mostrando en la
    ...                pantalla 360 la información del préstamo con el detalle de la línea celular activada sobre el equipo.
    ...                Técnica ISTQB: Casos de uso
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: Préstamo de equipo bajo Amigo Paguitos registrado en BES; Equipo elegible para activación de línea;
    ...                Usuario con permisos de activación autenticado; Cliente con datos completos en el sistema; Inventario de SIM cards disponible;
    ...                Integración con sistemas de provisión activa
    Given el proceso de venta y financiamiento de equipo bajo Amigo Paguitos ha sido completado
    And el sistema registra el préstamo en BES con toda la información del equipo cliente y financiamiento
    When el usuario inicia el proceso de activación de línea celular sobre el equipo vendido
    And el sistema permite acceder al módulo de activación y reconoce el equipo asociado al préstamo de Amigo Paguitos
    And el usuario ingresa los datos del cliente y selecciona el plan prepagado a activar
    And el sistema valida los datos del cliente y muestra las opciones de planes prepagados disponibles
    And el usuario completa el proceso de activación de la línea celular
    Then el sistema activa la línea correctamente y la asocia al equipo vendido bajo Amigo Paguitos
    And en BES la activación de línea queda registrada en el historial del préstamo
    And la pantalla 360 muestra la información del préstamo con el detalle de la línea celular activada sobre el equipo

*** Keywords ***
El proceso de venta y financiamiento de equipo bajo Amigo Paguitos ha sido completado
    El proceso de venta y financiamiento de equipo bajo Amigo Paguitos ha sido completado    Juan Pérez    Calle Principal 123    5551234567    ABC123456    15000    12    12    15.5    2026-04-15

El sistema registra el préstamo en BES con toda la información del equipo cliente y financiamiento
    El préstamo de equipo queda registrado en BES con el esquema Amigo Paguitos    ABC123456

El usuario inicia el proceso de activación de línea celular sobre el equipo vendido
    El usuario accede al módulo de activación de línea celular

El sistema permite acceder al módulo de activación y reconoce el equipo asociado al préstamo de Amigo Paguitos
    El sistema permite acceder y reconoce el equipo asociado al préstamo    ABC123456

El usuario ingresa los datos del cliente y selecciona el plan prepagado a activar
    El usuario ingresa los datos del cliente para activación    Juan Pérez    ABC123456    Calle Principal 123    5551234567
    El usuario selecciona un plan prepagado    Plan Prepago Básico

El sistema valida los datos del cliente y muestra las opciones de planes prepagados disponibles
    El sistema valida los datos y muestra planes prepagados disponibles

El usuario completa el proceso de activación de la línea celular
    El usuario completa el proceso de activación de línea celular    8952071234567890123    5559876543

El sistema activa la línea correctamente y la asocia al equipo vendido bajo Amigo Paguitos
    El sistema activa la línea y la asocia al equipo Amigo Paguitos

En BES la activación de línea queda registrada en el historial del préstamo
    # La verificación se realiza en el siguiente keyword mediante pantalla 360
    Log    La activación de línea quedará visible en pantalla 360

La pantalla 360 muestra la información del préstamo con el detalle de la línea celular activada sobre el equipo
    El usuario verifica en pantalla 360 que la activación de línea quedó registrada en el préstamo    ABC123456
