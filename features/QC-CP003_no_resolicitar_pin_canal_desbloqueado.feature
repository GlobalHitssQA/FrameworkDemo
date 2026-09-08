# language: en
@PruebaGeneradaIA @QC-CP003
Feature: No re-solicitar PIN al realizar acciones en el mismo canal ya desbloqueado
  Como usuario autenticado en TV en vivo de ClaroVideo (Android TV / Fire TV)
  quiero que, tras desbloquear un canal con el PIN correcto, no se me vuelva a pedir el PIN
  mientras permanezco en ese mismo canal
  para poder ejecutar acciones sobre sus eventos sin fricción.

  Background:
    Given el usuario está autenticado en TV en vivo
    And el canal seleccionado está bloqueado
    And el usuario tiene un PIN de seguridad configurado
    And la guía de programación EPG está abierta

  Scenario: Persistencia del desbloqueo del canal durante la permanencia del usuario
    Given el canal actual fue desbloqueado previamente con el PIN correcto
    Then el evento del canal se visualiza sin la pantalla de PIN activa
    When ejecuta una acción sobre un evento del mismo canal desbloqueado
    Then la acción se ejecuta sin desplegar la pantalla de ingreso de PIN
    When ejecuta una segunda acción sobre otro evento del mismo canal desbloqueado
    Then la acción se ejecuta sin volver a solicitar el PIN de seguridad
    And el canal se mantiene desbloqueado y no se re-solicita el PIN mientras el usuario permanece en el canal
