Feature: Analytics capture for contract value component interactions

  Scenario: Verify that the system captures detailed analytics of user interactions with the component
    Given the analytics system is configured and active
    When the user opens the contract value breakdown popup
    And the user reviews the breakdown items
    And the user closes the breakdown component
    Then each user action should generate analytics events
    And specific events should be captured with timestamps including clicks and view duration
    And contextual data should be associated with each event including contract type and channel
    And the analytics report should show usage patterns and insights
    And the analytics should comply with privacy policies and not capture sensitive user data