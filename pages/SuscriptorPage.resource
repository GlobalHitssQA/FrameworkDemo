*** Variables ***
# Suscriptor Page Locators - Vista 360
${MENU_SUSCRIPTORES}              id:menuSuscriptores
${INPUT_BUSCAR_SUSCRIPTOR}        id:searchSuscriptor
${BTN_BUSCAR_SUSCRIPTOR}          id:btnBuscarSuscriptor
${LINK_VER_SUSCRIPTOR}            css:.btn-ver-suscriptor
${SECTION_VISTA_360}              id:vista360
${LBL_OFERTA_PRIMARIA}            id:ofertaPrimaria
${BTN_CAMBIAR_OFERTA}             id:btnCambiarOferta
${MSG_ERROR_CAMBIO_OFERTA}        css:.alert-danger
${LBL_TIPO_SUSCRIPTOR}            id:tipoSuscriptor
${MODAL_CAMBIO_OFERTA}            id:modalCambioOferta
${DDL_NUEVA_OFERTA}               id:selectNuevaOferta
${BTN_CONFIRMAR_CAMBIO}           id:btnConfirmarCambio
${LBL_ESTADO_SUSCRIPTOR}          id:estadoSuscriptor
${LBL_FINANCIAMIENTO}             id:financiamiento
${LBL_ESTADO_FINANCIAMIENTO}      id:estadoFinanciamiento
# Locators para operaciones de suspensión y reactivación - TC080
${BTN_SUSPENDER_SUSCRIPTOR}        id:btnSuspenderSuscriptor
${DDL_MOTIVO_SUSPENSION}           id:selectMotivoSuspension
${OPTION_COBRANZA_PARCIAL}         xpath://option[contains(text(),'Cobranza Parcial')]
${OPTION_COBRANZA_TOTAL}           xpath://option[contains(text(),'Cobranza Total')]
${OPTION_PETICION}                 xpath://option[contains(text(),'Petición')]
${OPTION_ROBO}                     xpath://option[contains(text(),'Robo')]
${BTN_CONFIRMAR_SUSPENSION}        id:btnConfirmarSuspension
${MSG_SUSPENSION_NO_DISPONIBLE}    xpath://div[contains(text(),'suspensión no disponible')]
${BTN_REACTIVAR_SUSCRIPTOR}        id:btnReactivarSuscriptor
${MSG_REACTIVACION_NO_DISPONIBLE}  xpath://div[contains(text(),'reactivación no disponible')]
${MSG_ERROR_SIN_SIM}               xpath://div[contains(text(),'no tiene tarjeta SIM')]

*** Keywords ***
Navegar a módulo de suscriptores
    Wait Until Element Is Visible    ${MENU_SUSCRIPTORES}    timeout=10s
    Click Element    ${MENU_SUSCRIPTORES}

Buscar suscriptor
    [Arguments]    ${numero_suscriptor}
    Wait Until Element Is Visible    ${INPUT_BUSCAR_SUSCRIPTOR}    timeout=5s
    Input Text    ${INPUT_BUSCAR_SUSCRIPTOR}    ${numero_suscriptor}
    Click Button    ${BTN_BUSCAR_SUSCRIPTOR}
    Sleep    1s

Acceder a vista 360 de suscriptor
    Wait Until Element Is Visible    ${LINK_VER_SUSCRIPTOR}    timeout=5s
    Click Element    ${LINK_VER_SUSCRIPTOR}
    Wait Until Element Is Visible    ${SECTION_VISTA_360}    timeout=10s

Verificar suscriptor es Amigo Paguitos
    Wait Until Element Is Visible    ${LBL_TIPO_SUSCRIPTOR}    timeout=5s
    ${tipo}=    Get Text    ${LBL_TIPO_SUSCRIPTOR}
    Should Contain    ${tipo}    Amigo Paguitos    msg=El suscriptor debe ser de tipo Amigo Paguitos

Verificar oferta primaria actual
    Wait Until Element Is Visible    ${LBL_OFERTA_PRIMARIA}    timeout=5s
    ${oferta}=    Get Text    ${LBL_OFERTA_PRIMARIA}
    [Return]    ${oferta}

Intentar cambiar oferta primaria desde GUI
    Wait Until Element Is Visible    ${BTN_CAMBIAR_OFERTA}    timeout=5s
    Click Button    ${BTN_CAMBIAR_OFERTA}

Verificar mensaje de error cambio no permitido
    Wait Until Element Is Visible    ${MSG_ERROR_CAMBIO_OFERTA}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_CAMBIO_OFERTA}
    Should Contain Any    ${mensaje}    no disponible    no permitido    Amigo Paguitos    restricción
    ...    msg=Debe aparecer mensaje indicando que el cambio de oferta no está permitido

Verificar oferta primaria sin cambios
    [Arguments]    ${oferta_original}
    ${oferta_actual}=    Verificar oferta primaria actual
    Should Be Equal As Strings    ${oferta_actual}    ${oferta_original}
    ...    msg=La oferta primaria debe permanecer sin cambios

Verificar estado suscriptor activo
    Wait Until Element Is Visible    ${LBL_ESTADO_SUSCRIPTOR}    timeout=5s
    ${estado}=    Get Text    ${LBL_ESTADO_SUSCRIPTOR}
    Should Contain    ${estado}    Activo    msg=El suscriptor debe estar en estado activo

Verificar financiamiento vigente
    Wait Until Element Is Visible    ${LBL_ESTADO_FINANCIAMIENTO}    timeout=5s
    ${estado_financiamiento}=    Get Text    ${LBL_ESTADO_FINANCIAMIENTO}
    Should Contain    ${estado_financiamiento}    Vigente    msg=El financiamiento debe estar vigente

Verificar información completa suscriptor
    Wait Until Element Is Visible    ${SECTION_VISTA_360}    timeout=10s
    Element Should Be Visible    ${LBL_TIPO_SUSCRIPTOR}
    Element Should Be Visible    ${LBL_OFERTA_PRIMARIA}
    Element Should Be Visible    ${LBL_ESTADO_SUSCRIPTOR}
    Element Should Be Visible    ${LBL_FINANCIAMIENTO}

Intentar suspender suscriptor desde GUI
    [Arguments]    ${motivo_suspension}
    Wait Until Element Is Visible    ${BTN_SUSPENDER_SUSCRIPTOR}    timeout=5s
    Click Button    ${BTN_SUSPENDER_SUSCRIPTOR}
    Wait Until Element Is Visible    ${DDL_MOTIVO_SUSPENSION}    timeout=5s
    Select From List By Label    ${DDL_MOTIVO_SUSPENSION}    ${motivo_suspension}
    Click Button    ${BTN_CONFIRMAR_SUSPENSION}

Verificar suspensión no disponible para Amigo Paguitos
    Wait Until Element Is Visible    ${MSG_ERROR_RESTRICCION}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_RESTRICCION}
    Should Contain Any    ${mensaje}    suspensión no disponible    no disponible    Amigo Paguitos    sin tarjeta SIM
    ...    msg=Debe aparecer mensaje indicando que la suspensión no está disponible para suscriptores Amigo Paguitos

Verificar opción suspensión no visible
    Element Should Not Be Visible    ${BTN_SUSPENDER_SUSCRIPTOR}
    ...    msg=La opción de suspender suscriptor no debe estar visible para Amigo Paguitos

Intentar reactivar suscriptor desde GUI
    Wait Until Element Is Visible    ${BTN_REACTIVAR_SUSCRIPTOR}    timeout=5s
    Click Button    ${BTN_REACTIVAR_SUSCRIPTOR}

Verificar reactivación no disponible para Amigo Paguitos
    Wait Until Element Is Visible    ${MSG_ERROR_RESTRICCION}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_RESTRICCION}
    Should Contain Any    ${mensaje}    reactivación no disponible    no disponible    Amigo Paguitos
    ...    msg=Debe aparecer mensaje indicando que la reactivación no está disponible para suscriptores Amigo Paguitos

Verificar opción reactivación no visible
    Element Should Not Be Visible    ${BTN_REACTIVAR_SUSCRIPTOR}
    ...    msg=La opción de reactivar suscriptor no debe estar visible para Amigo Paguitos
