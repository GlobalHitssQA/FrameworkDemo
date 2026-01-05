package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator emptyState;
    private Locator profileContainer;
    private Locator apiRequestIndicator;

    public GitHubSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.emptyState = page.locator("[data-testid='empty-state']");
        this.profileContainer = page.locator("[data-testid='profile-container']");
        this.apiRequestIndicator = page.locator("[data-testid='api-requests-indicator']");
    }

    public void navigateToSearchPage() {
        page.navigate("https://github.com");
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForApiResponse() {
        page.waitForTimeout(2000);
    }

    public boolean isErrorMessageVisible() {
        try {
            return errorMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isEmptyStateVisible() {
        try {
            return emptyState.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getErrorMessageText() {
        if (isErrorMessageVisible()) {
            return errorMessage.textContent();
        } else if (isEmptyStateVisible()) {
            return emptyState.textContent();
        }
        return "";
    }

    public boolean isProfileDisplayed() {
        try {
            return profileContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}