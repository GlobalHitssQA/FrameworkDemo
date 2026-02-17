Feature: Create commission parameter in PASE system

  Scenario: Create a new commission parameter with all required fields
    Given the user is authenticated as Administrator in PASE system
    And the user navigates to the Payments Module
    And the user selects a module from the dropdown list
    And the user accesses Step 1 of the Product Configuration screen
    Then the Commission Parameters section is displayed with only the Create Parameter button
    When the user clicks the Create Parameter button
    Then the New Parameter modal is displayed with fields Type of Commission, Type of Charge, Value and Commission Start Date
    When the user selects a value from the Type of Commission dropdown
    Then the system registers the selected commission type
    When the user selects a value from the Type of Charge dropdown
    Then the system registers the selected charge type
    When the user enters a numeric value in the Value field
    Then the system accepts the entered value
    When the user selects a date from the Commission Start Date calendar
    Then the system registers the selected start date
    And the Accept button is enabled
    When the user clicks the Accept button
    Then the modal closes and the new parameter appears in the Commission Parameters table