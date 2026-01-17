Feature: Value and Composition Component for Private Banking Individual Contract

  Scenario: Verify value and composition component displays correctly for Private Banking Individual contracts
    Given a user is authenticated with Private Banking profile in Acticenter
    And a Private Banking Individual contract is available
    When the user selects a Private Banking Individual contract from the contract selector
    Then the system loads the Private Banking Individual contract correctly
    And the total contract value component is visible on screen
    When the user clicks on the total contract value component
    Then the system displays the popup with the complete contract value breakdown
    And all applicable items for Private Banking Individual are shown in the breakdown
    And each item displays its monetary value aligned to the right
    And items without value display zero pesos format
    When the user clicks outside the breakdown popup
    Then the popup closes and returns to the main component view