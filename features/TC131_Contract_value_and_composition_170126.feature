Feature: Contract value and composition component compatibility in Firefox

  Scenario: Verify the contract value and composition component displays correctly in Firefox browser when breakdown is expanded
    Given the user opens Acticenter application in Firefox browser
    And the user is authenticated in the system
    When the user selects a previously registered contract
    Then the contract value and composition component is displayed
    When the user clicks on the component to expand the contract value breakdown
    Then the breakdown popup is displayed with all corresponding items
    And the breakdown shows Purchasing power MXN item
    And the breakdown shows Cash MXN item
    And the breakdown shows Cash USD item
    And the breakdown shows Pending settlement item
    And the breakdown shows Funds item
    And the breakdown shows Cedes and promissory notes item
    And the breakdown shows Money market item
    And the breakdown shows Capital market item
    And all visual elements are correctly aligned without distortions
    And monetary values are right-aligned
    And the list items are vertically aligned