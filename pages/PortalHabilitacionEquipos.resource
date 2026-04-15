*** Variables ***
${PH_URL}                                       https://portal-habilitacion.telcel.com
${PH_MENU_SOLICITUDES}                          id:menu_solicitudes_habilitacion
${PH_TABLA_SOLICITUDES_INHABILITACION}          xpath://table[@id='tabla_solicitudes_inhabilitacion']
${PH_CAMPO_ID_SOLICITUD}                        xpath://td[@data-field='id_solicitud']
${PH_CAMPO_IMEI_SOLICITUD}                      xpath://td[@data-field='imei']
${PH_CAMPO_MOTIVO_INHABILITACION}               xpath://td[@data-field='motivo']
${PH_CAMPO_ORIGEN_SOLICITUD}                    xpath://td[@data-field='origen_solicitud']
${PH_CAMPO_ESTATUS_SOLICITUD}                   xpath://td[@data-field='estatus_solicitud']
${PH_BOTON_PROCESAR_INHABILITACION}             css:.btn-procesar-inhabilitacion
${PH_MENSAJE_INHABILITACION_PROCESADA}          xpath://div[contains(text(),'Inhabilitación procesada')]
${PH_MENSAJE_EQUIPO_INHABILITADO}               xpath://div[contains(text(),'Equipo inhabilitado exitosamente')]
${PH_CAMPO_CONFIRMACION_INHABILITACION}         xpath://div[@data-field='confirmacion_inhabilitacion']
${PH_CAMPO_FECHA_INHABILITACION}                xpath://td[@data-field='fecha_inhabilitacion']
${PH_BOTON_ENVIAR_CONFIRMACION_BES}             css:.btn-enviar-confirmacion-bes
${PH_MENSAJE_CONFIRMACION_ENVIADA_BES}          xpath://div[contains(text(),'Confirmación enviada a BES')]
${PH_TABLA_SOLICITUDES_HABILITACION}            xpath://table[@id='tabla_solicitudes_habilitacion']
${PH_BOTON_PROCESAR_HABILITACION}               css:.btn-procesar-habilitacion
${PH_MENSAJE_HABILITACION_PROCESADA}            xpath://div[contains(text(),'Habilitación procesada')]
${PH_MENSAJE_EQUIPO_HABILITADO}                 xpath://div[contains(text(),'Equipo habilitado exitosamente')]
${PH_CAMPO_CONFIRMACION_HABILITACION}           xpath://div[@data-field='confirmacion_habilitacion']
${PH_CAMPO_FECHA_HABILITACION}                  xpath://td[@data-field='fecha_habilitacion']
${PH_MENU_EQUIPOS_BLOQUEADOS}                   id:menu_equipos_bloqueados
${PH_TABLA_EQUIPOS_BLOQUEADOS}                  xpath://table[@id='tabla_equipos_bloqueados']
${PH_CAMPO_IMEI_EQUIPO_BLOQUEADO}               xpath://td[@data-field='imei_bloqueado']
${PH_CAMPO_ESTATUS_EQUIPO}                      xpath://td[@data-field='estatus_equipo']
${PH_MENU_HISTORIAL_OPERACIONES}                id:menu_historial_operaciones
${PH_TABLA_HISTORIAL_OPERACIONES}               xpath://table[@id='tabla_historial_operaciones']
${PH_CAMPO_TIPO_OPERACION}                      xpath://td[@data-field='tipo_operacion']
${PH_CAMPO_FECHA_OPERACION}                     xpath://td[@data-field='fecha_operacion']
${PH_CAMPO_RESULTADO_OPERACION}                 xpath://td[@data-field='resultado_operacion']

*** Keywords ***
Abrir Portal de Habilitación de Equipos
    Go To    ${PH_URL}
    Wait Until Page Contains Element    ${PH_MENU_SOLICITUDES}    timeout=10s

Acceder a módulo de solicitudes de inhabilitación
    Click Element    ${PH_MENU_SOLICITUDES}
    Wait Until Element Is Visible    ${PH_TABLA_SOLICITUDES_INHABILITACION}    timeout=10s

Verificar recepción de solicitud de inhabilitación desde BES
    [Arguments]    ${imei}=359876543210987    ${motivo}=Incumplimiento de pago
    Wait Until Element Is Visible    ${PH_TABLA_SOLICITUDES_INHABILITACION}    timeout=10s
    ${xpath_solicitud}=    Set Variable    ${PH_TABLA_SOLICITUDES_INHABILITACION}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_solicitud}
    ${imei_recibido}=    Get Text    ${xpath_solicitud}//td[@data-field='imei']
    ${motivo_recibido}=    Get Text    ${xpath_solicitud}//td[@data-field='motivo']
    ${origen}=    Get Text    ${xpath_solicitud}//td[@data-field='origen_solicitud']
    Should Contain    ${imei_recibido}    ${imei}
    Should Contain    ${motivo_recibido}    ${motivo}
    Should Contain    ${origen}    BES
    Log    Solicitud de inhabilitación recibida - IMEI: ${imei_recibido}, Motivo: ${motivo_recibido}, Origen: ${origen}

Procesar inhabilitación del equipo
    [Arguments]    ${imei}=359876543210987
    ${xpath_solicitud}=    Set Variable    ${PH_TABLA_SOLICITUDES_INHABILITACION}//tr[contains(., '${imei}')]
    ${xpath_boton}=    Set Variable    ${xpath_solicitud}//button[contains(@class, 'btn-procesar-inhabilitacion')]
    Wait Until Element Is Visible    ${xpath_boton}    timeout=10s
    Click Button    ${xpath_boton}
    Wait Until Element Is Visible    ${PH_MENSAJE_INHABILITACION_PROCESADA}    timeout=15s
    Log    Proceso de inhabilitación ejecutado para IMEI ${imei}

Verificar equipo inhabilitado en Portal
    [Arguments]    ${imei}=359876543210987
    Wait Until Element Is Visible    ${PH_MENSAJE_EQUIPO_INHABILITADO}    timeout=10s
    ${confirmacion}=    Get Text    ${PH_CAMPO_CONFIRMACION_INHABILITACION}
    Should Contain Any    ${confirmacion}    Inhabilitado    Bloqueado    Exitoso
    Log    Equipo IMEI ${imei} inhabilitado exitosamente

Enviar confirmación de inhabilitación a BES
    [Arguments]    ${imei}=359876543210987
    Click Button    ${PH_BOTON_ENVIAR_CONFIRMACION_BES}
    Wait Until Element Is Visible    ${PH_MENSAJE_CONFIRMACION_ENVIADA_BES}    timeout=10s
    Log    Confirmación de inhabilitación enviada a BES para IMEI ${imei}

Acceder a módulo de solicitudes de habilitación
    Click Element    ${PH_MENU_SOLICITUDES}
    Wait Until Element Is Visible    ${PH_TABLA_SOLICITUDES_HABILITACION}    timeout=10s

Verificar recepción de solicitud de habilitación desde BES
    [Arguments]    ${imei}=359876543210987
    Wait Until Element Is Visible    ${PH_TABLA_SOLICITUDES_HABILITACION}    timeout=10s
    ${xpath_solicitud}=    Set Variable    ${PH_TABLA_SOLICITUDES_HABILITACION}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_solicitud}
    ${imei_recibido}=    Get Text    ${xpath_solicitud}//td[@data-field='imei']
    ${origen}=    Get Text    ${xpath_solicitud}//td[@data-field='origen_solicitud']
    Should Contain    ${imei_recibido}    ${imei}
    Should Contain    ${origen}    BES
    Log    Solicitud de habilitación recibida - IMEI: ${imei_recibido}, Origen: ${origen}

Procesar habilitación del equipo
    [Arguments]    ${imei}=359876543210987
    ${xpath_solicitud}=    Set Variable    ${PH_TABLA_SOLICITUDES_HABILITACION}//tr[contains(., '${imei}')]
    ${xpath_boton}=    Set Variable    ${xpath_solicitud}//button[contains(@class, 'btn-procesar-habilitacion')]
    Wait Until Element Is Visible    ${xpath_boton}    timeout=10s
    Click Button    ${xpath_boton}
    Wait Until Element Is Visible    ${PH_MENSAJE_HABILITACION_PROCESADA}    timeout=15s
    Log    Proceso de habilitación ejecutado para IMEI ${imei}

Verificar equipo habilitado en Portal
    [Arguments]    ${imei}=359876543210987
    Wait Until Element Is Visible    ${PH_MENSAJE_EQUIPO_HABILITADO}    timeout=10s
    ${confirmacion}=    Get Text    ${PH_CAMPO_CONFIRMACION_HABILITACION}
    Should Contain Any    ${confirmacion}    Habilitado    Activo    Exitoso
    Log    Equipo IMEI ${imei} habilitado exitosamente

Enviar confirmación de habilitación a BES
    [Arguments]    ${imei}=359876543210987
    Click Button    ${PH_BOTON_ENVIAR_CONFIRMACION_BES}
    Wait Until Element Is Visible    ${PH_MENSAJE_CONFIRMACION_ENVIADA_BES}    timeout=10s
    Log    Confirmación de habilitación enviada a BES para IMEI ${imei}

Verificar estatus del equipo en Portal de Habilitación
    [Arguments]    ${imei}=359876543210987    ${estatus_esperado}=Habilitado
    Click Element    ${PH_MENU_EQUIPOS_BLOQUEADOS}
    Wait Until Element Is Visible    ${PH_TABLA_EQUIPOS_BLOQUEADOS}    timeout=10s
    ${xpath_equipo}=    Set Variable    ${PH_TABLA_EQUIPOS_BLOQUEADOS}//tr[contains(., '${imei}')]
    ${estatus}=    Get Text    ${xpath_equipo}//td[@data-field='estatus_equipo']
    Should Contain    ${estatus}    ${estatus_esperado}
    Log    Estatus del equipo IMEI ${imei}: ${estatus}

Consultar historial de operaciones en Portal
    [Arguments]    ${imei}=359876543210987
    Click Element    ${PH_MENU_HISTORIAL_OPERACIONES}
    Wait Until Element Is Visible    ${PH_TABLA_HISTORIAL_OPERACIONES}    timeout=10s
    ${xpath_historial}=    Set Variable    ${PH_TABLA_HISTORIAL_OPERACIONES}//tr[contains(., '${imei}')]
    Page Should Contain Element    ${xpath_historial}
    Log    Historial de operaciones consultado para IMEI ${imei}
