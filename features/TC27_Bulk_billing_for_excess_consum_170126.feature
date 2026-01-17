Feature: Bulk billing for excess consumption on UNSOLD SHOWROOM plan

  Scenario: System charges bulk rate for consumption exceeding included allowances
    Given a line is provisioned on UNSOLD SHOWROOM plan with 100 voice minutes, 100 SMS and 2 GB included
    And the line is active with correct allowances assigned
    When the user consumes 120 voice minutes during the billing cycle
    Then the system registers 100 minutes as included and 20 minutes as bulk excess
    When the user consumes 2.5 GB of data during the billing cycle
    Then the system registers 2 GB as included and 512 MB as bulk excess
    When the user views the billing invoice for the cycle
    Then the invoice shows 20 voice minutes charged at bulk rate of 0.07 per minute totaling 1.40
    And the invoice shows 512 MB charged at bulk rate of 0.2033 per MB totaling 104.09