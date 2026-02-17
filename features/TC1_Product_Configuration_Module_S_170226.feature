Feature: Product Configuration Module Selection
  As an administrator user
  I want to select a module from the dropdown list
  So that I can enable and configure products

  Scenario: Verify module selection enables product configuration section
    Given the user is authenticated as PASE Administrator
    And the user navigates to the Payments Module
    When the user accesses the Product Configuration screen
    Then the module dropdown list should be visible at the top of the screen
    And the product configuration section should be disabled
    When the user attempts to configure products without selecting a module
    Then the system should prevent product configuration actions
    When the user selects an available module from the dropdown
    Then the selected module should be displayed in the dropdown field
    And the product configuration section should be enabled