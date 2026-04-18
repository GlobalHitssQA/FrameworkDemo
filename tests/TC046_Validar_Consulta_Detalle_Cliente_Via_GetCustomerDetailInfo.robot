*** Settings ***
Documentation    Caso de prueba: Validar consulta de detalle de cliente vía GetCustomerDetailInfo
...              Proceso: Posventa
...              Aplicación: BES
...              Funcionalidad: Consulta de detalle completo de cliente
...              Escenario: Verificar la consulta de información detallada del cliente cuando se solicita
...              el detalle completo de un cliente de Amigo Paguitos
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Número telefónico válido asociado a un cliente de Amigo Paguitos
...              - Servicio GetCustomerDetailInfo disponible
...              - Conexión a BES activa
...              - Datos del cliente existentes en CBS
...
...              Técnica ISTQB: Casos de uso
...              Complejidad: Baja

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Cliente Amigo Paguitos
${NUMERO_TELEFONICO_CLIENTE_AP}    5512345678

*** Test Cases ***
Validar Consulta De Detalle De Cliente Vía GetCustomerDetailInfo
    [Documentation]    Este caso de prueba valida la consulta de información detallada del cliente
    ...                cuando se solicita el detalle completo de un cliente de Amigo Paguitos mediante
    ...                el servicio CustomerManagementService.GetCustomerDetailInfo.
    ...
    ...                Pasos:
    ...                1. Enviar solicitud de consulta de detalle de cliente con número telefónico como parámetro
    ...                2. BES recibe la petición y procesa la consulta de detalle del cliente
    ...                3. BES ejecuta búsqueda consolidando datos de múltiples servicios
    ...                4. BES devuelve response con información consolidada del cliente
    ...                5. Capa de integración recibe correctamente toda la información detallada del cliente
    ...                6. Verificar que la respuesta incluye todos los campos esperados con valores válidos
    [Tags]    PruebaGeneradaIA    Integral    BES    API    Posventa

    # GIVEN: Se prepara una solicitud con número telefónico válido de cliente Amigo Paguitos
    Dado que se prepara una solicitud con número telefónico válido de cliente Amigo Paguitos
    ...    ${NUMERO_TELEFONICO_CLIENTE_AP}

    # WHEN: Se envía solicitud al servicio GetCustomerDetailInfo con número telefónico como parámetro
    Cuando se envía solicitud al servicio GetCustomerDetailInfo con número telefónico como parámetro

    # THEN: El sistema BES recibe la petición y procesa la consulta de detalle del cliente
    Entonces el sistema BES recibe la petición y procesa la consulta de detalle del cliente

    # AND: BES ejecuta la búsqueda consolidando datos de múltiples servicios
    Cuando BES ejecuta la búsqueda consolidando datos de múltiples servicios de cliente

    # AND: BES devuelve response con información consolidada del cliente
    Entonces BES devuelve response con información consolidada del cliente

    # AND: Capa de integración recibe la información detallada del cliente con valores válidos
    Cuando capa de integración recibe la información detallada del cliente con valores válidos

    # AND: La respuesta incluye todos los campos esperados: serviceNumber, subscriberId, activeDate, accountId, CustID, billcycletype, IMEI, balance
    Entonces la respuesta incluye campos serviceNumber subscriberId activeDate accountId CustID billcycletype IMEI balance

    # AND: La respuesta incluye nombre completo, CURP y RFC del cliente
    Y la respuesta incluye nombre completo CURP RFC del cliente

    # AND: Todos los campos esperados están presentes con información completa del cliente
    Entonces todos los campos esperados están presentes con información completa del cliente
