# frozen_string_literal: true

# Page Object de la Vista Previa (preview) de imagen en Claro Drive iOS.
# Plataforma iOS -> Appium + XCUITest. Solo locators reales (accessibility id / id).
# Los casos NO proporcionan selectores: cada locator queda como TODO y debe
# completarse con el valor real. No se fabrican selectores.
class PreviewPage
  # --- Locators (móvil iOS) ---
  # TODO: accessibility id real de la imagen mostrada a pantalla completa en el preview.
  IMAGEN_PREVIEW = { accessibility_id: ENV['CD_PREVIEW_IMAGEN_ACCESSIBILITY_ID'] }.freeze
  # TODO: accessibility id real del botón para cerrar/volver desde el preview.
  BOTON_CERRAR   = { accessibility_id: ENV['CD_PREVIEW_CERRAR_ACCESSIBILITY_ID'] }.freeze

  def initialize(driver = $driver)
    @driver = driver
  end

  def visible?
    @driver.find_elements(**IMAGEN_PREVIEW).any?
  end

  def imagen_actual
    @driver.find_element(**IMAGEN_PREVIEW)
  end

  # Identificador de la imagen abierta, para verificar correspondencia con la miniatura.
  def identificador_imagen
    el = imagen_actual
    el.attribute('name') || el.attribute('label')
  end

  def cerrar
    # TODO: habilitar cuando BOTON_CERRAR tenga un locator real.
    @driver.find_element(**BOTON_CERRAR).click
  end
end
