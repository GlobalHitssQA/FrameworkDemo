# language: en
@PruebaGeneradaIA @TC007
Feature: Paginación incremental de la Galería iOS sin duplicados ni saltos
  Como usuario autenticado en la app iOS de Claro Drive
  Quiero que la paginación incremental cargue los lotes de forma continua
  Para verificar que no existan imágenes duplicadas ni saltos con una cuenta de 10,000 imágenes

  Background:
    Given el usuario está autenticado en la app iOS de Claro Drive
    And la cuenta de prueba tiene 10000 imágenes indexadas en orden cronológico conocido
    And el dispositivo es un iPhone 13/14 con iOS 16/17
    And existe conectividad WiFi estable

  @Aceptacion @HPP
  Scenario: Verificar paginación incremental sin duplicados ni saltos al hacer scroll en Galería con cuenta de 10,000 imágenes
    When se navega a la sección Fotos y se espera la carga del primer lote de imágenes
    Then el primer lote de imágenes se carga y muestra en orden correcto sin errores
    When se realiza scroll descendente para disparar la carga de lotes sucesivos de paginación
    Then cada nuevo lote se carga de forma fluida y se concatena de manera continua al listado previo
    When se inspeccionan los límites entre lotes cargados buscando imágenes repetidas
    Then no se observan imágenes duplicadas entre lotes ni dentro del listado
    And la secuencia cronológica entre el final de un lote y el inicio del siguiente es correlativa y completa sin saltos ni discontinuidades
