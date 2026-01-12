Feature: Prospect Search Functionality

  Scenario: Search for prospects using the magnifying glass icon after entering more than 2 characters
    Given the advisor is logged into Acticenter and navigates to the prospect search module
    When the advisor enters a search term with more than 2 characters in the search field
    Then the system accepts the characters and displays an active magnifying glass icon
    When the advisor clicks on the magnifying glass icon to execute the search
    Then the system displays the first 5 matches with prospect name highlighted in bold and email address
    And the system shows a vertical scroll if there are more than 5 matches