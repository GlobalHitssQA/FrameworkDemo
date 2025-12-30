Feature: Prospect Search Initial Results Display Limit Validation

  Scenario: Verify that prospect search displays exactly 5 initial results without scrolling
    Given the user is logged in as a Patrimony advisor on Acticenter dashboard
    When the user navigates to the prospect search functionality
    And the user enters at least 2 characters in the search field
    Then the system should display exactly 5 initial prospect results
    And each result should show prospect name and email
    And additional results should be accessible through scroll if more than 5 coincidences exist