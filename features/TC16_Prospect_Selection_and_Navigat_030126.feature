Feature: Prospect Selection and Navigation

  Scenario: Select a prospect from Salesforce and navigate to new prospect creation
    Given the advisor user is logged into the Acticenter dashboard
    When the advisor navigates to the prospect search functionality
    And the advisor enters a search term and waits for results
    And the advisor selects a prospect from the Salesforce search results
    Then the system should continue with the selection process
    And the system should navigate to AGAS-43 flow
    And the user should be redirected to the new prospect creation function AGAS-46