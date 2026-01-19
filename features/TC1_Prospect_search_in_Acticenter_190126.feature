Feature: Prospect search in Acticenter

  Scenario: Search for prospects with more than 2 characters and display results with name and email
    Given the user is authenticated as a Patrimonial Banking advisor in Acticenter
    And the main dashboard is displayed
    When the user locates the prospect search field
    And the user enters "Mar" in the search field
    And the user clicks the search button or presses Enter
    Then the search results are displayed
    And each result shows the prospect name and email address