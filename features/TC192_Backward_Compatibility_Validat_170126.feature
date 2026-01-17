Feature: Backward Compatibility Validation for Contract Value Component

  Scenario: Verify component functionality with previous system version
    Given the previous system version is identified as pre-Release 2.7
    And the component is deployed in the legacy environment
    When I search for a contract using the search functionality
    And I view the total contract value
    And I expand the contract breakdown popup
    Then all main functionalities should operate without errors
    And the backend services should respond correctly
    And no compatibility errors should be present in system logs