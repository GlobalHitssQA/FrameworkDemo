Feature: Popup breakdown responsive positioning

  Scenario: Verify popup breakdown displays correctly across different screen resolutions
    Given the user is authenticated and navigates to an active contract in Acticenter
    When the user sets the browser resolution to 1920x1080 Full HD
    And the user clicks on the total value component to display the popup
    Then the popup should be displayed with correct positioning and alignment
    When the user changes the browser resolution to 1366x768
    And the user clicks on the total value component to display the popup
    Then the popup should adapt correctly to the new resolution maintaining functionality and legibility
    When the user changes the browser resolution to 1280x720
    And the user clicks on the total value component to display the popup
    Then the popup should display correctly within screen boundaries
    When the user changes the browser resolution to 768x1024 tablet portrait mode
    And the user clicks on the total value component to display the popup
    Then the popup should adjust to responsive view maintaining functionality
    And the popup should maintain vertical alignment with the total value component across all resolutions