Feature: Get Internet Balance API Consultation
  As a customer with an active SOLD plan
  I want to query my data package balance via GetInternetBalance API
  So that I can know my current consumption status

  Scenario: Verify data package balance consultation via GetInternetBalance API
    Given the user is authenticated in the system
    And the line is active with SOLD plan and assigned packages
    And the GetInternetBalance API is available
    And the connection to BSCS7 is active
    When I invoke the GetInternetBalance API with SOLD plan line parameters
    Then the API should return a successful response code with balance information
    And the response should include TRIAL 6GB package details if active
    And the response should show total capacity consumed capacity remaining capacity and expiration date for TRIAL 6GB
    And the response should include B2B2C package details if active
    And the response should show total capacity consumed capacity remaining capacity and expiration date for B2B2C packages
    And the balance values should match the consumption records in BSCS7 UDR_LT_01 table