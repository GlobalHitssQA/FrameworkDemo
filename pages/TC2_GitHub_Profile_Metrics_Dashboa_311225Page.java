package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Finder component.
 * Locators are INFERRED based on best practices for a custom GitHub profile search application.
 * These selectors use semantic data-testid attributes and stable CSS selectors.
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private final String baseUrl = "https://github.com";

    // Search Component Locators (INFERRED)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator searchIcon;

    // Profile Information Locators (INFERRED)
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator userName;
    private final Locator userBio;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsite;
    private final Locator followButton;

    // Metrics Dashboard Locators (INFERRED)
    private final Locator reposMetricCard;
    private final Locator reposCountValue;
    private final Locator followersMetricCard;
    private final Locator followersCountValue;
    private final Locator followingMetricCard;
    private final Locator followingCountValue;
    private final Locator gistsMetricCard;
    private final Locator gistsCountValue;

    // Followers List Locators (INFERRED)
    private final Locator followersList;
    private final Locator followerItem;
    private final Locator followerAvatar;
    private final Locator followerProfileLink;

    // Error and Status Locators (INFERRED)
    private final Locator userNotFoundError;
    private final Locator rateLimitIndicator;
    private final Locator loadingSpinner;
    private final Locator profileContainer;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;

        // Search Component - using data-testid for robustness
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchIcon = page.locator("[data-testid='search-icon']");

        // Profile Information - using data-testid and semantic selectors
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userName = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebsite = page.locator("[data-testid='user-website']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Dashboard Cards - using data-testid for each metric
        this.reposMetricCard = page.locator("[data-testid='metric-repos']");
        this.reposCountValue = page.locator("[data-testid='repos-count']");
        this.followersMetricCard = page.locator("[data-testid='metric-followers']");
        this.followersCountValue = page.locator("[data-testid='followers-count']");
        this.followingMetricCard = page.locator("[data-testid='metric-following']");
        this.followingCountValue = page.locator("[data-testid='following-count']");
        this.gistsMetricCard = page.locator("[data-testid='metric-gists']");
        this.gistsCountValue = page.locator("[data-testid='gists-count']");

        // Followers List
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItem = page.locator("[data-testid='follower-item']");
        this.followerAvatar = page.locator("[data-testid='follower-avatar']");
        this.followerProfileLink = page.locator("[data-testid='follower-profile-link']");

        // Error and Status
        this.userNotFoundError = page.locator("[data-testid='user-not-found-error']");
        this.rateLimitIndicator = page.locator("[data-testid='rate-limit-indicator']");
        this.loadingSpinner = page.locator("[data-testid='loading-spinner']");
        this.profileContainer = page.locator("[data-testid='profile-container']");
    }

    // Navigation Methods
    public void navigateToProfileFinder() {
        page.navigate(baseUrl);
    }

    public void navigateToProfileFinder(String url) {
        page.navigate(url);
    }

    // Search Component Methods
    public boolean isSearchComponentVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
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

    public void searchForUser(String username) {
        enterUsername(username);
        clickSearchButton();
        waitForProfileToLoad();
    }

    // Wait Methods
    public void waitForProfileToLoad() {
        loadingSpinner.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.HIDDEN)
            .setTimeout(10000));
        profileContainer.waitFor(new Locator.WaitForOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean isProfileLoaded() {
        return profileContainer.isVisible() && !loadingSpinner.isVisible();
    }

    // Profile Information Methods
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    public String getFullName() {
        return userFullName.textContent().trim();
    }

    public String getUsername() {
        return userName.textContent().trim();
    }

    public String getBio() {
        return userBio.textContent().trim();
    }

    public String getLocation() {
        return userLocation.textContent().trim();
    }

    public String getCompany() {
        return userCompany.textContent().trim();
    }

    public String getWebsite() {
        return userWebsite.textContent().trim();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // Metrics Dashboard Methods - Repos
    public boolean isReposMetricVisible() {
        return reposMetricCard.isVisible();
    }

    public String getReposCount() {
        return reposCountValue.textContent().trim();
    }

    // Metrics Dashboard Methods - Followers
    public boolean isFollowersMetricVisible() {
        return followersMetricCard.isVisible();
    }

    public String getFollowersCount() {
        return followersCountValue.textContent().trim();
    }

    // Metrics Dashboard Methods - Following
    public boolean isFollowingMetricVisible() {
        return followingMetricCard.isVisible();
    }

    public String getFollowingCount() {
        return followingCountValue.textContent().trim();
    }

    // Metrics Dashboard Methods - Gists
    public boolean isGistsMetricVisible() {
        return gistsMetricCard.isVisible();
    }

    public String getGistsCount() {
        return gistsCountValue.textContent().trim();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followerItem.count();
    }

    public Locator getFollowerItemByIndex(int index) {
        return followerItem.nth(index);
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    // Error and Status Methods
    public boolean isUserNotFoundErrorVisible() {
        return userNotFoundError.isVisible();
    }

    public String getUserNotFoundErrorMessage() {
        return userNotFoundError.textContent().trim();
    }

    public boolean isRateLimitIndicatorVisible() {
        return rateLimitIndicator.isVisible();
    }

    public boolean isLoading() {
        return loadingSpinner.isVisible();
    }
}