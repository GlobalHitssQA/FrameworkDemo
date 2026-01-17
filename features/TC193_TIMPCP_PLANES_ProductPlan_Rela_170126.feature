Feature: TIM.PCP_PLANES Product-Plan Relationship Verification

  Scenario: Verify correct relationship between GM products and Life Cycle plans in TIM.PCP_PLANES table
    Given the user has access to BSCS7 database with query permissions
    And the database connection is established successfully
    When the user executes a SELECT query on TIM.PCP_PLANES table
    Then the table displays columns CCO_PRCO, TMCODE, VERSION, CAT_PRCO, FECHA_IN_VIG, FECHA_FIN_VIG and ID_USU_PRCO
    When the user filters records by GM product using CCO_PRCO field
    Then all records associated with Auto Conectado GM product are displayed
    And there are relationships for all 7 Life Cycle plans TESTING, MANUFACTURE, UNSOLD_NOT_IN_SHOWROOM, UNSOLD_SHOWROOM, SOLD, DORMANT and PURGED
    And each plan has a record linked to GM product via corresponding TMCODE
    And the VERSION field contains correct product version for each plan
    And the CAT_PRCO field indicates correct product category
    And the FECHA_IN_VIG dates are configured for all plans
    And the FECHA_FIN_VIG dates are NULL or future dates for active production plans