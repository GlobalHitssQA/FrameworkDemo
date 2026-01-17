Feature: B2B2C Package Creation in BSCS7
  As a system administrator
  I want to create a B2B2C 36GB package with 12 months validity
  So that it is available for the SOLD plan of General Motors

  Scenario: Create B2B2C 36GB package with 12 months validity for SOLD plan
    Given I am logged into BSCS7 system with an authorized user
    And the main package configuration screen is displayed
    When I navigate to the B2B2C package creation module
    And I select the option to create a new package
    Then the package creation form is displayed with capacity, cost, validity and classification fields
    When I enter the package capacity as "36" GB
    And I enter the cost without IGV as "63.56" soles
    And I enter the validity as "12" months
    And I select the classification as "B2B2C"
    Then the system validates and accepts the entered data
    When I configure the restriction for local consumption only
    And I disable roaming for the package
    And I enable queuing for the package
    Then the system registers the coverage and queuing restrictions correctly
    When I save the B2B2C 36GB package configuration
    Then the system displays a successful creation confirmation message
    And the B2B2C 36GB package with 12 months validity appears in the available packages list for SOLD plan
    And all configured data is displayed correctly in the package catalog