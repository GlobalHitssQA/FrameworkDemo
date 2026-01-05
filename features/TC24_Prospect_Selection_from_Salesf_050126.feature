Feature: Prospect Selection from Salesforce Search Results

  Scenario: Select a prospect and validate navigation to process selection
    Given the user has accessed Acticenter and performed a prospect search
    And search results are displayed with prospect information
    When the user selects a prospect from Salesforce search results by clicking on entry
    Then the system should capture prospect selection
    And the system should continue to AGAS-46 process selection functionality
    And the selected prospect data including name and email should be passed correctly
    When no selection is made
    Then the system should remain in dashboard without navigation
    When a valid selection is confirmed
    Then the redirection should follow specified process flow to AGAS-43