Feature: Contract Value Breakdown Display in Responsive Landscape View

  Scenario: Verify the opening of total contract value breakdown in Responsive Landscape view when user interacts with the component
    Given the user is authenticated and viewing Acticenter in Responsive Landscape resolution
    When the user selects a valid contract from the client or contract search
    Then the system displays the total contract value component on the screen
    When the user clicks on the total contract value component
    Then the system displays the breakdown with all applicable items aligned vertically with the component