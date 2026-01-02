Feature: Prospect Search Input Validation
  As an authorized advisor
  I want to search for prospects using different character types
  So that I can find prospects using alphanumeric and special characters

  Scenario: Validate alphanumeric and special character input in prospect search
    Given I am logged into the Acticenter dashboard as an authorized advisor
    And the dashboard is displayed with search functionality enabled
    When I enter an alphanumeric search query "abc123" in the search field
    Then the alphanumeric string is accepted in the search field
    When I execute the search
    Then the search processes the alphanumeric input correctly
    And matching results are displayed or a no results message is shown
    When I enter a search query with special characters "test@email.com"
    Then the special characters are accepted in the search field without validation errors
    When I execute the search with special characters
    Then the search processes the input and returns appropriate results
    And the system validates that only alphanumeric characters are accepted as per business rules