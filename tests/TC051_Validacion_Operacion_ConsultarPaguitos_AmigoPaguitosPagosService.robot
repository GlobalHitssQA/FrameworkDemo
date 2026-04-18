*** Settings ***
Documentation    TC051: Validación de operación ConsultarPaguitos del servicio AmigoPaguitosPagosService
...
...              PROCESO: Venta
...              APLICACIÓN: AmigoPaguitosPagosService
...              FUNCIONALIDAD: Consulta de información de clientes Amigo Paguitos en BES
...
...              ESCENARIO: Verificar la consulta de información de clientes Amigo Paguitos
...              mediante la operación ConsultarPaguitos en el servicio AmigoPaguitosPagosService
...              cuando se proporciona un número telefónico válido
...
...              PRECONDICIONES:
...              - Usuario autenticado en el sistema
...              - Cliente Amigo Paguitos con contrato activo existente en BES
...              - Servicios de BES disponibles y operativos
...              - Capa de Integración configurada correctamente
...
...              TÉCNICA ISTQB: Casos de uso
...              COMPLEJIDAD: Baja

Library          RequestsLibrary
Resource         ../resources/keywords.resource
Test Tags        PruebaGeneradaIA

*** Variables ***
${NUMERO_TELEFONICO_CLIENTE}    5512345678

*** Test Cases ***
Validación de operación ConsultarPaguitos del servicio AmigoPaguitosPagosService
    [Documentation]    Verifica la consulta de información de clientes Amigo Paguitos mediante
    ...                la operación ConsultarPaguitos cuando se proporciona un número telefónico válido
    ...
    ...                STEP 1: Preparar un número telefónico válido de un cliente Amigo Paguitos existente en BES
    ...                STEP 2: Invocar la operación ConsultarPaguitos mediante protocolo SOAP con el número telefónico
    ...                STEP 3: Verificar que la Capa de Integración consume los servicios de BES en el orden correcto
    ...                STEP 4: Validar que el servicio devuelve la información completa del cliente con código ESB0
    [Tags]    PruebaGeneradaIA    AmigoPaguitos    ConsultarPaguitos    Venta    CasosDeUso

    # STEP 1: Preparar un número telefónico válido de un cliente Amigo Paguitos existente en el sistema BES
    Dado que se tiene un número telefónico válido de un cliente Amigo Paguitos existente en BES
    ...    ${NUMERO_TELEFONICO_CLIENTE}

    # STEP 2: Invocar la operación ConsultarPaguitos del servicio AmigoPaguitosPagosService mediante protocolo SOAP
    Cuando se invoca la operación ConsultarPaguitos con el número telefónico

    # STEP 3: Verificar que la Capa de Integración consume los servicios de BES en el orden correcto
    Entonces la Capa de Integración consume los servicios de BES en el orden correcto

    # STEP 4: Validar que el servicio devuelve la información completa del cliente con código ESB0
    Y el servicio devuelve la información completa del cliente con código ESB0
