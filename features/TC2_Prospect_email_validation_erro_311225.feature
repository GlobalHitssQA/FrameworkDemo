Feature: Prospect email validation error handling
  As an advisor user
  I want to see an appropriate error message when selecting a prospect without email
  So that I understand why the prospect cannot be used for Pitchbook

  Scenario: Display error message when selected prospect has no email address in Salesforce
    Given the user is logged in as an advisor on Acticenter platform
    And the user navigates to the Pitchbook section
    When the user locates the prospect search field
    And the user enters more than 2 characters to search for a prospect without email
    And the user selects the prospect without email from the search results
    Then the system displays an error message indicating missing email address
    And the user cannot proceed with the Pitchbook sending process