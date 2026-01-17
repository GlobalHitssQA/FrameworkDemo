Feature: Contract value and composition component compatibility on Edge browser

  Scenario: Verify contract value component breakdown display on Microsoft Edge
    Given the user is authenticated in Acticenter application on Edge browser
    When the user selects a previously registered contract
    Then the contract value and composition component is displayed
    When the user clicks on the component to expand the breakdown
    Then the breakdown popup displays all corresponding items
    And all visual elements are properly aligned and formatted