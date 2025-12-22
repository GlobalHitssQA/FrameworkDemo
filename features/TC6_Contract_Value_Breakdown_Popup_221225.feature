Feature: Contract Value Breakdown Pop-up Auto-close Behavior

  Background:
    Given the user is authenticated in Acticenter
    And the user has a contract selected
    And the contract value component is visible and functional

  Scenario: Verify automatic closing of breakdown pop-up when clicking outside the component
    Given the user accesses a contract in Acticenter
    When the user clicks on the contract value component to display the breakdown
    Then the system displays the pop-up with the contract composition breakdown
    
    When the user verifies that the breakdown pop-up is open and visible on screen
    Then the breakdown is fully displayed showing all applicable items
    
    When the user clicks on any area of the screen outside the breakdown component
    Then the breakdown pop-up closes automatically
    
    When the user verifies that the main contract value component remains visible
    Then the main component with the total contract value is still visible after closing the breakdown
    
    When the user opens the breakdown again
    And the user clicks on different areas outside the component to validate consistency
    Then in all cases the pop-up closes when clicking outside it
    
    When the user opens the breakdown again
    And the user clicks inside the breakdown pop-up area
    Then the breakdown remains open when clicking inside its area