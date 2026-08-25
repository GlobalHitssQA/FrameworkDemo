# frozen_string_literal: true

# Step definitions exclusivos de QA-CP004.
# Consistencia entre la metadata mostrada en el panel del player y la del
# backend para un evento en vivo.

Given('el usuario tiene derecho de reproducción para el evento en vivo') do
  # Regla 15/29: el derecho debe verificarse contra un servicio real (HTTP 200 +
  # booleano true/false) del MISMO usuario autenticado y MISMO evento,
  # distinguiendo "sin derecho" de "no fue posible determinar el derecho".
  # Los insumos no proveen endpoint de entitlement, event_id ni schema.
  pending(
    'Derecho de reproducción no verificable con datos reales: definir servicio ' \
    'de entitlement (exigir HTTP 200 y booleano true/false del mismo ' \
    'usuario/evento) y CLAROVIDEO_LIVE_EVENT_ID antes de iniciar la acción.'
  )
end

Given('el backend de metadata está disponible para el evento en vivo') do
  # Regla 16/17: la integración con el backend se configura ANTES de la acción
  # que la consume. Si falta configuración real, se marca pendiente de forma
  # controlada (no se falla incondicionalmente).
  @metadata_url = env_value('CLAROVIDEO_METADATA_URL')
  @bearer_token = env_value('AUTH_BEARER_TOKEN')

  if @metadata_url.nil? || @bearer_token.nil?
    pending(
      'Backend de metadata no verificable: definir CLAROVIDEO_METADATA_URL ' \
      '(URL real del evento) y AUTH_BEARER_TOKEN para comprobar ' \
      'disponibilidad real (HTTP 200) antes del When.'
    )
  end

  @metadata_client = MetadataBackendClient.new(bearer_token: @bearer_token)
end

When('se accede al evento en vivo y se dispara la solicitud de metadata del panel hacia el backend') do
  @metadata_response = @metadata_client.get(@metadata_url)
  expect(@metadata_response).not_to be_nil
end

Then('el backend responde con estatus HTTP 200 y el payload de metadata del evento') do
  expect(@metadata_response.code.to_i).to eq(200)
  @metadata_body = @metadata_client.parse(@metadata_response.body)
  expect(@metadata_body).not_to be_nil
end

Then('la respuesta del backend contiene la estructura de metadata con las llaves definidas en los insumos') do
  # Regla 20/31: las llaves esperadas provienen de los insumos (Figma), no
  # disponibles en esta corrida. No se inventa la estructura esperada.
  pending(
    'Estructura/llaves esperadas de metadata no disponibles en los insumos: ' \
    'definir el conjunto real de campos/llaves (Figma) para validar la ' \
    'estructura sin inventarla.'
  )
end

Then('cada campo de metadata mostrado en el panel coincide exactamente con el valor entregado por el backend') do
  # Regla 9/13/31: la comparación requiere leer el panel realmente renderizado
  # en la plataforma de UI declarada (driver + locators reales), no disponible.
  pending(
    'Comparación panel vs backend no ejecutable: plataforma/driver de UI no ' \
    'declarado y sin locators reales del panel para leer los valores ' \
    'renderizados del mismo evento.'
  )
end

Then('los valores mostrados respetan el conteo de caracteres definido sin truncamientos ni desbordes') do
  pending(
    'Conteo de caracteres esperado no disponible en los insumos y panel de UI ' \
    'no accesible: definir límites reales (Figma) y locators del panel para ' \
    'validar sin inventar datos.'
  )
end
