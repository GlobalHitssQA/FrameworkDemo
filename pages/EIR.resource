*** Variables ***
${EIR_URL}                            https://eir.telcel.com
${EIR_MENU_REGISTRO_EQUIPOS}          id:menu_registro_equipos
${EIR_INPUT_IMEI}                     id:input_imei
${EIR_INPUT_BUSCAR_IMEI}              id:buscar_imei
${EIR_BOTON_BUSCAR}                   css:.btn-buscar
${EIR_TABLA_RESULTADOS}               xpath://table[@id='tabla_resultados_imei']
${EIR_CAMPO_ESTADO_IMEI}              xpath://td[@data-field='estado_imei']
${EIR_CAMPO_MARCA_EQUIPO}             xpath://td[@data-field='marca']
${EIR_CAMPO_MODELO_EQUIPO}            xpath://td[@data-field='modelo']
${EIR_CAMPO_CLIENTE_ASOCIADO}         xpath://td[@data-field='cliente_asociado']
${EIR_CAMPO_FINANCIAMIENTO_ASOCIADO}  xpath://td[@data-field='financiamiento_asociado']
${EIR_MENSAJE_IMEI_VALIDO}            xpath://div[contains(text(),'IMEI válido')]
${EIR_MENSAJE_IMEI_NO_REGISTRADO}     xpath://div[contains(text(),'IMEI no registrado')]
${EIR_MENSAJE_IMEI_BLOQUEADO}         xpath://div[contains(text(),'IMEI bloqueado')]
${EIR_BOTON_REGISTRAR_EQUIPO}         id:btn_registrar_equipo
${EIR_MENSAJE_REGISTRO_EXITOSO}       xpath://div[contains(text(),'Registro exitoso')]
${EIR_PANEL_DETALLE_EQUIPO}           css:.panel-detalle-equipo
${EIR_CAMPO_FECHA_REGISTRO}           xpath://div[@data-field='fecha_registro']
${EIR_CAMPO_ORIGEN_REGISTRO}          xpath://div[@data-field='origen_registro']

*** Keywords ***
Abrir sistema EIR
    Go To    ${EIR_URL}
    Wait Until Page Contains Element    ${EIR_MENU_REGISTRO_EQUIPOS}    timeout=10s

Acceder a módulo de registro de equipos en EIR
    Click Element    ${EIR_MENU_REGISTRO_EQUIPOS}
    Wait Until Element Is Visible    ${EIR_INPUT_BUSCAR_IMEI}    timeout=10s

Buscar equipo por IMEI en EIR
    [Arguments]    ${imei}
    Input Text    ${EIR_INPUT_BUSCAR_IMEI}    ${imei}
    Click Button    ${EIR_BOTON_BUSCAR}
    Wait Until Element Is Visible    ${EIR_TABLA_RESULTADOS}    timeout=10s

Verificar que IMEI no está registrado en EIR
    Wait Until Element Is Visible    ${EIR_MENSAJE_IMEI_NO_REGISTRADO}    timeout=10s
    ${mensaje}=    Get Text    ${EIR_MENSAJE_IMEI_NO_REGISTRADO}
    Should Contain    ${mensaje}    no registrado
    Log    IMEI no está previamente registrado en EIR

Verificar que IMEI no está bloqueado en EIR
    Page Should Not Contain Element    ${EIR_MENSAJE_IMEI_BLOQUEADO}
    Log    IMEI no está bloqueado en EIR

Verificar validación de IMEI en EIR
    Wait Until Element Is Visible    ${EIR_MENSAJE_IMEI_VALIDO}    timeout=10s
    ${mensaje}=    Get Text    ${EIR_MENSAJE_IMEI_VALIDO}
    Should Contain    ${mensaje}    válido
    Log    EIR confirma que el IMEI es válido y puede ser registrado

Verificar que existe registro de equipo en EIR
    Page Should Contain Element    ${EIR_TABLA_RESULTADOS}
    Table Should Contain    ${EIR_TABLA_RESULTADOS}    xpath=//tr[position()>1]
    Log    Equipo encontrado en EIR

Verificar datos del equipo registrado en EIR
    [Arguments]    ${imei}    ${marca}    ${modelo}
    ${estado}=    Get Text    ${EIR_CAMPO_ESTADO_IMEI}
    ${marca_registrada}=    Get Text    ${EIR_CAMPO_MARCA_EQUIPO}
    ${modelo_registrado}=    Get Text    ${EIR_CAMPO_MODELO_EQUIPO}
    Should Contain    ${estado}    Registrado
    Should Contain    ${marca_registrada}    ${marca}
    Should Contain    ${modelo_registrado}    ${modelo}
    Log    Equipo registrado en EIR: IMEI=${imei}, Marca=${marca}, Modelo=${modelo}

Verificar asociación del equipo con financiamiento en EIR
    [Arguments]    ${identificacion}
    ${cliente_asociado}=    Get Text    ${EIR_CAMPO_CLIENTE_ASOCIADO}
    ${financiamiento}=    Get Text    ${EIR_CAMPO_FINANCIAMIENTO_ASOCIADO}
    Should Contain    ${cliente_asociado}    ${identificacion}
    Should Not Be Empty    ${financiamiento}
    Log    Equipo vinculado con cliente ${identificacion} y financiamiento Amigo Paguitos

Verificar fecha de registro en EIR
    Acceder a detalle del equipo en EIR
    Wait Until Element Is Visible    ${EIR_CAMPO_FECHA_REGISTRO}    timeout=10s
    ${fecha_registro}=    Get Text    ${EIR_CAMPO_FECHA_REGISTRO}
    Should Not Be Empty    ${fecha_registro}
    Log    Fecha de registro en EIR: ${fecha_registro}

Acceder a detalle del equipo en EIR
    Click Element    ${EIR_TABLA_RESULTADOS}//tr[position()>1]
    Wait Until Element Is Visible    ${EIR_PANEL_DETALLE_EQUIPO}    timeout=10s

Verificar origen de registro desde BES
    Wait Until Element Is Visible    ${EIR_CAMPO_ORIGEN_REGISTRO}    timeout=10s
    ${origen}=    Get Text    ${EIR_CAMPO_ORIGEN_REGISTRO}
    Should Contain    ${origen}    BES
    Log    Origen del registro confirmado: ${origen}

Verificar registro completo del equipo en EIR
    [Arguments]    ${imei}    ${marca}    ${modelo}    ${identificacion}
    Acceder a módulo de registro de equipos en EIR
    Buscar equipo por IMEI en EIR    ${imei}
    Verificar que existe registro de equipo en EIR
    Verificar datos del equipo registrado en EIR    ${imei}    ${marca}    ${modelo}
    Verificar asociación del equipo con financiamiento en EIR    ${identificacion}
    Verificar fecha de registro en EIR
    Verificar origen de registro desde BES
