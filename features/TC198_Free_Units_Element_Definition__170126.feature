Feature: Free Units Element Definition Validation
  As a QA engineer
  I want to verify that FUP_ELEMENT_DEFINITION table contains correct quantities and units
  So that free units are properly configured for GM packages

  Scenario: Validate Free Units definitions for MANUFACTURE and UNSOLD SHOWROOM packages
    Given I am connected to the BSCS7 database with read access
    When I query the SYSADM.FUP_ELEMENT_DEFINITION table for GM packages
    Then I should see the table with required fields FU_PACK_ID, FUP_VERSION, FUP_ELEMENT, VALID_FROM, FREE_UNITS_TYPE, COUNTING_TYPE, CURRENCY, FU_INTERVAL_LENGTH and GRANULARITY_TYPE
    And the VOZ element for MANUFACTURE should have quantity 10 with unit minutes
    And the SMS element for MANUFACTURE should have quantity 10 with unit message
    And the DATOS element for MANUFACTURE should have quantity 100 with unit MB
    And the UNSOLD SHOWROOM package should have VOZ with 100 minutes
    And the UNSOLD SHOWROOM package should have SMS with 100 messages
    And the UNSOLD SHOWROOM package should have DATOS with 2 GB
    And the FU_INTERVAL_LENGTH field should indicate monthly renewal cycle for all packages