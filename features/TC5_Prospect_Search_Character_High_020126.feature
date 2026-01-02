Feature: Prospect Search Character Highlighting
  As an advisor
  I want to search for prospects by partial name
  So that I can quickly identify matching prospects with highlighted characters

  Scenario: Search for prospects with character highlighting in bold
    Given I am logged into Acticenter as an advisor
    When I navigate to the prospect search field
    And I type "Jo" in the search field
    Then the search results should be displayed
    And the characters "Jo" should appear in bold in the prospect name "John"
    When I change the search criteria to match characters in the middle of a name
    Then new search results should be displayed
    And the matching characters should appear in bold regardless of their position in the name