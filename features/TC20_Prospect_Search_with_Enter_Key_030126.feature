Feature: Prospect Search with Enter Key
  As a user of Acticenter
  I want to search for prospects using the Enter key
  So that I can quickly find prospect information

  Scenario: Search prospects using Enter key functionality
    Given the user accesses the prospect search functionality in Acticenter
    And the search screen loads with input field active
    When the user enters valid search criteria with minimum 3 characters
    And the user presses the Enter key on keyboard
    Then the system triggers search execution immediately
    And search results are returned and displayed
    And prospect matches from Salesforce are shown or no results message appears
    And Enter key behavior is consistent with clicking magnifying glass icon