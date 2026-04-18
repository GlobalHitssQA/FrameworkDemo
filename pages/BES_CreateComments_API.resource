*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    DateTime

*** Variables ***
# URLs y Endpoints - BES CreateComments Service
${API_BES_CREATE_COMMENTS_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_CREATE_COMMENTS}            /CreateComments

*** Keywords ***
Ejecutar API CreateComments Con Datos Del Comentario
    [Arguments]    ${subscriber_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    Create Session    bes_create_comments    ${API_BES_CREATE_COMMENTS_BASE_URL}    verify=False

    ${fecha_actual}=    Get Current Date    result_format=%Y-%m-%d %H:%M:%S

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary
    ...    subscriberId=${subscriber_id}
    ...    tipoComentario=${tipo_comentario}
    ...    descripcion=${descripcion}
    ...    usuario=${usuario}
    ...    fecha=${fecha_actual}

    ${response}=    POST On Session    bes_create_comments    ${API_ENDPOINT_CREATE_COMMENTS}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Recibe La Petición Y Valida Estructura De Datos
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición. Status code: ${response.status_code}

Verificar Que Sistema Registra Comentario Exitosamente
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    success    msg=Response no contiene campo success
    ${success}=    Get From Dictionary    ${response_json}    success
    Should Be True    ${success}    msg=La creación del comentario no fue exitosa

Verificar Que Response Contiene CommentId Generado
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    commentId    msg=Response no contiene campo commentId
    ${comment_id}=    Get From Dictionary    ${response_json}    commentId
    Should Not Be Empty    ${comment_id}    msg=Campo commentId está vacío
    [Return]    ${comment_id}

Consultar Comentarios Del Suscriptor
    [Arguments]    ${subscriber_id}
    Create Session    bes_comments_query    ${API_BES_CREATE_COMMENTS_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${endpoint_consulta}=    Set Variable    /GetComments?subscriberId=${subscriber_id}

    ${response}=    GET On Session    bes_comments_query    ${endpoint_consulta}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que Comentario Creado Aparece En Lista De Comentarios
    [Arguments]    ${response}    ${comment_id}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    comments    msg=Response no contiene campo comments
    ${comments_list}=    Get From Dictionary    ${response_json}    comments

    ${comment_found}=    Set Variable    ${False}
    FOR    ${comment}    IN    @{comments_list}
        ${comment_id_actual}=    Get From Dictionary    ${comment}    commentId
        IF    '${comment_id_actual}' == '${comment_id}'
            ${comment_found}=    Set Variable    ${True}
            BREAK
        END
    END

    Should Be True    ${comment_found}    msg=El comentario con commentId ${comment_id} no fue encontrado en la lista de comentarios del suscriptor

Verificar Que Comentario Contiene Toda La Información Registrada
    [Arguments]    ${response}    ${comment_id}    ${descripcion_esperada}    ${usuario_esperado}
    ${response_json}=    Set Variable    ${response.json()}
    ${comments_list}=    Get From Dictionary    ${response_json}    comments

    FOR    ${comment}    IN    @{comments_list}
        ${comment_id_actual}=    Get From Dictionary    ${comment}    commentId
        IF    '${comment_id_actual}' == '${comment_id}'
            ${descripcion}=    Get From Dictionary    ${comment}    descripcion
            ${usuario}=    Get From Dictionary    ${comment}    usuario
            Should Be Equal As Strings    ${descripcion}    ${descripcion_esperada}    msg=La descripción del comentario no coincide
            Should Be Equal As Strings    ${usuario}    ${usuario_esperado}    msg=El usuario del comentario no coincide
            BREAK
        END
    END
