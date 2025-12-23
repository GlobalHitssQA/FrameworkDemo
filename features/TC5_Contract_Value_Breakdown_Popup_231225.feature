Feature: Contract Value Breakdown Popup Validation in Responsive Views
  As an authenticated user
  I want to validate the contract value breakdown popup behavior
  So that it opens and closes correctly across different banking segments and responsive orientations

  Background:
    Given the user is authenticated in Acticenter
    And test contracts are available for Banca Patrimonial, Banca Privada and Wealth Management
    And the browser is configured for responsive testing

  Scenario: Validate popup behavior in Responsive Landscape and Portrait for Banca Patrimonial
    Given the application is accessed in Responsive Landscape view for Banca Patrimonial with Persona Fisica contract
    Then the application should display correctly in Landscape mode
    When the user clicks on any part of the total contract value component
    Then the popup with contract value breakdown should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly
    When the user changes to Responsive Portrait view for Banca Patrimonial
    Then the application should adapt correctly to Portrait mode
    When the user clicks on the total contract value component
    Then the popup with contract value breakdown should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly

  Scenario: Validate popup behavior in Responsive Landscape and Portrait for Banca Privada
    Given the application is accessed in Responsive Landscape view for Banca Privada with Persona Moral contract
    Then the application should display correctly for Banca Privada in Landscape mode
    When the user clicks on the total contract value component
    Then the popup with contract value breakdown should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly
    When the user changes to Responsive Portrait view for Banca Privada
    Then the application should adapt correctly to Portrait mode
    When the user clicks on the total contract value component
    Then the popup with contract value breakdown should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly

  Scenario: Validate popup behavior in Responsive Landscape and Portrait for Wealth Management
    Given the application is accessed in Responsive Landscape view for Wealth Management
    Then the application should display correctly for Wealth Management in Landscape mode
    When the user clicks on the total contract value component
    Then the popup with contract value breakdown should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly
    When the user changes to Responsive Portrait view for Wealth Management
    Then the application should adapt correctly to Portrait mode
    When the user clicks on the total contract value component
    Then the popup with contract value breakdown should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly in all responsive views