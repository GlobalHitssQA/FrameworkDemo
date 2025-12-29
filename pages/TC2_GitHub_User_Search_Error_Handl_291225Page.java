package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators are INFERRED based on best practices for a custom GitHub profile search application.
 * These locators use semantic data-testid attributes and stable CSS selectors.
 */
public class GitHubSearchPage {

    private final Page page;
    private final String baseUrl = "https://github.com";

    // Search Component Locators (INFERRED)
    private final Locator searchContainer;
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator searchIcon;

    // Error State Locators (INFERRED)
    private final Locator errorMessage;
    private final Locator emptyStateContainer;

    // User Profile Locators (INFERRED)
    private final Locator userAvatar;
    private final Locator userName;
    private final Locator userUsername;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsite;

    // Metrics Locators (INFERRED)
    private final Locator metricsSection;
    private final Locator reposCount;
    private final Locator followersCount;
    private final Locator followingCount;
    private final Locator gistsCount;

    // Dashboard and Followers Locators (INFERRED)
    private final Locator dashboardSection;
    private final Locator followButton;
    private final Locator followersList;
    private final Locator followerItem;

    // API Indicator Locators (INFERRED)
    private final Locator apiRequestsIndicator;

    public GitHubSearchPage(Page page) {
        this.page = page;

        // Search Component - using data-testid for robustness
        this.searchContainer = page.locator("[data-testid='search-container']");
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchIcon = page.locator("[data-testid='search-button'] svg, [data-testid='search-icon']");

        // Error State - multiple fallback selectors
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");
        this.emptyStateContainer = page.locator("[data-testid='empty-state'], .empty-state");

        // User Profile
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img.avatar");
        this.userName = page.locator("[data-testid='user-name'], .user-name, .fullname");
        this.userUsername = page.locator("[data-testid='user-username'], .user-username, .username");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, .bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company");
        this.userWebsite = page.locator("[data-testid='user-website'], .user-website");

        // Metrics
        this.metricsSection = page.locator("[data-testid='metrics-section'], .metrics-section, .user-metrics");
        this.reposCount = page.locator("[data-testid='repos-count'], .repos-count");
        this.followersCount = page.locator("[data-testid='followers-count'], .followers-count");
        this.followingCount = page.locator("[data-testid='following-count'], .following-count");
        this.gistsCount = page.locator("[data-testid='gists-count'], .gists-count");

        // Dashboard and Followers
        this.dashboardSection = page.locator("[data-testid='dashboard-section'], .dashboard-section, .user-dashboard");
        this.followButton = page.locator("[data-testid='follow-button'], .follow-button, button:has-text('Follow')");
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list");
        this.followerItem = page.locator("[data-testid='follower-item'], .follower-item");

        // API Indicator
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator'], .api-requests-indicator");
    }

    // Navigation Methods
    public void navigateToSearchComponent() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    public void navigateToUrl(String url) {
        page.navigate(url);
        page.waitForLoadState();
    }

    // Search Component Methods
    public boolean isSearchComponentDisplayed() {
        return searchContainer.isVisible() || searchInput.isVisible();
    }

    public boolean isSearchInputEmpty() {
        String value = searchInput.inputValue();
        return value == null || value.isEmpty();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResponse() {
        // Wait for either error message or user profile to appear
        page.waitForCondition(() -> 
            errorMessage.isVisible() || userAvatar.isVisible() || emptyStateContainer.isVisible(),
            new Page.WaitForConditionOptions().setTimeout(10000)
        );
    }

    // Error State Methods
    public boolean isErrorMessageDisplayed() {
        return errorMessage.isVisible() || emptyStateContainer.isVisible();
    }

    public String getErrorMessageText() {
        if (errorMessage.isVisible()) {
            return errorMessage.textContent();
        }
        if (emptyStateContainer.isVisible()) {
            return emptyStateContainer.textContent();
        }
        return "";
    }

    // User Profile Methods
    public boolean isUserAvatarDisplayed() {
        return userAvatar.isVisible();
    }

    public boolean isUserNameDisplayed() {
        return userName.isVisible();
    }

    public String getUserName() {
        return userName.textContent();
    }

    public String getUserUsername() {
        return userUsername.textContent();
    }

    public boolean isUserBioDisplayed() {
        return userBio.isVisible();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    // Metrics Methods
    public boolean isMetricsSectionDisplayed() {
        return metricsSection.isVisible();
    }

    public String getReposCount() {
        return reposCount.textContent();
    }

    public String getFollowersCount() {
        return followersCount.textContent();
    }

    public String getFollowingCount() {
        return followingCount.textContent();
    }

    public String getGistsCount() {
        return gistsCount.textContent();
    }

    // Dashboard Methods
    public boolean isDashboardSectionDisplayed() {
        return dashboardSection.isVisible();
    }

    // Followers Methods
    public boolean isFollowersListDisplayed() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followerItem.count();
    }

    public boolean isFollowButtonDisplayed() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // API Indicator Methods
    public boolean isApiRequestsIndicatorDisplayed() {
        return apiRequestsIndicator.isVisible();
    }

    public String getApiRequestsText() {
        return apiRequestsIndicator.textContent();
    }
}