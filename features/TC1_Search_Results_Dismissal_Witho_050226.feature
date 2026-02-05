Feature: Search Results Dismissal Without Selection

  Scenario: User dismisses search results without selecting a prospect
    Given the user is logged in to Acticenter as a Banca Patrimonial advisor
    And the main dashboard is displayed
    When the user enters more than 2 characters in the prospect search field
    Then the system displays search results with prospect name and email
    When the user views the search results without clicking any prospect
    Then the search results remain visible on screen
    When the user clicks outside the results area or presses Escape key
    Then the search results are closed
    And the user remains on the Acticenter dashboard
    And the user can continue with other actions without having selected a prospect