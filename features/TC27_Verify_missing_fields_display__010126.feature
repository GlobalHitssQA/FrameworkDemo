Feature: Verify missing fields display consistently in GitHub profile search

  Scenario: Missing profile fields display 'No disponible' with consistent formatting
    Given the user accesses the GitHub profile search application
    When the user searches for a GitHub username with multiple missing fields
    Then the profile loads successfully despite missing data
    And all unavailable fields display 'No disponible' or remain empty consistently
    And the 'No disponible' text appears with uniform font size and color across all fields
    And available fields display their actual data correctly without 'No disponible'