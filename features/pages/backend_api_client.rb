# frozen_string_literal: true

require 'net/http'
require 'json'
require 'uri'

# Cliente de consulta al endpoint del backend/API que reporta el total
# de imágenes indexadas de la cuenta de prueba de Claro Drive.
#
# La URL base, la ruta del endpoint y el token de autenticación se leen
# desde variables de entorno. No se hardcodean credenciales ni URLs.
class BackendApiClient
  def initialize
    @base_url = ENV['API_BASE_URL']       # TODO: definir API_BASE_URL real en el entorno CI/local
    @count_path = ENV['API_IMAGES_COUNT_PATH'] # TODO: definir ruta real del endpoint de conteo
    @token = ENV['API_AUTH_TOKEN']        # Token de autenticación (sin hardcodear)
  end

  Response = Struct.new(:status, :total, keyword_init: true)

  # Ejecuta la consulta al endpoint y devuelve status y total de imágenes.
  def images_total
    raise 'API_BASE_URL no configurada' if @base_url.nil? || @base_url.empty?
    raise 'API_IMAGES_COUNT_PATH no configurada' if @count_path.nil? || @count_path.empty?

    uri = URI.join(@base_url, @count_path)
    request = Net::HTTP::Get.new(uri)
    request['Authorization'] = "Bearer #{@token}" unless @token.nil? || @token.empty?
    request['Accept'] = 'application/json'

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: uri.scheme == 'https') do |http|
      http.request(request)
    end

    Response.new(status: response.code.to_i, total: extract_total(response.body))
  end

  private

  # Extrae el total del cuerpo JSON. La clave real depende del contrato del API.
  def extract_total(body)
    return nil if body.nil? || body.empty?

    data = JSON.parse(body)
    # TODO: ajustar la clave al contrato real del endpoint (p. ej. 'total', 'count', 'totalImages').
    data['total'] || data['count'] || data['totalImages']
  rescue JSON::ParserError
    nil
  end
end
