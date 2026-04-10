*** Variables ***
# Navegación a Claro Pay
${LOCATOR_MENU_PLATAFORMAS_CP}     id:menuPlataformas
${LOCATOR_OPCION_CLARO_PAY}        id:opcionClaroPay

# Consulta de datos RRSS en Claro Pay
${LOCATOR_SECCION_SALDO_CP}        id:seccionSaldo
${LOCATOR_BOLSA_DATOS_RRSS_CP}     css:.bolsa-redes-sociales
${LOCATOR_CANTIDAD_BOLSAS_RRSS_CP}    css:.bolsa-redes-sociales .item
${LOCATOR_TITULO_BOLSA_CP}         css:.bolsa-redes-sociales .nombre-bolsa
${LOCATOR_SALDO_RRSS_CP}           css:.bolsa-redes-sociales .saldo-actual

# Consulta de datos navegación libre en Claro Pay (TC021)
${LOCATOR_BOLSA_NAVEGACION_LIBRE_CP}       css:.bolsa-navegacion-libre
${LOCATOR_CANTIDAD_BOLSAS_NAV_LIBRE_CP}    css:.bolsa-navegacion-libre .item
${LOCATOR_SALDO_NAV_LIBRE_CP}              css:.bolsa-navegacion-libre .saldo-actual
${LOCATOR_VIGENCIA_PAQUETE_CP}             css:.vigencia-paquete
${LOCATOR_FECHA_VENCIMIENTO_CP}            css:.fecha-vencimiento-paquete

*** Keywords ***
Navegar A Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_MENU_PLATAFORMAS_CP}    timeout=10s
    Click Element    ${LOCATOR_MENU_PLATAFORMAS_CP}
    Wait Until Element Is Visible    ${LOCATOR_OPCION_CLARO_PAY}
    Click Element    ${LOCATOR_OPCION_CLARO_PAY}

Consultar Datos RRSS En Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_SECCION_SALDO_CP}    timeout=15s
    Scroll Element Into View    ${LOCATOR_BOLSA_DATOS_RRSS_CP}
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_DATOS_RRSS_CP}

Verificar Bolsa Consolidada En Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_DATOS_RRSS_CP}
    ${cantidad_bolsas}=    Get Element Count    ${LOCATOR_CANTIDAD_BOLSAS_RRSS_CP}
    Should Be Equal As Numbers    ${cantidad_bolsas}    1
    Element Should Be Visible    ${LOCATOR_TITULO_BOLSA_CP}

Obtener Saldo RRSS Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_SALDO_RRSS_CP}
    ${saldo}=    Get Text    ${LOCATOR_SALDO_RRSS_CP}
    [Return]    ${saldo}

Consultar Datos Navegacion Libre En Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_SECCION_SALDO_CP}    timeout=15s
    Scroll Element Into View    ${LOCATOR_BOLSA_NAVEGACION_LIBRE_CP}
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_NAVEGACION_LIBRE_CP}

Verificar Bolsa Unica Navegacion Libre En Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_NAVEGACION_LIBRE_CP}
    ${cantidad_bolsas}=    Get Element Count    ${LOCATOR_CANTIDAD_BOLSAS_NAV_LIBRE_CP}
    Should Be Equal As Numbers    ${cantidad_bolsas}    1
    Element Should Be Visible    ${LOCATOR_SALDO_NAV_LIBRE_CP}

Obtener Datos Navegacion Libre En Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_SALDO_NAV_LIBRE_CP}
    ${datos}=    Get Text    ${LOCATOR_SALDO_NAV_LIBRE_CP}
    [Return]    ${datos}

Obtener Fecha De Vencimiento En Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_FECHA_VENCIMIENTO_CP}
    ${fecha}=    Get Text    ${LOCATOR_FECHA_VENCIMIENTO_CP}
    [Return]    ${fecha}

Verificar Vigencia En Claro Pay
    Wait Until Element Is Visible    ${LOCATOR_VIGENCIA_PAQUETE_CP}
    Element Should Be Visible    ${LOCATOR_VIGENCIA_PAQUETE_CP}
    Element Should Be Visible    ${LOCATOR_FECHA_VENCIMIENTO_CP}
