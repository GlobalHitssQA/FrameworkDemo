Feature: Concurrent contract value updates across multiple sessions
  As a user with multiple active sessions
  I want the system to handle simultaneous contract updates correctly
  So that data integrity is maintained across all sessions

  Scenario: Multiple users update values of the same contract simultaneously
    Given I have two active sessions with the same user and contract selected
    And both sessions display the value and composition component with identical initial values
    When I execute an operation that modifies a category value in session one
    Then the operation is processed correctly in session one
    When I refresh the component in session two without closing the session
    Then session two displays updated values reflecting changes from session one
    When I execute simultaneous operations in both sessions affecting different categories
    Then the system processes both operations without conflicts
    And both sessions display correctly updated values
    When I verify data integrity by querying the backend directly
    Then the stored values are consistent and reflect all executed operations correctly