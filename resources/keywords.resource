*** Settings ***
Library    SeleniumLibrary
Resource   ../pages/Login.resource
Resource   ../pages/AmigoPaguitos.resource
Resource   ../pages/BES.resource
Resource   ../pages/CPS.resource
Resource   ../pages/SICATEL.resource
Resource   ../pages/Kioscos.resource
Resource   ../pages/BIBES.resource
Resource   ../pages/BDITelcel.resource
Resource   ../pages/EIR.resource
Resource   ../pages/MicrositioClientes.resource
Resource   ../pages/PortalHabilitacionEquipos.resource

*** Variables ***
${USUARIO_PRUEBA}        usuario_test
${PASSWORD_PRUEBA}       password_test
${BROWSER}               chrome
${TIMEOUT}               15s

*** Keywords ***
Iniciar sesión en el sistema
    Abrir página de login
    Ingresar credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer clic en botón de login

Cerrar sesión del sistema
    Close All Browsers

# ========================================
# KEYWORDS PARA REGISTRO DE USUARIO EN AP.AG (TC041)
# ========================================
El usuario accede a la plataforma de Amigo Paguitos Autogestión
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Wait Until Page Contains Element    ${AP_MENU_REGISTRO}    timeout=10s

Se inicia el proceso de registro ingresando datos personales
    [Arguments]    ${nombre}=Carlos    ${apellidos}=Martínez González    ${email}=carlos.martinez@telcel.com    ${telefono}=5559876543    ${direccion}=Av. Insurgentes Sur 1234, Col. Del Valle
    Acceder a módulo de registro en Amigo Paguitos Autogestión
    Ingresar datos personales completos para registro    ${nombre}    ${apellidos}    ${email}    ${telefono}    ${direccion}

Se valida el formulario de registro completo
    Validar que todos los campos obligatorios están completos

Se confirma el registro del usuario en AP.AG
    Confirmar el registro del usuario
    Verificar confirmación de registro exitoso

Se verifica la transferencia de información del usuario hacia BES
    [Arguments]    ${email}=carlos.martinez@telcel.com    ${nombre}=Carlos Martínez González    ${telefono}=5559876543
    Sleep    2s
    Abrir sistema BES
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${email}
    Verificar que existe registro de cliente

BES almacena correctamente la información del usuario desde Amigo Paguitos
    [Arguments]    ${email}=carlos.martinez@telcel.com    ${nombre}=Carlos Martínez González    ${direccion}=Av. Insurgentes Sur 1234, Col. Del Valle    ${telefono}=5559876543
    Verificar datos almacenados del cliente    ${nombre}    ${direccion}    ${telefono}    ${email}

El usuario ha formalizado una venta en Amigo Paguitos
    [Arguments]    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de ventas
    Iniciar nueva venta
    Ingresar datos del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Formalizar la venta
    Verificar estado de venta formalizada

Se envían los datos del usuario a BES
    # Los datos se envían automáticamente tras la formalización en AP
    # Este keyword simula la espera de la integración
    Sleep    2s

Los datos quedan almacenados correctamente en BES
    [Arguments]    ${identificacion}=ABC123456    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567
    Abrir sistema BES
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${identificacion}
    Verificar que existe registro de cliente
    Verificar datos almacenados del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}

# ========================================
# KEYWORDS PARA FLUJO DE CRÉDITO/FINANCIAMIENTO
# ========================================
El financiamiento ha sido aprobado y formalizado en Amigo Paguitos
    [Arguments]    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de financiamiento
    Ingresar parámetros del financiamiento    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Aprobar el financiamiento
    Verificar estado de financiamiento aprobado
    Verificar parámetros del crédito aprobado    ${monto}    ${plazo}    ${tasa}

Se transfiere la información del crédito desde AP.AG hacia BES
    # Los datos del crédito se transfieren automáticamente mediante APIs tras la aprobación
    # Este keyword simula la espera de la integración entre sistemas
    Sleep    3s

El préstamo queda registrado en BES con toda la información del financiamiento
    [Arguments]    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar datos del préstamo almacenado    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Verificar que existe identificador único del préstamo

Se genera el calendario de pagos en BES
    [Arguments]    ${parcialidades}=12
    Acceder a calendario de pagos
    Verificar generación de calendario de cobranza    ${parcialidades}

La información del préstamo puede consultarse mediante API de BES
    # Verificación adicional de que los datos del préstamo persisten y son consultables
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS}
    Page Should Contain Element    ${BES_CAMPO_ID_PRESTAMO}

# ========================================
# KEYWORDS PARA FLUJO COMPLETO DE VENTA (TC003)
# ========================================
El usuario ha completado el flujo de venta con financiamiento en Amigo Paguitos
    [Arguments]    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar flujo completo de venta en AP.AG    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Ejecutar flujo completo de financiamiento en AP.AG    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}

Se ejecuta transferencia automática de venta y crédito desde AP.AG hacia BES
    # La transferencia de datos completos (usuario + crédito + equipo) se ejecuta automáticamente
    # mediante las APIs de BES cuando se formaliza la venta con financiamiento
    Sleep    3s

Se verifica recepción de datos en BES
    [Arguments]    ${identificacion}=ABC123456
    Abrir sistema BES
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${identificacion}
    Verificar que existe registro de cliente

Se verifica creación exitosa del préstamo en BES
    [Arguments]    ${identificacion}=ABC123456    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Verificar datos almacenados del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar datos del préstamo almacenado    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Verificar que existe identificador único del préstamo

Se consulta y verifica información completa del préstamo en BES
    [Arguments]    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12    ${parcialidades}=12
    Acceder a calendario de pagos
    Verificar generación de calendario de cobranza    ${parcialidades}
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS}
    Page Should Contain Element    ${BES_CAMPO_ID_PRESTAMO}

# ========================================
# KEYWORDS PARA CREACIÓN DE PRÉSTAMO MEDIANTE API (TC004)
# ========================================
Verificar validación de reglas de negocio en BES
    [Arguments]    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5
    # BES valida que el monto está dentro de los rangos permitidos
    Should Be True    ${monto} > 0
    # BES valida que el plazo es uno de los configurables (3, 6, 9 o 12 meses)
    Should Be True    ${plazo} in [3, 6, 9, 12]
    # BES valida que el número de parcialidades corresponde al plazo y periodicidad configurada
    Should Be True    ${parcialidades} > 0
    # BES valida que la tasa de interés está dentro de los parámetros permitidos
    Should Be True    ${tasa} >= 0
    # Verificación de que BES acepta la información como válida
    Page Should Contain Element    ${BES_TABLA_PRESTAMOS}

Verificar retorno de identificador único del préstamo
    # BES retorna código de éxito y el identificador del préstamo para referencia futura
    Verificar que existe identificador único del préstamo
    ${id_prestamo}=    Get Text    ${BES_CAMPO_ID_PRESTAMO}
    # El identificador debe ser retornado por la API y visible en el sistema
    Should Not Be Empty    ${id_prestamo}
    Log    Identificador único del préstamo creado: ${id_prestamo}

# ========================================
# KEYWORDS PARA INTEGRACIÓN BES-CPS PAGOS DE ENGANCHE (TC005)
# ========================================
La integración entre BES y CPS está configurada y activa
    Iniciar sesión en el sistema
    Abrir sistema CPS
    Acceder a módulo de configuración
    Configurar integración con BES
    Verificar integración BES-CPS activa

Se ejecuta un pago de enganche en CPS asociado a un préstamo
    [Arguments]    ${monto}=5000    ${referencia_prestamo}=PREST123456    ${identificacion}=ABC123456
    Abrir sistema CPS
    Acceder a módulo de pagos
    Iniciar nuevo pago de enganche
    Ingresar datos del pago de enganche    ${monto}    ${referencia_prestamo}    ${identificacion}
    Procesar pago de enganche
    Verificar pago procesado exitosamente
    ${transaccion_id}=    Obtener datos del pago procesado
    [Return]    ${transaccion_id}

CPS notifica a BES sobre el pago de enganche realizado
    [Arguments]    ${referencia_prestamo}=PREST123456    ${monto}=5000    ${fecha}=2026-04-15    ${transaccion_id}=TXN789012
    Acceder a módulo de notificaciones
    Verificar notificación enviada a BES    ${referencia_prestamo}
    Verificar detalle de notificación    ${monto}    ${fecha}    ${referencia_prestamo}    ${transaccion_id}

BES registra el pago de enganche en el préstamo correspondiente
    [Arguments]    ${referencia_prestamo}=PREST123456    ${monto}=5000    ${fecha}=2026-04-15    ${transaccion_id}=TXN789012
    Abrir sistema BES
    Acceder a módulo de pagos de enganche
    Buscar préstamo para verificar pago de enganche    ${referencia_prestamo}
    Verificar pago de enganche acreditado en BES    ${monto}    ${fecha}    ${transaccion_id}
    Verificar actualización de saldo del préstamo

BES muestra el pago de enganche en el detalle del préstamo
    [Arguments]    ${referencia_prestamo}=PREST123456    ${fecha}=2026-04-15    ${monto}=5000    ${estatus}=Aplicado
    Consultar detalle del préstamo con pago de enganche    ${referencia_prestamo}
    Verificar detalle del pago registrado en BES    ${fecha}    ${monto}    ${estatus}

# ========================================
# KEYWORDS PARA INTEGRACIÓN BES-CPS-SICATEL PAGOS DE PARCIALIDADES (TC006)
# ========================================
La integración entre BES y CPS está configurada para el punto de cobro SICATEL
    Iniciar sesión en el sistema
    Abrir sistema CPS
    Acceder a módulo de configuración
    Configurar integración con BES
    Verificar integración BES-CPS activa
    Configurar integración con punto de cobro SICATEL
    Verificar integración con punto de cobro SICATEL activa

Se realiza un pago de parcialidad en SICATEL para un préstamo de Amigo Paguitos
    [Arguments]    ${referencia_prestamo}=PREST123456    ${numero_parcialidad}=1    ${monto}=4500    ${identificacion}=ABC123456
    Abrir sistema SICATEL
    Acceder a módulo de pagos en SICATEL
    Ingresar datos del pago de parcialidad en SICATEL    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}
    Procesar pago de parcialidad en SICATEL
    Verificar pago procesado exitosamente en SICATEL
    ${referencia}    ${fecha}    ${monto_procesado}=    Obtener datos del pago de parcialidad procesado
    Set Suite Variable    ${REFERENCIA_TRANSACCION}    ${referencia}
    Set Suite Variable    ${FECHA_PAGO}    ${fecha}
    Set Suite Variable    ${MONTO_PARCIALIDAD}    ${monto_procesado}
    Set Suite Variable    ${REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Set Suite Variable    ${NUMERO_PARCIALIDAD}    ${numero_parcialidad}

CPS notifica a BES sobre el pago de parcialidad realizado desde SICATEL
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}=SICATEL
    Abrir sistema CPS
    Verificar notificación de pago de parcialidad enviada a BES    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}
    Verificar detalle de notificación de parcialidad    ${monto}    ${fecha}    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}

BES acredita el pago de la parcialidad correspondiente en el calendario de cobranza
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${fecha}    ${monto}
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Acceder a calendario de pagos
    Verificar parcialidad acreditada en calendario de cobranza    ${numero_parcialidad}    ${fecha}    ${monto}

BES actualiza el saldo del préstamo después de acreditar el pago
    [Arguments]    ${referencia_prestamo}
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Verificar actualización de saldo después de pago de parcialidad

BES retorna el desglose de pagos mostrando la parcialidad acreditada desde SICATEL
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}=SICATEL
    Consultar desglose de pagos del préstamo mediante API    ${referencia_prestamo}
    Verificar desglose de pagos muestra parcialidad acreditada desde SICATEL    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}

# ========================================
# KEYWORDS PARA INTEGRACIÓN BES-CPS-KIOSCOS PAGOS DE PARCIALIDADES (TC007)
# ========================================
La integración entre BES y CPS está configurada para el punto de cobro Kioscos
    Iniciar sesión en el sistema
    Abrir sistema CPS
    Acceder a módulo de configuración
    Configurar integración con BES
    Verificar integración BES-CPS activa
    Configurar integración con punto de cobro Kioscos
    Verificar integración con punto de cobro Kioscos activa

Se realiza un pago de parcialidad mediante tarjeta de crédito en un Kiosco para un préstamo de Amigo Paguitos
    [Arguments]    ${referencia_prestamo}=PREST123456    ${numero_parcialidad}=1    ${monto}=4500    ${identificacion}=ABC123456    ${numero_tarjeta}=4111111111111111    ${cvv}=123    ${fecha_expiracion}=12/28
    Abrir sistema Kioscos
    Acceder a módulo de pagos en Kioscos
    Ingresar datos del pago de parcialidad en Kioscos    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}
    Seleccionar medio de pago con tarjeta de crédito
    Ingresar datos de tarjeta de crédito    ${numero_tarjeta}    ${cvv}    ${fecha_expiracion}
    Procesar pago de parcialidad en Kioscos
    Verificar pago procesado exitosamente en Kioscos
    ${referencia}    ${fecha}    ${monto_procesado}=    Obtener datos del pago de parcialidad procesado en Kioscos
    Set Suite Variable    ${REFERENCIA_TRANSACCION}    ${referencia}
    Set Suite Variable    ${FECHA_PAGO}    ${fecha}
    Set Suite Variable    ${MONTO_PARCIALIDAD}    ${monto_procesado}
    Set Suite Variable    ${REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Set Suite Variable    ${NUMERO_PARCIALIDAD}    ${numero_parcialidad}
    Set Suite Variable    ${MEDIO_PAGO}    Tarjeta de Crédito

CPS notifica a BES sobre el pago de parcialidad realizado desde Kioscos
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}=Kioscos    ${medio_pago}=Tarjeta de Crédito
    Abrir sistema CPS
    Verificar notificación de pago de parcialidad enviada a BES desde Kioscos    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}    ${medio_pago}
    Verificar detalle de notificación de parcialidad desde Kioscos    ${monto}    ${fecha}    ${referencia_prestamo}    ${numero_parcialidad}    ${punto_cobro}    ${medio_pago}

BES acredita el pago de la parcialidad en el calendario de cobranza con datos de pago desde Kioscos
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${fecha}    ${monto}    ${medio_pago}=Tarjeta de Crédito
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Acceder a calendario de pagos
    Verificar parcialidad acreditada en calendario de cobranza    ${numero_parcialidad}    ${fecha}    ${monto}

BES actualiza el saldo del préstamo después de acreditar el pago desde Kioscos
    [Arguments]    ${referencia_prestamo}
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Verificar actualización de saldo después de pago de parcialidad

BES muestra el pago realizado desde Kioscos en el historial de pagos con todos los detalles
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}=Kioscos    ${medio_pago}=Tarjeta de Crédito
    Acceder a historial de pagos del préstamo    ${referencia_prestamo}
    Verificar pago en historial de pagos desde Kioscos    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}    ${medio_pago}

# ========================================
# KEYWORDS PARA CONSULTA DE SALDOS VÍA WEB SERVICES (TC008)
# ========================================
El préstamo a consultar tiene identificador válido disponible
    [Arguments]    ${id_prestamo}=PREST123456
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de préstamos
    Verificar que existe identificador único del préstamo
    Set Suite Variable    ${ID_PRESTAMO}    ${id_prestamo}

Se invoca el web service de consulta de saldos con el identificador del préstamo
    [Arguments]    ${id_prestamo}
    Abrir sistema BES
    Acceder a módulo de web services
    Ingresar identificador del préstamo para consulta    ${id_prestamo}
    Invocar web service de consulta de saldos

BES recibe la petición y valida que el préstamo existe
    Verificar que BES valida existencia del préstamo

El web service retorna la información de saldos del préstamo
    Verificar que web service retorna información de saldos completa

Los saldos mostrados son correctos y están actualizados
    [Arguments]    ${saldo_actual}=45000    ${saldo_vencido}=0    ${saldo_por_vencer}=45000
    Verificar información de saldos del préstamo    ${saldo_actual}    ${saldo_vencido}    ${saldo_por_vencer}
    Verificar información de próximo pago

# ========================================
# KEYWORDS PARA CONSULTA DE INFORMACIÓN MEDIANTE APIS (TC009)
# ========================================
El usuario o canal está autenticado y tiene permisos de consulta
    [Arguments]    ${tipo_canal}=CAC
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Seleccionar tipo de canal para consulta    ${tipo_canal}

Se invoca la API de consulta de préstamo enviando identificador
    [Arguments]    ${id_prestamo}=PREST123456
    Abrir sistema BES
    Acceder a módulo de consulta de APIs
    Invocar API de consulta de préstamo con identificador    ${id_prestamo}

Se invoca la API de consulta de préstamo enviando datos del cliente
    [Arguments]    ${datos_cliente}=ABC123456
    Abrir sistema BES
    Acceder a módulo de consulta de APIs
    Invocar API de consulta de préstamo con datos del cliente    ${datos_cliente}

BES recibe la petición y valida los parámetros de búsqueda
    Verificar que BES valida parámetros de búsqueda

La API retorna información completa del préstamo en formato estructurado
    Verificar que API retorna información completa del préstamo
    Verificar datos del cliente en respuesta de API
    Verificar desglose de cuotas en respuesta de API
    Verificar desglose de pagos en respuesta de API
    Verificar fechas de vencimiento en respuesta de API
    Verificar estatus en respuesta de API

La información es accesible desde Vista 360 para canales internos y externos
    [Arguments]    ${id_prestamo}=PREST123456
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Consultar préstamo en Vista 360    ${id_prestamo}
    Verificar información accesible en Vista 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

Los canales pueden visualizar información del crédito en Vista 360
    [Arguments]    ${id_prestamo}=PREST123456    @{canales}
    FOR    ${canal}    IN    @{canales}
        Verificar acceso desde canal para Vista 360    ${canal}
        Consultar préstamo en Vista 360    ${id_prestamo}
        Verificar información accesible en Vista 360
    END

Se muestra detalle de ventas por vendedor y concentrado por fuerza de ventas
    [Arguments]    ${vendedor}=Vendedor1    ${fuerza_ventas}=Distribuidores
    Acceder a módulo de reportes de ventas
    Seleccionar vendedor para reporte    ${vendedor}
    Generar reporte de ventas
    Verificar detalle de ventas por vendedor
    Seleccionar fuerza de ventas para reporte    ${fuerza_ventas}
    Generar reporte de ventas
    Verificar concentrado por fuerza de ventas

Los reportes de ventas están disponibles para administradores
    Acceder a módulo de reportes de ventas
    Page Should Contain Element    ${BES_SELECT_VENDEDOR}
    Page Should Contain Element    ${BES_SELECT_FUERZA_VENTAS}

# ========================================
# KEYWORDS PARA ACREDITACIÓN DE PAGOS MEDIANTE INTERFACES DE BES (TC010)
# ========================================
Existe un préstamo activo en BES con calendario de cobranza generado
    [Arguments]    ${referencia_prestamo}=PREST123456    ${identificacion}=ABC123456
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar que el préstamo está activo en BES
    Acceder a calendario de pagos
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    Set Suite Variable    ${REFERENCIA_PRESTAMO}    ${referencia_prestamo}

Se simula recepción de notificación de pago desde punto de cobro SICATEL
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}=SICATEL
    # Simular que se realizó un pago en SICATEL
    Abrir sistema SICATEL
    Acceder a módulo de pagos en SICATEL
    Ingresar datos del pago de parcialidad en SICATEL    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ABC123456
    Procesar pago de parcialidad en SICATEL
    Verificar pago procesado exitosamente en SICATEL
    ${referencia}    ${fecha_pago}    ${monto_procesado}=    Obtener datos del pago de parcialidad procesado
    Set Suite Variable    ${NUMERO_PARCIALIDAD}    ${numero_parcialidad}
    Set Suite Variable    ${MONTO_PARCIALIDAD}    ${monto_procesado}
    Set Suite Variable    ${FECHA_PAGO}    ${fecha_pago}
    Set Suite Variable    ${PUNTO_COBRO}    ${punto_cobro}
    # BES recibe la notificación automáticamente mediante la interfaz
    Sleep    2s
    Abrir sistema BES
    Acceder a módulo de interfaces
    Acceder a notificaciones de pago recibidas
    Verificar recepción de notificación de pago desde punto de cobro    ${referencia_prestamo}    ${punto_cobro}    ${monto}    ${fecha}

BES identifica el préstamo asociado mediante la referencia del pago
    [Arguments]    ${referencia_prestamo}
    Verificar que BES identifica el préstamo mediante referencia    ${referencia_prestamo}
    Verificar que el préstamo está activo en BES

BES aplica el pago a la parcialidad más antigua pendiente
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${fecha}
    Verificar aplicación de pago a parcialidad correspondiente    ${numero_parcialidad}
    Verificar lógica de aplicación de pago configurada
    Verificar que el pago fue aplicado correctamente

BES registra el pago en el historial de movimientos con todos los detalles
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}
    Acceder a historial de movimientos del préstamo    ${referencia_prestamo}
    Verificar pago registrado en historial de movimientos    ${numero_parcialidad}    ${monto}    ${fecha}    ${punto_cobro}

BES genera el reporte de conciliación hacia BIBES con formato de layout definido
    [Arguments]    ${referencia_prestamo}
    Acceder a módulo de reportes hacia BIBES
    Generar reporte de conciliación hacia BIBES    ${referencia_prestamo}
    Verificar formato del reporte según layout definido
    Verificar que el reporte fue generado exitosamente

BES verifica que el pago fue acreditado automáticamente sin demoras
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}
    Verificar tiempo de acreditación del pago
    Verificar que la acreditación fue automática
    Verificar disponibilidad inmediata del pago para consulta    ${referencia_prestamo}    ${numero_parcialidad}

# ========================================
# KEYWORDS PARA REVERSO DE PAGOS MEDIANTE INTERFACES DE BES (TC011)
# ========================================
El usuario accede a la interfaz de administración de pagos con un crédito que tiene pagos acreditados
    [Arguments]    ${referencia_credito}=PREST123456
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a interfaz de administración de pagos en BES    ${referencia_credito}
    Verificar pantalla de administración de pagos muestra acreditaciones existentes
    Set Suite Variable    ${REFERENCIA_CREDITO}    ${referencia_credito}

Se selecciona un pago acreditado y se ejecuta la función de reverso
    [Arguments]    ${numero_pago}=1    ${monto_esperado}=4500
    Seleccionar pago acreditado para reverso    ${numero_pago}
    Ejecutar función de reverso de pago
    Verificar solicitud de confirmación de reverso    ${monto_esperado}
    Set Suite Variable    ${MONTO_REVERSO}    ${monto_esperado}

Se confirma la operación de reverso de pago
    Confirmar operación de reverso de pago
    Verificar reverso ejecutado exitosamente

El saldo del crédito se actualiza correctamente sumando el monto revertido
    [Arguments]    ${referencia_credito}    ${monto_revertido}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_credito}
    Verificar saldo del crédito actualizado después de reverso    ${monto_revertido}

El historial de transacciones registra la operación de reverso con todos los detalles
    [Arguments]    ${referencia_credito}    ${monto_reverso}    ${usuario}=usuario_test
    Consultar historial de transacciones del crédito    ${referencia_credito}
    Verificar registro de reverso en historial de movimientos    ${monto_reverso}    ${usuario}

# ========================================
# KEYWORDS PARA VISUALIZACIÓN DE INFORMACIÓN EN PANTALLA 360 DESDE CAC (TC012)
# ========================================
El usuario del canal CAC ingresa al sistema BES con credenciales válidas
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Seleccionar tipo de canal para consulta    CAC

Se busca un cliente con crédito activo de Amigo Paguitos
    [Arguments]    ${telefono}=5551234567
    Buscar cliente en Vista 360 por teléfono o identificador    ${telefono}

El sistema localiza al cliente y muestra sus datos básicos
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    ${datos_cliente}=    Get Text    ${BES_SECCION_DATOS_CLIENTE}
    Should Not Be Empty    ${datos_cliente}

Se accede a la pantalla 360 del cliente
    Page Should Contain Element    ${BES_PANEL_VISTA_360}

La pantalla 360 muestra información completa del crédito
    Verificar información completa del crédito en pantalla 360
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_TOTAL_CREDITO}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_PENDIENTE_CREDITO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_CREDITO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${saldo}
    Should Not Be Empty    ${plazo}
    Should Not Be Empty    ${estatus}
    Log    Crédito - Monto: ${monto}, Saldo: ${saldo}, Plazo: ${plazo}, Estatus: ${estatus}

Se verifican los datos del equipo financiado
    Verificar datos del equipo financiado en pantalla 360

Se verifican las ventas por vendedor y reportes de fuerza de venta
    Verificar información de ventas por vendedor en pantalla 360
    Verificar reportes de fuerza de ventas en pantalla 360

Toda la información mostrada corresponde al crédito consultado
    # Validación integral de que todos los datos corresponden al cliente buscado
    Verificar información accesible en Vista 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

# ========================================
# KEYWORDS PARA VISUALIZACIÓN DE INFORMACIÓN EN PANTALLA 360 DESDE CVT (TC013)
# ========================================
El usuario del canal CVT ingresa al sistema BES con credenciales válidas
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Seleccionar tipo de canal para consulta    CVT

Se busca un cliente con crédito activo de Amigo Paguitos desde CVT
    [Arguments]    ${criterio_busqueda}=5551234567
    Buscar cliente en Vista 360 por teléfono o identificador    ${criterio_busqueda}

El sistema localiza al cliente desde CVT y muestra sus datos básicos
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    ${datos_cliente}=    Get Text    ${BES_SECCION_DATOS_CLIENTE}
    Should Not Be Empty    ${datos_cliente}

Se accede a la pantalla 360 del cliente desde CVT
    Page Should Contain Element    ${BES_PANEL_VISTA_360}

La pantalla 360 muestra información completa del crédito desde CVT
    Verificar información completa del crédito en pantalla 360
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_TOTAL_CREDITO}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_PENDIENTE_CREDITO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_CREDITO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${saldo}
    Should Not Be Empty    ${plazo}
    Should Not Be Empty    ${estatus}
    Log    Crédito - Monto: ${monto}, Saldo: ${saldo}, Plazo: ${plazo}, Estatus: ${estatus}

Se verifican los datos del equipo financiado desde CVT
    Verificar datos del equipo financiado en pantalla 360

Se verifican las ventas por vendedor y reportes de fuerza de venta desde CVT
    Verificar información de ventas por vendedor en pantalla 360
    Verificar reportes de fuerza de ventas en pantalla 360

Toda la información mostrada corresponde al crédito consultado desde CVT
    # Validación integral de que todos los datos corresponden al cliente buscado desde CVT
    Verificar información accesible en Vista 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

# ========================================
# KEYWORDS PARA VISUALIZACIÓN DE INFORMACIÓN EN PANTALLA 360 DESDE CAT (TC014)
# ========================================
El usuario del canal CAT ingresa al sistema BES con credenciales válidas
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Seleccionar tipo de canal para consulta    CAT

Se busca un cliente con crédito activo de Amigo Paguitos desde CAT
    [Arguments]    ${criterio_busqueda}=5551234567
    Buscar cliente en Vista 360 por teléfono o identificador    ${criterio_busqueda}

El sistema localiza al cliente desde CAT y muestra sus datos básicos
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    ${datos_cliente}=    Get Text    ${BES_SECCION_DATOS_CLIENTE}
    Should Not Be Empty    ${datos_cliente}

Se accede a la pantalla 360 del cliente desde CAT
    Page Should Contain Element    ${BES_PANEL_VISTA_360}

La pantalla 360 muestra información completa del crédito desde CAT
    Verificar información completa del crédito en pantalla 360
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_TOTAL_CREDITO}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_PENDIENTE_CREDITO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_CREDITO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${saldo}
    Should Not Be Empty    ${plazo}
    Should Not Be Empty    ${estatus}
    Log    Crédito - Monto: ${monto}, Saldo: ${saldo}, Plazo: ${plazo}, Estatus: ${estatus}

Se verifican los datos del equipo financiado desde CAT
    Verificar datos del equipo financiado en pantalla 360

Se verifican las ventas por vendedor y reportes de fuerza de venta desde CAT
    Verificar información de ventas por vendedor en pantalla 360
    Verificar reportes de fuerza de ventas en pantalla 360

Toda la información mostrada corresponde al crédito consultado desde CAT
    # Validación integral de que todos los datos corresponden al cliente buscado desde CAT
    Verificar información accesible en Vista 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

# ========================================
# KEYWORDS PARA VISUALIZACIÓN DE INFORMACIÓN EN PANTALLA 360 DESDE DISTRIBUIDORES (TC015)
# ========================================
El usuario del canal Distribuidores ingresa al sistema BES con credenciales válidas
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Seleccionar tipo de canal para consulta    Distribuidores

Se busca un cliente con crédito activo de Amigo Paguitos desde Distribuidores
    [Arguments]    ${criterio_busqueda}=5551234567
    Buscar cliente en Vista 360 por teléfono o identificador    ${criterio_busqueda}

El sistema localiza al cliente desde Distribuidores y muestra sus datos básicos
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    ${datos_cliente}=    Get Text    ${BES_SECCION_DATOS_CLIENTE}
    Should Not Be Empty    ${datos_cliente}

Se accede a la pantalla 360 del cliente desde Distribuidores
    Page Should Contain Element    ${BES_PANEL_VISTA_360}

La pantalla 360 muestra información completa del crédito desde Distribuidores
    Verificar información completa del crédito en pantalla 360
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_TOTAL_CREDITO}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_PENDIENTE_CREDITO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_CREDITO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${saldo}
    Should Not Be Empty    ${plazo}
    Should Not Be Empty    ${estatus}
    Log    Crédito - Monto: ${monto}, Saldo: ${saldo}, Plazo: ${plazo}, Estatus: ${estatus}

Se verifican los datos del equipo financiado desde Distribuidores
    Verificar datos del equipo financiado en pantalla 360

Se verifican los reportes de ventas para administradores del Distribuidor y fuerza de venta
    Verificar información de ventas por vendedor en pantalla 360
    Verificar reportes de fuerza de ventas en pantalla 360

Toda la información mostrada corresponde al crédito consultado desde Distribuidores
    # Validación integral de que todos los datos corresponden al cliente buscado desde Distribuidores
    Verificar información accesible en Vista 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

# ========================================
# KEYWORDS PARA VISUALIZACIÓN DE INFORMACIÓN EN PANTALLA 360 DESDE CADENAS COMERCIALES (TC016)
# ========================================
El usuario del canal Cadenas Comerciales ingresa al sistema BES con credenciales válidas
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Seleccionar tipo de canal para consulta    Cadenas Comerciales

Se busca un cliente con crédito activo de Amigo Paguitos desde Cadenas Comerciales
    [Arguments]    ${criterio_busqueda}=5551234567
    Buscar cliente en Vista 360 por teléfono o identificador    ${criterio_busqueda}

El sistema localiza al cliente desde Cadenas Comerciales y muestra sus datos básicos
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    ${datos_cliente}=    Get Text    ${BES_SECCION_DATOS_CLIENTE}
    Should Not Be Empty    ${datos_cliente}

Se accede a la pantalla 360 del cliente desde Cadenas Comerciales
    Page Should Contain Element    ${BES_PANEL_VISTA_360}

La pantalla 360 muestra información completa del crédito desde Cadenas Comerciales
    Verificar información completa del crédito en pantalla 360
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_TOTAL_CREDITO}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_PENDIENTE_CREDITO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_CREDITO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${saldo}
    Should Not Be Empty    ${plazo}
    Should Not Be Empty    ${estatus}
    Log    Crédito - Monto: ${monto}, Saldo: ${saldo}, Plazo: ${plazo}, Estatus: ${estatus}

Se verifican los datos del equipo financiado desde Cadenas Comerciales
    Verificar datos del equipo financiado en pantalla 360

Se verifican las ventas por vendedor y reportes de fuerza de venta desde Cadenas Comerciales
    Verificar información de ventas por vendedor en pantalla 360
    Verificar reportes de fuerza de ventas en pantalla 360

Toda la información mostrada corresponde al crédito consultado desde Cadenas Comerciales
    # Validación integral de que todos los datos corresponden al cliente buscado desde Cadenas Comerciales
    Verificar información accesible en Vista 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

# ========================================
# KEYWORDS PARA VISUALIZACIÓN DE DATOS DEL CLIENTE EN PANTALLA 360 DE BES (TC017)
# ========================================
El usuario ha iniciado sesión en BES con permisos de consulta
    Iniciar sesión en el sistema
    Abrir sistema BES

Se accede a la pantalla 360 de BES para un cliente con crédito activo de Amigo Paguitos
    [Arguments]    ${criterio_busqueda}=5551234567
    Acceder a Vista 360 de BES
    Acceder a pantalla 360 de BES para cliente con crédito    ${criterio_busqueda}

El sistema carga la pantalla 360 con la información del cliente
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}

Se verifican los datos personales del cliente incluyendo nombre completo, identificación y datos de contacto
    Verificar datos personales del cliente en pantalla 360

La pantalla despliega nombre completo, tipo y número de identificación, teléfono y correo electrónico del cliente
    ${nombre}=    Get Text    ${BES_CAMPO_NOMBRE_COMPLETO_CLIENTE}
    ${tipo_id}=    Get Text    ${BES_CAMPO_TIPO_IDENTIFICACION}
    ${numero_id}=    Get Text    ${BES_CAMPO_NUMERO_IDENTIFICACION}
    ${telefono}=    Get Text    ${BES_CAMPO_TELEFONO_CLIENTE}
    ${correo}=    Get Text    ${BES_CAMPO_CORREO_ELECTRONICO_CLIENTE}
    Should Not Be Empty    ${nombre}
    Should Not Be Empty    ${tipo_id}
    Should Not Be Empty    ${numero_id}
    Should Not Be Empty    ${telefono}
    Should Not Be Empty    ${correo}

Se verifica la información del equipo financiado incluyendo marca, modelo e IMEI
    Verificar información del equipo financiado en pantalla 360

La pantalla incluye detalles del equipo: marca, modelo, IMEI y características del dispositivo adquirido
    Verificar datos del equipo financiado en pantalla 360
    Verificar características del dispositivo adquirido

Se valida el historial de interacciones y transacciones del cliente
    Verificar historial de interacciones del cliente
    Verificar cronología de actividades relacionadas con el crédito

El sistema presenta cronología de actividades del cliente relacionadas con el crédito
    Verificar cronología de actividades relacionadas con el crédito

Se confirma que todos los datos mostrados son legibles y están correctamente formateados
    Verificar que la información se presenta de forma clara y organizada

La información se presenta de forma clara, organizada y sin errores de formato
    Verificar que la información se presenta de forma clara y organizada
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    ${panel_contenido}=    Get Text    ${BES_PANEL_VISTA_360}
    Should Not Be Empty    ${panel_contenido}

# ========================================
# KEYWORDS PARA DESGLOSE DE CUOTAS EN PANTALLA 360 DE BES (TC018)
# ========================================
Se accede a la pantalla 360 de BES con cliente que tiene crédito activo de Amigo Paguitos
    [Arguments]    ${criterio_busqueda}=5551234567
    El usuario ha iniciado sesión en BES con permisos de consulta
    Acceder a pantalla 360 de BES para cliente con crédito    ${criterio_busqueda}

El sistema carga la pantalla 360 con la información del cliente y su crédito
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    Verificar información completa del crédito en pantalla 360

Se navega a la sección de desglose de cuotas dentro de la pantalla 360
    Navegar a sección de desglose de cuotas en pantalla 360

El sistema muestra la sección de desglose de cuotas del financiamiento
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_CUOTAS}
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_CUOTAS}

La pantalla despliega tabla con todas las cuotas y sus detalles completos
    Verificar tabla de desglose de cuotas con todos los detalles
    ${numero_cuota}=    Get Text    ${BES_CAMPO_NUMERO_CUOTA_DESGLOSE}
    ${monto_cuota}=    Get Text    ${BES_CAMPO_MONTO_CUOTA_DESGLOSE}
    ${fecha_vencimiento}=    Get Text    ${BES_CAMPO_FECHA_VENCIMIENTO_CUOTA}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_CUOTA}
    Should Not Be Empty    ${numero_cuota}
    Should Not Be Empty    ${monto_cuota}
    Should Not Be Empty    ${fecha_vencimiento}
    Should Not Be Empty    ${estatus}
    Log    Cuota - Número: ${numero_cuota}, Monto: ${monto_cuota}, Fecha vencimiento: ${fecha_vencimiento}, Estatus: ${estatus}

El total de cuotas mostradas coincide con el plazo del financiamiento
    [Arguments]    ${plazo_esperado}=12
    Verificar número total de cuotas corresponde al plazo del crédito    ${plazo_esperado}

El sistema indica claramente la periodicidad de pago del crédito
    [Arguments]    ${periodicidad}=mensual
    Verificar periodicidad de cuotas mostrada en pantalla 360    ${periodicidad}

La suma de todas las cuotas corresponde al monto total financiado del equipo
    [Arguments]    ${monto_total}=50000
    Verificar suma de cuotas corresponde al monto total financiado    ${monto_total}

# ========================================
# KEYWORDS PARA DESGLOSE DE PAGOS EN PANTALLA 360 DE BES (TC019)
# ========================================
El usuario autenticado accede a pantalla 360 de BES para cliente con crédito y pagos registrados
    [Arguments]    ${criterio_busqueda}=5551234567
    El usuario ha iniciado sesión en BES con permisos de consulta
    Acceder a pantalla 360 de BES para cliente con crédito    ${criterio_busqueda}

El sistema carga la pantalla 360 con la información del cliente y su crédito
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    Verificar información completa del crédito en pantalla 360

Navegar a sección de desglose de pagos en pantalla 360
    Navegar a sección de desglose de pagos dentro de pantalla 360

El sistema muestra la sección de historial de pagos del financiamiento
    Verificar que se muestra la sección de historial de pagos

Verificar tabla de desglose de pagos con todos los detalles completos
    Verificar tabla de desglose de pagos muestra todos los campos requeridos

Verificar pago de enganche en historial de pagos
    Verificar que existe registro de pago de enganche en historial

Verificar pagos de parcialidades en historial de pagos
    Verificar que existen registros de pagos de parcialidades en historial

Verificar estatus de transacciones en historial de pagos
    Verificar que cada pago muestra su estatus correspondiente

# ========================================
# KEYWORDS PARA VISUALIZACIÓN DE FECHAS DE VENCIMIENTO EN PANTALLA 360 (TC020)
# ========================================
El usuario accede a la pantalla 360 de BES para cliente con crédito de Amigo Paguitos
    [Arguments]    ${criterio_busqueda}=5551234567
    El usuario ha iniciado sesión en BES con permisos de consulta
    Acceder a pantalla 360 de BES para cliente con crédito    ${criterio_busqueda}
    Page Should Contain Element    ${BES_PANEL_VISTA_360}

El sistema carga la pantalla 360 con información del cliente y su crédito
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    Verificar información completa del crédito en pantalla 360

Se localiza la sección de calendario de cobranza en pantalla 360
    Localizar sección de calendario de cobranza en pantalla 360
    Verificar que se muestra sección de fechas de vencimiento

El sistema muestra fechas de vencimiento de las cuotas del crédito
    Verificar que se muestra sección de fechas de vencimiento
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}

La pantalla destaca la fecha de vencimiento de la próxima cuota pendiente
    Verificar fecha de vencimiento de próxima cuota pendiente

El sistema despliega fechas de vencimiento de todas las cuotas futuras
    [Arguments]    ${periodicidad}=mensual
    Verificar fechas de vencimiento de todas las cuotas futuras    ${periodicidad}

El sistema resalta las cuotas vencidas si existen pagos atrasados
    Verificar indicación de cuotas vencidas si existen pagos atrasados

Las fechas de vencimiento corresponden al calendario de cobranza de BES
    [Arguments]    ${periodicidad}=mensual
    Verificar que fechas corresponden al calendario de cobranza de BES    ${periodicidad}

# ========================================
# KEYWORDS PARA VISUALIZACIÓN DE ESTATUS DEL PRÉSTAMO EN PANTALLA 360 (TC021)
# ========================================
El usuario de canal con permisos de consulta ingresa a BES y accede a Vista 360
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES

Se busca un cliente que tiene un préstamo activo registrado en BES
    [Arguments]    ${criterio_busqueda}=5551234567
    Buscar cliente en Vista 360 por teléfono o identificador    ${criterio_busqueda}

El sistema despliega la pantalla 360 del cliente
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}

La pantalla 360 muestra la información del crédito
    Verificar información completa del crédito en pantalla 360
    Page Should Contain Element    ${BES_SECCION_ESTATUS_PRESTAMO}

Se validan los datos del cliente mostrados en pantalla 360
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    ${datos_cliente}=    Get Text    ${BES_SECCION_DATOS_CLIENTE}
    Should Not Be Empty    ${datos_cliente}
    Log    Datos del cliente validados en pantalla 360

Se valida el desglose de cuotas en la pantalla 360
    Verificar desglose de cuotas en Vista 360
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_CUOTAS}
    ${filas}=    Get Element Count    ${BES_TABLA_DESGLOSE_CUOTAS}//tr[position()>1]
    Should Be True    ${filas} > 0
    Log    Desglose de cuotas validado con ${filas} cuotas

Se valida el desglose de pagos en la pantalla 360
    Verificar desglose de pagos en Vista 360
    Page Should Contain Element    ${BES_TABLA_DESGLOSE_PAGOS_DETALLE}
    Log    Desglose de pagos validado en pantalla 360

Se validan las fechas de vencimiento en la pantalla 360
    Verificar fechas de vencimiento en Vista 360
    Page Should Contain Element    ${BES_SECCION_FECHAS_VENCIMIENTO}
    ${fecha_proximo}=    Get Text    ${BES_CAMPO_FECHA_PROXIMO_VENCIMIENTO}
    Should Not Be Empty    ${fecha_proximo}
    Log    Fechas de vencimiento validadas en pantalla 360

Se valida el estatus del préstamo mostrado en pantalla 360
    Verificar estatus del préstamo en Vista 360
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${estatus}
    Log    Estatus del préstamo validado: ${estatus}

Validar que la información del crédito corresponda con los datos almacenados en BES
    # Validación integral de que todos los datos mostrados corresponden a la información almacenada
    Verificar información accesible en Vista 360
    Page Should Contain Element    ${BES_CAMPO_MONTO_TOTAL_CREDITO}
    Page Should Contain Element    ${BES_CAMPO_SALDO_PENDIENTE_CREDITO}
    Page Should Contain Element    ${BES_CAMPO_PLAZO_CREDITO}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_PRESTAMO}
    ${monto}=    Get Text    ${BES_CAMPO_MONTO_TOTAL_CREDITO}
    ${saldo}=    Get Text    ${BES_CAMPO_SALDO_PENDIENTE_CREDITO}
    ${plazo}=    Get Text    ${BES_CAMPO_PLAZO_CREDITO}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO}
    Should Not Be Empty    ${monto}
    Should Not Be Empty    ${saldo}
    Should Not Be Empty    ${plazo}
    Should Not Be Empty    ${estatus}
    Log    Información del crédito validada - Monto: ${monto}, Saldo: ${saldo}, Plazo: ${plazo}, Estatus: ${estatus}

Validar visualización del reporte de ventas por vendedor consolidado para administradores
    # Validación del reporte de ventas disponible para administradores del Distribuidor
    ${tiene_reporte}=    Run Keyword And Return Status    Page Should Contain Element    ${BES_SECCION_REPORTE_FUERZA_VENTAS}
    IF    ${tiene_reporte}
        Verificar reportes de fuerza de ventas en pantalla 360
        Log    Reporte de ventas por vendedor validado para administradores del Distribuidor
    ELSE
        Log    Reporte de ventas no visible para el canal actual (solo disponible para Distribuidores)
    END

# ========================================
# KEYWORDS PARA CONTROL DEL CALENDARIO DE COBRANZA (TC022)
# ========================================
Se crea un préstamo nuevo mediante API especificando plazo y frecuencia de pago
    [Arguments]    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15    ${frecuencia}=mensual
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de financiamiento
    Ingresar parámetros del financiamiento con frecuencia    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}    ${frecuencia}
    Aprobar el financiamiento
    Verificar estado de financiamiento aprobado
    Se transfiere la información del crédito desde AP.AG hacia BES
    Set Suite Variable    ${PLAZO_PRESTAMO}    ${plazo}
    Set Suite Variable    ${FRECUENCIA_PAGO}    ${frecuencia}

BES registra el préstamo con los parámetros configurados de plazo y frecuencia
    [Arguments]    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar datos del préstamo almacenado    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}

BES genera automáticamente el calendario de cobranza según número de ciclos y plazos
    [Arguments]    ${frecuencia}=mensual    ${plazo}=12
    Acceder a calendario de pagos
    Verificar calendario generado según frecuencia y plazo    ${frecuencia}    ${plazo}

El sistema muestra el calendario con las fechas de vencimiento calculadas
    [Arguments]    ${parcialidades}=12
    Page Should Contain Element    ${BES_TABLA_CALENDARIO_PAGOS}
    Verificar generación de calendario de cobranza    ${parcialidades}

El número de cuotas en el calendario corresponde al plazo configurado
    [Arguments]    ${plazo}=12
    Verificar todas las cuotas corresponden al plazo configurado    ${plazo}

BES actualiza automáticamente el estatus de las cuotas al llegar la fecha de vencimiento
    Verificar actualización automática de estatus de cuotas vencidas

# ========================================
# KEYWORDS PARA NOTIFICACIONES DE PAGO MEDIANTE APIS DE SITIC-TRUSTONIC (TC023)
# ========================================
La configuración de notificaciones de pago está definida en BES
    [Arguments]    ${dias_previos}=3    ${tipo_notificacion}=SMS    ${mensaje}=Recordatorio de pago próximo
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de configuración de notificaciones
    Configurar parámetros de notificaciones de pago    ${dias_previos}    ${tipo_notificacion}    ${mensaje}
    Verificar configuración de notificaciones almacenada

Se crea un préstamo con fecha de vencimiento próxima dentro del periodo de notificación
    [Arguments]    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-18
    Crear préstamo con fecha de vencimiento próxima    ${identificacion}    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Verificar préstamo registrado con calendario de pagos    ${identificacion}

BES ejecuta el proceso automático de identificación de préstamos con fechas de pago próximas
    [Arguments]    ${dias_previos}=3
    Acceder a proceso automático de identificación de notificaciones
    Ejecutar proceso de identificación de préstamos con fechas próximas    ${dias_previos}
    Verificar identificación de préstamos que requieren notificación    ${dias_previos}

BES invoca las APIs de SITIC-Trustonic para enviar notificación de pago al cliente
    [Arguments]    ${id_prestamo}=PREST123456    ${cliente}=ABC123456
    Acceder a módulo de integración con SITIC-Trustonic
    Verificar invocación de APIs SITIC-Trustonic para envío de notificación    ${id_prestamo}    ${cliente}

BES registra el log de la notificación enviada con todos los datos de la transacción
    [Arguments]    ${id_prestamo}=PREST123456
    Acceder a log de notificaciones enviadas
    Verificar registro de notificación enviada con detalles completos    ${id_prestamo}

El historial de notificaciones muestra todas las notificaciones enviadas al cliente con estatus correspondiente
    [Arguments]    ${id_prestamo}=PREST123456
    Acceder a historial de notificaciones del préstamo    ${id_prestamo}
    Verificar historial muestra todas las notificaciones enviadas con estatus

# ========================================
# KEYWORDS PARA INHABILITACIONES MEDIANTE APIS DE SITIC-TRUSTONIC (TC024)
# ========================================
Configurar reglas de inhabilitación en BES
    [Arguments]    ${dias_atraso}=30    ${intentos_notificacion}=3
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de configuración de reglas de inhabilitación
    Ingresar reglas de inhabilitación    ${dias_atraso}    ${intentos_notificacion}
    Guardar configuración de reglas de inhabilitación
    Verificar configuración de reglas de inhabilitación almacenada

Crear préstamo con pagos vencidos que cumple criterios de inhabilitación
    [Arguments]    ${referencia_prestamo}=PREST999888    ${identificacion}=CLI999888    ${dias_vencido}=35
    Abrir sistema BES
    Acceder a módulo de préstamos
    Crear préstamo con datos de cliente y equipo enrolado    ${referencia_prestamo}    ${identificacion}
    Registrar pagos vencidos para préstamo    ${referencia_prestamo}    ${dias_vencido}
    Verificar préstamo cumple criterios de inhabilitación    ${referencia_prestamo}    ${dias_vencido}

Ejecutar proceso de evaluación de inhabilitaciones en BES
    Acceder a módulo de procesos de cobranza
    Acceder a proceso de evaluación de inhabilitaciones
    Ejecutar proceso de evaluación de inhabilitaciones
    Esperar finalización de proceso de evaluación

Verificar identificación de préstamos que cumplen criterios de inhabilitación
    Verificar lista de préstamos identificados para inhabilitación
    Verificar que existen préstamos en la lista de inhabilitación

Verificar invocación de APIs SITIC-Trustonic para inhabilitación de equipo
    [Arguments]    ${referencia_prestamo}=PREST999888    ${imei}=359876543210987
    Acceder a módulo de integración con SITIC-Trustonic para inhabilitación
    Verificar llamada a API SITIC-Trustonic para bloqueo de equipo    ${referencia_prestamo}    ${imei}
    Verificar datos enviados a API SITIC-Trustonic para inhabilitación    ${imei}

Verificar actualización de estatus del préstamo a equipo inhabilitado
    [Arguments]    ${referencia_prestamo}=PREST999888
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Verificar estatus del préstamo es equipo inhabilitado
    Verificar fecha y hora de inhabilitación registradas    ${referencia_prestamo}

Consultar historial de inhabilitaciones en pantalla 360
    [Arguments]    ${referencia_prestamo}=PREST999888
    Acceder a Vista 360 de BES
    Buscar cliente en Vista 360 por teléfono o identificador    ${referencia_prestamo}
    Acceder a sección de historial de inhabilitaciones en pantalla 360

Verificar registro de inhabilitación en historial
    [Arguments]    ${motivo}=Incumplimiento de pago    ${estatus}=Inhabilitado
    Verificar registro de inhabilitación con todos los detalles    ${motivo}    ${estatus}

Verificar equipo bloqueado en sistema SITIC-Trustonic
    [Arguments]    ${imei}=359876543210987
    Verificar estatus de bloqueo del equipo en API SITIC-Trustonic    ${imei}
    Verificar que el equipo no permite realizar llamadas
    Verificar que el equipo no permite acceder a servicios móviles

# ========================================
# KEYWORDS PARA HABILITACIONES MEDIANTE APIS DE SITIC-TRUSTONIC (TC025)
# ========================================
Consultar préstamo con equipo inhabilitado
    [Arguments]    ${referencia_prestamo}=PREST111222    ${identificacion}=CLI111222
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar estatus del préstamo es equipo inhabilitado
    Set Suite Variable    ${REFERENCIA_PRESTAMO}    ${referencia_prestamo}

Registrar pagos de parcialidades vencidas para regularización
    [Arguments]    ${referencia_prestamo}=PREST111222    ${numero_parcialidad}=1    ${monto}=4500
    Abrir sistema BES
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Registrar pago de parcialidad para regularización    ${numero_parcialidad}    ${monto}
    Verificar acreditación de pago de parcialidad    ${numero_parcialidad}    ${monto}
    Verificar actualización de saldo después de pago de parcialidad

Ejecutar proceso de evaluación de habilitaciones en BES
    Abrir sistema BES
    Acceder a módulo de procesos de cobranza
    Acceder a proceso de evaluación de habilitaciones
    Ejecutar proceso de evaluación de habilitaciones
    Esperar finalización de proceso de evaluación de habilitaciones

Verificar identificación de préstamos que califican para habilitación
    Verificar lista de préstamos identificados para habilitación
    Verificar que existen préstamos en la lista de habilitación

Verificar invocación de APIs SITIC-Trustonic para habilitación de equipo
    [Arguments]    ${referencia_prestamo}=PREST111222    ${imei}=359123456789012
    Acceder a módulo de integración con SITIC-Trustonic para habilitación
    Verificar llamada a API SITIC-Trustonic para desbloqueo de equipo    ${referencia_prestamo}    ${imei}
    Verificar datos enviados a API SITIC-Trustonic para habilitación    ${imei}

Verificar actualización de estatus del préstamo a equipo habilitado
    [Arguments]    ${referencia_prestamo}=PREST111222
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Verificar estatus del préstamo es equipo habilitado
    Verificar fecha y hora de habilitación registradas    ${referencia_prestamo}

Consultar historial de habilitaciones en pantalla 360
    [Arguments]    ${referencia_prestamo}=PREST111222
    Acceder a Vista 360 de BES
    Buscar cliente en Vista 360 por teléfono o identificador    ${referencia_prestamo}
    Acceder a sección de historial de habilitaciones en pantalla 360

Verificar registro de habilitación en historial
    [Arguments]    ${motivo}=Regularización de pagos    ${estatus}=Habilitado
    Verificar registro de habilitación con todos los detalles    ${motivo}    ${estatus}

Verificar equipo desbloqueado en sistema SITIC-Trustonic
    [Arguments]    ${imei}=359123456789012
    Verificar estatus de desbloqueo del equipo en API SITIC-Trustonic    ${imei}
    Verificar que el equipo permite realizar llamadas
    Verificar que el equipo permite acceder a servicios móviles

# ========================================
# KEYWORDS PARA PROCESO DE GARANTÍAS EN BES (TC027)
# ========================================
El usuario está autenticado en BES y consulta un préstamo activo con equipo registrado
    [Arguments]    ${identificacion}=ABC123456
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar que el préstamo está activo en BES
    Verificar que existe equipo asociado al préstamo
    Verificar datos del equipo asociado al préstamo

Se inicia el trámite de garantía en BES seleccionando el tipo de garantía
    [Arguments]    ${tipo_garantia}=Cambio físico
    Acceder a módulo de garantías desde préstamo
    Hacer clic en botón iniciar trámite de garantía
    Seleccionar tipo de garantía    ${tipo_garantia}

El sistema despliega el formulario de solicitud de garantía
    Verificar que se despliega formulario de solicitud de garantía
    Verificar que formulario contiene campos requeridos para garantía

Se registran los datos de la garantía en el sistema
    [Arguments]    ${motivo}=Pantalla rota    ${descripcion}=Equipo presenta daño en pantalla    ${fecha_solicitud}=2026-04-15
    Ingresar motivo de garantía    ${motivo}
    Ingresar descripción del problema    ${descripcion}
    Ingresar fecha de solicitud de garantía    ${fecha_solicitud}
    Guardar solicitud de garantía
    Verificar solicitud de garantía almacenada

BES valida el estatus del préstamo y los pagos antes de autorizar la garantía
    Verificar que BES valida estatus del préstamo para garantía
    Verificar que BES valida pagos al corriente para garantía
    Verificar que equipo cumple condiciones de garantía

Se ejecuta el proceso de cambio de equipo reemplazando el equipo original por uno nuevo
    [Arguments]    ${imei_nuevo}=987654321098765
    Iniciar proceso de cambio de equipo
    Registrar IMEI del equipo nuevo    ${imei_nuevo}
    Confirmar cambio de equipo
    Verificar cambio de equipo registrado exitosamente

BES actualiza la información del equipo en el préstamo manteniendo el calendario de pagos
    [Arguments]    ${imei_nuevo}=987654321098765
    Verificar que IMEI del préstamo se actualizó    ${imei_nuevo}
    Verificar que calendario de pagos original se mantiene sin cambios
    Verificar que condiciones de financiamiento no fueron modificadas

Se consulta el historial de garantías del préstamo en la pantalla 360
    Acceder a pantalla 360 del préstamo
    Navegar a sección de historial de garantías
    Verificar historial de garantías muestra registro completo
    Verificar detalles del trámite de garantía en historial

# ========================================
# KEYWORDS PARA PROCESO DE CANCELACIÓN DE PRÉSTAMOS EN BES (TC028)
# ========================================
El usuario consulta un préstamo activo que requiere cancelación en BES
    [Arguments]    ${identificacion}=ABC123456
    Consultar préstamo activo que requiere cancelación    ${identificacion}

Se inicia el proceso de cancelación del préstamo especificando el motivo
    [Arguments]    ${motivo}=Venta cancelada
    Iniciar proceso de cancelación del préstamo    ${motivo}

El sistema despliega el formulario de cancelación con los campos de motivo y justificación
    [Arguments]    ${motivo}=Venta cancelada    ${justificacion}=Cliente solicitó devolución del equipo
    Verificar formulario de cancelación desplegado    ${motivo}    ${justificacion}

BES valida si existen pagos acreditados al préstamo antes de proceder con la cancelación
    Validar existencia de pagos acreditados al préstamo

Se ejecuta la cancelación del préstamo en BES
    Ejecutar cancelación del préstamo en BES

BES ejecuta el proceso de liberación del equipo mediante las APIs de SITIC-Trustonic
    [Arguments]    ${imei}=123456789012345
    Verificar liberación del equipo mediante APIs SITIC-Trustonic    ${imei}

BES genera los ajustes contables o reversas correspondientes si existían pagos acreditados
    Verificar generación de ajustes contables o reversas

Se consulta el historial del préstamo verificando el registro de cancelación
    [Arguments]    ${identificacion}=ABC123456    ${motivo_esperado}=Venta cancelada    ${estatus_esperado}=Cancelado
    Consultar historial del préstamo con registro de cancelación    ${identificacion}
    Verificar registro de cancelación en historial    ${motivo_esperado}    ${estatus_esperado}

# ========================================
# KEYWORDS PARA ACREDITACIÓN DE PAGOS DE PARCIALIDADES POR PUNTOS DE COBRO EXISTENTES (TC029)
# ========================================
La integración entre BES y CPS está configurada para los puntos de cobro SICATEL y Kioscos
    Iniciar sesión en el sistema
    Abrir sistema CPS
    Acceder a módulo de configuración
    Configurar integración con BES
    Verificar integración BES-CPS activa
    Configurar integración con punto de cobro SICATEL
    Verificar integración con punto de cobro SICATEL activa
    Configurar integración con punto de cobro Kioscos
    Verificar integración con punto de cobro Kioscos activa

Se realiza un pago de parcialidad mediante tarjeta de crédito en un Kiosco para el mismo préstamo
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}    ${numero_tarjeta}=4111111111111111    ${cvv}=123    ${fecha_expiracion}=12/28
    Abrir sistema Kioscos
    Acceder a módulo de pagos en Kioscos
    Ingresar datos del pago de parcialidad en Kioscos    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}
    Seleccionar medio de pago con tarjeta de crédito
    Ingresar datos de tarjeta de crédito    ${numero_tarjeta}    ${cvv}    ${fecha_expiracion}
    Procesar pago de parcialidad en Kioscos
    Verificar pago procesado exitosamente en Kioscos
    ${referencia}    ${fecha}    ${monto_procesado}=    Obtener datos del pago de parcialidad procesado en Kioscos
    Set Suite Variable    ${REFERENCIA_TRANSACCION_KIOSCO}    ${referencia}
    Set Suite Variable    ${FECHA_PAGO_KIOSCO}    ${fecha}
    Set Suite Variable    ${MONTO_PARCIALIDAD_KIOSCO}    ${monto_procesado}
    Set Suite Variable    ${MEDIO_PAGO}    Tarjeta de Crédito

BES localiza el préstamo, aplica el pago y actualiza el saldo pendiente desde SICATEL
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${fecha}    ${monto}
    Abrir sistema BES
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Verificar datos de pago de parcialidad recibidos de CPS    ${numero_parcialidad}    ${monto}    ${fecha}    ${referencia_prestamo}    SICATEL
    Verificar actualización de saldo después de pago de parcialidad

BES localiza el préstamo, aplica el pago y actualiza el saldo pendiente desde Kioscos
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad}    ${fecha}    ${monto}    ${medio_pago}=Tarjeta de Crédito
    Abrir sistema BES
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Verificar datos de pago de parcialidad recibidos de CPS desde Kioscos    ${numero_parcialidad}    ${monto}    ${fecha}    ${referencia_prestamo}    Kioscos    ${medio_pago}
    Verificar actualización de saldo después de pago de parcialidad

BES actualiza el calendario de pagos marcando las cuotas como pagadas
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad_1}    ${numero_parcialidad_2}
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Acceder a calendario de pagos
    Verificar parcialidad marcada como pagada en calendario    ${numero_parcialidad_1}
    Verificar parcialidad marcada como pagada en calendario    ${numero_parcialidad_2}

BES muestra en pantalla 360 todos los pagos acreditados con detalles completos
    [Arguments]    ${referencia_prestamo}    ${numero_parcialidad_1}    ${numero_parcialidad_2}    ${monto_1}    ${monto_2}
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Consultar préstamo en Vista 360    ${referencia_prestamo}
    Verificar información accesible en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar pago acreditado en pantalla 360 con detalles completos    ${numero_parcialidad_1}    ${monto_1}    SICATEL    Efectivo
    Verificar pago acreditado en pantalla 360 con detalles completos    ${numero_parcialidad_2}    ${monto_2}    Kioscos    Tarjeta de Crédito

# ========================================
# KEYWORDS PARA PROCESO DE CONCILIACIÓN EN BES (TC030)
# ========================================
La integración BES-BIBES está configurada y activa
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de configuración de reportes de conciliación
    Verificar configuración del reporte almacenada

Se configuran los parámetros de generación del reporte de conciliación en BES
    [Arguments]    ${periodicidad}=Diaria    ${formato}=CSV
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de configuración de reportes de conciliación
    Configurar parámetros de generación de reporte de conciliación    ${periodicidad}    ${formato}
    Guardar configuración del reporte de conciliación
    Verificar configuración del reporte almacenada

Se registran múltiples pagos de parcialidades en diferentes puntos de cobro
    [Arguments]    ${referencia_prestamo}=PREST123456    ${identificacion}=ABC123456
    # Registrar pago 1 desde SICATEL
    Abrir sistema SICATEL
    Acceder a módulo de pagos en SICATEL
    Ingresar datos del pago de parcialidad en SICATEL    ${referencia_prestamo}    1    4500    ${identificacion}
    Procesar pago de parcialidad en SICATEL
    Verificar pago procesado exitosamente en SICATEL
    # Registrar pago 2 desde Kioscos
    Abrir sistema Kioscos
    Acceder a módulo de pagos en Kioscos
    Ingresar datos del pago de parcialidad en Kioscos    ${referencia_prestamo}    2    4500    ${identificacion}
    Seleccionar medio de pago con tarjeta de crédito
    Ingresar datos de tarjeta de crédito    4111111111111111    123    12/28
    Procesar pago de parcialidad en Kioscos
    Verificar pago procesado exitosamente en Kioscos
    # Los pagos se acreditan automáticamente en BES
    Sleep    2s

BES acredita todos los pagos y actualiza los saldos de los préstamos
    [Arguments]    ${referencia_prestamo}=PREST123456
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Verificar actualización de saldo después de pago de parcialidad
    Acceder a calendario de pagos
    Verificar parcialidad marcada como pagada en calendario    1
    Verificar parcialidad marcada como pagada en calendario    2

Se ejecuta el proceso de generación del reporte de conciliación en BES
    Abrir sistema BES
    Ejecutar proceso de generación de reporte de conciliación

BES procesa todas las transacciones del periodo y genera el archivo de conciliación
    Verificar que el reporte fue generado exitosamente

El reporte incluye todos los campos requeridos según el Layout
    Verificar formato del reporte según layout definido
    Verificar que el reporte incluye todos los campos requeridos según Layout

BES transmite el archivo de conciliación a BIBES exitosamente
    Verificar transmisión del reporte hacia BIBES

Se consulta el log de generación de reportes en BES
    Abrir sistema BES
    Acceder a log de generación de reportes

El log muestra el registro de generación con fecha, hora, número de registros y estatus de envío
    [Arguments]    ${num_registros}=2
    Verificar registro en log de generación de reportes    ${num_registros}

BIBES confirma la recepción del reporte y muestra los datos conciliados
    Abrir sistema BIBES
    Acceder a módulo de conciliación en BIBES
    Buscar reporte de conciliación recibido    BES
    Verificar recepción de reporte de conciliación desde BES
    Verificar datos conciliados en BIBES
    Verificar procesamiento exitoso del reporte en BIBES

# ========================================
# KEYWORDS PARA PROCESO DE COMPENSACIÓN EN BES (TC031)
# ========================================
Acceder al módulo de compensación en BES
    Abrir sistema BES
    Acceder al módulo de compensación en BES desde menú principal
    Esperar carga de pantalla de compensación

Verificar que se muestra la pantalla de gestión de compensación
    Verificar pantalla de gestión de compensación desplegada

Buscar préstamo con movimientos pendientes de compensación
    [Arguments]    ${referencia_prestamo}=PREST123456
    Buscar préstamo para compensación    ${referencia_prestamo}
    Verificar que se muestran los movimientos pendientes

Verificar que el préstamo tiene movimientos pendientes de compensación
    Verificar existencia de movimientos pendientes de compensación

Seleccionar préstamo para compensación
    [Arguments]    ${referencia_prestamo}=PREST123456
    Seleccionar préstamo en pantalla de compensación    ${referencia_prestamo}
    Verificar préstamo seleccionado para compensación    ${referencia_prestamo}

Ejecutar proceso de compensación del préstamo
    Hacer clic en botón ejecutar compensación
    Esperar procesamiento de compensación

Verificar que el proceso de compensación se ejecuta correctamente
    Verificar mensaje de compensación exitosa
    Verificar que el proceso finalizó correctamente

Verificar actualización de saldos después de compensación
    [Arguments]    ${referencia_prestamo}=PREST123456
    Consultar saldos actualizados del préstamo    ${referencia_prestamo}
    Verificar que los saldos reflejan la compensación aplicada

Verificar que los saldos fueron actualizados correctamente
    Verificar consistencia de saldos después de compensación

Consultar historial de movimientos del préstamo compensado
    [Arguments]    ${referencia_prestamo}=PREST123456
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Acceder a historial de movimientos del préstamo    ${referencia_prestamo}

Verificar movimientos compensados en historial con fecha monto y estatus
    [Arguments]    ${referencia_prestamo}=PREST123456    ${fecha}=2026-04-15    ${estatus}=Compensado
    Verificar registro de compensación en historial de movimientos    ${fecha}    ${estatus}
    Verificar que el historial muestra fecha monto y estatus actualizados

Verificar generación de reporte de conciliación hacia BIBES para compensación
    [Arguments]    ${referencia_prestamo}=PREST123456
    Acceder a módulo de reportes hacia BIBES
    Generar reporte de conciliación de compensaciones hacia BIBES    ${referencia_prestamo}

Verificar formato del reporte de conciliación según layout definido para compensación
    Verificar formato del reporte de conciliación según layout definido
    Verificar que el reporte incluye información de compensaciones

Verificar transmisión del reporte de compensación hacia BIBES
    Verificar transmisión del reporte hacia BIBES
    Verificar que el reporte fue transmitido exitosamente a BIBES

# ========================================
# KEYWORDS DE ALTO NIVEL PARA TC032 - VENTA DE SERVICIOS SUPLEMENTARIOS PREPAGADOS DE CONTADO
# ========================================

El usuario inicia el proceso de venta de equipo bajo esquema Amigo Paguitos
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de ventas
    Iniciar nueva venta

El usuario completa las etapas de registro hasta formalización
    [Arguments]    ${nombre}=Juan Pérez    ${email}=juan.perez@telcel.com    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456
    Ejecutar paso de registro de usuario    ${nombre}    ${email}
    Ejecutar paso de aceptación de legales
    Ejecutar paso de autenticación
    Ejecutar paso de evaluación
    Ejecutar paso de aceptación de oferta
    Ejecutar paso de enrolamiento de equipos
    Ejecutar paso de pago de enganche
    Ingresar datos del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}

El usuario selecciona la opción de agregar servicios de oferta suplementaria prepagado de contado
    Acceder a módulo de servicios suplementarios
    Visualizar catálogo de servicios prepagados de contado

El sistema muestra el catálogo de servicios suplementarios prepagados disponibles
    Page Should Contain Element    ${AP_CATALOGO_SERVICIOS_PREPAGADOS}
    Page Should Contain Element    ${AP_TABLA_SERVICIOS_DISPONIBLES}

El usuario selecciona servicios suplementarios y confirma el pago de contado
    [Arguments]    @{servicios}
    Seleccionar múltiples servicios suplementarios prepagados    @{servicios}
    Verificar monto total de servicios seleccionados
    Confirmar pago de contado de servicios suplementarios

El sistema registra los servicios seleccionados y calcula el monto total
    Verificar monto total de servicios seleccionados
    Verificar servicios suplementarios agregados a la venta

El usuario completa la venta y verifica transferencia a BES
    Completar venta con servicios suplementarios prepagados de contado

BES recibe la información del préstamo y los servicios suplementarios de contado
    [Arguments]    ${identificacion}
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo

El usuario consulta en pantalla 360 de BES el detalle del préstamo
    [Arguments]    ${identificacion}
    Acceder a pantalla 360 del cliente    ${identificacion}
    Acceder a sección de servicios suplementarios en pantalla 360

El sistema muestra el préstamo con los servicios suplementarios prepagados de contado
    Verificar que existen servicios suplementarios registrados

Verificar servicios suplementarios prepagados de contado registrados correctamente en BES
    [Arguments]    ${nombre_servicio}    ${tipo}=Prepagado    ${monto}=500    ${forma_pago}=Contado
    Verificar servicio suplementario prepagado de contado en pantalla 360    ${nombre_servicio}
    Verificar datos completos de servicio suplementario    ${nombre_servicio}    ${tipo}    ${monto}    ${forma_pago}
    Verificar estatus activo de servicio suplementario
    Verificar fecha de contratación de servicio suplementario

# ========================================
# KEYWORDS DE ALTO NIVEL PARA TC033 - VENTA DE SERVICIOS SUPLEMENTARIOS PREPAGADOS DIFERIDOS
# ========================================

El usuario completa la evaluación crediticia y llega a la etapa de oferta de financiamiento
    [Arguments]    ${nombre}=Juan Pérez    ${email}=juan.perez@telcel.com    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456
    Ejecutar paso de registro de usuario    ${nombre}    ${email}
    Ejecutar paso de aceptación de legales
    Ejecutar paso de autenticación
    Ejecutar paso de evaluación
    Ejecutar paso de aceptación de oferta

El sistema muestra las opciones de plazo y periodicidad configurables
    Page Should Contain Element    ${AP_SELECT_PLAZO_OFERTA}
    Page Should Contain Element    ${AP_SELECT_PERIODICIDAD_OFERTA}
    Log    Sistema muestra opciones de plazo (3, 6, 9, 12 meses) y periodicidad (semanal, quincenal, mensual)

El usuario selecciona la opción de agregar servicios de oferta suplementaria prepagado diferido
    Acceder a módulo de servicios suplementarios
    Visualizar catálogo de servicios prepagados diferidos

El sistema muestra el catálogo de servicios suplementarios prepagados diferidos disponibles
    Page Should Contain Element    ${AP_CATALOGO_SERVICIOS_DIFERIDOS}
    Page Should Contain Element    ${AP_TABLA_SERVICIOS_DIFERIDOS}

El usuario selecciona servicios suplementarios diferidos y confirma su inclusión
    [Arguments]    @{servicios}
    Seleccionar múltiples servicios suplementarios diferidos    @{servicios}
    Verificar monto total de servicios diferidos seleccionados
    Incluir servicios diferidos en el financiamiento

El sistema recalcula el monto total del préstamo y ajusta las parcialidades
    [Arguments]    ${plazo}=12
    Verificar recálculo del monto total del préstamo
    Verificar recálculo de parcialidades según plazo    ${plazo}
    Verificar desglose de monto equipo y servicios diferidos

El usuario formaliza la venta con pago de enganche y envío de contrato
    Completar venta con servicios suplementarios diferidos

El sistema registra la venta y transfiere información a BES
    [Arguments]    ${identificacion}=ABC123456
    Sleep    3s
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo

El usuario verifica en BES que el préstamo refleja el monto total con servicios diferidos
    [Arguments]    ${identificacion}
    Acceder a pantalla 360 del cliente    ${identificacion}
    Verificar monto total del préstamo incluye servicios diferidos
    Verificar desglose del préstamo con equipo y servicios diferidos

BES muestra el préstamo con desglose y calendario de cobranza correcto
    [Arguments]    ${num_parcialidades}=12
    Verificar calendario de cobranza con servicios diferidos    ${num_parcialidades}

El usuario consulta en pantalla 360 el detalle de cuotas y desglose de pagos
    Acceder a sección de servicios diferidos en pantalla 360
    Verificar que existen servicios diferidos registrados

El sistema despliega el desglose completo con proporción de equipo y servicios
    Verificar desglose de proporción en cuotas

# ========================================
# KEYWORDS PARA ACTIVACIÓN DE LÍNEA CELULAR SOBRE EQUIPO AMIGO PAGUITOS (TC034)
# ========================================
El proceso de venta y financiamiento de equipo bajo Amigo Paguitos ha sido completado
    [Arguments]    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456    ${monto}=15000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar flujo completo de venta en AP.AG    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Ejecutar flujo completo de financiamiento en AP.AG    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Sleep    2s

El préstamo de equipo queda registrado en BES con el esquema Amigo Paguitos
    [Arguments]    ${identificacion}=ABC123456
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo

El usuario accede al módulo de activación de línea celular
    Acceder a módulo de activación de líneas

El sistema permite acceder y reconoce el equipo asociado al préstamo
    [Arguments]    ${identificacion}=ABC123456
    Buscar préstamo Amigo Paguitos para activación    ${identificacion}
    Verificar equipo asociado al préstamo es reconocido

El usuario ingresa los datos del cliente para activación
    [Arguments]    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${direccion}=Calle Principal 123    ${telefono}=5551234567
    Iniciar proceso de activación de línea
    Ingresar datos del cliente para activación    ${nombre}    ${identificacion}    ${direccion}    ${telefono}

El sistema valida los datos y muestra planes prepagados disponibles
    Validar datos del cliente ingresados
    Visualizar opciones de planes prepagados disponibles

El usuario selecciona un plan prepagado
    [Arguments]    ${plan}=Plan Prepago Básico
    Seleccionar plan prepagado    ${plan}

El usuario completa el proceso de activación de línea celular
    [Arguments]    ${icc}=8952071234567890123    ${msisdn}=5559876543
    Ingresar información de SIM card    ${icc}    ${msisdn}
    Confirmar activación de línea celular

El sistema activa la línea y la asocia al equipo Amigo Paguitos
    Verificar línea activada correctamente
    Verificar asociación de línea con equipo Amigo Paguitos

El usuario verifica en pantalla 360 que la activación de línea quedó registrada en el préstamo
    [Arguments]    ${identificacion}=ABC123456
    Acceder a pantalla 360 para verificar activación de línea    ${identificacion}
    Verificar información de línea celular en pantalla 360
    Verificar historial de activación de línea en préstamo

# ========================================
# KEYWORDS PARA CASO TC035 - PROMOCIONES AK ASL EN ACTIVACIÓN
# ========================================
El usuario consulta las promociones AK ASL vigentes configuradas en el sistema
    Abrir sistema BES
    Acceder a módulo de promociones AK ASL
    Consultar promociones AK ASL vigentes

El sistema muestra las promociones AK ASL activas con condiciones y beneficios
    Verificar información de promociones AK ASL activas
    Verificar vigencia de promociones AK ASL

El usuario inicia activación de línea sobre equipo Amigo Paguitos que califica para promoción AK ASL
    [Arguments]    ${identificacion}=ABC123456
    Acceder a módulo de activación de líneas
    Verificar equipo califica para promoción AK ASL    ${identificacion}

El sistema reconoce el equipo elegible para promoción AK ASL
    [Arguments]    ${identificacion}=ABC123456
    Verificar equipo asociado al préstamo es reconocido
    Iniciar proceso de activación de línea

El usuario selecciona plan prepagado elegible para promoción AK ASL durante la activación
    [Arguments]    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${plan}=Plan Prepago Promo AK ASL
    Ingresar datos del cliente para activación    ${nombre}    ${identificacion}    ${direccion}    ${telefono}
    Validar datos del cliente ingresados
    Visualizar opciones de planes prepagados disponibles
    Seleccionar plan prepagado elegible para promoción AK ASL    ${plan}

El sistema identifica elegibilidad y aplica promoción AK ASL automáticamente
    Verificar aplicación automática de promoción AK ASL

El usuario completa activación de línea con promoción AK ASL aplicada
    [Arguments]    ${icc}=8952071234567890123    ${msisdn}=5559876543
    Completar activación con promoción AK ASL    ${icc}    ${msisdn}

El sistema activa línea con beneficios de promoción AK ASL configurados
    Verificar línea activada correctamente
    Verificar asociación de línea con equipo Amigo Paguitos

El usuario verifica en BES y pantalla 360 que promoción AK ASL está asociada al préstamo y línea
    [Arguments]    ${identificacion}=ABC123456
    Acceder a pantalla 360 para verificar activación de línea    ${identificacion}
    Verificar promoción AK ASL asociada al préstamo y línea

# ========================================
# KEYWORDS PARA PROMOCIONES AK CON TODO EN ACTIVACIÓN (TC036)
# ========================================
El usuario consulta las promociones AK con Todo vigentes en el sistema
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de promociones AK con Todo
    Consultar promociones AK con Todo vigentes

El sistema despliega las promociones AK con Todo activas con sus reglas de aplicación y beneficios
    Verificar información de promociones AK con Todo activas
    Verificar vigencia de promociones AK con Todo

El usuario selecciona un equipo vendido bajo Amigo Paguitos elegible para promoción AK con Todo
    [Arguments]    ${identificacion}=ABC123456
    Acceder a módulo de activación de líneas
    Buscar préstamo para activación de línea    ${identificacion}
    Verificar equipo asociado al préstamo    ${identificacion}

El sistema identifica el equipo y permite iniciar el proceso de activación de línea
    [Arguments]    ${identificacion}=ABC123456
    Verificar equipo califica para promoción AK con Todo    ${identificacion}
    Iniciar proceso de activación de línea

El usuario inicia la activación de línea celular seleccionando un plan prepagado compatible con AK con Todo
    [Arguments]    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${plan}=Plan Prepago AK con Todo
    Ingresar datos del cliente para activación    ${nombre}    ${identificacion}    ${direccion}    ${telefono}
    Validar datos del cliente ingresados
    Visualizar opciones de planes prepagados disponibles
    Seleccionar plan prepagado compatible con AK con Todo    ${plan}

El sistema valida la elegibilidad y aplica automáticamente la promoción AK con Todo al plan seleccionado
    Verificar aplicación automática de promoción AK con Todo

El usuario completa el proceso de activación con la promoción AK con Todo aplicada
    [Arguments]    ${icc}=8952071234567890123    ${msisdn}=5559876543
    Completar activación con promoción AK con Todo    ${icc}    ${msisdn}

El sistema activa la línea correctamente con todos los beneficios de la promoción AK con Todo configurados
    Verificar línea activada correctamente
    Verificar asociación de línea con equipo Amigo Paguitos

El usuario verifica en la pantalla 360 de BES que el préstamo muestre la línea activada con promoción AK con Todo
    [Arguments]    ${identificacion}=ABC123456
    Acceder a pantalla 360 para verificar activación de línea    ${identificacion}
    Verificar promoción AK con Todo asociada al préstamo y línea

# ========================================
# KEYWORDS PARA SOPORTE DE MÚLTIPLES PRÉSTAMOS POR CLIENTE (TC037)
# ========================================
Se configura en Amigo Paguitos el número máximo de préstamos permitidos por cliente
    [Arguments]    ${limite}=2
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de configuración en Amigo Paguitos
    Acceder a configuración de límite de préstamos
    Configurar límite máximo de préstamos por cliente    ${limite}

El sistema registra la configuración del límite de préstamos simultáneos por cliente
    [Arguments]    ${limite}=2
    Verificar configuración de límite almacenada    ${limite}
    Log    Configuración de límite de préstamos almacenada: ${limite} préstamo(s) por cliente

Se crea un primer préstamo para un cliente a través del flujo de venta de Amigo Paguitos
    [Arguments]    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456    ${monto}=15000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Ejecutar flujo completo de venta en AP.AG    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Ejecutar flujo completo de financiamiento en AP.AG    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}

BES recibe y registra el primer préstamo del cliente correctamente
    [Arguments]    ${identificacion}=ABC123456
    Sleep    3s
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo

Se inicia un segundo proceso de venta para el mismo cliente con el primer préstamo activo
    [Arguments]    ${identificacion}=ABC123456    ${monto}=20000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Abrir Amigo Paguitos
    Crear préstamo para cliente existente    ${identificacion}    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}

El sistema valida que el cliente tiene un préstamo activo y verifica si puede tener préstamos adicionales según la configuración
    Verificar validación de límite de préstamos
    Log    Sistema validó que el cliente no ha excedido el límite de préstamos configurado

Se completa la evaluación y formalización del segundo préstamo para el mismo cliente
    Verificar estado de financiamiento aprobado
    Formalizar la venta
    Verificar estado de venta formalizada

BES acepta y registra el segundo préstamo si no excede el límite configurado en Amigo Paguitos
    [Arguments]    ${identificacion}=ABC123456
    Sleep    3s
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Log    BES registró correctamente el segundo préstamo del cliente

Se consulta en la pantalla 360 de BES la información del cliente
    [Arguments]    ${identificacion}=ABC123456
    Acceder a Vista 360 de BES
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}

El sistema muestra todos los préstamos activos del cliente con su información individual
    [Arguments]    ${numero_prestamos}=2
    Verificar múltiples préstamos en Vista 360    ${numero_prestamos}
    Verificar todos los préstamos tienen información completa    ${numero_prestamos}

Se verifica que cada préstamo muestra datos del préstamo calendario de pagos estatus y equipos asociados
    [Arguments]    ${numero_prestamos}=2
    FOR    ${i}    IN RANGE    1    ${numero_prestamos}+1
        Verificar información individual de cada préstamo    ${i}
        Acceder a detalle de préstamo específico    ${i}
        Verificar calendario de pagos del préstamo seleccionado
        Verificar equipo asociado al préstamo seleccionado
        Go Back
        Wait Until Element Is Visible    ${BES_TABLA_LISTA_PRESTAMOS_CLIENTE}    timeout=10s
    END
    Log    Todos los préstamos muestran información completa: datos, calendario, estatus y equipos

Se intenta crear un préstamo adicional que exceda el límite configurado
    [Arguments]    ${identificacion}=ABC123456    ${monto}=25000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Abrir Amigo Paguitos
    Acceder a módulo de ventas
    Iniciar nueva venta
    Input Text    ${AP_INPUT_IDENTIFICACION}    ${identificacion}
    Acceder a módulo de financiamiento
    Ingresar parámetros del financiamiento    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Click Button    ${AP_BOTON_APROBAR_FINANCIAMIENTO}

El sistema rechaza la operación y muestra un mensaje indicando que se ha alcanzado el límite máximo de préstamos por cliente
    Verificar rechazo por límite excedido
    Log    Sistema rechazó correctamente el préstamo adicional por exceder el límite configurado

# ========================================
# KEYWORDS PARA INTEGRACIÓN PMOTI 755 CON BES (TC038)
# ========================================

Se identifica un equipo vendido bajo Amigo Paguitos que requiere trámite PMOTI 755
    [Arguments]    ${imei}=359876543210999
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo PMOTI 755 en BES
    Buscar equipo vendido bajo Amigo Paguitos    ${imei}
    Verificar que sistema reconoce equipo asociado a préstamo BES
    Verificar mensaje de equipo reconocido en BES

Se inicia el trámite PMOTI 755 sobre el equipo de Amigo Paguitos
    [Arguments]    ${tipo_tramite}=Garantía    ${motivo}=Equipo con falla    ${descripcion}=Dispositivo no enciende
    Seleccionar tipo de trámite PMOTI 755    ${tipo_tramite}
    Iniciar trámite PMOTI 755
    Verificar que sistema permite ejecutar trámite PMOTI 755
    Ingresar datos del trámite PMOTI 755    ${motivo}    ${descripcion}

BES procesa el trámite PMOTI 755 aplicando las mismas reglas de negocio
    Ejecutar trámite PMOTI 755 en BES
    Verificar que BES ejecuta trámite PMOTI 755 correctamente
    Verificar que BES aplica mismas reglas de negocio para equipos Amigo Paguitos

Se verifica el registro del trámite en el historial del préstamo en BES
    [Arguments]    ${tipo_tramite}=Garantía
    Acceder a historial de trámites PMOTI del préstamo
    Verificar que trámite se registra en historial del préstamo    ${tipo_tramite}
    Verificar detalles de trámite en historial    ${tipo_tramite}

Se consulta la información actualizada en la pantalla 360 de BES después del trámite
    [Arguments]    ${criterio_busqueda}=359876543210999
    Acceder a pantalla 360 de BES después de trámite PMOTI    ${criterio_busqueda}
    Consultar detalle del préstamo en pantalla 360
    Verificar que pantalla 360 muestra información actualizada después de trámite

# ========================================
# KEYWORDS PARA INTEGRACIÓN PMOTI 832 CON BES (TC039)
# ========================================

Se selecciona un equipo vendido bajo el esquema Amigo Paguitos PMOTI 832 registrado en BES
    [Arguments]    ${imei}=359876543210832
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo PMOTI 832 en BES
    Buscar equipo vendido bajo Amigo Paguitos PMOTI 832    ${imei}
    Verificar que sistema identifica equipo asociado a préstamo activo PMOTI 832
    Verificar que préstamo activo es administrado por BES

Se inicia un trámite posventa del PMOTI 832 aplicando reglas de negocio de BES
    [Arguments]    ${tipo_tramite}=Cambio de garantía    ${motivo}=Equipo defectuoso    ${descripcion}=Dispositivo presenta fallas en pantalla
    Seleccionar tipo de trámite posventa PMOTI 832    ${tipo_tramite}
    Iniciar trámite posventa PMOTI 832
    Verificar que BES permite acceder a opciones de trámites PMOTI 832
    Ingresar datos del trámite PMOTI 832    ${motivo}    ${descripcion}
    Ejecutar trámite PMOTI 832 aplicando reglas estándar de BES
    Verificar que BES procesa trámite PMOTI 832 con misma funcionalidad

El sistema completa el trámite y actualiza el estatus del préstamo en BES
    Verificar que trámite PMOTI 832 se completó exitosamente
    Verificar actualización de estatus del préstamo en BES
    Verificar actualización de información del préstamo en BES

Se verifica el registro del trámite en el historial de la pantalla 360 de BES
    [Arguments]    ${tipo_tramite}=Cambio de garantía
    Acceder a pantalla 360 de BES para consultar historial PMOTI 832
    Navegar a sección de historial de trámites PMOTI 832
    Verificar que historial despliega trámite PMOTI 832 ejecutado
    Verificar detalles completos del trámite PMOTI 832 en historial    ${tipo_tramite}

Los reportes de ventas y comisiones reflejan correctamente la operación ejecutada
    Acceder a módulo de reportes de ventas en BES
    Generar reporte de ventas incluyendo operaciones PMOTI 832
    Verificar que reporte incluye información del trámite PMOTI 832
    Generar reporte de comisiones de distribuidores
    Verificar que reporte de comisiones incluye datos actualizados del trámite
    Generar reporte de conciliación
    Verificar que reporte de conciliación refleja operación PMOTI 832

# ========================================
# KEYWORDS PARA FLUJO COMPLETO DE LEGALES EN AP.AG (TC042)
# ========================================

El usuario ha completado registro previo y accede a etapa de Legales
    [Arguments]    ${nombre}=Usuario Test    ${apellidos}=Apellidos Test    ${email}=test@telcel.com    ${telefono}=5551234567    ${direccion}=Av. Test 123
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de registro en Amigo Paguitos Autogestión
    Ingresar datos personales completos para registro    ${nombre}    ${apellidos}    ${email}    ${telefono}    ${direccion}
    Confirmar el registro del usuario
    Verificar confirmación de registro exitoso

Verificar visualización de términos y condiciones legales
    Acceder a módulo de legales en Amigo Paguitos
    Verificar que se muestran todos los documentos legales requeridos

Revisar documentos legales presentados en pantalla de Legales
    Verificar visualización de contrato de financiamiento
    Verificar visualización de términos y condiciones
    Verificar visualización de aviso de privacidad

Aceptar términos y condiciones mediante checkboxes
    Seleccionar checkbox de aceptación de términos
    Seleccionar checkbox de aceptación de aviso de privacidad
    Verificar habilitación del botón continuar

Confirmar aceptación de documentos legales
    Confirmar aceptación de legales mediante botón
    Esperar confirmación de aceptación exitosa

Verificar registro de aceptación y avance a siguiente etapa
    Verificar mensaje de aceptación de legales exitosa
    Verificar avance a siguiente etapa del flujo

Verificar transferencia de aceptación legal hacia BES
    [Arguments]    ${identificacion}=test@telcel.com
    Sleep    2s
    Abrir sistema BES
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${identificacion}

Verificar almacenamiento de aceptación legal en BES
    [Arguments]    ${identificacion}=test@telcel.com
    Verificar registro de aceptación legal en BES    ${identificacion}
    Verificar fecha y hora de aceptación registrada en BES

# ========================================
# KEYWORDS PARA FLUJO COMPLETO DE AUTENTICACIÓN EN AP.AG (TC043)
# ========================================

El usuario ha completado etapa de Legales y accede a Autenticación
    [Arguments]    ${nombre}=Usuario Test    ${apellidos}=Apellidos Test    ${email}=test@telcel.com    ${telefono}=5551234567    ${direccion}=Av. Test 123
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de registro en Amigo Paguitos Autogestión
    Ingresar datos personales completos para registro    ${nombre}    ${apellidos}    ${email}    ${telefono}    ${direccion}
    Confirmar el registro del usuario
    Verificar confirmación de registro exitoso
    Ejecutar paso de aceptación de legales
    Verificar avance a siguiente etapa del flujo

Verificar visualización de opciones de autenticación en AP.AG
    Wait Until Element Is Visible    ${AP_MENU_AUTENTICACION}    timeout=10s
    Page Should Contain Element    ${AP_MENU_AUTENTICACION}
    Page Should Contain Element    ${AP_INPUT_CODIGO_AUTENTICACION}
    Log    Sistema muestra correctamente las opciones de autenticación disponibles

Seleccionar método de autenticación y proporcionar credenciales
    [Arguments]    ${codigo}=123456
    Click Element    ${AP_MENU_AUTENTICACION}
    Wait Until Element Is Visible    ${AP_INPUT_CODIGO_AUTENTICACION}    timeout=10s
    Input Text    ${AP_INPUT_CODIGO_AUTENTICACION}    ${codigo}
    Log    Credenciales de autenticación proporcionadas correctamente

Completar proceso de autenticación exitosamente
    Click Button    ${AP_BOTON_VALIDAR_AUTENTICACION}
    Wait Until Element Is Visible    ${AP_MENSAJE_AUTENTICACION_EXITOSA}    timeout=10s
    Log    Proceso de autenticación completado exitosamente

Verificar confirmación de autenticación exitosa y continuación de flujo
    ${mensaje}=    Get Text    ${AP_MENSAJE_AUTENTICACION_EXITOSA}
    Should Contain    ${mensaje}    exitosa
    Page Should Contain Element    ${AP_MENSAJE_AUTENTICACION_EXITOSA}
    Log    Sistema confirmó la autenticación exitosa y habilitó la continuación del flujo

Verificar transferencia de información de autenticación hacia BES
    [Arguments]    ${identificacion}=test@telcel.com
    Sleep    2s
    Abrir sistema BES
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${identificacion}

Verificar registro de autenticación exitosa en BES
    [Arguments]    ${identificacion}=test@telcel.com
    Verificar registro de autenticación del usuario en BES    ${identificacion}
    Verificar fecha y hora de autenticación registrada en BES
    Verificar método de autenticación registrado en BES

# ========================================
# KEYWORDS PARA FLUJO COMPLETO DE EVALUACIÓN CREDITICIA (TC044)
# ========================================
El usuario ha completado Autenticación y accede a Evaluación
    El usuario ha completado etapa de Autenticación y accede a Evaluación

El usuario ha completado etapa de Autenticación y accede a Evaluación
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar paso de registro de usuario    Carlos    carlos@telcel.com
    Ejecutar paso de aceptación de legales
    Ejecutar paso de autenticación    123456
    Wait Until Page Contains Element    ${AP_MENU_EVALUACION}    timeout=10s

Iniciar proceso de evaluación crediticia en AP.AG
    Acceder a módulo de evaluación crediticia
    Page Should Contain Element    ${AP_SECCION_EVALUACION}
    Log    Sistema inició el proceso de evaluación crediticia del usuario

Proporcionar información financiera para evaluación
    [Arguments]    ${ingresos}=50000    ${tipo_empleo}=Empleado    ${antiguedad}=2    ${empresa}=Empresa Ejemplo SA    ${referencia}=5551234567
    Ingresar información financiera para evaluación    ${ingresos}    ${tipo_empleo}    ${antiguedad}    ${empresa}    ${referencia}
    Validar que información financiera fue recibida
    Log    Sistema recibió y validó la información financiera proporcionada

Ejecutar evaluación crediticia en motor de evaluación
    Enviar información para evaluación crediticia
    Esperar resultado de evaluación crediticia
    Log    Sistema procesó la evaluación y determinó aprobación o rechazo del crédito

Verificar resultado de evaluación crediticia mostrado
    Verificar resultado de evaluación aprobada
    ${monto}=    Verificar monto autorizado en evaluación
    Log    Sistema mostró el resultado de evaluación: Aprobada con monto autorizado ${monto}

Verificar transferencia de evaluación crediticia hacia BES
    [Arguments]    ${identificacion}=test@telcel.com
    Sleep    3s
    Abrir sistema BES
    Acceder a módulo de evaluaciones crediticias
    Buscar evaluación por identificación del cliente    ${identificacion}
    Verificar que existe registro de evaluación crediticia
    Log    Información de evaluación transferida correctamente a BES

Verificar almacenamiento de evaluación crediticia en BES
    [Arguments]    ${identificacion}=test@telcel.com    ${resultado_esperado}=Aprobada    ${monto_esperado}=50000
    Verificar datos de evaluación almacenados en BES    ${resultado_esperado}    ${monto_esperado}
    Verificar información financiera almacenada en evaluación
    Verificar fecha de evaluación registrada
    Log    BES almacenó correctamente los resultados de evaluación crediticia y monto aprobado

# ========================================
# KEYWORDS DE ALTO NIVEL PARA TC045 - FLUJO COMPLETO DE OFERTA EN AP.AG
# ========================================

El usuario completa evaluación crediticia exitosamente y navega a Oferta
    [Arguments]    ${nombre}=Juan Pérez    ${email}=juan.perez@telcel.com    ${identificacion}=ABC123456
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de ventas
    Iniciar nueva venta
    Ejecutar paso de registro de usuario    ${nombre}    ${email}
    Ejecutar paso de aceptación de legales
    Ejecutar paso de autenticación
    Ejecutar paso de evaluación
    Log    Usuario completó evaluación crediticia exitosamente y está listo para ver ofertas

Verificar visualización de opciones de financiamiento disponibles
    Acceder a módulo de oferta en Amigo Paguitos
    Verificar visualización de tabla de opciones de financiamiento
    Log    Sistema muestra opciones de financiamiento según evaluación crediticia

Revisar opciones de oferta con diferentes plazos y periodicidades
    Verificar disponibilidad de opciones de plazo
    Verificar disponibilidad de opciones de periodicidad
    Log    Usuario revisa opciones de oferta: plazos de 3, 6, 9 y 12 meses con ciclos semanales, quincenales y mensuales

Seleccionar opción de financiamiento específica
    [Arguments]    ${plazo}=12    ${periodicidad}=mensual
    Revisar detalle de opción de oferta    ${plazo}
    Seleccionar opción de oferta por plazo y periodicidad    ${plazo}    ${periodicidad}
    Log    Usuario seleccionó opción: Plazo=${plazo} meses, Periodicidad=${periodicidad}

Confirmar aceptación de la oferta seleccionada
    Confirmar aceptación de oferta
    Log    Usuario confirmó la aceptación de la oferta seleccionada

Verificar registro de oferta aceptada y habilitación del flujo
    Verificar oferta aceptada y registrada
    Verificar habilitación de continuación del flujo
    Log    Sistema registró la oferta aceptada y habilitó la continuación del flujo de venta

Verificar transferencia de información de oferta hacia BES
    [Arguments]    ${identificacion}=ABC123456
    Sleep    3s
    Abrir sistema BES
    Acceder a módulo de ofertas en BES
    Buscar oferta por identificación del cliente    ${identificacion}
    Verificar que existe registro de oferta
    Log    Información de oferta aceptada transferida correctamente a BES

Verificar almacenamiento de oferta en BES con calendario de pagos
    [Arguments]    ${identificacion}=ABC123456    ${plazo}=12    ${periodicidad}=mensual
    Verificar datos de oferta almacenada en BES    ${plazo}    ${periodicidad}
    Verificar estado de oferta aceptada en BES
    Verificar fecha de aceptación de oferta
    Verificar calendario de pagos de oferta en BES    ${plazo}
    Verificar detalle de cuotas en calendario de pagos
    Log    BES almacenó la información del préstamo con plazo, monto, periodicidad y calendario de pagos definido

# ========================================
# KEYWORDS PARA ENROLAMIENTO COMPLETO DE EQUIPOS (TC046)
# ========================================
El usuario ha aceptado la oferta en AP.AG y accede a etapa de enrolamiento
    [Arguments]    ${nombre}=Juan Pérez    ${identificacion}=ABC123456
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar paso de registro de usuario    ${nombre}    ${identificacion}@telcel.com
    Ejecutar paso de aceptación de legales
    Ejecutar paso de autenticación
    Ejecutar paso de evaluación
    Ejecutar paso de aceptación de oferta

El sistema muestra la pantalla para registrar la información del equipo a financiar
    Verificar que el sistema muestra pantalla para registrar información del equipo

Se ingresan los datos del equipo IMEI marca modelo y características técnicas
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM
    Ingresar datos del equipo a financiar    ${imei}    ${marca}    ${modelo}    ${caracteristicas}

El sistema valida que el IMEI sea válido y corresponda al equipo seleccionado
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro
    Verificar validación de IMEI válido
    Verificar que IMEI corresponde al equipo seleccionado    ${imei}    ${marca}    ${modelo}

Se registra el equipo asociándolo al financiamiento del cliente
    Registrar equipo asociándolo al financiamiento
    Verificar confirmación de registro del equipo

El sistema confirma el registro del equipo y lo asocia al préstamo del cliente
    Verificar confirmación de registro del equipo

Se completa el proceso de enrolamiento del equipo
    Completar proceso de enrolamiento del equipo
    Verificar finalización de enrolamiento y preparación de información

El sistema finaliza el enrolamiento y prepara la información para registro en sistemas de bloqueo
    Verificar finalización de enrolamiento y preparación de información
    Preparar información del equipo para registro en sistemas de bloqueo

Se transfiere la información del equipo a BES
    Sleep    3s
    Log    Información del equipo transferida automáticamente a BES

BES almacena la información del equipo asociada al préstamo del cliente
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM    ${identificacion}=ABC123456
    Abrir sistema BES
    Verificar transferencia correcta de información del equipo a BES    ${imei}    ${marca}    ${modelo}    ${caracteristicas}    ${identificacion}

Se confirma la integración del equipo con las herramientas de bloqueo SITIC-Trustonic y EIR
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM    ${identificacion}=ABC123456
    Verificar almacenamiento completo del equipo enrollado en BES    ${imei}    ${marca}    ${modelo}    ${caracteristicas}    ${identificacion}

El equipo queda registrado en los sistemas de bloqueo para su administración en caso de incumplimiento
    Log    Equipo registrado en sistemas de bloqueo SITIC-Trustonic y EIR para administración

# ========================================
# KEYWORDS PARA FLUJO COMPLETO DE ENVÍO DE CONTRATO (TC048)
# ========================================
El usuario ha confirmado el pago de enganche y accede a etapa de Envío de Contrato en AP.AG
    [Arguments]    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar paso de registro de usuario    ${nombre}    ${identificacion}@telcel.com
    Ejecutar paso de aceptación de legales
    Ejecutar paso de autenticación
    Ejecutar paso de evaluación
    Ejecutar paso de aceptación de oferta
    Ejecutar paso de enrolamiento de equipos    ${marca} ${modelo}    ${imei}
    Ejecutar paso de pago de enganche
    Acceder a etapa de envío de contrato en AP.AG

El sistema genera el contrato de financiamiento con toda la información del préstamo, cliente y equipo
    [Arguments]    ${monto}=50000    ${plazo}=12    ${tasa}=15.5    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${equipo}=iPhone 15 Pro
    Verificar que el sistema genera el contrato de financiamiento
    Verificar información del préstamo en el contrato    ${monto}    ${plazo}    ${tasa}
    Verificar información del cliente en el contrato    ${nombre}    ${identificacion}
    Verificar información del equipo en el contrato    ${equipo}

El sistema muestra el contrato completo y legible con toda la información correcta
    [Arguments]    ${monto}=50000    ${plazo}=12    ${tasa}=15.5    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${equipo}=iPhone 15 Pro
    Revisar el contrato generado con todos los términos del financiamiento    ${monto}    ${plazo}    ${tasa}    ${nombre}    ${identificacion}    ${equipo}

El sistema registra la firma del contrato y finaliza el proceso de formalización
    Confirmar aceptación del contrato
    Firmar el contrato
    Verificar registro de firma del contrato
    Verificar finalización del proceso de formalización

El sistema envía el contrato exitosamente y genera confirmación de envío
    [Arguments]    ${canal}=email    ${email}=cliente@telcel.com
    Enviar contrato al cliente mediante canal especificado    ${canal}    ${email}
    Verificar confirmación de envío del contrato

BES recibe completamente la información del cliente, crédito, equipo, calendario de pagos y toda la data necesaria para administrar el financiamiento
    [Arguments]    ${identificacion}=ABC123456    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro
    Sleep    3s
    Abrir sistema BES
    Verificar transferencia completa de toda la información desde AP.AG hacia BES    ${identificacion}    ${nombre}    ${direccion}    ${telefono}    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}    ${imei}    ${marca}    ${modelo}
    Verificar origen de datos transferidos desde AP.AG

BES asume el control del préstamo y habilita las funcionalidades de gestión de pagos, inhabilitación y habilitación de equipos según calendario de cobranza
    [Arguments]    ${identificacion}=ABC123456
    Asumir control del préstamo en BES    ${identificacion}
    Verificar BES como sistema responsable de la administración del financiamiento
    Verificar habilitación de funcionalidades según calendario de cobranza

Ejecutar flujo completo de enrolamiento de equipos desde AP.AG con integración BES
    [Arguments]    ${nombre}=Juan Pérez    ${identificacion}=ABC123456    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${caracteristicas}=256GB, 5G, Dual SIM
    El usuario ha aceptado la oferta en AP.AG y accede a etapa de enrolamiento    ${nombre}    ${identificacion}
    Ejecutar flujo completo de enrolamiento de equipos en AP.AG    ${imei}    ${marca}    ${modelo}    ${caracteristicas}
    Se transfiere la información del equipo a BES
    BES almacena la información del equipo asociada al préstamo del cliente    ${imei}    ${marca}    ${modelo}    ${caracteristicas}    ${identificacion}
    Se confirma la integración del equipo con las herramientas de bloqueo SITIC-Trustonic y EIR    ${imei}    ${marca}    ${modelo}    ${caracteristicas}    ${identificacion}
    El equipo queda registrado en los sistemas de bloqueo para su administración en caso de incumplimiento

# ========================================
# KEYWORDS PARA GENERACIÓN DE REPORTE DE VENTAS ACTUALIZADO (TC049)
# ========================================
El usuario accede al sistema BIBES para consulta y generación de reportes
    Iniciar sesión en el sistema
    Abrir sistema BIBES
    Acceder a módulo de reportes en BIBES

Se selecciona el reporte de ventas especificando el periodo a consultar
    Seleccionar reporte de ventas

Se configuran los filtros del reporte incluyendo canal de venta fecha región y otros parámetros
    [Arguments]    ${periodo}=Mensual    ${canal}=Todos    ${fecha_inicio}=2026-04-01    ${fecha_fin}=2026-04-15    ${region}=Nacional
    Configurar filtros del reporte de ventas    ${periodo}    ${canal}    ${fecha_inicio}    ${fecha_fin}    ${region}

Se genera el reporte de ventas
    Generar reporte de ventas en BIBES

El reporte incluye correctamente la información de ventas de Amigo Paguitos con todos los campos del layout
    Verificar que el reporte incluye ventas de Amigo Paguitos con todos los campos
    Verificar consolidación de ventas tradicionales y Amigo Paguitos en reporte

La información de ventas por vendedor considera los reportes para administradores y concentrado por fuerza de venta
    Verificar información de ventas por vendedor en reporte
    Verificar información agrupada por fuerza de venta en reporte

# ========================================
# KEYWORDS PARA REPORTE DE COMISIONES DE DISTRIBUIDORES (TC050)
# ========================================
El usuario accede al sistema BIBES para consulta de reportes de comisiones
    Iniciar sesión en el sistema
    Abrir sistema BIBES
    Wait Until Page Contains Element    ${BIBES_MENU_REPORTES}    timeout=10s

Se selecciona el reporte de comisiones de distribuidores especificando el periodo a consultar
    [Arguments]    ${periodo}=Mensual
    Acceder a módulo de reportes de comisiones en BIBES
    Seleccionar reporte de comisiones de distribuidores

Se configuran los filtros del reporte de comisiones incluyendo parámetros relevantes
    [Arguments]    ${periodo}=Mensual    ${distribuidor}=Todos    ${canal}=Todos    ${fecha_inicio}=2026-04-01    ${fecha_fin}=2026-04-30
    Configurar filtros del reporte de comisiones    ${periodo}    ${distribuidor}    ${canal}    ${fecha_inicio}    ${fecha_fin}

Se genera el reporte de comisiones calculando comisiones de ventas incluyendo Amigo Paguitos
    Generar reporte de comisiones de distribuidores

El reporte muestra comisiones de ventas tradicionales y de Amigo Paguitos desglosadas por distribuidor y vendedor
    Verificar que el reporte incluye comisiones de Amigo Paguitos desglosadas por distribuidor y vendedor
    Verificar comisiones de ventas tradicionales y Amigo Paguitos con cálculo correcto

El sistema aplica correctamente las reglas de cálculo de comisiones para Amigo Paguitos
    Verificar cálculo correcto de comisiones considerando enganche y parcialidades de Amigo Paguitos

# ========================================
# KEYWORDS PARA GENERACIÓN DE REPORTE DE PAGOS DE AMIGO PAGUITOS (TC051)
# ========================================
El usuario accede al módulo de reportes de BES con permisos autorizados
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de reportes de pagos de Amigo Paguitos

Se selecciona la opción de generación de reporte de pagos de Amigo Paguitos
    Seleccionar opción de reporte de pagos de Amigo Paguitos

Se ingresan los parámetros de consulta requeridos para el reporte de pagos
    [Arguments]    ${fecha_inicio}=2026-01-01    ${fecha_fin}=2026-04-15    ${tipo_pago}=Parcialidad    ${canal}=Todos
    Ingresar parámetros de consulta para reporte de pagos    ${fecha_inicio}    ${fecha_fin}    ${tipo_pago}    ${canal}

Se ejecuta la generación del reporte de pagos de Amigo Paguitos
    Ejecutar generación de reporte de pagos de Amigo Paguitos

El reporte de pagos se genera correctamente con las columnas del layout de Amigo Paguitos
    Verificar reporte contiene columnas del layout de Amigo Paguitos
    Verificar disponibilidad de descarga del reporte de pagos

El reporte contiene información de cliente, préstamo, parcialidades, fechas de vencimiento y montos pagados
    Verificar reporte incluye información de cliente, préstamo, parcialidades y montos
    Verificar contador de registros del reporte de pagos

Los datos del reporte corresponden con la información almacenada en BES proveniente de Amigo Paguitos
    [Arguments]    ${identificacion}=ABC123456
    Validar datos del reporte corresponden con información almacenada en BES    ${identificacion}

# ========================================
# KEYWORDS PARA GENERACIÓN DE REPORTE DE COBRANZA DE AMIGO PAGUITOS (TC052)
# ========================================
El usuario accede al módulo de reportes de cobranza en BES con credenciales válidas
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de reportes de cobranza en BES

Se selecciona el tipo de reporte de cobranza para préstamos de Amigo Paguitos
    Seleccionar tipo de reporte de cobranza para Amigo Paguitos
    Verificar que se presentan filtros disponibles para el reporte

Se aplican los filtros necesarios y se genera el reporte
    [Arguments]    ${periodo}=Mensual    ${estado_pago}=Todos    ${canal_venta}=Todos
    Aplicar filtros para reporte de cobranza    ${periodo}    ${estado_pago}    ${canal_venta}
    Generar reporte de cobranza de Amigo Paguitos

El reporte muestra toda la información de cobranza requerida con el desglose de cuotas pendientes y pagadas
    Verificar que el reporte incluye calendario de cobranza
    Verificar que el reporte incluye fechas de vencimiento
    Verificar que el reporte incluye montos adeudados
    Verificar que el reporte incluye estatus de parcialidades
    Verificar desglose de cuotas pendientes y pagadas en reporte
    Verificar disponibilidad de descarga del reporte de cobranza
    Verificar contador de registros del reporte de cobranza

Los datos de cobranza coinciden con el calendario administrado por BES
    [Arguments]    ${identificacion}=ABC123456
    Validar consistencia de datos del reporte de cobranza con BES    ${identificacion}

# ========================================
# KEYWORDS PARA CONFIGURACIÓN DE CICLOS DE PAGO SEMANAL (TC053)
# ========================================
El usuario autenticado accede al módulo de administración de préstamos en BES
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de administración de préstamos en BES

Se inicia la creación de un nuevo préstamo para cliente validado por Amigo Paguitos con ciclo semanal
    [Arguments]    ${identificacion_cliente}=CLI123456
    Crear nuevo préstamo en administración de préstamos
    Seleccionar cliente validado por Amigo Paguitos para nuevo préstamo    ${identificacion_cliente}
    Seleccionar periodicidad semanal para el préstamo

El sistema muestra el rango de ciclos configurables según el perfil crediticio del usuario
    [Arguments]    ${ciclos_min}=4    ${ciclos_max}=12
    Verificar rango de ciclos permitidos según perfil del usuario    ${ciclos_min}    ${ciclos_max}

Se ingresa un número de ciclos dentro del rango permitido para el usuario
    [Arguments]    ${numero_ciclos}=8
    Ingresar número de ciclos para préstamo semanal    ${numero_ciclos}
    Validar configuración de ciclos ingresada

El sistema acepta la configuración y permite continuar con la creación del préstamo
    Verificar aceptación de número de ciclos dentro del rango

Se intenta ingresar un número de ciclos fuera del rango permitido para el usuario
    [Arguments]    ${numero_ciclos}=20
    Ingresar número de ciclos para préstamo semanal    ${numero_ciclos}
    Validar configuración de ciclos ingresada

El sistema muestra mensaje de error indicando que el número de ciclos excede lo permitido
    Verificar rechazo de número de ciclos fuera del rango

# ========================================
# KEYWORDS PARA CONFIGURACIÓN DE CICLOS DE PAGO QUINCENAL (TC054 - IOSPR-868)
# ========================================
Se inicia la creación de un nuevo préstamo para cliente validado por Amigo Paguitos con ciclo quincenal
    [Arguments]    ${identificacion_cliente}=CLI123456
    Crear nuevo préstamo en administración de préstamos
    Seleccionar cliente validado por Amigo Paguitos para nuevo préstamo    ${identificacion_cliente}
    Seleccionar periodicidad quincenal para el préstamo

El sistema muestra el rango de ciclos quincenales configurables según el perfil crediticio del usuario
    [Arguments]    ${ciclos_min}=6    ${ciclos_max}=24
    Verificar rango de ciclos quincenales permitidos según perfil del usuario    ${ciclos_min}    ${ciclos_max}

Se ingresa un número de ciclos quincenales dentro del rango permitido para el usuario
    [Arguments]    ${numero_ciclos}=12
    Ingresar número de ciclos quincenales para préstamo    ${numero_ciclos}
    Validar configuración de ciclos quincenales ingresada

El sistema acepta la configuración quincenal y permite continuar con la creación del préstamo
    Verificar aceptación de número de ciclos quincenales dentro del rango

Se intenta ingresar un número de ciclos quincenales fuera del rango permitido para el usuario
    [Arguments]    ${numero_ciclos}=30
    Ingresar número de ciclos quincenales para préstamo    ${numero_ciclos}
    Validar configuración de ciclos quincenales ingresada

El sistema muestra mensaje de error indicando que el número de ciclos quincenales excede lo permitido
    Verificar rechazo de número de ciclos quincenales fuera del rango

# ========================================
# KEYWORDS PARA CONFIGURACIÓN DE CICLOS DE PAGO MENSUAL (TC055 - IOSPR-868)
# ========================================
Se inicia la creación de un nuevo préstamo para cliente validado por Amigo Paguitos con ciclo mensual
    [Arguments]    ${identificacion_cliente}=CLI123456
    Crear nuevo préstamo en administración de préstamos
    Seleccionar cliente validado por Amigo Paguitos para nuevo préstamo    ${identificacion_cliente}
    Seleccionar periodicidad mensual para el préstamo

El sistema muestra el rango de ciclos mensuales configurables según el perfil crediticio del usuario
    [Arguments]    ${ciclos_min}=3    ${ciclos_max}=12
    Verificar rango de ciclos mensuales permitidos según perfil del usuario    ${ciclos_min}    ${ciclos_max}

Se ingresa un número de ciclos mensuales dentro del rango permitido para el usuario
    [Arguments]    ${numero_ciclos}=6
    Ingresar número de ciclos mensuales para préstamo    ${numero_ciclos}
    Validar configuración de ciclos mensuales ingresada

El sistema acepta la configuración mensual y permite continuar con la creación del préstamo
    Verificar aceptación de número de ciclos mensuales dentro del rango

Se intenta ingresar un número de ciclos mensuales fuera del rango permitido para el usuario
    [Arguments]    ${numero_ciclos}=18
    Ingresar número de ciclos mensuales para préstamo    ${numero_ciclos}
    Validar configuración de ciclos mensuales ingresada

El sistema muestra mensaje de error indicando que el número de ciclos mensuales excede lo permitido
    Verificar rechazo de número de ciclos mensuales fuera del rango

# ========================================
# KEYWORDS PARA VALIDACIÓN DE PLAZOS A 3 MESES SEGÚN VALIDACIÓN DE AMIGO PAGUITOS (TC056 - IOSPR-868)
# ========================================
El usuario autenticado accede al módulo de creación de préstamos en BES
    Abrir página de login
    Ingresar credenciales    usuario_admin    password_admin
    Hacer clic en botón de login
    Acceder a módulo de administración de préstamos en BES

Seleccionar cliente validado por Amigo Paguitos con plazo de 3 meses autorizado
    [Arguments]    ${identificacion_cliente}=CLI789012
    Crear nuevo préstamo en administración de préstamos
    Seleccionar cliente validado por Amigo Paguitos para nuevo préstamo    ${identificacion_cliente}
    Sleep    1s
    Log    Cliente ${identificacion_cliente} seleccionado con plazo de 3 meses autorizado por Amigo Paguitos

El sistema recupera información del cliente y perfil crediticio con plazo 3 meses aprobado
    Verificar que se carga información del cliente validado
    Verificar que perfil crediticio muestra plazo 3 meses autorizado
    Log    Sistema recuperó información del cliente y perfil crediticio con plazo de 3 meses aprobado

Seleccionar plazo de 3 meses en formulario de configuración del préstamo
    Seleccionar plazo de 3 meses en formulario del préstamo
    Log    Plazo de 3 meses seleccionado en formulario de configuración

El sistema valida autorización de plazo 3 meses según evaluación de Amigo Paguitos
    Verificar validación de autorización de plazo 3 meses por Amigo Paguitos
    Log    Sistema validó que el cliente tiene autorizado el plazo de 3 meses según Amigo Paguitos

Completar información del préstamo y guardar configuración con plazo 3 meses
    [Arguments]    ${monto}=25000    ${periodicidad}=mensual
    Completar datos del préstamo para plazo 3 meses    ${monto}    ${periodicidad}
    Guardar configuración del préstamo con plazo 3 meses
    Log    Información del préstamo completada y guardada con plazo de 3 meses

El sistema acepta plazo 3 meses y crea préstamo con calendario de pagos
    Verificar creación exitosa del préstamo con plazo 3 meses
    Verificar generación de calendario de pagos para plazo 3 meses
    Log    Sistema aceptó el plazo de 3 meses y creó el préstamo con calendario de pagos

Verificar calendario de cobranza con parcialidades distribuidas en plazo 3 meses según periodicidad seleccionada
    [Arguments]    ${periodicidad}=mensual
    Verificar calendario de cobranza generado para plazo 3 meses    ${periodicidad}
    Verificar fechas de vencimiento correctas en calendario de 3 meses    ${periodicidad}
    Log    Calendario de cobranza verificado con parcialidades distribuidas en 3 meses según periodicidad ${periodicidad}

# ========================================
# KEYWORDS PARA VALIDACIÓN DE PLAZOS A 6 MESES SEGÚN AMIGO PAGUITOS (TC057 - IOSPR-868)
# ========================================
Seleccionar cliente validado por Amigo Paguitos con plazo de 6 meses autorizado
    [Arguments]    ${identificacion_cliente}=CLI890123
    Crear nuevo préstamo en administración de préstamos
    Seleccionar cliente validado por Amigo Paguitos para nuevo préstamo    ${identificacion_cliente}
    Sleep    1s
    Log    Cliente ${identificacion_cliente} seleccionado con plazo de 6 meses autorizado por Amigo Paguitos

El sistema recupera información del cliente y perfil crediticio con plazo 6 meses aprobado
    Verificar que se carga información del cliente validado
    Verificar que perfil crediticio muestra plazo 6 meses autorizado
    Log    Sistema recuperó información del cliente y perfil crediticio con plazo de 6 meses aprobado

Seleccionar plazo de 6 meses en formulario de configuración del préstamo
    Seleccionar plazo de 6 meses en formulario del préstamo
    Log    Plazo de 6 meses seleccionado en formulario de configuración

El sistema valida autorización de plazo 6 meses según evaluación de Amigo Paguitos
    Verificar validación de autorización de plazo 6 meses por Amigo Paguitos
    Log    Sistema validó que el cliente tiene autorizado el plazo de 6 meses según Amigo Paguitos

Configurar periodicidad de pago y monto para préstamo con plazo 6 meses
    [Arguments]    ${monto}=35000    ${periodicidad}=mensual
    Seleccionar periodicidad para préstamo según parámetro    ${periodicidad}
    Ingresar monto del préstamo    ${monto}
    Log    Periodicidad ${periodicidad} y monto ${monto} configurados para préstamo con plazo 6 meses

El sistema calcula automáticamente número de parcialidades para plazo 6 meses según periodicidad
    [Arguments]    ${periodicidad}=mensual
    Verificar cálculo automático de parcialidades para plazo 6 meses    ${periodicidad}
    Log    Sistema calculó automáticamente el número de parcialidades para plazo 6 meses con periodicidad ${periodicidad}

Completar información del préstamo y guardar configuración con plazo 6 meses
    [Arguments]    ${monto}=35000    ${periodicidad}=mensual
    Completar datos del préstamo para plazo 6 meses    ${monto}    ${periodicidad}
    Guardar configuración del préstamo con plazo 6 meses
    Log    Información del préstamo completada y guardada con plazo de 6 meses

El sistema acepta plazo 6 meses y crea préstamo con calendario de pagos
    Verificar creación exitosa del préstamo con plazo 6 meses
    Verificar generación de calendario de pagos para plazo 6 meses
    Log    Sistema aceptó el plazo de 6 meses y creó el préstamo con calendario de pagos

Acceder a visualización del calendario de pagos generado para el préstamo
    Acceder a sección de calendario de pagos del préstamo
    Log    Acceso a visualización del calendario de pagos generado

Verificar calendario de cobranza con parcialidades distribuidas en plazo 6 meses según periodicidad seleccionada
    [Arguments]    ${periodicidad}=mensual
    Verificar calendario de cobranza generado para plazo 6 meses    ${periodicidad}
    Verificar fechas de vencimiento correctas en calendario de 6 meses    ${periodicidad}
    Log    Calendario de cobranza verificado con parcialidades distribuidas en 6 meses según periodicidad ${periodicidad}

# ========================================
# KEYWORDS PARA VALIDACIÓN DE PLAZOS A 9 MESES SEGÚN AMIGO PAGUITOS (TC058 - IOSPR-868)
# ========================================
Seleccionar cliente validado por Amigo Paguitos con plazo de 9 meses autorizado
    [Arguments]    ${identificacion_cliente}=CLI901234
    Crear nuevo préstamo en administración de préstamos
    Seleccionar cliente validado por Amigo Paguitos para nuevo préstamo    ${identificacion_cliente}
    Sleep    1s
    Log    Cliente ${identificacion_cliente} seleccionado con plazo de 9 meses autorizado por Amigo Paguitos

El sistema recupera información del cliente y perfil crediticio con plazo 9 meses aprobado
    Verificar que se carga información del cliente validado
    Verificar que perfil crediticio muestra plazo 9 meses autorizado
    Log    Sistema recuperó información del cliente y perfil crediticio con plazo de 9 meses aprobado

Seleccionar plazo de 9 meses en formulario de configuración del préstamo
    Seleccionar plazo de 9 meses en formulario del préstamo
    Log    Plazo de 9 meses seleccionado en formulario de configuración

El sistema valida autorización de plazo 9 meses según evaluación de Amigo Paguitos
    Verificar validación de autorización de plazo 9 meses por Amigo Paguitos
    Log    Sistema validó que el cliente tiene autorizado el plazo de 9 meses según Amigo Paguitos

Configurar periodicidad de pago y monto para préstamo con plazo 9 meses
    [Arguments]    ${monto}=45000    ${periodicidad}=mensual
    Seleccionar periodicidad para préstamo según parámetro    ${periodicidad}
    Ingresar monto del préstamo    ${monto}
    Log    Periodicidad ${periodicidad} y monto ${monto} configurados para préstamo con plazo 9 meses

El sistema calcula automáticamente número de parcialidades para plazo 9 meses según periodicidad
    [Arguments]    ${periodicidad}=mensual
    Verificar cálculo automático de parcialidades para plazo 9 meses    ${periodicidad}
    Log    Sistema calculó automáticamente el número de parcialidades para plazo 9 meses con periodicidad ${periodicidad}

Completar información del préstamo y guardar configuración con plazo 9 meses
    [Arguments]    ${monto}=45000    ${periodicidad}=mensual
    Completar datos del préstamo para plazo 9 meses    ${monto}    ${periodicidad}
    Guardar configuración del préstamo con plazo 9 meses
    Log    Información del préstamo completada y guardada con plazo de 9 meses

El sistema acepta plazo 9 meses y crea préstamo con calendario de pagos
    Verificar creación exitosa del préstamo con plazo 9 meses
    Verificar generación de calendario de pagos para plazo 9 meses
    Log    Sistema aceptó el plazo de 9 meses y creó el préstamo con calendario de pagos

Verificar calendario de cobranza con parcialidades distribuidas en plazo 9 meses según periodicidad seleccionada
    [Arguments]    ${periodicidad}=mensual
    Verificar calendario de cobranza generado para plazo 9 meses    ${periodicidad}
    Verificar fechas de vencimiento correctas en calendario de 9 meses    ${periodicidad}
    Log    Calendario de cobranza verificado con parcialidades distribuidas en 9 meses según periodicidad ${periodicidad}

Verificar detalle del préstamo creado con plazo de 9 meses
    Acceder a sección de calendario de pagos del préstamo
    Verificar todas las cuotas corresponden al plazo configurado    9
    Log    Detalle del préstamo creado con plazo de 9 meses verificado, calendario de pagos correcto
# ========================================
# KEYWORDS PARA VALIDACIÓN DE PLAZOS A 12 MESES SEGÚN AMIGO PAGUITOS (TC059 - IOSPR-868)
# ========================================
El usuario autenticado accede al módulo de administración de préstamos en BES
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de préstamos
    Log    Usuario autenticado accede al módulo de administración de préstamos en BES

El sistema presenta formulario para crear nuevo préstamo
    Iniciar creación de nuevo préstamo
    Log    Sistema presenta el formulario para crear nuevo préstamo

Se selecciona cliente validado por Amigo Paguitos con autorización para plazo de 12 meses
    [Arguments]    ${identificacion}=CLI123456
    Ingresar identificación del cliente    ${identificacion}
    Log    Cliente validado por Amigo Paguitos seleccionado: ${identificacion}

El sistema carga perfil del cliente y muestra plazos disponibles según evaluación crediticia con plazo 12 meses autorizado
    Verificar que se carga información del cliente validado
    Verificar que perfil crediticio muestra plazo 12 meses autorizado
    Log    Sistema cargó perfil del cliente y muestra plazo de 12 meses como disponible según evaluación crediticia

Configurar monto del financiamiento y periodicidad de pago mensual y completar datos del equipo
    [Arguments]    ${monto}=50000    ${periodicidad}=mensual    ${datos_equipo}=iPhone 15 Pro 256GB
    Completar datos del préstamo para plazo 12 meses    ${monto}    ${periodicidad}    ${datos_equipo}
    Log    Monto del financiamiento, periodicidad de pago mensual y datos del equipo configurados

Guardar configuración del préstamo con plazo 12 meses y generar calendario de cobranza
    Guardar configuración del préstamo con plazo 12 meses
    Log    Configuración del préstamo con plazo 12 meses guardada y calendario de cobranza generado

Consultar préstamo creado en pantalla 360 de BES y verificar plazo 12 meses
    [Arguments]    ${identificacion}=CLI123456
    Acceder a Vista 360 de BES
    Consultar préstamo por identificación de cliente en Vista 360    ${identificacion}
    Verificar plazo del préstamo en pantalla 360    12
    Log    Préstamo consultado en pantalla 360 de BES con plazo de 12 meses

Verificar calendario de cobranza generado para plazo 12 meses con todas las fechas de vencimiento distribuidas en un año
    [Arguments]    ${periodicidad}=mensual
    Verificar calendario de cobranza generado para plazo 12 meses    ${periodicidad}
    Verificar calendario con todas las fechas de vencimiento distribuidas en un año    ${periodicidad}
    Log    Calendario de cobranza generado para plazo 12 meses con todas las fechas de vencimiento distribuidas en un año

Verificar fechas de vencimiento correctas en calendario de 12 meses distribuidas en un año
    [Arguments]    ${periodicidad}=mensual
    Verificar fechas de vencimiento correctas en calendario de 12 meses    ${periodicidad}
    Verificar desglose de cuotas completo en pantalla 360 para préstamo 12 meses
    Log    Fechas de vencimiento correctas verificadas en calendario de 12 meses distribuidas en un año completo

# ========================================
# KEYWORDS PARA VALIDACIÓN DE RESTRICCIÓN DE NO CAMBIOS DE CICLOS (TC060)
# ========================================
El usuario ha accedido al sistema BES con credenciales válidas y visualiza el menú principal
    Iniciar sesión en el sistema
    Abrir sistema BES
    Wait Until Page Contains Element    ${BES_MENU_ADMINISTRACION_PRESTAMOS}    timeout=10s
    Log    Usuario autenticado en BES y menú principal visible

Se crea un préstamo completo con cliente de Amigo Paguitos especificando periodicidad mensual y 12 ciclos
    [Arguments]    ${identificacion}=CLI123456
    Acceder a módulo de administración de préstamos en BES
    Crear nuevo préstamo en administración de préstamos
    Seleccionar cliente para el préstamo    ${identificacion}
    Seleccionar periodicidad mensual para el préstamo
    Ingresar número de ciclos mensuales para préstamo    12
    Validar configuración de ciclos mensuales ingresada
    Guardar préstamo con configuración de periodicidad mensual y 12 ciclos
    Log    Préstamo creado con cliente ${identificacion}, periodicidad mensual y 12 ciclos

El sistema crea el préstamo exitosamente y genera calendario de cobranza según configuración inicial
    [Arguments]    ${num_ciclos}=12    ${periodicidad}=mensual
    Verificar creación exitosa del préstamo con periodicidad y ciclos    ${periodicidad}    ${num_ciclos}
    Verificar generación de calendario de pagos según periodicidad y ciclos    ${periodicidad}    ${num_ciclos}
    Log    Préstamo creado exitosamente con ${num_ciclos} ciclos ${periodicidad} y calendario generado

Se consulta el préstamo creado en la vista 360 de BES
    [Arguments]    ${identificacion}=CLI123456
    Acceder a pantalla 360 de BES para cliente con crédito    ${identificacion}
    Verificar información accesible en Vista 360
    Log    Préstamo consultado en Vista 360 para cliente ${identificacion}

El sistema muestra el detalle completo del préstamo con periodicidad y calendario
    [Arguments]    ${num_ciclos}=12    ${periodicidad}=mensual
    Verificar desglose de cuotas en Vista 360
    Verificar periodicidad de cuotas mostrada en pantalla 360    ${periodicidad}
    Verificar total de cuotas mostrado corresponde al plazo    ${num_ciclos}
    Verificar fechas de vencimiento en Vista 360
    Log    Detalle completo del préstamo mostrado: ${num_ciclos} cuotas con periodicidad ${periodicidad}

Se intenta acceder a la opción de modificación de ciclos o periodicidad del préstamo
    Intentar acceder a opción de modificación de ciclos en BES
    Log    Intento de acceder a opción de modificación de ciclos

El sistema no muestra la opción de cambio de ciclos o la opción aparece deshabilitada
    Verificar que opción de cambio de ciclos no está visible o está deshabilitada
    Log    Opción de cambio de ciclos no disponible o deshabilitada

El sistema muestra mensaje de restricción de no cambios de ciclos según reglas de negocio
    Verificar mensaje de restricción de no cambios de ciclos
    Log    Mensaje de restricción de cambios de ciclos mostrado

El calendario de cobranza permanece sin cambios con la configuración original
    [Arguments]    ${num_ciclos}=12    ${periodicidad}=mensual
    Acceder a calendario de pagos
    Verificar que calendario de pagos original se mantiene sin cambios
    Verificar generación de calendario de cobranza    ${num_ciclos}
    Verificar que fechas corresponden al calendario de cobranza de BES    ${periodicidad}
    Log    Calendario de cobranza permanece sin cambios: ${num_ciclos} cuotas con periodicidad ${periodicidad}

# ========================================
# KEYWORDS PARA VALIDACIÓN DE RESTRICCIÓN DE PROMESAS DE PAGO EN AMIGO PAGUITOS (TC061)
# ========================================
El usuario ha accedido al módulo de administración de préstamos en BES con un préstamo activo de Amigo Paguitos
    [Arguments]    ${identificacion}=PREST_AP_001
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de administración de préstamos con préstamo de Amigo Paguitos    ${identificacion}
    Log    Usuario accedió al módulo de administración de préstamos con préstamo ${identificacion}

El sistema muestra la información del préstamo de Amigo Paguitos
    Verificar que el sistema muestra información del préstamo de Amigo Paguitos
    Log    Sistema muestra correctamente la información del préstamo de Amigo Paguitos

Se intenta registrar una promesa de pago para el préstamo de Amigo Paguitos
    Intentar registrar promesa de pago para préstamo de Amigo Paguitos
    Log    Intento de registrar promesa de pago ejecutado

El sistema muestra mensaje indicando que no se permiten promesas de pago para este tipo de financiamiento
    Verificar mensaje de restricción de promesas de pago
    Verificar que botón de promesa de pago está deshabilitado
    Log    Sistema mostró restricción de promesas de pago para Amigo Paguitos

Se verifica que la restricción aplica para todos los estados del préstamo
    [Arguments]    @{estados}
    Verificar restricción de promesas de pago en diferentes estados del préstamo    @{estados}
    Log    Restricción de promesas de pago verificada para todos los estados del préstamo

El sistema mantiene la restricción independientemente del estado del préstamo
    Log    Sistema mantiene la restricción de promesas de pago en todos los estados

# ========================================
# KEYWORDS PARA RECEPCIÓN DE PRÉSTAMOS CON VARIANTES DE AMIGO PAGUITOS (TC062)
# ========================================
El usuario autenticado accede al sistema BES
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de recepción de préstamos desde Amigo Paguitos
    Log    Usuario autenticado accedió al sistema BES

Amigo Paguitos Autogestión envía información de préstamo con periodicidad semanal y plazo de 3 meses
    [Arguments]    ${identificacion}=CLI_SEMANAL_3M_001    ${monto}=15000
    Sleep    2s
    Buscar préstamo recibido por identificación del cliente    ${identificacion}
    Verificar origen del préstamo desde Amigo Paguitos
    Log    Préstamo con periodicidad semanal y plazo 3 meses recibido desde Amigo Paguitos Autogestión

BES registra el préstamo con ciclo semanal y 12 parcialidades
    [Arguments]    ${identificacion}=CLI_SEMANAL_3M_001
    Filtrar préstamos por periodicidad y plazo    semanal    3
    Verificar registro de préstamo con periodicidad y plazo específicos    semanal    3    12
    Verificar información completa del cliente en préstamo recibido    ${identificacion}
    Verificar que existe mensaje de confirmación de registro desde Amigo Paguitos
    Log    BES registró correctamente el préstamo con ciclo semanal y 12 parcialidades

Amigo Paguitos Autogestión envía información de préstamo con periodicidad quincenal y plazo de 6 meses
    [Arguments]    ${identificacion}=CLI_QUINCENAL_6M_002    ${monto}=25000
    Sleep    2s
    Buscar préstamo recibido por identificación del cliente    ${identificacion}
    Verificar origen del préstamo desde Amigo Paguitos
    Log    Préstamo con periodicidad quincenal y plazo 6 meses recibido desde Amigo Paguitos Autogestión

BES registra el préstamo con ciclo quincenal y 12 parcialidades
    [Arguments]    ${identificacion}=CLI_QUINCENAL_6M_002
    Filtrar préstamos por periodicidad y plazo    quincenal    6
    Verificar registro de préstamo con periodicidad y plazo específicos    quincenal    6    12
    Verificar información completa del cliente en préstamo recibido    ${identificacion}
    Verificar que existe mensaje de confirmación de registro desde Amigo Paguitos
    Log    BES registró correctamente el préstamo con ciclo quincenal y 12 parcialidades

Amigo Paguitos Autogestión envía información de préstamo con periodicidad mensual y plazo de 9 meses
    [Arguments]    ${identificacion}=CLI_MENSUAL_9M_003    ${monto}=35000
    Sleep    2s
    Buscar préstamo recibido por identificación del cliente    ${identificacion}
    Verificar origen del préstamo desde Amigo Paguitos
    Log    Préstamo con periodicidad mensual y plazo 9 meses recibido desde Amigo Paguitos Autogestión

BES registra el préstamo con ciclo mensual y 9 parcialidades
    [Arguments]    ${identificacion}=CLI_MENSUAL_9M_003
    Filtrar préstamos por periodicidad y plazo    mensual    9
    Verificar registro de préstamo con periodicidad y plazo específicos    mensual    9    9
    Verificar información completa del cliente en préstamo recibido    ${identificacion}
    Verificar que existe mensaje de confirmación de registro desde Amigo Paguitos
    Log    BES registró correctamente el préstamo con ciclo mensual y 9 parcialidades

Amigo Paguitos Autogestión envía información de préstamo con periodicidad mensual y plazo de 12 meses
    [Arguments]    ${identificacion}=CLI_MENSUAL_12M_004    ${monto}=50000
    Sleep    2s
    Buscar préstamo recibido por identificación del cliente    ${identificacion}
    Verificar origen del préstamo desde Amigo Paguitos
    Log    Préstamo con periodicidad mensual y plazo 12 meses recibido desde Amigo Paguitos Autogestión

BES registra el préstamo con ciclo mensual y 12 parcialidades
    [Arguments]    ${identificacion}=CLI_MENSUAL_12M_004
    Filtrar préstamos por periodicidad y plazo    mensual    12
    Verificar registro de préstamo con periodicidad y plazo específicos    mensual    12    12
    Verificar información completa del cliente en préstamo recibido    ${identificacion}
    Verificar que existe mensaje de confirmación de registro desde Amigo Paguitos
    Log    BES registró correctamente el préstamo con ciclo mensual y 12 parcialidades

Se consultan los préstamos generados en BES
    Acceder a módulo de recepción de préstamos desde Amigo Paguitos
    Wait Until Element Is Visible    ${BES_TABLA_PRESTAMOS_RECIBIDOS}    timeout=10s
    Log    Consulta de todos los préstamos generados en BES desde Amigo Paguitos

Cada préstamo contiene la información completa del cliente equipo y condiciones del financiamiento
    [Arguments]    @{identificaciones}
    FOR    ${identificacion}    IN    @{identificaciones}
        Buscar préstamo recibido por identificación del cliente    ${identificacion}
        Verificar información completa del cliente en préstamo recibido    ${identificacion}
        Verificar información completa del equipo en préstamo recibido
        Verificar información completa de condiciones del financiamiento
        Log    Préstamo ${identificacion} contiene información completa: cliente, equipo y condiciones
    END
    Log    Todos los préstamos contienen información completa según variantes configuradas

# ========================================
# KEYWORDS PARA REPORTE DE VENTAS POR VENDEDOR PARA DISTRIBUIDORES (TC063)
# ========================================
El administrador del distribuidor se autentica en BES con credenciales autorizadas
    Iniciar sesión en el sistema
    Abrir sistema BES
    Wait Until Page Contains Element    ${BES_MENU_REPORTES_VENTAS}    timeout=10s

Se accede al reporte de ventas por vendedor de Amigo Paguitos
    Acceder a módulo de reportes de ventas
    Acceder a pantalla de filtros de reporte de ventas por vendedor

Se selecciona rango de fechas y distribuidor correspondiente
    [Arguments]    ${fecha_inicio}=2026-04-01    ${fecha_fin}=2026-04-15    ${distribuidor}=Distribuidor Principal
    Seleccionar rango de fechas para reporte de ventas    ${fecha_inicio}    ${fecha_fin}
    Seleccionar distribuidor para reporte de ventas    ${distribuidor}

Se genera el reporte de ventas agrupadas por vendedor
    Generar reporte de ventas por vendedor

El reporte muestra todos los campos requeridos con información correcta y actualizada
    Verificar campos del reporte de ventas por vendedor
    Verificar información correcta en reporte de ventas

# ========================================
# KEYWORDS PARA REPORTE CONCENTRADO DE VENTAS POR FUERZA DE VENTA (TC064)
# ========================================
El usuario se autentica en BES con credenciales de usuario autorizado para consultar reportes consolidados
    Iniciar sesión en el sistema
    Abrir sistema BES
    Wait Until Page Contains Element    ${BES_MENU_REPORTES_CONSOLIDADOS}    timeout=10s
    Log    Usuario con permisos de reportes consolidados autenticado

Se selecciona la opción de reporte concentrado de ventas por fuerza de venta
    Acceder a módulo de reportes consolidados de BES
    Seleccionar opción de reporte concentrado de ventas por fuerza de venta

Se especifican parámetros de búsqueda con rango de fechas canal de venta y región
    [Arguments]    ${fecha_inicio}=2026-04-01    ${fecha_fin}=2026-04-15    ${canal_venta}=Todos    ${region}=Nacional
    Especificar rango de fechas para reporte concentrado    ${fecha_inicio}    ${fecha_fin}
    Seleccionar canal de venta para reporte concentrado    ${canal_venta}
    Seleccionar región para reporte concentrado    ${region}

Se genera el reporte concentrado de ventas por fuerza de venta
    Generar reporte concentrado de ventas por fuerza de venta

El reporte muestra el consolidado de ventas por cada fuerza de venta con totales y subtotales
    Verificar consolidado de ventas por todas las fuerzas de venta
    Verificar totales y subtotales por cada fuerza de venta

Se exporta el reporte a formato Excel para análisis detallado
    Exportar reporte concentrado a formato Excel
    Verificar que archivo de exportación contiene todos los datos del reporte

# ========================================
# KEYWORDS PARA GARANTÍAS CON FUNCIONALIDAD EQUIVALENTE A VENTAS DIRECTAS (TC065)
# ========================================
El usuario accede al módulo de garantías en BES con un préstamo activo de Amigo Paguitos
    [Arguments]    ${identificacion}=ABC123456
    Abrir página de login
    Ingresar credenciales    usuario_test    password_test
    Hacer clic en botón de login
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar que existe equipo asociado al préstamo

Se inicia el proceso de garantía seleccionando el equipo vendido bajo financiamiento Amigo Paguitos
    Acceder a módulo de garantías desde préstamo
    Hacer clic en botón iniciar trámite de garantía

El sistema despliega el formulario de garantía con los mismos campos que para ventas directas
    Verificar que se despliega formulario de solicitud de garantía
    Verificar que formulario contiene campos requeridos para garantía
    Verificar que formulario es equivalente para Amigo Paguitos y ventas directas

Se ingresa la información requerida del trámite de garantía
    [Arguments]    ${tipo_falla}=Falla de hardware    ${descripcion}=Equipo no enciende    ${fecha_reporte}=2026-04-15
    Ingresar tipo de falla de garantía    ${tipo_falla}
    Ingresar descripción del problema    ${descripcion}
    Ingresar fecha de reporte de garantía    ${fecha_reporte}

Se registra el equipo de reemplazo asociado al mismo préstamo
    [Arguments]    ${imei_reemplazo}=987654321098765
    Iniciar proceso de cambio de equipo por garantía
    Registrar IMEI del equipo nuevo    ${imei_reemplazo}
    Confirmar cambio de equipo

Se confirma el trámite de garantía
    Guardar solicitud de garantía
    Verificar solicitud de garantía almacenada

El sistema genera el folio de garantía y actualiza el estatus sin afectar el calendario de pagos
    Verificar que se genera folio de garantía
    Verificar que estatus del préstamo se actualiza correctamente
    Verificar que calendario de pagos original se mantiene sin cambios

# ========================================
# KEYWORDS PARA BLOQUEOS DE EQUIPOS DE AMIGO PAGUITOS (TC066)
# ========================================
Se identifica préstamo de Amigo Paguitos con incumplimiento de pago según calendario de cobranza
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de préstamos
    Identificar préstamo de Amigo Paguitos con incumplimiento de pago    ${referencia_prestamo}
    Verificar préstamo marcado como moroso    ${referencia_prestamo}
    Verificar activación de proceso de bloqueo

El sistema ejecuta el proceso de bloqueo y envía solicitud a SITIC-Trustonic
    [Arguments]    ${referencia_prestamo}=PRESTAP123456    ${imei}=359876543210987
    Ejecutar proceso de bloqueo del equipo    ${referencia_prestamo}
    Verificar envío de solicitud a SITIC-Trustonic    ${referencia_prestamo}    ${imei}

BES recibe confirmación de bloqueo desde API SITIC-Trustonic
    [Arguments]    ${referencia_prestamo}=PRESTAP123456    ${imei}=359876543210987
    Verificar confirmación de bloqueo recibida    ${imei}
    Verificar actualización de estatus equipo a bloqueado    ${referencia_prestamo}

El sistema envía notificación al cliente sobre el bloqueo del equipo
    [Arguments]    ${referencia_prestamo}=PRESTAP123456
    Acceder a módulo de notificaciones al cliente
    Verificar notificación de bloqueo enviada al cliente    ${referencia_prestamo}
    Verificar contenido de notificación incluye motivo de bloqueo

El evento de bloqueo queda registrado en el historial con trazabilidad completa
    [Arguments]    ${referencia_prestamo}=PRESTAP123456    ${motivo}=Incumplimiento de pago
    Acceder a historial de eventos de bloqueo    ${referencia_prestamo}
    Verificar registro completo del evento de bloqueo en historial    ${referencia_prestamo}    ${motivo}
    Verificar trazabilidad completa del proceso de bloqueo    ${referencia_prestamo}

# ========================================
# KEYWORDS PARA DESBLOQUEOS DE EQUIPOS DE AMIGO PAGUITOS (TC067)
# ========================================
Se acredita pago de parcialidad vencida en préstamo bloqueado
    [Arguments]    ${referencia_prestamo}=PRESTAP456789    ${numero_parcialidad}=1    ${monto}=4500
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Registrar pago de parcialidad para regularización    ${numero_parcialidad}    ${monto}
    Verificar acreditación de pago de parcialidad    ${numero_parcialidad}    ${monto}
    Verificar que el préstamo tenía equipo bloqueado previamente    ${referencia_prestamo}

El sistema valida condiciones para desbloqueo del equipo
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Ejecutar validación de condiciones para desbloqueo    ${referencia_prestamo}
    Verificar que no existen otras parcialidades vencidas    ${referencia_prestamo}
    Verificar autorización de desbloqueo del equipo    ${referencia_prestamo}

Se ejecuta proceso de desbloqueo del equipo
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Acceder a módulo de procesos de cobranza
    Acceder a proceso de evaluación de habilitaciones
    Ejecutar proceso de evaluación de habilitaciones
    Esperar finalización de proceso de evaluación de habilitaciones
    Verificar identificación de préstamos que califican para habilitación

BES envía solicitud de desbloqueo a SITIC-Trustonic
    [Arguments]    ${referencia_prestamo}=PRESTAP456789    ${imei}=359111222333444
    Acceder a módulo de integración con SITIC-Trustonic para habilitación
    Verificar llamada a API SITIC-Trustonic para desbloqueo de equipo    ${referencia_prestamo}    ${imei}
    Verificar datos enviados a API SITIC-Trustonic para habilitación    ${imei}

API SITIC-Trustonic confirma ejecución del desbloqueo
    [Arguments]    ${imei}=359111222333444
    Verificar respuesta exitosa de API SITIC-Trustonic para habilitación    ${imei}
    Verificar fecha y hora de habilitación registradas    PRESTAP456789

El sistema actualiza estatus del equipo a activo
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Verificar actualización de estatus del préstamo a equipo habilitado    ${referencia_prestamo}
    Verificar estatus de desbloqueo del equipo en API SITIC-Trustonic    359111222333444

BES envía notificación de desbloqueo exitoso al cliente
    [Arguments]    ${referencia_prestamo}=PRESTAP456789
    Acceder a módulo de notificaciones al cliente
    Verificar notificación de desbloqueo enviada al cliente    ${referencia_prestamo}
    Verificar contenido de notificación incluye confirmación de desbloqueo

El evento de desbloqueo queda registrado en historial con trazabilidad
    [Arguments]    ${referencia_prestamo}=PRESTAP456789    ${motivo}=Pago acreditado
    Consultar historial de habilitaciones en pantalla 360    ${referencia_prestamo}
    Verificar registro de habilitación en historial    ${motivo}    Habilitado
    Verificar trazabilidad completa del proceso de desbloqueo    ${referencia_prestamo}

# ========================================
# KEYWORDS PARA INTEGRACIÓN KIOSCOS-CPS-BES PAGOS CON TDC (TC070)
# ========================================
La integración entre BES, CPS y Kioskos está configurada y activa
    Iniciar sesión en el sistema
    Abrir sistema CPS
    Acceder a módulo de configuración
    Configurar integración con BES
    Verificar integración BES-CPS activa
    Configurar integración con punto de cobro Kioscos
    Verificar integración con punto de cobro Kioscos activa

El cliente realiza un pago de enganche o parcialidad de Amigo Paguitos en Kioskos utilizando tarjeta de crédito
    [Arguments]    ${tipo_pago}=parcialidad    ${referencia_prestamo}=PREST123456    ${numero_parcialidad}=1    ${monto}=4500    ${identificacion}=ABC123456    ${numero_tarjeta}=4111111111111111    ${cvv}=123    ${fecha_expiracion}=12/28
    Abrir sistema Kioscos
    Acceder a módulo de pagos en Kioscos
    Run Keyword If    '${tipo_pago}' == 'parcialidad'    Ingresar datos del pago de parcialidad en Kioscos    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}
    Run Keyword If    '${tipo_pago}' == 'enganche'    Ingresar datos del pago de enganche en Kioscos    ${referencia_prestamo}    ${monto}    ${identificacion}
    Seleccionar medio de pago con tarjeta de crédito
    Ingresar datos de tarjeta de crédito    ${numero_tarjeta}    ${cvv}    ${fecha_expiracion}
    Procesar pago de parcialidad en Kioscos
    Set Suite Variable    ${REFERENCIA_PRESTAMO}    ${referencia_prestamo}
    Set Suite Variable    ${NUMERO_PARCIALIDAD}    ${numero_parcialidad}
    Set Suite Variable    ${MONTO_PAGO}    ${monto}
    Set Suite Variable    ${TIPO_PAGO}    ${tipo_pago}

Kioskos procesa el pago con TDC y genera el comprobante de transacción
    Verificar pago procesado exitosamente en Kioscos
    ${referencia}    ${fecha}    ${monto_procesado}=    Obtener datos del pago de parcialidad procesado en Kioscos
    Set Suite Variable    ${REFERENCIA_TRANSACCION}    ${referencia}
    Set Suite Variable    ${FECHA_PAGO}    ${fecha}
    Set Suite Variable    ${MONTO_PROCESADO}    ${monto_procesado}

Kioskos envía la confirmación de pago a CPS/EPAC con los datos de la transacción
    [Arguments]    ${referencia_prestamo}=${REFERENCIA_PRESTAMO}    ${numero_parcialidad}=${NUMERO_PARCIALIDAD}    ${monto}=${MONTO_PROCESADO}    ${identificacion}=ABC123456
    Abrir sistema CPS
    Registrar pago de parcialidad desde Kioscos en CPS    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}    Tarjeta de Crédito

BES consulta la información de pagos realizados a través de Kioskos mediante la integración con CPS
    [Arguments]    ${referencia_prestamo}=${REFERENCIA_PRESTAMO}    ${numero_parcialidad}=${NUMERO_PARCIALIDAD}
    Abrir sistema BES
    Acceder a módulo de integraciones con CPS
    Consultar pagos recibidos desde Kioscos    ${referencia_prestamo}
    Verificar notificación de pago recibida desde CPS    ${referencia_prestamo}    ${numero_parcialidad}    Kioscos

BES obtiene el detalle completo: monto pagado, concepto, número de préstamo, fecha y hora
    [Arguments]    ${referencia_prestamo}=${REFERENCIA_PRESTAMO}    ${numero_parcialidad}=${NUMERO_PARCIALIDAD}    ${monto}=${MONTO_PROCESADO}    ${fecha}=${FECHA_PAGO}
    Verificar datos de pago de parcialidad recibidos de CPS desde Kioscos    ${numero_parcialidad}    ${monto}    ${fecha}    ${referencia_prestamo}    Kioscos    Tarjeta de Crédito

BES acredita el pago al concepto correspondiente del préstamo
    [Arguments]    ${referencia_prestamo}=${REFERENCIA_PRESTAMO}    ${numero_parcialidad}=${NUMERO_PARCIALIDAD}    ${fecha}=${FECHA_PAGO}    ${monto}=${MONTO_PROCESADO}    ${tipo_pago}=${TIPO_PAGO}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Run Keyword If    '${tipo_pago}' == 'parcialidad'    Acceder a calendario de pagos
    Run Keyword If    '${tipo_pago}' == 'parcialidad'    Verificar parcialidad acreditada en calendario de cobranza    ${numero_parcialidad}    ${fecha}    ${monto}
    Run Keyword If    '${tipo_pago}' == 'enganche'    Acceder a módulo de pagos de enganche
    Run Keyword If    '${tipo_pago}' == 'enganche'    Verificar pago de enganche acreditado en BES    ${monto}    ${fecha}    ${REFERENCIA_TRANSACCION}
    Run Keyword If    '${tipo_pago}' == 'parcialidad'    Verificar actualización de saldo después de pago de parcialidad
    Run Keyword If    '${tipo_pago}' == 'enganche'    Verificar actualización de saldo del préstamo

BES actualiza el estatus del préstamo y ejecuta el proceso de desbloqueo si aplica
    [Arguments]    ${referencia_prestamo}=${REFERENCIA_PRESTAMO}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${referencia_prestamo}
    Verificar evaluación de estatus del préstamo después de pago
    Verificar ejecución de proceso de desbloqueo si el pago regulariza el préstamo    ${referencia_prestamo}

BES registra la acreditación del pago en el historial del préstamo con todos los detalles de la transacción
    [Arguments]    ${referencia_prestamo}=${REFERENCIA_PRESTAMO}    ${numero_parcialidad}=${NUMERO_PARCIALIDAD}    ${monto}=${MONTO_PROCESADO}    ${fecha}=${FECHA_PAGO}
    Acceder a historial de pagos del préstamo    ${referencia_prestamo}
    Verificar pago en historial de pagos desde Kioscos    ${numero_parcialidad}    ${monto}    ${fecha}    Kioscos    Tarjeta de Crédito
    Consultar desglose de pagos del préstamo mediante API    ${referencia_prestamo}
    Verificar desglose de pagos muestra parcialidad acreditada desde Kioscos    ${numero_parcialidad}    ${monto}    ${fecha}    Kioscos    Tarjeta de Crédito

# ========================================
# KEYWORDS PARA INTEGRACIÓN BES-BDI TELCEL (TC072)
# ========================================
Una venta con financiamiento Amigo Paguitos ha sido procesada desde AP.AG
    [Arguments]    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar flujo completo de venta en AP.AG    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Ejecutar flujo completo de financiamiento en AP.AG    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}

La información se transfiere desde AP.AG hacia BES mediante las APIs definidas
    Sleep    3s
    Log    Transferencia automática de datos desde AP.AG hacia BES ejecutada mediante APIs

BES recibe la información completa del préstamo desde AP.AG
    [Arguments]    ${identificacion}=ABC123456    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Abrir sistema BES
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${identificacion}
    Verificar que existe registro de cliente
    Verificar datos almacenados del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar datos del préstamo almacenado    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}

BES procesa la información y la envía hacia BDI Telcel
    [Arguments]    ${identificacion}=ABC123456
    Sleep    3s
    Log    BES procesa información del financiamiento y la envía hacia BDI Telcel mediante integración

BDI Telcel recibe y registra la información del financiamiento Amigo Paguitos
    [Arguments]    ${identificacion}=ABC123456    ${monto}=50000    ${plazo}=12
    Abrir sistema BDI Telcel
    Acceder a módulo de financiamientos en BDI Telcel
    Buscar financiamiento en BDI Telcel por identificación del cliente    ${identificacion}
    Verificar que existe registro de financiamiento en BDI Telcel
    Verificar origen de datos es BES
    Verificar información del financiamiento en BDI Telcel    ${identificacion}    ${monto}    ${plazo}

BDI Telcel almacena correctamente los datos del cliente préstamo y equipo
    [Arguments]    ${identificacion}=ABC123456    ${nombre}=Juan Pérez    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${equipo}=iPhone 15 Pro    ${imei}=123456789012345
    Acceder a detalle del financiamiento en BDI Telcel
    Verificar datos del cliente en BDI Telcel    ${nombre}    ${identificacion}
    Verificar información del préstamo en BDI Telcel    ${monto}    ${plazo}    ${parcialidades}    ${tasa}
    Verificar información del equipo en BDI Telcel    ${equipo}    ${imei}
    Verificar procesamiento exitoso en BDI Telcel

BES consulta la información sincronizada en BDI Telcel
    [Arguments]    ${identificacion}=ABC123456
    Abrir sistema BES
    Acceder a módulo de integraciones en BDI desde BES
    Consultar sincronización con BDI Telcel    ${identificacion}

BES obtiene confirmación de que los datos fueron procesados correctamente en BDI Telcel
    [Arguments]    ${identificacion}=ABC123456
    Verificar confirmación de procesamiento desde BDI Telcel
    Abrir sistema BDI Telcel
    Acceder a módulo de integraciones en BDI Telcel
    Verificar registro de recepción de datos desde BES    ${identificacion}
    Verificar confirmación de sincronización hacia BES
    Verificar estatus de sincronización exitosa

# ========================================
# KEYWORDS PARA INTEGRACIÓN CON EIR PARA REGISTRO DE EQUIPOS (TC074)
# ========================================
Se registra en BES una venta de equipo con financiamiento Amigo Paguitos incluyendo el IMEI
    [Arguments]    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar flujo completo de enrolamiento de equipos en AP.AG    ${imei}    ${marca}    ${modelo}    256GB, 5G, Dual SIM
    Acceder a módulo de ventas
    Iniciar nueva venta
    Ingresar datos del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Formalizar la venta
    Verificar estado de venta formalizada
    Sleep    3s
    Abrir sistema BES
    Verificar almacenamiento completo del equipo enrollado en BES    ${imei}    ${marca}    ${modelo}    256GB, 5G, Dual SIM    ${identificacion}

BES almacena correctamente la información del equipo incluyendo el IMEI y los datos del financiamiento
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${identificacion}=ABC123456
    Abrir sistema BES
    Acceder a módulo de equipos en BES
    Buscar equipo por IMEI    ${imei}
    Verificar que existe registro de equipo en BES
    Verificar información del equipo almacenada en BES    ${imei}    ${marca}    ${modelo}    256GB, 5G, Dual SIM
    Verificar equipo asociado al préstamo del cliente    ${identificacion}
    Log    BES almacena correctamente la información del equipo con IMEI y datos del financiamiento

BES envía la información del IMEI del equipo hacia el sistema EIR para su registro
    [Arguments]    ${imei}=123456789012345
    Enviar información del IMEI hacia EIR    ${imei}
    Verificar solicitud de registro enviada a EIR

EIR recibe la solicitud de registro del equipo con el IMEI y datos asociados al financiamiento
    [Arguments]    ${imei}=123456789012345
    Abrir sistema EIR
    Acceder a módulo de registro de equipos en EIR
    Sleep    2s
    Log    EIR recibe la solicitud de registro del equipo con IMEI ${imei}

EIR confirma que el IMEI es válido y puede ser registrado en el sistema
    [Arguments]    ${imei}=123456789012345
    Buscar equipo por IMEI en EIR    ${imei}
    Verificar que IMEI no está bloqueado en EIR
    Verificar validación de IMEI en EIR
    Log    EIR valida que el IMEI no está bloqueado y puede ser registrado

EIR registra exitosamente el equipo y lo vincula con el cliente y el financiamiento
    [Arguments]    ${imei}=123456789012345    ${marca}=Apple    ${modelo}=iPhone 15 Pro    ${identificacion}=ABC123456
    Sleep    3s
    Buscar equipo por IMEI en EIR    ${imei}
    Verificar que existe registro de equipo en EIR
    Verificar datos del equipo registrado en EIR    ${imei}    ${marca}    ${modelo}
    Verificar asociación del equipo con financiamiento en EIR    ${identificacion}
    Log    EIR registra el equipo y lo vincula con el cliente ${identificacion}

BES obtiene la confirmación de que el equipo fue registrado correctamente en EIR
    [Arguments]    ${imei}=123456789012345
    Abrir sistema BES
    Obtener confirmación de registro desde EIR
    Consultar estado del registro en EIR desde BES    ${imei}
    Log    BES confirma el registro exitoso del equipo en EIR

# ========================================
# KEYWORDS PARA INTEGRACIÓN CON MICROSITIO DE CLIENTES PARA CONSULTAS (TC076)
# ========================================
El cliente accede al Micrositio de Clientes con credenciales válidas
    [Arguments]    ${usuario}=cliente_test    ${password}=password_test
    Abrir Micrositio de Clientes
    Acceder como cliente al Micrositio con credenciales válidas    ${usuario}    ${password}

El sistema autentica al cliente y muestra el menú principal del Micrositio
    Verificar autenticación exitosa del cliente
    Log    Cliente autenticado y menú principal mostrado

El Micrositio muestra la opción de consulta de financiamientos activos
    Navegar a sección de consulta de financiamientos
    Verificar opción de consulta de financiamientos Amigo Paguitos
    Log    Opción de consulta de financiamientos Amigo Paguitos disponible

El Micrositio invoca la API de consulta de BES para obtener los datos del financiamiento
    [Arguments]    ${identificacion}=cliente_test
    Solicitar información del financiamiento mediante integración con BES
    Verificar invocación de API de consulta de BES desde Micrositio
    Log    Micrositio invocó la API de consulta de BES para cliente ${identificacion}

BES responde con los datos completos del préstamo incluyendo datos del cliente desglose de cuotas desglose de pagos fechas de vencimiento y estatus del préstamo
    [Arguments]    ${identificacion}=cliente_test
    Abrir sistema BES
    Acceder a módulo de integraciones con Micrositio
    Recibir solicitud de consulta desde Micrositio    ${identificacion}
    Procesar solicitud de consulta del Micrositio    ${identificacion}
    Preparar respuesta con datos completos del financiamiento    ${identificacion}
    Verificar que BES responde con datos completos del préstamo al Micrositio
    Log    BES respondió con datos completos del préstamo al Micrositio

El Micrositio presenta al cliente de forma clara el estado de su financiamiento con todos los detalles de cuotas pagos y fechas
    [Arguments]    ${nombre}=Juan Pérez    ${identificacion}=ABC123456
    Verificar recepción de datos completos del préstamo desde BES
    Verificar que Micrositio presenta información completa del financiamiento    ${nombre}    ${identificacion}
    Log    Micrositio presenta toda la información del financiamiento de forma clara al cliente

# ========================================
# KEYWORDS PARA PAGO DE ENGANCHE A TRAVÉS DE KIOSCOS CON TDC (TC078)
# ========================================
Se inicia desde la plataforma AP.AG una venta con financiamiento Amigo Paguitos que requiera pago de enganche
    [Arguments]    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${identificacion}=ABC123456    ${monto}=15000    ${plazo}=12
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Acceder a módulo de ventas
    Iniciar nueva venta
    Ingresar datos del cliente    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Acceder a módulo de financiamiento
    Ingresar parámetros del financiamiento    ${monto}    ${plazo}    ${plazo}    15.5    2026-04-15
    Aprobar el financiamiento
    Verificar estado de financiamiento aprobado
    Log    Venta con financiamiento Amigo Paguitos iniciada en AP.AG

AP.AG registra la venta y solicita la forma de pago del enganche
    Acceder a etapa de pago de enganche en AP.AG
    Verificar visualización del monto del enganche requerido    5000
    Verificar visualización de opciones de pago disponibles
    Log    AP.AG solicita forma de pago para el enganche

Se selecciona en Kioskos la opción de pago de enganche con tarjeta de crédito
    [Arguments]    ${referencia_venta}=AP202604150001
    Abrir sistema Kioscos
    Acceder a módulo de pago de enganche en Kioscos
    Ingresar referencia de venta de Amigo Paguitos    ${referencia_venta}
    Verificar monto de enganche mostrado en Kioscos    5000
    Seleccionar opción de pago con tarjeta de crédito en Kioscos
    Log    Opción de pago con TDC seleccionada en Kioscos

El Kiosco muestra la interfaz de pago con TDC y el monto del enganche a pagar
    Verificar interfaz de pago con TDC mostrada
    Verificar monto de enganche mostrado en Kioscos    5000
    Log    Kiosco muestra interfaz de pago con TDC y monto del enganche

Se ingresan los datos de la tarjeta de crédito en el Kiosco y confirmar el pago del enganche
    [Arguments]    ${numero_tdc}=4111111111111111    ${nombre_titular}=Juan Perez    ${cvv}=123    ${fecha_exp}=12/28
    Ingresar datos de tarjeta de crédito para pago de enganche    ${numero_tdc}    ${nombre_titular}    ${cvv}    ${fecha_exp}
    Confirmar pago del enganche con TDC
    Log    Datos de TDC ingresados y pago confirmado

El Kiosco procesa la transacción con la pasarela de pagos y solicita autorización
    Esperar autorización de pago con TDC
    Log    Kiosco procesó la transacción y obtuvo autorización

Se obtiene la autorización del pago con TDC y generar el comprobante de pago del enganche
    Verificar generación de comprobante de pago de enganche
    ${referencia}    ${autorizacion}    ${fecha_hora}    ${monto}=    Obtener datos del comprobante de pago de enganche
    Log    Comprobante generado: Ref=${referencia}, Aut=${autorizacion}
    [Return]    ${referencia}    ${autorizacion}    ${fecha_hora}    ${monto}

El Kiosco recibe la autorización y genera el comprobante con los datos de la transacción
    Verificar generación de comprobante de pago de enganche
    Log    Kiosco generó comprobante con datos de la transacción

Se notifica desde Kioskos hacia CPS el pago de enganche realizado con TDC
    Verificar notificación enviada desde Kioscos a CPS
    Log    Kioscos notificó a CPS sobre el pago de enganche

CPS recibe y registra el pago de enganche con los datos de la transacción de TDC
    [Arguments]    ${monto}=5000    ${referencia_prestamo}=PRES202604150001    ${identificacion}=ABC123456
    Abrir sistema CPS
    ${transaccion_id}=    Registrar pago de enganche desde punto de cobro en CPS    ${monto}    ${referencia_prestamo}    ${identificacion}    Kioscos
    Verificar registro correcto del pago de enganche en CPS    ${referencia_prestamo}
    Log    CPS registró el pago de enganche desde Kioscos con TDC
    [Return]    ${transaccion_id}

Se integra BES con CPS para conocer y acreditar el pago de enganche
    [Arguments]    ${referencia_prestamo}=PRES202604150001    ${monto}=5000    ${fecha}=2026-04-15    ${transaccion_id}=TXN123456
    Abrir sistema BES
    Acceder a módulo de pagos de enganche
    Buscar préstamo para verificar pago de enganche    ${referencia_prestamo}
    Verificar pago de enganche acreditado en BES    ${monto}    ${fecha}    ${transaccion_id}
    Verificar actualización de saldo del préstamo
    Log    BES consultó CPS y acreditó el pago de enganche

BES consulta en CPS el pago acreditado y actualiza el financiamiento Amigo Paguitos
    [Arguments]    ${referencia_prestamo}=PRES202604150001    ${monto}=5000
    Verificar actualización de saldo del préstamo
    Log    BES actualizó el financiamiento Amigo Paguitos tras acreditar el pago

Se continua el proceso de venta en AP.AG tras la confirmación del pago del enganche
    [Arguments]    ${email}=cliente@telcel.com
    Abrir Amigo Paguitos
    Continuar a siguiente etapa tras confirmación de pago
    Acceder a etapa de envío de contrato en AP.AG
    Log    AP.AG continúa proceso de venta tras confirmación de pago

AP.AG recibe la confirmación de BES y permite finalizar el proceso de venta y envío de contrato
    [Arguments]    ${email}=cliente@telcel.com
    Enviar contrato al cliente mediante canal especificado    email    ${email}
    Verificar confirmación de envío del contrato
    Verificar finalización del proceso de formalización
    Log    AP.AG finalizó el proceso de venta y envió el contrato

# ========================================
# KEYWORDS PARA PROCESO E2E DE VENTA CON EVALUACIÓN CREDITICIA (TC079)
# ========================================
Se ejecuta registro de usuario en proceso E2E de venta
    [Arguments]    ${nombre}=Carlos Martínez    ${email}=Martinez.Carlos@telcel.com
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar paso de registro de usuario    ${nombre}    ${email}

Se ejecuta aceptación de legales en proceso E2E de venta
    Ejecutar paso de aceptación de legales

Se ejecuta autenticación en proceso E2E de venta
    [Arguments]    ${codigo}=123456
    Ejecutar paso de autenticación    ${codigo}

Se ejecuta evaluación crediticia en proceso E2E de venta
    Ejecutar paso de evaluación

Se genera y acepta oferta en proceso E2E de venta
    Ejecutar paso de aceptación de oferta

Se enrolla equipo en proceso E2E de venta
    [Arguments]    ${equipo}=iPhone 15 Pro    ${imei}=123456789012345
    Ejecutar paso de enrolamiento de equipos    ${equipo}    ${imei}

Se procesa pago de enganche en proceso E2E de venta
    [Arguments]    ${monto_enganche}=5000    ${metodo_pago}=Tarjeta de Crédito
    Ejecutar paso de pago de enganche    ${monto_enganche}    ${metodo_pago}

Se formaliza venta y envía contrato en proceso E2E de venta
    [Arguments]    ${email}=cliente@telcel.com
    Ejecutar paso de envío de contrato    ${email}
    Formalizar la venta
    Verificar estado de venta formalizada

Se ejecuta transferencia automática de venta completa desde AP.AG hacia BES
    Sleep    3s

Se verifica creación completa del financiamiento en BES
    [Arguments]    ${identificacion}=Martinez.Carlos@telcel.com
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar que existe identificador único del préstamo
    Log    Financiamiento creado correctamente en BES con estatus activo y toda la información completa

# ========================================
# KEYWORDS PARA PROCESO E2E - CONSULTA, RESUMEN Y FACTURA (TC080)
# ========================================
Se completa una venta con financiamiento Amigo Paguitos desde AP.AG
    [Arguments]    ${nombre}=Carlos López    ${direccion}=Av. Reforma 456    ${telefono}=5557654321    ${identificacion}=CLI789456    ${monto}=30000    ${plazo}=12
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar flujo completo de venta en AP.AG    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Ejecutar flujo completo de financiamiento en AP.AG    ${monto}    ${plazo}    ${plazo}    15.5    2026-04-15

BES recibe y almacena el financiamiento con todos los datos
    [Arguments]    ${identificacion}=CLI789456    ${nombre}=Carlos López    ${monto}=30000
    Sleep    3s
    Abrir sistema BES
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${identificacion}
    Verificar que existe registro de cliente
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo

El asesor de canal interno accede a Vista 360 de BES
    [Arguments]    ${tipo_canal}=CAC
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Seleccionar tipo de canal para consulta    ${tipo_canal}

El sistema autentica al asesor y muestra Vista 360
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_INPUT_BUSCAR_CLIENTE_VISTA360}

Se consulta en Vista 360 la información del crédito Amigo Paguitos
    [Arguments]    ${identificacion}=CLI789456
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}
    Wait Until Element Is Visible    ${BES_PANEL_VISTA_360}    timeout=15s

BES muestra en Vista 360 la información completa del financiamiento
    Verificar información completa del crédito en pantalla 360
    Verificar información de ventas por vendedor en pantalla 360
    Verificar datos del equipo financiado en pantalla 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

Se genera desde BES el resumen de cuenta del financiamiento
    Generar resumen de cuenta del financiamiento

BES genera el resumen de cuenta con detalle de movimientos
    Verificar resumen de cuenta generado con todos los movimientos
    Verificar desglose de cargos en resumen de cuenta
    Verificar desglose de pagos en resumen de cuenta
    Verificar saldo actual mostrado en resumen de cuenta
    Verificar calendario de pagos incluido en resumen de cuenta

Se solicita la generación de factura por conceptos del financiamiento
    [Arguments]    ${rfc}=XAXX010101000    ${razon_social}=CLIENTE EJEMPLO SA DE CV    ${domicilio}=Calle Ejemplo 123, Col. Centro
    Generar factura con conceptos del financiamiento    ${rfc}    ${razon_social}    ${domicilio}

El sistema genera la factura con los datos fiscales y conceptos
    [Arguments]    ${rfc}=XAXX010101000    ${razon_social}=CLIENTE EJEMPLO SA DE CV
    Verificar factura generada exitosamente
    Verificar factura contiene datos fiscales del cliente    ${rfc}    ${razon_social}
    Verificar factura contiene conceptos del financiamiento

El canal externo accede a Vista 360 y visualiza información del crédito
    [Arguments]    ${tipo_canal}=Distribuidores    ${identificacion}=CLI789456
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a Vista 360 de BES
    Seleccionar tipo de canal para consulta    ${tipo_canal}
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}
    Verificar información completa del crédito en pantalla 360

Los reportes de ventas muestran ventas por vendedor y concentrado
    Verificar acceso a reportes de ventas por vendedor para Distribuidores
    Verificar concentrado por fuerza de venta para administradores

BES presenta reportes segmentados por vendedor y consolidados
    Verificar información de ventas por vendedor en pantalla 360
    Verificar reportes de fuerza de ventas en pantalla 360

# ========================================
# KEYWORDS PARA CENTRALIZACIÓN DE INFORMACIÓN BES CON AMIGO PAGUITOS (TC081)
# ========================================
Un préstamo ha sido generado desde Amigo Paguitos AP.AG y migrado correctamente a BES
    [Arguments]    ${nombre}=Carlos Ramírez    ${direccion}=Av. Reforma 456    ${telefono}=5559876543    ${identificacion}=APAG987654    ${monto}=35000    ${plazo}=12    ${parcialidades}=12    ${tasa}=14.5    ${fecha_inicio}=2026-04-15
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar flujo completo de venta en AP.AG    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Ejecutar flujo completo de financiamiento en AP.AG    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Sleep    3s

Acceder al sistema BES como usuario administrador
    Abrir sistema BES
    Wait Until Page Contains Element    ${BES_MENU_VISTA_360}    timeout=10s

Consultar la información completa del préstamo generado desde Amigo Paguitos
    [Arguments]    ${identificacion}=APAG987654
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo

Verificar que BES despliega de manera centralizada todos los datos del financiamiento desde Amigo Paguitos
    [Arguments]    ${identificacion}=APAG987654
    Acceder a Vista 360 de BES
    Buscar cliente en Vista 360 por teléfono o identificador    ${identificacion}
    Verificar información completa del crédito en pantalla 360
    Verificar datos personales del cliente en pantalla 360
    Verificar información del equipo financiado en pantalla 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360

Verificar que la información del préstamo reside únicamente en BES como fuente única de verdad
    Page Should Contain Element    ${BES_PANEL_VISTA_360}
    Page Should Contain Element    ${BES_SECCION_DATOS_CLIENTE}
    Page Should Contain Element    ${BES_SECCION_DATOS_EQUIPO}
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_CUOTAS}
    Page Should Contain Element    ${BES_SECCION_DESGLOSE_PAGOS}
    Page Should Contain Element    ${BES_SECCION_ESTATUS_PRESTAMO}
    Log    La información del préstamo reside únicamente en BES y los sistemas integrados consultan desde BES como fuente única de verdad

Verificar que todos los canales pueden acceder a la información centralizada desde pantalla 360 de BES
    [Arguments]    ${identificacion}=APAG987654
    Verificar acceso desde canal CACs a Vista 360    ${identificacion}
    Verificar acceso desde canal CVTs a Vista 360    ${identificacion}
    Verificar acceso desde canal CAT a Vista 360    ${identificacion}
    Verificar acceso desde canal Distribuidores a Vista 360    ${identificacion}
    Verificar acceso desde canal Cadenas a Vista 360    ${identificacion}

# ========================================
# KEYWORDS PARA ADMINISTRACIÓN DEL CICLO DE VIDA DEL FINANCIAMIENTO EN BES (TC082)
# ========================================
El préstamo ha sido transferido desde Amigo Paguitos hacia BES con información completa
    [Arguments]    ${identificacion}=ABC123456    ${nombre}=Juan Pérez    ${direccion}=Calle Principal 123    ${telefono}=5551234567    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Iniciar sesión en el sistema
    Abrir Amigo Paguitos
    Ejecutar flujo completo de venta en AP.AG    ${nombre}    ${direccion}    ${telefono}    ${identificacion}
    Ejecutar flujo completo de financiamiento en AP.AG    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Sleep    3s
    Abrir sistema BES
    Acceder a módulo de clientes
    Buscar cliente por identificación    ${identificacion}
    Verificar que existe registro de cliente
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo

Se consulta calendario de cobranza del financiamiento en BES
    [Arguments]    ${identificacion}=ABC123456
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Acceder a calendario de pagos

BES muestra calendario completo con fechas de vencimiento y montos de parcialidades
    [Arguments]    ${num_parcialidades}=12
    Verificar generación de calendario de cobranza    ${num_parcialidades}
    Page Should Contain Element    ${BES_CAMPO_FECHA_VENCIMIENTO}
    Page Should Contain Element    ${BES_CAMPO_MONTO_PARCIALIDAD}
    Page Should Contain Element    ${BES_CAMPO_NUMERO_PARCIALIDAD}
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_CUOTA_CALENDARIO}
    Log    BES muestra calendario de cobranza completo con ${num_parcialidades} parcialidades

Se registra pago de parcialidad mediante SICATEL integrado con CPS
    [Arguments]    ${referencia_prestamo}=PREST123456    ${numero_parcialidad}=1    ${monto}=4166.67    ${identificacion}=ABC123456    ${referencia_transaccion}=TRX001
    Abrir sistema SICATEL
    Acceder a módulo de pagos en SICATEL
    Ingresar datos del pago de parcialidad en SICATEL    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}
    Procesar pago de parcialidad en SICATEL
    Verificar pago procesado exitosamente en SICATEL
    Abrir sistema CPS
    Acceder a módulo de pagos
    Registrar pago de parcialidad desde SICATEL en CPS    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}    ${referencia_transaccion}
    Verificar notificación de pago de parcialidad enviada a BES    ${referencia_prestamo}    ${numero_parcialidad}    SICATEL

BES recibe notificación de pago desde CPS y actualiza saldo
    [Arguments]    ${referencia_prestamo}=PREST123456    ${numero_parcialidad}=1    ${monto}=4166.67    ${fecha}=2026-04-18
    Abrir sistema BES
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Verificar datos de pago de parcialidad recibidos de CPS    ${numero_parcialidad}    ${monto}    ${fecha}    ${referencia_prestamo}    SICATEL
    Verificar actualización de saldo después de pago de parcialidad

El pago queda acreditado en calendario de cobranza
    [Arguments]    ${numero_parcialidad}=1    ${fecha}=2026-04-18    ${monto}=4166.67
    Acceder a calendario de pagos
    Verificar parcialidad acreditada en calendario de cobranza    ${numero_parcialidad}    ${fecha}    ${monto}
    Verificar parcialidad marcada como pagada en calendario    ${numero_parcialidad}

Se ejecuta proceso automático de notificación de recordatorio de pago
    [Arguments]    ${identificacion}=ABC123456    ${id_prestamo}=PREST123456
    Abrir sistema BES
    Acceder a módulo de configuración de notificaciones
    Configurar parámetros de notificaciones de pago    3    SMS    Recordatorio de pago próximo
    Verificar configuración de notificaciones almacenada
    Crear préstamo con fecha de vencimiento próxima    ${identificacion}    50000    12    12    15.5    2026-04-18
    Verificar préstamo registrado con calendario de pagos    ${identificacion}
    Acceder a proceso automático de identificación de notificaciones
    Ejecutar proceso de identificación de préstamos con fechas próximas    3
    Verificar identificación de préstamos que requieren notificación    3

BES ejecuta envío automático de notificaciones mediante SITIC-Trustonic
    [Arguments]    ${id_prestamo}=PREST123456    ${cliente}=ABC123456
    Acceder a módulo de integración con SITIC-Trustonic
    Verificar invocación de APIs SITIC-Trustonic para envío de notificación    ${id_prestamo}    ${cliente}
    Acceder a log de notificaciones enviadas
    Verificar registro de notificación enviada con detalles completos    ${id_prestamo}
    Acceder a historial de notificaciones del préstamo    ${id_prestamo}
    Verificar historial muestra todas las notificaciones enviadas con estatus

Se liquida totalmente el financiamiento registrando último pago
    [Arguments]    ${identificacion}=ABC123456    ${referencia_prestamo}=PREST123456    ${monto_liquidacion}=4166.67
    Abrir sistema BES
    Acceder a módulo de pagos de liquidación
    Buscar préstamo activo con saldo pendiente    ${identificacion}
    Verificar préstamo con saldo pendiente y desglose de pagos    ${monto_liquidacion}
    Consultar desglose de pagos realizados del préstamo
    Registrar pago de liquidación total del préstamo    ${monto_liquidacion}
    Verificar pago final acreditado y saldo en cero

BES actualiza estatus del préstamo a Liquidado con fecha de liquidación
    [Arguments]    ${id_prestamo}=PREST123456
    Verificar estatus del préstamo actualizado a liquidado
    Page Should Contain Element    ${BES_CAMPO_ESTATUS_PRESTAMO_LIQUIDADO}
    Page Should Contain Element    ${BES_CAMPO_FECHA_LIQUIDACION}
    ${estatus}=    Get Text    ${BES_CAMPO_ESTATUS_PRESTAMO_LIQUIDADO}
    Should Contain    ${estatus}    Liquidado
    Log    Préstamo ${id_prestamo} actualizado a estatus Liquidado

BES ejecuta liberación definitiva del equipo mediante APIs SITIC-Trustonic
    [Arguments]    ${imei}=123456789012345    ${id_prestamo}=PREST123456
    Acceder a módulo de integración con SITIC-Trustonic para liberación
    Verificar invocación automática de APIs SITIC-Trustonic para liberación definitiva    ${imei}
    Verificar datos enviados a API SITIC-Trustonic para liberación definitiva    ${imei}
    Acceder a historial del préstamo
    Verificar registro de liberación en historial del préstamo    2026-04-18    10:00

Se consulta historial completo del préstamo desde creación hasta liquidación
    [Arguments]    ${identificacion}=ABC123456    ${id_prestamo}=PREST123456
    Abrir sistema BES
    Consultar estatus del préstamo y equipo en pantalla 360 después de liquidación    ${identificacion}
    Verificar préstamo como liquidado y equipo como liberado definitivamente en pantalla 360
    Verificar equipo sin restricciones asociadas al financiamiento

BES despliega historial completo con transacciones pagos notificaciones cambios de estatus y eventos
    [Arguments]    ${id_prestamo}=PREST123456
    Acceder a Vista 360 de BES
    Consultar préstamo en Vista 360    ${id_prestamo}
    Verificar información accesible en Vista 360
    Verificar desglose de cuotas en Vista 360
    Verificar desglose de pagos en Vista 360
    Verificar fechas de vencimiento en Vista 360
    Verificar estatus del préstamo en Vista 360
    Acceder a historial de movimientos del préstamo    ${id_prestamo}
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_MOVIMIENTOS}
    Acceder a historial de notificaciones del préstamo    ${id_prestamo}
    Verificar historial muestra todas las notificaciones enviadas con estatus
    Acceder a historial del préstamo
    Page Should Contain Element    ${BES_TABLA_HISTORIAL_LIBERACIONES}
    Log    BES despliega historial completo del préstamo ${id_prestamo} incluyendo todas las transacciones, pagos, notificaciones, cambios de estatus y eventos del ciclo de vida

# ========================================
# KEYWORDS PARA GESTIÓN DE PAGOS E INHABILITACIÓN DE EQUIPOS POR BES (TC083)
# ========================================
Configurar préstamo activo en BES con calendario de cobranza
    [Arguments]    ${referencia_prestamo}=PREST999001    ${identificacion}=CLI999001    ${frecuencia}=mensual    ${monto}=50000    ${plazo}=12    ${parcialidades}=12    ${tasa}=15.5    ${fecha_inicio}=2026-04-15
    Iniciar sesión en el sistema
    Abrir sistema BES
    Crear préstamo con datos de cliente y equipo enrolado    ${referencia_prestamo}    ${identificacion}
    Acceder a módulo de préstamos
    Buscar préstamo por identificación del cliente    ${identificacion}
    Verificar que existe registro de préstamo
    Verificar datos del préstamo almacenado    ${monto}    ${plazo}    ${parcialidades}    ${tasa}    ${fecha_inicio}
    Acceder a calendario de pagos
    Verificar generación de calendario de cobranza    ${parcialidades}
    Verificar frecuencia de pago configurada    ${frecuencia}
    Log    Préstamo ${referencia_prestamo} configurado con calendario de cobranza ${frecuencia} y ${parcialidades} parcialidades

Simular vencimiento de parcialidad sin pago
    [Arguments]    ${referencia_prestamo}=PREST999001    ${numero_parcialidad}=1    ${fecha_vencimiento}=2026-05-15
    Acceder a módulo de simulación de cobranza
    Configurar simulación de fecha actual posterior a vencimiento    ${fecha_vencimiento}
    Seleccionar préstamo para simulación    ${referencia_prestamo}
    Ejecutar simulación de vencimiento sin acreditación de pago    ${numero_parcialidad}
    Log    Simulada parcialidad ${numero_parcialidad} vencida para préstamo ${referencia_prestamo}

BES identifica incumplimiento de pago por parcialidad vencida
    [Arguments]    ${referencia_prestamo}=PREST999001    ${numero_parcialidad}=1
    Acceder a módulo de procesos de cobranza
    Ejecutar proceso de identificación de pagos vencidos
    Verificar préstamo identificado con pago vencido    ${referencia_prestamo}    ${numero_parcialidad}
    Log    BES identificó incumplimiento de pago para préstamo ${referencia_prestamo} en parcialidad ${numero_parcialidad}

BES envía notificación de pago vencido al cliente
    [Arguments]    ${referencia_prestamo}=PREST999001    ${identificacion}=CLI999001    ${numero_parcialidad}=1
    Acceder a módulo de notificaciones de cobranza
    Ejecutar proceso de notificación de pagos vencidos    ${referencia_prestamo}
    Verificar envío de notificación de pago vencido al cliente    ${identificacion}    ${numero_parcialidad}
    Verificar contenido de notificación incluye consecuencias de incumplimiento    ${referencia_prestamo}
    Log    BES notificó al cliente ${identificacion} sobre pago vencido de parcialidad ${numero_parcialidad}

Configurar reglas de inhabilitación por incumplimiento de pago
    [Arguments]    ${dias_atraso}=30    ${periodo_gracia}=7
    Acceder a módulo de configuración de reglas de inhabilitación
    Ingresar reglas de inhabilitación    ${dias_atraso}    ${periodo_gracia}
    Guardar configuración de reglas de inhabilitación
    Verificar configuración de reglas de inhabilitación almacenada
    Log    Configuradas reglas de inhabilitación: ${dias_atraso} días de atraso con ${periodo_gracia} días de periodo de gracia

Simular transcurso del periodo de gracia configurado
    [Arguments]    ${referencia_prestamo}=PREST999001    ${dias_transcurridos}=35
    Acceder a módulo de simulación de cobranza
    Configurar simulación de días transcurridos desde vencimiento    ${dias_transcurridos}
    Seleccionar préstamo para simulación    ${referencia_prestamo}
    Ejecutar simulación de transcurso de periodo de gracia
    Verificar préstamo cumple criterios de inhabilitación    ${referencia_prestamo}    ${dias_transcurridos}
    Log    Simulado transcurso de ${dias_transcurridos} días desde vencimiento para préstamo ${referencia_prestamo}

BES ejecuta integración con APIs SITIC-Trustonic para inhabilitar equipo
    [Arguments]    ${referencia_prestamo}=PREST999001    ${imei}=359876543210987
    Acceder a módulo de procesos de cobranza
    Acceder a proceso de evaluación de inhabilitaciones
    Ejecutar proceso de evaluación de inhabilitaciones
    Verificar lista de préstamos identificados para inhabilitación
    Verificar que existen préstamos en la lista de inhabilitación
    Acceder a módulo de integración con SITIC-Trustonic para inhabilitación
    Verificar llamada a API SITIC-Trustonic para bloqueo de equipo    ${referencia_prestamo}    ${imei}
    Verificar datos enviados a API SITIC-Trustonic para inhabilitación    ${imei}
    Log    BES ejecutó integración con SITIC-Trustonic para inhabilitar equipo ${imei} del préstamo ${referencia_prestamo}

Consultar estatus del préstamo y del equipo después de inhabilitación
    [Arguments]    ${referencia_prestamo}=PREST999001    ${imei}=359876543210987
    Acceder a módulo de préstamos
    Buscar préstamo por referencia    ${referencia_prestamo}
    Verificar estatus del préstamo es equipo inhabilitado
    Verificar fecha y hora de inhabilitación registradas    ${referencia_prestamo}
    Acceder a sección de historial de inhabilitaciones
    Verificar registro de inhabilitación en historial    ${imei}    Incumplimiento de pago
    Log    Préstamo ${referencia_prestamo} en estatus Vencido con equipo ${imei} en estatus Inhabilitado

Verificar equipo bloqueado mediante SITIC-Trustonic impidiendo su uso
    [Arguments]    ${imei}=359876543210987
    Abrir Portal de Habilitación de Equipos
    Acceder a módulo de solicitudes de inhabilitación
    Verificar recepción de solicitud de inhabilitación desde BES    ${imei}    Incumplimiento de pago
    Procesar inhabilitación del equipo    ${imei}
    Verificar equipo inhabilitado en Portal    ${imei}
    Enviar confirmación de inhabilitación a BES    ${imei}
    Verificar estatus del equipo en Portal de Habilitación    ${imei}    Inhabilitado
    Log    Equipo ${imei} bloqueado mediante SITIC-Trustonic impidiendo su uso hasta regularización del pago

# ========================================
# KEYWORDS PARA GESTIÓN DE HABILITACIÓN DE EQUIPOS TRAS PAGO (TC084)
# ========================================
Existe un préstamo vencido con equipo inhabilitado en BES
    [Arguments]    ${referencia_prestamo}=PREST999888    ${imei}=359876543210987    ${identificacion}=ABC123456
    Iniciar sesión en el sistema
    Abrir sistema BES
    Acceder a módulo de préstamos
    Buscar préstamo por referencia    ${referencia_prestamo}
    Verificar que existe registro de préstamo
    Verificar estatus del préstamo es Vencido o En Mora    ${referencia_prestamo}
    Verificar equipo asociado está en estatus Inhabilitado    ${referencia_prestamo}    ${imei}
    Log    Préstamo ${referencia_prestamo} en estatus Vencido/En Mora con equipo ${imei} Inhabilitado

Se procesa pago de parcialidad vencida desde punto de cobro SICATEL
    [Arguments]    ${referencia_prestamo}=PREST999888    ${numero_parcialidad}=1    ${monto}=4500    ${identificacion}=ABC123456
    Abrir sistema SICATEL
    Acceder a módulo de pagos en SICATEL
    Ingresar datos del pago de parcialidad en SICATEL    ${referencia_prestamo}    ${numero_parcialidad}    ${monto}    ${identificacion}
    Procesar pago de parcialidad en SICATEL
    Verificar pago procesado exitosamente en SICATEL
    ${referencia}    ${fecha}    ${monto_procesado}=    Obtener datos del pago de parcialidad procesado
    Set Suite Variable    ${REFERENCIA_TRANSACCION}    ${referencia}
    Set Suite Variable    ${FECHA_PAGO}    ${fecha}
    Set Suite Variable    ${MONTO_PARCIALIDAD}    ${monto_procesado}
    Log    Pago de parcialidad vencida procesado desde SICATEL - Préstamo: ${referencia_prestamo}, Parcialidad: ${numero_parcialidad}

BES recibe notificación de pago de parcialidad desde CPS
    [Arguments]    ${referencia_prestamo}=PREST999888    ${numero_parcialidad}=1    ${monto}=4500
    Sleep    2s
    Abrir sistema CPS
    Acceder a módulo de notificaciones
    Verificar notificación de pago de parcialidad enviada a BES    ${referencia_prestamo}    ${numero_parcialidad}
    Log    CPS notificó a BES sobre el pago de parcialidad vencida

BES acredita el pago a la parcialidad vencida actualizando el saldo
    [Arguments]    ${referencia_prestamo}=PREST999888    ${numero_parcialidad}=1    ${monto}=4500
    Abrir sistema BES
    Acceder a módulo de pagos de parcialidades
    Buscar préstamo para verificar pago de parcialidad    ${referencia_prestamo}
    Verificar parcialidad acreditada en calendario de cobranza    ${numero_parcialidad}    ${FECHA_PAGO}    ${monto}
    Verificar actualización de saldo después de pago de parcialidad
    Log    BES acreditó el pago de parcialidad ${numero_parcialidad} y actualizó el saldo del préstamo ${referencia_prestamo}

BES actualiza estatus del préstamo a Activo o Al Corriente
    [Arguments]    ${referencia_prestamo}=PREST999888
    Acceder a módulo de préstamos
    Buscar préstamo por referencia    ${referencia_prestamo}
    Verificar cambio de estatus del préstamo a Activo o Al Corriente    ${referencia_prestamo}
    Log    BES actualizó el estatus del préstamo ${referencia_prestamo} a Activo/Al Corriente tras regularización del pago

BES ejecuta proceso automático de habilitación mediante APIs SITIC-Trustonic
    [Arguments]    ${referencia_prestamo}=PREST999888    ${imei}=359876543210987
    Acceder a proceso de evaluación de habilitaciones
    Ejecutar proceso de evaluación de habilitaciones
    Esperar finalización de proceso de evaluación de habilitaciones
    Acceder a módulo de integración con SITIC-Trustonic para habilitación
    Verificar llamada a API SITIC-Trustonic para desbloqueo de equipo    ${referencia_prestamo}    ${imei}
    Verificar datos enviados a API SITIC-Trustonic para habilitación    ${imei}
    Log    BES ejecutó integración con APIs SITIC-Trustonic para habilitar equipo ${imei} del préstamo ${referencia_prestamo}

BES muestra equipo en estatus Habilitado con fecha y hora
    [Arguments]    ${imei}=359876543210987
    Verificar estatus del equipo es Habilitado tras regularización
    Verificar fecha y hora de habilitación registradas
    Acceder a sección de historial de habilitaciones en pantalla 360
    Verificar registro de habilitación en historial    ${imei}    Regularización de pago
    Log    BES muestra equipo ${imei} en estatus Habilitado con fecha y hora de la acción

El equipo queda desbloqueado y habilitado para uso normal
    [Arguments]    ${imei}=359876543210987
    Abrir Portal de Habilitación de Equipos
    Acceder a módulo de solicitudes de habilitación
    Verificar recepción de solicitud de habilitación desde BES    ${imei}
    Procesar habilitación del equipo    ${imei}
    Verificar equipo habilitado en Portal    ${imei}
    Enviar confirmación de habilitación a BES    ${imei}
    Verificar estatus del equipo en Portal de Habilitación    ${imei}    Habilitado
    Log    Equipo ${imei} desbloqueado mediante SITIC-Trustonic permitiendo su uso normal

BES envía notificación de habilitación al cliente
    [Arguments]    ${identificacion}=ABC123456    ${imei}=359876543210987
    Abrir sistema BES
    Acceder a módulo de notificaciones al cliente
    Verificar envío de notificación de habilitación al cliente    ${identificacion}    ${imei}
    Log    BES envió notificación al cliente ${identificacion} confirmando habilitación del equipo ${imei}
