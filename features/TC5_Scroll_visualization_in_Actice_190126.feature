Feature: Scroll visualization in Acticenter prospect search results

  Scenario: Verify scroll appears when more than 5 prospects match search criteria
    Given the user is authenticated in Acticenter as a Patrimonial Banking advisor
    And the user is on the main dashboard
    When the user locates the prospect search field
    Then the search field should be enabled for text input
    When the user enters more than 2 alphanumeric characters that generate more than 5 matches
    Then the system allows the capture of alphanumeric characters
    When the user clicks the search button or presses Enter
    Then the system executes the search in the Salesforce database
    And the first 5 matching prospects are displayed with name and email
    And a scroll bar is visible in the results area
    When the user scrolls down in the results area
    Then additional prospects from the sixth result onwards are displayed with name and email