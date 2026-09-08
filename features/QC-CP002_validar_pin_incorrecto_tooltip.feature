# language: en
@PruebaGeneradaIA @QC-CP002
Feature: Validar PIN incorrecto muestra tooltip de error en canal bloqueado desde EPG
  Como usuario autenticado en TV en vivo de ClaroVideo (Android TV / Fire TV)
  quiero ver un mensaje de error claro al ingresar un PIN incorrecto en un canal bloqueado
  para saber que el PIN no es válido y poder reintentar sin obtener acceso al evento.

  Background:
    Given el usuario está autenticado en TV en vivo
    And el canal seleccionado está bloqueado
    And el usuario tiene un PIN de seguridad configurado
    And la guía de programación EPG está abierta

  Scenario: Mostrar tooltip de error al ingresar un PIN de seguridad incorrecto
    When selecciona un evento de un canal bloqueado desde la EPG
    Then el sistema despliega la pantalla de ingreso de PIN de seguridad
    When ingresa un PIN de seguridad incorrecto
    And confirma el ingreso del PIN de seguridad
    Then el sistema muestra el tooltip de error "El PIN de seguridad no es válido, verifícalo"
    And la pantalla de PIN permanece visible y no se concede acceso al evento
    And la pantalla de PIN permite reintentar el ingreso del PIN de seguridad
