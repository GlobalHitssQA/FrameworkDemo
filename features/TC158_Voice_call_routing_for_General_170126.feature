Feature: Voice call routing for General Motors Life Cycle RATEPLAN lines

  Scenario: Verify local voice call routing works correctly for GM lines with RATEPLAN included minutes and bulk rates
    Given a General Motors line is provisioned in RATEPLAN MANUFACTURE with 10 included voice minutes
    When the user makes a local voice call with duration less than 10 included minutes
    Then the RED routing system establishes the call and deducts consumed minutes from included balance
    And the consumption records show minutes deducted from included balance without additional charge
    When the user consumes all 10 included minutes and makes an additional call generating excess
    Then the system allows the additional call and applies bulk rate of 0.07 PEN per minute for excess
    When the user makes a local voice call from a RATEPLAN SOLD line without included voice minutes
    Then the system applies bulk rate of 0.07 PEN per minute from the first consumed minute
    And the invoice shows local calls in Additional Local Voice Traffic section with applied rates