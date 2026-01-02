package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfileSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator emptyState;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator followersSection;
    private Locator metricsContainer;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.emptyState = page.locator("[data-testid='empty-state']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.followersSection = page.locator("[data-testid='followers-section']");
        this.metricsContainer = page.locator("[data-testid='metrics-container']");
    }

    public void navigateToSearchPage() {
        page.navigate("https://github.com");
    }

    public boolean isSearchComponentVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForAPIResponse() {
        page.waitForTimeout(2000);
        page.waitForLoadState();
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

    public boolean isProfileDataVisible() {
        try {
            return userAvatar.isVisible() || 
                   userName.isVisible() || 
                   userBio.isVisible() || 
                   followersSection.isVisible() || 
                   metricsContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}