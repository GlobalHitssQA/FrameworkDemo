Feature: Contract value and composition component load time verification

  Scenario: Verify that the value and composition component loads within acceptable time when selecting a contract
    Given the user is authenticated and on the Acticenter main screen
    When the user searches for a contract using the search magnifying glass
    And the user selects a contract with all value categories populated
    And the user clicks on the total value component
    Then the breakdown should load completely within 3 seconds