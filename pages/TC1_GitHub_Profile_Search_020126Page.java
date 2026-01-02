package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Application
 * NOTE: Locators are INFERRED based on common patterns and best practices.
 * The actual application UI elements may require adjustment of these selectors.
 */
public class GitHubProfileSearchPage {

    private final Page page;

    // Search Component Locators (INFERRED)
    private final Locator searchInput;
    private final Locator searchButton;

    // Metrics Dashboard Locators (INFERRED)
    private final Locator reposMetric;
    private final Locator followersMetric;
    private final Locator followingMetric;
    private final Locator gistsMetric;

    // User Details Locators (INFERRED)
    private final Locator userAvatar;
    private final Locator fullName;
    private final Locator username;
    private final Locator biography;
    private final Locator location;
    private final Locator company;
    private final Locator webLink;
    private final Locator followButton;

    // Followers List Locators (INFERRED)
    private final Locator followersList;
    private final Locator followerItems;
    private final Locator firstFollowerAvatar;
    private final Locator firstFollowerUsername;
    private final Locator firstFollowerProfileLink;

    // API Counter Locator (INFERRED)
    private final Locator apiRequestCounter;

    // Error Message Locator (INFERRED)
    private final Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;

        // Search Component - INFERRED locators using data-testid pattern
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");

        // Metrics Dashboard - INFERRED locators
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");

        // User Details - INFERRED locators
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.fullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.biography = page.locator("[data-testid='user-biography']");
        this.location = page.locator("[data-testid='user-location']");
        this.company = page.locator("[data-testid='user-company']");
        this.webLink = page.locator("[data-testid='user-weblink']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Followers List - INFERRED locators
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.firstFollowerAvatar = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-avatar']");
        this.firstFollowerUsername = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-username']");
        this.firstFollowerProfileLink = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-profile-link']");

        // API Counter - INFERRED locator
        this.apiRequestCounter = page.locator("[data-testid='api-request-counter']");

        // Error Message - INFERRED locator
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Navigation
    public void navigateTo(String url) {
        page.navigate(url);
        page.waitForLoadState();
    }

    // Search Actions
    public void enterUsername(String usernameText) {
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(2000); // Wait for API response
    }

    public void searchForUser(String usernameText) {
        enterUsername(usernameText);
        clickSearchButton();
    }

    // Search Component Visibility
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    // Metrics Visibility
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

    // Metrics Values
    public String getReposCount() {
        return reposMetric.textContent().trim();
    }

    public String getFollowersCount() {
        return followersMetric.textContent().trim();
    }

    public String getFollowingCount() {
        return followingMetric.textContent().trim();
    }

    public String getGistsCount() {
        return gistsMetric.textContent().trim();
    }

    // User Details Visibility
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

    // User Details Values
    public String getFullName() {
        return fullName.textContent().trim();
    }

    public String getUsername() {
        return username.textContent().trim();
    }

    public String getBiography() {
        return biography.textContent().trim();
    }

    public String getLocation() {
        return location.textContent().trim();
    }

    public String getCompany() {
        return company.textContent().trim();
    }

    public String getWebLink() {
        return webLink.getAttribute("href");
    }

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    // Follow Button Actions
    public void clickFollowButton() {
        followButton.click();
    }

    // Followers List
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followerItems.count();
    }

    public boolean isFirstFollowerAvatarVisible() {
        return firstFollowerAvatar.isVisible();
    }

    public boolean isFirstFollowerUsernameVisible() {
        return firstFollowerUsername.isVisible();
    }

    public boolean isFirstFollowerProfileLinkVisible() {
        return firstFollowerProfileLink.isVisible();
    }

    public void clickFirstFollowerProfileLink() {
        firstFollowerProfileLink.click();
        page.waitForLoadState();
    }

    public boolean isFollowersListScrollable() {
        String overflowY = followersList.evaluate("el => getComputedStyle(el).overflowY").toString();
        return overflowY.equals("auto") || overflowY.equals("scroll");
    }

    // API Request Counter
    public boolean isApiRequestCounterVisible() {
        return apiRequestCounter.isVisible();
    }

    public String getApiRequestCounterText() {
        return apiRequestCounter.textContent().trim();
    }

    // Error Handling
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }
}