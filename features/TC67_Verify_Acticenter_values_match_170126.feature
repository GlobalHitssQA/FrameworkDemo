Feature: Verify Acticenter values match SAP stored values

  Scenario: Compare contract breakdown values between Acticenter and SAP for Persona Moral with Mexdolar account
    Given the user is authenticated in Acticenter with SAP access
    And a Persona Moral bank contract with Mexdolar account exists
    When the user accesses Acticenter and selects a bank or brokerage contract
    Then the system displays the selected contract screen
    When the user expands the contract value breakdown
    Then the system displays the popup with all categories and their values
    When the user records the specific category values including Cash MXN and Cash USD
    Then all values displayed in Acticenter are captured
    When the user accesses SAP to query the same contract values
    Then SAP displays the stored values for the contract
    When the user compares Cash USD value in Acticenter with Mexdolar account balance in SAP for Persona Moral
    Then the Cash USD values match exactly with SAP
    When the user verifies coherence of all categories between Acticenter and SAP
    Then all category values are identical between both systems