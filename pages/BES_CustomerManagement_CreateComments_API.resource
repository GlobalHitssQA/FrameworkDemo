*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
# URLs y Endpoints - BES CustomerManagement CreateComments Service
${API_BES_CREATE_COMMENTS_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_CREATE_COMMENTS}            /CreateComments

*** Keywords ***
Preparar Información Del Comentario A Crear
    [Arguments]    ${subscriber_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    ${comentario}=    Create Dictionary
    ...    subscriberId=${subscriber_id}
    ...    tipoComentario=${tipo_comentario}
    ...    descripcion=${descripcion}
    ...    usuarioRegistra=${usuario}
    ...    fecha=${EMPTY}

    ${current_date}=    Evaluate    __import__('datetime').datetime.now().strftime('%Y-%m-%d %H:%M:%S')    modules=datetime
    Set To Dictionary    ${comentario}    fecha=${current_date}

    Set Test Variable    ${DATOS_COMENTARIO}    ${comentario}

    [Return]    ${comentario}

Verificar Datos Del Comentario Completos Y Válidos
    [Arguments]    ${comentario}
    Dictionary Should Contain Key    ${comentario}    subscriberId    msg=Comentario no contiene subscriberId
    Dictionary Should Contain Key    ${comentario}    tipoComentario    msg=Comentario no contiene tipoComentario
    Dictionary Should Contain Key    ${comentario}    descripcion    msg=Comentario no contiene descripcion
    Dictionary Should Contain Key    ${comentario}    usuarioRegistra    msg=Comentario no contiene usuarioRegistra
    Dictionary Should Contain Key    ${comentario}    fecha    msg=Comentario no contiene fecha

    ${subscriber_id}=    Get From Dictionary    ${comentario}    subscriberId
    ${tipo_comentario}=    Get From Dictionary    ${comentario}    tipoComentario
    ${descripcion}=    Get From Dictionary    ${comentario}    descripcion
    ${usuario}=    Get From Dictionary    ${comentario}    usuarioRegistra
    ${fecha}=    Get From Dictionary    ${comentario}    fecha

    Should Not Be Empty    ${subscriber_id}    msg=subscriberId está vacío
    Should Not Be Empty    ${tipo_comentario}    msg=tipoComentario está vacío
    Should Not Be Empty    ${descripcion}    msg=descripcion está vacía
    Should Not Be Empty    ${usuario}    msg=usuarioRegistra está vacío
    Should Not Be Empty    ${fecha}    msg=fecha está vacía

Enviar Solicitud De Creación De Comentario Mediante CreateComments
    [Arguments]    ${comentario}
    Create Session    bes_create_comments    ${API_BES_CREATE_COMMENTS_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json

    ${response}=    POST On Session    bes_create_comments    ${API_ENDPOINT_CREATE_COMMENTS}    json=${comentario}    headers=${headers}    expected_status=any

    Set Test Variable    ${RESPONSE_CREATE_COMMENT}    ${response}

    [Return]    ${response}

Verificar Que BES Recibe La Petición Y Valida Estructura De Datos
    [Arguments]    ${response}
    Should Be True    ${response.status_code} >= 200 and ${response.status_code} < 500    msg=BES no recibió la petición. Status code: ${response.status_code}

Verificar Que Sistema Registra Comentario Exitosamente
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    201    msg=Sistema no registró el comentario. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    commentId    msg=Response no contiene commentId

    ${comment_id}=    Get From Dictionary    ${response_json}    commentId
    Should Not Be Empty    ${comment_id}    msg=commentId está vacío

    Set Test Variable    ${COMMENT_ID}    ${comment_id}

Verificar Que BES Devuelve Confirmación Con CommentId Generado
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    201    msg=BES no devolvió confirmación exitosa. Status code: ${response.status_code}

    ${response_json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key    ${response_json}    commentId    msg=Response no contiene commentId
    Dictionary Should Contain Key    ${response_json}    subscriberId    msg=Response no contiene subscriberId
    Dictionary Should Contain Key    ${response_json}    mensaje    msg=Response no contiene mensaje

    ${comment_id}=    Get From Dictionary    ${response_json}    commentId
    ${subscriber_id}=    Get From Dictionary    ${response_json}    subscriberId
    ${mensaje}=    Get From Dictionary    ${response_json}    mensaje

    Should Not Be Empty    ${comment_id}    msg=commentId está vacío
    Should Not Be Empty    ${subscriber_id}    msg=subscriberId está vacío
    Should Contain    ${mensaje}    creado    ignore_case=True    msg=Mensaje de confirmación no indica creación exitosa

Consultar Comentarios Del Suscriptor Para Verificar Registro
    [Arguments]    ${subscriber_id}
    ${endpoint_consultar}=    Set Variable    /GetCommentsBySubscriber

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    subscriberId=${subscriber_id}

    ${response}=    POST On Session    bes_create_comments    ${endpoint_consultar}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que Comentario Creado Aparece En Lista De Comentarios
    [Arguments]    ${response}    ${comment_id}    ${descripcion}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=No se pudo consultar comentarios. Status code: ${response.status_code}

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
            Log    Comentario encontrado: ${comentario}
            BREAK
        END
    END

    Should Be True    ${comentario_encontrado}    msg=Comentario creado con ID ${comment_id} no aparece en la lista de comentarios del suscriptor
