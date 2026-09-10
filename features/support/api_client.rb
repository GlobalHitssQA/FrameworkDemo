# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'

# Cliente HTTP mínimo para consultar servicios reales de negocio
# (configuración de operación, verificación de control parental, etc.).
#
# No fabrica respuestas: realiza la petición real contra la URL provista por el
# entorno y distingue explícitamente entre:
#   - respuesta exitosa con campo booleano válido,
#   - "sin derecho / no bloqueado" (false real),
#   - "no fue posible determinar" (fallo HTTP, cuerpo malformado o campo ausente).
module ApiClient
  # Resultado tipado de una consulta booleana de negocio.
  Result = Struct.new(:ok, :status, :value, :error, keyword_init: true) do
    def determinable?
      ok
    end
  end

  module_function

  # GET que devuelve [status_entero, hash_json_o_nil].
  def get_json(url, headers = {})
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.scheme == 'https')
    http.open_timeout = TestConfig.int('HTTP_OPEN_TIMEOUT', 15)
    http.read_timeout = TestConfig.int('HTTP_READ_TIMEOUT', 20)

    request = Net::HTTP::Get.new(uri.request_uri)
    headers.each { |k, v| request[k] = v }

    response = http.request(request)
    [response.code.to_i, parse_json(response.body)]
  end

  # Verifica un campo booleano de negocio con las reglas estrictas requeridas:
  # exige HTTP 200, cuerpo Hash, campo presente y valor booleano real (true/false).
  # Cualquier otra situación => determinable? == false (NO se interpreta como false).
  def boolean_field(url, field, headers = {})
    status, body = get_json(url, headers)

    unless status == 200
      return Result.new(ok: false, status: status, value: nil,
                        error: "HTTP #{status} distinto de 200")
    end

    unless body.is_a?(Hash) && body.key?(field)
      return Result.new(ok: false, status: status, value: nil,
                        error: "Respuesta sin el campo esperado '#{field}'")
    end

    raw = body[field]
    unless [true, false].include?(raw)
      return Result.new(ok: false, status: status, value: nil,
                        error: "Campo '#{field}' no es booleano real (#{raw.inspect})")
    end

    Result.new(ok: true, status: status, value: raw, error: nil)
  rescue SocketError, Timeout::Error, SystemCallError, OpenSSL::SSL::SSLError => e
    Result.new(ok: false, status: nil, value: nil, error: "Fallo de transporte: #{e.class}")
  end

  def parse_json(body)
    return nil if body.nil? || body.empty?

    JSON.parse(body)
  rescue JSON::ParserError
    nil
  end
end
