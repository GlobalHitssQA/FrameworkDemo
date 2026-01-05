Feature: Prospect Search with Long Alphanumeric String

  Scenario: Verify system handles very long alphanumeric search strings without character limit restriction
    Given the advisor is logged into Acticenter
    When the advisor navigates to the prospect search field
    And the advisor enters a very long alphanumeric string exceeding 100 characters
    And the advisor triggers the search
    Then the system should execute the search in Salesforce database with the full string
    And the system should display search results or no results message without errors