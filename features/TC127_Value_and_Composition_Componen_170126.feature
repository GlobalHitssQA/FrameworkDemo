Feature: Value and Composition Component Safari Compatibility

  Scenario: Verify value and composition component works correctly in Safari with all features
    Given the user opens Safari browser on macOS
    And the user navigates to the Acticenter module
    When the user logs in with valid credentials
    And the user selects a Persona Moral contract with active Mexdolar account
    Then the value and composition component renders correctly
    When the user clicks on the component to display the breakdown popup
    Then the popup opens showing all items including USD Cash
    And the USD Cash item displays the Mexdolar account balance without conversion
    And all CSS styles are applied correctly without visual distortions
    When the user clicks outside the component
    Then the popup closes correctly without errors