# encoding: utf-8
#
# Cliente del backend/API de Claro Drive para consultar el total de imagenes
# indexadas de la cuenta de prueba.
#
# La URL base y el token se leen de variables de entorno para no hardcodear
# credenciales ni endpoints. Si no estan definidos, el equipo debe configurarlos.
#   BACKEND_API_BASE_URL : URL base del backend/API
#   BACKEND_API_TOKEN    : token de autenticacion de la cuenta de prueba
#   TEST_ACCOUNT_ID      : identificador de la cuenta de prueba
class BackendApiClient
  def initialize
    @base_url = ENV['BACKEND_API_BASE_URL']
    @token    = ENV['BACKEND_API_TOKEN']
    @account  = ENV['TEST_ACCOUNT_ID']
    @last_response_ok = false
  end

  # Consulta el endpoint que reporta el total de imagenes indexadas.
  # Retorna el total (Integer). Deja registro de si la respuesta fue exitosa.
  def total_indexed_images
    # TODO: Implementar la llamada HTTP real al endpoint del backend/API.
    #   Ejemplo (pseudocodigo):
    #   response = HTTP.auth("Bearer #{@token}")
    #                  .get("#{@base_url}/accounts/#{@account}/images/count")
    #   @last_response_ok = response.status.success?
    #   JSON.parse(response.body)['total'].to_i
    raise NotImplementedError, 'TODO: definir endpoint real del backend/API'
  end

  # Indica si la ultima respuesta del backend fue exitosa.
  def last_response_successful?
    @last_response_ok
  end
end
