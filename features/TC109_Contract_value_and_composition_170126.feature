Feature: Contract value and composition component update on page refresh

  Scenario: Verify contract value and composition component updates correctly after page refresh
    Given the user is logged into Acticenter with an active contract selected
    When the user clicks on the total value component to display the breakdown
    And the user notes the current values displayed in the popup
    And the user refreshes the page
    Then the total value component should be visible with the selected contract
    When the user clicks on the total value component again
    Then the popup should display the updated values correctly from the backend