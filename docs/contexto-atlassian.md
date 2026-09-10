# Contexto Atlassian consolidado

============================================================
TECHNICAL EPIC ADTCL-2394
============================================================
ADTCL-2394 — Manejo del botón Back durante el proceso de digitalización de canales
Tipo: Technical Epic
Estado: System Demo
Criterios de aceptación: * Al realizar la digitación antes de realizar el cambio automático del canal (antes de los 3 segundos), se cumplen los siguientes puntos:
** Se cancela la búsqueda de canal.
** Se ocultan los números ingresados al presionar "back"
** Se mantiene al usuario en la pantalla donde se realizó la digitalización.
HISTORIAS/ACTIVIDADES DIRECTAS DE ADTCL-2394
ADTCL-2396 — Feature: Reproducción de canal en TV en vivo
Relación directa: parent-child
Aclara: Historia técnica que especifica los escenarios de reproducción de canal en TV en vivo, incluyendo la cancelación de digitalización con botón Back.
Descripción: Feature: Reproducción de canal en TV en vivo

    Scenario: Reproducción de canal por primera vez
        Given que es la primera vez que el usuario accede al entorno de TV en vivo
        When el usuario ingresa a TV en vivo
        Then se debe reproducir el canal configurado por default por la operación

    Scenario: Reproducción del último canal visto por el perfil
        Given que el usuario ya ha accedido previamente a TV en vivo
        And el perfil actual tiene un canal visto anteriormente
        When el usuario accede nuevamente a TV en vivo
        Then se debe reproducir el último canal visto por ese perfil

    Scenario: Cancelar digitalización de canal
        Given el usuario realiza la digitación de un canal
        When el usuario presiona el botón "Back" del RCU
        And no han transcurrido los 3 segundos para el cambio automático del canal
        Then se debe cancelar la búsqueda de digitación de canal
        And se borran y ocultar los números digitados
        And mantener al usuario en la pantalla desde dónde inicio la acción.
KEYS VALIDAS DE JIRA PARA TECHNICAL STORY DE ADTCL-2394
ADTCL-2396
============================================================
TECHNICAL EPIC ADTCL-2323
============================================================
ADTCL-2323 — Alta de llaves de configuración en el dispositivo - Nuevo Player VOD - Panel de audio y subtitulos
Tipo: Technical Epic
Estado: Roll Out
Criterios de aceptación: # Las llaves de configuración necesarias se encuentran registradas en las *appKeys* de todos los dispositivos incluidos en el alcance del proyecto.
# Los textos y valores configurables pueden editarse desde la herramienta de administración sin requerir modificaciones en el código ni despliegues adicionales.
# Las configuraciones se reflejan correctamente en los dispositivos, manteniendo el formato y comportamiento definidos en el proyecto.
# Si alguna llave de configuración no existe o no es devuelta por el servicio, el sistema utiliza el valor por defecto definido en el código para mantener el comportamiento esperado del dispositivo.
# La incorporación de estas llaves no afecta otras funcionalidades o configuraciones existentes en la plataforma.
HISTORIAS/ACTIVIDADES DIRECTAS DE ADTCL-2323
ADTCL-2324 — Feature: Registro de llaves de configuración en appKeys para el proyecto "Implementar nuevo Player VOD - Panel de audios y subtitulos"
Relación directa: parent-child
Aclara: Historia técnica que describe los escenarios de registro y validación de llaves de configuración en appKeys para el nuevo Player VOD.
Descripción: Feature: Registro de llaves de configuración en appKeys para el proyecto "Implementar nuevo Player VOD - Panel de audios y subtitulos"

  Background:
    Given que la aplicación del proyecto "Implementar nuevo Player VOD" no dispone actualmente de las llaves requeridas
    And las herramientas de administración tienen capacidad para gestionar configuraciones dinámicas

  Scenario: Creación de llaves de configuración en appKeys
    When se registran las llaves necesarias en las appKeys del dispositivo
    Then dichas llaves deben estar disponibles para cada plataforma participante

  Scenario: Gestión dinámica de configuraciones
    Given que las llaves de configuración están registradas en las appKeys
    When un administrador modifica parámetros desde la herramienta de administración
    Then los cambios se aplican dinámicamente sin necesidad de modificar el código fuente

  Scenario: Reflejo correcto de configuraciones en dispositivos
    When los dispositivos del proyecto cargan el proyecto
    Then las configuraciones deben reflejarse correctamente sin errores de carga ni problemas de formato

  Scenario: Validación de no regresión en funcionalidades
    When se habilita la configuración dinámica mediante las nuevas llaves
    Then otras funcionalidades y configuraciones no relacionadas no deben verse afectadas
KEYS VALIDAS DE JIRA PARA TECHNICAL STORY DE ADTCL-2323
ADTCL-2324
============================================================
TECHNICAL EPIC ADTCL-541
============================================================
ADTCL-541 — Incorporar nuevo Panel de Audio y Subtítulos
Tipo: Technical Epic
Estado: QA Validation
Criterios de aceptación: # Asegurar que cuando el usuario acceda al Panel de Audio y Subtítulos pueda identificar el audio actual del contenido que está en reproducción.
# Asegurar que cuando el usuario acceda al Panel de Audio y Subtítulos pueda cambiar el audio del contenido que está en reproducción.
# Asegurar que cuando el usuario acceda al Panel de Audio y Subtítulos pueda identificar el subtítulo actual del contenido que está en reproducción.
# Asegurar que cuando el usuario acceda al Panel de Audio y Subtítulos pueda cambiar el subtítulo del contenido que está en reproducción.
# El cambio de Audio y Subtítulos se debe aplicar automáticamente al momento en que el usuario elija la opción deseada.
# El Panel de Audio y Subtítulos se debe visualizar con el diseño y características especificadas en los insumos de diseño de cada dispositivo.
HISTORIAS/ACTIVIDADES DIRECTAS DE ADTCL-541
ADTCL-544 — Feature: Panel de Audio y Subtítulos de Control player tipo VOD para Contenido Unitario y Seriado
Relación directa: parent-child
Aclara: Historia técnica principal del Panel de Audio y Subtítulos para el player VOD: estructura, elementos UI, comportamiento y reglas de interacción.
Descripción: Feature: Panel de Audio y Subtítulos de Control player tipo VOD para Contenido Unitario y Seriado

  Rule: El Panel de Audio y Subtítulos se cierra cuando transcurren 2 minutos sin interacción del usuario. El tiempo debe ser configurable por operación.

  Scenario: Seleccionar botón "Audio y Subtitulos" en la botonera
    Given el Control Player se muestra activo
    When el usuario selecciona el botón "Audio y Subtítulos" de la Botonera
    Then se despliega el Panel de Audio y Subtítulos
    And se pausa la reproducción del contenido

  Scenario: Panel de Audio y Subtítulos
    Then se muestra el Panel con Overlay, Titulo AUDIO, opciones de audio, Titulo SUBTITULOS, opciones de subtítulos, Icono Check e Icono Chevron.

  Scenario: Nueva selección de Audio
    When selecciona una opción de Audio
    Then se aplica automáticamente el cambio de audio
    And se identifica con un check la nueva opción seleccionada

  Scenario: Cerrar Panel si no hay interacción
    When el counter iguala el valor de displayDurationMinutes
    Then se cierra automáticamente el Panel
    And se reanuda la reproducción desde el punto en que se pausó
ADTCL-545 — Feature: Comportamiento del RCU para el Panel de Audio y Subtítulos en Contenido Unitario y Seriado
Relación directa: parent-child
Aclara: Historia técnica que define la navegación con el control remoto (RCU) dentro del Panel de Audio y Subtítulos.
Descripción: Feature: Comportamiento del RCU para el Panel de Audio y Subtítulos

  Scenario: Comportamiento del RCU
    | Flecha derecha del DPAD   | Desplaza el foco hacia la derecha |
    | Flecha izquierda del DPAD | Desplaza el foco hacia la izquierda |
    | Botón OK del DPAD         | Selecciona el elemento en foco |
    | Botón Back                | Cierra el Panel de Audio y Subtítulos |
ADTCL-546 — Feature: Implementación de la nueva llave de configuración "audio_subtitle_panel_vod_config" para Panel de Audio y Subtítulos en Control Player VOD
Relación directa: parent-child
Aclara: Historia técnica que define la llave de configuración dinámica 'audio_subtitle_panel_vod_config' para habilitar/deshabilitar el panel y configurar su tiempo de visualización.
Descripción: Feature: Implementación de la nueva llave de configuración "audio_subtitle_panel_vod_config"

  Scenario: Nuevo panel habilitado
    When el valor de "audio_subtitle_panel_vod_config.{region}.enable" es "true"
    Then se muestra el panel con la nueva experiencia

  Scenario: Nuevo panel deshabilitado
    When el valor es "false"
    Then se muestra el panel con la experiencia anterior

  Scenario: Tiempo de visualización configurable
    When recupera la configuración de "/apa/metadata" para la region
    Then se obtiene el tiempo displayDurationMinutes

  Scenario: Configuración no disponible
    When la API responde con error
    Then la aplicación carga la configuración por defecto de 2 minutos
ADTCL-824 — Feature: Actualización en la selección de Stream Type para obtención de Manifest unificado en el panel de Audio y Subtitulos de contenidos VOD
Relación directa: parent-child
Aclara: Historia técnica que actualiza la obtención del manifest unificado (dashwv_ma_v2) para el panel de Audio y Subtítulos, incluyendo fallback y manejo de pistas.
Descripción: Feature: Actualización en la selección de Stream Type para obtención de Manifest unificado

  Scenario: Establecer stream type default
    Then se debe considerar el stream_type "dashwv_ma_v2" como default

  Scenario: Fallback por stream type no soportado
    When la respuesta tiene status 400 con PLY_PLY_00001 o PLY_PLY_00009
    Then la aplicación recupera la llave "supported_stream" y aplica las reglas actuales

  Scenario: Manejo de pistas desde manifest unificado dashwv_ma_v2
    When el servicio responde con status 200
    Then cada pista de audio se obtiene de AdaptationSet con contentType="audio"
    And cada pista de subtítulos de AdaptationSet con contentType="text"
    And cada pista incluye campo obligatorio "Label" con nomenclatura estándar

  Scenario: Selección de pistas de audio con manifest unificado
    When el usuario selecciona una pista de audio
    Then se aplica únicamente el cambio de audio
    And el subtítulo activo se mantiene
KEYS VALIDAS DE JIRA PARA TECHNICAL STORY DE ADTCL-541
ADTCL-544, ADTCL-545, ADTCL-546, ADTCL-824
============================================================
TECHNICAL EPIC ADTCL-308
============================================================
ADTCL-308 — Validación por PIN para Grabaciones en los flujos de EPG
Tipo: Technical Epic
Estado: QA Validation
Criterios de aceptación: # Visualización de la pantalla para ingresar PIN de seguridad al reproducir, grabar o cancelar grabaciones de eventos de canales bloqueados.
# Visualización de la pantalla para ingresar PIN de seguridad al añadir o eliminar canales a favoritos.
# Asegurar que no se solicite el PIN de seguridad al desbloquear un canal mientras el usuario se encuentre en el y no cambie de canal.
HISTORIAS/ACTIVIDADES DIRECTAS DE ADTCL-308
ADTCL-309 — Feature 01: Alerta de Canal no disponible (TV en vivo)
Relación directa: parent-child
Aclara: Feature que cubre el escenario de alerta de canal no disponible cuando falla la validación de control parental en TV en vivo.
Descripción: Feature: Alerta de Canal no disponible (TV en vivo)

    Scenario: Canal con rating sensible y Alerta de canal no disponible
        When se ejecuta el API "/user/v2/controlpin/channels/check"
        And el API responde con status 500 / SERVER_ERROR
        And el rating_code del canal se encuentra en la lista de ratings sensibles
        Then se muestra pantalla "Alerta de canal no disponible" con Icono de alerta y texto 'No es posible verificar el control parental. Intenta de nuevo más tarde.'
        And no se permite la reproducción del canal

    Scenario: No se logra obtener una llave
        Given una llave no se encuentra en response de /apa/metadata
        Then el espacio donde debería mostrarse la leyenda debe mostrar la llave
        And la posición de los elementos debe ser fija
ADTCL-310 — Feature 03: Notificación de alerta por fallo de validación de estado de Bloqueo
Relación directa: parent-child
Aclara: Feature que define la notificación de alerta cuando falla la validación del PIN de bloqueo al intentar grabar eventos desde la EPG.
Descripción: Feature: Notificación de alerta por fallo de validación de estado de Bloqueo

    Scenario: Error en validación del estado de Bloqueo al intentar grabar
        When se ejecuta el API "/user/v2/controlpin/channels/check" con método GET
        And el API responde con status 500 / SERVER_ERROR
        And el rating_code del canal pertenece a la lista de ratings sensibles
        Then se muestra notificación 'Alerta por fallo de validación de estado de Bloqueo' con Icono Alerta, Título 'No es posible verificar el control parental', Barra PIPE, Título 'Intenta de nuevo más tarde'
        And no se permite iniciar la grabación
        And se continúa la reproducción del evento actual
QA-3354 — ADTCL |  | RELEASE | ADTCL-308 Validación por PIN para Grabaciones en los flujos de EPG
Relación directa: parent-child
Aclara: Tarea de release/QA para la validación de ADTCL-308 en versión 7.1.0.b1.
Descripción: Alcance del requerimiento: ADTCL-308
Versión involucrada: 7.1.0.b1+ADTCL-141+ADTCL-308+ADTCL-311+ADTCL-313 (7001000)
Contenido a validar: ADTCL-308
Prioridad del requerimiento: Crítica
DEV: Fernando Esteban Dehesa Lozada
QA-5576 — RECHAZADA|ADTV | 10.1.1b1 | ADTCL-308: Validación por PIN para Grabaciones en los flujos de EPG
Relación directa: is reviewed by
Aclara: Tarea de revisión QA (RECHAZADA) vinculada a ADTCL-308 para la versión 10.1.1b1 en ADTV.
QA-5587 — RECHAZADA | FTV | 10.1.1b1 | ADTCL-308: Validación por PIN para Grabaciones en los flujos de EPG
Relación directa: is reviewed by
Aclara: Tarea de revisión QA (RECHAZADA) vinculada a ADTCL-308 para la versión 10.1.1b1 en FTV.
KEYS VALIDAS DE JIRA PARA TECHNICAL STORY DE ADTCL-308
ADTCL-309, ADTCL-310, QA-3354, QA-5576, QA-5587
============================================================
TECHNICAL EPIC ADTCL-141
============================================================
ADTCL-141 — Validación por PIN para Grabaciones en los flujos de EPG
Tipo: Technical Epic
Estado: QA Validation
Criterios de aceptación: # Visualización de la pantalla para ingresar PIN de seguridad al reproducir, grabar o cancelar grabaciones de eventos de canales bloqueados.
# Visualización de la pantalla para ingresar PIN de seguridad al añadir o eliminar canales a favoritos.
# Asegurar que no se solicite el PIN de seguridad al desbloquear un canal mientras el usuario se encuentre en el y no cambie de canal.
HISTORIAS/ACTIVIDADES DIRECTAS DE ADTCL-141
QA-3078 — FIRETV | 7.0.0.b4+ADTCL-141 | RELEASE | ADTCL-141 Validación por PIN para Grabaciones en los flujos de EPG
Relación directa: parent-child
Aclara: Tarea de release QA para validación de ADTCL-141 en FireTV, versión 7.1.0.b1.
Descripción: Alcance del requerimiento: ADTCL-141
Versión involucrada: 7.1.0.b1+ADTCL-141+ADTCL-308+ADTCL-311+ADTCL-313 (7001000)
Contenido a validar: ADTCL-141
Prioridad del requerimiento: Crítica
DEV: Carmen Cordero, Fernando Dehesa
QA-3077 — (3)ADT/FTV | 7.0.0.b4+ADTCL-141 | RELEASE | ADTCL-141 Validación por PIN para Grabaciones en los flujos de EPG
Relación directa: parent-child
Aclara: Tarea de release QA para validación de ADTCL-141 en ADT/FTV, versión 7.1.0.b1.
Descripción: Alcance del requerimiento: ADTCL-141
Versión involucrada: 7.1.0.b1+ADTCL-141+ADTCL-308+ADTCL-311+ADTCL-313 (7001000)
Contenido a validar: ADTCL-141
Prioridad del requerimiento: Crítica
DEV: Carmen Cordero, Fernando Dehesa
ADTCL-142 — Feature 01: Validar PIN de seguridad en eventos de canales bloqueados
Relación directa: parent-child
Aclara: Feature base que define la validación del PIN de seguridad para acceder a eventos de canales bloqueados.
Descripción: Feature: Validar PIN de seguridad en eventos de canales bloqueados

  Background:
    Given el usuario está autentificado en la plataforma
    When el usuario entra a la tv en vivo y abre la guía de programación
    And el usuario selecciona un evento
    And se ejecuta el API "/user/v2/controlpin/channels/check" con método GET
    And el API responde con status 200 y channels_check: true
    Then el canal al que pertenece el evento esta bloqueado
    And se muestra pantalla para ingresar PIN de seguridad

  Scenario: PIN correcto
    And se ejecuta el API "/user/v2/controlpin/check" con método POST
    And el API responde con status 200 y is_valid: true
    Then el PIN fue ingresado correctamente
    And el usuario tiene acceso al evento

  Scenario: PIN incorrecto
    And el API responde con status 200 y is_valid: false
    Then se muestra tooltip de error al usuario
ADTCL-143 — Feature 02: Solicitar PIN de seguridad para grabar eventos Futuros de canales bloqueados
Relación directa: parent-child
Aclara: Feature que define el flujo de solicitud de PIN para grabar eventos futuros en canales bloqueados desde la EPG.
Descripción: Feature: Solicitar PIN de seguridad para grabar eventos Futuros de canales bloqueados

  Background:
    Given el usuario selecciona un evento con tag "MAS TARDE"
    And el dispositivo obtiene la lista de grabaciones mediante /recordings/v3/light-list
    And el parámetro npvrstorage tiene un valor mayor a 0
    And el evento no existe en la lista de /recordings/v3/light-list
    Then el usuario visualiza la opción de "Grabar programa"

  Scenario: Evento futuro bloqueado
    When el usuario da clic en "Grabar programa"
    And se ejecuta el API "/user/v2/controlpin/channels/check"
    And el API responde con status 200 y channels_check: true
    Then se muestra pantalla para ingresar PIN de seguridad
ADTCL-144 — Feature 03:  Solicitar PIN de seguridad para grabar eventos Presentes de canales bloqueados (Desde inicio/Desde Ahora)
Relación directa: parent-child
Aclara: Feature que define el flujo de solicitud de PIN para grabar eventos en curso (Desde el inicio / Desde ahora) en canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para grabar eventos Presentes de canales bloqueados (Desde inicio/Desde Ahora)

  Background:
    Given el usuario selecciona un evento en vivo
    And el usuario selecciona la opción "Más Opciones"
    And el parámetro npvrstorage tiene un valor mayor a 0
    And el evento no existe en la lista de /recordings/v3/light-list
    Then el usuario visualiza la opción de "Grabar programa"

  Scenario: Pantalla Grabar Desde el inicio / Desde ahora
    When el usuario selecciona "Grabar programa"
    Then se muestra pantalla con opciones 'Desde el inicio' y 'Desde ahora'
    And cada opción dispara la solicitud de PIN si el canal está bloqueado
ADTCL-145 — Feature 04: Solicitar PIN de seguridad para grabar Series / Episodios de eventos presentes en canales bloqueados
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para grabar Series o Episodios de eventos presentes en canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para grabar Series / Episodios de eventos presentes en canales bloqueados

  Scenario: Serie / Episodio presente bloqueado
    When el usuario da clic en la opción Serie o Episodio
    And se ejecuta el API "/user/v2/controlpin/channels/check"
    And el API responde con status 200 y channels_check: true
    Then el canal al que pertenece el evento esta bloqueado
    And se muestra pantalla para ingresar PIN de seguridad
ADTCL-146 — Feature 05: Solicitar PIN de seguridad para cancelar grabación de Series / Episodios en canales bloqueados
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para cancelar grabación de Series o Episodios en canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para cancelar grabación de Series / Episodios en canales bloqueados

  Scenario: Serie / Episodio seleccionado bloqueado
    When el usuario da clic en la opción Cancelar grabación (Serie o Episodio)
    And se ejecuta el API "/user/v2/controlpin/channels/check"
    And el API responde con status 200 y channels_check: true
    Then el canal está bloqueado
    And se muestra pantalla para ingresar PIN de seguridad

  Scenario: PIN correcto - Cancelar grabación
    And el API /user/v2/controlpin/check responde con is_valid: true
    Then se cancela la grabación de la Serie / Episodio
ADTCL-147 — Feature 06: Solicitar PIN de seguridad para grabar eventos pasados de canales bloqueados
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para grabar eventos pasados (Ya emitidos) de canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para grabar eventos pasados de canales bloqueados

  Background:
    Given el usuario selecciona un evento con tag "YA EMITIDO"
    And el parámetro npvrstorage tiene un valor mayor a 0
    And el timeshift tiene un valor mayor a la hora actual de inicio del canal
    And el evento no existe en /recordings/v3/light-list
    Then el usuario visualiza la opción de "Grabar programa"

  Scenario: Evento pasado bloqueado
    When el usuario da clic en "Grabar programa"
    And el API /user/v2/controlpin/channels/check responde con channels_check: true
    Then se muestra pantalla para ingresar PIN de seguridad
ADTCL-148 — Feature 07: Solicitar PIN de seguridad para cancelar la grabación en curso de un evento pasado
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para cancelar grabación en curso de eventos pasados en canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para cancelar la grabación en curso de un evento pasado

  Background:
    Given el usuario selecciona un evento con botón "Grabado" encendido
    Then el evento ya se encuentra grabado
    And el usuario da clic en el botón "Más Opciones"

  Scenario: Evento pasado bloqueado - Cancelar
    When el usuario da clic en "Cancelar grabación"
    And el API /user/v2/controlpin/channels/check responde con channels_check: true
    Then el evento pasado está bloqueado
    And se muestra pantalla para ingresar PIN de seguridad
ADTCL-149 — Feature 08: Solicitar PIN de seguridad para cancelar la grabación de un evento futuro
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para cancelar la grabación programada de un evento futuro en canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para cancelar la grabación de un evento futuro

  Background:
    Given el usuario selecciona un evento con botón "Por Grabar" encendido
    Then se tiene programada la grabación de un evento futuro
    And el usuario da clic en el botón "Más Opciones"

  Scenario: Evento futuro bloqueado - Cancelar grabación
    When el usuario da clic en "Cancelar grabación"
    And el API /user/v2/controlpin/channels/check responde con channels_check: true
    Then el evento futuro está bloqueado
    And se muestra pantalla para ingresar PIN de seguridad
ADTCL-150 — Feature 09: Solicitar PIN de seguridad para cancelar la grabación en curso de un evento presente
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para cancelar la grabación en curso de un evento presente en canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para cancelar la grabación en curso de un evento presente

  Background:
    Given el usuario selecciona un evento con botón "Grabando" encendido
    Then se está grabando un evento
    And el usuario da clic en el botón "Más Opciones"

  Scenario: Evento en vivo bloqueado - Cancelar grabación en curso
    When el usuario da clic en "Cancelar grabación"
    And el API /user/v2/controlpin/channels/check responde con channels_check: true
    Then el canal está bloqueado
    And se muestra pantalla para ingresar PIN de seguridad
ADTCL-151 — Feature 10: Solicitar PIN de seguridad para grabar series / episodios de eventos pasados en canales bloqueados
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para grabar Series o Episodios de eventos pasados en canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para grabar Series / Episodios de eventos pasados en canales bloqueados

  Background:
    Given el usuario selecciona un evento con tag "YA EMITIDO"
    And el parámetro npvrstorage mayor a 0, timeshift mayor a hora actual
    And el evento no existe en /recordings/v3/light-list
    Then el usuario visualiza la opción "Grabar programa"

  Scenario: Serie / Episodio pasado bloqueado
    When el usuario da clic en la opción Serie o Episodio
    And el API /user/v2/controlpin/channels/check responde con channels_check: true
    Then el canal está bloqueado
    And se muestra pantalla para ingresar PIN de seguridad
ADTCL-152 — Feature 11: Solicitar PIN de seguridad para grabar series / episodios de eventos futuros en canales bloqueados
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para grabar Series o Episodios de eventos futuros en canales bloqueados.
Descripción: Feature: Solicitar PIN de seguridad para grabar Series / Episodios de eventos futuros en canales bloqueados

  Background:
    Given el usuario selecciona un evento con tag "MAS TARDE"
    And el parámetro npvrstorage mayor a 0
    And el evento no existe en /recordings/v3/light-list
    Then el usuario visualiza la opción "Grabar programa"

  Scenario: Serie / Episodio futuro bloqueado
    When el usuario da clic en la opción Serie o Episodio
    And el API /user/v2/controlpin/channels/check responde con channels_check: true
    Then el canal está bloqueado
    And se muestra pantalla para ingresar PIN de seguridad
ADTCL-153 — Feature 12: Solicitar PIN de seguridad para Añadir/Eliminar de favoritos un canal bloqueado (Tv en vivo)
Relación directa: parent-child
Aclara: Feature que define la solicitud de PIN para añadir o eliminar canales bloqueados de la lista de favoritos.
Descripción: Feature: Solicitar PIN de seguridad para Añadir/Eliminar de favoritos un canal bloqueado

  Scenario: Añadir canal bloqueado a favoritos
    When el usuario selecciona "Más Opciones" de un canal bloqueado
    And el usuario selecciona la opción "Añadir canal a favoritos"
    And el API /user/v2/controlpin/channels/check responde con channels_check: true
    Then se muestra pantalla para ingresar PIN de seguridad
    And tras PIN correcto se agrega el canal a favoritos

  Scenario: Eliminar canal bloqueado de favoritos
    When el usuario selecciona "Eliminar canal de favoritos"
    And el canal está bloqueado
    Then se muestra pantalla para ingresar PIN de seguridad
ADTCL-154 — Feature 13: Alerta por Fallo de validación de estado (TV en vivo)
Relación directa: parent-child
Aclara: Feature que define la pantalla de alerta cuando falla la validación del control parental en TV en vivo (error 500 en API).
Descripción: Feature: Alerta por Fallo de validación de estado (TV en vivo)

  Scenario: Pantalla Alerta de canal no disponible por error en API
    Given el usuario selecciona un evento en vivo
    When se ejecuta el API "/user/v2/controlpin/channels/check"
    And el API responde con status 500 / SERVER_ERROR
    And el parental_rating del canal se encuentra en lista de ratings sensibles
    Then se muestra pantalla "Alerta de canal no disponible" con Icono de alerta y texto 'No es posible verificar el control parental. Intenta de nuevo más tarde.'
    And no se permite la reproducción del canal
ADTCL-155 — Feature 14: Envio de notificación al desbloquear un canal
Relación directa: parent-child
Aclara: Feature que define la notificación y flujo de desbloqueo de canal con validación de PIN.
Descripción: Feature: Envio de notificación al desbloquear un canal

  Scenario: Solicitar PIN de seguridad (PIN correcto)
    Given se muestra pantalla para ingresar PIN de seguridad
    When el usuario ingresa PIN y da clic en "Siguiente"
    And el API "/user/v2/controlpin/check" responde con status 200 y is_valid: true
    Then el PIN fue ingresado correctamente
    And se permite reproducir el contenido

  Scenario: Solicitar PIN de seguridad (PIN incorrecto)
    And el API responde con is_valid: false
    Then se muestra tooltip de error
ADTCL-156 — Feature 15: Visualización del estado de grabación de eventos en la EPG
Relación directa: parent-child
Aclara: Feature que define la visualización del estado de grabación (Grabar/Grabando/Grabado) de eventos en la mini y full EPG.
Descripción: Feature: Visualización del estado de grabación de eventos en la EPG

  Background:
    Given el dispositivo obtiene la mini o full EPG mediante el servicio "epg/channel"
    And se realiza un llamado al servicio "/recordings/v3/light-list"
    And se almacena localmente la lista de eventos grabados

  Scenario: Mostrar el estado de grabación en eventos de la EPG
    When se comparan los eventos usando channel_id y event_alf_id
    And se encuentra una coincidencia
    Then se usa el valor "recording_status" o "status" para determinar el color del ícono de grabación
    And se obtienen las llaves icono_Grabar, icono_Grabando, icono_Grabado del API "/apa/asset"

  Scenario: No existen grabaciones para el canal
    When no se encuentra coincidencia con channel_id
    Then no se realizan comparaciones de event_alf_id
ADTCL-157 — Feature 16: Llaves dinámicas de la pantalla de PIN para pantallas grandes
Relación directa: parent-child
Aclara: Feature que define las llaves dinámicas de texto para la pantalla de ingreso de PIN en pantallas grandes (todos los flujos de EPG).
Descripción: Feature: Llaves dinámicas de la pantalla de PIN para pantallas grandes

  Background:
    Given el canal al que pertenece el evento está bloqueado
    And el usuario selecciona una acción: Grabar programa, Cancelar grabación, Agregar canal a favoritos, Eliminar canal de favoritos, Eliminar grabación, Reproducir grabación

  Scenario: Pantalla de PIN con textos dinámicos desde APA Metadata
    Given se obtienen del llamado al API "apa/metadata" las llaves de texto para la pantalla de PIN
    Then se muestra la pantalla de PIN con los textos correspondientes a la acción seleccionada
    And los textos son configurables por operación desde las llaves de metadata
AUTO-4700 — CV-AUTO-FTV/ADTV // S41 // Analisis de version y ambiente
Relación directa: relates to
Aclara: Tarea de automatización relacionada con el análisis de versión y ambiente para la validación de ADTCL-141.
KEYS VALIDAS DE JIRA PARA TECHNICAL STORY DE ADTCL-141
QA-3078, QA-3077, ADTCL-142, ADTCL-143, ADTCL-144, ADTCL-145, ADTCL-146, ADTCL-147, ADTCL-148, ADTCL-149, ADTCL-150, ADTCL-151, ADTCL-152, ADTCL-153, ADTCL-154, ADTCL-155, ADTCL-156, ADTCL-157, AUTO-4700