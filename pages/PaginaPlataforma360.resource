*** Variables ***
# Navegación a Plataforma 360
${LOCATOR_MENU_CONSULTAS}          id:menuConsultas
${LOCATOR_OPCION_PLATAFORMA_360}   id:opcionPlataforma360

# Búsqueda de línea de usuario en Plataforma 360
${INPUT_BUSCAR_LINEA_360}          id:inputBuscarLinea360
${BOTON_BUSCAR_LINEA_360}          id:btnBuscarLinea360
${LABEL_LINEA_ENCONTRADA_360}      css:.info-linea-360 .numero-linea

# Consulta de datos para navegación libre
${SECCION_DATOS_NAVEGACION_LIBRE}  id:seccionDatosNavegacionLibre
${BOLSA_DATOS_NAVEGACION_LIBRE}    css:.bolsa-datos-navegacion-libre
${CANTIDAD_BOLSAS_NAVEGACION}      css:.bolsa-datos-navegacion-libre .item-bolsa
${TITULO_BOLSA_NAVEGACION}         css:.bolsa-datos-navegacion-libre .titulo-bolsa
${DATOS_DISPONIBLES_NAVEGACION}    css:.bolsa-datos-navegacion-libre .datos-disponibles

# Vigencia del paquete con mayor vigencia
${SECCION_VIGENCIA_PAQUETE}        id:seccionVigenciaPaquete
${LABEL_VIGENCIA_MAYOR}            css:.vigencia-paquete-mayor .vigencia-valor
${LABEL_FECHA_VENCIMIENTO_MAYOR}   css:.vigencia-paquete-mayor .fecha-vencimiento

# Consulta de datos RRSS
${LOCATOR_SECCION_DATOS_RRSS}      id:seccionDatosRRSS
${LOCATOR_BOLSA_DATOS_RRSS}        css:.bolsa-datos-rrss
${LOCATOR_CANTIDAD_BOLSAS_RRSS}    css:.bolsa-datos-rrss .item-bolsa
${LOCATOR_TITULO_BOLSA_RRSS}       css:.bolsa-datos-rrss .titulo-bolsa
${LOCATOR_DATOS_DISPONIBLES_RRSS}  css:.bolsa-datos-rrss .datos-disponibles

*** Keywords ***
Navegar A Plataforma 360
    Wait Until Element Is Visible    ${LOCATOR_MENU_CONSULTAS}    timeout=10s
    Click Element    ${LOCATOR_MENU_CONSULTAS}
    Wait Until Element Is Visible    ${LOCATOR_OPCION_PLATAFORMA_360}
    Click Element    ${LOCATOR_OPCION_PLATAFORMA_360}

Consultar Datos Para Redes Sociales
    Wait Until Element Is Visible    ${LOCATOR_SECCION_DATOS_RRSS}    timeout=15s
    Scroll Element Into View    ${LOCATOR_SECCION_DATOS_RRSS}
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_DATOS_RRSS}

Verificar Bolsa Única De Datos RRSS
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_DATOS_RRSS}
    ${cantidad_bolsas}=    Get Element Count    ${LOCATOR_CANTIDAD_BOLSAS_RRSS}
    Should Be Equal As Numbers    ${cantidad_bolsas}    1
    Element Should Contain    ${LOCATOR_TITULO_BOLSA_RRSS}    Redes Sociales

Obtener Datos Disponibles RRSS
    Wait Until Element Is Visible    ${LOCATOR_DATOS_DISPONIBLES_RRSS}
    ${datos_disponibles}=    Get Text    ${LOCATOR_DATOS_DISPONIBLES_RRSS}
    [Return]    ${datos_disponibles}

Buscar Línea Usuario En Plataforma 360
    [Arguments]    ${numero_linea}
    Wait Until Element Is Visible    ${INPUT_BUSCAR_LINEA_360}    timeout=10s
    Input Text    ${INPUT_BUSCAR_LINEA_360}    ${numero_linea}
    Click Button    ${BOTON_BUSCAR_LINEA_360}
    Wait Until Element Is Visible    ${LABEL_LINEA_ENCONTRADA_360}    timeout=15s

Verificar Línea Encontrada En Plataforma 360
    [Arguments]    ${numero_esperado}
    ${numero_actual}=    Get Text    ${LABEL_LINEA_ENCONTRADA_360}
    Should Contain    ${numero_actual}    ${numero_esperado}

Consultar Datos Para Navegación Libre
    Wait Until Element Is Visible    ${SECCION_DATOS_NAVEGACION_LIBRE}    timeout=15s
    Scroll Element Into View    ${SECCION_DATOS_NAVEGACION_LIBRE}
    Wait Until Element Is Visible    ${BOLSA_DATOS_NAVEGACION_LIBRE}

Verificar Bolsa Única De Datos Para Navegación Libre
    Wait Until Element Is Visible    ${BOLSA_DATOS_NAVEGACION_LIBRE}
    ${cantidad_bolsas}=    Get Element Count    ${CANTIDAD_BOLSAS_NAVEGACION}
    Should Be Equal As Numbers    ${cantidad_bolsas}    1
    Element Should Contain    ${TITULO_BOLSA_NAVEGACION}    Navegación Libre

Obtener Datos Disponibles Para Navegación Libre
    Wait Until Element Is Visible    ${DATOS_DISPONIBLES_NAVEGACION}
    ${datos_disponibles}=    Get Text    ${DATOS_DISPONIBLES_NAVEGACION}
    [Return]    ${datos_disponibles}

Consultar Vigencia Del Paquete Mayor
    Wait Until Element Is Visible    ${SECCION_VIGENCIA_PAQUETE}    timeout=15s
    Scroll Element Into View    ${SECCION_VIGENCIA_PAQUETE}
    Wait Until Element Is Visible    ${LABEL_VIGENCIA_MAYOR}

Verificar Vigencia Corresponde Al Paquete Con Mayor Vigencia
    Wait Until Element Is Visible    ${LABEL_VIGENCIA_MAYOR}
    ${vigencia}=    Get Text    ${LABEL_VIGENCIA_MAYOR}
    Should Not Be Empty    ${vigencia}
    Log    Vigencia del paquete con mayor vigencia: ${vigencia}

Obtener Vigencia Del Paquete Mayor
    Wait Until Element Is Visible    ${LABEL_VIGENCIA_MAYOR}
    ${vigencia}=    Get Text    ${LABEL_VIGENCIA_MAYOR}
    [Return]    ${vigencia}

Obtener Fecha Vencimiento Del Paquete Mayor
    Wait Until Element Is Visible    ${LABEL_FECHA_VENCIMIENTO_MAYOR}
    ${fecha}=    Get Text    ${LABEL_FECHA_VENCIMIENTO_MAYOR}
    [Return]    ${fecha}
