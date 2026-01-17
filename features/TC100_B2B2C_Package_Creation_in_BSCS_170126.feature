Feature: B2B2C Package Creation in BSCS7
  As a system administrator
  I want to create a B2B2C 36GB package with 36 months validity
  So that General Motors SOLD plan users can access this data package

  Scenario: Create B2B2C 36GB package with 36 months validity for SOLD plan
    Given I am logged into BSCS7 system with authorized user
    And I can see the main package configuration screen
    When I navigate to B2B2C package creation module
    And I select the option to create a new package
    Then I should see the package creation form with capacity, cost, validity and classification fields
    When I enter package capacity as "36GB"
    And I enter package cost without IGV as "76.27"
    And I enter package validity as "1080" days
    And I select classification as "B2B2C"
    Then the system should validate and accept the entered data
    When I configure restriction for local consumption only
    And I disable roaming option
    And I enable queuing option
    Then the system should register coverage and queuing restrictions correctly
    When I save the B2B2C 36GB package configuration
    Then I should see a successful creation confirmation message
    And the B2B2C 36GB package should appear in the SOLD plan available packages list
    And the package should display all configured data correctly