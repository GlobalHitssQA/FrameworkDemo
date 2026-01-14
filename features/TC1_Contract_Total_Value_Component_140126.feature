Feature: Contract Total Value Component Validation
  As a bank advisor user
  I want to see the total contract value component
  So that I can verify the contract information in the funds operation flow

  Scenario: Validate contract total value component displays correctly in funds operation flow
    Given I am logged into Acticenter as a wealth management advisor
    When I select a previously configured contract
    And I navigate to the funds operation flow
    Then I should see the contract total value component
    And the total value should be displayed in proper monetary format
    And the displayed value should be updated according to the revision date