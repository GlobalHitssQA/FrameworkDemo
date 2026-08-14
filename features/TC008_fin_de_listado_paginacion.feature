# language: en
@PruebaGeneradaIA @TC008
Feature: Comportamiento de la Galería iOS al alcanzar el final del listado durante la paginación
  Como usuario autenticado en la app iOS de Claro Drive
  Quiero que la Galería detenga la carga de forma controlada al llegar al último elemento
  Para verificar el comportamiento del fin de listado con una cuenta de 15,000 o más imágenes

  Background:
    Given el usuario está autenticado en la app iOS de Claro Drive
    And la cuenta de prueba tiene 15000 imágenes indexadas
    And el dispositivo es un iPhone 15 Pro con iOS 17/18
    And existe conectividad WiFi estable

  @Sistema @TTP
  Scenario: Validar comportamiento de la Galería al alcanzar el final del listado durante la paginación con cuenta de 15,000+ imágenes
    When se navega a la sección Fotos con la cuenta de 15000 imágenes
    Then la sección Fotos carga el primer lote de imágenes correctamente
    When se realiza scroll descendente continuo hasta cargar todos los lotes y alcanzar el final del listado
    Then todos los lotes se cargan de forma incremental hasta llegar al último elemento del listado
    When se intenta continuar el scroll una vez alcanzado el último elemento de la Galería
    Then la app detiene la carga en el último elemento sin solicitar lotes inexistentes ni mostrar error y el listado no genera duplicados
    And al llegar al final del listado la Galería presenta el fin de forma controlada sin spinner infinito ni congelamiento y permanece estable
