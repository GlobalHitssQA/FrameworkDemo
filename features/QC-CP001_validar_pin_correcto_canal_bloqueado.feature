# language: en
@PruebaGeneradaIA @QC-CP001
Feature: Validar PIN correcto y acceder al evento en canal bloqueado desde EPG
  Como usuario autenticado en TV en vivo de ClaroVideo (Android TV / Fire TV)
  quiero ingresar el PIN de seguridad correcto en un canal bloqueado
  para acceder y visualizar el evento sin que se me vuelva a solicitar el PIN.

  Background:
    Given el usuario está autenticado en TV en vivo
    And el canal seleccionado está bloqueado
    And el usuario tiene un PIN de seguridad configurado
    And la guía de programación EPG está abierta

  Scenario: Acceder al evento de un canal bloqueado ingresando el PIN correcto
    When selecciona un evento de un canal bloqueado desde la EPG
    Then el sistema despliega la pantalla de ingreso de PIN de seguridad
    When ingresa el PIN de seguridad correcto configurado
    And confirma el ingreso del PIN de seguridad
    Then el servicio de validación responde que el PIN es válido
    And el usuario accede y visualiza el evento del canal bloqueado sin volver a solicitar el PIN
