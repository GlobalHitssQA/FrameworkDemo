package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class GitHubSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator emptyStateMessage;
    private Locator profileContainer;
    private Locator errorMessage;

    public GitHubSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas de naming
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.emptyStateMessage = page.locator("[data-testid='empty-state']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.profileContainer = page.locator("[data-testid='profile-container']");
    }

    public void navigateTo() {
        page.navigate("https://github.com");
        page.waitForLoadState();
    }

    public void searchForUser(String username) {
        searchInput.fill(username);
        searchButton.click();
        page.waitForTimeout(1000); // Wait for API response
    }

    public boolean isSearchComponentVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public boolean isEmptyStateVisible() {
        // Check if either empty state or error message is visible
        return emptyStateMessage.isVisible() || errorMessage.isVisible();
    }

    public String getEmptyStateMessage() {
        if (emptyStateMessage.isVisible()) {
            return emptyStateMessage.textContent();
        } else if (errorMessage.isVisible()) {
            return errorMessage.textContent();
        }
        return null;
    }

    public boolean isProfileDisplayed() {
        return profileContainer.isVisible();
    }
}