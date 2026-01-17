Feature: B2B2C 180GB Package Creation in BSCS7

  Scenario: Create B2B2C 180GB package with 36 months validity for SOLD plan
    Given the user is authenticated in BSCS7 with package configuration permissions
    When the user navigates to the package administration module
    Then the package administration module is displayed
    When the user enters the B2B2C 180GB package data with capacity 180GB and cost 254.24 without IGV and validity 1080 days
    Then the system registers the package with individual mode and local coverage without Roaming
    When the user associates the B2B2C 180GB package to the SOLD plan RatePlan3
    Then the system confirms the package association to SOLD plan
    When the user queries the availability of B2B2C 180GB package for SOLD plan
    Then the package B2B2C 180GB is displayed with 36 months validity and cost 254.24 without IGV associated to SOLD plan