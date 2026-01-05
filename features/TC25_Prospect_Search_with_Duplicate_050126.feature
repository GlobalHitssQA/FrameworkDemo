Feature: Prospect Search with Duplicate Names

  Scenario: Search and select a prospect when multiple records have identical names
    Given the user is on the Acticenter prospect search page
    When the user enters a prospect name that exists multiple times in the database
    And the user initiates the search
    Then the system displays all matching prospects
    And each result shows the prospect name in bold
    And each result displays the email address to differentiate duplicates
    And the system shows the first 5 matches initially
    And additional matches are accessible via scroll if more than 5 exist
    When the user selects one of the duplicate name prospects
    Then the system loads the selected prospect using the unique identifier