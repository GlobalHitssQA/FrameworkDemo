Feature: Prospect Search Error Handling for Missing Email

  Scenario: Validate error message when selecting prospect without email address in Salesforce
    Given the user is logged in as an advisor in Acticenter application
    And the user is on the prospect search screen
    When the user enters at least 3 characters to search for a prospect without email
    Then the search results are displayed successfully
    And the prospect without email appears in the coincidence list with name visible but no email shown
    When the user selects the prospect that has no email address from the results
    Then an error message is displayed indicating the prospect does not have email in Salesforce database
    And the system remains on the dashboard view without navigating forward
    And the user can select a different prospect or perform a new search