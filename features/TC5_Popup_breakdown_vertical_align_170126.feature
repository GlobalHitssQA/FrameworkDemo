Feature: Popup breakdown vertical alignment with total contract value component

  Scenario: Verify that the breakdown popup is vertically aligned with the total contract value component
    Given the user is authenticated in Acticenter with a selected contract
    When the user identifies the vertical position of the total contract value component
    Then the total contract value component should be visible on the main screen
    When the user clicks on the total contract value component
    Then the system displays the popup with the breakdown of items
    And the breakdown popup should be vertically aligned with the total contract value component