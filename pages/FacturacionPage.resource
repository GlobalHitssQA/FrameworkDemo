*** Variables ***
# Facturación Page Locators
${MENU_FACTURACION}               id:menuFacturacion
${SUBMENU_CAMBIO_CICLO}           id:submenuCambioCiclo
${INPUT_NUMERO_CUENTA}            id:numeroCuenta
${BTN_BUSCAR_CUENTA}              id:btnBuscarCuenta
${LBL_CICLO_ACTUAL}               id:cicloActual
${DDL_NUEVO_CICLO}                id:selectNuevoCiclo
${BTN_CAMBIAR_CICLO_GUI}          id:btnCambiarCiclo
${MSG_ERROR_GUI}                  css:.alert-danger
${LBL_CICLO_ACTUALIZADO}          id:cicloActualizado
${LBL_INFO_CUENTA}                id:infoCuenta
# Locators para cambio de ciclo mediante API - TC087 y TC088
${LBL_CICLO_ORIGINAL}             id:cicloOriginal
${LBL_HISTORIAL_CICLOS}           id:historialCiclos
${LBL_TIPO_CUENTA_FACTURACION}    id:tipoCuentaFacturacion
${MSG_CAMBIO_CICLO_EXITOSO}       css:.alert-success
${LBL_FECHA_CAMBIO_CICLO}         id:fechaCambioCiclo
${LBL_USUARIO_CAMBIO_CICLO}       id:usuarioCambioCiclo
${MSG_PROCESOS_FACTURACION}       id:procesoFacturacion

*** Keywords ***
Navegar a módulo de facturación
    Wait Until Element Is Visible    ${MENU_FACTURACION}    timeout=10s
    Click Element    ${MENU_FACTURACION}

Acceder a cambio de ciclo
    Wait Until Element Is Visible    ${SUBMENU_CAMBIO_CICLO}    timeout=5s
    Click Element    ${SUBMENU_CAMBIO_CICLO}

Buscar cuenta por número
    [Arguments]    ${numero}
    Wait Until Element Is Visible    ${INPUT_NUMERO_CUENTA}    timeout=5s
    Input Text    ${INPUT_NUMERO_CUENTA}    ${numero}
    Click Button    ${BTN_BUSCAR_CUENTA}
    Wait Until Element Is Visible    ${LBL_INFO_CUENTA}    timeout=10s

Obtener ciclo actual
    Wait Until Element Is Visible    ${LBL_CICLO_ACTUAL}    timeout=5s
    ${ciclo}=    Get Text    ${LBL_CICLO_ACTUAL}
    [Return]    ${ciclo}

Intentar cambiar ciclo a 99 desde GUI
    Wait Until Element Is Visible    ${DDL_NUEVO_CICLO}    timeout=5s
    Select From List By Value    ${DDL_NUEVO_CICLO}    99
    Click Button    ${BTN_CAMBIAR_CICLO_GUI}

Verificar cambio de ciclo no permitido desde GUI
    Wait Until Element Is Visible    ${MSG_ERROR_GUI}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_GUI}
    Should Contain Any    ${mensaje}    no permitido    no disponible    API    interfaz
    ...    msg=El cambio a ciclo 99 no debe estar disponible desde GUI

Verificar ciclo actualizado a 99
    Wait Until Element Is Visible    ${LBL_CICLO_ACTUALIZADO}    timeout=5s
    ${ciclo}=    Get Text    ${LBL_CICLO_ACTUALIZADO}
    Should Be Equal As Strings    ${ciclo}    99    msg=El ciclo debe ser 99

Identificar cuenta con ciclo original asignado
    Wait Until Element Is Visible    ${LBL_CICLO_ACTUAL}    timeout=5s
    ${ciclo}=    Get Text    ${LBL_CICLO_ACTUAL}
    Should Not Be Equal As Strings    ${ciclo}    99    msg=La cuenta debe tener un ciclo original diferente a 99
    [Return]    ${ciclo}

Verificar cambio ciclo registrado en historial
    Wait Until Element Is Visible    ${LBL_HISTORIAL_CICLOS}    timeout=5s
    Element Should Be Visible    ${LBL_FECHA_CAMBIO_CICLO}    msg=Debe registrarse fecha del cambio
    Element Should Be Visible    ${LBL_USUARIO_CAMBIO_CICLO}    msg=Debe registrarse usuario que realizó el cambio

Verificar no se generan cargos en ciclo 99
    Wait Until Element Is Visible    ${MSG_PROCESOS_FACTURACION}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_PROCESOS_FACTURACION}
    Should Contain    ${mensaje}    sin facturación    msg=No deben generarse cargos en ciclo 99

Identificar cuenta en ciclo 99
    Wait Until Element Is Visible    ${LBL_CICLO_ACTUAL}    timeout=5s
    ${ciclo}=    Get Text    ${LBL_CICLO_ACTUAL}
    Should Be Equal As Strings    ${ciclo}    99    msg=La cuenta debe estar en ciclo 99

Obtener ciclo original desde historial
    Wait Until Element Is Visible    ${LBL_HISTORIAL_CICLOS}    timeout=5s
    Wait Until Element Is Visible    ${LBL_CICLO_ORIGINAL}    timeout=5s
    ${ciclo_original}=    Get Text    ${LBL_CICLO_ORIGINAL}
    Should Not Be Empty    ${ciclo_original}    msg=Debe existir ciclo original en el historial
    [Return]    ${ciclo_original}

Verificar ciclo restaurado a original
    [Arguments]    ${ciclo_esperado}
    Wait Until Element Is Visible    ${LBL_CICLO_ACTUALIZADO}    timeout=5s
    ${ciclo}=    Get Text    ${LBL_CICLO_ACTUALIZADO}
    Should Be Equal As Strings    ${ciclo}    ${ciclo_esperado}    msg=El ciclo debe ser restaurado al ciclo original

Verificar procesos facturación reanudados
    Wait Until Element Is Visible    ${MSG_PROCESOS_FACTURACION}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_PROCESOS_FACTURACION}
    Should Contain Any    ${mensaje}    facturación activa    cargos generados    ciclo activo
    ...    msg=Los procesos de facturación deben estar activos
