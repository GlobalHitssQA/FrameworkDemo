Feature: Contract value breakdown popup visual design verification

  Scenario: Verify that the contract value breakdown popup complies with the established Look and Feel design
    Given the user is authenticated in the system
    And a contract with value data is selected
    When the user clicks on the total contract value component
    Then the breakdown popup is displayed correctly
    And the popup design matches the Look and Feel specifications from Figma
    And the popup elements like titles, monetary values and visual structure are consistent with the approved design
    And the popup maintains visual consistency with other Acticenter popup components