Feature: Money Market Section Visualization in Contract Value Breakdown

  Scenario: Verify Money Market section displays with corresponding monetary accumulated value
    Given the user is authenticated in Acticenter
    And the user has selected a contract with money market instrument investments
    When the user clicks on the total contract value component
    Then the system displays the popup with the contract value breakdown
    And the Money Market section is visible in the breakdown list
    And the Money Market section displays the accumulated monetary value on the right side