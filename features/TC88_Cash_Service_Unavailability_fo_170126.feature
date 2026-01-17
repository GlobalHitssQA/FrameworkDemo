Feature: Cash Service Unavailability for Bank Contracts

  Scenario: Verify component behavior when Cash service is unavailable for Bank contracts
    Given the Cash service for Bank contracts is unavailable
    And the user is authenticated in Acticenter
    When the user selects a Bank contract
    Then the system attempts to load the total contract value component
    And an error message is displayed for Cash MXN information
    When the user opens the breakdown popup
    Then the Cash MXN section shows an error indicator or unavailable value
    And other sections display correctly when their services are available
    And the Funds section is visible
    And the Pending settlement section is visible