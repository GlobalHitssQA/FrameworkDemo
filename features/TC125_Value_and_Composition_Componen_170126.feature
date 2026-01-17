Feature: Value and Composition Component Functionality

  Scenario: Verify value and composition component works correctly in Google Chrome
    Given the user opens the Acticenter module in the browser
    And the user logs in with valid credentials
    When the user selects a Casa de Bolsa contract
    Then the value and composition component is rendered correctly
    When the user clicks on the component to display the breakdown popup
    Then the popup opens showing all items with correct format
    And the breakdown is vertically aligned with the main component
    When the user clicks outside the component
    Then the popup closes correctly
    And all monetary values are displayed with correct format