# Contexto Atlassian consolidado

RN/HUC PRINCIPAL
ADTCL-141 — Validación por PIN para Grabaciones en los flujos de EPG
Tipo: Technical Epic
Estado: QA Validation
Descripción: MVP Técnico: Mostrar al usuario la pantalla para ingresar PIN de seguridad cuando intente realizar las siguientes acciones (Aplica para eventos bloqueados con temporalidad presente, pasado y futuro): Reproducir canal bloqueado, Realizar grabaciones, Cancelar grabaciones, Añadir o quitar de favoritos. Una vez el usuario capture el PIN de seguridad en un canal, no se deberá solicitar nuevamente al realizar alguna acción, a menos que cambie de canal. En caso de que el servicio de validación de PIN no esté disponible o presente un fallo técnico, se debe activar un flujo especial de contingencia. | Requerimientos No Funcionales: (1) El flujo debe funcionar correctamente en todos los dispositivos soportados. (2) El flujo de validación de PIN debe estar desacoplado de la lógica de negocio principal, para facilitar su mantenimiento o actualización futura. (3) Todos los textos mostrados en la pantalla de PIN deben estar externalizados mediante llaves de traducción y traducidos según la configuración regional del usuario. | Sprint: ADTCL-Sprint41 (cerrado). | Parent: TBRFRE-89 (Technical Brief: FE: Validación por PIN para Grabaciones en los flujos de EPG). | País: Todos.
Criterios de aceptación: 1. Visualización de la pantalla para ingresar PIN de seguridad al reproducir, grabar o cancelar grabaciones de eventos de canales bloqueados. 2. Visualización de la pantalla para ingresar PIN de seguridad al añadir o eliminar canales a favoritos. 3. Asegurar que no se solicite el PIN de seguridad al desbloquear un canal mientras el usuario se encuentre en él y no cambie de canal.
HISTORIAS/ACTIVIDADES DIRECTAS USADAS PARA ACLARAR
ADTCL-142 — Feature 01: Validar PIN de seguridad en eventos de canales bloqueados
Relación directa: child
Aclara: Flujo base de validación de PIN al seleccionar eventos en canales bloqueados desde la EPG (TV en vivo)
Descripción: Background: Usuario autenticado en TV en vivo, abre la guía de programación, selecciona un evento. Se ejecuta GET /user/v2/controlpin/channels/check con group_id del canal. Si channels_check=true → canal bloqueado, se muestra pantalla de PIN. | Escenarios: (1) PIN correcto: POST /user/v2/controlpin/check devuelve is_valid=true → usuario accede al evento. (2) PIN incorrecto: devuelve 400 code USR_PIN_00012 → tooltip 'El PIN de seguridad no es válido, verifícalo'. (3) Mismo canal desbloqueado: no se vuelve a solicitar el PIN. (4) Cambio de canal: al regresar al canal bloqueado se vuelve a solicitar PIN. (5) Llave de metadata no encontrada: se muestra la llave sin romper la pantalla. (6) Llave vacía: elementos mantienen posición y tamaño fijos.
Criterios de aceptación: 1. Si API channels/check devuelve channels_check=true se muestra pantalla PIN. 2. PIN correcto (is_valid=true) concede acceso al evento. 3. PIN incorrecto (400/USR_PIN_00012) muestra tooltip de error. 4. En el mismo canal desbloqueado no se re-solicita PIN. 5. Al cambiar de canal y volver, se re-solicita PIN. 6. Ausencia o vaciado de llaves de metadata no genera error visible.
ADTCL-143 — Feature 02: Solicitar PIN de seguridad para grabar eventos Futuros de canales bloqueados
Relación directa: child
Aclara: Flujo de solicitud de PIN para grabación de eventos futuros (tag MAS TARDE) en canales bloqueados
Descripción: Background: Usuario selecciona evento con tag 'MAS TARDE', abre 'Más Opciones' → pantalla 'Opciones del Programa'. Se verifica permiso NPVR via /payway/v1/linealchannels (npvrstorage>0) y lista /recordings/v3/light-list (evento no existe). | Escenarios: (1) Evento futuro bloqueado: al clic en 'Grabar programa', GET /user/v2/controlpin/channels/check channels_check=true → pantalla PIN. (2) PIN correcto → se permite grabar. (3) PIN incorrecto → tooltip error. (4) Iniciar grabación: POST /recordings/v3/add con channel_id, group_id, event_alf_id, payway_token, user_token. Respuesta 200 → muestra notificación de grabación exitosa. (5) Canal sin permiso NPVR: no se muestra opción de grabar. (6) Evento ya programado para grabar: botón 'Por grabar' visible.
Criterios de aceptación: 1. Con npvrstorage>0 y evento no en light-list se muestra 'Grabar programa'. 2. Canal bloqueado al grabar futuro → solicita PIN. 3. PIN correcto → inicia grabación vía /recordings/v3/add. 4. PIN incorrecto → tooltip 'El PIN de seguridad no es válido, verifícalo'. 5. Sin permiso NPVR no se muestra opción grabar.
ADTCL-144 — Feature 03: Solicitar PIN de seguridad para grabar eventos Presentes de canales bloqueados (Desde inicio/Desde Ahora)
Relación directa: child
Aclara: Flujo de grabación de eventos en curso con selección de inicio (desde inicio o desde ahora) y validación de PIN en canales bloqueados
Descripción: Background: Usuario en TV en vivo, selecciona evento en vivo, abre 'Más Opciones'. Se verifica permiso NPVR (npvrstorage>0) y lista de grabaciones. | Escenarios: (1) Pantalla 'Grabar Programa' con opciones 'Desde el inicio' y 'Desde ahora' (llaves de metadata). (2) Al seleccionar opción, GET /user/v2/controlpin/channels/check channels_check=true → muestra PIN. (3) PIN correcto → grabación inicia. (4) PIN incorrecto → tooltip. (5) 'Desde el inicio' llama POST /recordings/v3/add con offset. (6) 'Desde ahora' llama POST /recordings/v3/add sin offset. (7) Pantalla muestra info del canal: logo, número, título, género, año, edad, horario, duración, descripción, director, protagonistas, país.
Criterios de aceptación: 1. Se muestra pantalla 'Grabar Programa' con ambas opciones (Desde el inicio / Desde ahora). 2. Al elegir cualquiera se valida PIN si canal bloqueado. 3. PIN correcto → grabación se inicia correctamente. 4. PIN incorrecto → tooltip de error. 5. La pantalla muestra correctamente los metadatos del evento y canal.
ADTCL-145 — Feature 04: Solicitar PIN de seguridad para grabar Series / Episodios de eventos presentes en canales bloqueados
Relación directa: child
Aclara: Flujo de PIN para grabar series/episodios de eventos presentes en canales bloqueados
Descripción: Background: Usuario selecciona evento en vivo, abre 'Más Opciones', pantalla 'Opciones del Programa'. Tiene permisos NPVR. | Escenarios: (1) Usuario selecciona 'Serie' o 'Episodio' desde 'Grabar Programa' → GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → grabación de serie/episodio inicia. (3) PIN incorrecto → tooltip. (4) Iniciar grabación de serie completa: POST /recordings/v3/add con type=serie. (5) Iniciar grabación de episodio: POST /recordings/v3/add con type=episodio.
Criterios de aceptación: 1. Al seleccionar Serie o Episodio en canal bloqueado se solicita PIN. 2. PIN correcto → grabación de serie/episodio inicia. 3. PIN incorrecto → tooltip de error. 4. Llamada correcta a /recordings/v3/add con parámetros correspondientes al tipo (serie/episodio).
ADTCL-146 — Feature 05: Solicitar PIN de seguridad para cancelar grabación de Series / Episodios en canales bloqueados
Relación directa: child
Aclara: Flujo de PIN para cancelar grabaciones de series/episodios en canales bloqueados
Descripción: Background: Usuario en TV en vivo, evento ya tiene botón 'Grabar' activo, abre 'Más Opciones' para cancelar. | Escenarios: (1) Al clic en 'Cancelar grabación' → Serie o Episodio, GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → cancelación de grabación ejecutada. (3) PIN incorrecto → tooltip. (4) Eliminar grabación: POST /recordings/v3/delete con acción 'delete'. (5) Notificación de cancelación exitosa mostrada.
Criterios de aceptación: 1. Al cancelar grabación (Serie/Episodio) en canal bloqueado → solicita PIN. 2. PIN correcto → cancela grabación vía /recordings/v3/delete. 3. PIN incorrecto → tooltip 'El PIN de seguridad no es válido, verifícalo'. 4. Notificación de cancelación muestra texto correcto (ver Bug ADTCL-2553).
ADTCL-147 — Feature 06: Solicitar PIN de seguridad para grabar eventos pasados de canales bloqueados
Relación directa: child
Aclara: Flujo de PIN para grabar eventos pasados (tag YA EMITIDO) en canales bloqueados con timeshift disponible
Descripción: Background: Usuario selecciona evento con tag 'YA EMITIDO', abre 'Más Opciones'. Verifica permisos NPVR y timeshift (timeshift > hora actual inicio canal). | Escenarios: (1) Al clic 'Grabar programa' → GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → inicia grabación. (3) PIN incorrecto → tooltip. (4) Llamada POST /recordings/v3/add con parámetros del evento pasado.
Criterios de aceptación: 1. Con timeshift válido y NPVR activo se muestra opción 'Grabar programa' para eventos pasados. 2. Canal bloqueado → solicita PIN. 3. PIN correcto → grabación inicia. 4. PIN incorrecto → tooltip de error.
ADTCL-148 — Feature 07: Solicitar PIN de seguridad para cancelar la grabación en curso de un evento pasado
Relación directa: child
Aclara: Flujo de PIN para cancelar grabación en curso de evento pasado en canal bloqueado
Descripción: Background: Usuario selecciona evento pasado con botón 'Grabado' activo, abre 'Más Opciones'. | Escenarios: (1) Al clic 'Cancelar grabación' → GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → cancelación ejecutada via /recordings/v3/delete. (3) PIN incorrecto → tooltip. (4) Se muestra notificación de cancelación.
Criterios de aceptación: 1. Al cancelar grabación de evento pasado bloqueado → solicita PIN. 2. PIN correcto → cancela grabación. 3. PIN incorrecto → tooltip de error.
ADTCL-149 — Feature 08: Solicitar PIN de seguridad para cancelar la grabación de un evento futuro
Relación directa: child
Aclara: Flujo de PIN para cancelar grabación programada de evento futuro en canal bloqueado
Descripción: Background: Usuario selecciona evento futuro con botón 'Por Grabar' activo, abre 'Más Opciones'. | Escenarios: (1) Al clic 'Cancelar grabación' → GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → cancelación ejecutada via /recordings/v3/delete. (3) PIN incorrecto → tooltip. (4) Notificación de cancelación mostrada.
Criterios de aceptación: 1. Al cancelar grabación programada de evento futuro bloqueado → solicita PIN. 2. PIN correcto → cancela grabación programada. 3. PIN incorrecto → tooltip de error.
ADTCL-150 — Feature 09: Solicitar PIN de seguridad para cancelar la grabación en curso de un evento presente
Relación directa: child
Aclara: Flujo de PIN para cancelar grabación en curso de evento presente en canal bloqueado
Descripción: Background: Usuario selecciona evento con botón 'Grabando' activo, abre 'Más Opciones'. | Escenarios: (1) Al clic 'Cancelar grabación' → GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → cancelación ejecutada via /recordings/v3/delete. (3) PIN incorrecto → tooltip. (4) Notificación de cancelación.
Criterios de aceptación: 1. Al cancelar grabación en curso de evento presente bloqueado → solicita PIN. 2. PIN correcto → cancela grabación en curso. 3. PIN incorrecto → tooltip de error.
ADTCL-151 — Feature 10: Solicitar PIN de seguridad para grabar series / episodios de eventos pasados en canales bloqueados
Relación directa: child
Aclara: Flujo de PIN para grabar series/episodios de eventos pasados en canales bloqueados
Descripción: Background: Usuario selecciona evento pasado (tag 'YA EMITIDO'), abre 'Más Opciones'. Verifica NPVR (npvrstorage>0) y timeshift. | Escenarios: (1) Al seleccionar 'Serie' o 'Episodio' → GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → grabación serie/episodio inicia vía /recordings/v3/add. (3) PIN incorrecto → tooltip. (4) Se muestra notificación de grabación.
Criterios de aceptación: 1. Con NPVR y timeshift válidos, evento pasado muestra opciones Serie/Episodio. 2. Canal bloqueado → solicita PIN. 3. PIN correcto → grabación serie/episodio inicia. 4. PIN incorrecto → tooltip de error.
ADTCL-152 — Feature 11: Solicitar PIN de seguridad para grabar series / episodios de eventos futuros en canales bloqueados
Relación directa: child
Aclara: Flujo de PIN para grabar series/episodios de eventos futuros en canales bloqueados
Descripción: Background: Usuario selecciona evento con tag 'MAS TARDE', abre 'Más Opciones'. Verifica NPVR. | Escenarios: (1) Al seleccionar 'Serie' o 'Episodio' → GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → grabación serie/episodio futuro inicia vía /recordings/v3/add. (3) PIN incorrecto → tooltip. (4) Carrusel 'Mis Contenidos' actualiza con la nueva grabación.
Criterios de aceptación: 1. Evento futuro con NPVR → opciones Serie/Episodio disponibles. 2. Canal bloqueado → solicita PIN. 3. PIN correcto → grabación inicia. 4. PIN incorrecto → tooltip. 5. Carrusel Mis Contenidos refleja el nuevo registro con portada/carátula (ver Bug ADTCL-2555 y ADTCL-2556).
ADTCL-153 — Feature 12: Solicitar PIN de seguridad para Añadir/Eliminar de favoritos un canal bloqueado (Tv en vivo)
Relación directa: child
Aclara: Flujo de PIN para gestión de favoritos (añadir/eliminar) de canales bloqueados desde TV en vivo (mini EPG y full EPG)
Descripción: Background: Usuario en TV en vivo, navega hacia canal bloqueado en mini EPG o full EPG, abre 'Más Opciones'. | Escenarios AÑADIR: (1) Al clic 'Añadir canal a favoritos' → GET channels/check channels_check=true → pantalla PIN. (2) PIN correcto → POST /user/v2/favorites/channel (add) → canal añadido a favoritos. (3) PIN incorrecto → tooltip. | Escenarios ELIMINAR: (4) Al clic 'Eliminar canal de favoritos' → GET channels/check channels_check=true → pantalla PIN. (5) PIN correcto → DELETE /user/v2/favorites/channel → canal eliminado. (6) PIN incorrecto → tooltip. | Pantalla 'Opciones del Programa' muestra: título canal, logo, opciones Cancelar grabación, Añadir/Eliminar favoritos, Cambiar idioma, Desbloquear canal.
Criterios de aceptación: 1. Al añadir canal bloqueado a favoritos → solicita PIN. 2. Al eliminar canal bloqueado de favoritos → solicita PIN. 3. PIN correcto → operación de favoritos ejecutada correctamente. 4. PIN incorrecto → tooltip de error. 5. Pantalla de opciones muestra correctamente todos los elementos de UI con sus llaves de metadata. 6. El canal aparece/desaparece en el carrusel 'Mis Canales Favoritos' (ver Bug ADTCL-2561).
ADTCL-154 — Feature 13: Alerta por Fallo de validación de estado (TV en vivo)
Relación directa: child
Aclara: Flujo de contingencia/error cuando el servicio de validación de PIN no está disponible para canales con contenido sensible
Descripción: Background: Usuario en TV en vivo con llave de metadata 'sensitive_channel_ratings' cargada (parental_rating, rating_code por región). | Escenarios: (1) Al seleccionar evento → GET /user/v2/controlpin/channels/check devuelve 500 y el parental_rating del canal está en lista de 'ratings sensibles' → se muestra pantalla 'Alerta de canal no disponible' con texto: 'No es posible verificar el control parental. Intenta de nuevo más tarde.' y ícono de alerta. (2) Si canal NO está en lista de ratings sensibles → no se muestra alerta y el usuario puede ver el contenido normalmente.
Criterios de aceptación: 1. Si channels/check falla (500) y canal tiene parental_rating sensible → mostrar alerta de fallo. 2. Si canal no está en ratings sensibles → no bloquear acceso. 3. Texto e ícono de alerta cargados correctamente desde /apa/metadata y /apa/assets.
ADTCL-155 — Feature 14: Envio de notificación al desbloquear un canal
Relación directa: child
Aclara: Flujo de notificación al desbloquear un canal mediante PIN de seguridad
Descripción: Background: Usuario selecciona evento de canal bloqueado, abre 'Opciones del Canal', selecciona 'Desbloquear Canal' → pantalla PIN. | Escenarios: (1) PIN correcto → POST /user/v2/controlpin/check is_valid=true → canal desbloqueado → se envía notificación de desbloqueo. (2) PIN incorrecto → tooltip de error. (3) Notificación: texto obtenido de /apa/metadata.
Criterios de aceptación: 1. Al seleccionar 'Desbloquear Canal' → solicita PIN. 2. PIN correcto → canal desbloqueado, se muestra notificación. 3. PIN incorrecto → tooltip. 4. Servicio /user/v2/controlpin/check debe invocarse al ingresar PIN (ver Bug ADTCL-2563).
ADTCL-156 — Feature 15: Visualización del estado de grabación de eventos en la EPG
Relación directa: child
Aclara: Flujo de visualización del estado de grabación (íconos) en la guía de programación EPG
Descripción: Background: Dispositivo obtiene mini o full EPG vía /epg/channel y lista de grabaciones vía /recordings/v3/light-list. | Escenarios: (1) Se comparan eventos usando channel_id y event_alf_id. Si hay coincidencia → se usa recording_status/status para determinar el color del ícono de grabación (Por Grabar, Grabando, Grabado). (2) Sin coincidencia → no se muestra ícono de grabación.
Criterios de aceptación: 1. Ícono de grabación se muestra correctamente en mini EPG y full EPG según el estado (recording_status). 2. Comparación correcta usando channel_id + event_alf_id. 3. Sin coincidencia en light-list → sin ícono de grabación.
ADTCL-157 — Feature 16: Llaves dinámicas de la pantalla de PIN para pantallas grandes
Relación directa: child
Aclara: Especificación de las llaves dinámicas de UI de la pantalla de PIN diferenciadas por acción (grabar, cancelar, eliminar, reproducir, favoritos)
Descripción: Background: Aplica desde TV en vivo (al grabar, cancelar grabación, favoritos) y desde Mis Contenidos (al eliminar o reproducir grabación). Canal del evento está bloqueado. | Escenarios: (1) Al grabar → pantalla PIN muestra título 'Canal Bloqueado' y descripción 'Ingresá tu PIN de seguridad de 4 a 6 caracteres para grabar este programa' (desde llave PinDeSeguridad_Título_TextoTitulo_Grabar y PinDeSeguridad_TextoDescriptivo_Texto1_Grabar). (2) Al eliminar grabación → título 'Grabación Bloqueada' (PinDeSeguridad_Título_TextoTitulo_EliminarGrabacion). (3) Al reproducir grabación → título correspondiente. (4) Al cancelar grabación → título correspondiente. Las llaves son dinámicas y provienen de /apa/metadata.
Criterios de aceptación: 1. Pantalla PIN muestra título y descripción específicos según la acción (grabar, cancelar, eliminar, añadir favorito, eliminar favorito, reproducir). 2. Todas las llaves de texto se obtienen de /apa/metadata y se muestran correctamente. 3. Aplica tanto en flujos desde TV en vivo como desde Mis Contenidos.
QA-3077 — (3)ADT/FTV | 7.0.0.b4+ADTCL-141 | RELEASE | ADTCL-141 Validación por PIN para Grabaciones en los flujos de EPG
Relación directa: child
Aclara: Tarea de validación QA de release en dispositivos ADT y FireTV para la versión que incluye ADTCL-141
Descripción: Tarea de release QA para plataformas Android TV (ADT) y Fire TV (FTV). Versión involucrada: 7.1.0.b1+ADTCL-141+ADTCL-308+ADTCL-311+ADTCL-313 (7001000). Prioridad: Crítica. DEV: Carmen Cordero, Fernando Dehesa.
QA-3078 — FIRETV | 7.0.0.b4+ADTCL-141 | RELEASE | ADTCL-141 Validación por PIN para Grabaciones en los flujos de EPG
Relación directa: child
Aclara: Tarea de validación QA de release en dispositivos FireTV para la versión que incluye ADTCL-141
Descripción: Tarea de release QA específica para Fire TV. Versión involucrada: 7.1.0.b1+ADTCL-141+ADTCL-308+ADTCL-311+ADTCL-313 (7001000). Prioridad: Crítica. DEV: Carmen Cordero, Fernando Dehesa.
KEYS VALIDAS DE JIRA PARA TECHNICAL STORY
ADTCL-142, ADTCL-143, ADTCL-144, ADTCL-145, ADTCL-146, ADTCL-147, ADTCL-148, ADTCL-149, ADTCL-150, ADTCL-151, ADTCL-152, ADTCL-153, ADTCL-154, ADTCL-155, ADTCL-156, ADTCL-157, QA-3077, QA-3078