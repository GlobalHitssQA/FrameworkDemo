Feature: Popup breakdown alignment verification
  As a user viewing contract details
  I want to see properly aligned text and amounts in the breakdown popup
  So that information is easy to read and visually consistent

  Scenario: Verify text and amount alignment in breakdown popup
    Given the user is authenticated and has a contract with multiple value items selected
    When the user clicks on the total value component to display the breakdown popup
    Then the breakdown popup should be displayed with the list of items and their values
    And all item names should be aligned to the left
    And all monetary values should be aligned to the right
    And the alignment should be consistent for all displayed items
    And the vertical spacing between items should be uniform