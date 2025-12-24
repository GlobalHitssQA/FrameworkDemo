Feature: Prospect Search Results Pagination
  As an advisor from Banca Patrimonial, Privada and Wealth Management
  I want to view prospect search results with scroll pagination
  So that I can access more than 5 matching prospects efficiently

  Background:
    Given the user is authenticated as an advisor
    And the user has access to Perspectiva Act Pitch Book dashboard
    And the Salesforce database contains more than 5 prospects matching search criteria

  Scenario: Validate that system displays first 5 matches and allows accessing more results via scroll
    Given the user is on the advisor dashboard in Perspectiva Act Pitch Book
    When the user enters more than 2 characters in the search field that generates more than 5 matches "Mar"
    Then the system executes the search and retrieves more than 5 matching results
    And the system displays the first 5 prospect matches with name and email
    And the scroll is present to access additional matches
    When the user scrolls down to view additional matches
    Then the system allows viewing the remaining matches beyond the sixth result
    And all matches display prospect name and email correctly