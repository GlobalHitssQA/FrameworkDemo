Feature: Money Market Section Display in Contract Value Breakdown

  Scenario: Verify the Money Market section name in contract value breakdown meets Look and Feel specifications
    Given the user is authenticated in the Acticenter system
    When the user selects a contract with money market investments
    And the user clicks on the total contract value component
    Then the breakdown popup should be displayed
    And the Money Market section should display the name "Mercado de dinero"