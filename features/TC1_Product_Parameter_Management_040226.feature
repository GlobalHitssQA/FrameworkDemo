Feature: Product Parameter Management

  Scenario: Create a new commission parameter for a selected module
    Given the user is on the product parameter configuration page
    When the user selects a module from the dropdown
    And the user clicks the create parameter button
    And the user fills in the new parameter form with valid data
    And the user confirms the new parameter creation
    Then the new parameter should be displayed in the parameters list