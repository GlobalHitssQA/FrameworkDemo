Feature: Prospect Search in Acticenter
  As an advisor user
  I want to search for prospects by name
  So that I can find matching prospects from Salesforce with highlighted results

  Scenario: Search for existing prospect and verify highlighted matches
    Given I am logged in to Acticenter as an advisor user
    When I navigate to the prospect search functionality
    And I enter a valid prospect name with more than 2 characters
    And I execute the search by clicking the search icon
    Then the system should display prospects matching the entered name
    And the matching characters should be highlighted in bold in the results