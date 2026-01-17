Feature: Verify pending settlement amounts in Bank contract breakdown

  Scenario: Verify monetary accumulated value of Pending Settlement item in Bank contract breakdown
    Given the user is authenticated in Acticenter with Patrimonial Banking profile
    When the user selects a Bank type contract with pending settlement operations
    And the user clicks on the total contract value component
    Then the system displays a popup with the contract value breakdown
    And the user locates the Pending Settlement item in the breakdown list
    And the Pending Settlement item displays the correct monetary accumulated value