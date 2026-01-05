package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class GitHubProfileSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator profileAvatar;
    private Locator profileName;
    private Locator repositoriesCount;
    private Locator followersCount;
    private Locator requestLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.profileAvatar = page.locator("[data-testid='user-avatar']");
        this.profileName = page.locator("[data-testid='user-name']");
        this.repositoriesCount = page.locator("[data-testid='repos-count']");
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.requestLimitIndicator = page.locator("[data-testid='request-limit-indicator']");
    }

    public void navigate() {
        page.navigate("https://github.com");
    }

    public boolean isSearchComponentDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isProfileDataDisplayed() {
        return profileAvatar.isVisible() && 
               profileName.isVisible() && 
               repositoriesCount.isVisible() && 
               followersCount.isVisible();
    }

    public boolean isRequestLimitIndicatorVisible() {
        return requestLimitIndicator.isVisible();
    }

    public String getRequestLimitIndicatorText() {
        return requestLimitIndicator.textContent().trim();
    }
}