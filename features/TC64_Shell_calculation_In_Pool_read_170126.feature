Feature: Shell calculation In Pool reads costs from parametric table

  Scenario: Verify Shell calculation In Pool correctly reads package costs and bulk rate from TIM.BSCST_FECT_RNG_PARAM table
    Given the parametric table TIM.BSCST_FECT_RNG_PARAM exists in BSCS7 database
    And the table contains In Pool cost configuration records
    When I query the In Pool 10MB package cost from the parametric table
    Then the package cost should be 1.30 soles without IGV
    When I query the bulk excess rate from the parametric table
    Then the bulk rate should be 0.0372 soles per MB without IGV
    When I execute the In Pool calculation Shell with traceability log enabled
    Then the Shell should log the correct reading of values from TIM.BSCST_FECT_RNG_PARAM
    And the OCCs generated in Document All should use the costs read from the parametric table
    And the OCC amounts should correspond to 1.30 for package and 0.0372 per MB for bulk