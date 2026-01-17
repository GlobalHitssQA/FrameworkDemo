Feature: Breakdown popup remains open when clicking inside

  Scenario: Verify that the breakdown popup stays open when clicking inside its area
    Given the user is authenticated in Acticenter
    And the user has selected a contract with available breakdown
    When the user clicks on the total value component to display the breakdown
    Then the breakdown popup should be displayed with contract items
    When the user clicks on different areas inside the popup like item names
    Then the breakdown popup should remain open
    When the user clicks on monetary values inside the popup
    Then the breakdown popup should remain open
    When the user clicks outside the popup area
    Then the breakdown popup should be closed