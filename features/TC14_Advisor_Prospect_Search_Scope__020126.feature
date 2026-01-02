Feature: Advisor Prospect Search Scope Restriction

  Scenario: Verify advisor can only search prospects within assigned cell or financial center
    Given the advisor is logged into Acticenter with cell or financial center assignment
    When the advisor navigates to the dashboard and accesses prospect search
    And the advisor executes a prospect search with valid criteria
    Then the search results should only display prospects assigned to the advisor's cell or financial center
    When the advisor attempts to search for a prospect from a different cell or financial center
    Then the prospect from the different cell should not appear in search results
    And all displayed results should belong to the advisor's authorized prospect list