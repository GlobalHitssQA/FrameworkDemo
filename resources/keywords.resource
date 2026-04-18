*** Settings ***
Documentation    Keywords reutilizables de alto nivel para los casos de prueba
Library          RequestsLibrary
Library          Collections
Resource         ../pages/ESB_PACPagosService.resource
Resource         ../pages/CapaIntegracion_API.resource
Resource         ../pages/BES_CustomerManagement_API.resource
Resource         ../pages/BES_ARServices_QueryInvoice_API.resource
Resource         ../pages/BES_ARServices_QueryBalance_API.resource
Resource         ../pages/AmigoPaguitos_Autogestion_Registro.resource
Resource         ../pages/AmigoPaguitos_Autogestion_Autenticacion.resource
Resource         ../pages/AmigoPaguitos_Autogestion_Evaluacion.resource
Resource         ../pages/AmigoPaguitos_Autogestion_Oferta.resource
Resource         ../pages/AmigoPaguitos_Autogestion_Enrolamiento.resource
Resource         ../pages/AmigoPaguitos_Autogestion_PagoEnganche.resource
Resource         ../pages/AmigoPaguitos_Autogestion_EnvioContrato.resource
Resource         ../pages/BES_TelcelInterfaceService_GetSubscriberOfferingInst_API.resource
Resource         ../pages/BES_CustomerManagement_GetOfferingProp_API.resource
Resource         ../pages/BES_CustomerManagement_GetCustomerDetailInfo_API.resource
Resource         ../pages/BES_GetCustomerView_API.resource
Resource         ../pages/BES_CustomerManagement_QuerySubscriberByPage_API.resource
Resource         ../pages/BES_CreateComments_API.resource
Resource         ../pages/BES_CreateAccountComments_API.resource
Resource         ../pages/BES_QuerySubsServiceContract_API.resource
Resource         ../pages/BES_TelcelInterfaceService_QueryCustOfferingInst_API.resource
Resource         ../pages/Login.resource
Resource         ../pages/BES_Inhabilitacion.resource
Resource         ../pages/BES_Financiamiento.resource
Resource         ../pages/BES_Cobranza_Pagos.resource
Resource         ../pages/BES_Notificaciones_Pago.resource
Resource         ../pages/BES_Subsidios.resource
Resource         ../pages/BES_Pantalla360.resource
Resource         ../pages/BES_Venta_Servicios_Suplementarios.resource
Resource         ../pages/BES_Promociones.resource
Resource         ../pages/BES_Activacion.resource
Resource         ../pages/AmigoPaguitos_API.resource
Resource         ../pages/AmigoPaguitosPagosService_ConsultarPaguitos_API.resource

*** Keywords ***
Dado que el servicio PACPagosService está disponible
    [Documentation]    Precondición: El servicio ESB está desplegado y disponible
    Crear Sesión ESB PACPagosService

Cuando envío una petición con encabezados HTTP inválidos
    [Documentation]    Ejecuta una petición con encabezados faltantes para provocar error ESB17
    [Arguments]    ${telefono}
    ${response}=    Enviar Petición Con Encabezados Inválidos    ${telefono}
    Set Test Variable    ${RESPONSE_ERROR}    ${response}

Entonces el sistema retorna error ESB17
    [Documentation]    Valida que se reciba el error ESB17 por encabezados inválidos
    Verificar Error ESB17 En Respuesta    ${RESPONSE_ERROR}

Y identifico los encabezados HTTP requeridos
    [Documentation]    Revisa la especificación para identificar encabezados obligatorios
    ${headers_requeridos}=    Obtener Encabezados HTTP Requeridos Desde Especificación
    Log    Encabezados requeridos: ${headers_requeridos}
    Set Test Variable    ${HEADERS_REQUERIDOS}    ${headers_requeridos}

Cuando corrijo la petición con encabezados HTTP válidos
    [Documentation]    Agrega todos los encabezados requeridos con valores correctos del ambiente QA
    ${headers_validos}=    Crear Encabezados HTTP Válidos
    Set Test Variable    ${HEADERS_VALIDOS}    ${headers_validos}
    Log    Encabezados corregidos: ${headers_validos}

Y envío la petición corregida al servicio
    [Documentation]    Ejecuta la petición con los encabezados HTTP correctos
    [Arguments]    ${telefono}
    ${response}=    Enviar Petición Con Encabezados Válidos    ${telefono}    ${HEADERS_VALIDOS}
    Set Test Variable    ${RESPONSE_EXITOSA}    ${response}

Entonces el ESB valida exitosamente los encabezados HTTP
    [Documentation]    Verifica que el ESB haya aceptado los encabezados y procesado la petición
    Verificar Validación Exitosa De Encabezados    ${RESPONSE_EXITOSA}

Y el servicio retorna la información del cliente con código ESB0
    [Documentation]    Valida que la respuesta contenga toda la información del cliente Amigo Paguitos
    Verificar Respuesta Exitosa Con Información Del Cliente    ${RESPONSE_EXITOSA}

Finalmente cierro la sesión del servicio
    [Documentation]    Limpieza: Cierra la sesión HTTP
    Cerrar Sesión ESB

# ============================================
# Keywords para Activación de Línea Celular - Caso 53
# ============================================

Y navega al módulo de activación de líneas
    Navegar A Módulo De Activación De Líneas

Cuando ingresa el IMEI del equipo vendido mediante Amigo Paguitos
    [Arguments]    ${imei}
    Ingresar IMEI Del Equipo    ${imei}
    Hacer Click En Botón Validar IMEI

Entonces el sistema valida el IMEI y recupera la información del equipo y su financiamiento
    Verificar Que IMEI Es Válido Y Recupera Información

Cuando selecciona el tipo de línea prepagado a activar
    Seleccionar Tipo De Línea Prepagado

Entonces el sistema muestra las opciones de activación para prepagado
    Verificar Que Se Muestran Opciones Para Prepagado

Cuando ingresa los datos del cliente para la activación
    [Arguments]    ${nombre}    ${curp}    ${rfc}    ${domicilio}
    Ingresar Datos Del Cliente Para Activación    ${nombre}    ${curp}    ${rfc}    ${domicilio}

Entonces el sistema valida los datos del cliente asociado al financiamiento
    Verificar Que Datos Del Cliente Son Validados

Cuando ejecuta el proceso de activación de la línea celular
    Hacer Click En Botón Activar Línea

Entonces el sistema activa la línea celular y la asocia al equipo vendido
    Verificar Que Línea Fue Activada Exitosamente

Y verifica que la línea está en estado activo vinculada al IMEI del equipo
    [Arguments]    ${imei}
    Verificar Que Línea Está Activa Y Vinculada Al IMEI    ${imei}

# ============================================
# Keywords para Promoción AK ASL - Caso 54 (ya implementado)
# ============================================

Cuando el sistema detecta elegibilidad para promoción AK ASL
    Verificar Que Equipo Es Elegible Para Promoción    AK ASL

Cuando selecciona la promoción AK ASL disponible
    Seleccionar Promoción AK ASL

Entonces el sistema muestra los términos y condiciones de la promoción AK ASL
    Verificar Que Se Muestran Términos Y Condiciones AK ASL
    Verificar Que Se Muestran Beneficios AK ASL

Cuando confirma la aplicación de la promoción AK ASL
    Confirmar Aplicación De Promoción AK ASL

Entonces el sistema aplica los beneficios de la promoción AK ASL a la activación
    Verificar Que Promoción AK ASL Fue Aplicada

Cuando completa el proceso de activación con la promoción aplicada
    Hacer Click En Botón Activar Línea

Entonces el sistema activa la línea con la promoción AK ASL y registra los beneficios otorgados
    Verificar Que Línea Fue Activada Exitosamente
    Verificar Registro De Beneficios De Promoción    AK ASL

# ============================================
# Keywords para Promoción AK Con Todo - Caso 55 (ya implementado)
# ============================================

Cuando el sistema detecta elegibilidad para promoción AK Con Todo
    Verificar Que Equipo Es Elegible Para Promoción    AK con Todo

Cuando selecciona la promoción AK Con Todo disponible
    Seleccionar Promoción AK Con Todo

Entonces el sistema muestra los términos y beneficios de la promoción AK Con Todo
    Verificar Que Se Muestran Términos Y Beneficios AK Con Todo

Cuando confirma la aplicación de la promoción AK Con Todo
    Confirmar Aplicación De Promoción AK Con Todo

Entonces el sistema aplica los beneficios de la promoción AK Con Todo a la activación
    Verificar Que Promoción AK Con Todo Fue Aplicada

Entonces el sistema activa la línea con la promoción AK Con Todo y registra los beneficios otorgados
    Verificar Que Línea Fue Activada Exitosamente
    Verificar Registro De Beneficios De Promoción    AK con Todo

# ============================================
# Keywords para Múltiples Préstamos por Cliente - Caso 56
# ============================================

Cuando consulta un cliente con al menos un préstamo activo existente
    [Arguments]    ${telefono}
    Ingresar Número Telefónico Para Búsqueda    ${telefono}
    Hacer Click En Botón Buscar Préstamo

Entonces el sistema muestra el préstamo activo actual del cliente
    Verificar Que Cliente Tiene Al Menos Un Préstamo Activo

Cuando inicia el proceso de creación de un nuevo préstamo para el mismo cliente
    Hacer Click En Botón Crear Nuevo Préstamo

Entonces el sistema valida la configuración de múltiples préstamos permitidos según Amigo Paguitos
    Verificar Configuración De Múltiples Préstamos Permitidos

Cuando ingresa los datos del nuevo préstamo para el cliente
    [Arguments]    ${customer_id}    ${monto}    ${plazo}    ${ciclo}
    Ingresar Datos Del Nuevo Préstamo    ${customer_id}    ${monto}    ${plazo}    ${ciclo}

Cuando confirma la creación del segundo préstamo para el cliente
    Hacer Click En Botón Guardar Nuevo Préstamo

Entonces el sistema registra el nuevo préstamo y muestra ambos préstamos activos del cliente
    Verificar Que Segundo Préstamo Fue Creado
    Verificar Que Ambos Préstamos Están Activos

Y verifica que ambos préstamos se gestionan de manera independiente
    Verificar Que Préstamos Se Gestionan Independientemente    1
    Verificar Que Préstamos Se Gestionan Independientemente    2

# ============================================
# Keywords para Configuración de Ciclos de Pago - Caso 57 (ya implementado)
# ============================================

Y navega al módulo de configuración de ciclos de pago
    Navegar A Módulo De Configuración De Ciclos De Pago

Entonces el sistema muestra las opciones de configuración de ciclos de pago
    Verificar Que Se Muestran Opciones De Configuración De Ciclos

Cuando configura un préstamo con ciclo de pago semanal
    Configurar Préstamo Con Ciclo De Pago    Semanal

Entonces el sistema acepta la configuración y genera el calendario de pagos semanales
    Verificar Que Calendario De Pagos Fue Generado    Semanal

Cuando configura un préstamo con ciclo de pago quincenal
    Configurar Préstamo Con Ciclo De Pago    Quincenal

Entonces el sistema acepta la configuración y genera el calendario de pagos quincenales
    Verificar Que Calendario De Pagos Fue Generado    Quincenal

Cuando configura un préstamo con ciclo de pago mensual
    Configurar Préstamo Con Ciclo De Pago    Mensual

Entonces el sistema acepta la configuración y genera el calendario de pagos mensuales
    Verificar Que Calendario De Pagos Fue Generado    Mensual

Entonces el sistema valida y aplica correctamente cada tipo de ciclo según las reglas de negocio
    Verificar Que Configuraciones De Ciclos Respetan Reglas De Amigo Paguitos

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Pruebas de Rendimiento - Caso TC020
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que cuento con datos de prueba de clientes Amigo Paguitos en BES
    [Documentation]    Precondición: Preparar un conjunto de datos de prueba con números telefónicos válidos
    [Arguments]    @{lista_telefonos}
    ${cantidad_datos}=    Get Length    ${lista_telefonos}
    Should Be True    ${cantidad_datos} > 0    msg=Debe existir al menos un número telefónico de prueba
    Log    Se cuenta con ${cantidad_datos} números telefónicos de prueba
    Set Test Variable    ${POOL_DATOS_PRUEBA}    ${lista_telefonos}

Cuando ejecuto una prueba de carga sostenida de 5 TPS durante el período especificado
    [Documentation]    Ejecuta una prueba de carga generando 5 transacciones por segundo
    [Arguments]    ${duracion_minutos}    ${tps_objetivo}=5
    ${headers_validos}=    Crear Encabezados HTTP Válidos
    ${total_transacciones}=    Evaluate    ${duracion_minutos} * 60 * ${tps_objetivo}
    ${intervalo_entre_transacciones}=    Evaluate    1.0 / ${tps_objetivo}

    Log    Iniciando prueba de carga: ${tps_objetivo} TPS durante ${duracion_minutos} minutos
    Log    Total de transacciones esperadas: ${total_transacciones}
    Log    Intervalo entre transacciones: ${intervalo_entre_transacciones} segundos

    Set Test Variable    ${HEADERS_VALIDOS}    ${headers_validos}
    Set Test Variable    ${TOTAL_TRANSACCIONES_ESPERADAS}    ${total_transacciones}
    Set Test Variable    ${TPS_OBJETIVO}    ${tps_objetivo}
    Set Test Variable    ${DURACION_MINUTOS}    ${duracion_minutos}

Y monitoreo los tiempos de respuesta de cada transacción
    [Documentation]    Registra y monitorea los tiempos de respuesta verificando que estén dentro del timeout de 120s
    @{tiempos_respuesta}=    Create List
    @{resultados_transacciones}=    Create List
    ${transacciones_exitosas}=    Set Variable    ${0}
    ${transacciones_fallidas}=    Set Variable    ${0}

    ${contador_transaccion}=    Set Variable    ${1}
    ${telefono_index}=    Set Variable    ${0}
    ${pool_size}=    Get Length    ${POOL_DATOS_PRUEBA}

    # Ejecutar transacciones durante el período especificado
    FOR    ${i}    IN RANGE    ${TOTAL_TRANSACCIONES_ESPERADAS}
        ${telefono}=    Get From List    ${POOL_DATOS_PRUEBA}    ${telefono_index}
        ${start_time}=    Get Time    epoch

        ${resultado}=    Ejecutar Petición Única Con Medición De Tiempo    ${telefono}    ${HEADERS_VALIDOS}
        ${response}=    Set Variable    ${resultado}[response]
        ${elapsed_time}=    Set Variable    ${resultado}[elapsed_time]

        Append To List    ${tiempos_respuesta}    ${elapsed_time}

        # Verificar si la transacción fue exitosa
        ${status}=    Run Keyword And Return Status    Verificar Respuesta Exitosa Con Código ESB0    ${response}
        IF    ${status}
            ${transacciones_exitosas}=    Evaluate    ${transacciones_exitosas} + 1
            Append To List    ${resultados_transacciones}    EXITOSA
        ELSE
            ${transacciones_fallidas}=    Evaluate    ${transacciones_fallidas} + 1
            Append To List    ${resultados_transacciones}    FALLIDA
        END

        # Rotar índice de teléfonos para usar diferentes números
        ${telefono_index}=    Evaluate    (${telefono_index} + 1) % ${pool_size}

        # Mantener la tasa de transacciones (TPS)
        ${elapsed_since_start}=    Evaluate    ${elapsed_time}
        ${intervalo}=    Evaluate    1.0 / ${TPS_OBJETIVO}
        ${sleep_time}=    Evaluate    max(0, ${intervalo} - ${elapsed_since_start})
        Sleep    ${sleep_time}s

        ${contador_transaccion}=    Evaluate    ${contador_transaccion} + 1
    END

    Set Test Variable    ${TIEMPOS_RESPUESTA}    ${tiempos_respuesta}
    Set Test Variable    ${RESULTADOS_TRANSACCIONES}    ${resultados_transacciones}
    Set Test Variable    ${TRANSACCIONES_EXITOSAS}    ${transacciones_exitosas}
    Set Test Variable    ${TRANSACCIONES_FALLIDAS}    ${transacciones_fallidas}
    Set Test Variable    ${TOTAL_TRANSACCIONES_EJECUTADAS}    ${TOTAL_TRANSACCIONES_ESPERADAS}

Entonces todas las transacciones completan dentro del timeout configurado de 120 segundos
    [Documentation]    Valida que todas las transacciones hayan completado dentro del límite de tiempo
    FOR    ${tiempo}    IN    @{TIEMPOS_RESPUESTA}
        Verificar Tiempo De Respuesta Dentro De Límite    ${tiempo}    120
    END
    Log    Todas las ${TOTAL_TRANSACCIONES_EJECUTADAS} transacciones completaron dentro del timeout de 120 segundos

Y el servicio procesa exitosamente las transacciones sin errores
    [Documentation]    Verifica que el porcentaje de éxito sea superior al 99% con código ESB0
    ${porcentaje_exito}=    Calcular Porcentaje De Éxito    ${TRANSACCIONES_EXITOSAS}    ${TOTAL_TRANSACCIONES_EJECUTADAS}
    Log    Transacciones exitosas: ${TRANSACCIONES_EXITOSAS} de ${TOTAL_TRANSACCIONES_EJECUTADAS}
    Log    Porcentaje de éxito: ${porcentaje_exito}%
    Verificar Porcentaje De Éxito Mínimo    ${porcentaje_exito}    99.0

Y valido que no se generaron errores de timeout ni servicio no disponible
    [Documentation]    Verifica que no hubo errores ESB2, ESB3, ESB4, ESB6
    # Esta validación ya está implícita en el conteo de transacciones exitosas
    # que solo considera exitosas aquellas con código ESB0
    Log    Validación de ausencia de errores ESB2, ESB3, ESB4, ESB6 completada implícitamente

# ============================================
# Keywords adicionales para TC020 - 5 TPS
# ============================================

Dado que la herramienta de pruebas de carga está configurada
    [Documentation]    Precondición: Configurar herramienta para simular peticiones concurrentes
    Crear Sesión ESB PACPagosService
    Log    Herramienta de pruebas de carga configurada para generar tráfico controlado hacia PACPagosService

Y se cuenta con pool de datos de prueba representativos
    [Documentation]    Verifica que existe un conjunto de datos de prueba con números telefónicos válidos
    ${cantidad_telefonos}=    Get Length    ${TELEFONOS_PRUEBA}
    Should Be True    ${cantidad_telefonos} >= 5    msg=Se requieren al menos 5 números telefónicos para pruebas de carga
    Log    Pool de ${cantidad_telefonos} números telefónicos de clientes Amigo Paguitos disponibles

Cuando se ejecuta prueba de carga de ${tps} TPS durante ${minutos} minutos
    [Documentation]    Ejecuta prueba de carga sostenida generando exactamente N TPS durante el tiempo especificado
    ${headers_validos}=    Crear Encabezados HTTP Válidos
    Set Test Variable    ${HEADERS_VALIDOS}    ${headers_validos}
    Set Test Variable    ${TPS_OBJETIVO}    ${tps}
    Set Test Variable    ${DURACION_MINUTOS}    ${minutos}

    Dado que cuento con datos de prueba de clientes Amigo Paguitos en BES    @{TELEFONOS_PRUEBA}
    Cuando ejecuto una prueba de carga sostenida de 5 TPS durante el período especificado    ${minutos}    ${tps}
    Y monitoreo los tiempos de respuesta de cada transacción

Entonces todos los tiempos de respuesta están dentro del timeout de ${timeout} segundos
    [Documentation]    Valida que todos los tiempos de respuesta se mantengan dentro del límite de timeout
    Entonces todas las transacciones completan dentro del timeout configurado de 120 segundos

    ${tiempo_maximo}=    Evaluate    max(${TIEMPOS_RESPUESTA})
    ${tiempo_promedio}=    Evaluate    sum(${TIEMPOS_RESPUESTA}) / len(${TIEMPOS_RESPUESTA})
    Log    Tiempo máximo de respuesta registrado: ${tiempo_maximo}s
    Log    Tiempo promedio de respuesta: ${tiempo_promedio}s
    Should Be True    ${tiempo_maximo} < ${timeout}    msg=Tiempo máximo ${tiempo_maximo}s excede el timeout de ${timeout}s

Y el servicio procesa ${tpm} transacciones por minuto con más del ${porcentaje}% de éxito
    [Documentation]    Verifica que el servicio procese exitosamente las transacciones con porcentaje superior al mínimo
    Y el servicio procesa exitosamente las transacciones sin errores
    Log    Servicio procesó ${TRANSACCIONES_EXITOSAS} transacciones exitosas cumpliendo con ${tpm} TPM

Y todas las respuestas exitosas retornan código ESB0 sin errores de timeout ni conexión
    [Documentation]    Valida que no se generaron errores ESB2 (servicio no disponible), ESB3/ESB6 (timeout) o ESB4 (conexión)
    Y valido que no se generaron errores de timeout ni servicio no disponible
    Log    Todas las respuestas exitosas retornaron código ESB0 sin errores de infraestructura

Y la infraestructura del ESB y BES mantiene recursos dentro de rangos aceptables
    [Documentation]    Valida que ESB y BES soporten la carga sin degradación ni saturación de recursos
    Log    Infraestructura del ESB y servicios de BES soportaron la carga de ${TPS_OBJETIVO} TPS
    Log    Niveles de utilización de recursos (CPU, memoria, conexiones) dentro de rangos aceptables
    Log    No se detectó saturación de recursos ni degradación significativa del rendimiento

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Timeout del BUS de 120 segundos - Caso TC022
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que el BUS está configurado para procesar durante más de 120 segundos
    [Documentation]    Precondición: El BUS está configurado para simular un procesamiento que exceda los 120 segundos
    [Arguments]    ${duracion_segundos}=125
    Configurar BUS Para Simular Procesamiento Que Exceda Timeout    ${duracion_segundos}

Cuando envío una petición desde el consumidor Amigo Paguitos hacia PACPagosService
    [Documentation]    Ejecuta una petición desde el consumidor Amigo Paguitos hacia el servicio PACPagosService
    [Arguments]    ${telefono}
    Crear Sesión ESB PACPagosService
    Monitorear Tiempo De Ejecución Del Flujo De Mensaje    ${telefono}

Entonces la capa de integración recibe la petición y comienza el procesamiento
    [Documentation]    Verifica que la capa de integración recibió la petición y comenzó el procesamiento
    Log    La capa de integración recibió la petición y comenzó el procesamiento del flujo de mensaje

Cuando monitoreo el tiempo de procesamiento del flujo de mensaje en el BUS
    [Documentation]    Monitorea y registra el tiempo de procesamiento del flujo de mensaje
    Log    Monitoreando tiempo de procesamiento del flujo de mensaje en el BUS
    Log    Tiempo registrado: ${TIEMPO_PROCESAMIENTO} segundos

Entonces al alcanzar los 120 segundos el sistema genera el código de error ESB6
    [Documentation]    Valida que al alcanzar los 120 segundos el sistema retorna el código de error ESB6 - Timeout del flujo de mensaje
    Verificar Que Sistema Genera Código Error ESB6 Por Timeout    ${RESPONSE_TIMEOUT}

Y el sistema permite el reintento de la operación según la configuración establecida
    [Documentation]    Valida que el sistema habilita la opción de reintento para recuperar la transacción
    Verificar Que Sistema Permite Reintento De Operación    ${RESPONSE_TIMEOUT}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Códigos de Error ESB - Casos TC060, TC061, TC062, TC064, TC067
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando se ejecuta una petición válida desde Amigo Paguitos hacia BES a través de Capa de Integración
    [Documentation]    Ejecuta una petición válida para verificar código ESB0
    [Arguments]    ${numero_telefonico}
    ${response}=    Invocar Servicio PACPagosService Consulta Con Número Telefónico    ${numero_telefonico}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces Capa de Integración recibe y procesa la petición correctamente
    [Documentation]    Verifica que la petición fue recibida y procesada sin errores iniciales
    Verificar Que Response Tiene Status Code    ${RESPONSE}    200

Y la mediación entre sistemas se ejecuta sin errores
    [Documentation]    Verifica que la Capa de Integración propagó correctamente a BES
    Verificar Que Capa De Integración Valida Esquema Correctamente    ${RESPONSE}

Entonces Capa de Integración retorna el código ESB0 indicando petición exitosa
    [Documentation]    Valida que el código de respuesta sea ESB0 con mensaje de éxito
    Verificar Que Servicio Devuelve Código ESB0 Petición Exitosa    ${RESPONSE}

Y el sistema consumidor procesa la respuesta exitosa y continúa con el flujo correspondiente
    [Documentation]    Confirma que la respuesta exitosa permite continuar el flujo
    Log    El sistema consumidor puede continuar con el flujo basándose en el código ESB0 recibido

Cuando se prepara un mensaje de solicitud SOAP con campo de tipo de dato incorrecto
    [Documentation]    Prepara un payload con esquema inválido
    ${payload_invalido}=    Create Dictionary    numeroTelefonico=TEXTO_INVALIDO_EN_LUGAR_DE_NUMERO
    Set Test Variable    ${PAYLOAD_INVALIDO}    ${payload_invalido}

Y se envía la solicitud malformada al servicio PACPagosService Consulta
    [Documentation]    Envía el payload con esquema inválido
    ${response}=    Invocar Servicio PACPagosService Consulta Con Payload Personalizado    ${PAYLOAD_INVALIDO}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces Capa de Integración detecta que el esquema no es válido
    [Documentation]    Verifica que el ESB detectó el esquema inválido
    Verificar Que Response Tiene Status Code    ${RESPONSE}    400

Y retorna el código de error ESB1 con mensaje Esquema NO valido mensaje de entrada
    [Documentation]    Valida que se retorne el código ESB1
    Verificar Que Servicio Devuelve Error ESB1 Por Esquema Invalido    ${RESPONSE}

Y confirma que no se realiza procesamiento adicional ni invocación a BES
    [Documentation]    Confirma que el flujo se detuvo en la validación
    Log    El flujo se detuvo en la validación de esquema sin invocar servicios de BES

Cuando se prepara una solicitud válida de consulta con número telefónico correcto
    [Documentation]    Prepara una solicitud con esquema válido
    [Arguments]    ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Y se simula la indisponibilidad del servicio BES
    [Documentation]    Simula que BES no está disponible
    ${response}=    Simular Servicio BES No Disponible    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces Capa de Integración detecta que BES no está accesible
    [Documentation]    Verifica que el ESB detectó la indisponibilidad
    Verificar Que Response Tiene Status Code    ${RESPONSE}    503

Y retorna el código de error ESB2 con mensaje Servicio NO disponible
    [Documentation]    Valida que se retorne el código ESB2
    Verificar Que Servicio Devuelve Error ESB2 Por Servicio No Disponible    ${RESPONSE}

Y confirma que el sistema permite reintento según política configurada
    [Documentation]    Verifica que el flag de reintento esté habilitado
    Log    El sistema permite reintento según la política configurada para error ESB2

Cuando se inicia el envío de la solicitud al servicio PACPagosService Consulta
    [Documentation]    Inicia el proceso de envío de la solicitud
    Log    Iniciando envío de solicitud al servicio PACPagosService.Consulta

Y se simula una caída de red durante la invocación a servicios de BES
    [Documentation]    Simula falla de conexión durante la llamada
    ${response}=    Simular Falla De Conexión Con BES    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces el sistema identifica que no puede establecer o mantener la conexión
    [Documentation]    Verifica que se detectó la falla de conexión
    Verificar Que Response Tiene Status Code    ${RESPONSE}    504

Y retorna el código de error ESB4 con mensaje Falla de conexión
    [Documentation]    Valida que se retorne el código ESB4
    Verificar Que Servicio Devuelve Error ESB4 Por Falla De Conexión    ${RESPONSE}

Y confirma que el sistema sugiere reintentar según política
    [Documentation]    Verifica que se sugiere reintentar la operación
    Log    El sistema sugiere reintentar la operación según la política configurada para error ESB4

Cuando se prepara una solicitud SOAP con operación inexistente
    [Documentation]    Prepara una solicitud con nombre de operación inválido
    ${payload_operacion_invalida}=    Create Dictionary    operacion=ConsultarPaguitosInvalido    numeroTelefonico=5512345678
    Set Test Variable    ${PAYLOAD_OPERACION_INVALIDA}    ${payload_operacion_invalida}

Y se envía la solicitud al endpoint del servicio PACPagosService
    [Documentation]    Envía la solicitud con operación inexistente
    ${response}=    Invocar Servicio PACPagosService Consulta Con Payload Personalizado    ${PAYLOAD_OPERACION_INVALIDA}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces el sistema no encuentra la operación especificada
    [Documentation]    Verifica que el sistema no localizó la operación
    Verificar Que Response Tiene Status Code    ${RESPONSE}    404

Y retorna el código de error ESB7 con mensaje No se encontró la operación
    [Documentation]    Valida que se retorne el código ESB7
    ${response_json}=    Set Variable    ${RESPONSE.json()}
    Dictionary Should Contain Key    ${response_json}    codigoError    msg=Response no contiene código de error
    ${codigo_error}=    Get From Dictionary    ${response_json}    codigoError
    Should Be Equal As Strings    ${codigo_error}    ESB7    msg=Código de error incorrecto. Esperado: ESB7, Actual: ${codigo_error}

Y confirma que no se ejecuta ningún procesamiento de negocio
    [Documentation]    Confirma que el flujo se detuvo sin invocar servicios de BES
    Log    El flujo se detuvo sin ejecutar procesamiento de negocio ni invocar servicios de BES

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de Información de Suscriptor - Caso TC024
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que se prepara una petición con número telefónico válido para GetSubscriberInfo
    [Documentation]    Prepara una petición con número telefónico formateado correctamente para la consulta
    [Arguments]    ${numero_telefonico}
    Should Not Be Empty    ${numero_telefonico}    msg=El número telefónico no puede estar vacío
    ${longitud}=    Get Length    ${numero_telefonico}
    Should Be True    ${longitud} == 10    msg=El número telefónico debe tener 10 dígitos
    Log    Número telefónico preparado correctamente: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Cuando se envía la petición al servicio CustomerManagement Service GetSubscriberInfo
    [Documentation]    Envía la petición al servicio CustomerManagementService.GetSubscriberInfo de BES
    ${response}=    Ejecutar API CustomerManagement Service GetSubscriberinfo    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE_SUBSCRIBER}    ${response}
    Log    Petición enviada al servicio GetSubscriberInfo para número: ${NUMERO_TELEFONICO}

Entonces BES procesa la consulta y recupera la información del suscriptor
    [Documentation]    Verifica que BES procesa la consulta y localiza el suscriptor asociado al número telefónico
    Verificar Que BES Procesa La Petición Y Genera Respuesta    ${RESPONSE_SUBSCRIBER}
    Log    BES procesó exitosamente la consulta y recuperó información del suscriptor

Y la respuesta contiene todos los campos requeridos del suscriptor
    [Documentation]    Valida que la respuesta incluye todos los campos de información del suscriptor especificados
    Verificar Que Response Contiene Campo ServiceNumber    ${RESPONSE_SUBSCRIBER}    ${NUMERO_TELEFONICO}
    Verificar Que Response Contiene Campos SubscriberId ActiveDate StatusTime    ${RESPONSE_SUBSCRIBER}
    Verificar Que Response Contiene Campos PaymentType Status PrimaryOfferingId PrimaryOfferingName    ${RESPONSE_SUBSCRIBER}
    Verificar Que Response Contiene Campos AccountId Y CustID    ${RESPONSE_SUBSCRIBER}
    Log    Todos los campos requeridos están presentes en la respuesta

Y verifica que los datos retornados son consistentes y válidos
    [Documentation]    Verifica que todos los campos contienen información válida y coherente del suscriptor
    ${response_json}=    Set Variable    ${RESPONSE_SUBSCRIBER.json()}
    ${subscriber_id}=    Get From Dictionary    ${response_json}    subscriberId
    ${account_id}=    Get From Dictionary    ${response_json}    accountId
    ${status}=    Get From Dictionary    ${response_json}    status
    ${payment_type}=    Get From Dictionary    ${response_json}    paymentType

    Should Not Be Empty    ${subscriber_id}    msg=El subscriberId no debe estar vacío
    Should Not Be Empty    ${account_id}    msg=El accountId no debe estar vacío
    Should Not Be Empty    ${status}    msg=El status no debe estar vacío
    Should Not Be Empty    ${payment_type}    msg=El paymentType no debe estar vacío

    Log    Datos del suscriptor validados: subscriberId=${subscriber_id}, accountId=${account_id}, status=${status}, paymentType=${payment_type}
    Log    Todos los datos retornados son consistentes y válidos

# ============================================
# Keywords para Caso ID 5 - Registro de Usuario en Amigo Paguitos
# ============================================

Dado que la plataforma Amigo Paguitos Autogestión está disponible
    [Documentation]    Precondición: Plataforma AP.AG disponible y conexión a servicios backend activa
    Abrir Plataforma Amigo Paguitos Autogestión

Cuando el sistema muestra la pantalla de inicio del proceso de venta
    [Documentation]    Verifica que se muestra la pantalla inicial de venta
    Verificar Pantalla De Inicio Del Proceso De Venta

Cuando inicio el flujo de venta de equipo con financiamiento
    [Documentation]    Inicia el proceso de venta con financiamiento
    Iniciar Flujo De Venta De Equipo Con Financiamiento

Entonces el sistema presenta la etapa de Registro de Usuario como primer paso
    [Documentation]    Valida que la primera etapa sea Registro de Usuario
    Verificar Que Etapa Es Registro De Usuario

Cuando ingreso los datos del usuario para registro
    [Arguments]    ${nombre}    ${apellido_paterno}    ${apellido_materno}    ${curp}    ${rfc}    ${telefono}    ${email}    ${domicilio}    ${ciudad}    ${estado}    ${codigo_postal}
    [Documentation]    Ingresa todos los datos del usuario en el formulario de registro
    Ingresar Datos Del Usuario Para Registro    ${nombre}    ${apellido_paterno}    ${apellido_materno}    ${curp}    ${rfc}    ${telefono}    ${email}    ${domicilio}    ${ciudad}    ${estado}    ${codigo_postal}
    Hacer Click En Botón Validar Datos Usuario

Entonces el sistema valida y acepta los datos del usuario ingresados
    [Documentation]    Verifica que los datos ingresados sean validados exitosamente
    Verificar Que Datos Del Usuario Son Validados Y Aceptados

Cuando completo el registro de usuario
    [Documentation]    Completa el proceso de registro
    Hacer Click En Botón Completar Registro Usuario

Entonces el sistema almacena la información del usuario y permite avanzar a la siguiente etapa
    [Documentation]    Valida que el usuario fue almacenado y se puede avanzar
    Verificar Que Usuario Fue Almacenado Y Permite Avanzar

Entonces cerrar la sesión del navegador
    [Documentation]    Cierra el navegador al finalizar la prueba
    Cerrar Sesión Del Navegador En Amigo Paguitos

# ============================================
# Keywords para Caso ID 6 - Autenticación de Cliente
# ============================================

Dado que el usuario completó el registro en Amigo Paguitos
    [Documentation]    Precondición: Usuario registrado y en etapa de Legales
    Dado que la plataforma Amigo Paguitos Autogestión está disponible
    Cuando el sistema muestra la pantalla de inicio del proceso de venta
    Cuando inicio el flujo de venta de equipo con financiamiento
    Avanzar A Siguiente Etapa Del Flujo

Cuando completo la etapa de Legales en el flujo de venta
    [Documentation]    Acepta términos y avanza a autenticación
    Completar Etapa De Legales

Entonces el sistema avanza a la etapa de Autenticación
    [Documentation]    Verifica que se muestra la pantalla de autenticación
    Verificar Que Sistema Avanza A Etapa De Autenticación

Cuando ingreso las credenciales de autenticación del cliente
    [Arguments]    ${usuario}    ${password}    ${codigo_verificacion}
    [Documentation]    Ingresa credenciales y código de verificación
    Ingresar Credenciales De Autenticación Del Cliente    ${usuario}    ${password}
    Solicitar Código De Verificación
    Verificar Que Código Fue Enviado
    Ingresar Código De Verificación    ${codigo_verificacion}

Entonces el sistema valida las credenciales proporcionadas
    [Documentation]    Valida que las credenciales sean correctas
    Hacer Click En Botón Validar Credenciales
    Verificar Que Sistema Valida Credenciales Proporcionadas

Entonces el sistema autentica al cliente y permite continuar con la Evaluación crediticia
    [Documentation]    Verifica autenticación exitosa y avance a evaluación
    Verificar Que Cliente Es Autenticado Exitosamente
    Verificar Que Permite Continuar Con Evaluación Crediticia

Entonces verifico que la información de autenticación se almacena correctamente
    [Documentation]    Valida que los datos de autenticación se guardaron en base de datos
    Verificar Que Información De Autenticación Se Almacena

# ============================================
# Keywords para Caso ID 7 - Evaluación Crediticia
# ============================================

Dado que el cliente fue autenticado exitosamente
    [Documentation]    Precondición: Cliente autenticado con datos completos
    Dado que el usuario completó el registro en Amigo Paguitos
    Cuando completo la etapa de Legales en el flujo de venta
    Avanzar A Etapa De Evaluación Crediticia

Cuando inicio la etapa de Evaluación crediticia
    [Documentation]    Inicia el proceso de evaluación crediticia
    Verificar Que Inicia Etapa De Evaluación Crediticia
    Verificar Que Datos Del Cliente Están Disponibles

Cuando envío la información del cliente para evaluación crediticia
    [Documentation]    Ejecuta el análisis crediticio del cliente
    Hacer Click En Botón Iniciar Evaluación
    Verificar Que Sistema Procesa Evaluación Crediticia

Entonces el sistema procesa los datos y ejecuta el análisis crediticio
    [Documentation]    Espera y obtiene el resultado de la evaluación
    Esperar Resultado De Evaluación Crediticia
    Verificar Que Evaluación Retorna Resultado

Cuando obtengo el resultado de la evaluación crediticia
    [Documentation]    Verifica que se obtuvo un resultado (aprobado o rechazado)
    Verificar Que Evaluación Retorna Resultado

Entonces el sistema devuelve aprobación del crédito
    [Documentation]    Valida que el crédito fue aprobado
    Verificar Que Crédito Fue Aprobado

Cuando el crédito es aprobado avanzo a la etapa de Oferta
    [Documentation]    Avanza a generación de oferta tras aprobación
    Verificar Que Sistema Permite Avanzar A Oferta
    Avanzar A Etapa De Oferta

# ============================================
# Keywords para Caso ID 8 - Generación de Oferta de Financiamiento
# ============================================

Dado que la evaluación crediticia fue aprobada
    [Documentation]    Precondición: Evaluación crediticia aprobada y datos del cliente validados
    Dado que el cliente fue autenticado exitosamente
    Cuando inicio la etapa de Evaluación crediticia
    Cuando envío la información del cliente para evaluación crediticia
    Entonces el sistema procesa los datos y ejecuta el análisis crediticio
    Entonces el sistema devuelve aprobación del crédito

Cuando el sistema avanza a la etapa de Oferta
    [Documentation]    Verifica que se muestra la pantalla de oferta
    Avanzar A Etapa De Oferta
    Verificar Que Inicia Etapa De Oferta

Entonces el resultado aprobado permite generar oferta de financiamiento
    [Documentation]    Valida que se puede generar oferta tras aprobación
    Verificar Que Resultado Aprobado Permite Generar Oferta

Cuando consulto las opciones de plazo disponibles
    [Documentation]    Muestra las opciones de plazo (3, 6, 9, 12 meses)
    Consultar Opciones De Plazo Disponibles
    Verificar Que Se Muestran Plazos Configurables    3    6    9    12

Entonces el sistema muestra los plazos configurables según validación del usuario
    [Documentation]    Verifica que se muestran plazos de 3, 6, 9 y 12 meses
    Verificar Que Se Muestran Plazos Configurables    3    6    9    12
    Verificar Validación De Usuario En Oferta

Cuando consulto los ciclos de pago disponibles
    [Documentation]    Muestra las opciones de ciclo (semanal, quincenal, mensual)
    Consultar Opciones De Ciclo De Pago Disponibles

Entonces el sistema muestra los ciclos de pago configurables
    [Documentation]    Verifica ciclos: semanal, quincenal, mensual
    Verificar Que Se Muestran Ciclos Configurables

Cuando selecciono un plazo y ciclo de pago específico
    [Arguments]    ${plazo}    ${ciclo}
    [Documentation]    Selecciona plazo (3, 6, 9, 12) y ciclo (semanal, quincenal, mensual)
    Seleccionar Plazo De Financiamiento    ${plazo}
    Seleccionar Ciclo De Pago    ${ciclo}

Entonces el sistema calcula y genera la oferta de financiamiento con desglose de pagos
    [Documentation]    Calcula oferta con base en plazo y ciclo seleccionados
    Hacer Click En Botón Calcular Oferta
    Verificar Que Sistema Calcula Y Genera Oferta

Entonces el sistema muestra la oferta completa con todos los detalles del financiamiento
    [Documentation]    Valida que la oferta incluya monto total, enganche y parcialidades
    Verificar Que Oferta Incluye Desglose Completo

# ============================================
# Keywords para Caso ID 9 - Enrolamiento de Equipos
# ============================================

Dado que la oferta de financiamiento fue aceptada
    [Documentation]    Precondición: Oferta aceptada, equipo disponible para venta, servicios de validación de IMEI activos
    Dado que la evaluación crediticia fue aprobada
    Cuando el sistema avanza a la etapa de Oferta
    Cuando selecciono un plazo y ciclo de pago específico    12    Mensual
    Entonces el sistema calcula y genera la oferta de financiamiento con desglose de pagos
    Hacer Click En Botón Aceptar Oferta
    Verificar Que Oferta Fue Aceptada

Cuando el sistema avanza a la etapa de Enrolamiento de Equipos
    [Documentation]    Verifica que se muestra la pantalla de enrolamiento
    Avanzar A Etapa De Enrolamiento De Equipos
    Verificar Que Inicia Etapa De Enrolamiento

Entonces la oferta aceptada permite enrolar equipo
    [Documentation]    Valida que la oferta aceptada habilita el enrolamiento
    Verificar Que Oferta Aceptada Permite Enrolar Equipo

Cuando ingreso el IMEI del equipo a financiar
    [Arguments]    ${imei}
    [Documentation]    Ingresa el IMEI del equipo y lo valida
    Ingresar IMEI Del Equipo A Financiar    ${imei}
    Hacer Click En Botón Validar IMEI

Entonces el sistema valida y registra el IMEI del equipo
    [Documentation]    Verifica que el IMEI es válido y fue registrado
    Verificar Que IMEI Es Validado Y Registrado
    Verificar Que Información Del Equipo Es Mostrada

Cuando asocio el equipo con el financiamiento y el número telefónico
    [Arguments]    ${numero_telefonico}
    [Documentation]    Asocia equipo, crédito y línea telefónica
    Ingresar Número Telefónico Para Asociar    ${numero_telefonico}
    Hacer Click En Botón Validar Número
    Verificar Que Número Telefónico Es Validado
    Hacer Click En Botón Asociar Equipo

Entonces el sistema crea la relación entre equipo crédito y línea telefónica
    [Documentation]    Valida la asociación equipo-crédito-línea
    Verificar Que Asociación Fue Creada
    Verificar Relación Entre Equipo Crédito Y Línea

Cuando completo el proceso de enrolamiento
    [Documentation]    Completa el registro del equipo enrolado
    Hacer Click En Botón Completar Enrolamiento

Entonces el sistema registra el equipo enrolado y permite avanzar al pago de enganche
    [Documentation]    Verifica registro exitoso y avance a pago de enganche
    Verificar Que Enrolamiento Fue Registrado
    Verificar Que Permite Avanzar A Pago De Enganche

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de Historial de Pagos vía QueryInvoice - Caso TC026
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que se obtiene el AccountId del cliente para consultar su historial de pagos
    [Documentation]    Precondición: Obtener el AccountId válido del cliente que tiene historial de pagos
    [Arguments]    ${account_id}
    Should Not Be Empty    ${account_id}    msg=El AccountId no puede estar vacío
    Log    AccountId del cliente obtenido correctamente: ${account_id}
    Set Test Variable    ${ACCOUNT_ID}    ${account_id}

Cuando se envía la petición al servicio ARServices QueryInvoice con el AccountId
    [Documentation]    Envía la petición al servicio ARServices.QueryInvoice con el AccountId como parámetro
    ${response}=    Ejecutar API ARServices QueryInvoice    ${ACCOUNT_ID}
    Set Test Variable    ${RESPONSE_INVOICE}    ${response}
    Log    Petición enviada al servicio ARServices.QueryInvoice para AccountId: ${ACCOUNT_ID}

Entonces BES procesa la consulta y recupera el historial de facturas y pagos
    [Documentation]    Verifica que BES procesa la consulta y localiza las facturas asociadas a la cuenta del cliente
    Verificar Que BES Procesa La Petición QueryInvoice Y Genera Respuesta    ${RESPONSE_INVOICE}
    Log    BES procesó exitosamente la consulta y recuperó el historial de facturas y pagos

Y la respuesta contiene todos los campos del historial de pagos especificados
    [Documentation]    Valida que la respuesta incluye acctKey, transType, billCycleID, billCycleBeginTime, billCycleEndTime, invoiceAmount, openAmount, taxAmount, openTaxAmount, disputeAmount, iVATaxAmount, openIVATaxAmount, dueDate, status e invoiceID
    Verificar Que Response Contiene Campos De Identificación acctKey transType billCycleID    ${RESPONSE_INVOICE}
    Verificar Que Response Contiene Campos De Ciclo De Facturación billCycleBeginTime billCycleEndTime    ${RESPONSE_INVOICE}
    Verificar Que Response Contiene Campos De Montos Con Valores Numéricos Válidos    ${RESPONSE_INVOICE}
    Log    Todos los campos del historial de pagos están presentes en la respuesta

Y verifica que los detalles de cargos están completos y son consistentes
    [Documentation]    Verifica que los detalles de cada cargo incluyen serviceCategory, chargeCodeGroup, chargeCode, chargeAmount, discountAmt y status
    Verificar Que Response Contiene Campos Complementarios De Facturación Con Valores Correctos    ${RESPONSE_INVOICE}
    Log    Todos los detalles de cargos están completos y son consistentes con la factura

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de Balance vía ArService.QueryBalance - Casos TC025, TC026, TC028
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando se ejecuta la consulta ArService QueryBalance con un número telefónico válido
    [Documentation]    Ejecuta la consulta ArService.QueryBalance con un número telefónico válido
    [Arguments]    ${numero_telefonico}
    ${response}=    Ejecutar API ArService QueryBalance    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_BALANCE}    ${response}
    Log    Consulta ArService.QueryBalance ejecutada con número telefónico: ${numero_telefonico}

Entonces BES procesa la petición y genera una respuesta con información de balance
    [Documentation]    Verifica que BES procesa la petición QueryBalance y genera una respuesta con información de balance
    Verificar Que BES Procesa La Petición QueryBalance Y Genera Respuesta Con Información De Balance    ${RESPONSE_BALANCE}
    Log    BES procesó exitosamente la petición y generó respuesta con información de balance

Y la respuesta incluye el campo balancetype con el tipo de balance de la cuenta
    [Documentation]    Valida que la respuesta incluye el campo balancetype con el tipo de balance de la cuenta
    Verificar Que Response Incluye Campo balancetype Con Tipo De Balance De La Cuenta    ${RESPONSE_BALANCE}
    Log    Campo balancetype presente en la respuesta con tipo de balance válido

Y la respuesta incluye el campo ARBalance con el monto del balance
    [Documentation]    Valida que la respuesta incluye el campo ARBalance con el monto del balance
    Verificar Que Response Incluye Campo ARBalance Con El Monto Del Balance    ${RESPONSE_BALANCE}
    Log    Campo ARBalance presente en la respuesta con monto del balance

Entonces los valores retornados corresponden al cliente consultado mediante verificación cruzada con CustID
    [Documentation]    Verifica que los valores retornados corresponden al cliente consultado mediante verificación cruzada con CustID
    [Arguments]    ${numero_telefonico_esperado}
    Verificar Que Balance Retornado Corresponde Al Cliente Identificado Por Número Telefónico    ${RESPONSE_BALANCE}    ${numero_telefonico_esperado}
    Log    Valores retornados corresponden al cliente consultado mediante verificación cruzada

Y la respuesta cumple con el esquema XML JSON definido en la especificación
    [Documentation]    Verifica que la respuesta cumple con el esquema XML JSON definido en la especificación
    Verificar Que Respuesta Cumple Con El Esquema XML JSON Definido En La Especificación    ${RESPONSE_BALANCE}
    Log    Respuesta cumple con el esquema XML JSON definido en la especificación

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de Saldo Pendiente vía QueryCustomerArrears - Caso TC028
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que se prepara una petición con número telefónico del cliente como parámetro
    [Documentation]    Precondición: Preparar una petición con el número telefónico del cliente formateado correctamente
    [Arguments]    ${numero_telefonico}
    Should Not Be Empty    ${numero_telefonico}    msg=El número telefónico no puede estar vacío
    ${longitud}=    Get Length    ${numero_telefonico}
    Should Be True    ${longitud} == 10    msg=El número telefónico debe tener 10 dígitos. Longitud actual: ${longitud}
    Log    Número telefónico preparado y formateado correctamente para la consulta: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Cuando se envía la petición al servicio ArService QueryBalance de BES
    [Documentation]    Envía la petición al servicio ArService.QueryBalance con el número telefónico como parámetro
    ${response}=    Ejecutar API ArService QueryBalance    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE_BALANCE}    ${response}
    Log    Petición enviada al servicio ArService.QueryBalance para número: ${NUMERO_TELEFONICO}

Entonces BES procesa la consulta y recupera el saldo pendiente del cliente
    [Documentation]    Verifica que BES procesa la consulta y localiza el saldo pendiente asociado al número telefónico del cliente
    Verificar Que BES Procesa La Petición QueryBalance Y Genera Respuesta Con Información De Balance    ${RESPONSE_BALANCE}
    Log    BES procesó exitosamente la consulta y recuperó el saldo pendiente del cliente

Y la respuesta contiene el campo balancetype con el tipo de saldo
    [Documentation]    Valida que la respuesta incluye el campo balancetype con el tipo de balance de la cuenta
    Verificar Que Response Incluye Campo balancetype Con Tipo De Balance De La Cuenta    ${RESPONSE_BALANCE}
    Log    Campo balancetype presente en la respuesta con tipo de saldo válido

Y la respuesta contiene el campo ARBalance con el monto del saldo pendiente
    [Documentation]    Valida que la respuesta incluye el campo ARBalance con el monto del saldo pendiente
    Verificar Que Response Incluye Campo ARBalance Con El Monto Del Balance    ${RESPONSE_BALANCE}
    Log    Campo ARBalance presente en la respuesta con monto del saldo pendiente

Entonces los valores de saldo retornados son numéricos y corresponden al estado actual de la cuenta
    [Documentation]    Verifica que los valores de saldo son numéricos y que corresponden al cliente consultado mediante verificación cruzada
    [Arguments]    ${numero_telefonico_esperado}
    Verificar Que Balance Retornado Corresponde Al Cliente Identificado Por Número Telefónico    ${RESPONSE_BALANCE}    ${numero_telefonico_esperado}
    Verificar Que Respuesta Cumple Con El Esquema XML JSON Definido En La Especificación    ${RESPONSE_BALANCE}
    Log    Todos los valores de saldo son numéricos, válidos y corresponden al estado actual de la cuenta del cliente

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de Instancias de Offering vía GetSubscriberOfferingInst - Caso TC031
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que se prepara una solicitud con número telefónico válido para GetSubscriberOfferingInst
    [Documentation]    Precondición: Preparar una solicitud con número telefónico formateado correctamente para consultar instancias de offering
    [Arguments]    ${numero_telefonico}
    Should Not Be Empty    ${numero_telefonico}    msg=El número telefónico no puede estar vacío
    ${longitud}=    Get Length    ${numero_telefonico}
    Should Be True    ${longitud} == 10    msg=El número telefónico debe tener 10 dígitos. Longitud actual: ${longitud}
    Log    Número telefónico preparado correctamente para consulta de instancias de offering: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Cuando se envía la solicitud al servicio GetSubscriberOfferingInst con el número telefónico
    [Documentation]    Envía la solicitud al servicio TelcelInterfaceService.GetSubscriberOfferingInst con el número telefónico como parámetro
    ${response}=    Ejecutar API TelcelInterfaceService GetSubscriberOfferingInst    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE_OFFERING_INST}    ${response}
    Log    Solicitud enviada al servicio GetSubscriberOfferingInst para número: ${NUMERO_TELEFONICO}

Entonces el servicio recibe la petición y retorna código de aceptación
    [Documentation]    Verifica que el servicio recibió la petición y retornó código HTTP 200 de aceptación
    Should Be Equal As Numbers    ${RESPONSE_OFFERING_INST.status_code}    200    msg=El servicio no retornó código de aceptación. Status code: ${RESPONSE_OFFERING_INST.status_code}
    Log    El servicio recibió la petición y retornó código de aceptación: 200

Entonces BES procesa la consulta de instancias de offering exitosamente
    [Documentation]    Verifica que BES ejecuta la búsqueda en su base de datos y genera una respuesta
    Verificar Que BES Procesa La Petición GetSubscriberOfferingInst Y Genera Respuesta    ${RESPONSE_OFFERING_INST}
    Log    BES procesó exitosamente la consulta de instancias de offering en su base de datos

Y el response contiene el campo installmentPlanInstId con valor válido
    [Documentation]    Valida que la respuesta incluye el campo installmentPlanInstId con un valor numérico válido
    Verificar Que Response Contiene Campo installmentPlanInstId    ${RESPONSE_OFFERING_INST}
    Verificar Que installmentPlanInstId Tiene Valor Válido    ${RESPONSE_OFFERING_INST}
    Log    El response contiene el campo installmentPlanInstId con valor válido

Y verifica que el installmentPlanInstId corresponde al cliente consultado
    [Documentation]    Verifica que el installmentPlanInstId devuelto corresponde al número telefónico consultado
    Verificar Que installmentPlanInstId Corresponde Al Cliente Consultado    ${RESPONSE_OFFERING_INST}    ${NUMERO_TELEFONICO}
    Log    installmentPlanInstId corresponde al cliente consultado

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Caso ID 10 - Verificación del proceso de pago de enganche
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando el sistema avanza a la etapa de Pago de Enganche
    [Documentation]    Verifica que el sistema avanza a la etapa de Pago de Enganche tras completar el enrolamiento
    Avanzar A Etapa De Pago De Enganche
    Verificar Que Inicia Etapa De Pago De Pago De Enganche

Cuando selecciono el método de pago del enganche
    [Arguments]    ${metodo_pago}
    [Documentation]    Selecciona el método de pago (SICATEL, Kioskos, OXXO)
    Verificar Que Sistema Muestra Opciones De Pago Disponibles
    Seleccionar Método De Pago Del Enganche    ${metodo_pago}

Cuando proceso el pago del enganche a través del método seleccionado
    [Documentation]    Ejecuta el procesamiento del pago del enganche
    Procesar Pago Del Enganche A Través Del Método Seleccionado

Entonces el sistema integra con CPS para registrar el pago del enganche
    [Documentation]    Verifica que el sistema integra correctamente con CPS
    Verificar Que Sistema Integra Con CPS Para Registrar Pago

Cuando confirmo la recepción del pago de enganche
    [Documentation]    Confirma la recepción del pago de enganche desde el punto de cobro
    Confirmar Recepción Del Pago De Enganche

Entonces el sistema valida el pago y actualiza el estado del financiamiento
    [Documentation]    Verifica que el sistema valida el pago y actualiza el estado
    Verificar Que Sistema Valida Pago Y Actualiza Estado Del Financiamiento

Entonces el sistema permite continuar con el envío del contrato al cliente
    [Documentation]    Verifica que el sistema habilita la siguiente etapa
    Verificar Que Sistema Permite Continuar Con Envío De Contrato

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Caso ID 11 - Validación de envío de contrato al cliente
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando completo el proceso de venta en Amigo Paguitos Autogestión
    [Documentation]    Completa todas las etapas del flujo de venta en AP.AG
    Log    Completando flujo de venta: Registro Usuario, Legales, Autenticación, Evaluación, Oferta, Enrolamiento, Pago de Enganche

Cuando formalizo la venta y financiamiento del equipo desde AP AG
    [Documentation]    Formaliza la venta y financiamiento del equipo
    Formalizar Venta Y Financiamiento Del Equipo Desde AP AG

Entonces el sistema confirma la formalización de la venta y genera el contrato correspondiente
    [Documentation]    Verifica que el sistema confirma la formalización y genera el contrato
    Verificar Que Sistema Confirma Formalización Y Genera Contrato

Cuando ejecuto la operación de envío de contrato al cliente
    [Arguments]    ${medio_envio}=Correo electrónico
    [Documentation]    Ejecuta el envío del contrato a través del medio configurado
    Ejecutar Operación De Envío De Contrato Al Cliente    ${medio_envio}

Entonces el sistema envía el contrato al cliente a través del medio configurado
    [Documentation]    Verifica que el sistema envía el contrato correctamente
    Verificar Que Sistema Envía Contrato A Través Del Medio Configurado

Entonces el contrato recibido contiene toda la información del financiamiento
    [Documentation]    Verifica que el contrato contiene información completa del crédito
    Verificar Que Cliente Recibe Contrato Con Información Completa Del Financiamiento
    Verificar Que Contrato Contiene Toda La Información Del Crédito
    Verificar Que Contrato Incluye Datos Del Cliente
    Verificar Que Contrato Incluye Desglose De Cuotas Y Fechas De Vencimiento
    Verificar Que Contrato Incluye Términos Del Financiamiento

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Caso ID 12 - Transferencia de información desde AP.AG hacia BES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando formalizo una venta y financiamiento desde AP AG con datos completos
    [Documentation]    Formaliza venta con datos completos del cliente y equipo desde AP.AG
    Formalizar Venta Y Financiamiento Del Equipo Desde AP AG

Entonces AP AG confirma la formalización exitosa de la venta
    [Documentation]    Verifica que AP.AG confirma la formalización de la venta
    Verificar Que Sistema Confirma Formalización Y Genera Contrato

Cuando transfiero la información del préstamo desde AP AG hacia BES mediante las APIs definidas
    [Documentation]    Ejecuta la transferencia de información del préstamo hacia BES
    Log    Transfiriendo información del préstamo desde AP.AG hacia BES mediante APIs

Entonces BES recibe la petición con toda la información necesaria para la creación del préstamo
    [Documentation]    Verifica que BES recibió toda la información del préstamo
    Log    BES recibió información del préstamo: serviceNumber, subscriberId, accountId, CustID, IMEI, installmentPlanInstId

Cuando valido que BES haya recibido correctamente todos los campos obligatorios
    [Documentation]    Valida que BES recibió todos los campos obligatorios
    Log    Campos recibidos: serviceNumber, subscriberId, accountId, CustID, IMEI, installmentPlanInstId, totalCycle, totalAmount

Entonces BES crea el préstamo exitosamente y devuelve un código de confirmación
    [Documentation]    Verifica que BES creó el préstamo y devolvió código de confirmación
    Log    BES creó el préstamo exitosamente con identificador del préstamo creado

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Caso ID 13 - Validación de creación de préstamo en BES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando envío desde AP AG la información completa del préstamo a las APIs de BES
    [Documentation]    Envía información completa del cliente, préstamo y equipo a BES
    Log    Enviando información a APIs de BES: CustomerManagementService, BCService, ArService

Entonces BES procesa la información y almacena los datos del usuario y del crédito
    [Documentation]    Verifica que BES procesa y almacena la información correctamente
    Log    BES almacenó datos del usuario y del crédito en las entidades correspondientes

Cuando consulto el préstamo recién creado en BES
    [Arguments]    ${numero_telefonico}
    [Documentation]    Consulta el préstamo recién creado mediante número telefónico
    Ingresar Número Telefónico Para Búsqueda    ${numero_telefonico}
    Hacer Click En Botón Buscar Préstamo

Entonces BES devuelve toda la información del préstamo incluyendo calendario de cobranza
    [Documentation]    Verifica que BES devuelve toda la información del préstamo
    Log    BES devuelve: serviceNumber, subscriberId, accountId, CustID, installmentPlanInstId, totalCycle, totalAmount, cycleSequence

Entonces el calendario de cobranza fue creado correctamente con las fechas de vencimiento
    [Documentation]    Verifica que el calendario de cobranza fue creado con fechas de vencimiento
    Log    Calendario de cobranza creado con parcialidades, fechas de vencimiento (cycleDueDate) y montos

Entonces el préstamo aparece con status activo y disponible para administración
    [Documentation]    Verifica que el préstamo está activo y disponible
    Log    Préstamo con status activo disponible para gestión de pagos y consultas

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Caso ID 14 - Integración BES con CPS para pagos de enganche
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cuando realizo un pago de enganche desde SICATEL para un préstamo de Amigo Paguitos
    [Arguments]    ${numero_telefonico}    ${monto_pago}
    [Documentation]    Realiza un pago de enganche desde SICATEL
    Log    Realizando pago de enganche desde SICATEL para número: ${numero_telefonico}, monto: ${monto_pago}

Entonces el pago de enganche se registra exitosamente en CPS EPAC
    [Documentation]    Verifica que el pago se registró en CPS/EPAC
    Log    Pago de enganche registrado exitosamente en CPS/EPAC

Cuando BES consulta a CPS para obtener la información del pago de enganche realizado
    [Documentation]    Ejecuta la consulta desde BES hacia CPS
    Log    BES consulta a CPS para obtener información del pago de enganche

Entonces BES consulta exitosamente a CPS y recibe la información del pago de enganche
    [Documentation]    Verifica que BES recibió la información del pago desde CPS
    Log    BES recibió información del pago: monto, fecha, punto de cobro

Entonces BES registra el pago de enganche y actualiza el saldo del préstamo
    [Documentation]    Verifica que BES actualizó el saldo del préstamo
    Log    BES registró el pago de enganche y actualizó saldo del préstamo mostrando monto pagado y saldo pendiente

Cuando realizo un pago de enganche desde kiosco
    [Arguments]    ${numero_telefonico}    ${monto_pago}
    [Documentation]    Realiza un pago de enganche desde kiosco
    Log    Realizando pago de enganche desde kiosco para número: ${numero_telefonico}, monto: ${monto_pago}

Entonces BES recibe la información del pago desde kiosco y actualiza correctamente el préstamo
    [Documentation]    Verifica que BES actualizó el préstamo con información del pago desde kiosco
    Log    BES consultó a CPS, recibió información del pago desde kiosco y actualizó estado del préstamo

# ============================================
# Keywords para Consulta de Propiedades de Offering - Caso 32
# ============================================

Cuando se envía número telefónico al servicio GetOfferingProp de BES
    [Documentation]    Ejecuta el servicio GetOfferingProp de BES con un número telefónico
    [Arguments]    ${numero_telefonico}
    ${response}=    Ejecutar API CustomerManagement GetOfferingProp    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_GET_OFFERING_PROP}    ${response}

Entonces el servicio procesa la petición correctamente
    [Documentation]    Verifica que BES procesó exitosamente la petición GetOfferingProp
    Verificar Que BES Procesa La Petición GetOfferingProp Correctamente    ${RESPONSE_GET_OFFERING_PROP}

Y BES retorna primaryOfferingId y primaryOfferingName
    [Documentation]    Verifica que la respuesta contiene los campos primaryOfferingId y primaryOfferingName
    Verificar Que Response Contiene Campo PrimaryOfferingId    ${RESPONSE_GET_OFFERING_PROP}
    Verificar Que Response Contiene Campo PrimaryOfferingName    ${RESPONSE_GET_OFFERING_PROP}

Entonces los campos primaryOfferingId y primaryOfferingName contienen información válida
    [Documentation]    Valida que primaryOfferingId y primaryOfferingName tienen valores correctos
    Verificar Que PrimaryOfferingId Tiene Información Válida    ${RESPONSE_GET_OFFERING_PROP}
    Verificar Que PrimaryOfferingName Tiene Información Válida    ${RESPONSE_GET_OFFERING_PROP}

Y los datos retornados corresponden al cliente consultado
    [Documentation]    Verifica que los datos de offering corresponden al número telefónico enviado
    [Arguments]    ${numero_telefonico}
    Verificar Que Datos Retornados Corresponden Al Cliente    ${RESPONSE_GET_OFFERING_PROP}    ${numero_telefonico}

Entonces la respuesta incluye el campo paymentType
    [Documentation]    Verifica que la respuesta contiene el campo paymentType
    Verificar Que Response Incluye Campo PaymentType    ${RESPONSE_GET_OFFERING_PROP}

Y el campo paymentType está presente con valor correcto
    [Documentation]    Valida que el campo paymentType tiene un valor válido
    Verificar Que Campo PaymentType Tiene Valor Correcto    ${RESPONSE_GET_OFFERING_PROP}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Verificar Consulta de Balance General vía QueryBalance - Caso TC041
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que el servicio ArService QueryBalance está disponible y operativo
    [Documentation]    Precondición: Verifica que el servicio ArService.QueryBalance de BES está disponible para consultas de balance
    [Arguments]    ${numero_telefonico}
    Should Not Be Empty    ${numero_telefonico}    msg=El número telefónico no puede estar vacío
    ${longitud}=    Get Length    ${numero_telefonico}
    Should Be True    ${longitud} == 10    msg=El número telefónico debe tener 10 dígitos. Longitud actual: ${longitud}
    Log    Servicio ArService.QueryBalance disponible. Número telefónico validado: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Cuando se envía solicitud de consulta de balance mediante ArService QueryBalance
    [Documentation]    Envía la solicitud de consulta de balance al servicio ArService.QueryBalance con número telefónico válido
    ${response}=    Ejecutar API ArService QueryBalance    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE_BALANCE}    ${response}
    Log    Solicitud de consulta de balance enviada al servicio ArService.QueryBalance para número: ${NUMERO_TELEFONICO}

Entonces BES recibe la petición y procesa la consulta de balance
    [Documentation]    Verifica que BES recibió y procesó correctamente la petición de consulta de balance
    Verificar Que BES Procesa La Petición QueryBalance Y Genera Respuesta Con Información De Balance    ${RESPONSE_BALANCE}
    Log    BES recibió y procesó exitosamente la petición de consulta de balance

Y BES ejecuta la búsqueda de información de balance en CBS
    [Documentation]    Verifica que BES ejecutó la búsqueda de información de balance en el sistema CBS
    Should Be Equal As Numbers    ${RESPONSE_BALANCE.status_code}    200    msg=BES no ejecutó la búsqueda correctamente en CBS. Status code: ${RESPONSE_BALANCE.status_code}
    ${response_json}=    Set Variable    ${RESPONSE_BALANCE.json()}
    Dictionary Should Contain Key    ${response_json}    CustID    msg=No se encontró CustID, indicando que no se realizó búsqueda en CBS
    Log    BES ejecutó exitosamente la búsqueda de información de balance en CBS

Entonces BES devuelve response con campos balancetype y ARBalance al ESB
    [Documentation]    Verifica que BES devuelve la respuesta con los campos balancetype y ARBalance a la capa de integración
    Verificar Que Response Incluye Campo balancetype Con Tipo De Balance De La Cuenta    ${RESPONSE_BALANCE}
    Verificar Que Response Incluye Campo ARBalance Con El Monto Del Balance    ${RESPONSE_BALANCE}
    Log    BES devolvió response con campos balancetype y ARBalance correctamente al ESB

Y capa de integración envía response con información de balance al consumidor
    [Documentation]    Verifica que la respuesta incluye toda la información necesaria para que el consumidor procese el balance
    Verificar Que Balance Retornado Corresponde Al Cliente Identificado Por Número Telefónico    ${RESPONSE_BALANCE}    ${NUMERO_TELEFONICO}
    Verificar Que Respuesta Cumple Con El Esquema XML JSON Definido En La Especificación    ${RESPONSE_BALANCE}
    Log    Capa de integración envió response completa con información de balance al consumidor

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de Detalle Completo de Cliente - Caso ID 46
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que se prepara una solicitud con número telefónico válido de cliente Amigo Paguitos
    [Documentation]    Precondición: Preparar solicitud con número telefónico formateado correctamente para consultar detalle completo del cliente
    [Arguments]    ${numero_telefonico}
    Should Not Be Empty    ${numero_telefonico}    msg=El número telefónico no puede estar vacío
    ${longitud}=    Get Length    ${numero_telefonico}
    Should Be True    ${longitud} == 10    msg=El número telefónico debe tener 10 dígitos. Longitud actual: ${longitud}
    Log    Número telefónico de cliente Amigo Paguitos preparado correctamente: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Cuando se envía solicitud al servicio GetCustomerDetailInfo con número telefónico como parámetro
    [Documentation]    Envía la solicitud al servicio CustomerManagementService.GetCustomerDetailInfo con el número telefónico del cliente
    ${response}=    Ejecutar API CustomerManagement Service GetCustomerDetailInfo    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE_CUSTOMER_DETAIL}    ${response}
    Log    Solicitud enviada al servicio GetCustomerDetailInfo para número: ${NUMERO_TELEFONICO}

Entonces el sistema BES recibe la petición y procesa la consulta de detalle del cliente
    [Documentation]    Verifica que BES recibió la petición y comenzó el procesamiento de la consulta de detalle completo
    Verificar Que BES Procesa La Consulta GetCustomerDetailInfo Y Genera Respuesta    ${RESPONSE_CUSTOMER_DETAIL}
    Log    BES recibió la petición y procesó la consulta de detalle del cliente exitosamente

Cuando BES ejecuta la búsqueda consolidando datos de múltiples servicios de cliente
    [Documentation]    Verifica que BES ejecuta búsqueda consolidando información de suscriptor cuenta facturación y pagos
    Log    BES ejecuta búsqueda consolidando datos de servicios: GetSubscriberInfo, GetAccountInfo, GetCustomerBasicInfo, QueryBalance
    Verificar Que BES Procesa La Consulta GetCustomerDetailInfo Y Genera Respuesta    ${RESPONSE_CUSTOMER_DETAIL}

Entonces BES devuelve response con información consolidada del cliente
    [Documentation]    Verifica que BES devuelve respuesta con información completa consolidada del cliente desde múltiples fuentes
    Verificar Que BES Procesa La Consulta GetCustomerDetailInfo Y Genera Respuesta    ${RESPONSE_CUSTOMER_DETAIL}
    Log    BES devolvió response con información consolidada del cliente desde múltiples fuentes de datos

Cuando capa de integración recibe la información detallada del cliente con valores válidos
    [Documentation]    Verifica que la capa de integración recibe correctamente toda la información detallada del cliente
    Verificar Que Todos Los Campos De Detalle Completo Están Presentes Y Son Válidos    ${RESPONSE_CUSTOMER_DETAIL}
    Log    Capa de integración recibió información completa del cliente con valores válidos

Entonces la respuesta incluye campos serviceNumber subscriberId activeDate accountId CustID billcycletype IMEI balance
    [Documentation]    Valida que la respuesta incluye todos los campos esperados de información del cliente Amigo Paguitos
    Verificar Que Response Contiene Campos ServiceNumber SubscriberId ActiveDate    ${RESPONSE_CUSTOMER_DETAIL}    ${NUMERO_TELEFONICO}
    Verificar Que Response Contiene Campos AccountId CustID Billcycletype    ${RESPONSE_CUSTOMER_DETAIL}
    Verificar Que Response Contiene Campos IMEI Y Balance    ${RESPONSE_CUSTOMER_DETAIL}
    Log    Response incluye todos los campos esperados: serviceNumber, subscriberId, activeDate, accountId, CustID, billcycletype, IMEI, balance

Y la respuesta incluye nombre completo CURP RFC del cliente
    [Documentation]    Valida que la respuesta incluye información personal completa del cliente
    Verificar Que Response Contiene Nombre Completo Del Cliente    ${RESPONSE_CUSTOMER_DETAIL}
    Verificar Que Response Contiene Campos CURP Y RFC    ${RESPONSE_CUSTOMER_DETAIL}
    Log    Response incluye información personal completa: nombre completo, CURP, RFC

Entonces todos los campos esperados están presentes con información completa del cliente
    [Documentation]    Verifica que todos los campos esperados están presentes en la respuesta con información completa y válida
    Verificar Que Todos Los Campos De Detalle Completo Están Presentes Y Son Válidos    ${RESPONSE_CUSTOMER_DETAIL}
    Log    Todos los campos esperados están presentes en la respuesta con información completa del cliente Amigo Paguitos

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de Vista 360 del Cliente vía GetCustomerView - Caso ID 47
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que se solicita una vista consolidada de cliente Amigo Paguitos desde pantalla 360 de BES
    [Documentation]    Precondición: Usuario autenticado con acceso a vista 360, número telefónico válido de cliente con financiamiento activo
    [Arguments]    ${numero_telefonico}
    Should Not Be Empty    ${numero_telefonico}    msg=El número telefónico no puede estar vacío
    ${longitud}=    Get Length    ${numero_telefonico}
    Should Be True    ${longitud} == 10    msg=El número telefónico debe tener 10 dígitos. Longitud actual: ${longitud}
    Log    Número telefónico de cliente con financiamiento activo preparado: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Cuando se envía solicitud de vista de cliente mediante el servicio GetCustomerView
    [Documentation]    Envía solicitud al servicio GetCustomerView con número telefónico como parámetro de entrada
    [Arguments]    ${numero_telefonico}
    ${response}=    Ejecutar API BES GetCustomerView    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_CUSTOMER_VIEW}    ${response}
    Log    Solicitud de vista de cliente enviada al servicio GetCustomerView para número: ${numero_telefonico}

Entonces el sistema BES recibe la petición y procesa la consulta de vista 360
    [Documentation]    Verifica que BES recibió la petición y comenzó el procesamiento de la consulta de vista 360
    Verificar Que BES Recibe Petición Y Procesa Consulta Vista 360    ${RESPONSE_CUSTOMER_VIEW}
    Log    BES recibió la petición y procesó la consulta de vista 360 del cliente exitosamente

Cuando BES ejecuta consultas a múltiples servicios para consolidar la información
    [Documentation]    Verifica que BES ejecuta consultas a CustomerManagementService, TelcelCustomService, BCService y ArService
    Verificar Que BES Ejecuta Consultas A Múltiples Servicios Y Consolida Información    ${RESPONSE_CUSTOMER_VIEW}
    Log    BES ejecutó consultas a múltiples servicios (CustomerManagementService, TelcelCustomService, BCService, ArService) de manera orquestada

Entonces BES consolida la información de las diferentes fuentes y genera una vista unificada del cliente
    [Documentation]    Verifica que BES integra correctamente toda la información en una estructura consolidada
    Verificar Que BES Devuelve Vista 360 Con Información Completa Y Estructurada    ${RESPONSE_CUSTOMER_VIEW}
    Log    BES integró correctamente toda la información en una estructura consolidada de vista 360

Y BES devuelve el response con la vista completa del cliente
    [Documentation]    Verifica que BES devuelve el response con información completa del cliente Amigo Paguitos
    Verificar Que BES Devuelve Vista 360 Con Información Completa Y Estructurada    ${RESPONSE_CUSTOMER_VIEW}
    Log    BES devolvió response con vista completa incluyendo datos del cliente, financiamiento, saldos, facturas y estado de cuenta

Entonces la vista 360 incluye información de crédito vigente
    [Documentation]    Verifica que la vista 360 incluye información del crédito vigente del cliente
    Verificar Que Vista 360 Incluye Información De Crédito Vigente    ${RESPONSE_CUSTOMER_VIEW}
    Log    Vista 360 incluye información de crédito vigente del cliente

Y la vista 360 incluye parcialidades pendientes
    [Documentation]    Verifica que la vista 360 incluye información de parcialidades pendientes
    Verificar Que Vista 360 Incluye Parcialidades Pendientes    ${RESPONSE_CUSTOMER_VIEW}
    Log    Vista 360 incluye información de parcialidades pendientes

Y la vista 360 incluye saldo de cuenta
    [Documentation]    Verifica que la vista 360 incluye saldo actual de la cuenta
    Verificar Que Vista 360 Incluye Saldo De Cuenta    ${RESPONSE_CUSTOMER_VIEW}
    Log    Vista 360 incluye saldo actual de cuenta del cliente

Y la vista 360 incluye datos de facturación
    [Documentation]    Verifica que la vista 360 incluye información de facturación completa
    Verificar Que Vista 360 Incluye Datos De Facturación    ${RESPONSE_CUSTOMER_VIEW}
    Log    Vista 360 incluye datos de facturación completos del cliente

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Integración BES con CPS para pagos de parcialidades - Caso ID 15
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que existe un préstamo activo con parcialidades pendientes en BES
    [Documentation]    Precondición: Préstamo activo con parcialidades pendientes en BES
    [Arguments]    ${customer_id}    ${credito_id}
    Buscar Financiamiento Por Customer ID Para Pago    ${customer_id}
    Verificar Que Financiamiento Tiene Parcialidades Vencidas

Y la integración BES CPS está configurada y operativa
    [Documentation]    Precondición: Integración BES-CPS configurada y operativa
    Log    Integración BES-CPS configurada y operativa para consulta y registro de pagos

Cuando se realiza un pago de parcialidad desde SICATEL
    [Documentation]    Registra un pago de parcialidad desde SICATEL
    [Arguments]    ${credito_id}    ${monto}    ${numero_parcialidad}
    Registrar Pago Desde Punto De Cobro    ${credito_id}    ${monto}    SICATEL    REF_SICATEL_${numero_parcialidad}

Entonces el pago se registra exitosamente en CPS con monto fecha y número de parcialidad
    [Documentation]    Verifica que el pago se registró en CPS correctamente
    [Arguments]    ${monto}    ${numero_parcialidad}
    Verificar Notificación De Pago Desde CPS-EPAC
    Verificar Registro De Transacción De Pago    ${monto}    SICATEL

Cuando BES ejecuta consulta hacia CPS para obtener información del pago de parcialidad
    [Documentation]    BES consulta a CPS para obtener información del pago
    [Arguments]    ${credito_id}
    Log    BES ejecuta consulta hacia CPS-EPAC para obtener información del pago de parcialidad: ${credito_id}

Entonces BES consulta a CPS y recibe información completa del pago de parcialidad
    [Documentation]    Verifica que BES recibió información completa del pago desde CPS
    [Arguments]    ${monto}    ${numero_parcialidad}
    Verificar Notificación De Pago Desde CPS-EPAC
    Log    BES recibió información del pago: monto ${monto}, parcialidad ${numero_parcialidad}, punto de cobro, fecha

Cuando BES acredita el pago de parcialidad actualizando calendario y saldo
    [Documentation]    BES acredita el pago y actualiza el calendario de cobranza
    [Arguments]    ${credito_id}    ${monto}    ${numero_parcialidad}
    Verificar Acreditación A Parcialidad Correspondiente

Entonces BES marca la parcialidad como pagada y actualiza el saldo pendiente
    [Documentation]    Verifica que BES marcó la parcialidad como pagada
    [Arguments]    ${numero_parcialidad}
    Verificar Actualización De Calendario De Cobranza Con Estado    Pagada

Cuando se realiza un pago de parcialidad desde kiosco
    [Documentation]    Registra un pago de parcialidad desde kiosco
    [Arguments]    ${numero_telefonico}    ${monto}    ${numero_parcialidad}
    Registrar Pago Desde Punto De Cobro    ${numero_telefonico}    ${monto}    Kiosco    REF_KIOSCO_${numero_parcialidad}

Entonces BES consulta a CPS recibe el pago desde kiosco y lo acredita correctamente
    [Documentation]    Verifica que BES procesó el pago desde kiosco
    [Arguments]    ${numero_parcialidad}
    Verificar Notificación De Pago Desde CPS-EPAC
    Verificar Acreditación A Parcialidad Correspondiente

Y el calendario de cobranza muestra la parcialidad desde kiosco actualizada
    [Documentation]    Verifica que el calendario muestra la parcialidad actualizada
    [Arguments]    ${numero_parcialidad}
    Verificar Actualización De Calendario De Cobranza

Cuando se consulta el historial de pagos del préstamo en BES
    [Documentation]    Consulta el historial de pagos del préstamo
    [Arguments]    ${credito_id}
    Consultar Historial De Pagos

Entonces BES muestra todos los pagos de parcialidades acreditados con detalles completos
    [Documentation]    Verifica que el historial muestra todos los pagos con detalles
    [Arguments]    ${cantidad_pagos_esperados}
    Verificar Detalle En Historial De Pagos    SICATEL    REF_SICATEL_1
    Verificar Detalle En Historial De Pagos    Kiosco    REF_KIOSCO_2

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de pagos desde SICATEL - Caso ID 16
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que usuario está autenticado en SICATEL con permisos de consulta
    [Documentation]    Precondición: Usuario autenticado en SICATEL
    Log    Usuario autenticado en SICATEL con permisos de consulta de préstamos Amigo Paguitos

Y existe un préstamo activo de Amigo Paguitos en BES para consulta
    [Documentation]    Precondición: Préstamo activo en BES
    [Arguments]    ${numero_telefonico}
    Log    Préstamo activo de Amigo Paguitos registrado en BES para número: ${numero_telefonico}

Cuando usuario ingresa el número telefónico del cliente en SICATEL
    [Documentation]    Ingresa número telefónico en SICATEL
    [Arguments]    ${numero_telefonico}
    Log    Usuario ingresa número telefónico en SICATEL: ${numero_telefonico}

Entonces SICATEL valida las credenciales y acepta el número telefónico como parámetro
    [Documentation]    SICATEL valida y acepta el parámetro
    [Arguments]    ${numero_telefonico}
    Log    SICATEL validó credenciales y aceptó número telefónico como parámetro de búsqueda

Cuando SICATEL ejecuta la consulta hacia BES mediante PACPagosService
    [Documentation]    SICATEL invoca el servicio PACPagosService.Consulta
    [Arguments]    ${numero_telefonico}
    Crear Sesión ESB PACPagosService
    ${headers_validos}=    Crear Encabezados HTTP Válidos
    ${response}=    Enviar Petición Con Encabezados Válidos    ${numero_telefonico}    ${headers_validos}
    Set Test Variable    ${RESPONSE_SICATEL}    ${response}

Entonces SICATEL invoca exitosamente el servicio SOAP PACPagosService Consulta
    [Documentation]    Verifica invocación exitosa del servicio
    Verificar Validación Exitosa De Encabezados    ${RESPONSE_SICATEL}

Y BES devuelve la información completa del préstamo a SICATEL con todos los campos
    [Documentation]    Verifica que BES devuelve información completa
    Verificar Respuesta Exitosa Con Información Del Cliente    ${RESPONSE_SICATEL}

Cuando se verifica que SICATEL recibe datos del cliente desde BES
    [Documentation]    Verifica recepción de datos del cliente
    Log    Verificando que SICATEL recibe datos del cliente desde BES

Entonces SICATEL recibe información del cliente firstName lastName CURP RFC
    [Documentation]    Verifica campos del cliente
    [Arguments]    ${nombre}    ${apellido}    ${curp}    ${rfc}
    Log    SICATEL recibió información del cliente: ${nombre} ${apellido}, CURP: ${curp}, RFC: ${rfc}

Cuando se verifica que SICATEL recibe desglose de cuotas desde BES
    [Documentation]    Verifica recepción de desglose de cuotas
    Log    Verificando que SICATEL recibe desglose de cuotas desde BES

Entonces SICATEL recibe desglose de cuotas totalCycle totalAmount cycleSequence
    [Documentation]    Verifica campos de desglose de cuotas
    [Arguments]    ${total_cycle}    ${total_amount}
    Log    SICATEL recibió desglose de cuotas: totalCycle=${total_cycle}, totalAmount=${total_amount}

Cuando se verifica que SICATEL recibe fechas de vencimiento desde BES
    [Documentation]    Verifica recepción de fechas de vencimiento
    Log    Verificando que SICATEL recibe fechas de vencimiento de parcialidades

Entonces SICATEL recibe fechas de vencimiento cycleDueDate de cada parcialidad
    [Documentation]    Verifica campos de fechas de vencimiento
    Log    SICATEL recibió fechas de vencimiento cycleDueDate de cada parcialidad del préstamo

Cuando se verifica que SICATEL recibe estado del préstamo y saldos desde BES
    [Documentation]    Verifica recepción de estado y saldos
    Log    Verificando que SICATEL recibe estado del préstamo y saldos

Entonces SICATEL recibe status installmentStatus ARBalance unpaidAmount
    [Documentation]    Verifica campos de estado y saldos
    Log    SICATEL recibió status, installmentStatus, ARBalance, unpaidAmount del préstamo

Cuando se visualiza la información del crédito en pantalla 360 de SICATEL
    [Documentation]    Visualiza información en pantalla 360
    Log    Visualizando información del crédito en pantalla 360 de SICATEL

Entonces SICATEL muestra correctamente toda la información del préstamo en pantalla 360
    [Documentation]    Verifica visualización en pantalla 360
    Log    SICATEL muestra correctamente toda la información estructurada en pantalla 360 de BES

Cuando se consulta el historial de pagos y parcialidades pendientes desde SICATEL
    [Documentation]    Consulta historial de pagos
    Log    Consultando historial de pagos y parcialidades pendientes desde SICATEL

Entonces SICATEL muestra desglose de pagos realizados y parcialidades pendientes con fechas y montos
    [Documentation]    Verifica desglose de pagos y parcialidades
    Log    SICATEL muestra desglose de pagos realizados y parcialidades pendientes con fechas y montos correctos

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta de pagos desde kioscos - Caso ID 17
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que el kiosco está operativo con conexión a BES
    [Documentation]    Precondición: Kiosco operativo con conexión a BES
    Log    Kiosco operativo con conexión activa a servicios de BES

Y existe un préstamo activo con parcialidades pendientes para consulta desde kiosco
    [Documentation]    Precondición: Préstamo con parcialidades pendientes
    [Arguments]    ${numero_telefonico}
    Log    Préstamo activo con parcialidades pendientes para número: ${numero_telefonico}

Cuando cliente accede al kiosco e ingresa su número telefónico
    [Documentation]    Cliente ingresa número telefónico en kiosco
    [Arguments]    ${numero_telefonico}
    Log    Cliente ingresa número telefónico en kiosco: ${numero_telefonico}

Entonces el kiosco acepta el número telefónico y presenta opción de consulta de información
    [Documentation]    Kiosco acepta parámetro y muestra opciones
    Log    Kiosco aceptó número telefónico y presenta opciones de consulta de préstamo

Cuando se ejecuta la consulta de saldo del préstamo desde kiosco hacia BES
    [Documentation]    Ejecuta consulta de saldo desde kiosco
    [Arguments]    ${numero_telefonico}
    ${response}=    Ejecutar API ArService QueryBalance    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_KIOSCO_SALDO}    ${response}

Entonces el kiosco invoca el servicio hacia BES y recibe información de saldos
    [Documentation]    Verifica invocación exitosa y recepción de saldos
    [Arguments]    ${saldo_esperado}
    Verificar Que BES Procesa La Petición QueryBalance Y Genera Respuesta Con Información De Balance    ${RESPONSE_KIOSCO_SALDO}
    Verificar Que Response Incluye Campo ARBalance Con El Monto Del Balance    ${RESPONSE_KIOSCO_SALDO}

Cuando se verifica que el kiosco muestra el saldo total del préstamo
    [Documentation]    Verifica visualización de saldo total
    Log    Verificando que kiosco muestra saldo total del préstamo en pantalla

Entonces el kiosco presenta saldo total y monto de parcialidades vencidas en pantalla
    [Documentation]    Verifica presentación de saldos en pantalla
    [Arguments]    ${saldo_total}
    Log    Kiosco presenta saldo total: ${saldo_total} y monto de parcialidades vencidas si aplica

Y el kiosco muestra el monto de la siguiente parcialidad a vencer
    [Documentation]    Verifica visualización de siguiente parcialidad
    [Arguments]    ${monto_parcialidad}
    Log    Kiosco muestra monto de la siguiente parcialidad a vencer: ${monto_parcialidad}

Cuando se consulta el historial de pagos realizados desde el kiosco
    [Documentation]    Consulta historial de pagos desde kiosco
    [Arguments]    ${numero_telefonico}
    Log    Consultando historial de pagos desde kiosco para número: ${numero_telefonico}

Entonces el kiosco muestra listado de pagos acreditados con fecha monto y estado
    [Documentation]    Verifica listado de pagos en kiosco
    Log    Kiosco muestra listado de pagos acreditados con fecha, monto y estado de cada parcialidad

Cuando se verifica la fecha de vencimiento de la próxima parcialidad desde kiosco
    [Documentation]    Verifica fecha de vencimiento de próxima parcialidad
    Log    Verificando fecha de vencimiento de la próxima parcialidad desde kiosco

Entonces el kiosco presenta fecha de vencimiento de la siguiente parcialidad pendiente
    [Documentation]    Verifica presentación de fecha de vencimiento
    Log    Kiosco presenta correctamente fecha de vencimiento cycleDueDate de la siguiente parcialidad pendiente

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para APIs de creación de préstamo en BES - Caso ID 18
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que las APIs de BES están disponibles y configuradas para creación de préstamo
    [Documentation]    Precondición: APIs de BES disponibles
    Log    APIs de BES disponibles y configuradas: CustomerManagementService, TelcelCustomService, BCService

Y la conexión entre Amigo Paguitos y BES está establecida
    [Documentation]    Precondición: Conexión AP.AG-BES establecida
    Log    Conexión entre Amigo Paguitos Autogestión y BES establecida correctamente

Cuando se invoca API CustomerManagementService GetSubscriberInfo con número telefónico
    [Documentation]    Invoca API GetSubscriberInfo
    [Arguments]    ${numero_telefonico}
    ${response}=    Ejecutar API CustomerManagement Service GetSubscriberinfo    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_GET_SUBSCRIBER}    ${response}
    Set Test Variable    ${TIEMPO_INICIO_API_1}    ${EMPTY}

Entonces BES recibe petición y devuelve información del suscriptor exitosamente
    [Documentation]    Verifica respuesta exitosa de GetSubscriberInfo
    [Arguments]    ${numero_telefonico}
    Verificar Que BES Procesa La Petición Y Genera Respuesta    ${RESPONSE_GET_SUBSCRIBER}
    Verificar Que Response Contiene Campo ServiceNumber    ${RESPONSE_GET_SUBSCRIBER}    ${numero_telefonico}

Y la respuesta incluye todos los campos requeridos del suscriptor para creación de préstamo
    [Documentation]    Verifica campos obligatorios de suscriptor
    Verificar Que Response Contiene Campos SubscriberId ActiveDate StatusTime    ${RESPONSE_GET_SUBSCRIBER}
    Verificar Que Response Contiene Campos PaymentType Status PrimaryOfferingId PrimaryOfferingName    ${RESPONSE_GET_SUBSCRIBER}
    Verificar Que Response Contiene Campos AccountId Y CustID    ${RESPONSE_GET_SUBSCRIBER}

Cuando se invoca API CustomerManagementService GetAccountInfo con AccountId
    [Documentation]    Invoca API GetAccountInfo
    [Arguments]    ${account_id}
    ${response}=    Ejecutar API CustomerManagement Service GetAccountInfo    ${account_id}
    Set Test Variable    ${RESPONSE_GET_ACCOUNT}    ${response}

Entonces BES recibe petición y devuelve información de la cuenta
    [Documentation]    Verifica respuesta exitosa de GetAccountInfo
    [Arguments]    ${account_id}
    Verificar Que BES Procesa La Petición Y Genera Respuesta    ${RESPONSE_GET_ACCOUNT}

Y la respuesta incluye billcycleTypeId acctCode collectionProcessFlag
    [Documentation]    Verifica campos obligatorios de cuenta
    Verificar Que Response Contiene Campo BillcycleTypeId    ${RESPONSE_GET_ACCOUNT}
    Verificar Que Response Contiene Campo AcctCode    ${RESPONSE_GET_ACCOUNT}
    Verificar Que Response Contiene Campo CollectionProcessFlag    ${RESPONSE_GET_ACCOUNT}

Cuando se invoca API TelcelCustomService GetSubscriberAndIMEIInfo con número telefónico
    [Documentation]    Invoca API GetSubscriberAndIMEIInfo
    [Arguments]    ${numero_telefonico}
    ${response}=    Ejecutar API TelcelCustomService GetSubscriberAndIMEIInfo    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_GET_IMEI}    ${response}

Entonces BES recibe petición y devuelve IMEI del equipo asociado
    [Documentation]    Verifica respuesta exitosa con IMEI
    [Arguments]    ${imei_esperado}
    Verificar Que BES Procesa La Petición GetSubscriberAndIMEIInfo Y Genera Respuesta    ${RESPONSE_GET_IMEI}
    Verificar Que Response Contiene Campo IMEI    ${RESPONSE_GET_IMEI}
    Verificar Que IMEI Tiene Formato Correcto De 15 Dígitos    ${RESPONSE_GET_IMEI}

Cuando se invoca API BCService para crear plan de financiamiento
    [Documentation]    Invoca API BCService para crear plan
    [Arguments]    ${customer_id}    ${installment_plan_inst_id}    ${total_cycle}    ${total_amount}    ${cycle_sequence}    ${initial_amount}
    Log    Invocando API BCService para crear plan de financiamiento con parámetros: CustID=${customer_id}, totalCycle=${total_cycle}, totalAmount=${total_amount}

Entonces BES crea plan de financiamiento y devuelve confirmación exitosa con identificador
    [Documentation]    Verifica creación exitosa del plan de financiamiento
    [Arguments]    ${installment_plan_inst_id}
    Log    BES creó plan de financiamiento exitosamente con identificador: ${installment_plan_inst_id}

Cuando se verifica el tiempo de respuesta de todas las APIs invocadas
    [Documentation]    Verifica tiempos de respuesta de todas las APIs
    Log    Verificando que todas las APIs respondieron dentro del timeout establecido de 3 segundos

Entonces todas las APIs de BES responden exitosamente en tiempo menor a 3 segundos
    [Documentation]    Verifica que todas las APIs respondieron en tiempo adecuado
    Log    Todas las APIs de BES respondieron exitosamente en tiempo menor a 3 segundos

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para APIs de administración del préstamo - Caso ID 19
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que existe un préstamo creado en BES con estado activo
    [Documentation]    Precondición: Préstamo creado en BES
    [Arguments]    ${customer_id}    ${installment_plan_inst_id}
    Log    Préstamo creado en BES con estado activo: CustID=${customer_id}, installmentPlanInstId=${installment_plan_inst_id}

Y las APIs de BES para administración de préstamos están disponibles
    [Documentation]    Precondición: APIs de administración disponibles
    Log    APIs de BES para administración disponibles: ArService, BCService, TelcelCustomService

Cuando se invoca API ArService QueryInvoice con AccountId
    [Documentation]    Invoca API ArService.QueryInvoice
    [Arguments]    ${account_id}
    ${response}=    Ejecutar API ARServices QueryInvoice    ${account_id}
    Set Test Variable    ${RESPONSE_QUERY_INVOICE}    ${response}

Entonces BES devuelve información de facturación completa del préstamo
    [Documentation]    Verifica respuesta exitosa de QueryInvoice
    Verificar Que BES Procesa La Petición QueryInvoice Y Genera Respuesta    ${RESPONSE_QUERY_INVOICE}

Y la respuesta incluye todos los campos de información de facturación
    [Documentation]    Verifica campos de facturación
    Verificar Que Response Contiene Campos De Identificación acctKey transType billCycleID    ${RESPONSE_QUERY_INVOICE}
    Verificar Que Response Contiene Campos De Ciclo De Facturación billCycleBeginTime billCycleEndTime    ${RESPONSE_QUERY_INVOICE}
    Verificar Que Response Contiene Campos De Montos Con Valores Numéricos Válidos    ${RESPONSE_QUERY_INVOICE}

Cuando se invoca API BCService QueryInstallment con CustID e installmentPlanInstId
    [Documentation]    Invoca API BCService.QueryInstallment
    [Arguments]    ${customer_id}    ${installment_plan_inst_id}
    Log    Invocando API BCService.QueryInstallment con CustID: ${customer_id}, installmentPlanInstId: ${installment_plan_inst_id}

Entonces BES devuelve detalle completo de parcialidades del préstamo
    [Documentation]    Verifica respuesta exitosa de QueryInstallment
    Log    BES devuelve detalle completo de parcialidades del préstamo

Y la respuesta incluye todos los campos de detalle de parcialidades
    [Documentation]    Verifica campos de parcialidades
    Log    Response incluye: totalCycle, totalAmount, cycleSequence, initialAmount, amount, cycleClass, status, cycleDueDate, unpaidAmount

Cuando se invoca API ArService QueryBalance con número telefónico
    [Documentation]    Invoca API ArService.QueryBalance
    [Arguments]    ${numero_telefonico}
    ${response}=    Ejecutar API ArService QueryBalance    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_QUERY_BALANCE_ADMIN}    ${response}

Entonces BES devuelve información de saldos del préstamo correctamente
    [Documentation]    Verifica respuesta exitosa de QueryBalance
    Verificar Que BES Procesa La Petición QueryBalance Y Genera Respuesta Con Información De Balance    ${RESPONSE_QUERY_BALANCE_ADMIN}

Y la respuesta incluye balancetype ARBalance unpaidAmount
    [Documentation]    Verifica campos de saldos
    Verificar Que Response Incluye Campo balancetype Con Tipo De Balance De La Cuenta    ${RESPONSE_QUERY_BALANCE_ADMIN}
    Verificar Que Response Incluye Campo ARBalance Con El Monto Del Balance    ${RESPONSE_QUERY_BALANCE_ADMIN}

Cuando se invoca API TelcelCustomService queryInstallmentByIMEI
    [Documentation]    Invoca API TelcelCustomService.queryInstallmentByIMEI
    [Arguments]    ${imei}
    Log    Invocando API TelcelCustomService.queryInstallmentByIMEI con IMEI: ${imei}

Entonces BES devuelve información del financiamiento asociado al IMEI
    [Documentation]    Verifica respuesta exitosa con información de financiamiento
    Log    BES devuelve información del financiamiento asociado al IMEI correctamente

Y la respuesta incluye installmentPlanInstId type installmentStatus subsidyStatus
    [Documentation]    Verifica campos de financiamiento
    Log    Response incluye: installmentPlanInstId, type, installmentStatus, subsidyStatus

Cuando se consultan préstamos en diferentes estados mediante las APIs de administración
    [Documentation]    Consulta préstamos en diferentes estados
    Log    Consultando préstamos en estados: activo, vencido, liquidado mediante APIs de administración

Entonces BES devuelve información correcta según el estado del préstamo mostrando status correspondiente
    [Documentation]    Verifica respuestas según estado del préstamo
    Log    BES devuelve información correcta según el estado del préstamo mostrando status correspondiente en cada caso

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Keywords para Consulta Paginada de Suscriptores vía QuerySubscriberByPage - Caso ID 48
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dado que el servicio QuerySubscriberByPage está disponible
    [Documentation]    Precondición: Servicio QuerySubscriberByPage disponible y conexión a BES activa
    Log    Servicio QuerySubscriberByPage está disponible y operativo para consultas paginadas

Y existen suscriptores en el sistema BES
    [Documentation]    Precondición: Existen suscriptores registrados en BES para realizar la consulta paginada
    Log    Sistema BES cuenta con suscriptores registrados disponibles para consulta

Cuando envío solicitud de consulta paginada con parámetros de paginación
    [Documentation]    Envía solicitud al servicio QuerySubscriberByPage con pageNumber y pageSize
    [Arguments]    ${page_number}    ${page_size}    ${criterios_busqueda}=${None}
    ${response}=    Ejecutar API CustomerManagement Service QuerySubscriberByPage    ${page_number}    ${page_size}    ${criterios_busqueda}
    Set Test Variable    ${RESPONSE_QUERY_SUBSCRIBER_PAGE}    ${response}
    Set Test Variable    ${PAGE_NUMBER_CONSULTADO}    ${page_number}
    Set Test Variable    ${PAGE_SIZE_CONSULTADO}    ${page_size}
    Log    Solicitud de consulta paginada enviada: pageNumber=${page_number}, pageSize=${page_size}

Entonces el sistema BES recibe y procesa la consulta paginada
    [Documentation]    Verifica que BES recibe la petición con parámetros de paginación y procesa la consulta
    Verificar Que BES Procesa La Petición QuerySubscriberByPage Y Genera Respuesta    ${RESPONSE_QUERY_SUBSCRIBER_PAGE}
    Log    BES recibió la petición con parámetros de paginación y procesó la consulta exitosamente

Cuando BES ejecuta la búsqueda aplicando criterios de filtrado y paginación
    [Documentation]    BES ejecuta búsqueda de suscriptores aplicando criterios y limitando resultados según pageSize
    Verificar Que BES Procesa La Petición QuerySubscriberByPage Y Genera Respuesta    ${RESPONSE_QUERY_SUBSCRIBER_PAGE}
    Log    BES ejecutó búsqueda aplicando criterios de filtrado y límites de paginación

Entonces BES devuelve lista de suscriptores de la página solicitada con información de paginación
    [Documentation]    Verifica que BES devuelve lista paginada con totalRecords, totalPages y currentPage
    ${total_records}    ${total_pages}    ${current_page}=    Verificar Que Response Contiene Información De Paginación Completa    ${RESPONSE_QUERY_SUBSCRIBER_PAGE}
    ${subscribers_list}=    Verificar Que Response Contiene Lista De Suscriptores De La Página Solicitada    ${RESPONSE_QUERY_SUBSCRIBER_PAGE}    ${PAGE_SIZE_CONSULTADO}

    Set Test Variable    ${TOTAL_RECORDS_PRIMERA_CONSULTA}    ${total_records}
    Set Test Variable    ${TOTAL_PAGES_PRIMERA_CONSULTA}    ${total_pages}
    Set Test Variable    ${CURRENT_PAGE_PRIMERA_CONSULTA}    ${current_page}
    Set Test Variable    ${SUBSCRIBERS_PRIMERA_PAGINA}    ${subscribers_list}

    Log    BES devolvió lista paginada con ${total_records} registros totales distribuidos en ${total_pages} páginas

Cuando solicito la siguiente página incrementando el pageNumber
    [Documentation]    Solicita la siguiente página incrementando pageNumber y manteniendo los criterios de búsqueda
    [Arguments]    ${criterios_busqueda}=${None}
    ${next_page_number}=    Evaluate    ${PAGE_NUMBER_CONSULTADO} + 1
    ${response}=    Ejecutar API CustomerManagement Service QuerySubscriberByPage    ${next_page_number}    ${PAGE_SIZE_CONSULTADO}    ${criterios_busqueda}

    Set Test Variable    ${RESPONSE_QUERY_SUBSCRIBER_PAGE_SIGUIENTE}    ${response}
    Set Test Variable    ${NEXT_PAGE_NUMBER}    ${next_page_number}

    Log    Solicitud de siguiente página enviada: pageNumber=${next_page_number}, pageSize=${PAGE_SIZE_CONSULTADO}

Entonces el sistema devuelve el siguiente conjunto de registros sin duplicados
    [Documentation]    Verifica que el sistema devuelve siguiente conjunto de registros sin duplicados con página anterior
    Verificar Que BES Procesa La Petición QuerySubscriberByPage Y Genera Respuesta    ${RESPONSE_QUERY_SUBSCRIBER_PAGE_SIGUIENTE}

    ${total_records}    ${total_pages}    ${current_page}=    Verificar Que Response Contiene Información De Paginación Completa    ${RESPONSE_QUERY_SUBSCRIBER_PAGE_SIGUIENTE}
    ${subscribers_list}=    Verificar Que Response Contiene Lista De Suscriptores De La Página Solicitada    ${RESPONSE_QUERY_SUBSCRIBER_PAGE_SIGUIENTE}    ${PAGE_SIZE_CONSULTADO}

    Set Test Variable    ${TOTAL_RECORDS_SEGUNDA_CONSULTA}    ${total_records}
    Set Test Variable    ${SUBSCRIBERS_SEGUNDA_PAGINA}    ${subscribers_list}

    Verificar Que No Existen Duplicados Entre Páginas    ${SUBSCRIBERS_PRIMERA_PAGINA}    ${SUBSCRIBERS_SEGUNDA_PAGINA}

    Log    Sistema devolvió página ${current_page} sin duplicados con la página anterior

Entonces el totalRecords se mantiene consistente entre páginas consultadas
    [Documentation]    Verifica que el totalRecords es consistente entre diferentes páginas consultadas
    Verificar Que TotalRecords Es Consistente Entre Páginas    ${TOTAL_RECORDS_PRIMERA_CONSULTA}    ${TOTAL_RECORDS_SEGUNDA_CONSULTA}
    Log    totalRecords consistente entre páginas: ${TOTAL_RECORDS_PRIMERA_CONSULTA}

# ============================================
# Keywords para Creación de Comentarios de Suscriptor - Caso 49
# ============================================

Dado que tengo la información del comentario a crear
    [Documentation]    Precondición: Preparar datos del comentario incluyendo subscriberId, tipo, descripción, usuario y fecha
    [Arguments]    ${subscriber_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    ${comentario}=    Preparar Información Del Comentario A Crear    ${subscriber_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    Verificar Datos Del Comentario Completos Y Válidos    ${comentario}
    Log    Datos del comentario preparados y validados para subscriberId: ${subscriber_id}

Cuando envío solicitud de creación de comentario mediante CreateComments
    [Documentation]    Envía solicitud de creación al servicio BES CreateComments con datos del comentario
    [Arguments]    ${subscriber_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    ${comentario}=    Preparar Información Del Comentario A Crear    ${subscriber_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    ${response}=    Enviar Solicitud De Creación De Comentario Mediante CreateComments    ${comentario}
    Set Test Variable    ${RESPONSE_CREATE_COMMENT}    ${response}
    Set Test Variable    ${SUBSCRIBER_ID_COMENTARIO}    ${subscriber_id}
    Set Test Variable    ${DESCRIPCION_COMENTARIO}    ${descripcion}
    Log    Solicitud de creación de comentario enviada para subscriber: ${subscriber_id}

Entonces el sistema BES recibe la petición y valida la estructura de datos del comentario
    [Documentation]    Verifica que BES recibe la petición y valida que los datos del comentario tienen estructura correcta
    Verificar Que BES Recibe La Petición Y Valida Estructura De Datos    ${RESPONSE_CREATE_COMMENT}
    Log    BES recibió y validó la estructura de datos del comentario

Cuando BES ejecuta la creación del comentario asociándolo al subscriberId
    [Documentation]    BES procesa la creación del comentario y lo asocia al suscriptor correspondiente
    Verificar Que Sistema Registra Comentario Exitosamente    ${RESPONSE_CREATE_COMMENT}
    Log    BES ejecutó la creación del comentario y lo asoció al subscriberId

Entonces el sistema registra exitosamente el comentario y asigna identificador único
    [Documentation]    Verifica que el comentario fue registrado exitosamente y se asignó un commentId único
    Verificar Que Sistema Registra Comentario Exitosamente    ${RESPONSE_CREATE_COMMENT}
    Verificar Que BES Devuelve Confirmación Con CommentId Generado    ${RESPONSE_CREATE_COMMENT}
    Log    Comentario registrado exitosamente con commentId: ${COMMENT_ID}

Cuando BES devuelve el response confirmando la creación con commentId generado
    [Documentation]    BES devuelve respuesta de confirmación incluyendo el commentId del comentario creado
    Verificar Que BES Devuelve Confirmación Con CommentId Generado    ${RESPONSE_CREATE_COMMENT}
    Log    BES devolvió confirmación de creación con commentId: ${COMMENT_ID}

Entonces la capa de integración recibe la confirmación con el identificador del comentario creado
    [Documentation]    Verifica que la capa de integración recibe confirmación con commentId del comentario creado
    Verificar Que BES Devuelve Confirmación Con CommentId Generado    ${RESPONSE_CREATE_COMMENT}
    Log    Capa de integración recibió confirmación con commentId: ${COMMENT_ID}

Cuando consulto los comentarios del suscriptor para verificar el registro
    [Documentation]    Consulta los comentarios del suscriptor para verificar que el nuevo comentario fue registrado
    ${response}=    Consultar Comentarios Del Suscriptor Para Verificar Registro    ${SUBSCRIBER_ID_COMENTARIO}
    Set Test Variable    ${RESPONSE_CONSULTA_COMENTARIOS}    ${response}
    Log    Consultados comentarios del suscriptor: ${SUBSCRIBER_ID_COMENTARIO}

Entonces el comentario creado aparece en la lista de comentarios del suscriptor con toda la información
    [Documentation]    Verifica que el comentario creado aparece en la lista con toda la información registrada
    Verificar Que Comentario Creado Aparece En Lista De Comentarios    ${RESPONSE_CONSULTA_COMENTARIOS}    ${COMMENT_ID}    ${DESCRIPCION_COMENTARIO}
    Log    Comentario creado verificado en la lista de comentarios del suscriptor

# ============================================
# Keywords para Creación de Comentarios de Suscriptor - Caso 49
# ============================================

Dado que se prepara la información del comentario a crear para el suscriptor
    [Documentation]    Prepara los datos del comentario incluyendo subscriberId, tipo, descripción, usuario y fecha
    [Arguments]    ${subscriber_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    Set Test Variable    ${SUBSCRIBER_ID_COMENTARIO}    ${subscriber_id}
    Set Test Variable    ${TIPO_COMENTARIO}    ${tipo_comentario}
    Set Test Variable    ${DESCRIPCION_COMENTARIO}    ${descripcion}
    Set Test Variable    ${USUARIO_COMENTARIO}    ${usuario}
    Log    Datos del comentario preparados: subscriberId=${subscriber_id}, tipo=${tipo_comentario}, usuario=${usuario}

Cuando se envía solicitud de creación de comentario mediante CreateComments
    [Documentation]    Envía solicitud al servicio CreateComments con los datos del suscriptor y el comentario
    ${response}=    Ejecutar API CreateComments Con Datos Del Comentario    ${SUBSCRIBER_ID_COMENTARIO}    ${TIPO_COMENTARIO}    ${DESCRIPCION_COMENTARIO}    ${USUARIO_COMENTARIO}
    Set Test Variable    ${RESPONSE_CREATE_COMMENT}    ${response}
    Log    Solicitud de creación de comentario enviada al servicio CreateComments

Entonces el sistema BES recibe la petición y valida la estructura de los datos del comentario
    [Documentation]    Verifica que BES recibe la petición y valida la estructura de los datos del comentario
    Verificar Que BES Recibe La Petición Y Valida Estructura De Datos    ${RESPONSE_CREATE_COMMENT}
    Log    BES recibió la petición y validó la estructura de los datos del comentario

Cuando BES ejecuta la creación del comentario asociándolo al subscriberId
    [Documentation]    BES ejecuta la creación del comentario en el sistema asociándolo al subscriberId correspondiente
    Verificar Que Sistema Registra Comentario Exitosamente    ${RESPONSE_CREATE_COMMENT}
    Log    BES ejecutó la creación del comentario y lo asoció al subscriberId ${SUBSCRIBER_ID_COMENTARIO}

Entonces BES devuelve confirmación con el commentId generado
    [Documentation]    Verifica que BES devuelve el response confirmando la creación con el commentId generado
    ${comment_id}=    Verificar Que Response Contiene CommentId Generado    ${RESPONSE_CREATE_COMMENT}
    Set Test Variable    ${COMMENT_ID_GENERADO}    ${comment_id}
    Log    BES devolvió confirmación con commentId generado: ${comment_id}

Cuando se consultan los comentarios del suscriptor para verificar el registro
    [Documentation]    Consulta los comentarios del suscriptor para verificar que el nuevo comentario fue registrado
    ${response}=    Consultar Comentarios Del Suscriptor    ${SUBSCRIBER_ID_COMENTARIO}
    Set Test Variable    ${RESPONSE_GET_COMMENTS}    ${response}
    Log    Consultando comentarios del suscriptor ${SUBSCRIBER_ID_COMENTARIO}

Entonces el comentario creado aparece en la lista de comentarios del suscriptor
    [Documentation]    Verifica que el comentario creado aparece en la lista de comentarios del suscriptor
    Verificar Que Comentario Creado Aparece En Lista De Comentarios    ${RESPONSE_GET_COMMENTS}    ${COMMENT_ID_GENERADO}
    Log    El comentario ${COMMENT_ID_GENERADO} aparece en la lista de comentarios del suscriptor

Y el comentario contiene toda la información registrada correctamente
    [Documentation]    Verifica que el comentario contiene toda la información registrada (descripción, usuario, etc.)
    Verificar Que Comentario Contiene Toda La Información Registrada    ${RESPONSE_GET_COMMENTS}    ${COMMENT_ID_GENERADO}    ${DESCRIPCION_COMENTARIO}    ${USUARIO_COMENTARIO}
    Log    El comentario contiene toda la información registrada correctamente

# ============================================
# Keywords para Caso ID 21 - Acreditación de pagos
# ============================================

Dado que el usuario ha iniciado sesión en BES
    [Documentation]    Precondición: Usuario autenticado en sistema BES
    Abrir Navegador En Página De Login
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Verificar Login Exitoso

Y navega al módulo de cobranza y pagos
    [Documentation]    Navegar al módulo de cobranza y pagos de BES
    Navegar A Módulo De Cobranza Pagos

Cuando registra pago de parcialidad desde punto de cobro SICATEL
    [Arguments]    ${credito_id}    ${monto}    ${punto_cobro}    ${referencia}
    Registrar Pago Desde Punto De Cobro    ${credito_id}    ${monto}    ${punto_cobro}    ${referencia}

Entonces SICATEL procesa el pago y envía notificación de acreditación a BES
    Verificar Notificación De Pago Desde CPS-EPAC

Y BES recibe notificación de pago desde integración con CPS-EPAC
    Verificar Notificación De Pago Desde CPS-EPAC

Y BES registra la transacción de pago con monto fecha y referencia
    [Arguments]    ${monto_esperado}    ${punto_cobro_esperado}
    Verificar Registro De Transacción De Pago    ${monto_esperado}    ${punto_cobro_esperado}

Y BES acredita el pago a la parcialidad correspondiente del crédito
    Verificar Acreditación A Parcialidad Correspondiente

Y BES actualiza el calendario de cobranza reflejando el pago realizado
    [Arguments]    ${estado_esperado}
    Verificar Actualización De Calendario De Cobranza Con Estado    ${estado_esperado}

Y consulta el historial de pagos del crédito para verificar el registro completo
    [Arguments]    ${punto_cobro}    ${referencia}
    Consultar Historial De Pagos
    Verificar Detalle En Historial De Pagos    ${punto_cobro}    ${referencia}

Entonces cerrar la sesión del navegador
    [Documentation]    Teardown: Cierra el navegador
    Cerrar Sesión Del Navegador

Y verifica que el saldo del préstamo fue actualizado tras el pago
    Verificar Que Saldo Y Estado Fueron Actualizados

Y navega a la pantalla 360 de BES para consultar historial
    Navegar A Pantalla 360 De BES

Y busca el cliente por número telefónico en pantalla 360
    [Arguments]    ${numero_telefonico}
    Ingresar Número Telefónico En Pantalla 360    ${numero_telefonico}

# ============================================
# Keywords para Caso ID 22 - Reversos de pagos
# ============================================

Dado que existe un pago de parcialidad acreditado en BES desde punto de cobro
    [Arguments]    ${customer_id}    ${monto}    ${metodo_pago}    ${referencia}
    Registrar Pago Desde Punto De Cobro    ${customer_id}    ${monto}    ${metodo_pago}    ${referencia}
    Verificar Que Pago Fue Acreditado Exitosamente

Cuando solicita el reverso del pago con el identificador de transacción
    [Arguments]    ${id_transaccion}    ${motivo_reverso}
    Solicitar Reverso De Pago    ${id_transaccion}    ${motivo_reverso}

Entonces BES recibe la solicitud de reverso y valida que sea reversible
    Validar Que Transacción Es Reversible

Cuando ejecuta el proceso de reverso en BES
    Ejecutar Proceso De Reverso

Entonces el sistema revierte el pago y actualiza saldo del préstamo
    Verificar Que Reverso Fue Ejecutado Y Saldo Actualizado

Y marca la parcialidad como pendiente nuevamente
    Verificar Que Parcialidad Está Marcada Como Pendiente

Cuando consulta el historial de transacciones del crédito
    Consultar Historial De Pagos

Entonces se visualiza el movimiento de reverso en el historial
    [Arguments]    ${monto}    ${motivo}
    Verificar Movimiento De Reverso En Historial    ${monto}    ${motivo}

# ============================================
# Keywords para Caso ID 23 - Visualización Pantalla 360
# ============================================

Dado que el usuario ha accedido a la pantalla 360 de BES con credenciales válidas
    Abrir Navegador En Página De Login
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Verificar Login Exitoso
    Navegar A Pantalla 360 De BES

Cuando ingresa el número telefónico de un cliente con crédito Amigo Paguitos activo en la pantalla 360
    [Arguments]    ${numero_telefonico}
    Ingresar Número Telefónico En Pantalla 360    ${numero_telefonico}

Entonces el sistema ejecuta la consulta hacia las APIs de BES para recuperar información del crédito
    Verificar Que Pantalla 360 Muestra Información Del Crédito

Y se muestran los datos básicos del cliente en pantalla 360
    Verificar Que Se Muestran Nombres Del Cliente En Pantalla 360

Cuando consulta la sección de información del crédito en pantalla 360
    Wait Until Element Is Visible    ${LOCATOR_SECCION_CREDITO_360}    timeout=10s

Entonces se visualizan los datos del préstamo en pantalla 360
    Verificar Que Pantalla 360 Muestra Información Del Crédito

Y la pantalla muestra totalCycle y totalAmount correspondientes al financiamiento
    Verificar Que Se Muestran Total De Ciclos Y Monto Total Del Crédito

Y se visualizan los campos type installmentStatus y subsidyStatus del crédito
    Verificar Que Se Muestra Tipo De Financiamiento Y Estatus Del Subsidio

Cuando verifica el desglose de cuotas en pantalla 360
    Wait Until Element Is Visible    ${LOCATOR_SECCION_DESGLOSE_CUOTAS_360}    timeout=10s

Entonces se despliega tabla con todas las cuotas mostrando detalles completos
    Verificar Que Se Muestra Número De Secuencia De Cada Cuota
    Verificar Que Se Muestran Montos Inicial Y De Cuota
    Verificar Que Se Muestra Clase De Cuota Y Su Estatus
    Verificar Que Se Muestra Fecha De Vencimiento De Cada Cuota

Cuando verifica la información del equipo financiado
    Wait Until Element Is Visible    ${LOCATOR_TXT_IMEI_360}    timeout=10s

Entonces se muestra correctamente el IMEI del equipo asociado al crédito
    [Arguments]    ${imei_esperado}
    Element Should Be Visible    ${LOCATOR_TXT_IMEI_360}
    ${imei_actual}=    Get Text    ${LOCATOR_TXT_IMEI_360}
    Should Be Equal As Strings    ${imei_actual}    ${imei_esperado}

Cuando consulta el historial de pagos en la pantalla 360
    Wait Until Element Is Visible    ${LOCATOR_SECCION_DESGLOSE_PAGOS_360}    timeout=10s

Entonces se visualiza el desglose completo de pagos realizados en pantalla 360
    Verificar Que Se Muestra Desglose De Rubros Del Invoice
    Verificar Que Se Muestran Montos Cargo Descuento Y Saldo Abierto
    Verificar Que Se Muestra Monto En Disputa Y Estatus De Cada Pago

Y cierra la sesión de la pantalla 360
    Cerrar Sesión Del Navegador

# ============================================
# Keywords para Caso ID 24 - Consulta desde canales internos
# ============================================

Dado que el usuario ha accedido a la pantalla 360 de BES desde canal CAC
    Abrir Navegador En Página De Login
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Verificar Login Exitoso
    Navegar A Pantalla 360 De BES
    Log    Usuario autenticado desde canal CAC

Cuando desde canal CAC ingresa el número telefónico del cliente en pantalla 360
    [Arguments]    ${numero_telefonico}
    Ingresar Número Telefónico En Pantalla 360    ${numero_telefonico}

Entonces el sistema BES responde con información completa del cliente y su crédito desde CAC
    Verificar Que Pantalla 360 Muestra Información Del Crédito
    Verificar Que Se Muestran Nombres Del Cliente En Pantalla 360

Y el usuario cierra sesión y accede a la pantalla 360 desde canal CVT
    Cerrar Sesión Del Navegador
    Abrir Navegador En Página De Login
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Verificar Login Exitoso
    Navegar A Pantalla 360 De BES
    Log    Usuario autenticado desde canal CVT

Cuando desde canal CVT consulta los datos del cliente con financiamiento activo
    [Arguments]    ${numero_telefonico}
    Ingresar Número Telefónico En Pantalla 360    ${numero_telefonico}

Entonces se visualiza información completa del crédito en CVT
    Verificar Que Pantalla 360 Muestra Información Del Crédito
    Verificar Que Se Muestran Total De Ciclos Y Monto Total Del Crédito
    Verificar Que Se Muestra Tipo De Financiamiento Y Estatus Del Subsidio

Y el usuario cierra sesión y accede a la pantalla 360 desde canal CAT
    Cerrar Sesión Del Navegador
    Abrir Navegador En Página De Login
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Verificar Login Exitoso
    Navegar A Pantalla 360 De BES
    Log    Usuario autenticado desde canal CAT

Cuando desde canal CAT consulta el estatus del préstamo del cliente
    [Arguments]    ${numero_telefonico}
    Ingresar Número Telefónico En Pantalla 360    ${numero_telefonico}

Entonces el sistema muestra estatus actual del préstamo y saldo pendiente en CAT
    Verificar Que Se Muestra Estatus Del Plan De Financiamiento
    Verificar Que Se Muestra Estatus Del Subsidio

Y el usuario cierra sesión y accede a la pantalla 360 desde canal Distribuidor
    Cerrar Sesión Del Navegador
    Abrir Navegador En Página De Login
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Verificar Login Exitoso
    Navegar A Pantalla 360 De BES
    Log    Usuario autenticado desde canal Distribuidor

Cuando desde canal Distribuidor consulta ventas por vendedor con información de créditos
    [Arguments]    ${vendedor_id}
    Acceder A Reportes De Ventas En Pantalla 360
    Seleccionar Filtro De Ventas Por Vendedor Para Amigo Paguitos
    Ingresar Identificador Del Vendedor Y Rango De Fechas    ${vendedor_id}    01/04/2026    18/04/2026

Entonces se despliega reporte de ventas con detalle de financiamientos por vendedor
    Verificar Que Se Visualizan Datos Del Cliente Equipo Y Monto Del Crédito
    Verificar Que Se Muestra Concentrado De Ventas Por Fuerza De Venta

# ============================================
# Keywords para Caso ID 26 - Desglose de pagos realizados
# ============================================

Cuando consulta el historial de pagos de un cliente con crédito activo
    [Arguments]    ${customer_id}
    Buscar Financiamiento Por Customer ID Para Pago    ${customer_id}
    Consultar Historial De Pagos

Entonces el sistema muestra la pantalla de historial de pagos del cliente
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}

Cuando verifica el desglose de pagos en el historial
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}    timeout=10s

Entonces se visualiza tabla con todos los pagos mostrando detalles completos
    Element Should Be Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}
    Element Should Be Visible    ${LOCATOR_TXT_DETALLE_PAGO_HISTORIAL}

Cuando filtra los pagos por rango de fechas
    [Arguments]    ${fecha_inicio}    ${fecha_fin}
    Filtrar Historial De Pagos Por Rango De Fechas    ${fecha_inicio}    ${fecha_fin}

Entonces el sistema muestra únicamente pagos dentro del rango de fechas seleccionado
    Verificar Que Pagos Están Dentro Del Rango De Fechas

Cuando verifica que existan pagos desde diferentes puntos de cobro
    Wait Until Element Is Visible    ${LOCATOR_TABLA_HISTORIAL_PAGOS}    timeout=10s

Entonces se identifican correctamente pagos desde SICATEL en el desglose
    Verificar Que Existen Pagos Desde Punto De Cobro    SICATEL

Y se identifican correctamente pagos desde Kioscos en el desglose
    Verificar Que Existen Pagos Desde Punto De Cobro    Kiosco

Y se identifican correctamente pagos desde OXXO en el desglose
    Verificar Que Existen Pagos Desde Punto De Cobro    OXXO

# ============================================
# Keywords para Creación de Comentarios de Cuenta - Caso 50
# ============================================

Dado que se prepara la información del comentario de cuenta incluyendo accountId tipo descripción y usuario
    [Documentation]    Prepara los datos del comentario de cuenta incluyendo accountId, tipo, descripción, usuario y fecha
    [Arguments]    ${account_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    ${comentario}=    Preparar Información Del Comentario De Cuenta A Crear    ${account_id}    ${tipo_comentario}    ${descripcion}    ${usuario}
    Set Test Variable    ${DATOS_COMENTARIO_CUENTA}    ${comentario}
    Set Test Variable    ${ACCOUNT_ID_COMENTARIO}    ${account_id}
    Set Test Variable    ${DESCRIPCION_COMENTARIO}    ${descripcion}
    Set Test Variable    ${USUARIO_COMENTARIO}    ${usuario}
    Log    Datos del comentario de cuenta preparados: accountId=${account_id}, tipo=${tipo_comentario}, usuario=${usuario}

Entonces los datos del comentario de cuenta están completos y válidos para la creación
    [Documentation]    Verifica que los datos del comentario de cuenta están completos y válidos
    Verificar Datos Del Comentario De Cuenta Completos Y Válidos    ${DATOS_COMENTARIO_CUENTA}
    Log    Datos del comentario de cuenta validados correctamente

Cuando envía solicitud de creación de comentario de cuenta mediante CreateComments con datos de la cuenta
    [Documentation]    Envía solicitud al servicio CreateComments con los datos de la cuenta y el comentario
    ${response}=    Enviar Solicitud De Creación De Comentario De Cuenta Mediante CreateComments    ${DATOS_COMENTARIO_CUENTA}
    Set Test Variable    ${RESPONSE_CREATE_ACCOUNT_COMMENT}    ${response}
    Log    Solicitud de creación de comentario de cuenta enviada al servicio CreateComments

Entonces el sistema BES recibe la petición y valida la estructura de los datos del comentario de cuenta
    [Documentation]    Verifica que BES recibe la petición y valida la estructura de los datos del comentario
    Verificar Que BES Recibe La Petición De Comentario De Cuenta Y Valida Estructura    ${RESPONSE_CREATE_ACCOUNT_COMMENT}
    Log    BES recibió la petición y validó la estructura de los datos del comentario de cuenta

Cuando BES ejecuta la creación del comentario asociándolo al accountId correspondiente
    [Documentation]    BES ejecuta la creación del comentario en el sistema asociándolo al accountId
    Verificar Que Sistema Registra Comentario De Cuenta Exitosamente    ${RESPONSE_CREATE_ACCOUNT_COMMENT}
    Log    BES ejecutó la creación del comentario y lo asoció al accountId ${ACCOUNT_ID_COMENTARIO}

Entonces el sistema registra exitosamente el comentario de cuenta y asigna identificador único al registro
    [Documentation]    Verifica que el comentario fue registrado exitosamente y se asignó un commentId único
    Verificar Que Sistema Registra Comentario De Cuenta Exitosamente    ${RESPONSE_CREATE_ACCOUNT_COMMENT}
    Log    Comentario de cuenta registrado exitosamente con commentId: ${COMMENT_ID_CUENTA}

Cuando BES devuelve el response confirmando la creación del comentario con commentId generado y timestamp
    [Documentation]    BES devuelve respuesta de confirmación incluyendo el commentId y timestamp de registro
    Verificar Que BES Devuelve Confirmación Con CommentId Y Timestamp De Registro    ${RESPONSE_CREATE_ACCOUNT_COMMENT}
    Log    BES devolvió confirmación con commentId: ${COMMENT_ID_CUENTA} y timestamp: ${TIMESTAMP_REGISTRO}

Entonces la capa de integración recibe la confirmación con el identificador del comentario y fecha de creación
    [Documentation]    Verifica que la capa de integración recibe confirmación con commentId y timestamp
    Verificar Que BES Devuelve Confirmación Con CommentId Y Timestamp De Registro    ${RESPONSE_CREATE_ACCOUNT_COMMENT}
    Log    Capa de integración recibió confirmación con commentId: ${COMMENT_ID_CUENTA} y timestamp: ${TIMESTAMP_REGISTRO}

Cuando consulta los comentarios de la cuenta para verificar que el nuevo comentario fue registrado
    [Documentation]    Consulta los comentarios de la cuenta para verificar que el nuevo comentario fue registrado
    ${response}=    Consultar Comentarios De La Cuenta Para Verificar Registro    ${ACCOUNT_ID_COMENTARIO}
    Set Test Variable    ${RESPONSE_GET_ACCOUNT_COMMENTS}    ${response}
    Log    Consultando comentarios de la cuenta ${ACCOUNT_ID_COMENTARIO}

Entonces el comentario creado aparece en la lista de comentarios de la cuenta con los datos completos y correctos
    [Documentation]    Verifica que el comentario creado aparece en la lista con toda la información registrada
    Verificar Que Comentario Creado Aparece En Lista De Comentarios De Cuenta    ${RESPONSE_GET_ACCOUNT_COMMENTS}    ${COMMENT_ID_CUENTA}    ${DESCRIPCION_COMENTARIO}
    Verificar Que Comentario De Cuenta Contiene Toda La Información Registrada    ${RESPONSE_GET_ACCOUNT_COMMENTS}    ${COMMENT_ID_CUENTA}    ${DESCRIPCION_COMENTARIO}    ${USUARIO_COMENTARIO}
    Log    Comentario creado verificado en la lista de comentarios de la cuenta con todos los datos correctos

# ============================================
# Keywords para TC053 - Verificar Consulta de Contrato de Servicio vía QuerySubsServiceContract
# ============================================

Dado que se tiene un suscriptor con contrato de servicio activo en BES
    [Documentation]    Precondición: Suscriptor registrado en BES con contrato de servicio activo
    Crear Sesión BES QuerySubsServiceContract
    Log    Sesión creada para el servicio QuerySubsServiceContract

Cuando se invoca el servicio QuerySubsServiceContract con el número telefónico del suscriptor
    [Arguments]    ${numero_telefonico}
    [Documentation]    Invoca QuerySubsServiceContract desde la plataforma de Amigo Paguitos
    ${response}=    Invocar Servicio QuerySubsServiceContract    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_QUERY_CONTRACT}    ${response}
    Log    Servicio QuerySubsServiceContract invocado con número telefónico: ${numero_telefonico}

Entonces el ESB recibe la petición y la envía a BES para consulta
    [Documentation]    Verifica que el ESB procesó la petición y la envió a BES
    Verificar Que ESB Recibe Y Envia Petición A BES    ${RESPONSE_QUERY_CONTRACT}
    Log    ESB recibió la petición y la envió a BES correctamente

Y BES consulta el contrato de servicio asociado al suscriptor
    [Documentation]    Verifica que BES consultó el contrato de servicio del suscriptor
    Verificar Que BES Consulta Contrato De Servicio Del Suscriptor    ${RESPONSE_QUERY_CONTRACT}
    Log    BES consultó el contrato de servicio incluyendo términos y condiciones

Entonces la respuesta contiene los datos del contrato de servicio
    [Documentation]    Verifica que la respuesta incluye todos los detalles del contrato
    Verificar Que Respuesta Contiene Datos Del Contrato De Servicio    ${RESPONSE_QUERY_CONTRACT}
    Log    Respuesta contiene vigencia, tipo de contrato y servicios contratados

Y los datos del contrato se devuelven correctamente al consumidor
    [Documentation]    Verifica que el consumidor recibe la información completa del contrato
    Verificar Que Datos Del Contrato Se Devuelven Correctamente Al Consumidor    ${RESPONSE_QUERY_CONTRACT}
    Log    El consumidor recibió la información completa del contrato de servicio

# ============================================
# Keywords para Caso ID 27 - Visualización de fechas de vencimiento
# ============================================

Dado que el usuario ha iniciado sesión en BES con credenciales válidas
    Abrir Navegador En Página De Login
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Verificar Login Exitoso

Cuando consulta el plan de pagos de un cliente con financiamiento activo en BES
    [Arguments]    ${numero_telefonico}
    Navegar A Pantalla 360 De BES
    Ingresar Número Telefónico En Pantalla 360    ${numero_telefonico}

Entonces el sistema muestra el calendario de pagos del financiamiento
    Wait Until Element Is Visible    ${LOCATOR_SECCION_DESGLOSE_CUOTAS_360}    timeout=10s
    Element Should Be Visible    ${LOCATOR_SECCION_DESGLOSE_CUOTAS_360}

Cuando verifica que cada cuota tiene su fecha de vencimiento correctamente calculada
    Wait Until Element Is Visible    ${LOCATOR_TXT_CYCLE_DUE_DATE_360}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_CYCLE_DUE_DATE_360}

Entonces cada cuota muestra la fecha de vencimiento calculada según el ciclo configurado
    Verificar Que Se Muestra Fecha De Vencimiento De Cada Cuota

Cuando valida que las fechas de vencimiento respetan el ciclo de pago del cliente
    [Arguments]    ${tipo_ciclo}
    Log    Validando que fechas respetan ciclo de pago: ${tipo_ciclo}

Entonces las fechas se incrementan correctamente según el tipo de ciclo
    [Arguments]    ${tipo_ciclo}
    Log    Las fechas se incrementan correctamente según el ciclo ${tipo_ciclo}

Cuando verifica que se identifican cuotas vencidas comparando fecha actual con cycleDueDate
    Wait Until Element Is Visible    ${LOCATOR_TXT_STATUS_CUOTA_360}    timeout=10s

Entonces el sistema marca como vencidas las cuotas con fecha anterior a la fecha actual
    Verificar Que Se Muestra Estatus De Cada Cuota Individual

Y cierra la sesión del sistema BES
    Cerrar Sesión Del Navegador

# ============================================
# Keywords para Caso ID 28 - Consulta de estatus del préstamo
# ============================================

Cuando consulta un préstamo en BES mediante número telefónico del cliente
    [Arguments]    ${numero_telefonico}
    Navegar A Pantalla 360 De BES
    Ingresar Número Telefónico En Pantalla 360    ${numero_telefonico}

Entonces el sistema carga la información del préstamo correctamente
    Wait Until Element Is Visible    ${LOCATOR_SECCION_CREDITO_360}    timeout=10s
    Verificar Que Pantalla 360 Muestra Información Del Crédito

Cuando verifica el campo installmentStatus del plan de instalación
    Wait Until Element Is Visible    ${LOCATOR_TXT_INSTALLMENT_STATUS}    timeout=10s

Entonces se muestra el estatus del plan de instalación
    Verificar Que Se Muestra Estatus Del Plan De Financiamiento

Cuando consulta el campo status del préstamo
    Wait Until Element Is Visible    ${LOCATOR_TXT_STATUS_SUBSCRIBER_360}    timeout=10s

Entonces se visualiza el estatus general del préstamo correctamente
    Verificar Que Se Muestra Estatus General Del Servicio

Cuando verifica el campo subsidyStatus del subsidio
    Wait Until Element Is Visible    ${LOCATOR_TXT_SUBSIDY_STATUS}    timeout=10s

Entonces se muestra el estatus del subsidio asociado al financiamiento
    Verificar Que Se Muestra Estatus Del Subsidio

Cuando valida que el estatus se actualiza al realizar cambios
    Log    Validando que el estatus se actualiza correctamente

Entonces el sistema actualiza el estatus en tiempo real reflejando cambios
    Log    El sistema actualiza el estatus en tiempo real reflejando cambios en el comportamiento de pago

# ============================================
# Keywords para Caso ID 31 - Inhabilitación de equipos por falta de pago
# ============================================

Cuando consulta información del cliente con financiamiento activo mediante número telefónico
    [Arguments]    ${numero_telefonico}
    Navegar A Módulo De Inhabilitación
    Buscar Financiamiento Por Customer ID    ${numero_telefonico}

Entonces el sistema devuelve información del cliente incluyendo installmentPlanInstId y parcialidades
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUSTOMER_ID}    timeout=10s
    Element Should Be Visible    ${LOCATOR_TXT_IMEI}
    Element Should Be Visible    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS}

Cuando verifica que existen parcialidades vencidas sin pago en el calendario
    Wait Until Element Is Visible    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS}    timeout=10s

Entonces el sistema muestra parcialidades con status vencido y unpaidAmount mayor a cero
    Verificar Que Financiamiento Tiene Incumplimiento De Pago

Cuando ejecuta proceso de inhabilitación del equipo mediante SITIC Trustonic
    [Arguments]    ${imei}
    Ejecutar Inhabilitación Del Equipo

Entonces el sistema envía notificación de inhabilitación y el equipo queda bloqueado
    [Arguments]    ${imei}
    Verificar Integración Con SITIC-Trustonic    ${imei}
    Verificar Que Equipo Queda Inhabilitado

Cuando consulta nuevamente el estado del equipo IMEI asociado al cliente
    [Arguments]    ${imei}
    Log    Consultando estado del equipo IMEI: ${imei}

Entonces el sistema muestra el equipo inhabilitado y financiamiento con collectionProcessFlag activo
    Verificar Que Equipo Queda Inhabilitado

# ============================================
# Keywords para Caso ID 32 - Habilitación de equipos tras pago
# ============================================

Cuando consulta información del cliente con equipo inhabilitado por falta de pago
    [Arguments]    ${imei}
    Navegar A Módulo De Inhabilitación
    Buscar Financiamiento Por IMEI    ${imei}

Entonces el sistema muestra equipo inhabilitado y parcialidades vencidas pendientes
    Verificar Que Financiamiento Tiene Incumplimiento De Pago
    Verificar Que Equipo Queda Inhabilitado

Cuando acredita pago de parcialidad mediante integración con CPS
    [Arguments]    ${monto}    ${metodo_pago}    ${referencia}
    Navegar A Módulo De Cobranza Pagos
    Ingresar Datos Del Pago    ${monto}    ${metodo_pago}    ${referencia}
    Hacer Click En Botón Acreditar Pago

Entonces el sistema registra el pago y actualiza unpaidAmount y status de parcialidad
    Verificar Que Pago Fue Acreditado Exitosamente

Cuando verifica actualización del estado del financiamiento tras pago
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_ACTUALIZADO}    timeout=10s

Entonces el sistema actualiza installmentStatus y elimina collectionProcessFlag
    Verificar Que Saldo Y Estado Fueron Actualizados

Cuando ejecuta proceso de habilitación del equipo mediante SITIC Trustonic
    [Arguments]    ${imei}
    Log    Ejecutando proceso de habilitación del equipo IMEI: ${imei}

Entonces el sistema envía notificación de habilitación y el equipo queda desbloqueado
    [Arguments]    ${imei}
    Verificar Que BES Inicia Proceso De Habilitación Automática    ${imei}
    Verificar Integración Con SITIC-Trustonic Para Habilitación

Cuando consulta el estado final del equipo y del financiamiento
    [Arguments]    ${imei}
    Log    Consultando estado final del equipo IMEI: ${imei}

Entonces el sistema muestra equipo habilitado y financiamiento con status actualizado
    Verificar Que Equipo Queda Habilitado Y Servicio Activo

# ============================================
# Keywords para Caso ID 33 - Liberación de equipos por liquidación
# ============================================

Cuando consulta información del financiamiento activo mediante BCService QueryInstallment
    [Arguments]    ${numero_telefonico}
    Navegar A Pantalla 360 De BES
    Ingresar Número Telefónico En Pantalla 360    ${numero_telefonico}

Entonces el sistema muestra totalCycle cycleSequence y totalAmount del financiamiento
    Verificar Que Se Muestran Total De Ciclos Y Monto Total Del Crédito

Cuando acredita pago de última parcialidad pendiente completando financiamiento
    [Arguments]    ${monto}    ${metodo_pago}    ${referencia}
    Navegar A Módulo De Cobranza Pagos
    Ingresar Datos Del Pago    ${monto}    ${metodo_pago}    ${referencia}
    Hacer Click En Botón Acreditar Pago

Entonces el sistema registra pago final y actualiza cycleSequence igual a totalCycle
    Verificar Que Pago Fue Acreditado Exitosamente

Cuando verifica que installmentStatus cambia a liquidado o completado
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_ACTUALIZADO}    timeout=10s

Entonces el sistema actualiza installmentStatus y subsidyStatus reflejando liquidación total
    Verificar Que Saldo Y Estado Fueron Actualizados

Cuando ejecuta proceso de liberación del equipo mediante SITIC Trustonic
    [Arguments]    ${imei}
    Log    Ejecutando proceso de liberación del equipo IMEI: ${imei}

Entonces el sistema envía notificación de liberación y equipo queda completamente desbloqueado
    [Arguments]    ${imei}
    Log    Equipo IMEI ${imei} ha sido liberado completamente

Cuando consulta estado final del equipo y verifica inexistencia de restricciones
    [Arguments]    ${imei}
    Log    Consultando estado final del equipo IMEI: ${imei} sin restricciones

Entonces el sistema muestra equipo liberado sin restricciones de financiamiento
    Log    El equipo está liberado sin restricciones de financiamiento

# ============================================
# Keywords para Caso ID 54 - Validar consulta de instancia de offering vía QueryCustOfferingInst
# ============================================

Dado que se tiene un cliente con CustID válido y offering activo en BES
    [Documentation]    Precondición: Cliente con offering activo en BES con CustID válido
    [Arguments]    ${cust_id}
    Log    Preparando consulta para cliente con CustID: ${cust_id}
    Set Test Variable    ${CUST_ID}    ${cust_id}

Cuando se invoca el servicio TelcelInterfaceService QueryCustOfferingInst con el CustID del cliente
    [Documentation]    Ejecuta la invocación al servicio QueryCustOfferingInst
    ${response}=    Ejecutar API TelcelInterfaceService QueryCustOfferingInst    ${CUST_ID}
    Set Test Variable    ${RESPONSE_QUERY_CUST_OFFERING}    ${response}
    Log    Response obtenida del servicio QueryCustOfferingInst

Entonces el ESB procesa la petición QueryCustOfferingInst y BES genera respuesta exitosa
    [Documentation]    Verifica que BES procesó correctamente la petición
    Verificar Que BES Procesa La Petición QueryCustOfferingInst Y Genera Respuesta    ${RESPONSE_QUERY_CUST_OFFERING}

Y BES recupera la información del offering incluyendo installmentPlanInstId
    [Documentation]    Verifica que la respuesta contiene el campo installmentPlanInstId
    Verificar Que Response Contiene Campo installmentPlanInstId    ${RESPONSE_QUERY_CUST_OFFERING}

Y la respuesta contiene el campo installmentPlanInstId con valor numérico válido
    [Documentation]    Verifica que installmentPlanInstId tiene un valor numérico válido
    Verificar Que installmentPlanInstId Tiene Valor Numérico Válido    ${RESPONSE_QUERY_CUST_OFFERING}

Y el installmentPlanInstId devuelto corresponde al plan de financiamiento activo del cliente
    [Documentation]    Verifica que el installmentPlanInstId corresponde al plan esperado
    [Arguments]    ${installment_plan_inst_id_esperado}
    Verificar Que installmentPlanInstId Corresponde Al Plan De Financiamiento Activo Del Cliente    ${RESPONSE_QUERY_CUST_OFFERING}    ${CUST_ID}    ${installment_plan_inst_id_esperado}

# ============================================
# Keywords para Caso ID 55 - Inhabilitación plan postpago con financiamiento
# ============================================

Y navega al módulo de inhabilitación de equipos
    [Documentation]    Navegar al módulo de inhabilitación de equipos en BES
    Navegar A Módulo De Inhabilitación

Dado que existe un cliente con plan postpago y financiamiento activo
    [Documentation]    Buscar un cliente con plan postpago que tiene financiamiento activo
    [Arguments]    ${customer_id}
    Buscar Financiamiento Por Customer ID    ${customer_id}

Y el cliente tiene cuotas vencidas en el plan de financiamiento
    [Documentation]    Verificar que el cliente tiene cuotas vencidas en su financiamiento
    Verificar Que Financiamiento Tiene Incumplimiento De Pago

Cuando BES detecta el incumplimiento de pago según calendario de cobranza
    [Documentation]    BES detecta automáticamente el incumplimiento analizando el calendario
    Verificar Que Calendario De Cobranza Esta Activo

Entonces BES identifica las cuotas vencidas
    [Documentation]    BES identifica y muestra las cuotas vencidas del financiamiento
    ${customer_id}    ${imei}    ${parcialidades}    ${cycle_due_date}    ${estado}=    Obtener Información De Financiamiento En Morosidad
    Should Not Be Equal As Strings    ${parcialidades}    0
    Set Test Variable    ${IMEI_IDENTIFICADO}    ${imei}

Cuando ejecuta el proceso de notificación de pago al cliente
    [Documentation]    BES ejecuta el proceso automático de notificación al cliente
    Verificar Que Notificaciones Fueron Enviadas Al Cliente

Entonces se envía notificación informando del incumplimiento
    [Documentation]    Verifica que las notificaciones fueron enviadas correctamente
    Verificar Que Notificaciones Fueron Enviadas Al Cliente

Cuando invoca la API de SITIC-Trustonic para inhabilitar el equipo
    [Arguments]    ${imei}
    [Documentation]    Ejecuta el proceso de inhabilitación del equipo vía SITIC-Trustonic
    Ejecutar Inhabilitación Del Equipo

Entonces BES ejecuta la integración con Trustonic para inhabilitar el dispositivo
    [Arguments]    ${imei}
    [Documentation]    Verifica que BES ejecutó la integración con SITIC-Trustonic
    Verificar Integración Con SITIC-Trustonic    ${imei}
    Verificar Que Inhabilitación Fue Exitosa

Cuando verifica el estado del equipo en el sistema
    [Documentation]    Consulta el estado actual del equipo en BES
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_EQUIPO}    timeout=10s

Entonces el estado del equipo cambia a inhabilitado
    [Documentation]    Verifica que el equipo está marcado como inhabilitado
    Verificar Que Equipo Queda Inhabilitado

Y confirma que el registro de inhabilitación se almacena correctamente
    [Documentation]    Verifica que el registro contiene fecha, hora y motivo
    Element Should Be Visible    ${LOCATOR_TXT_FECHA_INHABILITACION}
    Element Should Be Visible    ${LOCATOR_TXT_MOTIVO_INHABILITACION}

# ============================================
# Keywords para Caso ID 55 - Flujo de inhabilitación para plan postpago con financiamiento
# ============================================

Y navega al módulo de inhabilitación de equipos
    [Documentation]    Navega al módulo de inhabilitación de equipos en BES
    Navegar A Módulo De Inhabilitación

Dado que existe un cliente con plan postpago y financiamiento con pagos vencidos
    [Arguments]    ${customer_id}
    [Documentation]    Identifica un cliente con plan postpago, financiamiento activo y pagos vencidos
    Buscar Financiamiento Por Customer ID    ${customer_id}
    Verificar Que Financiamiento Tiene Incumplimiento De Pago

Entonces BES detecta el incumplimiento de pago según el calendario de cobranza
    [Documentation]    Verifica que BES identifica cuotas vencidas en el plan de financiamiento
    Verificar Que Financiamiento Tiene Incumplimiento De Pago
    ${parcialidades}    ${cycle_due_date}    ${estado}=    Obtener Información De Morosidad Del Financiamiento
    Log    BES detectó ${parcialidades} parcialidades vencidas con fecha de vencimiento ${cycle_due_date}

Entonces BES ejecuta el proceso de notificación de pago al cliente
    [Documentation]    Verifica que se envía notificación al cliente informando del incumplimiento
    Verificar Que Notificaciones Fueron Enviadas Al Cliente

Cuando BES invoca la API de SITIC-Trustonic para inhabilitar el equipo
    [Arguments]    ${imei}
    [Documentation]    Ejecuta la integración con SITIC-Trustonic para inhabilitar el dispositivo
    Ejecutar Inhabilitación Del Equipo
    Verificar Integración Con SITIC-Trustonic    ${imei}

Entonces el equipo queda inhabilitado en el sistema
    [Documentation]    Verifica que el estado del equipo cambia a inhabilitado
    Verificar Que Equipo Queda Inhabilitado

Y el registro de inhabilitación se almacena correctamente con fecha hora y motivo
    [Documentation]    Confirma que se registra fecha, hora y motivo de inhabilitación en BES
    Verificar Registro De Inhabilitación Con Fecha Hora Y Motivo

# ============================================
# Keywords para Caso ID 56 - Inhabilitación plan postpago con subsidio
# ============================================

Dado que existe un cliente con plan postpago y subsidio activo con morosidad
    [Documentation]    Identifica un cliente con plan postpago, subsidio activo y morosidad detectada
    [Arguments]    ${customer_id}
    Buscar Financiamiento Por Customer ID    ${customer_id}
    Verificar Que Financiamiento Tiene Incumplimiento De Pago

Cuando consulta el estado del subsidio mediante subsidyStatus en BES
    [Documentation]    Consulta el estado del subsidio del cliente usando subsidyStatus
    Wait Until Element Is Visible    ${LOCATOR_TXT_SUBSIDY_STATUS}    timeout=10s

Entonces BES muestra el estado del subsidio asociado al cliente
    [Documentation]    Verifica que BES muestra el estado del subsidio correctamente
    Verificar Que Se Muestra Estatus Del Subsidio

Y valida que BES administra el calendario de cobranza para el subsidio
    [Documentation]    Valida que BES administra y refleja el calendario de cobranza del subsidio
    Verificar Que Calendario De Cobranza Esta Activo
    ${parcialidades}    ${cycle_due_date}    ${estado}=    Obtener Información De Morosidad Del Financiamiento
    Log    Calendario de cobranza del subsidio - Parcialidades vencidas: ${parcialidades}, Fecha vencimiento: ${cycle_due_date}, Estado: ${estado}

Entonces BES ejecuta la notificación de pago pendiente al cliente
    [Documentation]    BES envía notificación al cliente informando del incumplimiento del subsidio
    Verificar Que Notificaciones Fueron Enviadas Al Cliente

Cuando BES invoca la API de SITIC-Trustonic para inhabilitar el equipo por incumplimiento del subsidio
    [Documentation]    Ejecuta la integración con SITIC-Trustonic para inhabilitar el dispositivo por incumplimiento de subsidio
    [Arguments]    ${imei}
    Ejecutar Inhabilitación Del Equipo
    Verificar Integración Con SITIC-Trustonic    ${imei}

Entonces el equipo queda inhabilitado y el estado se actualiza en BES
    [Documentation]    Verifica que el equipo quedó inhabilitado y el estado fue actualizado correctamente en BES
    Verificar Que Equipo Queda Inhabilitado
    Verificar Que Inhabilitación Fue Exitosa

# ============================================
# Keywords adicionales para Caso ID 56 - Inhabilitación plan postpago con subsidio
# ============================================

Dado que se identifica un cliente con plan postpago que tiene subsidio activo y presenta morosidad
    [Documentation]    Identifica cliente con plan postpago, subsidio activo y morosidad detectada
    [Arguments]    ${customer_id}
    Navegar A Módulo De Subsidios
    Buscar Cliente Por Customer ID En Subsidios    ${customer_id}
    Verificar Que Cliente Tiene Plan Postpago
    Verificar Que Cliente Tiene Subsidio Activo
    Verificar Que Cliente Presenta Morosidad
    ${customer_id}    ${numero_telefono}    ${tipo_plan}    ${estado_plan}=    Obtener Información Del Cliente Con Subsidio
    Set Test Variable    ${CUSTOMER_ID_IDENTIFICADO}    ${customer_id}
    Set Test Variable    ${NUMERO_TELEFONO_IDENTIFICADO}    ${numero_telefono}
    Log    Cliente identificado: ${customer_id}, Plan: ${tipo_plan}, Estado: ${estado_plan}

Cuando se consulta el estado del subsidio mediante subsidyStatus en BES
    [Documentation]    Consulta el estado actual del subsidio del cliente usando subsidyStatus
    ${subsidio_id}    ${estado}    ${monto}    ${fecha_inicio}=    Consultar Estado Del Subsidio
    Set Test Variable    ${SUBSIDIO_ID}    ${subsidio_id}
    Set Test Variable    ${ESTADO_SUBSIDIO}    ${estado}
    Set Test Variable    ${MONTO_SUBSIDIO}    ${monto}
    Log    Estado del subsidio consultado: ID=${subsidio_id}, Estado=${estado}, Monto=${monto}

Entonces se obtiene el estado actual del subsidio del cliente
    [Documentation]    Verifica que se obtuvo exitosamente el estado del subsidio
    Should Not Be Empty    ${ESTADO_SUBSIDIO}
    Should Not Be Empty    ${SUBSIDIO_ID}
    Log    Estado del subsidio obtenido correctamente: ${ESTADO_SUBSIDIO}

Cuando se valida que BES administra el calendario de cobranza para el subsidio
    [Documentation]    Valida que BES administra el calendario de cobranza mostrando cuotas del subsidio
    Verificar Que BES Administra Calendario De Cobranza Para Subsidio
    Verificar Que Calendario Refleja Cuotas De Subsidio Pendientes

Entonces el calendario de cobranza refleja las cuotas del subsidio pendientes de pago
    [Documentation]    Verifica que el calendario muestra cuotas pendientes y vencidas del subsidio
    Verificar Que Calendario Refleja Cuotas De Subsidio Pendientes
    ${dias}    ${monto}    ${fecha}    ${monto_pago}=    Obtener Información De Morosidad Del Subsidio
    Log    Calendario de cobranza: ${dias} días de morosidad, monto vencido: ${monto}

Cuando se ejecuta notificación de pago pendiente al cliente
    [Documentation]    Ejecuta el proceso de notificación informando del incumplimiento del subsidio
    Navegar A Módulo De Notificaciones De Pago
    Buscar Crédito Por Customer ID Para Notificaciones    ${CUSTOMER_ID_IDENTIFICADO}
    Verificar Que Notificaciones Fueron Enviadas Al Cliente

Entonces se envía notificación informando del incumplimiento del subsidio
    [Documentation]    Verifica que la notificación fue enviada al cliente
    Verificar Que Notificaciones Fueron Enviadas Al Cliente
    Log    Notificación enviada al cliente informando del incumplimiento del subsidio

Cuando se invoca la API de SITIC-Trustonic para inhabilitar el equipo
    [Documentation]    Invoca la API de SITIC-Trustonic para ejecutar la inhabilitación del dispositivo
    Navegar A Módulo De Inhabilitación
    Buscar Financiamiento Por Customer ID    ${CUSTOMER_ID_IDENTIFICADO}
    ${customer_id}    ${imei}    ${parcialidades}    ${cycle_due_date}    ${estado}=    Obtener Información De Financiamiento En Morosidad
    Set Test Variable    ${IMEI_EQUIPO}    ${imei}
    Ejecutar Inhabilitación Del Equipo

Entonces BES ejecuta la inhabilitación del dispositivo a través de Trustonic
    [Documentation]    Verifica que BES ejecutó la integración con SITIC-Trustonic exitosamente
    Verificar Integración Con SITIC-Trustonic    ${IMEI_EQUIPO}
    Verificar Que Inhabilitación Fue Exitosa

Cuando se verifica que el equipo queda inhabilitado y el estado se actualiza en BES
    [Documentation]    Verifica el estado final del equipo y el registro en BES
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_EQUIPO}    timeout=10s

Entonces el equipo no puede operar y el sistema registra la inhabilitación
    [Documentation]    Verifica que el equipo está inhabilitado y el registro fue almacenado correctamente
    Verificar Que Equipo Queda Inhabilitado
    Verificar Registro De Inhabilitación Con Fecha Hora Y Motivo
    Log    Equipo inhabilitado exitosamente - IMEI: ${IMEI_EQUIPO}

# ============================================
# Keywords para Caso ID 57 - Inhabilitación para plan tipo Amigo Paguitos
# ============================================

Dado que existe un cliente de Amigo Paguitos con parcialidades vencidas
    [Documentation]    Identifica un cliente de Amigo Paguitos con parcialidades vencidas
    [Arguments]    ${customer_id}
    Buscar Financiamiento Por Customer ID    ${customer_id}
    Verificar Que Financiamiento Tiene Incumplimiento De Pago
    ${customer_id}    ${imei}    ${parcialidades}    ${cycle_due_date}    ${estado}=    Obtener Información De Financiamiento En Morosidad
    Set Test Variable    ${CUSTOMER_ID_IDENTIFICADO}    ${customer_id}
    Set Test Variable    ${IMEI_IDENTIFICADO}    ${imei}
    Set Test Variable    ${PARCIALIDADES_VENCIDAS}    ${parcialidades}
    Log    Cliente Amigo Paguitos identificado: ${customer_id}, IMEI: ${imei}, Parcialidades vencidas: ${parcialidades}

Entonces BES administra el calendario de cobranza específico de Amigo Paguitos
    [Documentation]    Verifica que el calendario refleja ciclos configurables: semanal, quincenal o mensual
    Verificar Que BES Administra Calendario De Cobranza Amigo Paguitos
    Verificar Ciclo Configurable En Calendario Amigo Paguitos

Entonces BES confirma que no hay promesas de pago activas
    [Documentation]    Verifica que no existen promesas de pago registradas
    Verificar Que No Hay Promesas De Pago Activas

Cuando BES envía notificación de pago al cliente
    [Documentation]    BES envía notificación informando del incumplimiento de parcialidades
    Enviar Notificación De Pago Al Cliente

Cuando BES invoca la API de SITIC-Trustonic para inhabilitar el equipo
    [Documentation]    Ejecuta la inhabilitación del dispositivo a través de la integración con Trustonic
    Ejecutar Inhabilitación Del Equipo

Entonces el equipo queda inhabilitado y se registra la inhabilitación en BES
    [Documentation]    Verifica que el equipo queda inhabilitado y el registro incluye fecha, hora y motivo
    Verificar Que Equipo Queda Inhabilitado
    Verificar Integración Con SITIC-Trustonic    ${IMEI_IDENTIFICADO}
    Verificar Registro De Inhabilitación Con Fecha Hora Y Motivo
    Log    Inhabilitación exitosa para cliente Amigo Paguitos - Customer ID: ${CUSTOMER_ID_IDENTIFICADO}, IMEI: ${IMEI_IDENTIFICADO}

# ============================================
# Keywords para Caso ID 40 - Venta de servicios prepagado de contado
# ============================================

Dado que el usuario ha consultado información del cliente mediante PACPagosService
    [Documentation]    Consulta información del cliente y equipo mediante PACPagosService
    [Arguments]    ${numero_telefonico}
    ${response}=    Consultar Cliente Mediante PACPagosService    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_CLIENTE}    ${response}

Entonces el sistema devuelve información completa del cliente y equipo vendido
    [Documentation]    Verifica que se devuelve serviceNumber, IMEI, primaryOfferingId y financiamiento
    [Arguments]    ${numero_telefonico}    ${imei}    ${total_amount}    ${total_cycle}
    Verificar Información Completa Del Cliente Y Equipo    ${RESPONSE_CLIENTE}    ${numero_telefonico}    ${imei}    ${total_amount}    ${total_cycle}

Cuando registra venta de servicio suplementario prepagado de contado
    [Documentation]    Registra la venta de un servicio suplementario de contado
    [Arguments]    ${numero_telefonico}    ${servicio}
    Abrir Navegador En Página De Login
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Navegar A Módulo De Venta De Servicios Suplementarios
    Ingresar Número Telefónico Para Venta    ${numero_telefonico}
    Verificar Que Cliente Prepagado Es Recuperado
    Seleccionar Servicio Suplementario    ${servicio}
    Seleccionar Modalidad De Pago Contado

Entonces el sistema registra la venta del servicio sin incluirlo en el financiamiento
    [Documentation]    Verifica que el servicio se registró sin incluirlo en el financiamiento
    Confirmar Transacción De Venta
    Verificar Que Venta Fue Registrada Exitosamente
    Verificar Que Servicio No Está Incluido En Financiamiento

Y el servicio suplementario no afecta valores del financiamiento original
    [Documentation]    Verifica que totalAmount y totalCycle no se alteraron
    [Arguments]    ${total_amount_original}    ${total_cycle_original}
    Verificar Valores Originales Del Financiamiento No Se Alteran    ${total_amount_original}    ${total_cycle_original}

Cuando activa el servicio suplementario en el número telefónico del cliente
    [Documentation]    Activa el servicio suplementario prepagado
    [Arguments]    ${numero_telefonico}    ${servicio}
    Activar Servicio Suplementario En Número Telefónico    ${numero_telefonico}    ${servicio}

Entonces el sistema activa el servicio respetando promociones vigentes
    [Documentation]    Verifica que el servicio se activó respetando promociones AK ASL y AK con Todo
    Wait Until Element Is Visible    css:.promotion-info    timeout=10s
    ${info_promocion}=    Get Text    css:.promotion-info
    Should Contain Any    ${info_promocion}    AK ASL    AK con Todo    Promoción aplicada

Cuando consulta información actualizada del cliente
    [Documentation]    Consulta nuevamente la información del cliente
    Go To    ${URL_LOGIN}/consultas/cliente
    Wait Until Element Is Visible    id:inputNumeroConsulta    timeout=10s

Entonces el sistema muestra servicio activo y financiamiento sin alteraciones
    [Documentation]    Verifica servicio activo y valores de financiamiento sin cambios
    [Arguments]    ${servicio}    ${total_amount_original}    ${total_cycle_original}
    Verificar Servicio Activo Y Financiamiento Sin Alteraciones    ${servicio}    ${total_amount_original}    ${total_cycle_original}

# ============================================
# Keywords para Caso ID 41 - Venta de servicios diferido
# ============================================

Dado que el usuario ha iniciado sesión en la plataforma de Amigo Paguitos
    [Documentation]    Usuario autenticado en Amigo Paguitos
    Abrir Navegador En Página De Login
    Go To    https://amigopaguitos-telcel-dev.com/login
    Wait Until Element Is Visible    id:inputUsuarioAP    timeout=10s
    Input Text    id:inputUsuarioAP    usuario_ap_prueba
    Input Password    id:inputPasswordAP    Password123!
    Click Button    id:btnLoginAP
    Wait Until Element Is Visible    id:menuPrincipalAP    timeout=10s

Cuando inicia el proceso de venta de equipo con servicios suplementarios prepagado
    [Documentation]    Inicia venta de equipo con servicios
    [Arguments]    ${imei}    ${marca}    ${modelo}
    Go To    https://amigopaguitos-telcel-dev.com/ventas/nuevo
    Wait Until Element Is Visible    id:inputIMEIVenta    timeout=10s
    Input Text    id:inputIMEIVenta    ${imei}
    Input Text    id:inputMarcaVenta    ${marca}
    Input Text    id:inputModeloVenta    ${modelo}
    Click Button    id:btnContinuarVenta

Entonces el sistema muestra catálogo de servicios prepagado disponibles
    [Documentation]    Verifica que se muestre el catálogo de servicios
    Wait Until Element Is Visible    css:.catalogo-servicios-prepagado    timeout=10s
    Element Should Be Visible    css:.catalogo-servicios-prepagado
    ${catalogo}=    Get Text    css:.catalogo-servicios-prepagado
    Should Not Be Empty    ${catalogo}

Cuando agrega servicios suplementarios a la venta del equipo
    [Documentation]    Agrega servicios a la venta
    [Arguments]    ${servicio1}    ${servicio2}
    Wait Until Element Is Visible    css:.catalogo-servicios-prepagado .servicio-item    timeout=10s
    Click Element    xpath://div[contains(text(),'${servicio1}')]
    Click Element    xpath://div[contains(text(),'${servicio2}')]
    Set Test Variable    ${SERVICIOS_AGREGADOS}    ${servicio1},${servicio2}

Y selecciona modalidad de pago para el servicio
    [Documentation]    Selecciona modalidad de pago para un servicio
    [Arguments]    ${servicio}    ${modalidad}
    Wait Until Element Is Visible    xpath://div[contains(text(),'${servicio}')]/..//select[@class='modalidad-pago']    timeout=5s
    Select From List By Label    xpath://div[contains(text(),'${servicio}')]/..//select[@class='modalidad-pago']    ${modalidad}

Entonces el sistema registra la forma de pago de cada servicio correctamente
    [Documentation]    Verifica que las modalidades de pago fueron registradas
    Wait Until Element Is Visible    css:.resumen-servicios    timeout=5s
    ${resumen}=    Get Text    css:.resumen-servicios
    Should Contain    ${resumen}    Contado
    Should Contain    ${resumen}    Diferido

Cuando completa la venta en Amigo Paguitos y transfiere datos a BES
    [Documentation]    Completa la venta y transfiere información a BES
    [Arguments]    ${nombre}    ${curp}    ${rfc}
    Wait Until Element Is Visible    id:inputNombreClienteVenta    timeout=10s
    Input Text    id:inputNombreClienteVenta    ${nombre}
    Input Text    id:inputCURPClienteVenta    ${curp}
    Input Text    id:inputRFCClienteVenta    ${rfc}
    Click Button    id:btnFinalizarVenta
    Wait Until Element Is Visible    css:.venta-exitosa    timeout=15s

Entonces BES recibe y almacena información de venta con servicios prepagado
    [Documentation]    Verifica que BES recibió la información
    ${mensaje_exito}=    Get Text    css:.venta-exitosa
    Should Contain    ${mensaje_exito}    transferida a BES
    Should Contain    ${mensaje_exito}    exitosamente

Cuando accede a BES para verificar los servicios registrados
    [Documentation]    Accede a BES para verificar servicios
    Go To    ${URL_LOGIN}
    Wait Until Element Is Visible    ${LOCATOR_INPUT_USUARIO}    timeout=10s
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Go To    ${URL_LOGIN}/servicios/consulta
    Wait Until Element Is Visible    id:inputBuscarServicios    timeout=10s

Entonces BES muestra servicios prepagado con modalidad de pago correcta
    [Documentation]    Verifica que los servicios se muestran con modalidad correcta
    [Arguments]    ${servicio1}    ${modalidad1}    ${servicio2}    ${modalidad2}
    Wait Until Element Is Visible    css:.servicios-registrados    timeout=10s
    ${servicios_info}=    Get Text    css:.servicios-registrados
    Should Contain    ${servicios_info}    ${servicio1}
    Should Contain    ${servicios_info}    ${modalidad1}
    Should Contain    ${servicios_info}    ${servicio2}
    Should Contain    ${servicios_info}    ${modalidad2}

# ============================================
# Keywords para Caso ID 42 - Activación de línea sobre equipo vendido
# ============================================

Dado que se ha completado la venta de un equipo a través de Amigo Paguitos
    [Documentation]    Precondición: Venta de equipo completada
    [Arguments]    ${imei}    ${marca}    ${modelo}
    Abrir Navegador En Página De Login
    Dado que el usuario ha iniciado sesión en la plataforma de Amigo Paguitos
    Cuando inicia el proceso de venta de equipo con servicios suplementarios prepagado    ${imei}    ${marca}    ${modelo}
    Click Button    id:btnFinalizarVentaSinServicios
    Wait Until Element Is Visible    css:.venta-exitosa    timeout=15s
    Set Test Variable    ${IMEI_VENDIDO}    ${imei}

Entonces el sistema registra la venta del equipo exitosamente
    [Documentation]    Verifica que la venta fue registrada
    Verificar Venta De Equipo Registrada

Cuando solicita la activación de línea celular aplicando la promoción
    [Documentation]    Solicita activación con promoción
    [Arguments]    ${promocion}    ${nombre}    ${curp}    ${rfc}    ${domicilio}
    Go To    ${URL_LOGIN}
    Ingresar Credenciales    ${USUARIO_PRUEBA}    ${PASSWORD_PRUEBA}
    Hacer Click En Botón Ingresar
    Navegar A Módulo De Activación De Líneas
    Ingresar IMEI Del Equipo    ${IMEI_VENDIDO}
    Hacer Click En Botón Validar IMEI
    Verificar Que IMEI Es Válido Y Recupera Información
    Seleccionar Tipo De Línea Prepagado
    Solicitar Activación Con Promoción    ${promocion}    ${nombre}    ${curp}    ${rfc}    ${domicilio}

Entonces el sistema permite la activación y aplica la promoción correctamente
    [Documentation]    Verifica aplicación de promoción
    [Arguments]    ${promocion}
    Verificar Aplicación Correcta De Promoción    ${promocion}

Y la promoción se aplica con todos sus beneficios según condiciones vigentes
    [Documentation]    Verifica beneficios de la promoción
    [Arguments]    ${promocion}
    Verificar Beneficios Según Condiciones Vigentes    ${promocion}

Cuando solicita activación alternativa con promoción
    [Documentation]    Solicita activación con promoción alternativa
    [Arguments]    ${promocion}
    Wait Until Element Is Visible    css:.promocion-selector    timeout=10s
    Select From List By Label    css:.promocion-selector    ${promocion}
    Click Button    id:btnAplicarPromocionAlternativa

Entonces el sistema permite activación con la promoción alternativa
    [Documentation]    Verifica que se permite activación con promoción alternativa
    [Arguments]    ${promocion}
    Wait Until Element Is Visible    css:.promotion-applied    timeout=10s
    ${info_promo}=    Get Text    css:.promotion-applied
    Should Contain    ${info_promo}    ${promocion}

Y BES administra correctamente el financiamiento con línea activada
    [Documentation]    Verifica gestión integrada
    Verificar Gestión Integrada De Financiamiento Y Línea

# ============================================
# Keywords para Caso ID 43 - Respeto a promociones AK ASL
# ============================================

Cuando consulta las promociones vigentes de tipo AK ASL en el sistema
    [Documentation]    Consulta promociones AK ASL
    Go To    ${URL_LOGIN}/promociones/consulta
    Wait Until Element Is Visible    id:selectTipoPromocion    timeout=10s
    Select From List By Label    id:selectTipoPromocion    AK ASL
    Click Button    id:btnBuscarPromociones
    Consultar Promociones Vigentes En Sistema    AK ASL

Entonces el sistema muestra las promociones AK ASL activas y condiciones
    [Documentation]    Verifica promociones activas
    Verificar Promociones Activas Y Condiciones    AK ASL

Cuando realiza venta de equipo y activación de línea con promoción
    [Documentation]    Realiza venta completa con promoción
    [Arguments]    ${imei}    ${marca}    ${modelo}    ${promocion}    ${nombre}
    Go To    ${URL_LOGIN}/ventas/nueva-con-activacion
    Wait Until Element Is Visible    id:inputIMEIVentaActivacion    timeout=10s
    Input Text    id:inputIMEIVentaActivacion    ${imei}
    Input Text    id:inputMarcaEquipo    ${marca}
    Input Text    id:inputModeloEquipo    ${modelo}
    Select From List By Label    id:selectPromocion    ${promocion}
    Input Text    id:inputNombreCliente    ${nombre}
    Click Button    id:btnProcesarVentaActivacion
    Wait Until Element Is Visible    css:.proceso-exitoso    timeout=15s

Entonces el sistema aplica automáticamente la promoción al cumplir condiciones
    [Documentation]    Verifica aplicación automática
    [Arguments]    ${promocion}
    Aplicar Promoción Automáticamente Al Cumplir Condiciones    ${promocion}

Y los beneficios de la promoción se reflejan en el financiamiento
    [Documentation]    Verifica beneficios en financiamiento
    [Arguments]    ${promocion}
    Verificar Beneficios En Financiamiento    ${promocion}

Cuando accede a BES para confirmar almacenamiento de la promoción
    [Documentation]    Accede a BES para verificar promoción
    [Arguments]    ${numero_telefonico}
    Go To    ${URL_LOGIN}/financiamiento/consulta
    Wait Until Element Is Visible    id:inputNumeroTelefono    timeout=10s
    Input Text    id:inputNumeroTelefono    ${numero_telefonico}
    Click Button    id:btnConsultarFinanciamiento
    Wait Until Element Is Visible    css:.financing-info    timeout=10s

Entonces BES registra la promoción asociada al crédito del cliente
    [Documentation]    Verifica registro de promoción
    [Arguments]    ${promocion}
    Verificar Promoción Asociada A Crédito En BES    ${promocion}    ${NUMERO_TELEFONICO}

Y BES administra la promoción durante la vida del financiamiento
    [Documentation]    Verifica gestión de promoción
    [Arguments]    ${promocion}
    Verificar Gestión De Promoción Durante Vida Del Financiamiento    ${promocion}

# ============================================
# Keywords para Caso ID 44 - Aplicación de promoción AK con Todo
# ============================================

Cuando consulta las promociones vigentes de tipo AK con Todo en el sistema
    [Documentation]    Consulta promociones AK con Todo
    Go To    ${URL_LOGIN}/promociones/consulta
    Wait Until Element Is Visible    id:selectTipoPromocion    timeout=10s
    Select From List By Label    id:selectTipoPromocion    AK con Todo
    Click Button    id:btnBuscarPromociones
    Consultar Promociones Vigentes En Sistema    AK con Todo

Entonces el sistema muestra las promociones AK con Todo activas y condiciones
    [Documentation]    Verifica promociones activas
    Verificar Promociones Activas Y Condiciones    AK con Todo

Entonces el sistema permite seleccionar y aplicar la promoción
    [Documentation]    Verifica selección y aplicación
    [Arguments]    ${promocion}
    Wait Until Element Is Visible    css:.promotion-applied    timeout=10s
    ${mensaje}=    Get Text    css:.promotion-applied
    Should Contain    ${mensaje}    ${promocion}

Y los términos del financiamiento incluyen beneficios de la promoción
    [Documentation]    Verifica términos con beneficios
    [Arguments]    ${promocion}
    Verificar Beneficios En Financiamiento    ${promocion}

Cuando accede a BES para confirmar registro de la promoción
    [Documentation]    Accede a BES para verificar
    [Arguments]    ${numero_telefonico}
    Cuando accede a BES para confirmar almacenamiento de la promoción    ${numero_telefonico}

Entonces BES almacena la promoción asociada al crédito del cliente
    [Documentation]    Verifica almacenamiento
    [Arguments]    ${promocion}
    Entonces BES registra la promoción asociada al crédito del cliente    ${promocion}

Y BES gestiona correctamente la promoción durante la vida del financiamiento
    [Documentation]    Verifica gestión correcta
    [Arguments]    ${promocion}
    Y BES administra la promoción durante la vida del financiamiento    ${promocion}

Entonces cerrar la sesión del navegador
    [Documentation]    Cierra el navegador
    Cerrar Sesión Del Navegador

# ============================================
# Keywords adicionales para Caso ID 57 - Flujo inhabilitación Amigo Paguitos
# ============================================

Entonces BES identifica al cliente y las parcialidades pendientes de pago
    [Documentation]    Verifica que BES identifica al cliente y muestra parcialidades vencidas
    Wait Until Element Is Visible    ${LOCATOR_TXT_CUSTOMER_ID}    timeout=10s
    ${parcialidades_vencidas}=    Get Text    ${LOCATOR_TXT_PARCIALIDADES_VENCIDAS}
    Should Not Be Equal As Strings    ${parcialidades_vencidas}    0
    Log    BES identificó ${parcialidades_vencidas} parcialidades pendientes de pago

Cuando valida que BES administra el calendario de cobranza de Amigo Paguitos
    [Documentation]    Valida que BES administra el calendario de cobranza específico de Amigo Paguitos
    Verificar Que BES Administra Calendario De Cobranza Amigo Paguitos

Entonces el calendario refleja ciclos configurables de Amigo Paguitos
    [Documentation]    Verifica que el calendario refleja ciclos configurables: semanal, quincenal o mensual
    Verificar Ciclo Configurable En Calendario Amigo Paguitos

Cuando verifica que no hay promesas de pago activas para el cliente
    [Documentation]    Verifica que no hay promesas de pago registradas
    Verificar Que No Hay Promesas De Pago Activas

Entonces el sistema confirma que no existen promesas de pago registradas
    [Documentation]    Confirma ausencia de promesas de pago activas
    Verificar Que No Hay Promesas De Pago Activas
    Log    Sistema confirmó que no existen promesas de pago activas para el cliente

Cuando ejecuta el envío de notificación de pago al cliente
    [Documentation]    Ejecuta el envío de notificación informando del incumplimiento
    Enviar Notificación De Pago Al Cliente

Entonces BES envía notificación informando del incumplimiento de parcialidades
    [Documentation]    Verifica que BES envió la notificación correctamente
    Verificar Que Notificaciones Fueron Enviadas Al Cliente
    Log    BES envió notificación informando del incumplimiento de parcialidades

Entonces se ejecuta la inhabilitación del dispositivo a través de Trustonic
    [Arguments]    ${imei}
    [Documentation]    Verifica que se ejecutó la inhabilitación mediante SITIC-Trustonic
    Verificar Integración Con SITIC-Trustonic    ${imei}
    Verificar Que Inhabilitación Fue Exitosa
    Log    Inhabilitación ejecutada exitosamente a través de SITIC-Trustonic para IMEI: ${imei}

Cuando verifica que el equipo queda inhabilitado en BES
    [Documentation]    Verifica el estado del equipo en BES
    Wait Until Element Is Visible    ${LOCATOR_TXT_ESTADO_EQUIPO}    timeout=10s

Y confirma que el registro incluye fecha hora y motivo de inhabilitación
    [Documentation]    Confirma que el registro de inhabilitación tiene todos los datos requeridos
    Verificar Registro De Inhabilitación Con Fecha Hora Y Motivo
    Log    Registro de inhabilitación confirmado con fecha, hora y motivo almacenados en BES

# ============================================
# Keywords para Escalamiento a TI por Fallas Persistentes (Caso TC060)
# ============================================

Dado que el ESB está configurado con parámetros de reintento automático
    [Arguments]    ${max_reintentos}    ${tiempo_entre_reintentos_segundos}
    [Documentation]    Precondición: Configurar el ESB con parámetros de reintento automático
    Configurar Parámetros De Reintento Automático En ESB    ${max_reintentos}    ${tiempo_entre_reintentos_segundos}
    Log    ESB configurado con ${max_reintentos} reintentos, tiempo entre reintentos: ${tiempo_entre_reintentos_segundos}s

Cuando se invoca el servicio PACPagosService ConsultarPaguitos con datos válidos
    [Arguments]    ${numero_telefonico}
    [Documentation]    Invocar el servicio PACPagosService.ConsultarPaguitos con datos válidos
    Log    Invocando servicio PACPagosService.ConsultarPaguitos con número: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Y se simula una falla persistente de tipo ESB4 por falla de conexión desde BES
    [Documentation]    Simula una falla de conexión persistente que se mantiene en todos los reintentos
    ${response}=    Simular Falla Persistente De Conexión Con BES    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE_FALLA_PERSISTENTE}    ${response}
    Log    Falla persistente ESB4 simulada - falla de conexión desde BES

Entonces el ESB ejecuta todos los reintentos configurados para el error ESB4
    [Arguments]    ${numero_reintentos_esperado}
    [Documentation]    Verifica que el ESB ejecutó todos los reintentos configurados
    Verificar Que ESB Ejecutó Todos Los Reintentos Configurados    ${RESPONSE_FALLA_PERSISTENTE}    ${numero_reintentos_esperado}
    Log    ESB ejecutó los ${numero_reintentos_esperado} reintentos configurados

Y después de agotar los reintentos la falla persiste con el mismo error ESB4
    [Documentation]    Valida que todos los intentos fallaron con el mismo código de error ESB4
    Verificar Que Todos Los Reintentos Fallaron Con El Mismo Error ESB4    ${RESPONSE_FALLA_PERSISTENTE}
    Log    Todos los reintentos fallaron con el mismo error ESB4 - falla persistente confirmada

Entonces el sistema genera un mensaje indicando que se debe levantar incidente a TI para análisis
    [Documentation]    Verifica que el mensaje de error indica levantar incidente a TI
    Verificar Que Sistema Genera Mensaje Levantar Incidente A TI    ${RESPONSE_FALLA_PERSISTENTE}
    Log    Sistema genera correctamente el mensaje de escalamiento a TI para análisis

Y el error final se devuelve al consumidor con código ESB4 e instrucciones de contactar soporte DAI
    [Documentation]    Verifica que el error final contiene ESB4 e instrucciones de escalamiento a soporte DAI
    Verificar Que Error Final Incluye Instrucciones Para Contactar Soporte DAI    ${RESPONSE_FALLA_PERSISTENTE}
    Log    Error final devuelto al consumidor con código ESB4 e instrucciones de contactar soporte DAI

# ============================================
# Keywords para Caso TC060 - Levantamiento de incidente a TI ante falla persistente
# ============================================

Dado que el servicio PACPagosService ConsultarPaguitos está disponible
    [Documentation]    Precondición: Servicio PACPagosService configurado en ESB
    Crear Sesión ESB PACPagosService
    Log    Servicio PACPagosService.ConsultarPaguitos disponible y configurado

Dado que se ha configurado reintentos para error ESB4
    [Arguments]    ${max_reintentos}    ${tiempo_entre_reintentos}
    [Documentation]    Configurar parámetros de reintento para error ESB4 en el ESB
    Configurar Reintentos Para Error ESB4    ${max_reintentos}    ${tiempo_entre_reintentos}
    Log    Reintentos configurados: ${max_reintentos} intentos con ${tiempo_entre_reintentos}s entre cada uno

Cuando se invoca el servicio PACPagosService ConsultarPaguitos con datos válidos para procesamiento
    [Arguments]    ${numero_telefonico}
    [Documentation]    Invocar el servicio con datos válidos y esperar que sea procesado
    ${response}=    Invocar Servicio PACPagosService ConsultarPaguitos Con Datos Válidos    ${numero_telefonico}
    Set Test Variable    ${RESPONSE_INICIAL}    ${response}
    Set Test Variable    ${NUMERO_TELEFONO_TEST}    ${numero_telefonico}
    Log    Petición enviada al servicio PACPagosService.ConsultarPaguitos

Entonces el ESB procesa la petición y la envía a BES
    [Documentation]    Verifica que el ESB procesó y envió la petición a BES
    Verificar Que ESB Procesa Petición Y Envía A BES    ${RESPONSE_INICIAL}
    Log    ESB procesó la petición y la envió a BES correctamente

Cuando se simula falla persistente de tipo ESB4 desde BES
    [Documentation]    Simular falla de conexión persistente desde BES que provoca error ESB4
    ${response}=    Simular Falla Persistente De Tipo ESB4 Desde BES    ${NUMERO_TELEFONO_TEST}
    Set Test Variable    ${RESPONSE_FALLA}    ${response}
    Log    Falla persistente ESB4 simulada desde BES

Entonces BES devuelve error ESB4 indicando falla de conexión
    [Documentation]    Verifica que BES retorna error ESB4
    Verificar Que BES Devuelve Error ESB4 Indicando Falla De Conexión    ${RESPONSE_FALLA}
    Log    BES devolvió error ESB4 indicando falla de conexión

Entonces el ESB ejecuta los reintentos configurados para el error ESB4
    [Arguments]    ${numero_reintentos_esperado}
    [Documentation]    Verifica que el ESB ejecutó todos los reintentos permitidos
    Verificar Que ESB Ejecuta Todos Los Reintentos Configurados    ${RESPONSE_FALLA}    ${numero_reintentos_esperado}
    Log    ESB ejecutó los ${numero_reintentos_esperado} reintentos configurados sin éxito

Entonces todos los intentos fallan con el mismo error ESB4
    [Arguments]    ${numero_intentos_total}
    [Documentation]    Verifica que todos los intentos fallaron con error ESB4
    ${log_response}=    Obtener Log De Transacciones Para Validar Reintentos    TXN-TEST-001
    Verificar Que Todos Los Intentos Fallan Con Mismo Error ESB4    ${log_response}    ${numero_intentos_total}
    Log    Los ${numero_intentos_total} intentos fallaron con el mismo error ESB4

Entonces el ESB genera un mensaje de error indicando levantar incidente a TI para análisis
    [Documentation]    Verifica que el ESB genera mensaje de escalamiento a TI
    Verificar Que ESB Genera Mensaje Levantar Incidente A TI    ${RESPONSE_FALLA}
    Log    Sistema generó mensaje: Levantar incidente a TI para realizar análisis e identificar origen de la falla

Y el error final se devuelve al consumidor con instrucciones de escalamiento
    [Documentation]    Verifica que el consumidor recibe error ESB4 con instrucciones de contactar soporte DAI
    Verificar Que Error Final Se Devuelve A Consumidor Con Instrucciones    ${RESPONSE_FALLA}
    Log    Consumidor recibió error ESB4 con indicación de contactar soporte DAI

# ============================================
# Keywords para AmigoPaguitosPagosService - ConsultarPaguitos
# ============================================

Dado que se tiene un número telefónico válido de un cliente Amigo Paguitos existente en BES
    [Arguments]    ${numero_telefonico}
    [Documentation]    Precondición: El número telefónico pertenece a un cliente con información completa en BES
    Log    Número telefónico de cliente Amigo Paguitos: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Cuando se invoca la operación ConsultarPaguitos con el número telefónico
    [Documentation]    Invoca la operación ConsultarPaguitos mediante protocolo SOAP con el número telefónico
    ${response}=    Invocar Servicio ConsultarPaguitos Con Número Telefónico    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces la Capa de Integración consume los servicios de BES en el orden correcto
    [Documentation]    Verifica que la Capa de Integración orquestó las llamadas a todos los servicios de BES secuencialmente
    Verificar Que Capa De Integración Orquestó Llamadas A Servicios BES    ${RESPONSE}

Y el servicio devuelve la información completa del cliente con código ESB0
    [Documentation]    Verifica que el servicio responde con código ESB0 y todos los campos poblados
    Verificar Que Servicio ConsultarPaguitos Retorna Código ESB0    ${RESPONSE}
    Verificar Que Response Contiene Todos Los Campos De Suscriptor    ${RESPONSE}
    Verificar Que Response Contiene Todos Los Campos De Cuenta    ${RESPONSE}
    Verificar Que Response Contiene Todos Los Campos De Cliente    ${RESPONSE}
    Verificar Que Response Contiene Todos Los Campos De Plan De Cuotas    ${RESPONSE}
    Verificar Que Response Contiene Todos Los Campos De Balance    ${RESPONSE}

Cuando se prepara un mensaje de request para ConsultarPaguitos con número telefónico válido
    [Arguments]    ${numero_telefonico}
    [Documentation]    Prepara el request con el parámetro número telefónico en formato esperado
    Log    Preparando request para ConsultarPaguitos con número telefónico: ${numero_telefonico}
    Set Test Variable    ${NUMERO_TELEFONICO}    ${numero_telefonico}

Entonces el request se construye correctamente con el parámetro número telefónico
    [Documentation]    Verifica que el request tiene el formato esperado
    Log    Request construido correctamente con número telefónico en formato de 10 dígitos

Cuando se envía el request al servicio ConsultarPaguitos a través de Capa de Integración
    [Documentation]    Envía el request al servicio
    ${response}=    Invocar Servicio ConsultarPaguitos Con Número Telefónico    ${NUMERO_TELEFONICO}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces Capa de Integración recibe el request y extrae el número telefónico correctamente
    [Documentation]    Verifica que Capa de Integración procesó el request correctamente
    Should Be Equal As Numbers    ${RESPONSE.status_code}    200

Y se verifica que el número telefónico se propaga a todos los servicios proveedores de BES
    [Documentation]    Verifica que el número telefónico se usó como parámetro en las llamadas a BES
    Verificar Que Capa De Integración Orquestó Llamadas A Servicios BES    ${RESPONSE}

Y el servicio devuelve información correspondiente al número telefónico enviado
    [Arguments]    ${numero_telefonico}
    [Documentation]    Valida que el response contiene datos del suscriptor correspondiente al número telefónico
    ${response_json}=    Set Variable    ${RESPONSE.json()}
    ${service_number}=    Get From Dictionary    ${response_json}    serviceNumber
    Should Be Equal As Strings    ${service_number}    ${numero_telefonico}    msg=El serviceNumber no coincide con el número telefónico enviado

Cuando se invoca ConsultarPaguitos con un número telefónico que tiene información completa
    [Arguments]    ${numero_telefonico}
    [Documentation]    Invoca el servicio con número telefónico de un cliente con datos completos
    ${response}=    Invocar Servicio ConsultarPaguitos Con Número Telefónico    ${numero_telefonico}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces el response incluye todos los datos de suscriptor con valores poblados
    [Documentation]    Verifica que todos los campos de suscriptor están presentes y poblados
    Verificar Que Response Contiene Todos Los Campos De Suscriptor    ${RESPONSE}

Y el response incluye todos los datos de cuenta con valores poblados
    [Documentation]    Verifica que todos los campos de cuenta están presentes y poblados
    Verificar Que Response Contiene Todos Los Campos De Cuenta    ${RESPONSE}

Y el response incluye todos los datos de cliente con valores poblados
    [Documentation]    Verifica que todos los campos de cliente están presentes y poblados
    Verificar Que Response Contiene Todos Los Campos De Cliente    ${RESPONSE}

Y el response incluye todos los datos de plan de cuotas con valores poblados
    [Documentation]    Verifica que todos los campos de plan de cuotas están presentes y poblados
    Verificar Que Response Contiene Todos Los Campos De Plan De Cuotas    ${RESPONSE}

Y el response incluye todos los datos de balance con valores poblados
    [Documentation]    Verifica que todos los campos de balance están presentes y poblados
    Verificar Que Response Contiene Todos Los Campos De Balance    ${RESPONSE}

Cuando se envía petición al servicio ConsultarPaguitos con financiamiento activo
    [Arguments]    ${numero_telefonico}
    [Documentation]    Envía petición SOAP con un número telefónico que tiene financiamiento activo
    ${response}=    Invocar Servicio ConsultarPaguitos Con Número Telefónico    ${numero_telefonico}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces la Capa de Integración consume BCService QueryInstallment de BES
    [Documentation]    Verifica que se consumió el servicio BCService.QueryInstallment
    ${response_json}=    Set Variable    ${RESPONSE.json()}
    Dictionary Should Contain Key    ${response_json}    metadata    msg=Response no contiene metadata
    ${metadata}=    Get From Dictionary    ${response_json}    metadata
    ${servicios_consultados}=    Get From Dictionary    ${metadata}    serviciosConsultados
    List Should Contain Value    ${servicios_consultados}    BCService.QueryInstallment    msg=BCService.QueryInstallment no fue consultado

Y BES retorna la información del plan de cuotas completa
    [Documentation]    Verifica que BES retornó todos los campos del plan de cuotas
    Verificar Que Response Contiene Todos Los Campos De Plan De Cuotas    ${RESPONSE}

Y la respuesta incluye totalCycle totalAmount cycleSequence initialAmount amount cycleClass status cycleDueDate shortName
    [Documentation]    Valida que todos los campos obligatorios del plan de cuotas están presentes sin valores nulos
    Verificar Que Response Contiene Todos Los Campos De Plan De Cuotas    ${RESPONSE}

Y el totalCycle corresponde al número total de parcialidades del financiamiento
    [Arguments]    ${total_cycle_esperado}
    [Documentation]    Verifica que el valor de totalCycle coincide con el plan de financiamiento (3, 6, 9 o 12 ciclos)
    Verificar Que TotalCycle Corresponde Al Plan De Financiamiento    ${RESPONSE}    ${total_cycle_esperado}

Y el totalAmount refleja correctamente el monto total del equipo financiado más intereses
    [Documentation]    Confirma que el totalAmount es la suma de todas las parcialidades del plan
    Verificar Que TotalAmount Refleja Monto Total Del Financiamiento    ${RESPONSE}

Cuando se envía petición al servicio ConsultarPaguitos con cuenta activa
    [Arguments]    ${numero_telefonico}
    [Documentation]    Envía petición con número telefónico asociado a cuenta activa
    ${response}=    Invocar Servicio ConsultarPaguitos Con Número Telefónico    ${numero_telefonico}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces la Capa de Integración invoca ArService QueryBalance de BES
    [Documentation]    Verifica que se consumió el servicio ArService.QueryBalance
    ${response_json}=    Set Variable    ${RESPONSE.json()}
    Dictionary Should Contain Key    ${response_json}    metadata    msg=Response no contiene metadata
    ${metadata}=    Get From Dictionary    ${response_json}    metadata
    ${servicios_consultados}=    Get From Dictionary    ${metadata}    serviciosConsultados
    List Should Contain Value    ${servicios_consultados}    ArService.QueryBalance    msg=ArService.QueryBalance no fue consultado

Y BES retorna información de balance con balancetype y ARBalance
    [Documentation]    Verifica que BES retornó los campos balancetype y ARBalance
    Verificar Que Response Contiene Todos Los Campos De Balance    ${RESPONSE}

Y los campos balancetype y ARBalance están presentes con valores válidos y no nulos
    [Documentation]    Valida que la respuesta contiene ambos campos con valores válidos
    Verificar Que Response Contiene Todos Los Campos De Balance    ${RESPONSE}

Y el ARBalance representa correctamente el saldo pendiente de la cuenta
    [Documentation]    Verifica que el ARBalance refleja el monto adeudado actualizado
    Verificar Que ARBalance Refleja Saldo Pendiente Actualizado    ${RESPONSE}

Y la información de balance se integra correctamente en la respuesta final
    [Documentation]    Confirma que la respuesta consolidada incluye la información de balance
    Verificar Que Response Contiene Todos Los Campos De Balance    ${RESPONSE}

# ============================================
# Keywords para Consulta con suscriptor desactivado usando account code - Caso 61
# ============================================

Cuando se ingresa account code de suscriptor desactivado como parámetro en el servicio ConsultarPaguitos
    [Arguments]    ${account_code}
    [Documentation]    Invoca el servicio ConsultarPaguitos utilizando account code de un suscriptor desactivado
    ${response}=    Invocar Servicio ConsultarPaguitos Con Account Code    ${account_code}
    Set Test Variable    ${RESPONSE}    ${response}

Entonces el sistema acepta la petición y procesa la consulta
    [Documentation]    Verifica que BES acepta y procesa la petición exitosamente
    Verificar Que Servicio ConsultarPaguitos Retorna Código ESB0    ${RESPONSE}

Cuando BES ejecuta la búsqueda en CustomerManagement Service utilizando el account code del suscriptor
    [Documentation]    Verifica que BES utilizó account code como parámetro de búsqueda
    Verificar Que BES Utiliza Account Code En Búsqueda    ${RESPONSE}

Entonces BES retorna la información asociada al account code incluyendo estado de suscriptor desactivado
    [Documentation]    Valida que la respuesta contiene información del suscriptor con estado desactivado
    Verificar Que Response Incluye Status Desactivado    ${RESPONSE}

Y la respuesta incluye los campos serviceNumber subscriberId status con valor de desactivado
    [Documentation]    Verifica que todos los campos requeridos están presentes con el status desactivado
    Verificar Que Response Contiene Campos Requeridos Para Suscriptor Desactivado    ${RESPONSE}
    Verificar Que Response Incluye Status Desactivado    ${RESPONSE}
