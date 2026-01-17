Feature: B2B2C Package Cancellation Typification in SIAC

  Scenario: Verify typification in SIAC when cancelling a B2B2C package from GM platform
    Given the user is authenticated in SIAC Unico system
    And there is an active B2B2C package on a SOLD plan line
    When the user cancels the B2B2C package from GM platform
    And the user queries the cancellation typification in SIAC Unico
    Then the system displays the B2B2C package cancellation record
    And the typification shows date, time, user, B2B2C package code, capacity, validity and associated line