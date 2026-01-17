Feature: B2B2C Package Creation in BSCS7
  As an authorized user in BSCS7
  I want to create a B2B2C 12GB package with 12 months validity
  So that the SOLD plan for General Motors has the correct data package available

  Scenario: Create B2B2C 12GB package with 12 months validity for SOLD plan
    Given I am logged into BSCS7 system with authorized user
    And the main package configuration screen is displayed
    When I navigate to the B2B2C package creation module
    And I select the option to create a new package
    Then the package creation form is displayed with capacity, cost, validity and classification fields
    When I enter the package capacity as "12GB"
    And I enter the cost without IGV as "29.66"
    And I enter the validity as "360" days
    And I select the classification as "B2B2C"
    Then the system validates and accepts the entered data
    When I configure the restriction for local consumption only
    And I configure roaming as disabled
    And I enable queuing
    Then the system registers the coverage and queuing restrictions correctly
    When I save the B2B2C 12GB package configuration
    Then the system displays a successful creation confirmation message
    And the B2B2C 12GB package with 12 months validity appears in the SOLD plan package catalog
    And all configured data is displayed correctly