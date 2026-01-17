Feature: Multiple Data Packages Activation on GM Line

  Scenario: Verify system behavior when a GM line activates multiple data packages simultaneously
    Given a user with an active GM line on SOLD plan
    And multiple TRIAL 6GB and B2B2C packages available for activation
    And BSCS7 system configured with queuing rules
    When the user activates a first B2B2C 6GB package on the SOLD plan line
    Then the B2B2C 6GB package is activated and remains in active status for consumption
    When the user activates a second B2B2C 10GB package on the same line while the first is active
    Then the second B2B2C 10GB package is activated but remains in queued status
    When the user verifies in BSCS7 the status of both activated packages
    Then the system shows the first package as active and the second as queued
    When the user activates a third TRIAL 6GB package on the same line
    Then the third TRIAL 6GB package is activated and remains in queued status
    When the user queries the package queue associated with the line
    Then the system correctly shows 3 packages: 1 active and 2 queued in activation order