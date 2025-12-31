Feature: Validate error message for prospect without email address

  Scenario: System displays error message when selecting a prospect without email in Salesforce
    Given the user is logged in as an advisor
    And the user is on the prospect search screen in Acticenter
    When the user searches for a prospect without email address in Salesforce
    Then the prospect appears in the search results
    When the user selects the prospect without email address from the results
    Then the system displays an error message indicating the prospect has no email registered in Salesforce