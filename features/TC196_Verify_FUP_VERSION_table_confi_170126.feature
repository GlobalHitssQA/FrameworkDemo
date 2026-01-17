Feature: Verify FUP_VERSION table configuration for Life Cycle free unit packages

  Scenario: Validate that free unit package versions are correctly configured in SYSADM.FUP_VERSION table
    Given the user is connected to the BSCS7 database
    When the user queries the SYSADM.FUP_VERSION table
    Then the table displays columns FU_PACK_ID, FUP_VERSION, VALID_FROM, WORK_STATE and REC_VERSION
    And each FU_PACK created for GM plans has at least one active version registered
    And the VALID_FROM field contains dates equal to or after the Life Cycle implementation date
    And the FUP_VERSION field has sequential numeric values starting from 1 for each FU_PACK_ID
    And the WORK_STATE indicates active production status for productive plan packages