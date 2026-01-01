package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS - Basados en buenas prácticas de desarrollo
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators inferidos - Search Component
    private Locator searchInput;
    private Locator searchButton;
    private Locator errorMessage;

    // Locators inferidos - Profile Container
    private Locator profileContainer;

    // Locators inferidos - Dashboard Metrics
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;

    // Locators inferidos - User Information
    private Locator userAvatar;
    private Locator userFullName;
    private Locator username;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;

    // Locators inferidos - Followers List
    private Locator followersList;
    private Locator followerItem;

    // Locators inferidos - API Limit Indicator
    private Locator apiLimitIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Component - usando data-testid semanticos
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.errorMessage = page.locator("[data-testid='error-message']");

        // Profile Container
        this.profileContainer = page.locator("[data-testid='profile-container']");

        // Dashboard Metrics
        this.reposMetric = page.locator("[data-testid='repos-metric']");
        this.followersMetric = page.locator("[data-testid='followers-metric']");
        this.followingMetric = page.locator("[data-testid='following-metric']");
        this.gistsMetric = page.locator("[data-testid='gists-metric']");

        // User Information
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.username = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Followers List
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItem = page.locator("[data-testid='follower-item']");

        // API Limit Indicator
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");
    }

    // Navigation Methods
    public void navigateToSearchComponent() {
        page.navigate(BASE_URL);
    }

    // Search Component Methods
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Profile Container Methods
    public boolean isProfileContainerVisible() {
        return profileContainer.isVisible();
    }

    public void waitForApiResponse() {
        profileContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    // Dashboard Metrics Methods
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

    // User Information Methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUserNameVisible() {
        return userFullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public String getUserFullName() {
        return userFullName.textContent();
    }

    public String getUsername() {
        return username.textContent();
    }

    public String getUserBio() {
        return userBio.textContent();
    }

    public String getUserLocation() {
        return userLocation.textContent();
    }

    public String getUserCompany() {
        return userCompany.textContent();
    }

    public String getUserWebLink() {
        return userWebLink.getAttribute("href");
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followerItem.count();
    }

    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }

    // API Limit Indicator Methods
    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public String getApiLimitText() {
        return apiLimitIndicator.textContent();
    }
}