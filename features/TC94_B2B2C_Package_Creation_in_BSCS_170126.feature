Feature: B2B2C Package Creation in BSCS7
  As a system administrator
  I want to create a B2B2C 60GB package with 12 months validity
  So that it is available for the SOLD plan of General Motors

  Scenario: Create B2B2C 60GB package with 12 months validity for SOLD plan
    Given I am logged into BSCS7 system with authorized credentials
    And I can see the main package configuration screen
    When I navigate to the B2B2C package creation module
    And I select the option to create a new package
    Then I should see the package creation form with capacity, cost, validity and classification fields
    When I enter the package capacity as "60GB"
    And I enter the cost without IGV as "93.22"
    And I enter the validity as "360" days
    And I select the classification as "B2B2C"
    Then the system should validate and accept the entered data
    When I configure the restriction for local consumption only
    And I disable roaming option
    And I enable the queuing option
    Then the system should register the coverage and queuing restrictions correctly
    When I save the B2B2C 60GB package configuration
    Then I should see a confirmation message for successful package creation
    And the B2B2C 60GB package should appear in the available packages list for SOLD plan
    And the package should display all configured data correctly