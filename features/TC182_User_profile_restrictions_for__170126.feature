Feature: User profile restrictions for contract value component

  Scenario: Verify component applies correct restrictions based on user profile type
    Given a user with patrimonial banking profile is authenticated
    When the user selects a contract and views the value and composition component
    Then the component displays information corresponding to patrimonial banking profile
    And a user with private banking profile is authenticated
    When the user selects a contract and views the value and composition component
    Then the component displays information corresponding to private banking profile
    And a user with wealth management profile is authenticated
    When the user selects a contract and views the value and composition component
    Then the component displays information corresponding to wealth management profile