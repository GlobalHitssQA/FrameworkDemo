Feature: Free Units Package Configuration Validation in SYSADM.FU_PACK

  Scenario: Verify Free Units packages are correctly configured for Life Cycle plans
    Given the user is logged into BSCS7 system with read permissions
    When the user executes a query on SYSADM.FU_PACK table filtering by GM packages
    Then the table displays FU_PACK_ID, SHORT_NAME, LONG_NAME, DESCRIPTION and package status fields
    And a Free Units package exists for MANUFACTURE plan with 10 min voice, 10 SMS and 100 MB data
    And a Free Units package exists for UNSOLD NOT IN SHOWROOM plan with identical values to MANUFACTURE
    And a Free Units package exists for UNSOLD SHOWROOM plan with 100 min voice, 100 SMS and 2 GB data
    And plans TESTING, SOLD, DORMANT and PURGED have no active Free Units packages or packages with zero values