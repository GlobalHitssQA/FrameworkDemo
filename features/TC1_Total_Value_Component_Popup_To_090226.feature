Feature: Total Value Component Popup Toggle Functionality

  Scenario: User closes the breakdown popup by clicking outside and reopens it
    Given the user is authenticated and on the funds operation screen with a selected contract
    And the total value component is visible
    When the user clicks on the total value component
    Then the breakdown popup is displayed aligned with the component
    When the user clicks outside the popup and the total value component
    Then the breakdown popup is closed
    And the total value component remains visible and functional
    When the user clicks on the total value component again
    Then the breakdown popup is displayed again confirming the toggle functionality works correctly