*** Variables ***
# Navegación a configuración de reglas de negocio
${MENU_CONFIGURACION}                      id:menuConfiguracion
${SUBMENU_REGLAS_NEGOCIO}                  id:submenuReglasNegocio
${SECCION_REGLAS_PAQUETES_AMIGO}           id:seccionReglasPaquetesAmigo

# Configuración de reglas
${INPUT_NOMBRE_REGLA}                      id:nombreRegla
${CHECKBOX_SUMA_DATOS}                     id:checkboxSumaDatos
${CHECKBOX_BOLSA_UNICA}                    id:checkboxBolsaUnica
${CHECKBOX_VIGENCIA_MAYOR}                 id:checkboxVigenciaMayor
${CHECKBOX_BENEFICIOS_MAYOR}               id:checkboxBeneficiosMayor
${CHECKBOX_COMPATIBILIDAD_BES}             id:checkboxCompatibilidadBES
${CHECKBOX_COMPATIBILIDAD_M2K}             id:checkboxCompatibilidadM2K
${CHECKBOX_REPLICACION_PLATAFORMAS}        id:checkboxReplicacionPlataformas
${BOTON_GUARDAR_CONFIGURACION}             id:btnGuardarConfiguracion
${MENSAJE_CONFIGURACION_EXITOSA}           css:.alert-success .mensaje-configuracion

# Verificación de configuración aplicada
${SECCION_REGLAS_ACTIVAS}                  id:seccionReglasActivas
${LISTA_REGLAS_CONFIGURADAS}               css:.lista-reglas-configuradas
${ITEM_REGLA_ACTIVA}                       css:.item-regla-activa
${LABEL_REGLA_SUMA_DATOS}                  css:[data-regla="suma-datos"]
${LABEL_REGLA_BOLSA_UNICA}                 css:[data-regla="bolsa-unica"]
${LABEL_REGLA_VIGENCIA_MAYOR}              css:[data-regla="vigencia-mayor"]
${ICONO_REGLA_APLICADA}                    css:.icono-regla-aplicada

# Estado de procesamiento UPC
${LABEL_ESTADO_PROCESAMIENTO}              id:estadoProcesamientoUPC
${ICONO_PROCESAMIENTO_EXITOSO}             css:.icono-procesamiento-exitoso
${MENSAJE_REGLAS_APLICADAS}                css:.mensaje-reglas-aplicadas

*** Keywords ***
Navegar A Configuracion De Reglas De Negocio
    Wait Until Element Is Visible    ${MENU_CONFIGURACION}    timeout=10s
    Click Element    ${MENU_CONFIGURACION}
    Wait Until Element Is Visible    ${SUBMENU_REGLAS_NEGOCIO}    timeout=10s
    Click Element    ${SUBMENU_REGLAS_NEGOCIO}
    Wait Until Element Is Visible    ${SECCION_REGLAS_PAQUETES_AMIGO}    timeout=10s

Configurar Regla De Suma De Datos
    Wait Until Element Is Visible    ${CHECKBOX_SUMA_DATOS}    timeout=10s
    Select Checkbox    ${CHECKBOX_SUMA_DATOS}

Configurar Regla De Bolsa Unica
    Wait Until Element Is Visible    ${CHECKBOX_BOLSA_UNICA}    timeout=10s
    Select Checkbox    ${CHECKBOX_BOLSA_UNICA}

Configurar Regla De Vigencia Mayor
    Wait Until Element Is Visible    ${CHECKBOX_VIGENCIA_MAYOR}    timeout=10s
    Select Checkbox    ${CHECKBOX_VIGENCIA_MAYOR}

Configurar Regla De Beneficios Mayor
    Wait Until Element Is Visible    ${CHECKBOX_BENEFICIOS_MAYOR}    timeout=10s
    Select Checkbox    ${CHECKBOX_BENEFICIOS_MAYOR}

Habilitar Compatibilidad Con Productos BES
    Wait Until Element Is Visible    ${CHECKBOX_COMPATIBILIDAD_BES}    timeout=10s
    Select Checkbox    ${CHECKBOX_COMPATIBILIDAD_BES}

Habilitar Compatibilidad Con Productos M2K
    Wait Until Element Is Visible    ${CHECKBOX_COMPATIBILIDAD_M2K}    timeout=10s
    Select Checkbox    ${CHECKBOX_COMPATIBILIDAD_M2K}

Habilitar Replicacion A Plataformas De Consulta
    Wait Until Element Is Visible    ${CHECKBOX_REPLICACION_PLATAFORMAS}    timeout=10s
    Select Checkbox    ${CHECKBOX_REPLICACION_PLATAFORMAS}

Guardar Configuracion De Reglas
    Wait Until Element Is Enabled    ${BOTON_GUARDAR_CONFIGURACION}    timeout=10s
    Click Button    ${BOTON_GUARDAR_CONFIGURACION}
    Wait Until Element Is Visible    ${MENSAJE_CONFIGURACION_EXITOSA}    timeout=15s

Verificar Configuracion De Reglas Exitosa
    ${mensaje}=    Get Text    ${MENSAJE_CONFIGURACION_EXITOSA}
    Should Contain    ${mensaje}    exitosamente
    Element Should Be Visible    ${ICONO_PROCESAMIENTO_EXITOSO}

Verificar UPC Acepta Las Nuevas Reglas De Negocio
    Wait Until Element Is Visible    ${SECCION_REGLAS_ACTIVAS}    timeout=10s
    Wait Until Element Is Visible    ${LISTA_REGLAS_CONFIGURADAS}    timeout=10s
    Element Should Be Visible    ${LABEL_REGLA_SUMA_DATOS}
    Element Should Be Visible    ${LABEL_REGLA_BOLSA_UNICA}
    Element Should Be Visible    ${LABEL_REGLA_VIGENCIA_MAYOR}

Verificar Estado De Procesamiento UPC
    Wait Until Element Is Visible    ${LABEL_ESTADO_PROCESAMIENTO}    timeout=10s
    ${estado}=    Get Text    ${LABEL_ESTADO_PROCESAMIENTO}
    Should Contain    ${estado}    Procesando correctamente
    Element Should Be Visible    ${ICONO_PROCESAMIENTO_EXITOSO}
