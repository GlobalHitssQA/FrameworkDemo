# frozen_string_literal: true

require_relative 'base_page'

# QA-CP078 — Page Object del Panel de Audio y Subtítulos del Player VOD
# (Android / Appium UiAutomator2).
#
# Locators desde variables de entorno (no inventados). El step valida presencia.
#
# Llaves de locator esperadas:
#   LOC_AUDIO_PANEL          -> accessibility id del Panel de Audio y Subtítulos
#   LOC_AUDIO_OPTIONS        -> uiautomator UiSelector que agrupa las opciones de audio (find_elements)
#   LOC_AUDIO_ACTIVE_CHECK   -> uiautomator UiSelector del ícono check de la opción activa
#   LOC_AUDIO_CONFIRM_DIALOG -> accessibility id de un eventual diálogo de confirmación (debe estar ausente)
#   LOC_PLAYER_CURRENT_AUDIO -> accessibility id del indicador de la pista de audio en reproducción
class AudioSubtitlePanelPage < BasePage
  LOCATOR_KEYS = %w[
    LOC_AUDIO_PANEL
    LOC_AUDIO_OPTIONS
    LOC_AUDIO_ACTIVE_CHECK
    LOC_AUDIO_CONFIRM_DIALOG
    LOC_PLAYER_CURRENT_AUDIO
  ].freeze

  # Locators para verificar la reproducción VOD activa y la identidad del contenido.
  #   LOC_VOD_PLAYER_SURFACE -> accessibility id de la superficie del reproductor VOD
  #   LOC_VOD_CONTENT_ID     -> accessibility id del elemento que expone el id del contenido
  PLAYBACK_KEYS = %w[
    LOC_VOD_PLAYER_SURFACE
    LOC_VOD_CONTENT_ID
  ].freeze

  def playback_active?
    present?(:accessibility_id, TestConfig['LOC_VOD_PLAYER_SURFACE'])
  end

  # Identificador del contenido VOD actualmente en reproducción (evidencia real).
  def current_content_id
    element = require_element(:accessibility_id, TestConfig['LOC_VOD_CONTENT_ID'],
                              'identificador del contenido VOD en reproducción')
    value = element.attribute('content-desc')
    value = element.text if value.nil? || value.strip.empty?
    value&.strip
  end

  def panel_visible?
    present?(:accessibility_id, TestConfig['LOC_AUDIO_PANEL'])
  end

  # Opciones de audio en el orden real renderizado en el árbol de accesibilidad.
  def audio_options
    wait_present(:uiautomator, TestConfig['LOC_AUDIO_OPTIONS'])
    @driver.find_elements(:uiautomator, TestConfig['LOC_AUDIO_OPTIONS'])
  rescue Selenium::WebDriver::Error::TimeoutError
    []
  end

  # Etiqueta de la pista de audio actualmente activa (según el check marcado).
  def active_audio_label
    check = require_element(:uiautomator, TestConfig['LOC_AUDIO_ACTIVE_CHECK'],
                            'ícono check de la opción de audio activa')
    label_of(check)
  end

  # Selecciona la primera opción de audio distinta a la activa y devuelve su etiqueta.
  def select_audio_other_than_active(active_label)
    options = audio_options
    raise 'El Panel no expone al menos dos pistas de audio seleccionables' if options.size < 2

    target = options.find { |opt| label_of(opt) != active_label }
    raise 'No se encontró una opción de audio distinta a la activa' if target.nil?

    chosen = label_of(target)
    target.click
    chosen
  end

  # Confirmación adicional NO debe aparecer: el cambio es automático.
  def confirmation_dialog_absent?
    absent_after_settled?(:accessibility_id, TestConfig['LOC_AUDIO_CONFIRM_DIALOG'])
  end

  # Pista de audio efectivamente en reproducción (indicador real del player).
  def current_player_audio_label
    element = require_element(:accessibility_id, TestConfig['LOC_PLAYER_CURRENT_AUDIO'],
                              'indicador de pista de audio en reproducción')
    label_of(element)
  end

  # Espera explícita a que la pista reproducida coincida con la seleccionada.
  def wait_audio_applied?(expected_label, timeout: BasePage::DEFAULT_TIMEOUT)
    Selenium::WebDriver::Wait.new(timeout: timeout, interval: 0.5).until do
      current_player_audio_label == expected_label
    end
    true
  rescue Selenium::WebDriver::Error::TimeoutError
    false
  end

  private

  def label_of(element)
    value = element.attribute('content-desc')
    value = element.text if value.nil? || value.strip.empty?
    value&.strip
  end
end
