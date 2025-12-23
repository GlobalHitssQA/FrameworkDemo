Feature: Contract Valuation Breakdown Pop-up Responsive Behavior
  As an authenticated user in Acticenter
  I want to verify the pop-up breakdown behavior in responsive views
  So that I can ensure proper functionality across landscape and portrait orientations

  Background:
    Given the user is authenticated in Acticenter
    And a contract is available for consultation

  Scenario: Verify pop-up open and close behavior in responsive landscape and portrait views
    Given the user accesses Acticenter from a device with responsive landscape view
    When the user selects a contract from the Advisor module in landscape view
    Then the contract loads correctly in responsive landscape view
    When the user clicks on the total contract value component
    Then the breakdown pop-up displays correctly showing all items in landscape view
    When the user clicks outside the pop-up on any screen area
    Then the pop-up closes properly
    When the user changes to responsive portrait view and selects the same contract
    Then the contract is displayed correctly in portrait mode
    When the user clicks on the total valuation component in portrait view
    Then the breakdown pop-up opens correctly showing the vertically aligned breakdown list in portrait mode
    When the user closes the pop-up by clicking outside the component in portrait view
    Then the pop-up closes without errors in portrait mode
    When the user switches between landscape and portrait views multiple times and tests the pop-up open and close
    Then the pop-up maintains its open and close functionality in all transitions between responsive views
    And the breakdown remains vertically aligned with the component in all views