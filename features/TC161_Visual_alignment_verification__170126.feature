Feature: Visual alignment verification of value and contract composition component in WM Responsive

  Scenario: Verify visual alignment of contract value and composition component matches Figma design specifications
    Given the user is authenticated in Acticenter WM Responsive
    And the main screen of Acticenter WM Responsive is displayed
    When the user searches and selects a contract from the search
    Then the contract information is displayed with the value and composition component visible
    And the component alignment matches the Figma WM Responsive design specifications for position margins and padding
    And the breakdown list is vertically aligned with the total contract value component