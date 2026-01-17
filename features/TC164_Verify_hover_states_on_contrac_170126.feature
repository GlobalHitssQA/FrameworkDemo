Feature: Verify hover states on contract value component interactive elements

  Scenario: Interactive elements display correct hover visual states
    Given the user is authenticated in Acticenter
    And a contract is selected and the value composition component is visible
    When the user hovers over the main contract value component
    Then the component should display the hover state visual changes
    When the user expands the breakdown section
    And the user hovers over each list item in the breakdown
    Then each interactive list item should display the hover state
    When the user moves the cursor away from the elements
    Then all elements should return to their normal visual state