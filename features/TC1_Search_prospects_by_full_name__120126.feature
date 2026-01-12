Feature: Search prospects by full name and email

  Scenario: User searches for prospects using full name and email as combined criteria
    Given the user is authenticated as an advisor and on the prospects dashboard
    When the user navigates to the client and prospect perspectives screen
    Then the system displays the screen with the search field available
    When the user enters the prospect full name and email in the search field
    Then the system accepts the text input with both criteria
    When the user initiates the search by pressing enter or clicking the search icon
    Then the system performs the search and displays matching results
    And the system shows prospects matching the full name and email entered