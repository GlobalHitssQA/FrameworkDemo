package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * LOCATORS: INFERIDOS - basados en buenas prácticas y descripción del componente
 */
public class GitHubProfileSearchPage {

    private Page page;
    private String baseUrl;

    // Search Component Locators (inferidos)
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;

    // Profile Dashboard Locators (inferidos)
    private Locator userAvatar;
    private Locator username;
    private Locator fullName;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator websiteLink;
    private Locator followButton;

    // Metrics Dashboard Locators (inferidos)
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;

    // Followers List Locators (inferidos)
    private Locator followersList;
    private Locator followerItem;
    private Locator followerAvatar;
    private Locator followerLink;

    // API Limit Indicator (inferido)
    private Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.baseUrl = "https://github.com";
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - inferidos con data-testid semánticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");

        // Profile Dashboard - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.username = page.locator("[data-testid='username']");
        this.fullName = page.locator("[data-testid='full-name']");
        this.biography = page.locator("[data-testid='biography']");
        this.location = page.locator("[data-testid='location']");
        this.company = page.locator("[data-testid='company']");
        this.websiteLink = page.locator("[data-testid='website-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Metrics Dashboard - inferidos
        this.reposMetric = page.locator("[data-testid='repos-metric']");
        this.followersMetric = page.locator("[data-testid='followers-metric']");
        this.followingMetric = page.locator("[data-testid='following-metric']");
        this.gistsMetric = page.locator("[data-testid='gists-metric']");

        // Followers List - inferidos
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItem = page.locator("[data-testid='follower-item']");
        this.followerAvatar = page.locator("[data-testid='follower-avatar']");
        this.followerLink = page.locator("[data-testid='follower-link']");

        // API Limit Indicator - inferido
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");
    }

    // Navigation
    public void navigateToSearchComponent() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }

    // Search Actions
    public void enterUsername(String usernameText) {
        searchInput.fill(usernameText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void searchUser(String usernameText) {
        enterUsername(usernameText);
        clickSearchButton();
    }

    public void clearSearchInput() {
        searchInput.clear();
    }

    // Wait Methods
    public void waitForApiResponse() {
        page.waitForResponse(response -> 
            response.url().contains("api.github.com/users") && 
            response.status() == 200
        );
    }

    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Visibility Checks - Search Component
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    // Visibility Checks - Profile Dashboard
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isFullNameVisible() {
        return fullName.isVisible();
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

    public boolean isWebsiteLinkVisible() {
        return websiteLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    // Visibility Checks - Metrics
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

    // Visibility Checks - Followers List
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    // Get Text Methods
    public String getUsername() {
        return username.textContent();
    }

    public String getFullName() {
        return fullName.textContent();
    }

    public String getBiography() {
        return biography.textContent();
    }

    public String getLocation() {
        return location.textContent();
    }

    public String getCompany() {
        return company.textContent();
    }

    public String getWebsiteLink() {
        return websiteLink.getAttribute("href");
    }

    public String getReposCount() {
        return reposMetric.textContent();
    }

    public String getFollowersCount() {
        return followersMetric.textContent();
    }

    public String getFollowingCount() {
        return followingMetric.textContent();
    }

    public String getGistsCount() {
        return gistsMetric.textContent();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Followers List Methods
    public int getFollowersListCount() {
        return followerItem.count();
    }

    public void clickFollowerAtIndex(int index) {
        followerItem.nth(index).click();
    }

    public String getFollowerUsernameAtIndex(int index) {
        return followerLink.nth(index).textContent();
    }

    // Follow Button Action
    public void clickFollowButton() {
        followButton.click();
    }

    // Scroll Followers List
    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }
}