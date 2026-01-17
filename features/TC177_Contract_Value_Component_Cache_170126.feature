Feature: Contract Value Component Cache Performance

  Scenario: Verify cache mechanism improves performance on repeated component queries
    Given the user is authenticated in Acticenter with an active contract
    And network monitoring tools are available
    When the user accesses the contract value and composition component for the first time
    Then the system should query backend services and store data in cache
    And the initial load time should be recorded as baseline
    When the user closes and reopens the component without contract changes
    Then the system should retrieve data from cache without querying backend services again
    And the second load time should be significantly less than the initial load time
    And no redundant backend service calls should be detected in network monitoring