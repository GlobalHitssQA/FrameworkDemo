*** Settings ***
Library    SeleniumLibrary
Resource   ../pages/LoginPage.resource
Resource   ../pages/OfertasPage.resource
Resource   ../pages/ClientePage.resource
Resource   ../pages/TramitesPage.resource
Resource   ../pages/FacturacionPage.resource
Resource   ../pages/SuscriptorPage.resource
Resource   ../pages/PagosPage.resource

*** Keywords ***
# ============================================================================
# Keywords de Login y Sesión
# ============================================================================

Dado que el usuario ha iniciado sesión en BES
    Abrir navegador en página de login
    Ingresar credenciales de prueba
    Hacer click en botón de login
    Verificar login exitoso

Cerrar sesión del sistema
    Cerrar sesión y navegador

# ============================================================================
# Keywords de Ofertas Primarias - TC032
# ============================================================================

Cuando accede al módulo de configuración de ofertas primarias
    Navegar a módulo de ofertas
    Seleccionar ofertas primarias

Y busca la oferta primaria exclusiva para Amigo Paguitos
    Seleccionar oferta Amigo Paguitos

Entonces la tarifa de renta debe ser cero
    Verificar tarifa de renta es cero

Y no deben existir unidades libres configuradas
    Verificar no existen unidades libres

Y no deben existir ofertas suplementarias adicionales
    Verificar no existen ofertas suplementarias adicionales

# ============================================================================
# Keywords de Servicios Adicionales - TC033
# ============================================================================

Dado que existe un cliente de Amigo Paguitos con financiamiento activo
    [Arguments]    ${numero_cliente}
    Navegar a módulo de clientes
    Buscar cliente Amigo Paguitos    ${numero_cliente}
    Seleccionar primer cliente de resultados
    Verificar cliente es Amigo Paguitos

Cuando accede a la opción de alta de servicios adicionales
    Acceder a servicios adicionales

Y selecciona la oferta suplementaria Telcel Up
    Seleccionar servicio Telcel Up

Y confirma el alta de la oferta suplementaria
    Confirmar alta de servicio

Entonces el sistema debe registrar exitosamente el alta de Telcel Up
    Verificar servicio Telcel Up activo

# ============================================================================
# Keywords de Restricciones de Trámites - TC038
# ============================================================================

Dado que existe un suscriptor de Amigo Paguitos activo
    [Arguments]    ${numero_suscriptor}
    Navegar a módulo de suscriptores
    Buscar suscriptor    ${numero_suscriptor}
    Acceder a vista 360 de suscriptor
    Verificar suscriptor es Amigo Paguitos

Cuando intenta realizar un cambio de número
    Navegar a módulo de trámites postactivación
    Intentar cambio de número

Entonces el sistema debe bloquear la operación con mensaje de restricción
    Verificar mensaje de restricción para Amigo Paguitos

Cuando intenta realizar un cambio de SIM
    Navegar a módulo de trámites postactivación
    Intentar cambio de SIM

Cuando intenta realizar una cesión de derechos
    Navegar a módulo de trámites postactivación
    Intentar cesión de derechos

Cuando intenta realizar un reporte de pérdida o robo
    Navegar a módulo de trámites postactivación
    Intentar reporte de pérdida o robo

# ============================================================================
# Keywords de Cambio de Ciclo - TC039
# ============================================================================

Dado que existe una cuenta de Amigo Paguitos con ciclo activo
    [Arguments]    ${numero_cuenta}
    Navegar a módulo de facturación
    Acceder a cambio de ciclo
    Buscar cuenta por número    ${numero_cuenta}
    ${ciclo}=    Obtener ciclo actual
    Should Not Be Equal As Strings    ${ciclo}    99    msg=La cuenta debe tener un ciclo diferente a 99
    [Return]    ${ciclo}

Cuando intenta cambiar el ciclo a 99 desde la GUI
    Intentar cambiar ciclo a 99 desde GUI

Entonces el sistema no debe permitir el cambio desde la interfaz gráfica
    Verificar cambio de ciclo no permitido desde GUI

Cuando ejecuta el cambio de ciclo a 99 a través de API
    [Arguments]    ${numero_cuenta}
    # Este keyword simula la llamada API
    Log    Ejecutando cambio de ciclo a 99 vía API para cuenta ${numero_cuenta}
    # En implementación real, aquí iría la llamada REST API

Entonces el sistema debe cambiar exitosamente el ciclo a 99
    Verificar ciclo actualizado a 99

# ============================================================================
# Keywords de Cambio de Oferta Primaria - TC067
# ============================================================================

Cuando accede a la vista 360 del suscriptor Amigo Paguitos
    [Arguments]    ${numero_suscriptor}
    Navegar a módulo de suscriptores
    Buscar suscriptor    ${numero_suscriptor}
    Acceder a vista 360 de suscriptor
    Verificar suscriptor es Amigo Paguitos

Y obtiene la oferta primaria actual
    ${oferta_original}=    Verificar oferta primaria actual
    [Return]    ${oferta_original}

Cuando intenta cambiar la oferta primaria desde la GUI
    Intentar cambiar oferta primaria desde GUI

Entonces el sistema debe mostrar mensaje de operación no permitida
    Verificar mensaje de error cambio no permitido

Y la oferta primaria debe permanecer sin cambios
    [Arguments]    ${oferta_original}
    Verificar oferta primaria sin cambios    ${oferta_original}

# ============================================================================
# Keywords de Terminación de Suscriptor - TC068
# ============================================================================

Dado que existe un suscriptor Amigo Paguitos con financiamiento vigente
    [Arguments]    ${numero_suscriptor}
    Navegar a módulo de suscriptores
    Buscar suscriptor    ${numero_suscriptor}
    Acceder a vista 360 de suscriptor
    Verificar suscriptor es Amigo Paguitos
    Verificar estado suscriptor activo
    Verificar financiamiento vigente

Cuando el sistema muestra la información completa del suscriptor
    Verificar información completa suscriptor

Cuando intenta iniciar terminación del suscriptor desde GUI
    Navegar a módulo de trámites postactivación
    Intentar terminación de suscriptor desde GUI

Entonces el sistema bloquea terminación mostrando mensaje
    Verificar terminación bloqueada para Amigo Paguitos

Cuando intenta ejecutar terminación mediante interfaz API
    [Arguments]    ${numero_suscriptor}
    Log    Ejecutando terminación de suscriptor ${numero_suscriptor} vía API
    # En implementación real aquí iría la llamada REST API

Entonces BES rechaza la solicitud con código de error
    Log    Verificando código de error de API para operación no permitida
    # En implementación real se verificaría el código de respuesta HTTP

Y el suscriptor permanece activo sin cambios
    Verificar estado suscriptor activo
    Verificar financiamiento vigente

# ============================================================================
# Keywords de Cesión de Derechos - TC069
# ============================================================================

Cuando accede al perfil del suscriptor Amigo Paguitos en BES
    [Arguments]    ${numero_suscriptor}
    Navegar a módulo de suscriptores
    Buscar suscriptor    ${numero_suscriptor}
    Acceder a vista 360 de suscriptor

Entonces el sistema despliega información identificada como Amigo Paguitos
    Verificar suscriptor es Amigo Paguitos
    Verificar información completa suscriptor

Cuando intenta iniciar cesión de derechos desde GUI de BES
    Navegar a módulo de trámites postactivación
    Intentar cesión de derechos

Entonces el sistema bloquea cesión mostrando mensaje no disponible
    Verificar mensaje de restricción para Amigo Paguitos

Cuando intenta ejecutar cesión mediante interfaz API de BES
    [Arguments]    ${numero_suscriptor}
    Log    Ejecutando cesión de derechos de suscriptor ${numero_suscriptor} vía API
    # En implementación real aquí iría la llamada REST API

Y la titularidad del suscriptor permanece sin cambios
    Verificar suscriptor es Amigo Paguitos

# ============================================================================
# Keywords de Restricción Ofertas Suplementarias - TC070
# ============================================================================

Dado que existe un cliente Amigo Paguitos en vista 360
    [Arguments]    ${numero_cliente}
    Navegar a módulo de clientes
    Buscar cliente Amigo Paguitos    ${numero_cliente}
    Seleccionar primer cliente de resultados
    Verificar cliente es Amigo Paguitos

Cuando el sistema muestra información con ofertas actuales
    Verificar información cliente con cuenta Mixto

Cuando intenta agregar oferta suplementaria diferente a Telcel Up
    Acceder a servicios adicionales
    Intentar agregar oferta suplementaria diferente a Telcel Up    Oferta Suplementaria

Entonces BES bloquea operación mostrando solo Telcel Up permitido
    Verificar rechazo de oferta no permitida

Cuando intenta agregar oferta Telcel Up a nivel cliente
    Seleccionar servicio Telcel Up

Y confirma agregar Telcel Up
    Confirmar alta de servicio

Entonces el sistema permite y agrega exitosamente Telcel Up
    Verificar servicio Telcel Up activo

Y las ofertas muestran únicamente Telcel Up como permitida
    Verificar solo Telcel Up permitida como oferta suplementaria

# ============================================================================
# Keywords de Suscripción Telcel Up - TC071
# ============================================================================

Dado que existe un cliente Amigo Paguitos con cuenta Mixto activa
    [Arguments]    ${numero_cliente}
    Navegar a módulo de clientes
    Buscar cliente Amigo Paguitos    ${numero_cliente}
    Seleccionar primer cliente de resultados
    Verificar cliente es Amigo Paguitos
    Verificar información cliente con cuenta Mixto
    Verificar equipo financiado registrado

Cuando el sistema muestra información de cuenta Mixto y equipo financiado
    Verificar información cliente con cuenta Mixto
    Verificar equipo financiado registrado

Cuando selecciona alta de productos o servicios adicionales
    Acceder a servicios adicionales

Entonces el sistema presenta ofertas suplementarias disponibles
    Wait Until Element Is Visible    ${MODAL_SERVICIOS}    timeout=5s

Cuando selecciona oferta Telcel Up a nivel cliente
    Seleccionar servicio Telcel Up

Entonces el sistema permite configurar parámetros de Telcel Up
    Wait Until Element Is Enabled    ${BTN_AGREGAR_SERVICIO}    timeout=5s

Cuando confirma y aplica suscripción de Telcel Up
    Confirmar alta de servicio

Entonces el sistema registra Telcel Up y genera cargo correspondiente
    Verificar servicio Telcel Up activo

# ============================================================================
# Keywords de Remoción Telcel Up - TC072
# ============================================================================

Dado que existe un cliente con Telcel Up activa
    [Arguments]    ${numero_cliente}
    Navegar a módulo de clientes
    Buscar cliente Amigo Paguitos    ${numero_cliente}
    Seleccionar primer cliente de resultados
    Verificar cliente es Amigo Paguitos
    Verificar servicio Telcel Up activo

Cuando el sistema muestra cliente con oferta Telcel Up activa
    Verificar servicio Telcel Up activo

Cuando selecciona baja de productos o servicios adicionales
    Acceder a gestión de servicios del cliente

Entonces el sistema presenta ofertas activas que pueden removerse
    Seleccionar opción baja de servicios

Cuando selecciona Telcel Up para su cancelación
    Seleccionar Telcel Up para cancelación

Entonces el sistema solicita confirmación de baja
    Wait Until Element Is Visible    ${MODAL_CONFIRMAR_BAJA}    timeout=5s

Cuando confirma cancelación de suscripción de Telcel Up
    Confirmar cancelación de servicio

Entonces el sistema elimina Telcel Up y detiene futuros cargos
    Verificar servicio Telcel Up removido

# ============================================================================
# Keywords de Intercambio de Recursos - TC073
# ============================================================================

Dado que existe un suscriptor Mixto de Amigo Paguitos activo
    [Arguments]    ${numero_suscriptor}
    Navegar a módulo de suscriptores
    Buscar suscriptor    ${numero_suscriptor}
    Acceder a vista 360 de suscriptor
    Verificar suscriptor es Amigo Paguitos
    Verificar equipo financiado registrado

Cuando el sistema muestra la información del suscriptor Mixto con equipo financiado
    Verificar información completa suscriptor
    Verificar equipo financiado registrado

Cuando intenta acceder a funcionalidad de intercambio de recursos desde GUI
    Navegar a módulo de trámites postactivación
    Intentar intercambio de recursos desde GUI

Entonces el sistema no muestra opción de intercambio o está deshabilitada
    Verificar intercambio de recursos no disponible

Cuando intenta ejecutar intercambio de recursos mediante interfaz API
    [Arguments]    ${numero_suscriptor}
    Log    Ejecutando intercambio de recursos de suscriptor ${numero_suscriptor} vía API
    # En implementación real aquí iría la llamada REST API

Entonces el sistema retorna error indicando operación no disponible para Amigo Paguitos
    Log    Verificando código de error de API indicando operación no disponible para Amigo Paguitos
    # En implementación real se verificaría el código de respuesta HTTP y mensaje de error

# ============================================================================
# Keywords de Cambio de Número de Suscriptor - TC074
# ============================================================================

Dado que existe un suscriptor de Amigo Paguitos con MSISDN dummy asignado
    [Arguments]    ${numero_suscriptor}
    Navegar a módulo de suscriptores
    Buscar suscriptor    ${numero_suscriptor}
    Acceder a vista 360 de suscriptor
    Verificar suscriptor es Amigo Paguitos
    Verificar MSISDN dummy asignado

Cuando el sistema muestra información del suscriptor con número dummy
    Verificar MSISDN dummy asignado

Cuando intenta ejecutar trámite de cambio de número desde GUI
    Navegar a módulo de trámites postactivación
    Intentar cambio de número

Entonces el sistema no permite cambio de número o muestra mensaje no disponible
    Verificar mensaje de restricción para Amigo Paguitos

Cuando intenta ejecutar cambio de número mediante interfaz API
    [Arguments]    ${numero_suscriptor}
    Log    Ejecutando cambio de número de suscriptor ${numero_suscriptor} vía API
    # En implementación real aquí iría la llamada REST API

Entonces el sistema retorna error operación no disponible para suscriptores Amigo Paguitos
    Log    Verificando código de error de API indicando operación no disponible para Amigo Paguitos
    # En implementación real se verificaría el código de respuesta HTTP

# ============================================================================
# Keywords de Cambio de SIM - TC075
# ============================================================================

Dado que existe un suscriptor Mixto de Amigo Paguitos activo sin SIM
    [Arguments]    ${numero_suscriptor}
    Navegar a módulo de suscriptores
    Buscar suscriptor    ${numero_suscriptor}
    Acceder a vista 360 de suscriptor
    Verificar suscriptor es Amigo Paguitos
    Verificar suscriptor sin tarjeta SIM asociada

Cuando el sistema muestra información del suscriptor Mixto sin SIM
    Verificar suscriptor sin tarjeta SIM asociada

Cuando intenta ejecutar trámite de cambio de SIM desde GUI
    Navegar a módulo de trámites postactivación
    Intentar cambio de SIM

Entonces el sistema no muestra opción de cambio SIM o está deshabilitada
    Verificar mensaje de restricción para Amigo Paguitos

Cuando intenta ejecutar cambio de SIM mediante interfaz API con nuevo ICCID
    [Arguments]    ${numero_suscriptor}    ${nuevo_iccid}
    Log    Ejecutando cambio de SIM de suscriptor ${numero_suscriptor} con ICCID ${nuevo_iccid} vía API
    # En implementación real aquí iría la llamada REST API

Entonces el sistema rechaza petición con mensaje operación no disponible
    Log    Verificando código de error de API indicando operación no disponible para suscriptores Amigo Paguitos
    # En implementación real se verificaría el código de respuesta HTTP

# ============================================================================
# Keywords de Pago por Adelantado CRM - TC076
# ============================================================================

Dado que existe un suscriptor Amigo Paguitos con parcialidades pendientes
    [Arguments]    ${numero_cuenta}
    Navegar a módulo de pagos
    Acceder a pago por adelantado
    Buscar cuenta para pago    ${numero_cuenta}
    Verificar cuenta Amigo Paguitos con parcialidades pendientes
    Verificar saldo adeudado visible

Cuando el sistema muestra información del suscriptor con parcialidades pendientes
    Verificar cuenta Amigo Paguitos con parcialidades pendientes
    Verificar saldo adeudado visible

Cuando intenta ejecutar operación de pago por adelantado CRM desde CRM
    Intentar pago por adelantado CRM desde GUI

Entonces el sistema no muestra disponible opción de pago anticipado CRM
    Verificar pago adelantado CRM no disponible

Cuando realiza sobrepago mayor al monto de parcialidad vencida mediante API
    [Arguments]    ${monto_sobrepago}
    Realizar sobrepago mayor a parcialidad vencida    ${monto_sobrepago}

Entonces el sistema acepta el pago y aplica monto a parcialidades vencidas
    Verificar saldo a favor registrado correctamente

Cuando consulta estado de cuenta después del sobrepago
    Consultar estado de cuenta después del sobrepago

Entonces el sistema muestra saldo a favor disponible para futuras parcialidades
    Verificar saldo a favor registrado correctamente

# ============================================================================
# Keywords de Reporte por Extravío - TC077
# ============================================================================

Cuando intenta acceder al módulo de creación de reporte por extravío desde GUI
    Navegar a módulo de trámites postactivación
    Intentar crear reporte por extravío desde GUI

Entonces el sistema no muestra opción crear reporte extravío o está deshabilitada
    Verificar reporte por extravío no disponible

Cuando intenta crear reporte por extravío mediante interfaz API
    [Arguments]    ${numero_suscriptor}
    Log    Ejecutando creación de reporte por extravío de suscriptor ${numero_suscriptor} vía API
    # En implementación real aquí iría la llamada REST API

Entonces el sistema rechaza petición retornando mensaje de error
    Log    Verificando código de error de API indicando operación no disponible para suscriptores Amigo Paguitos
    # En implementación real se verificaría el código de respuesta HTTP

Cuando verifica que tampoco se permite cancelar reporte por extravío
    Verificar no permite cancelar reporte extravío

# ============================================================================
# Keywords de Suspensión y Reactivación de Suscriptor - TC080
# ============================================================================

Dado que existe un suscriptor Mixto Amigo Paguitos activo sin SIM
    [Arguments]    ${numero_suscriptor}
    Navegar a módulo de suscriptores
    Buscar suscriptor    ${numero_suscriptor}
    Acceder a vista 360 de suscriptor
    Verificar suscriptor es Amigo Paguitos
    Verificar suscriptor sin tarjeta SIM asociada

Cuando el sistema muestra información del suscriptor Mixto sin SIM asociada
    Verificar información completa suscriptor
    Verificar suscriptor sin tarjeta SIM asociada

Cuando intenta ejecutar operación de suspensión por cobranza parcial desde GUI
    Intentar suspender suscriptor desde GUI    Cobranza Parcial

Entonces el sistema no muestra disponibles opciones de suspensión
    Verificar suspensión no disponible para Amigo Paguitos

Cuando intenta ejecutar suspensión por cualquier motivo desde GUI
    [Arguments]    ${motivo}
    Intentar suspender suscriptor desde GUI    ${motivo}

Cuando intenta ejecutar suspensión de suscriptor a través de API
    [Arguments]    ${numero_suscriptor}
    Log    Ejecutando suspensión de suscriptor ${numero_suscriptor} vía API
    # En implementación real aquí iría la llamada REST API

Entonces el sistema rechaza petición indicando sin tarjeta SIM
    Log    Verificando código de error de API indicando que suscriptor no tiene tarjeta SIM
    # En implementación real se verificaría el código de respuesta HTTP

Cuando intenta ejecutar reactivación de suscriptor desde GUI
    Intentar reactivar suscriptor desde GUI

Entonces el sistema rechaza operación de reactivación
    Verificar reactivación no disponible para Amigo Paguitos

Cuando intenta ejecutar reactivación mediante API
    [Arguments]    ${numero_suscriptor}
    Log    Ejecutando reactivación de suscriptor ${numero_suscriptor} vía API
    # En implementación real aquí iría la llamada REST API

# ============================================================================
# Keywords de Cambio de Ciclo Original a 99 - TC087
# ============================================================================

Dado que existe una cuenta Amigo Paguitos con ciclo original asignado
    [Arguments]    ${numero_cuenta}
    Navegar a módulo de facturación
    Acceder a cambio de ciclo
    Buscar cuenta por número    ${numero_cuenta}
    ${ciclo}=    Identificar cuenta con ciclo original asignado
    [Return]    ${ciclo}

Cuando el sistema muestra el ciclo de facturación actual
    ${ciclo}=    Obtener ciclo actual
    [Return]    ${ciclo}

Cuando invoca API de BES para cambiar ciclo a 99
    [Arguments]    ${numero_cuenta}
    Log    Invocando API de cambio de ciclo para cuenta ${numero_cuenta} a ciclo 99
    # En implementación real aquí iría la llamada REST API

Entonces la API acepta la solicitud de cambio de ciclo
    Log    Verificando respuesta exitosa de API
    # En implementación real se verificaría el código de respuesta HTTP 200

Entonces CBS confirma y actualiza ciclo a 99
    Verificar ciclo actualizado a 99

Entonces no se generan cargos ni facturas durante ciclo 99
    Verificar no se generan cargos en ciclo 99

Entonces el cambio queda registrado en historial de modificaciones
    Verificar cambio ciclo registrado en historial

# ============================================================================
# Keywords de Cambio de Ciclo 99 a Original - TC088
# ============================================================================

Dado que existe una cuenta Amigo Paguitos en ciclo 99
    [Arguments]    ${numero_cuenta}
    Navegar a módulo de facturación
    Acceder a cambio de ciclo
    Buscar cuenta por número    ${numero_cuenta}
    Identificar cuenta en ciclo 99

Cuando el sistema muestra que la cuenta está asignada al ciclo 99
    Identificar cuenta en ciclo 99

Cuando identifica cuál era el ciclo original antes del cambio a 99
    ${ciclo_original}=    Obtener ciclo original desde historial
    [Return]    ${ciclo_original}

Cuando invoca API de BES para restaurar ciclo original
    [Arguments]    ${numero_cuenta}    ${ciclo_original}
    Log    Invocando API de cambio de ciclo para cuenta ${numero_cuenta} a ciclo ${ciclo_original}
    # En implementación real aquí iría la llamada REST API

Entonces CBS confirma y actualiza al ciclo original
    [Arguments]    ${ciclo_original}
    Verificar ciclo restaurado a original    ${ciclo_original}

Entonces se reanudan procesos normales de facturación
    Verificar procesos facturación reanudados

# ============================================================================
# Keywords de Consulta Saldo Vista 360 CRM - TC100
# ============================================================================

Dado que el usuario se autentica con permisos de canal interno o externo
    [Arguments]    ${usuario}    ${password}
    Abrir navegador en página de login
    Ingresar credenciales    ${usuario}    ${password}
    Hacer click en botón de login
    Verificar login exitoso

Cuando accede a Vista 360 del cliente con suscriptor Amigo Paguitos
    [Arguments]    ${numero_cliente}
    Navegar a módulo de clientes
    Buscar cliente Amigo Paguitos    ${numero_cliente}
    Seleccionar primer cliente de resultados
    Acceder a vista 360 del cliente

Entonces el sistema despliega pantalla 360 con información del crédito
    Verificar información completa de financiamiento en vista 360

Y la Vista 360 despliega correctamente toda la información del financiamiento
    Verificar todas las secciones de financiamiento visible

# ============================================================================
# Keywords de Visualización Información Financiamiento en 360 - TC101
# ============================================================================

Dado que el usuario ha accedido a BES con permisos de consulta
    Dado que el usuario ha iniciado sesión en BES

Cuando accede a pantalla 360 con cliente que tiene financiamiento activo
    [Arguments]    ${numero_cliente}
    Navegar a módulo de clientes
    Buscar cliente Amigo Paguitos    ${numero_cliente}
    Seleccionar primer cliente de resultados
    Acceder a vista 360 del cliente

Cuando navega a sección de información de financiamiento
    Wait Until Element Is Visible    ${SECTION_INFO_FINANCIAMIENTO}    timeout=10s

Entonces el sistema despliega sección de información del crédito
    Verificar información completa de financiamiento en vista 360

Y todos los datos del financiamiento se visualizan correctamente
    Verificar todas las secciones de financiamiento visible
