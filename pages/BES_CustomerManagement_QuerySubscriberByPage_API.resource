*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES CustomerManagement Service QuerySubscriberByPage
${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_QUERY_SUBSCRIBER_BY_PAGE}       /QuerySubscriberByPage

*** Keywords ***
Ejecutar API CustomerManagement Service QuerySubscriberByPage
    [Documentation]    Ejecuta el servicio QuerySubscriberByPage con parámetros de paginación y criterios de búsqueda
    [Arguments]    ${page_number}    ${page_size}    ${criterios_busqueda}=${None}
    Create Session    bes_customer_management    ${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    pageNumber=${page_number}    pageSize=${page_size}

    Run Keyword If    ${criterios_busqueda} is not ${None}    Set To Dictionary    ${payload}    searchCriteria=${criterios_busqueda}

    ${response}=    POST On Session    bes_customer_management    ${API_ENDPOINT_QUERY_SUBSCRIBER_BY_PAGE}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición QuerySubscriberByPage Y Genera Respuesta
    [Documentation]    Verifica que BES procesa correctamente la petición de consulta paginada
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición. Status code: ${response.status_code}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    subscribers    msg=Response no contiene lista de subscribers
    Log    BES procesó exitosamente la consulta paginada de suscriptores

Verificar Que Response Contiene Información De Paginación Completa
    [Documentation]    Verifica que la respuesta incluye totalRecords, totalPages y currentPage
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    totalRecords    msg=Response no contiene campo totalRecords
    Dictionary Should Contain Key    ${response_json}    totalPages    msg=Response no contiene campo totalPages
    Dictionary Should Contain Key    ${response_json}    currentPage    msg=Response no contiene campo currentPage

    ${total_records}=    Get From Dictionary    ${response_json}    totalRecords
    ${total_pages}=    Get From Dictionary    ${response_json}    totalPages
    ${current_page}=    Get From Dictionary    ${response_json}    currentPage

    Should Be True    ${total_records} >= 0    msg=totalRecords debe ser un número no negativo
    Should Be True    ${total_pages} >= 0    msg=totalPages debe ser un número no negativo
    Should Be True    ${current_page} >= 1    msg=currentPage debe ser mayor o igual a 1

    Log    Información de paginación: totalRecords=${total_records}, totalPages=${total_pages}, currentPage=${current_page}
    [Return]    ${total_records}    ${total_pages}    ${current_page}

Verificar Que Response Contiene Lista De Suscriptores De La Página Solicitada
    [Documentation]    Verifica que la respuesta contiene la lista de suscriptores correspondiente a la página solicitada
    [Arguments]    ${response}    ${page_size_esperado}
    ${response_json}=    Set Variable    ${response.json()}

    ${subscribers_list}=    Get From Dictionary    ${response_json}    subscribers
    ${cantidad_suscriptores}=    Get Length    ${subscribers_list}

    Should Be True    ${cantidad_suscriptores} <= ${page_size_esperado}    msg=Cantidad de suscriptores (${cantidad_suscriptores}) excede el pageSize solicitado (${page_size_esperado})
    Log    Se recibieron ${cantidad_suscriptores} suscriptores en la página consultada (máximo permitido: ${page_size_esperado})

    [Return]    ${subscribers_list}

Verificar Que TotalRecords Es Consistente Entre Páginas
    [Documentation]    Verifica que el totalRecords se mantiene constante entre consultas de diferentes páginas
    [Arguments]    ${total_records_pagina1}    ${total_records_pagina2}
    Should Be Equal As Numbers    ${total_records_pagina1}    ${total_records_pagina2}    msg=totalRecords no es consistente entre páginas. Página 1: ${total_records_pagina1}, Página 2: ${total_records_pagina2}
    Log    totalRecords es consistente entre páginas consultadas: ${total_records_pagina1}

Verificar Que No Existen Duplicados Entre Páginas
    [Documentation]    Verifica que los suscriptores de diferentes páginas no se duplican
    [Arguments]    ${subscribers_pagina1}    ${subscribers_pagina2}
    ${ids_pagina1}=    Create List
    ${ids_pagina2}=    Create List

    FOR    ${subscriber}    IN    @{subscribers_pagina1}
        ${subscriber_id}=    Get From Dictionary    ${subscriber}    subscriberId
        Append To List    ${ids_pagina1}    ${subscriber_id}
    END

    FOR    ${subscriber}    IN    @{subscribers_pagina2}
        ${subscriber_id}=    Get From Dictionary    ${subscriber}    subscriberId
        Append To List    ${ids_pagina2}    ${subscriber_id}
    END

    FOR    ${id_pagina1}    IN    @{ids_pagina1}
        List Should Not Contain Value    ${ids_pagina2}    ${id_pagina1}    msg=El subscriberId ${id_pagina1} aparece en ambas páginas (duplicado detectado)
    END

    Log    No se encontraron duplicados entre las páginas consultadas
