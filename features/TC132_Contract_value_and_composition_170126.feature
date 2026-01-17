Feature: Contract value and composition component compatibility in Safari browser

  Scenario: Verify contract value and composition component displays correctly in Safari when breakdown is deployed
    Given the user is authenticated and opens Acticenter application in Safari browser
    When the user selects a previously registered contract
    Then the system displays the contract value and composition component
    When the user clicks on the component to display the contract value breakdown
    Then the system displays the popup with the breakdown showing all corresponding items
    And all visual elements are displayed correctly aligned and with proper formatting