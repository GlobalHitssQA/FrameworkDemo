Feature: Search prospects by name and email
  As an advisor user
  I want to search for prospects using name and email
  So that I can find matching records in the system

  Scenario: Search prospects and display matching results with scroll functionality
    Given the user is authenticated as a Patrimonial Banking advisor
    And the user is on the main dashboard
    When the user navigates to the prospects and clients perspective screen
    Then the system displays the interface with title, search field and side menu
    When the user enters the prospect name in the search field
    And the user types at least 2 characters in the search field
    And the user clicks the search magnifying glass button or presses Enter
    Then the system displays the first 5 matching results
    And the results show prospect name and email with matching characters highlighted in bold
    When there are more than 5 matching results
    Then the system displays a scroll to view all results