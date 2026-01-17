Feature: Validate UNSOLD SHOWROOM Rate Plan Configuration in BSCS7

  Scenario: Verify UNSOLD SHOWROOM Rate Plan configuration with included units, APNs and overage rates
    Given the user is logged into BSCS7 system with query permissions
    When the user navigates to Rate Plan configuration for UNSOLD SHOWROOM
    Then the Rate Plan UNSOLD SHOWROOM should be displayed and homologated with RP2
    And the Free Units tables should show 100 voice minutes, 100 SMS and 2 GB data with monthly renewal
    When the user checks the Split Billing configuration table
    Then all productive APNs APN1 through APN7 should be associated to the plan
    And APN3 esim.amx and APN7 onstarsuman should have zero cost for eSIM profile download
    When the user verifies the overage rates in SYSADM.RATEPLAN table
    Then the bulk rates should be configured as VOZ 0.07 per minute, SMS 0.05 per message and DATA 0.2033 per MB