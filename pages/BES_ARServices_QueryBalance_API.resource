*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES ARServices QueryBalance
${API_BES_AR_SERVICES_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_QUERY_BALANCE}          /QueryBalance

*** Keywords ***
Ejecutar API ArService QueryBalance
    [Arguments]    ${numero_telefonico}
    Create Session    bes_ar_service    ${API_BES_AR_SERVICES_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_ar_service    ${API_ENDPOINT_QUERY_BALANCE}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición QueryBalance Y Genera Respuesta Con Información De Balance
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición QueryBalance. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}
    Should Not Be Empty    ${response_json}    msg=Response JSON está vacío

Verificar Que Response Incluye Campo balancetype Con Tipo De Balance De La Cuenta
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    balancetype    msg=Response no contiene campo balancetype

    ${balance_type}=    Get From Dictionary    ${response_json}    balancetype

    Should Not Be Empty    ${balance_type}    msg=Campo balancetype está vacío

    # Validar que balancetype tiene un valor válido del catálogo
    @{valores_validos}=    Create List    Prepago    Pospago    Híbrido    Crédito    Débito
    List Should Contain Value    ${valores_validos}    ${balance_type}    msg=Campo balancetype no contiene un valor válido del catálogo: ${balance_type}

Verificar Que Response Incluye Campo ARBalance Con El Monto Del Balance
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    ARBalance    msg=Response no contiene campo ARBalance

    ${ar_balance}=    Get From Dictionary    ${response_json}    ARBalance

    Should Not Be Empty    ${ar_balance}    msg=Campo ARBalance está vacío

    # Verificar que ARBalance es un valor numérico
    Should Match Regexp    ${ar_balance}    ^-?[0-9]+\\.?[0-9]*$    msg=ARBalance no es un valor numérico válido: ${ar_balance}

Verificar Que Balance Retornado Corresponde Al Cliente Identificado Por Número Telefónico
    [Arguments]    ${response}    ${numero_telefonico_esperado}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta contiene CustID para validación cruzada
    Dictionary Should Contain Key    ${response_json}    CustID    msg=Response no contiene campo CustID para verificación cruzada

    ${cust_id}=    Get From Dictionary    ${response_json}    CustID
    Should Not Be Empty    ${cust_id}    msg=Campo CustID está vacío

    # Verificar que la respuesta contiene serviceNumber que coincide con el número consultado
    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene campo serviceNumber

    ${service_number}=    Get From Dictionary    ${response_json}    serviceNumber
    Should Be Equal As Strings    ${service_number}    ${numero_telefonico_esperado}    msg=serviceNumber no coincide. Esperado: ${numero_telefonico_esperado}, Actual: ${service_number}

Verificar Que Respuesta Cumple Con El Esquema XML JSON Definido En La Especificación
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Validar estructura de la respuesta - campos obligatorios
    @{campos_obligatorios}=    Create List
    ...    serviceNumber
    ...    CustID
    ...    balancetype
    ...    ARBalance

    FOR    ${campo}    IN    @{campos_obligatorios}
        Dictionary Should Contain Key    ${response_json}    ${campo}    msg=Campo obligatorio ${campo} no encontrado en la respuesta
        ${valor}=    Get From Dictionary    ${response_json}    ${campo}
        Should Not Be Empty    ${valor}    msg=Campo obligatorio ${campo} está vacío
    END

    # Verificar que no hay errores de formato
    Should Not Contain    ${response.text}    errorCode    msg=Respuesta contiene errorCode indicando error de formato
    Should Not Contain    ${response.text}    malformed    msg=Respuesta contiene estructura malformada
