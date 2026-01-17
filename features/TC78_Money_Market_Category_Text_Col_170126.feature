Feature: Money Market Category Text Color Validation
  As a user of Acticenter
  I want to verify the text color of the Money Market category
  So that it complies with the Look & Feel specifications

  Scenario: Verify Money Market text color meets design specifications
    Given the user is authenticated and on the Acticenter main screen
    When the user selects a contract with money market investments
    And the user clicks on the total contract value component
    Then the contract value breakdown popup is displayed
    And the Money Market category text color complies with Look & Feel specifications