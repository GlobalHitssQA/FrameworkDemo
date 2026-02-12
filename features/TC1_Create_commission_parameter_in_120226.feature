Feature: Create commission parameter in PASE product configuration

  Scenario: Successfully create a new commission parameter with all required fields
    Given the user is authenticated as PASE Administrator and on the product configuration screen
    When the user navigates to the commission parameters section
    Then the Create parameter button should be visible
    When the user clicks the Create parameter button
    Then a modal with title New Parameter should be displayed
    And the modal should contain Commission type, Charge type, Value and Commission start date fields
    When the user selects an existing commission type from the dropdown
    Then the selected value should be displayed in the Commission type field
    When the user selects a charge type from the dropdown
    Then the selected value should be displayed in the Charge type field
    When the user enters a valid numeric value in the Value field
    Then the entered value should be displayed in the Value field
    When the user selects a date from the Commission start date calendar
    Then the selected date should be displayed in the Commission start date field
    When the user clicks the Accept button
    Then the modal should close
    And the new parameter should be displayed in the Commission parameters table