Feature: Invoice Traffic Detail Section Plan Field Verification

  Scenario: Verify that Traffic Detail section includes Plan field for each line at billing cycle close
    Given the user is authenticated in BSCS7 system
    And there are active lines in different Life Cycle plans for General Motors client
    When the user generates an invoice for General Motors client with billing cutoff on day 28
    Then the system processes billing including lines in TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM, SOLD and DORMANT plans
    When the user navigates to the Traffic Detail section in the generated invoice
    Then the system displays the section with consumption detail per line
    And the Plan field column exists in the section structure
    And the Plan field is displayed alongside Service Number, Destination/APN and Total Volume fields
    And each line displays the correct RATEPLAN name according to its status at cycle close