Feature: SIAC transaction typification registration
  As a SIAC user
  I want to verify that transaction typifications are correctly registered
  So that I can ensure data integrity for GM package transactions

  Scenario: Verify date, time and user registration in TRIAL 6GB package transaction typification
    Given the user is authenticated in SIAC Unico system
    When the user performs a TRIAL 6GB package purchase transaction from GM platform
    And the user queries the transaction typification in SIAC immediately
    Then the typification date should match the current system date
    And the typification time should match the transaction execution time within 1 minute margin
    And the registered user should match the authenticated user who performed the transaction