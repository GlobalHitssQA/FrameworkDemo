Feature: Screen reader accessibility for contract value and composition component

  Scenario: Verify screen readers can correctly interpret the contract value and composition component
    Given the user has a screen reader activated and functioning
    And the user is authenticated in Acticenter with an active contract
    When the user navigates to the contract value and composition component
    Then the screen reader announces the component and its purpose
    When the user clicks on the component to display the breakdown popup
    Then the screen reader announces the popup opening and reads the content in a structured manner
    When the user navigates through each breakdown item using the screen reader
    Then the screen reader correctly reads each item label and its associated monetary value
    When the user closes the breakdown popup
    Then the screen reader announces the component closure and returns focus to the main element