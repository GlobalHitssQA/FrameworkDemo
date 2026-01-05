Feature: Prospect Search by Name in Acticenter
  As an advisor
  I want to search for prospects by their exact name
  So that I can find and select the correct prospect from the results

  Scenario: Search prospect by exact name and verify matching results
    Given test prospects with known names exist in Salesforce database
    And I am logged in to Acticenter as an advisor
    When I navigate to the prospect search field
    And I enter the exact name of a test prospect
    And I execute the search
    Then the system should display prospects matching the search query
    And all displayed prospects should have names that match or contain the search query
    And the matching characters in prospect names should be highlighted