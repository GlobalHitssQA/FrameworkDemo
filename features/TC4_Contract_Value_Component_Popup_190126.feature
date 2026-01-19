Feature: Contract Value Component Popup Behavior

  Scenario: Verify that the breakdown popup opens when clicking on the component and closes when clicking outside
    Given the user is authenticated in Acticenter
    And the user navigates to the funds operation module
    When the user selects an available contract
    Then the system loads the selected contract information
    When the user clicks on the contract value and composition component
    Then the system displays a popup with the detailed breakdown of all applicable items
    And the popup is vertically aligned with the total contract value component
    When the user clicks outside the component and the popup
    Then the popup closes automatically
    When the user clicks on the component again
    Then the popup displays again showing the complete breakdown