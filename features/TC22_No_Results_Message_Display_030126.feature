Feature: No Results Message Display

  Scenario: Verify error message when search returns no results
    Given the advisor user has accessed the Acticenter dashboard
    And the search field is available
    When the user enters a search term with at least 2 characters that has no matching records
    And the user executes the search
    Then the system should display the no results message
    And the dashboard should remain accessible
    And the user should be able to perform new searches