Feature: Parameter Management in PASE Product Configuration

  Scenario: Create a new commission parameter successfully
    Given the user is logged into the PASE system
    And the user navigates to the product configuration page
    When the user selects a module from the dropdown list
    And the user clicks the Create Parameter button
    Then the New Parameter modal should be displayed
    When the user selects a commission type
    And the user selects a charge type
    And the user enters a valid value
    And the user selects a commission start date
    And the user clicks the Accept button
    Then the new parameter should appear in the commission parameters table
    And a success message should be displayed