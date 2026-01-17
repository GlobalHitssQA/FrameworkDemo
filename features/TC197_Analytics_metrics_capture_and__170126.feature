Feature: Analytics metrics capture and reporting for contract value component

  Scenario: Verify that the system captures and reports usage metrics for component adoption and performance analysis
    Given the analytics system is configured and the component is deployed in production
    And I have access to the metrics dashboard
    When I access the metrics dashboard for the component
    Then the metrics dashboard should be available and display updated information
    When I perform multiple interactions with the component
    And I query contracts through the search functionality
    And I expand the contract breakdown popup
    And I close the breakdown component
    Then each interaction should be correctly registered in the metrics system
    And the metrics should reflect the correct number of interactions performed
    When I verify the performance metrics section
    Then load times and service response times should be captured
    And the performance metrics should display realistic values
    When I generate a usage metrics report for a specific period
    Then the system should generate a consolidated report with all usage metrics for the selected period