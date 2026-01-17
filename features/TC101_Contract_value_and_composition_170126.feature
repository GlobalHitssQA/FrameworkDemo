Feature: Contract value and composition component typography verification

  Scenario: Verify typography font of contract value and composition component in Acticenter
    Given the user is authenticated in Acticenter as an authorized advisor or banker
    When the user selects an active contract for Individual or Legal Entity
    Then the system displays the contract value and composition component
    When the user inspects the typography font of the component title and monetary values
    Then the typography font complies with the Look and Feel specifications
    When the user clicks on the component to open the breakdown popup
    Then the popup displays showing the breakdown of items
    And all item texts and monetary values use the specified typography font