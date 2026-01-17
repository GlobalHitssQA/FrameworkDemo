Feature: SMS billing for MANUFACTURE plan with included SMS and bulk excess

  Scenario: Verify SMS traffic in MANUFACTURE plan charges correctly for included SMS and bulk excess
    Given a line is provisioned in MANUFACTURE plan with 10 included SMS
    And BSCS7 shows the line has 10 included SMS in the billing cycle
    When the user sends 9 SMS within the billing cycle
    Then the consumption is deducted from included SMS without additional charges
    When the user sends 3 additional SMS exceeding the 10 included SMS
    Then the system registers 2 excess SMS with bulk rate of 0.05 per SMS without tax
    And the invoice shows charges only for the 2 excess SMS at bulk rate