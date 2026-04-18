*** Variables ***
# Ofertas Page Locators
${MENU_CONFIGURACION}         id:menuConfiguracion
${MENU_OFERTAS}               id:menuOfertas
${SUBMENU_OFERTAS_PRIMARIAS}  id:submenuOfertasPrimarias
${INPUT_BUSCAR_OFERTA}        id:searchOferta
${BTN_BUSCAR_OFERTA}          id:btnBuscarOferta
${TBL_RESULTADOS_OFERTAS}     id:tableOfertas
${LINK_AMIGO_PAGUITOS}        xpath://a[contains(text(),'Amigo Paguitos')]
${LBL_DETALLE_OFERTA}         id:detalleOferta
${INPUT_TARIFA_RENTA}         id:tarifaRenta
${LBL_UNIDADES_LIBRES}        id:unidadesLibres
${SECTION_OFERTAS_SUPLEMENTARIAS}    id:ofertasSuplementarias
${LBL_SIN_OFERTAS_SUPLEMENTARIAS}    xpath://div[contains(text(),'No hay ofertas suplementarias')]
${LBL_TARIFA_VALUE}           css:#tarifaRenta .value

*** Keywords ***
Navegar a módulo de ofertas
    Wait Until Element Is Visible    ${MENU_CONFIGURACION}    timeout=10s
    Click Element    ${MENU_CONFIGURACION}
    Wait Until Element Is Visible    ${MENU_OFERTAS}    timeout=5s
    Click Element    ${MENU_OFERTAS}

Seleccionar ofertas primarias
    Wait Until Element Is Visible    ${SUBMENU_OFERTAS_PRIMARIAS}    timeout=5s
    Click Element    ${SUBMENU_OFERTAS_PRIMARIAS}
    Wait Until Element Is Visible    ${TBL_RESULTADOS_OFERTAS}    timeout=10s

Buscar oferta por nombre
    [Arguments]    ${nombre_oferta}
    Wait Until Element Is Visible    ${INPUT_BUSCAR_OFERTA}    timeout=5s
    Input Text    ${INPUT_BUSCAR_OFERTA}    ${nombre_oferta}
    Click Button    ${BTN_BUSCAR_OFERTA}
    Sleep    1s

Seleccionar oferta Amigo Paguitos
    Buscar oferta por nombre    Amigo Paguitos
    Wait Until Element Is Visible    ${LINK_AMIGO_PAGUITOS}    timeout=10s
    Click Element    ${LINK_AMIGO_PAGUITOS}
    Wait Until Element Is Visible    ${LBL_DETALLE_OFERTA}    timeout=10s

Verificar tarifa de renta es cero
    Wait Until Element Is Visible    ${INPUT_TARIFA_RENTA}    timeout=5s
    ${tarifa}=    Get Value    ${INPUT_TARIFA_RENTA}
    Should Be Equal As Numbers    ${tarifa}    0    msg=La tarifa de renta debe ser 0

Verificar no existen unidades libres
    Wait Until Element Is Visible    ${LBL_UNIDADES_LIBRES}    timeout=5s
    ${unidades}=    Get Text    ${LBL_UNIDADES_LIBRES}
    Should Contain    ${unidades}    0    msg=No deben existir unidades libres configuradas

Verificar no existen ofertas suplementarias adicionales
    Wait Until Element Is Visible    ${SECTION_OFERTAS_SUPLEMENTARIAS}    timeout=5s
    Element Should Be Visible    ${LBL_SIN_OFERTAS_SUPLEMENTARIAS}    msg=No deben existir ofertas suplementarias adicionales
