Feature: Automatic In Pool 10MB Package Assignment for SOLD Plan

  Scenario: Verify automatic assignment of In Pool 10MB package when a line is provisioned with SOLD plan
    Given the BSCS7 system is available and configured
    And the In Pool 10MB package is configured in the system
    And the General Motors account is active in BSCS7
    When I provision a new General Motors line with SOLD plan RatePlan 3
    Then the line should be provisioned correctly in BSCS7 with SOLD plan assigned
    When I verify the In Pool 10MB package assignment in BSCS7
    Then the In Pool 10MB package should be active and associated to the SOLD plan line without manual intervention
    When I query the package configuration tables for the assigned In Pool package
    Then the package should have capacity of 10MB per line
    And the package should have rate of 1.30 soles without IGV
    And the package should cover only APN1 and APN4
    And the package should apply only to local consumption