Feature: Contract value breakdown monetary format validation

  Scenario: Verify all monetary amounts display correct format with thousand separators and decimals
    Given the user is authenticated in Acticenter
    And a contract with multiple monetary value items is selected
    When the user clicks on the total contract value component
    Then the breakdown popup is displayed with detailed contract value
    And all monetary amounts display thousand separators with commas
    And all monetary amounts display exactly two decimal places
    And all amounts greater than 999 include comma thousand separators
    And all monetary values start with the peso symbol