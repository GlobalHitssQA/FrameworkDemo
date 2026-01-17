Feature: Contract value and composition component compatibility with Google Chrome

  Scenario: Verify contract value and composition component works correctly in latest stable Google Chrome
    Given the user opens Acticenter application in the latest stable Google Chrome browser
    And the user is authenticated and has an active contract available
    When the user navigates to the funds operation module with an active contract
    Then the total contract value component is displayed correctly
    When the user clicks on the total value component to open the breakdown popup
    Then the breakdown popup is displayed with all visible items and proper formatting
    And all interactive elements function correctly including click to open and click outside to close
    And the CSS styles are applied correctly including colors fonts alignment and spacing
    And the browser console shows no compatibility errors or warnings