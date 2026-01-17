Feature: Verify included voice minutes application in UNSOLD SHOWROOM plan

  Scenario: Verify 100 included voice minutes are correctly applied when a line makes calls within the limit
    Given a line is provisioned in UNSOLD SHOWROOM plan with included benefits
    And the plan has 100 voice minutes, 100 SMS and 2 GB included
    When the user consumes 60 voice minutes during the billing cycle
    Then the system registers the consumption of 60 minutes deducted from the 100 included
    And the remaining voice minutes balance shows 40 minutes
    And the invoice does not show charges for the 60 consumed minutes