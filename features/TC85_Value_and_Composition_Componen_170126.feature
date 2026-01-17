Feature: Value and Composition Component State Persistence
  As a user of Acticenter
  I want the value and composition component to maintain its state
  So that I can navigate between screens without losing my selected contract information

  Scenario: Verify component state persistence when navigating between Acticenter screens
    Given I am authenticated in Acticenter with an active contract
    When I access Acticenter and select a contract to view the total value component
    Then the system displays the component with the total value of the selected contract
    When I open the breakdown popup and verify the values of each item
    Then the popup shows the complete breakdown with all items and their corresponding values
    When I navigate to another Acticenter section
    Then the system changes to the requested new section
    When I return to the screen where the total value component is located
    Then the component maintains the same selected contract with updated values
    When I open the breakdown popup again
    Then the popup displays correctly showing the updated contract information