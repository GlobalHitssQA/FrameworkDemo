*** Variables ***
# Cliente Page Locators
${MENU_CLIENTES}                  id:menuClientes
${INPUT_BUSCAR_CLIENTE}           id:searchCliente
${BTN_BUSCAR_CLIENTE}             id:btnBuscarCliente
${TBL_RESULTADOS_CLIENTES}        id:tableClientes
${LINK_VER_CLIENTE}               css:.btn-ver-cliente
${LBL_INFO_CLIENTE}               id:infoCliente
${LBL_TIPO_CUENTA}                id:tipoCuenta
${BTN_SERVICIOS_ADICIONALES}      id:btnServiciosAdicionales
${MODAL_SERVICIOS}                id:modalServiciosAdicionales
${DDL_SELECCIONAR_SERVICIO}       id:selectServicio
${OPTION_TELCEL_UP}               xpath://option[contains(text(),'Telcel Up')]
${BTN_AGREGAR_SERVICIO}           id:btnAgregarServicio
${MSG_CONFIRMACION}               css:.alert-success
${SECTION_SERVICIOS_ACTIVOS}      id:serviciosActivos
${LBL_SERVICIO_TELCEL_UP}         xpath://div[contains(text(),'Telcel Up')]
${BTN_REMOVER_SERVICIO}           id:btnRemoverServicio
${BTN_REMOVER_TELCEL_UP}          xpath://button[@data-servicio='Telcel Up' and contains(@class,'btn-remover')]
${MODAL_CONFIRMAR_BAJA}           id:modalConfirmarBaja
${BTN_CONFIRMAR_BAJA}             id:btnConfirmarBaja
${MSG_BAJA_EXITOSA}               css:.alert-success
${OPTION_OTRA_OFERTA}             xpath://option[contains(text(),'Oferta Suplementaria')]
${MSG_ERROR_OFERTA_NO_PERMITIDA}  css:.alert-danger
${LBL_CUENTA_MIXTO}               id:cuentaMixto
${LBL_EQUIPO_FINANCIADO}          id:equipoFinanciado
# Locators para Vista 360 con información de financiamiento - TC100 y TC101
${SECTION_VISTA_360_CLIENTE}      id:vista360Cliente
${SECTION_INFO_FINANCIAMIENTO}    id:infoFinanciamiento
${LBL_MONTO_FINANCIADO}           id:montoFinanciado
${LBL_PLAZO_FINANCIAMIENTO}       id:plazoFinanciamiento
${LBL_PERIODICIDAD}               id:periodicidad
${LBL_DATOS_CLIENTE_360}          id:datosCliente360
${SECTION_DESGLOSE_CUOTAS}        id:desgloseCuotas
${LBL_FECHAS_VENCIMIENTO}         id:fechasVencimiento
${LBL_ESTATUS_PRESTAMO}           id:estatusPrestamo
${SECTION_DESGLOSE_PAGOS}         id:desglosePagos
${SECTION_HISTORIAL_PAGOS}        id:historialPagos
${LBL_VENTAS_VENDEDOR}            id:ventasVendedor
${SECTION_PARCIALIDADES}          id:parcialidades
${LBL_ESTATUS_FINANCIAMIENTO}     id:estatusFinanciamiento

*** Keywords ***
Navegar a módulo de clientes
    Wait Until Element Is Visible    ${MENU_CLIENTES}    timeout=10s
    Click Element    ${MENU_CLIENTES}

Buscar cliente Amigo Paguitos
    [Arguments]    ${numero_cliente}
    Wait Until Element Is Visible    ${INPUT_BUSCAR_CLIENTE}    timeout=5s
    Input Text    ${INPUT_BUSCAR_CLIENTE}    ${numero_cliente}
    Click Button    ${BTN_BUSCAR_CLIENTE}
    Wait Until Element Is Visible    ${TBL_RESULTADOS_CLIENTES}    timeout=10s

Seleccionar primer cliente de resultados
    Wait Until Element Is Visible    ${LINK_VER_CLIENTE}    timeout=5s
    Click Element    ${LINK_VER_CLIENTE}
    Wait Until Element Is Visible    ${LBL_INFO_CLIENTE}    timeout=10s

Verificar cliente es Amigo Paguitos
    Wait Until Element Is Visible    ${LBL_TIPO_CUENTA}    timeout=5s
    ${tipo}=    Get Text    ${LBL_TIPO_CUENTA}
    Should Contain    ${tipo}    Amigo Paguitos    msg=El cliente debe ser de tipo Amigo Paguitos

Acceder a servicios adicionales
    Wait Until Element Is Visible    ${BTN_SERVICIOS_ADICIONALES}    timeout=5s
    Click Button    ${BTN_SERVICIOS_ADICIONALES}
    Wait Until Element Is Visible    ${MODAL_SERVICIOS}    timeout=5s

Seleccionar servicio Telcel Up
    Wait Until Element Is Visible    ${DDL_SELECCIONAR_SERVICIO}    timeout=5s
    Click Element    ${DDL_SELECCIONAR_SERVICIO}
    Wait Until Element Is Visible    ${OPTION_TELCEL_UP}    timeout=5s
    Click Element    ${OPTION_TELCEL_UP}

Confirmar alta de servicio
    Wait Until Element Is Enabled    ${BTN_AGREGAR_SERVICIO}    timeout=5s
    Click Button    ${BTN_AGREGAR_SERVICIO}
    Wait Until Element Is Visible    ${MSG_CONFIRMACION}    timeout=10s

Verificar servicio Telcel Up activo
    Wait Until Element Is Visible    ${SECTION_SERVICIOS_ACTIVOS}    timeout=5s
    Element Should Be Visible    ${LBL_SERVICIO_TELCEL_UP}    msg=Telcel Up debe aparecer en servicios activos

Acceder a gestión de servicios del cliente
    Acceder a servicios adicionales

Seleccionar opción baja de servicios
    Wait Until Element Is Visible    ${SECTION_SERVICIOS_ACTIVOS}    timeout=5s

Seleccionar Telcel Up para cancelación
    Wait Until Element Is Visible    ${BTN_REMOVER_TELCEL_UP}    timeout=5s
    Click Button    ${BTN_REMOVER_TELCEL_UP}
    Wait Until Element Is Visible    ${MODAL_CONFIRMAR_BAJA}    timeout=5s

Confirmar cancelación de servicio
    Wait Until Element Is Enabled    ${BTN_CONFIRMAR_BAJA}    timeout=5s
    Click Button    ${BTN_CONFIRMAR_BAJA}
    Wait Until Element Is Visible    ${MSG_BAJA_EXITOSA}    timeout=10s

Verificar servicio Telcel Up removido
    Wait Until Element Is Visible    ${SECTION_SERVICIOS_ACTIVOS}    timeout=5s
    Element Should Not Be Visible    ${LBL_SERVICIO_TELCEL_UP}    msg=Telcel Up no debe aparecer en servicios activos

Verificar información cliente con cuenta Mixto
    Wait Until Element Is Visible    ${LBL_INFO_CLIENTE}    timeout=5s
    Wait Until Element Is Visible    ${LBL_CUENTA_MIXTO}    timeout=5s
    ${cuenta}=    Get Text    ${LBL_CUENTA_MIXTO}
    Should Contain    ${cuenta}    Mixto    msg=El cliente debe tener cuenta tipo Mixto

Verificar equipo financiado registrado
    Wait Until Element Is Visible    ${LBL_EQUIPO_FINANCIADO}    timeout=5s
    Element Should Be Visible    ${LBL_EQUIPO_FINANCIADO}    msg=Debe existir un equipo financiado registrado

Intentar agregar oferta suplementaria diferente a Telcel Up
    [Arguments]    ${nombre_oferta}
    Wait Until Element Is Visible    ${DDL_SELECCIONAR_SERVICIO}    timeout=5s
    Click Element    ${DDL_SELECCIONAR_SERVICIO}
    Wait Until Element Is Visible    ${OPTION_OTRA_OFERTA}    timeout=5s
    Click Element    ${OPTION_OTRA_OFERTA}

Verificar rechazo de oferta no permitida
    Wait Until Element Is Visible    ${MSG_ERROR_OFERTA_NO_PERMITIDA}    timeout=5s
    ${mensaje}=    Get Text    ${MSG_ERROR_OFERTA_NO_PERMITIDA}
    Should Contain Any    ${mensaje}    solo se permite    Telcel Up    no permitida    Amigo Paguitos
    ...    msg=Debe aparecer mensaje indicando que solo Telcel Up está permitido

Verificar solo Telcel Up permitida como oferta suplementaria
    Wait Until Element Is Visible    ${DDL_SELECCIONAR_SERVICIO}    timeout=5s
    Click Element    ${DDL_SELECCIONAR_SERVICIO}
    Element Should Be Visible    ${OPTION_TELCEL_UP}    msg=Telcel Up debe estar disponible
    ${opciones}=    Get WebElements    xpath://select[@id='selectServicio']/option
    ${count}=    Get Length    ${opciones}
    Should Be True    ${count} <= 2    msg=Solo Telcel Up debe estar disponible como oferta suplementaria

Acceder a vista 360 del cliente
    Wait Until Element Is Visible    ${SECTION_VISTA_360_CLIENTE}    timeout=10s
    Element Should Be Visible    ${SECTION_VISTA_360_CLIENTE}

Verificar información completa de financiamiento en vista 360
    Wait Until Element Is Visible    ${SECTION_INFO_FINANCIAMIENTO}    timeout=10s
    Element Should Be Visible    ${LBL_MONTO_FINANCIADO}    msg=Debe mostrarse monto financiado
    Element Should Be Visible    ${LBL_PLAZO_FINANCIAMIENTO}    msg=Debe mostrarse plazo de financiamiento
    Element Should Be Visible    ${LBL_PERIODICIDAD}    msg=Debe mostrarse periodicidad
    Element Should Be Visible    ${LBL_DATOS_CLIENTE_360}    msg=Deben mostrarse datos del cliente
    Element Should Be Visible    ${SECTION_DESGLOSE_CUOTAS}    msg=Debe mostrarse desglose de cuotas
    Element Should Be Visible    ${LBL_FECHAS_VENCIMIENTO}    msg=Deben mostrarse fechas de vencimiento
    Element Should Be Visible    ${LBL_ESTATUS_PRESTAMO}    msg=Debe mostrarse estatus del préstamo

Verificar desglose de pagos en vista 360
    Wait Until Element Is Visible    ${SECTION_DESGLOSE_PAGOS}    timeout=10s
    Element Should Be Visible    ${SECTION_DESGLOSE_PAGOS}    msg=Debe mostrarse desglose de pagos
    Element Should Be Visible    ${SECTION_HISTORIAL_PAGOS}    msg=Debe mostrarse historial de pagos

Verificar ventas por vendedor en vista 360
    Wait Until Element Is Visible    ${LBL_VENTAS_VENDEDOR}    timeout=5s
    Element Should Be Visible    ${LBL_VENTAS_VENDEDOR}    msg=Debe mostrarse información de ventas por vendedor

Verificar todas las secciones de financiamiento visible
    Verificar información completa de financiamiento en vista 360
    Verificar desglose de pagos en vista 360
    Verificar ventas por vendedor en vista 360
    Element Should Be Visible    ${SECTION_PARCIALIDADES}    msg=Debe mostrarse información de parcialidades
    Element Should Be Visible    ${LBL_ESTATUS_FINANCIAMIENTO}    msg=Debe mostrarse estatus del financiamiento
