Feature: Verify included SMS in UNSOLD - SHOWROOM plan

  Scenario: User sends SMS within the included limit of 100 SMS
    Given a line is provisioned with UNSOLD - SHOWROOM plan with 100 included SMS
    When the user sends 75 SMS during the billing cycle
    And the user checks the remaining SMS balance
    Then the system should show 25 SMS remaining from the 100 included
    And the invoice should not show any charge for the 75 SMS consumed