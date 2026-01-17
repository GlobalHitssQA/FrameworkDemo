Feature: Bulk consumption charges for MANUFACTURE plan exceeded limits

  Scenario: System charges bulk rate for excess voice, SMS and data consumption on MANUFACTURE plan
    Given a line is provisioned with MANUFACTURE plan with 10 minutes voice, 10 SMS and 100 MB data included
    And the line is active with assigned included limits
    When the user consumes 15 SMS during the billing cycle
    Then the system registers 10 SMS as included and 5 SMS as bulk excess
    When the user consumes 150 MB of data during the billing cycle
    Then the system registers 100 MB as included and 50 MB as bulk excess
    When the user views the billing invoice for the cycle
    Then the invoice shows 5 SMS charged at bulk rate of 0.05 PEN per SMS totaling 0.25 PEN
    And the invoice shows 50 MB charged at bulk rate of 0.2033 PEN per MB totaling 10.165 PEN