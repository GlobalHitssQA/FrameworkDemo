Feature: Display Cedes and Pagares section with zero balance

  Scenario: Verify Cedes and Pagares section shows zero value when no investments exist
    Given the user is authenticated in Acticenter
    And a contract without Cedes and Pagares investments is available
    When the user selects the contract without Cedes and Pagares investments
    Then the system loads the contract correctly
    When the user clicks on the total value component to open the breakdown
    Then the breakdown popup displays with the complete list of contract sections
    When the user locates the Cedes and Pagares section in the breakdown
    Then the Cedes and Pagares section shows a value of zero pesos
    And the breakdown list is vertically aligned with the main value component