Feature: Prospect search validation for authenticated advisor

  Scenario: Validate prospect search only shows active prospects assigned to authenticated advisor
    Given the advisor is logged into Acticenter with valid credentials
    And the advisor has active prospects assigned in Salesforce
    When the advisor navigates to the prospect search functionality
    Then the prospect search field should be visible
    When the advisor enters more than 2 characters of an active prospect name
    And the advisor clicks the search button
    Then the search results should display only active prospects assigned to the advisor
    And each prospect should show name and email information
    And no prospects from other advisors outside the cell or financial center should be displayed