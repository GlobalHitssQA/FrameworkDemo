Feature: SOLD Rate Plan Configuration Verification
  As a system administrator
  I need to verify the SOLD Rate Plan configuration in BSCS7
  So that telemetry traffic is properly configured with In Pool modality

  Scenario: Verify SOLD Rate Plan configuration for In Pool telemetry traffic
    Given I am logged into the BSCS7 system with query permissions
    When I access the SOLD Rate Plan configuration
    Then the system displays the SOLD Rate Plan homologated with current RP3
    And the In Pool 10MB package is configured with price 1.30 per package and 0.0372 per MB excess without IGV
    And the In Pool package is restricted to APN1 Onstarsa and APN4 Onstar01v6 for telemetry traffic
    And APN2 gmsa, APN5 onstarlmu and APN6 onstarvlrp are configured for bulk billing at 0.2033 per MB
    And the SOLD Rate Plan allows activation of TRIAL 6GB and B2B2C packages
    And the In Pool modality is configured only for local consumption excluding Roaming traffic