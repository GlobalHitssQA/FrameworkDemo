# frozen_string_literal: true

# Page Object de la Sección Fotos (Galería) de Claro Drive iOS.
# Plataforma iOS -> Appium + XCUITest. Solo se admiten locators reales
# (accessibility id / id). Los casos NO proporcionan selectores, por lo que
# cada locator queda marcado como TODO y debe completarse con el valor real
# de la app antes de una ejecución en vivo. No se fabrican selectores.
class GaleriaPage
  # --- Locators (móvil iOS) ---
  # TODO: reemplazar por el accessibility id real de la pestaña/entrada a Fotos (Galería).
  FOTOS_TAB          = { accessibility_id: ENV['CD_FOTOS_TAB_ACCESSIBILITY_ID'] }.freeze
  # TODO: accessibility id real del contenedor/lista (grid) de miniaturas.
  GALERIA_GRID       = { accessibility_id: ENV['CD_GALERIA_GRID_ACCESSIBILITY_ID'] }.freeze
  # TODO: accessibility id real de una celda/miniatura de imagen.
  MINIATURA          = { accessibility_id: ENV['CD_MINIATURA_ACCESSIBILITY_ID'] }.freeze

  def initialize(driver = $driver)
    @driver = driver
  end

  def abrir_galeria
    # TODO: habilitar cuando FOTOS_TAB tenga un locator real.
    @driver.find_element(**FOTOS_TAB).click
  end

  def primer_lote_visible?
    @driver.find_elements(**MINIATURA).any?
  end

  def miniaturas
    @driver.find_elements(**MINIATURA)
  end

  # Devuelve identificadores estables de las miniaturas visibles para detectar
  # duplicados y validar continuidad de la secuencia entre lotes.
  def identificadores_visibles
    miniaturas.map { |el| el.attribute('name') || el.attribute('label') }
  end

  def scroll_abajo
    # Gesto de scroll vertical (XCUITest). El área se resuelve sobre el grid real.
    @driver.execute_script('mobile: scroll', direction: 'down')
  end

  def scroll_hasta_final(max_intentos = Integer(ENV.fetch('CD_MAX_SCROLL', '50')))
    max_intentos.times { scroll_abajo }
  end
end
