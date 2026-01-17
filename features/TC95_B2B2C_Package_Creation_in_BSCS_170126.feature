Feature: B2B2C Package Creation in BSCS7
  As a BSCS7 administrator
  I want to create a B2B2C 240GB package with 12 months validity
  So that the SOLD plan for General Motors has the correct data package available

  Scenario: Create B2B2C 240GB package with 12 months validity for SOLD plan
    Given I am logged into BSCS7 system with authorized credentials
    And I can see the main package configuration screen
    When I navigate to the B2B2C package creation module
    And I select the option to create a new package
    Then I should see the package creation form with capacity, cost, validity and classification fields
    When I enter the package capacity as "240" GB
    And I enter the cost without IGV as "296.61" soles
    And I select the validity as "12" months
    And I select the classification as "B2B2C"
    Then the system should validate and accept the entered data
    When I configure the restriction for local consumption only
    And I disable roaming for the package
    And I enable queuing for the package
    Then the system should register the coverage and queuing restrictions correctly
    When I save the B2B2C 240GB package configuration
    Then I should see a successful creation confirmation message
    When I navigate to the available packages list for SOLD plan
    Then I should see the B2B2C 240GB package with 12 months validity in the catalog
    And the package should display all configured data correctly