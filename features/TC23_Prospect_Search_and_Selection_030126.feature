Feature: Prospect Search and Selection
  As an advisor
  I want to search and select prospects from the database
  So that I can continue with the prospect management flow

  Scenario: Search and select a prospect from Acticenter dashboard
    Given I am on the Acticenter dashboard
    When I enter at least 2 characters in the prospect search field
    And I click the search button
    Then the search results should be displayed with matching data from Salesforce
    And the matching characters should be highlighted in bold
    When I review the list showing prospect name and email
    And I click on one of the prospects from the results
    Then the selected prospect should be highlighted or marked as selected
    When I confirm the prospect selection
    Then the system should continue with the selection process flow
    And the advisor should visualize the prospect information on screen
    And the displayed information should include prospect name and email