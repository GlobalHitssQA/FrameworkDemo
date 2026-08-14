# language: en
Feature: Paginación / carga incremental en la Sección Fotos (Galería) de Claro Drive iOS
  Como usuario de Claro Drive iOS con una cuenta de alto volumen de imágenes
  Quiero que la Galería cargue los lotes de imágenes por paginación de forma fluida
  Para navegar la secuencia completa sin duplicados, saltos ni fallos al llegar al final

  Background:
    Given la app Claro Drive iOS está instalada y actualizada con la optimización de CDIS-10000
    And el usuario tiene sesión iniciada con la cuenta de prueba
    And la sección Fotos (Galería) está accesible
    And se cuenta con conectividad estable

  @PruebaGeneradaIA @TC005
  Scenario: Verificar que la paginación carga nuevos lotes de imágenes de forma fluida sin duplicados ni saltos al hacer scroll
    Given la cuenta de prueba tiene más de 10000 imágenes ordenadas cronológicamente
    When abro la sección Fotos (Galería) y observo la carga del primer lote de imágenes
    Then el primer lote de imágenes se carga y renderiza correctamente en orden secuencial
    When realizo scroll hacia abajo para disparar la carga incremental del siguiente lote de imágenes
    Then la paginación carga el nuevo lote de forma fluida y continua con la secuencia sin interrupciones
    When continúo el scroll disparando la carga de varios lotes consecutivos de imágenes
    Then cada lote se carga de forma fluida y la secuencia continúa sin saltos ni discontinuidades
    When reviso visualmente la secuencia de imágenes cargadas en los lotes recorridos
    Then no se presentan imágenes duplicadas entre lotes ni dentro de un mismo lote
    When verifico la continuidad de la secuencia entre el final de un lote y el inicio del siguiente
    Then la secuencia de imágenes es continua sin saltos ni omisiones en las transiciones entre lotes

  @PruebaGeneradaIA @TC006
  Scenario: Validar el comportamiento de la Galería al alcanzar el final del listado durante la carga incremental
    Given la cuenta de prueba tiene un volumen finito y conocido de imágenes
    When abro la sección Fotos (Galería) con la cuenta de prueba de volumen conocido
    Then la Galería carga el primer lote de imágenes correctamente
    When realizo scroll continuo hasta cargar todos los lotes disponibles y aproximarme al final del listado
    Then la paginación carga progresivamente todos los lotes hasta acercarse a la última imagen de la cuenta
    When continúo el scroll hasta alcanzar la última imagen del listado de la Galería
    Then la Galería muestra la última imagen indexada y detiene la carga incremental sin solicitar lotes inexistentes
    When intento realizar scroll adicional más allá de la última imagen del listado
    Then la Galería permanece estable en el final del listado sin espacios en blanco, errores, cargas fallidas ni crashes
