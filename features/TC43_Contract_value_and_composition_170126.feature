Feature: Contract value and composition component for Banca Privada Persona Moral

  Scenario: Verify the display and functionality of the contract value and composition component for Persona Moral in Banca Privada
    Given the user is authenticated in Acticenter with Banca Privada profile
    When the user selects a Persona Moral contract from Banca Privada
    Then the contract value and composition component is displayed
    And the total contract value is shown with the review date
    When the user clicks on the component to expand the breakdown
    Then a popup with detailed breakdown is displayed
    And all applicable sections for Persona Moral are visible including cash MXN and USD and pending settlements and debt funds and hedge funds and equity funds and cash in transit and certificates and money market and capital market