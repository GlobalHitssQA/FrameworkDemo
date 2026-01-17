Feature: SIAC transaction typification verification for B2B2C package purchase

  Scenario: Verify that SIAC system correctly registers package code and associated line in transaction typifications
    Given the user is authenticated in SIAC Unico system
    And a line with SOLD plan is identified
    And the B2B2C 12GB package code is identified in BSCS7 configuration
    When the user purchases the B2B2C 12GB package for the identified line from GM platform
    And the user queries the transaction typification in SIAC Unico
    Then the registered package code matches exactly the B2B2C 12GB package code
    And the registered line number matches exactly the line used for the transaction