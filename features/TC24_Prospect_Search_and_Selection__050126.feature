Feature: Prospect Search and Selection in Acticenter

  Scenario: Search for a prospect and navigate to process selection screen
    Given the user has accessed the prospect search interface in Acticenter
    When the user enters at least 2 characters in the search field
    Then the system displays up to 5 matching prospects with name and email
    When the user reviews the search results
    Then the search results display correctly with required information
    When the user selects a prospect from the search results
    Then the system registers the prospect selection and initiates navigation
    And the system navigates to the process selection screen
    And the selected prospect information is carried over to the new screen