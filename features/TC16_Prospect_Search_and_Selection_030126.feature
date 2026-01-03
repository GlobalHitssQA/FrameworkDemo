Feature: Prospect Search and Selection

  Scenario: Search for prospects and select one to continue the process
    Given the user is on the prospect search page
    When the user performs a valid prospect search with at least 3 characters
    Then the system displays a list of matching prospects with highlighted information
    And the list shows up to 5 prospects with name and email visible
    When the user selects one prospect from the coincidence list
    Then the selected prospect is highlighted or marked as selected
    When the user confirms the selection to proceed
    Then the system navigates to the next screen with selected prospect data
    And the prospect name and email are correctly displayed in the following steps