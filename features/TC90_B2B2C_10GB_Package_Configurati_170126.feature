Feature: B2B2C 10GB Package Configuration
  As a system administrator
  I want to configure the B2B2C 10GB package in BSCS7
  So that General Motors corporate accounts can use it with the correct parameters

  Scenario: Configure B2B2C 10GB package with correct capacity, validity and cost
    Given I am logged into the BSCS7 package administration module
    When I create a new package with identifier "B2B2C 10GB"
    And I set the package capacity to "10" GB
    And I set the package validity to "30" days
    And I set the package cost to "21.19" without taxes
    And I set the package category to "B2B2C"
    And I link the package to General Motors corporate accounts with "SOLD" plan
    And I configure usage restriction to local navigation only without roaming
    And I configure consumption rules with queuing enabled and unlimited activations
    And I save the package configuration
    Then the package "B2B2C 10GB" should be stored in the BSCS7 parametric tables
    And the package should be available through the BuyProduct API
    And the package should be available through the GetInternetBalance API