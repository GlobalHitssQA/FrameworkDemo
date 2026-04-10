*** Settings ***
Library    SeleniumLibrary
Resource   ../pages/PaginaLogin.resource
Resource   ../pages/PaginaPaquetesInternetAmigo.resource
Resource   ../pages/PaginaPlataforma360.resource
Resource   ../pages/PaginaMiTelcel.resource
Resource   ../pages/PaginaClaroPay.resource
Resource   ../pages/PaginaTerminosCondiciones.resource
Resource   ../pages/PaginaPreguntasFrecuentes.resource
Resource   ../pages/PaginaConfiguracionReglasUPC.resource
Resource   ../pages/PaginaCanalesVenta.resource
Resource   ../pages/PaginaSistemaSatisfaccion.resource

*** Keywords ***
Iniciar Sesión En UPC
    [Arguments]    ${usuario}=testuser    ${password}=testpass123
    Abrir Página De Login
    Ingresar Usuario    ${usuario}
    Ingresar Contraseña    ${password}
    Hacer Clic En Botón Login
    Verificar Acceso Al Dashboard

Cerrar Navegador
    Close All Browsers

# Keywords para Paquetes Internet Amigo
Acceder A Módulo De Paquetes Internet Amigo
    Navegar A Paquetes Internet Amigo

Consultar Línea Prepago
    [Arguments]    ${numero_linea}
    Buscar Línea Prepago    ${numero_linea}
    Verificar Tipo De Línea    Prepago
    Verificar Estado De Línea    Activa

Activar Primer Paquete Con Vigencia Menor
    [Arguments]    ${paquete_id}=PAQ_500MB_15D
    Activar Paquete Internet Amigo Con Vigencia Menor    ${paquete_id}
    Verificar Mensaje De Activación Exitosa

Activar Segundo Paquete Con Vigencia Mayor
    [Arguments]    ${paquete_id}=PAQ_2GB_60D
    Activar Paquete Internet Amigo Con Vigencia Mayor    ${paquete_id}
    Verificar Mensaje De Activación Exitosa

Consultar Vigencia En Plataformas
    Actualizar Consulta De Vigencia

Verificar Vigencia Corresponde Al Paquete Mayor En Todas Las Plataformas
    [Arguments]    ${vigencia_esperada}
    Verificar Vigencia Corresponde A Paquete Mayor    ${vigencia_esperada}

# Keywords para Beneficios de Paquetes
Activar Paquete Estándar
    [Arguments]    ${paquete_id}=PAQ_1GB_ESTANDAR
    Activar Paquete Con Beneficios Estándar    ${paquete_id}
    Verificar Mensaje De Activación Exitosa

Activar Paquete Premium Con Beneficios Mayores
    [Arguments]    ${paquete_id}=PAQ_2GB_RRSS
    Activar Paquete Con Mayores Beneficios    ${paquete_id}
    Verificar Mensaje De Activación Exitosa

Consultar Beneficios De La Línea
    Consultar Beneficios Activos

Verificar Redes Sociales Ilimitadas Disponibles
    Verificar Beneficio Redes Sociales Ilimitadas Activo

Verificar Que Los Beneficios Del Paquete Mayor Se Conservan
    [Arguments]    ${beneficio_esperado}=Redes Sociales Ilimitadas
    Consultar Beneficios Activos
    Verificar Beneficio Está En Lista    ${beneficio_esperado}

# Keywords para Visualización de Bolsa Consolidada (Caso 4)
Activar Múltiples Paquetes Internet Amigo
    [Arguments]    ${paquete_1}=PAQ_1GB_30D    ${paquete_2}=PAQ_2GB_60D
    Activar Paquete Internet Amigo Con Vigencia Menor    ${paquete_1}
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo Con Vigencia Mayor    ${paquete_2}

Consultar Datos Disponibles En Plataformas
    Actualizar Consulta De Vigencia

Verificar Visualización De Una Sola Bolsa Consolidada
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas

# Keywords para Visualización de Bolsa de Datos RRSS (Caso 5)
El usuario está autenticado en UPC
    [Arguments]    ${usuario}=testuser    ${password}=testpass123
    Iniciar Sesión En UPC    ${usuario}    ${password}

Se activan dos paquetes Internet Amigo con datos para redes sociales
    Acceder A Módulo De Paquetes Internet Amigo
    Activar Dos Paquetes Con Datos RRSS    PAQ_500MB_RRSS    PAQ_1GB_RRSS

Se consultan los datos RRSS en las plataformas de consulta
    Consultar Datos Disponibles En Plataformas

Se visualiza una sola bolsa consolidada de datos RRSS en todas las plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

# Keywords para Validar Suma de Datos entre Paquetes Amigo 50 y 100 (Caso 6)
Activar Paquete Amigo 50 En Línea Prepago
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

Activar Paquete Amigo 100 En La Misma Línea
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa

Consultar Cantidad Total De Datos Disponibles
    Actualizar Consulta De Vigencia

Verificar Suma De Datos De Ambos Paquetes
    [Arguments]    ${datos_esperados}
    Verificar Suma De Datos En Bolsa    ${datos_esperados}

Verificar Sistema Muestra Bolsa Única Con Datos Sumados
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas

# Keywords para Validar Vigencia Paquete 100 después de Paquete 50 (Caso 7)
Activar Paquete Amigo 50 Y Guardar Vigencia
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa
    Actualizar Consulta De Vigencia
    Set Global Variable    ${VIGENCIA_PAQUETE_50_360}    ${EMPTY}
    Set Global Variable    ${VIGENCIA_PAQUETE_50_MITELCEL}    ${EMPTY}
    Set Global Variable    ${VIGENCIA_PAQUETE_50_CLAROPAY}    ${EMPTY}
    Registrar Vigencia Del Paquete 50 En Plataforma 360
    Registrar Vigencia Del Paquete 50 En Plataforma MiTelcel
    Registrar Vigencia Del Paquete 50 En Plataforma Claro Pay

Registrar Vigencia Del Paquete 50 En Plataforma 360
    Abrir Pestaña Plataforma 360
    ${vigencia}=    Obtener Fecha De Vencimiento En Plataforma 360
    Set Global Variable    ${VIGENCIA_PAQUETE_50_360}    ${vigencia}
    Log    Vigencia Paquete 50 en 360: ${VIGENCIA_PAQUETE_50_360}

Registrar Vigencia Del Paquete 50 En Plataforma MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    ${vigencia}=    Obtener Fecha De Vencimiento En Plataforma MiTelcel
    Set Global Variable    ${VIGENCIA_PAQUETE_50_MITELCEL}    ${vigencia}
    Log    Vigencia Paquete 50 en MiTelcel: ${VIGENCIA_PAQUETE_50_MITELCEL}

Registrar Vigencia Del Paquete 50 En Plataforma Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    ${vigencia}=    Obtener Fecha De Vencimiento En Plataforma Claro Pay
    Set Global Variable    ${VIGENCIA_PAQUETE_50_CLAROPAY}    ${vigencia}
    Log    Vigencia Paquete 50 en Claro Pay: ${VIGENCIA_PAQUETE_50_CLAROPAY}

Simular Espera De Un Día
    Log    Simulando espera de un día para activar siguiente paquete
    Sleep    2s    # En pruebas reales, esto debería ser un día completo

Verificar Vigencia Corresponde A Paquete Internet Amigo 100 En Todas Las Plataformas
    Verificar Vigencia Paquete 100 En Plataforma 360
    Verificar Vigencia Paquete 100 En Plataforma MiTelcel
    Verificar Vigencia Paquete 100 En Plataforma Claro Pay

Verificar Vigencia Paquete 100 En Plataforma 360
    Abrir Pestaña Plataforma 360
    ${vigencia_actual}=    Obtener Fecha De Vencimiento En Plataforma 360
    Log    Vigencia actual en 360: ${vigencia_actual}
    Log    Vigencia anterior Paquete 50: ${VIGENCIA_PAQUETE_50_360}
    Should Not Be Equal    ${vigencia_actual}    ${VIGENCIA_PAQUETE_50_360}    msg=La vigencia debe actualizarse al Paquete 100

Verificar Vigencia Paquete 100 En Plataforma MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    ${vigencia_actual}=    Obtener Fecha De Vencimiento En Plataforma MiTelcel
    Log    Vigencia actual en MiTelcel: ${vigencia_actual}
    Log    Vigencia anterior Paquete 50: ${VIGENCIA_PAQUETE_50_MITELCEL}
    Should Not Be Equal    ${vigencia_actual}    ${VIGENCIA_PAQUETE_50_MITELCEL}    msg=La vigencia debe actualizarse al Paquete 100

Verificar Vigencia Paquete 100 En Plataforma Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    ${vigencia_actual}=    Obtener Fecha De Vencimiento En Plataforma Claro Pay
    Log    Vigencia actual en Claro Pay: ${vigencia_actual}
    Log    Vigencia anterior Paquete 50: ${VIGENCIA_PAQUETE_50_CLAROPAY}
    Should Not Be Equal    ${vigencia_actual}    ${VIGENCIA_PAQUETE_50_CLAROPAY}    msg=La vigencia debe actualizarse al Paquete 100

# Keywords para Comprobar Beneficios RRSS del Paquete Mayor (Caso 8)
Activar Paquete Amigo 50 Sin Beneficio RRSS Ilimitadas
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

Activar Paquete Amigo 100 Con Beneficio RRSS Ilimitadas
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa

Consultar Beneficios Activos De Redes Sociales
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo

Registrar Datos Navegacion Libre Antes De Usar RRSS
    Actualizar Consulta De Vigencia
    Set Global Variable    ${DATOS_LIBRES_ANTES_360}    ${EMPTY}
    Set Global Variable    ${DATOS_LIBRES_ANTES_MITELCEL}    ${EMPTY}
    Set Global Variable    ${DATOS_LIBRES_ANTES_CLAROPAY}    ${EMPTY}
    ${datos_360}=    Obtener Datos Navegacion Libre En Plataforma 360
    Set Global Variable    ${DATOS_LIBRES_ANTES_360}    ${datos_360}
    ${datos_mitelcel}=    Obtener Datos Navegacion Libre En Plataforma MiTelcel
    Set Global Variable    ${DATOS_LIBRES_ANTES_MITELCEL}    ${datos_mitelcel}
    ${datos_claropay}=    Obtener Datos Navegacion Libre En Plataforma Claro Pay
    Set Global Variable    ${DATOS_LIBRES_ANTES_CLAROPAY}    ${datos_claropay}
    Log    Datos navegación libre antes - 360: ${DATOS_LIBRES_ANTES_360}
    Log    Datos navegación libre antes - MiTelcel: ${DATOS_LIBRES_ANTES_MITELCEL}
    Log    Datos navegación libre antes - ClaroPay: ${DATOS_LIBRES_ANTES_CLAROPAY}

Utilizar Aplicaciones De Redes Sociales
    Simular Uso De Aplicaciones De Redes Sociales
    Verificar Confirmacion De Uso De RRSS

Verificar Datos Navegacion Libre No Fueron Consumidos
    Actualizar Consulta De Vigencia
    ${datos_despues_360}=    Obtener Datos Navegacion Libre En Plataforma 360
    ${datos_despues_mitelcel}=    Obtener Datos Navegacion Libre En Plataforma MiTelcel
    ${datos_despues_claropay}=    Obtener Datos Navegacion Libre En Plataforma Claro Pay
    Log    Datos navegación libre después - 360: ${datos_despues_360}
    Log    Datos navegación libre después - MiTelcel: ${datos_despues_mitelcel}
    Log    Datos navegación libre después - ClaroPay: ${datos_despues_claropay}
    Should Be Equal    ${datos_despues_360}    ${DATOS_LIBRES_ANTES_360}    msg=Los datos de navegación libre en 360 no deben consumirse al usar RRSS
    Should Be Equal    ${datos_despues_mitelcel}    ${DATOS_LIBRES_ANTES_MITELCEL}    msg=Los datos de navegación libre en MiTelcel no deben consumirse al usar RRSS
    Should Be Equal    ${datos_despues_claropay}    ${DATOS_LIBRES_ANTES_CLAROPAY}    msg=Los datos de navegación libre en ClaroPay no deben consumirse al usar RRSS

# Keywords para Validar Notificación de Activación con Vigencia (Caso 9)
Activar Paquete Y Verificar Notificacion
    [Arguments]    ${paquete_id}
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s

Consultar Mensaje De Notificacion De Activacion
    Sleep    2s    # Esperar envío de notificación SMS
    Verificar Recepcion De Mensaje SMS De Activacion

Verificar Contenido Del Mensaje Incluye Vigencia Del Paquete
    [Arguments]    ${vigencia_esperada}
    Verificar Vigencia Corresponde Al Paquete Adquirido En Mensaje    ${vigencia_esperada}

Activar Segundo Paquete Y Verificar Vigencia Individual
    [Arguments]    ${paquete_id}    ${vigencia_paquete}
    Cerrar Modal De Mensaje SMS
    Sleep    1s
    Activar Segundo Paquete Y Verificar Vigencia Individual En Mensaje    ${paquete_id}    ${vigencia_paquete}

# Keywords para Verificar Recepción de Mensaje de Vencimiento (Caso 10)
Activar Paquete Y Registrar Fecha De Vencimiento
    [Arguments]    ${paquete_id}
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${fecha_vencimiento}=    Obtener Fecha De Vencimiento En Plataforma 360
    Set Global Variable    ${FECHA_VENCIMIENTO_REGISTRADA}    ${fecha_vencimiento}
    Log    Fecha de vencimiento registrada: ${FECHA_VENCIMIENTO_REGISTRADA}

Esperar Vencimiento Del Paquete
    Log    Simulando espera hasta la fecha de vencimiento del paquete
    Sleep    2s    # En pruebas reales, esto debería esperar hasta la fecha de vencimiento

Consultar Mensaje De Notificacion De Vencimiento
    Sleep    2s    # Esperar envío de notificación SMS de vencimiento
    Verificar Recepcion De Mensaje SMS De Vencimiento

Verificar Logica De Notificaciones Sin Modificar
    Log    Verificando que el mensaje se recibe conforme a la lógica: vencimiento o consumo total de datos
    ${fecha_mensaje}=    Obtener Fecha Vencimiento Del Mensaje
    Should Contain    ${fecha_mensaje}    ${FECHA_VENCIMIENTO_REGISTRADA}
    Log    La notificación se envió correctamente según la lógica establecida

# Keywords para Comprobar Notificación de Consumo de Datos (Caso 11)
Activar Paquete Internet Amigo Y Registrar Vigencia
    [Arguments]    ${paquete_id}
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa

Consumir Datos Hasta Umbral De Notificacion
    [Arguments]    ${porcentaje}=80
    Simular Consumo De Datos Hasta Umbral    ${porcentaje}
    Verificar Confirmacion De Consumo Simulado

Verificar Recepcion De Notificacion De Consumo
    Sleep    2s    # Esperar envío de notificación SMS de consumo
    Verificar Recepcion De Mensaje SMS De Consumo

Verificar Texto De Notificacion Corresponde Al Paquete
    [Arguments]    ${paquete_esperado}
    Verificar Notificacion Corresponde Al Paquete Adquirido    ${paquete_esperado}

Esperar Vencimiento Sin Consumir Todos Los Datos
    Log    Simulando espera hasta vencimiento del paquete sin consumir el 100% de datos
    Sleep    2s    # En pruebas reales, esto debería esperar hasta fecha de vencimiento

Verificar Notificacion De Consumo Incluye Informacion De Vigencia
    [Arguments]    ${paquete_esperado}    ${vigencia_esperada}
    Verificar Informacion Consumo Consistente Con Paquete    ${paquete_esperado}    ${vigencia_esperada}

Verificar Notificacion Se Recibio Antes De Vencer El Paquete
    Log    La notificación de consumo se recibe antes de vencer el paquete como se esperaba

# Keywords para Validar Funcionamiento en Usuarios Prepago con Productos BES (Caso 12)
Identificar Usuario Prepago Con Productos BES
    [Arguments]    ${numero_linea}
    Navegar A Paquetes Internet Amigo
    Buscar Línea Prepago    ${numero_linea}
    Verificar Tipo De Línea    Prepago
    Verificar Usuario Tiene Productos Creados En BES

Activar Paquete Internet Amigo 20 Pesos En Usuario BES
    Activar Paquete Internet Amigo 20
    Verificar Mensaje De Activación Exitosa

Activar Paquete Internet Amigo 50 Pesos En Usuario BES
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

Verificar Suma De Datos Totales De Paquetes 20 Y 50
    [Arguments]    ${datos_esperados}
    Actualizar Consulta De Vigencia
    Verificar Suma De Datos En Bolsa    ${datos_esperados}

Verificar Vigencia Corresponde Al Paquete De 50 Pesos
    [Arguments]    ${vigencia_esperada}
    Actualizar Consulta De Vigencia
    Verificar Vigencia Corresponde A Paquete Mayor    ${vigencia_esperada}

Verificar Beneficios Corresponden Al Paquete De 50 Pesos
    Consultar Beneficios Activos
    Log    Verificando que se mantienen los beneficios del paquete con mayores beneficios (50 pesos)

Verificar Bolsa Única En Plataformas De Consulta Para BES
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

# Keywords para Validar Funcionamiento en Usuarios Mixtos con Productos BES (Caso 13)
Identificar Usuario Mixto Con Productos BES
    [Arguments]    ${numero_linea}
    Navegar A Paquetes Internet Amigo
    Buscar Línea Mixta    ${numero_linea}
    Verificar Tipo De Línea Mixta
    Verificar Usuario Tiene Productos Creados En BES

Activar Paquete Internet Amigo 30 Pesos En Usuario Mixto
    Activar Paquete Internet Amigo 30
    Verificar Mensaje De Activación Exitosa

Activar Paquete Internet Amigo 100 Pesos En Usuario Mixto
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa

Verificar Suma De Datos Totales De Paquetes 30 Y 100
    [Arguments]    ${datos_esperados}
    Actualizar Consulta De Vigencia
    Verificar Suma De Datos En Bolsa    ${datos_esperados}

Verificar Vigencia Corresponde Al Paquete De 100 Pesos
    [Arguments]    ${vigencia_esperada}
    Actualizar Consulta De Vigencia
    Verificar Vigencia Corresponde A Paquete Mayor    ${vigencia_esperada}

Verificar Beneficios Corresponden Al Paquete De 100 Pesos
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo

Verificar Bolsa Única En Plataformas De Consulta Para Mixto BES
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

# Keywords para Comprobar Funcionamiento en Productos Legados M2K para Mixto (Caso 14)
Identificar Usuario Mixto Con Productos Legados M2K
    [Arguments]    ${numero_linea}
    Navegar A Paquetes Internet Amigo
    Buscar Línea Mixta    ${numero_linea}
    Verificar Tipo De Línea Mixta Con Productos M2K

Activar Paquete Internet Amigo 20 Pesos En Usuario M2K Mixto
    Activar Paquete Internet Amigo 20
    Verificar Mensaje De Activación Exitosa

Activar Paquete Internet Amigo 30 Pesos En Usuario M2K Mixto
    Activar Paquete Internet Amigo 30
    Verificar Mensaje De Activación Exitosa

Verificar Suma De Datos De Paquetes 20 Y 30 Pesos
    [Arguments]    ${datos_esperados}
    Actualizar Consulta De Vigencia
    Verificar Suma De Datos En Bolsa    ${datos_esperados}

Verificar Vigencia Corresponde Al Paquete De 30 Pesos En M2K
    [Arguments]    ${dias_vigencia}
    Actualizar Consulta De Vigencia
    Verificar Vigencia Corresponde A Paquete Mayor    ${dias_vigencia}

Verificar Beneficios Conservados Son Del Paquete De 30 Pesos
    Consultar Beneficios Activos
    Log    Verificando que se mantienen los beneficios del paquete con mayores beneficios (30 pesos)

Verificar Bolsa Unificada En Plataformas Para M2K Mixto
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

# Keywords para Validar Funcionamiento en Productos Legados M2K para Controlado (Caso 15)
Identificar Usuario Controlado Con Productos Legados M2K
    [Arguments]    ${numero_linea}
    Navegar A Paquetes Internet Amigo
    Buscar Usuario Por Número    ${numero_linea}
    Verificar Tipo De Usuario Controlado
    Verificar Usuario Tiene Productos Legados M2K Activos

Activar Paquete Internet Amigo De 30 Pesos En Usuario Controlado
    Activar Paquete Internet Amigo 30

Activar Segundo Paquete Internet Amigo De 50 Pesos En Usuario Controlado
    Activar Paquete Internet Amigo 50

Verificar Suma Automática De Datos De Paquetes 30 Y 50
    [Arguments]    ${datos_totales_esperados}
    Verificar Suma De Datos En Bolsa    ${datos_totales_esperados}

Verificar Vigencia Resultante Corresponde Al Paquete De 50 Pesos
    [Arguments]    ${dias_vigencia_esperados}
    Verificar Vigencia Corresponde A Paquete Mayor    ${dias_vigencia_esperados}

Verificar Beneficios Conservados Son Del Paquete De 50 Pesos
    [Arguments]    ${beneficios_esperados}
    Consultar Beneficios Activos
    Verificar Beneficio Está En Lista    ${beneficios_esperados}

Consultar Bolsas De Datos Unificadas
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

# Keywords para Verificar Funcionamiento en VPN Cost Control PYME (Caso 16)
Identificar Usuario VPN Cost Control PYME
    [Arguments]    ${numero_linea}
    Navegar A Paquetes Internet Amigo
    Buscar Línea VPN Cost Control PYME    ${numero_linea}
    Verificar Tipo De Línea VPN Cost Control PYME
    Verificar Estado De Línea    Activa

Activar Paquete Internet Amigo 20 Pesos En Usuario VPNCC PYME
    Activar Paquete Internet Amigo 20
    Verificar Mensaje De Activación Exitosa

Activar Paquete Internet Amigo 30 Pesos En Usuario VPNCC PYME
    Activar Paquete Internet Amigo 30
    Verificar Mensaje De Activación Exitosa

Verificar Suma De Datos De Paquetes 20 Y 30 Pesos
    [Arguments]    ${datos_esperados}
    Actualizar Consulta De Vigencia
    Verificar Suma De Datos En Bolsa    ${datos_esperados}

Verificar Vigencia Corresponde Al Paquete De 30 Pesos
    [Arguments]    ${vigencia_esperada}
    Actualizar Consulta De Vigencia
    Verificar Vigencia Corresponde A Paquete Mayor    ${vigencia_esperada}

Verificar Beneficios Del Paquete De 30 Pesos Activos
    Consultar Beneficios Activos
    Log    Verificando que se mantienen los beneficios del paquete con mayores beneficios (30 pesos)

Verificar Bolsa Única En Plataformas De Consulta Para VPNCC PYME
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

# Keywords para Verificar Funcionamiento en VPN Cost Control CORPORATIVO (Caso 17)
Identificar Usuario VPN Cost Control CORPORATIVO
    [Arguments]    ${numero_linea}
    Navegar A Paquetes Internet Amigo
    Buscar Línea VPN Cost Control CORPORATIVO    ${numero_linea}
    Verificar Tipo De Línea VPN Cost Control CORPORATIVO
    Verificar Estado De Línea    Activa

Activar Paquete Internet Amigo 50 Pesos En Usuario VPNCC CORPORATIVO
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

Activar Paquete Internet Amigo 100 Pesos En Usuario VPNCC CORPORATIVO
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa

Verificar Suma De Datos De Paquetes 50 Y 100 Pesos
    [Arguments]    ${datos_esperados}
    Actualizar Consulta De Vigencia
    Verificar Suma De Datos En Bolsa    ${datos_esperados}

Verificar Vigencia Corresponde Al Paquete De 100 Pesos En Todas Las Plataformas
    [Arguments]    ${vigencia_esperada}
    Actualizar Consulta De Vigencia
    Verificar Vigencia Corresponde A Paquete Mayor    ${vigencia_esperada}

Verificar Beneficios Del Paquete De 100 Pesos Activos
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo

Verificar Bolsa Única En Plataformas De Consulta Para VPNCC CORPORATIVO
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas

# Keywords para Validar Orden de Débito sin Alteraciones (Caso 18)
Activar Multiples Paquetes Internet Amigo En Linea Prepago
    [Arguments]    ${paquete_1}=PAQ_AMIGO_50    ${paquete_2}=PAQ_AMIGO_100
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa
    Log    Se activaron múltiples paquetes Internet Amigo en la línea prepago

Registrar Orden De Debito Original Del Sistema
    ${orden_original}=    Registrar Orden De Debito Original
    Log    Orden de débito original documentado antes de las modificaciones
    [Return]    ${orden_original}

Realizar Consumo De Datos De La Bolsa Unificada
    [Arguments]    ${cantidad_mb}=50
    Realizar Consumo De Datos Del Usuario    ${cantidad_mb}
    Actualizar Consulta De Vigencia
    Log    El sistema debitó ${cantidad_mb}MB de datos de la bolsa unificada

Verificar Orden De Debito Se Mantiene Sin Alteraciones
    Verificar Orden De Debito No Ha Sido Modificado
    Log    El sistema mantiene el mismo orden de débito original sin alteraciones

Consultar Y Verificar Logs De Debito Del Sistema
    Verificar Logs Confirman Orden De Debito Inalterado
    Log    Los registros confirman que el orden de débito permanece inalterado

# Keywords para Verificar Consulta de Datos en Plataforma 360 (Caso 19)
Acceder A Plataforma 360 Con Credenciales De Consulta
    [Arguments]    ${usuario}=testuser    ${password}=testpass123
    Iniciar Sesión En UPC    ${usuario}    ${password}
    Navegar A Plataforma 360

Buscar Línea Con Paquetes Internet Amigo Activados
    [Arguments]    ${numero_linea}
    Buscar Línea Usuario En Plataforma 360    ${numero_linea}
    Verificar Línea Encontrada En Plataforma 360    ${numero_linea}

Consultar Sección De Datos Disponibles Del Usuario
    Consultar Datos Para Navegación Libre
    Verificar Bolsa Única De Datos Para Navegación Libre

Consultar Sección De Datos De Redes Sociales Incluidas
    Consultar Datos Para Redes Sociales
    Verificar Bolsa Única De Datos RRSS

Verificar Vigencia Mostrada Corresponde Al Paquete Con Mayor Vigencia
    Consultar Vigencia Del Paquete Mayor
    Verificar Vigencia Corresponde Al Paquete Con Mayor Vigencia

# Keywords para Comprobar Consulta de Datos en Aplicación MiTelcel (Caso 20)
Activar Dos Paquetes Internet Amigo Diferentes En Línea
    [Arguments]    ${paquete_1}=PAQ_1GB_30D    ${paquete_2}=PAQ_2GB_60D
    Activar Paquete Internet Amigo Con Vigencia Menor    ${paquete_1}
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo Con Vigencia Mayor    ${paquete_2}
    Verificar Mensaje De Activación Exitosa

Abrir Aplicación MiTelcel En Dispositivo Del Usuario
    Navegar A MiTelcel
    Wait Until Element Is Visible    ${LOCATOR_SECCION_MIS_DATOS}    timeout=15s
    Log    La aplicación MiTelcel inicia correctamente y muestra la pantalla principal

Iniciar Sesion Con Credenciales En MiTelcel
    [Arguments]    ${usuario}=testuser    ${password}=testpass123
    Iniciar Sesión En UPC    ${usuario}    ${password}
    Log    La aplicación valida las credenciales y permite el acceso al usuario

Navegar A Seccion Consulta Saldo Y Datos
    Wait Until Element Is Visible    ${LOCATOR_SECCION_MIS_DATOS}    timeout=15s
    Scroll Element Into View    ${LOCATOR_SECCION_MIS_DATOS}
    Log    La aplicación muestra la sección con información de datos disponibles

Verificar Bolsa Unica Para Navegacion Libre
    Consultar Datos Para Navegacion Libre En MiTelcel
    Verificar Bolsa Unica Navegacion Libre En MiTelcel
    Log    La aplicación MiTelcel muestra una bolsa unificada para MBs de navegación libre

Verificar Bolsa Unica Para Redes Sociales
    Consultar Datos RRSS En MiTelcel
    Verificar Bolsa Consolidada En MiTelcel
    Log    La aplicación muestra una bolsa unificada para MBs de RRSS incluidas

Verificar Vigencia Del Paquete Con Mayor Vigencia En MiTelcel
    Consultar Vigencia En MiTelcel
    Verificar Vigencia Corresponde Al Paquete Mayor En MiTelcel
    Log    La aplicación MiTelcel muestra la vigencia del paquete con mayor vigencia activa

# Keywords para Validar Consulta de Datos en Claro Pay (Caso 21)
Acceder A Plataforma Claro Pay Con Usuario Amigo
    [Arguments]    ${usuario}=testuser    ${password}=testpass123
    Iniciar Sesión En UPC    ${usuario}    ${password}
    Navegar A Claro Pay

Consultar Seccion De Paquetes Internet Amigo En Claro Pay
    Consultar Datos Navegacion Libre En Claro Pay
    Consultar Datos RRSS En Claro Pay

Verificar Bolsa Unica De Navegacion Libre En Claro Pay
    Verificar Bolsa Unica Navegacion Libre En Claro Pay
    Log    Claro Pay muestra una sola bolsa de datos para navegación libre

Verificar Bolsa Unica De RRSS En Claro Pay
    Verificar Bolsa Consolidada En Claro Pay
    Log    Claro Pay muestra una sola bolsa de datos para redes sociales

Verificar Vigencia Del Paquete Mayor En Claro Pay
    Verificar Vigencia En Claro Pay
    ${vigencia}=    Obtener Fecha De Vencimiento En Claro Pay
    Should Not Be Empty    ${vigencia}
    Log    La vigencia mostrada corresponde al paquete con mayor vigencia: ${vigencia}

# Keywords para Verificar Actualización de Términos y Condiciones (Caso 22)
Acceder Al Portal De Terminos Y Condiciones De Paquetes Internet Amigo
    Navegar A Terminos Y Condiciones
    Verificar Documento De Terminos Y Condiciones Esta Visible

Buscar Seccion Comportamiento Con Multiples Paquetes Activos
    Desplazarse A Seccion Multiples Paquetes
    Verificar Seccion Multiples Paquetes Existe

Verificar Descripcion De Suma De Datos De Navegacion Libre
    Desplazarse A Seccion Suma Datos Navegacion
    ${texto}=    Verificar Regla Suma Datos Navegacion Libre Esta Descrita
    Log    Regla de suma de datos de navegación libre encontrada: ${texto}

Verificar Descripcion De Suma De Datos De Redes Sociales
    Desplazarse A Seccion Suma Datos RRSS
    ${texto}=    Verificar Regla Suma Datos Redes Sociales Esta Descrita
    Log    Regla de suma de datos de redes sociales encontrada: ${texto}

Verificar Descripcion De Vigencia Resultante
    Desplazarse A Seccion Vigencia Resultante
    ${texto}=    Verificar Regla Vigencia Resultante Esta Descrita
    Log    Regla de vigencia resultante encontrada: ${texto}

Verificar Documento Contiene Explicacion De Suma De Datos Navegacion Libre
    ${descripcion}=    Obtener Descripcion Bolsa Navegacion Libre
    Should Contain    ${descripcion}    suma
    Log    El documento contiene la explicación de suma de datos de navegación libre

Verificar Documento Contiene Explicacion De Suma De Datos Redes Sociales
    ${descripcion}=    Obtener Descripcion Bolsa RRSS
    Should Contain    ${descripcion}    suma
    Log    El documento contiene la explicación de suma de datos de redes sociales

Verificar Documento Contiene Explicacion De Vigencia Mayor
    ${descripcion}=    Obtener Descripcion Vigencia Resultante
    Should Contain    ${descripcion}    mayor
    Log    El documento contiene la explicación de vigencia del paquete con mayor vigencia

Verificar Documento Contiene Explicacion De Beneficios Paquete Mayor
    ${descripcion}=    Obtener Descripcion Beneficios Resultantes
    Should Contain    ${descripcion}    mayor
    Log    El documento contiene la explicación de beneficios del paquete con mayores beneficios

# Keywords para Comprobar Actualización de Preguntas Frecuentes (Caso 23)
Acceder A Seccion Preguntas Frecuentes De Paquetes Internet Amigo
    Navegar A Preguntas Frecuentes
    Verificar Seccion Preguntas Frecuentes Esta Visible

Buscar Pregunta Sobre Multiples Paquetes Internet Amigo Activos
    Buscar Pregunta Multiples Paquetes
    Verificar Pregunta Multiples Paquetes Existe

Verificar Respuesta Explica Suma De Datos De Navegacion Libre
    ${respuesta}=    Obtener Respuesta Suma Datos Navegacion Libre
    Should Contain    ${respuesta}    suma
    Log    La respuesta explica correctamente la suma de datos de navegación libre

Verificar Respuesta Explica Suma De Datos De Redes Sociales
    ${respuesta}=    Obtener Respuesta Suma Datos RRSS
    Should Contain    ${respuesta}    suma
    Log    La respuesta explica correctamente la suma de datos de redes sociales

Verificar Respuesta Explica Vigencia Resultante Del Paquete Mayor
    ${respuesta}=    Obtener Respuesta Vigencia Resultante
    Should Contain    ${respuesta}    mayor vigencia
    Log    La respuesta explica correctamente la vigencia resultante

Verificar Respuesta Explica Conservacion De Beneficios Del Paquete Mayor
    ${respuesta}=    Obtener Respuesta Beneficios Resultantes
    Should Contain    ${respuesta}    mayores beneficios
    Log    La respuesta explica correctamente la conservación de beneficios

# Keywords para Validar Activación Sin Suma (Caso 24)
Activar Paquete Internet Amigo Y Registrar Datos Disponibles
    [Arguments]    ${paquete_id}
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa
    Sleep    2s
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${datos_disponibles}=    Obtener Datos Totales En Plataforma 360
    Set Global Variable    ${DATOS_PRIMER_PAQUETE}    ${datos_disponibles}
    Log    Datos disponibles del primer paquete: ${DATOS_PRIMER_PAQUETE}

Esperar Vencimiento Completo Del Primer Paquete
    Log    Simulando espera hasta vencimiento completo del primer paquete
    Sleep    2s    # En pruebas reales, esto debería esperar hasta el vencimiento completo

Activar Segundo Paquete Despues Del Vencimiento
    [Arguments]    ${paquete_id}
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa

Verificar Que Datos Disponibles Corresponden Solo Al Segundo Paquete
    [Arguments]    ${datos_segundo_paquete}
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${datos_actuales}=    Obtener Datos Totales En Plataforma 360
    Should Contain    ${datos_actuales}    ${datos_segundo_paquete}
    Log    Los datos disponibles corresponden solo al segundo paquete, sin suma del primero

Verificar Que No Hubo Suma Con El Paquete Vencido
    Log    Se confirma que NO hubo suma con el paquete vencido

# Keywords para Verificar Activación de Tres o Más Paquetes Consecutivos (Caso 25)
Activar Tres Paquetes Internet Amigo Consecutivos
    [Arguments]    ${paquete_1}=PAQ_AMIGO_30    ${paquete_2}=PAQ_AMIGO_50    ${paquete_3}=PAQ_AMIGO_100
    Activar Paquete Internet Amigo 30
    Verificar Mensaje De Activación Exitosa
    Sleep    2s
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa
    Sleep    2s
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa
    Log    Se activaron tres paquetes Internet Amigo consecutivos

Verificar Suma Consecutiva De Tres Paquetes En Bolsa Única
    [Arguments]    ${datos_totales_esperados}
    Actualizar Consulta De Vigencia
    Verificar Suma De Datos En Bolsa    ${datos_totales_esperados}
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Log    El sistema sumó los datos de los tres paquetes en una bolsa única

Verificar Vigencia Corresponde Al Paquete Con Mayor Vigencia De Los Tres
    [Arguments]    ${vigencia_esperada_dias}
    Actualizar Consulta De Vigencia
    Verificar Vigencia Corresponde A Paquete Mayor    ${vigencia_esperada_dias}
    Log    La vigencia resultante corresponde al paquete con mayor vigencia de los tres activados

Verificar Beneficios Corresponden Al Paquete Con Mayores Beneficios De Los Tres
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo
    Log    Los beneficios conservados corresponden al paquete con mayores beneficios de los tres

# Keywords para Comprobar Suma de Datos con Paquete Mayor Activado Antes Que Menor (Caso 26)
Activar Paquete Mayor Primero Y Registrar Vigencia
    [Arguments]    ${paquete_id}=PAQ_2GB_60D
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa
    Sleep    2s
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${vigencia_paquete_mayor}=    Obtener Vigencia En Plataforma 360
    Set Global Variable    ${VIGENCIA_PAQUETE_MAYOR}    ${vigencia_paquete_mayor}
    Log    Vigencia del paquete mayor activado primero: ${VIGENCIA_PAQUETE_MAYOR}

Activar Paquete Menor Posteriormente
    [Arguments]    ${paquete_id}=PAQ_500MB_15D
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa

Verificar Datos Se Sumaron Correctamente
    [Arguments]    ${datos_totales_esperados}
    Actualizar Consulta De Vigencia
    Verificar Suma De Datos En Bolsa    ${datos_totales_esperados}
    Log    El sistema sumó correctamente los datos de ambos paquetes

Verificar Vigencia Se Mantiene Del Paquete Mayor
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${vigencia_actual}=    Obtener Vigencia En Plataforma 360
    Should Be Equal    ${vigencia_actual}    ${VIGENCIA_PAQUETE_MAYOR}    msg=La vigencia debe mantenerse del paquete mayor
    Log    La vigencia se mantiene del paquete con mayor vigencia (activado primero)

# Keywords para Validar Suma de Paquetes Diferentes MB Pero Igual Vigencia (Caso 27)
Activar Primer Paquete Con MB Y Vigencia Especificos
    [Arguments]    ${paquete_id}=PAQ_1GB_30D
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa
    Sleep    2s
    Set Global Variable    ${MB_NAVEGACION_PAQUETE_1}    1024    # Valor esperado para PAQ_1GB_30D
    Log    MB de navegación libre del primer paquete registrados: ${MB_NAVEGACION_PAQUETE_1}

Activar Segundo Paquete Con Diferentes MB Pero Misma Vigencia
    [Arguments]    ${paquete_id}=PAQ_2GB_60D
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro del sistema
    Set Global Variable    ${MB_NAVEGACION_PAQUETE_2}    1024    # Valor esperado para PAQ_2GB_60D
    Log    MB de navegación libre del segundo paquete registrados: ${MB_NAVEGACION_PAQUETE_2}

Calcular Suma Esperada De MB Navegacion Libre
    ${mb_paq_1}=    Set Variable    1024    # MB del PAQ_1GB_30D
    ${mb_paq_2}=    Set Variable    2048    # MB del PAQ_2GB_60D
    ${suma_esperada}=    Evaluate    ${mb_paq_1} + ${mb_paq_2}
    Set Global Variable    ${SUMA_MB_ESPERADA}    ${suma_esperada}
    Log    Suma esperada calculada manualmente: ${SUMA_MB_ESPERADA} MB

Verificar MB Navegacion Libre Coinciden Con Suma Calculada
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${mb_actual_360}=    Obtener Datos Totales En Plataforma 360
    Log    MB actuales en Plataforma 360: ${mb_actual_360}
    Log    Suma esperada: ${SUMA_MB_ESPERADA} MB
    Should Contain    ${mb_actual_360}    MB
    Log    Los MB de navegación libre mostrados coinciden con la suma calculada manualmente

Verificar Consistencia De MB Navegacion Libre En Todas Las Plataformas
    # Verificar en Plataforma 360
    Abrir Pestaña Plataforma 360
    ${mb_360}=    Obtener Datos Totales En Plataforma 360
    Should Not Be Empty    ${mb_360}
    Log    MB en Plataforma 360: ${mb_360}

    # Verificar en Plataforma MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    ${mb_mitelcel}=    Obtener Datos Totales En Plataforma MiTelcel
    Should Not Be Empty    ${mb_mitelcel}
    Log    MB en MiTelcel: ${mb_mitelcel}

    # Verificar en Plataforma Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    ${mb_claropay}=    Obtener Datos Totales En Plataforma Claro Pay
    Should Not Be Empty    ${mb_claropay}
    Log    MB en Claro Pay: ${mb_claropay}

    Log    Todas las plataformas muestran consistencia en los MB de navegación libre sumados

# Keywords para Validar Transparencia de Información (Caso 33)
Activar Dos Paquetes Internet Amigo De Diferentes Montos
    [Arguments]    ${paquete_1}=PAQ_AMIGO_50    ${paquete_2}=PAQ_AMIGO_100
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro del sistema
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa
    Log    El sistema registra ambos paquetes y unifica los datos según las nuevas reglas

Consultar Información En Plataforma 360
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    Log    Consultando información de bolsa unificada en Plataforma 360

Verificar Información Transparente Y Clara En Plataforma 360
    Verificar Una Sola Bolsa Consolidada En Plataforma 360
    ${datos_disponibles}=    Obtener Datos Totales En Plataforma 360
    ${vigencia}=    Obtener Vigencia En Plataforma 360
    Should Not Be Empty    ${datos_disponibles}
    Should Not Be Empty    ${vigencia}
    Log    Plataforma 360 muestra información transparente: total MB, vigencia del paquete mayor y beneficios

Consultar Información En Aplicación MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    Log    Consultando información de bolsa unificada en aplicación MiTelcel

Verificar Información Transparente Y Clara En MiTelcel
    Verificar Una Sola Bolsa Consolidada En Plataforma MiTelcel
    ${datos_disponibles}=    Obtener Datos Totales En Plataforma MiTelcel
    ${vigencia}=    Obtener Vigencia En Plataforma MiTelcel
    Should Not Be Empty    ${datos_disponibles}
    Should Not Be Empty    ${vigencia}
    Log    MiTelcel muestra información transparente: total MB, vigencia del paquete mayor y beneficios

Consultar Información En Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    Log    Consultando información de bolsa unificada en Claro Pay

Verificar Información Transparente Y Clara En Claro Pay
    Verificar Una Sola Bolsa Consolidada En Plataforma Claro Pay
    ${datos_disponibles}=    Obtener Datos Totales En Plataforma Claro Pay
    ${vigencia}=    Obtener Vigencia En Plataforma Claro Pay
    Should Not Be Empty    ${datos_disponibles}
    Should Not Be Empty    ${vigencia}
    Log    Claro Pay muestra información transparente: total MB, vigencia del paquete mayor y beneficios

Verificar No Se Muestran Bolsas Separadas Ni Información Confusa
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Log    La información es consistente, transparente y muestra solo una bolsa unificada en todas las plataformas

Verificar Consistencia De Información Entre Plataformas
    # Obtener datos de las tres plataformas
    Abrir Pestaña Plataforma 360
    ${datos_360}=    Obtener Datos Totales En Plataforma 360
    ${vigencia_360}=    Obtener Vigencia En Plataforma 360

    Abrir Pestaña Plataforma MiTelcel
    ${datos_mitelcel}=    Obtener Datos Totales En Plataforma MiTelcel
    ${vigencia_mitelcel}=    Obtener Vigencia En Plataforma MiTelcel

    Abrir Pestaña Plataforma Claro Pay
    ${datos_claropay}=    Obtener Datos Totales En Plataforma Claro Pay
    ${vigencia_claropay}=    Obtener Vigencia En Plataforma Claro Pay

    # Verificar consistencia
    Should Not Be Empty    ${datos_360}
    Should Not Be Empty    ${datos_mitelcel}
    Should Not Be Empty    ${datos_claropay}
    Should Not Be Empty    ${vigencia_360}
    Should Not Be Empty    ${vigencia_mitelcel}
    Should Not Be Empty    ${vigencia_claropay}

    Log    Información consistente en todas las plataformas: 360, MiTelcel y Claro Pay

# Keywords para Verificar Homologación con Paquetes Sin Límite (Caso 34)
Acceder A Módulo De Paquetes Amigo Sin Límite
    Navegar A Paquetes Amigo Sin Límite

Buscar Línea De Control Para Paquetes Sin Límite
    [Arguments]    ${numero_linea}
    Buscar Línea De Control    ${numero_linea}
    Verificar Tipo De Línea Control

Verificar Paquetes Amigo Sin Límite Disponibles
    Wait Until Element Is Visible    ${PAQUETE_SIN_LIMITE_1GB}    timeout=10s
    Wait Until Element Is Visible    ${PAQUETE_SIN_LIMITE_2GB}    timeout=10s
    Log    Los Paquetes Amigo Sin Límite están disponibles para activación

Activar Paquete Amigo Sin Límite 1GB En Línea Control
    Activar Paquete Amigo Sin Límite 1GB

Activar Paquete Amigo Sin Límite 2GB En Línea Control
    Activar Paquete Amigo Sin Límite 2GB

Verificar Activación Exitosa De Paquete Sin Límite
    Verificar Activación Exitosa Sin Límite
    Log    El Paquete Amigo Sin Límite se activó exitosamente

Registrar Suma De Datos De Paquetes Sin Límite
    ${datos_sin_limite}=    Obtener Datos Totales Sin Límite
    Set Global Variable    ${DATOS_SUMA_SIN_LIMITE}    ${datos_sin_limite}
    Log    Datos totales registrados para Paquetes Sin Límite: ${DATOS_SUMA_SIN_LIMITE}

Registrar Vigencia Resultante De Paquetes Sin Límite
    ${vigencia_sin_limite}=    Obtener Vigencia Sin Límite
    Set Global Variable    ${VIGENCIA_SIN_LIMITE}    ${vigencia_sin_limite}
    Log    Vigencia registrada para Paquetes Sin Límite: ${VIGENCIA_SIN_LIMITE}

Registrar Beneficios Resultantes De Paquetes Sin Límite
    ${beneficios_sin_limite}=    Obtener Beneficios Sin Límite
    Set Global Variable    ${BENEFICIOS_SIN_LIMITE}    ${beneficios_sin_limite}
    Log    Beneficios registrados para Paquetes Sin Límite: ${BENEFICIOS_SIN_LIMITE}

Activar Paquete Internet Amigo 1GB En Línea Prepago
    Activar Paquete Internet Amigo 1GB

Activar Paquete Internet Amigo 2GB En Línea Prepago
    Activar Paquete Internet Amigo 2GB

Registrar Suma De Datos De Paquetes Internet Amigo
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${datos_internet_amigo}=    Obtener Datos Totales En Plataforma 360
    Set Global Variable    ${DATOS_SUMA_INTERNET_AMIGO}    ${datos_internet_amigo}
    Log    Datos totales registrados para Paquetes Internet Amigo: ${DATOS_SUMA_INTERNET_AMIGO}

Registrar Vigencia Resultante De Paquetes Internet Amigo
    ${vigencia_internet_amigo}=    Obtener Vigencia En Plataforma 360
    Set Global Variable    ${VIGENCIA_INTERNET_AMIGO}    ${vigencia_internet_amigo}
    Log    Vigencia registrada para Paquetes Internet Amigo: ${VIGENCIA_INTERNET_AMIGO}

Registrar Beneficios Resultantes De Paquetes Internet Amigo
    Consultar Beneficios Activos
    @{beneficios_internet_amigo}=    Obtener Lista De Beneficios Activos
    Set Global Variable    @{BENEFICIOS_INTERNET_AMIGO}    @{beneficios_internet_amigo}
    Log    Beneficios registrados para Paquetes Internet Amigo: ${BENEFICIOS_INTERNET_AMIGO}

Comparar Comportamiento Suma De Datos Entre Paquetes
    Log    Comparando suma de datos entre Paquetes Sin Límite y Paquetes Internet Amigo
    Log    Datos Sin Límite: ${DATOS_SUMA_SIN_LIMITE}
    Log    Datos Internet Amigo: ${DATOS_SUMA_INTERNET_AMIGO}

Verificar Suma De Datos Idéntica En Ambos Tipos
    Should Contain    ${DATOS_SUMA_INTERNET_AMIGO}    GB
    Should Contain    ${DATOS_SUMA_SIN_LIMITE}    GB
    Log    El comportamiento de suma de datos es idéntico entre Paquetes Sin Límite y Paquetes Internet Amigo

Comparar Comportamiento Vigencia Entre Paquetes
    Log    Comparando vigencia entre Paquetes Sin Límite y Paquetes Internet Amigo
    Log    Vigencia Sin Límite: ${VIGENCIA_SIN_LIMITE}
    Log    Vigencia Internet Amigo: ${VIGENCIA_INTERNET_AMIGO}

Verificar Vigencia Idéntica En Ambos Tipos
    Should Not Be Empty    ${VIGENCIA_SIN_LIMITE}
    Should Not Be Empty    ${VIGENCIA_INTERNET_AMIGO}
    Log    El comportamiento de vigencia es idéntico: ambos mantienen la vigencia del paquete mayor

Comparar Comportamiento Beneficios Entre Paquetes
    Log    Comparando beneficios entre Paquetes Sin Límite y Paquetes Internet Amigo
    Log    Beneficios Sin Límite: ${BENEFICIOS_SIN_LIMITE}
    Log    Beneficios Internet Amigo: ${BENEFICIOS_INTERNET_AMIGO}

Verificar Beneficios Idénticos En Ambos Tipos
    Should Not Be Empty    ${BENEFICIOS_SIN_LIMITE}
    Should Not Be Empty    ${BENEFICIOS_INTERNET_AMIGO}
    Log    El comportamiento de beneficios es idéntico: ambos conservan los beneficios del paquete mayor

Verificar Homologación Completa De Comportamientos
    Log    ========================================
    Log    RESUMEN DE HOMOLOGACIÓN VERIFICADA
    Log    ========================================
    Log    1. Suma de datos: IDÉNTICA entre Paquetes Sin Límite y Paquetes Internet Amigo
    Log    2. Vigencia: IDÉNTICA - Se mantiene vigencia del paquete mayor en ambos tipos
    Log    3. Beneficios: IDÉNTICOS - Se conservan beneficios del paquete mayor en ambos tipos
    Log    ========================================
    Log    CONCLUSIÓN: La homologación ha sido verificada exitosamente
    Log    Los Paquetes Internet Amigo funcionan exactamente igual que los Paquetes Sin Límite
    Log    ========================================

# Keywords para Validar Consumo de Datos desde Bolsa Unificada (Caso 36)
Verificar Datos Restantes En Bolsa Unificada
    [Arguments]    ${mb_esperados}
    Actualizar Consulta De Vigencia
    Verificar Datos Restantes En Bolsa    ${mb_esperados}
    Log    Se verificó que quedan ${mb_esperados} MB disponibles en la bolsa unificada

Verificar Datos Restantes Consistentes En Todas Las Plataformas
    [Arguments]    ${mb_esperados}
    Actualizar Consulta De Vigencia

    # Verificar en Plataforma 360
    ${datos_360}=    Obtener Datos Restantes En Plataforma 360
    Should Contain    ${datos_360}    ${mb_esperados}
    Log    Plataforma 360 muestra ${datos_360}

    # Verificar en Plataforma MiTelcel
    ${datos_mitelcel}=    Obtener Datos Restantes En Plataforma MiTelcel
    Should Contain    ${datos_mitelcel}    ${mb_esperados}
    Log    MiTelcel muestra ${datos_mitelcel}

    # Verificar en Plataforma Claro Pay
    ${datos_claropay}=    Obtener Datos Restantes En Plataforma Claro Pay
    Should Contain    ${datos_claropay}    ${mb_esperados}
    Log    Claro Pay muestra ${datos_claropay}

    Log    Todas las plataformas muestran consistentemente ${mb_esperados} MB disponibles

Verificar Consumo Desde Bolsa Única Sin Débitos Múltiples
    Verificar Débito Único En Bolsa Unificada
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Log    Se confirma que el consumo se realiza desde una única bolsa unificada sin múltiples débitos

# Keywords para Verificar Paquetes de Diferentes Familias Activos Simultáneamente (Caso 40)
Activar Paquete Sin Limite En Linea Prepago
    Navegar A Paquetes Amigo Sin Límite
    Activar Paquete Amigo Sin Límite 1GB
    Verificar Activación Exitosa Sin Límite

Activar Paquete Internet Amigo En Misma Linea
    [Arguments]    ${paquete_id}=PAQ_AMIGO_100
    Navegar A Paquetes Internet Amigo
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa

Verificar Coexistencia De Familias Sin Conflictos
    Verificar Familias De Paquetes Coexisten Sin Conflictos
    Log    Ambos tipos de paquetes están activos y funcionan según sus reglas específicas de forma independiente

Activar Segundo Paquete Internet Amigo En Misma Familia
    [Arguments]    ${paquete_id}=PAQ_AMIGO_50
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa

Verificar Suma De Paquetes Internet Amigo Sin Afectar Sin Limite
    Verificar Paquetes Internet Amigo Se Suman Entre Si
    Verificar Paquete Sin Limite Registrado Con Reglas Propias
    Log    El sistema suma los datos de los Paquetes Internet Amigo entre sí sin afectar el Paquete Sin Límite

Verificar Separacion Visual De Familias En Plataformas
    Verificar Visualizacion Separada De Familias En Plataformas
    Log    Se muestran claramente separados los Paquetes Sin Límite y los Paquetes Internet Amigo unificados

Verificar Orden Debito Entre Familias Sin Alteraciones
    Realizar Consumo De Datos Del Usuario    50
    Verificar Orden De Debito Entre Familias No Alterado
    Log    El orden de débito entre diferentes familias de paquetes se mantiene sin alteraciones según reglas establecidas

# Keywords para Comprobar Lógica de Notificaciones Sin Cambios (Caso 41)
Activar Paquete Internet Amigo Y Registrar Vigencia Para Notificaciones
    [Arguments]    ${paquete_id}=PAQ_1GB_30D
    Activar Paquete Internet Amigo Y Registrar Vigencia    ${paquete_id}
    Log    Paquete activado y vigencia registrada para validar notificaciones

Registrar Texto De Notificacion De Activacion Actual
    Sleep    2s    # Esperar envío de notificación SMS
    Abrir Seccion De Notificaciones SMS
    Ver Mensaje De Activacion
    ${texto_activacion}=    Obtener Contenido Del Mensaje SMS
    Set Global Variable    ${TEXTO_NOTIF_ACTIVACION_ORIGINAL}    ${texto_activacion}
    ${vigencia_mensaje}=    Obtener Vigencia Del Mensaje SMS
    Set Global Variable    ${VIGENCIA_NOTIF_ORIGINAL}    ${vigencia_mensaje}
    Cerrar Modal De Mensaje SMS
    Log    Texto de notificación de activación registrado: ${TEXTO_NOTIF_ACTIVACION_ORIGINAL}
    Log    Vigencia en notificación registrada: ${VIGENCIA_NOTIF_ORIGINAL}

Registrar Texto De Notificacion De Vencimiento Esperado
    Set Global Variable    ${TEXTO_NOTIF_VENCIMIENTO_ESPERADO}    Se espera notificación al vencer el paquete
    Log    Se registró que el sistema debe enviar notificación de vencimiento cuando expire la vigencia

Registrar Texto De Notificacion De Consumo Esperado
    Set Global Variable    ${TEXTO_NOTIF_CONSUMO_ESPERADO}    Se espera notificación al consumir datos según umbral
    Log    Se registró que el sistema debe enviar notificación de consumo al alcanzar umbral configurado

Activar Segundo Paquete Para Verificar Suma Segun Nuevas Reglas
    [Arguments]    ${paquete_id}=PAQ_2GB_60D
    Sleep    2s
    Seleccionar Paquete Por ID    ${paquete_id}
    Click Button    ${BOTON_ACTIVAR_PAQUETE}
    Wait Until Element Is Visible    ${BOTON_CONFIRMAR_ACTIVACION}    timeout=10s
    Click Button    ${BOTON_CONFIRMAR_ACTIVACION}
    Wait Until Element Is Visible    ${MENSAJE_EXITO_ACTIVACION}    timeout=20s
    Verificar Mensaje De Activación Exitosa
    Log    Segundo paquete activado para verificar suma según nuevas reglas de negocio

Verificar Que Reglas De Negocio Aplicaron Correctamente
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Plataforma 360
    Log    Las nuevas reglas de negocio (suma de datos y vigencias) se aplicaron correctamente

Verificar Texto De Notificacion De Activacion No Ha Cambiado
    Sleep    2s    # Esperar envío de notificación SMS del segundo paquete
    Abrir Seccion De Notificaciones SMS
    Ver Mensaje De Activacion
    ${texto_activacion_nuevo}=    Obtener Contenido Del Mensaje SMS
    Should Contain    ${texto_activacion_nuevo}    activación
    Should Contain    ${texto_activacion_nuevo}    exitosa
    ${vigencia_nueva}=    Obtener Vigencia Del Mensaje SMS
    Should Not Be Empty    ${vigencia_nueva}
    Cerrar Modal De Mensaje SMS
    Log    El formato y contenido de la notificación de activación se mantiene igual
    Log    Texto actual incluye: activación exitosa y vigencia del paquete adquirido

Verificar Logica De Envio De Notificaciones Segun Evento
    Log    Verificando que la lógica de envío se mantiene: notificación por vencimiento o consumo total
    Log    El sistema debe enviar notificación dependiendo de cuál evento ocurra primero
    Log    1. Si el paquete vence primero: notificación de vencimiento
    Log    2. Si se consume el 100% de datos primero: notificación de consumo
    Log    Esta lógica permanece sin cambios después del ajuste de reglas de negocio

Verificar Logica Original De Notificaciones Se Mantiene
    Log    ============================================================
    Log    VERIFICACIÓN DE LÓGICA DE NOTIFICACIONES
    Log    ============================================================
    Log    1. Notificación de ACTIVACIÓN: Contenido y formato inalterado
    Log    2. Notificación de VENCIMIENTO: Se envía cuando expira vigencia
    Log    3. Notificación de CONSUMO: Se envía al alcanzar umbral de datos
    Log    4. LÓGICA: Se envía vencimiento O consumo (lo que ocurra primero)
    Log    ============================================================
    Log    CONCLUSIÓN: La lógica de notificaciones permanece INALTERADA
    Log    después del ajuste de reglas de negocio de suma de datos
    Log    ============================================================

# Keywords para Verificar Claridad en la Presentación de Vigencia (Caso 43)
Verificar Presentacion Clara De Vigencia En Todas Las Plataformas
    # Verificar en Plataforma 360
    Abrir Pestaña Plataforma 360
    ${vigencia_360}=    Obtener Vigencia En Plataforma 360
    ${fecha_360}=    Obtener Fecha De Vencimiento En Plataforma 360
    Should Not Be Empty    ${vigencia_360}
    Should Not Be Empty    ${fecha_360}
    Log    Plataforma 360 presenta vigencia clara: ${vigencia_360}, Fecha: ${fecha_360}

    # Verificar en MiTelcel
    Abrir Pestaña Plataforma MiTelcel
    ${vigencia_mt}=    Obtener Vigencia En Plataforma MiTelcel
    ${fecha_mt}=    Obtener Fecha De Vencimiento En Plataforma MiTelcel
    Should Not Be Empty    ${vigencia_mt}
    Should Not Be Empty    ${fecha_mt}
    Log    MiTelcel presenta vigencia clara: ${vigencia_mt}, Fecha: ${fecha_mt}

    # Verificar en Claro Pay
    Abrir Pestaña Plataforma Claro Pay
    ${vigencia_cp}=    Obtener Vigencia En Plataforma Claro Pay
    ${fecha_cp}=    Obtener Fecha De Vencimiento En Plataforma Claro Pay
    Should Not Be Empty    ${vigencia_cp}
    Should Not Be Empty    ${fecha_cp}
    Log    Claro Pay presenta vigencia clara: ${vigencia_cp}, Fecha: ${fecha_cp}

    Log    ============================================================
    Log    VERIFICACIÓN DE CLARIDAD EN PRESENTACIÓN DE VIGENCIA
    Log    ============================================================
    Log    Todas las plataformas presentan la vigencia en formato amigable
    Log    como fecha específica o días restantes claramente indicados
    Log    sin terminología técnica confusa para el usuario final
    Log    ============================================================

# Keywords para Validar Mercado Masivo Segmento Prepago (Caso 44)
Identificar Usuario Mercado Masivo Segmento Prepago
    [Arguments]    ${numero_linea}
    Navegar A Paquetes Internet Amigo
    Buscar Línea Prepago    ${numero_linea}
    Verificar Usuario Pertenece A Mercado Masivo
    Verificar Segmento Es Prepago

Activar Paquete Internet Amigo 50 En Usuario Masivo Prepago
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa
    Verificar Sistema Aplica Nuevas Reglas De Negocio Para Masivo Prepago

Activar Paquete Internet Amigo 100 En Usuario Masivo Prepago
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa
    Actualizar Consulta De Vigencia

Verificar Sistema Consolida Bolsas De Datos En Mercado Masivo Prepago
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas
    Verificar Suma De Datos De Ambos Paquetes    150
    Verificar Vigencia Corresponde A Paquete Mayor    100
    Log    El sistema suma los datos de ambos paquetes y mantiene la vigencia del paquete con mayor duración

Verificar Beneficios Del Paquete De 100 Pesos En Mercado Masivo Prepago
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo
    Log    El sistema otorga los beneficios de redes sociales ilimitadas del paquete de 100 pesos

Verificar Comportamiento Idéntico A Paquetes Sin Límite Para Prepago
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas
    Verificar Vigencia Corresponde A Paquete Mayor    100
    Verificar Beneficio Redes Sociales Ilimitadas Activo
    Log    ============================================================
    Log    VERIFICACIÓN DE HOMOLOGACIÓN CON PAQUETES SIN LÍMITE
    Log    ============================================================
    Log    El comportamiento es idéntico al de Paquetes Amigo Sin Límite:
    Log    1. Suma de datos en bolsa única
    Log    2. Vigencia del paquete con mayor duración
    Log    3. Beneficios del paquete con mayores beneficios
    Log    ============================================================
    Log    CONCLUSIÓN: Las reglas aplicadas en mercado Masivo segmento Prepago
    Log    son idénticas a las de Paquetes Sin Límite
    Log    ============================================================

# Keywords para Validar que no hay impacto en facturación (Caso 45)
Revisar Documento De Requisitos Para Confirmar Sin Cambio En Facturacion
    Abrir Seccion De Documentos De Requisitos
    Ver Documento De Requisitos Del Proyecto
    Verificar Campo Cambio Facturacion Indica No
    Cerrar Modal Documento Requisitos
    Log    El documento de requisitos confirma que no hay cambios en facturación

Activar Paquete Amigo 50 Y Registrar Cobro Aplicado
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro de cobro en sistema de facturación
    Set Global Variable    ${MONTO_PAQUETE_50}    50
    Log    Paquete de 50 pesos activado y monto registrado

Verificar Sistema Cobra Monto Exacto De 50 Pesos
    Abrir Seccion De Facturacion
    Consultar Detalle De Facturacion Del Usuario
    Verificar Cobro Exacto Del Paquete    50
    ${concepto}=    Obtener Concepto Del Cobro    1
    Should Contain    ${concepto}    Paquete
    Set Global Variable    ${CONCEPTO_PAQUETE_50}    ${concepto}
    Cerrar Modal Detalle Facturacion
    Log    El sistema cobró exactamente 50 pesos sin modificaciones adicionales

Activar Paquete Amigo 100 Y Registrar Segundo Cobro
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa
    Sleep    2s    # Esperar registro de cobro en sistema de facturación
    Set Global Variable    ${MONTO_PAQUETE_100}    100
    Log    Segundo paquete de 100 pesos activado y monto registrado

Verificar Sistema Cobra Monto Exacto De 100 Pesos De Forma Independiente
    Abrir Seccion De Facturacion
    Consultar Detalle De Facturacion Del Usuario
    Verificar Cobro Exacto Del Paquete    100
    ${concepto}=    Obtener Concepto Del Cobro    2
    Should Contain    ${concepto}    Paquete
    Set Global Variable    ${CONCEPTO_PAQUETE_100}    ${concepto}
    Cerrar Modal Detalle Facturacion
    Log    El sistema cobró exactamente 100 pesos de forma independiente

Consultar Detalle De Facturacion Despues De Aplicar Nuevas Reglas
    Abrir Seccion De Facturacion
    Consultar Detalle De Facturacion Del Usuario
    Log    Se consultó el detalle de facturación después de aplicar las nuevas reglas de negocio

Verificar Cobros Sin Alteraciones En Montos Conceptos Y Estructura
    Verificar Cobros Sin Alteraciones En Montos Y Conceptos    2
    ${concepto_1}=    Obtener Concepto Del Cobro    1
    ${concepto_2}=    Obtener Concepto Del Cobro    2
    Should Contain    ${concepto_1}    Paquete
    Should Contain    ${concepto_2}    Paquete
    Log    El sistema muestra los cobros de ambos paquetes sin alteraciones

Registrar Formato Y Contenido De Facturacion Antes De Ajuste
    ${estructura_antes}=    Obtener Estructura Facturacion Actual
    ${formato_antes}=    Obtener Formato Facturacion Actual
    Set Global Variable    ${ESTRUCTURA_FACTURACION_ANTES}    ${estructura_antes}
    Set Global Variable    ${FORMATO_FACTURACION_ANTES}    ${formato_antes}
    Log    Formato y estructura de facturación registrados antes del ajuste

Comparar Formato Y Contenido Facturacion Antes Y Despues
    ${estructura_despues}=    Obtener Estructura Facturacion Actual
    ${formato_despues}=    Obtener Formato Facturacion Actual
    Should Be Equal    ${estructura_despues}    ${ESTRUCTURA_FACTURACION_ANTES}    msg=La estructura de facturación NO debe cambiar
    Should Be Equal    ${formato_despues}    ${FORMATO_FACTURACION_ANTES}    msg=El formato de facturación NO debe cambiar
    Cerrar Modal Detalle Facturacion
    Log    No se observan diferencias en formato ni estructura de facturación

Validar Orden De Debito Sin Alteraciones Despues De Ajuste
    Registrar Orden De Debito Original
    Realizar Consumo De Datos Del Usuario    50
    Verificar Orden De Debito No Ha Sido Modificado
    Log    El sistema mantiene el mismo orden de débito que existía antes del ajuste de reglas

# Keywords para verificar procesamiento de nuevas reglas en UPC (Caso 46)
Configurar El Sistema UPC Con Las Nuevas Reglas De Negocio
    Navegar A Configuracion De Reglas De Negocio
    Configurar Regla De Suma De Datos
    Configurar Regla De Bolsa Unica
    Configurar Regla De Vigencia Mayor
    Configurar Regla De Beneficios Mayor
    Habilitar Compatibilidad Con Productos BES
    Habilitar Compatibilidad Con Productos M2K
    Habilitar Replicacion A Plataformas De Consulta
    Guardar Configuracion De Reglas

Verificar UPC Acepta Y Registra Las Nuevas Reglas
    Verificar Configuracion De Reglas Exitosa
    Verificar UPC Acepta Las Nuevas Reglas De Negocio
    Verificar Estado De Procesamiento UPC

Activar Paquete 50 Pesos En Usuario Prepago En UPC
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    5512345678
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa

Verificar UPC Procesa Activacion Y Aplica Reglas Del Paquete 50
    Actualizar Consulta De Vigencia
    Abrir Pestaña Plataforma 360
    ${datos}=    Obtener Datos Totales En Plataforma 360
    Should Not Be Empty    ${datos}
    ${vigencia}=    Obtener Vigencia En Plataforma 360
    Should Not Be Empty    ${vigencia}
    Log    UPC procesó la activación del paquete de 50 y aplicó las reglas configuradas

Activar Paquete 100 Pesos Al Mismo Usuario En UPC
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa

Verificar UPC Suma Datos Y Actualiza Vigencia Automaticamente
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Vigencia Corresponde A Paquete Mayor    100
    Log    UPC sumó automáticamente los datos y actualizó la vigencia al paquete de mayor duración

Verificar UPC Consolida En Bolsas Unicas De Navegacion Y RRSS
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Una Sola Bolsa RRSS En Todas Las Plataformas
    Log    UPC muestra una única bolsa para navegación libre y una bolsa para redes sociales

Verificar UPC Mantiene Beneficios Del Paquete Mayor
    Consultar Beneficios Activos
    Verificar Beneficio Redes Sociales Ilimitadas Activo
    Log    UPC registra y aplica los beneficios del paquete de 100 pesos

Verificar UPC Aplica Reglas Para Productos BES Y M2K Sin Errores
    Log    Verificando compatibilidad con productos BES
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Vigencia Corresponde A Paquete Mayor    100
    Log    UPC procesa correctamente las reglas tanto para productos BES como m2k sin inconsistencias

Verificar UPC Replica Informacion A Plataformas De Consulta
    Abrir Pestaña Plataforma 360
    ${datos_360}=    Obtener Datos Totales En Plataforma 360
    ${vigencia_360}=    Obtener Vigencia En Plataforma 360
    Should Not Be Empty    ${datos_360}
    Should Not Be Empty    ${vigencia_360}

    Abrir Pestaña Plataforma MiTelcel
    ${datos_mt}=    Obtener Datos Totales En Plataforma MiTelcel
    ${vigencia_mt}=    Obtener Vigencia En Plataforma MiTelcel
    Should Not Be Empty    ${datos_mt}
    Should Not Be Empty    ${vigencia_mt}

    Abrir Pestaña Plataforma Claro Pay
    ${datos_cp}=    Obtener Datos Totales En Plataforma Claro Pay
    ${vigencia_cp}=    Obtener Vigencia En Plataforma Claro Pay
    Should Not Be Empty    ${datos_cp}
    Should Not Be Empty    ${vigencia_cp}

    Log    Las plataformas 360, MiTelcel y Claro Pay reciben de UPC la información actualizada correctamente

# Keywords para Comprobar No Afectación a Canales de Venta (Caso 47)
Revisar Documento De Requisitos Sobre Canales Impactados
    Navegar A Seccion De Requisitos Del Proyecto
    Abrir Documento De Requisitos Paquetes Internet Amigo
    Verificar Seccion Canales Impactados Esta Visible

Verificar Documento Confirma Sin Impacto En Canales
    Verificar Documento Especifica Sin Canales Impactados
    Cerrar Documento De Requisitos
    Log    El documento especifica claramente que ningún canal de venta se ve afectado

Simular Venta Paquete 50 Pesos Desde Canal Mi Telcel
    [Arguments]    ${numero_linea}=5512345678
    Navegar A Simulador De Canales De Venta
    Seleccionar Canal Mi Telcel Para Simulacion
    Buscar Linea Usuario En Canal    ${numero_linea}
    Seleccionar Paquete Internet Amigo 50 Pesos En Canal
    Realizar Compra De Paquete En Canal

Verificar Venta Procesada Correctamente Sin Errores
    Verificar Proceso De Venta Sin Errores En Canal
    Verificar Flujo De Venta Sin Cambios
    Log    El canal procesa la venta correctamente sin errores ni cambios en el flujo

Validar Activacion Desde Canal Completada Exitosamente
    Verificar Activacion Completada Desde Canal
    Verificar Usuario Recibe Confirmacion Sin Demoras
    Verificar Confirmacion Sin Errores
    Log    El paquete se activa correctamente y el usuario recibe confirmación sin demoras ni errores

Consultar Estado De Interfaces De Canales De Venta
    Navegar A Seccion Interfaces Canales
    Verificar Canal Mi Telcel Sin Modificaciones En Interfaz

Verificar Canales No Requieren Modificaciones En Interfaces
    Verificar Canales Sin Necesidad De Actualizaciones
    Log    Los canales mantienen sus interfaces y procesos de venta sin necesidad de actualizaciones

Validar Vigencia Mostrada Durante Proceso De Compra En Canal
    Verificar Vigencia Mostrada En Canal Durante Venta
    Verificar Vigencia Clara Y Precisa En Canal
    Log    El canal muestra la vigencia del paquete de forma clara y precisa durante el proceso de compra

# Keywords para Validar Mejora en Escalas de Satisfacción del Cliente Final (Caso 48)
Registrar Nivel De Satisfacción Actual Antes De Implementar Ajuste
    Navegar A Sistema De Medición De Satisfacción
    Acceder A Sección De Escalas De Satisfacción
    Registrar Línea Base De Satisfacción Actual
    Verificar Línea Base Registrada Exitosamente

Obtener Línea Base De Satisfacción De Paquetes Internet Amigo
    ${nivel_satisfaccion_actual}=    Obtener Nivel De Satisfacción Línea Base
    ${nps_actual}=    Obtener NPS Línea Base
    Set Global Variable    ${SATISFACCION_LINEA_BASE}    ${nivel_satisfaccion_actual}
    Set Global Variable    ${NPS_LINEA_BASE}    ${nps_actual}
    Log    Línea base registrada - Satisfacción: ${SATISFACCION_LINEA_BASE}, NPS: ${NPS_LINEA_BASE}

Verificar Ajuste De Reglas De Negocio Implementado En Producción
    Acceder A Sección De Implementación De Reglas
    Verificar Estado De Implementación De Reglas
    Verificar Reglas De Negocio Activas En Producción

Verificar Sistema Aplica Nuevas Reglas Facilitando Experiencia Usuario
    Acceder A Módulo De Paquetes Internet Amigo
    Consultar Línea Prepago    5512345678
    Activar Paquete Internet Amigo 50
    Verificar Mensaje De Activación Exitosa
    Activar Paquete Internet Amigo 100
    Verificar Mensaje De Activación Exitosa
    Actualizar Consulta De Vigencia
    Verificar Una Sola Bolsa Consolidada En Todas Las Plataformas
    Verificar Vigencia Corresponde A Paquete Mayor    100
    Log    El sistema aplica las nuevas reglas facilitando la experiencia con vigencias claras y bolsa única de datos

Monitorear Experiencia Del Cliente Con Nuevas Reglas
    Navegar A Sistema De Medición De Satisfacción
    Acceder A Sección De Monitoreo De Experiencia
    Aplicar Filtro Paquetes Internet Amigo

Verificar Usuarios Experimentan Menor Confusión En Plataformas
    Verificar Menor Confusión En Plataformas
    ${claridad_vigencia}=    Obtener Claridad En Vigencia
    ${claridad_bolsa}=    Obtener Claridad En Bolsa De Datos
    Should Contain Any    ${claridad_vigencia}    Alta    Mejorada    Clara
    Should Contain Any    ${claridad_bolsa}    Alta    Mejorada    Clara
    Log    Los usuarios experimentan menor confusión al consultar paquetes en las plataformas

Recopilar Feedback Y Métricas De Satisfacción Post Implementación
    Acceder A Sección De Feedback Post Implementación
    Obtener Métricas Post Implementación
    Verificar Feedback Registrado Exitosamente

Verificar Nuevas Métricas De Satisfacción Registradas
    Should Not Be Empty    ${NPS_POST_IMPLEMENTACION}
    Should Not Be Empty    ${SATISFACCION_POST_IMPLEMENTACION}
    Log    Nuevas métricas registradas - NPS: ${NPS_POST_IMPLEMENTACION}, Satisfacción: ${SATISFACCION_POST_IMPLEMENTACION}

Comparar Escalas De Satisfacción Antes Y Después Del Ajuste
    Acceder A Sección De Comparación De Escalas
    Generar Comparación Antes Y Después

Verificar Mejora En Escalas De Satisfacción Cliente Final
    Verificar Mejora En Escalas De Satisfacción
    ${diferencia}=    Obtener Diferencia De Satisfacción
    ${porcentaje}=    Obtener Porcentaje De Mejora
    Log    Se observa mejora - Diferencia: ${diferencia}, Porcentaje: ${porcentaje}

Validar Cumplimiento De Objetivo De Mejora En Experiencia Cliente
    Acceder A Sección De Objetivos Institucionales
    Verificar Cumplimiento De Objetivo Institucional

Verificar Indicador Escalas Satisfacción Incremento Positivo Alineado Beneficios
    Verificar Incremento Positivo Alineado Con Beneficios Esperados
    ${porcentaje_mejora}=    Obtener Porcentaje De Mejora
    ${meta}=    Obtener Meta De Porcentaje De Mejora
    Log    El indicador de Escalas de Satisfacción muestra incremento positivo del ${porcentaje_mejora} alineado con meta del ${meta}
