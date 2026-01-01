Feature: API Request Counter Verification
  As a user of the GitHub Profile Search application
  I want to see the API request counter with proper format
  So that I can track my API usage against the limit

  Scenario: Verify API request counter displays correct format
    Given the user accesses the GitHub profile search application
    When the user locates the API request counter display
    Then the counter should be visible on the interface
    And the counter format should match the pattern X/Y where X is consumed requests and Y is total limit
    And both numbers in the counter should be positive integers