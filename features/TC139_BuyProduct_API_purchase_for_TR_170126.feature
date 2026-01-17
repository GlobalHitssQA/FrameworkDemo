Feature: BuyProduct API purchase for TRIAL 6GB package

  Scenario: Successfully purchase TRIAL 6GB package via BuyProduct API from GM platform
    Given an active line exists in SOLD plan without active packages
    When I invoke the BuyProduct API through HUB APIGEE with line number and TRIAL 6GB package code
    Then the API should return a successful response with status code 200
    And the TRIAL 6GB package should be assigned to the line in BSCS7 with 6GB available and 90 days validity
    And the purchase should be registered in SIAC Unico with date time user package code and line
    And the package cost of 7.58 PEN without IGV should be registered for monthly billing with cutoff day 28