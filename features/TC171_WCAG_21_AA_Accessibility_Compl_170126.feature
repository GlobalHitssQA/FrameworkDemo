Feature: WCAG 2.1 AA Accessibility Compliance for Contract Value and Composition Component

  Scenario: Verify WCAG 2.1 level AA accessibility standards compliance in contract value and composition component
    Given the user is authenticated in Acticenter with an active contract
    When the user accesses the contract value and composition component
    Then the component should be displayed correctly on screen
    And the color contrast should meet WCAG 2.1 AA minimum ratio of 4.5:1 for normal text and 3:1 for large text
    And all interactive elements should be accessible via keyboard navigation
    And the tab order should follow a logical and coherent sequence
    And the automated accessibility audit should report no critical AA level errors