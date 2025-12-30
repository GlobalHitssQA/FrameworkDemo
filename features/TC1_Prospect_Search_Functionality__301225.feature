Feature: Prospect Search Functionality Validation
  As an advisor in Acticenter
  I want to search for prospects with a minimum character threshold
  So that I can find relevant prospects and see my recent searches

  Scenario: Validate prospect search triggers after entering more than 2 characters and displays recent searches
    Given the user is logged in as an advisor in Acticenter
    And the main dashboard is displayed with prospect search field available
    When the user clicks on the prospect search field
    Then the search field is activated
    And the last 5 recent searches are displayed with prospect name and email address
    When the user types "A" in the search field
    Then the search is not triggered
    And no search results are displayed
    And the recent searches remain visible
    When the user types "B" in the search field making total 2 characters
    Then the search is not triggered yet
    And no search results are displayed
    And the recent searches remain visible
    When the user types "C" in the search field making total more than 2 characters
    Then the search is automatically triggered
    And the system queries Salesforce database for matching prospects
    When the user verifies the recent searches section before typing
    Then the system displays the 5 most recent searches with prospect name and email
    When the user continues typing additional characters
    Then the search processes the alphanumeric chain regardless of length