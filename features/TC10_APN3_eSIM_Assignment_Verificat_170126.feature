Feature: APN3 eSIM Assignment Verification for Rate Plans

  Scenario: Verify APN3 esim.amx assignment across all productive rate plans for eSIM profile download
    Given the user has access to INSTANT LINK and BSCS7 with query permissions
    And the APN3 esim.amx is configured as a separate APN from APN2
    And the tariffs are configured with zero cost for APN3
    When the user provisions a line in Rate Plan TESTING
    Then the system should show that APN3 esim.amx is not assigned to Rate Plan TESTING
    When the user provisions a line in Rate Plan MANUFACTURE
    Then the system should show APN3 esim.amx assigned with zero cost configuration
    When the user provisions a line in Rate Plan UNSOLD NOT IN SHOWROOM
    Then the system should show APN3 esim.amx assigned correctly without cost
    When the user provisions a line in Rate Plan UNSOLD SHOWROOM
    Then the system should show APN3 esim.amx assigned correctly without cost
    When the user provisions a line in Rate Plan SOLD
    Then the system should show APN3 esim.amx assigned correctly for profile download
    When the user provisions a line in Rate Plan DORMANT
    Then the system should show APN3 esim.amx assigned correctly without cost
    When the user verifies traffic records in BSCS7 UDR_LT_01 table for APN3
    Then the system should show traffic records with zero cost value