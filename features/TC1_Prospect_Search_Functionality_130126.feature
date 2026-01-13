Feature: Prospect Search Functionality
  As an advisor on the Acticenter platform
  I want to search for prospects by typing more than 2 characters
  So that I can view results with prospect name and email

  Scenario: Successfully search for prospects with valid characters and display results
    Given the advisor is authenticated on the Acticenter platform
    And the advisor is on the dashboard
    When the advisor clicks on the prospect search field
    Then the search field is activated and displays the last 5 searches with prospect name and email
    When the advisor types 3 alphanumeric characters matching an existing prospect name
    Then the system processes the input without executing the search yet
    When the advisor clicks the search icon or presses Enter to execute the search
    Then the system queries Salesforce and displays the search results
    And the first 5 matches are displayed with the prospect name highlighted in bold for matching characters
    And the email address is visible for each result
    And if there are more than 5 matches a scroll appears to view additional results