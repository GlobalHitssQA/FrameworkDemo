*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - API de Inhabilitación BES
${API_BES_INHABILITACION_BASE_URL}           https://bes-telcel-dev.com/api/v1
${API_ENDPOINT_INHABILITACION_TERMINAL}      /inhabilitacion/terminal

# Códigos de error específicos de inhabilitación
${CODIGO_ERROR_PARAMETRO_FALTANTE}           PARAM_MISSING
${MENSAJE_ERROR_PARAMETRO_FALTANTE}          Falta parámetro obligatorio en la petición

*** Keywords ***
Invocar API Inhabilitacion Terminal Sin Numero Telefonico
    [Arguments]    ${imei}    ${accion}
    [Documentation]    Invocar API de inhabilitación sin incluir número telefónico (parámetro obligatorio)
    Create Session    bes_inhabilitacion    ${API_BES_INHABILITACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary
    ...    imei=${imei}
    ...    accionInhabilitacion=${accion}

    ${response}=    POST On Session    bes_inhabilitacion    ${API_ENDPOINT_INHABILITACION_TERMINAL}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Invocar API Inhabilitacion Terminal Sin IMEI
    [Arguments]    ${numero_telefonico}    ${accion}
    [Documentation]    Invocar API de inhabilitación sin incluir IMEI del equipo (parámetro obligatorio)
    Create Session    bes_inhabilitacion    ${API_BES_INHABILITACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary
    ...    numeroTelefonico=${numero_telefonico}
    ...    accionInhabilitacion=${accion}

    ${response}=    POST On Session    bes_inhabilitacion    ${API_ENDPOINT_INHABILITACION_TERMINAL}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Invocar API Inhabilitacion Terminal Con Parametros Completos
    [Arguments]    ${numero_telefonico}    ${imei}    ${accion}
    [Documentation]    Invocar API de inhabilitación con todos los parámetros obligatorios
    Create Session    bes_inhabilitacion    ${API_BES_INHABILITACION_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary
    ...    numeroTelefonico=${numero_telefonico}
    ...    imei=${imei}
    ...    accionInhabilitacion=${accion}

    ${response}=    POST On Session    bes_inhabilitacion    ${API_ENDPOINT_INHABILITACION_TERMINAL}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que API Rechaza Peticion Con Error ESB1 Esquema No Valido
    [Arguments]    ${response}
    [Documentation]    Verifica que la API rechaza la petición con código de error ESB1 por esquema no válido
    # Verificar que el status code indica error (400 Bad Request)
    Should Be Equal As Numbers    ${response.status_code}    400

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar código de error ESB1
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ESB1    msg=Código de error incorrecto. Esperado: ESB1, Actual: ${codigo_error}

    # Verificar mensaje de error indica esquema no válido
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain    ${mensaje_error}    Esquema NO valido    msg=Mensaje de error incorrecto

Verificar Que API Rechaza Peticion Con Mensaje Error Parametro Faltante
    [Arguments]    ${response}
    [Documentation]    Verifica que la API rechaza la petición indicando qué parámetro obligatorio falta
    # Verificar que el status code indica error (400 Bad Request)
    Should Be Equal As Numbers    ${response.status_code}    400

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar mensaje de error indica parámetro faltante
    Dictionary Should Contain Key    ${response_json}    mensajeError    msg=Response no contiene mensaje de error
    ${mensaje_error}=    Get From Dictionary    ${response_json}    mensajeError
    Should Contain Any    ${mensaje_error}    parámetro obligatorio    falta parámetro    msg=Mensaje de error no indica parámetro faltante

Verificar Que Mensaje Error Especifica Parametro Faltante
    [Arguments]    ${response}    ${parametro_esperado}
    [Documentation]    Verifica que el mensaje de error especifica cuál parámetro obligatorio falta
    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    parametroFaltante    msg=Response no especifica parámetro faltante
    ${parametro_faltante}=    Get From Dictionary    ${response_json}    parametroFaltante
    Should Be Equal As Strings    ${parametro_faltante}    ${parametro_esperado}    msg=Parámetro faltante no coincide. Esperado: ${parametro_esperado}, Actual: ${parametro_faltante}

Verificar Que API Acepta Peticion Y Procede Con Inhabilitacion
    [Arguments]    ${response}
    [Documentation]    Verifica que la API acepta la petición cuando tiene todos los parámetros obligatorios
    # Verificar que el status code indica éxito (200 OK o 202 Accepted)
    Should Be True    ${response.status_code} == 200 or ${response.status_code} == 202    msg=Status code no indica petición aceptada. Actual: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la petición fue aceptada
    Dictionary Should Contain Key    ${response_json}    estado    msg=Response no contiene estado
    ${estado}=    Get From Dictionary    ${response_json}    estado
    Should Contain Any    ${estado}    aceptada    procesando    msg=Estado no indica que se aceptó la petición

Verificar Que Proceso Inhabilitacion Fue Iniciado
    [Arguments]    ${response}
    [Documentation]    Verifica que el proceso de inhabilitación del equipo fue iniciado correctamente
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que se retorna ID de proceso de inhabilitación
    Dictionary Should Contain Key    ${response_json}    procesoInhabilitacionId    msg=Response no contiene ID de proceso de inhabilitación
    ${proceso_id}=    Get From Dictionary    ${response_json}    procesoInhabilitacionId
    Should Not Be Empty    ${proceso_id}    msg=ID de proceso de inhabilitación está vacío

    # Verificar que se confirma integración con SITIC-Trustonic
    Dictionary Should Contain Key    ${response_json}    integracionSITIC    msg=Response no contiene estado de integración SITIC
    ${integracion_sitic}=    Get From Dictionary    ${response_json}    integracionSITIC
    Should Contain Any    ${integracion_sitic}    iniciada    en proceso    msg=Integración SITIC no fue iniciada

    Log    Proceso de inhabilitación iniciado con ID: ${proceso_id}
