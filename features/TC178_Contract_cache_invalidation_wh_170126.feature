Feature: Contract cache invalidation when operations modify contract values

  Scenario: Verify cache is invalidated correctly when contract values are modified by operations
    Given the user is authenticated and has an active contract with available balance
    And the value and composition component is loaded with cached data
    When the user executes an operation that modifies a contract item
    And the user refreshes or reloads the value and composition component
    Then the system should invalidate the previous cache and fetch new values from backend
    And the displayed values should reflect the changes from the executed operation
    And the backend service calls should confirm a new data request was made