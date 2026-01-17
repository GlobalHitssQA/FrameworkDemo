Feature: B2B2C Package Typification Verification in SIAC

  Scenario: Verify typification in SIAC when purchasing a B2B2C 6GB package from GM platform
    Given the user is logged into SIAC Unico with valid credentials
    When the user purchases a B2B2C 6GB package from GM platform for a SOLD plan line
    And the user queries the transaction typification in SIAC Unico
    Then the system displays the B2B2C 6GB package purchase record
    And the typification shows the date, time and user who performed the operation
    And the typification shows the B2B2C 6GB package code and associated line number