*** Variables ***
# Navegación a Términos y Condiciones
${MENU_TERMINOS_CONDICIONES}           css:nav [data-menu="terminos-condiciones"]
${SUBMENU_PAQUETES_INTERNET_AMIGO_TC}  css:nav [data-submenu="tc-paquetes-internet-amigo"]

# Locators para documento de términos y condiciones
${DOCUMENTO_TERMINOS_CONDICIONES}      id:documentoTerminosCondiciones
${SECCION_PAQUETES_INTERNET_AMIGO}     css:#documentoTerminosCondiciones .seccion-paquetes-internet-amigo
${TITULO_DOCUMENTO_TC}                 css:#documentoTerminosCondiciones h1

# Sección de comportamiento con múltiples paquetes
${SECCION_MULTIPLES_PAQUETES}          css:.seccion-multiples-paquetes-activos
${TITULO_MULTIPLES_PAQUETES}           css:.seccion-multiples-paquetes-activos h2
${CONTENIDO_MULTIPLES_PAQUETES}        css:.seccion-multiples-paquetes-activos .contenido

# Regla de suma de datos de navegación libre
${SECCION_SUMA_DATOS_NAVEGACION}       css:.regla-suma-datos-navegacion-libre
${TEXTO_SUMA_DATOS_NAVEGACION}         css:.regla-suma-datos-navegacion-libre p
${DESCRIPCION_BOLSA_NAVEGACION}        css:.descripcion-bolsa-navegacion-libre

# Regla de suma de datos de redes sociales
${SECCION_SUMA_DATOS_RRSS}             css:.regla-suma-datos-redes-sociales
${TEXTO_SUMA_DATOS_RRSS}               css:.regla-suma-datos-redes-sociales p
${DESCRIPCION_BOLSA_RRSS}              css:.descripcion-bolsa-redes-sociales

# Regla de vigencia resultante
${SECCION_VIGENCIA_RESULTANTE}         css:.regla-vigencia-resultante
${TEXTO_VIGENCIA_RESULTANTE}           css:.regla-vigencia-resultante p
${DESCRIPCION_VIGENCIA_PAQUETE_MAYOR}  css:.descripcion-vigencia-paquete-mayor
${DESCRIPCION_BENEFICIOS_MAYORES}      css:.descripcion-beneficios-mayores

# Botones de navegación en el documento
${BOTON_IMPRIMIR_DOCUMENTO}            id:btnImprimirDocumento
${BOTON_DESCARGAR_PDF}                 id:btnDescargarPDF
${FECHA_ACTUALIZACION_DOCUMENTO}       css:.fecha-actualizacion-documento
${VERSION_DOCUMENTO}                   css:.version-documento

*** Keywords ***
Navegar A Terminos Y Condiciones
    Wait Until Element Is Visible    ${MENU_TERMINOS_CONDICIONES}    timeout=10s
    Click Element    ${MENU_TERMINOS_CONDICIONES}
    Wait Until Element Is Visible    ${SUBMENU_PAQUETES_INTERNET_AMIGO_TC}    timeout=10s
    Click Element    ${SUBMENU_PAQUETES_INTERNET_AMIGO_TC}
    Wait Until Element Is Visible    ${DOCUMENTO_TERMINOS_CONDICIONES}    timeout=15s

Verificar Documento De Terminos Y Condiciones Esta Visible
    Wait Until Element Is Visible    ${DOCUMENTO_TERMINOS_CONDICIONES}    timeout=10s
    Wait Until Element Is Visible    ${TITULO_DOCUMENTO_TC}    timeout=10s
    Element Should Be Visible    ${SECCION_PAQUETES_INTERNET_AMIGO}

Obtener Titulo Del Documento
    ${titulo}=    Get Text    ${TITULO_DOCUMENTO_TC}
    [Return]    ${titulo}

Verificar Seccion Multiples Paquetes Existe
    Wait Until Element Is Visible    ${SECCION_MULTIPLES_PAQUETES}    timeout=10s
    Element Should Be Visible    ${TITULO_MULTIPLES_PAQUETES}
    Element Should Be Visible    ${CONTENIDO_MULTIPLES_PAQUETES}

Obtener Contenido Seccion Multiples Paquetes
    Wait Until Element Is Visible    ${CONTENIDO_MULTIPLES_PAQUETES}    timeout=10s
    ${contenido}=    Get Text    ${CONTENIDO_MULTIPLES_PAQUETES}
    [Return]    ${contenido}

Verificar Regla Suma Datos Navegacion Libre Esta Descrita
    Wait Until Element Is Visible    ${SECCION_SUMA_DATOS_NAVEGACION}    timeout=10s
    Element Should Be Visible    ${TEXTO_SUMA_DATOS_NAVEGACION}
    ${texto}=    Get Text    ${TEXTO_SUMA_DATOS_NAVEGACION}
    Should Contain    ${texto}    navegación libre
    Should Contain    ${texto}    suma
    Should Contain    ${texto}    una sola bolsa
    [Return]    ${texto}

Obtener Descripcion Bolsa Navegacion Libre
    Wait Until Element Is Visible    ${DESCRIPCION_BOLSA_NAVEGACION}    timeout=10s
    ${descripcion}=    Get Text    ${DESCRIPCION_BOLSA_NAVEGACION}
    [Return]    ${descripcion}

Verificar Regla Suma Datos Redes Sociales Esta Descrita
    Wait Until Element Is Visible    ${SECCION_SUMA_DATOS_RRSS}    timeout=10s
    Element Should Be Visible    ${TEXTO_SUMA_DATOS_RRSS}
    ${texto}=    Get Text    ${TEXTO_SUMA_DATOS_RRSS}
    Should Contain    ${texto}    redes sociales
    Should Contain    ${texto}    suma
    Should Contain    ${texto}    una sola bolsa
    [Return]    ${texto}

Obtener Descripcion Bolsa Redes Sociales
    Wait Until Element Is Visible    ${DESCRIPCION_BOLSA_RRSS}    timeout=10s
    ${descripcion}=    Get Text    ${DESCRIPCION_BOLSA_RRSS}
    [Return]    ${descripcion}

Verificar Regla Vigencia Resultante Esta Descrita
    Wait Until Element Is Visible    ${SECCION_VIGENCIA_RESULTANTE}    timeout=10s
    Element Should Be Visible    ${TEXTO_VIGENCIA_RESULTANTE}
    ${texto}=    Get Text    ${TEXTO_VIGENCIA_RESULTANTE}
    Should Contain    ${texto}    vigencia
    Should Contain    ${texto}    paquete más grande
    [Return]    ${texto}

Obtener Descripcion Vigencia Paquete Mayor
    Wait Until Element Is Visible    ${DESCRIPCION_VIGENCIA_PAQUETE_MAYOR}    timeout=10s
    ${descripcion}=    Get Text    ${DESCRIPCION_VIGENCIA_PAQUETE_MAYOR}
    [Return]    ${descripcion}

Verificar Descripcion Beneficios Mayores Esta Presente
    Wait Until Element Is Visible    ${DESCRIPCION_BENEFICIOS_MAYORES}    timeout=10s
    ${texto}=    Get Text    ${DESCRIPCION_BENEFICIOS_MAYORES}
    Should Contain    ${texto}    beneficios
    [Return]    ${texto}

Obtener Fecha Actualizacion Del Documento
    Wait Until Element Is Visible    ${FECHA_ACTUALIZACION_DOCUMENTO}    timeout=10s
    ${fecha}=    Get Text    ${FECHA_ACTUALIZACION_DOCUMENTO}
    [Return]    ${fecha}

Obtener Version Del Documento
    Wait Until Element Is Visible    ${VERSION_DOCUMENTO}    timeout=10s
    ${version}=    Get Text    ${VERSION_DOCUMENTO}
    [Return]    ${version}

Desplazarse A Seccion Multiples Paquetes
    Wait Until Element Is Visible    ${SECCION_MULTIPLES_PAQUETES}    timeout=10s
    Scroll Element Into View    ${SECCION_MULTIPLES_PAQUETES}

Desplazarse A Seccion Suma Datos Navegacion
    Wait Until Element Is Visible    ${SECCION_SUMA_DATOS_NAVEGACION}    timeout=10s
    Scroll Element Into View    ${SECCION_SUMA_DATOS_NAVEGACION}

Desplazarse A Seccion Suma Datos RRSS
    Wait Until Element Is Visible    ${SECCION_SUMA_DATOS_RRSS}    timeout=10s
    Scroll Element Into View    ${SECCION_SUMA_DATOS_RRSS}

Desplazarse A Seccion Vigencia Resultante
    Wait Until Element Is Visible    ${SECCION_VIGENCIA_RESULTANTE}    timeout=10s
    Scroll Element Into View    ${SECCION_VIGENCIA_RESULTANTE}
