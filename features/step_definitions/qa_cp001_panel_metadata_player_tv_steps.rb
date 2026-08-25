# frozen_string_literal: true

# Step definitions exclusivos de QA-CP001.
# Panel de metadata en el player de TV durante evento en vivo con derecho.
#
# La plataforma de UI no está declarada (ver features/support/env.rb): no se
# fija driver ni se inventan locators. Las precondiciones y validaciones de UI
# se marcan pendientes de forma controlada (no se simulan como cumplidas).

Given('existe un evento en vivo con derecho de reproducción disponible') do
  # Regla 15/29: el derecho de reproducción debe verificarse contra un servicio
  # real (HTTP 200 + booleano true/false) para el MISMO usuario autenticado y
  # el MISMO evento. Los insumos no proveen event_id ni endpoint de entitlement.
  pending(
    'Evento en vivo con derecho no verificable con datos reales: definir ' \
    'CLAROVIDEO_LIVE_EVENT_ID y el servicio de entitlement real (exigir ' \
    'HTTP 200 y booleano true/false del mismo usuario/evento) antes del When.'
  )
end

Given('el backend de metadata está operativo') do
  # Regla 13/16: la disponibilidad del backend debe comprobarse de forma real
  # (HTTP 200) antes de la acción bajo prueba, no como comentario/TODO vacío.
  metadata_url = env_value('CLAROVIDEO_METADATA_URL')

  if metadata_url.nil?
    pending(
      'Backend de metadata no verificable: definir CLAROVIDEO_METADATA_URL ' \
      '(URL real del evento) para comprobar disponibilidad (HTTP 200) antes ' \
      'del When.'
    )
  end
end

When('el usuario accede al evento en vivo con derecho de reproducción desde un punto de entrada del player de TV') do
  # Regla 30: la navegación debe abrir EXACTAMENTE el mismo event_id verificado
  # y luego confirmar la identidad del evento mostrado. Sin plataforma/driver ni
  # locator real del punto de entrada, no es ejecutable.
  @panel_page ||= MetadataPanelPlayerPage.new

  unless @panel_page.ready?
    pending(
      'Navegación al evento no ejecutable: plataforma/driver de UI no ' \
      'declarado y sin locators reales del punto de entrada/player ni event_id ' \
      'para verificar la identidad del evento abierto.'
    )
  end
end

When('se invoca la carga del componente del panel de metadata en el player de TV') do
  unless @panel_page && @panel_page.ready?
    pending(
      'Carga del panel no ejecutable: plataforma/driver de UI no declarado y ' \
      'sin locator real del componente de panel de metadata.'
    )
  end
end

Then('el player de TV inicia la reproducción del evento en vivo sin errores') do
  # Regla 18: verificación asíncrona con espera explícita de "reproducción
  # iniciada" sobre una señal real, no disponible sin plataforma/driver.
  pending(
    'Verificación de reproducción no ejecutable: se requiere señal real de ' \
    'estado de reproducción (locator/estado) en la plataforma declarada, con ' \
    'espera explícita acotada.'
  )
end

Then('el panel de metadata se renderiza sobre el player sin bloquear la reproducción') do
  pending(
    'Verificación del render del panel no ejecutable: sin locators reales del ' \
    'panel ni driver de la plataforma declarada.'
  )
end

Then('los campos de metadata respetan las llaves y el conteo de caracteres definidos en los insumos') do
  # Regla 31: comparar contra los valores/llaves esperados reales del evento
  # (insumos Figma), no aprobar por el simple hecho de que haya texto.
  pending(
    'Validación de campos/llaves y conteo no ejecutable: insumos (Figma) con ' \
    'las llaves y límites reales no disponibles, y panel de UI no accesible ' \
    'sin plataforma/driver declarado.'
  )
end

Then('la reproducción del evento en vivo continúa activa mientras el panel está visible') do
  # Regla 18: para el estado sostenido "sigue en reproducción" se requiere una
  # señal real y espera acotada; no disponible sin plataforma/driver.
  pending(
    'Verificación de continuidad de reproducción no ejecutable: se requiere ' \
    'señal real de reproducción activa y espera explícita acotada en la ' \
    'plataforma declarada.'
  )
end
