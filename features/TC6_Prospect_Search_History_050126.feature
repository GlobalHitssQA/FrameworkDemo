Feature: Prospect Search History
  As an advisor
  I want to see my recent prospect searches
  So that I can quickly repeat previous searches

  Scenario: Display last 5 prospect searches in dropdown
    Given I am logged in to Acticenter as an advisor
    When I perform 5 or more prospect searches using different criteria
    And I navigate back to the prospect search field
    And I click on the search field and begin typing any character
    Then the system displays the last 5 searches performed by me as dropdown suggestions
    And only the 5 most recent searches are shown in chronological order