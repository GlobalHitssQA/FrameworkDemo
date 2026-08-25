# frozen_string_literal: true

require_relative 'base_page'
require 'net/http'
require 'uri'
require 'json'

# TvPlayerPage
#
# Encapsula la interaccion con el player de TV: verificacion del estado de
# derecho de reproduccion, navegacion desde puntos de entrada, deteccion de
# reproduccion iniciada / acceso denegado, y consulta de logs del dispositivo.
#
# Locators requeridos (accessibility id reales, provistos por entorno):
#   LOC_PLAYER_PLAYING_INDICATOR -> senal de reproduccion en curso (p.ej. surface de video activa)
#   LOC_ACCESS_DENIED_INDICATOR  -> manejo previsto por falta de derecho (mensaje/bloqueo)
# Mecanismo de entitlement (provisto por entorno):
#   TV_ENTITLEMENT_ENDPOINT      -> endpoint real que informa el derecho de reproduccion usuario/evento
#   TV_ENTITLEMENT_FIELD         -> nombre del campo booleano de derecho en la respuesta JSON
# Puntos de entrada (provistos por entorno):
#   TV_ENTRY_POINT_<slug>_LOCATOR -> accessibility id del control que abre el evento desde ese punto
# Logs (provistos por entorno):
#   LOG_TYPE                     -> tipo de log (p.ej. logcat)
#   LOG_ACCESS_DENIED_MARKER     -> patron que evidencia el registro de acceso denegado
#   LOG_UNHANDLED_EXCEPTION_MARKERS -> patrones (separados por |) de excepciones NO controladas
class TvPlayerPage < BasePage
  def playing_indicator_locator
    self.class.locator('LOC_PLAYER_PLAYING_INDICATOR')
  end

  def access_denied_locator
    self.class.locator('LOC_ACCESS_DENIED_INDICATOR')
  end

  # Verifica el derecho de reproduccion REAL (usuario+evento) contra el mecanismo
  # provisto por entorno. Devuelve true/false segun el estado efectivo, o nil si
  # el mecanismo no fue provisto (el step lo marca como pendiente).
  def entitlement_for(event_id)
    endpoint = self.class.locator('TV_ENTITLEMENT_ENDPOINT')
    field = self.class.locator('TV_ENTITLEMENT_FIELD')
    return nil if endpoint.nil? || field.nil? || event_id.nil?

    uri = URI.parse(format(endpoint, event_id: event_id))
    uri.query = [uri.query, "eventId=#{URI.encode_www_form_component(event_id)}"].compact.join('&')
    response = Net::HTTP.get_response(uri)
    return false unless response.is_a?(Net::HTTPSuccess)

    body = JSON.parse(response.body)
    value = body[field]
    value == true || value.to_s.strip.downcase == 'true'
  end

  # Abre el evento desde un punto de entrada concreto (accessibility id del
  # control provisto por entorno). Devuelve false si el locator no fue provisto.
  def open_event_from_entry_point(entry_point_locator)
    return false if entry_point_locator.nil?

    control = wait_until_visible(entry_point_locator)
    return false if control.nil?

    control.click
    true
  end

  # Sale del player para poder reingresar desde otro punto de entrada.
  # Devuelve false si el locator de salida no fue provisto.
  def exit_player(exit_locator)
    return false if exit_locator.nil?

    control = wait_until_visible(exit_locator)
    return false if control.nil?

    control.click
    true
  end

  # Base state visible: senal de que la app/player permanece en un estado
  # controlado (sin crash) tras el manejo de la falta de derecho.
  def base_state_ok?(base_state_locator)
    return nil if base_state_locator.nil?

    !wait_until_visible(base_state_locator).nil?
  end

  # Espera explicita a que la reproduccion haya iniciado.
  def playback_started?
    return nil if playing_indicator_locator.nil?

    !wait_until_visible(playing_indicator_locator).nil?
  end

  # Espera explicita a la senal positiva de manejo por falta de derecho.
  def access_denied_shown?
    return nil if access_denied_locator.nil?

    !wait_until_visible(access_denied_locator).nil?
  end

  # Confirma que la reproduccion NO inicio: espera primero la senal positiva de
  # acceso denegado (proceso terminado) y luego verifica, en un intervalo
  # acotado, que el indicador de reproduccion permanece ausente.
  def playback_absent_after_denial?
    return nil if playing_indicator_locator.nil?

    remains_absent?(playing_indicator_locator)
  end

  # Verifica que la reproduccion sigue activa (sin interrupciones) confirmando
  # que el indicador de reproduccion continua visible tras un intervalo acotado.
  def still_playing?
    return nil if playing_indicator_locator.nil?

    return false unless visible?(playing_indicator_locator)

    deadline = ::Process.clock_gettime(::Process::CLOCK_MONOTONIC) + BasePage::NEGATIVE_STABILITY_SECONDS
    while ::Process.clock_gettime(::Process::CLOCK_MONOTONIC) < deadline
      return false unless visible?(playing_indicator_locator)

      sleep(BasePage::POLL_INTERVAL)
    end
    visible?(playing_indicator_locator)
  end

  # Devuelve los logs del dispositivo del tipo configurado, o nil si no se
  # proporciono el tipo de log.
  def device_logs
    log_type = self.class.locator('LOG_TYPE')
    return nil if log_type.nil?

    @session.manage.logs.get(log_type).map(&:message).join("\n")
  rescue ::Selenium::WebDriver::Error::WebDriverError
    nil
  end
end
