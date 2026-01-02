package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Search Component
 * Locators: INFERIDOS (aplicación personalizada de búsqueda de perfiles GitHub)
 */
public class GitHubProfileSearchPage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // Locators - INFERIDOS (basados en buenas prácticas y metadata del proyecto)
    private Locator usernameSearchInput;
    private Locator searchButton;
    private Locator errorMessage;
    private Locator userAvatar;
    private Locator userName;
    private Locator userUsername;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator followButton;
    private Locator reposCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator followersList;
    private Locator apiRequestsIndicator;

    public GitHubProfileSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search components - inferidos
        this.usernameSearchInput = page.locator("[data-testid='username-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        
        // Error state - inferido
        this.errorMessage = page.locator("[data-testid='error-message']");
        
        // Profile information - inferidos
        this.userAvatar = page.locator("[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-fullname']");
        this.userUsername = page.locator("[data-testid='user-username']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.followButton = page.locator("[data-testid='follow-button']");
        
        // Metrics counters - inferidos
        this.reposCounter = page.locator("[data-testid='repos-counter']");
        this.followersCounter = page.locator("[data-testid='followers-counter']");
        this.followingCounter = page.locator("[data-testid='following-counter']");
        this.gistsCounter = page.locator("[data-testid='gists-counter']");
        
        // Followers list - inferido
        this.followersList = page.locator("[data-testid='followers-list']");
        
        // API requests indicator - inferido
        this.apiRequestsIndicator = page.locator("[data-testid='api-requests-indicator']");
    }

    // Navigation
    public void navigateToSearchPage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    // Search actions
    public void enterUsername(String username) {
        usernameSearchInput.clear();
        usernameSearchInput.fill(username);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(2000); // Wait for API response
    }

    public void clearSearchInput() {
        usernameSearchInput.clear();
    }

    // Visibility checks - Search components
    public boolean isSearchInputVisible() {
        return usernameSearchInput.isVisible();
    }

    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }

    public boolean isSearchInputEnabled() {
        return usernameSearchInput.isEnabled();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }

    // Visibility checks - Error state
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    // Visibility checks - Profile information
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUserNameVisible() {
        return userName.isVisible();
    }

    public boolean isUserBioVisible() {
        return userBio.isVisible();
    }

    public boolean isUserLocationVisible() {
        return userLocation.isVisible();
    }

    public boolean isUserCompanyVisible() {
        return userCompany.isVisible();
    }

    // Visibility checks - Metrics
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

    // Visibility checks - Followers list
    public boolean isFollowersListVisible() {
        return followersList.isVisible();
    }

    // Get text content methods
    public String getUserName() {
        return userName.textContent();
    }

    public String getUserUsername() {
        return userUsername.textContent();
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

    public String getReposCount() {
        return reposCounter.textContent();
    }

    public String getFollowersCount() {
        return followersCounter.textContent();
    }

    public String getFollowingCount() {
        return followingCounter.textContent();
    }

    public String getGistsCount() {
        return gistsCounter.textContent();
    }

    public String getApiRequestsIndicatorText() {
        return apiRequestsIndicator.textContent();
    }

    // Avatar source
    public String getUserAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    // Follow button
    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    // Scroll followers list
    public void scrollFollowersList() {
        followersList.evaluate("element => element.scrollTop = element.scrollHeight");
    }
}