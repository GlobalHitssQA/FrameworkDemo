Feature: Prospect Search Error Handling
  As an advisor
  I want to see clear error messages when prospect search fails
  So that I can understand what went wrong and try again

  Scenario: Display error message when prospect search returns no results
    Given the advisor is logged in to Acticenter
    And the advisor navigates to the prospect search section
    When the advisor enters a search query that returns no matches
    And the advisor submits the search
    Then an error message or no results message should be displayed
    And the error message should clearly communicate the issue
    And the search field should remain functional
    And the advisor should be able to perform another search