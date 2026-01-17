Feature: Popup scroll functionality for contract breakdown

  Scenario: Verify popup scroll handles correctly when breakdown items exceed visible space
    Given the user is authenticated in Acticenter
    And a contract with multiple breakdown items is available
    When the user selects a contract containing all available breakdown items
    Then the system loads the selected contract
    When the user clicks on the total value component to display the breakdown popup
    Then the popup displays showing the complete list of breakdown items
    And a vertical scrollbar appears when items exceed the popup height
    When the user scrolls down to view all breakdown items
    Then the scroll works correctly allowing to view all items without cuts or overlaps
    And the popup maintains vertical alignment with the total value component during scrolling