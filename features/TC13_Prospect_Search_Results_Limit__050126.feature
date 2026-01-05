Feature: Prospect Search Results Limit Validation

  Scenario: Verify that exactly 5 prospect coincidences are displayed initially
    Given the advisor is logged into Acticenter
    When the advisor enters search criteria that returns more than 5 results
    And the advisor executes the search
    Then exactly 5 prospect entries should be displayed on screen
    And additional results should be available beyond the first 5