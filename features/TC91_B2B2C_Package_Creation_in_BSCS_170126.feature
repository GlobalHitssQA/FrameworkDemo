Feature: B2B2C Package Creation in BSCS7
  As an authorized BSCS7 user
  I want to create a B2B2C 20GB package with 1 month validity
  So that it is available for the SOLD plan of General Motors

  Scenario: Create B2B2C 20GB package with 1 month validity for SOLD plan
    Given I am logged into BSCS7 system with authorized user
    And the main package configuration screen is displayed
    When I navigate to B2B2C package creation module
    And I select the option to create a new package
    Then the package creation form is displayed with capacity, cost, validity and classification fields
    When I enter package capacity as "20GB"
    And I enter package cost without IGV as "38.14"
    And I enter package validity as "30" days
    And I select classification as "B2B2C"
    Then the system validates and accepts the entered data
    When I configure restriction for local consumption only
    And I configure restriction to disallow roaming
    And I enable queuing option
    Then the system registers coverage and queuing restrictions correctly
    When I save the B2B2C 20GB package configuration
    Then the system displays a successful creation confirmation message
    And the B2B2C 20GB package appears in the available packages list for SOLD plan
    And all configured data is displayed correctly in the package catalog