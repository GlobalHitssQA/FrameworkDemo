Feature: Voice traffic billing for MANUFACTURE plan with VoLTE

  Scenario: Verify voice traffic billing considers 10 included minutes and excess at bulk rate with VoLTE enabled
    Given a line is provisioned in MANUFACTURE plan with 10 included voice minutes and VoLTE enabled
    And the system shows the line with 10 included minutes and SERVICE_VOLTE parameter active in BSCS7
    When the user makes 8 minutes of voice calls within the billing cycle
    Then the consumption is deducted from included minutes without additional charges
    When the user makes 5 additional minutes of calls exceeding the 10 included minutes
    Then the system registers 3 excess minutes at bulk rate of 0.07 per minute without tax
    And the invoice shows charges only for the 3 excess minutes at bulk rate
    And the network records confirm calls were made using VoLTE technology