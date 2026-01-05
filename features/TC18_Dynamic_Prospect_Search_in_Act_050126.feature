Feature: Dynamic Prospect Search in Acticenter

  Scenario: Verify dynamic search behavior with character modifications
    Given the user navigates to the prospect search section in Acticenter
    When the user enters at least 2 characters in the search field
    Then the search executes and results are displayed
    When the user adds more characters to the search text
    Then the search results update dynamically to reflect the new criteria
    When the user removes characters from the search text
    Then the search results update dynamically showing broader results
    And the search triggers automatically when minimum character threshold is met
    And the search field respects the maximum character limit