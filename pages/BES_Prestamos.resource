*** Settings ***
Library    SeleniumLibrary

*** Variables ***
# URLs
${URL_MODULO_PRESTAMOS}           /prestamos/consulta

# Locators - Búsqueda
${LOCATOR_INPUT_TELEFONO}         id:searchPhone
${LOCATOR_BTN_BUSCAR}             id:btnSearch

# Locators - Resultados Usuario
${LOCATOR_TXT_NOMBRE}             css:.user-info .nombre
${LOCATOR_TXT_CURP}               css:.user-info .curp
${LOCATOR_TXT_RFC}                css:.user-info .rfc
${LOCATOR_TXT_REGION}             css:.user-info .region

# Locators - Resultados Crédito
${LOCATOR_TXT_MONTO_TOTAL}        css:.credit-info .monto-total
${LOCATOR_TXT_CICLO}              css:.credit-info .ciclo
${LOCATOR_TXT_PLAZO}              css:.credit-info .plazo
${LOCATOR_TXT_TIPO_FINANCIAMIENTO}    css:.credit-info .tipo-financiamiento

# Locators - Resultados Equipo
${LOCATOR_TXT_IMEI}               css:.device-info .imei
${LOCATOR_TXT_PRODUCTO}           css:.device-info .producto

# Locators - Múltiples Préstamos
${LOCATOR_TABLA_PRESTAMOS_ACTIVOS}         id:tablaPrestamosActivos
${LOCATOR_BTN_CREAR_NUEVO_PRESTAMO}        id:btnCrearNuevoPrestamo
${LOCATOR_TXT_CANTIDAD_PRESTAMOS}          css:.loans-summary .cantidad-prestamos
${LOCATOR_TXT_LIMITE_PRESTAMOS}            css:.loans-summary .limite-permitido
${LOCATOR_INPUT_CUSTOMER_ID_NUEVO}         id:inputCustomerIdNuevo
${LOCATOR_INPUT_MONTO_NUEVO_PRESTAMO}      id:inputMontoNuevoPrestamo
${LOCATOR_INPUT_PLAZO_NUEVO_PRESTAMO}      id:inputPlazoNuevoPrestamo
${LOCATOR_SELECT_CICLO_NUEVO_PRESTAMO}     id:selectCicloNuevoPrestamo
${LOCATOR_BTN_GUARDAR_NUEVO_PRESTAMO}      id:btnGuardarNuevoPrestamo
${LOCATOR_MSG_PRESTAMO_CREADO}             css:.alert-success .msg-prestamo-creado
${LOCATOR_FILA_PRESTAMO}                   css:.tabla-prestamos tbody tr
${LOCATOR_TXT_PRESTAMO_ID}                 css:.loan-item .prestamo-id
${LOCATOR_TXT_PRESTAMO_MONTO}              css:.loan-item .prestamo-monto
${LOCATOR_TXT_PRESTAMO_PARCIALIDADES}      css:.loan-item .prestamo-parcialidades
${LOCATOR_TXT_CALENDARIO_PAGO}             css:.loan-item .calendario-pago

*** Keywords ***
Navegar A Módulo De Préstamos
    Go To    ${URL_LOGIN}${URL_MODULO_PRESTAMOS}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_TELEFONO}    timeout=10s

Ingresar Número Telefónico Para Búsqueda
    [Arguments]    ${telefono}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_TELEFONO}
    Input Text    ${LOCATOR_INPUT_TELEFONO}    ${telefono}

Hacer Click En Botón Buscar Préstamo
    Click Button    ${LOCATOR_BTN_BUSCAR}
    Wait Until Element Is Visible    ${LOCATOR_TXT_NOMBRE}    timeout=10s

Obtener Información Del Usuario
    ${nombre}=    Get Text    ${LOCATOR_TXT_NOMBRE}
    ${curp}=      Get Text    ${LOCATOR_TXT_CURP}
    ${rfc}=       Get Text    ${LOCATOR_TXT_RFC}
    ${region}=    Get Text    ${LOCATOR_TXT_REGION}
    [Return]    ${nombre}    ${curp}    ${rfc}    ${region}

Obtener Información Del Crédito
    ${monto}=     Get Text    ${LOCATOR_TXT_MONTO_TOTAL}
    ${ciclo}=     Get Text    ${LOCATOR_TXT_CICLO}
    ${plazo}=     Get Text    ${LOCATOR_TXT_PLAZO}
    ${tipo}=      Get Text    ${LOCATOR_TXT_TIPO_FINANCIAMIENTO}
    [Return]    ${monto}    ${ciclo}    ${plazo}    ${tipo}

Obtener Información Del Equipo
    ${imei}=      Get Text    ${LOCATOR_TXT_IMEI}
    ${producto}=  Get Text    ${LOCATOR_TXT_PRODUCTO}
    [Return]    ${imei}    ${producto}

Verificar Que Información Del Usuario Es Correcta
    [Arguments]    ${nombre_esperado}    ${curp_esperado}    ${rfc_esperado}    ${region_esperado}
    ${nombre}    ${curp}    ${rfc}    ${region}=    Obtener Información Del Usuario
    Should Be Equal As Strings    ${nombre}    ${nombre_esperado}
    Should Be Equal As Strings    ${curp}      ${curp_esperado}
    Should Be Equal As Strings    ${rfc}       ${rfc_esperado}
    Should Be Equal As Strings    ${region}    ${region_esperado}

Verificar Que Información Del Crédito Es Correcta
    [Arguments]    ${monto_esperado}    ${ciclo_esperado}    ${plazo_esperado}    ${tipo_esperado}
    ${monto}    ${ciclo}    ${plazo}    ${tipo}=    Obtener Información Del Crédito
    Should Be Equal As Strings    ${monto}    ${monto_esperado}
    Should Be Equal As Strings    ${ciclo}    ${ciclo_esperado}
    Should Be Equal As Strings    ${plazo}    ${plazo_esperado}
    Should Be Equal As Strings    ${tipo}     ${tipo_esperado}

Verificar Que Información Del Equipo Es Correcta
    [Arguments]    ${imei_esperado}    ${producto_esperado}
    ${imei}    ${producto}=    Obtener Información Del Equipo
    Should Be Equal As Strings    ${imei}      ${imei_esperado}
    Should Be Equal As Strings    ${producto}  ${producto_esperado}

Obtener Cantidad De Préstamos Activos Del Cliente
    Wait Until Element Is Visible    ${LOCATOR_TABLA_PRESTAMOS_ACTIVOS}    timeout=10s
    ${cantidad_texto}=    Get Text    ${LOCATOR_TXT_CANTIDAD_PRESTAMOS}
    [Return]    ${cantidad_texto}

Verificar Que Cliente Tiene Al Menos Un Préstamo Activo
    ${cantidad}=    Obtener Cantidad De Préstamos Activos Del Cliente
    Should Not Be Equal As Strings    ${cantidad}    0
    Element Should Be Visible    ${LOCATOR_TABLA_PRESTAMOS_ACTIVOS}

Hacer Click En Botón Crear Nuevo Préstamo
    Wait Until Element Is Enabled    ${LOCATOR_BTN_CREAR_NUEVO_PRESTAMO}
    Click Button    ${LOCATOR_BTN_CREAR_NUEVO_PRESTAMO}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_NUEVO}    timeout=10s

Verificar Configuración De Múltiples Préstamos Permitidos
    Element Should Be Visible    ${LOCATOR_TXT_LIMITE_PRESTAMOS}
    ${limite}=    Get Text    ${LOCATOR_TXT_LIMITE_PRESTAMOS}
    Should Not Be Empty    ${limite}
    Should Contain    ${limite}    Amigo Paguitos

Ingresar Datos Del Nuevo Préstamo
    [Arguments]    ${customer_id}    ${monto}    ${plazo}    ${ciclo}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_CUSTOMER_ID_NUEVO}
    Input Text    ${LOCATOR_INPUT_CUSTOMER_ID_NUEVO}      ${customer_id}
    Input Text    ${LOCATOR_INPUT_MONTO_NUEVO_PRESTAMO}   ${monto}
    Input Text    ${LOCATOR_INPUT_PLAZO_NUEVO_PRESTAMO}   ${plazo}
    Select From List By Label    ${LOCATOR_SELECT_CICLO_NUEVO_PRESTAMO}    ${ciclo}

Hacer Click En Botón Guardar Nuevo Préstamo
    Click Button    ${LOCATOR_BTN_GUARDAR_NUEVO_PRESTAMO}
    Wait Until Element Is Visible    ${LOCATOR_MSG_PRESTAMO_CREADO}    timeout=10s

Verificar Que Segundo Préstamo Fue Creado
    Element Should Be Visible    ${LOCATOR_MSG_PRESTAMO_CREADO}
    ${mensaje}=    Get Text    ${LOCATOR_MSG_PRESTAMO_CREADO}
    Should Contain    ${mensaje}    creado exitosamente

Verificar Que Ambos Préstamos Están Activos
    ${filas}=    Get Element Count    ${LOCATOR_FILA_PRESTAMO}
    Should Be True    ${filas} >= 2
    Wait Until Element Is Visible    ${LOCATOR_TABLA_PRESTAMOS_ACTIVOS}

Verificar Que Préstamos Se Gestionan Independientemente
    [Arguments]    ${index_prestamo}
    ${parcialidades}=    Get Text    css:.tabla-prestamos tbody tr:nth-child(${index_prestamo}) .prestamo-parcialidades
    ${calendario}=       Get Text    css:.tabla-prestamos tbody tr:nth-child(${index_prestamo}) .calendario-pago
    Should Not Be Empty    ${parcialidades}
    Should Not Be Empty    ${calendario}

# Keywords para Configuración de Ciclos de Pago
Navegar A Módulo De Configuración De Ciclos De Pago
    Go To    ${URL_LOGIN}/prestamos/configuracion/ciclos
    Wait Until Element Is Visible    css:.config-ciclos-container    timeout=10s

Verificar Que Se Muestran Opciones De Configuración De Ciclos
    Element Should Be Visible    css:.config-ciclos-container .opciones-ciclos
    ${opciones}=    Get Text    css:.config-ciclos-container .opciones-ciclos
    Should Contain    ${opciones}    Semanal
    Should Contain    ${opciones}    Quincenal
    Should Contain    ${opciones}    Mensual

Configurar Préstamo Con Ciclo De Pago
    [Arguments]    ${tipo_ciclo}
    Wait Until Element Is Visible    id:selectCicloPago
    Select From List By Label    id:selectCicloPago    ${tipo_ciclo}
    Click Button    id:btnGenerarCalendario
    Wait Until Element Is Visible    css:.calendario-generado    timeout=10s

Verificar Que Calendario De Pagos Fue Generado
    [Arguments]    ${tipo_ciclo}
    Element Should Be Visible    css:.calendario-generado
    ${mensaje}=    Get Text    css:.calendario-generado .mensaje
    Should Contain    ${mensaje}    ${tipo_ciclo}
    Element Should Be Visible    css:.calendario-generado .tabla-calendario

Verificar Que Configuraciones De Ciclos Respetan Reglas De Amigo Paguitos
    ${validacion}=    Get Text    css:.validacion-reglas .mensaje
    Should Contain    ${validacion}    Amigo Paguitos
    Should Contain    ${validacion}    cumple con las reglas
