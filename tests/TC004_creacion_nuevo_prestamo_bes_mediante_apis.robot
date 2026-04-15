*** Settings ***
Library           SeleniumLibrary
Resource          ../resources/keywords.resource
Test Tags         PruebaGeneradaIA
Suite Teardown    Close All Browsers

*** Test Cases ***
Verificar creación de nuevo préstamo en BES mediante APIs cuando se recibe información desde Amigo Paguitos
    [Tags]    PruebaGeneradaIA    Venta    BES    API    Funcional
    [Documentation]    Verificar la creación de un nuevo préstamo en BES utilizando las APIs definidas
    ...                cuando se recibe información desde Amigo Paguitos.
    ...                Técnica ISTQB: Particiones de equivalencia
    ...                Complejidad: Media
    ...                Tipo de prueba: Funcional
    ...                Precondiciones: APIs de BES definidas y disponibles; Información de usuario, crédito y equipo válida;
    ...                Parámetros configurables definidos en BES (ciclos y plazos)
    Given la información completa del préstamo está preparada incluyendo datos del cliente, crédito y equipo
    When se invoca la API de creación de préstamo de BES con la información preparada
    Then BES valida la información recibida según reglas de negocio y acepta la información como válida
    And BES crea el registro del préstamo en estado inicial correcto con todos los datos almacenados
    And BES genera el calendario de cobranza según los parámetros del crédito configurado
    And BES retorna el identificador único del préstamo creado a través de la API

*** Keywords ***
La información completa del préstamo está preparada incluyendo datos del cliente, crédito y equipo
    El financiamiento ha sido aprobado y formalizado en Amigo Paguitos    50000    12    12    15.5    2026-04-15

Se invoca la API de creación de préstamo de BES con la información preparada
    Se transfiere la información del crédito desde AP.AG hacia BES

BES valida la información recibida según reglas de negocio y acepta la información como válida
    Verificar validación de reglas de negocio en BES    50000    12    12    15.5

BES crea el registro del préstamo en estado inicial correcto con todos los datos almacenados
    El préstamo queda registrado en BES con toda la información del financiamiento    ABC123456    50000    12    12    15.5    2026-04-15

BES genera el calendario de cobranza según los parámetros del crédito configurado
    Se genera el calendario de pagos en BES    12

BES retorna el identificador único del préstamo creado a través de la API
    Verificar retorno de identificador único del préstamo
