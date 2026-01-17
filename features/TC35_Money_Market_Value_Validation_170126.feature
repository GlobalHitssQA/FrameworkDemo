Feature: Money Market Value Validation
  As a user of Acticenter
  I want to verify that the Money Market section displays the correct accumulated value
  So that I can trust the investment breakdown information

  Scenario: Verify money market value matches accumulated investments
    Given I am authenticated in Acticenter
    And I have selected a contract with money market investments
    And I have obtained the reference value from the source system
    When I click on the total contract value component
    Then the popup with detailed value breakdown should be displayed
    And the money market value should match the reference value
    And the money market value should have currency format
    And the money market value should be right-aligned