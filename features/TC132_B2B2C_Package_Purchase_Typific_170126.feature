Feature: B2B2C Package Purchase Typification in SIAC

  Scenario: Verify typification in SIAC when purchasing a B2B2C 720GB package from GM platform
    Given I am logged into SIAC Unico with valid credentials
    When I purchase a B2B2C 720GB package with 36 months validity from GM platform for a SOLD plan line
    And I query the transaction typification in SIAC Unico
    Then the system displays the B2B2C 720GB package purchase record
    And the typification shows date, time and user who performed the operation
    And the typification shows the B2B2C 720GB package code, 36 months validity and associated line number