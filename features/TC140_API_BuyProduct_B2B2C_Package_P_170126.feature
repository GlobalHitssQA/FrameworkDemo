Feature: API BuyProduct B2B2C Package Purchase
  As a GM platform operator
  I want to purchase a B2B2C package through the BuyProduct API
  So that the customer line gets the data package assigned correctly

  Scenario: Successfully purchase B2B2C 240GB package for an active SOLD line
    Given I have an active line in SOLD plan without B2B2C packages
    When I invoke the BuyProduct API through HUB APIGEE with the line number and B2B2C 240GB package code with 12 months validity
    Then the API should return a successful response with status code 200
    And the B2B2C 240GB package should be assigned to the line in BSCS7 with 240GB available and 360 days validity
    And the purchase should be registered in SIAC Unico with all package details
    And the package cost of 296.61 soles without IGV should be registered for monthly billing with cutoff day 28
    And the package should be configured for local navigation only without roaming