@PruebaGeneradaIA @QA-CP002
Feature: Consistencia de la metadata del panel del player de TV contra el backend
  Como equipo de QA de integración
  Quiero comparar la metadata mostrada en el panel contra la respuesta del backend
  Para garantizar que no existan diferencias entre la UI y el origen de datos

  Background:
    Given existe un evento en vivo con derecho de reproducción
    And el servicio de backend de metadata está disponible y devuelve datos válidos

  Scenario: Comparar campo por campo la metadata del panel contra la respuesta del backend
    When consulto la respuesta del backend de metadata del evento en vivo
    Then el backend responde con la estructura de metadata del evento en vivo
    When inicio la reproducción del evento en vivo y despliego el panel de metadata
    Then el panel de metadata se muestra con los datos del evento en vivo
    And cada campo del panel coincide exactamente con el valor provisto por el backend
    And los campos de metadata respetan el conteo máximo de caracteres definido sin desbordamiento
