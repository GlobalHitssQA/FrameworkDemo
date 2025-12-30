Feature: Validation of minimum character requirement to trigger prospect search

  Scenario: Verify that prospect search requires minimum 2 characters to trigger
    Given the user is logged into Acticenter as an authorized advisor
    And the prospect search functionality is enabled
    When the user navigates to the prospect search field in the dashboard
    Then the search field is displayed and ready for input
    When the user enters only 1 character in the search field
    Then the search is not triggered and no results are displayed
    When the user enters a second character in the search field
    Then the search is automatically triggered
    And the system displays up to 5 prospect results with name and email
    When the user continues typing additional characters
    Then the search results are updated dynamically in real-time