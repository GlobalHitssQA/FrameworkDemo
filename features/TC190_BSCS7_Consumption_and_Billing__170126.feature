Feature: BSCS7 Consumption and Billing Data Integrity Verification

  Scenario: Verify consumption and billing data in BSCS7 matches consolidated invoice and reporting systems
    Given GM lines are active and BSCS7 system is operational
    And Shell In Pool is configured and reporting systems are available
    When I generate controlled consumption on GM lines with 100 voice minutes and 50 SMS and 500 MB bulk data and 200 MB In Pool
    Then the consumption is recorded in BSCS7 table UDR_LT_01 with exact known values
    When I execute the In Pool calculation Shell
    Then the Shell processes exactly 200 MB In Pool and generates OCCs with expected amounts
    When I execute the complete billing process to generate consolidated invoice
    Then the invoice is generated including all consumption for the period
    When I extract consumption totals by traffic type from BSCS7
    Then the values in BSCS7 match exactly with amounts and quantities in the invoice
    When I query reporting systems and datawarehouse for billing data
    Then reporting systems show the same consumption and billing values as BSCS7
    And there is total data integrity between BSCS7 and invoice and reporting systems without discrepancies