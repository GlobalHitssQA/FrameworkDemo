Feature: Pending to settle section visibility for Bank and Brokerage contracts

  Scenario: Verify that Pending to settle section displays for both Bank and Brokerage contract types without distinction
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a Bank type contract with pending settlement operations
    Then the system loads the Bank contract information and displays the total contract value component
    When the user clicks on the total contract value component to expand the breakdown
    Then the system displays the breakdown showing the Pending to settle section for the Bank contract
    When the user closes the breakdown and selects a Brokerage type contract with pending settlement operations
    Then the system loads the Brokerage contract information and displays the total contract value component
    When the user clicks on the total contract value component to expand the breakdown
    Then the system displays the breakdown showing the Pending to settle section for the Brokerage contract
    And the Pending to settle section is displayed in the same manner for both contract types