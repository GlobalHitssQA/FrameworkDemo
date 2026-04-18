*** Variables ***
# Trámites Page Locators
${MENU_TRAMITES}                      id:menuTramites
${SUBMENU_POSTACTIVACION}             id:submenuPostactivacion
${BTN_CAMBIO_NUMERO}                  id:btnCambioNumero
${BTN_CAMBIO_SIM}                     id:btnCambioSim
${BTN_CESION_DERECHOS}                id:btnCesionDerechos
${BTN_REPORTE_PERDIDA}                id:btnReportePerdida
${MSG_ERROR_RESTRICCION}              css:.alert-danger
${MSG_OPERACION_NO_PERMITIDA}         xpath://div[contains(text(),'operación no disponible')]
${LBL_TIPO_CUENTA_TRAMITE}            id:tipoCuentaTramite
${BTN_TERMINACION_SUSCRIPTOR}         id:btnTerminacionSuscriptor
${MSG_TERMINACION_NO_DISPONIBLE}      xpath://div[contains(text(),'no está disponible para suscriptores Amigo Paguitos')]
${BTN_INTERCAMBIO_RECURSOS}           id:btnIntercambioRecursos
${MSG_INTERCAMBIO_NO_PERMITIDO}       xpath://div[contains(text(),'operación no disponible para Amigo Paguitos')]
${BTN_REPORTE_EXTRAVIO}               id:btnReporteExtravio
${BTN_CANCELAR_REPORTE_EXTRAVIO}      id:btnCancelarReporteExtravio
${MODAL_REPORTE_EXTRAVIO}             id:modalReporteExtravio
${MSG_REPORTE_EXTRAVIO_NO_PERMITIDO}  xpath://div[contains(text(),'reporte por extravío no disponible')]
${LBL_MSISDN_DUMMY}                   id:msisdnDummy
${LBL_SIN_ICCID}                      id:sinIccid

*** Keywords ***
Navegar a módulo de trámites postactivación
    Wait Until Element Is Visible    ${MENU_TRAMITES}    timeout=10s
    Click Element    ${MENU_TRAMITES}
    Wait Until Element Is Visible    ${SUBMENU_POSTACTIVACION}    timeout=5s
    Click Element    ${SUBMENU_POSTACTIVACION}

Intentar cambio de número
    Wait Until Element Is Visible    ${BTN_CAMBIO_NUMERO}    timeout=5s
    Click Button    ${BTN_CAMBIO_NUMERO}

Intentar cambio de SIM
    Wait Until Element Is Visible    ${BTN_CAMBIO_SIM}    timeout=5s
    Click Button    ${BTN_CAMBIO_SIM}

Intentar cesión de derechos
    Wait Until Element Is Visible    ${BTN_CESION_DERECHOS}    timeout=5s
    Click Button    ${BTN_CESION_DERECHOS}

Intentar reporte de pérdida o robo
    Wait Until Element Is Visible    ${BTN_REPORTE_PERDIDA}    timeout=5s
    Click Button    ${BTN_REPORTE_PERDIDA}

Verificar mensaje de restricción para Amigo Paguitos
    Wait Until Element Is Visible    ${MSG_ERROR_RESTRICCION}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_RESTRICCION}
    Should Contain Any    ${mensaje}    Amigo Paguitos    operación no disponible    no disponible    restricción
    ...    msg=Debe aparecer mensaje de restricción para suscriptores Amigo Paguitos

Verificar operación bloqueada
    Element Should Be Visible    ${MSG_OPERACION_NO_PERMITIDA}    timeout=5s
    ...    msg=La operación debe estar bloqueada con mensaje de error

Intentar terminación de suscriptor desde GUI
    Wait Until Element Is Visible    ${BTN_TERMINACION_SUSCRIPTOR}    timeout=5s
    Click Button    ${BTN_TERMINACION_SUSCRIPTOR}

Verificar terminación bloqueada para Amigo Paguitos
    Wait Until Element Is Visible    ${MSG_ERROR_RESTRICCION}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_RESTRICCION}
    Should Contain Any    ${mensaje}    no está disponible    no disponible    Amigo Paguitos
    ...    msg=Debe aparecer mensaje indicando que terminación no está disponible para Amigo Paguitos

Intentar intercambio de recursos desde GUI
    Wait Until Element Is Visible    ${BTN_INTERCAMBIO_RECURSOS}    timeout=5s
    Click Button    ${BTN_INTERCAMBIO_RECURSOS}

Verificar intercambio de recursos no disponible
    Wait Until Element Is Visible    ${MSG_ERROR_RESTRICCION}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_RESTRICCION}
    Should Contain Any    ${mensaje}    intercambio de recursos    operación no disponible    no disponible    Amigo Paguitos
    ...    msg=Debe aparecer mensaje indicando que intercambio de recursos no está disponible

Verificar opción intercambio recursos deshabilitada
    Element Should Not Be Visible    ${BTN_INTERCAMBIO_RECURSOS}
    ...    msg=La opción de intercambio de recursos no debe estar visible para Amigo Paguitos

Verificar MSISDN dummy asignado
    Wait Until Element Is Visible    ${LBL_MSISDN_DUMMY}    timeout=5s
    ${msisdn}=    Get Text    ${LBL_MSISDN_DUMMY}
    Should Not Be Empty    ${msisdn}    msg=Debe existir un MSISDN dummy asignado

Verificar suscriptor sin tarjeta SIM asociada
    Wait Until Element Is Visible    ${LBL_SIN_ICCID}    timeout=5s
    Element Should Be Visible    ${LBL_SIN_ICCID}    msg=El suscriptor no debe tener tarjeta SIM asociada

Intentar crear reporte por extravío desde GUI
    Wait Until Element Is Visible    ${BTN_REPORTE_EXTRAVIO}    timeout=5s
    Click Button    ${BTN_REPORTE_EXTRAVIO}

Verificar reporte por extravío no disponible
    Wait Until Element Is Visible    ${MSG_ERROR_RESTRICCION}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_RESTRICCION}
    Should Contain Any    ${mensaje}    reporte por extravío    extravío    operación no disponible    Amigo Paguitos
    ...    msg=Debe aparecer mensaje indicando que reporte por extravío no está disponible

Verificar opción crear reporte extravío deshabilitada
    Element Should Not Be Visible    ${BTN_REPORTE_EXTRAVIO}
    ...    msg=La opción de crear reporte por extravío no debe estar visible

Verificar no permite cancelar reporte extravío
    Element Should Not Be Visible    ${BTN_CANCELAR_REPORTE_EXTRAVIO}
    ...    msg=La opción de cancelar reporte por extravío no debe estar visible
