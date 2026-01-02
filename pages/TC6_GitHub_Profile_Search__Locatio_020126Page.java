package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class GitHubProfileSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator userDetailsSection;
    private Locator locationField;
    private Locator userAvatar;
    private Locator userName;
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='username'], #search-username");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label='Search'], button.search-btn");
        this.userDetailsSection = page.locator("[data-testid='user-details'], .user-info-section, .profile-left-section");
        this.locationField = page.locator("[data-testid='user-location'], .user-location, [aria-label='Location']");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img[alt*='avatar']");
        this.userName = page.locator("[data-testid='user-name'], .user-name, h1.profile-name");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-msg, .not-found-message");
    }

    public void navigateTo(String url) {
        page.navigate(url);
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isUserDetailsVisible() {
        return userDetailsSection.isVisible();
    }

    public boolean isLocationFieldPresent() {
        return locationField.count() > 0;
    }

    public String getLocationText() {
        if (locationField.count() == 0) {
            return null;
        }
        return locationField.textContent();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getUserName() {
        return userName.textContent();
    }
}