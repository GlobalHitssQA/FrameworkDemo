Feature: Contract Data Synchronization for Multiple Users

  Scenario: Verify data synchronizes correctly when multiple users view the same contract simultaneously
    Given two different users are configured with access to the same contract
    And both users have query permissions on the contract
    When user 1 accesses the contract value and composition component
    Then current contract values are displayed for user 1
    When user 2 accesses the same component of the same contract simultaneously
    Then user 2 sees the same values that user 1 is viewing
    When an operation that modifies contract values is executed from an external session
    Then the operation is processed and modifies values in the backend system
    When the component is refreshed in both user sessions
    Then both users see the updated values in a synchronized and consistent manner