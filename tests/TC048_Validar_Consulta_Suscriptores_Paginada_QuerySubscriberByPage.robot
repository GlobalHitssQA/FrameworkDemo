*** Settings ***
Documentation    Caso de prueba: Validar consulta de suscriptores paginada vía QuerySubscriberByPage
...              Proceso: Posventa
...              Aplicación: BES
...              Funcionalidad: Consulta paginada de suscriptores
...              Escenario: Verificar la consulta paginada de suscriptores cuando se requiere
...              obtener listados de múltiples suscriptores con paginación
...
...              Precondiciones:
...              - Usuario autenticado en el sistema
...              - Servicio QuerySubscriberByPage disponible
...              - Existencia de suscriptores en el sistema
...              - Conexión a BES activa
...
...              Técnica ISTQB: Particiones de equivalencia
...              Complejidad: Media

Library           SeleniumLibrary
Resource          ../resources/keywords.resource

Test Tags         PruebaGeneradaIA

*** Variables ***
# Datos de prueba - Parámetros de paginación
${PAGE_NUMBER_INICIAL}    1
${PAGE_SIZE}              10

*** Test Cases ***
Validar Consulta De Suscriptores Paginada Vía QuerySubscriberByPage
    [Documentation]    Este caso de prueba verifica que el servicio QuerySubscriberByPage
    ...                de BES procesa correctamente las solicitudes de consulta paginada
    ...                de suscriptores, devolviendo la información de paginación completa
    ...                (totalRecords, totalPages, currentPage) y asegurando que no existen
    ...                duplicados entre páginas consultadas.
    ...
    ...                Pasos:
    ...                1. Verificar que el servicio QuerySubscriberByPage está disponible
    ...                2. Enviar solicitud de consulta paginada con parámetros pageNumber y pageSize
    ...                3. Verificar que BES procesa la consulta y devuelve lista de suscriptores
    ...                4. Validar que la respuesta contiene información de paginación completa
    ...                5. Solicitar la siguiente página incrementando el pageNumber
    ...                6. Verificar que no existen duplicados entre las páginas consultadas
    ...                7. Verificar que totalRecords se mantiene consistente entre páginas
    [Tags]    PruebaGeneradaIA    Funcional    BES    API    Posventa

    # GIVEN: El servicio QuerySubscriberByPage está disponible y existen suscriptores en el sistema
    Dado que el servicio QuerySubscriberByPage está disponible
    Y existen suscriptores en el sistema BES

    # WHEN: Envío solicitud de consulta paginada con parámetros de paginación (pageNumber, pageSize)
    Cuando envío solicitud de consulta paginada con parámetros de paginación
    ...    ${PAGE_NUMBER_INICIAL}    ${PAGE_SIZE}

    # THEN: El sistema BES recibe la petición con los parámetros de paginación y procesa la consulta
    Entonces el sistema BES recibe y procesa la consulta paginada

    # AND: BES ejecuta la búsqueda de suscriptores aplicando los criterios y limitando resultados según pageSize
    Cuando BES ejecuta la búsqueda aplicando criterios de filtrado y paginación

    # THEN: BES devuelve el response con la lista de suscriptores de la página solicitada e información de paginación
    Entonces BES devuelve lista de suscriptores de la página solicitada con información de paginación

    # WHEN: Solicito la siguiente página incrementando el pageNumber y manteniendo los mismos criterios
    Cuando solicito la siguiente página incrementando el pageNumber

    # THEN: El sistema devuelve el siguiente conjunto de registros sin duplicados con la página anterior
    Entonces el sistema devuelve el siguiente conjunto de registros sin duplicados

    # AND: Verifico que el número total de registros (totalRecords) es consistente entre las diferentes páginas
    Entonces el totalRecords se mantiene consistente entre páginas consultadas
