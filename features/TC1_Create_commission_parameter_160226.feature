Feature: Create commission parameter

  Scenario: User creates a new commission parameter successfully
    Given the user is on the product management page
    When the user selects a module from the dropdown
    And the user clicks on the create parameter button
    And the user fills the commission type field with "Comisión Estándar"
    And the user selects the charge type from dropdown
    And the user enters the value "10"
    And the user selects the commission start date
    And the user clicks the accept button
    Then the new parameter should be displayed in the commission parameters table