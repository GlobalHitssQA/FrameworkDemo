Feature: Prospect Search with No Results
  As an advisor
  I want to search for prospects that do not exist
  So that I can verify the system handles no results gracefully

  Scenario: Search for non-existing prospect returns no results message
    Given I am logged in as an advisor on the Acticenter dashboard
    When I access the prospect search functionality
    And I enter search criteria that matches no existing prospects
    And I click the search button
    Then I should see a message indicating no prospects were found