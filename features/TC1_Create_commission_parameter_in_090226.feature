Feature: Create commission parameter in Product Configuration

  Scenario: Successfully create a new commission parameter with all required fields
    Given the user is authenticated as Administrator in PASE
    And the user is on the Product Configuration screen in the Payments Module
    And a module is selected in the modules dropdown
    When the user navigates to the Commission Parameters section
    Then the Create Parameter button should be visible
    When the user clicks the Create Parameter button
    Then a modal with title New Parameter should be displayed
    And the modal should contain Commission Type field
    And the modal should contain Charge Type field
    And the modal should contain Value field
    And the modal should contain Commission Start Date field
    And the Accept button should be disabled
    When the user selects a value from the Commission Type dropdown
    Then the Commission Type field should display the selected value
    When the user selects a value from the Charge Type dropdown
    Then the Charge Type field should display the selected value
    When the user enters a valid numeric value in the Value field
    Then the Value field should display the entered value
    When the user selects a valid date in the Commission Start Date calendar
    Then the Commission Start Date field should display the selected date
    And the Accept button should be enabled
    When the user clicks the Accept button
    Then the modal should close
    And the new commission parameter should appear in the Commission Parameters table