Feature: B2B2C Package Creation in BSCS7
  As an authorized user in BSCS7
  I want to create a B2B2C package with 24GB capacity and 24 months validity
  So that the SOLD plan for General Motors has the correct data package available

  Scenario: Create B2B2C 24GB package with 24 months validity for SOLD plan
    Given I am logged into BSCS7 system with authorized user credentials
    And I can see the main package configuration screen
    When I navigate to the B2B2C package creation module
    And I select the option to create a new package
    Then I should see the package creation form with capacity, cost, validity and classification fields
    When I enter the package capacity as "24" GB
    And I enter the cost without IGV as "46.61" soles
    And I enter the validity as "720" days
    And I select the classification as "B2B2C"
    Then the system should validate and accept the entered data
    When I configure the restriction for local consumption only
    And I configure roaming as disabled
    And I enable queuing
    Then the system should register the coverage and queuing restrictions correctly
    When I save the B2B2C 24GB package configuration
    Then I should see a confirmation message for successful package creation
    When I verify the package in the available packages list for SOLD plan
    Then I should see the B2B2C 24GB package with 24 months validity in the catalog
    And all configured data should be displayed correctly