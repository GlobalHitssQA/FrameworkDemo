Feature: In Pool Package Calculation Verification
  As a billing system administrator
  I want to verify the Shell calculates In Pool packages correctly
  So that customers are billed accurately based on active SOLD lines

  Scenario: Verify Shell calculates 10MB In Pool packages based on active SOLD lines during billing cycle
    Given I have access to the billing system with SOLD rate plan data
    And the In Pool calculation Shell is operational
    And the parametric table has package cost configured at 1.30 soles
    When I query the total count of lines in SOLD rate plan during the billing cycle
    And I manually calculate the expected In Pool quota by multiplying SOLD lines by 10 MB
    And I execute the In Pool calculation Shell
    And I verify the Shell log shows the calculated In Pool quota
    And I calculate the number of 10MB packages by dividing total quota by 10
    Then the OCC In Pool Service amount should equal the package count multiplied by 1.30 soles