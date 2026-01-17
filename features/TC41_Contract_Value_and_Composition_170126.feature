Feature: Contract Value and Composition Component in Responsive Landscape View for Individual Person

  Scenario: Verify value and composition component functionality for Individual Person contract in PR channel
    Given the user is authenticated as a Private Banking user in Acticenter
    When the user selects an active Individual Person contract
    Then the value and composition component is displayed in Responsive Landscape view
    And the component shows the total contract value with correct monetary format
    When the user clicks on the total value component
    Then a popup is displayed with the complete breakdown including all categories
    And the breakdown list is vertically aligned with the main component
    When the user clicks outside the expanded component
    Then the popup closes and returns to normal view