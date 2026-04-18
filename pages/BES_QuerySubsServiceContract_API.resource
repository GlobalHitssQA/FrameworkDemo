*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - QuerySubsServiceContract
${API_BES_QUERY_SUBS_SERVICE_CONTRACT}    https://bes-telcel-dev.com/api/QuerySubsServiceContract

# Campos de respuesta esperados
${CAMPO_NUMERO_TELEFONICO}                serviceNumber
${CAMPO_SUBSCRIBER_ID}                    subscriberId
${CAMPO_TIPO_CONTRATO}                    contractType
${CAMPO_VIGENCIA_INICIO}                  effectiveDate
${CAMPO_VIGENCIA_FIN}                     expirationDate
${CAMPO_SERVICIOS_CONTRATADOS}            contractedServices
${CAMPO_TERMINOS_CONDICIONES}             termsAndConditions
${CAMPO_ESTADO_CONTRATO}                  contractStatus

*** Keywords ***
Crear Sesión BES QuerySubsServiceContract
    [Documentation]    Crea una sesión HTTP hacia el servicio QuerySubsServiceContract de BES
    Create Session    bes_query_contract    https://bes-telcel-dev.com    verify=False

Preparar Payload Para QuerySubsServiceContract
    [Arguments]    ${numero_telefonico}
    [Documentation]    Prepara el payload JSON para invocar QuerySubsServiceContract
    ${payload}=    Create Dictionary
    ...    serviceNumber=${numero_telefonico}
    ...    includeTermsAndConditions=true
    [Return]    ${payload}

Invocar Servicio QuerySubsServiceContract
    [Arguments]    ${numero_telefonico}
    [Documentation]    Invoca el servicio QuerySubsServiceContract de BES con el número telefónico del suscriptor
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Preparar Payload Para QuerySubsServiceContract    ${numero_telefonico}

    ${response}=    POST On Session    bes_query_contract    /api/QuerySubsServiceContract    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que ESB Recibe Y Envia Petición A BES
    [Arguments]    ${response}
    [Documentation]    Verifica que el ESB recibió la petición y la envió correctamente a BES
    # Verificar que la petición fue procesada (status 200 o 201)
    Should Be True    ${response.status_code} == 200 or ${response.status_code} == 201
    ...    msg=ESB no procesó correctamente la petición. Status code: ${response.status_code}

Verificar Que BES Consulta Contrato De Servicio Del Suscriptor
    [Arguments]    ${response}
    [Documentation]    Verifica que BES consultó y recuperó el contrato de servicio asociado al suscriptor
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta contiene información del contrato
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_NUMERO_TELEFONICO}
    ...    msg=Response no contiene el número telefónico del suscriptor
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_SUBSCRIBER_ID}
    ...    msg=Response no contiene subscriberId

Verificar Que Respuesta Contiene Datos Del Contrato De Servicio
    [Arguments]    ${response}
    [Documentation]    Verifica que la respuesta incluye todos los detalles del contrato de servicio
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar campos obligatorios del contrato
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_TIPO_CONTRATO}
    ...    msg=Response no contiene tipo de contrato

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_VIGENCIA_INICIO}
    ...    msg=Response no contiene fecha de inicio de vigencia

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_VIGENCIA_FIN}
    ...    msg=Response no contiene fecha de fin de vigencia

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_SERVICIOS_CONTRATADOS}
    ...    msg=Response no contiene servicios contratados

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_TERMINOS_CONDICIONES}
    ...    msg=Response no contiene términos y condiciones

    Dictionary Should Contain Key    ${response_json}    ${CAMPO_ESTADO_CONTRATO}
    ...    msg=Response no contiene estado del contrato

    # Obtener valores para validación adicional
    ${tipo_contrato}=    Get From Dictionary    ${response_json}    ${CAMPO_TIPO_CONTRATO}
    ${servicios}=    Get From Dictionary    ${response_json}    ${CAMPO_SERVICIOS_CONTRATADOS}
    ${terminos}=    Get From Dictionary    ${response_json}    ${CAMPO_TERMINOS_CONDICIONES}

    # Validar que los campos no están vacíos
    Should Not Be Empty    ${tipo_contrato}    msg=Tipo de contrato está vacío
    Should Not Be Empty    ${servicios}    msg=Servicios contratados está vacío
    Should Not Be Empty    ${terminos}    msg=Términos y condiciones está vacío

    Log    Tipo de contrato: ${tipo_contrato}
    Log    Servicios contratados: ${servicios}

Verificar Que Datos Del Contrato Se Devuelven Correctamente Al Consumidor
    [Arguments]    ${response}
    [Documentation]    Verifica que el consumidor recibe la información completa del contrato de servicio
    # Verificar que el status code indica éxito
    Should Be Equal As Numbers    ${response.status_code}    200
    ...    msg=Status code no indica éxito. Esperado: 200, Actual: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}

    # Verificar estructura completa de respuesta
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_NUMERO_TELEFONICO}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_SUBSCRIBER_ID}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_TIPO_CONTRATO}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_VIGENCIA_INICIO}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_VIGENCIA_FIN}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_SERVICIOS_CONTRATADOS}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_TERMINOS_CONDICIONES}
    Dictionary Should Contain Key    ${response_json}    ${CAMPO_ESTADO_CONTRATO}

    # Validar que todos los campos contienen información válida
    ${numero_tel}=    Get From Dictionary    ${response_json}    ${CAMPO_NUMERO_TELEFONICO}
    ${subscriber_id}=    Get From Dictionary    ${response_json}    ${CAMPO_SUBSCRIBER_ID}
    ${estado}=    Get From Dictionary    ${response_json}    ${CAMPO_ESTADO_CONTRATO}

    Should Not Be Empty    ${numero_tel}    msg=Número telefónico en respuesta está vacío
    Should Not Be Empty    ${subscriber_id}    msg=SubscriberId en respuesta está vacío
    Should Not Be Empty    ${estado}    msg=Estado del contrato está vacío

    Log    Contrato de servicio devuelto correctamente para el suscriptor ${numero_tel}

Cerrar Sesión BES QuerySubsServiceContract
    [Documentation]    Cierra la sesión HTTP con el servicio BES
    Delete All Sessions
