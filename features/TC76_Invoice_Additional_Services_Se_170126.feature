Feature: Invoice Additional Services Section Display
  As a billing administrator
  I want to verify that the Additional Services section displays data traffic correctly
  So that General Motors lines in specific plans are billed properly

  Scenario: Verify data traffic for TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM and DORMANT plans in Additional Services section
    Given the user is authenticated in BSCS7 billing system
    And there are active lines with data consumption in plans TESTING, MANUFACTURE, UNSOLD NOT IN SHOWROOM, UNSOLD SHOWROOM and DORMANT
    When the user generates an invoice for General Motors client including these lines
    Then the system processes the billing including consumption from all these lines
    When the user navigates to the Additional Services section of the generated invoice
    Then the system displays the section with data consumption details
    And the data traffic for lines in TESTING plan is displayed correctly
    And the data traffic for lines in MANUFACTURE plan is displayed correctly
    And the data traffic for lines in UNSOLD NOT IN SHOWROOM plan is displayed correctly
    And the data traffic for lines in UNSOLD SHOWROOM plan is displayed correctly
    And the data traffic for lines in DORMANT plan is displayed correctly
    And all data consumption is billed at bulk rate of 0.2033 PEN per MB without IGV
    And the SMS consumption is displayed without modifications according to current treatment
    And the VOICE consumption is displayed without modifications according to current treatment