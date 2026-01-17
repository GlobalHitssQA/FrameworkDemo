Feature: RATEPLAN Table Configuration for General Motors Life Cycle

  Scenario: Verify correct configuration of 7 new rate plans in SYSSADM.RATEPLAN table
    Given the user has access to the BSCS7 database system
    When the user queries the SYSSADM.RATEPLAN table
    Then the table structure and existing records are displayed
    And the 7 new plans TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD, DORMANT and PURGED exist with unique TMCODE
    And each plan has correct attributes according to specification
    And Free Units and In Pool configurations are correctly associated
    And bulk rates are configured as VOZ 0.07, SMS 0.05, DATOS 0.2033 per MB without IGV