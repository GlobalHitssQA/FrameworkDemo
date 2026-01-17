Feature: Capital Market Value Verification
  As a user with an authenticated session
  I want to verify the Capital Market section value
  So that I can confirm it matches the accumulated monetary value of capital market investments

  Scenario: Verify Capital Market value matches accumulated investment value
    Given I am authenticated in Acticenter
    And I have selected a contract with known capital market investments
    And I have obtained the reference value from the source system
    When I click on the Total Contract Value component
    Then the breakdown popup should be displayed with all sections
    And I should see the Capital Market section with its monetary value
    And the Capital Market value should match the reference value
    And the value should have currency format and be right-aligned