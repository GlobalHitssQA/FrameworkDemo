Feature: Contract Value Component Pop-up Behavior

  Scenario: User interacts with contract value component to view and close breakdown pop-up
    Given the user is authenticated in Acticenter with an active contract selected
    When the user views the contract value component on the operation screen
    Then the system displays the closed contract value component
    When the user clicks on the contract value component
    Then the system displays the pop-up with the complete contract value breakdown
    And the pop-up remains visible with all financial item information
    When the user clicks outside the component and the breakdown pop-up
    Then the system closes the breakdown pop-up and returns to the view with only the contract value component visible
    When the user clicks on the contract value component again
    Then the system displays the pop-up with the updated breakdown