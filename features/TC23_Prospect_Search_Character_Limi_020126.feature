Feature: Prospect Search Character Limit Validation

  Scenario: Validate character limit enforcement in prospect search functionality
    Given the advisor user has accessed Acticenter dashboard
    When the user navigates to the prospect search functionality
    Then the search interface should display with the search input field available
    When the user attempts to enter only 1 character in the search field and triggers search
    Then the system should not execute search and may display message indicating minimum 2 characters required
    When the user enters exactly 2 characters in the search field and triggers search
    Then the search should execute successfully and return matching results if available
    When the user enters maximum allowed alphanumeric characters in the search field
    Then the system should accept all characters and process the search successfully
    When the user attempts to enter characters beyond the maximum limit
    Then the system should either prevent additional character entry or truncate input at maximum allowed length
    When the user tests with special characters and verifies character limit enforcement
    Then the system should handle special characters within the defined character limit and enforce maximum length restriction
    And the system should accept alphanumeric input correctly and enforce character limit