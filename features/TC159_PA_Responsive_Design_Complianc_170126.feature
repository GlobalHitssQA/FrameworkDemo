Feature: PA Responsive Design Compliance Verification

  Scenario: Verify contract value and composition component complies with Figma specifications on mobile devices
    Given the user has access to the PA Responsive application
    When the user views the component in Landscape mode at 1024px width
    Then the component should adapt correctly to horizontal orientation
    When the user views the component in Portrait mode at 768px width
    Then the component should adapt correctly to vertical orientation
    When the user taps on the contract value component
    Then the breakdown popup should be displayed correctly
    And the popup should adapt to both Landscape and Portrait orientations
    When the user verifies the responsive breakpoints
    Then the breakpoint at 768px should function correctly
    And the breakpoint at 1024px should function correctly
    When the user taps to close the breakdown popup
    Then the popup should close successfully
    And any design deviations should be documented