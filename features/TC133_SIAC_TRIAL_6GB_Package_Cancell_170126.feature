Feature: SIAC TRIAL 6GB Package Cancellation Typification

  Scenario: Verify typification in SIAC when cancelling a TRIAL 6GB package from GM platform
    Given the user is authenticated in SIAC Unico system
    And there is an active TRIAL 6GB package on a SOLD plan line
    When the user cancels the TRIAL 6GB package from GM platform
    And the user queries the cancellation typification in SIAC Unico
    Then the system displays the TRIAL 6GB package cancellation record
    And the typification shows date, time, user, package code and associated line