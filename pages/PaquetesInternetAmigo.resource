*** Variables ***
# Locators para módulo Paquetes Internet Amigo
${MENU_PROVISION}                      id:menuProvision
${SUBMENU_PAQUETES_INTERNET_AMIGO}     id:menuPaquetesInternetAmigo
${LOCATOR_INPUT_BUSCAR_USUARIO}        id:inputBuscarUsuario
${LOCATOR_BOTON_BUSCAR}                id:btnBuscar
${LOCATOR_PERFIL_USUARIO}              css:.perfil-usuario
${LOCATOR_TIPO_USUARIO}                id:tipoUsuario
${LOCATOR_PRODUCTOS_USUARIO}           id:productosUsuario
${LOCATOR_PAQUETE_30_PESOS}            id:paquete30Pesos
${LOCATOR_PAQUETE_50_PESOS}            id:paquete50Pesos
${LOCATOR_BOTON_ACTIVAR_PAQUETE}       id:btnActivarPaquete
${LOCATOR_CONFIRMACION_ACTIVACION}     css:.modal-confirmacion
${LOCATOR_BOTON_CONFIRMAR}             id:btnConfirmar
${LOCATOR_MENSAJE_EXITO}               css:.mensaje-exito
${LOCATOR_DATOS_ACUMULADOS}            id:datosAcumulados
${LOCATOR_VIGENCIA_PAQUETE}            id:vigenciaPaquete
${LOCATOR_BENEFICIOS_ACTIVOS}          id:beneficiosActivos
${LOCATOR_BOLSA_NAVEGACION}            id:bolsaNavegacion
${LOCATOR_BOLSA_REDES_SOCIALES}        id:bolsaRedesSociales
${LOCATOR_DETALLE_PAQUETES_ACTIVOS}    id:detallePaquetesActivos

*** Keywords ***
Navegar Al Módulo Paquetes Internet Amigo
    Wait Until Element Is Visible    ${MENU_PROVISION}    timeout=10s
    Click Element    ${MENU_PROVISION}
    Wait Until Element Is Visible    ${SUBMENU_PAQUETES_INTERNET_AMIGO}
    Click Element    ${SUBMENU_PAQUETES_INTERNET_AMIGO}
    Wait Until Page Contains    Paquetes Internet Amigo

Buscar Usuario Por Número
    [Arguments]    ${numero_telefono}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_BUSCAR_USUARIO}
    Input Text    ${LOCATOR_INPUT_BUSCAR_USUARIO}    ${numero_telefono}
    Click Button    ${LOCATOR_BOTON_BUSCAR}
    Wait Until Element Is Visible    ${LOCATOR_PERFIL_USUARIO}    timeout=15s

Verificar Perfil Usuario Controlado
    Wait Until Element Is Visible    ${LOCATOR_TIPO_USUARIO}
    ${tipo_usuario}=    Get Text    ${LOCATOR_TIPO_USUARIO}
    Should Contain    ${tipo_usuario}    Controlado

Verificar Productos Legados M2K
    Wait Until Element Is Visible    ${LOCATOR_PRODUCTOS_USUARIO}
    ${productos}=    Get Text    ${LOCATOR_PRODUCTOS_USUARIO}
    Should Contain    ${productos}    m2k

Seleccionar Paquete Internet Amigo
    [Arguments]    ${tipo_paquete}
    Run Keyword If    '${tipo_paquete}' == '30'    Click Element    ${LOCATOR_PAQUETE_30_PESOS}
    ...    ELSE IF    '${tipo_paquete}' == '50'    Click Element    ${LOCATOR_PAQUETE_50_PESOS}
    Wait Until Element Is Enabled    ${LOCATOR_BOTON_ACTIVAR_PAQUETE}

Activar Paquete Seleccionado
    Click Button    ${LOCATOR_BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${LOCATOR_CONFIRMACION_ACTIVACION}
    Click Button    ${LOCATOR_BOTON_CONFIRMAR}

Verificar Activación Exitosa Del Paquete
    [Arguments]    ${monto}
    Wait Until Element Is Visible    ${LOCATOR_MENSAJE_EXITO}    timeout=10s
    ${mensaje}=    Get Text    ${LOCATOR_MENSAJE_EXITO}
    Should Contain    ${mensaje}    Paquete de ${monto} pesos activado

Obtener Datos Acumulados
    Wait Until Element Is Visible    ${LOCATOR_DATOS_ACUMULADOS}
    ${datos}=    Get Text    ${LOCATOR_DATOS_ACUMULADOS}
    [Return]    ${datos}

Verificar Suma Automática De Datos
    [Arguments]    ${datos_esperados}
    ${datos_actuales}=    Obtener Datos Acumulados
    Should Contain    ${datos_actuales}    ${datos_esperados}

Obtener Vigencia Paquete
    Wait Until Element Is Visible    ${LOCATOR_VIGENCIA_PAQUETE}
    ${vigencia}=    Get Text    ${LOCATOR_VIGENCIA_PAQUETE}
    [Return]    ${vigencia}

Verificar Vigencia Del Paquete Mayor
    [Arguments]    ${dias_esperados}
    ${vigencia}=    Obtener Vigencia Paquete
    Should Contain    ${vigencia}    ${dias_esperados}

Verificar Beneficios Del Paquete
    [Arguments]    ${beneficios_esperados}
    Wait Until Element Is Visible    ${LOCATOR_BENEFICIOS_ACTIVOS}
    ${beneficios}=    Get Text    ${LOCATOR_BENEFICIOS_ACTIVOS}
    Should Contain    ${beneficios}    ${beneficios_esperados}

Verificar Bolsa Unificada De Navegación
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_NAVEGACION}
    Element Should Be Visible    ${LOCATOR_BOLSA_NAVEGACION}
    ${cantidad_bolsas}=    Get Element Count    css:.bolsa-navegacion
    Should Be Equal As Numbers    ${cantidad_bolsas}    1

Verificar Bolsa Unificada De Redes Sociales
    Wait Until Element Is Visible    ${LOCATOR_BOLSA_REDES_SOCIALES}
    Element Should Be Visible    ${LOCATOR_BOLSA_REDES_SOCIALES}
    ${cantidad_bolsas}=    Get Element Count    css:.bolsa-redes-sociales
    Should Be Equal As Numbers    ${cantidad_bolsas}    1

Consultar Detalle De Paquetes Activos
    Wait Until Element Is Visible    ${LOCATOR_DETALLE_PAQUETES_ACTIVOS}
    Click Element    ${LOCATOR_DETALLE_PAQUETES_ACTIVOS}
    Wait Until Page Contains    Detalle de paquetes
