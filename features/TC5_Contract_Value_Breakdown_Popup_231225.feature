Feature: Contract Value Breakdown Popup Validation
  As a user of Acticenter
  I want to validate the contract value breakdown popup behavior
  So that it opens and closes correctly across different responsive views and banking segments

  Background:
    Given the user is authenticated in Acticenter
    And test contracts are available for Banca Patrimonial, Privada and Wealth Management
    And responsive devices or emulators are configured

  Scenario: Validate popup behavior in Responsive Landscape and Portrait for Banca Patrimonial
    Given the user accesses Acticenter in Responsive Landscape view for Banca Patrimonial with Persona Fisica contract
    When the application loads
    Then the application should display correctly in Landscape mode
    When the user clicks on the total contract value component
    Then the contract value breakdown popup should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly
    When the user changes to Responsive Portrait view for Banca Patrimonial
    Then the application should adapt correctly to Portrait mode
    When the user clicks on the total contract value component
    Then the contract value breakdown popup should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly

  Scenario: Validate popup behavior in Responsive Landscape and Portrait for Banca Privada
    Given the user accesses Acticenter in Responsive Landscape view for Banca Privada with Persona Moral contract
    When the application loads
    Then the application should display correctly in Landscape mode for Banca Privada
    When the user clicks on the total contract value component
    Then the contract value breakdown popup should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly
    When the user changes to Responsive Portrait view for Banca Privada
    Then the application should adapt correctly to Portrait mode
    When the user clicks on the total contract value component
    Then the contract value breakdown popup should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly

  Scenario: Validate popup behavior in Responsive Landscape and Portrait for Wealth Management
    Given the user accesses Acticenter in Responsive Landscape view for Wealth Management
    When the application loads
    Then the application should display correctly in Landscape mode for Wealth Management
    When the user clicks on the total contract value component
    Then the contract value breakdown popup should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly
    When the user changes to Responsive Portrait view for Wealth Management
    Then the application should adapt correctly to Portrait mode
    When the user clicks on the total contract value component
    Then the contract value breakdown popup should be displayed
    When the user clicks outside the breakdown component
    Then the popup should close correctly in all responsive views