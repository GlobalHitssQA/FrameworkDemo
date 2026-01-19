Feature: Verify bold highlighting of matching characters in prospect search results

  Scenario: Matching characters are displayed in bold in prospect names within search results
    Given the user is authenticated in Acticenter as a Patrimonial, Private or Wealth Management advisor
    And the main dashboard is displayed
    When the user locates the prospect search field
    Then the search field is enabled and ready for text input
    When the user enters more than 2 alphanumeric characters "Mar" in the search field
    Then the system allows the capture of the alphanumeric characters
    When the user clicks the search button or presses Enter
    Then the system displays search results with matching prospects
    And the matching characters "Mar" are highlighted in bold within the prospect names