package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Application
 * Locators: INFERIDOS (aplicación personalizada, no github.com nativo)
 */
public class GitHubProfileSearchPage {

    private final Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS basados en buenas prácticas y elementos UI del caso de prueba
    // Search Section
    private final Locator searchInput;
    private final Locator searchButton;
    private final Locator errorMessage;

    // Dashboard Metrics Section
    private final Locator metricsContainer;
    private final Locator reposMetric;
    private final Locator followersMetric;
    private final Locator followingMetric;
    private final Locator gistsMetric;

    // User Information Section (Left Section)
    private final Locator userInfoSection;
    private final Locator userAvatar;
    private final Locator userFullName;
    private final Locator username;
    private final Locator userBiography;
    private final Locator userLocation;
    private final Locator userCompany;
    private final Locator userWebsiteLink;
    private final Locator followButton;

    // Followers List Section (Right Section)
    private final Locator followersListSection;
    private final Locator followersListContainer;
    private final Locator followerItems;
    private final Locator followerAvatar;
    private final Locator followerLink;

    // API Limit Indicator
    private final Locator apiLimitIndicator;

    // Layout containers for responsive checks
    private final Locator mainContainer;
    private final Locator leftSection;
    private final Locator rightSection;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;

        // Search Section - Locators inferidos
        this.searchInput = page.locator("[data-testid='search-input'], #search-input, input[placeholder*='username'], input[type='search']");
        this.searchButton = page.locator("[data-testid='search-button'], #search-button, button[aria-label*='search'], button:has(svg.search-icon)");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, [role='alert']");

        // Dashboard Metrics Section - Locators inferidos
        this.metricsContainer = page.locator("[data-testid='metrics-dashboard'], .metrics-container, .dashboard-metrics");
        this.reposMetric = page.locator("[data-testid='repos-metric'], .metric-repos, [data-metric='repos']");
        this.followersMetric = page.locator("[data-testid='followers-metric'], .metric-followers, [data-metric='followers']");
        this.followingMetric = page.locator("[data-testid='following-metric'], .metric-following, [data-metric='following']");
        this.gistsMetric = page.locator("[data-testid='gists-metric'], .metric-gists, [data-metric='gists']");

        // User Information Section - Locators inferidos
        this.userInfoSection = page.locator("[data-testid='user-info-section'], .user-info, .profile-info");
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img.avatar");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, .profile-name");
        this.username = page.locator("[data-testid='username'], .username, .profile-username");
        this.userBiography = page.locator("[data-testid='user-bio'], .user-biography, .profile-bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, .profile-location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, .profile-company");
        this.userWebsiteLink = page.locator("[data-testid='user-website'], .user-website, a.profile-website");
        this.followButton = page.locator("[data-testid='follow-button'], .follow-button, button:has-text('Follow')");

        // Followers List Section - Locators inferidos
        this.followersListSection = page.locator("[data-testid='followers-section'], .followers-section, .followers-list-container");
        this.followersListContainer = page.locator("[data-testid='followers-list'], .followers-list, ul.followers");
        this.followerItems = page.locator("[data-testid='follower-item'], .follower-item, li.follower");
        this.followerAvatar = page.locator("[data-testid='follower-avatar'], .follower-avatar");
        this.followerLink = page.locator("[data-testid='follower-link'], a.follower-link");

        // API Limit Indicator - Locator inferido
        this.apiLimitIndicator = page.locator("[data-testid='api-limit-indicator'], .api-limit, .rate-limit-warning");

        // Layout containers - Locators inferidos
        this.mainContainer = page.locator("[data-testid='main-container'], .main-container, #app, .app-container");
        this.leftSection = page.locator("[data-testid='left-section'], .left-section, .user-profile-section");
        this.rightSection = page.locator("[data-testid='right-section'], .right-section, .followers-panel");
    }

    // Navigation methods
    public void navigateToApplication() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public boolean isApplicationLoaded() {
        return mainContainer.isVisible() || page.title().length() > 0;
    }

    // Search methods
    public void enterUsername(String usernameValue) {
        searchInput.waitFor();
        searchInput.clear();
        searchInput.fill(usernameValue);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(2000);
        userInfoSection.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean areSearchResultsVisible() {
        return userInfoSection.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Orientation and layout methods
    public boolean isLandscapeLayoutActive() {
        int viewportWidth = (int) page.evaluate("() => window.innerWidth");
        int viewportHeight = (int) page.evaluate("() => window.innerHeight");
        return viewportWidth > viewportHeight;
    }

    public boolean hasLayoutIssues() {
        // Check for overflow or layout breaks
        Boolean hasHorizontalScroll = (Boolean) page.evaluate(
            "() => document.documentElement.scrollWidth > document.documentElement.clientWidth"
        );
        return hasHorizontalScroll != null && hasHorizontalScroll;
    }

    // Metrics visibility methods
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

    public boolean areMetricsReadableInLandscape() {
        return metricsContainer.isVisible() && 
               reposMetric.isVisible() && 
               followersMetric.isVisible() && 
               followingMetric.isVisible() && 
               gistsMetric.isVisible();
    }

    // User information visibility methods
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameVisible() {
        return username.isVisible();
    }

    public boolean isFullNameVisible() {
        return userFullName.isVisible();
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

    public boolean isWebsiteLinkVisible() {
        return userWebsiteLink.isVisible();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public boolean isUserInfoSectionProperlyArranged() {
        return leftSection.isVisible() && userInfoSection.isVisible();
    }

    // Followers list methods
    public boolean isFollowersListVisible() {
        return followersListSection.isVisible();
    }

    public boolean isFollowersListScrollable() {
        if (!followersListContainer.isVisible()) {
            return false;
        }
        String overflowY = (String) page.evaluate(
            "el => getComputedStyle(el).overflowY", 
            followersListContainer.elementHandle()
        );
        return "auto".equals(overflowY) || "scroll".equals(overflowY);
    }

    public void scrollFollowersList() {
        followersListContainer.evaluate("el => el.scrollTop += 200");
    }

    public int getFollowersCount() {
        return followerItems.count();
    }

    public void clickFollowerLink(int index) {
        followerLink.nth(index).click();
    }

    // Utility methods
    public String getUsernameText() {
        return username.textContent();
    }

    public String getFullNameText() {
        return userFullName.textContent();
    }

    public String getBiographyText() {
        return userBiography.textContent();
    }

    public String getLocationText() {
        return userLocation.textContent();
    }

    public String getCompanyText() {
        return userCompany.textContent();
    }

    public boolean isApiLimitIndicatorVisible() {
        return apiLimitIndicator.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }
}