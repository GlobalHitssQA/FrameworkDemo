# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

# Cliente de integración para la consulta de metadata del evento en vivo
# (QA-CP004). Ejecuta la solicitud HTTP real contra el backend de metadata.
#
# No inventa endpoint, token ni event_id: la URL completa del recurso y el
# token Bearer provienen del entorno (variables de entorno). Se exige HTTPS.
class MetadataBackendClient
  def initialize(bearer_token:)
    @bearer_token = bearer_token
  end

  # Realiza un GET real al recurso de metadata del evento y devuelve el objeto
  # Net::HTTPResponse. `url` debe ser la URL completa y real del evento.
  def get(url)
    uri = URI.parse(url)
    unless uri.is_a?(URI::HTTPS)
      raise ArgumentError, "El endpoint de metadata debe ser HTTPS: #{url}"
    end

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.open_timeout = 10
    http.read_timeout = 15

    request = Net::HTTP::Get.new(uri)
    request['Authorization'] = "Bearer #{@bearer_token}"
    request['Accept'] = 'application/json'
    http.request(request)
  end

  # Deserializa el cuerpo JSON de la respuesta del backend.
  def parse(response_body)
    JSON.parse(response_body)
  end
end
