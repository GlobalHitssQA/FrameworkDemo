Feature: Verify font size in breakdown section titles according to Look and Feel specifications

  Scenario: Validate font size of breakdown item titles matches Look and Feel specifications
    Given the user is authenticated in Acticenter
    And a contract with multiple breakdown items exists
    When the user navigates to the contract value and composition component
    And the user clicks on the component to display the breakdown popup
    Then the breakdown popup should display all expected items
    And the font size of each breakdown item title should match the Look and Feel specifications