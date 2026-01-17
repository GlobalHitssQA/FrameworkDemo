Feature: Contract valuation breakdown displays Cedes and pagares section

  Scenario: Verify Cedes and pagares section is displayed correctly in contract valuation breakdown
    Given the user is authenticated in Acticenter
    And the user selects a contract that contains Cedes and pagares investments
    When the user clicks on the total contract value component
    Then the system displays the contract value breakdown popup
    And the Cedes and pagares section is visible in the breakdown list
    And the Cedes and pagares label is displayed on the left side
    And the Cedes and pagares monetary value is displayed on the right side
    And the Cedes and pagares section is vertically aligned with other sections