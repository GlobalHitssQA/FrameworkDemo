Feature: Verify FUP_ELEMENT table configuration for Life Cycle Free Units packages

  Scenario: Validate FUP_ELEMENT entries for VOZ, SMS and DATOS services in GM packages
    Given the user is connected to BSCS7 database with query permissions
    When the user executes a SELECT query on SYSADM.FUP_ELEMENT table filtering by GM packages
    Then the table displays columns FU_PACK_ID, FUP_VERSION, FUP_ELEMENT, CHECK_ORDER and REC_VERSION
    And the MANUFACTURE package has 3 elements defined for VOZ, SMS and DATOS services
    And the UNSOLD SHOWROOM package has 3 elements defined for VOZ, SMS and DATOS services
    And the CHECK_ORDER field contains numeric values defining logical evaluation sequence
    And the FUP_VERSION values match active versions registered in SYSADM.FUP_VERSION table