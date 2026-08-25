# language: en
Feature: Creación de sesión de vinculación vía Link Sessions API v2
  Como cliente de la app Smart TV
  quiero invocar el servicio de creación de sesión de vinculación con un redirectUrl válido
  para obtener el redirectUrl y el qrCode necesarios para el enlace de vinculación

  Background:
    Given existe una URL de redirección válida con los 5 parámetros de dispositivo
    And existe un token Bearer de sesión autenticada vigente
    And el endpoint de creación de sesión de vinculación está disponible sobre HTTPS

  @PruebaGeneradaIA @QA-CP007
  Scenario: Invocar link-sessions con redirectUrl válido y extraer redirectUrl y qrCode ante HTTP 200
    When se serializa el cuerpo de la solicitud con el parámetro redirectUrl
    And se envía la petición POST de creación de sesión de vinculación con el payload redirectUrl
    Then el servicio responde con estatus HTTP 200
    And la respuesta se deserializa y se obtiene el objeto data de la sesión de vinculación
    And se extraen los campos data.redirectUrl y data.qrCode con valores válidos y no vacíos
