# language: en
Feature: Consistencia de la metadata del panel con la información del backend
  Como responsable de calidad
  quiero verificar que la metadata mostrada en el panel del player coincide con la del backend
  para garantizar la integridad de la información del evento en vivo

  Background:
    Given el usuario tiene sesión iniciada en la app de TV
    And el usuario tiene derecho de reproducción para el evento en vivo
    And el backend de metadata está disponible para el evento en vivo

  @PruebaGeneradaIA @QA-CP004
  Scenario: La metadata mostrada en el panel coincide con la respuesta del backend
    When se accede al evento en vivo y se dispara la solicitud de metadata del panel hacia el backend
    Then el backend responde con estatus HTTP 200 y el payload de metadata del evento
    And la respuesta del backend contiene la estructura de metadata con las llaves definidas en los insumos
    And cada campo de metadata mostrado en el panel coincide exactamente con el valor entregado por el backend
    And los valores mostrados respetan el conteo de caracteres definido sin truncamientos ni desbordes
