# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

# Cliente de integración para el servicio Link Sessions API v2.0.0 (TS-04),
# usado por QA-CP007. Ejecuta la operación real POST /user/v2/link-sessions
# sobre HTTPS.
#
# En el motor ES3 de la app Smart TV la serialización/deserialización usa el
# polyfill json2.js (JSON.stringify / JSON.parse) y XMLHttpRequest. Desde la
# capa de prueba en Ruby, el equivalente funcional es la librería estándar
# JSON + Net::HTTP; no se altera el contrato del servicio.
#
# No inventa endpoint, token ni redirectUrl: todos provienen del entorno.
class LinkSessionsApiClient
  LINK_SESSIONS_PATH = '/user/v2/link-sessions'

  def initialize(base_url:, bearer_token:)
    @base_url = base_url
    @bearer_token = bearer_token
  end

  # Serializa el cuerpo { "redirectUrl": <valor> } (equivalente a
  # JSON.stringify / json2.js). Devuelve el payload JSON como String.
  def serialize_body(redirect_url)
    JSON.generate('redirectUrl' => redirect_url)
  end

  # Envía la petición POST real sobre HTTPS con el header Authorization Bearer.
  # Devuelve el objeto Net::HTTPResponse.
  def post_link_session(payload)
    uri = URI.join(@base_url, LINK_SESSIONS_PATH)
    unless uri.is_a?(URI::HTTPS)
      raise ArgumentError, "El endpoint debe ser HTTPS: #{uri}"
    end

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.open_timeout = 10
    http.read_timeout = 15

    request = Net::HTTP::Post.new(uri)
    request['Authorization'] = "Bearer #{@bearer_token}"
    request['Content-Type'] = 'application/json'
    request.body = payload
    http.request(request)
  end

  # Deserializa el cuerpo de la respuesta (equivalente a JSON.parse / json2.js).
  def parse_body(response_body)
    JSON.parse(response_body)
  end
end
