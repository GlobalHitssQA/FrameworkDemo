Feature: Verify service plan associations in TIM.PCP_SERVICIOS_PLANES table

  Scenario: Validate services are correctly associated to each Life Cycle plan
    Given the user is connected to BSCS7 database
    When the user queries TIM.PCP_SERVICIOS_PLANES table filtered by GM product
    Then the table displays columns CCO_PRCO, CO_SER, SPCODE, VERSION, ESTADO, FECHA_IN_VIG, CARGO_FIJO and USUARIO
    And the MANUFACTURE plan has 3 associated services for VOZ 10min, SMS 10 and DATA 100MB
    And the UNSOLD SHOWROOM plan has 3 associated services for VOZ 100min, SMS 100 and DATA 2GB
    And the TESTING and DORMANT plans have only bulk rate services without free units
    And the SOLD plan has In Pool 10MB service configured for telemetry on APN1 and APN4
    And the PURGED plan has no active services associated