Feature: Pending Settlement Operations Amount Verification
  As a user with an active contract
  I want to verify the accumulated amount in the Pending Settlement section
  So that I can confirm it reflects the correct sum of all pending operations

  Scenario: Verify accumulated monetary amount for Pending Settlement matches the sum of all pending operations
    Given the user is authenticated in Acticenter
    And the user has selected a contract with multiple pending settlement operations
    When the user retrieves the pending settlement operations from the backend system
    And the user calculates the expected total from all pending operations
    And the user clicks on the total contract value component to display the breakdown
    Then the Pending Settlement amount displayed should match the calculated total