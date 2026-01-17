Feature: TRIAL 6GB Package Creation in BSCS7

  Scenario: Create TRIAL 6GB package with correct attributes in BSCS7
    Given the user is logged into BSCS7 package configuration module
    When the user creates a new package with code "TRIAL 6GB"
    And the user configures the package with capacity "6" GB and validity "90" days
    And the user sets the package cost to "7.58" PEN without tax and type "TRIAL"
    And the user associates the package to "SOLD" rate plan with local navigation only
    And the user configures queuing with single consumption and unlimited activations
    And the user saves the package configuration
    Then the package "TRIAL 6GB" should be registered in BSCS7 tables
    And the package should be available in BuyProduct API for GM provisioning