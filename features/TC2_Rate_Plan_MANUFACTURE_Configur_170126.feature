Feature: Rate Plan MANUFACTURE Configuration Validation
  As a system administrator
  I want to verify the Rate Plan MANUFACTURE configuration in BSCS7
  So that manufacturing stage lines are provisioned correctly

  Scenario: Validate Rate Plan MANUFACTURE configuration and tariffs
    Given I am logged into the BSCS7 system with query permissions
    When I access the Rate Plan MANUFACTURE configuration
    Then the Rate Plan MANUFACTURE should be configured and homologated with current RP1
    And the Free Units table should display 10 minutes VOZ with monthly renewal
    And the Free Units table should display 10 SMS with monthly renewal
    And the Free Units table should display 100 MB data with monthly renewal
    When I verify the assigned APNs for Rate Plan MANUFACTURE
    Then the system should show APN1 APN2 APN3 APN4 APN5 APN6 and APN7 associated
    And APN3 should be configured with zero tariff for eSIM profile download
    And APN7 should be configured with zero tariff for eSIM profile download
    When I check the excess consumption tariffs configuration
    Then VOZ excess tariff should be configured at 0.07 soles per minute without IGV
    And SMS excess tariff should be configured at 0.05 soles per message without IGV
    And DATA excess tariff should be configured at 0.2033 soles per MB without IGV