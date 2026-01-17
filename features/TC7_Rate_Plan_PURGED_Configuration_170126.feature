Feature: Rate Plan PURGED Configuration Validation

  Scenario: Verify Rate Plan PURGED configuration when SIM is inactive without available services
    Given I am logged into the BSCS7 system with query permissions
    When I access the Rate Plan PURGED configuration
    Then the system displays Rate Plan PURGED as a new plan without prior homologation
    And the Rate Plan PURGED has no VOZ SMS or DATA services configured
    And the Rate Plan PURGED has no productive APNs assigned
    And the VoLTE service is not enabled for Rate Plan PURGED
    And the SIM in Rate Plan PURGED is marked as inactive without available services