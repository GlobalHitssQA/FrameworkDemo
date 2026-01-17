Feature: Contract value and composition component for Wealth Management Individual

  Scenario: Verify contract value and composition component display and functionality for Individual Person in Wealth Management
    Given the user is authenticated in Acticenter with Wealth Management credentials
    When the user selects an Individual Person contract from Wealth Management
    Then the contract value and composition component is displayed
    And the total contract value is shown with the review date
    When the user clicks on the component to expand the breakdown
    Then a popup is displayed with detailed breakdown showing all applicable items for WM Individual contract
    And each item displays its monetary value aligned to the right