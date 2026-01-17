Feature: B2B2C 6GB Package Creation
  As a configuration administrator
  I want to create the B2B2C 6GB package with correct parameters
  So that it is available for corporate GM accounts

  Scenario: Create B2B2C 6GB package with 6GB capacity, 1 month validity and cost S/. 16.95 without IGV
    Given I am logged into BSCS7 with configuration permissions
    And I access the package configuration module
    Then the system displays the package administration interface
    When I create a new package with code "B2B2C 6GB"
    Then the system allows entering the B2B2C 6GB package code
    When I configure the package parameters with capacity "6" GB and validity "30" days and cost "16.95" without IGV and type "B2B2C"
    Then the system accepts all corporate-consumer package attributes
    When I associate the package to corporate accounts with SOLD plan
    Then the package is linked to B2B2C model for General Motors
    When I configure local navigation only without roaming coverage
    Then the system sets the restriction for local network use only
    When I set queueing rules with one active package at a time and unlimited activations
    Then the consumption and activation rules are configured correctly
    When I save and verify the package registration in BSCS7 tables
    Then the B2B2C 6GB package is stored and available for provisioning
    When I validate the package is accessible from GM APIs via BuyProduct
    Then the package appears in the list of products available for API purchase