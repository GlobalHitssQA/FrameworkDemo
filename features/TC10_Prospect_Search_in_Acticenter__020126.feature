Feature: Prospect Search in Acticenter Dashboard
  As an advisor
  I want to search for prospects in the Acticenter platform
  So that I can view and select prospects to continue with the workflow

  Scenario: Search and select a prospect from search results
    Given I am logged in as an advisor on the Acticenter dashboard
    When I access the prospect search functionality
    And I enter valid search criteria for existing prospects
    And I click the search icon to execute the search
    Then the search results should display matching prospects with name and email
    And the first 5 matching prospects should be visible
    And prospect names and emails should be highlighted where matches occur
    When I click on a specific prospect from the search results
    Then the selected prospect should be highlighted
    And the system should proceed to the AGAS-43 workflow process