# frozen_string_literal: true

require_relative 'base_page'

# QA-CP001 — Page Object del entorno de TV en vivo (Android / Appium UiAutomator2).
#
# Los locators NO se inventan: provienen de variables de entorno del proyecto.
# El step correspondiente valida su presencia (require_config!) y marca el
# escenario como pending si alguna llave no está definida.
#
# Llaves de locator esperadas:
#   LOC_MAIN_MENU_LIVE_TV   -> accessibility id de la entrada "TV en vivo" en el menú principal
#   LOC_LIVE_TV_SCREEN      -> accessibility id del contenedor de la pantalla de TV en vivo
#   LOC_CHANNEL_HISTORY     -> accessibility id del indicador de historial de canal previo
#   LOC_PLAYER_SURFACE      -> accessibility id de la superficie/canvas del reproductor
#   LOC_PLAYER_CHANNEL_ID   -> accessibility id del elemento que expone el id del canal en reproducción
class TvEnVivoPage < BasePage
  LOCATOR_KEYS = %w[
    LOC_MAIN_MENU_LIVE_TV
    LOC_LIVE_TV_SCREEN
    LOC_CHANNEL_HISTORY
    LOC_PLAYER_SURFACE
    LOC_PLAYER_CHANNEL_ID
  ].freeze

  def open_live_tv_from_main_menu
    entry = require_element(:accessibility_id, TestConfig['LOC_MAIN_MENU_LIVE_TV'],
                            'entrada "TV en vivo" en el menú principal')
    entry.click
  end

  def live_tv_screen_ready?
    present?(:accessibility_id, TestConfig['LOC_LIVE_TV_SCREEN'])
  end

  # Historial de canal previo: su ausencia (acotada) confirma "primer acceso".
  def channel_history_present?
    !absent_after_settled?(:accessibility_id, TestConfig['LOC_CHANNEL_HISTORY'])
  end

  def player_started?
    present?(:accessibility_id, TestConfig['LOC_PLAYER_SURFACE'])
  end

  # Lee el identificador del canal en reproducción desde el atributo del elemento
  # real del reproductor (content-desc). No usa configuración previa como evidencia.
  def current_channel_id
    element = require_element(:accessibility_id, TestConfig['LOC_PLAYER_CHANNEL_ID'],
                              'identificador de canal en reproducción')
    value = element.attribute('content-desc')
    value = element.text if value.nil? || value.strip.empty?
    value&.strip
  end
end
