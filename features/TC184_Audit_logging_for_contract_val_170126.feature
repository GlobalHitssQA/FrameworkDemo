Feature: Audit logging for contract value and composition component queries

  Scenario: Verify that all queries to the value and composition component are registered in the audit system
    Given the user is authenticated in the system with valid credentials
    And the audit system is configured and operational
    When the user selects a contract and views the value and composition component
    And the user clicks on the component to display the value breakdown
    Then the audit system should register the query with user data, date, time, contract consulted and action performed