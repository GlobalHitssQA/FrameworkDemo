*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    DateTime

*** Variables ***
# URLs y Endpoints - BES CreateAccountComments Service
${API_BES_CREATE_ACCOUNT_COMMENTS_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_CREATE_ACCOUNT_COMMENTS}            /CreateAccountComments

*** Keywords ***
Preparar Información Del Comentario De Cuenta A Crear
    [Arguments]    ${account_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    ${comentario}=    Create Dictionary
    ...    accountId=${account_id}
    ...    tipoComentario=${tipo_comentario}
    ...    descripcion=${descripcion}
    ...    usuarioRegistra=${usuario}
    ...    fecha=${EMPTY}

    ${current_date}=    Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    Set To Dictionary    ${comentario}    fecha=${current_date}

    Set Test Variable    ${DATOS_COMENTARIO_CUENTA}    ${comentario}

    [Return]    ${comentario}

Verificar Datos Del Comentario De Cuenta Completos Y Válidos
    [Arguments]    ${comentario}
    Dictionary Should Contain Key    ${comentario}    accountId    msg=Comentario no contiene accountId
    Dictionary Should Contain Key    ${comentario}    tipoComentario    msg=Comentario no contiene tipoComentario
    Dictionary Should Contain Key    ${comentario}    descripcion    msg=Comentario no contiene descripcion
    Dictionary Should Contain Key    ${comentario}    usuarioRegistra    msg=Comentario no contiene usuarioRegistra
    Dictionary Should Contain Key    ${comentario}    fecha    msg=Comentario no contiene fecha

    ${account_id}=    Get From Dictionary    ${comentario}    accountId
    ${tipo_comentario}=    Get From Dictionary    ${comentario}    tipoComentario
    ${descripcion}=    Get From Dictionary    ${comentario}    descripcion
    ${usuario}=    Get From Dictionary    ${comentario}    usuarioRegistra
    ${fecha}=    Get From Dictionary    ${comentario}    fecha

    Should Not Be Empty    ${account_id}    msg=accountId está vacío
    Should Not Be Empty    ${tipo_comentario}    msg=tipoComentario está vacío
    Should Not Be Empty    ${descripcion}    msg=descripcion está vacía
    Should Not Be Empty    ${usuario}    msg=usuarioRegistra está vacío
    Should Not Be Empty    ${fecha}    msg=fecha está vacía

Enviar Solicitud De Creación De Comentario De Cuenta Mediante CreateComments
    [Arguments]    ${comentario}
    Create Session    bes_create_account_comments    ${API_BES_CREATE_ACCOUNT_COMMENTS_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json

    ${response}=    POST On Session    bes_create_account_comments    ${API_ENDPOINT_CREATE_ACCOUNT_COMMENTS}    json=${comentario}    headers=${headers}    expected_status=any

    Set Test Variable    ${RESPONSE_CREATE_ACCOUNT_COMMENT}    ${response}

    [Return]    ${response}

Verificar Que BES Recibe La Petición De Comentario De Cuenta Y Valida Estructura
    [Arguments]    ${response}
    Should Be True    ${response.status_code} >= 200 and ${response.status_code} < 500    msg=BES no recibió la petición. Status code: ${response.status_code}

Verificar Que Sistema Registra Comentario De Cuenta Exitosamente
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    201    msg=Sistema no registró el comentario de cuenta. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    commentId    msg=Response no contiene commentId

    ${comment_id}=    Get From Dictionary    ${response_json}    commentId
    Should Not Be Empty    ${comment_id}    msg=commentId está vacío

    Set Test Variable    ${COMMENT_ID_CUENTA}    ${comment_id}

Verificar Que BES Devuelve Confirmación Con CommentId Y Timestamp De Registro
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    201    msg=BES no devolvió confirmación exitosa. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    commentId    msg=Response no contiene commentId
    Dictionary Should Contain Key    ${response_json}    accountId    msg=Response no contiene accountId
    Dictionary Should Contain Key    ${response_json}    timestamp    msg=Response no contiene timestamp de registro

    ${comment_id}=    Get From Dictionary    ${response_json}    commentId
    ${account_id}=    Get From Dictionary    ${response_json}    accountId
    ${timestamp}=    Get From Dictionary    ${response_json}    timestamp

    Should Not Be Empty    ${comment_id}    msg=commentId está vacío
    Should Not Be Empty    ${account_id}    msg=accountId está vacío
    Should Not Be Empty    ${timestamp}    msg=timestamp está vacío

    Set Test Variable    ${COMMENT_ID_CUENTA}    ${comment_id}
    Set Test Variable    ${TIMESTAMP_REGISTRO}    ${timestamp}

    Log    Comentario de cuenta creado exitosamente - commentId: ${comment_id}, accountId: ${account_id}, timestamp: ${timestamp}

Consultar Comentarios De La Cuenta Para Verificar Registro
    [Arguments]    ${account_id}
    ${endpoint_consultar}=    Set Variable    /GetAccountComments

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    accountId=${account_id}

    ${response}=    POST On Session    bes_create_account_comments    ${endpoint_consultar}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que Comentario Creado Aparece En Lista De Comentarios De Cuenta
    [Arguments]    ${response}    ${comment_id}    ${descripcion}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=No se pudo consultar comentarios de cuenta. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    comentarios    msg=Response no contiene lista de comentarios

    ${comentarios}=    Get From Dictionary    ${response_json}    comentarios

    ${comentario_encontrado}=    Set Variable    ${False}

    FOR    ${comentario}    IN    @{comentarios}
        ${current_comment_id}=    Get From Dictionary    ${comentario}    commentId
        ${current_descripcion}=    Get From Dictionary    ${comentario}    descripcion

        ${is_match}=    Evaluate    '${current_comment_id}' == '${comment_id}' and '${descripcion}' in '${current_descripcion}'

        IF    ${is_match}
            ${comentario_encontrado}=    Set Variable    ${True}
            Log    Comentario de cuenta encontrado: ${comentario}
            BREAK
        END
    END

    Should Be True    ${comentario_encontrado}    msg=Comentario creado con ID ${comment_id} no aparece en la lista de comentarios de la cuenta

Verificar Que Comentario De Cuenta Contiene Toda La Información Registrada
    [Arguments]    ${response}    ${comment_id}    ${descripcion_esperada}    ${usuario_esperado}
    ${response_json}=    Set Variable    ${response.json()}
    ${comentarios}=    Get From Dictionary    ${response_json}    comentarios

    ${comentario_verificado}=    Set Variable    ${False}

    FOR    ${comentario}    IN    @{comentarios}
        ${current_comment_id}=    Get From Dictionary    ${comentario}    commentId
        IF    '${current_comment_id}' == '${comment_id}'
            ${descripcion}=    Get From Dictionary    ${comentario}    descripcion
            ${usuario}=    Get From Dictionary    ${comentario}    usuarioRegistra
            Should Be Equal As Strings    ${descripcion}    ${descripcion_esperada}    msg=La descripción del comentario no coincide
            Should Be Equal As Strings    ${usuario}    ${usuario_esperado}    msg=El usuario del comentario no coincide
            ${comentario_verificado}=    Set Variable    ${True}
            Log    Comentario de cuenta verificado con todos los datos correctos
            BREAK
        END
    END

    Should Be True    ${comentario_verificado}    msg=No se pudo verificar el comentario con ID ${comment_id}
