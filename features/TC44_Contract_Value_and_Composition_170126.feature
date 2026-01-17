Feature: Contract Value and Composition Component for Persona Moral in Wealth Management

  Scenario: Verify the display and functionality of contract value and composition component for Persona Moral in Wealth Management
    Given the user is authenticated in Acticenter with Wealth Management profile
    When the user selects a Persona Moral contract from Wealth Management
    Then the contract value and composition component is displayed
    And the total contract value is shown with the review date
    When the user clicks on the component to expand the breakdown
    Then a popup is displayed with the detailed breakdown showing all applicable items for WM PM contract
    And the items without monetary value are displayed as $0.00