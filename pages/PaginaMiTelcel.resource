*** Variables ***
# Navegación a MiTelcel
${LOCATOR_MENU_PLATAFORMAS}        id:menuPlataformas
${LOCATOR_OPCION_MI_TELCEL}        id:opcionMiTelcel

# Consulta de datos RRSS en MiTelcel
${LOCATOR_SECCION_MIS_DATOS}       id:seccionMisDatos
${LOCATOR_BOLSA_DATOS_RRSS_MT}     css:.datos-redes-sociales
${LOCATOR_CANTIDAD_BOLSAS_RRSS_MT}    css:.datos-redes-sociales .bolsa-item
${LOCATOR_TITULO_BOLSA_RRSS_MT}    css:.datos-redes-sociales .titulo
${LOCATOR_MB_DISPONIBLES_RRSS_MT}  css:.datos-redes-sociales .mb-disponibles

# Consulta de datos para navegación libre en MiTelcel (Caso 20)
${LOCATOR_BOLSA_NAVEGACION_LIBRE_MT}    css:.datos-navegacion-libre
${LOCATOR_CANTIDAD_BOLSAS_NAVEGACION_MT}    css:.datos-navegacion-libre .bolsa-item
${LOCATOR_TITULO_BOLSA_NAVEGACION_MT}    css:.datos-navegacion-libre .titulo
${LOCATOR_MB_DISPONIBLES_NAVEGACION_MT}    css:.datos-navegacion-libre .mb-disponibles

# Vigencia de paquetes en MiTelcel (Caso 20)
${LOCATOR_VIGENCIA_PAQUETE_MT}    css:.vigencia-paquete
${LOCATOR_FECHA_VENCIMIENTO_MT}    css:.fecha-vencimiento
${LOCATOR_DIAS_RESTANTES_MT}    css:.dias-restantes

*** Keywords ***
Navegar A MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_MENU_PLATAFORMAS}    timeout=10s
    Click Element    ${LOCATOR_MENU_PLATAFORMAS}
    Wait Until Element Is Visible    ${LOCATOR_OPCION_MI_TELCEL}
    Click Element    ${LOCATOR_OPCION_MI_TELCEL}

Consultar Datos RRSS En MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_SECCION_MIS_DATOS}    timeout=15s
    Scroll Element Into View    ${LOCATOR_BOLSA_DATOS_RRSS_MT}
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_DATOS_RRSS_MT}

Verificar Bolsa Consolidada En MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_DATOS_RRSS_MT}
    ${cantidad_bolsas}=    Get Element Count    ${LOCATOR_CANTIDAD_BOLSAS_RRSS_MT}
    Should Be Equal As Numbers    ${cantidad_bolsas}    1
    Element Should Be Visible    ${LOCATOR_TITULO_BOLSA_RRSS_MT}

Obtener MB Disponibles RRSS MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_MB_DISPONIBLES_RRSS_MT}
    ${mb_disponibles}=    Get Text    ${LOCATOR_MB_DISPONIBLES_RRSS_MT}
    [Return]    ${mb_disponibles}

Consultar Datos Para Navegacion Libre En MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_SECCION_MIS_DATOS}    timeout=15s
    Scroll Element Into View    ${LOCATOR_BOLSA_NAVEGACION_LIBRE_MT}
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_NAVEGACION_LIBRE_MT}

Verificar Bolsa Unica Navegacion Libre En MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_NAVEGACION_LIBRE_MT}
    ${cantidad_bolsas}=    Get Element Count    ${LOCATOR_CANTIDAD_BOLSAS_NAVEGACION_MT}
    Should Be Equal As Numbers    ${cantidad_bolsas}    1
    Element Should Be Visible    ${LOCATOR_TITULO_BOLSA_NAVEGACION_MT}

Obtener MB Disponibles Navegacion Libre MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_MB_DISPONIBLES_NAVEGACION_MT}
    ${mb_disponibles}=    Get Text    ${LOCATOR_MB_DISPONIBLES_NAVEGACION_MT}
    [Return]    ${mb_disponibles}

Consultar Vigencia En MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_SECCION_MIS_DATOS}    timeout=15s
    Scroll Element Into View    ${LOCATOR_VIGENCIA_PAQUETE_MT}
    Wait Until Element Is Visible    ${LOCATOR_VIGENCIA_PAQUETE_MT}

Verificar Vigencia Corresponde Al Paquete Mayor En MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_VIGENCIA_PAQUETE_MT}
    ${vigencia}=    Get Text    ${LOCATOR_VIGENCIA_PAQUETE_MT}
    Should Not Be Empty    ${vigencia}
    Log    Vigencia del paquete con mayor vigencia en MiTelcel: ${vigencia}

Obtener Fecha Vencimiento En MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_FECHA_VENCIMIENTO_MT}
    ${fecha_vencimiento}=    Get Text    ${LOCATOR_FECHA_VENCIMIENTO_MT}
    [Return]    ${fecha_vencimiento}
