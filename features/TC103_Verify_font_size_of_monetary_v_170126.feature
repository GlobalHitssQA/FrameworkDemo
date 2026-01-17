Feature: Verify font size of monetary values in contract component and breakdown

  Scenario: Validate font size compliance with Look and Feel specifications
    Given the user is authenticated in Acticenter
    And the user selects a contract with monetary values in different categories
    Then the system displays the component with the total contract value
    When the user verifies the font size of the total value in the main component
    Then the font size of the total value complies with Look and Feel specifications
    When the user clicks on the component to open the breakdown popup
    Then the popup displays showing monetary values for each category on the right side
    When the user inspects the font size of each monetary value in the breakdown
    Then all monetary values use the font size specified in Look and Feel
    And values with format $0.00 maintain the same font size as positive balance values