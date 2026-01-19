Feature: Duplicate name validation for products and commission types

  Scenario: System prevents creation of products and commission types with duplicate names
    Given the user is authenticated as Administrator in PASE system
    And the user navigates to the Create Product section in Product Configuration
    When the user enters an existing product name in the product name field
    Then the error message "El nombre ya existe" is displayed in red below the input field
    And the Accept button remains disabled
    When the user modifies the name to a unique name that does not exist
    Then the error message disappears
    And the Accept button becomes enabled
    When the user opens the New Parameter modal to create a new Commission Type
    And the user enters an existing commission type name
    Then the error message "El nombre ya existe" is displayed in red below the commission type field
    And the Accept button in the modal remains disabled