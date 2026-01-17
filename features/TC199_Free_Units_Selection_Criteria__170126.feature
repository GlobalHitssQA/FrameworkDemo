Feature: Free Units Selection Criteria Validation in BSCS7

  Scenario: Verify FUP_SELECT_CRITERIA table configuration for Life Cycle GM plans
    Given the user is logged into BSCS7 database console
    When the user queries the SYSADM.FUP_SELECT_CRITERIA table filtering by Life Cycle GM packages
    Then the table displays columns FU_PACK_ID, FUP_VERSION, FUP_SELECT_CRIT_ID, RATE_TYPE_CODE, SERVICE_PACKAGE_CODE and TARIFF_ZONE_CODE
    And criteria records exist for plans MANUFACTURE, UNSOLD NOT IN SHOWROOM and UNSOLD SHOWROOM with their TMCODE references
    And service type filters are configured to differentiate VOICE, SMS and DATA applications
    And TARIFF_ZONE_CODE values restrict Free Units application to local zone excluding roaming
    And no criteria records exist for TESTING, SOLD, DORMANT or PURGED plans
    And all criteria records have coherent FUP_VERSION values and active status