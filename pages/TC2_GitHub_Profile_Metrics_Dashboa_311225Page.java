package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Application
 * Locators are INFERRED based on best practices for a custom GitHub profile finder application
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // INFERRED LOCATORS - Search Interface
    private Locator searchInput;
    private Locator searchButton;
    
    // INFERRED LOCATORS - Dashboard Metrics
    private Locator reposMetric;
    private Locator followersMetric;
    private Locator followingMetric;
    private Locator gistsMetric;
    
    // INFERRED LOCATORS - Profile Information
    private Locator userAvatar;
    private Locator userName;
    private Locator userFullName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebsite;
    private Locator followButton;
    
    // INFERRED LOCATORS - Followers List
    private Locator followersList;
    
    // INFERRED LOCATORS - Status Indicators
    private Locator apiRequestIndicator;
    private Locator errorMessage;
    private Locator loadingIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search Interface - Inferred locators using data-testid and semantic selectors
        this.searchInput = page.locator("[data-testid='search-input'], input[placeholder*='username'], input[type='search'], #search-username");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='search'], button:has(svg[class*='search']), #btn-search");
        
        // Dashboard Metrics - Inferred locators for metrics cards
        this.reposMetric = page.locator("[data-testid='repos-metric'], [data-metric='repos'], .metric-repos, #repos-count");
        this.followersMetric = page.locator("[data-testid='followers-metric'], [data-metric='followers'], .metric-followers, #followers-count");
        this.followingMetric = page.locator("[data-testid='following-metric'], [data-metric='following'], .metric-following, #following-count");
        this.gistsMetric = page.locator("[data-testid='gists-metric'], [data-metric='gists'], .metric-gists, #gists-count");
        
        // Profile Information - Inferred locators
        this.userAvatar = page.locator("[data-testid='user-avatar'], .user-avatar, img[alt*='avatar'], #avatar");
        this.userName = page.locator("[data-testid='username'], .username, #username");
        this.userFullName = page.locator("[data-testid='user-fullname'], .user-fullname, #fullname");
        this.userBio = page.locator("[data-testid='user-bio'], .user-bio, #bio");
        this.userLocation = page.locator("[data-testid='user-location'], .user-location, #location");
        this.userCompany = page.locator("[data-testid='user-company'], .user-company, #company");
        this.userWebsite = page.locator("[data-testid='user-website'], .user-website, a[rel='nofollow'], #website");
        this.followButton = page.locator("[data-testid='follow-button'], button:has-text('Follow'), #btn-follow");
        
        // Followers List - Inferred locators
        this.followersList = page.locator("[data-testid='followers-list'], .followers-list, #followers-container");
        
        // Status Indicators - Inferred locators
        this.apiRequestIndicator = page.locator("[data-testid='api-requests'], .api-requests-indicator, #api-requests");
        this.errorMessage = page.locator("[data-testid='error-message'], .error-message, #error, [role='alert']");
        this.loadingIndicator = page.locator("[data-testid='loading'], .loading, .spinner, [aria-busy='true']");
    }

    // Navigation
    public void navigate() {
        page.navigate(BASE_URL);
    }

    public void navigateTo(String url) {
        page.navigate(url);
    }

    // Search Interface Methods
    public boolean isSearchInterfaceVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterUsername(String username) {
        searchInput.clear();
        searchInput.fill(username);
    }

    public String getSearchFieldValue() {
        return searchInput.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void searchUser(String username) {
        enterUsername(username);
        clickSearchButton();
    }

    // Wait Methods
    public void waitForProfileToLoad() {
        page.waitForLoadState();
        // Wait for loading indicator to disappear if present
        if (loadingIndicator.isVisible()) {
            loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
        }
    }

    // Dashboard Metrics Methods - Visibility
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

    public boolean isDashboardFullyLoaded() {
        return isReposMetricVisible() && 
               isFollowersMetricVisible() && 
               isFollowingMetricVisible() && 
               isGistsMetricVisible();
    }

    // Dashboard Metrics Methods - Get Values
    public String getReposMetricValue() {
        return reposMetric.textContent().trim();
    }

    public String getFollowersMetricValue() {
        return followersMetric.textContent().trim();
    }

    public String getFollowingMetricValue() {
        return followingMetric.textContent().trim();
    }

    public String getGistsMetricValue() {
        return gistsMetric.textContent().trim();
    }

    // Profile Information Methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getUserAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    public String getUsername() {
        return userName.textContent().trim();
    }

    public String getUserFullName() {
        return userFullName.textContent().trim();
    }

    public String getUserBio() {
        return userBio.textContent().trim();
    }

    public String getUserLocation() {
        return userLocation.textContent().trim();
    }

    public String getUserCompany() {
        return userCompany.textContent().trim();
    }

    public String getUserWebsite() {
        return userWebsite.getAttribute("href");
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    // Followers List Methods
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    public int getFollowersListCount() {
        return followersList.locator(".follower-item, [data-testid='follower-item']").count();
    }

    // Status Indicator Methods
    public boolean isApiRequestIndicatorVisible() {
        return apiRequestIndicator.isVisible();
    }

    public String getApiRequestCount() {
        return apiRequestIndicator.textContent().trim();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }

    public boolean isLoadingIndicatorVisible() {
        return loadingIndicator.isVisible();
    }
}