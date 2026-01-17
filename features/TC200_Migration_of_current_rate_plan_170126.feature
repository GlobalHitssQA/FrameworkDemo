Feature: Migration of current rate plans to new Life Cycle plans

  Scenario: Verify successful migration from RP0, RP1, RP2 and RP3 to new Life Cycle plans
    Given the homologation table exists with plan mappings from current to new plans
    And all current plans RP0, RP1, RP2 and RP3 are active in production
    When I verify the mapping of RP0 to TESTING plan
    Then the RP0 lines should be compatible with TESTING configuration
    And the bulk traffic billing behavior should be preserved without included units
    When I verify the mapping of RP1 to MANUFACTURE plan
    Then the RP1 lines should migrate preserving 10min voice, 10 SMS and 100MB data included
    And the expected billing should remain unchanged
    When I verify the mapping of RP2 to UNSOLD SHOWROOM plan
    Then the RP2 lines should migrate preserving 100min voice, 100 SMS and 2GB data included
    And no benefits should be lost during migration
    When I verify the mapping of RP3 to SOLD plan
    Then the RP3 lines should implement In Pool 10MB for telemetry on APN1 and APN4
    And the billing model should change from individual bulk to shared In Pool
    When the migration process completes
    Then the old plans RP0, RP1, RP2 and RP3 should be marked as inactive
    And the old plans should remain available for historical queries
    And the RATEPLAN table should reflect new Life Cycle plans
    And the CSPP_PLANES table should be updated correctly
    And the PCP_PLANES table should contain correct references
    And old plan references should be marked as historical