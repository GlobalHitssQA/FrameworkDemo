Feature: Verify cash in transit value from SAP prenotes service for Bank contracts

  Scenario: Display cash in transit value from SAP prenotes service correctly
    Given the user is authenticated in Acticenter
    And the SAP prenotes service is available and functional
    When the user selects an active Bank contract
    Then the system displays the total contract value component
    When the user retrieves the expected cash in transit value from SAP prenotes service
    And the user clicks on the total contract value component to expand the breakdown
    Then the system displays the popup with detailed contract value breakdown
    When the user locates the cash in transit item in the breakdown list
    Then the cash in transit item is visible in the breakdown
    And the displayed cash in transit value matches exactly the SAP prenotes service value with correct thousand separators and decimal format