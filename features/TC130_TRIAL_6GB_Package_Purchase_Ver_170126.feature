Feature: TRIAL 6GB Package Purchase Verification in SIAC Unico

  Scenario: Verify TRIAL 6GB package activation is correctly registered and typified in SIAC Unico
    Given the BuyProduct API is available and functional
    And the SIAC Unico system is operational with configured typifications
    When I activate a TRIAL 6GB package on a test line through the BuyProduct API
    Then the TRIAL 6GB package should be activated successfully in BSCS7 with 6GB capacity and cost S/. 7.58 without IGV and 90 days validity
    And I query the purchase transaction in SIAC Unico
    Then the transaction should be registered with the corresponding package purchase typification
    And the record should include package code, name, date, time, user and associated line
    And the typification should follow the existing GM package typification standard in SIAC Unico
    When I access the transaction detail for complete traceability
    Then the system should display complete transaction details for auditing and tracking
    And the typification should clearly differentiate TRIAL 6GB from other B2B2C packages