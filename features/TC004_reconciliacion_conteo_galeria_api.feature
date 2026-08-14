# language: en
@PruebaGeneradaIA @TC004
Feature: Reconciliación de conteo de imágenes entre Galería iOS y backend/API
  Como usuario autenticado en la app iOS de Claro Drive
  Quiero que el total de imágenes mostrado en la Galería coincida con el total reportado por el backend/API
  Para garantizar la consistencia del conteo cuando la cuenta contiene 10,000 elementos

  Background:
    Given el usuario está autenticado en la app iOS de Claro Drive
    And la cuenta de prueba tiene 10000 imágenes indexadas
    And existe conectividad WiFi estable

  @Integracion @TTP
  Scenario: Comparar el conteo total de imágenes visibles en Galería contra el total reportado por la API para una cuenta de 10,000 elementos
    When se consulta el endpoint del backend que retorna el total de imágenes indexadas de la cuenta
    Then la API responde con código 200 y un total de 10000 imágenes
    When se navega a la sección Fotos y se carga por completo el listado mediante scroll hasta el final
    Then la Galería termina de cargar todos los lotes y muestra el contador total de elementos
    And el total mostrado por la app en la sección Fotos es un valor numérico visible y legible
    Then el total reportado por la API y el total mostrado en la Galería coinciden exactamente en 10000 imágenes sin discrepancias
