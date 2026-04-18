*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    String

*** Variables ***
# URLs y Endpoints - BES CustomerManagement GetOfferingProp
${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}        https://bes-telcel-dev.com/api
${API_ENDPOINT_GET_OFFERING_PROP}              /GetOfferingProp

*** Keywords ***
Ejecutar API CustomerManagement GetOfferingProp
    [Arguments]    ${numero_telefonico}
    Create Session    bes_customer_management_get_offering_prop    ${API_BES_CUSTOMER_MANAGEMENT_BASE_URL}    verify=False

    ${headers}=    Create Dictionary    Content-Type=application/json
    ${payload}=    Create Dictionary    serviceNumber=${numero_telefonico}

    ${response}=    POST On Session    bes_customer_management_get_offering_prop    ${API_ENDPOINT_GET_OFFERING_PROP}    json=${payload}    headers=${headers}    expected_status=any

    [Return]    ${response}

Verificar Que BES Procesa La Petición GetOfferingProp Correctamente
    [Arguments]    ${response}
    Should Be Equal As Numbers    ${response.status_code}    200    msg=BES no procesó correctamente la petición GetOfferingProp. Status code: ${response.status_code}

Verificar Que Response Contiene Campo PrimaryOfferingId
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    primaryOfferingId    msg=Response no contiene campo primaryOfferingId

Verificar Que Response Contiene Campo PrimaryOfferingName
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    primaryOfferingName    msg=Response no contiene campo primaryOfferingName

Verificar Que PrimaryOfferingId Tiene Información Válida
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${primary_offering_id}=    Get From Dictionary    ${response_json}    primaryOfferingId
    Should Not Be Empty    ${primary_offering_id}    msg=Campo primaryOfferingId está vacío

Verificar Que PrimaryOfferingName Tiene Información Válida
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${primary_offering_name}=    Get From Dictionary    ${response_json}    primaryOfferingName
    Should Not Be Empty    ${primary_offering_name}    msg=Campo primaryOfferingName está vacío

Verificar Que Datos Retornados Corresponden Al Cliente
    [Arguments]    ${response}    ${numero_telefonico}
    ${response_json}=    Set Variable    ${response.json()}

    # Verificar que la respuesta contiene el número telefónico consultado
    Dictionary Should Contain Key    ${response_json}    serviceNumber    msg=Response no contiene campo serviceNumber
    ${service_number}=    Get From Dictionary    ${response_json}    serviceNumber
    Should Be Equal As Strings    ${service_number}    ${numero_telefonico}    msg=serviceNumber no coincide con el número consultado

    # Verificar que primaryOfferingId y primaryOfferingName contienen información válida
    ${primary_offering_id}=    Get From Dictionary    ${response_json}    primaryOfferingId
    ${primary_offering_name}=    Get From Dictionary    ${response_json}    primaryOfferingName
    Should Not Be Empty    ${primary_offering_id}    msg=primaryOfferingId está vacío para el cliente consultado
    Should Not Be Empty    ${primary_offering_name}    msg=primaryOfferingName está vacío para el cliente consultado

Verificar Que Response Incluye Campo PaymentType
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    Dictionary Should Contain Key    ${response_json}    paymentType    msg=Response no contiene campo paymentType

Verificar Que Campo PaymentType Tiene Valor Correcto
    [Arguments]    ${response}
    ${response_json}=    Set Variable    ${response.json()}
    ${payment_type}=    Get From Dictionary    ${response_json}    paymentType
    Should Not Be Empty    ${payment_type}    msg=Campo paymentType está vacío
    Should Match Regexp    ${payment_type}    ^(Prepago|Postpago|Amigo Paguitos)$    msg=paymentType no tiene un valor esperado: ${payment_type}
