# frozen_string_literal: true

require 'selenium-webdriver'

# Page Object de la sección Fotos (Galería) de la app iOS de Claro Drive.
# Encapsula la interacción de UI: navegación, scroll de paginación,
# lectura del contador total y recolección de identificadores de imágenes.
#
# Prioridad de locators: id > name > CSS semántico > XPath.
# NOTA: los locators reales de la app iOS no fueron provistos en el caso.
# Se dejan marcas TODO para completarlos con los valores reales del inspector
# (accessibility id / name). No se fabrican selectores.
class GalleryPage
  def initialize(driver)
    @driver = driver
  end

  # --- Locators (completar con valores reales) ---
  # TODO: reemplazar por el locator real de la sección Fotos / pestaña Galería.
  FOTOS_TAB = { id: 'TODO_fotos_tab_id' }.freeze
  # TODO: reemplazar por el locator real del contenedor del listado de imágenes.
  GALLERY_LIST = { id: 'TODO_gallery_list_id' }.freeze
  # TODO: reemplazar por el locator real del contador total de elementos.
  TOTAL_COUNTER = { id: 'TODO_total_counter_id' }.freeze
  # TODO: reemplazar por el locator real de cada celda/imagen de la galería.
  GALLERY_ITEM = { css: 'TODO_gallery_item_css' }.freeze
  # TODO: reemplazar por el locator real del indicador de carga (spinner).
  LOADING_SPINNER = { id: 'TODO_loading_spinner_id' }.freeze
  # TODO: reemplazar por el locator real del indicador de fin de listado.
  END_OF_LIST = { id: 'TODO_end_of_list_id' }.freeze

  # Navega a la sección Fotos (Galería) y espera el primer lote.
  def open_gallery
    click(FOTOS_TAB)
    wait_for_list_ready
  end

  # Espera a que el contenedor del listado esté presente.
  def wait_for_list_ready
    wait.until { element_present?(GALLERY_LIST) }
  end

  # ¿El primer lote está cargado y visible sin errores?
  def first_batch_loaded?
    element_present?(GALLERY_LIST) && !gallery_item_ids.empty?
  end

  # Realiza scroll descendente hasta cargar todos los lotes y llegar al final.
  # Devuelve la lista acumulada de identificadores de imágenes en orden de carga.
  # rubocop:disable Metrics/MethodLength
  def scroll_to_end_collecting_ids
    collected = []
    stable_rounds = 0
    max_iterations = ENV.fetch('GALLERY_MAX_SCROLLS', '2000').to_i

    max_iterations.times do
      current = gallery_item_ids
      new_items = current - collected
      collected.concat(new_items)

      if new_items.empty?
        stable_rounds += 1
        break if stable_rounds >= 2
      else
        stable_rounds = 0
      end

      scroll_down
      wait_for_batch_settled
    end

    collected
  end
  # rubocop:enable Metrics/MethodLength

  # Lee el contador total de elementos mostrado por la app.
  def displayed_total
    text = find(TOTAL_COUNTER).text
    text.gsub(/\D/, '').to_i
  end

  # Texto crudo del contador (para validar que sea visible y legible).
  def displayed_total_text
    find(TOTAL_COUNTER).text
  end

  # Identificadores de las imágenes actualmente presentes en el DOM/árbol.
  def gallery_item_ids
    @driver.find_elements(**GALLERY_ITEM).map do |el|
      el.attribute('id') || el.attribute('name') || el.text
    end.reject { |v| v.nil? || v.empty? }
  end

  # ¿La app muestra el estado de fin de listado de forma controlada?
  def end_of_list_reached?
    element_present?(END_OF_LIST)
  end

  # ¿Hay un spinner de carga infinito activo?
  def loading_spinner_visible?
    element_present?(LOADING_SPINNER)
  end

  private

  def scroll_down
    @driver.execute_script('mobile: scroll', direction: 'down')
  rescue Selenium::WebDriver::Error::WebDriverError
    # Fallback genérico si el comando móvil no está disponible en el driver.
    @driver.action.send_keys(:page_down).perform
  end

  def wait_for_batch_settled
    wait.until { !loading_spinner_visible? }
  rescue Selenium::WebDriver::Error::TimeoutError
    # El batch pudo estabilizarse sin spinner observable; continuar.
  end

  def click(locator)
    find(locator).click
  end

  def find(locator)
    @driver.find_element(**locator)
  end

  def element_present?(locator)
    !@driver.find_elements(**locator).empty?
  end

  def wait
    Selenium::WebDriver::Wait.new(timeout: ENV.fetch('EXPLICIT_WAIT', '30').to_i)
  end
end
