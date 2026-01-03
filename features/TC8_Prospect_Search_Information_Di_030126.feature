Feature: Prospect Search Information Display

  Scenario: Verify prospect name and email are displayed in search results
    Given the user accesses the Acticenter prospect search functionality
    When the user enters at least 2 characters in the search field
    And the user executes the search
    Then the system returns search results
    And each prospect entry displays the prospect name
    And the electronic email key is visible for each prospect
    And the displayed information allows proper prospect identification