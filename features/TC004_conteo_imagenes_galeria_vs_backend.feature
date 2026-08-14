# language: en
Feature: Conteo de imagenes en Galeria iOS vs Backend/API
  Como usuario autenticado de la app iOS de Claro Drive
  quiero que el total de imagenes mostrado en la Galeria coincida con el total reportado por el backend
  para garantizar la consistencia del conteo cuando se carga la totalidad de una cuenta

  Background:
    Given el usuario esta autenticado en la app iOS de Claro Drive
    And la app esta actualizada con la optimizacion de CDIS-10000
    And la cuenta de prueba tiene un volumen conocido de imagenes indexadas
    And se dispone de acceso al backend/API para consultar el total reportado

  @PruebaGeneradaIA @TC004
  Scenario: Comparar el conteo total de imagenes de la Galeria contra el total reportado por el backend/API
    When consulto el endpoint del backend/API que reporta el total de imagenes indexadas para la cuenta de prueba
    Then el backend responde con el total de imagenes indexadas en una respuesta exitosa
    When abro la seccion Fotos y hago scroll hasta cargar la totalidad de las imagenes de la cuenta
    Then la Galeria carga y muestra todas las imagenes disponibles hasta el final del listado
    When obtengo el conteo total de imagenes visibles mostrado por la app en la seccion Fotos
    Then la app expone un conteo total de imagenes correspondiente a la cuenta de prueba
    When comparo el conteo total mostrado en la Galeria contra el total reportado por el backend/API
    Then ambos totales coinciden exactamente reflejando el 100% de las imagenes indexadas en la Galeria
