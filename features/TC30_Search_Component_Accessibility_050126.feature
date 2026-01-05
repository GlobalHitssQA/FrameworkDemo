Feature: Search Component Accessibility Verification

  Scenario: Verify search component meets WCAG accessibility standards
    Given the user navigates to GitHub homepage
    When the user inspects the search input field HTML
    Then the search input should have appropriate ARIA labels or label elements
    When the user inspects the search button HTML
    Then the search button should have accessible name for screen readers
    When the user navigates to search input with keyboard
    Then the search input should be keyboard accessible with visible focus
    When the user navigates to search button with keyboard
    Then the search button should be keyboard accessible with visible focus
    When the user performs a search for a valid username
    Then the search component should manage focus properly
    When the user searches for a non-existent user
    Then error messages should be accessible with ARIA live regions
    When the user verifies color contrast ratios
    Then all text should meet WCAG 2.1 AA standards with minimum 4.5:1 contrast