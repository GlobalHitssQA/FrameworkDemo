Feature: Prospect Selection and Data Validation
  As an advisor
  I want to select a prospect from search results
  So that I can view and verify their complete information in the next screen

  Scenario: Select prospect and validate data integrity across screens
    Given I have executed a prospect search with multiple results
    And the search results display prospect names and email information
    When I select a specific prospect from the results list
    Then the selected prospect should be highlighted and marked
    When I proceed to the next screen
    Then I should see the prospect name displayed correctly
    And I should see the prospect email displayed completely
    And all relevant prospect information should be accessible
    And the prospect data should match the original Salesforce record