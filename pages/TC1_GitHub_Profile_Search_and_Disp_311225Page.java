package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * LOCATORS: INFERIDOS (no se encontró la aplicación real en la URL proporcionada)
 * Los locators están basados en buenas prácticas con data-testid semánticos
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private static final String BASE_URL = "https://github.com";

    // Search Section Locators (INFERIDOS)
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator searchIcon;

    // Metrics Dashboard Locators (INFERIDOS)
    private final Locator reposMetric;
    private final Locator followersMetric;
    private final Locator followingMetric;
    private final Locator gistsMetric;
    private final Locator reposCount;
    private final Locator followersCount;
    private final Locator followingCount;
    private final Locator gistsCount;

    // User Profile Section Locators (INFERIDOS)
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator userUsername;
    private final Locator userBiography;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebLink;
    private final Locator followButton;

    // Followers List Section Locators (INFERIDOS)
    private final Locator followersList;
    private final Locator followerItems;
    private final Locator followerAvatars;
    private final Locator followerUsernames;
    private final Locator followerProfileLinks;

    // API Limit Indicator Locators (INFERIDOS)
    private final Locator apiLimitIndicator;

    // Error Message Locator (INFERIDOS)
    private final Locator errorMessage;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;

        // Search Section - Locators inferidos con data-testid
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchIcon = page.locator("[data-testid='search-button'] svg, [data-testid='search-icon']");

        // Metrics Dashboard - Locators inferidos
        this.reposMetric = page.locator("[data-testid='metric-repos']");
        this.followersMetric = page.locator("[data-testid='metric-followers']");
        this.followingMetric = page.locator("[data-testid='metric-following']");
        this.gistsMetric = page.locator("[data-testid='metric-gists']");
        this.reposCount = page.locator("[data-testid='repos-count']");
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");

        // User Profile Section - Locators inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBiography = page.locator("[data-testid='user-biography']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-weblink']");
        this.followButton = page.locator("[data-testid='follow-button']");

        // Followers List Section - Locators inferidos
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatars = page.locator("[data-testid='follower-item'] [data-testid='follower-avatar']");
        this.followerUsernames = page.locator("[data-testid='follower-item'] [data-testid='follower-username']");
        this.followerProfileLinks = page.locator("[data-testid='follower-item'] a[data-testid='follower-link']");

        // API Limit Indicator - Locator inferido
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator']");

        // Error Message - Locator inferido
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    // Navigation Methods
    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
    }

    public void navigateBack() {
        page.goBack();
    }

    // Search Methods
    public void enterUsername(String username) {
        searchInput.fill(username);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    // Metrics Methods
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

    // User Profile Methods
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isFullNameVisible() {
        return userFullName.isVisible();
    }

    public boolean isUsernameVisible() {
        return userUsername.isVisible();
    }

    public boolean isBiographyVisible() {
        return userBiography.isVisible();
    }

    public boolean isLocationVisible() {
        return userLocation.isVisible();
    }

    public boolean isCompanyVisible() {
        return userCompany.isVisible();
    }

    public boolean isWebLinkVisible() {
        return userWebLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public String getFullName() {
        return userFullName.textContent();
    }

    public String getUsername() {
        return userUsername.textContent();
    }

    public String getBiography() {
        return userBiography.textContent();
    }

    public String getLocation() {
        return userLocation.textContent();
    }

    public String getCompany() {
        return userCompany.textContent();
    }

    public String getWebLink() {
        return userWebLink.getAttribute("href");
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public boolean isFollowersListScrollable() {
        String overflowY = followersList.evaluate("el => getComputedStyle(el).overflowY").toString();
        return overflowY.equals("scroll") || overflowY.equals("auto");
    }

    public boolean areFollowerAvatarsVisible() {
        return followerAvatars.first().isVisible();
    }

    public boolean areFollowerUsernamesVisible() {
        return followerUsernames.first().isVisible();
    }

    public boolean areFollowerProfileLinksVisible() {
        return followerProfileLinks.first().isVisible();
    }

    public int getFollowersListCount() {
        return followerItems.count();
    }

    public String getFirstFollowerProfileUrl() {
        return followerProfileLinks.first().getAttribute("href");
    }

    public void clickFirstFollowerLink() {
        followerProfileLinks.first().click();
    }

    // API Limit Indicator Methods
    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public String getApiLimitText() {
        return apiLimitIndicator.textContent();
    }

    // Error Handling Methods
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Responsive Methods
    public void resizeToMobile(int width, int height) {
        page.setViewportSize(width, height);
    }

    public void resizeToDesktop(int width, int height) {
        page.setViewportSize(width, height);
    }

    public boolean isProfileContentVisibleMobile() {
        return userAvatar.isVisible() && searchInput.isVisible();
    }
}