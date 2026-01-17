Feature: Contract Value Breakdown Dismissal in Responsive Landscape View

  Scenario: Close contract value breakdown by clicking outside the component in Responsive Landscape view
    Given the user is authenticated and viewing Acticenter in Responsive Landscape resolution
    And a valid contract is selected
    When the user clicks on the total contract value component to display the breakdown
    Then the contract value breakdown should be visible
    When the user clicks outside the breakdown component
    Then the breakdown should be closed
    And only the total contract value component should be displayed