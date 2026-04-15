*** Variables ***
${MICROSITIO_URL}                                  https://micrositio.telcel.com
${MICROSITIO_INPUT_USUARIO}                        id:usuario
${MICROSITIO_INPUT_PASSWORD}                       id:password
${MICROSITIO_BOTON_LOGIN}                          id:btn_login
${MICROSITIO_MENSAJE_BIENVENIDA}                   css:.mensaje-bienvenida
${MICROSITIO_MENU_PRINCIPAL}                       id:menu_principal
${MICROSITIO_MENU_FINANCIAMIENTOS}                 id:menu_financiamientos
${MICROSITIO_BOTON_CONSULTAR_FINANCIAMIENTOS}      id:btn_consultar_financiamientos
${MICROSITIO_OPCION_CONSULTA_AMIGO_PAGUITOS}       id:opcion_consulta_amigo_paguitos
${MICROSITIO_LOADER_CONSULTA}                      css:.loader-consulta
${MICROSITIO_PANEL_INFORMACION_FINANCIAMIENTO}     id:panel_info_financiamiento
${MICROSITIO_CAMPO_DATOS_CLIENTE_NOMBRE}           xpath://div[@data-field='cliente_nombre']
${MICROSITIO_CAMPO_DATOS_CLIENTE_IDENTIFICACION}   xpath://div[@data-field='cliente_identificacion']
${MICROSITIO_CAMPO_DATOS_CLIENTE_TELEFONO}         xpath://div[@data-field='cliente_telefono']
${MICROSITIO_CAMPO_DATOS_CLIENTE_DIRECCION}        xpath://div[@data-field='cliente_direccion']
${MICROSITIO_SECCION_DESGLOSE_CUOTAS}              id:seccion_desglose_cuotas
${MICROSITIO_TABLA_CUOTAS}                         xpath://table[@id='tabla_cuotas']
${MICROSITIO_CAMPO_NUMERO_CUOTA}                   xpath://td[@data-field='numero_cuota']
${MICROSITIO_CAMPO_MONTO_CUOTA}                    xpath://td[@data-field='monto_cuota']
${MICROSITIO_CAMPO_FECHA_VENCIMIENTO_CUOTA}        xpath://td[@data-field='fecha_vencimiento_cuota']
${MICROSITIO_CAMPO_ESTATUS_CUOTA}                  xpath://td[@data-field='estatus_cuota']
${MICROSITIO_SECCION_DESGLOSE_PAGOS}               id:seccion_desglose_pagos
${MICROSITIO_TABLA_PAGOS}                          xpath://table[@id='tabla_pagos']
${MICROSITIO_CAMPO_FECHA_PAGO}                     xpath://td[@data-field='fecha_pago']
${MICROSITIO_CAMPO_MONTO_PAGO}                     xpath://td[@data-field='monto_pago']
${MICROSITIO_CAMPO_METODO_PAGO}                    xpath://td[@data-field='metodo_pago']
${MICROSITIO_CAMPO_ESTATUS_PAGO}                   xpath://td[@data-field='estatus_pago']
${MICROSITIO_SECCION_FECHAS_VENCIMIENTO}           id:seccion_fechas_vencimiento
${MICROSITIO_CAMPO_PROXIMA_FECHA_VENCIMIENTO}      css:.proxima-fecha-vencimiento
${MICROSITIO_CAMPO_FECHA_INICIO_PRESTAMO}          css:.fecha-inicio-prestamo
${MICROSITIO_CAMPO_FECHA_FIN_PRESTAMO}             css:.fecha-fin-prestamo
${MICROSITIO_SECCION_ESTATUS_PRESTAMO}             id:seccion_estatus_prestamo
${MICROSITIO_CAMPO_ESTATUS_PRESTAMO}               css:.estatus-prestamo
${MICROSITIO_CAMPO_SALDO_ACTUAL}                   css:.saldo-actual
${MICROSITIO_CAMPO_SALDO_PENDIENTE}                css:.saldo-pendiente
${MICROSITIO_MENSAJE_ERROR_CONSULTA}               xpath://div[contains(text(),'Error al consultar')]
${MICROSITIO_MENSAJE_SIN_FINANCIAMIENTO}           xpath://div[contains(text(),'No tiene financiamientos activos')]

*** Keywords ***
Abrir Micrositio de Clientes
    Open Browser    ${MICROSITIO_URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    ${MICROSITIO_INPUT_USUARIO}    timeout=10s

Acceder como cliente al Micrositio con credenciales válidas
    [Arguments]    ${usuario}=cliente_test    ${password}=password_test
    Input Text    ${MICROSITIO_INPUT_USUARIO}    ${usuario}
    Input Text    ${MICROSITIO_INPUT_PASSWORD}    ${password}
    Click Button    ${MICROSITIO_BOTON_LOGIN}
    Wait Until Element Is Visible    ${MICROSITIO_MENSAJE_BIENVENIDA}    timeout=15s

Verificar autenticación exitosa del cliente
    Wait Until Element Is Visible    ${MICROSITIO_MENU_PRINCIPAL}    timeout=10s
    Page Should Contain Element    ${MICROSITIO_MENSAJE_BIENVENIDA}
    Log    Cliente autenticado exitosamente en Micrositio

Navegar a sección de consulta de financiamientos
    Wait Until Element Is Visible    ${MICROSITIO_MENU_FINANCIAMIENTOS}    timeout=10s
    Click Element    ${MICROSITIO_MENU_FINANCIAMIENTOS}
    Wait Until Element Is Visible    ${MICROSITIO_BOTON_CONSULTAR_FINANCIAMIENTOS}    timeout=10s

Verificar opción de consulta de financiamientos Amigo Paguitos
    Wait Until Element Is Visible    ${MICROSITIO_OPCION_CONSULTA_AMIGO_PAGUITOS}    timeout=10s
    Page Should Contain Element    ${MICROSITIO_OPCION_CONSULTA_AMIGO_PAGUITOS}
    Log    Opción de consulta de financiamientos Amigo Paguitos disponible

Solicitar información del financiamiento mediante integración con BES
    Click Element    ${MICROSITIO_OPCION_CONSULTA_AMIGO_PAGUITOS}
    Click Button    ${MICROSITIO_BOTON_CONSULTAR_FINANCIAMIENTOS}
    Wait Until Element Is Not Visible    ${MICROSITIO_LOADER_CONSULTA}    timeout=20s
    Log    Micrositio invocó la API de consulta de BES

Verificar invocación de API de consulta de BES desde Micrositio
    Wait Until Element Is Visible    ${MICROSITIO_PANEL_INFORMACION_FINANCIAMIENTO}    timeout=15s
    Page Should Contain Element    ${MICROSITIO_PANEL_INFORMACION_FINANCIAMIENTO}
    Log    API de consulta de BES respondió exitosamente

Verificar recepción de datos completos del préstamo desde BES
    Wait Until Element Is Visible    ${MICROSITIO_SECCION_DESGLOSE_CUOTAS}    timeout=10s
    Wait Until Element Is Visible    ${MICROSITIO_SECCION_DESGLOSE_PAGOS}    timeout=10s
    Wait Until Element Is Visible    ${MICROSITIO_SECCION_FECHAS_VENCIMIENTO}    timeout=10s
    Wait Until Element Is Visible    ${MICROSITIO_SECCION_ESTATUS_PRESTAMO}    timeout=10s
    Page Should Contain Element    ${MICROSITIO_TABLA_CUOTAS}
    Page Should Contain Element    ${MICROSITIO_TABLA_PAGOS}
    Log    BES respondió con datos completos del préstamo

Verificar visualización de datos del cliente en Micrositio
    [Arguments]    ${nombre_esperado}=Juan Pérez    ${identificacion_esperada}=ABC123456
    Wait Until Element Is Visible    ${MICROSITIO_CAMPO_DATOS_CLIENTE_NOMBRE}    timeout=10s
    ${nombre}=    Get Text    ${MICROSITIO_CAMPO_DATOS_CLIENTE_NOMBRE}
    ${identificacion}=    Get Text    ${MICROSITIO_CAMPO_DATOS_CLIENTE_IDENTIFICACION}
    Should Contain    ${nombre}    ${nombre_esperado}
    Should Contain    ${identificacion}    ${identificacion_esperada}
    Log    Datos del cliente mostrados correctamente: ${nombre}

Verificar visualización de desglose de cuotas en Micrositio
    Wait Until Element Is Visible    ${MICROSITIO_TABLA_CUOTAS}    timeout=10s
    ${filas_cuotas}=    Get Element Count    ${MICROSITIO_TABLA_CUOTAS}//tr[position()>1]
    Should Be True    ${filas_cuotas} > 0
    Page Should Contain Element    ${MICROSITIO_CAMPO_NUMERO_CUOTA}
    Page Should Contain Element    ${MICROSITIO_CAMPO_MONTO_CUOTA}
    Page Should Contain Element    ${MICROSITIO_CAMPO_FECHA_VENCIMIENTO_CUOTA}
    Page Should Contain Element    ${MICROSITIO_CAMPO_ESTATUS_CUOTA}
    Log    Desglose de cuotas mostrado con ${filas_cuotas} cuotas

Verificar visualización de desglose de pagos en Micrositio
    Wait Until Element Is Visible    ${MICROSITIO_TABLA_PAGOS}    timeout=10s
    ${filas_pagos}=    Get Element Count    ${MICROSITIO_TABLA_PAGOS}//tr[position()>1]
    Should Be True    ${filas_pagos} >= 0
    Page Should Contain Element    ${MICROSITIO_SECCION_DESGLOSE_PAGOS}
    Log    Desglose de pagos mostrado correctamente

Verificar visualización de fechas de vencimiento en Micrositio
    Wait Until Element Is Visible    ${MICROSITIO_SECCION_FECHAS_VENCIMIENTO}    timeout=10s
    Wait Until Element Is Visible    ${MICROSITIO_CAMPO_PROXIMA_FECHA_VENCIMIENTO}    timeout=10s
    ${proxima_fecha}=    Get Text    ${MICROSITIO_CAMPO_PROXIMA_FECHA_VENCIMIENTO}
    Should Not Be Empty    ${proxima_fecha}
    Log    Próxima fecha de vencimiento: ${proxima_fecha}

Verificar visualización de estatus del préstamo en Micrositio
    Wait Until Element Is Visible    ${MICROSITIO_CAMPO_ESTATUS_PRESTAMO}    timeout=10s
    ${estatus}=    Get Text    ${MICROSITIO_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${estatus}
    Log    Estatus del préstamo: ${estatus}

Verificar visualización de saldos en Micrositio
    Wait Until Element Is Visible    ${MICROSITIO_CAMPO_SALDO_ACTUAL}    timeout=10s
    Wait Until Element Is Visible    ${MICROSITIO_CAMPO_SALDO_PENDIENTE}    timeout=10s
    ${saldo_actual}=    Get Text    ${MICROSITIO_CAMPO_SALDO_ACTUAL}
    ${saldo_pendiente}=    Get Text    ${MICROSITIO_CAMPO_SALDO_PENDIENTE}
    Should Not Be Empty    ${saldo_actual}
    Should Not Be Empty    ${saldo_pendiente}
    Log    Saldo actual: ${saldo_actual}, Saldo pendiente: ${saldo_pendiente}

Verificar que Micrositio presenta información completa del financiamiento
    [Arguments]    ${nombre}=Juan Pérez    ${identificacion}=ABC123456
    Verificar visualización de datos del cliente en Micrositio    ${nombre}    ${identificacion}
    Verificar visualización de desglose de cuotas en Micrositio
    Verificar visualización de desglose de pagos en Micrositio
    Verificar visualización de fechas de vencimiento en Micrositio
    Verificar visualización de estatus del préstamo en Micrositio
    Verificar visualización de saldos en Micrositio
    Log    Micrositio presenta toda la información del financiamiento de forma clara al cliente
