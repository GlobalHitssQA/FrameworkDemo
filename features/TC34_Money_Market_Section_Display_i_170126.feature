Feature: Money Market Section Display in Contract Valuation Breakdown

  Scenario: Verify Money Market section displays correctly in contract valuation breakdown
    Given the user is authenticated in Acticenter
    And the user selects a contract with money market investments
    When the user clicks on the total contract value component
    Then the system displays the popup with the complete contract value breakdown
    And the Money Market section is visible in the breakdown list
    And the Money Market label is aligned to the left
    And the Money Market monetary value is aligned to the right