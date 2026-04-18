*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES CustomerManagement Service GetCustomerbasicinfo
${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_CUSTOMER_BASIC_INFO}        /GetCustomerbasicinfo

*** Keywords ***
Ejecutar API CustomerManagement Service GetCustomerbasicinfo
    [Arguments]    ${numero_telefonico}
    Create Session    bes_customer_management    ${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_customer_management    ${API_ENDPOINT_GET_CUSTOMER_BASIC_INFO}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Consulta Y Genera Respuesta Con Datos Del Cliente
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la consulta GetCustomerbasicinfo. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}
    Should Not Be Empty    ${response_json}    msg=Response JSON está vacío

Verificar Que Response Incluye Campos Firstname MiddleName LastName Con El Nombre Completo Del Cliente
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que todos los campos de nombre existen
    Dictionary Should Contain Key    ${response_json}    Firstname    msg=Response no contiene campo Firstname
    Dictionary Should Contain Key    ${response_json}    middleName    msg=Response no contiene campo middleName
    Dictionary Should Contain Key    ${response_json}    lastName    msg=Response no contiene campo lastName

    ${firstname}=    Get From Dictionary    ${response_json}    Firstname
    ${middlename}=    Get From Dictionary    ${response_json}    middleName
    ${lastname}=    Get From Dictionary    ${response_json}    lastName

    # Verificar que contienen valores alfanuméricos válidos
    Should Not Be Empty    ${firstname}    msg=Campo Firstname está vacío
    Should Not Be Empty    ${lastname}    msg=Campo lastName está vacío

    # middleName puede estar vacío en algunos casos, pero debe existir el campo
    Should Match Regexp    ${firstname}    ^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$    msg=Firstname no contiene valores alfanuméricos válidos: ${firstname}
    Should Match Regexp    ${lastname}    ^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$    msg=lastName no contiene valores alfanuméricos válidos: ${lastname}

Verificar Que Response Incluye Campo CURP Con La Clave Única De Registro De Población
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    CURP    msg=Response no contiene campo CURP

    ${curp}=    Get From Dictionary    ${response_json}    CURP

    Should Not Be Empty    ${curp}    msg=Campo CURP está vacío

    # Verificar que CURP tiene exactamente 18 caracteres alfanuméricos
    ${curp_length}=    Get Length    ${curp}
    Should Be Equal As Numbers    ${curp_length}    18    msg=CURP debe tener 18 caracteres. Longitud actual: ${curp_length}

    # Verificar que CURP tiene formato alfanumérico válido
    Should Match Regexp    ${curp}    ^[A-Z0-9]{18}$    msg=CURP no tiene formato alfanumérico válido: ${curp}

Verificar Que Response Incluye Campo RFC Con El Registro Federal De Contribuyentes
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    RFC    msg=Response no contiene campo RFC

    ${rfc}=    Get From Dictionary    ${response_json}    RFC

    Should Not Be Empty    ${rfc}    msg=Campo RFC está vacío

    # Verificar que RFC tiene 12 o 13 caracteres alfanuméricos
    ${rfc_length}=    Get Length    ${rfc}
    Should Be True    ${rfc_length} == 12 or ${rfc_length} == 13    msg=RFC debe tener 12 o 13 caracteres. Longitud actual: ${rfc_length}

    # Verificar que RFC tiene formato alfanumérico válido
    Should Match Regexp    ${rfc}    ^[A-Z0-9]{12,13}$    msg=RFC no tiene formato alfanumérico válido: ${rfc}

Verificar Que Response Incluye Campos RegionID Y RegionName Con La Información De Región
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que los campos de región existen
    Dictionary Should Contain Key    ${response_json}    RegionID    msg=Response no contiene campo RegionID
    Dictionary Should Contain Key    ${response_json}    regionName    msg=Response no contiene campo regionName

    ${region_id}=    Get From Dictionary    ${response_json}    RegionID
    ${region_name}=    Get From Dictionary    ${response_json}    regionName

    # Verificar que contienen valores válidos
    Should Not Be Empty    ${region_id}    msg=Campo RegionID está vacío
    Should Not Be Empty    ${region_name}    msg=Campo regionName está vacío

    # Verificar que regionName es un string válido
    Should Match Regexp    ${region_name}    ^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$    msg=regionName no contiene valores alfanuméricos válidos: ${region_name}

Verificar Que Todos Los Campos Obligatorios Están Presentes Y Cumplen Con El Formato Esperado
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}

    # Lista de campos obligatorios
    @{campos_obligatorios}=    Create List
    ...    Firstname
    ...    middleName
    ...    lastName
    ...    CURP
    ...    RFC
    ...    RegionID
    ...    regionName

    # Verificar que todos los campos obligatorios existen
    FOR    ${campo}    IN    @{campos_obligatorios}
        Dictionary Should Contain Key    ${response_json}    ${campo}    msg=Campo obligatorio ${campo} no encontrado en la respuesta
    END

    # Verificar que la respuesta es estructuralmente válida
    Should Not Contain    ${response.text}    errorCode    msg=Respuesta contiene errorCode indicando error
    Should Not Contain    ${response.text}    malformed    msg=Respuesta contiene estructura malformada

    # Validar que campos críticos (no opcionales) no están vacíos
    ${firstname}=    Get From Dictionary    ${response_json}    Firstname
    ${lastname}=    Get From Dictionary    ${response_json}    lastName
    ${curp}=    Get From Dictionary    ${response_json}    CURP
    ${rfc}=    Get From Dictionary    ${response_json}    RFC

    Should Not Be Empty    ${firstname}    msg=Campo obligatorio Firstname está vacío
    Should Not Be Empty    ${lastname}    msg=Campo obligatorio lastName está vacío
    Should Not Be Empty    ${curp}    msg=Campo obligatorio CURP está vacío
    Should Not Be Empty    ${rfc}    msg=Campo obligatorio RFC está vacío
