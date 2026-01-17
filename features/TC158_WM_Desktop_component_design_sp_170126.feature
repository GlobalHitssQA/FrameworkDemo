Feature: WM Desktop component design specifications compliance

  Scenario: Verify that the component implemented in WM Desktop view complies with Figma design specifications
    Given the user has access to Figma design specifications for WM Desktop
    And the value and composition component is implemented in WM Desktop view
    When the user compares the total value component design with Figma WM Desktop specifications
    Then the total value component matches pixel-perfect with Figma WM design
    When the user compares the breakdown popup design with Figma WM Desktop specifications
    Then the breakdown popup matches Figma WM design in position size and alignment
    When the user verifies colors typography and spacing against WM Desktop style guide
    Then all visual elements comply with Wealth Management style guide
    When the user verifies the distribution tooltip presentation
    Then the tooltip displays with text and behavior defined in Figma WM
    And any deviations between implementation and Figma WM design are documented