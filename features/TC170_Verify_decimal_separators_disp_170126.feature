Feature: Verify decimal separators display correctly according to regional settings

  Scenario: Validate Mexican regional format for decimal and thousand separators in contract amounts
    Given the user is authenticated in Acticenter with Mexican regional configuration
    When the user selects a contract and expands the value and composition breakdown
    Then all amounts should display period as decimal separator and comma as thousand separator
    And amounts with decimals in all breakdown items should follow Mexican format
    And amounts without decimals should display .00 at the end
    And the separator format should comply with regional configuration standards