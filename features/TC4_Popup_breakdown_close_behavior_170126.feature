Feature: Popup breakdown close behavior

  Scenario: Close popup breakdown by clicking outside the component
    Given the user is authenticated in Acticenter with a selected contract
    When the user clicks on the total contract value component
    Then the system displays the popup with the contract breakdown
    When the user clicks outside the popup and component area
    Then the system automatically closes the breakdown popup
    And the total contract value component remains visible in its original position