Feature: Prospect Search Functionality
  As a Banking Advisor
  I want to search for prospects by name and email
  So that I can find and select the appropriate prospect

  Scenario: Search prospects by name and email and view matching results
    Given the user is authenticated as a Banking Advisor on the prospects screen
    When the user enters more than 2 characters in the prospect search field
    And the user clicks the search button or presses enter
    Then the system displays the first 5 matching results with name and email
    And the matching characters are highlighted in the results
    When there are more than 5 matches the user can scroll to see additional results
    And the user selects a prospect from the results
    Then the selected prospect is highlighted and ready for further action