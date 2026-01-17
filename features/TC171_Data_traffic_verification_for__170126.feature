Feature: Data traffic verification for UNSOLD - SHOWROOM plan

  Scenario: Verify data traffic billing when a line consumes data through productive APNs
    Given a line is provisioned in the UNSOLD - SHOWROOM plan with productive APNs
    When the line generates 150 MB of data traffic through productive APNs
    Then the system records the consumption in the UDR_LT_01 table
    And the system discounts 100 MB included in the plan
    And the system charges 50 MB excess at bulk rate of 0.2033 per MB
    And the total excess charge is 10.17 soles without IGV