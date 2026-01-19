Feature: Verify no results message when prospect search finds no matches

  Scenario: Display no results message for non-existent prospect search in Acticenter
    Given the user is authenticated as a Patrimonial, Private or Wealth Management advisor in Acticenter
    And the user sees the main dashboard
    When the user locates the prospect search field
    And the user enters alphanumeric characters that do not match any existing prospect "XYZABC123"
    And the user clicks the search button or presses Enter
    Then the system should display a no results message indicating no matches were found