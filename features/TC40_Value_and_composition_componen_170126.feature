Feature: Value and composition component in Responsive Landscape view for Banca Patrimonial

  Scenario: Verify deployment and functionality of value and composition component in Responsive Landscape view
    Given the user is authenticated in Acticenter with Banca Patrimonial credentials on a Landscape oriented device
    When the user selects a Banca Patrimonial contract from the query screen
    Then the system displays the contract with the total value component adapted to Landscape view
    When the user clicks on the value and composition component to expand the breakdown
    Then the system displays the popup with the breakdown of items optimized for Landscape view
    And all applicable Banca Patrimonial items are displayed with correct monetary format and right-aligned values
    When the user clicks outside the breakdown component to close it
    Then the system closes the popup and returns to the main contract view
    When the user uses the search magnifying glass function to search for another client or contract
    Then the system presents the search screen and allows selecting the BP or contract to view