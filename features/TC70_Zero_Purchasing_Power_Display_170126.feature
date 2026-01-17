Feature: Zero Purchasing Power Display
  As a user of Acticenter
  I want to see zero value displayed for purchasing power when a contract has no balance
  So that I can verify all monetary items are shown even with zero values

  Scenario: Verify purchasing power shows zero when contract has no balance
    Given the user is authenticated in Acticenter
    When the user selects a Casa de Bolsa contract without purchasing power balance
    And the user clicks on the total value component to expand the breakdown
    Then the popup with all applicable items should be displayed
    And the Purchasing Power MXN item should be visible in the breakdown
    And the Purchasing Power MXN value should display zero point zero zero
    And the Purchasing Power MXN item should remain visible with zero value