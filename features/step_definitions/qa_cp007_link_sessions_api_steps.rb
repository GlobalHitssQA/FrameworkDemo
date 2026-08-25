# frozen_string_literal: true

# Step definitions exclusivos de QA-CP007.
# POST /user/v2/link-sessions con redirectUrl válido y extracción de
# data.redirectUrl y data.qrCode ante HTTP 200.
#
# Caso de Integración de Servicios (HTTP), implementado de forma agnóstica a la
# plataforma con Net::HTTP + JSON. Endpoint, token y redirectUrl provienen del
# entorno; si falta configuración real, se marca pendiente (no se inventan datos).

Given('existe una URL de redirección válida con los 5 parámetros de dispositivo') do
  @redirect_url = env_value('LINK_SESSIONS_REDIRECT_URL')

  if @redirect_url.nil?
    pending(
      'Definir LINK_SESSIONS_REDIRECT_URL (URL de redirección real ya ' \
      'construida con los 5 parámetros de dispositivo).'
    )
  end

  expect(@redirect_url).to start_with('http')
end

Given('existe un token Bearer de sesión autenticada vigente') do
  @bearer_token = env_value('AUTH_BEARER_TOKEN')

  if @bearer_token.nil?
    pending('Definir AUTH_BEARER_TOKEN (token Bearer real de sesión autenticada vigente).')
  end
end

Given('el endpoint de creación de sesión de vinculación está disponible sobre HTTPS') do
  @link_sessions_base_url = env_value('LINK_SESSIONS_BASE_URL')

  if @link_sessions_base_url.nil?
    pending('Definir LINK_SESSIONS_BASE_URL (base HTTPS real del servicio Link Sessions API v2).')
  end

  expect(@link_sessions_base_url).to start_with('https://')

  @link_sessions_client = LinkSessionsApiClient.new(
    base_url: @link_sessions_base_url,
    bearer_token: @bearer_token
  )
end

When('se serializa el cuerpo de la solicitud con el parámetro redirectUrl') do
  @request_payload = @link_sessions_client.serialize_body(@redirect_url)
  # Confirmar que la serialización quedó correcta antes de enviar (motor ES3:
  # JSON.stringify / json2.js).
  reparsed = JSON.parse(@request_payload)
  expect(reparsed).to include('redirectUrl' => @redirect_url)
end

When('se envía la petición POST de creación de sesión de vinculación con el payload redirectUrl') do
  @response = @link_sessions_client.post_link_session(@request_payload)
  expect(@response).not_to be_nil
end

Then('el servicio responde con estatus HTTP 200') do
  expect(@response.code.to_i).to eq(200)
end

Then('la respuesta se deserializa y se obtiene el objeto data de la sesión de vinculación') do
  # Deserialización (motor ES3: JSON.parse / json2.js).
  @response_body = @link_sessions_client.parse_body(@response.body)
  expect(@response_body).to be_a(Hash)
  expect(@response_body).to have_key('data')

  @data = @response_body['data']
  expect(@data).to be_a(Hash)
end

Then('se extraen los campos data.redirectUrl y data.qrCode con valores válidos y no vacíos') do
  expect(@data).to have_key('redirectUrl')
  expect(@data).to have_key('qrCode')

  expect(@data['redirectUrl']).to be_a(String)
  expect(@data['redirectUrl'].strip).not_to be_empty

  expect(@data['qrCode']).to be_a(String)
  expect(@data['qrCode'].strip).not_to be_empty
end
