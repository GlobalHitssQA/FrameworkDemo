Feature: GM Package Activation Without Limitations
  As a GM user with an active SOLD plan line
  I want to activate multiple packages without restrictions
  So that I can use multiple data packages as needed

  Scenario: Verify unlimited package activations for GM customer
    Given a GM user has an active line with SOLD plan
    And the BuyProduct API is functional through HUB APIGEE
    When the user activates a TRIAL 6GB package on the line
    Then the TRIAL 6GB package should be activated successfully
    When the user activates a second TRIAL 6GB package immediately after
    Then the second TRIAL 6GB package should be activated and queued correctly
    When the user activates 5 B2B2C packages with different capacities successively
    Then all 5 B2B2C packages should be activated and queued correctly
    And no error message or restriction for activation quantity should be displayed
    When the user queries the total active and queued packages on the line
    Then the system should show 1 active package and 6 queued packages