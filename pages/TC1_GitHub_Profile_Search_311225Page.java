package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Finder Application
 * Locators are INFERRED based on common UI patterns and best practices
 * since the actual application URL was not accessible for inspection
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Section Locators (INFERRED)
    private Locator searchInput;
    private Locator searchButton;
    private Locator loadingIndicator;

    // Metrics Dashboard Locators (INFERRED)
    private Locator metricsDashboard;
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;

    // User Profile Section Locators (INFERRED)
    private Locator profileSection;
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator webLink;
    private Locator followButton;

    // Followers List Locators (INFERRED)
    private Locator followersList;

    // API Requests Indicator Locators (INFERRED)
    private Locator requestsIndicator;

    // Error Message Locator (INFERRED)
    private Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Section - using semantic data-testid attributes (INFERRED)
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");

        // Metrics Dashboard (INFERRED)
        this.metricsDashboard = page.locator("[data-testid='metrics-dashboard']");
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");

        // User Profile Section (INFERRED)
        this.profileSection = page.locator("[data-testid='profile-section']");
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.biography = page.locator("[data-testid='user-biography']");
        this.location = page.locator("[data-testid='user-location']");
        this.company = page.locator("[data-testid='user-company']");
        this.webLink = page.locator("[data-testid='user-weblink']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Followers List (INFERRED)
        this.followersList = page.locator("[data-testid='followers-list']");

        // API Requests Indicator (INFERRED)
        this.requestsIndicator = page.locator("[data-testid='requests-indicator']");

        // Error Message (INFERRED)
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Navigation Methods
    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search Interaction Methods
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    // Visibility Check Methods - Search Section
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isLoadingIndicatorDisplayed() {
        return loadingIndicator.isVisible();
    }

    // Wait Methods
    public void waitForProfileToLoad() {
        profileSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public void waitForLoadingToDisappear() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
    }

    // Visibility Check Methods - Metrics Dashboard
    public boolean isMetricsDashboardVisible() {
        return metricsDashboard.isVisible();
    }

    public boolean isReposMetricVisible() {
        return reposMetric.isVisible();
    }

    public boolean isFollowersMetricVisible() {
        return followersMetric.isVisible();
    }

    public boolean isFollowingMetricVisible() {
        return followingMetric.isVisible();
    }

    public boolean isGistsMetricVisible() {
        return gistsMetric.isVisible();
    }

    // Get Metrics Values
    public String getReposCount() {
        return reposMetric.locator(".metric-value, [data-testid='metric-value']").textContent();
    }

    public String getFollowersCount() {
        return followersMetric.locator(".metric-value, [data-testid='metric-value']").textContent();
    }

    public String getFollowingCount() {
        return followingMetric.locator(".metric-value, [data-testid='metric-value']").textContent();
    }

    public String getGistsCount() {
        return gistsMetric.locator(".metric-value, [data-testid='metric-value']").textContent();
    }

    // Visibility Check Methods - Profile Section
    public boolean isProfileSectionVisible() {
        return profileSection.isVisible();
    }

    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isBiographyVisible() {
        return biography.isVisible();
    }

    public boolean isLocationVisible() {
        return location.isVisible();
    }

    public boolean isCompanyVisible() {
        return company.isVisible();
    }

    public boolean isWebLinkVisible() {
        return webLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    // Get User Details Text
    public String getFullNameText() {
        return fullName.textContent();
    }

    public String getUsernameText() {
        return username.textContent();
    }

    public String getBiographyText() {
        return biography.textContent();
    }

    public String getLocationText() {
        return location.textContent();
    }

    public String getCompanyText() {
        return company.textContent();
    }

    public String getWebLinkText() {
        return webLink.textContent();
    }

    // Follow Button Methods
    public void clickFollowButton() {
        followButton.click();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followersList.locator("[data-testid='follower-item']").count();
    }

    // API Requests Indicator Methods
    public boolean isRequestsIndicatorVisible() {
        return requestsIndicator.isVisible();
    }

    public String getRequestsIndicatorText() {
        return requestsIndicator.textContent();
    }

    // Error Message Methods
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Avatar Image Source
    public String getAvatarImageSrc() {
        return userAvatar.getAttribute("src");
    }
}