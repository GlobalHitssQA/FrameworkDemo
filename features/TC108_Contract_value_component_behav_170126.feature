Feature: Contract value component behavior after session timeout

  Scenario: Verify contract value component behavior after session timeout and re-authentication
    Given the user is logged into Acticenter
    And the user has selected an active contract
    And the total value component is displayed
    When the user leaves the session inactive until timeout occurs
    And the user clicks on the total value component
    Then the system should display a session expired message or redirect to login
    When the user logs in again
    And the user selects the same contract
    And the user clicks on the total value component
    Then the breakdown popup should display correctly with all updated contract items