Feature: Contract values comparison between Acticenter and Modulo Asesor

  Scenario: Verify monetary values in Acticenter match Modulo Asesor values for the same contract
    Given the user is authenticated in Modulo Asesor
    And the user queries a specific contract and records all category values
    When the user opens Acticenter and selects the same contract
    And the user clicks on the contract value component to display the breakdown
    Then all monetary values for each category in Acticenter should match the values from Modulo Asesor
    And the breakdown should display Purchasing power MXN value correctly
    And the breakdown should display Cash MXN value correctly
    And the breakdown should display Cash USD value correctly
    And the breakdown should display Pending settlement value correctly
    And the breakdown should display Debt funds value correctly
    And the breakdown should display Hedge funds value correctly
    And the breakdown should display Equity funds value correctly
    And the breakdown should display Cedes and promissory notes value correctly
    And the breakdown should display Money market value correctly
    And the breakdown should display Capital market value correctly