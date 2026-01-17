Feature: Contract value component does not interfere with operation flow

  Scenario: Verify contract value and composition component does not interfere with other elements in Acticenter operation flow
    Given the user is authenticated and accesses a contract in Acticenter
    When the interface loads completely
    Then the total value component and other operation flow elements should be visible
    When the user clicks on the total value component to display the breakdown popup
    Then the popup should display without affecting the position or visibility of other components
    When the user clicks on the buy/sell icon or another flow element with the popup open
    Then the popup should close automatically
    When the user performs a client/contract search using the header search icon while the component is visible
    Then the search functionality should operate normally without being blocked by the total value component
    When the user changes to a different contract
    Then the total value component should update correctly showing the new contract data without interfering with the transition