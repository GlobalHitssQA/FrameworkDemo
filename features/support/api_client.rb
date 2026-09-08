# frozen_string_literal: true

require 'net/http'
require 'uri'
require 'json'
require 'openssl'

module ClaroVideo
  # Cliente HTTP real para los servicios de validación de PIN descritos en los insumos
  # (ADTCL-142): GET /user/v2/controlpin/channels/check y POST /user/v2/controlpin/check.
  #
  # Distingue explícitamente entre "resultado determinable" (HTTP 200 + campo booleano real)
  # y "no determinable" (fallo de red, respuesta malformada, HTTP no exitoso), que se
  # propaga como Undeterminable para que el step lo marque pendiente y nunca se interprete
  # como false.
  class ApiClient
    # Se eleva cuando no es posible determinar la condición de negocio de forma confiable.
    class Undeterminable < StandardError; end

    Result = Struct.new(:status, :body, keyword_init: true)

    CHANNELS_CHECK_PATH = 'user/v2/controlpin/channels/check'
    PIN_CHECK_PATH      = 'user/v2/controlpin/check'

    def initialize(base_url:, user_token:)
      @base_url = base_url
      @user_token = user_token
    end

    # GET /user/v2/controlpin/channels/check?group_id=...&user_token=...
    def channels_check(group_id)
      request(Net::HTTP::Get, CHANNELS_CHECK_PATH, params: { group_id: group_id })
    end

    # POST /user/v2/controlpin/check con { pin, group_id, user_token }
    def pin_check(pin:, group_id:)
      request(
        Net::HTTP::Post,
        PIN_CHECK_PATH,
        body: { pin: pin, group_id: group_id }
      )
    end

    private

    def request(request_class, path, params: {}, body: nil)
      uri = build_uri(path, params)
      req = request_class.new(uri)
      req['Accept'] = 'application/json'
      if body
        req['Content-Type'] = 'application/json'
        payload = body.dup
        payload[:user_token] = @user_token if @user_token
        req.body = JSON.generate(payload)
      end

      response = http_for(uri).request(req)
      Result.new(status: response.code.to_i, body: parse_json(response.body))
    rescue SocketError, Timeout::Error, SystemCallError, OpenSSL::SSL::SSLError,
           IOError, Net::ProtocolError => e
      raise Undeterminable, "Fallo de red al invocar /#{path}: #{e.class}: #{e.message}"
    end

    def build_uri(path, params)
      base = @base_url.end_with?('/') ? @base_url : "#{@base_url}/"
      uri = URI.join(base, path)
      query = (params || {}).dup
      query[:user_token] = @user_token if @user_token
      uri.query = URI.encode_www_form(query) unless query.empty?
      uri
    end

    def http_for(uri)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = (uri.scheme == 'https')
      http.open_timeout = 15
      http.read_timeout = 20
      http
    end

    def parse_json(raw)
      return nil if raw.nil? || raw.empty?

      JSON.parse(raw)
    rescue JSON::ParserError
      nil
    end
  end
end
