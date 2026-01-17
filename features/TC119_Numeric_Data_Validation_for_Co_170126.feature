Feature: Numeric Data Validation for Contract Value Component
  As a user of Acticenter
  I want the system to validate numeric data from backend services
  So that contract values are displayed correctly and safely

  Scenario: Validate numeric data rendering from backend services
    Given the user is authenticated in Acticenter
    And the backend services are configured to return valid numeric values
    When the user selects an active contract
    Then all numeric values should be displayed with proper monetary format
    When the backend service returns negative values for a category
    Then the system should validate the received data before rendering
    And negative values should be displayed with the corresponding symbol or rejected according to business rules
    When the backend service returns values with extended decimals
    Then all amounts should be displayed with a maximum of two decimal places