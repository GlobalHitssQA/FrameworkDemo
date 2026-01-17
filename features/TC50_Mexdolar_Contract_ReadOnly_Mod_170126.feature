Feature: Mexdolar Contract Read-Only Mode for Legal Entities

  Scenario: Verify that Mexdolar contracts for Legal Entities are displayed as read-only without buy or sell operations
    Given the user is authenticated in Acticenter
    When the user searches and selects a Mexdolar contract for Legal Entity
    Then the system loads the Mexdolar PM contract and displays the value and composition component
    And the Total Valuation breakdown shows the Cash USD field
    And the Cash USD amount is displayed without exchange rate conversion
    When the user attempts to access the buy or sell operation function
    Then the buy or sell component is disabled
    And the Mexdolar PM contract is displayed in read-only mode without enabled operation options