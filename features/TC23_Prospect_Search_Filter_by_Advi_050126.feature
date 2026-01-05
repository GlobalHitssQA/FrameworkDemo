Feature: Prospect Search Filter by Advisor Assignment

  Scenario: Advisor can only search prospects assigned to their cell or financial center
    Given the advisor is logged in to Acticenter with assigned cell or financial center
    When the advisor navigates to the prospect search interface
    And the advisor enters at least 2 characters in the search field
    Then the system displays up to 5 matching results
    And the results contain only prospects assigned to the advisor's cell or financial center
    When the advisor verifies that prospects from other cells are not included
    And the advisor selects a prospect from the filtered results
    Then the selected prospect's details confirm assignment to the advisor's cell or financial center