Feature: Prospect Search Functionality
  As an advisor user
  I want to search for prospects in Acticenter
  So that I can find and select potential clients from Salesforce database

  Scenario: Search prospects and verify results presentation
    Given I am logged into Acticenter dashboard as an advisor user
    When I enter at least 2 characters in the prospect search field
    And I execute the search
    Then the search results should be displayed with matching prospects from Salesforce
    And the results should show prospect name and email with highlighted matching characters
    And the first 5 coincidences should be presented on screen
    And scroll functionality should be available if more than 6 results exist