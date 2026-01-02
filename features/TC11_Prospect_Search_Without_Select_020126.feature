Feature: Prospect Search Without Selection
  As an advisor
  I want to search for prospects without selecting any
  So that I can review search results and remain on the dashboard

  Scenario: Search for prospects and close without selection
    Given I am logged in as an advisor on the Acticenter dashboard
    When I access the prospect search functionality
    And I enter valid search criteria and execute the search
    And I review the search results without selecting any prospect
    And I close the search results without making a selection
    Then the system should remain on the current dashboard
    And no navigation to new prospect creation should occur
    And the dashboard state should be maintained