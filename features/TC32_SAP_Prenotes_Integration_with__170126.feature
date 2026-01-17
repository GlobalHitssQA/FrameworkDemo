Feature: SAP Pre-notes Integration with Cash in Transit for Bank Contracts

  Scenario: Verify Cash in Transit integration with SAP pre-notes service in Bank contracts
    Given the user is authenticated in Acticenter system with advisor credentials
    When the user selects a Bank type contract that has pre-notes registered in SAP
    And the user clicks on the value and composition component to view the breakdown
    Then the system displays the breakdown with all applicable items for the contract
    And the Cash in Transit item shows the value obtained from the SAP pre-notes service
    And the Cash in Transit value matches the pre-notes information stored in SAP