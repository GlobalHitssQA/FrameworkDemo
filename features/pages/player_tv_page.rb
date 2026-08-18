# frozen_string_literal: true

# Page Object del Player de TV.
#
# Locators moviles: SOLO accessibility id / id / locators reales provistos por los insumos.
# Los insumos no proveen accessibility ids del player ni del control de restriccion,
# por lo que quedan marcados como TODO.
class PlayerTvPage
  # Codigo de tecla KEYCODE del control OK/Play. Se usa la tecla nativa del D-pad de TV.
  DPAD_CENTER = 23 # KEYCODE_DPAD_CENTER (OK)
  MEDIA_PLAY_PAUSE = 85 # KEYCODE_MEDIA_PLAY_PAUSE

  # TODO: reemplazar por el accessibility id / resource-id real de la superficie de video del player.
  VIDEO_SURFACE_ACCESSIBILITY_ID = ENV['PLAYER_VIDEO_SURFACE_ACC_ID']
  # TODO: reemplazar por el accessibility id / resource-id real del mensaje/estado de restriccion.
  RESTRICTION_MESSAGE_ACCESSIBILITY_ID = ENV['PLAYER_RESTRICCION_ACC_ID']

  def initialize(driver)
    @driver = driver
  end

  # Presiona OK/Play mediante la tecla nativa del control de TV.
  def presionar_ok_play
    @driver.press_keycode(DPAD_CENTER)
  end

  def reproduciendo?
    accessibility_id_required!(VIDEO_SURFACE_ACCESSIBILITY_ID, 'PLAYER_VIDEO_SURFACE_ACC_ID')
    el = @driver.find_element(:accessibility_id, VIDEO_SURFACE_ACCESSIBILITY_ID)
    el.displayed?
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end

  def restriccion_visible?
    accessibility_id_required!(RESTRICTION_MESSAGE_ACCESSIBILITY_ID, 'PLAYER_RESTRICCION_ACC_ID')
    el = @driver.find_element(:accessibility_id, RESTRICTION_MESSAGE_ACCESSIBILITY_ID)
    el.displayed?
  rescue Selenium::WebDriver::Error::NoSuchElementError
    false
  end

  private

  def accessibility_id_required!(value, env_name)
    return unless value.nil? || value.to_s.strip.empty?

    raise "TODO: locator pendiente. Defina #{env_name} con el accessibility id/resource-id " \
          'real del Player de TV (no se permite inventar selectores).'
  end
end
