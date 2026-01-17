Feature: Value and Composition Component Functionality in Firefox

  Scenario: Verify that the value and composition component works correctly in Mozilla Firefox with all its features
    Given the user opens Mozilla Firefox browser
    And the user navigates to the Acticenter module
    When the user logs in with valid credentials
    And the user selects a Bank Individual Person contract
    Then the value and composition component renders correctly
    When the user clicks on the component to display the breakdown popup
    Then the popup opens showing all applicable bank contract items
    And the bank specific items Efectivo MXN and Efectivo USD for Mexdolar are displayed correctly
    When the user clicks outside the component to close the popup
    Then the popup closes correctly
    And no Firefox compatibility console errors are present