Feature: Contract value breakdown monetary alignment
  As an authenticated user
  I want to see all monetary values right-aligned in the contract value breakdown
  So that I can easily read and compare the amounts

  Scenario: Verify monetary values are right-aligned and labels are left-aligned in contract breakdown
    Given I am authenticated in Acticenter
    And I have selected a contract with multiple value items
    When I click on the total contract value component
    Then the breakdown popup should be displayed
    And all monetary values should be right-aligned
    And all item labels should be left-aligned