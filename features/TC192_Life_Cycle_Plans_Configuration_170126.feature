Feature: Life Cycle Plans Configuration Validation in TIM.CSPP_PLANES Table

  Scenario: Verify correct configuration of Life Cycle commercial plans for General Motors products
    Given the user has access to the BSCS7 database with valid permissions
    When the user queries the TIM.CSPP_PLANES table
    Then the table structure should display fields TMCODE, LIZOP_KN_C, SPCODE, FEC_CAD, FEC_VIG and LABEL
    And the seven Life Cycle plans should be registered with unique TMCODE codes
    And the plans TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD, DORMANT and PURGED should exist
    And each plan should have correct validity dates with production plans having NULL indefinite validity
    And the LABEL field should contain the correct commercial description for each plan
    And all Life Cycle GM plans should be associated with the Auto Conectado service SPCODE