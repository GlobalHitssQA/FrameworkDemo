Feature: B2B2C Package Creation in BSCS7

  Scenario: Create B2B2C 480GB package with 24 months validity for SOLD plan
    Given the user is authenticated in BSCS7 with package configuration permissions
    And the SOLD plan is configured in the system
    When the user navigates to the B2B2C package creation module
    And the user selects the option to create a new package
    Then the system displays the package creation form with capacity, cost, validity and classification fields
    When the user enters package data with capacity "480GB" cost "550.85" validity "24" months and classification "B2B2C"
    Then the system validates and accepts the entered data
    When the user configures restrictions with local consumption only without roaming and queuing enabled
    Then the system registers the coverage and queuing restrictions correctly
    When the user saves the B2B2C 480GB package configuration
    Then the system creates the package and displays a successful creation confirmation message
    When the user verifies the package in the available packages list for SOLD plan
    Then the system displays the B2B2C 480GB package with 24 months validity in the catalog with all configured data