Feature: Parameter Creation in Product Management

  Scenario: Successfully create a new commission parameter
    Given the user is on the product parameters configuration page
    When the user selects a module from the dropdown
    And the user clicks the create parameter button
    And the user fills the commission type field with "Standard Commission"
    And the user fills the charge type field with "Fixed"
    And the user fills the value field with "10"
    And the user selects the commission start date
    And the user clicks the accept button
    Then the new parameter should be visible in the parameters table