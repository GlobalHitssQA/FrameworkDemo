package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Application
 * Locators: INFERIDOS (basados en buenas prácticas para aplicación de búsqueda de perfiles GitHub)
 */
public class GitHubProfileSearchPage {
    
    private Page page;
    private String baseUrl;
    
    // Search Component Locators (inferidos)
    private Locator searchInput;
    private Locator searchButton;
    
    // Metrics Dashboard Locators (inferidos)
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    
    // User Profile Section Locators (inferidos)
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userUsername;
    private Locator userBiography;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    
    // Followers List Locators (inferidos)
    private Locator followersList;
    private Locator followerItems;
    private Locator followerAvatar;
    private Locator followerUsername;
    private Locator followerProfileLink;
    
    // API Requests Indicator Locators (inferidos)
    private Locator apiRequestsIndicator;
    
    // Error Message Locator (inferido)
    private Locator errorMessage;
    
    // Loading Indicator Locator (inferido)
    private Locator loadingIndicator;
    
    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        this.baseUrl = System.getProperty("app.baseUrl", "http://localhost:3000");
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Search Component - using data-testid for robustness
        this.searchInput = page.locator("[data-testid='search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Metrics Dashboard - using data-testid for each metric
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        
        // User Profile Section - using semantic data-testid
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBiography = page.locator("[data-testid='user-biography']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-weblink']");
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Followers List Section
        this.followersList = page.locator("[data-testid='followers-list']");
        this.followerItems = page.locator("[data-testid='follower-item']");
        this.followerAvatar = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-avatar']");
        this.followerUsername = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-username']");
        this.followerProfileLink = page.locator("[data-testid='follower-item']:first-child [data-testid='follower-profile-link']");
        
        // API Requests Indicator
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
        
        // Error and Loading states
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");
    }
    
    // Navigation Methods
    public void navigateToSearchPage() {
        page.navigate(baseUrl);
        page.waitForLoadState();
    }
    
    // Search Component Methods
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }
    
    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
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
    
    public void waitForProfileToLoad() {
        // Wait for loading indicator to disappear
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        // Wait for user avatar to be visible as confirmation of loaded profile
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }
    
    // Metrics Dashboard Methods
    public boolean isReposCounterVisible() {
        return reposCounter.isVisible();
    }
    
    public boolean isFollowersCounterVisible() {
        return followersCounter.isVisible();
    }
    
    public boolean isFollowingCounterVisible() {
        return followingCounter.isVisible();
    }
    
    public boolean isGistsCounterVisible() {
        return gistsCounter.isVisible();
    }
    
    public String getReposCount() {
        return reposCounter.textContent().trim();
    }
    
    public String getFollowersCount() {
        return followersCounter.textContent().trim();
    }
    
    public String getFollowingCount() {
        return followingCounter.textContent().trim();
    }
    
    public String getGistsCount() {
        return gistsCounter.textContent().trim();
    }
    
    // User Profile Section Methods
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
    
    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }
    
    public String getFullName() {
        return userFullName.textContent().trim();
    }
    
    public String getUsername() {
        return userUsername.textContent().trim();
    }
    
    public String getBiography() {
        return userBiography.textContent().trim();
    }
    
    public String getLocation() {
        return userLocation.textContent().trim();
    }
    
    public String getCompany() {
        return userCompany.textContent().trim();
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
    
    public int getFollowersListCount() {
        return followerItems.count();
    }
    
    public boolean isFirstFollowerAvatarVisible() {
        return followerAvatar.isVisible();
    }
    
    public boolean isFirstFollowerUsernameVisible() {
        return followerUsername.isVisible();
    }
    
    public boolean isFirstFollowerProfileLinkVisible() {
        return followerProfileLink.isVisible();
    }
    
    public String getFirstFollowerUsername() {
        return followerUsername.textContent().trim();
    }
    
    public void clickFirstFollowerProfileLink() {
        followerProfileLink.click();
    }
    
    // API Requests Indicator Methods
    public boolean isApiRequestsIndicatorVisible() {
        return apiRequestsIndicator.isVisible();
    }
    
    public String getApiRequestsText() {
        return apiRequestsIndicator.textContent().trim();
    }
    
    // Error Handling Methods
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }
    
    public String getErrorMessageText() {
        return errorMessage.textContent().trim();
    }
    
    // Loading State Methods
    public boolean isLoadingIndicatorVisible() {
        return loadingIndicator.isVisible();
    }
    
    // Utility Methods
    public void waitForElement(Locator locator, int timeoutMs) {
        locator.waitFor(new Locator.WaitForOptions().setTimeout(timeoutMs));
    }
    
    public void scrollToFollowersList() {
        followersList.scrollIntoViewIfNeeded();
    }
}