*** Variables ***
# Navegación a Preguntas Frecuentes
${MENU_PREGUNTAS_FRECUENTES}            css:nav [data-menu="preguntas-frecuentes"]
${SUBMENU_PAQUETES_INTERNET_AMIGO_FAQ}  css:nav [data-submenu="faq-paquetes-internet-amigo"]

# Locators para contenedor principal de FAQs
${CONTENEDOR_FAQS}                      id:contenedorFAQs
${TITULO_FAQS}                          id:tituloFAQs
${SECCION_FAQ_PAQUETES_INTERNET_AMIGO}  css:.seccion-faq-paquetes-internet-amigo

# Buscador de preguntas frecuentes
${INPUT_BUSCAR_FAQ}                     id:inputBuscarFAQ
${BOTON_BUSCAR_FAQ}                     id:btnBuscarFAQ

# Categoría de múltiples paquetes activos
${CATEGORIA_MULTIPLES_PAQUETES}         css:.categoria-multiples-paquetes
${TITULO_CATEGORIA_MULTIPLES_PAQUETES}  css:.categoria-multiples-paquetes h2

# Pregunta FAQ: Activación de múltiples paquetes
${FAQ_SUMA_DATOS}                       css:[data-faq-id="faq-suma-datos"]
${TITULO_FAQ_SUMA_DATOS}                css:[data-faq-id="faq-suma-datos"] .titulo-pregunta
${RESPUESTA_FAQ_SUMA_DATOS}             css:[data-faq-id="faq-suma-datos"] .respuesta-pregunta
${EXPLICACION_SUMA_DATOS}               css:[data-faq-id="faq-suma-datos"] .explicacion-suma-datos
${EXPLICACION_VIGENCIA_MAYOR}           css:[data-faq-id="faq-suma-datos"] .explicacion-vigencia-mayor

# Pregunta FAQ: Beneficios conservados
${FAQ_BENEFICIOS}                       css:[data-faq-id="faq-beneficios"]
${TITULO_FAQ_BENEFICIOS}                css:[data-faq-id="faq-beneficios"] .titulo-pregunta
${RESPUESTA_FAQ_BENEFICIOS}             css:[data-faq-id="faq-beneficios"] .respuesta-pregunta
${EXPLICACION_BENEFICIOS_MAYOR}         css:[data-faq-id="faq-beneficios"] .explicacion-beneficios-mayor

# Pregunta FAQ: Consistencia con términos y condiciones
${FAQ_CONSISTENCIA}                     css:[data-faq-id="faq-consistencia"]
${TITULO_FAQ_CONSISTENCIA}              css:[data-faq-id="faq-consistencia"] .titulo-pregunta
${RESPUESTA_FAQ_CONSISTENCIA}           css:[data-faq-id="faq-consistencia"] .respuesta-pregunta
${TEXTO_CONSISTENCIA_TERMINOS}          css:.texto-consistencia-terminos
${ENLACE_TERMINOS_CONDICIONES}          css:.enlace-terminos-condiciones

# Información adicional
${FECHA_ACTUALIZACION_FAQ}              css:.fecha-actualizacion-faq
${VERSION_FAQ}                          css:.version-faq

*** Keywords ***
Navegar A Preguntas Frecuentes De Paquetes Internet Amigo
    Wait Until Element Is Visible    ${MENU_PREGUNTAS_FRECUENTES}    timeout=10s
    Click Element    ${MENU_PREGUNTAS_FRECUENTES}
    Wait Until Element Is Visible    ${SUBMENU_PAQUETES_INTERNET_AMIGO_FAQ}    timeout=10s
    Click Element    ${SUBMENU_PAQUETES_INTERNET_AMIGO_FAQ}
    Wait Until Element Is Visible    ${CONTENEDOR_FAQS}    timeout=15s

Verificar Pagina De Preguntas Frecuentes Esta Visible
    Wait Until Element Is Visible    ${CONTENEDOR_FAQS}    timeout=10s
    Wait Until Element Is Visible    ${TITULO_FAQS}    timeout=10s
    Element Should Be Visible    ${SECCION_FAQ_PAQUETES_INTERNET_AMIGO}

Buscar Pregunta Frecuente
    [Arguments]    ${termino_busqueda}
    Wait Until Element Is Visible    ${INPUT_BUSCAR_FAQ}    timeout=10s
    Input Text    ${INPUT_BUSCAR_FAQ}    ${termino_busqueda}
    Click Button    ${BOTON_BUSCAR_FAQ}
    Sleep    2s

Verificar Categoria Multiples Paquetes Existe
    Wait Until Element Is Visible    ${CATEGORIA_MULTIPLES_PAQUETES}    timeout=10s
    Element Should Be Visible    ${TITULO_CATEGORIA_MULTIPLES_PAQUETES}

Verificar FAQ Sobre Multiples Paquetes Activos Existe
    Wait Until Element Is Visible    ${FAQ_SUMA_DATOS}    timeout=10s
    Element Should Be Visible    ${TITULO_FAQ_SUMA_DATOS}
    Element Should Be Visible    ${RESPUESTA_FAQ_SUMA_DATOS}

Desplazarse A FAQ Suma De Datos
    Wait Until Element Is Visible    ${FAQ_SUMA_DATOS}    timeout=10s
    Scroll Element Into View    ${FAQ_SUMA_DATOS}

Obtener Texto FAQ Suma De Datos
    Wait Until Element Is Visible    ${EXPLICACION_SUMA_DATOS}    timeout=10s
    ${texto}=    Get Text    ${EXPLICACION_SUMA_DATOS}
    [Return]    ${texto}

Verificar FAQ Explica Suma Automatica De Datos
    Wait Until Element Is Visible    ${EXPLICACION_SUMA_DATOS}    timeout=10s
    ${texto}=    Get Text    ${EXPLICACION_SUMA_DATOS}
    Should Contain    ${texto}    suma
    Should Contain    ${texto}    bolsa
    Log    La FAQ explica correctamente la suma automática de datos: ${texto}
    [Return]    ${texto}

Verificar FAQ Explica Vigencia Del Paquete Mayor
    Wait Until Element Is Visible    ${EXPLICACION_VIGENCIA_MAYOR}    timeout=10s
    ${texto}=    Get Text    ${EXPLICACION_VIGENCIA_MAYOR}
    Should Contain    ${texto}    vigencia
    Should Contain Any    ${texto}    mayor    mayor duración    más grande
    Log    La FAQ explica correctamente la vigencia del paquete mayor: ${texto}
    [Return]    ${texto}

Desplazarse A FAQ Beneficios
    Wait Until Element Is Visible    ${FAQ_BENEFICIOS}    timeout=10s
    Scroll Element Into View    ${FAQ_BENEFICIOS}

Verificar FAQ Sobre Beneficios Conservados Existe
    Wait Until Element Is Visible    ${FAQ_BENEFICIOS}    timeout=10s
    Element Should Be Visible    ${TITULO_FAQ_BENEFICIOS}
    Element Should Be Visible    ${RESPUESTA_FAQ_BENEFICIOS}

Verificar FAQ Explica Beneficios Del Paquete Mayor
    Wait Until Element Is Visible    ${EXPLICACION_BENEFICIOS_MAYOR}    timeout=10s
    ${texto}=    Get Text    ${EXPLICACION_BENEFICIOS_MAYOR}
    Should Contain    ${texto}    beneficios
    Should Contain Any    ${texto}    conservan    mantienen    mayores beneficios
    Log    La FAQ explica correctamente los beneficios conservados: ${texto}
    [Return]    ${texto}

Desplazarse A FAQ Consistencia
    Wait Until Element Is Visible    ${FAQ_CONSISTENCIA}    timeout=10s
    Scroll Element Into View    ${FAQ_CONSISTENCIA}

Verificar FAQ Sobre Consistencia Con Terminos Existe
    Wait Until Element Is Visible    ${FAQ_CONSISTENCIA}    timeout=10s
    Element Should Be Visible    ${TITULO_FAQ_CONSISTENCIA}
    Element Should Be Visible    ${RESPUESTA_FAQ_CONSISTENCIA}

Verificar FAQ Indica Consistencia Con Terminos Y Condiciones
    Wait Until Element Is Visible    ${TEXTO_CONSISTENCIA_TERMINOS}    timeout=10s
    ${texto}=    Get Text    ${TEXTO_CONSISTENCIA_TERMINOS}
    Should Contain Any    ${texto}    consistente    alineada    términos y condiciones    conforme
    Log    La FAQ confirma consistencia con términos y condiciones: ${texto}
    [Return]    ${texto}

Verificar Enlace A Terminos Y Condiciones Existe
    Wait Until Element Is Visible    ${ENLACE_TERMINOS_CONDICIONES}    timeout=10s
    Element Should Be Visible    ${ENLACE_TERMINOS_CONDICIONES}

Obtener Fecha Actualizacion De FAQs
    Wait Until Element Is Visible    ${FECHA_ACTUALIZACION_FAQ}    timeout=10s
    ${fecha}=    Get Text    ${FECHA_ACTUALIZACION_FAQ}
    [Return]    ${fecha}
