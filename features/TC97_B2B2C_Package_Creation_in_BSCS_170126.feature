Feature: B2B2C Package Creation in BSCS7
  As an authorized user with package configuration permissions
  I want to create a B2B2C 72GB package with 24 months validity
  So that it is available for the SOLD plan of General Motors

  Scenario: Successfully create B2B2C 72GB package with 24 months validity
    Given I am logged into BSCS7 system with authorized user credentials
    And the main package configuration screen is displayed
    When I navigate to the B2B2C package creation module
    And I select the option to create a new package
    Then the package creation form is displayed with capacity, cost, validity and classification fields
    When I enter the package capacity as "72" GB
    And I enter the cost without IGV as "118.64" soles
    And I enter the validity as "720" days
    And I select the classification as "B2B2C"
    Then the system validates and accepts the entered data
    When I configure the restriction for local consumption only
    And I disable roaming option
    And I enable queuing option
    Then the system registers the coverage and queuing restrictions correctly
    When I save the B2B2C 72GB package configuration
    Then the system displays a successful creation confirmation message
    And the B2B2C 72GB package appears in the available packages list for SOLD plan
    And the package displays all configured data correctly