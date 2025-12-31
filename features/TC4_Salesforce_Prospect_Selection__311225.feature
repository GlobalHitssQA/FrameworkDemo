Feature: Salesforce Prospect Selection Process Flow
  As an advisor user
  I want to select a valid prospect from Salesforce search results
  So that I can continue with the Pitchbook sending process

  Scenario: Validate prospect selection continues Pitchbook sending process flow
    Given I am logged in as an advisor user on Acticenter platform
    And I can see the Acticenter dashboard
    When I navigate to the prospect search field in Pitchbook section
    Then the search field should be displayed and enabled
    When I type more than 2 characters in the prospect search field
    Then the search results should display matching prospects from Salesforce
    And each result should show prospect name and email address
    When I select a valid prospect with email from the search results
    Then the system should capture the selected prospect information
    And the process flow should continue successfully
    And the selected prospect details should be visible for confirmation