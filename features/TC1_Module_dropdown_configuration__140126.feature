Feature: Module dropdown configuration visibility
  As a PASE Administrator
  I want to see the module dropdown list on the Product Configuration screen
  So that I can configure products for different modules

  Scenario: Validate module dropdown list is displayed correctly on Product Configuration screen
    Given I am logged in as a PASE Administrator with access to the Payments Module
    When I navigate to the Product Configuration screen
    Then I should see the module dropdown field above the create products section
    And I click on the module dropdown
    Then the system should display the available modules for product configuration